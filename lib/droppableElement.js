'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util');

var DroppableElement = function (_Element) {
  _inherits(DroppableElement, _Element);

  function DroppableElement(selector) {
    _classCallCheck(this, DroppableElement);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DroppableElement).call(this, selector));
  }

  _createClass(DroppableElement, [{
    key: 'isOverlappingDraggableElement',
    value: function isOverlappingDraggableElement(draggableElement) {
      var bounds = this.getBounds(),
          draggableElementDraggingBounds = draggableElement.getDraggingBounds(),
          overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

      return overlappingDraggableElement;
    }
  }, {
    key: 'moveEntries',
    value: function moveEntries(entry, subEntries, sourcePath, targetPath, done) {
      this.moveSubEntries(subEntries, sourcePath, targetPath, function () {
        var isSubEntry = false;

        this.moveEntry(entry, sourcePath, targetPath, isSubEntry, done);
      }.bind(this));
    }
  }, {
    key: 'moveSubEntries',
    value: function moveSubEntries(subEntries, sourcePath, targetPath, done) {
      subEntries.reverse(); ///

      var isSubEntry = true;

      asyncForEach(subEntries, function (subEntry, next) {
        this.moveEntry(subEntry, sourcePath, targetPath, isSubEntry, next);
      }.bind(this), done);
    }
  }, {
    key: 'moveEntry',
    value: function moveEntry(entry, sourcePath, targetPath, isSubEntry, next) {
      var entryPath = entry.getPath(),
          sourceEntryPath = entryPath,
          ///
      targetEntryPath = targetPath === null ? null : util.replaceTopmostPath(entryPath, sourcePath, targetPath),
          ///
      entryIsDirectory = entry.isDirectory();

      entryIsDirectory ? this.moveDirectory(entry, sourceEntryPath, targetEntryPath, isSubEntry, next) : this.moveFile(entry, sourceEntryPath, targetEntryPath, isSubEntry, next);
    }
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function next() {
    index++;

    if (index === arrayLength) {
      done();
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9kcm9wcGFibGVFbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBSSxTQUFTLFFBQVEsUUFBUixDQUFiO0lBQ0ksVUFBVSxPQUFPLE9BRHJCOztBQUdBLElBQUksT0FBTyxRQUFRLFFBQVIsQ0FBWDs7SUFFTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQjtBQUFBOztBQUFBLCtGQUNkLFFBRGM7QUFFckI7Ozs7a0RBRTZCLGdCLEVBQWtCO0FBQzlDLFVBQUksU0FBUyxLQUFLLFNBQUwsRUFBYjtVQUNJLGlDQUFpQyxpQkFBaUIsaUJBQWpCLEVBRHJDO1VBRUksOEJBQThCLE9BQU8sY0FBUCxDQUFzQiw4QkFBdEIsQ0FGbEM7O0FBSUEsYUFBTywyQkFBUDtBQUNEOzs7Z0NBRVcsSyxFQUFPLFUsRUFBWSxVLEVBQVksVSxFQUFZLEksRUFBTTtBQUMzRCxXQUFLLGNBQUwsQ0FBb0IsVUFBcEIsRUFBZ0MsVUFBaEMsRUFBNEMsVUFBNUMsRUFBd0QsWUFBVztBQUNqRSxZQUFJLGFBQWEsS0FBakI7O0FBRUEsYUFBSyxTQUFMLENBQWUsS0FBZixFQUFzQixVQUF0QixFQUFrQyxVQUFsQyxFQUE4QyxVQUE5QyxFQUEwRCxJQUExRDtBQUNELE9BSnVELENBSXRELElBSnNELENBSWpELElBSmlELENBQXhEO0FBS0Q7OzttQ0FFYyxVLEVBQVksVSxFQUFZLFUsRUFBWSxJLEVBQU07QUFDdkQsaUJBQVcsT0FBWCxHOztBQUVBLFVBQUksYUFBYSxJQUFqQjs7QUFFQSxtQkFDRSxVQURGLEVBRUUsVUFBUyxRQUFULEVBQW1CLElBQW5CLEVBQXlCO0FBQ3ZCLGFBQUssU0FBTCxDQUFlLFFBQWYsRUFBeUIsVUFBekIsRUFBcUMsVUFBckMsRUFBaUQsVUFBakQsRUFBNkQsSUFBN0Q7QUFDRCxPQUZELENBRUUsSUFGRixDQUVPLElBRlAsQ0FGRixFQUtFLElBTEY7QUFPRDs7OzhCQUVTLEssRUFBTyxVLEVBQVksVSxFQUFZLFUsRUFBWSxJLEVBQU07QUFDekQsVUFBSSxZQUFZLE1BQU0sT0FBTixFQUFoQjtVQUNJLGtCQUFrQixTQUR0Qjs7QUFFSSx3QkFBa0IsZUFBZSxJQUFmLEdBQ2hCLElBRGdCLEdBRWQsS0FBSyxrQkFBTCxDQUF3QixTQUF4QixFQUFtQyxVQUFuQyxFQUErQyxVQUEvQyxDQUpSOztBQUtJLHlCQUFtQixNQUFNLFdBQU4sRUFMdkI7O0FBT0EseUJBQ0UsS0FBSyxhQUFMLENBQW1CLEtBQW5CLEVBQTBCLGVBQTFCLEVBQTJDLGVBQTNDLEVBQTRELFVBQTVELEVBQXdFLElBQXhFLENBREYsR0FFSSxLQUFLLFFBQUwsQ0FBYyxLQUFkLEVBQXFCLGVBQXJCLEVBQXNDLGVBQXRDLEVBQXVELFVBQXZELEVBQW1FLElBQW5FLENBRko7QUFHRDs7OztFQTlDNEIsTzs7QUFpRC9CLE9BQU8sT0FBUCxHQUFpQixnQkFBakI7O0FBRUEsU0FBUyxZQUFULENBQXNCLEtBQXRCLEVBQTZCLEVBQTdCLEVBQWlDLElBQWpDLEVBQXVDO0FBQ3JDLE1BQUksY0FBYyxNQUFNLE1BQXhCO01BQ0ksUUFBUSxDQUFDLENBRGI7O0FBR0EsTUFBSSxPQUFPLFNBQVAsSUFBTyxHQUFXO0FBQ3BCOztBQUVBLFFBQUksVUFBVSxXQUFkLEVBQTJCO0FBQ3pCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSSxVQUFVLE1BQU0sS0FBTixDQUFkOztBQUVBLFNBQUcsT0FBSCxFQUFZLElBQVo7QUFDRDtBQUNGLEdBVkQ7O0FBWUE7QUFDRCIsImZpbGUiOiJkcm9wcGFibGVFbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVsZW1lbnQoZHJhZ2dhYmxlRWxlbWVudCkge1xuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMgPSBkcmFnZ2FibGVFbGVtZW50LmdldERyYWdnaW5nQm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudCA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbGVtZW50RHJhZ2dpbmdCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRWxlbWVudDtcbiAgfVxuICBcbiAgbW92ZUVudHJpZXMoZW50cnksIHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICB0aGlzLm1vdmVTdWJFbnRyaWVzKHN1YkVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzU3ViRW50cnkgPSBmYWxzZTtcblxuICAgICAgdGhpcy5tb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIGRvbmUpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlU3ViRW50cmllcyhzdWJFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgc3ViRW50cmllcy5yZXZlcnNlKCk7IC8vL1xuXG4gICAgdmFyIGlzU3ViRW50cnkgPSB0cnVlO1xuXG4gICAgYXN5bmNGb3JFYWNoKFxuICAgICAgc3ViRW50cmllcyxcbiAgICAgIGZ1bmN0aW9uKHN1YkVudHJ5LCBuZXh0KSB7XG4gICAgICAgIHRoaXMubW92ZUVudHJ5KHN1YkVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBpc1N1YkVudHJ5LCBuZXh0KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGRvbmVcbiAgICApXG4gIH1cblxuICBtb3ZlRW50cnkoZW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGlzU3ViRW50cnksIG5leHQpIHtcbiAgICB2YXIgZW50cnlQYXRoID0gZW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBzb3VyY2VFbnRyeVBhdGggPSBlbnRyeVBhdGgsICAvLy9cbiAgICAgICAgdGFyZ2V0RW50cnlQYXRoID0gdGFyZ2V0UGF0aCA9PT0gbnVsbCA/XG4gICAgICAgICAgbnVsbCA6XG4gICAgICAgICAgICB1dGlsLnJlcGxhY2VUb3Btb3N0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpLCAvLy9cbiAgICAgICAgZW50cnlJc0RpcmVjdG9yeSA9IGVudHJ5LmlzRGlyZWN0b3J5KCk7XG5cbiAgICBlbnRyeUlzRGlyZWN0b3J5ID9cbiAgICAgIHRoaXMubW92ZURpcmVjdG9yeShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpIDpcbiAgICAgICAgdGhpcy5tb3ZlRmlsZShlbnRyeSwgc291cmNlRW50cnlQYXRoLCB0YXJnZXRFbnRyeVBhdGgsIGlzU3ViRW50cnksIG5leHQpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRHJvcHBhYmxlRWxlbWVudDtcblxuZnVuY3Rpb24gYXN5bmNGb3JFYWNoKGFycmF5LCBjYiwgZG9uZSkge1xuICB2YXIgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICBpbmRleCA9IC0xO1xuXG4gIHZhciBuZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgaW5kZXgrKztcblxuICAgIGlmIChpbmRleCA9PT0gYXJyYXlMZW5ndGgpIHtcbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICAgIGNiKGVsZW1lbnQsIG5leHQpO1xuICAgIH1cbiAgfTtcblxuICBuZXh0KCk7XG59XG4iXX0=
