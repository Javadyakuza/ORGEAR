"use strict";

exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _typescript = _interopRequireWildcard(require("typescript"));

var _typescriptCompiler = _interopRequireDefault(require("typescript-compiler"));

var _namespaceManager = _interopRequireDefault(require("../namespace-manager"));

var _options = require("../options");

var _checker = require("../checker");

var logger = _interopRequireWildcard(require("../logger"));

var _env = require("../env");

var _transformers = require("../parse/transformers");

var _parse = require("../parse");

var _node = require("../printers/node");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const compile = (0, _env.withEnv)((env, sourceFile) => {
  const rootNode = (0, _parse.recursiveWalkTree)(sourceFile);
  const output = rootNode.getChildren().map(child => {
    return child.print();
  }).join("");
  const helpersOutputs = (0, _node.printFlowGenHelper)(env);
  return `${helpersOutputs}\n\n${output}`;
});

const reset = options => {
  (0, _options.resetOptions)();

  if (options) {
    (0, _options.assignOptions)(options);
  }

  _namespaceManager.default.reset();
};

const compilerOptions = {
  noLib: true,
  target: _typescript.ScriptTarget.Latest
};

const getTransformers = options => [(0, _transformers.legacyModules)(), (0, _transformers.importEqualsTransformer)(), (0, _transformers.declarationFileTransform)(options), (0, _transformers.importTypeToImportDeclaration)()];

const transformFile = (fileName, sourceText, languageVersion, options) => {
  const transformedAst = (0, _typescript.transform)( //$todo Flow has problems when switching variables instead of literals
  (0, _typescript.createSourceFile)(fileName, sourceText, languageVersion, true), getTransformers(options), compilerOptions).transformed[0];

  const transformedText = _typescript.default.createPrinter().printFile(transformedAst);

  return (0, _typescript.createSourceFile)(fileName, transformedText, languageVersion, true);
};
/**
 * Compiles typescript files
 */


var _default = {
  reset,
  compile: compile.withEnv({}),

  setChecker(typeChecker) {
    _checker.checker.current = typeChecker;
  },

  getTransformers(options) {
    return getTransformers(options);
  },

  compileTest: (testPath, target) => {
    _typescriptCompiler.default.compile(testPath, "--module commonjs -t ES6 --out " + target);
  },
  compileDefinitionString: (string, options) => {
    reset(options);
    const compilerHost = (0, _typescript.createCompilerHost)({}, true);
    const oldSourceFile = compilerHost.getSourceFile;

    compilerHost.getSourceFile = (file, languageVersion) => {
      if (file === "file.ts") {
        return transformFile("/dev/null", string, languageVersion, options);
      }

      return oldSourceFile(file, languageVersion);
    };

    const program = (0, _typescript.createProgram)(["file.ts"], compilerOptions, compilerHost);
    _checker.checker.current = program.getTypeChecker();
    const sourceFile = program.getSourceFile("file.ts");
    if (!sourceFile) return "";
    logger.setSourceFile(sourceFile);
    return compile.withEnv({})(sourceFile);
  },
  compileDefinitionFile: (definitionPath, options, mapSourceCode = a => a) => {
    reset(options);
    const compilerHost = (0, _typescript.createCompilerHost)({}, true);
    const oldSourceFile = compilerHost.getSourceFile;
    const oldReadFile = compilerHost.readFile;

    compilerHost.readFile = fileName => mapSourceCode(oldReadFile(fileName), fileName);

    const absolutePath = _path.default.resolve(definitionPath);

    compilerHost.getSourceFile = (file, languageVersion) => {
      if (_path.default.resolve(file) === absolutePath) {
        const sourceText = compilerHost.readFile(file);
        return transformFile(file, sourceText, languageVersion, options);
      }

      return oldSourceFile(file, languageVersion);
    };

    const program = (0, _typescript.createProgram)([definitionPath], compilerOptions, compilerHost);
    _checker.checker.current = program.getTypeChecker();
    const sourceFile = program.getSourceFile(definitionPath);
    if (!sourceFile) return "";
    logger.setSourceFile(sourceFile);
    return compile.withEnv({})(sourceFile);
  },
  compileDefinitionFiles: (definitionPaths, options, mapSourceCode = a => a) => {
    const compilerHost = (0, _typescript.createCompilerHost)({}, true);
    const oldSourceFile = compilerHost.getSourceFile;
    const oldReadFile = compilerHost.readFile;

    compilerHost.readFile = fileName => mapSourceCode(oldReadFile(fileName), fileName);

    const absolutePaths = new Set(definitionPaths.map(p => _path.default.resolve(p)));

    compilerHost.getSourceFile = (file, languageVersion) => {
      if (absolutePaths.has(_path.default.resolve(file))) {
        const sourceText = compilerHost.readFile(file);
        return transformFile(file, sourceText, languageVersion, options);
      }

      return oldSourceFile(file, languageVersion);
    };

    const program = (0, _typescript.createProgram)(definitionPaths, compilerOptions, compilerHost);
    _checker.checker.current = program.getTypeChecker();
    return definitionPaths.map(definitionPath => {
      const sourceFile = program.getSourceFile(definitionPath);
      if (!sourceFile) return [definitionPath, ""];
      logger.setSourceFile(sourceFile);
      reset(options);
      return [definitionPath, compile.withEnv({})(sourceFile)];
    });
  }
};
exports.default = _default;