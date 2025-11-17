/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly CANISTER_ID_COVERCE_BACKEND: string;
  readonly DFX_NETWORK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}



