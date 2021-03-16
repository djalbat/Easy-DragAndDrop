"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _dropTarget = _interopRequireDefault(require("./dropTarget"));
var _types = require("./types");
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
        "\n\n  background-image: url(\"css/image/rubbish-bin.png\");\n  background-repeat: no-repeat;\n  width: 4rem;\n  height: 4rem;\n  \n  .open {\n    background-image: url(\"css/image/open-rubbish-bin.png\");\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var RubbishBin = function(DropTarget) {
    _inherits(RubbishBin, _dropTarget.default);
    function RubbishBin() {
        _classCallCheck(this, RubbishBin);
        return _possibleConstructorReturn(this, _getPrototypeOf(RubbishBin).apply(this, arguments));
    }
    _createClass(RubbishBin, [
        {
            key: "open",
            value: function open() {
                this.addClass("open");
            }
        },
        {
            key: "close",
            value: function close() {
                this.removeClass("open");
            }
        },
        {
            key: "isOpen",
            value: function isOpen() {
                var open = this.hasClass("open");
                return open;
            }
        },
        {
            key: "mark",
            value: function mark(draggableEntry, previousDraggableEntry) {
                this.open();
            }
        },
        {
            key: "unmark",
            value: function unmark() {
                this.close();
            }
        },
        {
            key: "isMarked",
            value: function isMarked() {
                var open = this.isOpen(), marked = open; ///
                return marked;
            }
        },
        {
            key: "isToBeMarked",
            value: function isToBeMarked(draggableEntry) {
                var bounds = this.getBounds(), draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(), overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds), toBeMarked = overlappingDraggableEntryCollapsedBounds; ///
                return toBeMarked;
            }
        },
        {
            key: "dragging",
            value: function dragging(draggableEntry) {
                var explorer = draggableEntry.getExplorer(), markedDropTarget = this.getMarkedDropTarget();
                if (markedDropTarget !== this) {
                    return;
                }
                var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);
                if (dropTargetToBeMarked === this) {
                } else if (dropTargetToBeMarked !== null) {
                    dropTargetToBeMarked.markDraggableEntry(draggableEntry);
                    this.unmark();
                } else {
                    var dropTargetToBeMarked1 = explorer, previousDraggableEntry = null;
                    dropTargetToBeMarked1.mark(draggableEntry, previousDraggableEntry);
                    this.unmark();
                }
            }
        },
        {
            key: "markDraggableEntry",
            value: function markDraggableEntry(draggableEntry) {
                var previousDraggableEntry = null;
                this.mark(draggableEntry, previousDraggableEntry);
            }
        },
        {
            key: "moveFileNameDraggableEntry",
            value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
                var draggableEntry = null;
                if (targetFilePath === null) {
                    var explorer = fileNameDraggableEntry.getExplorer(), filePath = sourceFilePath; ///
                    explorer.removeFilePath(filePath);
                }
                return draggableEntry;
            }
        },
        {
            key: "moveDirectoryNameDraggableEntry",
            value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
                var draggableEntry = null;
                if (targetDirectoryPath === null) {
                    var explorer = directoryNameDraggableEntry.getExplorer(), directoryPath = sourceDirectoryPath; ///
                    explorer.removeDirectoryPath(directoryPath);
                }
                return draggableEntry;
            }
        },
        {
            key: "pathMapsFromDraggableEntries",
            value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
                var pathMaps = draggableEntries.map(function(draggableEntry) {
                    var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
                    return pathMap;
                });
                return pathMaps;
            }
        },
        {
            key: "retrieveMarkedDirectoryNameDraggableEntry",
            value: function retrieveMarkedDirectoryNameDraggableEntry() {
                var markedDirectoryNameDraggableEntry = null; ///
                return markedDirectoryNameDraggableEntry;
            }
        },
        {
            key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
            value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
                var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///
                return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                this.close();
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var _onRemove = properties.onRemove, onRemove = _onRemove === void 0 ? defaultRemoveHandler : _onRemove, removeHandler = onRemove, moveHandler = removeHandler, rubbishBin = _dropTarget.default.fromClass(Class, properties, moveHandler);
                rubbishBin.initialise();
                return rubbishBin;
            }
        }
    ]);
    return RubbishBin;
}(_dropTarget.default);
_defineProperty(RubbishBin, "tagName", "div");
_defineProperty(RubbishBin, "defaultProperties", {
    className: "rubbish-bin"
});
_defineProperty(RubbishBin, "ignoredProperties", [
    "onRemove"
]);
var _default = _easyWithStyle.default(RubbishBin)(_templateObject());
exports.default = _default;
function defaultRemoveHandler(pathMaps, done) {
    done();
}
function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
    var draggableEntryPath = draggableEntry.getPath(), draggableEntryType = draggableEntry.getType(), draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE, directory = draggableEntryDirectoryNameDraggableEntry; ///
    targetPath = null; ///
    sourcePath = draggableEntryPath; ///
    var pathMap = {
        sourcePath: sourcePath,
        targetPath: targetPath,
        directory: directory
    };
    return pathMap;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ydWJiaXNoQmluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5cbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcyhcIm9wZW5cIik7XG5cbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICBcbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInJ1YmJpc2gtYmluXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvblJlbW92ZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgPSBkZWZhdWx0UmVtb3ZlSGFuZGxlcn0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyLCAgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICBydWJiaXNoQmluLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gcnViYmlzaEJpbjtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoU3R5bGUoUnViYmlzaEJpbilgXG5cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiY3NzL2ltYWdlL3J1YmJpc2gtYmluLnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgd2lkdGg6IDRyZW07XG4gIGhlaWdodDogNHJlbTtcbiAgXG4gIC5vcGVuIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJjc3MvaW1hZ2Uvb3Blbi1ydWJiaXNoLWJpbi5wbmdcIik7XG4gIH1cblxuYDtcblxuZnVuY3Rpb24gZGVmYXVsdFJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQUE7Ozs7O0lBRUEsY0FBQTtJQUVBLFdBQUE7SUFFQSxNQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbUpBLHFOQVdBOzs7Ozs7O0lBNUpBLFVBQUEsWUFBQSxVQUFBO2NBQUEsVUFBQSxFQUpBLFdBQUE7YUFJQSxVQUFBOzhCQUFBLFVBQUE7Z0VBQUEsVUFBQTs7aUJBQUEsVUFBQTs7QUFDQSxlQUFBLEdBQUEsSUFBQTs0QkFBQSxJQUFBO3FCQUNBLFFBQUEsRUFBQSxJQUFBOzs7O0FBR0EsZUFBQSxHQUFBLEtBQUE7NEJBQUEsS0FBQTtxQkFDQSxXQUFBLEVBQUEsSUFBQTs7OztBQUdBLGVBQUEsR0FBQSxNQUFBOzRCQUFBLE1BQUE7b0JBQ0EsSUFBQSxRQUFBLFFBQUEsRUFBQSxJQUFBO3VCQUVBLElBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsSUFBQTs0QkFBQSxJQUFBLENBQUEsY0FBQSxFQUFBLHNCQUFBO3FCQUNBLElBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsTUFBQTs0QkFBQSxNQUFBO3FCQUNBLEtBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsUUFBQTs0QkFBQSxRQUFBO29CQUNBLElBQUEsUUFBQSxNQUFBLElBQ0EsTUFBQSxHQUFB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