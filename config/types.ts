interface ApiConfig {
  language: 'es' | 'en' | 'fr';
  host: string;
  headers: {
    [key: string]: string
  }
}

export interface AppConfig {
  api: ApiConfig
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      app: AppConfig
    }
  }
}