import pool from '../config/database.js';

async function recalculateAggregatedScore(scriptId) {
  const result = await pool.query(
    `SELECT 
      AVG(story_score) as story_avg,
      AVG(characters_score) as characters_avg,
      AVG(dialogue_score) as dialogue_avg,
      AVG(originality_score) as originality_avg,
      AVG(structure_score) as structure_avg,
      AVG(visual_potential_score) as visual_potential_avg,
      COUNT(*) as validator_count
     FROM validations WHERE script_id = $1`,
    [scriptId]
  );

  const avg = result.rows[0];
  const totalScore = (
    (parseFloat(avg.story_avg) || 0) +
    (parseFloat(avg.characters_avg) || 0) +
    (parseFloat(avg.dialogue_avg) || 0) +
    (parseFloat(avg.originality_avg) || 0) +
    (parseFloat(avg.structure_avg) || 0) +
    (parseFloat(avg.visual_potential_avg) || 0)
  ) / 6;

  await pool.query(
    `INSERT INTO aggregated_scores (
      script_id, story_avg, characters_avg, dialogue_avg,
      originality_avg, structure_avg, visual_potential_avg,
      total_score, validator_count, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
    ON CONFLICT (script_id) DO UPDATE SET
      story_avg = EXCLUDED.story_avg,
      characters_avg = EXCLUDED.characters_avg,
      dialogue_avg = EXCLUDED.dialogue_avg,
      originality_avg = EXCLUDED.originality_avg,
      structure_avg = EXCLUDED.structure_avg,
      visual_potential_avg = EXCLUDED.visual_potential_avg,
      total_score = EXCLUDED.total_score,
      validator_count = EXCLUDED.validator_count,
      updated_at = CURRENT_TIMESTAMP`,
    [
      scriptId,
      parseFloat(avg.story_avg) || 0,
      parseFloat(avg.characters_avg) || 0,
      parseFloat(avg.dialogue_avg) || 0,
      parseFloat(avg.originality_avg) || 0,
      parseFloat(avg.structure_avg) || 0,
      parseFloat(avg.visual_potential_avg) || 0,
      totalScore,
      parseInt(avg.validator_count) || 0,
    ]
  );
}

export const registerValidator = async (req, res) => {
  try {
    const userId = req.user.userId;
    await pool.query(
      `UPDATE users SET is_validator = TRUE WHERE id = $1`,
      [userId]
    );
    res.json(true);
  } catch (error) {
    console.error('Error registering validator:', error);
    res.status(500).json({ error: 'Failed to register as validator' });
  }
};

export const isValidator = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      `SELECT is_validator FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.json(false);
    }

    res.json(result.rows[0].is_validator);
  } catch (error) {
    console.error('Error checking validator status:', error);
    res.status(500).json({ error: 'Failed to check validator status' });
  }
};

export const submitValidation = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const { scores, comments } = req.body;
    const validatorId = req.user.userId;

    // Check if validator
    const validatorCheck = await pool.query(
      `SELECT is_validator FROM users WHERE id = $1`,
      [validatorId]
    );

    if (!validatorCheck.rows[0]?.is_validator) {
      return res.status(403).json({ err: { Unauthorized: null } });
    }

    // Check if script exists
    const scriptCheck = await pool.query(
      `SELECT id, status FROM scripts WHERE id = $1`,
      [scriptId]
    );

    if (scriptCheck.rows.length === 0) {
      return res.status(404).json({ err: { NotFound: null } });
    }

    // Update script status if needed
    if (scriptCheck.rows[0].status === 'PendingValidation') {
      await pool.query(
        `UPDATE scripts SET status = 'Validating' WHERE id = $1`,
        [scriptId]
      );
    }

    // Convert scores array to individual fields
    const scoreMap = {};
    scores.forEach(({ category, score }) => {
      const fieldName = category.toLowerCase() + '_score';
      scoreMap[fieldName] = score;
    });

    // Insert or update validation
    await pool.query(
      `INSERT INTO validations (
        script_id, validator_id, story_score, characters_score, dialogue_score,
        originality_score, structure_score, visual_potential_score, comments
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (script_id, validator_id) DO UPDATE SET
        story_score = EXCLUDED.story_score,
        characters_score = EXCLUDED.characters_score,
        dialogue_score = EXCLUDED.dialogue_score,
        originality_score = EXCLUDED.originality_score,
        structure_score = EXCLUDED.structure_score,
        visual_potential_score = EXCLUDED.visual_potential_score,
        comments = EXCLUDED.comments`,
      [
        scriptId, validatorId,
        scoreMap.story_score || null,
        scoreMap.characters_score || null,
        scoreMap.dialogue_score || null,
        scoreMap.originality_score || null,
        scoreMap.structure_score || null,
        scoreMap.visual_potential_score || null,
        comments || null
      ]
    );

    // Recalculate aggregated scores
    await recalculateAggregatedScore(scriptId);

    res.json({ ok: true });
  } catch (error) {
    console.error('Error submitting validation:', error);
    res.status(500).json({ error: 'Failed to submit validation' });
  }
};

export const getValidations = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const result = await pool.query(
      `SELECT validator_id, script_id, story_score, characters_score, dialogue_score,
              originality_score, structure_score, visual_potential_score, comments, created_at
       FROM validations WHERE script_id = $1
       ORDER BY created_at DESC`,
      [scriptId]
    );

    const validations = result.rows.map(v => ({
      validatorId: v.validator_id.toString(),
      scriptId: v.script_id,
      scores: [
        ['Story', v.story_score],
        ['Characters', v.characters_score],
        ['Dialogue', v.dialogue_score],
        ['Originality', v.originality_score],
        ['Structure', v.structure_score],
        ['VisualPotential', v.visual_potential_score],
      ].filter(([_, score]) => score !== null).map(([cat, score]) => [
        { [cat]: null },
        score
      ]),
      comments: v.comments ? [v.comments] : [],
      timestamp: new Date(v.created_at).getTime() * 1000000,
    }));

    res.json(validations);
  } catch (error) {
    console.error('Error getting validations:', error);
    res.status(500).json({ error: 'Failed to get validations' });
  }
};

export const getAggregatedScore = async (req, res) => {
  try {
    const { scriptId } = req.params;
    const result = await pool.query(
      `SELECT * FROM aggregated_scores WHERE script_id = $1`,
      [scriptId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ err: { NotFound: null } });
    }

    const score = result.rows[0];
    res.json({
      ok: {
        scriptId: score.script_id,
        categoryScores: [
          ['Story', score.story_avg],
          ['Characters', score.characters_avg],
          ['Dialogue', score.dialogue_avg],
          ['Originality', score.originality_avg],
          ['Structure', score.structure_avg],
          ['VisualPotential', score.visual_potential_avg],
        ].map(([cat, val]) => [{ [cat]: null }, val]),
        totalScore: score.total_score,
        validatorCount: score.validator_count,
      }
    });
  } catch (error) {
    console.error('Error getting aggregated score:', error);
    res.status(500).json({ error: 'Failed to get aggregated score' });
  }
};

export const getTopScript = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT script_id FROM aggregated_scores
       ORDER BY total_score DESC LIMIT 1`
    );

    if (result.rows.length === 0) {
      return res.json(null);
    }

    res.json(result.rows[0].script_id);
  } catch (error) {
    console.error('Error getting top script:', error);
    res.status(500).json({ error: 'Failed to get top script' });
  }
};

