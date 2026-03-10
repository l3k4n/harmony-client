/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TARGET_TV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
