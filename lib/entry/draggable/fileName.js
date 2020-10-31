"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _draggable = _interopRequireDefault(require("../../entry/draggable"));

var _file = _interopRequireDefault(require("../../button/name/file"));

var _name = require("../../utilities/name");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(FileNameDraggableEntry);

  function FileNameDraggableEntry() {
    var _this;

    _classCallCheck(this, FileNameDraggableEntry);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "type", _types.FILE_NAME_TYPE);

    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: "getFileNameButton",
    ///
    value: function getFileNameButton() {
      var FileNameButton = this.constructor.FileNameButton;
      return FileNameButton;
    }
  }, {
    key: "isBefore",
    value: function isBefore(entry) {
      var before;
      var entryType = entry.getType();

      switch (entryType) {
        case _types.FILE_NAME_TYPE:
        case _types.FILE_NAME_MARKER_TYPE:
        case _types.DIRECTORY_NAME_MARKER_TYPE:
          var name = this.getName(),
              entryName = entry.getName();
          before = (0, _name.nameIsBeforeEntryName)(name, entryName);
          break;

        case _types.DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: "isFileNameDraggableEntry",
    value: function isFileNameDraggableEntry() {
      return true;
    }
  }, {
    key: "isDirectoryNameDraggableEntry",
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: "retrieveDraggableSubEntries",
    value: function retrieveDraggableSubEntries() {
      var draggableSubEntries = []; ///

      return draggableSubEntries;
    }
  }, {
    key: "doubleClickHandler",
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }, {
    key: "childElements",
    value: function childElements() {
      var name = this.properties.name,
          fileName = name,
          FileNameButton = this.getFileNameButton();
      return [React.createElement(FileNameButton, null, fileName)];
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var fileNameDraggableEntry = _draggable["default"].fromClass(Class, properties);

      fileNameDraggableEntry.initialise();
      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(_draggable["default"]);

exports["default"] = FileNameDraggableEntry;

_defineProperty(FileNameDraggableEntry, "FileNameButton", _file["default"]);

_defineProperty(FileNameDraggableEntry, "defaultProperties", {
  className: "file-name"
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJGSUxFX05BTUVfVFlQRSIsIkZpbGVOYW1lQnV0dG9uIiwiY29uc3RydWN0b3IiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsImRyYWdnYWJsZVN1YkVudHJpZXMiLCJleHBsb3JlciIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsImZpbGVOYW1lIiwiZ2V0RmlsZU5hbWVCdXR0b24iLCJDbGFzcyIsImZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJjbGFzc05hbWUiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkEsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7MkRBQ1pDLHFCOzs7Ozs7O0FBQWlCO3dDQUVKO0FBQUEsVUFDVkMsY0FEVSxHQUNTLEtBQUtDLFdBRGQsQ0FDVkQsY0FEVTtBQUdsQixhQUFPQSxjQUFQO0FBQ0Q7Ozs2QkFFUUUsSyxFQUFPO0FBQ2QsVUFBSUMsTUFBSjtBQUVBLFVBQU1DLFNBQVMsR0FBR0YsS0FBSyxDQUFDRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLTCxxQkFBTDtBQUNBLGFBQUtPLDRCQUFMO0FBQ0EsYUFBS0MsaUNBQUw7QUFDRSxjQUFNQyxJQUFJLEdBQUcsS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMsU0FBUyxHQUFHUixLQUFLLENBQUNPLE9BQU4sRUFEbEI7QUFHQU4sVUFBQUEsTUFBTSxHQUFHLGlDQUFzQkssSUFBdEIsRUFBNEJFLFNBQTVCLENBQVQ7QUFDQTs7QUFFRixhQUFLQywwQkFBTDtBQUNFUixVQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNBO0FBWko7O0FBZUEsYUFBT0EsTUFBUDtBQUNEOzs7K0NBRTBCO0FBQ3pCLGFBQU8sSUFBUDtBQUNEOzs7b0RBRStCO0FBQzlCLGFBQU8sS0FBUDtBQUNEOzs7a0RBRTZCO0FBQzVCLFVBQU1TLG1CQUFtQixHQUFHLEVBQTVCLENBRDRCLENBQ0s7O0FBRWpDLGFBQU9BLG1CQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxJQUFJLEdBQUcsSUFEYixDQURtQixDQUVBOztBQUVuQkYsTUFBQUEsUUFBUSxDQUFDRywwQkFBVCxDQUFvQ0QsSUFBcEM7QUFDRDs7O29DQUVlO0FBQ1IsVUFBRVAsSUFBRixHQUFXLEtBQUtTLFVBQWhCLENBQUVULElBQUY7QUFBQSxVQUNBVSxRQURBLEdBQ1VWLElBRFY7QUFBQSxVQUVBUixjQUZBLEdBRWlCLEtBQUttQixpQkFBTCxFQUZqQjtBQUlOLGFBQVEsQ0FFTixvQkFBQyxjQUFELFFBQWlCRCxRQUFqQixDQUZNLENBQVI7QUFLRDs7OzhCQVFnQkUsSyxFQUFPSCxVLEVBQVk7QUFDbEMsVUFBTUksc0JBQXNCLEdBQUdDLHNCQUFlQyxTQUFmLENBQXlCSCxLQUF6QixFQUFnQ0gsVUFBaEMsQ0FBL0I7O0FBRUFJLE1BQUFBLHNCQUFzQixDQUFDRyxVQUF2QjtBQUVBLGFBQU9ILHNCQUFQO0FBQ0Q7Ozs7RUE3RWlEQyxxQjs7OztnQkFBL0J4QixzQixvQkFpRUtFLGdCOztnQkFqRUxGLHNCLHVCQW1FUTtBQUN6QjJCLEVBQUFBLFNBQVMsRUFBRTtBQURjLEMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcbmltcG9ydCBGaWxlTmFtZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL25hbWUvZmlsZVwiO1xuXG5pbXBvcnQgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL25hbWVcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIHR5cGUgPSBGSUxFX05BTUVfVFlQRTsgIC8vL1xuXG4gIGdldEZpbGVOYW1lQnV0dG9uKCkge1xuICAgIGNvbnN0IHsgRmlsZU5hbWVCdXR0b24gfSA9IHRoaXMuY29uc3RydWN0b3I7XG5cbiAgICByZXR1cm4gRmlsZU5hbWVCdXR0b247XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZVN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVTdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cygpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHRoaXMucHJvcGVydGllcyxcbiAgICAgICAgICBmaWxlTmFtZT0gbmFtZSwgLy8vXG4gICAgICAgICAgRmlsZU5hbWVCdXR0b24gPSB0aGlzLmdldEZpbGVOYW1lQnV0dG9uKCk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPEZpbGVOYW1lQnV0dG9uPntmaWxlTmFtZX08L0ZpbGVOYW1lQnV0dG9uPlxuXG4gICAgXSk7XG4gIH1cblxuICBzdGF0aWMgRmlsZU5hbWVCdXR0b24gPSBGaWxlTmFtZUJ1dHRvbjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuIl19