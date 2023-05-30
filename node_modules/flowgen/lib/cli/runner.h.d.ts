export declare type RunnerOptions = {
    jsdoc: boolean;
    quiet: boolean;
    interfaceRecords: boolean;
    moduleExports: boolean;
    inexact: boolean;
    version: string;
    out: string;
    flowTypedFormat: boolean;
    addFlowHeader: boolean;
    compileTests: boolean;
    asModule: string;
};
export declare type Mode = "directory" | "directory-flow-typed" | "flow-typed" | "file";
export declare type DirectoryFlowTypedFile = {
    rootModuleName: string;
    moduleName: string;
    filename: string;
};
export declare type OutputFile = DirectoryFlowTypedFile | string;
export declare type File = {
    index: number;
    mode: Mode;
    moduleName: string;
    isMain: boolean;
    file: string;
    readonly outputFile: OutputFile;
    intro: string;
};
