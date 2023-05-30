"use strict";

exports.__esModule = true;
exports.assignOptions = assignOptions;
exports.opts = opts;
exports.resetOptions = resetOptions;
const defaultOptions = Object.freeze({
  jsdoc: true,
  interfaceRecords: false,
  moduleExports: true,
  quiet: false,
  inexact: true
});
const options = { ...defaultOptions
};

function assignOptions(newOptions) {
  Object.assign(options, newOptions);
}

function resetOptions() {
  Object.assign(options, defaultOptions);
}

function opts() {
  return options;
}