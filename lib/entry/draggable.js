"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _entry = _interopRequireDefault(require("../entry"));
var _options = _interopRequireDefault(require("../options"));
var _draggable = _interopRequireDefault(require("../mixins/draggable"));
var _constants = require("../constants");
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
        "\n\n  .dragging {\n    position: fixed;\n    z-index: 10000;\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var NO_DRAGGING_SUB_ENTRIES = _options.default.NO_DRAGGING_SUB_ENTRIES;
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
            key: "getCollapsedBounds",
            value: function getCollapsedBounds() {
                var bounds = this.getBounds(), collapsedBounds = bounds; ///
                return collapsedBounds;
            }
        },
        {
            key: "isMouseOver",
            value: function isMouseOver(mouseTop, mouseLeft) {
                var collapsedBounds = this.getCollapsedBounds(), collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft), mouseOver = collapsedBoundsOverlappingMouse; ///
                return mouseOver;
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
            key: "startWaitingToDrag",
            value: function startWaitingToDrag(mouseTop, mouseLeft) {
                var timeout = this.getTimeout();
                if (timeout === null) {
                    timeout = setTimeout((function() {
                        this.resetTimeout();
                        var explorer = this.getExplorer(), topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(), subEntry = !topmostDirectoryNameDraggableEntry, noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);
                        if (topmostDirectoryNameDraggableEntry) {
                            return;
                        }
                        if (subEntry && noDraggingSubEntriesOptionPresent) {
                            return;
                        }
                        var mouseOver = this.isMouseOver(mouseTop, mouseLeft);
                        if (mouseOver) {
                            var startedDragging = explorer.startDragging(this);
                            if (startedDragging) {
                                this.startDragging(mouseTop, mouseLeft);
                            }
                        }
                    }).bind(this), _constants.START_DRAGGING_DELAY);
                    this.updateTimeout(timeout);
                }
            }
        },
        {
            key: "startDragging",
            value: function startDragging(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);
                _get(_getPrototypeOf(DraggableEntry.prototype), "startDragging", this).call(this, mouseTop, mouseLeft);
                if (escapeKeyStopsDraggingOptionPresent) {
                    this.onKeyDown(this.keyDownHandler, this);
                }
            }
        },
        {
            key: "stopDragging",
            value: function stopDragging(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);
                if (escapeKeyStopsDraggingOptionPresent) {
                    this.offKeyDown(this.keyDownHandler, this);
                }
                _get(_getPrototypeOf(DraggableEntry.prototype), "stopDragging", this).call(this, mouseTop, mouseLeft);
            }
        },
        {
            key: "keyDownHandler",
            value: function keyDownHandler(event, element) {
                var keyCode = event.keyCode, escapeKey = keyCode === _constants.ESCAPE_KEYCODE;
                if (escapeKey) {
                    var dragging = this.isDragging();
                    if (dragging) {
                        var explorer = this.getExplorer();
                        explorer.escapeDragging();
                        this.stopDragging();
                    }
                }
            }
        },
        {
            key: "didMount",
            value: function didMount() {
                this.enableDragging();
                this.onDoubleClick(this.doubleClickHandler, this);
            }
        },
        {
            key: "willUnmount",
            value: function willUnmount() {
                this.offDoubleClick(this.doubleClickHandler, this);
                this.disableDragging();
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
var _default = (0, _easyWithStyle).default(DraggableEntry)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5pbXBvcnQgZHJhZ2dhYmxlTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvZHJhZ2dhYmxlXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlDT0RFLCBTVEFSVF9EUkFHR0lOR19ERUxBWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBOT19EUkFHR0lOR19TVUJfRU5UUklFUyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTsgIC8vL1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMudXBkYXRlVGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIHN1cGVyLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub25LZXlEb3duKHRoaXMua2V5RG93bkhhbmRsZXIsIHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bih0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcbiAgICB9XG5cbiAgICBzdXBlci5zdG9wRHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQsXG4gICAgICAgICAgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBleHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZGlkTW91bnQoKSB7XG4gICAgdGhpcy5lbmFibGVEcmFnZ2luZygpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLCB0aGlzKTtcbiAgfVxuXG4gIHdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMub2ZmRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIsIHRoaXMpO1xuXG4gICAgdGhpcy5kaXNhYmxlRHJhZ2dpbmcoKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZHJhZ2dhYmxlXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJleHBsb3JlclwiXG4gIF07XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnkucHJvdG90eXBlLCBkcmFnZ2FibGVNaXhpbnMpO1xuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRHJhZ2dhYmxlRW50cnkpYFxuXG4gIC5kcmFnZ2luZyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuICAgIHotaW5kZXg6IDEwMDAwO1xuICB9XG5cbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxjQUFpQjtJQUVyQixNQUFVO0lBQ1IsUUFBWTtJQUNKLFVBQXFCO0lBRUksVUFBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUsxQixxRUFPekM7Ozs7Ozs7SUF0S1EsdUJBQXVCLEdBTFgsUUFBWSxTQUt4Qix1QkFBdUI7SUFFekIsY0FBYztjQUFkLGNBQWM7YUFBZCxjQUFjOzhCQUFkLGNBQWM7Z0VBQWQsY0FBYzs7aUJBQWQsY0FBYzs7WUFDbEIsR0FBTyxHQUFQLE9BQU87NEJBQVAsT0FBTztvQkFDQyxRQUFRLFFBQVEsV0FBVyxJQUMzQixjQUFjLFNBQ2QsSUFBSSxHQUFHLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjO3VCQUV4RCxJQUFJOzs7O1lBR2IsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVztvQkFDWSxXQUFlLFFBQVYsVUFBVSxFQUE1QixRQUFRLEdBQUssV0FBZSxDQUE1QixRQUFRO3VCQUVULFFBQVE7Ozs7WUFHakIsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0I7b0JBQ1YsTUFBTSxRQUFRLFNBQVMsSUFDdkIsZUFBZSxHQUFHLE1BQU0sQ0FBRyxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRTdCLGVBQWU7Ozs7WUFHeEIsR0FBVyxHQUFYLFdBQVc7NEJBQVgsV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTO29CQUN2QixlQUFlLFFBQVEsa0JBQWtCLElBQ3pDLCtCQUErQixHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxHQUN4RixTQUFTLEdBQUcsK0JBQStCLENBQUcsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO3VCQUVoRCxTQUFTOzs7O1lBR2xCLEdBQTRCLEdBQTVCLDRCQUE0Qjs0QkFBNUIsNEJBQTRCLENBQUMsZUFBZTtvQkFDcEMsTUFBTSxRQUFRLFNBQVMsSUFDdkIsMEJBQTBCLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxlQUFlO3VCQUVqRSwwQkFBMEI7Ozs7WUFHbkMsR0FBb0MsR0FBcEMsb0NBQW9DOzRCQUFwQyxvQ0FBb0M7b0JBQzlCLGtDQUFrQyxHQUFHLEtBQUs7b0JBRXhDLDJCQUEyQixRQUFRLDZCQUE2QjtvQkFFbEUsMkJBQTJCO3dCQUN2Qiw0QkFBMkIsU0FDM0Isa0NBQWtDLEdBQUcsNEJBQTJCLENBQUMsU0FBUzt3QkFFNUUsa0NBQWtDO3dCQUNwQyxrQ0FBa0MsR0FBRyxJQUFJOzs7dUJBSXRDLGtDQUFrQzs7OztZQUczQyxHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxTQUFTO29CQUNoQyxPQUFPLFFBQVEsVUFBVTtvQkFFekIsT0FBTyxLQUFLLElBQUk7b0JBQ2xCLE9BQU8sR0FBRyxVQUFVOzZCQUNiLFlBQVk7NEJBRVgsUUFBUSxRQUFRLFdBQVcsSUFDM0Isa0NBQWtDLFFBQVEsb0NBQW9DLElBQzlFLFFBQVEsSUFBSSxrQ0FBa0MsRUFDOUMsaUNBQWlDLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyx1QkFBdUI7NEJBRXRGLGtDQUFrQzs7OzRCQUlsQyxRQUFRLElBQUksaUNBQWlDOzs7NEJBSTNDLFNBQVMsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFLFNBQVM7NEJBRWxELFNBQVM7Z0NBQ0wsZUFBZSxHQUFHLFFBQVEsQ0FBQyxhQUFhO2dDQUUxQyxlQUFlO3FDQUNaLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUzs7O21DQXBGRyxVQUFjO3lCQXlGeEQsYUFBYSxDQUFDLE9BQU87Ozs7O1lBSTlCLEdBQWEsR0FBYixhQUFhOzRCQUFiLGFBQWEsQ0FBQyxRQUFRLEVBQUUsU0FBUztvQkFDekIsUUFBUSxRQUFRLFdBQVcsSUFDM0IsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUI7cUNBM0Y1RixjQUFjLGNBNkZWLGFBQWEsb0JBQUMsUUFBUSxFQUFFLFNBQVM7b0JBRW5DLG1DQUFtQzt5QkFDaEMsU0FBUyxNQUFNLGNBQWM7Ozs7O1lBSXRDLEdBQVksR0FBWixZQUFZOzRCQUFaLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUztvQkFDeEIsUUFBUSxRQUFRLFdBQVcsSUFDM0IsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyx5QkFBeUI7b0JBRTFGLG1DQUFtQzt5QkFDaEMsVUFBVSxNQUFNLGNBQWM7O3FDQXpHbkMsY0FBYyxjQTRHVixZQUFZLG9CQUFDLFFBQVEsRUFBRSxTQUFTOzs7O1lBR3hDLEdBQWMsR0FBZCxjQUFjOzRCQUFkLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTztvQkFDbkIsT0FBTyxHQUFLLEtBQUssQ0FBakIsT0FBTyxFQUNULFNBQVMsR0FBSSxPQUFPLEtBckh1QixVQUFjO29CQXVIM0QsU0FBUzt3QkFDTCxRQUFRLFFBQVEsVUFBVTt3QkFFNUIsUUFBUTs0QkFDSixRQUFRLFFBQVEsV0FBVzt3QkFFakMsUUFBUSxDQUFDLGNBQWM7NkJBRWxCLFlBQVk7Ozs7OztZQUt2QixHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRO3FCQUNELGNBQWM7cUJBRWQsYUFBYSxNQUFNLGtCQUFrQjs7OztZQUc1QyxHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO3FCQUNKLGNBQWMsTUFBTSxrQkFBa0I7cUJBRXRDLGVBQWU7Ozs7WUFHdEIsR0FBVSxHQUFWLFVBQVU7NEJBQVYsVUFBVTtxQkFDSCxhQUFhOzs7O1dBN0loQixjQUFjO0VBUkYsTUFBVTtnQkFRdEIsY0FBYyxHQWdKWCxPQUFPLElBQUcsRUFBSTtnQkFoSmpCLGNBQWMsR0FrSlgsaUJBQWlCO0lBQ3RCLFNBQVMsR0FBRSxTQUFXOztnQkFuSnBCLGNBQWMsR0FzSlgsaUJBQWlCO0tBQ3RCLFFBQVU7O0FBSWQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsU0FBUyxFQWpLVixVQUFxQjttQkFKM0IsY0FBaUIsVUF1S2QsY0FBYyJ9