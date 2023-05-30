import * as ts from "typescript";
import type { RawNode } from "../nodes/node";
export declare const functionType: (func: ts.FunctionTypeNode | ts.FunctionDeclaration | ts.MethodDeclaration | ts.MethodSignature | ts.ConstructSignatureDeclaration, dotAsReturn?: boolean) => string;
export declare const functionDeclaration: (nodeName: string, node: RawNode) => string;
