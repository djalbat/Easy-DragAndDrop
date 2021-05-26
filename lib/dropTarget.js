"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easy = require("easy");
var _necessary = require("necessary");
var _options = require("./options");
var _types = require("./types");
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
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
function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function _construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _setPrototypeOf(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
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
function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
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
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _setPrototypeOf(Wrapper, Class);
    };
    return _wrapNativeSuper(Class);
}
var _Element;
var first = _necessary.arrayUtilities.first, last = _necessary.arrayUtilities.last;
var DropTarget = /*#__PURE__*/ function(Element1) {
    _inherits(DropTarget, Element1);
    function DropTarget(selector, dropTargets, moveHandler) {
        _classCallCheck(this, DropTarget);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(DropTarget).call(this, selector));
        _this.dropTargets = dropTargets;
        _this.moveHandler = moveHandler;
        return _this;
    }
    _createClass(DropTarget, [
        {
            key: "isOverlappingDragEntry",
            value: function isOverlappingDragEntry(dragEntryCollapsedBounds) {
                var bounds = this.getBounds(), boundsOverlappingDragEntry = bounds.areOverlapping(dragEntryCollapsedBounds), overlappingDragEntry = boundsOverlappingDragEntry;
                return overlappingDragEntry;
            }
        },
        {
            key: "getDropTargetToBeMarked",
            value: function getDropTargetToBeMarked(dragEntry) {
                var dropTargetToBeMarked = null;
                var toBeMarked = this.isToBeMarked(dragEntry);
                if (toBeMarked) {
                    dropTargetToBeMarked = this; ///
                } else {
                    this.dropTargets.some(function(dropTarget) {
                        var toBeMarked1 = dropTarget.isToBeMarked(dragEntry);
                        if (toBeMarked1) {
                            dropTargetToBeMarked = dropTarget; ///
                            return true;
                        }
                    });
                }
                return dropTargetToBeMarked;
            }
        },
        {
            key: "getMarkedDropTarget",
            value: function getMarkedDropTarget() {
                var markedDropTarget = null;
                var marked = this.isMarked();
                if (marked) {
                    markedDropTarget = this; ///
                } else {
                    this.dropTargets.some(function(dropTarget) {
                        var dropTargetMarked = dropTarget.isMarked();
                        if (dropTargetMarked) {
                            markedDropTarget = dropTarget;
                            return true;
                        }
                    });
                }
                return markedDropTarget;
            }
        },
        {
            key: "unmarkGlobally",
            value: function unmarkGlobally() {
                var markedDropTarget = this.getMarkedDropTarget();
                markedDropTarget.unmark();
            }
        },
        {
            key: "moveDragEntries",
            value: function moveDragEntries(dragEntries, sourcePath, targetPath, done) {
                var pathMaps = this.pathMapsFromDragEntries(dragEntries, sourcePath, targetPath);
                this.moveHandler(pathMaps, (function() {
                    var lastDragEntry = last(dragEntries), firstDragEntry = first(dragEntries), firstDragEntryExplorer = firstDragEntry.getExplorer(), dragEntriesExplorer = firstDragEntryExplorer, removeEmptyParentDirectoriesOptionPresent = dragEntriesExplorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///
                    if (removeEmptyParentDirectoriesOptionPresent) {
                        dragEntriesExplorer.unsetOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                    }
                    dragEntries.forEach((function(dragEntry) {
                        if (dragEntry === lastDragEntry) {
                            if (removeEmptyParentDirectoriesOptionPresent) {
                                dragEntriesExplorer.setOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                            }
                        }
                        var dragEntryPath = dragEntry.getPath();
                        if (dragEntryPath !== null) {
                            var pathMap = pathMaps.find(function(pathMap1) {
                                var sourcePath1 = pathMap1.sourcePath;
                                if (sourcePath1 === dragEntryPath) {
                                    return true;
                                }
                            }), sourcePath1 = pathMap.sourcePath, targetPath1 = pathMap.targetPath, callback = pathMap.callback;
                            dragEntry = this.moveDragEntry(dragEntry, sourcePath1, targetPath1);
                            if (callback) {
                                callback(dragEntry);
                            }
                        }
                    }).bind(this));
                    done();
                }).bind(this));
            }
        },
        {
            key: "moveDragEntry",
            value: function moveDragEntry(dragEntry, sourcePath2, targetPath2) {
                var type = dragEntry.getType();
                switch(type){
                    case _types.FILE_NAME_TYPE:
                        var fileNameDragEntry = dragEntry, sourceFilePath = sourcePath2, targetFilePath = targetPath2;
                        dragEntry = this.moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath); ///
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        var directoryDragEntry = dragEntry, sourceDirectoryPath = sourcePath2, targetDirectoryPath = targetPath2; ///
                        dragEntry = this.moveDirectoryNameDragEntry(directoryDragEntry, sourceDirectoryPath, targetDirectoryPath); ///
                        break;
                }
                return dragEntry;
            }
        },
        {
            key: "addDropTarget",
            value: function addDropTarget(dropTarget, param) {
                var reciprocated = param === void 0 ? false : param;
                this.dropTargets.push(dropTarget);
                if (reciprocated) {
                    dropTarget.addDropTarget(this); ///
                }
            }
        },
        {
            key: "removeDropTarget",
            value: function removeDropTarget(dropTarget, param) {
                var reciprocated = param === void 0 ? false : param;
                var index = this.dropTargets.indexOf(dropTarget);
                if (index !== -1) {
                    var start = index, deleteCount = 1;
                    this.dropTargets.splice(start, deleteCount);
                }
                if (reciprocated) {
                    dropTarget.removeDropTarget(this); ///
                }
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties, moveHandler) {
                for(var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
                    remainingArguments[_key - 3] = arguments[_key];
                }
                var dropTargets = [], dropTarget = (_Element = _easy.Element).fromClass.apply(_Element, [
                    Class,
                    properties,
                    dropTargets,
                    moveHandler
                ].concat(_toConsumableArray(remainingArguments)));
                return dropTarget;
            }
        }
    ]);
    return DropTarget;
}(_wrapNativeSuper(_easy.Element));
exports.default = DropTarget;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kcm9wVGFyZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXRzO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdFbnRyeShkcmFnRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ0VudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdFbnRyeSkge1xuICAgIGxldCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IG51bGw7XG5cbiAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ0VudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnRW50cnkpO1xuXG4gICAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0OyAgLy8vXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgdW5tYXJrR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcbiAgfVxuXG4gIG1vdmVEcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0RHJhZ0VudHJ5ID0gbGFzdChkcmFnRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdFbnRyeSA9IGZpcnN0KGRyYWdFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ0VudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ0VudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ0VudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnRW50cmllc0V4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBkcmFnRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnRW50cmllcy5mb3JFYWNoKChkcmFnRW50cnkpID0+IHtcbiAgICAgICAgaWYgKGRyYWdFbnRyeSA9PT0gbGFzdERyYWdFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0VudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ0VudHJ5UGF0aCA9IGRyYWdFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcHMuZmluZCgocGF0aE1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgeyBzb3VyY2VQYXRoIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGF0aCA9PT0gZHJhZ0VudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnRW50cnkoZHJhZ0VudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZURyYWdFbnRyeSA9IGRyYWdFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRmlsZU5hbWVEcmFnRW50cnkoZmlsZU5hbWVEcmFnRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnRW50cnkgPSBkcmFnRW50cnksICAvLy9cbiAgICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdFbnRyeShkaXJlY3RvcnlEcmFnRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ0VudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5hZGREcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXSxcbiAgICAgICAgICBkcm9wVGFyZ2V0ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFWSxLQUFNO0lBQ0MsVUFBVztJQUVNLFFBQVc7SUFDUCxNQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUt0QyxRQUFPO0lBckt0QixLQUFLLEdBTGtCLFVBQVcsZ0JBS2xDLEtBQUssRUFBRSxJQUFJLEdBTFksVUFBVyxnQkFLM0IsSUFBSTtJQUVFLFVBQVU7Y0FBVixVQUFVO2FBQVYsVUFBVSxDQUNqQixRQUFRLEVBQUUsV0FBVyxF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