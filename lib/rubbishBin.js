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

  function RubbishBin(selector, removeFileHandler, removeDirectoryHandler, options) {
    _classCallCheck(this, RubbishBin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RubbishBin).call(this, selector, options));

    _this.removeFileHandler = removeFileHandler;
    _this.removeDirectoryHandler = removeDirectoryHandler;

    _this.options = options;

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
    value: function moveDirectory(directory, sourcePath, targetPath, handle, next) {
      this.removeDirectory(directory, sourcePath, handle, next);
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, targetPath, handle, next) {
      this.removeFile(file, sourcePath, handle, next);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directory, sourcePath, handle, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          directory.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = !handle ? null : this.removeDirectoryHandler(sourcePath, afterRemove.bind(this));

      if (removedPath !== undefined) {
        afterRemove.call(this, removedPath);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file, sourcePath, handle, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          file.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = !handle ? null : this.removeFileHandler(sourcePath, afterRemove.bind(this));

      if (removedPath !== undefined) {
        afterRemove.call(this, removedPath);
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

RubbishBin.clone = function (selector, removeFileHandler, removeDirectoryHandler, options) {
  return Element.clone(RubbishBin, selector, removeFileHandler, removeDirectoryHandler, options);
};

RubbishBin.fromHTML = function (html, removeFileHandler, removeDirectoryHandler, options) {
  return Element.fromHTML(RubbishBin, html, removeFileHandler, removeDirectoryHandler, options);
};

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsc0JBQXpDLEVBQWlFLE9BQWpFLEVBQTBFO0FBQUE7O0FBQUEsOEZBQ2xFLFFBRGtFLEVBQ3hELE9BRHdEOztBQUd4RSxVQUFLLGlCQUFMLEdBQXlCLGlCQUF6QjtBQUNBLFVBQUssc0JBQUwsR0FBOEIsc0JBQTlCOztBQUVBLFVBQUssT0FBTCxHQUFlLE9BQWY7O0FBRUEsVUFBSyxLQUFMO0FBUndFO0FBU3pFOzs7O29EQUUrQjtBQUFFLGFBQU8sSUFBUDtBQUFjOzs7OEJBRXRDLEssRUFBTztBQUNmLFdBQUssSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLLEtBQUw7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLLE1BQUwsRUFBUDtBQUNEOzs7a0NBRWEsUyxFQUFXLFUsRUFBWSxVLEVBQVksTSxFQUFRLEksRUFBTTtBQUM3RCxXQUFLLGVBQUwsQ0FBcUIsU0FBckIsRUFBZ0MsVUFBaEMsRUFBNEMsTUFBNUMsRUFBb0QsSUFBcEQ7QUFDRDs7OzZCQUVRLEksRUFBTSxVLEVBQVksVSxFQUFZLE0sRUFBUSxJLEVBQU07QUFDbkQsV0FBSyxVQUFMLENBQWdCLElBQWhCLEVBQXNCLFVBQXRCLEVBQWtDLE1BQWxDLEVBQTBDLElBQTFDO0FBQ0Q7OztvQ0FFZSxTLEVBQVcsVSxFQUFZLE0sRUFBUSxJLEVBQU07QUFDbkQsZUFBUyxXQUFULENBQXFCLFdBQXJCLEVBQWtDO0FBQ2hDLFlBQUksS0FBSixFQUFXLENBRVYsQ0FGRCxNQUVPLElBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQy9CLG9CQUFVLE1BQVY7QUFDRCxTQUZNLE1BRUEsSUFBSSxnQkFBZ0IsVUFBcEIsRUFBZ0MsQ0FFdEM7O0FBRUQ7QUFDRDs7QUFFRCxVQUFJLGNBQWMsQ0FBQyxNQUFELEdBQ0UsSUFERixHQUVJLEtBQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFBd0MsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQXhDLENBRnRCOztBQUlBLFVBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG9CQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsV0FBdkI7QUFDRDtBQUNGOzs7K0JBRVUsSSxFQUFNLFUsRUFBWSxNLEVBQVEsSSxFQUFNO0FBQ3pDLGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixlQUFLLE1BQUw7QUFDRCxTQUZNLE1BRUEsSUFBSSxnQkFBZ0IsVUFBcEIsRUFBZ0MsQ0FFdEM7O0FBRUQ7QUFDRDs7QUFFRCxVQUFJLGNBQWMsQ0FBQyxNQUFELEdBQ0UsSUFERixHQUVJLEtBQUssaUJBQUwsQ0FBdUIsVUFBdkIsRUFBbUMsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQW5DLENBRnRCOztBQUlBLFVBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG9CQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsV0FBdkI7QUFDRDtBQUNGOzs7MkJBRU07QUFDTCxXQUFLLFFBQUwsQ0FBYyxNQUFkO0FBQ0Q7Ozs0QkFFTztBQUNOLFdBQUssV0FBTCxDQUFpQixNQUFqQjtBQUNEOzs7NkJBRVE7QUFDUCxhQUFPLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBUDtBQUNEOzs7O0VBeEZzQixnQjs7QUEyRnpCLFdBQVcsS0FBWCxHQUFtQixVQUFTLFFBQVQsRUFBbUIsaUJBQW5CLEVBQXNDLHNCQUF0QyxFQUE4RCxPQUE5RCxFQUF1RTtBQUN4RixTQUFPLFFBQVEsS0FBUixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFBb0MsaUJBQXBDLEVBQXVELHNCQUF2RCxFQUErRSxPQUEvRSxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxXQUFXLFFBQVgsR0FBc0IsVUFBUyxJQUFULEVBQWUsaUJBQWYsRUFBa0Msc0JBQWxDLEVBQTBELE9BQTFELEVBQW1FO0FBQ3ZGLFNBQU8sUUFBUSxRQUFSLENBQWlCLFVBQWpCLEVBQTZCLElBQTdCLEVBQW1DLGlCQUFuQyxFQUFzRCxzQkFBdEQsRUFBOEUsT0FBOUUsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5yZW1vdmVGaWxlSGFuZGxlciA9IHJlbW92ZUZpbGVIYW5kbGVyO1xuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5SGFuZGxlciA9IHJlbW92ZURpcmVjdG9yeUhhbmRsZXI7XG4gICAgXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKCkgeyByZXR1cm4gbnVsbDsgfVxuXG4gIGFkZE1hcmtlcihlbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICByZXR1cm4gdGhpcy5pc09wZW4oKTtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBoYW5kbGUsIG5leHQpIHtcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIGhhbmRsZSwgbmV4dCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBoYW5kbGUsIG5leHQpIHtcbiAgICB0aGlzLnJlbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgaGFuZGxlLCBuZXh0KTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIGhhbmRsZSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyUmVtb3ZlKHJlbW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKHJlbW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cblxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciByZW1vdmVkUGF0aCA9ICFoYW5kbGUgPyBcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZURpcmVjdG9yeUhhbmRsZXIoc291cmNlUGF0aCwgYWZ0ZXJSZW1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAocmVtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJSZW1vdmUuY2FsbCh0aGlzLCByZW1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBoYW5kbGUsIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlclJlbW92ZShyZW1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIHJlbW92ZWRQYXRoID0gIWhhbmRsZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICBudWxsIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVGaWxlSGFuZGxlcihzb3VyY2VQYXRoLCBhZnRlclJlbW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChyZW1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlclJlbW92ZS5jYWxsKHRoaXMsIHJlbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICB9XG59XG5cblJ1YmJpc2hCaW4uY2xvbmUgPSBmdW5jdGlvbihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyLCBvcHRpb25zKTtcbn07XG5cblJ1YmJpc2hCaW4uZnJvbUhUTUwgPSBmdW5jdGlvbihodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlciwgb3B0aW9ucykge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlciwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=
