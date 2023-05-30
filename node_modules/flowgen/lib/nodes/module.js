"use strict";

exports.__esModule = true;
exports.default = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var logger = _interopRequireWildcard(require("../logger"));

var _node = _interopRequireDefault(require("./node"));

var _namespace = _interopRequireDefault(require("./namespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Module extends _node.default {
  constructor(node, name) {
    super(node);
    this.name = void 0;
    this.name = name;
  }

  addChild(name, child) {
    child.module = this.name;
    this.children[name] = child;
  }

  addChildren(name, child) {
    child.module = this.name;

    if (child instanceof _namespace.default && this.children[child.name] && this.children[child.name].raw && this.children[child.name].raw.kind === ts.SyntaxKind.ClassDeclaration) {
      name = child.name;
    }

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

  print(namespace, module, depth = 0) {
    const children = this.getChildren().map(child => {
      return child.print(undefined, this.name, depth + 1);
    }).join("\n\t");
    const node = `
    declare module '${this.name}' {
      ${children}
    }
    `;

    if (module !== undefined && depth === 1) {
      logger.error(this.raw, {
        type: "UnsupportedNestedModule"
      });
      return `/* ${node} */\n`;
    }

    return `${node}\n`;
  }

}

exports.default = Module;