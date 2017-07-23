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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlTmFtZS5qcyJdLCJuYW1lcyI6WyJuYW1lVXRpbCIsInJlcXVpcmUiLCJFbnRyeSIsIkRyYWdnYWJsZUVudHJ5IiwiRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwibmFtZSIsImV4cGxvcmVyIiwidHlwZSIsInR5cGVzIiwiRklMRV9OQU1FIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwiTUFSS0VSIiwiZ2V0TmFtZSIsImVudHJ5TmFtZSIsIm5hbWVJc0JlZm9yZUVudHJ5TmFtZSIsIkRJUkVDVE9SWV9OQU1FIiwicmVjb2duaXNlZCIsImhhc0NsYXNzIiwic3ViRW50cmllcyIsInJlY29nbmlzZSIsIm92ZXJsb29rIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsImdldEV4cGxvcmVyIiwiZmlsZSIsIm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5IiwiaGlkZGVuIiwic2V0SGlkZGVuIiwic2V0UmVjb2duaXNlZCIsImRvdWJsZUNsaWNrSGFuZGxlciIsImJpbmQiLCJvbkRvdWJsZUNsaWNrIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiaW5pdGlhbGlzZSIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwiaWdub3JlZFByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsaUJBQVIsQ0FBakI7QUFBQSxJQUNNQyxRQUFRRCxRQUFRLFVBQVIsQ0FEZDtBQUFBLElBRU1FLGlCQUFpQkYsUUFBUSxtQkFBUixDQUZ2Qjs7SUFJTUcsc0I7OztBQUNKLGtDQUFZQyxRQUFaLEVBQXNCQyxJQUF0QixFQUE0QkMsUUFBNUIsRUFBc0M7QUFBQTs7QUFDcEMsUUFBTUMsT0FBT04sTUFBTU8sS0FBTixDQUFZQyxTQUF6Qjs7QUFEb0MsMklBRzlCTCxRQUg4QixFQUdwQkMsSUFIb0IsRUFHZEMsUUFIYyxFQUdKQyxJQUhJO0FBSXJDOzs7O29EQUUrQjtBQUM5QixhQUFPLEtBQVA7QUFDRDs7OzZCQUVRRyxLLEVBQU87QUFDZCxVQUFJQyxlQUFKOztBQUVBLFVBQU1DLFlBQVlGLE1BQU1HLE9BQU4sRUFBbEI7O0FBRUEsY0FBUUQsU0FBUjtBQUNFLGFBQUtYLE1BQU1PLEtBQU4sQ0FBWU0sTUFBakI7QUFDQSxhQUFLYixNQUFNTyxLQUFOLENBQVlDLFNBQWpCO0FBQ0UsY0FBTUosT0FBTyxLQUFLVSxPQUFMLEVBQWI7QUFBQSxjQUNNQyxZQUFZTixNQUFNSyxPQUFOLEVBRGxCOztBQUdBSixtQkFBU1osU0FBU2tCLHFCQUFULENBQStCWixJQUEvQixFQUFxQ1csU0FBckMsQ0FBVDtBQUNBOztBQUVGLGFBQUtmLE1BQU1PLEtBQU4sQ0FBWVUsY0FBakI7QUFDRVAsbUJBQVMsS0FBVDtBQUNBO0FBWEo7O0FBY0EsYUFBT0EsTUFBUDtBQUNEOzs7bUNBRWM7QUFDYixVQUFNUSxhQUFhLEtBQUtDLFFBQUwsQ0FBYyxZQUFkLENBQW5COztBQUVBLGFBQU9ELFVBQVA7QUFDRDs7O3lDQUVvQjtBQUNuQixVQUFNRSxhQUFhLEVBQW5CLENBRG1CLENBQ0s7O0FBRXhCLGFBQU9BLFVBQVA7QUFDRDs7O2tDQUVhRixVLEVBQVk7QUFDeEJBLG1CQUNFLEtBQUtHLFNBQUwsRUFERixHQUVJLEtBQUtDLFFBQUwsRUFGSjtBQUdEOzs7Z0NBRVc7QUFDVixXQUFLQyxRQUFMLENBQWMsWUFBZDtBQUNEOzs7K0JBRVU7QUFDVCxXQUFLQyxXQUFMLENBQWlCLFlBQWpCO0FBQ0Q7Ozt5Q0FFb0I7QUFDbkIsVUFBTW5CLFdBQVcsS0FBS29CLFdBQUwsRUFBakI7QUFBQSxVQUNNQyxPQUFPLElBRGIsQ0FEbUIsQ0FFQTs7QUFFbkJyQixlQUFTc0IsMEJBQVQsQ0FBb0NELElBQXBDO0FBQ0Q7OzsrQkFFVVIsVSxFQUFZVSxNLEVBQVM7QUFDOUIsV0FBS0MsU0FBTCxDQUFlRCxNQUFmOztBQUVBLFdBQUtFLGFBQUwsQ0FBbUJaLFVBQW5COztBQUVBLFVBQU1hLHFCQUFxQixLQUFLQSxrQkFBTCxDQUF3QkMsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBM0I7O0FBRUEsV0FBS0MsYUFBTCxDQUFtQkYsa0JBQW5CO0FBQ0Q7OzttQ0FFcUJHLEssRUFBT0MsVSxFQUFZO0FBQ3ZDLFVBQUlDLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDMUJGLHFCQUFhRCxLQUFiO0FBQ0FBLGdCQUFRaEMsc0JBQVI7QUFDRDs7QUFKc0Msd0JBTVFpQyxVQU5SO0FBQUEsVUFNL0IvQixJQU4rQixlQU0vQkEsSUFOK0I7QUFBQSxVQU16QkMsUUFOeUIsZUFNekJBLFFBTnlCO0FBQUEsVUFNZmEsVUFOZSxlQU1mQSxVQU5lO0FBQUEsVUFNSFUsTUFORyxlQU1IQSxNQU5HO0FBQUEsVUFPakNVLHNCQVBpQyxHQU9SckMsZUFBZXNDLGNBQWYsQ0FBOEJMLEtBQTlCLEVBQXFDQyxVQUFyQyxFQUFpRC9CLElBQWpELEVBQXVEQyxRQUF2RCxDQVBROzs7QUFTdkNpQyw2QkFBdUJFLFVBQXZCLENBQWtDdEIsVUFBbEMsRUFBOENVLE1BQTlDOztBQUVBLGFBQU9VLHNCQUFQO0FBQ0Q7Ozs7RUF4RmtDckMsYzs7QUEyRnJDd0MsT0FBT0MsTUFBUCxDQUFjeEMsc0JBQWQsRUFBc0M7QUFDcEN5QyxxQkFBbUI7QUFDakJDLGVBQVc7QUFETSxHQURpQjtBQUlwQ0MscUJBQW1CLENBQ2pCLE1BRGlCLEVBRWpCLFVBRmlCLEVBR2pCLFlBSGlCLEVBSWpCLFFBSmlCO0FBSmlCLENBQXRDOztBQVlBQyxPQUFPQyxPQUFQLEdBQWlCN0Msc0JBQWpCIiwiZmlsZSI6ImZpbGVOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuYW1lVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvbmFtZScpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRklMRV9OQU1FO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEVfTkFNRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWVVdGlsLm5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7ICAgICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzUmVjb2duaXNlZCgpIHtcbiAgICBjb25zdCByZWNvZ25pc2VkID0gdGhpcy5oYXNDbGFzcygncmVjb2duaXNlZCcpO1xuXG4gICAgcmV0dXJuIHJlY29nbmlzZWQ7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgY29uc3Qgc3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIHNldFJlY29nbmlzZWQocmVjb2duaXNlZCkge1xuICAgIHJlY29nbmlzZWQgP1xuICAgICAgdGhpcy5yZWNvZ25pc2UoKSA6XG4gICAgICAgIHRoaXMub3Zlcmxvb2soKTtcbiAgfVxuXG4gIHJlY29nbmlzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBvdmVybG9vaygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKHJlY29nbmlzZWQsIGhpZGRlbikgIHtcbiAgICB0aGlzLnNldEhpZGRlbihoaWRkZW4pO1xuXG4gICAgdGhpcy5zZXRSZWNvZ25pc2VkKHJlY29nbmlzZWQpO1xuICAgIFxuICAgIGNvbnN0IGRvdWJsZUNsaWNrSGFuZGxlciA9IHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCwgaGlkZGVuIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pbml0aWFsaXNlKHJlY29nbmlzZWQsIGhpZGRlbik7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdmaWxlTmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJyxcbiAgICAncmVjb2duaXNlZCcsXG4gICAgJ2hpZGRlbidcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcblxuIl19