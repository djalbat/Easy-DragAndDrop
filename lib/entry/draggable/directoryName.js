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
var DirectoryNameDraggableEntry = function(DraggableEntry) {
    _inherits(DirectoryNameDraggableEntry, _draggable.default);
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
                    React.createElement(ToggleButton, {
                        onClick: toggleButtonClickHandler
                    }),
                    React.createElement(DirectoryNameButton, null, directoryName),
                    React.createElement(Entries, {
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
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var directoryNameDraggableEntry = _draggable.default.fromClass(Class, properties);
                directoryNameDraggableEntry.initialise();
                return directoryNameDraggableEntry;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IFRvZ2dsZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL3RvZ2dsZVwiO1xuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZS9kaXJlY3RvcnlcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuY29uc3QgeyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7IC8vL1xuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZUJ1dHRvbiB9ID0gdGhpcy5jb25zdHJ1Y3RvcjtcblxuICAgIHJldHVybiBEaXJlY3RvcnlOYW1lQnV0dG9uO1xuICB9XG5cbiAgZ2V0VG9nZ2xlQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgVG9nZ2xlQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIFRvZ2dsZUJ1dHRvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQoKSxcbiAgICAgICAgICBtYXJrZWQgPSBtYXJrZXJFbnRyeVByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNUb3Btb3N0KCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKSxcbiAgICAgICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpLFxuICAgICAgICAgIHRvcG1vc3QgPSAocGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9wbW9zdDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuY29sbGFwc2VFbnRyaWVzKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlVG9nZ2xlQnV0dG9uKCk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5leHBhbmRFbnRyaWVzKCk7XG5cbiAgICB0aGlzLmV4cGFuZFRvZ2dsZUJ1dHRvbigpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIGxldCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICBjb2xsYXBzZWQgPSAhY29sbGFwc2VkO1xuXG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWUgPSBuYW1lLCAvLy9cbiAgICAgICAgICBFbnRyaWVzID0gZXhwbG9yZXIuZ2V0RW50cmllcygpLFxuICAgICAgICAgIFRvZ2dsZUJ1dHRvbiA9IHRoaXMuZ2V0VG9nZ2xlQnV0dG9uKCksXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZUJ1dHRvbiA9IHRoaXMuZ2V0RGlyZWN0b3J5TmFtZUJ1dHRvbigpLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPFRvZ2dsZUJ1dHRvbiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+LFxuICAgICAgPERpcmVjdG9yeU5hbWVCdXR0b24+e2RpcmVjdG9yeU5hbWV9PC9EaXJlY3RvcnlOYW1lQnV0dG9uPixcbiAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgIF0pO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkge1xuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHRoaXMucHJvcGVydGllcztcblxuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gIH1cblxuICBzdGF0aWMgVG9nZ2xlQnV0dG9uID0gVG9nZ2xlQnV0dG9uO1xuXG4gIHN0YXRpYyBEaXJlY3RvcnlOYW1lQnV0dG9uID0gRGlyZWN0b3J5TmFtZUJ1dHRvbjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJjb2xsYXBzZWRcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1h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