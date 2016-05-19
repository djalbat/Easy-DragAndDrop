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
    key: 'dragDirectory',
    value: function dragDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
      var movedDirectoryPath = this.removeDirectoryHandler(sourceDirectoryPath);

      if (false) {} else if (movedDirectoryPath === null) {
        directory.remove();
      } else if (movedDirectoryPath === sourceDirectoryPath) {}
    }
  }, {
    key: 'dragFile',
    value: function dragFile(file, sourceFilePath, targetFilePath) {
      var movedFilePath = this.removeFileHandler(sourceFilePath);

      if (false) {} else if (movedFilePath === null) {
        file.remove();
      } else if (movedFilePath === sourceFilePath) {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsc0JBQXpDLEVBQWlFO0FBQUE7O0FBQUEsOEZBQ3pELFFBRHlEOztBQUcvRCxVQUFLLGlCQUFMLEdBQXlCLGlCQUF6QjtBQUNBLFVBQUssc0JBQUwsR0FBOEIsc0JBQTlCOztBQUVBLFVBQUssS0FBTDtBQU4rRDtBQU9oRTs7OztvREFFK0I7QUFBRSxhQUFPLElBQVA7QUFBYzs7OzhCQUV0QyxLLEVBQU87QUFDZixXQUFLLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSyxLQUFMO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLEVBQVA7QUFDRDs7O2tDQUVhLFMsRUFBVyxtQixFQUFxQixtQixFQUFxQjtBQUNqRSxVQUFJLHFCQUFxQixLQUFLLHNCQUFMLENBQTRCLG1CQUE1QixDQUF6Qjs7QUFFQSxVQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLHVCQUF1QixJQUEzQixFQUFpQztBQUN0QyxrQkFBVSxNQUFWO0FBQ0QsT0FGTSxNQUVBLElBQUksdUJBQXVCLG1CQUEzQixFQUFnRCxDQUV0RDtBQUNGOzs7NkJBRVEsSSxFQUFNLGMsRUFBZ0IsYyxFQUFnQjtBQUM3QyxVQUFJLGdCQUFnQixLQUFLLGlCQUFMLENBQXVCLGNBQXZCLENBQXBCOztBQUVBLFVBQUksS0FBSixFQUFXLENBRVYsQ0FGRCxNQUVPLElBQUksa0JBQWtCLElBQXRCLEVBQTRCO0FBQ2pDLGFBQUssTUFBTDtBQUNELE9BRk0sTUFFQSxJQUFJLGtCQUFrQixjQUF0QixFQUFzQyxDQUU1QztBQUNGOzs7MkJBRU07QUFDTCxXQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUssV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBUDtBQUNEOzs7O0VBMURzQixnQjs7QUE2RHpCLFdBQVcsS0FBWCxHQUFtQixVQUFTLFFBQVQsRUFBbUIsaUJBQW5CLEVBQXNDLHNCQUF0QyxFQUE4RDtBQUMvRSxTQUFPLFFBQVEsS0FBUixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFBb0MsaUJBQXBDLEVBQXVELHNCQUF2RCxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxXQUFXLFFBQVgsR0FBc0IsVUFBUyxJQUFULEVBQWUsaUJBQWYsRUFBa0Msc0JBQWxDLEVBQTBEO0FBQzlFLFNBQU8sUUFBUSxRQUFSLENBQWlCLFVBQWpCLEVBQTZCLElBQTdCLEVBQW1DLGlCQUFuQyxFQUFzRCxzQkFBdEQsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5yZW1vdmVGaWxlSGFuZGxlciA9IHJlbW92ZUZpbGVIYW5kbGVyO1xuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5SGFuZGxlciA9IHJlbW92ZURpcmVjdG9yeUhhbmRsZXI7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcigpIHsgcmV0dXJuIG51bGw7IH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuKCk7XG4gIH1cblxuICBkcmFnRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIHZhciBtb3ZlZERpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeUhhbmRsZXIoc291cmNlRGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfSBlbHNlIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH1cbiAgfVxuXG4gIGRyYWdGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIHZhciBtb3ZlZEZpbGVQYXRoID0gdGhpcy5yZW1vdmVGaWxlSGFuZGxlcihzb3VyY2VGaWxlUGF0aCk7XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKG1vdmVkRmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICB9XG59XG5cblJ1YmJpc2hCaW4uY2xvbmUgPSBmdW5jdGlvbihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cblJ1YmJpc2hCaW4uZnJvbUhUTUwgPSBmdW5jdGlvbihodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=
