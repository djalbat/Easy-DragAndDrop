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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB3aXRoU3R5bGUgZnJvbSBcImVhc3ktd2l0aC1zdHlsZVwiOyAgLy8vXG5cbmltcG9ydCB7IHdpbmRvdyB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5pbXBvcnQgZHJhZ2dhYmxlTWl4aW5zIGZyb20gXCIuLi9taXhpbnMvZHJhZ2dhYmxlXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlDT0RFLCBEUkFHR0lORywgU1RPUF9EUkFHR0lORywgU1RBUlRfRFJBR0dJTkcsIFNUQVJUX0RSQUdHSU5HX0RFTEFZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSB0aGlzLnByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlOyAgLy8vXG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcblxuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy51cGRhdGVUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudCxcbiAgICAgICAgICBlc2NhcGVLZXkgPSAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpO1xuXG4gICAgaWYgKGVzY2FwZUtleSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIGV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkaWRNb3VudCgpIHtcbiAgICB0aGlzLmVuYWJsZURyYWdnaW5nKCk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIsIHRoaXMpO1xuICB9XG5cbiAgd2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5vZmZEb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlciwgdGhpcyk7XG5cbiAgICB0aGlzLmRpc2FibGVEcmFnZ2luZygpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImxpXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkcmFnZ2FibGVcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcImV4cGxvcmVyXCJcbiAgXTtcbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeS5wcm90b3R5cGUsIGRyYWdnYWJsZU1peGlucyk7XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShEcmFnZ2FibGVFbnRyeSlgXG5cbiAgLmRyYWdnaW5nIHtcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgei1pbmRleDogMTAwMDA7XG4gIH1cblxuYDtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVVLGNBQWlCO0lBRWhCLEtBQU07SUFFWCxNQUFVO0lBQ1IsUUFBWTtJQUNKLFVBQXFCO0lBRTZDLFVBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0EySW5FLHFFQU96Qzs7Ozs7OztJQWhKUSx1QkFBdUIsR0FMWCxRQUFZLFNBS3hCLHVCQUF1QixFQUFFLHlCQUF5QixHQUx0QyxRQUFZLFNBS0MseUJBQXlCO0lBRXBELGNBQWM7Y0FBZCxjQUFjO2FBQWQsY0FBYzs4QkFBZCxjQUFjO2dFQUFkLGNBQWM7O2lCQUFkLGNBQWM7O1lBQ2xCLEdBQU8sR0FBUCxPQUFPOzRCQUFQLE9BQU87b0JBQ0MsUUFBUSxRQUFRLFdBQVcsSUFDM0IsY0FBYyxTQUNkLElBQUksR0FBRyxRQUFRLENBQUMsMEJBQTBCLENBQUMsY0FBYzt1QkFFeEQsSUFBSTs7OztZQUdiLEdBQVcsR0FB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