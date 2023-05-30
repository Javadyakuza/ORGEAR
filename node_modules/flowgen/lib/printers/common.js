"use strict";

exports.__esModule = true;
exports.typeParameter = exports.parameter = exports.methodSignature = exports.literalType = exports.jsdoc = exports.genericsWithoutDefault = exports.generics = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var _options = require("../options");

var printers = _interopRequireWildcard(require("./index"));

var _env = require("../env");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const literalType = node => {
  if (node.literal) {
    if (node.literal.kind === ts.SyntaxKind.StringLiteral) {
      return printers.node.printType(node.literal);
    } else if (node.literal.text) {
      return node.literal.text;
    } else {
      return printers.node.printType(node.literal);
    }
  }

  if (node.type.typeName) {
    return node.type.typeName.text;
  }

  return printers.node.printType(node.type);
};

exports.literalType = literalType;

const typeParameter = node => {
  let defaultType = "";
  let constraint = "";

  if (node.constraint) {
    constraint = `: ${printers.node.printType(node.constraint)}`;
  }

  if (!node.withoutDefault && node.default) {
    defaultType = `= ${printers.node.printType(node.default)}`;
  }

  return `${node.name.text}${constraint}${defaultType}`;
};

exports.typeParameter = typeParameter;

const parameter = param => {
  let left = "";

  if (param.modifiers) {
    for (const modifier of param.modifiers) {
      if (modifier.kind === ts.SyntaxKind.ReadonlyKeyword) left += "+";
    }
  }

  if (param.kind === ts.SyntaxKind.SetAccessor) {
    left += "-";
  }

  let right;

  if (param.name.kind === ts.SyntaxKind.ObjectBindingPattern || param.name.kind === ts.SyntaxKind.ArrayBindingPattern) {
    left = `x`;
  } else {
    left += printers.node.printType(param.name);
  }

  if (!param.type) {
    if (param.name.kind === ts.SyntaxKind.ObjectBindingPattern) {
      if (param.name.elements.length > 0) {
        right = `{${param.name.elements.map(element => `${printers.node.printType(element)}: any`).join(", ")}}`;
      } else {
        right = "{}";
      }
    } else {
      right = "any";
    }
  } else {
    right = printers.node.printType(param.type);
  }

  if (param.questionToken && param.name.kind !== ts.SyntaxKind.ComputedPropertyName) {
    left += "?";
  }

  if (param.questionToken && param.name.kind === ts.SyntaxKind.ComputedPropertyName) {
    right = `(${right}) | void`;
  }

  if (ts.isParameter(param) && param.dotDotDotToken) {
    left = "..." + left;
  }

  return `${left}: ${right}`;
};

exports.parameter = parameter;

const methodSignature = param => {
  let left = "";
  let isMethod = true;

  if (param.modifiers) {
    for (const modifier of param.modifiers) {
      if (modifier.kind === ts.SyntaxKind.ReadonlyKeyword) {
        left += "+";
        isMethod = false;
      }
    }
  }

  left += printers.node.printType(param.name);
  let right;

  if (param.questionToken && param.name.kind !== ts.SyntaxKind.ComputedPropertyName) {
    left += "?";
    isMethod = false;
  }

  if (param.name.kind === ts.SyntaxKind.ComputedPropertyName) {
    isMethod = false;
  }

  right = printers.functions.functionType(param, isMethod);

  if (param.questionToken && param.name.kind === ts.SyntaxKind.ComputedPropertyName) {
    right = `(${right}) | void`;
  }

  return `${left}${isMethod ? "" : ": "}${right}`;
};

exports.methodSignature = methodSignature;

const generics = types => {
  if (types && typeof types.length !== "undefined") {
    return `<${types.map(printers.node.printType).join(", ")}>`;
  }

  return "";
};

exports.generics = generics;

const genericsWithoutDefault = types => {
  if (types && typeof types.length !== "undefined") {
    return `<${types.map(node => {
      node.withoutDefault = true;
      return printers.node.printType(node);
    }).join(", ")}>`;
  }

  return "";
};

exports.genericsWithoutDefault = genericsWithoutDefault;

const jsDocPrintTag = tag => {
  const typeNameValue = tag.typeExpression && tag.typeExpression.type;
  const parameterNameValue = tag.name || tag.preParameterName;
  const typeName = typeNameValue ? ` {${printers.node.printType(typeNameValue)}}` : "";
  const parameterName = parameterNameValue ? ` ${tag.isBracketed ? `[${printers.node.printType(parameterNameValue)}]` : printers.node.printType(parameterNameValue)}` : "";
  const comment = tag.comment ? ` ${tag.comment}`.replace(/\n/g, "\n * ") : "";

  if (typeNameValue && typeNameValue.kind === ts.SyntaxKind.JSDocTypeLiteral) {
    let output = `\n * @${tag.tagName.text}${typeName}${parameterName}${comment}`;

    for (const jsDocPropertyTag of typeNameValue.jsDocPropertyTags) {
      output += jsDocPrintTag(jsDocPropertyTag);
    }

    return output;
  }

  if (tag && tag.kind === ts.SyntaxKind.JSDocCallbackTag) {
    const parameterName = parameterNameValue ? printers.node.printType(parameterNameValue) : "";
    let output = `\n * @${tag.tagName.text} ${parameterName}${tag.comment}`;

    for (const param of tag.typeExpression.parameters) {
      output += jsDocPrintTag(param);
    }

    if (typeNameValue) output += jsDocPrintTag(typeNameValue);
    return output;
  }

  return `\n * @${tag.tagName.text}${typeName}${parameterName}${comment}`;
};
/** The node's jsdoc comments, if any and if the `jsdoc` option is enabled. */


const jsdoc = (0, _env.withEnv)((env, node) => {
  if (!(0, _options.opts)().jsdoc) return ""; // @ts-expect-error The jsDoc property is internal, on ts.JSDocContainer.

  const jsDoc = node.jsDoc;
  if (!jsDoc) return "";
  const blocks = jsDoc.map(doc => {
    const comment = (doc.comment ? `\n${doc.comment}` : "").replace(/\n/g, "\n * ");
    env.tsdoc = true;
    const tags = (doc.tags || []).map(jsDocPrintTag);
    env.tsdoc = false;
    return `/**${comment + tags.join("")}\n */\n`;
  }).join("");
  return `\n${blocks}`;
});
exports.jsdoc = jsdoc;