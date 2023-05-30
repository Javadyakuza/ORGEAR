"use strict";

exports.__esModule = true;
exports.print = void 0;

var printers = _interopRequireWildcard(require("./index"));

var _options = require("../options");

var _env = require("../env");

var _typescript = _interopRequireDefault(require("typescript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Please add only built-in type references
const Record = ([key, value], isInexact = (0, _options.opts)().inexact) => {
  const valueType = printers.node.printType(value);

  switch (key.kind) {
    case _typescript.default.SyntaxKind.LiteralType:
      return `{ ${printers.node.printType(key)}: ${valueType}${isInexact ? ", ..." : ""}}`;

    case _typescript.default.SyntaxKind.UnionType:
      if (key.types.every(t => t.kind === _typescript.default.SyntaxKind.LiteralType)) {
        const fields = key.types.reduce((acc, t) => {
          acc += `${printers.node.printType(t)}: ${valueType},\n`;
          return acc;
        }, "");
        return `{ ${fields}${isInexact ? "..." : ""}}`;
      }

    // Fallthrough

    default:
      return `{[key: ${printers.node.printType(key)}]: ${valueType}${isInexact ? ", ..." : ""}}`;
  }
};

const identifiers = {
  ReadonlyArray: "$ReadOnlyArray",
  ReadonlySet: "$ReadOnlySet",
  ReadonlyMap: "$ReadOnlyMap",
  Readonly: "$ReadOnly",
  RegExpMatchArray: "RegExp$matchResult",
  NonNullable: "$NonMaybeType",
  Partial: ([type]) => {
    const isInexact = (0, _options.opts)().inexact;
    return `$Rest<${printers.node.printType(type)}, {${isInexact ? "..." : ""}}>`;
  },
  ReturnType: typeArguments => {
    return `$Call<<R>((...args: any[]) => R) => R, ${printers.node.printType(typeArguments[0])}>`;
  },
  Record,
  Omit: ([obj, keys]) => {
    return `$Diff<${printers.node.printType(obj)},${Record([keys, {
      kind: _typescript.default.SyntaxKind.AnyKeyword
    }], false)}>`;
  }
};
const print = (0, _env.withEnv)((env, kind) => {
  if (env.classHeritage) return kind;
  return Object.prototype.hasOwnProperty.call(identifiers, kind) ? identifiers[kind] : kind;
});
exports.print = print;