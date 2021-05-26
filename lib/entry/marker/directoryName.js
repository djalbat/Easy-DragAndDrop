"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _marker = _interopRequireDefault(require("../../entry/marker"));
var _types = require("../../types");
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
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var DirectoryNameMarkerEntry = /*#__PURE__*/ function(MarkerEntry) {
    _inherits(DirectoryNameMarkerEntry, MarkerEntry);
    function DirectoryNameMarkerEntry() {
        _classCallCheck(this, DirectoryNameMarkerEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectoryNameMarkerEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.DIRECTORY_NAME_MARKER_TYPE);
        return _this;
    }
    _createClass(DirectoryNameMarkerEntry, [
        {
            key: "isBefore",
            value: function isBefore(dragEntry) {
                var before;
                var dragEntryType = dragEntry.getType();
                switch(dragEntryType){
                    case _types.FILE_NAME_TYPE:
                        before = true;
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        var name = this.getName(), dragEntryName = dragEntry.getName();
                        before = name.localeCompare(dragEntryName) < 0;
                        break;
                }
                return before;
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var type = _types.DIRECTORY_NAME_MARKER_TYPE, directoryNameMarkerEntry = _marker.default.fromClass(Class, properties, type);
                return directoryNameMarkerEntry;
            }
        }
    ]);
    return DirectoryNameMarkerEntry;
}(_marker.default);
_defineProperty(DirectoryNameMarkerEntry, "defaultProperties", {
    className: "directory-name"
});
exports.default = DirectoryNameMarkerEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE1hcmtlckVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9tYXJrZXJcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgdHlwZSA9IERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFO1xuXG4gIGlzQmVmb3JlKGRyYWdFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnRW50cnlUeXBlID0gZHJhZ0VudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ0VudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdFbnRyeU5hbWUgPSBkcmFnRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ0VudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFWSxPQUFvQjtJQUVvQyxNQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRXhFLHdCQUF3QjtjQUF4Qix3QkFBd0I7YUFBeEIsd0JBQXdCOzhCQUF4Qix3QkFBd0I7O2lFQUF4Qix3QkFBd0I7d0RBQzNDLElBQUksR0FIMEUsTUFBYTs7O2lCQUV4RSx3QkFBd0I7O1lBRzNDLEdBQVEsR0FBUixRQUFROzRCQUFSLFFBQVEsQ0FBQyxTQUFTO29CQUNaLE1BQU07b0JBRUosYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPO3VCQUUvQixhQUFhO3lCQVZ1RCxNQUFhO3dCQVlyRixNQUFNLEdBQUcsSUFBSTs7eUJBWjJELE1BQWE7NEJBaUIvRSxJQUFJLFFBQVEsT0FBTyxJQUNuQixhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU87d0JBRXZDLE1BQU0sR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsSUFBSSxDQUFDOzs7dUJBSzVDLE1BQU07Ozs7O1lBT1IsR0FBUyxHQUFULFNBQVM7NEJBQVQsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVO29CQUMxQixJQUFJLEdBakNrRSxNQUFhLDZCQWtDbkYsd0JBQXdCLEdBcENWLE9BQW9CLFNBb0NLLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUk7dUJBRXZFLHdCQUF3Qjs7OztXQWxDZCx3QkFBd0I7RUFKckIsT0FBb0I7Z0JBSXZCLHdCQUF3QixHQTBCcEMsaUJBQWlCO0lBQ3RCLFNBQVMsR0FBRSxjQUFnQjs7a0JBM0JWLHdCQUF3QiJ9