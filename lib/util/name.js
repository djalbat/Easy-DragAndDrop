'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = require('../util/array');

var nameUtil = function () {
  function nameUtil() {
    _classCallCheck(this, nameUtil);
  }

  _createClass(nameUtil, null, [{
    key: 'extensionFromName',
    value: function extensionFromName(name) {
      var extension = null;

      var matches = name.match(/^.*\.([^.]+)$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

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
        var secondMatch = arrayUtil.second(matches);

        nameWithoutExtension = secondMatch; ///
      }

      return nameWithoutExtension;
    }
  }, {
    key: 'nameIsBeforeEntryName',
    value: function nameIsBeforeEntryName(name, entryName) {
      var before = name.localeCompare(entryName) < 0;

      var nameExtension = nameUtil.extensionFromName(name),
          entryNameExtension = nameUtil.extensionFromName(entryName),
          nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
          entryNameWithoutExtension = nameUtil.nameWithoutExtensionFromName(entryName),
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

  return nameUtil;
}();

module.exports = nameUtil;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi91dGlsL25hbWUuanMiXSwibmFtZXMiOlsiYXJyYXlVdGlsIiwicmVxdWlyZSIsIm5hbWVVdGlsIiwibmFtZSIsImV4dGVuc2lvbiIsIm1hdGNoZXMiLCJtYXRjaCIsInNlY29uZE1hdGNoIiwic2Vjb25kIiwibmFtZVdpdGhvdXRFeHRlbnNpb24iLCJlbnRyeU5hbWUiLCJiZWZvcmUiLCJsb2NhbGVDb21wYXJlIiwibmFtZUV4dGVuc2lvbiIsImV4dGVuc2lvbkZyb21OYW1lIiwiZW50cnlOYW1lRXh0ZW5zaW9uIiwibmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZSIsImVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24iLCJuYW1lRXh0ZW5zaW9uUHJlc2VudCIsImVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQiLCJuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmciLCJlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyIsImV4dGVuc2lvbnNCb3RoUHJlc2VudCIsIm5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZyIsImV4dGVuc2lvbnNEaWZmZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsWUFBWUMsUUFBUSxlQUFSLENBQWxCOztJQUVNQyxROzs7Ozs7O3NDQUNxQkMsSSxFQUFNO0FBQzdCLFVBQUlDLFlBQVksSUFBaEI7O0FBRUEsVUFBTUMsVUFBVUYsS0FBS0csS0FBTCxDQUFXLGVBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjUCxVQUFVUSxNQUFWLENBQWlCSCxPQUFqQixDQUFwQjs7QUFFQUQsb0JBQVlHLFdBQVosQ0FIb0IsQ0FHTTtBQUMzQjs7QUFFRCxhQUFPSCxTQUFQO0FBQ0Q7OztpREFFbUNELEksRUFBTTtBQUN4QyxVQUFJTSx1QkFBdUIsSUFBM0I7O0FBRUEsVUFBTUosVUFBVUYsS0FBS0csS0FBTCxDQUFXLGVBQVgsQ0FBaEI7O0FBRUEsVUFBSUQsWUFBWSxJQUFoQixFQUFzQjtBQUNwQixZQUFNRSxjQUFjUCxVQUFVUSxNQUFWLENBQWlCSCxPQUFqQixDQUFwQjs7QUFFQUksK0JBQXVCRixXQUF2QixDQUhvQixDQUdpQjtBQUN0Qzs7QUFFRCxhQUFPRSxvQkFBUDtBQUNEOzs7MENBRTRCTixJLEVBQU1PLFMsRUFBVztBQUM1QyxVQUFJQyxTQUFVUixLQUFLUyxhQUFMLENBQW1CRixTQUFuQixJQUFnQyxDQUE5Qzs7QUFFQSxVQUFNRyxnQkFBZ0JYLFNBQVNZLGlCQUFULENBQTJCWCxJQUEzQixDQUF0QjtBQUFBLFVBQ0lZLHFCQUFxQmIsU0FBU1ksaUJBQVQsQ0FBMkJKLFNBQTNCLENBRHpCO0FBQUEsVUFFSUQsdUJBQXVCUCxTQUFTYyw0QkFBVCxDQUFzQ2IsSUFBdEMsQ0FGM0I7QUFBQSxVQUdJYyw0QkFBNEJmLFNBQVNjLDRCQUFULENBQXNDTixTQUF0QyxDQUhoQztBQUFBLFVBSUlRLHVCQUF3Qkwsa0JBQWtCLElBSjlDO0FBQUEsVUFLSU0sNEJBQTZCSix1QkFBdUIsSUFMeEQ7QUFBQSxVQU1JSyw4QkFBK0JYLHlCQUF5QixJQU41RDtBQUFBLFVBT0lZLG1DQUFvQ0osOEJBQThCLElBUHRFO0FBQUEsVUFRSUssd0JBQXlCSix3QkFBd0JDLHlCQVJyRDtBQUFBLFVBU0lJLG9DQUFxQ0gsK0JBQStCQyxnQ0FUeEU7O0FBV0EsVUFBSUUsaUNBQUosRUFBdUM7QUFDckM7QUFDRCxPQUZELE1BRU8sSUFBSUgsMkJBQUosRUFBaUM7QUFDdENULGlCQUFTLElBQVQ7QUFDRCxPQUZNLE1BRUEsSUFBSVUsZ0NBQUosRUFBc0M7QUFDM0NWLGlCQUFTLEtBQVQ7QUFDRCxPQUZNLE1BRUE7QUFDTCxZQUFJVyxxQkFBSixFQUEyQjtBQUN6QixjQUFNRSxtQkFBb0JYLGtCQUFrQkUsa0JBQTVDOztBQUVBLGNBQUlTLGdCQUFKLEVBQXNCO0FBQ3BCYixxQkFBVUUsY0FBY0QsYUFBZCxDQUE0Qkcsa0JBQTVCLElBQWtELENBQTVEO0FBQ0Q7QUFDRixTQU5ELE1BTU8sSUFBSUcsb0JBQUosRUFBMEI7QUFDL0JQLG1CQUFTLEtBQVQ7QUFDRCxTQUZNLE1BRUEsSUFBSVEseUJBQUosRUFBK0I7QUFDcENSLG1CQUFTLElBQVQ7QUFDRDtBQUNGOztBQUVELGFBQU9BLE1BQVA7QUFDRDs7Ozs7O0FBR0hjLE9BQU9DLE9BQVAsR0FBaUJ4QixRQUFqQiIsImZpbGUiOiJuYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNsYXNzIG5hbWVVdGlsIHtcbiAgc3RhdGljIGV4dGVuc2lvbkZyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgZXh0ZW5zaW9uID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXi4qXFwuKFteLl0rKSQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIGV4dGVuc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dGVuc2lvbjtcbiAgfVxuXG4gIHN0YXRpYyBuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpIHtcbiAgICBsZXQgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBudWxsO1xuXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14oLispXFwuW14uXSskLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIG5hbWVXaXRob3V0RXh0ZW5zaW9uO1xuICB9XG5cbiAgc3RhdGljIG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpIHtcbiAgICBsZXQgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICBjb25zdCBuYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvbiA9IG5hbWVVdGlsLmV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9IG5hbWVVdGlsLm5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZUV4dGVuc2lvblByZXNlbnQgPSAobmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQgPSAoZW50cnlOYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAoZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGV4dGVuc2lvbnNCb3RoUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uUHJlc2VudCAmJiBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSxcbiAgICAgICAgbmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nID0gKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyAmJiBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyk7XG5cbiAgICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGV4dGVuc2lvbnNCb3RoUHJlc2VudCkge1xuICAgICAgICBjb25zdCBleHRlbnNpb25zRGlmZmVyID0gKG5hbWVFeHRlbnNpb24gIT09IGVudHJ5TmFtZUV4dGVuc2lvbik7XG5cbiAgICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgICBiZWZvcmUgPSAobmFtZUV4dGVuc2lvbi5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZUV4dGVuc2lvbikgPCAwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBuYW1lVXRpbDtcbiJdfQ==