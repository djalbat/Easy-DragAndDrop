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

  function RubbishBin(selector, removeFileHandler, removeDirectoryHandler) {
    _classCallCheck(this, RubbishBin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RubbishBin).call(this, selector));

    _this.removeFileHandler = removeFileHandler;
    _this.removeDirectoryHandler = removeDirectoryHandler;

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'directoryPathContainingMarker',
    value: function directoryPathContainingMarker() {
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
    value: function moveDirectory(directory, sourcePath, targetPath, next) {
      this.removeDirectory(directory, sourcePath, next);
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, targetPath, next) {
      this.removeFile(file, sourcePath, next);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directory, sourcePath, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          directory.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = this.removeDirectoryHandler(sourcePath, afterRemove.bind(this));

      if (removedPath !== undefined) {
        afterRemove(removedPath);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file, sourcePath, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          file.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = this.removeFileHandler(sourcePath, afterRemove.bind(this));

      if (removedPath !== undefined) {
        afterRemove(removedPath);
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
  }]);

  return RubbishBin;
}(DroppableElement);

RubbishBin.clone = function (selector, removeFileHandler, removeDirectoryHandler) {
  return Element.clone(RubbishBin, selector, removeFileHandler, removeDirectoryHandler);
};

RubbishBin.fromHTML = function (html, removeFileHandler, removeDirectoryHandler) {
  return Element.fromHTML(RubbishBin, html, removeFileHandler, removeDirectoryHandler);
};

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsc0JBQXpDLEVBQWlFO0FBQUE7O0FBQUEsOEZBQ3pELFFBRHlEOztBQUcvRCxVQUFLLGlCQUFMLEdBQXlCLGlCQUF6QjtBQUNBLFVBQUssc0JBQUwsR0FBOEIsc0JBQTlCOztBQUVBLFVBQUssS0FBTDtBQU4rRDtBQU9oRTs7OztvREFFK0I7QUFBRSxhQUFPLElBQVA7QUFBYzs7OzhCQUV0QyxLLEVBQU87QUFDZixXQUFLLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSyxLQUFMO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLEVBQVA7QUFDRDs7O2tDQUVhLFMsRUFBVyxVLEVBQVksVSxFQUFZLEksRUFBTTtBQUNyRCxXQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFBZ0MsVUFBaEMsRUFBNEMsSUFBNUM7QUFDRDs7OzZCQUVRLEksRUFBTSxVLEVBQVksVSxFQUFZLEksRUFBTTtBQUMzQyxXQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsVUFBdEIsRUFBa0MsSUFBbEM7QUFDRDs7O29DQUVlLFMsRUFBVyxVLEVBQVksSSxFQUFNO0FBQzNDLGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixvQkFBVSxNQUFWO0FBQ0QsU0FGTSxNQUVBLElBQUksZ0JBQWdCLFVBQXBCLEVBQWdDLENBRXRDOztBQUVEO0FBQ0Q7O0FBRUQsVUFBSSxjQUFjLEtBQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFBd0MsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQXhDLENBQWxCOztBQUVBLFVBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG9CQUFZLFdBQVo7QUFDRDtBQUNGOzs7K0JBRVUsSSxFQUFNLFUsRUFBWSxJLEVBQU07QUFDakMsZUFBUyxXQUFULENBQXFCLFdBQXJCLEVBQWtDO0FBQ2hDLFlBQUksS0FBSixFQUFXLENBRVYsQ0FGRCxNQUVPLElBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQy9CLGVBQUssTUFBTDtBQUNELFNBRk0sTUFFQSxJQUFJLGdCQUFnQixVQUFwQixFQUFnQyxDQUV0Qzs7QUFFRDtBQUNEOztBQUVELFVBQUksY0FBYyxLQUFLLGlCQUFMLENBQXVCLFVBQXZCLEVBQW1DLFlBQVksSUFBWixDQUFpQixJQUFqQixDQUFuQyxDQUFsQjs7QUFFQSxVQUFJLGdCQUFnQixTQUFwQixFQUErQjtBQUM3QixvQkFBWSxXQUFaO0FBQ0Q7QUFDRjs7OzJCQUVNO0FBQ0wsV0FBSyxRQUFMLENBQWMsTUFBZDtBQUNEOzs7NEJBRU87QUFDTixXQUFLLFdBQUwsQ0FBaUIsTUFBakI7QUFDRDs7OzZCQUVRO0FBQ1AsYUFBTyxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQVA7QUFDRDs7OztFQWxGc0IsZ0I7O0FBcUZ6QixXQUFXLEtBQVgsR0FBbUIsVUFBUyxRQUFULEVBQW1CLGlCQUFuQixFQUFzQyxzQkFBdEMsRUFBOEQ7QUFDL0UsU0FBTyxRQUFRLEtBQVIsQ0FBYyxVQUFkLEVBQTBCLFFBQTFCLEVBQW9DLGlCQUFwQyxFQUF1RCxzQkFBdkQsQ0FBUDtBQUNELENBRkQ7O0FBSUEsV0FBVyxRQUFYLEdBQXNCLFVBQVMsSUFBVCxFQUFlLGlCQUFmLEVBQWtDLHNCQUFsQyxFQUEwRDtBQUM5RSxTQUFPLFFBQVEsUUFBUixDQUFpQixVQUFqQixFQUE2QixJQUE3QixFQUFtQyxpQkFBbkMsRUFBc0Qsc0JBQXRELENBQVA7QUFDRCxDQUZEOztBQUlBLE9BQU8sT0FBUCxHQUFpQixVQUFqQiIsImZpbGUiOiJydWJiaXNoQmluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMucmVtb3ZlRmlsZUhhbmRsZXIgPSByZW1vdmVGaWxlSGFuZGxlcjtcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeUhhbmRsZXIgPSByZW1vdmVEaXJlY3RvcnlIYW5kbGVyO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIoKSB7IHJldHVybiBudWxsOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIG5leHQpIHtcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG5leHQpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgbmV4dCkge1xuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBuZXh0KTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlclJlbW92ZShyZW1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG5cbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVtb3ZlZFBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeUhhbmRsZXIoc291cmNlUGF0aCwgYWZ0ZXJSZW1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAocmVtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJSZW1vdmUocmVtb3ZlZFBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyUmVtb3ZlKHJlbW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBmaWxlLnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG5cbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVtb3ZlZFBhdGggPSB0aGlzLnJlbW92ZUZpbGVIYW5kbGVyKHNvdXJjZVBhdGgsIGFmdGVyUmVtb3ZlLmJpbmQodGhpcykpO1xuXG4gICAgaWYgKHJlbW92ZWRQYXRoICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGFmdGVyUmVtb3ZlKHJlbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICB9XG59XG5cblJ1YmJpc2hCaW4uY2xvbmUgPSBmdW5jdGlvbihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cblJ1YmJpc2hCaW4uZnJvbUhUTUwgPSBmdW5jdGlvbihodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=
