'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

var RubbishBin = function (_DroppableElement) {
  _inherits(RubbishBin, _DroppableElement);

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var droppableElementMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, droppableElementMoveHandler));

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      return markedDirectory;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(entry) {
      this.open();
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      this.close();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourcePath, movedPath) {
      var removedPath = movedPath; ///

      this.removeDirectory(directory, removedPath);
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, movedPath) {
      var removedPath = movedPath; ///

      this.removeFile(file, removedPath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directory, removedPath) {
      if (removedPath === null) {
        directory.remove();
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file, removedPath) {
      if (removedPath === null) {
        file.remove();
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.addClass('open');
    }
  }, {
    key: 'close',
    value: function close() {
      this.removeClass('open');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, removeHandler) {
      return Element.clone(RubbishBin, selector, removeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, removeHandler) {
      return Element.fromHTML(RubbishBin, html, removeHandler);
    }
  }]);

  return RubbishBin;
}(DroppableElement);

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsIm1hcmtlZERpcmVjdG9yeSIsImVudHJ5Iiwib3BlbiIsImlzT3BlbiIsIm1hcmtlZCIsImRpcmVjdG9yeSIsInNvdXJjZVBhdGgiLCJtb3ZlZFBhdGgiLCJyZW1vdmVkUGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImZpbGUiLCJyZW1vdmVGaWxlIiwicmVtb3ZlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiY2xvbmUiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsbUJBQW1CRixRQUFRLG9CQUFSLENBQXZCOztJQUVNRyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUM7QUFBQTs7QUFDbkMsUUFBSUMsOEJBQThCRCxhQUFsQyxDQURtQyxDQUNlOztBQURmLHdIQUc3QkQsUUFINkIsRUFHbkJFLDJCQUhtQjs7QUFLbkMsVUFBS0MsS0FBTDtBQUxtQztBQU1wQzs7Ozt5Q0FFb0I7QUFDbkIsVUFBSUMsa0JBQWtCLElBQXRCOztBQUVBLGFBQU9BLGVBQVA7QUFDRDs7OzhCQUVTQyxLLEVBQU87QUFDZixXQUFLQyxJQUFMO0FBQ0Q7OzttQ0FFYztBQUNiLFdBQUtILEtBQUw7QUFDRDs7OytCQUVVO0FBQ1QsVUFBSUcsT0FBTyxLQUFLQyxNQUFMLEVBQVg7QUFBQSxVQUNJQyxTQUFTRixJQURiLENBRFMsQ0FFVzs7QUFFcEIsYUFBT0UsTUFBUDtBQUNEOzs7a0NBRWFDLFMsRUFBV0MsVSxFQUFZQyxTLEVBQVc7QUFDOUMsVUFBSUMsY0FBY0QsU0FBbEIsQ0FEOEMsQ0FDaEI7O0FBRTlCLFdBQUtFLGVBQUwsQ0FBcUJKLFNBQXJCLEVBQWdDRyxXQUFoQztBQUNEOzs7NkJBRVFFLEksRUFBTUosVSxFQUFZQyxTLEVBQVc7QUFDcEMsVUFBSUMsY0FBY0QsU0FBbEIsQ0FEb0MsQ0FDTjs7QUFFOUIsV0FBS0ksVUFBTCxDQUFnQkQsSUFBaEIsRUFBc0JGLFdBQXRCO0FBQ0Q7OztvQ0FFZUgsUyxFQUFXRyxXLEVBQWE7QUFDdEMsVUFBSUEsZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCSCxrQkFBVU8sTUFBVjtBQUNEO0FBQ0Y7OzsrQkFFVUYsSSxFQUFNRixXLEVBQWE7QUFDNUIsVUFBSUEsZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCRSxhQUFLRSxNQUFMO0FBQ0Q7QUFDRjs7OzJCQUVNO0FBQ0wsV0FBS0MsUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0MsV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxVQUFJWixPQUFPLEtBQUthLFFBQUwsQ0FBYyxNQUFkLENBQVg7O0FBRUEsYUFBT2IsSUFBUDtBQUNEOzs7MEJBRVlOLFEsRUFBVUMsYSxFQUFlO0FBQ3BDLGFBQU9KLFFBQVF1QixLQUFSLENBQWNyQixVQUFkLEVBQTBCQyxRQUExQixFQUFvQ0MsYUFBcEMsQ0FBUDtBQUNEOzs7NkJBRWVvQixJLEVBQU1wQixhLEVBQWU7QUFDbkMsYUFBT0osUUFBUXlCLFFBQVIsQ0FBaUJ2QixVQUFqQixFQUE2QnNCLElBQTdCLEVBQW1DcEIsYUFBbkMsQ0FBUDtBQUNEOzs7O0VBMUVzQkgsZ0I7O0FBNkV6QnlCLE9BQU9DLE9BQVAsR0FBaUJ6QixVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgdmFyIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICB2YXIgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcbiJdfQ==