import { SyntaxKind } from "typescript";
export declare type ErrorMessage = {
    readonly type: "UnsupportedComputedProperty";
} | {
    readonly type: "UnsupportedUniqueSymbol";
} | {
    readonly type: "UnsupportedConditionalType";
} | {
    readonly type: "UnsupportedGlobalAugmentation";
} | {
    readonly type: "UnsupportedNestedModule";
} | {
    readonly type: "UnsupportedTypeOperator";
    readonly operator: typeof SyntaxKind[keyof typeof SyntaxKind];
} | {
    readonly type: "UnexpectedTsSyntax";
    readonly description: string;
} | {
    readonly type: "FlowgenInternalError";
    readonly description: string;
} | {
    readonly type: "MissingFunctionName";
};
export declare function printErrorMessage(error: ErrorMessage): string;
