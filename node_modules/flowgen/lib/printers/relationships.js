"use strict";

exports.__esModule = true;
exports.namespaceProp = exports.namespace = exports.moduleExports = exports.importExportSpecifier = exports.exporter = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var _options = require("../options");

var _namespaceManager = _interopRequireDefault(require("../namespace-manager"));

var printers = _interopRequireWildcard(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const moduleExports = node => {
  const name = printers.node.printType(node.expression);

  if (node.isExportEquals && (0, _options.opts)().moduleExports) {
    return `declare module.exports: typeof ${name}\n`;
  } else {
    return `declare export default typeof ${name}\n`;
  }
};

exports.moduleExports = moduleExports;

const exporter = node => {
  let str = "";

  if (node.modifiers && node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword)) {
    str += "export ";
  }

  if (node.modifiers && node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) {
    str += "default ";
  }

  return str;
};

exports.exporter = exporter;

const importExportSpecifier = node => {
  if (node.propertyName) {
    return `${printers.node.printType(node.propertyName)} as ${printers.node.printType(node.name)}`;
  }

  return printers.node.printType(node.name);
}; // TODO: move import here
// export const imports = (node: ImportNode, moduleName: string): string => {
//   let str = "import type ";
//   if (node.default) {
//     str += node.default;
//     if (node.explicit.length) {
//       str += ", ";
//     }
//   }
//   if (node.explicit.length) {
//     str += `{ ${node.explicit.join(", ")} }`;
//   }
//   str += ` from '${moduleName}'`;
//   return str;
// };


exports.importExportSpecifier = importExportSpecifier;

const namespace = (name, hidePunctuation = false) => {
  if (_namespaceManager.default.nsExists(name)) {
    return `${name}${hidePunctuation ? "" : "$"}`;
  }

  return name + (hidePunctuation ? "" : ".");
};

exports.namespace = namespace;

const namespaceProp = (name, hidePunctuation = false) => {
  if (_namespaceManager.default.nsPropExists(name)) {
    return `${_namespaceManager.default.getNSForProp(name)}${hidePunctuation ? "" : "$"}${name}`;
  }

  return name;
};

exports.namespaceProp = namespaceProp;