"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _name = _interopRequireDefault(require("../../button/name"));
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  padding-left: 2.4rem;\n  background-image: url(\"css/image/directory.png\");\n  background-position: 0.3rem 0.6rem;\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var DirectoryNameButton = /*#__PURE__*/ function(NameButton) {
    _inherits(DirectoryNameButton, NameButton);
    function DirectoryNameButton() {
        _classCallCheck(this, DirectoryNameButton);
        return _possibleConstructorReturn(this, _getPrototypeOf(DirectoryNameButton).apply(this, arguments));
    }
    return DirectoryNameButton;
}(_name.default);
_defineProperty(DirectoryNameButton, "defaultProperties", {
    className: "directory"
});
var _default = (0, _easyWithStyle).default(DirectoryNameButton)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9idXR0b24vbmFtZS9kaXJlY3RvcnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZVwiO1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lQnV0dG9uIGV4dGVuZHMgTmFtZUJ1dHRvbiB7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9e1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnlcIlxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRGlyZWN0b3J5TmFtZUJ1dHRvbilgXG5cbiAgcGFkZGluZy1sZWZ0OiAyLjRyZW07XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImNzcy9pbWFnZS9kaXJlY3RvcnkucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwLjNyZW0gMC42cmVtO1xuXG5gO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVUsY0FBaUI7SUFFaEIsS0FBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBUUksNkhBTTlDOzs7Ozs7O0lBWk0sbUJBQW1CO2NBQW5CLG1CQUFtQjthQUFuQixtQkFBbUI7OEJBQW5CLG1CQUFtQjtnRUFBbkIsbUJBQW1COztXQUFuQixtQkFBbUI7RUFGRixLQUFtQjtnQkFFcEMsbUJBQW1CLEdBQ2hCLGlCQUFpQjtJQUN0QixTQUFTLEdBQUUsU0FBVzs7bUJBTkosY0FBaUIsVUFVZCxtQkFBbUIifQ==