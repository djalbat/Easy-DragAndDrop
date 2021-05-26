"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _drag = _interopRequireDefault(require("../../entry/drag"));
var _file = _interopRequireDefault(require("../../button/name/file"));
var _name = require("../../utilities/name");
var _types = require("../../types");
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
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
var FileNameDragEntry = /*#__PURE__*/ function(DragEntry) {
    _inherits(FileNameDragEntry, DragEntry);
    function FileNameDragEntry() {
        _classCallCheck(this, FileNameDragEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(FileNameDragEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_TYPE);
        return _this;
    }
    _createClass(FileNameDragEntry, [
        {
            key: "getFileNameButton",
            value: function getFileNameButton() {
                var _constructor = this.constructor, FileNameButton = _constructor.FileNameButton;
                return FileNameButton;
            }
        },
        {
            key: "isBefore",
            value: function isBefore(entry) {
                var before;
                var entryType = entry.getType();
                switch(entryType){
                    case _types.FILE_NAME_TYPE:
                    case _types.FILE_NAME_MARKER_TYPE:
                    case _types.DIRECTORY_NAME_MARKER_TYPE:
                        var name = this.getName(), entryName = entry.getName();
                        before = (0, _name).nameIsBeforeEntryName(name, entryName);
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        before = false;
                        break;
                }
                return before;
            }
        },
        {
            key: "isFileNameDragEntry",
            value: function isFileNameDragEntry() {
                return true;
            }
        },
        {
            key: "isDirectoryNameDragEntry",
            value: function isDirectoryNameDragEntry() {
                return false;
            }
        },
        {
            key: "retrieveDragSubEntries",
            value: function retrieveDragSubEntries() {
                var dragSubEntries = []; ///
                return dragSubEntries;
            }
        },
        {
            key: "doubleClickHandler",
            value: function doubleClickHandler() {
                var explorer = this.getExplorer(), file = this; ///
                explorer.openFileNameDragEntry(file);
            }
        },
        {
            key: "childElements",
            value: function childElements() {
                var _properties = this.properties, name = _properties.name, fileName = name, FileNameButton = this.getFileNameButton();
                return [
                    /*#__PURE__*/ React.createElement(FileNameButton, null, fileName)
                ];
            }
        }
    ]);
    return FileNameDragEntry;
}(_drag.default);
_defineProperty(FileNameDragEntry, "FileNameButton", _file.default);
_defineProperty(FileNameDragEntry, "defaultProperties", {
    className: "file-name"
});
exports.default = FileNameDragEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9kcmFnL2ZpbGVOYW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRHJhZ0VudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnXCI7XG5pbXBvcnQgRmlsZU5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lL2ZpbGVcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZURyYWdFbnRyeSBleHRlbmRzIERyYWdFbnRyeSB7XG4gIHR5cGUgPSBGSUxFX05BTUVfVFlQRTsgIC8vL1xuXG4gIGdldEZpbGVOYW1lQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgRmlsZU5hbWVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVCdXR0b247XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXRyaWV2ZURyYWdTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IGRyYWdTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ1N1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGVOYW1lRHJhZ0VudHJ5KGZpbGUpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBmaWxlTmFtZT0gbmFtZSwgLy8vXG4gICAgICAgICAgRmlsZU5hbWVCdXR0b24gPSB0aGlzLmdldEZpbGVOYW1lQnV0dG9uKCk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPEZpbGVOYW1lQnV0dG9uPntmaWxlTmFtZX08L0ZpbGVOYW1lQnV0dG9uPlxuXG4gICAgXSk7XG4gIH1cblxuICBzdGF0aWMgRmlsZU5hbWVCdXR0b24gPSBGaWxlTmFtZUJ1dHRvbjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBWTs7Ozs7SUFFVSxLQUFrQjtJQUNiLEtBQXdCO0lBRWIsS0FBc0I7SUFDMkMsTUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUUvRixpQkFBaUI7Y0FBakIsaUJBQWlCO2FBQWpCLGlCQUFpQjs4QkFBakIsaUJBQWlCOztpRUFBakIsaUJBQWlCO3dEQUNwQyxJQUFJLEdBSGlHLE1BQWE7OztpQkFFL0YsaUJBQWlCOztZQUdwQyxHQUFpQixHQUFqQixpQkFBaUI7NEJBQWpCLGlCQUFpQjtvQkFDWSxZQUFnQixRQUFYLFdBQVcsRUFBbkMsY0FBYyxHQUFLLFlBQWdCLENBQW5DLGNBQWM7dUJBRWYsY0FBYzs7OztZQUd2QixHQUFRLEdBQVIsUUFBUTs0QkFBUixRQUFRLENBQUMsS0FBSztvQkFDUixNQUFNO29CQUVKLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTzt1QkFFdkIsU0FBUzt5QkFoQmtGLE1BQWE7eUJBQWIsTUFBYTt5QkFBYixNQUFhOzRCQW9CdEcsSUFBSSxRQUFRLE9BQU8sSUFDbkIsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPO3dCQUUvQixNQUFNLE9BeEJ3QixLQUFzQix3QkF3QnJCLElBQUksRUFBRSxTQUFTOzt5QkF2QmlELE1BQWE7d0JBMkI1RyxNQUFNLEdBQUcsS0FBSzs7O3VCQUlYLE1BQU07Ozs7WUFHZixHQUFtQixHQUFuQixtQkFBbUI7NEJBQW5CLG1CQUFtQjt1QkFDVixJQUFJOzs7O1lBR2IsR0FBd0IsR0FBeEIsd0JBQXdCOzRCQUF4Qix3QkFBd0I7dUJBQ2YsS0FBSzs7OztZQUdkLEdBQXNCLEdBQXRCLHNCQUFzQjs0QkFBdEIsc0JBQXNCO29CQUNkLGNBQWMsTUFBUSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRXhCLGNBQWM7Ozs7WUFHdkIsR0FBa0IsR0FBbEIsa0JBQWtCOzRCQUFsQixrQkFBa0I7b0JBQ1YsUUFBUSxRQUFRLFdBQVcsSUFDM0IsSUFBSSxRQUFTLENBQUcsQUFBSCxFQUFHLEFBQUgsQ0FBRztnQkFFdEIsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUk7Ozs7WUFHckMsR0FBYSxHQUFiLGFBQWE7NEJBQWIsYUFBYTtvQkFDTSxXQUFlLFFBQVYsVUFBVSxFQUF4QixJQUFJLEdBQUssV0FBZSxDQUF4QixJQUFJLEVBQ04sUUFBUSxHQUFFLElBQUksRUFDZCxjQUFjLFFBQVEsaUJBQWlCOztzREFJMUMsY0FBYyxRQUFFLFFBQVE7Ozs7O1dBNURWLGlCQUFpQjtFQU5oQixLQUFrQjtnQkFNbkIsaUJBQWlCLEdBaUU3QixjQUFjLEdBdEVJLEtBQXdCO2dCQUs5QixpQkFBaUIsR0FtRTdCLGlCQUFpQjtJQUN0QixTQUFTLEdBQUUsU0FBVzs7a0JBcEVMLGlCQUFpQiJ9