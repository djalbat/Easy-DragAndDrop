"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _index = require("../index");
var _entries = _interopRequireDefault(require("./entries"));
var _fileName = _interopRequireDefault(require("./entry/drag/fileName"));
var _fileName1 = _interopRequireDefault(require("./entry/marker/fileName"));
var _directoryName = _interopRequireDefault(require("./entry/drag/directoryName"));
var _directoryName1 = _interopRequireDefault(require("./entry/marker/directoryName"));
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
        "\n\n  grid-area: explorer;\n  font-size: 1.2rem;\n  font-weight: bold;\n  font-family: monospace;\n  \n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var _default = (0, _easyWithStyle).default(function() {
    var _class = /*#__PURE__*/ function(Explorer) {
        _inherits(_class, Explorer);
        function _class() {
            _classCallCheck(this, _class);
            return _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
        }
        return _class;
    }(_index.Explorer);
    _defineProperty(_class, "Entries", _entries.default);
    _defineProperty(_class, "FileNameMarkerEntry", _fileName1.default);
    _defineProperty(_class, "FileNameDragEntry", _fileName.default);
    _defineProperty(_class, "DirectoryNameMarkerEntry", _directoryName1.default);
    _defineProperty(_class, "DirectoryNameDragEntry", _directoryName.default);
    return _class;
}())(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL2V4cGxvcmVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgeyBFeHBsb3JlciB9IGZyb20gXCIuLi9pbmRleFwiOyAgLy8vXG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ0VudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWcvZGlyZWN0b3J5TmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoY2xhc3MgZXh0ZW5kcyBFeHBsb3JlciB7XG4gIHN0YXRpYyBFbnRyaWVzID0gRW50cmllcztcblxuICBzdGF0aWMgRmlsZU5hbWVNYXJrZXJFbnRyeSA9IEZpbGVOYW1lTWFya2VyRW50cnk7XG5cbiAgc3RhdGljIEZpbGVOYW1lRHJhZ0VudHJ5ID0gRmlsZU5hbWVEcmFnRW50cnk7XG5cbiAgc3RhdGljIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IERpcmVjdG9yeU5hbWVEcmFnRW50cnk7XG59KWBcblxuICBncmlkLWFyZWE6IGV4cGxvcmVyO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG4gIFxuYDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRWQsTUFBVTtJQUVmLFFBQVc7SUFDRCxTQUF1QjtJQUNyQixVQUF5QjtJQUN0QixjQUE0QjtJQUMxQixlQUE4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FZaEUsdUdBT0g7Ozs7Ozs7bUJBM0JzQixjQUFpQjs7Ozs7Ozs7TUFFZCxNQUFVOzZCQVMxQixPQUFPLEdBUEksUUFBVzs2QkFTdEIsbUJBQW1CLEdBUEksVUFBeUI7NkJBU2hELGlCQUFpQixHQVZJLFNBQXVCOzZCQVk1Qyx3QkFBd0IsR0FUSSxlQUE4Qjs2QkFXMUQsc0JBQXNCLEdBWkksY0FBNEIifQ==