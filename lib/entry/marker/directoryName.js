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
            value: function isBefore(draggableEntry) {
                var before;
                var draggableEntryType = draggableEntry.getType();
                switch(draggableEntryType){
                    case _types.FILE_NAME_TYPE:
                        before = true;
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        var name = this.getName(), draggableEntryName = draggableEntry.getName();
                        before = name.localeCompare(draggableEntryName) < 0;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE1hcmtlckVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9tYXJrZXJcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgdHlwZSA9IERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFO1xuXG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gTWFya2VyRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVZLE9BQW9CO0lBRW9DLE1BQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFeEUsd0JBQXdCO2NBQXhCLHdCQUF3QjthQUF4Qix3QkFBd0I7OEJBQXhCLHdCQUF3Qjs7aUVBQXhCLHdCQUF3Qjt3REFDM0MsSUFBSSxHQUgwRSxNQUFhOzs7aUJBRXhFLHdCQUF3Qjs7WUFHM0MsR0FBUSxHQUFSLFFBQVE7NEJBQVIsUUFBUSxDQUFDLGNBQWM7b0JBQ2pCLE1BQU07b0JBRUosa0JBQWtCLEdBQUcsY0FBYyxDQUFDLE9BQU87dUJBRXpDLGtCQUFrQjt5QkFWa0QsTUFBYTt3QkFZckYsTUFBTSxHQUFHLElBQUk7O3lCQVoyRCxNQUFhOzRCQWlCL0UsSUFBSSxRQUFRLE9BQU8sSUFDbkIsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLE9BQU87d0JBRWpELE1BQU0sR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGtCQUFrQixJQUFJLENBQUM7Ozt1QkFLakQsTUFBTTs7Ozs7WUFPUixHQUFTLEdBQVQsU0FBUzs0QkFBVCxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVU7b0JBQzFCLElBQUksR0FqQ2tFLE1BQWEsNkJBa0NuRix3QkFBd0IsR0FwQ1YsT0FBb0IsU0FvQ0ssU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSTt1QkFFdkUsd0JBQXdCOzs7O1dBbENkLHdCQUF3QjtFQUpyQixPQUFvQjtnQkFJdkIsd0JBQXdCLEdBMEJwQyxpQkFBaUI7SUFDdEIsU0FBUyxHQUFFLGNBQWdCOztrQkEzQlYsd0JBQXdCIn0=