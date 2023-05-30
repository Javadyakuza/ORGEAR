"use strict";

exports.__esModule = true;
exports.default = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var _node = _interopRequireDefault(require("./node"));

var printers = _interopRequireWildcard(require("../printers"));

var _namespaceManager = _interopRequireDefault(require("../namespace-manager"));

var _ast = require("../parse/ast");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Property extends _node.default {
  constructor(node) {
    super(node);
    this.name = void 0;
    this.skip = void 0;
    this.name = (0, _ast.parseNameFromNode)(node);
    this.skip = false;
  }

  skipNode() {
    this.skip = true;
  }

  print(namespace = "", mod = "root") {
    let out = "";
    let name = this.name;

    if (namespace) {
      _namespaceManager.default.registerProp(namespace, this.name);
    }

    if (namespace) {
      name = namespace + "$" + name;
    }

    out += printers.common.jsdoc(this.raw);
    const isDeclare = mod !== "root";
    const exporter = printers.relationships.exporter(this.raw);
    const modifier = exporter ? `${isDeclare ? "declare " : ""}${exporter}` : "declare ";
    if (this.skip) return out;

    switch (this.raw.kind) {
      case ts.SyntaxKind.FunctionDeclaration:
        out += printers.functions.functionDeclaration(name, this.raw);
        break;

      case ts.SyntaxKind.ClassDeclaration:
        {
          const classChildren = this.getChildren();
          out += printers.declarations.classDeclaration(name, this.raw, classChildren);

          if (classChildren.length) {
            out += `\n\n${classChildren.map(child => {
              return child.print(name, mod);
            }).join("\n\n")}`;
          }

          break;
        }

      case ts.SyntaxKind.InterfaceDeclaration:
        out += printers.declarations.interfaceDeclaration(name, this.raw, modifier);
        break;

      case ts.SyntaxKind.TypeAliasDeclaration:
        out += printers.declarations.typeDeclaration(name, this.raw, modifier);
        break;

      case ts.SyntaxKind.EnumDeclaration:
        out += printers.declarations.enumDeclaration(name, this.raw);
        break;

      case ts.SyntaxKind.VariableStatement:
        for (const decl of this.raw.declarationList.declarations) {
          if (namespace && decl.name.kind === ts.SyntaxKind.Identifier) {
            const text = decl.name.text;

            _namespaceManager.default.registerProp(namespace, text);
          }
        }

        out += printers.declarations.variableDeclaration(this.raw);
        break;

      default:
        /*::;(this.raw.kind: empty)*/
        break;
    }

    return out;
  }

}

exports.default = Property;