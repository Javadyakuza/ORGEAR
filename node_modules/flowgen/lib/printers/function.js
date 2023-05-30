"use strict";

exports.__esModule = true;
exports.functionType = exports.functionDeclaration = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var printers = _interopRequireWildcard(require("./index"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const functionType = (func, dotAsReturn = false) => {
  const params = func.parameters.filter(param => !(ts.isIdentifier(param.name) && param.name.text === "this")).map(printers.common.parameter);
  const generics = printers.common.genericsWithoutDefault(func.typeParameters);
  const returns = func.type ? printers.node.printType(func.type) : "void";
  const firstPass = `${generics}(${params.join(", ")})${dotAsReturn ? ":" : " =>"} ${returns}`; // Make sure our functions aren't too wide

  if (firstPass.length > 80) {
    // break params onto a new line for better formatting
    const paramsWithNewlines = `\n${params.join(",\n")}`;
    return `${generics}(${paramsWithNewlines})${dotAsReturn ? ":" : " =>"} ${returns}`;
  }

  return firstPass;
};

exports.functionType = functionType;

const functionDeclaration = (nodeName, node) => {
  const exporter = printers.relationships.exporter(node);
  let name = nodeName;

  if (node.modifiers && node.modifiers.some(modifier => modifier.kind === ts.SyntaxKind.DefaultKeyword)) {
    name = nodeName === "INVALID NAME REF" ? "fn" : nodeName;
  } // each functionDeclaration gets it's own line


  const str = `declare ${exporter}function ${name}${functionType(node, true)}\n`;
  return str;
};

exports.functionDeclaration = functionDeclaration;