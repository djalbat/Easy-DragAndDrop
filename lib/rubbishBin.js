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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixpQkFBdEIsRUFBeUMsc0JBQXpDLEVBQWlFO0FBQUE7O0FBQUEsOEZBQ3pELFFBRHlEOztBQUcvRCxVQUFLLGlCQUFMLEdBQXlCLGlCQUF6QjtBQUNBLFVBQUssc0JBQUwsR0FBOEIsc0JBQTlCOztBQUVBLFVBQUssS0FBTDtBQU4rRDtBQU9oRTs7OzsrQ0FFMEI7QUFBRSxhQUFPLElBQVA7QUFBYzs7OzhCQUVqQyxLLEVBQU87QUFDZixXQUFLLElBQUw7QUFDRDs7O21DQUVjO0FBQ2IsV0FBSyxLQUFMO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sS0FBSyxNQUFMLEVBQVA7QUFDRDs7O2tDQUVhLFMsRUFBVyxVLEVBQVksVSxFQUFZLFUsRUFBWSxJLEVBQU07QUFDakUsV0FBSyxlQUFMLENBQXFCLFNBQXJCLEVBQWdDLFVBQWhDLEVBQTRDLFVBQTVDLEVBQXdELElBQXhEO0FBQ0Q7Ozs2QkFFUSxJLEVBQU0sVSxFQUFZLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQ3ZELFdBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixVQUF0QixFQUFrQyxVQUFsQyxFQUE4QyxJQUE5QztBQUNEOzs7b0NBRWUsUyxFQUFXLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQ3ZELGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixvQkFBVSxNQUFWO0FBQ0QsU0FGTSxNQUVBLElBQUksZ0JBQWdCLFVBQXBCLEVBQWdDLENBRXRDOztBQUVEO0FBQ0Q7O0FBRUQsVUFBSSxjQUFjLEtBQUssc0JBQUwsQ0FBNEIsVUFBNUIsRUFBd0MsVUFBeEMsRUFBb0QsWUFBWSxJQUFaLENBQWlCLElBQWpCLENBQXBELENBQWxCOztBQUVBLFVBQUksZ0JBQWdCLFNBQXBCLEVBQStCO0FBQzdCLG9CQUFZLElBQVosQ0FBaUIsSUFBakIsRUFBdUIsV0FBdkI7QUFDRDtBQUNGOzs7K0JBRVUsSSxFQUFNLFUsRUFBWSxVLEVBQVksSSxFQUFNO0FBQzdDLGVBQVMsV0FBVCxDQUFxQixXQUFyQixFQUFrQztBQUNoQyxZQUFJLEtBQUosRUFBVyxDQUVWLENBRkQsTUFFTyxJQUFJLGdCQUFnQixJQUFwQixFQUEwQjtBQUMvQixlQUFLLE1BQUw7QUFDRCxTQUZNLE1BRUEsSUFBSSxnQkFBZ0IsVUFBcEIsRUFBZ0MsQ0FFdEM7O0FBRUQ7QUFDRDs7QUFFRCxVQUFJLGNBQWMsS0FBSyxpQkFBTCxDQUF1QixVQUF2QixFQUFtQyxVQUFuQyxFQUErQyxZQUFZLElBQVosQ0FBaUIsSUFBakIsQ0FBL0MsQ0FBbEI7O0FBRUEsVUFBSSxnQkFBZ0IsU0FBcEIsRUFBK0I7QUFDN0Isb0JBQVksSUFBWixDQUFpQixJQUFqQixFQUF1QixXQUF2QjtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLFdBQUssUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBSyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFQO0FBQ0Q7Ozs7RUFsRnNCLGdCOztBQXFGekIsV0FBVyxLQUFYLEdBQW1CLFVBQVMsUUFBVCxFQUFtQixpQkFBbkIsRUFBc0Msc0JBQXRDLEVBQThEO0FBQy9FLFNBQU8sUUFBUSxLQUFSLENBQWMsVUFBZCxFQUEwQixRQUExQixFQUFvQyxpQkFBcEMsRUFBdUQsc0JBQXZELENBQVA7QUFDRCxDQUZEOztBQUlBLFdBQVcsUUFBWCxHQUFzQixVQUFTLElBQVQsRUFBZSxpQkFBZixFQUFrQyxzQkFBbEMsRUFBMEQ7QUFDOUUsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsSUFBN0IsRUFBbUMsaUJBQW5DLEVBQXNELHNCQUF0RCxDQUFQO0FBQ0QsQ0FGRDs7QUFJQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoicnViYmlzaEJpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxudmFyIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnJlbW92ZUZpbGVIYW5kbGVyID0gcmVtb3ZlRmlsZUhhbmRsZXI7XG4gICAgdGhpcy5yZW1vdmVEaXJlY3RvcnlIYW5kbGVyID0gcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcjtcbiAgICBcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiBudWxsOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICB0aGlzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIGlzU3ViRW50cnksIG5leHQpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgaXNTdWJFbnRyeSwgbmV4dCkge1xuICAgIHRoaXMucmVtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICBmdW5jdGlvbiBhZnRlclJlbW92ZShyZW1vdmVkUGF0aCkge1xuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAocmVtb3ZlZFBhdGggPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuICAgICAgfSBlbHNlIGlmIChyZW1vdmVkUGF0aCA9PT0gc291cmNlUGF0aCkge1xuXG4gICAgICB9XG5cbiAgICAgIG5leHQoKTtcbiAgICB9XG5cbiAgICB2YXIgcmVtb3ZlZFBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeUhhbmRsZXIoc291cmNlUGF0aCwgaXNTdWJFbnRyeSwgYWZ0ZXJSZW1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAocmVtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJSZW1vdmUuY2FsbCh0aGlzLCByZW1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlLCBzb3VyY2VQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KSB7XG4gICAgZnVuY3Rpb24gYWZ0ZXJSZW1vdmUocmVtb3ZlZFBhdGgpIHtcbiAgICAgIGlmIChmYWxzZSkge1xuXG4gICAgICB9IGVsc2UgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgICB9IGVsc2UgaWYgKHJlbW92ZWRQYXRoID09PSBzb3VyY2VQYXRoKSB7XG5cbiAgICAgIH1cblxuICAgICAgbmV4dCgpO1xuICAgIH1cblxuICAgIHZhciByZW1vdmVkUGF0aCA9IHRoaXMucmVtb3ZlRmlsZUhhbmRsZXIoc291cmNlUGF0aCwgaXNTdWJFbnRyeSwgYWZ0ZXJSZW1vdmUuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAocmVtb3ZlZFBhdGggIT09IHVuZGVmaW5lZCkge1xuICAgICAgYWZ0ZXJSZW1vdmUuY2FsbCh0aGlzLCByZW1vdmVkUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgfVxufVxuXG5SdWJiaXNoQmluLmNsb25lID0gZnVuY3Rpb24oc2VsZWN0b3IsIHJlbW92ZUZpbGVIYW5kbGVyLCByZW1vdmVEaXJlY3RvcnlIYW5kbGVyKSB7XG4gIHJldHVybiBFbGVtZW50LmNsb25lKFJ1YmJpc2hCaW4sIHNlbGVjdG9yLCByZW1vdmVGaWxlSGFuZGxlciwgcmVtb3ZlRGlyZWN0b3J5SGFuZGxlcik7XG59O1xuXG5SdWJiaXNoQmluLmZyb21IVE1MID0gZnVuY3Rpb24oaHRtbCwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpIHtcbiAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoUnViYmlzaEJpbiwgaHRtbCwgcmVtb3ZlRmlsZUhhbmRsZXIsIHJlbW92ZURpcmVjdG9yeUhhbmRsZXIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIl19
