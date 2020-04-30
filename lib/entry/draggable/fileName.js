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

var easy = require("easy");

var types = require("../../types"),
    NameButton = require("../../button/name"),
    nameUtilities = require("../../utilities/name"),
    DraggableEntry = require("../../entry/draggable");

var React = easy.React,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var FileNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(FileNameDraggableEntry);

  function FileNameDraggableEntry(selector, type, explorer) {
    var _this;

    _classCallCheck(this, FileNameDraggableEntry);

    _this = _super.call(this, selector, type);
    _this.explorer = explorer;
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: "getExplorer",
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: "isBefore",
    value: function isBefore(entry) {
      var before;
      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          var name = this.getName(),
              entryName = entry.getName();
          before = nameIsBeforeEntryName(name, entryName);
          break;

        case DIRECTORY_NAME_TYPE:
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
    value: function childElements(properties) {
      var name = properties.name;
      return [/*#__PURE__*/React.createElement(NameButton, null, name)];
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var explorer = properties.explorer,
          type = FILE_NAME_TYPE,
          fileNameDraggableEntry = DraggableEntry.fromClass(Class, properties, type, explorer);
      fileNameDraggableEntry.initialise();
      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: "file-name"
  }
});
module.exports = FileNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGVOYW1lLmpzIl0sIm5hbWVzIjpbImVhc3kiLCJyZXF1aXJlIiwidHlwZXMiLCJOYW1lQnV0dG9uIiwibmFtZVV0aWxpdGllcyIsIkRyYWdnYWJsZUVudHJ5IiwiUmVhY3QiLCJuYW1lSXNCZWZvcmVFbnRyeU5hbWUiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJleHBsb3JlciIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwiZHJhZ2dhYmxlU3ViRW50cmllcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwicHJvcGVydGllcyIsIkNsYXNzIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZyb21DbGFzcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGllcyIsImNsYXNzTmFtZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxJQUFJLEdBQUdDLE9BQU8sQ0FBQyxNQUFELENBQXBCOztBQUVBLElBQU1DLEtBQUssR0FBR0QsT0FBTyxDQUFDLGFBQUQsQ0FBckI7QUFBQSxJQUNNRSxVQUFVLEdBQUdGLE9BQU8sQ0FBQyxtQkFBRCxDQUQxQjtBQUFBLElBRU1HLGFBQWEsR0FBR0gsT0FBTyxDQUFDLHNCQUFELENBRjdCO0FBQUEsSUFHTUksY0FBYyxHQUFHSixPQUFPLENBQUMsdUJBQUQsQ0FIOUI7O0FBS00sSUFBRUssS0FBRixHQUFZTixJQUFaLENBQUVNLEtBQUY7QUFBQSxJQUNFQyxxQkFERixHQUM0QkgsYUFENUIsQ0FDRUcscUJBREY7QUFBQSxJQUVFQyxjQUZGLEdBRTZGTixLQUY3RixDQUVFTSxjQUZGO0FBQUEsSUFFa0JDLG1CQUZsQixHQUU2RlAsS0FGN0YsQ0FFa0JPLG1CQUZsQjtBQUFBLElBRXVDQyxxQkFGdkMsR0FFNkZSLEtBRjdGLENBRXVDUSxxQkFGdkM7QUFBQSxJQUU4REMsMEJBRjlELEdBRTZGVCxLQUY3RixDQUU4RFMsMEJBRjlEOztJQUlBQyxzQjs7Ozs7QUFDSixrQ0FBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLFFBQTVCLEVBQXNDO0FBQUE7O0FBQUE7O0FBQ3BDLDhCQUFNRixRQUFOLEVBQWdCQyxJQUFoQjtBQUVBLFVBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBSG9DO0FBSXJDOzs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLQSxRQUFaO0FBQ0Q7Ozs2QkFFUUMsSyxFQUFPO0FBQ2QsVUFBSUMsTUFBSjtBQUVBLFVBQU1DLFNBQVMsR0FBR0YsS0FBSyxDQUFDRyxPQUFOLEVBQWxCOztBQUVBLGNBQVFELFNBQVI7QUFDRSxhQUFLVixjQUFMO0FBQ0EsYUFBS0UscUJBQUw7QUFDQSxhQUFLQywwQkFBTDtBQUNFLGNBQU1TLElBQUksR0FBRyxLQUFLQyxPQUFMLEVBQWI7QUFBQSxjQUNNQyxTQUFTLEdBQUdOLEtBQUssQ0FBQ0ssT0FBTixFQURsQjtBQUdBSixVQUFBQSxNQUFNLEdBQUdWLHFCQUFxQixDQUFDYSxJQUFELEVBQU9FLFNBQVAsQ0FBOUI7QUFDQTs7QUFFRixhQUFLYixtQkFBTDtBQUNFUSxVQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNBO0FBWko7O0FBZUEsYUFBT0EsTUFBUDtBQUNEOzs7K0NBRTBCO0FBQ3pCLGFBQU8sSUFBUDtBQUNEOzs7b0RBRStCO0FBQzlCLGFBQU8sS0FBUDtBQUNEOzs7a0RBRTZCO0FBQzVCLFVBQU1NLG1CQUFtQixHQUFHLEVBQTVCLENBRDRCLENBQ0s7O0FBRWpDLGFBQU9BLG1CQUFQO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTVIsUUFBUSxHQUFHLEtBQUtTLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxJQUFJLEdBQUcsSUFEYixDQURtQixDQUVBOztBQUVuQlYsTUFBQUEsUUFBUSxDQUFDVywwQkFBVCxDQUFvQ0QsSUFBcEM7QUFDRDs7O2tDQUVhRSxVLEVBQVk7QUFBQSxVQUNoQlAsSUFEZ0IsR0FDUE8sVUFETyxDQUNoQlAsSUFEZ0I7QUFHeEIsYUFBUSxjQUVOLG9CQUFDLFVBQUQsUUFBYUEsSUFBYixDQUZNLENBQVI7QUFLRDs7OzhCQUVnQlEsSyxFQUFPRCxVLEVBQVk7QUFDNUIsVUFBRVosUUFBRixHQUFlWSxVQUFmLENBQUVaLFFBQUY7QUFBQSxVQUNBRCxJQURBLEdBQ09OLGNBRFA7QUFBQSxVQUVBcUIsc0JBRkEsR0FFeUJ4QixjQUFjLENBQUN5QixTQUFmLENBQXlCRixLQUF6QixFQUFnQ0QsVUFBaEMsRUFBNENiLElBQTVDLEVBQWtEQyxRQUFsRCxDQUZ6QjtBQUlOYyxNQUFBQSxzQkFBc0IsQ0FBQ0UsVUFBdkI7QUFFQSxhQUFPRixzQkFBUDtBQUNEOzs7O0VBekVrQ3hCLGM7O0FBNEVyQzJCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjckIsc0JBQWQsRUFBc0M7QUFDcENzQixFQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRE07QUFEaUIsQ0FBdEM7QUFNQUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCekIsc0JBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKFwiZWFzeVwiKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKFwiLi4vLi4vdHlwZXNcIiksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZShcIi4uLy4uL2J1dHRvbi9uYW1lXCIpLFxuICAgICAgbmFtZVV0aWxpdGllcyA9IHJlcXVpcmUoXCIuLi8uLi91dGlsaXRpZXMvbmFtZVwiKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZShcIi4uLy4uL2VudHJ5L2RyYWdnYWJsZVwiKTtcblxuY29uc3QgeyBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gPSBuYW1lVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlU3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+XG5cbiAgICBdKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHR5cGUgPSBGSUxFX05BTUVfVFlQRSwgIC8vL1xuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIGV4cGxvcmVyKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlTmFtZURyYWdnYWJsZUVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=