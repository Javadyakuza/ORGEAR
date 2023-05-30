import * as ts from "typescript";
export declare function printEntityName(type: ts.EntityName): string;
export declare function printPropertyAccessExpression(type: ts.PropertyAccessExpression | ts.Identifier | ts.PrivateIdentifier): string;
export declare function getLeftMostPropertyAccessExpression(type: ts.PropertyAccessExpression | ts.Identifier): any;
export declare function getFullyQualifiedPropertyAccessExpression(symbol: ts.Symbol | undefined, type: any, delimiter?: string): string;
export declare function getFullyQualifiedName(symbol: ts.Symbol | undefined, type: any, checks?: boolean, delimiter?: string): string;
export declare function getTypeofFullyQualifiedName(symbol: ts.Symbol | undefined, type: any, delimiter?: string): string;
export declare function printFlowGenHelper(env: any): string;
export declare function fixDefaultTypeArguments(symbol: ts.Symbol | undefined, type: any): void;
export declare const printType: {
    (args_0: any): string;
    withEnv<T>(env: T): (args_0: any) => string;
};
export default printType;
