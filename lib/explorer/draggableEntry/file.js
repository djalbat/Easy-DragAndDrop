'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry'),
    ActivateFileEvent = require('../activateFileEvent');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, readOnly, dragEventHandler, activateFileEventHandler) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, type, dragEventHandler));

    _this.readOnly = !!readOnly;

    _this.onDoubleClick(function () {
      var file = this,
          activateFileEvent = new ActivateFileEvent(file);

      activateFileEventHandler(activateFileEvent);
    }.bind(_this));

    _this.update();
    return _this;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;

        case Entry.types.DIRECTORY:

          return false;
      }
    }
  }, {
    key: 'getReadOnly',
    value: function getReadOnly() {
      return this.readOnly;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = [];

      return subEntries;
    }
  }, {
    key: 'update',
    value: function update() {
      this.readOnly ? this.addClass('readOnly') : this.removeClass('readOnly');
    }
  }], [{
    key: 'clone',
    value: function clone(name, readOnly, dragEventHandler, activateFileEventHandler) {
      var file = Element.clone(File, '#file', name, readOnly, dragEventHandler, activateFileEventHandler);

      file.removeAttribute('id');

      return file;
    }
  }]);

  return File;
}(DraggableEntry);

module.exports = File;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRW50cnkiLCJEcmFnZ2FibGVFbnRyeSIsIkFjdGl2YXRlRmlsZUV2ZW50IiwiRmlsZSIsInNlbGVjdG9yIiwibmFtZSIsInJlYWRPbmx5IiwiZHJhZ0V2ZW50SGFuZGxlciIsImFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlciIsInR5cGUiLCJ0eXBlcyIsIkZJTEUiLCJvbkRvdWJsZUNsaWNrIiwiZmlsZSIsImFjdGl2YXRlRmlsZUV2ZW50IiwiYmluZCIsInVwZGF0ZSIsImVudHJ5IiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIk1BUktFUiIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwiRElSRUNUT1JZIiwic3ViRW50cmllcyIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJjbG9uZSIsInJlbW92ZUF0dHJpYnV0ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxRQUFRRixRQUFRLFVBQVIsQ0FBWjtBQUFBLElBQ0lHLGlCQUFpQkgsUUFBUSxtQkFBUixDQURyQjtBQUFBLElBRUlJLG9CQUFvQkosUUFBUSxzQkFBUixDQUZ4Qjs7SUFJTUssSTs7O0FBQ0osZ0JBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQ0MsZ0JBQXRDLEVBQXdEQyx3QkFBeEQsRUFBa0Y7QUFBQTs7QUFDaEYsUUFBSUMsT0FBT1QsTUFBTVUsS0FBTixDQUFZQyxJQUF2Qjs7QUFEZ0YsNEdBRzFFUCxRQUgwRSxFQUdoRUMsSUFIZ0UsRUFHMURJLElBSDBELEVBR3BERixnQkFIb0Q7O0FBS2hGLFVBQUtELFFBQUwsR0FBZ0IsQ0FBQyxDQUFDQSxRQUFsQjs7QUFFQSxVQUFLTSxhQUFMLENBQW1CLFlBQVc7QUFDNUIsVUFBSUMsT0FBTyxJQUFYO0FBQUEsVUFDSUMsb0JBQW9CLElBQUlaLGlCQUFKLENBQXNCVyxJQUF0QixDQUR4Qjs7QUFHQUwsK0JBQXlCTSxpQkFBekI7QUFDRCxLQUxrQixDQUtqQkMsSUFMaUIsT0FBbkI7O0FBT0EsVUFBS0MsTUFBTDtBQWRnRjtBQWVqRjs7OztrQ0FFYTtBQUNaLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFDLEssRUFBTztBQUNkLFVBQUlDLFlBQVlELE1BQU1FLE9BQU4sRUFBaEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtsQixNQUFNVSxLQUFOLENBQVlDLElBQWpCO0FBQ0EsYUFBS1gsTUFBTVUsS0FBTixDQUFZVSxNQUFqQjs7QUFFRSxjQUFJZixPQUFPLEtBQUtnQixPQUFMLEVBQVg7QUFBQSxjQUNJQyxZQUFZTCxNQUFNSSxPQUFOLEVBRGhCO0FBQUEsY0FFSUUsU0FBU2xCLEtBQUttQixhQUFMLENBQW1CRixTQUFuQixJQUFnQyxDQUY3Qzs7QUFJQSxpQkFBT0MsTUFBUDs7QUFFRixhQUFLdkIsTUFBTVUsS0FBTixDQUFZZSxTQUFqQjs7QUFFRSxpQkFBTyxLQUFQO0FBWko7QUFjRDs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLbkIsUUFBWjtBQUNEOzs7b0NBRWU7QUFDZCxVQUFJb0IsYUFBYSxFQUFqQjs7QUFFQSxhQUFPQSxVQUFQO0FBQ0Q7Ozs2QkFFUTtBQUNQLFdBQUtwQixRQUFMLEdBQWdCLEtBQUtxQixRQUFMLENBQWMsVUFBZCxDQUFoQixHQUE0QyxLQUFLQyxXQUFMLENBQWlCLFVBQWpCLENBQTVDO0FBQ0Q7OzswQkFFWXZCLEksRUFBTUMsUSxFQUFVQyxnQixFQUFrQkMsd0IsRUFBMEI7QUFDdkUsVUFBSUssT0FBT2QsUUFBUThCLEtBQVIsQ0FBYzFCLElBQWQsRUFBb0IsT0FBcEIsRUFBNkJFLElBQTdCLEVBQW1DQyxRQUFuQyxFQUE2Q0MsZ0JBQTdDLEVBQStEQyx3QkFBL0QsQ0FBWDs7QUFFQUssV0FBS2lCLGVBQUwsQ0FBcUIsSUFBckI7O0FBRUEsYUFBT2pCLElBQVA7QUFDRDs7OztFQTdEZ0JaLGM7O0FBZ0VuQjhCLE9BQU9DLE9BQVAsR0FBaUI3QixJQUFqQiIsImZpbGUiOiJmaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKSxcbiAgICBBY3RpdmF0ZUZpbGVFdmVudCA9IHJlcXVpcmUoJy4uL2FjdGl2YXRlRmlsZUV2ZW50Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUsIGRyYWdFdmVudEhhbmRsZXIpO1xuXG4gICAgdGhpcy5yZWFkT25seSA9ICEhcmVhZE9ubHk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZmlsZSA9IHRoaXMsXG4gICAgICAgICAgYWN0aXZhdGVGaWxlRXZlbnQgPSBuZXcgQWN0aXZhdGVGaWxlRXZlbnQoZmlsZSk7XG5cbiAgICAgIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcihhY3RpdmF0ZUZpbGVFdmVudCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIHZhciBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDtcblxuICAgICAgICByZXR1cm4gYmVmb3JlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0UmVhZE9ubHkoKSB7XG4gICAgcmV0dXJuIHRoaXMucmVhZE9ubHk7XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgdmFyIHN1YkVudHJpZXMgPSBbXTtcbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLnJlYWRPbmx5ID8gdGhpcy5hZGRDbGFzcygncmVhZE9ubHknKSA6IHRoaXMucmVtb3ZlQ2xhc3MoJ3JlYWRPbmx5Jyk7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUobmFtZSwgcmVhZE9ubHksIGRyYWdFdmVudEhhbmRsZXIsIGFjdGl2YXRlRmlsZUV2ZW50SGFuZGxlcikge1xuICAgIHZhciBmaWxlID0gRWxlbWVudC5jbG9uZShGaWxlLCAnI2ZpbGUnLCBuYW1lLCByZWFkT25seSwgZHJhZ0V2ZW50SGFuZGxlciwgYWN0aXZhdGVGaWxlRXZlbnRIYW5kbGVyKTtcblxuICAgIGZpbGUucmVtb3ZlQXR0cmlidXRlKCdpZCcpO1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIl19