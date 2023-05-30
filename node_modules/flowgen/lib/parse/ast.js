"use strict";

exports.__esModule = true;
exports.getMembersFromNode = getMembersFromNode;
exports.stripDetailsFromTree = exports.parseNameFromNode = void 0;

var ts = _interopRequireWildcard(require("typescript"));

var _util = _interopRequireDefault(require("util"));

var logger = _interopRequireWildcard(require("../logger"));

var printers = _interopRequireWildcard(require("../printers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const inspect = Symbol.for("nodejs.util.inspect.custom");

const parseNameFromNode = node => {
  if (node.name && node.name.text) {
    return node.name.text;
  } else if (node.type && node.type.typeName) {
    return node.type.typeName.text;
  } else if (node.exportClause) {
    const names = [];
    ts.forEachChild(node.exportClause, child => {
      names.push(parseNameFromNode(child));
    });
    return names.join(",");
  } else if (node.importClause && node.importClause.namedBindings) {
    return parseNameFromNode(node.importClause.namedBindings);
  } else if (node.moduleSpecifier) {
    return node.moduleSpecifier.text;
  } else if (node.expression) {
    return printers.node.printType(stripDetailsFromTree(node.expression));
  } else if (node.declarationList) {
    const declarations = node.declarationList.declarations.map(stripDetailsFromTree).map(printers.node.printType).join(" ");
    return declarations;
  } else if (node.kind === ts.SyntaxKind.NamedImports) {
    const names = [];
    ts.forEachChild(node, child => {
      names.push(parseNameFromNode(child));
    });
    return names.join(",");
  } else if (ts.isIdentifier(node)) {
    /*
     * Parse name for NamespaceExport, please refer to the PR: https://github.com/joarwilk/flowgen/pull/131
     * Based on the test, seems it only affects NamespaceExport
     * May need someone to update the implementation later if there are any issues
     */
    if (node.escapedText && typeof node.escapedText === "string") {
      return node.escapedText;
    }
  }

  switch (node.kind) {
    case ts.SyntaxKind.FunctionDeclaration:
      logger.error(node.modifiers || node, {
        type: "MissingFunctionName"
      });
      break;

    default:
      console.log("INVALID NAME", ts.SyntaxKind[node.kind]);
      break;
  }

  return "INVALID NAME REF";
};

exports.parseNameFromNode = parseNameFromNode;

function inspectFn(depth, options) {
  const newOptions = Object.assign({}, options, {
    depth: options.depth == null ? null : options.depth - 1
  });

  if (depth < 0) {
    // eslint-disable-next-line no-unused-vars
    const {
      parent,
      symbol,
      localSymbol,
      ...rest
    } = this;
    delete rest[inspect];

    if (rest.kind) {
      return `${ts.SyntaxKind[rest.kind]} ${_util.default.inspect(rest, newOptions)}`;
    } else {
      return _util.default.inspect(rest, newOptions);
    }
  } // eslint-disable-next-line no-unused-vars


  const {
    parent,
    symbol,
    localSymbol,
    ...rest
  } = this;

  for (const key in rest) {
    if (Object.prototype.hasOwnProperty.call(rest, key) && typeof rest[key] === "object") {
      rest[key][inspect] = inspectFn.bind(rest[key]);
    }
  }

  delete rest[inspect];

  if (rest.kind) {
    return `${ts.SyntaxKind[rest.kind]} ${_util.default.inspect(rest, newOptions)}`;
  } else {
    return _util.default.inspect(rest, newOptions);
  }
} // Traverse a node and strip information we dont care about
// This is mostly to make debugging a bit less verbose


const stripDetailsFromTree = root => {
  for (const key in root) {
    const val = root[key];
    if (key === "parent") continue;
    if (key === "symbol") continue;
    if (key === "localSymbol") continue;
    if (typeof val === "function") continue;
    if (typeof val !== "object") continue;

    if (Object.prototype.hasOwnProperty.call(root, key) && typeof val === "object") {
      if (Array.isArray(val)) {
        root[key] = root[key].map(stripDetailsFromTree); // @ts-expect-error todo(flow->ts)

        root[key].pos = val.pos; // @ts-expect-error todo(flow->ts)

        root[key].end = val.end;
        root[key].assertHasRealPosition = root.assertHasRealPosition.bind(val);
        root[key].getStart = root.getStart.bind(val);
        root[key].getEnd = root.getEnd.bind(val);
      } else {
        root[key][inspect] = inspectFn.bind(val);
      }
    }
  }

  root[inspect] = inspectFn.bind(root);
  return root;
};

exports.stripDetailsFromTree = stripDetailsFromTree;

function getMembersFromNode(node) {
  if (node.members) {
    return node.members;
  }

  if (node.type && node.type.members) {
    return node.type.members;
  }

  console.log("NO MEMBERS_", ts.SyntaxKind[node.kind], node);
}