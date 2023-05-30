"use strict";

exports.__esModule = true;
exports.printErrorMessage = printErrorMessage;

var _typescript = require("typescript");

function printErrorMessage(error) {
  switch (error.type) {
    case "UnsupportedComputedProperty":
      return "Flow doesn't support computed property names";

    case "UnsupportedUniqueSymbol":
      return "Flow doesn't support `unique symbol`";

    case "UnsupportedConditionalType":
      return "Flow doesn't support conditional types, use `$Call` utility type";

    case "MissingFunctionName":
      return "Flow doesn't support unnamed functions";

    case "UnsupportedGlobalAugmentation":
      return "Flow doesn't support global augmentation";

    case "UnsupportedNestedModule":
      return "Flow doesn't support nested modules";

    case "UnsupportedTypeOperator":
      return `Unsupported type operator: ${_typescript.SyntaxKind[error.operator]}`;

    case "UnexpectedTsSyntax":
      return `Unexpected TypeScript syntax: ${error.description}. Please report this at https://github.com/joarwilk/flowgen/issues`;

    case "FlowgenInternalError":
      return `Flowgen internal error: ${error.description}. Please report this at https://github.com/joarwilk/flowgen/issues`;

    default:
      error;
      return "Unknown error. Please report this in https://github.com/joarwilk/flowgen/issues";
  }
}