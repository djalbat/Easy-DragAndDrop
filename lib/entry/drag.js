"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _entry = _interopRequireDefault(require("../entry"));
var _drag = _interopRequireDefault(require("../mixins/drag"));
var _drag1 = _interopRequireDefault(require("../mixins/entry/drag"));
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
var DragEntry = /*#__PURE__*/ function(Entry) {
    _inherits(DragEntry, Entry);
    function DragEntry() {
        _classCallCheck(this, DragEntry);
        return _possibleConstructorReturn(this, _getPrototypeOf(DragEntry).apply(this, arguments));
    }
    _createClass(DragEntry, [
        {
            key: "getPath",
            value: function getPath() {
                var explorer = this.getExplorer(), dragEntry = this, path = explorer.retrieveDragEntryPath(dragEntry);
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
            key: "isTopmostDirectoryNameDragEntry",
            value: function isTopmostDirectoryNameDragEntry() {
                var topmostDirectoryNameDragEntry = false;
                var directoryNameDragEntry = this.isDirectoryNameDragEntry();
                if (directoryNameDragEntry) {
                    var directoryNameDragEntry1 = this, directoryNameDragEntryTopmost = directoryNameDragEntry1.isTopmost();
                    if (directoryNameDragEntryTopmost) {
                        topmostDirectoryNameDragEntry = true;
                    }
                }
                return topmostDirectoryNameDragEntry;
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.assignContext();
            }
        }
    ]);
    return DragEntry;
}(_entry.default);
_defineProperty(DragEntry, "tagName", "li");
_defineProperty(DragEntry, "defaultProperties", {
    className: "drag"
});
_defineProperty(DragEntry, "ignoredProperties", [
    "explorer"
]);
Object.assign(DragEntry.prototype, _drag.default);
Object.assign(DragEntry.prototype, _drag1.default);
var _default = (0, _easyWithStyle).default(DragEntry)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4uL2VudHJ5XCI7XG5pbXBvcnQgZHJhZ01peGlucyBmcm9tIFwiLi4vbWl4aW5zL2RyYWdcIjtcbmltcG9ydCBkcmFnRW50cnlNaXhpbnMgZnJvbSBcIi4uL21peGlucy9lbnRyeS9kcmFnXCI7XG5cbmNsYXNzIERyYWdFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ0VudHJ5UGF0aChkcmFnRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnRW50cnkoKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ0VudHJ5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZHJhZ1wiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiZXhwbG9yZXJcIlxuICBdO1xufVxuXG5PYmplY3QuYXNzaWduKERyYWdFbnRyeS5wcm90b3R5cGUsIGRyYWdNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihEcmFnRW50cnkucHJvdG90eXBlLCBkcmFnRW50cnlNaXhpbnMpO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRHJhZ0VudHJ5KWBcblxuICAuZHJhZ2dpbmcge1xuICAgIHotaW5kZXg6IDE7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICB9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxjQUFpQjtJQUVyQixNQUFVO0lBQ0wsS0FBZ0I7SUFDWCxNQUFzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTJEZCxpRUFPcEM7Ozs7Ozs7SUFoRU0sU0FBUztjQUFULFNBQVM7YUFBVCxTQUFTOzhCQUFULFNBQVM7Z0VBQVQsU0FBUzs7aUJBQVQsU0FBUzs7WUFDYixHQUFPLEdBQVAsT0FBTzs0QkFBUCxPQUFPO29CQUNDLFFBQVEsUUFBUSxXQUFXLElBQzNCLFNBQVMsU0FDVCxJQUFJLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFNBQVM7dUJBRTlDLElBQUk7Ozs7WUFHYixHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO29CQUNZLFdBQWUsUUFBVixVQUFVLEVBQTVCLFFBQVEsR0FBSyxXQUFlLENBQTVCLFFBQVE7dUJBRVQsUUFBUTs7OztZQUdqQixHQUE0QixHQUE1Qiw0QkFBNEI7NEJBQTVCLDRCQUE0QixDQUFDLGVBQWU7b0JBQ3BDLE1BQU0sUUFBUSxTQUFTLElBQ3ZCLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsZUFBZTt1QkFFakUsMEJBQTBCOzs7O1lBR25DLEdBQStCLEdBQS9CLCtCQUErQjs0QkFBL0IsK0JBQStCO29CQUN6Qiw2QkFBNkIsR0FBRyxLQUFLO29CQUVuQyxzQkFBc0IsUUFBUSx3QkFBd0I7b0JBRXhELHNCQUFzQjt3QkFDbEIsdUJBQXNCLFNBQ3RCLDZCQUE2QixHQUFHLHVCQUFzQixDQUFDLFNBQVM7d0JBRWxFLDZCQUE2Qjt3QkFDL0IsNkJBQTZCLEdBQUcsSUFBSTs7O3VCQUlqQyw2QkFBNkI7Ozs7WUFHdEMsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtxQkFDSCxhQUFhOzs7O1dBeENoQixTQUFTO0VBSkcsTUFBVTtnQkFJdEIsU0FBUyxHQTJDTixPQUFPLElBQUcsRUFBSTtnQkEzQ2pCLFNBQVMsR0E2Q04saUJBQWlCO0lBQ3RCLFNBQVMsR0FBRSxJQUFNOztnQkE5Q2YsU0FBUyxHQWlETixpQkFBaUI7S0FDdEIsUUFBVTs7QUFJZCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBekRWLEtBQWdCO0FBMER2QyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBekRMLE1BQXNCO21CQUo1QixjQUFpQixVQStEZCxTQUFTIn0=