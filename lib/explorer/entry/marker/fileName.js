'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var nameUtil = require('../../../util/name'),
    Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case Entry.types.FILE_NAME:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = nameUtil.nameIsBeforeEntryName(name, draggableEntryName);
          break;

        case Entry.types.DIRECTORY_NAME:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return MarkerEntry.fromProperties(FileNameMarkerEntry, properties);
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

module.exports = FileNameMarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiXSwibmFtZXMiOlsibmFtZVV0aWwiLCJyZXF1aXJlIiwiRW50cnkiLCJNYXJrZXJFbnRyeSIsIkZpbGVOYW1lTWFya2VyRW50cnkiLCJkcmFnZ2FibGVFbnRyeSIsImJlZm9yZSIsImRyYWdnYWJsZUVudHJ5VHlwZSIsImdldFR5cGUiLCJ0eXBlcyIsIkZJTEVfTkFNRSIsIm5hbWUiLCJnZXROYW1lIiwiZHJhZ2dhYmxlRW50cnlOYW1lIiwibmFtZUlzQmVmb3JlRW50cnlOYW1lIiwiRElSRUNUT1JZX05BTUUiLCJwcm9wZXJ0aWVzIiwiZnJvbVByb3BlcnRpZXMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFdBQVdDLFFBQVEsb0JBQVIsQ0FBakI7QUFBQSxJQUNNQyxRQUFRRCxRQUFRLGFBQVIsQ0FEZDtBQUFBLElBRU1FLGNBQWNGLFFBQVEsb0JBQVIsQ0FGcEI7O0lBSU1HLG1COzs7Ozs7Ozs7Ozs2QkFDS0MsYyxFQUFnQjtBQUN2QixVQUFJQyxlQUFKOztBQUVBLFVBQU1DLHFCQUFxQkYsZUFBZUcsT0FBZixFQUEzQjs7QUFFQSxjQUFRRCxrQkFBUjtBQUNFLGFBQUtMLE1BQU1PLEtBQU4sQ0FBWUMsU0FBakI7QUFDRSxjQUFNQyxPQUFPLEtBQUtDLE9BQUwsRUFBYjtBQUFBLGNBQ0lDLHFCQUFxQlIsZUFBZU8sT0FBZixFQUR6Qjs7QUFHQU4sbUJBQVNOLFNBQVNjLHFCQUFULENBQStCSCxJQUEvQixFQUFxQ0Usa0JBQXJDLENBQVQ7QUFDQTs7QUFFRixhQUFLWCxNQUFNTyxLQUFOLENBQVlNLGNBQWpCO0FBQ0VULG1CQUFTLEtBQVQ7QUFDQTtBQVZKOztBQWFBLGFBQU9BLE1BQVA7QUFDRDs7O21DQUVxQlUsVSxFQUFZO0FBQUUsYUFBT2IsWUFBWWMsY0FBWixDQUEyQmIsbUJBQTNCLEVBQWdEWSxVQUFoRCxDQUFQO0FBQXFFOzs7O0VBdEJ6RWIsVzs7QUF5QmxDZSxPQUFPQyxPQUFQLEdBQWlCZixtQkFBakIiLCJmaWxlIjoiZmlsZU5hbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hbWVVdGlsID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9uYW1lJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpO1xuXG5jbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFX05BTUU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lVXRpbC5uYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ2dhYmxlRW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUU6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gTWFya2VyRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuIl19