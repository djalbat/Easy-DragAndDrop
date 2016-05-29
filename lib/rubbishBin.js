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
    value: function moveDirectory(directory, sourcePath, targetPath, isSubEntry, next) {
      this.removeDirectory(directory, sourcePath, isSubEntry, next);
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourcePath, targetPath, isSubEntry, next) {
      this.removeFile(file, sourcePath, isSubEntry, next);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directory, sourcePath, isSubEntry, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          directory.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = this.removeDirectoryHandler(sourcePath, isSubEntry, afterRemove.bind(this));

      if (removedPath !== undefined) {
        afterRemove.call(this, removedPath);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file, sourcePath, isSubEntry, next) {
      function afterRemove(removedPath) {
        if (false) {} else if (removedPath === null) {
          file.remove();
        } else if (removedPath === sourcePath) {}

        next();
      }

      var removedPath = this.removeFileHandler(sourcePath, isSubEntry, afterRemove.bind(this));

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

RubbishBin.clone = function (selector, removeFileHandler, removeDirectoryHandler) {
  return Element.clone(RubbishBin, selector, removeFileHandler, removeDirectoryHandler);
};

RubbishBin.fromHTML = function (html, removeFileHandler, removeDirectoryHandler) {
  return Element.fromHTML(RubbishBin, html, removeFileHandler, removeDirectoryHandler);
};

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsc0JBQXpDLEVBQWlFO0FBQUE7O0FBQUEsOEZBQ3pELFFBRHlEOztBQUcvRCxVQUFLLGlCQUFMLEdBQXlCLGlCQUF6QjtBQUNBLFVBQUssc0JBQUwsR0FBOEIsc0JBQTlCOztBQUVBLFVBQUssS0FBTDtBQU4rRDtBQU9oRTs7Ozs4QkFFUyxLLEVBQU87QUFDZixXQUFLLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSyxLQUFMO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLEVBQVA7QUFDRDs7O2tDQUVhLFMsRUFBVyxVLEVBQVksVSxFQUFZLFUsRUFBWSxJLEVBQU07QUFDakUsV0FBSyxlQUFMLENBQXFCLFNBQXJCLEVBQWdDLFVBQWhDLEVBQTRDLFVBQTVDLEVBQXdELElBQXhEO0FBQ0Q7Ozs2QkFFUSxJLEVBQU0sVSxFQUFZLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQ3ZELFdBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixVQUF0QixFQUFrQyxVQUFsQyxFQUE4QyxJQUE5QztBQUNEOzs7b0NBRWUsUyxFQUFXLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQ3ZELGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixvQkFBVSxNQUFWO0FBQ0QsU0FGTSxNQUVBLElBQUksZ0JBQWdCLFVBQXBCLEVBQWdDLENBRXRDOztBQUVEO0FBQ0Q7O0FBRUQsVUFBSSxjQUFjLEtBQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFBd0MsVUFBeEMsRUFBb0QsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQXBELENBQWxCOztBQUVBLFVBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG9CQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsV0FBdkI7QUFDRDtBQUNGOzs7K0JBRVUsSSxFQUFNLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQzdDLGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixlQUFLLE1BQUw7QUFDRCxTQUZNLE1BRUEsSUFBSSxnQkFBZ0IsVUFBcEIsRUFBZ0MsQ0FFdEM7O0FBRUQ7QUFDRDs7QUFFRCxVQUFJLGNBQWMsS0FBSyxpQkFBTCxDQUF1QixVQUF2QixFQUFtQyxVQUFuQyxFQUErQyxZQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBL0MsQ0FBbEI7O0FBRUEsVUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDN0Isb0JBQVksSUFBWixDQUFpQixJQUFqQixFQUF1QixXQUF2QjtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLFdBQUssUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBSyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFQO0FBQ0Q7Ozs7RUFoRnNCLGdCOztBQW1GekIsV0FBVyxLQUFYLEdBQW1CLFVBQVMsUUFBVCxFQUFtQixpQkFBbkIsRUFBc0Msc0JBQXRDLEVBQThEO0FBQy9FLFNBQU8sUUFBUSxLQUFSLENBQWMsVUFBZCxFQUEwQixRQUExQixFQUFvQyxpQkFBcEMsRUFBdUQsc0JBQXZELENBQVA7QUFDRCxDQUZEOztBQUlBLFdBQVcsUUFBWCxHQUFzQixVQUFTLElBQVQsRUFBZSxpQkFBZixFQUFrQyxzQkFBbEMsRUFBMEQ7QUFDOUUsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsSUFBN0IsRUFBbUMsaUJBQW5DLEVBQXNELHNCQUF0RCxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnJlbW92ZUZpbGVIYW5kbGVyID0gcmVtb3ZlRmlsZUhhbmRsZXI7XG4gICAgdGhpcy5yZW1vdmVEaXJlY3RvcnlIYW5kbGVyID0gcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBhZGRNYXJrZXIoZW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBoYXNNYXJrZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuKCk7XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgaXNTdWJFbnRyeSwgbmV4dCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgdGhpcy5yZW1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIGlzU3ViRW50cnksIG5leHQpO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlUGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIGZ1bmN0aW9uIGFmdGVyUmVtb3ZlKHJlbW92ZWRQYXRoKSB7XG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKHJlbW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cblxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciByZW1vdmVkUGF0aCA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5SGFuZGxlcihzb3VyY2VQYXRoLCBpc1N1YkVudHJ5LCBhZnRlclJlbW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChyZW1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlclJlbW92ZS5jYWxsKHRoaXMsIHJlbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGUsIHNvdXJjZVBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlclJlbW92ZShyZW1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IHNvdXJjZVBhdGgpIHtcblxuICAgICAgfVxuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuXG4gICAgdmFyIHJlbW92ZWRQYXRoID0gdGhpcy5yZW1vdmVGaWxlSGFuZGxlcihzb3VyY2VQYXRoLCBpc1N1YkVudHJ5LCBhZnRlclJlbW92ZS5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChyZW1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBhZnRlclJlbW92ZS5jYWxsKHRoaXMsIHJlbW92ZWRQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICB9XG59XG5cblJ1YmJpc2hCaW4uY2xvbmUgPSBmdW5jdGlvbihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoUnViYmlzaEJpbiwgc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyKTtcbn07XG5cblJ1YmJpc2hCaW4uZnJvbUhUTUwgPSBmdW5jdGlvbihodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iXX0=
