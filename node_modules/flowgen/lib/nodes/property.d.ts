import type { FunctionDeclaration, ClassDeclaration, InterfaceDeclaration, TypeAliasDeclaration, EnumDeclaration, VariableStatement } from "typescript";
import Node from "./node";
declare type PropertyNode = FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | VariableStatement;
export default class Property extends Node<PropertyNode> {
    name: string;
    skip: boolean;
    constructor(node: PropertyNode);
    skipNode(): void;
    print(namespace?: string, mod?: string): string;
}
export {};
