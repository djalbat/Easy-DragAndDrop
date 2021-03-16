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
var DropTarget = function(Element1) {
    _inherits(DropTarget, _easy.Element);
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
            key: "isOverlappingDraggableEntry",
            value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
                var bounds = this.getBounds(), boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds), overlappingDraggableEntry = boundsOverlappingDraggableEntry;
                return overlappingDraggableEntry;
            }
        },
        {
            key: "getDropTargetToBeMarked",
            value: function getDropTargetToBeMarked(draggableEntry) {
                var dropTargetToBeMarked = null;
                var toBeMarked = this.isToBeMarked(draggableEntry);
                if (toBeMarked) {
                    dropTargetToBeMarked = this; ///
                } else {
                    this.dropTargets.some(function(dropTarget) {
                        var toBeMarked1 = dropTarget.isToBeMarked(draggableEntry);
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
            key: "moveDraggableEntries",
            value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
                var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);
                this.moveHandler(pathMaps, (function() {
                    var lastDraggableEntry = last(draggableEntries), firstDraggableEntry = first(draggableEntries), firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(), draggableEntriesExplorer = firstDraggableEntryExplorer, removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///
                    if (removeEmptyParentDirectoriesOptionPresent) {
                        draggableEntriesExplorer.unsetOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                    }
                    draggableEntries.forEach((function(draggableEntry) {
                        if (draggableEntry === lastDraggableEntry) {
                            if (removeEmptyParentDirectoriesOptionPresent) {
                                draggableEntriesExplorer.setOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
                            }
                        }
                        var draggableEntryPath = draggableEntry.getPath();
                        if (draggableEntryPath !== null) {
                            var pathMap = pathMaps.find(function(pathMap1) {
                                var sourcePath1 = pathMap1.sourcePath;
                                if (sourcePath1 === draggableEntryPath) {
                                    return true;
                                }
                            }), sourcePath1 = pathMap.sourcePath, targetPath1 = pathMap.targetPath, callback = pathMap.callback;
                            draggableEntry = this.moveDraggableEntry(draggableEntry, sourcePath1, targetPath1);
                            if (callback) {
                                callback(draggableEntry);
                            }
                        }
                    }).bind(this));
                    done();
                }).bind(this));
            }
        },
        {
            key: "moveDraggableEntry",
            value: function moveDraggableEntry(draggableEntry, sourcePath2, targetPath2) {
                var type = draggableEntry.getType();
                switch(type){
                    case _types.FILE_NAME_TYPE:
                        var fileNameDraggableEntry = draggableEntry, sourceFilePath = sourcePath2, targetFilePath = targetPath2;
                        draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        var directoryDraggableEntry = draggableEntry, sourceDirectoryPath = sourcePath2, targetDirectoryPath = targetPath2; ///
                        draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath); ///
                        break;
                }
                return draggableEntry;
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kcm9wVGFyZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXRzO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5hZGREcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXSxcbiAgICAgICAgICBkcm9wVGFyZ2V0ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxLQUFBO0lBQ0EsVUFBQTtJQUVBLFFBQUE7SUFDQSxNQUFBOzs7Ozs7Ozs7Ozs7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Q0FBQSxVQUFBO29CQUVBLEtBQUEsTUFBQSxDQUFBO3dCQUNBLEtBQUEsR0FBQSxLQUFBLEVBQ0EsV0FBQSxHQUFBLENBQUE7eUJBRUEsV0FBQSxDQUFBLE1BQUEsQ0FBQSxLQUFBLEVBQUEsV0FBQTs7b0JBR0EsWUFBQTtBQUNBLDhCQUFBLENBQUEsZ0JBQUEsT0FBQSxDQUFBLEVBQUEsQ0FBQTs7Ozs7O0FBSUEsZUFBQSxHQUFBLFNBQUE7NEJBQUEsU0FBQSxDQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsV0FBQTt3QkFBQSxJQUFBLEdBQUEsU0FBQSxDQUFBLE1BQUEsRUFBQSxrQkFBQSxhQUFBLElBQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsRUFBQSxJQUFBLEdBQUEsSUFBQSxFQUFBLElBQUE7QUFBQSxzQ0FBQSxDQUFBLElBQUEsR0FBQSxDQUFBLElBQUEsU0FBQSxDQUFBLElBQUE7O29CQUNBLFdBQUEsT0FDQSxVQUFBLElBQUEsUUFBQSxHQTNLQSxLQUFBLFVBMktBLFNBQUEsQ0FBQSxLQUFBLENBQUEsUUFBQTtBQUFBLHlCQUFBO0FBQUEsOEJBQUE7QUFBQSwrQkFBQTtBQUFBLCtCQUFBO2tCQUFBLE1BQUEsb0JBQUEsa0JBQUE7dUJBRUEsVUFBQTs7OztXQXJLQSxVQUFBO21CQVJBLEtBQUE7a0JBUUEsVUFBQSJ9