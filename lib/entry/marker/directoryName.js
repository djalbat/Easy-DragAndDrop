"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _marker = _interopRequireDefault(require("../../entry/marker"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var DirectoryNameMarkerEntry = /*#__PURE__*/function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  var _super = _createSuper(DirectoryNameMarkerEntry);

  function DirectoryNameMarkerEntry() {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    return _super.apply(this, arguments);
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: "isBefore",
    value: function isBefore(draggableEntry) {
      var before;
      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case _types.FILE_NAME_TYPE:
          before = true;
          break;

        case _types.DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = name.localeCompare(draggableEntryName) < 0;
          break;
      }

      return before;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.DIRECTORY_NAME_MARKER_TYPE,
          ///
      directoryNameMarkerEntry = _marker["default"].fromClass(Class, properties, type);

      return directoryNameMarkerEntry;
    }
  }]);

  return DirectoryNameMarkerEntry;
}(_marker["default"]);

exports["default"] = DirectoryNameMarkerEntry;
Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: "directory-name"
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsiRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZHJhZ2dhYmxlRW50cnkiLCJiZWZvcmUiLCJkcmFnZ2FibGVFbnRyeVR5cGUiLCJnZXRUeXBlIiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwibmFtZSIsImdldE5hbWUiLCJkcmFnZ2FibGVFbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwidHlwZSIsIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiTWFya2VyRW50cnkiLCJmcm9tQ2xhc3MiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLHdCOzs7Ozs7Ozs7Ozs7OzZCQUNWQyxjLEVBQWdCO0FBQ3ZCLFVBQUlDLE1BQUo7QUFFQSxVQUFNQyxrQkFBa0IsR0FBR0YsY0FBYyxDQUFDRyxPQUFmLEVBQTNCOztBQUVBLGNBQVFELGtCQUFSO0FBQ0UsYUFBS0UscUJBQUw7QUFDRUgsVUFBQUEsTUFBTSxHQUFHLElBQVQ7QUFFQTs7QUFFRixhQUFLSSwwQkFBTDtBQUNFLGNBQU1DLElBQUksR0FBRyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxrQkFBa0IsR0FBR1IsY0FBYyxDQUFDTyxPQUFmLEVBRDNCO0FBR0FOLFVBQUFBLE1BQU0sR0FBSUssSUFBSSxDQUFDRyxhQUFMLENBQW1CRCxrQkFBbkIsSUFBeUMsQ0FBbkQ7QUFFQTtBQVpKOztBQWVBLGFBQU9QLE1BQVA7QUFDRDs7OzhCQUVnQlMsSyxFQUFPQyxVLEVBQVk7QUFDbEMsVUFBTUMsSUFBSSxHQUFHQyxpQ0FBYjtBQUFBLFVBQTBDO0FBQ3BDQyxNQUFBQSx3QkFBd0IsR0FBR0MsbUJBQVlDLFNBQVosQ0FBc0JOLEtBQXRCLEVBQTZCQyxVQUE3QixFQUF5Q0MsSUFBekMsQ0FEakM7O0FBR0EsYUFBT0Usd0JBQVA7QUFDRDs7OztFQTdCbURDLGtCOzs7QUFnQ3RERSxNQUFNLENBQUNDLE1BQVAsQ0FBY25CLHdCQUFkLEVBQXdDO0FBQ3RDb0IsRUFBQUEsaUJBQWlCLEVBQUU7QUFDakJDLElBQUFBLFNBQVMsRUFBRTtBQURNO0FBRG1CLENBQXhDIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBNYXJrZXJFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvbWFya2VyXCI7XG5cbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgZXh0ZW5kcyBNYXJrZXJFbnRyeSB7XG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZHJhZ2dhYmxlRW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB0eXBlID0gRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUsICAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH1cbn0pO1xuIl19