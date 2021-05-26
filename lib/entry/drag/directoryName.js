"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _necessary = require("necessary");
var _drag = _interopRequireDefault(require("../../entry/drag"));
var _toggle = _interopRequireDefault(require("../../button/toggle"));
var _directory = _interopRequireDefault(require("../../button/name/directory"));
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
function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get;
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base) return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(receiver);
            }
            return desc.value;
        };
    }
    return _get(target, property, receiver || target);
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
function _superPropBase(object, property) {
    while(!Object.prototype.hasOwnProperty.call(object, property)){
        object = _getPrototypeOf(object);
        if (object === null) break;
    }
    return object;
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;
var DirectoryNameDragEntry = /*#__PURE__*/ function(DragEntry) {
    _inherits(DirectoryNameDragEntry, DragEntry);
    function DirectoryNameDragEntry() {
        _classCallCheck(this, DirectoryNameDragEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectoryNameDragEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.DIRECTORY_NAME_TYPE);
        return _this;
    }
    _createClass(DirectoryNameDragEntry, [
        {
            key: "getCollapsedBounds",
            value: function getCollapsedBounds() {
                var collapsed = this.isCollapsed();
                this.collapse();
                var bounds = _get(_getPrototypeOf(DirectoryNameDragEntry.prototype), "getBounds", this).call(this), collapsedBounds = bounds; ///
                if (!collapsed) {
                    this.expand();
                }
                return collapsedBounds;
            }
        },
        {
            key: "getDirectoryNameButton",
            value: function getDirectoryNameButton() {
                var _constructor = this.constructor, DirectoryNameButton = _constructor.DirectoryNameButton;
                return DirectoryNameButton;
            }
        },
        {
            key: "getToggleButton",
            value: function getToggleButton() {
                var _constructor = this.constructor, ToggleButton = _constructor.ToggleButton;
                return ToggleButton;
            }
        },
        {
            key: "isMarked",
            value: function isMarked() {
                var markerEntryPresent = this.isMarkerEntryPresent(), marked = markerEntryPresent; ///
                return marked;
            }
        },
        {
            key: "isBefore",
            value: function isBefore(entry) {
                var before;
                var entryType = entry.getType();
                switch(entryType){
                    case _types.FILE_NAME_TYPE:
                    case _types.FILE_NAME_MARKER_TYPE:
                    case _types.DIRECTORY_NAME_MARKER_TYPE:
                        before = true;
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        var name = this.getName(), entryName = entry.getName();
                        before = name.localeCompare(entryName) < 0;
                        break;
                }
                return before;
            }
        },
        {
            key: "isTopmost",
            value: function isTopmost() {
                var path = this.getPath(), pathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(path), topmost = pathWithoutTopmostDirectoryName === null;
                return topmost;
            }
        },
        {
            key: "isFileNameDragEntry",
            value: function isFileNameDragEntry() {
                return false;
            }
        },
        {
            key: "isDirectoryNameDragEntry",
            value: function isDirectoryNameDragEntry() {
                return true;
            }
        },
        {
            key: "isOverlappingDragEntry",
            value: function isOverlappingDragEntry(dragEntry) {
                var overlappingDragEntry;
                if (this === dragEntry) {
                    overlappingDragEntry = false;
                } else {
                    var collapsed = this.isCollapsed();
                    if (collapsed) {
                        overlappingDragEntry = false;
                    } else {
                        var dragEntryCollapsedBounds = dragEntry.getCollapsedBounds(), overlappingDragEntryCollapsedBounds = _get(_getPrototypeOf(DirectoryNameDragEntry.prototype), "isOverlappingCollapsedBounds", this).call(this, dragEntryCollapsedBounds);
                        overlappingDragEntry = overlappingDragEntryCollapsedBounds;
                    }
                }
                return overlappingDragEntry;
            }
        },
        {
            key: "toggleButtonClickHandler",
            value: function toggleButtonClickHandler() {
                this.toggle();
            }
        },
        {
            key: "doubleClickHandler",
            value: function doubleClickHandler() {
                this.toggle();
            }
        },
        {
            key: "setCollapsed",
            value: function setCollapsed(collapsed) {
                collapsed ? this.collapse() : this.expand();
            }
        },
        {
            key: "collapse",
            value: function collapse() {
                this.collapseEntries();
                this.collapseToggleButton();
            }
        },
        {
            key: "expand",
            value: function expand() {
                this.expandEntries();
                this.expandToggleButton();
            }
        },
        {
            key: "toggle",
            value: function toggle() {
                var collapsed = this.isCollapsed();
                collapsed = !collapsed;
                this.setCollapsed(collapsed);
            }
        },
        {
            key: "childElements",
            value: function childElements() {
                var _properties = this.properties, name = _properties.name, explorer = _properties.explorer, directoryName = name, Entries = explorer.getEntries(), ToggleButton = this.getToggleButton(), DirectoryNameButton = this.getDirectoryNameButton(), toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
                return [
                    /*#__PURE__*/ React.createElement(ToggleButton, {
                        onClick: toggleButtonClickHandler
                    }),
                    /*#__PURE__*/ React.createElement(DirectoryNameButton, null, directoryName),
                    /*#__PURE__*/ React.createElement(Entries, {
                        explorer: explorer
                    })
                ];
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                _get(_getPrototypeOf(DirectoryNameDragEntry.prototype), "initialise", this).call(this);
                var _properties = this.properties, _collapsed = _properties.collapsed, collapsed = _collapsed === void 0 ? false : _collapsed;
                this.setCollapsed(collapsed);
            }
        }
    ]);
    return DirectoryNameDragEntry;
}(_drag.default);
_defineProperty(DirectoryNameDragEntry, "ToggleButton", _toggle.default);
_defineProperty(DirectoryNameDragEntry, "DirectoryNameButton", _directory.default);
_defineProperty(DirectoryNameDragEntry, "defaultProperties", {
    className: "directory-name"
});
_defineProperty(DirectoryNameDragEntry, "ignoredProperties", [
    "collapsed"
]);
exports.default = DirectoryNameDragEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9kcmFnL2RpcmVjdG9yeU5hbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBEcmFnRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L2RyYWdcIjtcbmltcG9ydCBUb2dnbGVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi90b2dnbGVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZS9kaXJlY3RvcnlcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVEcmFnRW50cnkgZXh0ZW5kcyBEcmFnRW50cnkge1xuICB0eXBlID0gRElSRUNUT1JZX05BTUVfVFlQRTsgLy8vXG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnlOYW1lQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVCdXR0b247XG4gIH1cblxuICBnZXRUb2dnbGVCdXR0b24oKSB7XG4gICAgY29uc3QgeyBUb2dnbGVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gVG9nZ2xlQnV0dG9uO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudCgpLFxuICAgICAgICAgIG1hcmtlZCA9IG1hcmtlckVudHJ5UHJlc2VudDsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc1RvcG1vc3QoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZ2V0UGF0aCgpLFxuICAgICAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgdG9wbW9zdCA9IChwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTtcblxuICAgIHJldHVybiB0b3Btb3N0O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ0VudHJ5KGRyYWdFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ0VudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBvdmVybGFwcGluZ0RyYWdFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnRW50cnk7XG4gIH1cblxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5jb2xsYXBzZUVudHJpZXMoKTtcblxuICAgIHRoaXMuY29sbGFwc2VUb2dnbGVCdXR0b24oKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmV4cGFuZEVudHJpZXMoKTtcblxuICAgIHRoaXMuZXhwYW5kVG9nZ2xlQnV0dG9uKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgbGV0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGNvbGxhcHNlZCA9ICFjb2xsYXBzZWQ7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cblxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSBuYW1lLCAvLy9cbiAgICAgICAgICBFbnRyaWVzID0gZXhwbG9yZXIuZ2V0RW50cmllcygpLFxuICAgICAgICAgIFRvZ2dsZUJ1dHRvbiA9IHRoaXMuZ2V0VG9nZ2xlQnV0dG9uKCksXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IHRoaXMuZ2V0RGlyZWN0b3J5TmFtZUJ1dHRvbigpLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPFRvZ2dsZUJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+LFxuICAgICAgPERpcmVjdG9yeU5hbWVCdXR0b24+e2RpcmVjdG9yeU5hbWV9PC9EaXJlY3RvcnlOYW1lQnV0dG9uPixcbiAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgIF0pO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkge1xuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHRoaXMucHJvcGVydGllcztcblxuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gIH1cblxuICBzdGF0aWMgVG9nZ2xlQnV0dG9uID0gVG9nZ2xlQnV0dG9uO1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lQnV0dG9uID0gRGlyZWN0b3J5TmFtZUJ1dHRvbjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJjb2xsYXBzZWRcIlxuICBdO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRWtCLFVBQVc7SUFFbkIsS0FBa0I7SUFDZixPQUFxQjtJQUNkLFVBQTZCO0lBRTBDLE1BQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUU1Ryx1Q0FBdUMsR0FSakIsVUFBVyxlQVFqQyx1Q0FBdUM7SUFFMUIsc0JBQXNCO2NBQXRCLHNCQUFzQjthQUF0QixzQkFBc0I7OEJBQXRCLHNCQUFzQjs7aUVBQXRCLHNCQUFzQjt3REFDekMsSUFBSSxHQUxpRyxNQUFhOzs7aUJBSS9GLHNCQUFzQjs7WUFHekMsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0I7b0JBQ1YsU0FBUyxRQUFRLFdBQVc7cUJBRTdCLFFBQVE7b0JBRVAsTUFBTSx3QkFSSyxzQkFBc0IsY0FRbEIsU0FBUyxxQkFDeEIsZUFBZSxHQUFHLE1BQU0sQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7cUJBRS9CLFNBQVM7eUJBQ1AsTUFBTTs7dUJBR04sZUFBZTs7OztZQUd4QixHQUFzQixHQUF0QixzQkFBc0I7NEJBQXRCLHNCQUFzQjtvQkFDWSxZQUFnQixRQUFYLFdBQVcsRUFBeEMsbUJBQW1CLEdBQUssWUFBZ0IsQ0FBeEMsbUJBQW1CO3VCQUVwQixtQkFBbUI7Ozs7WUFHNUIsR0FBZSxHQUFmLGVBQWU7NEJBQWYsZUFBZTtvQkFDWSxZQUFnQixRQUFYLFdBQVcsRUFBakMsWUFBWSxHQUFLLFlBQWdCLENBQWpDLFlBQVk7dUJBRWIsWUFBWTs7OztZQUdyQixHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRO29CQUNBLGtCQUFrQixRQUFRLG9CQUFvQixJQUM5QyxNQUFNLEdBQUcsa0JBQWtCLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO3VCQUVoQyxNQUFNOzs7O1lBR2YsR0FBUSxHQUFSLFFBQVE7NEJBQVIsUUFBUSxDQUFDLEtBQUs7b0JBQ1IsTUFBTTtvQkFFSixTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU87dUJBRXZCLFNBQVM7eUJBOUNrRixNQUFhO3lCQUFiLE1BQWE7eUJBQWIsTUFBYTt3QkFrRDVHLE1BQU0sR0FBRyxJQUFJOzt5QkFsRGtGLE1BQWE7NEJBdUR0RyxJQUFJLFFBQVEsT0FBTyxJQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU87d0JBRS9CLE1BQU0sR0FBSSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsSUFBSSxDQUFDOzs7dUJBS3hDLE1BQU07Ozs7WUFHZixHQUFTLEdBQVQsU0FBUzs0QkFBVCxTQUFTO29CQUNELElBQUksUUFBUSxPQUFPLElBQ25CLCtCQUErQixHQUFHLHVDQUF1QyxDQUFDLElBQUksR0FDOUUsT0FBTyxHQUFJLCtCQUErQixLQUFLLElBQUk7dUJBRWxELE9BQU87Ozs7WUFHaEIsR0FBbUIsR0FBbkIsbUJBQW1COzRCQUFuQixtQkFBbUI7dUJBQ1YsS0FBSzs7OztZQUdkLEdBQXdCLEdBQXhCLHdCQUF3Qjs0QkFBeEIsd0JBQXdCO3VCQUNmLElBQUk7Ozs7WUFHYixHQUFzQixHQUF0QixzQkFBc0I7NEJBQXRCLHNCQUFzQixDQUFDLFNBQVM7b0JBQzFCLG9CQUFvQjs2QkFFWCxTQUFTO29CQUNwQixvQkFBb0IsR0FBRyxLQUFLOzt3QkFFdEIsU0FBUyxRQUFRLFdBQVc7d0JBRTlCLFNBQVM7d0JBQ1gsb0JBQW9CLEdBQUcsS0FBSzs7NEJBRXRCLHdCQUF3QixHQUFHLFNBQVMsQ0FBQyxrQkFBa0IsSUFDdkQsbUNBQW1DLHdCQTFGNUIsc0JBQXNCLGNBMEZlLDRCQUE0QixvQkFBQyx3QkFBd0I7d0JBRXZHLG9CQUFvQixHQUFHLG1DQUFtQzs7O3VCQUl2RCxvQkFBb0I7Ozs7WUFHN0IsR0FBd0IsR0FBeEIsd0JBQXdCOzRCQUF4Qix3QkFBd0I7cUJBQ2pCLE1BQU07Ozs7WUFHYixHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQjtxQkFDWCxNQUFNOzs7O1lBR2IsR0FBWSxHQUFaLFlBQVk7NEJBQVosWUFBWSxDQUFDLFNBQVM7Z0JBQ3BCLFNBQVMsUUFDRixRQUFRLFVBQ04sTUFBTTs7OztZQUdqQixHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRO3FCQUNELGVBQWU7cUJBRWYsb0JBQW9COzs7O1lBRzNCLEdBQU0sR0FBTixNQUFNOzRCQUFOLE1BQU07cUJBQ0MsYUFBYTtxQkFFYixrQkFBa0I7Ozs7WUFHekIsR0FBTSxHQUFOLE1BQU07NEJBQU4sTUFBTTtvQkFDQSxTQUFTLFFBQVEsV0FBVztnQkFFaEMsU0FBUyxJQUFJLFNBQVM7cUJBRWpCLFlBQVksQ0FBQyxTQUFTOzs7O1lBSzdCLEdBQWEsR0FBYixhQUFhOzRCQUFiLGFBQWE7b0JBQ2dCLFdBQWUsUUFBVixVQUFVLEVBQWxDLElBQUksR0FBZSxXQUFlLENBQWxDLElBQUksRUFBRSxRQUFRLEdBQUssV0FBZSxDQUE1QixRQUFRLEVBQ2hCLGFBQWEsR0FBRyxJQUFJLEVBQ3BCLE9BQU8sR0FBRyxRQUFRLENBQUMsVUFBVSxJQUM3QixZQUFZLFFBQVEsZUFBZSxJQUNuQyxtQkFBbUIsUUFBUSxzQkFBc0IsSUFDakQsd0JBQXdCLFFBQVEsd0JBQXdCLENBQUMsSUFBSTs7c0RBSWhFLFlBQVk7d0JBQUMsT0FBTyxFQUFFLHdCQUF3Qjs7c0RBQzlDLG1CQUFtQixRQUFFLGFBQWE7c0RBQ2xDLE9BQU87d0JBQUMsUUFBUSxFQUFFLFFBQVE7Ozs7OztZQUsvQixHQUFVLEdBQVYsVUFBVTs0QkFBVixVQUFVO3FDQXhKUyxzQkFBc0IsY0F5SmpDLFVBQVU7b0JBRWMsV0FBZSxRQUFWLFVBQVUsZUFBZixXQUFlLENBQXJDLFNBQVMsRUFBVCxTQUFTLDJCQUFHLEtBQUs7cUJBRXBCLFlBQVksQ0FBQyxTQUFTOzs7O1dBN0pWLHNCQUFzQjtFQVJyQixLQUFrQjtnQkFRbkIsc0JBQXNCLEdBZ0tsQyxZQUFZLEdBdktJLE9BQXFCO2dCQU96QixzQkFBc0IsR0FrS2xDLG1CQUFtQixHQXhLSSxVQUE2QjtnQkFNeEMsc0JBQXNCLEdBb0tsQyxpQkFBaUI7SUFDdEIsU0FBUyxHQUFFLGNBQWdCOztnQkFyS1Ysc0JBQXNCLEdBd0tsQyxpQkFBaUI7S0FDdEIsU0FBVzs7a0JBektNLHNCQUFzQiJ9