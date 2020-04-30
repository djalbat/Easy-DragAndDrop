"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Entry = require("../entry");

var MarkerEntry = /*#__PURE__*/function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  var _super = _createSuper(MarkerEntry);

  function MarkerEntry(selector, type, name) {
    var _this;

    _classCallCheck(this, MarkerEntry);

    _this = _super.call(this, selector, type);
    _this.name = name;
    return _this;
  }

  _createClass(MarkerEntry, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }], [{
    key: "fromProperties",
    value: function fromProperties(Class, properties, type) {
      var name = properties.name,
          markerEntry = Entry.fromProperties(Class, properties, type, name);
      return markerEntry;
    }
  }]);

  return MarkerEntry;
}(Entry);

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: "marker"
  }
});
module.exports = MarkerEntry;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcmtlci5qcyJdLCJuYW1lcyI6WyJFbnRyeSIsInJlcXVpcmUiLCJNYXJrZXJFbnRyeSIsInNlbGVjdG9yIiwidHlwZSIsIm5hbWUiLCJDbGFzcyIsInByb3BlcnRpZXMiLCJtYXJrZXJFbnRyeSIsImZyb21Qcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJjbGFzc05hbWUiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsVUFBRCxDQUFyQjs7SUFFTUMsVzs7Ozs7QUFDSix1QkFBWUMsUUFBWixFQUFzQkMsSUFBdEIsRUFBNEJDLElBQTVCLEVBQWtDO0FBQUE7O0FBQUE7O0FBQ2hDLDhCQUFNRixRQUFOLEVBQWdCQyxJQUFoQjtBQUVBLFVBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUhnQztBQUlqQzs7Ozs4QkFFUztBQUNSLGFBQU8sS0FBS0EsSUFBWjtBQUNEOzs7bUNBRXFCQyxLLEVBQU9DLFUsRUFBWUgsSSxFQUFNO0FBQ3ZDLFVBQUVDLElBQUYsR0FBV0UsVUFBWCxDQUFFRixJQUFGO0FBQUEsVUFDQUcsV0FEQSxHQUNjUixLQUFLLENBQUNTLGNBQU4sQ0FBcUJILEtBQXJCLEVBQTRCQyxVQUE1QixFQUF3Q0gsSUFBeEMsRUFBOENDLElBQTlDLENBRGQ7QUFHTixhQUFPRyxXQUFQO0FBQ0Q7Ozs7RUFoQnVCUixLOztBQW1CMUJVLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVCxXQUFkLEVBQTJCO0FBQ3pCVSxFQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsSUFBQUEsU0FBUyxFQUFFO0FBRE07QUFETSxDQUEzQjtBQU1BQyxNQUFNLENBQUNDLE9BQVAsR0FBaUJiLFdBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZShcIi4uL2VudHJ5XCIpO1xuXG5jbGFzcyBNYXJrZXJFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUsIG5hbWUpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1hcmtlckVudHJ5ID0gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIG5hbWUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTWFya2VyRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6IFwibWFya2VyXCJcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyRW50cnk7XG4iXX0=