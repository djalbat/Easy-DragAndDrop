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
    key: 'getDirectoryHavingMarker',
    value: function getDirectoryHavingMarker() {
      var directoryHavingMarker = null;

      return directoryHavingMarker;
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
      var open = this.isOpen(),
          marker = open; ///

      return marker;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2VzNi9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbImVhc3l1aSIsInJlcXVpcmUiLCJFbGVtZW50IiwiRHJvcHBhYmxlRWxlbWVudCIsIlJ1YmJpc2hCaW4iLCJzZWxlY3RvciIsInJlbW92ZUhhbmRsZXIiLCJkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIiLCJjbG9zZSIsImRpcmVjdG9yeUhhdmluZ01hcmtlciIsImVudHJ5Iiwib3BlbiIsImlzT3BlbiIsIm1hcmtlciIsImRpcmVjdG9yeSIsInNvdXJjZVBhdGgiLCJtb3ZlZFBhdGgiLCJyZW1vdmVkUGF0aCIsInJlbW92ZURpcmVjdG9yeSIsImZpbGUiLCJyZW1vdmVGaWxlIiwicmVtb3ZlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImhhc0NsYXNzIiwiY2xvbmUiLCJodG1sIiwiZnJvbUhUTUwiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQVNDLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDSUMsVUFBVUYsT0FBT0UsT0FEckI7O0FBR0EsSUFBSUMsbUJBQW1CRixRQUFRLG9CQUFSLENBQXZCOztJQUVNRyxVOzs7QUFDSixzQkFBWUMsUUFBWixFQUFzQkMsYUFBdEIsRUFBcUM7QUFBQTs7QUFDbkMsUUFBSUMsOEJBQThCRCxhQUFsQyxDQURtQyxDQUNlOztBQURmLHdIQUc3QkQsUUFINkIsRUFHbkJFLDJCQUhtQjs7QUFLbkMsVUFBS0MsS0FBTDtBQUxtQztBQU1wQzs7OzsrQ0FFMEI7QUFDekIsVUFBSUMsd0JBQXdCLElBQTVCOztBQUVBLGFBQU9BLHFCQUFQO0FBQ0Q7Ozs4QkFFU0MsSyxFQUFPO0FBQ2YsV0FBS0MsSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLSCxLQUFMO0FBQ0Q7OztnQ0FFVztBQUNWLFVBQUlHLE9BQU8sS0FBS0MsTUFBTCxFQUFYO0FBQUEsVUFDSUMsU0FBU0YsSUFEYixDQURVLENBRVU7O0FBRXBCLGFBQU9FLE1BQVA7QUFDRDs7O2tDQUVhQyxTLEVBQVdDLFUsRUFBWUMsUyxFQUFXO0FBQzlDLFVBQUlDLGNBQWNELFNBQWxCLENBRDhDLENBQ2hCOztBQUU5QixXQUFLRSxlQUFMLENBQXFCSixTQUFyQixFQUFnQ0csV0FBaEM7QUFDRDs7OzZCQUVRRSxJLEVBQU1KLFUsRUFBWUMsUyxFQUFXO0FBQ3BDLFVBQUlDLGNBQWNELFNBQWxCLENBRG9DLENBQ047O0FBRTlCLFdBQUtJLFVBQUwsQ0FBZ0JELElBQWhCLEVBQXNCRixXQUF0QjtBQUNEOzs7b0NBRWVILFMsRUFBV0csVyxFQUFhO0FBQ3RDLFVBQUlBLGdCQUFnQixJQUFwQixFQUEwQjtBQUN4Qkgsa0JBQVVPLE1BQVY7QUFDRDtBQUNGOzs7K0JBRVVGLEksRUFBTUYsVyxFQUFhO0FBQzVCLFVBQUlBLGdCQUFnQixJQUFwQixFQUEwQjtBQUN4QkUsYUFBS0UsTUFBTDtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLFdBQUtDLFFBQUwsQ0FBYyxNQUFkO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUtDLFdBQUwsQ0FBaUIsTUFBakI7QUFDRDs7OzZCQUVRO0FBQ1AsVUFBSVosT0FBTyxLQUFLYSxRQUFMLENBQWMsTUFBZCxDQUFYOztBQUVBLGFBQU9iLElBQVA7QUFDRDs7OzBCQUVZTixRLEVBQVVDLGEsRUFBZTtBQUNwQyxhQUFPSixRQUFRdUIsS0FBUixDQUFjckIsVUFBZCxFQUEwQkMsUUFBMUIsRUFBb0NDLGFBQXBDLENBQVA7QUFDRDs7OzZCQUVlb0IsSSxFQUFNcEIsYSxFQUFlO0FBQ25DLGFBQU9KLFFBQVF5QixRQUFSLENBQWlCdkIsVUFBakIsRUFBNkJzQixJQUE3QixFQUFtQ3BCLGFBQW5DLENBQVA7QUFDRDs7OztFQTFFc0JILGdCOztBQTZFekJ5QixPQUFPQyxPQUFQLEdBQWlCekIsVUFBakIiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHZhciBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7XG4gICAgdmFyIGRpcmVjdG9yeUhhdmluZ01hcmtlciA9IG51bGw7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeUhhdmluZ01hcmtlcjsgXG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICBtYXJrZXIgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpIHtcbiAgICB2YXIgcmVtb3ZlZFBhdGggPSBtb3ZlZFBhdGg7ICAvLy9cbiAgICBcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZSwgcmVtb3ZlZFBhdGgpIHtcbiAgICBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgdmFyIG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcbiJdfQ==