interface ApiConfig {
  language: 'es' | 'en' | 'fr';
  host: string;
  headers: {
    [key: string]: string
  }
}

export interface AppConfig {
  api: ApiConfig,
  appEnv: 'development' | 'staging' | 'production'
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      app: AppConfig
    }
  }
}
