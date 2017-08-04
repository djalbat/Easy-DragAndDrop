'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var array = necessary.array;

var nameUtilities = function () {
  function nameUtilities() {
    _classCallCheck(this, nameUtilities);
  }

  _createClass(nameUtilities, null, [{
    key: 'extensionFromName',
    value: function extensionFromName(name) {
      var extension = null;

      var matches = name.match(/^.*\.([^.]+)$/);

      if (matches !== null) {
        var secondMatch = array.second(matches);

        extension = secondMatch; ///
      }

      return extension;
    }
  }, {
    key: 'nameWithoutExtensionFromName',
    value: function nameWithoutExtensionFromName(name) {
      var nameWithoutExtension = null;

      var matches = name.match(/^(.+)\.[^.]+$/);

      if (matches !== null) {
        var secondMatch = array.second(matches);

        nameWithoutExtension = secondMatch; ///
      }

      return nameWithoutExtension;
    }
  }, {
    key: 'nameIsBeforeEntryName',
    value: function nameIsBeforeEntryName(name, entryName) {
      var before = name.localeCompare(entryName) < 0;

      var nameExtension = nameUtilities.extensionFromName(name),
          entryNameExtension = nameUtilities.extensionFromName(entryName),
          nameWithoutExtension = nameUtilities.nameWithoutExtensionFromName(name),
          entryNameWithoutExtension = nameUtilities.nameWithoutExtensionFromName(entryName),
          nameExtensionPresent = nameExtension !== null,
          entryNameExtensionPresent = entryNameExtension !== null,
          nameWithoutExtensionMissing = nameWithoutExtension === null,
          entryNameWithoutExtensionMissing = entryNameWithoutExtension === null,
          extensionsBothPresent = nameExtensionPresent && entryNameExtensionPresent,
          namesWithoutExtensionsBothMissing = nameWithoutExtensionMissing && entryNameWithoutExtensionMissing;

      if (namesWithoutExtensionsBothMissing) {
        ///
      } else if (nameWithoutExtensionMissing) {
        before = true;
      } else if (entryNameWithoutExtensionMissing) {
        before = false;
      } else {
        if (extensionsBothPresent) {
          var extensionsDiffer = nameExtension !== entryNameExtension;

          if (extensionsDiffer) {
            before = nameExtension.localeCompare(entryNameExtension) < 0;
          }
        } else if (nameExtensionPresent) {
          before = false;
        } else if (entryNameExtensionPresent) {
          before = true;
        }
      }

      return before;
    }
  }]);

  return nameUtilities;
}();

module.exports = nameUtilities;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsaXRpZXMvbmFtZS5qcyJdLCJuYW1lcyI6WyJuZWNlc3NhcnkiLCJyZXF1aXJlIiwiYXJyYXkiLCJuYW1lVXRpbGl0aWVzIiwibmFtZSIsImV4dGVuc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwibmFtZUV4dGVuc2lvbiIsImV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lRXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZSIsImVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lRXh0ZW5zaW9uUHJlc2VudCIsImVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQiLCJuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmciLCJlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyIsImV4dGVuc2lvbnNCb3RoUHJlc2VudCIsIm5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZyIsImV4dGVuc2lvbnNEaWZmZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxXQUFSLENBQWxCOztJQUVRQyxLLEdBQVVGLFMsQ0FBVkUsSzs7SUFFRkMsYTs7Ozs7OztzQ0FDcUJDLEksRUFBTTtBQUM3QixVQUFJQyxZQUFZLElBQWhCOztBQUVBLFVBQU1DLFVBQVVGLEtBQUtHLEtBQUwsQ0FBVyxlQUFYLENBQWhCOztBQUVBLFVBQUlELFlBQVksSUFBaEIsRUFBc0I7QUFDcEIsWUFBTUUsY0FBY04sTUFBTU8sTUFBTixDQUFhSCxPQUFiLENBQXBCOztBQUVBRCxvQkFBWUcsV0FBWixDQUhvQixDQUdNO0FBQzNCOztBQUVELGFBQU9ILFNBQVA7QUFDRDs7O2lEQUVtQ0QsSSxFQUFNO0FBQ3hDLFVBQUlNLHVCQUF1QixJQUEzQjs7QUFFQSxVQUFNSixVQUFVRixLQUFLRyxLQUFMLENBQVcsZUFBWCxDQUFoQjs7QUFFQSxVQUFJRCxZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLFlBQU1FLGNBQWNOLE1BQU1PLE1BQU4sQ0FBYUgsT0FBYixDQUFwQjs7QUFFQUksK0JBQXVCRixXQUF2QixDQUhvQixDQUdpQjtBQUN0Qzs7QUFFRCxhQUFPRSxvQkFBUDtBQUNEOzs7MENBRTRCTixJLEVBQU1PLFMsRUFBVztBQUM1QyxVQUFJQyxTQUFVUixLQUFLUyxhQUFMLENBQW1CRixTQUFuQixJQUFnQyxDQUE5Qzs7QUFFQSxVQUFNRyxnQkFBZ0JYLGNBQWNZLGlCQUFkLENBQWdDWCxJQUFoQyxDQUF0QjtBQUFBLFVBQ0lZLHFCQUFxQmIsY0FBY1ksaUJBQWQsQ0FBZ0NKLFNBQWhDLENBRHpCO0FBQUEsVUFFSUQsdUJBQXVCUCxjQUFjYyw0QkFBZCxDQUEyQ2IsSUFBM0MsQ0FGM0I7QUFBQSxVQUdJYyw0QkFBNEJmLGNBQWNjLDRCQUFkLENBQTJDTixTQUEzQyxDQUhoQztBQUFBLFVBSUlRLHVCQUF3Qkwsa0JBQWtCLElBSjlDO0FBQUEsVUFLSU0sNEJBQTZCSix1QkFBdUIsSUFMeEQ7QUFBQSxVQU1JSyw4QkFBK0JYLHlCQUF5QixJQU41RDtBQUFBLFVBT0lZLG1DQUFvQ0osOEJBQThCLElBUHRFO0FBQUEsVUFRSUssd0JBQXlCSix3QkFBd0JDLHlCQVJyRDtBQUFBLFVBU0lJLG9DQUFxQ0gsK0JBQStCQyxnQ0FUeEU7O0FBV0EsVUFBSUUsaUNBQUosRUFBdUM7QUFDckM7QUFDRCxPQUZELE1BRU8sSUFBSUgsMkJBQUosRUFBaUM7QUFDdENULGlCQUFTLElBQVQ7QUFDRCxPQUZNLE1BRUEsSUFBSVUsZ0NBQUosRUFBc0M7QUFDM0NWLGlCQUFTLEtBQVQ7QUFDRCxPQUZNLE1BRUE7QUFDTCxZQUFJVyxxQkFBSixFQUEyQjtBQUN6QixjQUFNRSxtQkFBb0JYLGtCQUFrQkUsa0JBQTVDOztBQUVBLGNBQUlTLGdCQUFKLEVBQXNCO0FBQ3BCYixxQkFBVUUsY0FBY0QsYUFBZCxDQUE0Qkcsa0JBQTVCLElBQWtELENBQTVEO0FBQ0Q7QUFDRixTQU5ELE1BTU8sSUFBSUcsb0JBQUosRUFBMEI7QUFDL0JQLG1CQUFTLEtBQVQ7QUFDRCxTQUZNLE1BRUEsSUFBSVEseUJBQUosRUFBK0I7QUFDcENSLG1CQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELGFBQU9BLE1BQVA7QUFDRDs7Ozs7O0FBR0hjLE9BQU9DLE9BQVAsR0FBaUJ4QixhQUFqQiIsImZpbGUiOiJuYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgeyBhcnJheSB9ID0gbmVjZXNzYXJ5O1xuXG5jbGFzcyBuYW1lVXRpbGl0aWVzIHtcbiAgc3RhdGljIGV4dGVuc2lvbkZyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgZXh0ZW5zaW9uID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXi4qXFwuKFteLl0rKSQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5LnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgZXh0ZW5zaW9uID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gZXh0ZW5zaW9uO1xuICB9XG5cbiAgc3RhdGljIG5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUobmFtZSkge1xuICAgIGxldCBuYW1lV2l0aG91dEV4dGVuc2lvbiA9IG51bGw7XG5cbiAgICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXiguKylcXC5bXi5dKyQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5LnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lV2l0aG91dEV4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gICAgbGV0IGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgY29uc3QgbmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsaXRpZXMuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsaXRpZXMuZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbGl0aWVzLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbGl0aWVzLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZUV4dGVuc2lvblByZXNlbnQgPSAobmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQgPSAoZW50cnlOYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSxcbiAgICAgICAgbmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyAmJiBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyk7XG5cbiAgICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV4dGVuc2lvbnNCb3RoUHJlc2VudCkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zRGlmZmVyID0gKG5hbWVFeHRlbnNpb24gIT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgICBiZWZvcmUgPSAobmFtZUV4dGVuc2lvbi5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZUV4dGVuc2lvbikgPCAwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuYW1lVXRpbGl0aWVzO1xuIl19