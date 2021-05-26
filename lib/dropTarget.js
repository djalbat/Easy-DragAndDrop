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
    function DropTarget(selector, moveHandler) {
        _classCallCheck(this, DropTarget);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(DropTarget).call(this, selector));
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
                var state = this.getState(), dropTargets = state.dropTargets, toBeMarked = this.isToBeMarked(dragEntry);
                if (toBeMarked) {
                    dropTargetToBeMarked = this; ///
                } else {
                    dropTargets.some(function(dropTarget) {
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
                var state = this.getState(), dropTargets = state.dropTargets, marked = this.isMarked();
                if (marked) {
                    markedDropTarget = this; ///
                } else {
                    dropTargets.some(function(dropTarget) {
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
                var state = this.getState(), dropTargets = state.dropTargets;
                dropTargets.push(dropTarget);
                if (reciprocated) {
                    dropTarget.addDropTarget(this); ///
                }
            }
        },
        {
            key: "removeDropTarget",
            value: function removeDropTarget(dropTarget, param) {
                var reciprocated = param === void 0 ? false : param;
                var state = this.getState(), dropTargets = state.dropTargets, index = dropTargets.indexOf(dropTarget);
                if (index !== -1) {
                    var start = index, deleteCount = 1;
                    dropTargets.splice(start, deleteCount);
                }
                if (reciprocated) {
                    dropTarget.removeDropTarget(this); ///
                }
            }
        },
        {
            key: "initialise",
            value: function initialise() {
                var dropTargets = [];
                this.setState({
                    dropTargets: dropTargets
                });
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties, moveHandler) {
                for(var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++){
                    remainingArguments[_key - 3] = arguments[_key];
                }
                var dropTarget = (_Element = _easy.Element).fromClass.apply(_Element, [
                    Class,
                    properties,
                    moveHandler
                ].concat(_toConsumableArray(remainingArguments)));
                return dropTarget;
            }
        }
    ]);
    return DropTarget;
}(_wrapNativeSuper(_easy.Element));
exports.default = DropTarget;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kcm9wVGFyZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ0VudHJ5KGRyYWdFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ0VudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ0VudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ0VudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ0VudHJ5KSB7XG4gICAgbGV0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gbnVsbDtcblxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnRW50cnkpO1xuXG4gICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnRW50cnkpO1xuXG4gICAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0OyAgLy8vXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGRyb3BUYXJnZXRzIH0gPSBzdGF0ZSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHVubWFya0dsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG4gIH1cblxuICBtb3ZlRHJhZ0VudHJpZXMoZHJhZ0VudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ0VudHJpZXMoZHJhZ0VudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdFbnRyeSA9IGxhc3QoZHJhZ0VudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnRW50cnkgPSBmaXJzdChkcmFnRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZHJhZ0VudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ0VudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ0VudHJpZXMuZm9yRWFjaCgoZHJhZ0VudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnRW50cnkgPT09IGxhc3REcmFnRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdFbnRyeVBhdGggPSBkcmFnRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdFbnRyeVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBjYWxsYmFjayB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgIGRyYWdFbnRyeSA9IHRoaXMubW92ZURyYWdFbnRyeShkcmFnRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soZHJhZ0VudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSk7XG4gIH1cblxuICBtb3ZlRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHR5cGUgPSBkcmFnRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVEcmFnRW50cnkgPSBkcmFnRW50cnksIC8vL1xuICAgICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICAgIGRyYWdFbnRyeSA9IHRoaXMubW92ZUZpbGVOYW1lRHJhZ0VudHJ5KGZpbGVOYW1lRHJhZ0VudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ0VudHJ5ID0gZHJhZ0VudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnRW50cnkoZGlyZWN0b3J5RHJhZ0VudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdFbnRyeTtcbiAgfVxuICBcbiAgYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlO1xuXG4gICAgZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChyZWNpcHJvY2F0ZWQpIHtcbiAgICAgIGRyb3BUYXJnZXQuYWRkRHJvcFRhcmdldCh0aGlzKTsgLy8vXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlLFxuICAgICAgICAgIGluZGV4ID0gZHJvcFRhcmdldHMuaW5kZXhPZihkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcbiAgICAgIFxuICAgICAgZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gW107XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3BUYXJnZXRzXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFWSxLQUFNO0lBQ0MsVUFBVztJQUVNLFFBQVc7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