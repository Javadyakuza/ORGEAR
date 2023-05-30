export declare type Options = {
    jsdoc?: boolean;
    interfaceRecords?: boolean;
    moduleExports?: boolean;
    quiet?: boolean;
    inexact?: boolean;
    asModule?: string;
};
export declare function assignOptions(newOptions: Partial<Options>): void;
export declare function resetOptions(): void;
export declare function opts(): Options;
