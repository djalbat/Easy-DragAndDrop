'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var NameButton = require('./nameButton');

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selectorOr$Element, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Entry).call(this, selectorOr$Element));

    _this.nameButton = new NameButton(_this, name);

    _this.type = type;
    return _this;
  }

  _createClass(Entry, [{
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }]);

  return Entry;
}(Element);

Entry.types = {
  FILE: 'FILE',
  MARKER: 'MARKER',
  DIRECTORY: 'DIRECTORY'
};

module.exports = Entry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYkVTMjAxNS9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQUVBLElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBVDtJQUNBLFVBQVUsT0FBTyxPQUFQOztBQUVkLElBQUksYUFBYSxRQUFRLGNBQVIsQ0FBYjs7SUFFRTs7O0FBQ0osV0FESSxLQUNKLENBQVksa0JBQVosRUFBZ0MsSUFBaEMsRUFBc0MsSUFBdEMsRUFBNEM7MEJBRHhDLE9BQ3dDOzt1RUFEeEMsa0JBRUkscUJBRG9DOztBQUcxQyxVQUFLLFVBQUwsR0FBa0IsSUFBSSxVQUFKLFFBQXFCLElBQXJCLENBQWxCLENBSDBDOztBQUsxQyxVQUFLLElBQUwsR0FBWSxJQUFaLENBTDBDOztHQUE1Qzs7ZUFESTs7OEJBU007QUFBRSxhQUFPLEtBQUssVUFBTCxDQUFnQixPQUFoQixFQUFQLENBQUY7Ozs7OEJBRUE7QUFDUixhQUFPLEtBQUssSUFBTCxDQURDOzs7O1NBWE47RUFBYzs7QUFnQnBCLE1BQU0sS0FBTixHQUFjO0FBQ1osUUFBTSxNQUFOO0FBQ0EsVUFBUSxRQUFSO0FBQ0EsYUFBVyxXQUFYO0NBSEY7O0FBTUEsT0FBTyxPQUFQLEdBQWlCLEtBQWpCIiwiZmlsZSI6ImVudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG52YXIgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jbGFzcyBFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yJEVsZW1lbnQsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yJEVsZW1lbnQpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmV3IE5hbWVCdXR0b24odGhpcywgbmFtZSk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbn1cblxuRW50cnkudHlwZXMgPSB7XG4gIEZJTEU6ICdGSUxFJyxcbiAgTUFSS0VSOiAnTUFSS0VSJyxcbiAgRElSRUNUT1JZOiAnRElSRUNUT1JZJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiJdfQ==
