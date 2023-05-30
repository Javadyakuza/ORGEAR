import beautify from "./cli/beautifier";
export { default as compiler } from "./cli/compiler";
export { default as beautify } from "./cli/beautifier";
declare const _default: {
    beautify: typeof beautify;
    compiler: {
        reset: (options?: import("./options").Options) => void;
        compile: (args_0: import("typescript").SourceFile) => string;
        setChecker(typeChecker: import("typescript").TypeChecker): void;
        getTransformers(options?: import("./options").Options): ((ctx: import("typescript").TransformationContext) => import("typescript").Transformer<any>)[];
        compileTest: (testPath: string, target: string) => void;
        compileDefinitionString: (string: string, options?: import("./options").Options) => string;
        compileDefinitionFile: (definitionPath: string, options?: import("./options").Options, mapSourceCode?: (source: string, fileName: string) => string) => string;
        compileDefinitionFiles: (definitionPaths: string[], options?: import("./options").Options, mapSourceCode?: (source: string, fileName: string) => string) => [string, string][];
    };
};
export default _default;
