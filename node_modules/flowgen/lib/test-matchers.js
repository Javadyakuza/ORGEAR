"use strict";

var _child_process = require("child_process");

var _chalk = _interopRequireDefault(require("chalk"));

var _flowBin = _interopRequireDefault(require("flow-bin"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

expect.extend({
  toBeValidFlowTypeDeclarations(source) {
    const beautifiedSource = (0, _.beautify)(source);

    try {
      (0, _child_process.execFileSync)(_flowBin.default, ["check-contents", "--all", "--color=always", "--timeout=30"], {
        input: beautifiedSource,
        stdio: ["pipe", "pipe", "pipe"]
      });
    } catch (err) {
      return {
        message: () => `expected ${_chalk.default.bold(beautifiedSource.trimEnd())} to be valid flow:\n${_chalk.default.red(err.stdout)}`,
        pass: false
      };
    }

    return {
      message: () => `expected ${_chalk.default.bold(beautifiedSource.trimEnd())} not to be valid flow`,
      pass: true
    };
  }

});