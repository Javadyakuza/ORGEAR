#!/usr/bin/env node
"use strict";

var _runner = _interopRequireDefault(require("./runner"));

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require("../../package.json");

_commander.default.version(pkg.version).option("-o --output-file [outputFile]", "name for output file, defaults to export.flow.js", "export.flow.js").option("--no-module-exports", "use only default exports").option("--interface-records", "exact records instead of interfaces in output").option("--quiet", "output without logs").option("--no-jsdoc", "output without jsdoc").option("--no-inexact", "output without inexact types").option("--flow-typed-format [dirname]", "format output for flow-typed").option("--add-flow-header", "adds '// @flow' to the generated files (for libs)").option("--compile-tests", "compile any <filename>-tests.ts files found").option("--as-module [asModule]", "wrap the output as a module declaration (for libs)").arguments("[files...]").action((files, options) => {
  (0, _runner.default)({
    interfaceRecords: options.interfaceRecords,
    moduleExports: options.moduleExports,
    jsdoc: options.jsdoc,
    quiet: options.quiet,
    inexact: options.inexact,
    flowTypedFormat: options.flowTypedFormat,
    addFlowHeader: options.addFlowHeader,
    compileTests: options.compileTests,
    out: options.outputFile,
    version: pkg.version,
    asModule: options.asModule
  }).compile(files);
});

_commander.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander.default.outputHelp();
}