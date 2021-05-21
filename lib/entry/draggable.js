"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easy = require("easy");
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
        "\n\n  .dragging {\n    position: fixed;\n    z-index: 10000;\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var NO_DRAGGING_SUB_ENTRIES = _options.default.NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING = _options.default.ESCAPE_KEY_STOPS_DRAGGING;
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
            key: "startDragging",
            value: function startDragging(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING), bounds = this.getBounds(), boundsTop = bounds.getTop(), boundsLeft = bounds.getLeft(), topOffset = boundsTop - mouseTop, leftOffset = boundsLeft - mouseLeft;
                this.setTopOffset(topOffset);
                this.setLeftOffset(leftOffset);
                if (escapeKeyStopsDraggingOptionPresent) {
                    var keyDownHandler = this.keyDownHandler.bind(this);
                    this.onKeyDown(keyDownHandler);
                }
                this.addClass("dragging");
                this.dragging(mouseTop, mouseLeft);
            }
        },
        {
            key: "stopDragging",
            value: function stopDragging() {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);
                if (escapeKeyStopsDraggingOptionPresent) {
                    this.offKeyDown();
                }
                this.removeClass("dragging");
            }
        },
        {
            key: "dragging",
            value: function dragging(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), topOffset = this.getTopOffset(), leftOffset = this.getLeftOffset(), windowScrollTop = _easy.window.getScrollTop(), windowScrollLeft = _easy.window.getScrollLeft();
                var top = mouseTop + topOffset - windowScrollTop, left = mouseLeft + leftOffset - windowScrollLeft;
                top = "".concat(top, "px"); ///
                left = "".concat(left, "px"); ///
                var css = {
                    top: top,
                    left: left
                };
                this.css(css);
                explorer.dragging(this);
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
            key: "stopWaitingToDrag",
            value: function stopWaitingToDrag() {
                var timeout = this.getTimeout();
                if (timeout !== null) {
                    clearTimeout(timeout);
                    this.resetTimeout();
                }
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IHdpbmRvdyB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5pbXBvcnQgZHJhZ2dhYmxlTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvZHJhZ2dhYmxlXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlDT0RFLCBTVEFSVF9EUkFHR0lOR19ERUxBWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gdGhpcy5wcm9wZXJ0aWVzO1xuXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTsgIC8vL1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSBleHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgICAgXG4gICAgICB0aGlzLnVwZGF0ZVRpbWVvdXQodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IGV2ZW50LFxuICAgICAgICAgIGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpZE1vdW50KCkge1xuICAgIHRoaXMuZW5hYmxlRHJhZ2dpbmcoKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlciwgdGhpcyk7XG4gIH1cblxuICB3aWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLm9mZkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLCB0aGlzKTtcblxuICAgIHRoaXMuZGlzYWJsZURyYWdnaW5nKCk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwibGlcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRyYWdnYWJsZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiZXhwbG9yZXJcIlxuICBdO1xufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LnByb3RvdHlwZSwgZHJhZ2dhYmxlTWl4aW5zKTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlKERyYWdnYWJsZUVudHJ5KWBcblxuICAuZHJhZ2dpbmcge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAxMDAwMDtcbiAgfVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVUsY0FBaUI7SUFFaEIsS0FBTTtJQUVYLE1BQVU7SUFDUixRQUFZO0lBQ0osVUFBcUI7SUFFSSxVQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBK00xQixxRUFPekM7Ozs7Ozs7SUFwTlEsdUJBQXVCLEdBTFgsUUFBWSxTQUt4Qix1QkFBdUIsRUFBRSx5QkFBeUIsR0FMdEMsUUFBWSxTQUtDLHlCQUF5QjtJQUVwRCxjQUFjO2NBQWQsY0FBYzthQUFkLGNBQWM7OEJBQWQsY0FBYztnRUFBZCxjQUFjOztpQkFBZCxjQUFjOztZQUNsQixHQUFPLEdBQVAsT0FBTzs0QkFBUCxPQUFPO29CQUNDLFFBQVEsUUFBUSxXQUFXLElBQzNCLGNBQWMsU0FDZCxJQUFJLEdBQUcsUUFBUSxDQUFDLDBCQUEwQixDQUFDLGNBQWM7dUJBRXhELElBQUk7Ozs7WUFHYixHQUFXLEdBQVgsV0FBVzs0QkFBWCxXQUFXO29CQUNZLFdBQWUsUUFBVixVQUFVLEVBQTVCLFFBQVEsR0FBSyxXQUFlLENBQTVCLFFBQVE7dUJBRVQsUUFBUTs7OztZQUdq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