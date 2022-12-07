export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PB_HOST: string;
      NEXT_PUBLIC_PB_USER: string;
      NEXT_PUBLIC_PB_PASS: string;
    }
  }
}
