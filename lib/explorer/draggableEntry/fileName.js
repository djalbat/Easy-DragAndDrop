'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

    return _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, name, explorer, type));
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
  }, {
    key: 'initialise',
    value: function initialise(recognised, hidden) {
      _get(FileNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry.prototype), 'initialise', this).call(this);

      this.setHidden(hidden);

      this.setRecognised(recognised);

      var doubleClickHandler = this.doubleClickHandler.bind(this);

      this.onDoubleClick(doubleClickHandler);
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


      fileNameDraggableEntry.initialise(recognised, hidden);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJuYW1lVXRpbCIsInJlcXVpcmUiLCJFbnRyeSIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsIm5hbWVJc0JlZm9yZUVudHJ5TmFtZSIsIkRJUkVDVE9SWV9OQU1FIiwicmVjb2duaXNlZCIsImhhc0NsYXNzIiwic3ViRW50cmllcyIsInJlY29nbmlzZSIsIm92ZXJsb29rIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiaGlkZGVuIiwic2V0SGlkZGVuIiwic2V0UmVjb2duaXNlZCIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJvbkRvdWJsZUNsaWNrIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsV0FBV0MsUUFBUSxpQkFBUixDQUFqQjtBQUFBLElBQ01DLFFBQVFELFFBQVEsVUFBUixDQURkO0FBQUEsSUFFTUUsaUJBQWlCRixRQUFRLG1CQUFSLENBRnZCOztJQUlNRyxzQjs7O0FBQ0osa0NBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxRQUE1QixFQUFzQztBQUFBOztBQUNwQyxRQUFNQyxPQUFPTixNQUFNTyxLQUFOLENBQVlDLFNBQXpCOztBQURvQywySUFHOUJMLFFBSDhCLEVBR3BCQyxJQUhvQixFQUdkQyxRQUhjLEVBR0pDLElBSEk7QUFJckM7Ozs7b0RBRStCO0FBQzlCLGFBQU8sS0FBUDtBQUNEOzs7NkJBRVFHLEssRUFBTztBQUNkLFVBQUlDLGVBQUo7O0FBRUEsVUFBTUMsWUFBWUYsTUFBTUcsT0FBTixFQUFsQjs7QUFFQSxjQUFRRCxTQUFSO0FBQ0UsYUFBS1gsTUFBTU8sS0FBTixDQUFZTSxNQUFqQjtBQUNBLGFBQUtiLE1BQU1PLEtBQU4sQ0FBWUMsU0FBakI7QUFDRSxjQUFNSixPQUFPLEtBQUtVLE9BQUwsRUFBYjtBQUFBLGNBQ01DLFlBQVlOLE1BQU1LLE9BQU4sRUFEbEI7O0FBR0FKLG1CQUFTWixTQUFTa0IscUJBQVQsQ0FBK0JaLElBQS9CLEVBQXFDVyxTQUFyQyxDQUFUO0FBQ0E7O0FBRUYsYUFBS2YsTUFBTU8sS0FBTixDQUFZVSxjQUFqQjtBQUNFUCxtQkFBUyxLQUFUO0FBQ0E7QUFYSjs7QUFjQSxhQUFPQSxNQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLFVBQU1RLGFBQWEsS0FBS0MsUUFBTCxDQUFjLFlBQWQsQ0FBbkI7O0FBRUEsYUFBT0QsVUFBUDtBQUNEOzs7eUNBRW9CO0FBQ25CLFVBQU1FLGFBQWEsRUFBbkIsQ0FEbUIsQ0FDSzs7QUFFeEIsYUFBT0EsVUFBUDtBQUNEOzs7a0NBRWFGLFUsRUFBWTtBQUN4QkEsbUJBQ0UsS0FBS0csU0FBTCxFQURGLEdBRUksS0FBS0MsUUFBTCxFQUZKO0FBR0Q7OztnQ0FFVztBQUNWLFdBQUtDLFFBQUwsQ0FBYyxZQUFkO0FBQ0Q7OzsrQkFFVTtBQUNULFdBQUtDLFdBQUwsQ0FBaUIsWUFBakI7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNbkIsV0FBVyxLQUFLb0IsV0FBTCxFQUFqQjtBQUFBLFVBQ01DLE9BQU8sSUFEYixDQURtQixDQUVBOztBQUVuQnJCLGVBQVNzQiwwQkFBVCxDQUFvQ0QsSUFBcEM7QUFDRDs7OytCQUVVUixVLEVBQVlVLE0sRUFBUztBQUM5Qjs7QUFFQSxXQUFLQyxTQUFMLENBQWVELE1BQWY7O0FBRUEsV0FBS0UsYUFBTCxDQUFtQlosVUFBbkI7O0FBRUEsVUFBTWEscUJBQXFCLEtBQUtBLGtCQUFMLENBQXdCQyxJQUF4QixDQUE2QixJQUE3QixDQUEzQjs7QUFFQSxXQUFLQyxhQUFMLENBQW1CRixrQkFBbkI7QUFDRDs7O21DQUVxQkcsSyxFQUFPQyxVLEVBQVk7QUFDdkMsVUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUMxQkYscUJBQWFELEtBQWI7QUFDQUEsZ0JBQVFoQyxzQkFBUjtBQUNEOztBQUpzQyx3QkFNUWlDLFVBTlI7QUFBQSxVQU0vQi9CLElBTitCLGVBTS9CQSxJQU4rQjtBQUFBLFVBTXpCQyxRQU55QixlQU16QkEsUUFOeUI7QUFBQSxVQU1mYSxVQU5lLGVBTWZBLFVBTmU7QUFBQSxVQU1IVSxNQU5HLGVBTUhBLE1BTkc7QUFBQSxVQU9qQ1Usc0JBUGlDLEdBT1JyQyxlQUFlc0MsY0FBZixDQUE4QkwsS0FBOUIsRUFBcUNDLFVBQXJDLEVBQWlEL0IsSUFBakQsRUFBdURDLFFBQXZELENBUFE7OztBQVN2Q2lDLDZCQUF1QkUsVUFBdkIsQ0FBa0N0QixVQUFsQyxFQUE4Q1UsTUFBOUM7O0FBRUEsYUFBT1Usc0JBQVA7QUFDRDs7OztFQTFGa0NyQyxjOztBQTZGckN3QyxPQUFPQyxNQUFQLENBQWN4QyxzQkFBZCxFQUFzQztBQUNwQ3lDLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNLEdBRGlCO0FBSXBDQyxxQkFBbUIsQ0FDakIsTUFEaUIsRUFFakIsVUFGaUIsRUFHakIsWUFIaUIsRUFJakIsUUFKaUI7QUFKaUIsQ0FBdEM7O0FBWUFDLE9BQU9DLE9BQVAsR0FBaUI3QyxzQkFBakIiLCJmaWxlIjoiZmlsZU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hbWVVdGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9uYW1lJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFX05BTUU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZVV0aWwubmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNSZWNvZ25pc2VkKCkge1xuICAgIGNvbnN0IHJlY29nbmlzZWQgPSB0aGlzLmhhc0NsYXNzKCdyZWNvZ25pc2VkJyk7XG5cbiAgICByZXR1cm4gcmVjb2duaXNlZDtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgc2V0UmVjb2duaXNlZChyZWNvZ25pc2VkKSB7XG4gICAgcmVjb2duaXNlZCA/XG4gICAgICB0aGlzLnJlY29nbmlzZSgpIDpcbiAgICAgICAgdGhpcy5vdmVybG9vaygpO1xuICB9XG5cbiAgcmVjb2duaXNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ3JlY29nbmlzZWQnKTtcbiAgfVxuXG4gIG92ZXJsb29rKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3JlY29nbmlzZWQnKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZSk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UocmVjb2duaXNlZCwgaGlkZGVuKSAge1xuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICB0aGlzLnNldEhpZGRlbihoaWRkZW4pO1xuXG4gICAgdGhpcy5zZXRSZWNvZ25pc2VkKHJlY29nbmlzZWQpO1xuICAgIFxuICAgIGNvbnN0IGRvdWJsZUNsaWNrSGFuZGxlciA9IHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCwgaGlkZGVuIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKHJlY29nbmlzZWQsIGhpZGRlbik7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlTmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJyxcbiAgICAncmVjb2duaXNlZCcsXG4gICAgJ2hpZGRlbidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuIl19