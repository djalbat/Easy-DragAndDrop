'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var types = require('../../types'),
    Entries = require('../../entries'),
    NameButton = require('../../button/name'),
    DraggableEntry = require('../../entry/draggable');

var Button = easy.Button,
    React = easy.React,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry() {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    return _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).apply(this, arguments));
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent; ///

      return marked;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;

          break;
      }

      return before;
    }
  }, {
    key: 'isFileNameDraggableEntry',
    value: function isFileNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry = void 0;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'toggleButtonClickHandler',
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: 'setCollapsed',
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.addClass('collapsed');
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.toggleClass('collapsed');
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var name = properties.name,
          explorer = properties.explorer,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);


      return [React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler }), React.createElement(
        NameButton,
        null,
        name
      ), React.createElement(Entries, { explorer: explorer })];
    }
  }, {
    key: 'initialise',
    value: function initialise(collapsed) {
      this.setCollapsed(collapsed);

      _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'initialise', this).call(this);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          _properties$collapsed = _properties.collapsed,
          collapsed = _properties$collapsed === undefined ? false : _properties$collapsed,
          type = DIRECTORY_NAME_TYPE,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, type);


      directoryNameDraggableEntry.initialise(collapsed);

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directory-name'
  },
  ignoredProperties: ['collapsed']
});

module.exports = DirectoryNameDraggableEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsInR5cGVzIiwiRW50cmllcyIsIk5hbWVCdXR0b24iLCJEcmFnZ2FibGVFbnRyeSIsIkJ1dHRvbiIsIlJlYWN0IiwiRklMRV9OQU1FX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9UWVBFIiwiRklMRV9OQU1FX01BUktFUl9UWVBFIiwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUiLCJEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJjb2xsYXBzZWQiLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiYm91bmRzIiwiY29sbGFwc2VkQm91bmRzIiwiZXhwYW5kIiwiaGFzQ2xhc3MiLCJtYXJrZXJFbnRyeVByZXNlbnQiLCJpc01hcmtlckVudHJ5UHJlc2VudCIsIm1hcmtlZCIsImVudHJ5IiwiYmVmb3JlIiwiZW50cnlUeXBlIiwiZ2V0VHlwZSIsIm5hbWUiLCJnZXROYW1lIiwiZW50cnlOYW1lIiwibG9jYWxlQ29tcGFyZSIsImRyYWdnYWJsZUVudHJ5Iiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSIsImRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwiZ2V0Q29sbGFwc2VkQm91bmRzIiwib3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyIsInRvZ2dsZSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyIsInByb3BlcnRpZXMiLCJleHBsb3JlciIsInRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciIsImJpbmQiLCJzZXRDb2xsYXBzZWQiLCJDbGFzcyIsImFyZ3VtZW50cyIsImxlbmd0aCIsInR5cGUiLCJkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkiLCJmcm9tUHJvcGVydGllcyIsImluaXRpYWxpc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJkZWZhdWx0UHJvcGVydGll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c3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgdHlwZXMgPSByZXF1aXJlKCcuLi8uLi90eXBlcycpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uLy4uL2VudHJpZXMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuLi8uLi9idXR0b24vbmFtZScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKTtcblxuY29uc3QgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQoKSxcbiAgICAgICAgICBtYXJrZWQgPSBtYXJrZXJFbnRyeVByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCkge1xuICAgIGNvbGxhcHNlZCA/XG4gICAgICB0aGlzLmNvbGxhcHNlKCkgOlxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlciA9IHRoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPEJ1dHRvbiBjbGFzc05hbWU9XCJ0b2dnbGVcIiBvbkNsaWNrPXt0b2dnbGVCdXR0b25DbGlja0hhbmRsZXJ9IC8+LFxuICAgICAgPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPixcbiAgICAgIDxFbnRyaWVzIGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgIF0pO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKGNvbGxhcHNlZCkge1xuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXNlKCk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbGxhcHNlZCA9IGZhbHNlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHR5cGUgPSBESVJFQ1RPUllfTkFNRV9UWVBFLCAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeS1uYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiJdfQ==