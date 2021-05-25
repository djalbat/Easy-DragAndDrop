"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _entry = _interopRequireDefault(require("../entry"));
var _draggable = _interopRequireDefault(require("../mixins/draggable"));
var _draggable1 = _interopRequireDefault(require("../mixins/entry/draggable"));
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
        "\n\n  .dragging {\n    z-index: 1;\n    position: fixed;\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var DraggableEntry = /*#__PURE__*/ function(Entry) {
    _inherits(DraggableEntry, Entry);
    function DraggableEntry() {
        _classCallCheck(this, DraggableEntry);
        return _possibleConstructorReturn(this, _getPrototypeOf(DraggableEntry).apply(this, arguments));
    }
    _createClass(DraggableEntry, [
        {
            key: "getPath",
            value: function getPath() {
                var explorer = this.getExplorer(), draggableEntry = this, path = explorer.retrieveDraggableEntryPath(draggableEntry);
                return path;
            }
        },
        {
            key: "getExplorer",
            value: function getExplorer() {
                var _properties = this.properties, explorer = _properties.explorer;
                return explorer;
            }
        },
        {
            key: "isOverlappingCollapsedBounds",
            value: function isOverlappingCollapsedBounds(collapsedBounds) {
                var bounds = this.getBounds(), overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);
                return overlappingCollapsedBounds;
            }
        },
        {
            key: "isTopmostDirectoryNameDraggableEntry",
            value: function isTopmostDirectoryNameDraggableEntry() {
                var topmostDirectoryNameDraggableEntry = false;
                var directoryNameDraggableEntry = this.isDirectoryNameDraggableEntry();
                if (directoryNameDraggableEntry) {
                    var directoryNameDraggableEntry1 = this, directoryNameDraggableEntryTopmost = directoryNameDraggableEntry1.isTopmost();
                    if (directoryNameDraggableEntryTopmost) {
                        topmostDirectoryNameDraggableEntry = true;
                    }
                }
                return topmostDirectoryNameDraggableEntry;
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.assignContext();
            }
        }
    ]);
    return DraggableEntry;
}(_entry.default);
_defineProperty(DraggableEntry, "tagName", "li");
_defineProperty(DraggableEntry, "defaultProperties", {
    className: "draggable"
});
_defineProperty(DraggableEntry, "ignoredProperties", [
    "explorer"
]);
Object.assign(DraggableEntry.prototype, _draggable.default);
Object.assign(DraggableEntry.prototype, _draggable1.default);
var _default = (0, _easyWithStyle).default(DraggableEntry)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBkcmFnZ2FibGVNaXhpbnMgZnJvbSBcIi4uL21peGlucy9kcmFnZ2FibGVcIjtcbmltcG9ydCBkcmFnZ2FibGVFbnRyeU1peGlucyBmcm9tIFwiLi4vbWl4aW5zL2VudHJ5L2RyYWdnYWJsZVwiO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwibGlcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRyYWdnYWJsZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiZXhwbG9yZXJcIlxuICBdO1xufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LnByb3RvdHlwZSwgZHJhZ2dhYmxlTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnkucHJvdG90eXBlLCBkcmFnZ2FibGVFbnRyeU1peGlucyk7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShEcmFnZ2FibGVFbnRyeSlgXG5cbiAgLmRyYWdnaW5nIHtcbiAgICB6LWluZGV4OiAxO1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgfVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVUsY0FBaUI7SUFFckIsTUFBVTtJQUNBLFVBQXFCO0lBQ2hCLFdBQTJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMkRuQixpRUFPekM7Ozs7Ozs7SUFoRU0sY0FBYztjQUFkLGNBQWM7YUFBZCxjQUFjOzhCQUFkLGNBQWM7Z0VBQWQsY0FBYzs7aUJBQWQsY0FBYzs7WUFDbEIsR0FBTyxHQUFQLE9BQU87NEJBQVAsT0FBTztvQkFDQyxRQUFRLFFBQVEsV0FBVyxJQUMzQixjQUFjLFNBQ2QsSUFBSSxHQUFHLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjO3VCQUV4RCxJQUFJOzs7O1lBR2IsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDWSxXQUFlLFFBQVYsVUFBVSxFQUE1QixRQUFRLEdBQUssV0FBZSxDQUE1QixRQUFRO3VCQUVULFFBQVE7Ozs7WUFHakIsR0FBNEIsR0FBNUIsNEJBQTRCOzRCQUE1Qiw0QkFBNEIsQ0FBQyxlQUFlO29CQUNwQyxNQUFNLFFBQVEsU0FBUyxJQUN2QiwwQkFBMEIsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGVBQWU7dUJBRWpFLDBCQUEwQjs7OztZQUduQyxHQUFvQyxHQUFwQyxvQ0FBb0M7NEJBQXBDLG9DQUFvQztvQkFDOUIsa0NBQWtDLEdBQUcsS0FBSztvQkFFeEMsMkJBQTJCLFFBQVEsNkJBQTZCO29CQUVsRSwyQkFBMkI7d0JBQ3ZCLDRCQUEyQixTQUMzQixrQ0FBa0MsR0FBRyw0QkFBMkIsQ0FBQyxTQUFTO3dCQUU1RSxrQ0FBa0M7d0JBQ3BDLGtDQUFrQyxHQUFHLElBQUk7Ozt1QkFJdEMsa0NBQWtDOzs7O1lBRzNDLEdBQVUsR0FBVixVQUFVOzRCQUFWLFVBQVU7cUJBQ0gsYUFBYTs7OztXQXhDaEIsY0FBYztFQUpGLE1BQVU7Z0JBSXRCLGNBQWMsR0EyQ1gsT0FBTyxJQUFHLEVBQUk7Z0JBM0NqQixjQUFjLEdBNkNYLGlCQUFpQjtJQUN0QixTQUFTLEdBQUUsU0FBVzs7Z0JBOUNwQixjQUFjLEdBaURYLGlCQUFpQjtLQUN0QixRQUFVOztBQUlkLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUF6RFYsVUFBcUI7QUEwRGpELE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFNBQVMsRUF6REwsV0FBMkI7bUJBSnRDLGNBQWlCLFVBK0RkLGNBQWMifQ==