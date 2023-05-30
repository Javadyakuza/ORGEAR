import type { RawNode } from "./node";
import Node from "./node";
export default class Module extends Node {
    name: string;
    constructor(node: RawNode | undefined | null, name: string);
    addChild(name: string, child: Node): void;
    addChildren(name: string, child: Node): void;
    print(namespace?: string, module?: string, depth?: number): string;
}
