import * as ts from "typescript";
import type { Options } from "../options";
export declare function importEqualsTransformer(): (ctx: ts.TransformationContext) => ts.Transformer<any>;
export declare function legacyModules(): (ctx: ts.TransformationContext) => ts.Transformer<any>;
export declare function declarationFileTransform(options?: Options): (ctx: ts.TransformationContext) => ts.Transformer<any>;
/**
 * Rewrite `import(…)` types into full import declarations.
 *
 * Flow doesn't have an equivalent to `import(…)` types.
 */
export declare function importTypeToImportDeclaration(): (ctx: ts.TransformationContext) => ts.Transformer<any>;
