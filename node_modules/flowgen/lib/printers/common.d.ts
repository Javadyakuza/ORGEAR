import * as ts from "typescript";
import type { RawNode } from "../nodes/node";
export declare const literalType: (node: RawNode) => string;
export declare const typeParameter: (node: ts.TypeParameterDeclaration & {
    withoutDefault: boolean;
}) => string;
export declare const parameter: (param: ts.ParameterDeclaration | ts.PropertySignature | ts.GetAccessorDeclaration | ts.SetAccessorDeclaration) => string;
export declare const methodSignature: (param: ts.MethodSignature | ts.MethodDeclaration) => string;
export declare const generics: (types?: ReadonlyArray<RawNode> | null) => string;
export declare const genericsWithoutDefault: (types?: ReadonlyArray<RawNode> | null) => string;
/** The node's jsdoc comments, if any and if the `jsdoc` option is enabled. */
export declare const jsdoc: {
    (args_0: ts.Node): string;
    withEnv<T>(env: T): (args_0: ts.Node) => string;
};
