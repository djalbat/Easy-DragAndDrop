"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easy = require("easy");
var _necessary = require("necessary");
var _drop = _interopRequireDefault(require("./mixins/drop"));
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
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
Object.assign(DropTarget.prototype, _drop.default);

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kcm9wVGFyZ2V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgZHJvcE1peGlucyBmcm9tIFwiLi9taXhpbnMvZHJvcFwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBkcm9wVGFyZ2V0cyB9ID0gc3RhdGUsXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdFbnRyeSk7XG5cbiAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgZHJvcFRhcmdldHMgfSA9IHN0YXRlLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgdW5tYXJrR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcbiAgfVxuXG4gIG1vdmVEcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnRW50cmllcyhkcmFnRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCAoKSA9PiB7XG4gICAgICBjb25zdCBsYXN0RHJhZ0VudHJ5ID0gbGFzdChkcmFnRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdFbnRyeSA9IGZpcnN0KGRyYWdFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ0VudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ0VudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ0VudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnRW50cmllc0V4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBkcmFnRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnRW50cmllcy5mb3JFYWNoKChkcmFnRW50cnkpID0+IHtcbiAgICAgICAgaWYgKGRyYWdFbnRyeSA9PT0gbGFzdERyYWdFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ0VudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ0VudHJ5UGF0aCA9IGRyYWdFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcHMuZmluZCgocGF0aE1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgeyBzb3VyY2VQYXRoIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgICAgICAgICBpZiAoc291cmNlUGF0aCA9PT0gZHJhZ0VudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRHJhZ0VudHJ5KGRyYWdFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnRW50cnkoZHJhZ0VudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZURyYWdFbnRyeSA9IGRyYWdFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRmlsZU5hbWVEcmFnRW50cnkoZmlsZU5hbWVEcmFnRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnRW50cnkgPSBkcmFnRW50cnksICAvLy9cbiAgICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgICB0YXJnZXREaXJlY3RvcnlQYXRoID0gdGFyZ2V0UGF0aDsgLy8vXG5cbiAgICAgICAgZHJhZ0VudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdFbnRyeShkaXJlY3RvcnlEcmFnRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ0VudHJ5O1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJvcFRhcmdldC5wcm90b3R5cGUsIGRyb3BNaXhpbnMpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVksS0FBTTtJQUNDLFVBQVc7SUFFbkIsS0FBZTtJQUVVLFFBQVc7SUFDUCxNQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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