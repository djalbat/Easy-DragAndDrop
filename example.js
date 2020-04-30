(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _easy = require("easy");

var _view = _interopRequireDefault(require("./example/view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Object.assign(window, {
  React: _easy.React
});
var body = new _easy.Body();
body.prepend( /*#__PURE__*/_easy.React.createElement(_view["default"], null));

},{"./example/view":2,"easy":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var View = function View(properties) {
  return /*#__PURE__*/React.createElement("div", {
    className: "view"
  }, "...");
};

var _default = View;
exports["default"] = _default;

},{}],3:[function(require,module,exports){
'use strict';

module.exports = {
  window: require('./lib/window'),
  document: require('./lib/document'),
  Div: require('./lib/element/div'),
  Span: require('./lib/element/span'),
  Body: require('./lib/element/body'),
  Link: require('./lib/element/link'),
  Select: require('./lib/element/select'),
  Button: require('./lib/element/button'),
  Checkbox: require('./lib/element/checkbox'),
  Element: require('./lib/element'),
  TextElement: require('./lib/textElement'),
  Input: require('./lib/inputElement/input'),
  Textarea: require('./lib/inputElement/textarea'),
  InputElement: require('./lib/inputElement'),
  Bounds: require('./lib/miscellaneous/bounds'),
  Offset: require('./lib/miscellaneous/offset'),
  React: require('./lib/react')
};

},{"./lib/document":5,"./lib/element":6,"./lib/element/body":7,"./lib/element/button":8,"./lib/element/checkbox":9,"./lib/element/div":10,"./lib/element/link":11,"./lib/element/select":12,"./lib/element/span":13,"./lib/inputElement":14,"./lib/inputElement/input":15,"./lib/inputElement/textarea":16,"./lib/miscellaneous/bounds":17,"./lib/miscellaneous/offset":18,"./lib/react":27,"./lib/textElement":28,"./lib/window":34}],4:[function(require,module,exports){
'use strict';

var SVG_NAMESPACE_URI = 'http://www.w3.org/2000/svg';
module.exports = {
  SVG_NAMESPACE_URI: SVG_NAMESPACE_URI
};

},{}],5:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var keyMixins = require('./mixins/key'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    mouseMixins = require('./mixins/mouse');

var Document = function Document() {
  _classCallCheck(this, Document);

  this.domElement = document; ///
};

Object.assign(Document.prototype, keyMixins);
Object.assign(Document.prototype, eventMixins);
Object.assign(Document.prototype, clickMixins);
Object.assign(Document.prototype, mouseMixins);
module.exports = typeof document === 'undefined' ? undefined : new Document(); ///

},{"./mixins/click":19,"./mixins/event":20,"./mixins/key":22,"./mixins/mouse":23}],6:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Offset = require('./miscellaneous/offset'),
    Bounds = require('./miscellaneous/bounds'),
    constants = require('./constants'),
    jsxMixins = require('./mixins/jsx'),
    keyMixins = require('./mixins/key'),
    stateMixins = require('./mixins/state'),
    mouseMixins = require('./mixins/mouse'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    scrollMixins = require('./mixins/scroll'),
    resizeMixins = require('./mixins/resize'),
    domUtilities = require('./utilities/dom'),
    nameUtilities = require('./utilities/name'),
    arrayUtilities = require('./utilities/array'),
    objectUtilities = require('./utilities/object');

var combine = objectUtilities.combine,
    isSVGTagName = nameUtilities.isSVGTagName,
    first = arrayUtilities.first,
    augment = arrayUtilities.augment,
    SVG_NAMESPACE_URI = constants.SVG_NAMESPACE_URI,
    domNodeMatchesSelector = domUtilities.domNodeMatchesSelector,
    domElementFromSelector = domUtilities.domElementFromSelector,
    elementsFromDOMElements = domUtilities.elementsFromDOMElements,
    filterDOMNodesBySelector = domUtilities.filterDOMNodesBySelector,
    descendantDOMNodesFromDOMNode = domUtilities.descendantDOMNodesFromDOMNode;

var Element = /*#__PURE__*/function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.domElement = domElementFromSelector(selector);
    this.domElement.__element__ = this; ///
  }

  _createClass(Element, [{
    key: "clone",
    value: function clone() {
      return Element.clone(this);
    }
  }, {
    key: "getDOMElement",
    value: function getDOMElement() {
      return this.domElement;
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      var top = this.domElement.offsetTop,
          ///
      left = this.domElement.offsetLeft,
          ///
      offset = new Offset(top, left);
      return offset;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);
      return bounds;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var width = includeBorder ? this.domElement.offsetWidth : this.domElement.clientWidth;
      return width;
    }
  }, {
    key: "setWidth",
    value: function setWidth(width) {
      width = "".concat(width, "px"); ///

      this.style('width', width);
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var height = includeBorder ? this.domElement.offsetHeight : this.domElement.clientHeight;
      return height;
    }
  }, {
    key: "setHeight",
    value: function setHeight(height) {
      height = "".concat(height, "px"); ///

      this.style('height', height);
    }
  }, {
    key: "hasAttribute",
    value: function hasAttribute(name) {
      return this.domElement.hasAttribute(name);
    }
  }, {
    key: "getAttribute",
    value: function getAttribute(name) {
      return this.domElement.getAttribute(name);
    }
  }, {
    key: "setAttribute",
    value: function setAttribute(name, value) {
      this.domElement.setAttribute(name, value);
    }
  }, {
    key: "clearAttribute",
    value: function clearAttribute(name) {
      this.domElement.removeAttribute(name);
    }
  }, {
    key: "addAttribute",
    value: function addAttribute(name, value) {
      this.setAttribute(name, value);
    }
  }, {
    key: "removeAttribute",
    value: function removeAttribute(name) {
      this.clearAttribute(name);
    }
  }, {
    key: "setClass",
    value: function setClass(className) {
      this.domElement.className = className;
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      this.domElement.classList.add(className);
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      this.domElement.classList.remove(className);
    }
  }, {
    key: "toggleClass",
    value: function toggleClass(className) {
      this.domElement.classList.toggle(className);
    }
  }, {
    key: "hasClass",
    value: function hasClass(className) {
      return this.domElement.classList.contains(className);
    }
  }, {
    key: "clearClasses",
    value: function clearClasses() {
      this.domElement.className = '';
    }
  }, {
    key: "prependTo",
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: "appendTo",
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: "addTo",
    value: function addTo(parentElement) {
      parentElement.add(this);
    }
  }, {
    key: "removeFrom",
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;
      parentDOMNode.insertBefore(this.domElement, siblingDOMElement);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;
      parentDOMNode.insertBefore(this.domElement, siblingDOMElement.nextSibling); ///
    }
  }, {
    key: "prepend",
    value: function prepend(element) {
      var domElement = element.domElement,
          firstChildDOMElement = this.domElement.firstChild;
      this.domElement.insertBefore(domElement, firstChildDOMElement);
    }
  }, {
    key: "append",
    value: function append(element) {
      var domElement = element.domElement;
      this.domElement.insertBefore(domElement, null); ///
    }
  }, {
    key: "add",
    value: function add(element) {
      this.append(element);
    }
  }, {
    key: "remove",
    value: function remove(element) {
      if (element) {
        var domElement = element.domElement;
        this.domElement.removeChild(domElement);
      } else {
        this.domElement.remove();
      }
    }
  }, {
    key: "show",
    value: function show() {
      var displayStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';
      this.display(displayStyle);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.style('display', 'none');
    }
  }, {
    key: "display",
    value: function display(_display) {
      this.style('display', _display);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.clearAttribute('disabled');
    }
  }, {
    key: "disable",
    value: function disable() {
      this.setAttribute('disabled', 'disabled');
    }
  }, {
    key: "isEnabled",
    value: function isEnabled() {
      var disabled = this.isDisabled(),
          enabled = !disabled;
      return enabled;
    }
  }, {
    key: "isDisabled",
    value: function isDisabled() {
      var disabled = this.hasAttribute('disabled');
      return disabled;
    }
  }, {
    key: "isDisplayed",
    value: function isDisplayed() {
      var display = this.style('display'),
          displayed = display !== 'none';
      return displayed;
    }
  }, {
    key: "isShowing",
    value: function isShowing() {
      var displayed = this.isDisplayed(),
          showing = displayed; ///

      return showing;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      var displayed = this.isDisplayed(),
          hidden = !displayed;
      return hidden;
    }
  }, {
    key: "style",
    value: function style(name, value) {
      if (value !== undefined) {
        this.domElement.style[name] = value;
      } else {
        var style = this.domElement.style[name];
        return style;
      }
    }
  }, {
    key: "html",
    value: function html(_html) {
      if (_html === undefined) {
        var innerHTML = this.domElement.innerHTML;
        _html = innerHTML; ///

        return _html;
      } else {
        var _innerHTML = _html; ///

        this.domElement.innerHTML = _innerHTML;
      }
    }
  }, {
    key: "css",
    value: function css(_css) {
      var _this = this;

      if (_css === undefined) {
        var computedStyle = getComputedStyle(this.domElement),
            css = {};

        for (var index = 0; index < computedStyle.length; index++) {
          var name = computedStyle[0],
              ///
          value = computedStyle.getPropertyValue(name); ///

          css[name] = value;
        }

        return css;
      } else if (typeof _css === 'string') {
        var _name = _css; ///

        var _computedStyle = getComputedStyle(this.domElement),
            _value = _computedStyle.getPropertyValue(_name); ///


        _css = _value; ///

        return _css;
      } else {
        var names = Object.keys(_css); ///

        names.forEach(function (name) {
          var value = _css[name];

          _this.style(name, value);
        });
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.domElement.blur();
    }
  }, {
    key: "focus",
    value: function focus() {
      this.domElement.focus();
    }
  }, {
    key: "hasFocus",
    value: function hasFocus() {
      var focus = document.activeElement === this.domElement; ///

      return focus;
    }
  }, {
    key: "getDescendantElements",
    value: function getDescendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var domNode = this.domElement,
          ///
      descendantDOMNodes = descendantDOMNodesFromDOMNode(domNode),
          descendantDOMElements = filterDOMNodesBySelector(descendantDOMNodes, selector),
          descendantElements = elementsFromDOMElements(descendantDOMElements);
      return descendantElements;
    }
  }, {
    key: "getChildElements",
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var childDOMNodes = this.domElement.childNodes,
          childDOMElements = filterDOMNodesBySelector(childDOMNodes, selector),
          childElements = elementsFromDOMElements(childDOMElements);
      return childElements;
    }
  }, {
    key: "getParentElement",
    value: function getParentElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var parentElement = null;
      var parentDOMElement = this.domElement.parentElement;

      if (parentDOMElement !== null) {
        if (parentDOMElement.matches(selector)) {
          var parentDOMElements = [parentDOMElement],
              parentElements = elementsFromDOMElements(parentDOMElements),
              firstParentElement = first(parentElements);
          parentElement = firstParentElement || null;
        }
      }

      return parentElement;
    }
  }, {
    key: "getAscendantElements",
    value: function getAscendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var ascendantDOMElements = [],
          parentDOMElement = this.domElement.parentElement;
      var ascendantDOMElement = parentDOMElement; ///

      while (ascendantDOMElement !== null) {
        if (ascendantDOMElement.matches(selector)) {
          ascendantDOMElements.push(ascendantDOMElement);
        }

        ascendantDOMElement = ascendantDOMElement.parentElement;
      }

      var ascendantElements = elementsFromDOMElements(ascendantDOMElements);
      return ascendantElements;
    }
  }, {
    key: "getPreviousSiblingElement",
    value: function getPreviousSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var previousSiblingElement = null;
      var previousSiblingDOMNode = this.domElement.previousSibling; ///

      if (previousSiblingDOMNode !== null && domNodeMatchesSelector(previousSiblingDOMNode, selector)) {
        previousSiblingElement = previousSiblingDOMNode.__element__ || null;
      }

      return previousSiblingElement;
    }
  }, {
    key: "getNextSiblingElement",
    value: function getNextSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
      var nextSiblingElement = null;
      var nextSiblingDOMNode = this.domElement.nextSibling;

      if (nextSiblingDOMNode !== null && domNodeMatchesSelector(nextSiblingDOMNode, selector)) {
        nextSiblingElement = nextSiblingDOMNode.__element__ || null;
      }

      return nextSiblingElement;
    }
  }], [{
    key: "clone",
    value: function clone(Class, element) {
      var deep = true,
          domElement = element.domElement.cloneNode(deep);

      for (var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return _fromDOMElement.apply(void 0, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(Class, html) {
      var outerDOMElement = document.createElement('div');
      outerDOMElement.innerHTML = html; ///

      var domElement = outerDOMElement.firstChild;

      for (var _len2 = arguments.length, remainingArguments = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      return _fromDOMElement.apply(void 0, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(Class, domElement) {
      for (var _len3 = arguments.length, remainingArguments = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      return _fromDOMElement.apply(void 0, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(Class, properties) {
      for (var _len4 = arguments.length, remainingArguments = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      var tagName = Class.tagName,
          element = _fromTagName.apply(void 0, [Class, tagName].concat(remainingArguments)),
          defaultProperties = defaultPropertiesFromClass(Class),
          ignoredProperties = ignoredPropertiesFromClass(Class);

      element.applyProperties(properties, defaultProperties, ignoredProperties);
      return element;
    }
  }, {
    key: "fromTagName",
    value: function fromTagName(tagName, properties) {
      for (var _len5 = arguments.length, remainingArguments = new Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        remainingArguments[_key5 - 2] = arguments[_key5];
      }

      var element = _fromTagName.apply(void 0, [Element, tagName].concat(remainingArguments)),
          defaultProperties = {},
          ///
      ignoredProperties = []; ///


      element.applyProperties(properties, defaultProperties, ignoredProperties);
      return element;
    }
  }]);

  return Element;
}();

Object.assign(Element.prototype, jsxMixins);
Object.assign(Element.prototype, keyMixins);
Object.assign(Element.prototype, stateMixins);
Object.assign(Element.prototype, mouseMixins);
Object.assign(Element.prototype, eventMixins);
Object.assign(Element.prototype, clickMixins);
Object.assign(Element.prototype, scrollMixins);
Object.assign(Element.prototype, resizeMixins);
Object.assign(Element, {
  LEFT_MOUSE_BUTTON: 0,
  RIGHT_MOUSE_BUTTON: 2,
  MIDDLE_MOUSE_BUTTON: 1
});
module.exports = Element;

function _fromTagName(Class, tagName) {
  var domElement = isSVGTagName(tagName) ? document.createElementNS(SVG_NAMESPACE_URI, tagName) : document.createElement(tagName);

  for (var _len6 = arguments.length, remainingArguments = new Array(_len6 > 2 ? _len6 - 2 : 0), _key6 = 2; _key6 < _len6; _key6++) {
    remainingArguments[_key6 - 2] = arguments[_key6];
  }

  return _fromDOMElement.apply(void 0, [Class, domElement].concat(remainingArguments));
}

function _fromDOMElement(Class, domElement) {
  var _Function$prototype$b;

  for (var _len7 = arguments.length, remainingArguments = new Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    remainingArguments[_key7 - 2] = arguments[_key7];
  }

  remainingArguments.unshift(domElement);
  remainingArguments.unshift(null);
  return new ((_Function$prototype$b = Function.prototype.bind).call.apply(_Function$prototype$b, [Class].concat(remainingArguments)))();
}

function defaultPropertiesFromClass(Class) {
  var defaultProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Class.hasOwnProperty('defaultProperties')) {
    combine(defaultProperties, Class.defaultProperties);
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    defaultPropertiesFromClass(superClass, defaultProperties);
  }

  return defaultProperties;
}

function ignoredPropertiesFromClass(Class) {
  var ignoredProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Class.hasOwnProperty('ignoredProperties')) {
    augment(ignoredProperties, Class.ignoredProperties, function (ignoredProperty) {
      return !ignoredProperties.includes(ignoredProperty);
    });
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    ignoredPropertiesFromClass(superClass, ignoredProperties);
  }

  return ignoredProperties;
}

},{"./constants":4,"./miscellaneous/bounds":17,"./miscellaneous/offset":18,"./mixins/click":19,"./mixins/event":20,"./mixins/jsx":21,"./mixins/key":22,"./mixins/mouse":23,"./mixins/resize":24,"./mixins/scroll":25,"./mixins/state":26,"./utilities/array":29,"./utilities/dom":30,"./utilities/name":32,"./utilities/object":33}],7:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Body = /*#__PURE__*/function (_Element) {
  _inherits(Body, _Element);

  function Body() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this, selector));
  }

  _createClass(Body, [{
    key: "clone",
    value: function clone() {
      return Body.clone(this);
    }
  }], [{
    key: "clone",
    value: function clone(element) {
      return Element.clone(Body, element);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html) {
      return Element.fromHTML(Body, html);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Body, domElement);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      return Element.fromProperties(Body, properties);
    }
  }]);

  return Body;
}(Element);

Object.assign(Body, {
  tagName: 'body'
});
module.exports = Body;

},{"../element":6}],8:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Button = /*#__PURE__*/function (_Element) {
  _inherits(Button, _Element);

  function Button(selector, clickHandler) {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, selector));

    if (clickHandler !== undefined) {
      _this.onClick(clickHandler);
    }

    return _this;
  }

  _createClass(Button, [{
    key: "clone",
    value: function clone(clickHandler) {
      return Button.clone(this, clickHandler);
    }
  }, {
    key: "onClick",
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;

      _get(_getPrototypeOf(Button.prototype), "onClick", this).call(this, clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: "offClick",
    value: function offClick(clickHandler, object) {
      _get(_getPrototypeOf(Button.prototype), "offClick", this).call(this, clickHandler, object);
    }
  }], [{
    key: "clone",
    value: function clone(element, clickHandler) {
      return Element.clone(Button, element, clickHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Button, html, clickHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Button, domElement, clickHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick,
          button = Element.fromProperties(Button, properties, clickHandler);
      return button;
    }
  }]);

  return Button;
}(Element);

Object.assign(Button, {
  tagName: 'button',
  ignoredProperties: ['onClick']
});
module.exports = Button;

function defaultIntermediateClickHandler(clickHandler, event, element) {
  var button = event.button,
      mouseButton = button; ///

  clickHandler.call(element, mouseButton, event, element);
}

},{"../element":6}],9:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Checkbox = /*#__PURE__*/function (_Element) {
  _inherits(Checkbox, _Element);

  function Checkbox(selector, changeHandler, checked) {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

    if (checked !== undefined) {
      _this.check(checked);
    }

    return _this;
  }

  _createClass(Checkbox, [{
    key: "clone",
    value: function clone(changeHandler) {
      return Checkbox.clone(this, changeHandler);
    }
  }, {
    key: "onChange",
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;
      this.on('click', changeHandler, object, intermediateChangeHandler); ///
    }
  }, {
    key: "offChange",
    value: function offChange(changeHandler, object) {
      this.off('click', changeHandler, object); ///
    }
  }, {
    key: "check",
    value: function check() {
      var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var domElement = this.getDOMElement();
      domElement.checked = checked;
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      var domElement = this.getDOMElement(),
          checked = domElement.checked;
      return checked;
    }
  }, {
    key: "onResize",
    value: function onResize() {}
  }, {
    key: "offResize",
    value: function offResize() {}
  }], [{
    key: "clone",
    value: function clone(element, changeHandler) {
      return Element.clone(Checkbox, element, changeHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Checkbox, html, changeHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Checkbox, domElement, changeHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          checked = properties.checked,
          changeHandler = onChange,
          checkbox = Element.fromProperties(Checkbox, properties, changeHandler, checked);
      return checkbox;
    }
  }]);

  return Checkbox;
}(Element);

Object.assign(Checkbox, {
  tagName: 'input',
  ignoredProperties: ['onChange', 'checked'],
  defaultProperties: {
    type: 'checkbox'
  }
});
module.exports = Checkbox;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var checkbox = element,
      ///
  checked = checkbox.isChecked();
  changeHandler.call(element, checked, event, element);
}

},{"../element":6}],10:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Div = /*#__PURE__*/function (_Element) {
  _inherits(Div, _Element);

  function Div(selector) {
    _classCallCheck(this, Div);

    return _possibleConstructorReturn(this, _getPrototypeOf(Div).call(this, selector));
  }

  _createClass(Div, [{
    key: "clone",
    value: function clone() {
      return Div.clone(this);
    }
  }], [{
    key: "clone",
    value: function clone(element) {
      return Element.clone(Div, element);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html) {
      return Element.fromHTML(Div, html);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Div, domElement);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      return Element.fromProperties(Div, properties);
    }
  }]);

  return Div;
}(Element);

Object.assign(Div, {
  tagName: 'div'
});
module.exports = Div;

},{"../element":6}],11:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Link = /*#__PURE__*/function (_Element) {
  _inherits(Link, _Element);

  function Link(selector, clickHandler) {
    var _this;

    _classCallCheck(this, Link);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Link).call(this, selector));

    if (clickHandler !== undefined) {
      _this.onClick(clickHandler);
    }

    return _this;
  }

  _createClass(Link, [{
    key: "clone",
    value: function clone(clickHandler) {
      return Link.clone(this, clickHandler);
    }
  }, {
    key: "onClick",
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;
      this.on('click', clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: "offClick",
    value: function offClick(clickHandler, object) {
      this.off('click', clickHandler, object);
    }
  }], [{
    key: "clone",
    value: function clone(element, clickHandler) {
      return Element.clone(Link, element, clickHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Link, html, clickHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Link, domElement, clickHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick,
          link = Element.fromProperties(Link, properties, clickHandler);
      return link;
    }
  }]);

  return Link;
}(Element);

Object.assign(Link, {
  tagName: 'a',
  ignoredProperties: ['onClick']
});
module.exports = Link;

function defaultIntermediateClickHandler(clickHandler, event, element) {
  var link = element,
      ///
  hrefAttribute = link.getAttribute('href'),
      href = hrefAttribute; ///

  clickHandler.call(element, href, event, element);
}

},{"../element":6}],12:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Select = /*#__PURE__*/function (_Element) {
  _inherits(Select, _Element);

  function Select(selector, changeHandler) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

    return _this;
  }

  _createClass(Select, [{
    key: "clone",
    value: function clone(changeHandler) {
      return Select.clone(this, changeHandler);
    }
  }, {
    key: "onChange",
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;
      this.on('change', changeHandler, object, intermediateChangeHandler);
    }
  }, {
    key: "offChange",
    value: function offChange(changeHandler, object) {
      this.off('change', changeHandler, object);
    }
  }, {
    key: "getSelectedOptionValue",
    value: function getSelectedOptionValue() {
      var domElement = this.getDOMElement(),
          selectedOptionValue = domElement.value; ///

      return selectedOptionValue;
    }
  }, {
    key: "setSelectedOptionByValue",
    value: function setSelectedOptionByValue(selectedOptionValue) {
      var value = selectedOptionValue,
          ///
      domElement = this.getDOMElement();
      domElement.value = value;
    }
  }], [{
    key: "clone",
    value: function clone(element, changeHandler) {
      return Element.clone(Select, element, changeHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Select, html, changeHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Select, domElement, changeHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange,
          select = Element.fromProperties(Select, properties, changeHandler);
      return select;
    }
  }]);

  return Select;
}(Element);

Object.assign(Select, {
  tagName: 'select',
  ignoredProperties: ['onChange']
});
module.exports = Select;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var select = element,
      ///
  selectedOptionValue = select.getSelectedOptionValue();
  changeHandler.call(element, selectedOptionValue, event, element);
}

},{"../element":6}],13:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('../element');

var Span = /*#__PURE__*/function (_Element) {
  _inherits(Span, _Element);

  function Span() {
    _classCallCheck(this, Span);

    return _possibleConstructorReturn(this, _getPrototypeOf(Span).apply(this, arguments));
  }

  _createClass(Span, [{
    key: "clone",
    value: function clone() {
      return Span.clone(this);
    }
  }, {
    key: "onResize",
    value: function onResize() {}
  }, {
    key: "offResize",
    value: function offResize() {}
  }], [{
    key: "clone",
    value: function clone(element) {
      return Element.clone(Span, element);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html) {
      return Element.fromHTML(Span, html);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Span, domElement);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      return Element.fromProperties(properties);
    }
  }]);

  return Span;
}(Element);

Object.assign(Span, {
  tagName: 'span'
});
module.exports = Span;

},{"../element":6}],14:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Element = require('./element');

var InputElement = /*#__PURE__*/function (_Element) {
  _inherits(InputElement, _Element);

  function InputElement(selector, changeHandler) {
    var _this;

    _classCallCheck(this, InputElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputElement).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

    return _this;
  }

  _createClass(InputElement, [{
    key: "onResize",
    value: function onResize() {}
  }, {
    key: "offResize",
    value: function offResize() {}
  }, {
    key: "onChange",
    value: function onChange(changeHandler) {
      var intermediateChangeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateChangeHandler;
      this.on('change', changeHandler, intermediateChangeHandler);
    }
  }, {
    key: "offChange",
    value: function offChange(changeHandler) {
      this.off('change', changeHandler);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.domElement.value;
    }
  }, {
    key: "getSelectionStart",
    value: function getSelectionStart() {
      return this.domElement.selectionStart;
    }
  }, {
    key: "getSelectionEnd",
    value: function getSelectionEnd() {
      return this.domElement.selectionEnd;
    }
  }, {
    key: "isReadOnly",
    value: function isReadOnly() {
      return this.domElement.readOnly;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.domElement.value = value;
    }
  }, {
    key: "setSelectionStart",
    value: function setSelectionStart(selectionStart) {
      this.domElement.selectionStart = selectionStart;
    }
  }, {
    key: "setSelectionEnd",
    value: function setSelectionEnd(selectionEnd) {
      this.domElement.selectionEnd = selectionEnd;
    }
  }, {
    key: "setReadOnly",
    value: function setReadOnly(readOnly) {
      this.domElement.readOnly = readOnly;
    }
  }, {
    key: "select",
    value: function select() {
      this.domElement.select();
    }
  }], [{
    key: "clone",
    value: function clone(Class, element) {
      for (var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return Element.clone.apply(Element, [Class, element].concat(remainingArguments));
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(Class, html) {
      for (var _len2 = arguments.length, remainingArguments = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      return Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments));
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(Class, domElement) {
      for (var _len3 = arguments.length, remainingArguments = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      return Element.fromDOMElement.apply(Element, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(Class, properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///

      for (var _len4 = arguments.length, remainingArguments = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      return Element.fromProperties.apply(Element, [Class, properties, changeHandler].concat(remainingArguments));
    }
  }]);

  return InputElement;
}(Element);

Object.assign(InputElement, {
  ignoredProperties: ['onChange']
});
module.exports = InputElement;

function defaultIntermediateChangeHandler(changeHandler, event, element) {
  var inputElement = element,
      ///
  value = inputElement.getValue();
  changeHandler.call(element, value, event, element);
}

},{"./element":6}],15:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InputElement = require('../inputElement');

var Input = /*#__PURE__*/function (_InputElement) {
  _inherits(Input, _InputElement);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _getPrototypeOf(Input).apply(this, arguments));
  }

  _createClass(Input, [{
    key: "clone",
    value: function clone(changeHandler) {
      return Input.clone(this, changeHandler);
    }
  }], [{
    key: "clone",
    value: function clone(element, changeHandler) {
      return InputElement.clone(Input, element, changeHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Input, html, changeHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Input, domElement, changeHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      return InputElement.fromProperties(Input, properties);
    }
  }]);

  return Input;
}(InputElement);

Object.assign(Input, {
  tagName: 'input'
});
module.exports = Input;

},{"../inputElement":14}],16:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var InputElement = require('../inputElement');

var Textarea = /*#__PURE__*/function (_InputElement) {
  _inherits(Textarea, _InputElement);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(Textarea).apply(this, arguments));
  }

  _createClass(Textarea, [{
    key: "clone",
    value: function clone(changeHandler) {
      return Textarea.clone(this, changeHandler);
    }
  }], [{
    key: "clone",
    value: function clone(element, changeHandler) {
      return InputElement.clone(Textarea, element, changeHandler);
    }
  }, {
    key: "fromHTML",
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Textarea, html, changeHandler);
    }
  }, {
    key: "fromDOMElement",
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Textarea, domElement, changeHandler);
    }
  }, {
    key: "fromProperties",
    value: function fromProperties(properties) {
      return InputElement.fromProperties(Textarea, properties);
    }
  }]);

  return Textarea;
}(InputElement);

Object.assign(Textarea, {
  tagName: 'textarea'
});
module.exports = Textarea;

},{"../inputElement":14}],17:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Bounds = /*#__PURE__*/function () {
  function Bounds(top, left, bottom, right) {
    _classCallCheck(this, Bounds);

    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  _createClass(Bounds, [{
    key: "getTop",
    value: function getTop() {
      return this.top;
    }
  }, {
    key: "getLeft",
    value: function getLeft() {
      return this.left;
    }
  }, {
    key: "getBottom",
    value: function getBottom() {
      return this.bottom;
    }
  }, {
    key: "getRight",
    value: function getRight() {
      return this.right;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var width = this.right - this.left;
      return width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var height = this.bottom - this.top;
      return height;
    }
  }, {
    key: "setTop",
    value: function setTop(top) {
      this.top = top;
    }
  }, {
    key: "setLeft",
    value: function setLeft(left) {
      this.left = left;
    }
  }, {
    key: "setBottom",
    value: function setBottom(bottom) {
      this.bottom = bottom;
    }
  }, {
    key: "setRight",
    value: function setRight(right) {
      this.right = right;
    }
  }, {
    key: "shift",
    value: function shift(horizontalOffset, verticalOffset) {
      this.top += verticalOffset;
      this.left += horizontalOffset;
      this.bottom += verticalOffset;
      this.right += horizontalOffset;
    }
  }, {
    key: "isOverlappingMouse",
    value: function isOverlappingMouse(mouseTop, mouseLeft) {
      return this.top < mouseTop && this.left < mouseLeft && this.bottom > mouseTop && this.right > mouseLeft;
    }
  }, {
    key: "areOverlapping",
    value: function areOverlapping(bounds) {
      return this.top < bounds.bottom && this.left < bounds.right && this.bottom > bounds.top && this.right > bounds.left;
    }
  }], [{
    key: "fromBoundingClientRect",
    value: function fromBoundingClientRect(boundingClientRect) {
      var windowScrollTop = window.pageYOffset,
          ///
      windowScrollLeft = window.pageXOffset,
          ///
      top = boundingClientRect.top + windowScrollTop,
          left = boundingClientRect.left + windowScrollLeft,
          bottom = boundingClientRect.bottom + windowScrollTop,
          right = boundingClientRect.right + windowScrollLeft,
          bounds = new Bounds(top, left, bottom, right);
      return bounds;
    }
  }, {
    key: "fromTopLeftWidthAndHeight",
    value: function fromTopLeftWidthAndHeight(top, left, width, height) {
      var bottom = top + height,
          right = left + width,
          bounds = new Bounds(top, left, bottom, right);
      return bounds;
    }
  }]);

  return Bounds;
}();

module.exports = Bounds;

},{}],18:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Offset = /*#__PURE__*/function () {
  function Offset(top, left) {
    _classCallCheck(this, Offset);

    this.top = top;
    this.left = left;
  }

  _createClass(Offset, [{
    key: "getTop",
    value: function getTop() {
      return this.top;
    }
  }, {
    key: "getLeft",
    value: function getLeft() {
      return this.left;
    }
  }]);

  return Offset;
}();

module.exports = Offset;

},{}],19:[function(require,module,exports){
'use strict';

function onClick(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('click', handler, element, intermediateHandler);
}

function offClick(handler, element) {
  this.off('click', handler, element);
}

module.exports = {
  onClick: onClick,
  offClick: offClick
};

function defaultIntermediateHandler(handler, event, element) {
  var pageY = event.pageY,
      pageX = event.pageX,
      button = event.button,
      mouseTop = pageY,
      mouseLeft = pageX,
      mouseButton = button; ///

  handler.call(element, mouseTop, mouseLeft, mouseButton, event, element);
}

},{}],20:[function(require,module,exports){
'use strict';

function on(eventTypes, handler) {
  var _this = this;

  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
  var intermediateHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = _this.addEventListener(eventType, handler, element, intermediateHandler);

    _this.domElement.addEventListener(eventType, eventListener);
  });
}

function off(eventTypes, handler) {
  var _this2 = this;

  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = _this2.removeEventListener(eventType, handler, element);

    _this2.domElement.removeEventListener(eventType, eventListener);
  });
}

module.exports = {
  on: on,
  off: off,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};

function addEventListener(eventType, handler, element, intermediateHandler) {
  if (!this.hasOwnProperty('eventListeners')) {
    this.eventListeners = [];
  }

  var eventListeners = this.eventListeners,
      eventListener = createEventListener(eventType, handler, element, intermediateHandler);
  eventListeners.push(eventListener);
  return eventListener;
}

function removeEventListener(eventType, handler, element) {
  var eventListeners = this.eventListeners,
      eventListener = findEventListener(eventListeners, eventType, handler, element),
      index = eventListeners.indexOf(eventListener),
      start = index,
      ///
  deleteCount = 1;
  eventListeners.splice(start, deleteCount);

  if (eventListeners.length === 0) {
    delete this.eventListeners;
  }

  return eventListener;
}

function createEventListener(eventType, handler, element, intermediateHandler) {
  var eventListener;

  if (intermediateHandler === null) {
    eventListener = function eventListener(event) {
      handler.call(element, event, element);
    };
  } else {
    eventListener = function eventListener(event) {
      intermediateHandler(handler, event, element);
    };
  }

  Object.assign(eventListener, {
    eventType: eventType,
    handler: handler,
    element: element
  });
  return eventListener;
}

function findEventListener(eventListeners, eventType, handler, element) {
  var eventListener = eventListeners.find(function (eventListener) {
    if (eventListener.eventType === eventType && eventListener.element === element && eventListener.handler === handler) {
      return true;
    }
  });
  return eventListener;
}

},{}],21:[function(require,module,exports){
'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var constants = require('../constants'),
    nameUtilities = require('../utilities/name'),
    arrayUtilities = require('../utilities/array'),
    objectUtilities = require('../utilities/object'),
    elementsUtilities = require('../utilities/elements');

var combine = objectUtilities.combine,
    prune = objectUtilities.prune,
    first = arrayUtilities.first,
    guarantee = arrayUtilities.guarantee,
    SVG_NAMESPACE_URI = constants.SVG_NAMESPACE_URI,
    isHTMLAttributeName = nameUtilities.isHTMLAttributeName,
    isSVGAttributeName = nameUtilities.isSVGAttributeName,
    removeFalseyElements = elementsUtilities.removeFalseyElements,
    replaceStringsWithTextElements = elementsUtilities.replaceStringsWithTextElements;

function applyProperties() {
  var _this = this;

  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments.length > 1 ? arguments[1] : undefined;
  var ignoredProperties = arguments.length > 2 ? arguments[2] : undefined;
  combine(properties, defaultProperties);
  var childElements = childElementsFromElementAndProperties(this, properties) || properties.childElements; ///

  prune(properties, ignoredProperties);
  var svg = this.domElement.namespaceURI === SVG_NAMESPACE_URI,
      ///
  names = Object.keys(properties); ///

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {///
    } else if (isHandlerName(name)) {
      addHandler(_this, name, value);
    } else if (isAttributeName(name, svg)) {
      addAttribute(_this, name, value);
    } else {
      if (!_this.hasOwnProperty('properties')) {
        var _properties = {};
        Object.assign(_this, {
          properties: _properties
        });
      }

      _this.properties[name] = value;
    }
  });
  var context = {};
  childElements.forEach(function (childElement) {
    updateContext(childElement, context);
    childElement.addTo(_this);
  });
  Object.assign(this, {
    context: context
  });
}

function getProperties() {
  return this.properties;
}

function getContext() {
  return this.context;
}

function assignContext(names, thenDelete) {
  var _this2 = this;

  var argumentsLength = arguments.length;

  if (argumentsLength === 1) {
    var firstArgument = first(arguments);

    if (typeof firstArgument === 'boolean') {
      names = Object.keys(this.context);
      thenDelete = firstArgument;
    } else {
      thenDelete = true;
    }
  }

  if (argumentsLength === 0) {
    names = Object.keys(this.context);
    thenDelete = true;
  }

  names.forEach(function (name) {
    var value = _this2.context[name],
        propertyName = name,
        ///
    descriptor = {
      value: value
    };
    Object.defineProperty(_this2, propertyName, descriptor);

    if (thenDelete) {
      delete _this2.context[name];
    }
  }, []);
}

module.exports = {
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  assignContext: assignContext
};

function childElementsFromElementAndProperties(element, properties) {
  var childElements = null;

  if (typeof element.childElements === 'function') {
    childElements = element.childElements(properties);
    childElements = guarantee(childElements);
    childElements = removeFalseyElements(childElements);
    childElements = replaceStringsWithTextElements(childElements);
  }

  return childElements;
}

function updateContext(childElement, context) {
  var parentContext = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context; ///

  Object.assign(context, parentContext);
  delete childElement.context;
}

function addHandler(element, name, value) {
  var eventType = name.substr(2).toLowerCase(),
      ///
  handler = value; ///

  element.on(eventType, handler);
}

function addAttribute(element, name, value) {
  if (name === 'className') {
    name = 'class';
  }

  if (name === 'htmlFor') {
    name = 'for';
  }

  if (_typeof(value) === 'object') {
    var keys = Object.keys(value);
    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    });
  } else if (typeof value === 'boolean') {
    if (value) {
      value = name; ///

      element.addAttribute(name, value);
    }
  } else {
    element.addAttribute(name, value);
  }
}

function isHandlerName(name) {
  return name.match(/^on/);
}

function isAttributeName(name, svg) {
  return svg ? isSVGAttributeName(name) : isHTMLAttributeName(name);
}

},{"../constants":4,"../utilities/array":29,"../utilities/elements":31,"../utilities/name":32,"../utilities/object":33}],22:[function(require,module,exports){
'use strict';

function onKeyUp(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('keyup', handler, element, intermediateHandler);
}

function onKeyDown(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('keydown', handler, element, intermediateHandler);
}

function offKeyUp(handler, element) {
  this.off('keyup', handler, element);
}

function offKeyDown(handler, element) {
  this.off('keydown', handler, element);
}

module.exports = {
  onKeyUp: onKeyUp,
  onKeyDown: onKeyDown,
  offKeyUp: offKeyUp,
  offKeyDown: offKeyDown
};

function defaultIntermediateHandler(handler, event, element) {
  var keyCode = event.keyCode;
  handler.call(element, keyCode, event, element);
}

},{}],23:[function(require,module,exports){
'use strict';

function onMouseUp(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('mouseup', handler, element, intermediateHandler);
}

function onMouseDown(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('mousedown', handler, element, intermediateHandler);
}

function onMouseOver(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('mouseover', handler, element, intermediateHandler);
}

function onMouseOut(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('mouseout', handler, element, intermediateHandler);
}

function onMouseMove(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('mousemove', handler, element, intermediateHandler);
}

function offMouseUp(handler, element) {
  this.off('mouseup', handler, element);
}

function offMouseDown(handler, element) {
  this.off('mousedown', handler, element);
}

function offMouseOver(handler, element) {
  this.off('mouseover', handler, element);
}

function offMouseOut(handler, element) {
  this.off('mouseout', handler, element);
}

function offMouseMove(handler, element) {
  this.off('mousemove', handler, element);
}

module.exports = {
  onMouseUp: onMouseUp,
  onMouseDown: onMouseDown,
  onMouseOver: onMouseOver,
  onMouseOut: onMouseOut,
  onMouseMove: onMouseMove,
  offMouseUp: offMouseUp,
  offMouseDown: offMouseDown,
  offMouseOver: offMouseOver,
  offMouseOut: offMouseOut,
  offMouseMove: offMouseMove
};

function defaultIntermediateHandler(handler, event, element) {
  var pageY = event.pageY,
      pageX = event.pageX,
      button = event.button,
      mouseTop = pageY,
      mouseLeft = pageX,
      mouseButton = button; ///

  handler.call(element, mouseTop, mouseLeft, mouseButton, event, element);
}

},{}],24:[function(require,module,exports){
'use strict';

function onResize(handler) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;
  var resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    addResizeObject(element);
  }

  var eventType = 'resize';
  this.addEventListener(eventType, handler, element, intermediateHandler);
}

function offResize(handler) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
  var eventType = 'resize';
  this.removeEventListener(eventType, handler, element);
  var resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    removeResizeObject(element);
  }
}

module.exports = {
  onResize: onResize,
  offResize: offResize
};

function addResizeObject(element) {
  var resizeObject = document.createElement('object'),
      domElement = element.getDOMElement(),
      style = "display: block; \n                 position: absolute; \n                 top: 0; \n                 left: 0; \n                 height: 100%; \n                 width: 100%; \n                 overflow: hidden; \n                 pointer-events: none; \n                 z-index: -1;",
      data = 'about:blank',
      type = 'text/html';
  resizeObject.setAttribute('style', style);
  resizeObject.data = data;
  resizeObject.type = type;
  element.__resizeObject__ = resizeObject;

  resizeObject.onload = function () {
    resizeObjectLoadHandler(element);
  };

  domElement.appendChild(resizeObject);
}

function removeResizeObject(element) {
  var domElement = element.getDOMElement(),
      resizeObject = element.__resizeObject__,
      objectWindow = resizeObject.contentDocument.defaultView; ///

  objectWindow.removeEventListener('resize', resizeEventListener);
  domElement.removeChild(resizeObject);
}

function resizeObjectLoadHandler(element) {
  var resizeObject = element.__resizeObject__,
      resizeObjectWindow = resizeObject.contentDocument.defaultView; ///

  resizeObjectWindow.addEventListener('resize', function (event) {
    var resizeEventListeners = findResizeEventListeners(element);
    resizeEventListeners.forEach(function (resizeEventListener) {
      resizeEventListener(event);
    });
  });
}

function findResizeEventListeners(element) {
  var resizeEventListeners = [];

  if (element.hasOwnProperty('eventListeners')) {
    var eventListeners = element.eventListeners; ///

    eventListeners.forEach(function (eventListener) {
      if (eventListener.eventType === 'resize') {
        var _resizeEventListener = eventListener;
        resizeEventListeners.push(_resizeEventListener);
      }
    });
  }

  return resizeEventListeners;
}

function defaultIntermediateResizeHandler(handler, event, element) {
  var window = element,
      ///
  width = window.getWidth(),
      height = window.getHeight();
  handler.call(element, width, height, event, element);
}

},{}],25:[function(require,module,exports){
'use strict';

function onScroll(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;
  this.on('scroll', handler, element, intermediateHandler);
}

function offScroll(handler, element) {
  this.off('scroll', handler, element);
}

function getScrollTop() {
  return this.domElement.scrollTop;
}

function getScrollLeft() {
  return this.domElement.scrollLeft;
}

function setScrollTop(scrollTop) {
  this.domElement.scrollTop = scrollTop;
}

function setScrollLeft(scrollLeft) {
  this.domElement.scrollLeft = scrollLeft;
}

module.exports = {
  onScroll: onScroll,
  offScroll: offScroll,
  getScrollTop: getScrollTop,
  getScrollLeft: getScrollLeft,
  setScrollTop: setScrollTop,
  setScrollLeft: setScrollLeft
};

function defaultIntermediateHandler(handler, event, element) {
  var scrollTop = element.getScrollTop(),
      scrollLeft = element.getScrollLeft();
  handler.call(element, scrollTop, scrollLeft, event, element);
}

},{}],26:[function(require,module,exports){
'use strict';

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

function updateState(update) {
  Object.assign(this.state, update);
}

module.exports = {
  getState: getState,
  setState: setState,
  updateState: updateState
};

},{}],27:[function(require,module,exports){
'use strict';

var Element = require('./element'),
    arrayUtilities = require('./utilities/array'),
    elementsUtilities = require('./utilities/elements');

var flatten = arrayUtilities.flatten,
    removeFalseyElements = elementsUtilities.removeFalseyElements,
    replaceStringsWithTextElements = elementsUtilities.replaceStringsWithTextElements;

function createElement(firstArgument, properties) {
  var element = null;

  if (firstArgument !== undefined) {
    for (var _len = arguments.length, childArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      childArguments[_key - 2] = arguments[_key];
    }

    var childElements = childElementsFromChildArguments(childArguments);
    properties = Object.assign({
      childElements: childElements
    }, properties);

    if (false) {///
    } else if (isSubclassOf(firstArgument, Element)) {
      var Class = firstArgument; ///

      element = Class.fromProperties(properties);
    } else if (typeof firstArgument === 'string') {
      var tagName = firstArgument; ///

      element = Element.fromTagName(tagName, properties);
    } else if (typeof firstArgument === 'function') {
      var elementFunction = firstArgument; ///

      element = elementFunction(properties);
    }
  }

  return element;
}

var React = {
  createElement: createElement
};
module.exports = React;

function childElementsFromChildArguments(childArguments) {
  childArguments = flatten(childArguments); ///

  var childElements = childArguments; ///

  childElements = removeFalseyElements(childElements);
  childElements = replaceStringsWithTextElements(childElements);
  return childElements;
}

function isSubclassOf(argument, Class) {
  var typeOf = false;

  if (argument.name === Class.name) {
    ///
    typeOf = true;
  } else {
    argument = Object.getPrototypeOf(argument); ///

    if (argument) {
      typeOf = isSubclassOf(argument, Class);
    }
  }

  return typeOf;
}

},{"./element":6,"./utilities/array":29,"./utilities/elements":31}],28:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Offset = require('./miscellaneous/offset'),
    Bounds = require('./miscellaneous/bounds');

var TextElement = /*#__PURE__*/function () {
  function TextElement(text) {
    _classCallCheck(this, TextElement);

    this.domElement = document.createTextNode(text); ///

    this.domElement.__element__ = this;
  }

  _createClass(TextElement, [{
    key: "clone",
    value: function clone() {
      return TextElement.clone(this);
    }
  }, {
    key: "getText",
    value: function getText() {
      var nodeValue = this.domElement.nodeValue,
          text = nodeValue; ///

      return text;
    }
  }, {
    key: "setText",
    value: function setText(text) {
      var nodeValue = text; ///

      this.domElement.nodeValue = nodeValue;
    }
  }, {
    key: "getOffset",
    value: function getOffset() {
      var top = this.domElement.offsetTop,
          ///
      left = this.domElement.offsetLeft,
          ///
      offset = new Offset(top, left);
      return offset;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);
      return bounds;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var width = this.domElement.clientWidth;
      return width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var height = this.domElement.clientHeight;
      return height;
    }
  }, {
    key: "prependTo",
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: "appendTo",
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: "addTo",
    value: function addTo(parentElement) {
      parentElement.add(this);
    }
  }, {
    key: "removeFrom",
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;
      parentDOMNode.insertBefore(this.domElement, siblingDOMElement);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;
      parentDOMNode.insertBefore(this.domElement, siblingDOMElement.nextSibling); ///
    }
  }, {
    key: "remove",
    value: function remove() {
      this.domElement.remove();
    }
  }]);

  return TextElement;
}();

module.exports = TextElement;

},{"./miscellaneous/bounds":17,"./miscellaneous/offset":18}],29:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function first(array) {
  return array[0];
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);
  return deletedItemsArray;
}

function flatten(array) {
  return array.reduce(function (array, element) {
    array = array.concat(element); ///

    return array;
  }, []);
}

function guarantee(arrayOrElement) {
  arrayOrElement = arrayOrElement || [];
  return arrayOrElement instanceof Array ? arrayOrElement : [arrayOrElement];
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

module.exports = {
  first: first,
  splice: splice,
  flatten: flatten,
  guarantee: guarantee,
  augment: augment
};

},{}],30:[function(require,module,exports){
'use strict';

var arrayUtilities = require('../utilities/array');

var splice = arrayUtilities.splice;

function domElementFromSelector(selector) {
  var domElement = typeof selector === 'string' ? document.querySelector(selector) : selector; ///

  return domElement;
}

function elementsFromDOMElements(domElements) {
  var domElementsWithElements = filterDOMNodes(domElements, function (domElement) {
    return domElement.__element__ !== undefined;
  }),
      elements = domElementsWithElements.map(function (domElement) {
    return domElement.__element__;
  });
  return elements;
}

function descendantDOMNodesFromDOMNode(domNode) {
  var descendantDOMNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var start = -1,
      deleteCount = 0,
      childDOMNodes = domNode.childNodes; ///

  splice(descendantDOMNodes, start, deleteCount, childDOMNodes);
  childDOMNodes.forEach(function (childDOMNode) {
    descendantDOMNodesFromDOMNode(childDOMNode, descendantDOMNodes);
  });
  return descendantDOMNodes;
}

function filterDOMNodesBySelector(domNodes, selector) {
  var filteredDOMNodes = filterDOMNodes(domNodes, function (domNode) {
    return domNodeMatchesSelector(domNode, selector);
  });
  return filteredDOMNodes;
}

function domNodeMatchesSelector(domNode, selector) {
  var domNodeType = domNode.nodeType;

  switch (domNodeType) {
    case Node.ELEMENT_NODE:
      {
        var domElement = domNode; ///

        return domElement.matches(selector);
      }

    case Node.TEXT_NODE:
      {
        if (selector === '*') {
          return true;
        }
      }
  }

  return false;
}

function filterDOMNodes(domNodes, test) {
  var filteredDOMNodes = [],
      domNodesLength = domNodes.length;

  for (var index = 0; index < domNodesLength; index++) {
    var domNode = domNodes[index],
        result = test(domNode);

    if (result) {
      filteredDOMNodes.push(domNode);
    }
  }

  return filteredDOMNodes;
}

module.exports = {
  domElementFromSelector: domElementFromSelector,
  elementsFromDOMElements: elementsFromDOMElements,
  descendantDOMNodesFromDOMNode: descendantDOMNodesFromDOMNode,
  filterDOMNodesBySelector: filterDOMNodesBySelector,
  domNodeMatchesSelector: domNodeMatchesSelector,
  filterDOMNodes: filterDOMNodes
};

},{"../utilities/array":29}],31:[function(require,module,exports){
'use strict';

var TextElement = require('../textElement');

function removeFalseyElements(elements) {
  elements = elements.reduce(function (elements, element) {
    if (element) {
      elements.push(element);
    }

    return elements;
  }, []);
  return elements;
}

function replaceStringsWithTextElements(elements) {
  elements = elements.map(function (element) {
    ///
    if (typeof element === 'string') {
      var text = element,
          ///
      textElement = new TextElement(text);
      element = textElement; ///
    }

    return element;
  });
  return elements;
}

module.exports = {
  removeFalseyElements: removeFalseyElements,
  replaceStringsWithTextElements: replaceStringsWithTextElements
};

},{"../textElement":28}],32:[function(require,module,exports){
'use strict';

function isSVGTagName(tagName) {
  return svgTagNames.includes(tagName);
}

function isSVGAttributeName(attributeName) {
  return svgAttributeNames.includes(attributeName);
}

function isHTMLAttributeName(attributeName) {
  return htmlAttributeNames.includes(attributeName);
}

module.exports = {
  isSVGTagName: isSVGTagName,
  isSVGAttributeName: isSVGAttributeName,
  isHTMLAttributeName: isHTMLAttributeName
};
var svgTagNames = ['altGlyph', 'animate', 'animateColor', 'animateMotion', 'animateTransform', 'animation', 'audio', 'circle', 'clipPath', 'color-profile', 'cursor', 'defs', 'desc', 'discard', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face', 'font-face-format', 'font-face-name', 'font-face-uri', 'foreignObject', 'g', 'glyph', 'glyphRef', 'handler', 'hatch', 'hatchpath', 'hkern', 'image', 'line', 'linearGradient', 'listener', 'marker', 'mask', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'metadata', 'missing-glyph', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'prefetch', 'radialGradient', 'rect', 'script', 'set', 'solidcolor', 'stop', 'style', 'svg', 'switch', 'symbol', 'tbreak', 'text', 'textArea', 'textPath', 'title', 'tref', 'tspan', 'unknown', 'use', 'video', 'view', 'vkern'],
    svgAttributeNames = ['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'alphabetic', 'amplitude', 'arabic-form', 'ascent', 'attributeName', 'attributeType', 'azimuth', 'bandwidth', 'baseFrequency', 'baseProfile', 'baseline-shift', 'bbox', 'begin', 'bias', 'by', 'calcMode', 'cap-height', 'clip', 'className', 'clip-path', 'clip-rule', 'clipPathUnits', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'contentScriptType', 'contentStyleType', 'crossorigin', 'cursor', 'cx', 'cy', 'd', 'defaultAction', 'descent', 'diffuseConstant', 'direction', 'display', 'divisor', 'dominant-baseline', 'download', 'dur', 'dx', 'dy', 'edgeMode', 'editable', 'elevation', 'enable-background', 'end', 'event', 'exponent', 'externalResourcesRequired', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterRes', 'filterUnits', 'flood-color', 'flood-opacity', 'focusHighlight', 'focusable', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'format', 'fr', 'from', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyph-orientation-horizontal', 'glyph-orientation-vertical', 'glyphRef', 'gradientTransform', 'gradientUnits', 'handler', 'hanging', 'hatchContentUnits', 'hatchUnits', 'height', 'horiz-adv-x', 'horiz-origin-x', 'horiz-origin-y', 'href', 'hreflang', 'ideographic', 'image-rendering', 'in', 'in2', 'initialVisibility', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kernelMatrix', 'kernelUnitLength', 'kerning', 'keyPoints', 'keySplines', 'keyTimes', 'lengthAdjust', 'letter-spacing', 'lighting-color', 'limitingConeAngle', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerHeight', 'markerUnits', 'markerWidth', 'mask', 'maskContentUnits', 'maskUnits', 'mathematical', 'max', 'media', 'mediaCharacterEncoding', 'mediaContentEncodings', 'mediaSize', 'mediaTime', 'method', 'min', 'mode', 'name', 'nav-down', 'nav-down-left', 'nav-down-right', 'nav-left', 'nav-next', 'nav-prev', 'nav-right', 'nav-up', 'nav-up-left', 'nav-up-right', 'numOctaves', 'observer', 'offset', 'opacity', 'operator', 'order', 'orient', 'orientation', 'origin', 'overflow', 'overlay', 'overline-position', 'overline-thickness', 'panose-1', 'path', 'pathLength', 'patternContentUnits', 'patternTransform', 'patternUnits', 'phase', 'pitch', 'playbackOrder', 'playbackorder', 'pointer-events', 'points', 'pointsAtX', 'pointsAtY', 'pointsAtZ', 'preserveAlpha', 'preserveAspectRatio', 'primitiveUnits', 'propagate', 'r', 'radius', 'refX', 'refY', 'rendering-intent', 'repeatCount', 'repeatDur', 'requiredExtensions', 'requiredFeatures', 'requiredFonts', 'requiredFormats', 'restart', 'result', 'rotate', 'rx', 'ry', 'scale', 'seed', 'shape-rendering', 'side', 'slope', 'snapshotTime', 'spacing', 'specularConstant', 'specularExponent', 'spreadMethod', 'src', 'startOffset', 'stdDeviation', 'stemh', 'stemv', 'stitchTiles', 'stop-color', 'stop-opacity', 'strikethrough-position', 'strikethrough-thickness', 'string', 'stroke', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke-width', 'style', 'surfaceScale', 'syncBehavior', 'syncBehaviorDefault', 'syncMaster', 'syncTolerance', 'syncToleranceDefault', 'systemLanguage', 'tableValues', 'target', 'targetX', 'targetY', 'text-anchor', 'text-decoration', 'text-rendering', 'textLength', 'timelineBegin', 'timelinebegin', 'title', 'to', 'transform', 'transformBehavior', 'type', 'u1', 'u2', 'underline-position', 'underline-thickness', 'unicode', 'unicode-bidi', 'unicode-range', 'units-per-em', 'v-alphabetic', 'v-hanging', 'v-ideographic', 'v-mathematical', 'values', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'viewBox', 'viewTarget', 'visibility', 'width', 'widths', 'word-spacing', 'writing-mode', 'x', 'x-height', 'x1', 'x2', 'xChannelSelector', 'y', 'y1', 'y2', 'yChannelSelector', 'z', 'zoomAndPan'],
    htmlAttributeNames = ['accept', 'acceptCharset', 'accessKey', 'action', 'allow', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap'];

},{}],33:[function(require,module,exports){
'use strict';

function combine(targetObject) {
  var sourceObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var sourceKeys = Object.keys(sourceObject);
  sourceKeys.forEach(function (sourceKey) {
    var targetProperty = targetObject[sourceKey],
        sourceProperty = sourceObject[sourceKey];
    targetObject[sourceKey] = targetObject.hasOwnProperty(sourceKey) ? "".concat(targetProperty, " ").concat(sourceProperty) : sourceProperty;
  });
}

function prune(targetObject, sourceKeys) {
  sourceKeys.forEach(function (sourceKey) {
    if (targetObject.hasOwnProperty(sourceKey)) {
      delete targetObject[sourceKey];
    }
  });
}

module.exports = {
  combine: combine,
  prune: prune
};

},{}],34:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var keyMixins = require('./mixins/key'),
    eventMixins = require('./mixins/event'),
    clickMixins = require('./mixins/click'),
    mouseMixins = require('./mixins/mouse');

var Window = /*#__PURE__*/function () {
  function Window() {
    _classCallCheck(this, Window);

    this.domElement = window; ///
  }

  _createClass(Window, [{
    key: "assign",
    value: function assign() {
      var target = this.domElement; ///

      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      Object.assign.apply(Object, [target].concat(sources));
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.domElement.innerWidth;
    } ///

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.domElement.innerHeight;
    } ///

  }, {
    key: "getScrollTop",
    value: function getScrollTop() {
      return this.domElement.pageYOffset;
    } ///

  }, {
    key: "getScrollLeft",
    value: function getScrollLeft() {
      return this.domElement.pageXOffset;
    } ///

  }, {
    key: "onResize",
    value: function onResize(handler, object) {
      var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;
      var eventTypes = 'resize';
      this.on(eventTypes, handler, object, intermediateHandler);
    }
  }, {
    key: "offResize",
    value: function offResize(handler, object) {
      var eventTypes = 'resize';
      this.off(eventTypes, handler, object);
    }
  }]);

  return Window;
}();

Object.assign(Window.prototype, keyMixins);
Object.assign(Window.prototype, eventMixins);
Object.assign(Window.prototype, clickMixins);
Object.assign(Window.prototype, mouseMixins);
module.exports = typeof window === 'undefined' ? undefined : new Window(); ///

function defaultIntermediateResizeHandler(handler, event, element) {
  var window = element,
      ///
  width = window.getWidth(),
      height = window.getHeight();
  handler.call(element, width, height, event, element);
}

},{"./mixins/click":19,"./mixins/event":20,"./mixins/key":22,"./mixins/mouse":23}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvZXhhbXBsZS5qcyIsImxpYi9leGFtcGxlL3ZpZXcuanMiLCJub2RlX21vZHVsZXMvZWFzeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2Rpdi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9zcGFuLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL2lucHV0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9pbnB1dEVsZW1lbnQvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21pc2NlbGxhbmVvdXMvYm91bmRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21pc2NlbGxhbmVvdXMvb2Zmc2V0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9jbGljay5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvZXZlbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL2pzeC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMva2V5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9tb3VzZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvcmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9zY3JvbGwuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL3N0YXRlLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3JlYWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3RleHRFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi91dGlsaXRpZXMvZG9tLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9lbGVtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi91dGlsaXRpZXMvbmFtZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi91dGlsaXRpZXMvb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBOztBQUVBOzs7O0FBRUEsTUFBTSxDQUFDLE1BQVAsQ0FBYyxNQUFkLEVBQXNCO0FBQ3BCLEVBQUEsS0FBSyxFQUFMO0FBRG9CLENBQXRCO0FBSUEsSUFBTSxJQUFJLEdBQUcsSUFBSSxVQUFKLEVBQWI7QUFFQSxJQUFJLENBQUMsT0FBTCxlQUVFLDBCQUFDLGdCQUFELE9BRkY7OztBQ1pBOzs7Ozs7O0FBRUEsSUFBTSxJQUFJLEdBQUcsU0FBUCxJQUFPLENBQUMsVUFBRDtBQUFBLHNCQUVYO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixXQUZXO0FBQUEsQ0FBYjs7ZUFVZSxJOzs7O0FDWmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDLE9BQVAsR0FBa0IsT0FBTyxNQUFQLEtBQWtCLFdBQW5CLEdBQWtDLFNBQWxDLEdBQThDLElBQUksTUFBSixFQUEvRCxDLENBQThFOztBQUU5RSxTQUFTLGdDQUFULENBQTBDLE9BQTFDLEVBQW1ELEtBQW5ELEVBQTBELE9BQTFELEVBQW1FO0FBQ2pFLE1BQU0sTUFBTSxHQUFHLE9BQWY7QUFBQSxNQUF3QjtBQUNsQixFQUFBLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUCxFQURkO0FBQUEsTUFFTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVAsRUFGZjtBQUlBLEVBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxPQUFiLEVBQXNCLEtBQXRCLEVBQTZCLE1BQTdCLEVBQXFDLEtBQXJDLEVBQTRDLE9BQTVDO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUmVhY3QsIEJvZHkgfSBmcm9tIFwiZWFzeVwiO1xuXG5pbXBvcnQgVmlldyBmcm9tIFwiLi9leGFtcGxlL3ZpZXdcIlxuXG5PYmplY3QuYXNzaWduKHdpbmRvdywge1xuICBSZWFjdFxufSk7XG5cbmNvbnN0IGJvZHkgPSBuZXcgQm9keSgpO1xuXG5ib2R5LnByZXBlbmQoXG5cbiAgPFZpZXcgLz5cblxuKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5jb25zdCBWaWV3ID0gKHByb3BlcnRpZXMpID0+XG5cbiAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3XCI+XG5cbiAgICAuLi5cblxuICA8L2Rpdj5cblxuO1xuXG5leHBvcnQgZGVmYXVsdCBWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2luZG93OiByZXF1aXJlKCcuL2xpYi93aW5kb3cnKSxcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vbGliL2RvY3VtZW50JyksXG4gIERpdjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9kaXYnKSxcbiAgU3BhbjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9zcGFuJyksXG4gIEJvZHk6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYm9keScpLFxuICBMaW5rOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2xpbmsnKSxcbiAgU2VsZWN0OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NlbGVjdCcpLFxuICBCdXR0b246IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYnV0dG9uJyksXG4gIENoZWNrYm94OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2NoZWNrYm94JyksXG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQnKSxcbiAgVGV4dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL3RleHRFbGVtZW50JyksXG4gIElucHV0OiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvaW5wdXQnKSxcbiAgVGV4dGFyZWE6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC90ZXh0YXJlYScpLFxuICBJbnB1dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudCcpLFxuICBCb3VuZHM6IHJlcXVpcmUoJy4vbGliL21pc2NlbGxhbmVvdXMvYm91bmRzJyksXG4gIE9mZnNldDogcmVxdWlyZSgnLi9saWIvbWlzY2VsbGFuZW91cy9vZmZzZXQnKSxcbiAgUmVhY3Q6IHJlcXVpcmUoJy4vbGliL3JlYWN0Jylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFNWR19OQU1FU1BBQ0VfVVJJID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFNWR19OQU1FU1BBQ0VfVVJJXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBrZXlNaXhpbnMgPSByZXF1aXJlKCcuL21peGlucy9rZXknKSxcbiAgICAgIGV2ZW50TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvbW91c2UnKTtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudDsgLy8vXG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGtleU1peGlucyk7XG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBtb3VzZU1peGlucyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpID8gdW5kZWZpbmVkIDogbmV3IERvY3VtZW50KCk7ICAvLy9cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjZWxsYW5lb3VzL2JvdW5kcycpLFxuICAgICAgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKSxcbiAgICAgIGpzeE1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2pzeCcpLFxuICAgICAga2V5TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMva2V5JyksXG4gICAgICBzdGF0ZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL3N0YXRlJyksXG4gICAgICBtb3VzZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL21vdXNlJyksXG4gICAgICBldmVudE1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2V2ZW50JyksXG4gICAgICBjbGlja01peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL2NsaWNrJyksXG4gICAgICBzY3JvbGxNaXhpbnMgPSByZXF1aXJlKCcuL21peGlucy9zY3JvbGwnKSxcbiAgICAgIHJlc2l6ZU1peGlucyA9IHJlcXVpcmUoJy4vbWl4aW5zL3Jlc2l6ZScpLFxuICAgICAgZG9tVXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvZG9tJyksXG4gICAgICBuYW1lVXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvbmFtZScpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcy9hcnJheScpLFxuICAgICAgb2JqZWN0VXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvb2JqZWN0Jyk7XG5cbmNvbnN0IHsgY29tYmluZSB9ID0gb2JqZWN0VXRpbGl0aWVzLFxuICAgICAgeyBpc1NWR1RhZ05hbWUgfSA9IG5hbWVVdGlsaXRpZXMsXG4gICAgICB7IGZpcnN0LCBhdWdtZW50IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgU1ZHX05BTUVTUEFDRV9VUkkgfSA9IGNvbnN0YW50cyxcbiAgICAgIHsgZG9tTm9kZU1hdGNoZXNTZWxlY3RvciwgZG9tRWxlbWVudEZyb21TZWxlY3RvciwgZWxlbWVudHNGcm9tRE9NRWxlbWVudHMsIGZpbHRlckRPTU5vZGVzQnlTZWxlY3RvciwgZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUgfSA9IGRvbVV0aWxpdGllcztcblxuY2xhc3MgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzOyAvLy9cbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZSh0aGlzKTsgfVxuICBcbiAgZ2V0RE9NRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50O1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHdpZHRoID0gYCR7d2lkdGh9cHhgOyAvLy9cblxuICAgIHRoaXMuc3R5bGUoJ3dpZHRoJywgd2lkdGgpO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7XG4gICAgaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDsgLy8vXG5cbiAgICB0aGlzLnN0eWxlKCdoZWlnaHQnLCBoZWlnaHQpO1xuICB9XG5cbiAgaGFzQXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIGNsZWFyQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5kb21FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIGFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0Q2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7IH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG5cbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7IH1cblxuICBoYXNDbGFzcyhjbGFzc05hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTsgfVxuXG4gIGNsZWFyQ2xhc3NlcygpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9ICcnOyB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIGFkZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hZGQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICBwcmVwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0Q2hpbGRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIGZpcnN0Q2hpbGRET01FbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgYWRkKGVsZW1lbnQpIHsgdGhpcy5hcHBlbmQoZWxlbWVudCk7IH1cblxuICByZW1vdmUoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KGRpc3BsYXlTdHlsZSA9ICdibG9jaycpIHsgdGhpcy5kaXNwbGF5KGRpc3BsYXlTdHlsZSk7IH1cblxuICBoaWRlKCkgeyB0aGlzLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTsgfVxuXG4gIGRpc3BsYXkoZGlzcGxheSkgeyB0aGlzLnN0eWxlKCdkaXNwbGF5JywgZGlzcGxheSk7IH1cblxuICBlbmFibGUoKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IH1cblxuICBkaXNhYmxlKCkgeyB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTsgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICAgIGVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICByZXR1cm4gZW5hYmxlZDtcbiAgfVxuXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIHJldHVybiBkaXNhYmxlZDtcbiAgfVxuICBcbiAgaXNEaXNwbGF5ZWQoKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMuc3R5bGUoJ2Rpc3BsYXknKSxcbiAgICAgICAgICBkaXNwbGF5ZWQgPSAoZGlzcGxheSAhPT0gJ25vbmUnKTtcbiAgICBcbiAgICByZXR1cm4gZGlzcGxheWVkO1xuICB9XG5cbiAgaXNTaG93aW5nKCkge1xuICAgIGNvbnN0IGRpc3BsYXllZCA9IHRoaXMuaXNEaXNwbGF5ZWQoKSxcbiAgICAgICAgICBzaG93aW5nID0gZGlzcGxheWVkOyAgLy8vXG5cbiAgICByZXR1cm4gc2hvd2luZztcbiAgfVxuXG4gIGlzSGlkZGVuKCkge1xuICAgIGNvbnN0IGRpc3BsYXllZCA9IHRoaXMuaXNEaXNwbGF5ZWQoKSxcbiAgICAgICAgICBoaWRkZW4gPSAhZGlzcGxheWVkO1xuXG4gICAgcmV0dXJuIGhpZGRlbjtcbiAgfVxuXG4gIHN0eWxlKG5hbWUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdHlsZSA9IHRoaXMuZG9tRWxlbWVudC5zdHlsZVtuYW1lXTtcblxuICAgICAgcmV0dXJuIHN0eWxlO1xuICAgIH1cbiAgfVxuXG4gIGh0bWwoaHRtbCkge1xuICAgIGlmIChodG1sID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlubmVySFRNTCA9IHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgIGh0bWwgPSBpbm5lckhUTUw7IC8vL1xuXG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gaHRtbDsgLy8vXG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBjc3MoY3NzKSB7XG4gICAgaWYgKGNzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgY3NzID0ge307XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21wdXRlZFN0eWxlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gY29tcHV0ZWRTdHlsZVswXSwgIC8vL1xuICAgICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgICAgY3NzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY3NzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IG5hbWUgPSBjc3M7IC8vL1xuXG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICBjc3MgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKGNzcyk7IC8vL1xuXG4gICAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3NzW25hbWVdO1xuXG4gICAgICAgIHRoaXMuc3R5bGUobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICBibHVyKCkgeyB0aGlzLmRvbUVsZW1lbnQuYmx1cigpOyB9XG5cbiAgZm9jdXMoKSB7IHRoaXMuZG9tRWxlbWVudC5mb2N1cygpOyB9XG5cbiAgaGFzRm9jdXMoKSB7XG4gICAgY29uc3QgZm9jdXMgPSAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5kb21FbGVtZW50KTsgIC8vL1xuXG4gICAgcmV0dXJuIGZvY3VzO1xuICB9XG5cbiAgZ2V0RGVzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgZG9tTm9kZSA9IHRoaXMuZG9tRWxlbWVudCwgIC8vL1xuICAgICAgICAgIGRlc2NlbmRhbnRET01Ob2RlcyA9IGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUpLFxuICAgICAgICAgIGRlc2NlbmRhbnRET01FbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzQnlTZWxlY3RvcihkZXNjZW5kYW50RE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBkZXNjZW5kYW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhkZXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGRlc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldENoaWxkRWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBjaGlsZERPTU5vZGVzID0gdGhpcy5kb21FbGVtZW50LmNoaWxkTm9kZXMsXG4gICAgICAgICAgY2hpbGRET01FbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzQnlTZWxlY3RvcihjaGlsZERPTU5vZGVzLCBzZWxlY3RvciksXG4gICAgICAgICAgY2hpbGRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGNoaWxkRE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBnZXRQYXJlbnRFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHBhcmVudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChwYXJlbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnRzID0gW3BhcmVudERPTUVsZW1lbnRdLFxuICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKHBhcmVudERPTUVsZW1lbnRzKSxcbiAgICAgICAgICAgICAgZmlyc3RQYXJlbnRFbGVtZW50ID0gZmlyc3QocGFyZW50RWxlbWVudHMpO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBmaXJzdFBhcmVudEVsZW1lbnQgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIGdldEFzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgYXNjZW5kYW50RE9NRWxlbWVudHMgPSBbXSxcbiAgICAgICAgICBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBsZXQgYXNjZW5kYW50RE9NRWxlbWVudCA9IHBhcmVudERPTUVsZW1lbnQ7ICAvLy9cbiAgICB3aGlsZSAoYXNjZW5kYW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFzY2VuZGFudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgYXNjZW5kYW50RE9NRWxlbWVudHMucHVzaChhc2NlbmRhbnRET01FbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgYXNjZW5kYW50RE9NRWxlbWVudCA9IGFzY2VuZGFudERPTUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBhc2NlbmRhbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGFzY2VuZGFudERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBhc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldFByZXZpb3VzU2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBwcmV2aW91c1NpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50LnByZXZpb3VzU2libGluZzsgIC8vL1xuXG4gICAgaWYgKChwcmV2aW91c1NpYmxpbmdET01Ob2RlICE9PSBudWxsKSAmJiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKHByZXZpb3VzU2libGluZ0RPTU5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgcHJldmlvdXNTaWJsaW5nRWxlbWVudCA9IHByZXZpb3VzU2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nRWxlbWVudDtcbiAgfVxuXG4gIGdldE5leHRTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBuZXh0U2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgbmV4dFNpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50Lm5leHRTaWJsaW5nO1xuXG4gICAgaWYgKChuZXh0U2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IobmV4dFNpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIG5leHRTaWJsaW5nRWxlbWVudCA9IG5leHRTaWJsaW5nRE9NTm9kZS5fX2VsZW1lbnRfXyB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGRlZXAgPSB0cnVlLFxuICAgICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQuY2xvbmVOb2RlKGRlZXApO1xuXG4gICAgcmV0dXJuIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBvdXRlckRPTUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIG91dGVyRE9NRWxlbWVudC5pbm5lckhUTUwgPSBodG1sOyAgLy8vXG5cbiAgICBjb25zdCBkb21FbGVtZW50ID0gb3V0ZXJET01FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICByZXR1cm4gZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IENsYXNzLnRhZ05hbWUsXG4gICAgICAgICAgZWxlbWVudCA9IGZyb21UYWdOYW1lKENsYXNzLCB0YWdOYW1lLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpLFxuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpO1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21UYWdOYW1lKHRhZ05hbWUsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBmcm9tVGFnTmFtZShFbGVtZW50LCB0YWdOYW1lLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0ge30sIC8vL1xuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gW107IC8vL1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGpzeE1peGlucyk7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBrZXlNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgc3RhdGVNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgbW91c2VNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgY2xpY2tNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgc2Nyb2xsTWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIHJlc2l6ZU1peGlucyk7XG5cbk9iamVjdC5hc3NpZ24oRWxlbWVudCwge1xuICBMRUZUX01PVVNFX0JVVFRPTjogMCxcbiAgUklHSFRfTU9VU0VfQlVUVE9OOiAyLFxuICBNSURETEVfTU9VU0VfQlVUVE9OOiAxXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50O1xuXG5mdW5jdGlvbiBmcm9tVGFnTmFtZShDbGFzcywgdGFnTmFtZSwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBpc1NWR1RhZ05hbWUodGFnTmFtZSkgP1xuICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoU1ZHX05BTUVTUEFDRV9VUkksIHRhZ05hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuXG4gIHJldHVybiBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcblxuICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5jYWxsKENsYXNzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpKTtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MsIGRlZmF1bHRQcm9wZXJ0aWVzID0ge30pIHtcbiAgaWYgKENsYXNzLmhhc093blByb3BlcnR5KCdkZWZhdWx0UHJvcGVydGllcycpKSB7XG4gICAgY29tYmluZShkZWZhdWx0UHJvcGVydGllcywgQ2xhc3MuZGVmYXVsdFByb3BlcnRpZXMpO1xuICB9XG5cbiAgY29uc3Qgc3VwZXJDbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihDbGFzcyk7XG5cbiAgaWYgKHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhzdXBlckNsYXNzLCBkZWZhdWx0UHJvcGVydGllcyk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdFByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGlnbm9yZWRQcm9wZXJ0aWVzRnJvbUNsYXNzKENsYXNzLCBpZ25vcmVkUHJvcGVydGllcyA9IFtdKSB7XG4gIGlmIChDbGFzcy5oYXNPd25Qcm9wZXJ0eSgnaWdub3JlZFByb3BlcnRpZXMnKSkge1xuICAgIGF1Z21lbnQoaWdub3JlZFByb3BlcnRpZXMsIENsYXNzLmlnbm9yZWRQcm9wZXJ0aWVzLCBmdW5jdGlvbihpZ25vcmVkUHJvcGVydHkpIHtcbiAgICAgIHJldHVybiAhaWdub3JlZFByb3BlcnRpZXMuaW5jbHVkZXMoaWdub3JlZFByb3BlcnR5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IHN1cGVyQ2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3MpO1xuXG4gIGlmIChzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3Moc3VwZXJDbGFzcywgaWdub3JlZFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmV0dXJuIGlnbm9yZWRQcm9wZXJ0aWVzO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2JvZHknKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBCb2R5LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQm9keSwgZWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCb2R5LCBodG1sKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJvZHksIGRvbUVsZW1lbnQpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQm9keSwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihCb2R5LCB7XG4gIHRhZ05hbWU6ICdib2R5J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9keTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNsaWNrSGFuZGxlcikgeyByZXR1cm4gQnV0dG9uLmNsb25lKHRoaXMsIGNsaWNrSGFuZGxlcik7IH1cblxuICBvbkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIub25DbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0KSB7XG4gICAgc3VwZXIub2ZmQ2xpY2soY2xpY2tIYW5kbGVyLCBvYmplY3QpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShCdXR0b24sIGVsZW1lbnQsIGNsaWNrSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2xpY2tIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKEJ1dHRvbiwgaHRtbCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQnV0dG9uLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljaywgLy8vXG4gICAgICAgICAgYnV0dG9uID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGNsaWNrSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBidXR0b24gfSA9IGV2ZW50LFxuXHRcdFx0XHRtb3VzZUJ1dHRvbiA9IGJ1dHRvbjtcdC8vL1xuICBcbiAgY2xpY2tIYW5kbGVyLmNhbGwoZWxlbWVudCwgbW91c2VCdXR0b24sIGV2ZW50LCBlbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY2hlY2tlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNoZWNrKGNoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIENoZWNrYm94LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjbGljaycsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7ICAvLy9cbiAgfVxuICBcbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCk7ICAvLy9cbiAgfVxuXG4gIGNoZWNrKGNoZWNrZWQgPSB0cnVlKSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xuXG4gICAgZG9tRWxlbWVudC5jaGVja2VkID0gY2hlY2tlZDtcbiAgfVxuXG4gIGlzQ2hlY2tlZCgpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXG4gICAgICAgIGNoZWNrZWQgPSBkb21FbGVtZW50LmNoZWNrZWQ7XG5cbiAgICByZXR1cm4gY2hlY2tlZDtcbiAgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmNsb25lKENoZWNrYm94LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKENoZWNrYm94LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KENoZWNrYm94LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgY2hlY2tlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vLyAgICBcbiAgICAgICAgICBjaGVja2JveCA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2hlY2tib3gsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpO1xuICAgIFxuICAgIHJldHVybiBjaGVja2JveDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKENoZWNrYm94LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJyxcbiAgICAnY2hlY2tlZCdcbiAgXSxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICB0eXBlOiAnY2hlY2tib3gnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihjaGFuZ2VIYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xuICBjb25zdCBjaGVja2JveCA9IGVsZW1lbnQsIC8vL1xuICAgICAgICBjaGVja2VkID0gY2hlY2tib3guaXNDaGVja2VkKCk7XG4gIFxuICBjaGFuZ2VIYW5kbGVyLmNhbGwoZWxlbWVudCwgY2hlY2tlZCwgZXZlbnQsIGVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBEaXYgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIERpdi5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmNsb25lKERpdiwgZWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoRGl2LCBkb21FbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKERpdiwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXYsIHtcbiAgdGFnTmFtZTogJ2Rpdidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpdjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgTGluayBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIExpbmsuY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soY2xpY2tIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNsaWNrSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjbGljaycsIGNsaWNrSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGNsaWNrSGFuZGxlciwgb2JqZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoTGluaywgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoTGluaywgZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2ssIC8vL1xuICAgICAgICAgIGxpbmsgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKExpbmssIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihMaW5rLCB7XG4gIHRhZ05hbWU6ICdhJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihjbGlja0hhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IGxpbmsgPSBlbGVtZW50LCAvLy9cbiAgICAgICAgaHJlZkF0dHJpYnV0ZSA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgIGhyZWYgPSBocmVmQXR0cmlidXRlOyAvLy9cbiAgXG4gIGNsaWNrSGFuZGxlci5jYWxsKGVsZW1lbnQsIGhyZWYsIGV2ZW50LCBlbGVtZW50KTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIFNlbGVjdCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gU2VsZWN0LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QpO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCksXG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IGRvbUVsZW1lbnQudmFsdWU7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkT3B0aW9uQnlWYWx1ZShzZWxlY3RlZE9wdGlvblZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlLCAgLy8vXG4gICAgICAgICAgZG9tRWxlbWVudCA9IHRoaXMuZ2V0RE9NRWxlbWVudCgpO1xuICAgIFxuICAgIGRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgXG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5jbG9uZShTZWxlY3QsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoU2VsZWN0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KFNlbGVjdCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cbiAgICAgICAgICBzZWxlY3QgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFNlbGVjdCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIHNlbGVjdDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFNlbGVjdCwge1xuICB0YWdOYW1lOiAnc2VsZWN0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3Qgc2VsZWN0ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIHNlbGVjdGVkT3B0aW9uVmFsdWUgPSBzZWxlY3QuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpO1xuICBcbiAgY2hhbmdlSGFuZGxlci5jYWxsKGVsZW1lbnQsIHNlbGVjdGVkT3B0aW9uVmFsdWUsIGV2ZW50LCBlbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjbG9uZSgpIHsgcmV0dXJuIFNwYW4uY2xvbmUodGhpcyk7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZShTcGFuLCBlbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU3BhbiwgZG9tRWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKFNwYW4sIHtcbiAgdGFnTmFtZTogJ3NwYW4nXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25SZXNpemUoKSB7fVxuXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vbignY2hhbmdlJywgY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG5cbiAgZ2V0U2VsZWN0aW9uU3RhcnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBpc1JlYWRPbmx5KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnJlYWRPbmx5OyB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cblxuICBzZXRTZWxlY3Rpb25TdGFydChzZWxlY3Rpb25TdGFydCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDsgfVxuXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7IHRoaXMuZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyB9XG5cbiAgc2VsZWN0KCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0KCk7IH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihJbnB1dEVsZW1lbnQsIHtcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RWxlbWVudDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIHZhbHVlID0gaW5wdXRFbGVtZW50LmdldFZhbHVlKCk7XG4gIFxuICBjaGFuZ2VIYW5kbGVyLmNhbGwoZWxlbWVudCwgdmFsdWUsIGV2ZW50LCBlbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW5wdXRFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW5wdXRFbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXQuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKElucHV0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbUhUTUwoSW5wdXQsIGh0bWwsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChJbnB1dCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBUZXh0YXJlYS5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoVGV4dGFyZWEsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChUZXh0YXJlYSwgaHRtbCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KFRleHRhcmVhLCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVGV4dGFyZWEsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oVGV4dGFyZWEsIHtcbiAgdGFnTmFtZTogJ3RleHRhcmVhJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dGFyZWE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJvdW5kcyB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgZ2V0VG9wKCkge1xuICAgIHJldHVybiB0aGlzLnRvcDtcbiAgfVxuXG4gIGdldExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxuXG4gIGdldEJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3R0b207XG4gIH1cblxuICBnZXRSaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodDtcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5yaWdodCAtIHRoaXMubGVmdDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmJvdHRvbSAtIHRoaXMudG9wO1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuICBcbiAgc2V0VG9wKHRvcCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICB9XG5cbiAgc2V0TGVmdChsZWZ0KSB7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIHNldEJvdHRvbShib3R0b20pIHtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgfVxuXG4gIHNldFJpZ2h0KHJpZ2h0KSB7XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgc2hpZnQoaG9yaXpvbnRhbE9mZnNldCwgdmVydGljYWxPZmZzZXQpIHtcbiAgICB0aGlzLnRvcCArPSB2ZXJ0aWNhbE9mZnNldDtcbiAgICB0aGlzLmxlZnQgKz0gaG9yaXpvbnRhbE9mZnNldDtcbiAgICB0aGlzLmJvdHRvbSArPSB2ZXJ0aWNhbE9mZnNldDtcbiAgICB0aGlzLnJpZ2h0ICs9IGhvcml6b250YWxPZmZzZXQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcClcbiAgICAgICAgICAgJiYgKHRoaXMubGVmdCA8IG1vdXNlTGVmdClcbiAgICAgICAgICAgJiYgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApXG4gICAgICAgICAgICYmICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKVxuICAgICAgICAgICAmJiAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KVxuICAgICAgICAgICAmJiAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKVxuICAgICAgICAgICAmJiAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCwgLy8vXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCwgIC8vL1xuICAgICAgICAgIHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3R0b20gPSBib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIHJpZ2h0ID0gYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3VuZHMgPSBuZXcgQm91bmRzKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Ub3BMZWZ0V2lkdGhBbmRIZWlnaHQodG9wLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgY29uc3QgYm90dG9tID0gdG9wICsgaGVpZ2h0LFxuICAgICAgICAgIHJpZ2h0ID0gbGVmdCArIHdpZHRoLFxuICAgICAgICAgIGJvdW5kcyA9IG5ldyBCb3VuZHModG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIE9mZnNldCB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2Zmc2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbkNsaWNrKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZDbGljayhoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdjbGljaycsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbkNsaWNrLFxuICBvZmZDbGlja1xufTtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBwYWdlWSwgcGFnZVgsIGJ1dHRvbiB9ID0gZXZlbnQsXG5cdFx0XHRcdG1vdXNlVG9wID0gcGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGJ1dHRvbjsgLy8vXG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgbW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIGV2ZW50LCBlbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb24oZXZlbnRUeXBlcywgaGFuZGxlciwgZWxlbWVudCA9IHRoaXMsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBudWxsKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG4gICAgY29uc3QgZXZlbnRMaXN0ZW5lciA9IHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xuICAgIFxuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvZmYoZXZlbnRUeXBlcywgaGFuZGxlciwgZWxlbWVudCA9IHRoaXMpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uLFxuICBvZmYsXG4gIGFkZEV2ZW50TGlzdGVuZXIsXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXJcbn07XG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgnZXZlbnRMaXN0ZW5lcnMnKSkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgfVxuICBcbiAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBldmVudExpc3RlbmVyID0gY3JlYXRlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xuXG4gIGV2ZW50TGlzdGVuZXJzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gdGhpcy5ldmVudExpc3RlbmVycyxcbiAgICAgICAgZXZlbnRMaXN0ZW5lciA9IGZpbmRFdmVudExpc3RlbmVyKGV2ZW50TGlzdGVuZXJzLCBldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpLFxuICAgICAgICBpbmRleCA9IGV2ZW50TGlzdGVuZXJzLmluZGV4T2YoZXZlbnRMaXN0ZW5lciksXG4gICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gIGV2ZW50TGlzdGVuZXJzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuXG4gIGlmIChldmVudExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVycztcbiAgfVxuICBcbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIGxldCBldmVudExpc3RlbmVyO1xuXG4gIGlmIChpbnRlcm1lZGlhdGVIYW5kbGVyID09PSBudWxsKSB7XG4gICAgZXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBldmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5hc3NpZ24oZXZlbnRMaXN0ZW5lciwge1xuICAgIGV2ZW50VHlwZSxcbiAgICBoYW5kbGVyLFxuICAgIGVsZW1lbnRcbiAgfSk7XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmZ1bmN0aW9uIGZpbmRFdmVudExpc3RlbmVyKGV2ZW50TGlzdGVuZXJzLCBldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lciA9IGV2ZW50TGlzdGVuZXJzLmZpbmQoZnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikge1xuICAgIGlmICggKGV2ZW50TGlzdGVuZXIuZXZlbnRUeXBlID09PSBldmVudFR5cGUpICYmIChldmVudExpc3RlbmVyLmVsZW1lbnQgPT09IGVsZW1lbnQpICYmIChldmVudExpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIpICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMnKSxcbiAgICAgIG5hbWVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvbmFtZScpLFxuICAgICAgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKSxcbiAgICAgIG9iamVjdFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9vYmplY3QnKSxcbiAgICAgIGVsZW1lbnRzVXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2VsZW1lbnRzJyk7XG5cbmNvbnN0IHsgY29tYmluZSwgcHJ1bmUgfSA9IG9iamVjdFV0aWxpdGllcyxcbiAgICAgIHsgZmlyc3QsIGd1YXJhbnRlZSB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IFNWR19OQU1FU1BBQ0VfVVJJIH0gPSBjb25zdGFudHMsXG4gICAgICB7IGlzSFRNTEF0dHJpYnV0ZU5hbWUsIGlzU1ZHQXR0cmlidXRlTmFtZSB9ID0gbmFtZVV0aWxpdGllcyxcbiAgICAgIHsgcmVtb3ZlRmFsc2V5RWxlbWVudHMsIHJlcGxhY2VTdHJpbmdzV2l0aFRleHRFbGVtZW50cyB9ID0gZWxlbWVudHNVdGlsaXRpZXM7XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzID0ge30sIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcykge1xuICBjb21iaW5lKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyh0aGlzLCBwcm9wZXJ0aWVzKSB8fCBwcm9wZXJ0aWVzLmNoaWxkRWxlbWVudHM7ICAvLy9cblxuICBwcnVuZShwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgY29uc3Qgc3ZnID0gKHRoaXMuZG9tRWxlbWVudC5uYW1lc3BhY2VVUkkgPT09IFNWR19OQU1FU1BBQ0VfVVJJKSwgLy8vXG4gICAgICAgIG5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7ICAvLy9cblxuICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xuXG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKGlzSGFuZGxlck5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEhhbmRsZXIodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNBdHRyaWJ1dGVOYW1lKG5hbWUsIHN2ZykpIHtcbiAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgncHJvcGVydGllcycpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNvbnRleHQgPSB7fTtcblxuICBjaGlsZEVsZW1lbnRzLmZvckVhY2goKGNoaWxkRWxlbWVudCkgPT4ge1xuICAgIHVwZGF0ZUNvbnRleHQoY2hpbGRFbGVtZW50LCBjb250ZXh0KTtcblxuICAgIGNoaWxkRWxlbWVudC5hZGRUbyh0aGlzKTtcbiAgfSk7XG5cbiAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgY29udGV4dFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydGllcygpIHtcbiAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgcmV0dXJuIHRoaXMuY29udGV4dDtcbn1cblxuZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICBjb25zdCBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaXJzdEFyZ3VtZW50ID0gZmlyc3QoYXJndW1lbnRzKTtcblxuICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gIH1cblxuICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRleHRbbmFtZV0sXG4gICAgICAgICAgcHJvcGVydHlOYW1lID0gbmFtZSwgIC8vL1xuICAgICAgICAgIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICB9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvcik7XG5cbiAgICBpZiAodGhlbkRlbGV0ZSkge1xuICAgICAgZGVsZXRlIHRoaXMuY29udGV4dFtuYW1lXTtcbiAgICB9XG4gIH0sIFtdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcGx5UHJvcGVydGllcyxcbiAgZ2V0UHJvcGVydGllcyxcbiAgZ2V0Q29udGV4dCxcbiAgYXNzaWduQ29udGV4dFxufTtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gbnVsbDtcblxuICBpZiAodHlwZW9mIGVsZW1lbnQuY2hpbGRFbGVtZW50cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNoaWxkRWxlbWVudHMgPSBlbGVtZW50LmNoaWxkRWxlbWVudHMocHJvcGVydGllcyk7XG5cbiAgICBjaGlsZEVsZW1lbnRzID0gZ3VhcmFudGVlKGNoaWxkRWxlbWVudHMpO1xuXG4gICAgY2hpbGRFbGVtZW50cyA9IHJlbW92ZUZhbHNleUVsZW1lbnRzKGNoaWxkRWxlbWVudHMpO1xuXG4gICAgY2hpbGRFbGVtZW50cyA9IHJlcGxhY2VTdHJpbmdzV2l0aFRleHRFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcbiAgfVxuXG4gIHJldHVybiBjaGlsZEVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb250ZXh0KGNoaWxkRWxlbWVudCwgY29udGV4dCkge1xuICBjb25zdCBwYXJlbnRDb250ZXh0ID0gKHR5cGVvZiBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY29udGV4dDsgLy8vXG5cbiAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwYXJlbnRDb250ZXh0KTtcblxuICBkZWxldGUgY2hpbGRFbGVtZW50LmNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgIG5hbWUgPSAnY2xhc3MnO1xuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdodG1sRm9yJykge1xuICAgIG5hbWUgPSAnZm9yJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBuYW1lOyAvLy9cblxuICAgICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYW5kbGVyTmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lLm1hdGNoKC9eb24vKTtcbn1cblxuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lKG5hbWUsIHN2Zykge1xuICByZXR1cm4gc3ZnID8gaXNTVkdBdHRyaWJ1dGVOYW1lKG5hbWUpIDogaXNIVE1MQXR0cmlidXRlTmFtZShuYW1lKVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbktleVVwKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdrZXl1cCcsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvbktleURvd24oaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ2tleWRvd24nLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmS2V5VXAoaGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZigna2V5dXAnLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBvZmZLZXlEb3duKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ2tleWRvd24nLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25LZXlVcCxcbiAgb25LZXlEb3duLFxuICBvZmZLZXlVcCxcbiAgb2ZmS2V5RG93blxufTtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3QgeyBrZXlDb2RlIH0gPSBldmVudDtcbiAgXG4gIGhhbmRsZXIuY2FsbChlbGVtZW50LCBrZXlDb2RlLCBldmVudCwgZWxlbWVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2V1cCcsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2Vkb3duJywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VPdmVyKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdtb3VzZW92ZXInLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU91dChoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2VvdXQnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlbW92ZScsIGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZNb3VzZVVwKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ21vdXNldXAnLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZURvd24oaGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZignbW91c2Vkb3duJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VPdmVyKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ21vdXNlb3ZlcicsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3V0KGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ21vdXNlb3V0JywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VNb3ZlKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ21vdXNlbW92ZScsIGhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvbk1vdXNlVXAsXG4gIG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3ZlcixcbiAgb25Nb3VzZU91dCxcbiAgb25Nb3VzZU1vdmUsXG4gIG9mZk1vdXNlVXAsXG4gIG9mZk1vdXNlRG93bixcbiAgb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dCxcbiAgb2ZmTW91c2VNb3ZlXG59O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgZWxlbWVudCkge1xuICBjb25zdCB7IHBhZ2VZLCBwYWdlWCwgYnV0dG9uIH0gPSBldmVudCxcblx0XHRcdFx0bW91c2VUb3AgPSBwYWdlWSwgIC8vL1xuICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWCwgLy8vXG4gICAgICAgIG1vdXNlQnV0dG9uID0gYnV0dG9uOyAvLy9cbiAgXG4gIGhhbmRsZXIuY2FsbChlbGVtZW50LCBtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbiwgZXZlbnQsIGVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblJlc2l6ZShoYW5kbGVyLCBlbGVtZW50ID0gdGhpcywgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKSB7XG4gIGNvbnN0IHJlc2l6ZUV2ZW50TGlzdGVuZXJzID0gZmluZFJlc2l6ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpO1xuXG4gIGlmIChyZXNpemVFdmVudExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICBhZGRSZXNpemVPYmplY3QoZWxlbWVudCk7XG4gIH1cblxuICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmUmVzaXplKGhhbmRsZXIsIGVsZW1lbnQgPSB0aGlzKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXG4gIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xuXG4gIGNvbnN0IHJlc2l6ZUV2ZW50TGlzdGVuZXJzID0gZmluZFJlc2l6ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpO1xuICBcbiAgaWYgKHJlc2l6ZUV2ZW50TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25SZXNpemUsXG4gIG9mZlJlc2l6ZVxufTtcblxuZnVuY3Rpb24gYWRkUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmdldERPTUVsZW1lbnQoKSxcbiAgICAgICAgc3R5bGUgPSBgZGlzcGxheTogYmxvY2s7IFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICB0b3A6IDA7IFxuICAgICAgICAgICAgICAgICBsZWZ0OiAwOyBcbiAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7IFxuICAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyBcbiAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICAgICAgICAgICB6LWluZGV4OiAtMTtgLFxuICAgICAgICBkYXRhID0gJ2Fib3V0OmJsYW5rJyxcbiAgICAgICAgdHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIHJlc2l6ZU9iamVjdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICByZXNpemVPYmplY3QuZGF0YSA9IGRhdGE7XG4gIHJlc2l6ZU9iamVjdC50eXBlID0gdHlwZTtcblxuICBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18gPSByZXNpemVPYmplY3Q7XG5cbiAgcmVzaXplT2JqZWN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpXG4gIH07XG5cbiAgZG9tRWxlbWVudC5hcHBlbmRDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSZXNpemVPYmplY3QoZWxlbWVudCkge1xuICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5nZXRET01FbGVtZW50KCksXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVFdmVudExpc3RlbmVyKTtcblxuICBkb21FbGVtZW50LnJlbW92ZUNoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZWxlbWVudC5fX3Jlc2l6ZU9iamVjdF9fLFxuICAgICAgICByZXNpemVPYmplY3RXaW5kb3cgPSByZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3OyAgLy8vXG5cbiAgcmVzaXplT2JqZWN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCk7XG5cbiAgICByZXNpemVFdmVudExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlc2l6ZUV2ZW50TGlzdGVuZXIpe1xuICAgICAgcmVzaXplRXZlbnRMaXN0ZW5lcihldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IFtdO1xuICBcbiAgaWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2V2ZW50TGlzdGVuZXJzJykpIHtcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IGVsZW1lbnQuZXZlbnRMaXN0ZW5lcnM7ICAvLy9cblxuICAgIGV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikge1xuICAgICAgaWYgKGV2ZW50TGlzdGVuZXIuZXZlbnRUeXBlID09PSAncmVzaXplJykge1xuICAgICAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lcjtcblxuICAgICAgICByZXNpemVFdmVudExpc3RlbmVycy5wdXNoKHJlc2l6ZUV2ZW50TGlzdGVuZXIpO1xuICAgICAgfSAgICAgIFxuICAgIH0pO1xuICB9ICBcbiAgXG4gIHJldHVybiByZXNpemVFdmVudExpc3RlbmVycztcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZVJlc2l6ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIGVsZW1lbnQpIHtcbiAgY29uc3Qgd2luZG93ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIHdpZHRoID0gd2luZG93LmdldFdpZHRoKCksXG4gICAgICAgIGhlaWdodCA9IHdpbmRvdy5nZXRIZWlnaHQoKTtcblxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgZXZlbnQsIGVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblNjcm9sbChoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignc2Nyb2xsJywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZlNjcm9sbChoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdzY3JvbGwnLCBoYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XG5cbmZ1bmN0aW9uIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdDsgfVxuXG5mdW5jdGlvbiBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7IH1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsTGVmdChzY3JvbGxMZWZ0KSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDsgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb25TY3JvbGwsXG4gIG9mZlNjcm9sbCxcbiAgZ2V0U2Nyb2xsVG9wLFxuICBnZXRTY3JvbGxMZWZ0LFxuICBzZXRTY3JvbGxUb3AsXG4gIHNldFNjcm9sbExlZnRcbn07XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IHNjcm9sbFRvcCA9IGVsZW1lbnQuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgIHNjcm9sbExlZnQgPSBlbGVtZW50LmdldFNjcm9sbExlZnQoKTtcbiAgXG4gIGhhbmRsZXIuY2FsbChlbGVtZW50LCBzY3JvbGxUb3AsIHNjcm9sbExlZnQsIGV2ZW50LCBlbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlO1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVN0YXRlKHVwZGF0ZSkge1xuICBPYmplY3QuYXNzaWduKHRoaXMuc3RhdGUsIHVwZGF0ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRTdGF0ZSxcbiAgc2V0U3RhdGUsXG4gIHVwZGF0ZVN0YXRlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gICAgICBhcnJheVV0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICBlbGVtZW50c1V0aWxpdGllcyA9IHJlcXVpcmUoJy4vdXRpbGl0aWVzL2VsZW1lbnRzJyk7XG5cbmNvbnN0IHsgZmxhdHRlbiB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHJlbW92ZUZhbHNleUVsZW1lbnRzLCByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMgfSA9IGVsZW1lbnRzVXRpbGl0aWVzO1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZpcnN0QXJndW1lbnQsIHByb3BlcnRpZXMsIC4uLmNoaWxkQXJndW1lbnRzKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcblxuICBpZiAoZmlyc3RBcmd1bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tQ2hpbGRBcmd1bWVudHMoY2hpbGRBcmd1bWVudHMpO1xuXG4gICAgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2hpbGRFbGVtZW50c1xuICAgIH0sIHByb3BlcnRpZXMpO1xuXG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKGlzU3ViY2xhc3NPZihmaXJzdEFyZ3VtZW50LCBFbGVtZW50KSkge1xuICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBDbGFzcy5mcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGZpcnN0QXJndW1lbnQ7IC8vL1xuXG4gICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tVGFnTmFtZSh0YWdOYW1lLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBlbGVtZW50RnVuY3Rpb24gPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50RnVuY3Rpb24ocHJvcGVydGllcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmNvbnN0IFJlYWN0ID0ge1xuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUNoaWxkQXJndW1lbnRzKGNoaWxkQXJndW1lbnRzKSB7XG4gIGNoaWxkQXJndW1lbnRzID0gZmxhdHRlbihjaGlsZEFyZ3VtZW50cyk7IC8vL1xuXG4gIGxldCBjaGlsZEVsZW1lbnRzID0gY2hpbGRBcmd1bWVudHM7IC8vL1xuXG4gIGNoaWxkRWxlbWVudHMgPSByZW1vdmVGYWxzZXlFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcblxuICBjaGlsZEVsZW1lbnRzID0gcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzKGNoaWxkRWxlbWVudHMpO1xuXG4gIHJldHVybiBjaGlsZEVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBpc1N1YmNsYXNzT2YoYXJndW1lbnQsIENsYXNzKSB7XG4gIGxldCB0eXBlT2YgPSBmYWxzZTtcblxuICBpZiAoYXJndW1lbnQubmFtZSA9PT0gQ2xhc3MubmFtZSkgeyAvLy9cbiAgICB0eXBlT2YgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGFyZ3VtZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3VtZW50KTsgLy8vXG5cbiAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgIHR5cGVPZiA9IGlzU3ViY2xhc3NPZihhcmd1bWVudCwgQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlT2Y7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE9mZnNldCA9IHJlcXVpcmUoJy4vbWlzY2VsbGFuZW91cy9vZmZzZXQnKSxcbiAgICAgIEJvdW5kcyA9IHJlcXVpcmUoJy4vbWlzY2VsbGFuZW91cy9ib3VuZHMnKTtcblxuY2xhc3MgVGV4dEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7IC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gVGV4dEVsZW1lbnQuY2xvbmUodGhpcyk7IH1cblxuICBnZXRUZXh0KCkge1xuICAgIGNvbnN0IG5vZGVWYWx1ZSA9IHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUsXG4gICAgICAgICAgdGV4dCA9IG5vZGVWYWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHNldFRleHQodGV4dCkge1xuICAgIGNvbnN0IG5vZGVWYWx1ZSA9IHRleHQ7IC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcbiAgfVxuXG4gIGdldE9mZnNldCgpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0VG9wLCAgLy8vXG4gICAgICAgICAgbGVmdCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRMZWZ0LCAgLy8vXG4gICAgICAgICAgb2Zmc2V0ID0gbmV3IE9mZnNldCh0b3AsIGxlZnQpO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIGdldEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgYm91bmRzID0gQm91bmRzLmZyb21Cb3VuZGluZ0NsaWVudFJlY3QoYm91bmRpbmdDbGllbnRSZWN0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBnZXRXaWR0aCgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucHJlcGVuZCh0aGlzKTsgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hcHBlbmQodGhpcyk7IH1cblxuICBhZGRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYWRkKHRoaXMpOyB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucmVtb3ZlKHRoaXMpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIGluc2VydEFmdGVyKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50Lm5leHRTaWJsaW5nKTsgIC8vL1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuZnVuY3Rpb24gc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50ID0gSW5maW5pdHksIGFycmF5MiA9IFtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBbc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcnJheTJdLFxuICAgICAgIGRlbGV0ZWRJdGVtc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhcnJheTEsIGFyZ3MpO1xuXG4gIHJldHVybiBkZWxldGVkSXRlbXNBcnJheTtcbn1cblxuZnVuY3Rpb24gZmxhdHRlbihhcnJheSkge1xuICByZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGFycmF5LCBlbGVtZW50KSB7XG4gICAgYXJyYXkgPSBhcnJheS5jb25jYXQoZWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBhcnJheTtcbiAgfSwgW10pO1xufVxuXG5mdW5jdGlvbiBndWFyYW50ZWUoYXJyYXlPckVsZW1lbnQpIHtcbiAgYXJyYXlPckVsZW1lbnQgPSBhcnJheU9yRWxlbWVudCB8fCBbXTtcblxuICByZXR1cm4gKGFycmF5T3JFbGVtZW50IGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgICAgIGFycmF5T3JFbGVtZW50IDpcbiAgICAgICAgICAgICAgW2FycmF5T3JFbGVtZW50XTtcbn1cblxuZnVuY3Rpb24gYXVnbWVudChhcnJheTEsIGFycmF5MiwgdGVzdCkge1xuICBhcnJheTIuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGZpcnN0LFxuICBzcGxpY2UsXG4gIGZsYXR0ZW4sXG4gIGd1YXJhbnRlZSxcbiAgYXVnbWVudFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvYXJyYXknKTtcblxuY29uc3QgeyBzcGxpY2UgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5mdW5jdGlvbiBkb21FbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I7ICAvLy9cblxuICByZXR1cm4gZG9tRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoZG9tRWxlbWVudHMpIHtcbiAgY29uc3QgZG9tRWxlbWVudHNXaXRoRWxlbWVudHMgPSBmaWx0ZXJET01Ob2Rlcyhkb21FbGVtZW50cywgZnVuY3Rpb24oZG9tRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiAoZG9tRWxlbWVudC5fX2VsZW1lbnRfXyAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSksXG4gICAgICAgIGVsZW1lbnRzID0gZG9tRWxlbWVudHNXaXRoRWxlbWVudHMubWFwKGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5fX2VsZW1lbnRfXztcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShkb21Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMgPSBbXSkge1xuICBjb25zdCBzdGFydCA9IC0xLFxuICAgICAgICBkZWxldGVDb3VudCA9IDAsXG4gICAgICAgIGNoaWxkRE9NTm9kZXMgPSBkb21Ob2RlLmNoaWxkTm9kZXM7ICAvLy9cblxuICBzcGxpY2UoZGVzY2VuZGFudERPTU5vZGVzLCBzdGFydCwgZGVsZXRlQ291bnQsIGNoaWxkRE9NTm9kZXMpO1xuXG4gIGNoaWxkRE9NTm9kZXMuZm9yRWFjaChmdW5jdGlvbihjaGlsZERPTU5vZGUpIHtcbiAgICBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShjaGlsZERPTU5vZGUsIGRlc2NlbmRhbnRET01Ob2Rlcyk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXNjZW5kYW50RE9NTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckRPTU5vZGVzQnlTZWxlY3Rvcihkb21Ob2Rlcywgc2VsZWN0b3IpIHtcbiAgY29uc3QgZmlsdGVyZWRET01Ob2RlcyA9IGZpbHRlckRPTU5vZGVzKGRvbU5vZGVzLCBmdW5jdGlvbihkb21Ob2RlKSB7XG4gICAgcmV0dXJuIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpO1xuICB9KTtcblxuICByZXR1cm4gZmlsdGVyZWRET01Ob2Rlcztcbn1cblxuZnVuY3Rpb24gZG9tTm9kZU1hdGNoZXNTZWxlY3Rvcihkb21Ob2RlLCBzZWxlY3Rvcikge1xuICBjb25zdCBkb21Ob2RlVHlwZSA9IGRvbU5vZGUubm9kZVR5cGU7XG5cbiAgc3dpdGNoIChkb21Ob2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREUgOiB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tTm9kZTsgLy8vXG5cbiAgICAgIHJldHVybiBkb21FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGNhc2UgTm9kZS5URVhUX05PREUgOiB7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckRPTU5vZGVzKGRvbU5vZGVzLCB0ZXN0KSB7XG4gIGNvbnN0IGZpbHRlcmVkRE9NTm9kZXMgPSBbXSxcbiAgICAgICAgZG9tTm9kZXNMZW5ndGggPSBkb21Ob2Rlcy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGRvbU5vZGVzTGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZG9tTm9kZSA9IGRvbU5vZGVzW2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSB0ZXN0KGRvbU5vZGUpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgZmlsdGVyZWRET01Ob2Rlcy5wdXNoKGRvbU5vZGUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJlZERPTU5vZGVzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZG9tRWxlbWVudEZyb21TZWxlY3RvcixcbiAgZWxlbWVudHNGcm9tRE9NRWxlbWVudHMsXG4gIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlLFxuICBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IsXG4gIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IsXG4gIGZpbHRlckRPTU5vZGVzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4uL3RleHRFbGVtZW50Jyk7XG5cbmZ1bmN0aW9uIHJlbW92ZUZhbHNleUVsZW1lbnRzKGVsZW1lbnRzKSB7XG4gIGVsZW1lbnRzID0gZWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGVsZW1lbnRzLCBlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMoZWxlbWVudHMpIHtcbiAgZWxlbWVudHMgPSBlbGVtZW50cy5tYXAoZnVuY3Rpb24oZWxlbWVudCkgeyAgLy8vXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBlbGVtZW50ID0gdGV4dEVsZW1lbnQ7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICByZW1vdmVGYWxzZXlFbGVtZW50cyxcbiAgcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBpc1NWR1RhZ05hbWUodGFnTmFtZSkge1xuICByZXR1cm4gc3ZnVGFnTmFtZXMuaW5jbHVkZXModGFnTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGlzU1ZHQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIHJldHVybiBzdmdBdHRyaWJ1dGVOYW1lcy5pbmNsdWRlcyhhdHRyaWJ1dGVOYW1lKTtcbn1cblxuZnVuY3Rpb24gaXNIVE1MQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIHJldHVybiBodG1sQXR0cmlidXRlTmFtZXMuaW5jbHVkZXMoYXR0cmlidXRlTmFtZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1NWR1RhZ05hbWUsXG4gIGlzU1ZHQXR0cmlidXRlTmFtZSxcbiAgaXNIVE1MQXR0cmlidXRlTmFtZVxufTtcblxuY29uc3Qgc3ZnVGFnTmFtZXMgPSBbXG4gICAgICAgICdhbHRHbHlwaCcsICdhbmltYXRlJywgJ2FuaW1hdGVDb2xvcicsICdhbmltYXRlTW90aW9uJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnYW5pbWF0aW9uJywgJ2F1ZGlvJyxcbiAgICAgICAgJ2NpcmNsZScsICdjbGlwUGF0aCcsICdjb2xvci1wcm9maWxlJywgJ2N1cnNvcicsXG4gICAgICAgICdkZWZzJywgJ2Rlc2MnLCAnZGlzY2FyZCcsXG4gICAgICAgICdlbGxpcHNlJyxcbiAgICAgICAgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVEcm9wU2hhZG93JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZScsICdmaWx0ZXInLCAnZm9udCcsICdmb250LWZhY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2UtdXJpJywgJ2ZvcmVpZ25PYmplY3QnLFxuICAgICAgICAnZycsICdnbHlwaCcsICdnbHlwaFJlZicsXG4gICAgICAgICdoYW5kbGVyJywgJ2hhdGNoJywgJ2hhdGNocGF0aCcsICdoa2VybicsXG4gICAgICAgICdpbWFnZScsICdsaW5lJywgJ2xpbmVhckdyYWRpZW50JyxcbiAgICAgICAgJ2xpc3RlbmVyJyxcbiAgICAgICAgJ21hcmtlcicsICdtYXNrJywgJ21lc2gnLCAnbWVzaGdyYWRpZW50JywgJ21lc2hwYXRjaCcsICdtZXNocm93JywgJ21ldGFkYXRhJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAgICAgICAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncHJlZmV0Y2gnLFxuICAgICAgICAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsXG4gICAgICAgICdzY3JpcHQnLCAnc2V0JywgJ3NvbGlkY29sb3InLCAnc3RvcCcsICdzdHlsZScsICdzdmcnLCAnc3dpdGNoJywgJ3N5bWJvbCcsXG4gICAgICAgICd0YnJlYWsnLCAndGV4dCcsICd0ZXh0QXJlYScsICd0ZXh0UGF0aCcsICd0aXRsZScsICd0cmVmJywgJ3RzcGFuJyxcbiAgICAgICAgJ3Vua25vd24nLCAndXNlJyxcbiAgICAgICAgJ3ZpZGVvJywgJ3ZpZXcnLCAndmtlcm4nXG4gICAgICBdLFxuICAgICAgc3ZnQXR0cmlidXRlTmFtZXMgPSBbXG4gICAgICAgICdhY2NlbnQtaGVpZ2h0JywgJ2FjY3VtdWxhdGUnLCAnYWRkaXRpdmUnLCAnYWxpZ25tZW50LWJhc2VsaW5lJywgJ2FscGhhYmV0aWMnLCAnYW1wbGl0dWRlJywgJ2FyYWJpYy1mb3JtJywgJ2FzY2VudCcsICdhdHRyaWJ1dGVOYW1lJywgJ2F0dHJpYnV0ZVR5cGUnLCAnYXppbXV0aCcsXG4gICAgICAgICdiYW5kd2lkdGgnLCAnYmFzZUZyZXF1ZW5jeScsICdiYXNlUHJvZmlsZScsICdiYXNlbGluZS1zaGlmdCcsICdiYm94JywgJ2JlZ2luJywgJ2JpYXMnLCAnYnknLFxuICAgICAgICAnY2FsY01vZGUnLCAnY2FwLWhlaWdodCcsICdjbGlwJywgJ2NsYXNzTmFtZScsICdjbGlwLXBhdGgnLCAnY2xpcC1ydWxlJywgJ2NsaXBQYXRoVW5pdHMnLCAnY29sb3InLCAnY29sb3ItaW50ZXJwb2xhdGlvbicsICdjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnMnLCAnY29sb3ItcHJvZmlsZScsICdjb2xvci1yZW5kZXJpbmcnLCAnY29udGVudFNjcmlwdFR5cGUnLCAnY29udGVudFN0eWxlVHlwZScsICdjcm9zc29yaWdpbicsICdjdXJzb3InLCAnY3gnLCAnY3knLFxuICAgICAgICAnZCcsICdkZWZhdWx0QWN0aW9uJywgJ2Rlc2NlbnQnLCAnZGlmZnVzZUNvbnN0YW50JywgJ2RpcmVjdGlvbicsICdkaXNwbGF5JywgJ2Rpdmlzb3InLCAnZG9taW5hbnQtYmFzZWxpbmUnLCAnZG93bmxvYWQnLCAnZHVyJywgJ2R4JywgJ2R5JyxcbiAgICAgICAgJ2VkZ2VNb2RlJywgJ2VkaXRhYmxlJywgJ2VsZXZhdGlvbicsICdlbmFibGUtYmFja2dyb3VuZCcsICdlbmQnLCAnZXZlbnQnLCAnZXhwb25lbnQnLCAnZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCcsXG4gICAgICAgICdmaWxsJywgJ2ZpbGwtb3BhY2l0eScsICdmaWxsLXJ1bGUnLCAnZmlsdGVyJywgJ2ZpbHRlclJlcycsICdmaWx0ZXJVbml0cycsICdmbG9vZC1jb2xvcicsICdmbG9vZC1vcGFjaXR5JywgJ2ZvY3VzSGlnaGxpZ2h0JywgJ2ZvY3VzYWJsZScsICdmb250LWZhbWlseScsICdmb250LXNpemUnLCAnZm9udC1zaXplLWFkanVzdCcsICdmb250LXN0cmV0Y2gnLCAnZm9udC1zdHlsZScsICdmb250LXZhcmlhbnQnLCAnZm9udC13ZWlnaHQnLCAnZm9ybWF0JywgJ2ZyJywgJ2Zyb20nLCAnZngnLCAnZnknLFxuICAgICAgICAnZzEnLCAnZzInLCAnZ2x5cGgtbmFtZScsICdnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsJywgJ2dseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsJywgJ2dseXBoUmVmJywgJ2dyYWRpZW50VHJhbnNmb3JtJywgJ2dyYWRpZW50VW5pdHMnLFxuICAgICAgICAnaGFuZGxlcicsICdoYW5naW5nJywgJ2hhdGNoQ29udGVudFVuaXRzJywgJ2hhdGNoVW5pdHMnLCAnaGVpZ2h0JywgJ2hvcml6LWFkdi14JywgJ2hvcml6LW9yaWdpbi14JywgJ2hvcml6LW9yaWdpbi15JywgJ2hyZWYnLCAnaHJlZmxhbmcnLFxuICAgICAgICAnaWRlb2dyYXBoaWMnLCAnaW1hZ2UtcmVuZGVyaW5nJywgJ2luJywgJ2luMicsICdpbml0aWFsVmlzaWJpbGl0eScsICdpbnRlcmNlcHQnLFxuICAgICAgICAnaycsICdrMScsICdrMicsICdrMycsICdrNCcsICdrZXJuZWxNYXRyaXgnLCAna2VybmVsVW5pdExlbmd0aCcsICdrZXJuaW5nJywgJ2tleVBvaW50cycsICdrZXlTcGxpbmVzJywgJ2tleVRpbWVzJyxcbiAgICAgICAgJ2xlbmd0aEFkanVzdCcsICdsZXR0ZXItc3BhY2luZycsICdsaWdodGluZy1jb2xvcicsICdsaW1pdGluZ0NvbmVBbmdsZScsICdsb2NhbCcsXG4gICAgICAgICdtYXJrZXItZW5kJywgJ21hcmtlci1taWQnLCAnbWFya2VyLXN0YXJ0JywgJ21hcmtlckhlaWdodCcsICdtYXJrZXJVbml0cycsICdtYXJrZXJXaWR0aCcsICdtYXNrJywgJ21hc2tDb250ZW50VW5pdHMnLCAnbWFza1VuaXRzJywgJ21hdGhlbWF0aWNhbCcsICdtYXgnLCAnbWVkaWEnLCAnbWVkaWFDaGFyYWN0ZXJFbmNvZGluZycsICdtZWRpYUNvbnRlbnRFbmNvZGluZ3MnLCAnbWVkaWFTaXplJywgJ21lZGlhVGltZScsICdtZXRob2QnLCAnbWluJywgJ21vZGUnLFxuICAgICAgICAnbmFtZScsICduYXYtZG93bicsICduYXYtZG93bi1sZWZ0JywgJ25hdi1kb3duLXJpZ2h0JywgJ25hdi1sZWZ0JywgJ25hdi1uZXh0JywgJ25hdi1wcmV2JywgJ25hdi1yaWdodCcsICduYXYtdXAnLCAnbmF2LXVwLWxlZnQnLCAnbmF2LXVwLXJpZ2h0JywgJ251bU9jdGF2ZXMnLFxuICAgICAgICAnb2JzZXJ2ZXInLCAnb2Zmc2V0JywgJ29wYWNpdHknLCAnb3BlcmF0b3InLCAnb3JkZXInLCAnb3JpZW50JywgJ29yaWVudGF0aW9uJywgJ29yaWdpbicsICdvdmVyZmxvdycsICdvdmVybGF5JywgJ292ZXJsaW5lLXBvc2l0aW9uJywgJ292ZXJsaW5lLXRoaWNrbmVzcycsXG4gICAgICAgICdwYW5vc2UtMScsICdwYXRoJywgJ3BhdGhMZW5ndGgnLCAncGF0dGVybkNvbnRlbnRVbml0cycsICdwYXR0ZXJuVHJhbnNmb3JtJywgJ3BhdHRlcm5Vbml0cycsICdwaGFzZScsICdwaXRjaCcsICdwbGF5YmFja09yZGVyJywgJ3BsYXliYWNrb3JkZXInLCAncG9pbnRlci1ldmVudHMnLCAncG9pbnRzJywgJ3BvaW50c0F0WCcsICdwb2ludHNBdFknLCAncG9pbnRzQXRaJywgJ3ByZXNlcnZlQWxwaGEnLCAncHJlc2VydmVBc3BlY3RSYXRpbycsICdwcmltaXRpdmVVbml0cycsICdwcm9wYWdhdGUnLFxuICAgICAgICAncicsICdyYWRpdXMnLCAncmVmWCcsICdyZWZZJywgJ3JlbmRlcmluZy1pbnRlbnQnLCAncmVwZWF0Q291bnQnLCAncmVwZWF0RHVyJywgJ3JlcXVpcmVkRXh0ZW5zaW9ucycsICdyZXF1aXJlZEZlYXR1cmVzJywgJ3JlcXVpcmVkRm9udHMnLCAncmVxdWlyZWRGb3JtYXRzJywgJ3Jlc3RhcnQnLCAncmVzdWx0JywgJ3JvdGF0ZScsICdyeCcsICdyeScsXG4gICAgICAgICdzY2FsZScsICdzZWVkJywgJ3NoYXBlLXJlbmRlcmluZycsICdzaWRlJywgJ3Nsb3BlJywgJ3NuYXBzaG90VGltZScsICdzcGFjaW5nJywgJ3NwZWN1bGFyQ29uc3RhbnQnLCAnc3BlY3VsYXJFeHBvbmVudCcsICdzcHJlYWRNZXRob2QnLCAnc3JjJywgJ3N0YXJ0T2Zmc2V0JywgJ3N0ZERldmlhdGlvbicsICdzdGVtaCcsICdzdGVtdicsICdzdGl0Y2hUaWxlcycsICdzdG9wLWNvbG9yJywgJ3N0b3Atb3BhY2l0eScsICdzdHJpa2V0aHJvdWdoLXBvc2l0aW9uJywgJ3N0cmlrZXRocm91Z2gtdGhpY2tuZXNzJywgJ3N0cmluZycsICdzdHJva2UnLCAnc3Ryb2tlLWRhc2hhcnJheScsICdzdHJva2UtZGFzaG9mZnNldCcsICdzdHJva2UtbGluZWNhcCcsICdzdHJva2UtbGluZWpvaW4nLCAnc3Ryb2tlLW1pdGVybGltaXQnLCAnc3Ryb2tlLW9wYWNpdHknLCAnc3Ryb2tlLXdpZHRoJywgJ3N0eWxlJywgJ3N1cmZhY2VTY2FsZScsICdzeW5jQmVoYXZpb3InLCAnc3luY0JlaGF2aW9yRGVmYXVsdCcsICdzeW5jTWFzdGVyJywgJ3N5bmNUb2xlcmFuY2UnLCAnc3luY1RvbGVyYW5jZURlZmF1bHQnLCAnc3lzdGVtTGFuZ3VhZ2UnLFxuICAgICAgICAndGFibGVWYWx1ZXMnLCAndGFyZ2V0JywgJ3RhcmdldFgnLCAndGFyZ2V0WScsICd0ZXh0LWFuY2hvcicsICd0ZXh0LWRlY29yYXRpb24nLCAndGV4dC1yZW5kZXJpbmcnLCAndGV4dExlbmd0aCcsICd0aW1lbGluZUJlZ2luJywgJ3RpbWVsaW5lYmVnaW4nLCAndGl0bGUnLCAndG8nLCAndHJhbnNmb3JtJywgJ3RyYW5zZm9ybUJlaGF2aW9yJywgJ3R5cGUnLFxuICAgICAgICAndTEnLCAndTInLCAndW5kZXJsaW5lLXBvc2l0aW9uJywgJ3VuZGVybGluZS10aGlja25lc3MnLCAndW5pY29kZScsICd1bmljb2RlLWJpZGknLCAndW5pY29kZS1yYW5nZScsICd1bml0cy1wZXItZW0nLFxuICAgICAgICAndi1hbHBoYWJldGljJywgJ3YtaGFuZ2luZycsICd2LWlkZW9ncmFwaGljJywgJ3YtbWF0aGVtYXRpY2FsJywgJ3ZhbHVlcycsICd2ZXJzaW9uJywgJ3ZlcnQtYWR2LXknLCAndmVydC1vcmlnaW4teCcsICd2ZXJ0LW9yaWdpbi15JywgJ3ZpZXdCb3gnLCAndmlld1RhcmdldCcsICd2aXNpYmlsaXR5JyxcbiAgICAgICAgJ3dpZHRoJywgJ3dpZHRocycsICd3b3JkLXNwYWNpbmcnLCAnd3JpdGluZy1tb2RlJyxcbiAgICAgICAgJ3gnLCAneC1oZWlnaHQnLCAneDEnLCAneDInLCAneENoYW5uZWxTZWxlY3RvcicsXG4gICAgICAgICd5JywgJ3kxJywgJ3kyJywgJ3lDaGFubmVsU2VsZWN0b3InLFxuICAgICAgICAneicsICd6b29tQW5kUGFuJ1xuICAgICAgXSxcbiAgICAgIGh0bWxBdHRyaWJ1dGVOYW1lcyA9IFtcbiAgICAgICAgJ2FjY2VwdCcsICdhY2NlcHRDaGFyc2V0JywgJ2FjY2Vzc0tleScsICdhY3Rpb24nLCAnYWxsb3cnLCAnYWxsb3dGdWxsU2NyZWVuJywgJ2FsbG93VHJhbnNwYXJlbmN5JywgJ2FsdCcsICdhc3luYycsICdhdXRvQ29tcGxldGUnLCAnYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JyxcbiAgICAgICAgJ2NhcHR1cmUnLCAnY2VsbFBhZGRpbmcnLCAnY2VsbFNwYWNpbmcnLCAnY2hhbGxlbmdlJywgJ2NoYXJTZXQnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzSUQnLCAnY2xhc3NOYW1lJywgJ2NvbFNwYW4nLCAnY29scycsICdjb250ZW50JywgJ2NvbnRlbnRFZGl0YWJsZScsICdjb250ZXh0TWVudScsICdjb250cm9scycsICdjb29yZHMnLCAnY3Jvc3NPcmlnaW4nLFxuICAgICAgICAnZGF0YScsICdkYXRlVGltZScsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2RpcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLFxuICAgICAgICAnZW5jVHlwZScsXG4gICAgICAgICdmb3JtJywgJ2Zvcm1BY3Rpb24nLCAnZm9ybUVuY1R5cGUnLCAnZm9ybU1ldGhvZCcsICdmb3JtTm9WYWxpZGF0ZScsICdmb3JtVGFyZ2V0JywgJ2ZyYW1lQm9yZGVyJyxcbiAgICAgICAgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZkxhbmcnLCAnaHRtbEZvcicsICdodHRwRXF1aXYnLFxuICAgICAgICAnaWNvbicsICdpZCcsICdpbnB1dE1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzJyxcbiAgICAgICAgJ2tleVBhcmFtcycsICdrZXlUeXBlJywgJ2tpbmQnLFxuICAgICAgICAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvb3AnLCAnbG93JyxcbiAgICAgICAgJ21hbmlmZXN0JywgJ21hcmdpbkhlaWdodCcsICdtYXJnaW5XaWR0aCcsICdtYXgnLCAnbWF4TGVuZ3RoJywgJ21lZGlhJywgJ21lZGlhR3JvdXAnLCAnbWV0aG9kJywgJ21pbicsICdtaW5MZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLFxuICAgICAgICAnbmFtZScsICdub1ZhbGlkYXRlJywgJ25vbmNlJyxcbiAgICAgICAgJ29wZW4nLCAnb3B0aW11bScsXG4gICAgICAgICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3Byb2ZpbGUnLFxuICAgICAgICAncmFkaW9Hcm91cCcsICdyZWFkT25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dTcGFuJywgJ3Jvd3MnLFxuICAgICAgICAnc2FuZGJveCcsICdzY29wZScsICdzY29wZWQnLCAnc2Nyb2xsaW5nJywgJ3NlYW1sZXNzJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcGVsbENoZWNrJywgJ3NyYycsICdzcmNEb2MnLCAnc3JjTGFuZycsICdzcmNTZXQnLCAnc3RhcnQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JyxcbiAgICAgICAgJ3RhYkluZGV4JywgJ3RhcmdldCcsICd0aXRsZScsICd0eXBlJyxcbiAgICAgICAgJ3VzZU1hcCcsXG4gICAgICAgICd2YWx1ZScsXG4gICAgICAgICd3aWR0aCcsXG4gICAgICAgICd3bW9kZScsXG4gICAgICAgICd3cmFwJ1xuICAgICAgXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gY29tYmluZSh0YXJnZXRPYmplY3QsIHNvdXJjZU9iamVjdCA9IHt9KSB7XG4gIGNvbnN0IHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2VPYmplY3QpO1xuXG4gIHNvdXJjZUtleXMuZm9yRWFjaChmdW5jdGlvbihzb3VyY2VLZXkpIHtcbiAgICBjb25zdCB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldE9iamVjdFtzb3VyY2VLZXldLFxuICAgICAgICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlT2JqZWN0W3NvdXJjZUtleV07XG5cbiAgICB0YXJnZXRPYmplY3Rbc291cmNlS2V5XSA9IHRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShzb3VyY2VLZXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0YXJnZXRQcm9wZXJ0eX0gJHtzb3VyY2VQcm9wZXJ0eX1gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQcm9wZXJ0eTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHBydW5lKHRhcmdldE9iamVjdCwgc291cmNlS2V5cykge1xuICBzb3VyY2VLZXlzLmZvckVhY2goZnVuY3Rpb24oc291cmNlS2V5KSB7XG4gICAgaWYgKHRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShzb3VyY2VLZXkpKSB7XG4gICAgICBkZWxldGUgdGFyZ2V0T2JqZWN0W3NvdXJjZUtleV07XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGNvbWJpbmUsXG4gIHBydW5lXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBrZXlNaXhpbnMgPSByZXF1aXJlKCcuL21peGlucy9rZXknKSxcbiAgICAgIGV2ZW50TWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW5zID0gcmVxdWlyZSgnLi9taXhpbnMvbW91c2UnKTtcblxuY2xhc3MgV2luZG93IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gd2luZG93OyAvLy9cbiAgfVxuXG4gIGFzc2lnbiguLi5zb3VyY2VzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kb21FbGVtZW50OyAvLy9cblxuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVyV2lkdGg7IH0gLy8vXG4gIFxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIZWlnaHQ7IH0gLy8vXG5cbiAgZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VZT2Zmc2V0OyB9ICAvLy9cblxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VYT2Zmc2V0OyB9IC8vL1xuXG4gIG9uUmVzaXplKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKSB7XG4gICAgY29uc3QgZXZlbnRUeXBlcyA9ICdyZXNpemUnO1xuICAgIFxuICAgIHRoaXMub24oZXZlbnRUeXBlcywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZlJlc2l6ZShoYW5kbGVyLCBvYmplY3QpIHtcbiAgICBjb25zdCBldmVudFR5cGVzID0gJ3Jlc2l6ZSc7XG5cbiAgICB0aGlzLm9mZihldmVudFR5cGVzLCBoYW5kbGVyLCBvYmplY3QpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwga2V5TWl4aW5zKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgZXZlbnRNaXhpbnMpO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBjbGlja01peGlucyk7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIG1vdXNlTWl4aW5zKTtcblxubW9kdWxlLmV4cG9ydHMgPSAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpID8gdW5kZWZpbmVkIDogbmV3IFdpbmRvdygpOyAgLy8vXG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IHdpbmRvdyA9IGVsZW1lbnQsIC8vL1xuICAgICAgICB3aWR0aCA9IHdpbmRvdy5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSB3aW5kb3cuZ2V0SGVpZ2h0KCk7XG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgd2lkdGgsIGhlaWdodCwgZXZlbnQsIGVsZW1lbnQpO1xufVxuIl19
