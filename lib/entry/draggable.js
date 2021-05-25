"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _entry = _interopRequireDefault(require("../entry"));
var _options = _interopRequireWildcard(require("../options"));
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
function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj;
    } else {
        var newObj = {
        };
        if (obj != null) {
            for(var key in obj){
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {
                    };
                    if (desc.get || desc.set) {
                        Object.defineProperty(newObj, key, desc);
                    } else {
                        newObj[key] = obj[key];
                    }
                }
            }
        }
        newObj.default = obj;
        return newObj;
    }
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
            key: "startDraggingHandler",
            value: function startDraggingHandler(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(_options.ESCAPE_KEY_STOPS_DRAGGING);
                if (escapeKeyStopsDraggingOptionPresent) {
                    this.onKeyDown(this.keyDownHandler, this);
                }
            }
        },
        {
            key: "stopDraggingHandler",
            value: function stopDraggingHandler(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(_options.ESCAPE_KEY_STOPS_DRAGGING);
                if (escapeKeyStopsDraggingOptionPresent) {
                    this.offKeyDown(this.keyDownHandler, this);
                }
            }
        },
        {
            key: "draggingHandler",
            value: function draggingHandler(mouseTop, mouseLeft) {
                var explorer = this.getExplorer(), draggableEntry = this; ///
                explorer.dragging(draggableEntry);
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
                this.onDragging(this.draggingHandler, this);
                this.onStopDragging(this.stopDraggingHandler, this);
                this.onStartDragging(this.startDraggingHandler, this);
                this.onDoubleClick(this.doubleClickHandler, this);
            }
        },
        {
            key: "willUnmount",
            value: function willUnmount() {
                this.offDoubleClick(this.doubleClickHandler, this);
                this.offStartDragging(this.startDraggingHandler, this);
                this.offStopDragging(this.stopDraggingHandler, this);
                this.offDragging(this.draggingHandler, this);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5pbXBvcnQgZHJhZ2dhYmxlTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvZHJhZ2dhYmxlXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSBmcm9tIFwiLi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRVNDQVBFX0tFWUNPREUsIFNUQVJUX0RSQUdHSU5HX0RFTEFZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlOyAgLy8vXG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy51cGRhdGVUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmdIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgdGhpcy5vbktleURvd24odGhpcy5rZXlEb3duSGFuZGxlciwgdGhpcyk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bih0aGlzLmtleURvd25IYW5kbGVyLCB0aGlzKTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZ0hhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuXG4gICAgZXhwbG9yZXIuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpO1xuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IGV2ZW50LFxuICAgICAgICAgIGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGRpZE1vdW50KCkge1xuICAgIHRoaXMuZW5hYmxlRHJhZ2dpbmcoKTtcblxuICAgIHRoaXMub25EcmFnZ2luZyh0aGlzLmRyYWdnaW5nSGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy5vblN0b3BEcmFnZ2luZyh0aGlzLnN0b3BEcmFnZ2luZ0hhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMub25TdGFydERyYWdnaW5nKHRoaXMuc3RhcnREcmFnZ2luZ0hhbmRsZXIsIHRoaXMpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLCB0aGlzKTtcbiAgfVxuXG4gIHdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMub2ZmRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIsIHRoaXMpO1xuXG4gICAgdGhpcy5vZmZTdGFydERyYWdnaW5nKHRoaXMuc3RhcnREcmFnZ2luZ0hhbmRsZXIsIHRoaXMpO1xuICAgIHRoaXMub2ZmU3RvcERyYWdnaW5nKHRoaXMuc3RvcERyYWdnaW5nSGFuZGxlciwgdGhpcyk7XG4gICAgdGhpcy5vZmZEcmFnZ2luZyh0aGlzLmRyYWdnaW5nSGFuZGxlciwgdGhpcyk7XG5cbiAgICB0aGlzLmRpc2FibGVEcmFnZ2luZygpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImxpXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkcmFnZ2FibGVcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcImV4cGxvcmVyXCJcbiAgXTtcbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeS5wcm90b3R5cGUsIGRyYWdnYWJsZU1peGlucyk7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShEcmFnZ2FibGVFbnRyeSlgXG5cbiAgLmRyYWdnaW5nIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gIH1cblxuYDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRXJCLE1BQVU7SUFDUixRQUFZO0lBQ0osVUFBcUI7SUFHSSxVQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0E0SzFCLHFFQU96Qzs7Ozs7OztJQWpMUSx1QkFBdUIsR0FOWCxRQUFZLFNBTXhCLHVCQUF1QjtJQUV6QixjQUFjO2NBQWQsY0FBYzthQUFkLGNBQWM7OEJBQWQsY0FBYztn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