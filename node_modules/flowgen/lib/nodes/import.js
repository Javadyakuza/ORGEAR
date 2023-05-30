"use strict";

exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(require("./node"));

var printers = _interopRequireWildcard(require("../printers"));

var _checker = require("../checker");

var ts = _interopRequireWildcard(require("typescript"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Import extends _node.default {
  constructor(node) {
    super(node);
  }

  print() {
    //TODO: move to printers
    if (this.raw.importClause) {
      const bindings = this.raw.importClause.namedBindings;
      const name = this.raw.importClause.name;
      const isTypeImport = this.raw.importClause.isTypeOnly; // in Typescript, you can use "import type" on an enum
      // however, flowgen converts typescript enums to regular objects
      // so that means "import type" would fail on them (can't import type a regular object)
      // instead, we mimic this by using the import { typeof } notation

      const splitTypeImports = elements => {
        const enumElems = [];
        const regularElems = [];

        for (const elem of elements) {
          // if we're not using import type, no need to do anything special
          if (!isTypeImport) {
            regularElems.push(elem);
            continue;
          }

          const elemSymbol = _checker.checker.current.getTypeAtLocation(elem).symbol;

          const isEnum = elemSymbol && elemSymbol.declarations && elemSymbol.declarations[0].kind === ts.SyntaxKind.EnumDeclaration;

          if (isEnum) {
            enumElems.push(elem);
          } else {
            regularElems.push(elem);
          }
        }

        return {
          enumElems,
          regularElems
        };
      };

      if (name && bindings) {
        const elements = bindings.elements;

        if (elements) {
          const {
            enumElems,
            regularElems
          } = splitTypeImports(elements);
          let result = "";

          if (regularElems.length > 0) {
            result += `import${this.module === "root" && !isTypeImport ? "" : " type"} ${name.text}, {
            ${elements.map(node => printers.node.printType(node))}
            } from '${this.raw.moduleSpecifier.text}';\n`;
          }

          if (enumElems.length > 0) {
            result += `import typeof ${name.text}, {
              ${elements.map(node => printers.node.printType(node))}
            } from '${this.raw.moduleSpecifier.text}';\n`;
          }

          return result;
        } else {
          const namespace = bindings.name.text;
          return `import${this.module === "root" ? "" : " typeof"} ${name.text}, * as ${namespace} from '${this.raw.moduleSpecifier.text}';\n`;
        }
      }

      if (name) {
        return `import${this.module === "root" ? "" : " typeof"} ${name.text} from '${this.raw.moduleSpecifier.text}';\n`;
      }

      if (bindings) {
        const elements = bindings.elements;

        if (elements) {
          const {
            enumElems,
            regularElems
          } = splitTypeImports(elements);
          let result = "";

          if (regularElems.length > 0) {
            result += `import${this.module === "root" && !isTypeImport ? "" : " type"} {
            ${regularElems.map(node => printers.node.printType(node))}
            } from '${this.raw.moduleSpecifier.text}';\n`;
          }

          if (enumElems.length > 0) {
            result += `import typeof {
              ${enumElems.map(node => printers.node.printType(node))}
            } from '${this.raw.moduleSpecifier.text}';\n`;
          }

          return result;
        } else {
          const name = bindings.name.text;
          return `import${this.module === "root" ? "" : " typeof"} * as ${name} from '${this.raw.moduleSpecifier.text}';\n`;
        }
      }
    }

    return this.module === "root" ? `import '${this.raw.moduleSpecifier.text}';\n` : "";
  }

}

exports.default = Import;