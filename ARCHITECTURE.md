# Coverce.ai Architecture

## System Overview

Coverce.ai is a decentralized platform for script submission, validation, and AI-powered film generation, built on the Internet Computer Protocol (ICP).

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Submit     │  │  Validator   │  │   Movie      │      │
│  │   Portal     │  │  Dashboard   │  │   Viewer     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  Internet Identity Authentication                            │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTPS / Agent Calls
                       │
┌──────────────────────▼───────────────────────────────────────┐
│              ICP Backend (Motoko Canisters)                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         coverce_backend Canister                      │   │
│  │  • Script Storage                                     │   │
│  │  • Validation Management                              │   │
│  │  • Score Aggregation                                  │   │
│  │  • Movie Metadata                                     │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────────────────┘
                       │
                       │ HTTP API Calls
                       │
┌──────────────────────▼───────────────────────────────────────┐
│          AI Film Generator Orchestrator (Node.js)            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  • Script Parsing (Fountain/PDF)                     │   │
│  │  • Scene Generation                                   │   │
│  │  • AI API Integration                                 │   │
│  │  • Video/Audio/Image Generation                       │   │
│  │  • FFmpeg Stitching                                   │   │
│  │  • ICP Upload                                         │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼──────┐ ┌─────▼──────┐ ┌─────▼──────┐
│  Video AI    │ │  Image AI  │ │  Audio AI  │
│  • Luma      │ │  • DALL-E  │ │  • 11Labs  │
│  • Runway    │ │  • Stable  │ │  • OpenAI  │
│  • Pika      │ │  • Flux    │ │            │
│  • Kling     │ │            │ │            │
└──────────────┘ └────────────┘ └────────────┘
```

## Component Details

### 1. Frontend (React + TypeScript)

**Location**: `src/coverce_frontend/`

**Technologies**:
- React 18
- TypeScript
- Vite
- React Router
- @dfinity/agent (ICP integration)

**Key Components**:
- `AuthContext` - Internet Identity authentication
- `coverceService` - ICP backend communication
- Pages: Home, SubmitScript, ValidatorDashboard, ScriptList, MovieViewer

**Features**:
- Internet Identity login (passwordless)
- Script upload (PDF, Fountain, Text)
- Validation scoring interface
- Movie playback

### 2. Backend (Motoko)

**Location**: `src/coverce_backend/`

**Canister**: `coverce_backend`

**Key Functions**:
- `submitScript()` - Store script submissions
- `submitValidation()` - Record validator scores
- `getAggregatedScore()` - Calculate average scores
- `startMovieGeneration()` - Trigger AI generation
- `updateMovieProgress()` - Update generation status

**Data Structures**:
- Scripts HashMap (ID → ScriptSubmission)
- Validations HashMap (ScriptID → [ValidationScore])
- AggregatedScores HashMap (ScriptID → AggregatedScore)
- Movies HashMap (ScriptID → Movie)

### 3. AI Orchestrator (Node.js)

**Location**: `src/ai_orchestrator/`

**Technologies**:
- Node.js
- Axios (HTTP requests)
- FFmpeg (video processing)
- Various AI API clients

**Workflow**:
1. Parse script into scenes
2. Generate prompts for each scene
3. Call AI APIs in parallel:
   - Video generation (Luma/Runway/Pika/Kling)
   - Image generation (DALL-E/Stability/Flux)
   - Audio generation (ElevenLabs/OpenAI)
4. Combine video + audio per scene
5. Stitch all scenes with FFmpeg
6. Upload final movie to ICP storage

## Data Flow

### Script Submission Flow

```
User → Frontend → Internet Identity Auth → Backend Canister
                                              ↓
                                         Store Script
                                              ↓
                                         Status: PendingValidation
```

### Validation Flow

```
Validator → Frontend → Backend Canister
                            ↓
                    Store Validation Score
                            ↓
                    Recalculate Aggregated Score
                            ↓
                    Update Script Status
```

### Movie Generation Flow

```
Top Script Selected → Backend Canister
                            ↓
                    Status: Selected
                            ↓
                    Trigger AI Orchestrator
                            ↓
                    Parse Script → Scenes
                            ↓
                    Generate (Video + Image + Audio) × N scenes
                            ↓
                    Stitch with FFmpeg
                            ↓
                    Upload to ICP Storage
                            ↓
                    Update Backend: Status = Completed
                            ↓
                    Frontend: Display Movie
```

## Storage

### ICP Canister Storage

- **Scripts**: Stored as Blob in canister
- **Metadata**: ScriptSubmission structs
- **Validations**: Array of ValidationScore
- **Movies**: Movie metadata (hash reference to storage)

### External Storage (Future)

- Large movie files can be stored on:
  - ICP asset canisters
  - IPFS
  - Decentralized storage (Arweave, Filecoin)

## Security

### Authentication
- Internet Identity (WebAuthn-based)
- No passwords stored
- Principal-based authorization

### Authorization
- Validators must register
- Script authors identified by Principal
- Can add admin roles for movie generation triggers

### Data Integrity
- Script content hashing
- Immutable validation records
- Timestamped submissions

## Scalability Considerations

### Current MVP
- Single canister (sufficient for MVP)
- Sequential processing
- Basic storage

### Future Scaling
- **Sharding**: Multiple canisters for scripts
- **CDN**: For movie delivery
- **Queue System**: For AI generation jobs
- **Caching**: For frequently accessed data
- **Load Balancing**: Multiple orchestrator instances

## Integration Points

### Bittensor (Future V2/V3)
- Replace manual validators with subnet
- TAO rewards for submissions
- Decentralized scoring network
- Validator staking

### External APIs
- Video: Luma, Runway, Pika, Kling
- Image: OpenAI, Stability, Flux
- Audio: ElevenLabs, OpenAI TTS

## Monitoring & Observability

### Recommended Tools
- ICP Dashboard (canister metrics)
- Logging service (for orchestrator)
- Error tracking (Sentry)
- Analytics (user behavior)

## Cost Estimation

### ICP Cycles
- Canister storage: ~$5-20/month per GB
- Compute: Minimal for MVP
- Frontend hosting: Included

### AI API Costs
- Video generation: $0.10-1.00 per minute
- Image generation: $0.02-0.20 per image
- Audio generation: $0.01-0.10 per minute

### Example: 5-minute movie
- 20 scenes × $0.50 = $10 (video)
- 20 images × $0.10 = $2 (images)
- 5 minutes × $0.05 = $0.25 (audio)
- **Total: ~$12-15 per movie**

## Future Enhancements

1. **Bittensor Integration**
   - Subnet for validation
   - TAO rewards
   - Decentralized scoring

2. **Advanced Features**
   - Multi-language support
   - Custom AI model training
   - Collaborative editing
   - Version control

3. **Monetization**
   - Subscription tiers
   - Pay-per-generation
   - Revenue sharing with creators



