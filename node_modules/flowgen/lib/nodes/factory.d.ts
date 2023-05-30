import type { RawNode } from "./node";
import type Node from "./node";
import ImportNode from "./import";
import ExportNode from "./export";
import ExportDeclarationNode from "./export-declaration";
import ModuleNode from "./module";
import PropertyNode from "./property";
import NamespaceNode from "./namespace";
export declare class Factory {
    _modules: {
        [key: string]: ModuleNode;
    };
    _propDeclarations: {
        [key: string]: PropertyNode;
    };
    _functionDeclarations: {
        [key: string]: Array<PropertyNode>;
    };
    constructor();
    createModuleNode(node: RawNode, name: string): ModuleNode;
    createFunctionDeclaration(node: RawNode, rawName: string, context: Node): void;
    createPropertyNode(node: RawNode, name?: string, context?: Node): PropertyNode;
    createNamespaceNode: (node: RawNode, name: string, context: Node) => NamespaceNode;
    createImportNode: (node: RawNode) => ImportNode;
    createExportNode: (node: RawNode) => ExportNode;
    createExportDeclarationNode: (node: RawNode) => ExportDeclarationNode;
}
declare const _default: {
    create: () => Factory;
};
export default _default;
