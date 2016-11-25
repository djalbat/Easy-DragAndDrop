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

    var moveHandler = removeHandler;

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, moveHandler));

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      return null;
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
    key: 'hasMarker',
    value: function hasMarker() {
      return this.isOpen();
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
      return this.hasClass('open');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJtb3ZlSGFuZGxlciIsImNsb3NlIiwiZW50cnkiLCJvcGVuIiwiaXNPcGVuIiwiZGlyZWN0b3J5Iiwic291cmNlUGF0aCIsIm1vdmVkUGF0aCIsInJlbW92ZWRQYXRoIiwicmVtb3ZlRGlyZWN0b3J5IiwiZmlsZSIsInJlbW92ZUZpbGUiLCJyZW1vdmUiLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiaGFzQ2xhc3MiLCJjbG9uZSIsImh0bWwiLCJmcm9tSFRNTCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBU0MsUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNJQyxVQUFVRixPQUFPRSxPQURyQjs7QUFHQSxJQUFJQyxtQkFBbUJGLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU1HLFU7OztBQUNKLHNCQUFZQyxRQUFaLEVBQXNCQyxhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFJQyxjQUFjRCxhQUFsQjs7QUFEbUMsd0hBRzdCRCxRQUg2QixFQUduQkUsV0FIbUI7O0FBS25DLFVBQUtDLEtBQUw7QUFMbUM7QUFNcEM7Ozs7K0NBRTBCO0FBQ3pCLGFBQU8sSUFBUDtBQUNEOzs7OEJBRVNDLEssRUFBTztBQUNmLFdBQUtDLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBS0YsS0FBTDtBQUNEOzs7Z0NBRVc7QUFDVixhQUFPLEtBQUtHLE1BQUwsRUFBUDtBQUNEOzs7a0NBRWFDLFMsRUFBV0MsVSxFQUFZQyxTLEVBQVc7QUFDOUMsVUFBSUMsY0FBY0QsU0FBbEIsQ0FEOEMsQ0FDaEI7O0FBRTlCLFdBQUtFLGVBQUwsQ0FBcUJKLFNBQXJCLEVBQWdDRyxXQUFoQztBQUNEOzs7NkJBRVFFLEksRUFBTUosVSxFQUFZQyxTLEVBQVc7QUFDcEMsVUFBSUMsY0FBY0QsU0FBbEIsQ0FEb0MsQ0FDTjs7QUFFOUIsV0FBS0ksVUFBTCxDQUFnQkQsSUFBaEIsRUFBc0JGLFdBQXRCO0FBQ0Q7OztvQ0FFZUgsUyxFQUFXRyxXLEVBQWE7QUFDdEMsVUFBSUEsZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCSCxrQkFBVU8sTUFBVjtBQUNEO0FBQ0Y7OzsrQkFFVUYsSSxFQUFNRixXLEVBQWE7QUFDNUIsVUFBSUEsZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCRSxhQUFLRSxNQUFMO0FBQ0Q7QUFDRjs7OzJCQUVNO0FBQ0wsV0FBS0MsUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBS0MsV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQUtDLFFBQUwsQ0FBYyxNQUFkLENBQVA7QUFDRDs7OzBCQUVZakIsUSxFQUFVQyxhLEVBQWU7QUFDcEMsYUFBT0osUUFBUXFCLEtBQVIsQ0FBY25CLFVBQWQsRUFBMEJDLFFBQTFCLEVBQW9DQyxhQUFwQyxDQUFQO0FBQ0Q7Ozs2QkFFZWtCLEksRUFBTWxCLGEsRUFBZTtBQUNuQyxhQUFPSixRQUFRdUIsUUFBUixDQUFpQnJCLFVBQWpCLEVBQTZCb0IsSUFBN0IsRUFBbUNsQixhQUFuQyxDQUFQO0FBQ0Q7Ozs7RUFuRXNCSCxnQjs7QUFzRXpCdUIsT0FBT0MsT0FBUCxHQUFpQnZCLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyO1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IFxuICAgIHJldHVybiBudWxsOyBcbiAgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4oKTtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFJ1YmJpc2hCaW4sIHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoUnViYmlzaEJpbiwgaHRtbCwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIl19