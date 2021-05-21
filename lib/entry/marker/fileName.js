"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _marker = _interopRequireDefault(require("../../entry/marker"));
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
var FileNameMarkerEntry = /*#__PURE__*/ function(MarkerEntry) {
    _inherits(FileNameMarkerEntry, MarkerEntry);
    function FileNameMarkerEntry() {
        _classCallCheck(this, FileNameMarkerEntry);
        var _this;
        _this = _possibleConstructorReturn(this, _getPrototypeOf(FileNameMarkerEntry).apply(this, arguments));
        _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_MARKER_TYPE);
        return _this;
    }
    _createClass(FileNameMarkerEntry, [
        {
            key: "isBefore",
            value: function isBefore(draggableEntry) {
                var before;
                var draggableEntryType = draggableEntry.getType();
                switch(draggableEntryType){
                    case _types.FILE_NAME_TYPE:
                        var name = this.getName(), draggableEntryName = draggableEntry.getName();
                        before = (0, _name).nameIsBeforeEntryName(name, draggableEntryName);
                        break;
                    case _types.DIRECTORY_NAME_TYPE:
                        before = false;
                        break;
                }
                return before;
            }
        }
    ], [
        {
            key: "fromClass",
            value: function fromClass(Class, properties) {
                var type = _types.FILE_NAME_MARKER_TYPE, fileNameMarkerEntry = _marker.default.fromClass(Class, properties, type);
                return fileNameMarkerEntry;
            }
        }
    ]);
    return FileNameMarkerEntry;
}(_marker.default);
_defineProperty(FileNameMarkerEntry, "defaultProperties", {
    className: "file-name"
});
exports.default = FileNameMarkerEntry;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBNYXJrZXJFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvbWFya2VyXCI7XG5cbmltcG9ydCB7IG5hbWVJc0JlZm9yZUVudHJ5TmFtZSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvbmFtZVwiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFO1xuXG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ2dhYmxlRW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEUsXG4gICAgICAgICAgZmlsZU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJDQUFBLFVBQVk7Ozs7O0lBRVksT0FBb0I7SUFFTixLQUFzQjtJQUNlLE1BQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFbkUsbUJBQW1CO2NBQW5CLG1CQUFtQjthQUFuQixtQkFBbUI7OEJBQW5CLG1CQUFtQjs7aUVBQW5CLG1CQUFtQjt3REFDdEMsSUFBSSxHQUhxRSxNQUFhOzs7aUJBRW5FLG1CQUFtQjs7WUFHdEMsR0FBUSxHQUFSLFFBQVE7NEJBQVIsUUFBUSxDQUFDLGNBQWM7b0JBQ2pCLE1BQU07b0JBRUosa0JBQWtCLEdBQUcsY0FBYyxDQUFDLE9BQU87dUJBRXpDLGtCQUFrQjt5QkFWNkMsTUFBYTs0QkFZMUUsSUFBSSxRQUFRLE9BQU8sSUFDbkIsa0JBQWtCLEdBQUcsY0FBYyxDQUFDLE9BQU87d0JBRWpELE1BQU0sT0FoQndCLEtBQXNCLHdCQWdCckIsSUFBSSxFQUFFLGtCQUFrQjs7eUJBZlksTUFBYTt3QkFtQmhGLE1BQU0sR0FBRyxLQUFLOzs7dUJBSVgsTUFBTTs7Ozs7WUFPUixHQUFTLEdBQVQsU0FBUzs0QkFBVCxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVU7b0JBQzFCLElBQUksR0EvQjZELE1BQWEsd0JBZ0M5RSxtQkFBbUIsR0FuQ0wsT0FBb0IsU0FtQ0EsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSTt1QkFFbEUsbUJBQW1COzs7O1dBaENULG1CQUFtQjtFQUxoQixPQUFvQjtnQkFLdkIsbUJBQW1CLEdBd0IvQixpQkFBaUI7SUFDdEIsU0FBUyxHQUFFLFNBQVc7O2tCQXpCTCxtQkFBbUIifQ==