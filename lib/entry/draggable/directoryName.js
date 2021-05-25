"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _necessary = require("necessary");
var _toggle = _interopRequireDefault(require("../../button/toggle"));
var _draggable = _interopRequireDefault(require("../../entry/draggable"));
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
var DirectoryNameDraggableEntry = /*#__PURE__*/ function(DraggableEntry) {
    _inherits(DirectoryNameDraggableEntry, DraggableEntry);
    function DirectoryNameDraggableEntry() {
        _classCallCheck(this, DirectoryNameDraggableEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(DirectoryNameDraggableEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.DIRECTORY_NAME_TYPE);
        return _this;
    }
    _createClass(DirectoryNameDraggableEntry, [
        {
            key: "getCollapsedBounds",
            value: function getCollapsedBounds() {
                var collapsed = this.isCollapsed();
                this.collapse();
                var bounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "getBounds", this).call(this), collapsedBounds = bounds; ///
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
            key: "isFileNameDraggableEntry",
            value: function isFileNameDraggableEntry() {
                return false;
            }
        },
        {
            key: "isDirectoryNameDraggableEntry",
            value: function isDirectoryNameDraggableEntry() {
                return true;
            }
        },
        {
            key: "isOverlappingDraggableEntry",
            value: function isOverlappingDraggableEntry(draggableEntry) {
                var overlappingDraggableEntry;
                if (this === draggableEntry) {
                    overlappingDraggableEntry = false;
                } else {
                    var collapsed = this.isCollapsed();
                    if (collapsed) {
                        overlappingDraggableEntry = false;
                    } else {
                        var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(), overlappingDraggableEntryCollapsedBounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "isOverlappingCollapsedBounds", this).call(this, draggableEntryCollapsedBounds);
                        overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
                    }
                }
                return overlappingDraggableEntry;
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
                _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this);
                var _properties = this.properties, _collapsed = _properties.collapsed, collapsed = _collapsed === void 0 ? false : _collapsed;
                this.setCollapsed(collapsed);
            }
        }
    ]);
    return DirectoryNameDraggableEntry;
}(_draggable.default);
_defineProperty(DirectoryNameDraggableEntry, "ToggleButton", _toggle.default);
_defineProperty(DirectoryNameDraggableEntry, "DirectoryNameButton", _directory.default);
_defineProperty(DirectoryNameDraggableEntry, "defaultProperties", {
    className: "directory-name"
});
_defineProperty(DirectoryNameDraggableEntry, "ignoredProperties", [
    "collapsed"
]);
exports.default = DirectoryNameDraggableEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IFRvZ2dsZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL3RvZ2dsZVwiO1xuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZS9kaXJlY3RvcnlcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7IC8vL1xuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZUJ1dHRvbiB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lQnV0dG9uO1xuICB9XG5cbiAgZ2V0VG9nZ2xlQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgVG9nZ2xlQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIFRvZ2dsZUJ1dHRvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQoKSxcbiAgICAgICAgICBtYXJrZWQgPSBtYXJrZXJFbnRyeVByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNUb3Btb3N0KCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKSxcbiAgICAgICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpLFxuICAgICAgICAgIHRvcG1vc3QgPSAocGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9wbW9zdDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuY29sbGFwc2VFbnRyaWVzKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlVG9nZ2xlQnV0dG9uKCk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5leHBhbmRFbnRyaWVzKCk7XG5cbiAgICB0aGlzLmV4cGFuZFRvZ2dsZUJ1dHRvbigpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGxldCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICBjb2xsYXBzZWQgPSAhY29sbGFwc2VkO1xuXG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgfVxuXG5cblxuICBjaGlsZEVsZW1lbnRzKCkge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gbmFtZSwgLy8vXG4gICAgICAgICAgRW50cmllcyA9IGV4cGxvcmVyLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBUb2dnbGVCdXR0b24gPSB0aGlzLmdldFRvZ2dsZUJ1dHRvbigpLFxuICAgICAgICAgIERpcmVjdG9yeU5hbWVCdXR0b24gPSB0aGlzLmdldERpcmVjdG9yeU5hbWVCdXR0b24oKSxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxUb2dnbGVCdXR0b24gb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxEaXJlY3RvcnlOYW1lQnV0dG9uPntkaXJlY3RvcnlOYW1lfTwvRGlyZWN0b3J5TmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZSgpIHtcbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG5cbiAgICBjb25zdCB7IGNvbGxhcHNlZCA9IGZhbHNlIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICB0aGlzLnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICB9XG5cbiAgc3RhdGljIFRvZ2dsZUJ1dHRvbiA9IFRvZ2dsZUJ1dHRvbjtcblxuICBzdGF0aWMgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IERpcmVjdG9yeU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiY29sbGFwc2VkXCJcbiAgXTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVrQixVQUFXO0lBRWhCLE9BQXFCO0lBQ25CLFVBQXVCO0lBQ2xCLFVBQTZCO0lBRTBDLE1BQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUU1Ryx1Q0FBdUMsR0FSakIsVUFBVyxlQVFqQyx1Q0FBdUM7SUFF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