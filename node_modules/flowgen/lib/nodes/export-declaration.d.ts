import type { RawNode } from "./node";
import type { Expression, ExportDeclaration as RawExport } from "typescript";
import Node from "./node";
declare type ExportDeclarationType = RawExport & {
    moduleSpecifier?: Expression & {
        text: string;
    };
};
export default class ExportDeclaration extends Node<ExportDeclarationType> {
    constructor(node: RawNode);
    print(): string;
}
export {};
