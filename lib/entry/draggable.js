"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _easy = require("easy");
var _entry = _interopRequireDefault(require("../entry"));
var _options = _interopRequireDefault(require("../options"));
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
var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON, NO_DRAGGING_SUB_ENTRIES = _options.default.NO_DRAGGING_SUB_ENTRIES, ESCAPE_KEY_STOPS_DRAGGING = _options.default.ESCAPE_KEY_STOPS_DRAGGING;
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
            key: "isDragging",
            value: function isDragging() {
                var dragging = this.hasClass("dragging");
                return dragging;
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
                this.drag(mouseTop, mouseLeft);
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
                var explorer = this.getExplorer();
                this.drag(mouseTop, mouseLeft);
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
                    this.setTimeout(timeout);
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
            key: "mouseDownHandler",
            value: function mouseDownHandler(event, element) {
                var button = event.button, pageX = event.pageX, pageY = event.pageY, mouseTop = pageY, mouseLeft = pageX;
                _easy.window.on("blur", this.mouseUpHandler, this); ///
                _easy.window.onMouseUp(this.mouseUpHandler, this);
                _easy.window.onMouseMove(this.mouseMoveHandler, this);
                if (button === LEFT_MOUSE_BUTTON) {
                    var dragging = this.isDragging();
                    if (!dragging) {
                        this.startWaitingToDrag(mouseTop, mouseLeft);
                    }
                }
            }
        },
        {
            key: "mouseUpHandler",
            value: function mouseUpHandler(event, element) {
                _easy.window.off("blur", this.mouseUpHandler, this); ///
                _easy.window.offMouseUp(this.mouseUpHandler, this);
                _easy.window.offMouseMove(this.mouseMoveHandler, this);
                var dragging = this.isDragging();
                if (dragging) {
                    var explorer = this.getExplorer(), draggableEntry = this; ///
                    explorer.stopDragging(draggableEntry, (function() {
                        this.stopDragging();
                    }).bind(this));
                } else {
                    this.stopWaitingToDrag();
                }
            }
        },
        {
            key: "mouseMoveHandler",
            value: function mouseMoveHandler(event, element) {
                var pageX = event.pageX, pageY = event.pageY, mouseTop = pageY, mouseLeft = pageX;
                var dragging = this.isDragging();
                if (dragging) {
                    this.dragging(mouseTop, mouseLeft);
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
            key: "drag",
            value: function drag(mouseTop, mouseLeft) {
                var windowScrollTop = _easy.window.getScrollTop(), windowScrollLeft = _easy.window.getScrollLeft(), topOffset = this.getTopOffset(), leftOffset = this.getLeftOffset();
                var top = mouseTop + topOffset - windowScrollTop, left = mouseLeft + leftOffset - windowScrollLeft;
                top = "".concat(top, "px"); ///
                left = "".concat(left, "px"); ///
                var css = {
                    top: top,
                    left: left
                };
                this.css(css);
                var explorer = this.getExplorer();
                explorer.dragging(this);
            }
        },
        {
            key: "resetTimeout",
            value: function resetTimeout() {
                var timeout = null;
                this.setTimeout(timeout);
            }
        },
        {
            key: "getTimeout",
            value: function getTimeout() {
                var state = this.getState(), timeout = state.timeout;
                return timeout;
            }
        },
        {
            key: "getTopOffset",
            value: function getTopOffset() {
                var state = this.getState(), topOffset = state.topOffset;
                return topOffset;
            }
        },
        {
            key: "getLeftOffset",
            value: function getLeftOffset() {
                var state = this.getState(), leftOffset = state.leftOffset;
                return leftOffset;
            }
        },
        {
            key: "setTimeout",
            value: function setTimeout(timeout) {
                this.updateState({
                    timeout: timeout
                });
            }
        },
        {
            key: "setTopOffset",
            value: function setTopOffset(topOffset) {
                this.updateState({
                    topOffset: topOffset
                });
            }
        },
        {
            key: "setLeftOffset",
            value: function setLeftOffset(leftOffset) {
                this.updateState({
                    leftOffset: leftOffset
                });
            }
        },
        {
            key: "setInitialState",
            value: function setInitialState() {
                var timeout = null, topOffset = null, leftOffset = null;
                this.setState({
                    timeout: timeout,
                    topOffset: topOffset,
                    leftOffset: leftOffset
                });
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.assignContext();
                var mouseDownHandler = this.mouseDownHandler.bind(this), doubleClickHandler = this.doubleClickHandler.bind(this);
                this.onMouseDown(mouseDownHandler);
                this.onDoubleClick(doubleClickHandler);
                this.setInitialState();
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
var _default = (0, _easyWithStyle).default(DraggableEntry)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IHdpbmRvdywgY29uc3RhbnRzIH0gZnJvbSBcImVhc3lcIjtcblxuaW1wb3J0IEVudHJ5IGZyb20gXCIuLi9lbnRyeVwiO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSBcIi4uL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgRVNDQVBFX0tFWUNPREUsIFNUQVJUX0RSQUdHSU5HX0RFTEFZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBjb25zdGFudHMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTsgIC8vL1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG5cbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3AsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0aGlzLnNldFRvcE9mZnNldCh0b3BPZmZzZXQpO1xuXG4gICAgdGhpcy5zZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICAgIFxuICAgICAgdGhpcy5vbktleURvd24oa2V5RG93bkhhbmRsZXIpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgdGhpcy5vZmZLZXlEb3duKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImRyYWdnaW5nXCIpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGJ1dHRvbiwgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICAgIG1vdXNlTGVmdCA9IHBhZ2VYO1xuXG4gICAgd2luZG93Lm9uKFwiYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgLy8vXG5cbiAgICB3aW5kb3cub25Nb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBpZiAoYnV0dG9uID09PSBMRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIHdpbmRvdy5vZmYoXCJibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAgLy8vXG5cbiAgICB3aW5kb3cub2ZmTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIGV4cGxvcmVyLnN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LFxuICAgICAgICAgIG1vdXNlVG9wID0gcGFnZVksXG4gICAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVg7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudCxcbiAgICAgICAgICBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcCxcbiAgICAgIGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHJlc2V0VGltZW91dCgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gIH1cbiAgXG4gIGdldFRpbWVvdXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0aW1lb3V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0aW1lb3V0O1xuICB9XG5cbiAgZ2V0VG9wT2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdG9wT2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB0b3BPZmZzZXQ7XG4gIH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgbGVmdE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gbGVmdE9mZnNldDtcbiAgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRMZWZ0T2Zmc2V0KGxlZnRPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldEluaXRpYWxTdGF0ZSgpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gbnVsbCxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBudWxsLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgdGltZW91dCxcbiAgICAgIHRvcE9mZnNldCxcbiAgICAgIGxlZnRPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZHJhZ2dhYmxlXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJleHBsb3JlclwiXG4gIF07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShEcmFnZ2FibGVFbnRyeSlgXG5cbiAgLmRyYWdnaW5nIHtcbiAgICBwb3NpdGlvbjogZml4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