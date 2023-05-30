export declare function withEnv<Env, A extends ReadonlyArray<unknown>, B>(callback: (env: Env, ...args: A) => B): {
    withEnv<T>(env: T): (...args: A) => B;
    (...args: A): B;
};
