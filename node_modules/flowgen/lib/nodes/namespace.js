"use strict";

exports.__esModule = true;
exports.default = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var _lodash = require("lodash");

var _node = _interopRequireDefault(require("./node"));

var _namespaceManager = _interopRequireDefault(require("../namespace-manager"));

var printers = _interopRequireWildcard(require("../printers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Namespace extends _node.default {
  constructor(_name, functions, property) {
    super(null);
    this.name = void 0;
    this.functions = void 0;
    this.property = void 0;

    this.print = (namespace = "", mod = "root", depth) => {
      const children = (0, _lodash.uniqBy)((0, _lodash.orderBy)(this.getChildren(), [a => a.isValue], ["desc"]), // @ts-expect-error todo(flow->ts)
      child => child.name.text || child.name);
      let name = this.name;

      if (namespace) {
        name = namespace + "$" + this.name;
      }

      const childrenDeclarations = this.functions // @ts-expect-error The .raw on a this.functions node is a ts.FunctionDeclaration.
      .map(propNode => printers.functions.functionType(propNode.raw, true)).concat(Namespace.formatChildren(children, name));
      const childrenNode = `${this.getChildren().map(child => {
        return child.print(name, mod, depth);
      }).join("\n\n")}`;

      if (childrenDeclarations.length > 0) {
        let topLevel = "";
        const nsGroup = `
      declare var npm$namespace$${name}: {|
        ${childrenDeclarations.map(declaration => `${declaration},`).join("\n")}
      |}\n`;

        if (namespace === "") {
          topLevel = `declare var ${name}: typeof npm$namespace$${name};\n`;
        }

        return topLevel + nsGroup + childrenNode;
      }

      return childrenNode;
    };

    this.name = _name;
    this.functions = functions || [];
    this.property = property;

    _namespaceManager.default.register(_name);
  }

  addChild(name, child) {
    child.namespace = this.name;
    child.isValue = child.getChildren().some(node => {
      return node instanceof Namespace || node.raw.kind === ts.SyntaxKind.VariableStatement || node.raw.kind === ts.SyntaxKind.ClassDeclaration || node.raw.kind === ts.SyntaxKind.FunctionDeclaration || node.raw.kind === ts.SyntaxKind.EnumDeclaration;
    });

    _namespaceManager.default.registerProp(this.name, child.name);

    this.children[name] = child;
  }

  addChildren(name, child) {
    child.namespace = this.name;
    child.isValue = child.getChildren().some(node => node instanceof Namespace || node.raw.kind === ts.SyntaxKind.VariableStatement || node.raw.kind === ts.SyntaxKind.ClassDeclaration || node.raw.kind === ts.SyntaxKind.FunctionDeclaration || node.raw.kind === ts.SyntaxKind.EnumDeclaration);

    if (child instanceof Namespace && this.children[child.name] && this.children[child.name].raw && this.children[child.name].raw.kind === ts.SyntaxKind.ClassDeclaration) {
      name = child.name;
    }

    _namespaceManager.default.registerProp(this.name, child.name);

    if (!this.children[name]) {
      this.children[name] = child;
      return;
    }

    if (this.children[name]) {
      for (const key in child.children) {
        this.children[name].addChildren(key, child.children[key]);
      }

      return;
    }
  }

  static formatChildren(children, childrenNamespace) {
    const functions = children.filter(child => child.raw && child.raw.kind === ts.SyntaxKind.FunctionDeclaration);
    const variables = (0, _lodash.flatten)(children.filter(child => child.raw && child.raw.kind === ts.SyntaxKind.VariableStatement).map(child => child.raw.declarationList.declarations));
    const enums = children.filter(child => child.raw && child.raw.kind === ts.SyntaxKind.EnumDeclaration); // Interfaces with type parameters are not expressible inside namespaces.

    const interfaces = children.filter(child => child.raw && child.raw.kind === ts.SyntaxKind.InterfaceDeclaration && !(child.raw.typeParameters && child.raw.typeParameters.length));
    const classes = children.filter(child => child.raw && child.raw.kind === ts.SyntaxKind.ClassDeclaration);
    const namespaces = children.filter(child => {
      return child.isValue;
    });
    return [].concat(functions.map(child => {
      return `${child.name}: typeof ${childrenNamespace}$${child.name}`;
    }), variables.map(child => {
      return `${child.name.text}: typeof ${childrenNamespace}$${child.name.text}`;
    }), enums.map(child => {
      return `${child.name}: typeof ${childrenNamespace}$${child.name}`;
    }), interfaces.map(child => {
      return `${child.name}: Class<${childrenNamespace}$${child.name}>`;
    }), classes.map(child => {
      return `${child.name}: typeof ${childrenNamespace}$${child.name}`;
    }), namespaces.map(child => {
      return `${child.name}: typeof npm$namespace$${childrenNamespace}$${child.name}`;
    }));
  }

}

exports.default = Namespace;