'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry');

var MarkerEntry = function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  function MarkerEntry(selector, name) {
    _classCallCheck(this, MarkerEntry);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, (MarkerEntry.__proto__ || Object.getPrototypeOf(MarkerEntry)).call(this, selector, name, type));
  }

  _createClass(MarkerEntry, null, [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      return Entry.fromProperties(Class, properties);
    }
  }]);

  return MarkerEntry;
}(Entry);

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: 'marker'
  }
});

module.exports = MarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJzZWxlY3RvciIsIm5hbWUiLCJ0eXBlIiwidHlwZXMiLCJNQVJLRVIiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLFVBQVIsQ0FBZDs7SUFFTUMsVzs7O0FBQ0osdUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCO0FBQUE7O0FBQzFCLFFBQU1DLE9BQU9MLE1BQU1NLEtBQU4sQ0FBWUMsTUFBekI7O0FBRDBCLHFIQUdwQkosUUFIb0IsRUFHVkMsSUFIVSxFQUdKQyxJQUhJO0FBSTNCOzs7O21DQUVxQkcsSyxFQUFPQyxVLEVBQVk7QUFBRSxhQUFPVCxNQUFNVSxjQUFOLENBQXFCRixLQUFyQixFQUE0QkMsVUFBNUIsQ0FBUDtBQUFpRDs7OztFQVBwRVQsSzs7QUFVMUJXLE9BQU9DLE1BQVAsQ0FBY1YsV0FBZCxFQUEyQjtBQUN6QlcscUJBQW1CO0FBQ2pCQyxlQUFXO0FBRE07QUFETSxDQUEzQjs7QUFNQUMsT0FBT0MsT0FBUCxHQUFpQmQsV0FBakIiLCJmaWxlIjoibWFya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5Jyk7XG5cbmNsYXNzIE1hcmtlckVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHsgcmV0dXJuIEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKE1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbWFya2VyJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJFbnRyeTtcbiJdfQ==