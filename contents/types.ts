
interface ApiContents {
  headers: {
    [key: string]: string
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      contents: ApiContents
    }
  }
}

export default {}