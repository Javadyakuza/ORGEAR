import ts from "typescript";
import type { Options } from "../options";
declare const _default: {
    reset: (options?: Options) => void;
    compile: (args_0: ts.SourceFile) => string;
    setChecker(typeChecker: ts.TypeChecker): void;
    getTransformers(options?: Options): ((ctx: ts.TransformationContext) => ts.Transformer<any>)[];
    compileTest: (testPath: string, target: string) => void;
    compileDefinitionString: (string: string, options?: Options) => string;
    compileDefinitionFile: (definitionPath: string, options?: Options, mapSourceCode?: (source: string | undefined, fileName: string) => string | undefined) => string;
    compileDefinitionFiles: (definitionPaths: string[], options?: Options, mapSourceCode?: (source: string | undefined, fileName: string) => string | undefined) => Array<[string, string]>;
};
/**
 * Compiles typescript files
 */
export default _default;
