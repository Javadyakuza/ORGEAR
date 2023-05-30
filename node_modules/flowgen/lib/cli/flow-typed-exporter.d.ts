import type { DirectoryFlowTypedFile } from "./runner.h";
export declare function flowTypedExporter(moduleName: string, output: string, _index: number): Promise<string>;
export declare function flowTypedDirectoryExporter({ rootModuleName }: DirectoryFlowTypedFile, output: string, index: number): Promise<string>;
