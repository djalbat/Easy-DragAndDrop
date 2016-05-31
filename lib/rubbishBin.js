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

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RubbishBin).call(this, selector, moveHandler));

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
  }]);

  return RubbishBin;
}(DroppableElement);

RubbishBin.clone = function (selector, removeHandler) {
  return Element.clone(RubbishBin, selector, removeHandler);
};

RubbishBin.fromHTML = function (html, removeHandler) {
  return Element.fromHTML(RubbishBin, html, removeHandler);
};

module.exports = RubbishBin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9ydWJiaXNoQmluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksbUJBQW1CLFFBQVEsb0JBQVIsQ0FBdkI7O0lBRU0sVTs7O0FBQ0osc0JBQVksUUFBWixFQUFzQixhQUF0QixFQUFxQztBQUFBOztBQUNuQyxRQUFJLGNBQWMsYUFBbEI7O0FBRG1DLDhGQUc3QixRQUg2QixFQUduQixXQUhtQjs7QUFLbkMsVUFBSyxLQUFMO0FBTG1DO0FBTXBDOzs7OytDQUUwQjtBQUFFLGFBQU8sSUFBUDtBQUFjOzs7OEJBRWpDLEssRUFBTztBQUNmLFdBQUssSUFBTDtBQUNEOzs7bUNBRWM7QUFDYixXQUFLLEtBQUw7QUFDRDs7O2dDQUVXO0FBQ1YsYUFBTyxLQUFLLE1BQUwsRUFBUDtBQUNEOzs7a0NBRWEsUyxFQUFXLFUsRUFBWSxTLEVBQVc7QUFDOUMsVUFBSSxjQUFjLFNBQWxCLEM7O0FBRUEsV0FBSyxlQUFMLENBQXFCLFNBQXJCLEVBQWdDLFdBQWhDO0FBQ0Q7Ozs2QkFFUSxJLEVBQU0sVSxFQUFZLFMsRUFBVztBQUNwQyxVQUFJLGNBQWMsU0FBbEIsQzs7QUFFQSxXQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsV0FBdEI7QUFDRDs7O29DQUVlLFMsRUFBVyxXLEVBQWE7QUFDdEMsVUFBSSxnQkFBZ0IsSUFBcEIsRUFBMEI7QUFDeEIsa0JBQVUsTUFBVjtBQUNEO0FBQ0Y7OzsrQkFFVSxJLEVBQU0sVyxFQUFhO0FBQzVCLFVBQUksZ0JBQWdCLElBQXBCLEVBQTBCO0FBQ3hCLGFBQUssTUFBTDtBQUNEO0FBQ0Y7OzsyQkFFTTtBQUNMLFdBQUssUUFBTCxDQUFjLE1BQWQ7QUFDRDs7OzRCQUVPO0FBQ04sV0FBSyxXQUFMLENBQWlCLE1BQWpCO0FBQ0Q7Ozs2QkFFUTtBQUNQLGFBQU8sS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFQO0FBQ0Q7Ozs7RUF6RHNCLGdCOztBQTREekIsV0FBVyxLQUFYLEdBQW1CLFVBQVMsUUFBVCxFQUFtQixhQUFuQixFQUFrQztBQUNuRCxTQUFPLFFBQVEsS0FBUixDQUFjLFVBQWQsRUFBMEIsUUFBMUIsRUFBb0MsYUFBcEMsQ0FBUDtBQUNELENBRkQ7O0FBSUEsV0FBVyxRQUFYLEdBQXNCLFVBQVMsSUFBVCxFQUFlLGFBQWYsRUFBOEI7QUFDbEQsU0FBTyxRQUFRLFFBQVIsQ0FBaUIsVUFBakIsRUFBNkIsSUFBN0IsRUFBbUMsYUFBbkMsQ0FBUDtBQUNELENBRkQ7O0FBSUEsT0FBTyxPQUFQLEdBQWlCLFVBQWpCIiwiZmlsZSI6InJ1YmJpc2hCaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbnZhciBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50Jyk7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICB2YXIgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyO1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcik7XG5cbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlIYXZpbmdNYXJrZXIoKSB7IHJldHVybiBudWxsOyB9XG5cbiAgYWRkTWFya2VyKGVudHJ5KSB7XG4gICAgdGhpcy5vcGVuKCk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgaGFzTWFya2VyKCkge1xuICAgIHJldHVybiB0aGlzLmlzT3BlbigpO1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIHZhciByZW1vdmVkUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuICAgIFxuICAgIHRoaXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgcmVtb3ZlZFBhdGgpO1xuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgdmFyIHJlbW92ZWRQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG4gICAgXG4gICAgdGhpcy5yZW1vdmVGaWxlKGZpbGUsIHJlbW92ZWRQYXRoKTtcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHJlbW92ZWRQYXRoKSB7XG4gICAgaWYgKHJlbW92ZWRQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlLCByZW1vdmVkUGF0aCkge1xuICAgIGlmIChyZW1vdmVkUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICByZXR1cm4gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICB9XG59XG5cblJ1YmJpc2hCaW4uY2xvbmUgPSBmdW5jdGlvbihzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG59O1xuXG5SdWJiaXNoQmluLmZyb21IVE1MID0gZnVuY3Rpb24oaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChSdWJiaXNoQmluLCBodG1sLCByZW1vdmVIYW5kbGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUnViYmlzaEJpbjtcbiJdfQ==
