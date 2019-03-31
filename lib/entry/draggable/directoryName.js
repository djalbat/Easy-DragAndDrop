'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entries = require('../../entries'),
    NameButton = require('../../nameButton'),
    entryTypes = require('../../entryTypes'),
    DraggableEntry = require('../../entry/draggable');

var Button = easy.Button,
    React = easy.React,
    FILE_NAME_TYPE = entryTypes.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = entryTypes.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = entryTypes.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = entryTypes.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = DIRECTORY_NAME_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, type));
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
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9lbnRyeS9kcmFnZ2FibGUvZGlyZWN0b3J5TmFtZS5qcyJdLCJuYW1lcyI6WyJlYXN5IiwicmVxdWlyZSIsIkVudHJpZXMiLCJOYW1lQnV0dG9uIiwiZW50cnlUeXBlcyIsIkRyYWdnYWJsZUVudHJ5IiwiQnV0dG9uIiwiUmVhY3QiLCJGSUxFX05BTUVfVFlQRSIsIkRJUkVDVE9SWV9OQU1FX1RZUEUiLCJGSUxFX05BTUVfTUFSS0VSX1RZUEUiLCJESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSIsIkRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSIsInNlbGVjdG9yIiwidHlwZSIsImNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwiY29sbGFwc2UiLCJib3VuZHMiLCJjb2xsYXBzZWRCb3VuZHMiLCJleHBhbmQiLCJoYXNDbGFzcyIsIm1hcmtlckVudHJ5UHJlc2VudCIsImlzTWFya2VyRW50cnlQcmVzZW50IiwibWFya2VkIiwiZW50cnkiLCJiZWZvcmUiLCJlbnRyeVR5cGUiLCJnZXRUeXBlIiwibmFtZSIsImdldE5hbWUiLCJlbnRyeU5hbWUiLCJsb2NhbGVDb21wYXJlIiwiZHJhZ2dhYmxlRW50cnkiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5IiwiZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMiLCJnZXRDb2xsYXBzZWRCb3VuZHMiLCJvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzIiwidG9nZ2xlIiwiYWRkQ2xhc3MiLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUNsYXNzIiwicHJvcGVydGllcyIsImV4cGxvcmVyIiwidG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyIiwiYmluZCIsInNldENvbGxhcHNlZCIsIkNsYXNzIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IiwiZnJvbVByb3BlcnRpZXMiLCJpbml0aWFsaXNlIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJpZ25vcmVkUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxPQUFPQyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNQyxVQUFVRCxRQUFRLGVBQVIsQ0FBaEI7QUFBQSxJQUNNRSxhQUFhRixRQUFRLGtCQUFSLENBRG5CO0FBQUEsSUFFTUcsYUFBYUgsUUFBUSxrQkFBUixDQUZuQjtBQUFBLElBR01JLGlCQUFpQkosUUFBUSx1QkFBUixDQUh2Qjs7SUFLUUssTSxHQUFrQk4sSSxDQUFsQk0sTTtJQUFRQyxLLEdBQVVQLEksQ0FBVk8sSztJQUNSQyxjLEdBQTJGSixVLENBQTNGSSxjO0lBQWdCQyxtQixHQUEyRUwsVSxDQUEzRUssbUI7SUFBcUJDLHFCLEdBQXNETixVLENBQXRETSxxQjtJQUF1QkMsMEIsR0FBK0JQLFUsQ0FBL0JPLDBCOztJQUU5REMsMkI7OztBQUNKLHVDQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQ3BCLFFBQU1DLE9BQU9MLG1CQUFiOztBQURvQixxSkFHZEksUUFIYyxFQUdKQyxJQUhJO0FBSXJCOzs7O3lDQUVvQjtBQUNuQixVQUFNQyxZQUFZLEtBQUtDLFdBQUwsRUFBbEI7O0FBRUEsV0FBS0MsUUFBTDs7QUFFQSxVQUFNQyw0SkFBTjtBQUFBLFVBQ01DLGtCQUFrQkQsTUFEeEIsQ0FMbUIsQ0FNYzs7QUFFakMsVUFBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ2QsYUFBS0ssTUFBTDtBQUNEOztBQUVELGFBQU9ELGVBQVA7QUFDRDs7O2tDQUVhO0FBQ1osVUFBTUosWUFBWSxLQUFLTSxRQUFMLENBQWMsV0FBZCxDQUFsQjs7QUFFQSxhQUFPTixTQUFQO0FBQ0Q7OzsrQkFFVTtBQUNULFVBQU1PLHFCQUFxQixLQUFLQyxvQkFBTCxFQUEzQjtBQUFBLFVBQ01DLFNBQVNGLGtCQURmLENBRFMsQ0FFMkI7O0FBRXBDLGFBQU9FLE1BQVA7QUFDRDs7OzZC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QUFqQiIsImZpbGUiOiJkaXJlY3RvcnlOYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyaWVzID0gcmVxdWlyZSgnLi4vLi4vZW50cmllcycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4uLy4uL25hbWVCdXR0b24nKSxcbiAgICAgIGVudHJ5VHlwZXMgPSByZXF1aXJlKCcuLi8uLi9lbnRyeVR5cGVzJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L2RyYWdnYWJsZScpO1xuXG5jb25zdCB7IEJ1dHRvbiwgUmVhY3QgfSA9IGVhc3ksXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSBlbnRyeVR5cGVzO1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudCgpLFxuICAgICAgICAgIG1hcmtlZCA9IG1hcmtlckVudHJ5UHJlc2VudDsgIC8vL1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25DbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcn0gLz4sXG4gICAgICA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+LFxuICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgXSk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcblxuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuXG4gICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UoY29sbGFwc2VkKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnktbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnY29sbGFwc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4iXX0=