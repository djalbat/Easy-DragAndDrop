"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var types = require("../../types"),
    MarkerEntry = require("../../entry/marker"),
    nameUtilities = require("../../utilities/name");

var nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var FileNameMarkerEntry = /*#__PURE__*/function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  var _super = _createSuper(FileNameMarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _super.apply(this, arguments);
  }

  _createClass(FileNameMarkerEntry, [{
    key: "isBefore",
    value: function isBefore(draggableEntry) {
      var before;
      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = nameIsBeforeEntryName(name, draggableEntryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = MarkerEntry.fromClass(Class, properties, type);
      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: "file-name"
  }
});
module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbInR5cGVzIiwicmVxdWlyZSIsIk1hcmtlckVudHJ5IiwibmFtZVV0aWxpdGllcyIsIm5hbWVJc0JlZm9yZUVudHJ5TmFtZSIsIkZJTEVfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfVFlQRSIsIkZpbGVOYW1lTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImJlZm9yZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJuYW1lIiwiZ2V0TmFtZSIsImRyYWdnYWJsZUVudHJ5TmFtZSIsIkNsYXNzIiwicHJvcGVydGllcyIsInR5cGUiLCJmaWxlTmFtZU1hcmtlckVudHJ5IiwiZnJvbUNsYXNzIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsYUFBRCxDQUFyQjtBQUFBLElBQ01DLFdBQVcsR0FBR0QsT0FBTyxDQUFDLG9CQUFELENBRDNCO0FBQUEsSUFFTUUsYUFBYSxHQUFHRixPQUFPLENBQUMsc0JBQUQsQ0FGN0I7O0FBSU0sSUFBRUcscUJBQUYsR0FBNEJELGFBQTVCLENBQUVDLHFCQUFGO0FBQUEsSUFDRUMsY0FERixHQUNpRUwsS0FEakUsQ0FDRUssY0FERjtBQUFBLElBQ2tCQyxxQkFEbEIsR0FDaUVOLEtBRGpFLENBQ2tCTSxxQkFEbEI7QUFBQSxJQUN5Q0MsbUJBRHpDLEdBQ2lFUCxLQURqRSxDQUN5Q08sbUJBRHpDOztJQUdBQyxtQjs7Ozs7Ozs7Ozs7Ozs2QkFDS0MsYyxFQUFnQjtBQUN2QixVQUFJQyxNQUFKO0FBRUEsVUFBTUMsa0JBQWtCLEdBQUdGLGNBQWMsQ0FBQ0csT0FBZixFQUEzQjs7QUFFQSxjQUFRRCxrQkFBUjtBQUNFLGFBQUtOLGNBQUw7QUFDRSxjQUFNUSxJQUFJLEdBQUcsS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMsa0JBQWtCLEdBQUdOLGNBQWMsQ0FBQ0ssT0FBZixFQUQzQjtBQUdBSixVQUFBQSxNQUFNLEdBQUdOLHFCQUFxQixDQUFDUyxJQUFELEVBQU9FLGtCQUFQLENBQTlCO0FBQ0E7O0FBRUYsYUFBS1IsbUJBQUw7QUFDRUcsVUFBQUEsTUFBTSxHQUFHLEtBQVQ7QUFDQTtBQVZKOztBQWFBLGFBQU9BLE1BQVA7QUFDRDs7OzhCQUVnQk0sSyxFQUFPQyxVLEVBQVk7QUFDbEMsVUFBTUMsSUFBSSxHQUFHWixxQkFBYjtBQUFBLFVBQ01hLG1CQUFtQixHQUFHakIsV0FBVyxDQUFDa0IsU0FBWixDQUFzQkosS0FBdEIsRUFBNkJDLFVBQTdCLEVBQXlDQyxJQUF6QyxDQUQ1QjtBQUdBLGFBQU9DLG1CQUFQO0FBQ0Q7Ozs7RUEzQitCakIsVzs7QUE4QmxDbUIsTUFBTSxDQUFDQyxNQUFQLENBQWNkLG1CQUFkLEVBQW1DO0FBQ2pDZSxFQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRE07QUFEYyxDQUFuQztBQU1BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQixtQkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vdHlwZXNcIiksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoXCIuLi8uLi9lbnRyeS9tYXJrZXJcIiksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZShcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCIpO1xuXG5jb25zdCB7IG5hbWVJc0JlZm9yZUVudHJ5TmFtZSB9ID0gbmFtZVV0aWxpdGllcyxcbiAgICAgIHsgRklMRV9OQU1FX1RZUEUsIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIEZpbGVOYW1lTWFya2VyRW50cnkgZXh0ZW5kcyBNYXJrZXJFbnRyeSB7XG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ2dhYmxlRW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFLFxuICAgICAgICAgIGZpbGVOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlTmFtZU1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVOYW1lTWFya2VyRW50cnk7XG4iXX0=