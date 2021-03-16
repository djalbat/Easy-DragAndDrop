"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = void 0;
var _easyWithStyle = _interopRequireDefault(require("easy-with-style"));
var _button = _interopRequireDefault(require("../button"));
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
}
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assertThisInitialized(self);
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _setPrototypeOf(o, p);
}
function _taggedTemplateLiteral(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function _templateObject() {
    var data = _taggedTemplateLiteral([
        "\n\n  width: 2rem;\n  height: 2.4rem;\n  border: none;\n  outline: none;\n  display: inline-block;\n  background-color: transparent;\n\n  ::before {\n    width: 1.6rem;\n    content: \"\\025bc\";\n  }\n  \n  .collapsed::before {\n    content: \"\\025b6\";\n  }\n  \n"
    ], [
        "\n\n  width: 2rem;\n  height: 2.4rem;\n  border: none;\n  outline: none;\n  display: inline-block;\n  background-color: transparent;\n\n  ::before {\n    width: 1.6rem;\n    content: \"\\\\025bc\";\n  }\n  \n  .collapsed::before {\n    content: \"\\\\025b6\";\n  }\n  \n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
var ToggleButton = function(Button) {
    _inherits(ToggleButton, _button.default);
    function ToggleButton() {
        _classCallCheck(this, ToggleButton);
        return _possibleConstructorReturn(this, _getPrototypeOf(ToggleButton).apply(this, arguments));
    }
    _createClass(ToggleButton, [
        {
            key: "expand",
            value: function expand() {
                this.removeClass("collapsed");
            }
        },
        {
            key: "collapse",
            value: function collapse() {
                this.addClass("collapsed");
            }
        },
        {
            key: "isCollapsed",
            value: function isCollapsed() {
                var collapsed = this.hasClass("collapsed");
                return collapsed;
            }
        },
        {
            key: "parentContext",
            value: function parentContext() {
                var isCollapsed = this.isCollapsed.bind(this), expandToggleButton = this.expand.bind(this), collapseToggleButton = this.collapse.bind(this); ///
                return {
                    isCollapsed: isCollapsed,
                    expandToggleButton: expandToggleButton,
                    collapseToggleButton: collapseToggleButton
                };
            }
        }
    ]);
    return ToggleButton;
}(_button.default);
_defineProperty(ToggleButton, "defaultProperties", {
    className: "toggle"
});
var _default = _easyWithStyle.default(ToggleButton)(_templateObject());
exports.default = _default;

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idXR0b24vdG9nZ2xlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgd2l0aFN0eWxlIGZyb20gXCJlYXN5LXdpdGgtc3R5bGVcIjsgIC8vL1xuXG5pbXBvcnQgQnV0dG9uIGZyb20gXCIuLi9idXR0b25cIjtcblxuY2xhc3MgVG9nZ2xlQnV0dG9uIGV4dGVuZHMgQnV0dG9uIHtcbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcyhcImNvbGxhcHNlZFwiKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIGNvbnN0IGlzQ29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGV4cGFuZFRvZ2dsZUJ1dHRvbiA9IHRoaXMuZXhwYW5kLmJpbmQodGhpcyksICAvLy9cbiAgICAgICAgICBjb2xsYXBzZVRvZ2dsZUJ1dHRvbiA9IHRoaXMuY29sbGFwc2UuYmluZCh0aGlzKTsgIC8vL1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBpc0NvbGxhcHNlZCxcbiAgICAgIGV4cGFuZFRvZ2dsZUJ1dHRvbixcbiAgICAgIGNvbGxhcHNlVG9nZ2xlQnV0dG9uXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInRvZ2dsZVwiXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhTdHlsZShUb2dnbGVCdXR0b24pYFxuXG4gIHdpZHRoOiAycmVtO1xuICBoZWlnaHQ6IDIuNHJlbTtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXG4gIDo6YmVmb3JlIHtcbiAgICB3aWR0aDogMS42cmVtO1xuICAgIGNvbnRlbnQ6IFwiXFxcXDAyNWJjXCI7XG4gIH1cbiAgXG4gIC5jb2xsYXBzZWQ6OmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcXFxcMDI1YjZcIjtcbiAgfVxuICBcbmA7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkNBQUEsVUFBQTs7Ozs7SUFFQSxjQUFBO0lBRUEsT0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWtDQSwwUUFrQkE7O1NBbEJBLDhRQWtCQTs7Ozs7OztJQWxEQSxZQUFBLFlBQUEsTUFBQTtjQUFBLFlBQUEsRUFGQSxPQUFBO2FBRUEsWUFBQTs4QkFBQSxZQUFBO2dFQUFBLFlBQUE7O2lCQUFBLFlBQUE7O0FBQ0EsZUFBQSxHQUFBLE1BQUE7NEJBQUEsTUFBQTtxQkFDQSxXQUFBLEVBQUEsU0FBQTs7OztBQUdBLGVBQUEsR0FBQSxRQUFBOzRCQUFBLFFBQUE7cUJBQ0EsUUFBQSxFQUFBLFNBQUE7Ozs7QUFHQSxlQUFBLEdBQUEsV0FBQTs0QkFBQSxXQUFBO29CQUNBLFNBQUEsUUFBQSxRQUFBLEVBQUEsU0FBQTt1QkFFQSxTQUFBOzs7O0FBR0EsZUFBQSxHQUFBLGFBQUE7NEJBQUEsYUFBQTtvQkFDQSxXQUFBLFFBQUEsV0FBQSxDQUFBLElBQUEsUUFDQSxrQkFBQSxRQUFBLE1BQUEsQ0FBQSxJQUFBLFFBQ0Esb0JBQUEsUUFBQSxRQUFBLENBQUEsSUFBQSxPQUFBLENBQUEsRUFBQSxDQUFBOztBQUdBLCtCQUFBLEVBQUEsV0FBQTtBQUNBLHNDQUFBLEVBQUEsa0JBQUE7QUFDQSx3Q0FBQSxFQUFBLG9CQUFBOzs7OztXQXZCQSxZQUFBO0VBRkEsT0FBQTtnQkFFQSxZQUFBLEdBMkJBLGlCQUFBO0FBQ0EsYUFBQSxHQUFBLE1BQUE7O2VBaENBLGNBQUEsU0FvQ0EsWUFBQSJ9