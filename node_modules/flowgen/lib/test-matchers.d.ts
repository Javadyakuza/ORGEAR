declare global {
    namespace jest {
        interface Matchers<R> {
            toBeValidFlowTypeDeclarations(): R;
        }
    }
}
export {};
