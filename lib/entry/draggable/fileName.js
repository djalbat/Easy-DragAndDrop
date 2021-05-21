"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _draggable = _interopRequireDefault(require("../../entry/draggable"));
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
var FileNameDraggableEntry = /*#__PURE__*/ function(DraggableEntry) {
    _inherits(FileNameDraggableEntry, DraggableEntry);
    function FileNameDraggableEntry() {
        _classCallCheck(this, FileNameDraggableEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(FileNameDraggableEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_TYPE);
        return _this;
    }
    _createClass(FileNameDraggableEntry, [
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
            key: "isFileNameDraggableEntry",
            value: function isFileNameDraggableEntry() {
                return true;
            }
        },
        {
            key: "isDirectoryNameDraggableEntry",
            value: function isDirectoryNameDraggableEntry() {
                return false;
            }
        },
        {
            key: "retrieveDraggableSubEntries",
            value: function retrieveDraggableSubEntries() {
                var draggableSubEntries = []; ///
                return draggableSubEntries;
            }
        },
        {
            key: "doubleClickHandler",
            value: function doubleClickHandler() {
                var explorer = this.getExplorer(), file = this; ///
                explorer.openFileNameDraggableEntry(file);
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
    return FileNameDraggableEntry;
}(_draggable.default);
_defineProperty(FileNameDraggableEntry, "FileNameButton", _file.default);
_defineProperty(FileNameDraggableEntry, "defaultProperties", {
    className: "file-name"
});
exports.default = FileNameDraggableEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvZHJhZ2dhYmxlXCI7XG5pbXBvcnQgRmlsZU5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lL2ZpbGVcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICB0eXBlID0gRklMRV9OQU1FX1RZUEU7ICAvLy9cblxuICBnZXRGaWxlTmFtZUJ1dHRvbigpIHtcbiAgICBjb25zdCB7IEZpbGVOYW1lQnV0dG9uIH0gPSB0aGlzLmNvbnN0cnVjdG9yO1xuXG4gICAgcmV0dXJuIEZpbGVOYW1lQnV0dG9uO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlU3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMoKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSB0aGlzLnByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWU9IG5hbWUsIC8vL1xuICAgICAgICAgIEZpbGVOYW1lQnV0dG9uID0gdGhpcy5nZXRGaWxlTmFtZUJ1dHRvbigpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxGaWxlTmFtZUJ1dHRvbj57ZmlsZU5hbWV9PC9GaWxlTmFtZUJ1dHRvbj5cblxuICAgIF0pO1xuICB9XG5cbiAgc3RhdGljIEZpbGVOYW1lQnV0dG9uID0gRmlsZU5hbWVCdXR0b247XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJmaWxlLW5hbWVcIlxuICB9O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRWUsVUFBdUI7SUFDdkIsS0FBd0I7SUFFYixLQUFzQjtJQUMyQyxNQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRS9GLHNCQUFzQjtjQUF0QixzQkFBc0I7YUFBdEIsc0JBQXNCOzhCQUF0QixzQkFBc0I7O2lFQUF0QixzQkFBc0I7d0RBQ3pDLElBQUksR0FIaUcsTUFBYTs7O2lCQUUvRixzQkFBc0I7O1lBR3pDLEdBQWlCLEdBQWpCLGlCQUFpQjs0QkFBakIsaUJBQWlCO29CQUNZLFlBQWdCLFFBQVgsV0FBVyxFQUFuQyxjQUFjLEdBQUssWUFBZ0IsQ0FBbkMsY0FBYzt1QkFFZixjQUFjOzs7O1lBR3ZCLEdBQVEsR0FBUixRQUFROzRCQUFSLFFBQVEsQ0FBQyxLQUFLO29CQUNSLE1BQU07b0JBRUosU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPO3VCQUV2QixTQUFTO3lCQWhCa0YsTUFBYTt5QkFBYixNQUFhO3lCQUFiLE1BQWE7NEJBb0J0RyxJQUFJLFFBQVEsT0FBTyxJQUNuQixTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU87d0JBRS9CLE1BQU0sT0F4QndCLEtBQXNCLHdCQXdCckIsSUFBSSxFQUFFLFNBQVM7O3lCQXZCaUQsTUFBYTt3QkEyQjVHLE1BQU0sR0FBRyxLQUFLOzs7dUJBSVgsTUFBTTs7OztZQUdmLEdBQXdCLEdBQXhCLHdCQUF3Qjs0QkFBeEIsd0JBQXdCO3VCQUNmLElBQUk7Ozs7WUFHYixHQUE2QixHQUE3Qiw2QkFBNkI7NEJBQTdCLDZCQUE2Qjt1QkFDcEIsS0FBSzs7OztZQUdkLEdBQTJCLEdBQTNCLDJCQUEyQjs0QkFBM0IsMkJBQTJCO29CQUNuQixtQkFBbUIsTUFBUSxDQUFHLEFBQUgsRUFBRyxBQUFILENBQUc7dUJBRTdCLG1CQUFtQjs7OztZQUc1QixHQUFrQixHQUFsQixrQkFBa0I7NEJBQWxCLGtCQUFrQjtvQkFDVixRQUFRLFFBQVEsV0FBVyxJQUMzQixJQUFJLFFBQVMsQ0FBRyxBQUFILEVBQUcsQUFBSCxDQUFHO2dCQUV0QixRQUFRLENBQUMsMEJBQTBCLENBQUMsSUFBSTs7OztZQUcxQyxHQUFhLEdBQWIsYUFBYTs0QkFBYixhQUFhO29CQUNNLFdBQWUsUUFBVixVQUFVLEVBQXhCLElBQUksR0FBSyxXQUFlLENBQXhCLElBQUksRUFDTixRQUFRLEdBQUUsSUFBSSxFQUNkLGNBQWMsUUFBUSxpQkFBaUI7O3NEQUkxQyxjQUFjLFFBQUUsUUFBUTs7Ozs7V0E1RFYsc0JBQXNCO0VBTmhCLFVBQXVCO2dCQU03QixzQkFBc0IsR0FpRWxDLGNBQWMsR0F0RUksS0FBd0I7Z0JBSzlCLHNCQUFzQixHQW1FbEMsaUJBQWlCO0lBQ3RCLFNBQVMsR0FBRSxTQUFXOztrQkFwRUwsc0JBQXNCIn0=