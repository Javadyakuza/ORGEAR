import PropertyNode from "./property";
import Node from "./node";
export default class Namespace extends Node {
    name: string;
    functions: Array<PropertyNode>;
    property: PropertyNode | undefined;
    constructor(name: string, functions?: Array<PropertyNode>, property?: PropertyNode);
    addChild(name: string, child: Node): void;
    addChildren(name: string, child: Node): void;
    print: (namespace?: string, mod?: string, depth?: number) => string;
    static formatChildren(children: ReadonlyArray<Node>, childrenNamespace: string): string[];
}
