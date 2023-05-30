export declare type RawNode = any;
declare class Node<NodeType = RawNode> {
    children: {
        [key: string]: Node;
    };
    kind: string;
    name: string;
    raw: NodeType;
    namespace: string | undefined | null;
    module: string | undefined | null;
    constructor(node?: NodeType | null);
    addChild(name: string, node: Node): void;
    addChildren(name: string, node: Node): void;
    /**
     * Used for overloading the props of some types
     */
    maybeAddMember(members: any | ReadonlyArray<any>): void;
    getChildren(): ReadonlyArray<Node>;
    print(namespace?: string, module?: string, depth?: number): string;
}
interface Node {
    [k: string]: any;
}
export default Node;
