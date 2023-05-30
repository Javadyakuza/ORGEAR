"use strict";

exports.__esModule = true;
exports.default = void 0;

var _typescript = require("typescript");

var printers = _interopRequireWildcard(require("../printers"));

var _node = _interopRequireDefault(require("./node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class ExportDeclaration extends _node.default {
  constructor(node) {
    super(node);
  }

  print() {
    //TODO: move to printers
    if (this.raw.exportClause) {
      const isTypeImport = this.raw.isTypeOnly;
      let specifier = "";
      if (this.raw.moduleSpecifier) specifier = `from '${this.raw.moduleSpecifier.text}';`;

      if ((0, _typescript.isNamespaceExport)(this.raw.exportClause)) {
        return `declare export * as ${this.raw.exportClause.name.escapedText} ${specifier}\n`;
      } // split exports into type and value exports


      const rawElements = this.raw.exportClause.elements;
      let typeExports, valueExports;

      if (isTypeImport) {
        typeExports = rawElements;
        valueExports = [];
      } else {
        typeExports = [];
        valueExports = [];
        let nextIsType = false;

        for (const node of rawElements) {
          if (nextIsType) {
            typeExports.push(node);
            nextIsType = false;
          } else if (node.name.originalKeywordKind === 150) {
            nextIsType = true;
          } else {
            valueExports.push(node);
          }
        }
      }

      const generateOutput = (prefix, elems) => {
        return `${prefix} {
          ${elems.map(node => printers.node.printType(node))}
        }${specifier}\n`;
      };

      let result = "";

      if (typeExports.length) {
        result += generateOutput(`export type`, typeExports);
      }

      if (valueExports.length) {
        result += generateOutput(`declare export`, valueExports);
      }

      return result;
    } else {
      return `declare export * from '${this.raw.moduleSpecifier.text}';\n`;
    }
  }

}

exports.default = ExportDeclaration;