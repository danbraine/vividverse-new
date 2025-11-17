import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../../../declarations/coverce_backend';
import { _SERVICE } from '../../../declarations/coverce_backend/coverce_backend.did';

// Get canister ID from environment or use local default
const canisterId = process.env.CANISTER_ID_COVERCE_BACKEND || 'rrkah-fqaaa-aaaaa-aaaaq-cai';

let actor: _SERVICE | null = null;

export const getActor = async (): Promise<_SERVICE> => {
  if (actor) return actor;

  const authClient = await AuthClient.create();
  const identity = authClient.getIdentity();
  
  const agent = new HttpAgent({
    identity,
    host: process.env.DFX_NETWORK === 'ic' 
      ? 'https://ic0.app'
      : 'http://localhost:8000',
  });

  // For local development, fetch root key
  if (process.env.DFX_NETWORK !== 'ic') {
    await agent.fetchRootKey();
  }

  actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });

  return actor;
};

// Script submission
export const submitScript = async (
  title: string,
  format: 'PDF' | 'Fountain' | 'Text',
  content: Uint8Array,
  summary?: string
) => {
  const actor = await getActor();
  const formatEnum = format === 'PDF' ? { PDF: null } : format === 'Fountain' ? { Fountain: null } : { Text: null };
  
  const result = await actor.submitScript(
    title,
    formatEnum as any,
    content as any,
    summary ? [summary] : []
  );
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Failed to submit script');
  }
};

// Get scripts
export const getScript = async (scriptId: number) => {
  const actor = await getActor();
  const result = await actor.getScript(scriptId);
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Script not found');
  }
};

export const getPendingScripts = async () => {
  const actor = await getActor();
  return await actor.getPendingScripts();
};

export const getAllScripts = async () => {
  const actor = await getActor();
  return await actor.getAllScripts();
};

// Validation
export const registerValidator = async () => {
  const actor = await getActor();
  return await actor.registerValidator();
};

export const isValidator = async (userId: string) => {
  const actor = await getActor();
  return await actor.isValidator(userId as any);
};

export const submitValidation = async (
  scriptId: number,
  scores: Array<{ category: string; score: number }>,
  comments?: string
) => {
  const actor = await getActor();
  
  // Convert category strings to enum format
  const categoryMap: Record<string, any> = {
    'Story': { Story: null },
    'Characters': { Characters: null },
    'Dialogue': { Dialogue: null },
    'Originality': { Originality: null },
    'Structure': { Structure: null },
    'VisualPotential': { VisualPotential: null },
  };
  
  const scoreTuples = scores.map(s => [
    categoryMap[s.category],
    s.score
  ] as [any, number]);
  
  const result = await actor.submitValidation(
    scriptId,
    scoreTuples as any,
    comments ? [comments] : []
  );
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Failed to submit validation');
  }
};

export const getValidations = async (scriptId: number) => {
  const actor = await getActor();
  return await actor.getValidations(scriptId);
};

export const getAggregatedScore = async (scriptId: number) => {
  const actor = await getActor();
  const result = await actor.getAggregatedScore(scriptId);
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Score not found');
  }
};

export const getTopScript = async () => {
  const actor = await getActor();
  return await actor.getTopScript();
};

// Movie generation
export const startMovieGeneration = async (scriptId: number) => {
  const actor = await getActor();
  const result = await actor.startMovieGeneration(scriptId);
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Failed to start movie generation');
  }
};

export const getMovie = async (scriptId: number) => {
  const actor = await getActor();
  const result = await actor.getMovie(scriptId);
  
  if ('ok' in result) {
    return result.ok;
  } else {
    throw new Error('Movie not found');
  }
};



