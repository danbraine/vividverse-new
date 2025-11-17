# AI Film Generator Orchestrator

This service orchestrates the AI film generation process for Coverce.ai.

## Features

- Parses scripts into scenes
- Generates video using AI APIs (Luma, Runway, Pika, Kling)
- Generates images/storyboards (DALL-E, Stability, Flux)
- Generates audio/narration (ElevenLabs, OpenAI TTS)
- Stitches scenes together with FFmpeg
- Uploads final movie to ICP storage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install FFmpeg:
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt-get install ffmpeg`
- **Windows**: Download from https://ffmpeg.org/download.html

3. Configure environment variables in `.env`:
```env
# Video Generation API
LUMA_API_KEY=your_luma_api_key
LUMA_API_URL=https://api.lumalabs.ai/v1/generations

# Image Generation API
OPENAI_API_KEY=your_openai_api_key
OPENAI_API_URL=https://api.openai.com/v1/images/generations

# Audio Generation API
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id
```

## Usage

### As a standalone script:
```bash
node index.js <scriptId> <scriptPath>
```

### As a module:
```javascript
import { generateMovie } from './index.js';

const moviePath = await generateMovie(scriptId, scriptContent);
```

## API Providers Supported

### Video Generation
- **Luma Dream Machine** (default)
- Runway Gen-3 Alpha
- Pika Labs
- Kling AI

### Image Generation
- **OpenAI DALL-E** (default)
- Stability AI
- Flux

### Audio Generation
- **ElevenLabs** (default)
- OpenAI TTS

## Integration with ICP Backend

The orchestrator should be called by your ICP backend when a script is selected for generation. You can:

1. Set up a cron job or scheduled task
2. Call the orchestrator via HTTP API
3. Integrate directly into your Motoko canister (for simpler scripts)

## Output

Generated movies are saved to the `output/` directory and uploaded to ICP storage with a hash reference.



