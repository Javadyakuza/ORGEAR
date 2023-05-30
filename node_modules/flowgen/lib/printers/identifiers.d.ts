declare type IdentifierResult = string | ((...args: any[]) => any);
export declare const print: {
    (args_0: string): IdentifierResult;
    withEnv<T>(env: T): (args_0: string) => IdentifierResult;
};
export {};
