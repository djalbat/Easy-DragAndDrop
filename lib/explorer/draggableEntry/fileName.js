'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nameUtil = require('../../util/name'),
    Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry');

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, name, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = Entry.types.FILE_NAME;

    var _this = _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, name, explorer, type));

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.MARKER:
        case Entry.types.FILE_NAME:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameUtil.nameIsBeforeEntryName(name, entryName);
          break;

        case Entry.types.DIRECTORY_NAME:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'isRecognised',
    value: function isRecognised() {
      var recognised = this.hasClass('recognised');

      return recognised;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'setRecognised',
    value: function setRecognised(recognised) {
      recognised ? this.recognise() : this.overlook();
    }
  }, {
    key: 'recognise',
    value: function recognise() {
      this.addClass('recognised');
    }
  }, {
    key: 'overlook',
    value: function overlook() {
      this.removeClass('recognised');
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = FileNameDraggableEntry;
      }

      var _properties = properties,
          name = _properties.name,
          explorer = _properties.explorer,
          recognised = _properties.recognised,
          hidden = _properties.hidden,
          fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);


      fileNameDraggableEntry.setHidden(hidden);

      fileNameDraggableEntry.setRecognised(recognised);

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: ['name', 'explorer', 'recognised', 'hidden']
});

module.exports = FileNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJuYW1lVXRpbCIsInJlcXVpcmUiLCJFbnRyeSIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwib25Eb3VibGVDbGljayIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJlbnRyeSIsImJlZm9yZSIsImVudHJ5VHlwZSIsImdldFR5cGUiLCJNQVJLRVIiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUUiLCJyZWNvZ25pc2VkIiwiaGFzQ2xhc3MiLCJzdWJFbnRyaWVzIiwicmVjb2duaXNlIiwib3Zlcmxvb2siLCJhZGRDbGFzcyIsInJlbW92ZUNsYXNzIiwiZ2V0RXhwbG9yZXIiLCJmaWxlIiwib3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJoaWRkZW4iLCJmaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJzZXRIaWRkZW4iLCJzZXRSZWNvZ25pc2VkIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxpQkFBUixDQUFqQjtBQUFBLElBQ01DLFFBQVFELFFBQVEsVUFBUixDQURkO0FBQUEsSUFFTUUsaUJBQWlCRixRQUFRLG1CQUFSLENBRnZCOztJQUlNRyxzQjs7O0FBQ0osa0NBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxPQUFPTixNQUFNTyxLQUFOLENBQVlDLFNBQXpCOztBQURvQyxnSkFHOUJMLFFBSDhCLEVBR3BCQyxJQUhvQixFQUdkQyxRQUhjLEVBR0pDLElBSEk7O0FBS3BDLFVBQUtHLGFBQUwsQ0FBbUIsTUFBS0Msa0JBQUwsQ0FBd0JDLElBQXhCLE9BQW5CO0FBTG9DO0FBTXJDOzs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRQyxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtkLE1BQU1PLEtBQU4sQ0FBWVMsTUFBakI7QUFDQSxhQUFLaEIsTUFBTU8sS0FBTixDQUFZQyxTQUFqQjtBQUNFLGNBQU1KLE9BQU8sS0FBS2EsT0FBTCxFQUFiO0FBQUEsY0FDTUMsWUFBWU4sTUFBTUssT0FBTixFQURsQjs7QUFHQUosbUJBQVNmLFNBQVNxQixxQkFBVCxDQUErQmYsSUFBL0IsRUFBcUNjLFNBQXJDLENBQVQ7QUFDQTs7QUFFRixhQUFLbEIsTUFBTU8sS0FBTixDQUFZYSxjQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFYSjs7QUFjQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1RLGFBQWEsS0FBS0MsUUFBTCxDQUFjLFlBQWQsQ0FBbkI7O0FBRUEsYUFBT0QsVUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1FLGFBQWEsRUFBbkIsQ0FEbUIsQ0FDSzs7QUFFeEIsYUFBT0EsVUFBUDtBQUNEOzs7a0NBRWFGLFUsRUFBWTtBQUN4QkEsbUJBQ0UsS0FBS0csU0FBTCxFQURGLEdBRUksS0FBS0MsUUFBTCxFQUZKO0FBR0Q7OztnQ0FFVztBQUNWLFdBQUtDLFFBQUwsQ0FBYyxZQUFkO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtDLFdBQUwsQ0FBaUIsWUFBakI7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNdEIsV0FBVyxLQUFLdUIsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLE9BQU8sSUFEYixDQURtQixDQUVBOztBQUVuQnhCLGVBQVN5QiwwQkFBVCxDQUFvQ0QsSUFBcEM7QUFDRDs7O21DQUVxQkUsSyxFQUFPQyxVLEVBQVk7QUFDdkMsVUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQkYscUJBQWFELEtBQWI7QUFDQUEsZ0JBQVE3QixzQkFBUjtBQUNEOztBQUpzQyx3QkFNUThCLFVBTlI7QUFBQSxVQU0vQjVCLElBTitCLGVBTS9CQSxJQU4rQjtBQUFBLFVBTXpCQyxRQU55QixlQU16QkEsUUFOeUI7QUFBQSxVQU1mZ0IsVUFOZSxlQU1mQSxVQU5lO0FBQUEsVUFNSGMsTUFORyxlQU1IQSxNQU5HO0FBQUEsVUFPakNDLHNCQVBpQyxHQU9SbkMsZUFBZW9DLGNBQWYsQ0FBOEJOLEtBQTlCLEVBQXFDQyxVQUFyQyxFQUFpRDVCLElBQWpELEVBQXVEQyxRQUF2RCxDQVBROzs7QUFTdkMrQiw2QkFBdUJFLFNBQXZCLENBQWlDSCxNQUFqQzs7QUFFQUMsNkJBQXVCRyxhQUF2QixDQUFxQ2xCLFVBQXJDOztBQUVBLGFBQU9lLHNCQUFQO0FBQ0Q7Ozs7RUFsRmtDbkMsYzs7QUFxRnJDdUMsT0FBT0MsTUFBUCxDQUFjdkMsc0JBQWQsRUFBc0M7QUFDcEN3QyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQURpQjtBQUlwQ0MscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLFVBRmlCLEVBR2pCLFlBSGlCLEVBSWpCLFFBSmlCO0FBSmlCLENBQXRDOztBQVlBQyxPQUFPQyxPQUFQLEdBQWlCNUMsc0JBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuYW1lVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvbmFtZScpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRklMRV9OQU1FO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICAgIFxuICAgICAgICBiZWZvcmUgPSBuYW1lVXRpbC5uYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc1JlY29nbmlzZWQoKSB7XG4gICAgY29uc3QgcmVjb2duaXNlZCA9IHRoaXMuaGFzQ2xhc3MoJ3JlY29nbmlzZWQnKTtcblxuICAgIHJldHVybiByZWNvZ25pc2VkO1xuICB9XG5cbiAgcmV0cmlldmVTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBzZXRSZWNvZ25pc2VkKHJlY29nbmlzZWQpIHtcbiAgICByZWNvZ25pc2VkID9cbiAgICAgIHRoaXMucmVjb2duaXNlKCkgOlxuICAgICAgICB0aGlzLm92ZXJsb29rKCk7XG4gIH1cblxuICByZWNvZ25pc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygncmVjb2duaXNlZCcpO1xuICB9XG5cbiAgb3Zlcmxvb2soKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygncmVjb2duaXNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCwgaGlkZGVuIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRIaWRkZW4oaGlkZGVuKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuc2V0UmVjb2duaXNlZChyZWNvZ25pc2VkKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGVOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdyZWNvZ25pc2VkJyxcbiAgICAnaGlkZGVuJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG4iXX0=