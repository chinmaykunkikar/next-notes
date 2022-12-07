export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PB_HOST: string;
            PB_USER: string;
            PB_PASS: string;
        }
    }
}