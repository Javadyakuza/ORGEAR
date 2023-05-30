"use strict";

exports.__esModule = true;
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _ast = require("../parse/ast");

var printers = _interopRequireWildcard(require("../printers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Node {
  constructor(node) {
    this.children = void 0;
    this.kind = void 0;
    this.name = void 0;
    this.raw = void 0;
    this.namespace = void 0;
    this.module = void 0;
    //$off
    this.children = Object.create(null);

    if (node !== null) {
      this.raw = (0, _ast.stripDetailsFromTree)(node);
      this.name = (0, _ast.parseNameFromNode)(node);
    }
  }

  addChild(name, node) {
    this.children[name] = node;
  } //TODO: remove this


  addChildren(name, node) {
    if (!this.children[name]) {
      this.children[name] = node;
      return;
    }

    if (this.children[name]) {
      for (const key in node.children) {
        this.children[name].addChildren(key, node.children[key]);
      }

      return;
    }
  }
  /**
   * Used for overloading the props of some types
   */


  maybeAddMember(members) {
    const rawMembers = this.raw.members;

    if (!rawMembers) {
      return;
    }

    if (Array.isArray(members)) {
      members.forEach(member => {
        rawMembers.push((0, _ast.stripDetailsFromTree)(member));
      });
    } else {
      rawMembers.push((0, _ast.stripDetailsFromTree)(members));
    }
  }

  getChildren() {
    return _lodash.default.toArray(this.children);
  } //eslint-disable-next-line


  print(namespace, module, depth) {
    return printers.node.printType(this.raw);
  }

}

var _default = Node;
exports.default = _default;