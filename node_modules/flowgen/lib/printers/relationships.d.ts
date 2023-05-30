import * as ts from "typescript";
import type { RawNode } from "../nodes/node";
export declare const moduleExports: (node: RawNode) => string;
export declare const exporter: (node: RawNode) => string;
export declare const importExportSpecifier: (node: ts.ImportSpecifier | ts.ExportSpecifier) => string;
export declare const namespace: (name: string, hidePunctuation?: boolean) => string;
export declare const namespaceProp: (name: string, hidePunctuation?: boolean) => string;
