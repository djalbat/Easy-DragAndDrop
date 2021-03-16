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
var DraggableEntry = function(Entry) {
    _inherits(DraggableEntry, _entry.default);
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
                var collapsedBounds = this.getCollapsedBounds(), collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft), mouseOver = collapsedBoundsOverlappingMouse;
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
var _default = _easyWithStyle.default(DraggableEntry)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IHdpbmRvdywgY29uc3RhbnRzIH0gZnJvbSBcImVhc3lcIjtcblxuaW1wb3J0IEVudHJ5IGZyb20gXCIuLi9lbnRyeVwiO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSBcIi4uL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgRVNDQVBFX0tFWUNPREUsIFNUQVJUX0RSQUdHSU5HX0RFTEFZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBjb25zdGFudHMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKFwiZHJhZ2dpbmdcIik7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBidXR0b24sIHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQsXG4gICAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICAgIHdpbmRvdy5vbihcImJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKGJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICB3aW5kb3cub2ZmKFwiYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICBleHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICAgIG1vdXNlTGVmdCA9IHBhZ2VYO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQsXG4gICAgICAgICAgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBleHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdGltZW91dDtcbiAgfVxuXG4gIGdldFRvcE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRvcE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdG9wT2Zmc2V0O1xuICB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGRvdWJsZUNsaWNrSGFuZGxlciA9IHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcblxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwibGlcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRyYWdnYWJsZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiZXhwbG9yZXJcIlxuICBdO1xufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoRHJhZ2dhYmxlRW50cnkpYFxuXG4gIC5kcmFnZ2luZyB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xu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