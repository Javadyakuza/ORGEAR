"use strict";

exports.__esModule = true;
exports.recursiveWalkTree = recursiveWalkTree;

var ts = _interopRequireWildcard(require("typescript"));

var _factory = _interopRequireDefault(require("../nodes/factory"));

var _ast = require("./ast");

var logger = _interopRequireWildcard(require("../logger"));

var _checker = require("../checker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const collectNode = (node, context, factory) => {
  (0, _ast.stripDetailsFromTree)(node);

  switch (node.kind) {
    case ts.SyntaxKind.ModuleDeclaration:
      if (node.flags === 4098 || (node.flags & ts.NodeFlags.Namespace) === ts.NodeFlags.Namespace) {
        if ((node.flags & ts.NodeFlags.GlobalAugmentation) === ts.NodeFlags.GlobalAugmentation) {
          logger.error(node, {
            type: "UnsupportedGlobalAugmentation"
          });
          const globalAugmentation = factory.createModuleNode(node, node.name.text);
          context.addChild("module" + node.name.text, globalAugmentation);
          traverseNode(node.body, globalAugmentation, factory);
          break;
        }

        const namespace = factory.createNamespaceNode(node, node.name.text, context);
        traverseNode(node.body, namespace, factory);
        context.addChildren("namespace" + node.name.text, namespace);
        break;
      } else {
        const module = factory.createModuleNode(node, node.name.text);
        context.addChild("module" + node.name.text, module);
        traverseNode(node.body, module, factory);
        break;
      }

    case ts.SyntaxKind.FunctionDeclaration:
      // TODO: rewrite this
      factory.createFunctionDeclaration(node, (0, _ast.parseNameFromNode)(node), context);
      break;

    case ts.SyntaxKind.InterfaceDeclaration:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createPropertyNode(node, (0, _ast.parseNameFromNode)(node), context));
      break;

    case ts.SyntaxKind.TypeAliasDeclaration:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createPropertyNode(node, (0, _ast.parseNameFromNode)(node), context));
      break;

    case ts.SyntaxKind.ClassDeclaration:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createPropertyNode(node));
      break;

    case ts.SyntaxKind.VariableStatement:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createPropertyNode(node));
      break;

    case ts.SyntaxKind.ExportAssignment:
      context.addChild("exportassign" + (0, _ast.parseNameFromNode)(node), factory.createExportNode(node));
      break;

    case ts.SyntaxKind.ImportDeclaration:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createImportNode(node));
      break;

    case ts.SyntaxKind.ExportDeclaration:
      context.addChild("exportdecl" + (0, _ast.parseNameFromNode)(node), factory.createExportDeclarationNode(node));
      break;

    case ts.SyntaxKind.ImportEqualsDeclaration:
      // see transformers
      break;

    case ts.SyntaxKind.NamespaceExportDeclaration:
      // TODO: unimplemented;
      break;

    case ts.SyntaxKind.EnumDeclaration:
      context.addChild((0, _ast.parseNameFromNode)(node), factory.createPropertyNode(node));
      break;

    case ts.SyntaxKind.EmptyStatement:
      // This should be empty
      break;

    default:
      console.log("Missing node parse", ts.SyntaxKind[node.kind]);
  }
}; // Walk the AST and extract all the definitions we care about


const traverseNode = (node, context, factory) => {
  if (!node.statements) {
    collectNode(node, context, factory);
  } else {
    node.statements.forEach(n => collectNode(n, context, factory));
  }
};

function findDuplicatedSymbolsAndUsedNames(node) {
  if (ts.isIdentifier(node)) {
    const s = _checker.checker.current.getSymbolAtLocation(node);

    if (!s) {
      return [[], []];
    }

    if (ts.isTypeAliasDeclaration(node.parent) && s.declarations.length > 1) {
      return [[s], [s.getName()]];
    } else {
      return [[], [s.getName()]];
    }
  }

  const childResult = [[], []];
  ts.forEachChild(node, child => {
    ts.visitNode(child, n => {
      const r = findDuplicatedSymbolsAndUsedNames(n);
      const duplicatedSymbols = r[0];
      const names = r[1];
      childResult[0].push(...duplicatedSymbols);
      childResult[1].push(...names);
      return n;
    });
  });
  return childResult;
}

function generateUniqueName(name, usedNames) {
  if (!usedNames.has(name)) {
    return name;
  }

  let i = 1; // Just make sure we won't endup with infinite loop

  while (i < 10000) {
    const r = `${name}${i}`;

    if (!usedNames.has(r)) {
      return r;
    }

    i++;
  }

  return name;
}

function createMakeNameCompatibleWithFlowTransformer(duplicatedSymbols, usedNames) {
  const renameMap = new Map();

  function makeNameCompatibleWithFlowTransformer(context) {
    const {
      factory
    } = context;

    const visitor = node => {
      if (ts.isTypeAliasDeclaration(node)) {
        const s = _checker.checker.current.getSymbolAtLocation(node.name);

        if (duplicatedSymbols.has(s)) {
          var _renameMap$get;

          const id = (_renameMap$get = renameMap.get(s)) != null ? _renameMap$get : factory.createIdentifier(generateUniqueName(`${s.getName()}Type`, usedNames));
          renameMap.set(s, id);
          return factory.createTypeAliasDeclaration(node.decorators, node.modifiers, id, node.typeParameters, node.type);
        }
      }

      if (ts.isTypeReferenceNode(node)) {
        if (ts.isIdentifier(node.typeName)) {
          const s = _checker.checker.current.getSymbolAtLocation(node.typeName);

          if (duplicatedSymbols.has(s)) {
            var _renameMap$get2;

            const id = (_renameMap$get2 = renameMap.get(s)) != null ? _renameMap$get2 : factory.createIdentifier(generateUniqueName(`${s.getName()}Type`, usedNames));
            renameMap.set(s, id);
            return factory.createTypeReferenceNode(id.text, node.typeArguments);
          }
        }
      }

      if (!ts.isIdentifier(node)) {
        return ts.visitEachChild(node, visitor, context);
      }

      return node;
    };

    return visitor;
  }

  return makeNameCompatibleWithFlowTransformer;
} // In TypeScript you can have the same name for a variable and a type but not in FlowJs


function makeNameCompatibleWithFlow(ast) {
  const [duplicatedSymbols, usedNames] = findDuplicatedSymbolsAndUsedNames(ast);
  return ts.transform(ast, [createMakeNameCompatibleWithFlowTransformer(new Set(duplicatedSymbols), new Set(usedNames))]).transformed[0];
}

function recursiveWalkTree(ast) {
  const factory = _factory.default.create();

  const root = factory.createModuleNode(null, "root");
  traverseNode(makeNameCompatibleWithFlow(ast), root, factory);
  return root;
}