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
        "\n\n  width: 4rem;\n  height: 4rem;\n  background-image: url(\"css/image/rubbish-bin.png\");\n  background-repeat: no-repeat;\n  \n  .open {\n    background-image: url(\"css/image/open-rubbish-bin.png\");\n  }\n\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var RubbishBin = /*#__PURE__*/ function(DropTarget) {
    _inherits(RubbishBin, DropTarget);
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
            value: function mark(dragEntry, previousDragEntry) {
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
            value: function isToBeMarked(dragEntry) {
                var bounds = this.getBounds(), dragEntryCollapsedBounds = dragEntry.getCollapsedBounds(), overlappingDragEntryCollapsedBounds = bounds.areOverlapping(dragEntryCollapsedBounds), toBeMarked = overlappingDragEntryCollapsedBounds; ///
                return toBeMarked;
            }
        },
        {
            key: "dragging",
            value: function dragging(dragEntry) {
                var explorer = dragEntry.getExplorer(), markedDropTarget = this.getMarkedDropTarget();
                if (markedDropTarget !== this) {
                    return;
                }
                var dropTargetToBeMarked = this.getDropTargetToBeMarked(dragEntry);
                if (dropTargetToBeMarked === this) {
                ///
                } else if (dropTargetToBeMarked !== null) {
                    dropTargetToBeMarked.markDragEntry(dragEntry);
                    this.unmark();
                } else {
                    var dropTargetToBeMarked1 = explorer, previousDragEntry = null;
                    dropTargetToBeMarked1.mark(dragEntry, previousDragEntry);
                    this.unmark();
                }
            }
        },
        {
            key: "markDragEntry",
            value: function markDragEntry(dragEntry) {
                var previousDragEntry = null;
                this.mark(dragEntry, previousDragEntry);
            }
        },
        {
            key: "moveFileNameDragEntry",
            value: function moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath) {
                var dragEntry = null;
                if (targetFilePath === null) {
                    var explorer = fileNameDragEntry.getExplorer(), filePath = sourceFilePath; ///
                    explorer.removeFilePath(filePath);
                }
                return dragEntry;
            }
        },
        {
            key: "moveDirectoryNameDragEntry",
            value: function moveDirectoryNameDragEntry(directoryNameDragEntry, sourceDirectoryPath, targetDirectoryPath) {
                var dragEntry = null;
                if (targetDirectoryPath === null) {
                    var explorer = directoryNameDragEntry.getExplorer(), directoryPath = sourceDirectoryPath; ///
                    explorer.removeDirectoryPath(directoryPath);
                }
                return dragEntry;
            }
        },
        {
            key: "pathMapsFromDragEntries",
            value: function pathMapsFromDragEntries(dragEntries, sourcePath, targetPath) {
                var pathMaps = dragEntries.map(function(dragEntry) {
                    var pathMap = pathMapFromDragEntry(dragEntry, sourcePath, targetPath);
                    return pathMap;
                });
                return pathMaps;
            }
        },
        {
            key: "retrieveMarkedDirectoryNameDragEntry",
            value: function retrieveMarkedDirectoryNameDragEntry() {
                var markedDirectoryNameDragEntry = null; ///
                return markedDirectoryNameDragEntry;
            }
        },
        {
            key: "retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry",
            value: function retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry) {
                var bottommostDirectoryNameDragEntryOverlappingDragEntry = null; ///
                return bottommostDirectoryNameDragEntryOverlappingDragEntry;
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
var _default = (0, _easyWithStyle).default(RubbishBin)(_templateObject());
exports.default = _default;
function defaultRemoveHandler(pathMaps, done) {
    done();
}
function pathMapFromDragEntry(dragEntry, sourcePath, targetPath) {
    var dragEntryPath = dragEntry.getPath(), dragEntryType = dragEntry.getType(), dragEntryDirectoryNameDragEntry = dragEntryType === _types.DIRECTORY_NAME_TYPE, directory = dragEntryDirectoryNameDragEntry; ///
    targetPath = null; ///
    sourcePath = dragEntryPath; ///
    var pathMap = {
        sourcePath: sourcePath,
        targetPath: targetPath,
        directory: directory
    };
    return pathMap;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ydWJiaXNoQmluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5cbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcyhcIm9wZW5cIik7XG5cbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIG1hcmsoZHJhZ0VudHJ5LCBwcmV2aW91c0RyYWdFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ0VudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ0VudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnRW50cnkoZHJhZ0VudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBleHBsb3JlciwgIC8vL1xuICAgICAgICAgICAgcHJldmlvdXNEcmFnRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtEcmFnRW50cnkoZHJhZ0VudHJ5KSB7XG4gICAgY29uc3QgcHJldmlvdXNEcmFnRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5tYXJrKGRyYWdFbnRyeSwgcHJldmlvdXNEcmFnRW50cnkpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lRHJhZ0VudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBkcmFnRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ0VudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ0VudHJ5O1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5TmFtZURyYWdFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRyYWdFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ0VudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnRW50cnk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ0VudHJpZXMubWFwKChkcmFnRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdFbnRyeShkcmFnRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ0VudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeShkcmFnRW50cnkpIHtcbiAgICBjb25zdCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdFbnRyeU92ZXJsYXBwaW5nRHJhZ0VudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnRW50cnlPdmVybGFwcGluZ0RyYWdFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImRpdlwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwicnViYmlzaC1iaW5cIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uUmVtb3ZlXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvblJlbW92ZSA9IGRlZmF1bHRSZW1vdmVIYW5kbGVyfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXIsICAvLy9cbiAgICAgICAgICBydWJiaXNoQmluID0gRHJvcFRhcmdldC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHJldHVybiBydWJiaXNoQmluO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShSdWJiaXNoQmluKWBcblxuICB3aWR0aDogNHJlbTtcbiAgaGVpZ2h0OiA0cmVtO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJjc3MvaW1hZ2UvcnViYmlzaC1iaW4ucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBcbiAgLm9wZW4ge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcImNzcy9pbWFnZS9vcGVuLXJ1YmJpc2gtYmluLnBuZ1wiKTtcbiAgfVxuXG5gO1xuXG5mdW5jdGlvbiBkZWZhdWx0UmVtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnRW50cnlQYXRoID0gZHJhZ0VudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ0VudHJ5VHlwZSA9IGRyYWdFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgIGRyYWdFbnRyeURpcmVjdG9yeU5hbWVEcmFnRW50cnkgPSAoZHJhZ0VudHJ5VHlwZSA9PT0gRElSRUNUT1JZX05BTUVfVFlQRSksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdFbnRyeURpcmVjdG9yeU5hbWVEcmFnRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gbnVsbDsgIC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxjQUFpQjtJQUVoQixX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