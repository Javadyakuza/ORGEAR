import type { SourceFile } from "typescript";
import ts from "typescript";
import type { ErrorMessage } from "./errors/error-message";
export declare function setSourceFile(file: SourceFile): void;
export declare function error(node: ts.Node, message: ErrorMessage): void;
