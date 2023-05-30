import type Node from "../nodes/node";
/**
 * A way to represent multiple nodes with the same name
 * in the same scope.
 *
 * TypeScript supports declaring the same function/type/interface multiple times,
 * which flow does not. This is a representation of that data.
 */
export default class UnionNode {
    _nodes: Array<Node>;
    constructor(nodes: Node | Node[]);
    add(nodes: Node | Node[]): void;
    get(): Node<any>[];
}
