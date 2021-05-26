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
            value: function isBefore(dragEntry) {
                var before;
                var dragEntryType = dragEntry.getType();
                switch(dragEntryType){
                    case _types.FILE_NAME_TYPE:
                        var name = this.getName(), dragEntryName = dragEntry.getName();
                        before = (0, _name).nameIsBeforeEntryName(name, dragEntryName);
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBNYXJrZXJFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvbWFya2VyXCI7XG5cbmltcG9ydCB7IG5hbWVJc0JlZm9yZUVudHJ5TmFtZSB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvbmFtZVwiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFO1xuXG4gIGlzQmVmb3JlKGRyYWdFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnRW50cnlUeXBlID0gZHJhZ0VudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ0VudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBkcmFnRW50cnlOYW1lID0gZHJhZ0VudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ0VudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJmaWxlLW5hbWVcIlxuICB9O1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFLFxuICAgICAgICAgIGZpbGVOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFZOzs7OztJQUVZLE9BQW9CO0lBRU4sS0FBc0I7SUFDZSxNQUFhOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRW5FLG1CQUFtQjtjQUFuQixtQkFBbUI7YUFBbkIsbUJBQW1COzhCQUFuQixtQkFBbUI7O2lFQUFuQixtQkFBbUI7d0RBQ3RDLElBQUksR0FIcUUsTUFBYTs7O2lCQUVuRSxtQkFBbUI7O1lBR3RDLEdBQVEsR0FBUixRQUFROzRCQUFSLFFBQVEsQ0FBQyxTQUFTO29CQUNaLE1BQU07b0JBRUosYUFBYSxHQUFHLFNBQVMsQ0FBQyxPQUFPO3VCQUUvQixhQUFhO3lCQVZrRCxNQUFhOzRCQVkxRSxJQUFJLFFBQVEsT0FBTyxJQUNuQixhQUFhLEdBQUcsU0FBUyxDQUFDLE9BQU87d0JBRXZDLE1BQU0sT0FoQndCLEtBQXNCLHdCQWdCckIsSUFBSSxFQUFFLGFBQWE7O3lCQWZpQixNQUFhO3dCQW1CaEYsTUFBTSxHQUFHLEtBQUs7Ozt1QkFJWCxNQUFNOzs7OztZQU9SLEdBQVMsR0FBVCxTQUFTOzRCQUFULFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBVTtvQkFDMUIsSUFBSSxHQS9CNkQsTUFBYSx3QkFnQzlFLG1CQUFtQixHQW5DTCxPQUFvQixTQW1DQSxTQUFTLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJO3VCQUVsRSxtQkFBbUI7Ozs7V0FoQ1QsbUJBQW1CO0VBTGhCLE9BQW9CO2dCQUt2QixtQkFBbUIsR0F3Qi9CLGlCQUFpQjtJQUN0QixTQUFTLEdBQUUsU0FBVzs7a0JBekJMLG1CQUFtQiJ9