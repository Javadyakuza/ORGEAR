import * as ts from "typescript";
export declare function renames(symbol: ts.Symbol | void, type: ts.TypeReferenceNode | ts.ImportSpecifier): boolean;
export declare function getLeftMostEntityName(type: ts.EntityName): ts.Identifier;
