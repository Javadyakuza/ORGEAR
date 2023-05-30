declare const _default: {
    register: (name: string) => number;
    registerProp: (namespace: string, name: string) => string;
    nsExists: (name: string) => boolean;
    nsPropExists: (name: string) => boolean;
    getNSForProp: (name: string) => any;
    reset: () => void;
};
export default _default;
