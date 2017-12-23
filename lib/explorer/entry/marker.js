'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry');

var MarkerEntry = function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  function MarkerEntry(selector, type, name) {
    _classCallCheck(this, MarkerEntry);

    var _this = _possibleConstructorReturn(this, (MarkerEntry.__proto__ || Object.getPrototypeOf(MarkerEntry)).call(this, selector, type));

    _this.name = name;
    return _this;
  }

  _createClass(MarkerEntry, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var name = properties.name,
          markerEntry = Entry.fromProperties(Class, properties, name);


      return markerEntry;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2VzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIuanMiXSwibmFtZXMiOlsiRW50cnkiLCJyZXF1aXJlIiwiTWFya2VyRW50cnkiLCJzZWxlY3RvciIsInR5cGUiLCJuYW1lIiwiQ2xhc3MiLCJwcm9wZXJ0aWVzIiwibWFya2VyRW50cnkiLCJmcm9tUHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImRlZmF1bHRQcm9wZXJ0aWVzIiwiY2xhc3NOYW1lIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLFVBQVIsQ0FBZDs7SUFFTUMsVzs7O0FBQ0osdUJBQVlDLFFBQVosRUFBc0JDLElBQXRCLEVBQTRCQyxJQUE1QixFQUFrQztBQUFBOztBQUFBLDBIQUMxQkYsUUFEMEIsRUFDaEJDLElBRGdCOztBQUdoQyxVQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFIZ0M7QUFJakM7Ozs7OEJBRVM7QUFDUixhQUFPLEtBQUtBLElBQVo7QUFDRDs7O21DQUVxQkMsSyxFQUFPQyxVLEVBQVk7QUFDakMsVUFBRUYsSUFBRixHQUFXRSxVQUFYLENBQUVGLElBQUY7QUFBQSxVQUNBRyxXQURBLEdBQ2NSLE1BQU1TLGNBQU4sQ0FBcUJILEtBQXJCLEVBQTRCQyxVQUE1QixFQUF3Q0YsSUFBeEMsQ0FEZDs7O0FBR04sYUFBT0csV0FBUDtBQUNEOzs7O0VBaEJ1QlIsSzs7QUFtQjFCVSxPQUFPQyxNQUFQLENBQWNULFdBQWQsRUFBMkI7QUFDekJVLHFCQUFtQjtBQUNqQkMsZUFBVztBQURNO0FBRE0sQ0FBM0I7O0FBTUFDLE9BQU9DLE9BQVAsR0FBaUJiLFdBQWpCIiwiZmlsZSI6Im1hcmtlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBNYXJrZXJFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUsIG5hbWUpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1hcmtlckVudHJ5ID0gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTWFya2VyRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdtYXJrZXInXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlckVudHJ5O1xuIl19