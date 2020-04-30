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
    MarkerEntry = require("../../entry/marker");

var FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

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
        case FILE_NAME_TYPE:
          before = true;
          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = name.localeCompare(draggableEntryName) < 0;
          break;
      }

      return before;
    }
  }], [{
    key: "fromProperties",
    value: function fromProperties(properties) {
      var type = DIRECTORY_NAME_MARKER_TYPE,
          ///
      directoryNameMarkerEntry = MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties, type);
      return directoryNameMarkerEntry;
    }
  }]);

  return DirectoryNameMarkerEntry;
}(MarkerEntry);

Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: "directory-name"
  }
});
module.exports = DirectoryNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpcmVjdG9yeU5hbWUuanMiXSwibmFtZXMiOlsidHlwZXMiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSIsImRyYWdnYWJsZUVudHJ5IiwiYmVmb3JlIiwiZHJhZ2dhYmxlRW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsInByb3BlcnRpZXMiLCJ0eXBlIiwiZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxhQUFELENBQXJCO0FBQUEsSUFDTUMsV0FBVyxHQUFHRCxPQUFPLENBQUMsb0JBQUQsQ0FEM0I7O0lBR1FFLGMsR0FBb0VILEssQ0FBcEVHLGM7SUFBZ0JDLG1CLEdBQW9ESixLLENBQXBESSxtQjtJQUFxQkMsMEIsR0FBK0JMLEssQ0FBL0JLLDBCOztJQUV2Q0Msd0I7Ozs7Ozs7Ozs7Ozs7NkJBQ0tDLGMsRUFBZ0I7QUFDdkIsVUFBSUMsTUFBSjtBQUVBLFVBQU1DLGtCQUFrQixHQUFHRixjQUFjLENBQUNHLE9BQWYsRUFBM0I7O0FBRUEsY0FBUUQsa0JBQVI7QUFDRSxhQUFLTixjQUFMO0FBQ0VLLFVBQUFBLE1BQU0sR0FBRyxJQUFUO0FBRUE7O0FBRUYsYUFBS0osbUJBQUw7QUFDRSxjQUFNTyxJQUFJLEdBQUcsS0FBS0MsT0FBTCxFQUFiO0FBQUEsY0FDTUMsa0JBQWtCLEdBQUdOLGNBQWMsQ0FBQ0ssT0FBZixFQUQzQjtBQUdBSixVQUFBQSxNQUFNLEdBQUlHLElBQUksQ0FBQ0csYUFBTCxDQUFtQkQsa0JBQW5CLElBQXlDLENBQW5EO0FBRUE7QUFaSjs7QUFlQSxhQUFPTCxNQUFQO0FBQ0Q7OzttQ0FFcUJPLFUsRUFBWTtBQUNoQyxVQUFNQyxJQUFJLEdBQUdYLDBCQUFiO0FBQUEsVUFBMEM7QUFDcENZLE1BQUFBLHdCQUF3QixHQUFHZixXQUFXLENBQUNnQixjQUFaLENBQTJCWix3QkFBM0IsRUFBcURTLFVBQXJELEVBQWlFQyxJQUFqRSxDQURqQztBQUdBLGFBQU9DLHdCQUFQO0FBQ0Q7Ozs7RUE3Qm9DZixXOztBQWdDdkNpQixNQUFNLENBQUNDLE1BQVAsQ0FBY2Qsd0JBQWQsRUFBd0M7QUFDdENlLEVBQUFBLGlCQUFpQixFQUFFO0FBQ2pCQyxJQUFBQSxTQUFTLEVBQUU7QUFETTtBQURtQixDQUF4QztBQU1BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJsQix3QkFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vdHlwZXNcIiksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoXCIuLi8uLi9lbnRyeS9tYXJrZXJcIik7XG5cbmNvbnN0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGRyYWdnYWJsZUVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21Qcm9wZXJ0aWVzKERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuIl19