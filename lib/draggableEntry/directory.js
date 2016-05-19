'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('./../toggleButton'),
    DraggableEntry = require('../draggableEntry');

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selectorOr$Element, name, collapsed, eventHandler) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Directory).call(this, selectorOr$Element, name, eventHandler, type));

    _this.toggleButton = new ToggleButton(_this, _this.onToggleUpdate.bind(_this));

    _this.entries = new Entries(_this, Directory);

    !collapsed ? _this.expand() : _this.collapse(); ///

    _this.eventHandler = eventHandler;
    return _this;
  }

  _createClass(Directory, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return true;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.toggleButton.isCollapsed();
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          return true;

        case Entry.types.DIRECTORY:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;
      }
    }
  }, {
    key: 'isOverlappingEntry',
    value: function isOverlappingEntry(entry) {
      var entryBounds = entry.getBounds(),
          bounds = this.getBounds(),
          overlappingEntry = bounds.areOverlapping(entryBounds); ///

      return overlappingEntry;
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var entry = this,
          ///
      entries = [entry];

      this.forEachFile(function (file) {
        var fileEntries = file.getEntries();

        entries = entries.concat(fileEntries);
      });

      this.forEachDirectory(function (directory) {
        var directoryEntries = directory.getEntries();

        entries = entries.concat(directoryEntries);
      });

      return entries;
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.toggleButton.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.toggleButton.collapse();
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath, readOnly) {
      var topmostDirectory = this.topmostDirectory(filePath);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.addFile(filePathWithoutTopmostDirectoryName, readOnly);
      } else {
        this.entries.addFile(filePath, readOnly, this.eventHandler);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      ///
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(cb) {
      this.entries.forEachFile(cb);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var topmostDirectory = this.topmostDirectory(directoryPath);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath; ///

        if (!this.entries.hasDirectory(directoryName)) {
          this.entries.addDirectory(directoryName, collapsed, this.eventHandler);
        } else {
          var directory = this.entries.retrieveDirectory(directoryName);

          collapsed ? directory.collapse() : directory.expand();
        }
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      ///
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(cb) {
      this.entries.forEachDirectory(cb);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryPath) {
      var topmostDirectoryName = util.topmostDirectoryName(directoryPath);

      if (topmostDirectoryName === null) {
        var name = this.getName(),
            directoryName = directoryPath; ///

        if (name === directoryName) {
          return this;
        } else {
          return null;
        }
      } else {
        var directorPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath),
            retrievedDirectory = null;

        this.entries.someDirectory(function (directory) {
          retrievedDirectory = directory.retrieveDirectory(directorPathWithoutTopmostDirectoryName);

          if (retrievedDirectory !== null) {
            return true;
          } else {
            return false;
          }
        });

        return retrievedDirectory;
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, entryType) {
      var marker,
          topmostDirectoryName = util.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        marker = this.entries.addMarker(markerName, entryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

        marker = topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, entryType);
      }

      return marker;
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      if (this.entries.hasMarker()) {
        this.entries.removeMarker();

        return true;
      } else {
        return this.entries.someDirectory(function (directory) {
          return directory.removeMarker();
        });
      }
    }
  }, {
    key: 'hasMarker',
    value: function hasMarker() {
      if (this.entries.hasMarker()) {
        return true;
      } else {
        return this.entries.someDirectory(function (directory) {
          return directory.hasMarker();
        });
      }
    }
  }, {
    key: 'directoryPathContainingMarker',
    value: function directoryPathContainingMarker(directoryPath) {
      var name = this.getName(),
          directoryPathContainingMarker = null;

      directoryPath = directoryPath ? directoryPath + '/' + name : name; ///

      if (this.entries.hasMarker()) {
        directoryPathContainingMarker = directoryPath;
      } else {
        this.entries.someDirectory(function (directory) {
          directoryPathContainingMarker = directory.directoryPathContainingMarker(directoryPath);

          if (directoryPathContainingMarker !== null) {
            return true;
          } else {
            return false;
          }
        });
      }

      return directoryPathContainingMarker;
    }
  }, {
    key: 'directoryPathOverlappingEntry',
    value: function directoryPathOverlappingEntry(entry, directoryPath) {
      if (entry === this) {
        return null;
      }

      var name = this.getName();

      directoryPath = directoryPath ? directoryPath + '/' + name : name; ///

      var collapsed = this.isCollapsed();

      if (collapsed) {
        return null;
      }

      var bounds = this.getBounds(),
          entryBounds = entry.getBounds(),
          overlapping = bounds.areOverlapping(entryBounds);

      if (!overlapping) {
        return null;
      }

      var directoryPathOverlappingEntry = null;

      this.entries.someDirectory(function (directory) {
        directoryPathOverlappingEntry = directory.directoryPathOverlappingEntry(entry, directoryPath);

        if (directoryPathOverlappingEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      if (directoryPathOverlappingEntry === null) {
        directoryPathOverlappingEntry = directoryPath;
      }

      return directoryPathOverlappingEntry;
    }
  }, {
    key: 'topmostDirectory',
    value: function topmostDirectory(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        return null;
      } else {
        if (!this.entries.hasDirectory(topmostDirectoryName)) {
          var collapsed = true; ///

          this.entries.addDirectory(topmostDirectoryName, collapsed, this.eventHandler);
        }

        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);

        return topmostDirectory;
      }
    }
  }, {
    key: 'onToggleUpdate',
    value: function onToggleUpdate(collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
    }
  }]);

  return Directory;
}(DraggableEntry);

Directory.clone = function (name, collapsed, eventHandler) {
  var directory = Element.clone(Directory, '#directory', name, collapsed, eventHandler);

  directory.removeAttribute('id');

  return directory;
};

module.exports = Directory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYkVTMjAxNS9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQVQ7SUFDQSxVQUFVLE9BQU8sT0FBUDs7QUFFZCxJQUFJLE9BQU8sUUFBUSxTQUFSLENBQVA7SUFDQSxRQUFRLFFBQVEsVUFBUixDQUFSO0lBQ0EsVUFBVSxRQUFRLFlBQVIsQ0FBVjtJQUNBLGVBQWUsUUFBUSxtQkFBUixDQUFmO0lBQ0EsaUJBQWlCLFFBQVEsbUJBQVIsQ0FBakI7O0lBRUU7OztBQUNKLFdBREksU0FDSixDQUFZLGtCQUFaLEVBQWdDLElBQWhDLEVBQXNDLFNBQXRDLEVBQWlELFlBQWpELEVBQStEOzBCQUQzRCxXQUMyRDs7QUFDN0QsUUFBSSxPQUFPLE1BQU0sS0FBTixDQUFZLFNBQVosQ0FEa0Q7O3VFQUQzRCxzQkFJSSxvQkFBb0IsTUFBTSxjQUFjLE9BSGU7O0FBSzdELFVBQUssWUFBTCxHQUFvQixJQUFJLFlBQUosUUFBdUIsTUFBSyxjQUFMLENBQW9CLElBQXBCLE9BQXZCLENBQXBCLENBTDZEOztBQU83RCxVQUFLLE9BQUwsR0FBZSxJQUFJLE9BQUosUUFBa0IsU0FBbEIsQ0FBZixDQVA2RDs7QUFTN0QsS0FBQyxTQUFELEdBQWEsTUFBSyxNQUFMLEVBQWIsR0FBNkIsTUFBSyxRQUFMLEVBQTdCOztBQVQ2RCxTQVc3RCxDQUFLLFlBQUwsR0FBb0IsWUFBcEIsQ0FYNkQ7O0dBQS9EOztlQURJOztrQ0FlVTtBQUNaLGFBQU8sSUFBUCxDQURZOzs7O2tDQUlBO0FBQUUsYUFBTyxLQUFLLFlBQUwsQ0FBa0IsV0FBbEIsRUFBUCxDQUFGOzs7OzZCQUVMLE9BQU87QUFDZCxVQUFJLFlBQVksTUFBTSxPQUFOLEVBQVosQ0FEVTs7QUFHZCxjQUFRLFNBQVI7QUFDRSxhQUFLLE1BQU0sS0FBTixDQUFZLElBQVosQ0FEUDtBQUVFLGFBQUssTUFB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QUksWUFBWSxJQUFaOztBQURnRCxjQUdwRCxDQUFLLE9BQUwsQ0FBYSxZQUFiLENBQTBCLG9CQUExQixFQUFnRCxTQUFoRCxFQUEyRCxLQUFLLFlBQUwsQ0FBM0QsQ0FIb0Q7U0FBdEQ7O0FBTUEsWUFBSSxtQkFBbUIsS0FBSyxPQUFMLENBQWEsaUJBQWIsQ0FBK0Isb0JBQS9CLENBQW5CLENBUEM7O0FBU0wsZUFBTyxnQkFBUCxDQVRLO09BRlA7Ozs7bUNBZWEsV0FBVztBQUN4QixrQkFBWSxLQUFLLFFBQUwsQ0FBYyxXQUFkLENBQVosR0FBeUMsS0FBSyxXQUFMLENBQWlCLFdBQWpCLENBQXpDLENBRHdCOzs7O1NBNVF0QjtFQUFrQjs7QUFpUnhCLFVBQVUsS0FBVixHQUFrQixVQUFTLElBQVQsRUFBZSxTQUFmLEVBQTBCLFlBQTFCLEVBQXdDO0FBQ3hELE1BQUksWUFBWSxRQUFRLEtBQVIsQ0FBYyxTQUFkLEVBQXlCLFlBQXpCLEVBQXVDLElBQXZDLEVBQTZDLFNBQTdDLEVBQXdELFlBQXhELENBQVosQ0FEb0Q7O0FBR3hELFlBQVUsZUFBVixDQUEwQixJQUExQixFQUh3RDs7QUFLeEQsU0FBTyxTQUFQLENBTHdEO0NBQXhDOztBQVFsQixPQUFPLE9BQVAsR0FBaUIsU0FBakIiLCJmaWxlIjoiZGlyZWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKSxcbiAgICBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICBUb2dnbGVCdXR0b24gPSByZXF1aXJlKCcuLy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIGNvbGxhcHNlZCwgZXZlbnRIYW5kbGVyKSB7XG4gICAgdmFyIHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk7XG5cbiAgICBzdXBlcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIGV2ZW50SGFuZGxlciwgdHlwZSk7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IG5ldyBUb2dnbGVCdXR0b24odGhpcywgdGhpcy5vblRvZ2dsZVVwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IG5ldyBFbnRyaWVzKHRoaXMsIERpcmVjdG9yeSk7XG5cbiAgICAhY29sbGFwc2VkID8gdGhpcy5leHBhbmQoKSA6IHRoaXMuY29sbGFwc2UoKTsgLy8vXG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IGV2ZW50SGFuZGxlcjtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICB2YXIgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0VudHJ5KGVudHJ5KSB7XG4gICAgdmFyIGVudHJ5Qm91bmRzID0gZW50cnkuZ2V0Qm91bmRzKCksXG4gICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgIG92ZXJsYXBwaW5nRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZW50cnlCb3VuZHMpOyAgLy8vXG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgdmFyIGVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgIGVudHJpZXMgPSBbZW50cnldO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICB2YXIgZmlsZUVudHJpZXMgPSBmaWxlLmdldEVudHJpZXMoKTtcblxuICAgICAgZW50cmllcyA9IGVudHJpZXMuY29uY2F0KGZpbGVFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIHZhciBkaXJlY3RvcnlFbnRyaWVzID0gZGlyZWN0b3J5LmdldEVudHJpZXMoKTtcblxuICAgICAgZW50cmllcyA9IGVudHJpZXMuY29uY2F0KGRpcmVjdG9yeUVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBleHBhbmQoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmV4cGFuZCgpOyB9XG5cbiAgY29sbGFwc2UoKSB7IHRoaXMudG9nZ2xlQnV0dG9uLmNvbGxhcHNlKCk7IH1cblxuICBhZGRGaWxlKGZpbGVQYXRoLCByZWFkT25seSkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIHJlYWRPbmx5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLmFkZEZpbGUoZmlsZVBhdGgsIHJlYWRPbmx5LCB0aGlzLmV2ZW50SGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIC8vL1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2IpIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNiKTsgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICB2YXIgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGlmICghdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSkge1xuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgdGhpcy5ldmVudEhhbmRsZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBjb2xsYXBzZWQgPyBkaXJlY3RvcnkuY29sbGFwc2UoKSA6IGRpcmVjdG9yeS5leHBhbmQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIC8vL1xuICB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYikgeyB0aGlzLmVudHJpZXMuZm9yRWFjaERpcmVjdG9yeShjYik7IH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBpZiAobmFtZSA9PT0gZGlyZWN0b3J5TmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZGlyZWN0b3JQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIHJldHJpZXZlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICAgIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXRyaWV2ZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3JQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAocmV0cmlldmVkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJldHJpZXZlZERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZW50cnlUeXBlKSB7XG4gICAgdmFyIG1hcmtlcixcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB2YXIgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgbWFya2VyID0gdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBlbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgbWFya2VyID0gdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZW50cnlUeXBlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhc01hcmtlcigpIHtcbiAgICBpZiAodGhpcy5lbnRyaWVzLmhhc01hcmtlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICByZXR1cm4gZGlyZWN0b3J5Lmhhc01hcmtlcigpO1xuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlcihkaXJlY3RvcnlQYXRoKSB7XG4gICAgdmFyIG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgZGlyZWN0b3J5UGF0aENvbnRhaW5pbmdNYXJrZXIgPSBudWxsO1xuXG4gICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGggPyBkaXJlY3RvcnlQYXRoICsgJy8nICsgbmFtZSA6IG5hbWU7ICAvLy9cblxuICAgIGlmICh0aGlzLmVudHJpZXMuaGFzTWFya2VyKCkpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyID0gZGlyZWN0b3J5UGF0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyID0gZGlyZWN0b3J5LmRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlQYXRoQ29udGFpbmluZ01hcmtlciAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhDb250YWluaW5nTWFya2VyO1xuICB9XG5cbiAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkoZW50cnksIGRpcmVjdG9yeVBhdGgpIHtcbiAgICBpZiAoZW50cnkgPT09IHRoaXMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKCk7XG5cbiAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aCA/IGRpcmVjdG9yeVBhdGggKyAnLycgKyBuYW1lIDogbmFtZTsgIC8vL1xuXG4gICAgdmFyIGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICBlbnRyeUJvdW5kcyA9IGVudHJ5LmdldEJvdW5kcygpLFxuICAgICAgICBvdmVybGFwcGluZyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhlbnRyeUJvdW5kcyk7XG5cbiAgICBpZiAoIW92ZXJsYXBwaW5nKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB2YXIgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9IGRpcmVjdG9yeS5kaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeShlbnRyeSwgZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aE92ZXJsYXBwaW5nRW50cnkgPSBkaXJlY3RvcnlQYXRoO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRoT3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCkge1xuICAgIHZhciB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpKSB7XG4gICAgICAgIHZhciBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIHRoaXMuZXZlbnRIYW5kbGVyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeTtcbiAgICB9XG4gIH1cblxuICBvblRvZ2dsZVVwZGF0ZShjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKSA6IHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG59XG5cbkRpcmVjdG9yeS5jbG9uZSA9IGZ1bmN0aW9uKG5hbWUsIGNvbGxhcHNlZCwgZXZlbnRIYW5kbGVyKSB7XG4gIHZhciBkaXJlY3RvcnkgPSBFbGVtZW50LmNsb25lKERpcmVjdG9yeSwgJyNkaXJlY3RvcnknLCBuYW1lLCBjb2xsYXBzZWQsIGV2ZW50SGFuZGxlcik7XG5cbiAgZGlyZWN0b3J5LnJlbW92ZUF0dHJpYnV0ZSgnaWQnKTtcblxuICByZXR1cm4gZGlyZWN0b3J5O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rvcnk7XG4iXX0=
