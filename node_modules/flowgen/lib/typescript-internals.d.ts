import "typescript";
declare module "typescript" {
    interface Symbol {
        parent?: Symbol;
    }
    enum SymbolFormatFlags {
        DoNotIncludeSymbolChain
    }
}
