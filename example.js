(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var first = _necessary.arrayUtilities.first;

var NameButton = /*#__PURE__*/function (_InputElement) {
  _inherits(NameButton, _InputElement);

  var _super = _createSuper(NameButton);

  function NameButton() {
    _classCallCheck(this, NameButton);

    return _super.apply(this, arguments);
  }

  _createClass(NameButton, [{
    key: "getName",
    value: function getName() {
      var childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

      return name;
    }
  }, {
    key: "onDoubleClick",
    value: function onDoubleClick(handler) {
      this.on("dblclick", handler);
    }
  }, {
    key: "parentContext",
    value: function parentContext() {
      var getName = this.getName.bind(this),
          onDoubleClick = this.onDoubleClick.bind(this);
      return {
        getName: getName,
        onDoubleClick: onDoubleClick
      };
    }
  }]);

  return NameButton;
}(_easy.InputElement);

exports["default"] = NameButton;

_defineProperty(NameButton, "tagName", "button");

_defineProperty(NameButton, "defaultProperties", {
  className: "name"
});

_defineProperty(NameButton, "ignoredProperties", ["name"]);

},{"easy":29,"necessary":52}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.START_DRAGGING_DELAY = exports.ESCAPE_KEYCODE = void 0;
var ESCAPE_KEYCODE = 27;
exports.ESCAPE_KEYCODE = ESCAPE_KEYCODE;
var START_DRAGGING_DELAY = 175;
exports.START_DRAGGING_DELAY = START_DRAGGING_DELAY;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

var _options = require("./options");

var _types = require("./types");

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

var first = _necessary.arrayUtilities.first,
    last = _necessary.arrayUtilities.last;

var DropTarget = /*#__PURE__*/function (_Element) {
  _inherits(DropTarget, _Element);

  var _super = _createSuper(DropTarget);

  function DropTarget(selector, dropTargets, moveHandler) {
    var _this;

    _classCallCheck(this, DropTarget);

    _this = _super.call(this, selector);
    _this.dropTargets = dropTargets;
    _this.moveHandler = moveHandler;
    return _this;
  }

  _createClass(DropTarget, [{
    key: "isOverlappingDraggableEntry",
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;
      return overlappingDraggableEntry;
    }
  }, {
    key: "getDropTargetToBeMarked",
    value: function getDropTargetToBeMarked(draggableEntry) {
      var dropTargetToBeMarked = null;
      var toBeMarked = this.isToBeMarked(draggableEntry);

      if (toBeMarked) {
        dropTargetToBeMarked = this; ///
      } else {
        this.dropTargets.some(function (dropTarget) {
          var toBeMarked = dropTarget.isToBeMarked(draggableEntry);

          if (toBeMarked) {
            dropTargetToBeMarked = dropTarget; ///

            return true;
          }
        });
      }

      return dropTargetToBeMarked;
    }
  }, {
    key: "getMarkedDropTarget",
    value: function getMarkedDropTarget() {
      var markedDropTarget = null;
      var marked = this.isMarked();

      if (marked) {
        markedDropTarget = this; ///
      } else {
        this.dropTargets.some(function (dropTarget) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;
            return true;
          }
        });
      }

      return markedDropTarget;
    }
  }, {
    key: "unmarkGlobally",
    value: function unmarkGlobally() {
      var markedDropTarget = this.getMarkedDropTarget();
      markedDropTarget.unmark();
    }
  }, {
    key: "moveDraggableEntries",
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var _this2 = this;

      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);
      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoriesOptionPresent) {
          draggableEntriesExplorer.unsetOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoriesOptionPresent) {
              draggableEntriesExplorer.setOption(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = pathMaps.find(function (pathMap) {
              var sourcePath = pathMap.sourcePath;

              if (sourcePath === draggableEntryPath) {
                return true;
              }
            }),
                _sourcePath = pathMap.sourcePath,
                _targetPath = pathMap.targetPath,
                callback = pathMap.callback;
            draggableEntry = _this2.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);

            if (callback) {
              callback(draggableEntry);
            }
          }
        });
        done();
      });
    }
  }, {
    key: "moveDraggableEntry",
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var type = draggableEntry.getType();

      switch (type) {
        case _types.FILE_NAME_TYPE:
          var fileNameDraggableEntry = draggableEntry,
              ///
          sourceFilePath = sourcePath,
              ///
          targetFilePath = targetPath;
          draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath); ///

          break;

        case _types.DIRECTORY_NAME_TYPE:
          var directoryDraggableEntry = draggableEntry,
              ///
          sourceDirectoryPath = sourcePath,
              ///
          targetDirectoryPath = targetPath; ///

          draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath); ///

          break;
      }

      return draggableEntry;
    }
  }, {
    key: "addDropTarget",
    value: function addDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.dropTargets.push(dropTarget);

      if (reciprocated) {
        dropTarget.addDropTarget(this); ///
      }
    }
  }, {
    key: "removeDropTarget",
    value: function removeDropTarget(dropTarget) {
      var reciprocated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var index = this.dropTargets.indexOf(dropTarget);

      if (index !== -1) {
        var start = index,
            ///
        deleteCount = 1;
        this.dropTargets.splice(start, deleteCount);
      }

      if (reciprocated) {
        dropTarget.removeDropTarget(this); ///
      }
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties, moveHandler) {
      for (var _len = arguments.length, remainingArguments = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        remainingArguments[_key - 3] = arguments[_key];
      }

      var dropTargets = [],
          dropTarget = _easy.Element.fromClass.apply(_easy.Element, [Class, properties, dropTargets, moveHandler].concat(remainingArguments));

      return dropTarget;
    }
  }]);

  return DropTarget;
}(_easy.Element);

exports["default"] = DropTarget;

},{"./options":16,"./types":18,"easy":29,"necessary":52}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

var _fileName = _interopRequireDefault(require("./entry/marker/fileName"));

var _fileName2 = _interopRequireDefault(require("./entry/draggable/fileName"));

var _directoryName2 = _interopRequireDefault(require("./entry/marker/directoryName"));

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var topmostDirectoryNameFromPath = _necessary.pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var Entries = /*#__PURE__*/function (_Element) {
  _inherits(Entries, _Element);

  var _super = _createSuper(Entries);

  function Entries(selector, explorer) {
    var _this;

    _classCallCheck(this, Entries);

    _this = _super.call(this, selector);
    _this.explorer = explorer;
    return _this;
  }

  _createClass(Entries, [{
    key: "getExplorer",
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: "getEntries",
    value: function getEntries() {
      var childEntryListItemElements = this.getChildElements("li.entry"),
          entries = childEntryListItemElements; ///

      return entries;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var entries = this.getEntries(),
          entriesLength = entries.length,
          empty = entriesLength === 0;
      return empty;
    }
  }, {
    key: "isMarkerEntryPresent",
    value: function isMarkerEntryPresent() {
      var markerEntry = this.findMarkerEntry(),
          markerEntryPresent = markerEntry !== null;
      return markerEntryPresent;
    }
  }, {
    key: "isDraggableEntryPresent",
    value: function isDraggableEntryPresent(name) {
      var draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = draggableEntry !== null;
      return draggableEntryPresent;
    }
  }, {
    key: "isFileNameDraggableEntryPresent",
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null;
      return fileNameDraggableEntryPresent;
    }
  }, {
    key: "isDirectoryNameDraggableEntryPresent",
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null;
      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: "addEntry",
    value: function addEntry(entry) {
      var nextEntry = entry,
          ///
      previousEntry = this.findEntry(function (entry) {
        var nextEntryBeforeEntry = nextEntry.isBefore(entry);

        if (nextEntryBeforeEntry) {
          return true;
        }
      });

      if (previousEntry === null) {
        this.append(nextEntry);
      } else {
        nextEntry.insertBefore(previousEntry);
      }
    }
  }, {
    key: "addMarkerEntry",
    value: function addMarkerEntry(markerEntryName, draggableEntryType) {
      var markerEntry;
      var name = markerEntryName,
          ///
      type = draggableEntryType; ///

      switch (type) {
        case _types.FILE_NAME_TYPE:
          var fileNameMarkerEntry = /*#__PURE__*/React.createElement(_fileName["default"], {
            name: name
          });
          markerEntry = fileNameMarkerEntry; ///

          break;

        case _types.DIRECTORY_NAME_TYPE:
          var directoryNameMarkerEntry = /*#__PURE__*/React.createElement(_directoryName2["default"], {
            name: name
          });
          markerEntry = directoryNameMarkerEntry; ///

          break;
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: "removeMarkerEntry",
    value: function removeMarkerEntry() {
      var markerEntry = this.retrieveMarkerEntry();
      markerEntry.remove();
    }
  }, {
    key: "addFileNameDraggableEntry",
    value: function addFileNameDraggableEntry(fileName) {
      var name = fileName,
          explorer = this.explorer,
          fileNameDraggableEntry = /*#__PURE__*/React.createElement(_fileName2["default"], {
        name: name,
        explorer: explorer
      }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);
      return fileNameDraggableEntry;
    }
  }, {
    key: "addDirectoryNameDraggableEntry",
    value: function addDirectoryNameDraggableEntry(directoryName, collapsed) {
      var name = directoryName,
          explorer = this.explorer,
          ///
      DirectoryNameDraggableEntry = this.explorer.getDirectoryNameDraggableEntry(),
          directoryNameDraggableEntry = /*#__PURE__*/React.createElement(DirectoryNameDraggableEntry, {
        name: name,
        collapsed: collapsed,
        explorer: explorer
      }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);
      return directoryNameDraggableEntry;
    }
  }, {
    key: "addMarker",
    value: function addMarker(markerEntryPath, draggableEntryType) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(markerEntryPath);

      if (topmostDirectoryName === null) {
        var markerEntryName = markerEntryPath; ///

        this.addMarkerEntry(markerEntryName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerEntryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerEntryPath);
        markerEntryPath = markerEntryPathWithoutTopmostDirectoryName; ///

        topmostDirectoryNameDraggableEntry.addMarker(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: "removeMarker",
    value: function removeMarker() {
      this.removeMarkerEntry();
    }
  }, {
    key: "addFilePath",
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;
      var topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (topmostDirectoryNameEntry !== null) {
        if (filePathWithoutTopmostDirectoryName !== null) {
          var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

          if (topmostDirectoryName === topmostDirectoryNameEntryName) {
            filePath = filePathWithoutTopmostDirectoryName; ///

            fileNameDraggableEntry = topmostDirectoryNameEntry.addFilePath(filePath);
          }
        }
      } else {
        if (topmostDirectoryName !== null) {
          var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

          if (topmostDirectoryNameDraggableEntry === null) {
            var collapsed = true; ///

            topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, collapsed);
          }

          var _filePath = filePathWithoutTopmostDirectoryName; ///

          fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(_filePath);
        } else {
          var fileName = filePath,
              ///
          fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);
          fileNameDraggableEntry = fileNameDraggableEntryPresent ? this.findFileNameDraggableEntry(fileName) : this.addFileNameDraggableEntry(fileName);
        }
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: "removeFilePath",
    value: function removeFilePath(filePath) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(filePath),
          filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (topmostDirectoryName !== null) {
        var directoryName = topmostDirectoryName,
            ///
        directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

        if (directoryNameDraggableEntry !== null) {
          filePath = filePathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry.removeFilePath(filePath);
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

          if (removeEmptyParentDirectoriesOptionPresent) {
            var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();

            if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
              var directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

              if (directoryNameDraggableEntryEmpty) {
                directoryNameDraggableEntry.remove();
              }
            }
          }
        }
      } else {
        var fileName = filePath,
            ///
        fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName);

        if (fileNameDraggableEntry !== null) {
          fileNameDraggableEntry.remove();
        }
      }
    }
  }, {
    key: "addDirectoryPath",
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var directoryNameDraggableEntry = null;
      var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          topmostDirectoryNameEntry = this.findTopmostDirectoryNameDraggableEntry(),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (topmostDirectoryNameEntry !== null) {
        if (directoryPathWithoutTopmostDirectoryName !== null) {
          var topmostDirectoryNameEntryName = topmostDirectoryNameEntry.getName();

          if (topmostDirectoryName === topmostDirectoryNameEntryName) {
            directoryPath = directoryPathWithoutTopmostDirectoryName; ///

            directoryNameDraggableEntry = topmostDirectoryNameEntry.addDirectoryPath(directoryPath, collapsed);
          }
        }
      } else {
        if (topmostDirectoryName !== null) {
          var topmostDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

          if (topmostDirectoryNameDraggableEntry === null) {
            var _collapsed = true; ///

            topmostDirectoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(topmostDirectoryName, _collapsed);
          }

          var _directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(_directoryPath, collapsed);
        } else {
          var directoryName = directoryPath,
              ///
          directoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);
          directoryNameDraggableEntry = directoryNameDraggableEntryPresent ? this.findDirectoryNameDraggableEntry(directoryName) : this.addDirectoryNameDraggableEntry(directoryName, collapsed);
          directoryNameDraggableEntry.setCollapsed(collapsed);
        }
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: "removeDirectoryPath",
    value: function removeDirectoryPath(directoryPath) {
      var topmostDirectoryName = topmostDirectoryNameFromPath(directoryPath),
          directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (topmostDirectoryName !== null) {
        var directoryName = topmostDirectoryName,
            ///
        directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName);

        if (directoryNameDraggableEntry !== null) {
          directoryPath = directoryPathWithoutTopmostDirectoryName; ///

          directoryNameDraggableEntry.removeDirectoryPath(directoryPath);
          var removeEmptyParentDirectoriesOptionPresent = this.explorer.isOptionPresent(_options.REMOVE_EMPTY_PARENT_DIRECTORIES);

          if (removeEmptyParentDirectoriesOptionPresent) {
            var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry();

            if (directoryNameDraggableEntry !== topmostDirectoryNameDraggableEntry) {
              var directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

              if (directoryNameDraggableEntryEmpty) {
                directoryNameDraggableEntry.remove();
              }
            }
          }
        }
      } else {
        var _directoryName = directoryPath,
            ///
        _directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(_directoryName);

        if (_directoryNameDraggableEntry !== null) {
          _directoryNameDraggableEntry.remove();
        }
      }
    }
  }, {
    key: "findMarkerEntry",
    value: function findMarkerEntry() {
      var markerEntry = this.findEntryByTypes(function (entry) {
        return true; ///
      }, _types.FILE_NAME_MARKER_TYPE, _types.DIRECTORY_NAME_MARKER_TYPE);
      return markerEntry;
    }
  }, {
    key: "findDraggableEntryPath",
    value: function findDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = null;
      this.someEntry(function (entry) {
        if (entry === draggableEntry) {
          ///
          var entryName = entry.getName();
          draggableEntryPath = entryName; ///

          return true;
        }
      });
      return draggableEntryPath;
    }
  }, {
    key: "findMarkedDirectoryNameDraggableEntry",
    value: function findMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

        if (directoryNameDraggableEntryMarked) {
          markedDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///

          return true;
        }
      });
      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "findTopmostDirectoryNameDraggableEntry",
    value: function findTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

        if (directoryNameDraggableEntryTopmost) {
          topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///

          return true;
        }
      });
      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveMarkerEntry",
    value: function retrieveMarkerEntry() {
      var markerEntry = this.findMarkerEntry();

      if (markerEntry === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          markerEntry = directoryNameDraggableEntry.retrieveMarkerEntry();

          if (markerEntry !== null) {
            return true;
          }
        });
      }

      return markerEntry;
    }
  }, {
    key: "retrieveFilePaths",
    value: function retrieveFilePaths() {
      var filePaths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath; ///

        filePaths.push(filePath);
      });
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        directoryNameDraggableEntry.retrieveFilePaths(filePaths);
      });
      return filePaths;
    }
  }, {
    key: "retrieveDirectoryPaths",
    value: function retrieveDirectoryPaths() {
      var directoryPaths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryPath = directoryNameDraggableEntryPath; ///

        directoryPaths.push(directoryPath);
        directoryNameDraggableEntry.retrieveDirectoryPaths(directoryPaths);
      });
      return directoryPaths;
    }
  }, {
    key: "retrieveDraggableEntryPath",
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = this.findDraggableEntryPath(draggableEntry);

      if (draggableEntryPath === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          draggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);

          if (draggableEntryPath !== null) {
            var directoryNameDraggableEntryName = directoryNameDraggableEntry.getName();
            draggableEntryPath = "".concat(directoryNameDraggableEntryName, "/").concat(draggableEntryPath);
            return true;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: "retrieveDraggableSubEntries",
    value: function retrieveDraggableSubEntries() {
      var subEntries = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var subEntry = fileNameDraggableEntry; ///

        subEntries.push(subEntry);
      });
      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var subEntry = directoryNameDraggableEntry; ///

        subEntries.push(subEntry);
        directoryNameDraggableEntry.retrieveDraggableSubEntries(subEntries);
      });
      return subEntries;
    }
  }, {
    key: "retrieveMarkedDirectoryNameDraggableEntry",
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = this.findMarkedDirectoryNameDraggableEntry();

      if (markedDirectoryNameDraggableEntry === null) {
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

          if (markedDirectoryNameDraggableEntry !== null) {
            return true;
          }
        });
      }

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var _this2 = this;

      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null;
      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.isOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry) {
          var dragIntoSubDirectories = true;
          var directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

          if (directoryNameDraggableEntryTopmost) {
            var noDraggingIntoSubdirectoriesOptionPresent = _this2.explorer.isOptionPresent(_options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

            if (noDraggingIntoSubdirectoriesOptionPresent) {
              dragIntoSubDirectories = false;
            }
          }

          if (dragIntoSubDirectories) {
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
          }

          if (bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry === null) {
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry; ///
          }
        }
      });
      return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: "forEachFileNameDraggableEntry",
    value: function forEachFileNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "forEachDirectoryNameDraggableEntry",
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "someFileNameDraggableEntry",
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "someDirectoryNameDraggableEntry",
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findDraggableEntry",
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, _types.FILE_NAME_TYPE, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "findFileNameDraggableEntry",
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, _types.FILE_NAME_TYPE);
    }
  }, {
    key: "findDirectoryNameDraggableEntry",
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, _types.DIRECTORY_NAME_TYPE);
    }
  }, {
    key: "forEachEntryByTypes",
    value: function forEachEntryByTypes(callback) {
      for (var _len = arguments.length, types = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        types[_key - 1] = arguments[_key];
      }

      var entries = this.getEntries();
      entries.forEach(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          callback(entry);
        }
      });
    }
  }, {
    key: "forEachEntry",
    value: function forEachEntry(callback) {
      var entries = this.getEntries();
      entries.forEach(function (entry) {
        callback(entry);
      });
    }
  }, {
    key: "someEntryByTypes",
    value: function someEntryByTypes(callback) {
      for (var _len2 = arguments.length, types = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        types[_key2 - 1] = arguments[_key2];
      }

      var entries = this.getEntries();
      return entries.some(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          var result = callback(entry);
          return result;
        }
      });
    }
  }, {
    key: "someEntry",
    value: function someEntry(callback) {
      var entries = this.getEntries();
      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: "findEntryByNameAndTypes",
    value: function findEntryByNameAndTypes(name) {
      for (var _len3 = arguments.length, types = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        types[_key3 - 1] = arguments[_key3];
      }

      var entry = this.findEntryByTypes.apply(this, [function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          return true;
        }
      }].concat(types));
      return entry;
    }
  }, {
    key: "findEntryByTypes",
    value: function findEntryByTypes(callback) {
      for (var _len4 = arguments.length, types = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        types[_key4 - 1] = arguments[_key4];
      }

      var entries = this.getEntries(),
          entry = entries.find(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          var result = callback(entry);

          if (result) {
            return true;
          }
        }
      }) || null; ///;

      return entry;
    }
  }, {
    key: "findEntryByName",
    value: function findEntryByName(name) {
      var entry = this.findEntry(function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          return true;
        }
      });
      return entry;
    }
  }, {
    key: "findEntry",
    value: function findEntry(callback) {
      var entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

      return entry;
    }
  }, {
    key: "parentContext",
    value: function parentContext() {
      var getExplorer = this.getExplorer.bind(this),
          isEmpty = this.isEmpty.bind(this),
          addMarker = this.addMarker.bind(this),
          removeMarker = this.removeMarker.bind(this),
          addFilePath = this.addFilePath.bind(this),
          removeFilePath = this.removeFilePath.bind(this),
          addDirectoryPath = this.addDirectoryPath.bind(this),
          removeDirectoryPath = this.removeDirectoryPath.bind(this),
          isMarkerEntryPresent = this.isMarkerEntryPresent.bind(this),
          isDraggableEntryPresent = this.isDraggableEntryPresent.bind(this),
          findTopmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry.bind(this),
          retrieveMarkerEntry = this.retrieveMarkerEntry.bind(this),
          retrieveFilePaths = this.retrieveFilePaths.bind(this),
          retrieveDirectoryPaths = this.retrieveDirectoryPaths.bind(this),
          retrieveDraggableEntryPath = this.retrieveDraggableEntryPath.bind(this),
          retrieveDraggableSubEntries = this.retrieveDraggableSubEntries.bind(this),
          retrieveMarkedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
          retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this);
      return {
        getExplorer: getExplorer,
        isEmpty: isEmpty,
        addMarker: addMarker,
        removeMarker: removeMarker,
        addFilePath: addFilePath,
        removeFilePath: removeFilePath,
        addDirectoryPath: addDirectoryPath,
        removeDirectoryPath: removeDirectoryPath,
        isMarkerEntryPresent: isMarkerEntryPresent,
        isDraggableEntryPresent: isDraggableEntryPresent,
        findTopmostDirectoryNameDraggableEntry: findTopmostDirectoryNameDraggableEntry,
        retrieveMarkerEntry: retrieveMarkerEntry,
        retrieveFilePaths: retrieveFilePaths,
        retrieveDirectoryPaths: retrieveDirectoryPaths,
        retrieveDraggableEntryPath: retrieveDraggableEntryPath,
        retrieveDraggableSubEntries: retrieveDraggableSubEntries,
        retrieveMarkedDirectoryNameDraggableEntry: retrieveMarkedDirectoryNameDraggableEntry,
        retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry: retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry
      };
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var explorer = properties.explorer,
          entries = _easy.Element.fromClass(Class, properties, explorer);

      return entries;
    }
  }]);

  return Entries;
}(_easy.Element);

exports["default"] = Entries;

_defineProperty(Entries, "tagName", "ul");

_defineProperty(Entries, "defaultProperties", {
  className: "entries"
});

},{"./entry/draggable/fileName":8,"./entry/marker/directoryName":10,"./entry/marker/fileName":11,"./options":16,"./types":18,"easy":29,"necessary":52}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Entry = /*#__PURE__*/function (_Element) {
  _inherits(Entry, _Element);

  var _super = _createSuper(Entry);

  function Entry(selector, type) {
    var _this;

    _classCallCheck(this, Entry);

    _this = _super.call(this, selector);
    _this.type = type;
    return _this;
  }

  _createClass(Entry, [{
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }]);

  return Entry;
}(_easy.Element);

exports["default"] = Entry;

_defineProperty(Entry, "tagName", "li");

_defineProperty(Entry, "defaultProperties", {
  className: "entry"
});

_defineProperty(Entry, "ignoredProperties", ["name"]);

},{"easy":29}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _entry = _interopRequireDefault(require("../entry"));

var _options = _interopRequireDefault(require("../options"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LEFT_MOUSE_BUTTON = _easy.constants.LEFT_MOUSE_BUTTON,
    NO_DRAGGING_SUB_ENTRIES = _options["default"].NO_DRAGGING_SUB_ENTRIES,
    ESCAPE_KEY_STOPS_DRAGGING = _options["default"].ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = /*#__PURE__*/function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  var _super = _createSuper(DraggableEntry);

  function DraggableEntry(selector, type) {
    var _this;

    _classCallCheck(this, DraggableEntry);

    _this = _super.call(this, selector, type);

    _this.setInitialState();

    return _this;
  }

  _createClass(DraggableEntry, [{
    key: "getPath",
    value: function getPath() {
      var explorer = this.getExplorer(),
          draggableEntry = this,
          ///
      path = explorer.retrieveDraggableEntryPath(draggableEntry);
      return path;
    }
  }, {
    key: "getCollapsedBounds",
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: "isDragging",
    value: function isDragging() {
      var dragging = this.hasClass("dragging");
      return dragging;
    }
  }, {
    key: "isMouseOver",
    value: function isMouseOver(mouseTop, mouseLeft) {
      var collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;
      return mouseOver;
    }
  }, {
    key: "isOverlappingCollapsedBounds",
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);
      return overlappingCollapsedBounds;
    }
  }, {
    key: "isTopmostDirectoryNameDraggableEntry",
    value: function isTopmostDirectoryNameDraggableEntry() {
      var topmostDirectoryNameDraggableEntry = false;
      var directoryNameDraggableEntry = this.isDirectoryNameDraggableEntry();

      if (directoryNameDraggableEntry) {
        var _directoryNameDraggableEntry = this,
            ///
        directoryNameDraggableEntryTopmost = _directoryNameDraggableEntry.isTopmost();

        if (directoryNameDraggableEntryTopmost) {
          topmostDirectoryNameDraggableEntry = true;
        }
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: "startDragging",
    value: function startDragging(mouseTop, mouseLeft) {
      var explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft(),
          topOffset = boundsTop - mouseTop,
          leftOffset = boundsLeft - mouseLeft;
      this.setTopOffset(topOffset);
      this.setLeftOffset(leftOffset);

      if (escapeKeyStopsDraggingOptionPresent) {
        var keyDownHandler = this.keyDownHandler.bind(this);
        this.onKeyDown(keyDownHandler);
      }

      this.addClass("dragging");
      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: "stopDragging",
    value: function stopDragging() {
      var explorer = this.getExplorer(),
          escapeKeyStopsDraggingOptionPresent = explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
        this.offKeyDown();
      }

      this.removeClass("dragging");
    }
  }, {
    key: "dragging",
    value: function dragging(mouseTop, mouseLeft) {
      var explorer = this.getExplorer();
      this.drag(mouseTop, mouseLeft);
      explorer.dragging(this);
    }
  }, {
    key: "startWaitingToDrag",
    value: function startWaitingToDrag(mouseTop, mouseLeft) {
      var _this2 = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this2.resetTimeout();

          var explorer = _this2.getExplorer(),
              topmostDirectoryNameDraggableEntry = _this2.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (topmostDirectoryNameDraggableEntry) {
            return;
          }

          if (subEntry && noDraggingSubEntriesOptionPresent) {
            return;
          }

          var mouseOver = _this2.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = explorer.startDragging(_this2);

            if (startedDragging) {
              _this2.startDragging(mouseTop, mouseLeft);
            }
          }
        }, _constants.START_DRAGGING_DELAY);
        this.setTimeout(timeout);
      }
    }
  }, {
    key: "stopWaitingToDrag",
    value: function stopWaitingToDrag() {
      var timeout = this.getTimeout();

      if (timeout !== null) {
        clearTimeout(timeout);
        this.resetTimeout();
      }
    }
  }, {
    key: "mouseDownHandler",
    value: function mouseDownHandler(event, element) {
      var button = event.button,
          pageX = event.pageX,
          pageY = event.pageY,
          mouseTop = pageY,
          mouseLeft = pageX;

      _easy.window.on("blur", this.mouseUpHandler, this); ///


      _easy.window.onMouseUp(this.mouseUpHandler, this);

      _easy.window.onMouseMove(this.mouseMoveHandler, this);

      if (button === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: "mouseUpHandler",
    value: function mouseUpHandler(event, element) {
      var _this3 = this;

      _easy.window.off("blur", this.mouseUpHandler, this); ///


      _easy.window.offMouseUp(this.mouseUpHandler, this);

      _easy.window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var explorer = this.getExplorer(),
            draggableEntry = this; ///

        explorer.stopDragging(draggableEntry, function () {
          _this3.stopDragging();
        });
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: "mouseMoveHandler",
    value: function mouseMoveHandler(event, element) {
      var pageX = event.pageX,
          pageY = event.pageY,
          mouseTop = pageY,
          mouseLeft = pageX;
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: "keyDownHandler",
    value: function keyDownHandler(event, element) {
      var keyCode = event.keyCode,
          escapeKey = keyCode === _constants.ESCAPE_KEYCODE;

      if (escapeKey) {
        var dragging = this.isDragging();

        if (dragging) {
          var explorer = this.getExplorer();
          explorer.escapeDragging();
          this.stopDragging();
        }
      }
    }
  }, {
    key: "drag",
    value: function drag(mouseTop, mouseLeft) {
      var windowScrollTop = _easy.window.getScrollTop(),
          windowScrollLeft = _easy.window.getScrollLeft(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();

      var top = mouseTop + topOffset - windowScrollTop,
          left = mouseLeft + leftOffset - windowScrollLeft;
      top = "".concat(top, "px"); ///

      left = "".concat(left, "px"); ///

      var css = {
        top: top,
        left: left
      };
      this.css(css);
      var explorer = this.getExplorer();
      explorer.dragging(this);
    }
  }, {
    key: "resetTimeout",
    value: function resetTimeout() {
      var timeout = null;
      this.setTimeout(timeout);
    }
  }, {
    key: "getTimeout",
    value: function getTimeout() {
      var state = this.getState(),
          timeout = state.timeout;
      return timeout;
    }
  }, {
    key: "getTopOffset",
    value: function getTopOffset() {
      var state = this.getState(),
          topOffset = state.topOffset;
      return topOffset;
    }
  }, {
    key: "getLeftOffset",
    value: function getLeftOffset() {
      var state = this.getState(),
          leftOffset = state.leftOffset;
      return leftOffset;
    }
  }, {
    key: "setTimeout",
    value: function setTimeout(timeout) {
      this.updateState({
        timeout: timeout
      });
    }
  }, {
    key: "setTopOffset",
    value: function setTopOffset(topOffset) {
      this.updateState({
        topOffset: topOffset
      });
    }
  }, {
    key: "setLeftOffset",
    value: function setLeftOffset(leftOffset) {
      this.updateState({
        leftOffset: leftOffset
      });
    }
  }, {
    key: "setInitialState",
    value: function setInitialState() {
      var timeout = null,
          topOffset = null,
          leftOffset = null;
      this.setState({
        timeout: timeout,
        topOffset: topOffset,
        leftOffset: leftOffset
      });
    }
  }, {
    key: "initialise",
    value: function initialise(properties) {
      this.assignContext();
      var mouseDownHandler = this.mouseDownHandler.bind(this),
          doubleClickHandler = this.doubleClickHandler.bind(this);
      this.onMouseDown(mouseDownHandler);
      this.onDoubleClick(doubleClickHandler);
    }
  }]);

  return DraggableEntry;
}(_entry["default"]);

exports["default"] = DraggableEntry;

_defineProperty(DraggableEntry, "tagName", "li");

_defineProperty(DraggableEntry, "defaultProperties", {
  className: "draggable"
});

_defineProperty(DraggableEntry, "ignoredProperties", ["explorer"]);

},{"../constants":2,"../entry":5,"../options":16,"easy":29}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _easy = require("easy");

var _necessary = require("necessary");

var _entries = _interopRequireDefault(require("../../entries"));

var _name = _interopRequireDefault(require("../../button/name"));

var _draggable = _interopRequireDefault(require("../../entry/draggable"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pathWithoutTopmostDirectoryNameFromPath = _necessary.pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var DirectoryNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(DirectoryNameDraggableEntry);

  function DirectoryNameDraggableEntry() {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    return _super.apply(this, arguments);
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: "getCollapsedBounds",
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();
      this.collapse();

      var bounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "getBounds", this).call(this),
          collapsedBounds = bounds; ///


      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      var collapsed = this.hasClass("collapsed");
      return collapsed;
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent; ///

      return marked;
    }
  }, {
    key: "isBefore",
    value: function isBefore(entry) {
      var before;
      var entryType = entry.getType();

      switch (entryType) {
        case _types.FILE_NAME_TYPE:
        case _types.FILE_NAME_MARKER_TYPE:
        case _types.DIRECTORY_NAME_MARKER_TYPE:
          before = true;
          break;

        case _types.DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();
          before = name.localeCompare(entryName) < 0;
          break;
      }

      return before;
    }
  }, {
    key: "isTopmost",
    value: function isTopmost() {
      var path = this.getPath(),
          pathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(path),
          topmost = pathWithoutTopmostDirectoryName === null;
      return topmost;
    }
  }, {
    key: "isFileNameDraggableEntry",
    value: function isFileNameDraggableEntry() {
      return false;
    }
  }, {
    key: "isDirectoryNameDraggableEntry",
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: "isOverlappingDraggableEntry",
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "isOverlappingCollapsedBounds", this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: "toggleButtonClickHandler",
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: "doubleClickHandler",
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: "setCollapsed",
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.addClass("collapsed");
    }
  }, {
    key: "expand",
    value: function expand() {
      this.removeClass("collapsed");
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.toggleClass("collapsed");
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var name = properties.name,
          explorer = properties.explorer,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);
      return [/*#__PURE__*/React.createElement(_easy.Button, {
        className: "toggle",
        onClick: toggleButtonClickHandler
      }), /*#__PURE__*/React.createElement(_name["default"], null, name), /*#__PURE__*/React.createElement(_entries["default"], {
        explorer: explorer
      })];
    }
  }, {
    key: "initialise",
    value: function initialise(collapsed) {
      this.setCollapsed(collapsed);

      _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this);
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$collapsed = properties.collapsed,
          collapsed = _properties$collapsed === void 0 ? false : _properties$collapsed,
          type = _types.DIRECTORY_NAME_TYPE,
          directoryNameDraggableEntry = _draggable["default"].fromClass(Class, properties, type);

      directoryNameDraggableEntry.initialise(collapsed);
      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(_draggable["default"]);

exports["default"] = DirectoryNameDraggableEntry;

_defineProperty(DirectoryNameDraggableEntry, "defaultProperties", {
  className: "directory-name"
});

_defineProperty(DirectoryNameDraggableEntry, "ignoredProperties", ["collapsed"]);

},{"../../button/name":1,"../../entries":4,"../../entry/draggable":6,"../../types":18,"easy":29,"necessary":52}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _name = _interopRequireDefault(require("../../button/name"));

var _draggable = _interopRequireDefault(require("../../entry/draggable"));

var _name2 = require("../../utilities/name");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameDraggableEntry = /*#__PURE__*/function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  var _super = _createSuper(FileNameDraggableEntry);

  function FileNameDraggableEntry(selector, type, explorer) {
    var _this;

    _classCallCheck(this, FileNameDraggableEntry);

    _this = _super.call(this, selector, type);
    _this.explorer = explorer;
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: "getExplorer",
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: "isBefore",
    value: function isBefore(entry) {
      var before;
      var entryType = entry.getType();

      switch (entryType) {
        case _types.FILE_NAME_TYPE:
        case _types.FILE_NAME_MARKER_TYPE:
        case _types.DIRECTORY_NAME_MARKER_TYPE:
          var name = this.getName(),
              entryName = entry.getName();
          before = (0, _name2.nameIsBeforeEntryName)(name, entryName);
          break;

        case _types.DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: "isFileNameDraggableEntry",
    value: function isFileNameDraggableEntry() {
      return true;
    }
  }, {
    key: "isDirectoryNameDraggableEntry",
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: "retrieveDraggableSubEntries",
    value: function retrieveDraggableSubEntries() {
      var draggableSubEntries = []; ///

      return draggableSubEntries;
    }
  }, {
    key: "doubleClickHandler",
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var name = properties.name;
      return [/*#__PURE__*/React.createElement(_name["default"], null, name)];
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var explorer = properties.explorer,
          type = _types.FILE_NAME_TYPE,
          fileNameDraggableEntry = _draggable["default"].fromClass(Class, properties, type, explorer);

      fileNameDraggableEntry.initialise();
      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(_draggable["default"]);

exports["default"] = FileNameDraggableEntry;

_defineProperty(FileNameDraggableEntry, "defaultProperties", {
  className: "file-name"
});

},{"../../button/name":1,"../../entry/draggable":6,"../../types":18,"../../utilities/name":19}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _entry = _interopRequireDefault(require("../entry"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    key: "fromClass",
    value: function fromClass(Class, properties, type) {
      var name = properties.name,
          markerEntry = _entry["default"].fromClass(Class, properties, type, name);

      return markerEntry;
    }
  }]);

  return MarkerEntry;
}(_entry["default"]);

exports["default"] = MarkerEntry;

_defineProperty(MarkerEntry, "defaultProperties", {
  className: "marker"
});

},{"../entry":5}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _marker = _interopRequireDefault(require("../../entry/marker"));

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DirectoryNameMarkerEntry = /*#__PURE__*/function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  var _super = _createSuper(DirectoryNameMarkerEntry);

  function DirectoryNameMarkerEntry() {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    return _super.apply(this, arguments);
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: "isBefore",
    value: function isBefore(draggableEntry) {
      var before;
      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case _types.FILE_NAME_TYPE:
          before = true;
          break;

        case _types.DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = name.localeCompare(draggableEntryName) < 0;
          break;
      }

      return before;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.DIRECTORY_NAME_MARKER_TYPE,
          ///
      directoryNameMarkerEntry = _marker["default"].fromClass(Class, properties, type);

      return directoryNameMarkerEntry;
    }
  }]);

  return DirectoryNameMarkerEntry;
}(_marker["default"]);

exports["default"] = DirectoryNameMarkerEntry;

_defineProperty(DirectoryNameMarkerEntry, "defaultProperties", {
  className: "directory-name"
});

},{"../../entry/marker":9,"../../types":18}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _marker = _interopRequireDefault(require("../../entry/marker"));

var _name = require("../../utilities/name");

var _types = require("../../types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var FileNameMarkerEntry = /*#__PURE__*/function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  var _super = _createSuper(FileNameMarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _super.apply(this, arguments);
  }

  _createClass(FileNameMarkerEntry, [{
    key: "isBefore",
    value: function isBefore(draggableEntry) {
      var before;
      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case _types.FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();
          before = (0, _name.nameIsBeforeEntryName)(name, draggableEntryName);
          break;

        case _types.DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.FILE_NAME_MARKER_TYPE,
          fileNameMarkerEntry = _marker["default"].fromClass(Class, properties, type);

      return fileNameMarkerEntry;
    }
  }]);

  return FileNameMarkerEntry;
}(_marker["default"]);

exports["default"] = FileNameMarkerEntry;

_defineProperty(FileNameMarkerEntry, "defaultProperties", {
  className: "file-name"
});

},{"../../entry/marker":9,"../../types":18,"../../utilities/name":19}],12:[function(require,module,exports){
"use strict";

var _easy = require("easy");

var _view = _interopRequireDefault(require("./example/view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Object.assign(window, {
  React: _easy.React
});
var body = new _easy.Body();
body.prepend( /*#__PURE__*/_easy.React.createElement(_view["default"], null));

},{"./example/view":13,"easy":29}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../index");

var View = function View(properties) {
  var explorer = /*#__PURE__*/React.createElement(_index.Explorer, {
    topmostDirectoryName: "explorer",
    onOpen: openHandler,
    onMove: moveHandler
  }),
      rubbishBin = /*#__PURE__*/React.createElement(_index.RubbishBin, {
    onRemove: removeHandler
  });
  explorer.addDirectoryPath("explorer/directory1");
  explorer.addDirectoryPath("explorer/directory2");
  explorer.addFilePath("explorer/directory1/file1.txt");
  explorer.addFilePath("explorer/directory1/file2.txt");
  explorer.addFilePath("explorer/directory2/file3.txt");
  explorer.addDropTarget(rubbishBin);
  rubbishBin.addDropTarget(explorer);
  return /*#__PURE__*/React.createElement("div", {
    className: "view"
  }, explorer, rubbishBin);
};

var _default = View;
exports["default"] = _default;

function openHandler(filePath) {
  alert(filePath);
}

function moveHandler(pathMaps, done) {
  done();
}

function removeHandler(pathMaps, done) {
  done();
}

},{"../index":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _necessary = require("necessary");

var _entries = _interopRequireDefault(require("./entries"));

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _directoryName = _interopRequireDefault(require("./entry/draggable/directoryName"));

var _options = require("./options");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var second = _necessary.arrayUtilities.second,
    pathWithoutBottommostNameFromPath = _necessary.pathUtilities.pathWithoutBottommostNameFromPath;

var Explorer = /*#__PURE__*/function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  var _super = _createSuper(Explorer);

  function Explorer(selector, dropTargets, moveHandler, openHandler, options) {
    var _this;

    _classCallCheck(this, Explorer);

    _this = _super.call(this, selector, dropTargets, moveHandler);
    _this.openHandler = openHandler;
    _this.options = options;
    return _this;
  }

  _createClass(Explorer, [{
    key: "setOption",
    value: function setOption(option) {
      this.options[option] = true;
    }
  }, {
    key: "unsetOption",
    value: function unsetOption(option) {
      delete this.options[option];
    }
  }, {
    key: "isOptionPresent",
    value: function isOptionPresent(option) {
      var optionPresent = !!this.options[option]; ///

      return optionPresent;
    }
  }, {
    key: "getFilePaths",
    value: function getFilePaths() {
      var filePaths = this.retrieveFilePaths();
      return filePaths;
    }
  }, {
    key: "getDirectoryPaths",
    value: function getDirectoryPaths() {
      var directoryPaths = this.retrieveDirectoryPaths();
      return directoryPaths;
    }
  }, {
    key: "getTopmostDirectoryName",
    value: function getTopmostDirectoryName() {
      var topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(),
          topmostDirectoryNameDraggableEntryName = topmostDirectoryNameDraggableEntry.getName(),
          topmostDirectoryName = topmostDirectoryNameDraggableEntryName; ///

      return topmostDirectoryName;
    }
  }, {
    key: "getDirectoryNameDraggableEntry",
    value: function getDirectoryNameDraggableEntry() {
      return _directoryName["default"]; ///
    }
  }, {
    key: "mark",
    value: function mark(draggableEntry, previousDraggableEntry) {
      var markerEntryPath, draggableEntryType;
      var draggableEntryPath = draggableEntry.getPath();

      if (previousDraggableEntry !== null) {
        var previousDraggableEntryName = previousDraggableEntry.getName(),
            previousDraggableEntryType = previousDraggableEntry.getType();
        markerEntryPath = "".concat(draggableEntryPath, "/").concat(previousDraggableEntryName);
        draggableEntryType = previousDraggableEntryType; ///
      } else {
        draggableEntryType = draggableEntry.getType();
        markerEntryPath = draggableEntryPath; ///
      }

      this.addMarker(markerEntryPath, draggableEntryType);
    }
  }, {
    key: "unmark",
    value: function unmark() {
      this.removeMarker();
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
          marked = markedDirectoryNameDraggableEntry !== null;
      return marked;
    }
  }, {
    key: "isToBeMarked",
    value: function isToBeMarked(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null;
      return toBeMarked;
    }
  }, {
    key: "startDragging",
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        var previousDraggableEntry = null;
        this.mark(draggableEntry, previousDraggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: "dragging",
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        markedDropTarget.dragging(draggableEntry);
        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {
        var draggingWithin = explorer === this,
            ///
        noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);

        if (draggingWithin && noDraggingWithinOptionPresent) {
          return;
        }

        var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
          var previousDraggableEntry = draggableEntry; ///

          draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

          this.unmark();
          this.mark(draggableEntry, previousDraggableEntry);
        }
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);
        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        _previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, _previousDraggableEntry);

        this.unmark();
      }
    }
  }, {
    key: "stopDragging",
    value: function stopDragging(draggableEntry, done) {
      var markedDropTarget = this.getMarkedDropTarget(),
          draggableEntryPath = draggableEntry.getPath(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName; ///

      var targetPath = null,
          duplicate = false;

      if (markedDirectoryNameDraggableEntry !== null) {
        var draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,
            ///
        draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

        if (draggableEntryPresent) {
          duplicate = true;
        } else {
          var markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();
          targetPath = markedDirectoryNameDraggableEntryPath; ///
        }
      }

      var unmoved = sourcePath === targetPath;

      if (duplicate || unmoved) {
        markedDropTarget.unmark();
        done();
      } else {
        var draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);
        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.unmark();
          done();
        });
      }
    }
  }, {
    key: "escapeDragging",
    value: function escapeDragging() {
      this.unmarkGlobally();
    }
  }, {
    key: "markDraggableEntry",
    value: function markDraggableEntry(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          draggingWithin = explorer === this,
          ///
      noDraggingWithinOptionPresent = this.isOptionPresent(_options.NO_DRAGGING_WITHIN);

      if (draggingWithin && noDraggingWithinOptionPresent) {
        var previousDraggableEntry = null;
        this.mark(draggableEntry, previousDraggableEntry);
      } else {
        var _previousDraggableEntry2 = draggableEntry,
            ///
        bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);
        draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry; ///

        this.mark(draggableEntry, _previousDraggableEntry2);
      }
    }
  }, {
    key: "moveFileNameDraggableEntry",
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;
      var explorer = fileNameDraggableEntry.getExplorer();
      var filePath;

      if (targetFilePath === sourceFilePath) {///
      } else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
        filePath = targetFilePath; ///

        fileNameDraggableEntry = this.addFilePath(filePath);
        draggableEntry = fileNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: "moveDirectoryNameDraggableEntry",
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;
      var explorer = directoryNameDraggableEntry.getExplorer();
      var directoryPath;

      if (targetDirectoryPath === sourceDirectoryPath) {///
      } else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
        directoryPath = targetDirectoryPath; ///

        var collapsed = directoryNameDraggableEntry.isCollapsed();
        directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);
        draggableEntry = directoryNameDraggableEntry; ///
      }

      return draggableEntry;
    }
  }, {
    key: "openFileNameDraggableEntry",
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
          filePath = fileNameDraggableEntryPath; ///

      this.openHandler(filePath);
    }
  }, {
    key: "pathMapsFromDraggableEntries",
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
        return pathMap;
      });
      return pathMaps;
    }
  }, {
    key: "childElements",
    value: function childElements(properties) {
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          explorer = this,
          collapsed = topmostDirectoryCollapsed,
          directoryName = topmostDirectoryName,
          entries = /*#__PURE__*/React.createElement(_entries["default"], {
        explorer: explorer
      });
      entries.addDirectoryNameDraggableEntry(directoryName, collapsed);
      var childElements = entries; ///

      return childElements;
    }
  }, {
    key: "initialise",
    value: function initialise() {
      this.assignContext();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          _properties$options = properties.options,
          options = _properties$options === void 0 ? {} : _properties$options,
          moveHandler = onMove || defaultMoveHandler,
          openHandler = onOpen || defaultOpenHandler,
          explorer = _dropTarget["default"].fromClass(Class, properties, moveHandler, openHandler, options);

      explorer.initialise();
      return explorer;
    }
  }]);

  return Explorer;
}(_dropTarget["default"]);

exports["default"] = Explorer;

_defineProperty(Explorer, "tagName", "div");

_defineProperty(Explorer, "defaultProperties", {
  className: "explorer"
});

_defineProperty(Explorer, "ignoredProperties", ["onOpen", "onMove", "options", "topmostDirectoryName", "topmostDirectoryCollapsed"]);

function defaultOpenHandler(sourcePath) {///
}

function defaultMoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE,
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = sourcePath === null ? prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) : ///
  replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };
  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) {
  draggableEntryPath = "".concat(targetPath, "/").concat(draggableEntryPath);
  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, "\\(").replace(/\)/g, "\\)"); ///

  var regExp = new RegExp("^".concat(sourcePath, "(.*$)")),
      matches = draggableEntryPath.match(regExp),
      secondMatch = second(matches);
  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}

},{"./dropTarget":3,"./entries":4,"./entry/draggable/directoryName":7,"./options":16,"./types":18,"necessary":52}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "options", {
  enumerable: true,
  get: function get() {
    return _options["default"];
  }
});
Object.defineProperty(exports, "Explorer", {
  enumerable: true,
  get: function get() {
    return _explorer["default"];
  }
});
Object.defineProperty(exports, "RubbishBin", {
  enumerable: true,
  get: function get() {
    return _rubbishBin["default"];
  }
});

var _options = _interopRequireDefault(require("./options"));

var _explorer = _interopRequireDefault(require("./explorer"));

var _rubbishBin = _interopRequireDefault(require("./rubbishBin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./explorer":14,"./options":16,"./rubbishBin":17}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ESCAPE_KEY_STOPS_DRAGGING = exports.REMOVE_EMPTY_PARENT_DIRECTORIES = exports.NO_DRAGGING_INTO_SUB_DIRECTORIES = exports.NO_DRAGGING_SUB_ENTRIES = exports.NO_DRAGGING_WITHIN = void 0;
var NO_DRAGGING_WITHIN = "NO_DRAGGING_WITHIN";
exports.NO_DRAGGING_WITHIN = NO_DRAGGING_WITHIN;
var NO_DRAGGING_SUB_ENTRIES = "NO_DRAGGING_SUB_ENTRIES";
exports.NO_DRAGGING_SUB_ENTRIES = NO_DRAGGING_SUB_ENTRIES;
var NO_DRAGGING_INTO_SUB_DIRECTORIES = "NO_DRAGGING_INTO_SUB_DIRECTORIES";
exports.NO_DRAGGING_INTO_SUB_DIRECTORIES = NO_DRAGGING_INTO_SUB_DIRECTORIES;
var REMOVE_EMPTY_PARENT_DIRECTORIES = "REMOVE_EMPTY_PARENT_DIRECTORIES";
exports.REMOVE_EMPTY_PARENT_DIRECTORIES = REMOVE_EMPTY_PARENT_DIRECTORIES;
var ESCAPE_KEY_STOPS_DRAGGING = "ESCAPE_KEY_STOPS_DRAGGING";
exports.ESCAPE_KEY_STOPS_DRAGGING = ESCAPE_KEY_STOPS_DRAGGING;
var _default = {
  NO_DRAGGING_WITHIN: NO_DRAGGING_WITHIN,
  NO_DRAGGING_SUB_ENTRIES: NO_DRAGGING_SUB_ENTRIES,
  NO_DRAGGING_INTO_SUB_DIRECTORIES: NO_DRAGGING_INTO_SUB_DIRECTORIES,
  REMOVE_EMPTY_PARENT_DIRECTORIES: REMOVE_EMPTY_PARENT_DIRECTORIES,
  ESCAPE_KEY_STOPS_DRAGGING: ESCAPE_KEY_STOPS_DRAGGING
};
exports["default"] = _default;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dropTarget = _interopRequireDefault(require("./dropTarget"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RubbishBin = /*#__PURE__*/function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  var _super = _createSuper(RubbishBin);

  function RubbishBin() {
    _classCallCheck(this, RubbishBin);

    return _super.apply(this, arguments);
  }

  _createClass(RubbishBin, [{
    key: "open",
    value: function open() {
      this.addClass("open");
    }
  }, {
    key: "close",
    value: function close() {
      this.removeClass("open");
    }
  }, {
    key: "isOpen",
    value: function isOpen() {
      var open = this.hasClass("open");
      return open;
    }
  }, {
    key: "mark",
    value: function mark(draggableEntry, previousDraggableEntry) {
      this.open();
    }
  }, {
    key: "unmark",
    value: function unmark() {
      this.close();
    }
  }, {
    key: "isMarked",
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: "isToBeMarked",
    value: function isToBeMarked(draggableEntry) {
      var bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

      return toBeMarked;
    }
  }, {
    key: "dragging",
    value: function dragging(draggableEntry) {
      var explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

      if (markedDropTarget !== this) {
        return;
      }

      var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

      if (dropTargetToBeMarked === this) {///
      } else if (dropTargetToBeMarked !== null) {
        dropTargetToBeMarked.markDraggableEntry(draggableEntry);
        this.unmark();
      } else {
        var _dropTargetToBeMarked = explorer,
            ///
        previousDraggableEntry = null;

        _dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);

        this.unmark();
      }
    }
  }, {
    key: "markDraggableEntry",
    value: function markDraggableEntry(draggableEntry) {
      var previousDraggableEntry = null;
      this.mark(draggableEntry, previousDraggableEntry);
    }
  }, {
    key: "moveFileNameDraggableEntry",
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var draggableEntry = null;

      if (targetFilePath === null) {
        var explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      }

      return draggableEntry;
    }
  }, {
    key: "moveDirectoryNameDraggableEntry",
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;

      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }

      return draggableEntry;
    }
  }, {
    key: "pathMapsFromDraggableEntries",
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
        return pathMap;
      });
      return pathMaps;
    }
  }, {
    key: "retrieveMarkedDirectoryNameDraggableEntry",
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null; ///

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: "retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry",
    value: function retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///

      return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: "initialise",
    value: function initialise() {
      this.close();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove || defaultRemoveHandler,
          moveHandler = removeHandler,
          rubbishBin = _dropTarget["default"].fromClass(Class, properties, moveHandler);

      rubbishBin.initialise();
      return rubbishBin;
    }
  }]);

  return RubbishBin;
}(_dropTarget["default"]);

exports["default"] = RubbishBin;

_defineProperty(RubbishBin, "tagName", "div");

_defineProperty(RubbishBin, "defaultProperties", {
  className: "rubbish-bin"
});

_defineProperty(RubbishBin, "ignoredProperties", ["onRemove"]);

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryType = draggableEntry.getType(),
      draggableEntryDirectoryNameDraggableEntry = draggableEntryType === _types.DIRECTORY_NAME_TYPE,
      directory = draggableEntryDirectoryNameDraggableEntry; ///

  targetPath = null; ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };
  return pathMap;
}

},{"./dropTarget":3,"./types":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIRECTORY_NAME_MARKER_TYPE = exports.FILE_NAME_MARKER_TYPE = exports.DIRECTORY_NAME_TYPE = exports.FILE_NAME_TYPE = void 0;
var FILE_NAME_TYPE = "FILE_NAME_TYPE";
exports.FILE_NAME_TYPE = FILE_NAME_TYPE;
var DIRECTORY_NAME_TYPE = "DIRECTORY_NAME_TYPE";
exports.DIRECTORY_NAME_TYPE = DIRECTORY_NAME_TYPE;
var FILE_NAME_MARKER_TYPE = "FILE_NAME_MARKER_TYPE";
exports.FILE_NAME_MARKER_TYPE = FILE_NAME_MARKER_TYPE;
var DIRECTORY_NAME_MARKER_TYPE = "DIRECTORY_NAME_MARKER_TYPE";
exports.DIRECTORY_NAME_MARKER_TYPE = DIRECTORY_NAME_MARKER_TYPE;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionFromName = extensionFromName;
exports.nameWithoutExtensionFromName = nameWithoutExtensionFromName;
exports.nameIsBeforeEntryName = nameIsBeforeEntryName;

var _necessary = require("necessary");

var second = _necessary.arrayUtilities.second;

function extensionFromName(name) {
  var extension = null;
  var matches = name.match(/^.*\.([^.]+)$/);

  if (matches !== null) {
    var secondMatch = second(matches);
    extension = secondMatch; ///
  }

  return extension;
}

function nameWithoutExtensionFromName(name) {
  var nameWithoutExtension = null;
  var matches = name.match(/^(.+)\.[^.]+$/);

  if (matches !== null) {
    var secondMatch = second(matches);
    nameWithoutExtension = secondMatch; ///
  }

  return nameWithoutExtension;
}

function nameIsBeforeEntryName(name, entryName) {
  var before = name.localeCompare(entryName) < 0;
  var nameExtension = extensionFromName(name),
      entryNameExtension = extensionFromName(entryName),
      nameWithoutExtension = nameWithoutExtensionFromName(name),
      entryNameWithoutExtension = nameWithoutExtensionFromName(entryName),
      nameExtensionPresent = nameExtension !== null,
      entryNameExtensionPresent = entryNameExtension !== null,
      nameWithoutExtensionMissing = nameWithoutExtension === null,
      entryNameWithoutExtensionMissing = entryNameWithoutExtension === null,
      extensionsBothPresent = nameExtensionPresent && entryNameExtensionPresent,
      namesWithoutExtensionsBothMissing = nameWithoutExtensionMissing && entryNameWithoutExtensionMissing;

  if (namesWithoutExtensionsBothMissing) {///
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

},{"necessary":52}],20:[function(require,module,exports){

},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MIDDLE_MOUSE_BUTTON = exports.RIGHT_MOUSE_BUTTON = exports.LEFT_MOUSE_BUTTON = exports.SVG_NAMESPACE_URI = void 0;
var SVG_NAMESPACE_URI = "http://www.w3.org/2000/svg";
exports.SVG_NAMESPACE_URI = SVG_NAMESPACE_URI;
var LEFT_MOUSE_BUTTON = 0;
exports.LEFT_MOUSE_BUTTON = LEFT_MOUSE_BUTTON;
var RIGHT_MOUSE_BUTTON = 2;
exports.RIGHT_MOUSE_BUTTON = RIGHT_MOUSE_BUTTON;
var MIDDLE_MOUSE_BUTTON = 1;
exports.MIDDLE_MOUSE_BUTTON = MIDDLE_MOUSE_BUTTON;
var _default = {
  LEFT_MOUSE_BUTTON: LEFT_MOUSE_BUTTON,
  RIGHT_MOUSE_BUTTON: RIGHT_MOUSE_BUTTON,
  MIDDLE_MOUSE_BUTTON: MIDDLE_MOUSE_BUTTON
};
exports["default"] = _default;

},{}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _click = require("./mixins/click");

var _key = require("./mixins/key");

var _event = require("./mixins/event");

var _mouse = require("./mixins/mouse");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Document = function Document() {
  _classCallCheck(this, Document);

  _defineProperty(this, "on", _event.on);

  _defineProperty(this, "off", _event.off);

  _defineProperty(this, "onClick", _click.onClick);

  _defineProperty(this, "offClick", _click.offClick);

  _defineProperty(this, "onResize", onResize);

  _defineProperty(this, "offResize", offResize);

  _defineProperty(this, "onKeyUp", _key.onKeyUp);

  _defineProperty(this, "offKeyUp", _key.offKeyUp);

  _defineProperty(this, "onKeyDown", _key.onKeyDown);

  _defineProperty(this, "offKeyDown", _key.offKeyDown);

  _defineProperty(this, "onMouseUp", _mouse.onMouseUp);

  _defineProperty(this, "onMouseDown", _mouse.onMouseDown);

  _defineProperty(this, "onMouseOver", _mouse.onMouseOver);

  _defineProperty(this, "onMouseOut", _mouse.onMouseOut);

  _defineProperty(this, "onMouseMove", _mouse.onMouseMove);

  _defineProperty(this, "offMouseUp", _mouse.offMouseUp);

  _defineProperty(this, "offMouseDown", _mouse.offMouseDown);

  _defineProperty(this, "offMouseOver", _mouse.offMouseOver);

  _defineProperty(this, "offMouseOut", _mouse.offMouseOut);

  _defineProperty(this, "offMouseMove", _mouse.offMouseMove);

  _defineProperty(this, "addEventListener", _event.addEventListener);

  _defineProperty(this, "findEventListener", _event.findEventListener);

  _defineProperty(this, "findEventListeners", _event.findEventListeners);

  _defineProperty(this, "removeEventListener", _event.removeEventListener);

  this.domElement = document; ///
};

var _default = typeof document === "undefined" ? undefined : new Document(); ///


exports["default"] = _default;

function onResize(resizeHandler, element) {} ///


function offResize(resizeHandler, element) {} ///

},{"./mixins/click":35,"./mixins/event":36,"./mixins/key":38,"./mixins/mouse":39}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _offset = _interopRequireDefault(require("./miscellaneous/offset"));

var _bounds = _interopRequireDefault(require("./miscellaneous/bounds"));

var _object = require("./utilities/object");

var _name2 = require("./utilities/name");

var _array = require("./utilities/array");

var _constants = require("./constants");

var _dom = require("./utilities/dom");

var _click = require("./mixins/click");

var _state = require("./mixins/state");

var _key5 = require("./mixins/key");

var _resize = require("./mixins/resize");

var _jsx = require("./mixins/jsx");

var _scroll = require("./mixins/scroll");

var _event = require("./mixins/event");

var _mouse = require("./mixins/mouse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Element = /*#__PURE__*/function () {
  function Element(selectorOrDOMElement) {
    _classCallCheck(this, Element);

    _defineProperty(this, "on", _event.on);

    _defineProperty(this, "off", _event.off);

    _defineProperty(this, "onClick", _click.onClick);

    _defineProperty(this, "offClick", _click.offClick);

    _defineProperty(this, "onResize", _resize.onResize);

    _defineProperty(this, "offResize", _resize.offResize);

    _defineProperty(this, "addResizeObject", _resize.addResizeObject);

    _defineProperty(this, "removeResizeObject", _resize.removeResizeObject);

    _defineProperty(this, "getState", _state.getState);

    _defineProperty(this, "setState", _state.setState);

    _defineProperty(this, "updateState", _state.updateState);

    _defineProperty(this, "onKeyUp", _key5.onKeyUp);

    _defineProperty(this, "offKeyUp", _key5.offKeyUp);

    _defineProperty(this, "onKeyDown", _key5.onKeyDown);

    _defineProperty(this, "offKeyDown", _key5.offKeyDown);

    _defineProperty(this, "onMouseUp", _mouse.onMouseUp);

    _defineProperty(this, "onMouseDown", _mouse.onMouseDown);

    _defineProperty(this, "onMouseOver", _mouse.onMouseOver);

    _defineProperty(this, "onMouseOut", _mouse.onMouseOut);

    _defineProperty(this, "onMouseMove", _mouse.onMouseMove);

    _defineProperty(this, "offMouseUp", _mouse.offMouseUp);

    _defineProperty(this, "offMouseDown", _mouse.offMouseDown);

    _defineProperty(this, "offMouseOver", _mouse.offMouseOver);

    _defineProperty(this, "offMouseOut", _mouse.offMouseOut);

    _defineProperty(this, "offMouseMove", _mouse.offMouseMove);

    _defineProperty(this, "onScroll", _scroll.onScroll);

    _defineProperty(this, "offScroll", _scroll.offScroll);

    _defineProperty(this, "getScrollTop", _scroll.getScrollTop);

    _defineProperty(this, "getScrollLeft", _scroll.getScrollLeft);

    _defineProperty(this, "setScrollTop", _scroll.setScrollTop);

    _defineProperty(this, "setScrollLeft", _scroll.setScrollLeft);

    _defineProperty(this, "getContext", _jsx.getContext);

    _defineProperty(this, "getProperties", _jsx.getProperties);

    _defineProperty(this, "assignContext", _jsx.assignContext);

    _defineProperty(this, "applyProperties", _jsx.applyProperties);

    _defineProperty(this, "addEventListener", _event.addEventListener);

    _defineProperty(this, "findEventListener", _event.findEventListener);

    _defineProperty(this, "findEventListeners", _event.findEventListeners);

    _defineProperty(this, "removeEventListener", _event.removeEventListener);

    if (typeof selectorOrDOMElement === "string") {
      var selector = selectorOrDOMElement;
      this.domElement = document.querySelector(selector);
    } else {
      var domElement = selectorOrDOMElement; ///

      this.domElement = domElement;
    }

    this.domElement.__element__ = this; ///
  }

  _createClass(Element, [{
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
      offset = new _offset["default"](top, left);
      return offset;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = _bounds["default"].fromBoundingClientRect(boundingClientRect);

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

      this.style("width", width);
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

      this.style("height", height);
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
      this.domElement.className = "";
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
      var displayStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "block";
      this.display(displayStyle);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.style("display", "none");
    }
  }, {
    key: "display",
    value: function display(_display) {
      this.style("display", _display);
    }
  }, {
    key: "enable",
    value: function enable() {
      this.clearAttribute("disabled");
    }
  }, {
    key: "disable",
    value: function disable() {
      this.setAttribute("disabled", "disabled");
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
      var disabled = this.hasAttribute("disabled");
      return disabled;
    }
  }, {
    key: "isDisplayed",
    value: function isDisplayed() {
      var display = this.style("display"),
          displayed = display !== "none";
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
      } else if (typeof _css === "string") {
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
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var domNode = this.domElement,
          ///
      descendantDOMNodes = (0, _dom.descendantDOMNodesFromDOMNode)(domNode),
          descendantDOMElements = (0, _dom.filterDOMNodesBySelector)(descendantDOMNodes, selector),
          descendantElements = (0, _dom.elementsFromDOMElements)(descendantDOMElements);
      return descendantElements;
    }
  }, {
    key: "getChildElements",
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var childDOMNodes = this.domElement.childNodes,
          childDOMElements = (0, _dom.filterDOMNodesBySelector)(childDOMNodes, selector),
          childElements = (0, _dom.elementsFromDOMElements)(childDOMElements);
      return childElements;
    }
  }, {
    key: "getParentElement",
    value: function getParentElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var parentElement = null;
      var parentDOMElement = this.domElement.parentElement;

      if (parentDOMElement !== null) {
        if (parentDOMElement.matches(selector)) {
          var parentDOMElements = [parentDOMElement],
              parentElements = (0, _dom.elementsFromDOMElements)(parentDOMElements),
              firstParentElement = (0, _array.first)(parentElements);
          parentElement = firstParentElement || null;
        }
      }

      return parentElement;
    }
  }, {
    key: "getAscendantElements",
    value: function getAscendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var ascendantDOMElements = [],
          parentDOMElement = this.domElement.parentElement;
      var ascendantDOMElement = parentDOMElement; ///

      while (ascendantDOMElement !== null) {
        if (ascendantDOMElement.matches(selector)) {
          ascendantDOMElements.push(ascendantDOMElement);
        }

        ascendantDOMElement = ascendantDOMElement.parentElement;
      }

      var ascendantElements = (0, _dom.elementsFromDOMElements)(ascendantDOMElements);
      return ascendantElements;
    }
  }, {
    key: "getPreviousSiblingElement",
    value: function getPreviousSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var previousSiblingElement = null;
      var previousSiblingDOMNode = this.domElement.previousSibling; ///

      if (previousSiblingDOMNode !== null && (0, _dom.domNodeMatchesSelector)(previousSiblingDOMNode, selector)) {
        previousSiblingElement = previousSiblingDOMNode.__element__ || null;
      }

      return previousSiblingElement;
    }
  }, {
    key: "getNextSiblingElement",
    value: function getNextSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "*";
      var nextSiblingElement = null;
      var nextSiblingDOMNode = this.domElement.nextSibling;

      if (nextSiblingDOMNode !== null && (0, _dom.domNodeMatchesSelector)(nextSiblingDOMNode, selector)) {
        nextSiblingElement = nextSiblingDOMNode.__element__ || null;
      }

      return nextSiblingElement;
    }
  }], [{
    key: "fromTagName",
    value: function fromTagName(tagName, properties) {
      for (var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      var element = _fromTagName.apply(void 0, [Element, tagName].concat(remainingArguments)),
          defaultProperties = {},
          ///
      ignoredProperties = []; ///


      element.applyProperties(properties, defaultProperties, ignoredProperties);
      return element;
    }
  }, {
    key: "fromClass",
    value: function fromClass(Class, properties) {
      for (var _len2 = arguments.length, remainingArguments = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      var tagName = Class.tagName,
          element = _fromTagName.apply(void 0, [Class, tagName].concat(remainingArguments)),
          defaultProperties = defaultPropertiesFromClass(Class),
          ignoredProperties = ignoredPropertiesFromClass(Class);

      element.applyProperties(properties, defaultProperties, ignoredProperties);
      return element;
    }
  }]);

  return Element;
}();

exports["default"] = Element;

function _fromTagName(Class, tagName) {
  var domElement = (0, _name2.isSVGTagName)(tagName) ? document.createElementNS(_constants.SVG_NAMESPACE_URI, tagName) : document.createElement(tagName);

  for (var _len3 = arguments.length, remainingArguments = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    remainingArguments[_key3 - 2] = arguments[_key3];
  }

  return fromDOMElement.apply(void 0, [Class, domElement].concat(remainingArguments));
}

function fromDOMElement(Class, domElement) {
  var _Function$prototype$b;

  for (var _len4 = arguments.length, remainingArguments = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
    remainingArguments[_key4 - 2] = arguments[_key4];
  }

  remainingArguments.unshift(domElement);
  remainingArguments.unshift(null);
  return new ((_Function$prototype$b = Function.prototype.bind).call.apply(_Function$prototype$b, [Class].concat(remainingArguments)))();
}

function defaultPropertiesFromClass(Class) {
  var defaultProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (Class.hasOwnProperty("defaultProperties")) {
    (0, _object.combine)(defaultProperties, Class.defaultProperties);
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    defaultPropertiesFromClass(superClass, defaultProperties);
  }

  return defaultProperties;
}

function ignoredPropertiesFromClass(Class) {
  var ignoredProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Class.hasOwnProperty("ignoredProperties")) {
    (0, _array.augment)(ignoredProperties, Class.ignoredProperties, function (ignoredProperty) {
      return !ignoredProperties.includes(ignoredProperty);
    });
  }

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    ignoredPropertiesFromClass(superClass, ignoredProperties);
  }

  return ignoredProperties;
}

},{"./constants":21,"./miscellaneous/bounds":33,"./miscellaneous/offset":34,"./mixins/click":35,"./mixins/event":36,"./mixins/jsx":37,"./mixins/key":38,"./mixins/mouse":39,"./mixins/resize":40,"./mixins/scroll":41,"./mixins/state":42,"./utilities/array":45,"./utilities/dom":46,"./utilities/name":48,"./utilities/object":49}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("../element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Body = /*#__PURE__*/function (_Element) {
  _inherits(Body, _Element);

  function Body() {
    var selectorOrDOMElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "body";

    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, _getPrototypeOf(Body).call(this, selectorOrDOMElement));
  }

  return Body;
}(_element["default"]);

exports["default"] = Body;

_defineProperty(Body, "tagName", "body");

},{"../element":23}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("../element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Button = /*#__PURE__*/function (_Element) {
  _inherits(Button, _Element);

  function Button(selectorOrDOMElement, clickHandler) {
    var _this;

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, selectorOrDOMElement));

    if (clickHandler !== null) {
      _this.onClick(clickHandler);
    }

    return _this;
  }

  _createClass(Button, null, [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onClick = properties.onClick,
          onClick = _properties$onClick === void 0 ? null : _properties$onClick,
          clickHandler = onClick,
          button = _element["default"].fromClass(Class, properties, clickHandler);

      return button;
    }
  }]);

  return Button;
}(_element["default"]);

exports["default"] = Button;

_defineProperty(Button, "tagName", "button");

_defineProperty(Button, "ignoredProperties", ["onClick"]);

},{"../element":23}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("../element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Checkbox = /*#__PURE__*/function (_Element) {
  _inherits(Checkbox, _Element);

  function Checkbox(selectorOrDOMElement, changeHandler, checked) {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Checkbox).call(this, selectorOrDOMElement));

    _defineProperty(_assertThisInitialized(_this), "onChange", onChange);

    _defineProperty(_assertThisInitialized(_this), "offChange", offChange);

    _this.check(checked);

    if (changeHandler !== null) {
      _this.onChange(changeHandler);
    }

    return _this;
  }

  _createClass(Checkbox, [{
    key: "check",
    value: function check() {
      var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.domElement.checked = checked;
    }
  }, {
    key: "isChecked",
    value: function isChecked() {
      return this.domElement.checked;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onChange = properties.onChange,
          onChange = _properties$onChange === void 0 ? null : _properties$onChange,
          _properties$checked = properties.checked,
          checked = _properties$checked === void 0 ? null : _properties$checked,
          changeHandler = onChange,
          checkbox = _element["default"].fromClass(Class, properties, changeHandler, checked);

      return checkbox;
    }
  }]);

  return Checkbox;
}(_element["default"]);

exports["default"] = Checkbox;

_defineProperty(Checkbox, "tagName", "input");

_defineProperty(Checkbox, "ignoredProperties", ["onChange", "checked"]);

_defineProperty(Checkbox, "defaultProperties", {
  type: "checkbox"
});

function onChange(changeHandler, element) {
  this.on("click", changeHandler, element);
} ///


function offChange(changeHandler, element) {
  this.off("click", changeHandler, element);
} ///

},{"../element":23}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("../element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Link = /*#__PURE__*/function (_Element) {
  _inherits(Link, _Element);

  function Link(selectorOrDOMElement, clickHandler) {
    var _this;

    _classCallCheck(this, Link);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Link).call(this, selectorOrDOMElement));

    if (clickHandler !== null) {
      _this.onClick(clickHandler);
    }

    return _this;
  }

  _createClass(Link, null, [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onClick = properties.onClick,
          onClick = _properties$onClick === void 0 ? null : _properties$onClick,
          clickHandler = onClick,
          link = _element["default"].fromClass(Class, properties, clickHandler);

      return link;
    }
  }]);

  return Link;
}(_element["default"]);

exports["default"] = Link;

_defineProperty(Link, "tagName", "a");

_defineProperty(Link, "ignoredProperties", ["onClick"]);

},{"../element":23}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("../element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = /*#__PURE__*/function (_Element) {
  _inherits(Select, _Element);

  function Select(selectorOrDOMElement, changeHandler) {
    var _this;

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, selectorOrDOMElement));

    _defineProperty(_assertThisInitialized(_this), "onChange", onChange);

    _defineProperty(_assertThisInitialized(_this), "offChange", offChange);

    if (changeHandler !== null) {
      _this.onChange(changeHandler);
    }

    return _this;
  }

  _createClass(Select, [{
    key: "getSelectedOptionValue",
    value: function getSelectedOptionValue() {
      var value = this.domElement.value,
          ///
      selectedOptionValue = value; ///

      return selectedOptionValue;
    }
  }, {
    key: "setSelectedOptionByValue",
    value: function setSelectedOptionByValue(selectedOptionValue) {
      var value = selectedOptionValue; ///

      this.domElement.value = value;
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onChange = properties.onChange,
          onChange = _properties$onChange === void 0 ? null : _properties$onChange,
          changeHandler = onChange,
          select = _element["default"].fromClass(Class, properties, changeHandler);

      return select;
    }
  }]);

  return Select;
}(_element["default"]);

exports["default"] = Select;

_defineProperty(Select, "tagName", "select");

_defineProperty(Select, "ignoredProperties", ["onChange"]);

function onChange(changeHandler, element) {
  this.on("change", changeHandler, element);
}

function offChange(changeHandler, element) {
  this.off("change", changeHandler, element);
}

},{"../element":23}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Body", {
  enumerable: true,
  get: function get() {
    return _body["default"];
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _button["default"];
  }
});
Object.defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function get() {
    return _checkbox["default"];
  }
});
Object.defineProperty(exports, "Link", {
  enumerable: true,
  get: function get() {
    return _link["default"];
  }
});
Object.defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _select["default"];
  }
});
Object.defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _input["default"];
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _textarea["default"];
  }
});
Object.defineProperty(exports, "Element", {
  enumerable: true,
  get: function get() {
    return _element["default"];
  }
});
Object.defineProperty(exports, "TextElement", {
  enumerable: true,
  get: function get() {
    return _textElement["default"];
  }
});
Object.defineProperty(exports, "InputElement", {
  enumerable: true,
  get: function get() {
    return _inputElement["default"];
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function get() {
    return _window["default"];
  }
});
Object.defineProperty(exports, "document", {
  enumerable: true,
  get: function get() {
    return _document["default"];
  }
});
Object.defineProperty(exports, "constants", {
  enumerable: true,
  get: function get() {
    return _constants["default"];
  }
});
Object.defineProperty(exports, "Bounds", {
  enumerable: true,
  get: function get() {
    return _bounds["default"];
  }
});
Object.defineProperty(exports, "Offset", {
  enumerable: true,
  get: function get() {
    return _offset["default"];
  }
});
Object.defineProperty(exports, "React", {
  enumerable: true,
  get: function get() {
    return _react["default"];
  }
});

var _body = _interopRequireDefault(require("./element/body"));

var _button = _interopRequireDefault(require("./element/button"));

var _checkbox = _interopRequireDefault(require("./element/checkbox"));

var _link = _interopRequireDefault(require("./element/link"));

var _select = _interopRequireDefault(require("./element/select"));

var _input = _interopRequireDefault(require("./inputElement/input"));

var _textarea = _interopRequireDefault(require("./inputElement/textarea"));

var _element = _interopRequireDefault(require("./element"));

var _textElement = _interopRequireDefault(require("./textElement"));

var _inputElement = _interopRequireDefault(require("./inputElement"));

var _window = _interopRequireDefault(require("./window"));

var _document = _interopRequireDefault(require("./document"));

var _constants = _interopRequireDefault(require("./constants"));

var _bounds = _interopRequireDefault(require("./miscellaneous/bounds"));

var _offset = _interopRequireDefault(require("./miscellaneous/offset"));

var _react = _interopRequireDefault(require("./react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./constants":21,"./document":22,"./element":23,"./element/body":24,"./element/button":25,"./element/checkbox":26,"./element/link":27,"./element/select":28,"./inputElement":30,"./inputElement/input":31,"./inputElement/textarea":32,"./miscellaneous/bounds":33,"./miscellaneous/offset":34,"./react":43,"./textElement":44,"./window":50}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputElement = /*#__PURE__*/function (_Element) {
  _inherits(InputElement, _Element);

  function InputElement(selectorOrDOMElement, changeHandler) {
    var _this;

    _classCallCheck(this, InputElement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputElement).call(this, selectorOrDOMElement));

    _defineProperty(_assertThisInitialized(_this), "onChange", onChange);

    _defineProperty(_assertThisInitialized(_this), "offChange", offChange);

    _defineProperty(_assertThisInitialized(_this), "onResize", onResize);

    _defineProperty(_assertThisInitialized(_this), "offResize", offResize);

    if (changeHandler !== null) {
      _this.onChange(changeHandler);
    }

    return _this;
  }

  _createClass(InputElement, [{
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
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onChange = properties.onChange,
          onChange = _properties$onChange === void 0 ? null : _properties$onChange,
          changeHandler = onChange; ///

      for (var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return _element["default"].fromClass.apply(_element["default"], [Class, properties, changeHandler].concat(remainingArguments));
    }
  }]);

  return InputElement;
}(_element["default"]);

exports["default"] = InputElement;

_defineProperty(InputElement, "ignoredProperties", ["onChange"]);

function onChange(changeHandler, element) {
  this.on("change", changeHandler, element);
}

function offChange(changeHandler, element) {
  this.off("change", changeHandler, element);
}

function onResize(resizeHandler, element) {} ///


function offResize(resizeHandler, element) {} ///

},{"./element":23}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inputElement = _interopRequireDefault(require("../inputElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Input = /*#__PURE__*/function (_InputElement) {
  _inherits(Input, _InputElement);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, _getPrototypeOf(Input).apply(this, arguments));
  }

  return Input;
}(_inputElement["default"]);

exports["default"] = Input;

_defineProperty(Input, "tagName", "input");

},{"../inputElement":30}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _inputElement = _interopRequireDefault(require("../inputElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Textarea = /*#__PURE__*/function (_InputElement) {
  _inherits(Textarea, _InputElement);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _possibleConstructorReturn(this, _getPrototypeOf(Textarea).apply(this, arguments));
  }

  return Textarea;
}(_inputElement["default"]);

exports["default"] = Textarea;

_defineProperty(Textarea, "tagName", "textarea");

},{"../inputElement":30}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = Bounds;

},{}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

exports["default"] = Offset;

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onClick = onClick;
exports.offClick = offClick;

function onClick(clickHandler, element) {
  this.on("click", clickHandler, element);
}

function offClick(clickHandler, element) {
  this.off("click", clickHandler, element);
}

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.on = on;
exports.off = off;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.findEventListener = findEventListener;
exports.findEventListeners = findEventListeners;

var _resize = require("./resize");

function on(eventTypes, handler, element) {
  var _this = this;

  eventTypes = eventTypes.split(" "); ///

  eventTypes.forEach(function (eventType) {
    if (eventType === "resize") {
      var resizeEventListeners = _this.findEventListeners("resize"),
          resizeEventListenersLength = resizeEventListeners.length;

      if (resizeEventListenersLength === 0) {
        _this.addResizeObject();
      }
    }

    var eventListener = _this.addEventListener(eventType, handler, element);

    _this.domElement.addEventListener(eventType, eventListener);
  });
}

function off(eventTypes, handler, element) {
  var _this2 = this;

  eventTypes = eventTypes.split(" "); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = _this2.removeEventListener(eventType, handler, element);

    _this2.domElement.removeEventListener(eventType, eventListener);

    if (eventType === "resize") {
      var resizeEventListeners = _this2.findEventListeners("resize"),
          resizeEventListenersLength = resizeEventListeners.length;

      if (resizeEventListenersLength === 0) {
        (0, _resize.removeResizeObject)(_this2);
      }
    }
  });
}

function addEventListener(eventType, handler) {
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;

  if (!this.hasOwnProperty("eventListeners")) {
    this.eventListeners = [];
  }

  var eventListener = createEventListener(eventType, handler, element);
  this.eventListeners.push(eventListener);
  return eventListener;
}

function removeEventListener(eventType, handler) {
  var element = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this;
  var eventListener = this.findEventListener(eventType, handler, element),
      index = this.eventListeners.indexOf(eventListener),
      start = index,
      ///
  deleteCount = 1;
  this.eventListeners.splice(start, deleteCount);

  if (this.eventListeners.length === 0) {
    delete this.eventListeners;
  }

  return eventListener;
}

function findEventListener(eventType, handler, element) {
  var eventListener = this.eventListeners.find(function (eventListener) {
    var found = eventListener.element === element && eventListener.handler === handler && eventListener.eventType === eventType;

    if (found) {
      return true;
    }
  });
  return eventListener;
}

function findEventListeners(eventType) {
  var eventListeners = [];

  if (this.hasOwnProperty("eventListeners")) {
    this.eventListeners.forEach(function (eventListener) {
      var found = eventListener.eventType === eventType;

      if (found) {
        eventListeners.push(eventListener);
      }
    });
  }

  return eventListeners;
}

function createEventListener(eventType, handler, element) {
  var eventListener;

  eventListener = function eventListener(event) {
    handler.call(element, event, element);
  };

  Object.assign(eventListener, {
    element: element,
    handler: handler,
    eventType: eventType
  });
  return eventListener;
}

},{"./resize":40}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyProperties = applyProperties;
exports.getProperties = getProperties;
exports.getContext = getContext;
exports.assignContext = assignContext;

var _object = require("../utilities/object");

var _array = require("../utilities/array");

var _constants = require("../constants");

var _name = require("../utilities/name");

var _elements = require("../utilities/elements");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function applyProperties(properties, defaultProperties, ignoredProperties) {
  var _this = this;

  properties = Object.assign({}, properties); ///

  (0, _object.combine)(properties, defaultProperties);
  var childElements = childElementsFromElementAndProperties(this, properties) || properties.childElements; ///

  (0, _object.prune)(properties, ignoredProperties);
  var svg = this.domElement.namespaceURI === _constants.SVG_NAMESPACE_URI,
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
      if (!_this.hasOwnProperty("properties")) {
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
    var firstArgument = (0, _array.first)(arguments);

    if (typeof firstArgument === "boolean") {
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

function childElementsFromElementAndProperties(element, properties) {
  var childElements = null;

  if (typeof element.childElements === "function") {
    childElements = element.childElements(properties);
    childElements = (0, _array.guarantee)(childElements);
    childElements = (0, _elements.removeFalseyElements)(childElements);
    childElements = (0, _elements.replaceStringsWithTextElements)(childElements);
  }

  return childElements;
}

function updateContext(childElement, context) {
  var parentContext = typeof childElement.parentContext === "function" ? childElement.parentContext() : childElement.context; ///

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
  if (name === "className") {
    name = "class";
  }

  if (name === "htmlFor") {
    name = "for";
  }

  if (_typeof(value) === "object") {
    var keys = Object.keys(value);
    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    });
  } else if (typeof value === "boolean") {
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
  return svg ? (0, _name.isSVGAttributeName)(name) : (0, _name.isHTMLAttributeName)(name);
}

},{"../constants":21,"../utilities/array":45,"../utilities/elements":47,"../utilities/name":48,"../utilities/object":49}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onKeyUp = onKeyUp;
exports.offKeyUp = offKeyUp;
exports.onKeyDown = onKeyDown;
exports.offKeyDown = offKeyDown;

function onKeyUp(keyUpHandler, element) {
  this.on("keyup", keyUpHandler, element);
}

function offKeyUp(keyUpHandler, element) {
  this.off("keyup", keyUpHandler, element);
}

function onKeyDown(keyDownHandler, element) {
  this.on("keydown", keyDownHandler, element);
}

function offKeyDown(keyDownHandler, element) {
  this.off("keydown", keyDownHandler, element);
}

},{}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onMouseUp = onMouseUp;
exports.offMouseUp = offMouseUp;
exports.onMouseOut = onMouseOut;
exports.offMouseOut = offMouseOut;
exports.onMouseDown = onMouseDown;
exports.offMouseDown = offMouseDown;
exports.onMouseOver = onMouseOver;
exports.offMouseOver = offMouseOver;
exports.onMouseMove = onMouseMove;
exports.offMouseMove = offMouseMove;

function onMouseUp(mouseUpHandler, element) {
  this.on("mouseup", mouseUpHandler, element);
}

function offMouseUp(mouseUpHandler, element) {
  this.off("mouseup", mouseUpHandler, element);
}

function onMouseOut(mouseOutHandler, element) {
  this.on("mouseout", mouseOutHandler, element);
}

function offMouseOut(mouseOutHandler, element) {
  this.off("mouseout", mouseOutHandler, element);
}

function onMouseDown(mouseDownHandler, element) {
  this.on("mousedown", mouseDownHandler, element);
}

function offMouseDown(mouseDownHandler, element) {
  this.off("mousedown", mouseDownHandler, element);
}

function onMouseOver(mouseOverHandler, element) {
  this.on("mouseover", mouseOverHandler, element);
}

function offMouseOver(mouseOverHandler, element) {
  this.off("mouseover", mouseOverHandler, element);
}

function onMouseMove(mouseMoveHandler, element) {
  this.on("mousemove", mouseMoveHandler, element);
}

function offMouseMove(mouseMoveHandler, element) {
  this.off("mousemove", mouseMoveHandler, element);
}

},{}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onResize = onResize;
exports.offResize = offResize;
exports.addResizeObject = addResizeObject;
exports.removeResizeObject = removeResizeObject;

function onResize(resizeHandler, element) {
  this.on("resize", resizeHandler, element);
}

function offResize(resizeHandler, element) {
  this.off("resize", resizeHandler, element);
}

function addResizeObject() {
  var _this = this;

  var resizeObject = document.createElement("object"),
      style = "display: block; \n                 position: absolute; \n                 top: 0; \n                 left: 0; \n                 height: 100%; \n                 width: 100%; \n                 overflow: hidden; \n                 pointer-events: none; \n                 z-index: -1;",
      data = "about:blank",
      type = "text/html";
  resizeObject.setAttribute("style", style);
  resizeObject.data = data;
  resizeObject.type = type;
  this.__resizeObject__ = resizeObject;

  resizeObject.onload = function () {
    return resizeObjectLoadHandler(_this);
  };

  this.domElement.appendChild(resizeObject);
}

function removeResizeObject() {
  var resizeObject = this.__resizeObject__,
      objectWindow = resizeObject.contentDocument.defaultView; ///

  objectWindow.removeEventListener("resize", resizeEventListener);
  this.domElement.removeChild(resizeObject);
}

function resizeObjectLoadHandler(element) {
  var resizeObject = element.__resizeObject__,
      resizeObjectWindow = resizeObject.contentDocument.defaultView; ///

  resizeObjectWindow.addEventListener("resize", function (event) {
    var resizeEventListeners = element.findEventListeners("resize");
    resizeEventListeners.forEach(function (resizeEventListener) {
      return resizeEventListener.call(element, event, element);
    });
  });
}

},{}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onScroll = onScroll;
exports.offScroll = offScroll;
exports.getScrollTop = getScrollTop;
exports.getScrollLeft = getScrollLeft;
exports.setScrollTop = setScrollTop;
exports.setScrollLeft = setScrollLeft;

function onScroll(scrollHandler, element) {
  this.on("scroll", scrollHandler, element);
}

function offScroll(scrollHandler, element) {
  this.off("scroll", scrollHandler, element);
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

},{}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getState = getState;
exports.setState = setState;
exports.updateState = updateState;

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

function updateState(update) {
  Object.assign(this.state, update);
}

},{}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _element = _interopRequireDefault(require("./element"));

var _array = require("./utilities/array");

var _elements = require("./utilities/elements");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createElement(firstArgument, properties) {
  var element = null;

  if (firstArgument !== undefined) {
    for (var _len = arguments.length, remainingArguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      remainingArguments[_key - 2] = arguments[_key];
    }

    var childElements = childElementsFromRemainingArguments(remainingArguments);
    properties = Object.assign({
      childElements: childElements
    }, properties);

    if (false) {///
    } else if (isSubclassOf(firstArgument, _element["default"])) {
      var Class = firstArgument; ///

      element = Class.fromClass(Class, properties);
    } else if (typeof firstArgument === "string") {
      var tagName = firstArgument; ///

      element = _element["default"].fromTagName(tagName, properties);
    } else if (typeof firstArgument === "function") {
      var elementFunction = firstArgument; ///

      element = elementFunction(properties);
    }
  }

  return element;
}

var React = {
  createElement: createElement
};
var _default = React;
exports["default"] = _default;

function childElementsFromRemainingArguments(remainingArguments) {
  remainingArguments = (0, _array.flatten)(remainingArguments); ///

  var childElements = remainingArguments; ///

  childElements = (0, _elements.removeFalseyElements)(childElements);
  childElements = (0, _elements.replaceStringsWithTextElements)(childElements);
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

},{"./element":23,"./utilities/array":45,"./utilities/elements":47}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _offset = _interopRequireDefault(require("./miscellaneous/offset"));

var _bounds = _interopRequireDefault(require("./miscellaneous/bounds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TextElement = /*#__PURE__*/function () {
  function TextElement(text) {
    _classCallCheck(this, TextElement);

    this.domElement = document.createTextNode(text); ///

    this.domElement.__element__ = this;
  }

  _createClass(TextElement, [{
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
      offset = new _offset["default"](top, left);
      return offset;
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = _bounds["default"].fromBoundingClientRect(boundingClientRect);

      return bounds;
    }
  }, {
    key: "getWidth",
    value: function getWidth() {
      var clientWidth = this.domElement.clientWidth,
          width = clientWidth; ///

      return width;
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      var clientHeight = this.domElement.clientHeight,
          height = clientHeight; ///

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

exports["default"] = TextElement;

},{"./miscellaneous/bounds":33,"./miscellaneous/offset":34}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;
exports.splice = splice;
exports.flatten = flatten;
exports.guarantee = guarantee;
exports.augment = augment;

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

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementsFromDOMElements = elementsFromDOMElements;
exports.descendantDOMNodesFromDOMNode = descendantDOMNodesFromDOMNode;
exports.filterDOMNodesBySelector = filterDOMNodesBySelector;
exports.domNodeMatchesSelector = domNodeMatchesSelector;
exports.filterDOMNodes = filterDOMNodes;

var _array = require("../utilities/array");

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

  (0, _array.splice)(descendantDOMNodes, start, deleteCount, childDOMNodes);
  childDOMNodes.forEach(function (childDOMNode) {
    return descendantDOMNodesFromDOMNode(childDOMNode, descendantDOMNodes);
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
        if (selector === "*") {
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

},{"../utilities/array":45}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeFalseyElements = removeFalseyElements;
exports.replaceStringsWithTextElements = replaceStringsWithTextElements;

var _textElement = _interopRequireDefault(require("../textElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
    if (typeof element === "string") {
      var text = element,
          ///
      textElement = new _textElement["default"](text);
      element = textElement; ///
    }

    return element;
  });
  return elements;
}

},{"../textElement":44}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSVGTagName = isSVGTagName;
exports.isSVGAttributeName = isSVGAttributeName;
exports.isHTMLAttributeName = isHTMLAttributeName;

function isSVGTagName(tagName) {
  return svgTagNames.includes(tagName);
}

function isSVGAttributeName(attributeName) {
  return svgAttributeNames.includes(attributeName);
}

function isHTMLAttributeName(attributeName) {
  return htmlAttributeNames.includes(attributeName);
}

var svgTagNames = ["altGlyph", "animate", "animateColor", "animateMotion", "animateTransform", "animation", "audio", "circle", "clipPath", "color-profile", "cursor", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "font", "font-face", "font-face-format", "font-face-name", "font-face-uri", "foreignObject", "g", "glyph", "glyphRef", "handler", "hatch", "hatchpath", "hkern", "image", "line", "linearGradient", "listener", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "missing-glyph", "mpath", "path", "pattern", "polygon", "polyline", "prefetch", "radialGradient", "rect", "script", "set", "solidcolor", "stop", "style", "svg", "switch", "symbol", "tbreak", "text", "textArea", "textPath", "title", "tref", "tspan", "unknown", "use", "video", "view", "vkern"],
    svgAttributeNames = ["accent-height", "accumulate", "additive", "alignment-baseline", "alphabetic", "amplitude", "arabic-form", "ascent", "attributeName", "attributeType", "azimuth", "bandwidth", "baseFrequency", "baseProfile", "baseline-shift", "bbox", "begin", "bias", "by", "calcMode", "cap-height", "clip", "className", "clip-path", "clip-rule", "clipPathUnits", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "contentScriptType", "contentStyleType", "crossorigin", "cursor", "cx", "cy", "d", "defaultAction", "descent", "diffuseConstant", "direction", "display", "divisor", "dominant-baseline", "download", "dur", "dx", "dy", "edgeMode", "editable", "elevation", "enable-background", "end", "event", "exponent", "externalResourcesRequired", "fill", "fill-opacity", "fill-rule", "filter", "filterRes", "filterUnits", "flood-color", "flood-opacity", "focusHighlight", "focusable", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "format", "fr", "from", "fx", "fy", "g1", "g2", "glyph-name", "glyph-orientation-horizontal", "glyph-orientation-vertical", "glyphRef", "gradientTransform", "gradientUnits", "handler", "hanging", "hatchContentUnits", "hatchUnits", "height", "horiz-adv-x", "horiz-origin-x", "horiz-origin-y", "href", "hreflang", "ideographic", "image-rendering", "in", "in2", "initialVisibility", "intercept", "k", "k1", "k2", "k3", "k4", "kernelMatrix", "kernelUnitLength", "kerning", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "letter-spacing", "lighting-color", "limitingConeAngle", "local", "marker-end", "marker-mid", "marker-start", "markerHeight", "markerUnits", "markerWidth", "mask", "maskContentUnits", "maskUnits", "mathematical", "max", "media", "mediaCharacterEncoding", "mediaContentEncodings", "mediaSize", "mediaTime", "method", "min", "mode", "name", "nav-down", "nav-down-left", "nav-down-right", "nav-left", "nav-next", "nav-prev", "nav-right", "nav-up", "nav-up-left", "nav-up-right", "numOctaves", "observer", "offset", "opacity", "operator", "order", "orient", "orientation", "origin", "overflow", "overlay", "overline-position", "overline-thickness", "panose-1", "path", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "phase", "pitch", "playbackOrder", "playbackorder", "pointer-events", "points", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "propagate", "r", "radius", "refX", "refY", "rendering-intent", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "requiredFonts", "requiredFormats", "restart", "result", "rotate", "rx", "ry", "scale", "seed", "shape-rendering", "side", "slope", "snapshotTime", "spacing", "specularConstant", "specularExponent", "spreadMethod", "src", "startOffset", "stdDeviation", "stemh", "stemv", "stitchTiles", "stop-color", "stop-opacity", "strikethrough-position", "strikethrough-thickness", "string", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "style", "surfaceScale", "syncBehavior", "syncBehaviorDefault", "syncMaster", "syncTolerance", "syncToleranceDefault", "systemLanguage", "tableValues", "target", "targetX", "targetY", "text-anchor", "text-decoration", "text-rendering", "textLength", "timelineBegin", "timelinebegin", "title", "to", "transform", "transformBehavior", "type", "u1", "u2", "underline-position", "underline-thickness", "unicode", "unicode-bidi", "unicode-range", "units-per-em", "v-alphabetic", "v-hanging", "v-ideographic", "v-mathematical", "values", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "viewBox", "viewTarget", "visibility", "width", "widths", "word-spacing", "writing-mode", "x", "x-height", "x1", "x2", "xChannelSelector", "y", "y1", "y2", "yChannelSelector", "z", "zoomAndPan"],
    htmlAttributeNames = ["accept", "acceptCharset", "accessKey", "action", "allow", "allowFullScreen", "allowTransparency", "alt", "async", "autoComplete", "autoFocus", "autoPlay", "capture", "cellPadding", "cellSpacing", "challenge", "charSet", "checked", "cite", "classID", "className", "colSpan", "cols", "content", "contentEditable", "contextMenu", "controls", "coords", "crossOrigin", "data", "dateTime", "default", "defer", "dir", "disabled", "download", "draggable", "encType", "form", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "headers", "height", "hidden", "high", "href", "hrefLang", "htmlFor", "httpEquiv", "icon", "id", "inputMode", "integrity", "is", "keyParams", "keyType", "kind", "label", "lang", "list", "loop", "low", "manifest", "marginHeight", "marginWidth", "max", "maxLength", "media", "mediaGroup", "method", "min", "minLength", "multiple", "muted", "name", "noValidate", "nonce", "open", "optimum", "pattern", "placeholder", "poster", "preload", "profile", "radioGroup", "readOnly", "rel", "required", "reversed", "role", "rowSpan", "rows", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "spellCheck", "src", "srcDoc", "srcLang", "srcSet", "start", "step", "style", "summary", "tabIndex", "target", "title", "type", "useMap", "value", "width", "wmode", "wrap"];

},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.prune = prune;

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

},{}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _click = require("./mixins/click");

var _resize = require("./mixins/resize");

var _key2 = require("./mixins/key");

var _event = require("./mixins/event");

var _mouse = require("./mixins/mouse");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Window = /*#__PURE__*/function () {
  function Window() {
    _classCallCheck(this, Window);

    _defineProperty(this, "on", _event.on);

    _defineProperty(this, "off", _event.off);

    _defineProperty(this, "onClick", _click.onClick);

    _defineProperty(this, "offClick", _click.offClick);

    _defineProperty(this, "onResize", _resize.onResize);

    _defineProperty(this, "offResize", _resize.offResize);

    _defineProperty(this, "addResizeObject", addResizeObject);

    _defineProperty(this, "removeResizeObject", removeResizeObject);

    _defineProperty(this, "onKeyUp", _key2.onKeyUp);

    _defineProperty(this, "offKeyUp", _key2.offKeyUp);

    _defineProperty(this, "onKeyDown", _key2.onKeyDown);

    _defineProperty(this, "offKeyDown", _key2.offKeyDown);

    _defineProperty(this, "onMouseUp", _mouse.onMouseUp);

    _defineProperty(this, "onMouseDown", _mouse.onMouseDown);

    _defineProperty(this, "onMouseOver", _mouse.onMouseOver);

    _defineProperty(this, "onMouseOut", _mouse.onMouseOut);

    _defineProperty(this, "onMouseMove", _mouse.onMouseMove);

    _defineProperty(this, "offMouseUp", _mouse.offMouseUp);

    _defineProperty(this, "offMouseDown", _mouse.offMouseDown);

    _defineProperty(this, "offMouseOver", _mouse.offMouseOver);

    _defineProperty(this, "offMouseOut", _mouse.offMouseOut);

    _defineProperty(this, "offMouseMove", _mouse.offMouseMove);

    _defineProperty(this, "addEventListener", _event.addEventListener);

    _defineProperty(this, "findEventListener", _event.findEventListener);

    _defineProperty(this, "findEventListeners", _event.findEventListeners);

    _defineProperty(this, "removeEventListener", _event.removeEventListener);

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

  }]);

  return Window;
}();

var _default = typeof window === "undefined" ? undefined : new Window(); ///


exports["default"] = _default;

function addResizeObject() {} ///


function removeResizeObject() {} ///

},{"./mixins/click":35,"./mixins/event":36,"./mixins/key":38,"./mixins/mouse":39,"./mixins/resize":40}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_RC_BASE_EXTENSION = exports.CARRIAGE_RETURN_CHARACTER = exports.LINE_FEED_CHARACTER = exports.BACKSPACE_CHARACTER = exports.ETX_CHARACTER = exports.CTRL_C = exports.UTF8_ENCODING = exports.DATA_EVENT = exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = exports.POST_METHOD = exports.GET_METHOD = exports.DEFAULT_LOG_FILE_BASE_NAME = exports.DEFAULT_LOG_DIRECTORY_PATH = exports.DEFAULT_LOG_LEVEL = exports.FATAL = exports.ERROR = exports.WARNING = exports.INFO = exports.DEBUG = exports.TRACE = void 0;
var TRACE = "TRACE";
exports.TRACE = TRACE;
var DEBUG = "DEBUG";
exports.DEBUG = DEBUG;
var INFO = "INFO";
exports.INFO = INFO;
var WARNING = "WARNING";
exports.WARNING = WARNING;
var ERROR = "ERROR";
exports.ERROR = ERROR;
var FATAL = "FATAL";
exports.FATAL = FATAL;
var DEFAULT_LOG_LEVEL = WARNING;
exports.DEFAULT_LOG_LEVEL = DEFAULT_LOG_LEVEL;
var DEFAULT_LOG_DIRECTORY_PATH = null;
exports.DEFAULT_LOG_DIRECTORY_PATH = DEFAULT_LOG_DIRECTORY_PATH;
var DEFAULT_LOG_FILE_BASE_NAME = "default";
exports.DEFAULT_LOG_FILE_BASE_NAME = DEFAULT_LOG_FILE_BASE_NAME;
var GET_METHOD = "GET";
exports.GET_METHOD = GET_METHOD;
var POST_METHOD = "POST";
exports.POST_METHOD = POST_METHOD;
var APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = "application/json;charset=UTF-8";
exports.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE = APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
var DATA_EVENT = "data";
exports.DATA_EVENT = DATA_EVENT;
var UTF8_ENCODING = "utf8";
exports.UTF8_ENCODING = UTF8_ENCODING;
var CTRL_C = "^C";
exports.CTRL_C = CTRL_C;
var ETX_CHARACTER = "\x03";
exports.ETX_CHARACTER = ETX_CHARACTER;
var BACKSPACE_CHARACTER = String.fromCharCode(127);
exports.BACKSPACE_CHARACTER = BACKSPACE_CHARACTER;
var LINE_FEED_CHARACTER = "\n";
exports.LINE_FEED_CHARACTER = LINE_FEED_CHARACTER;
var CARRIAGE_RETURN_CHARACTER = "\r";
exports.CARRIAGE_RETURN_CHARACTER = CARRIAGE_RETURN_CHARACTER;
var DEFAULT_RC_BASE_EXTENSION = "";
exports.DEFAULT_RC_BASE_EXTENSION = DEFAULT_RC_BASE_EXTENSION;

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "pathUtilities", {
  enumerable: true,
  get: function get() {
    return _path["default"];
  }
});
Object.defineProperty(exports, "arrayUtilities", {
  enumerable: true,
  get: function get() {
    return _array["default"];
  }
});
Object.defineProperty(exports, "templateUtilities", {
  enumerable: true,
  get: function get() {
    return _template["default"];
  }
});
Object.defineProperty(exports, "fileSystemUtilities", {
  enumerable: true,
  get: function get() {
    return _fileSystem["default"];
  }
});
Object.defineProperty(exports, "asynchronousUtilities", {
  enumerable: true,
  get: function get() {
    return _asynchronous["default"];
  }
});
Object.defineProperty(exports, "miscellaneousUtilities", {
  enumerable: true,
  get: function get() {
    return _miscellaneous["default"];
  }
});

var _path = _interopRequireDefault(require("./utilities/path"));

var _array = _interopRequireDefault(require("./utilities/array"));

var _template = _interopRequireDefault(require("./utilities/template"));

var _fileSystem = _interopRequireDefault(require("./utilities/fileSystem"));

var _asynchronous = _interopRequireDefault(require("./utilities/asynchronous"));

var _miscellaneous = _interopRequireDefault(require("./utilities/miscellaneous"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

},{"./utilities/array":53,"./utilities/asynchronous":54,"./utilities/fileSystem":55,"./utilities/miscellaneous":56,"./utilities/path":62,"./utilities/template":63}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;
exports.second = second;
exports.third = third;
exports.fourth = fourth;
exports.fifth = fifth;
exports.fifthLast = fifthLast;
exports.fourthLast = fourthLast;
exports.thirdLast = thirdLast;
exports.secondLast = secondLast;
exports.last = last;
exports.tail = tail;
exports.push = push;
exports.unshift = unshift;
exports.concat = concat;
exports.clear = clear;
exports.copy = copy;
exports.merge = merge;
exports.splice = splice;
exports.replace = replace;
exports.filter = filter;
exports.find = find;
exports.prune = prune;
exports.patch = patch;
exports.augment = augment;
exports.separate = separate;
exports.forwardsSome = forwardsSome;
exports.backwardsSome = backwardsSome;
exports.forwardsEvery = forwardsEvery;
exports.backwardsEvery = backwardsEvery;
exports.forwardsReduce = forwardsReduce;
exports.backwardsReduce = backwardsReduce;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function first(array) {
  return array[0];
}

function second(array) {
  return array[1];
}

function third(array) {
  return array[2];
}

function fourth(array) {
  return array[3];
}

function fifth(array) {
  return array[4];
}

function fifthLast(array) {
  return array[array.length - 5];
}

function fourthLast(array) {
  return array[array.length - 4];
}

function thirdLast(array) {
  return array[array.length - 3];
}

function secondLast(array) {
  return array[array.length - 2];
}

function last(array) {
  return array[array.length - 1];
}

function tail(array) {
  return array.slice(1);
}

function push(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function unshift(array1, array2) {
  Array.prototype.unshift.apply(array1, array2);
}

function concat(array1, elementOrArray2) {
  var array2 = elementOrArray2 instanceof Array ? elementOrArray2 : [elementOrArray2];
  push(array1, array2);
}

function clear(array) {
  var start = 0;
  return array.splice(start);
}

function copy(array1, array2) {
  var start = 0,
      deleteCount = array2.length; ///

  splice(array1, start, deleteCount, array2);
}

function merge(array1, array2) {
  Array.prototype.push.apply(array1, array2);
}

function splice(array1, start) {
  var deleteCount = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Infinity;
  var array2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var args = [start, deleteCount].concat(_toConsumableArray(array2)),
      deletedItemsArray = Array.prototype.splice.apply(array1, args);
  return deletedItemsArray;
}

function replace(array, element, test) {
  var start = -1;
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      start = index; ///

      return true;
    }
  });

  if (found) {
    var deleteCount = 1;
    array.splice(start, deleteCount, element);
  }

  return found;
}

function filter(array, test) {
  var filteredElements = [];
  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      filteredElements.unshift(firstDeletedElement); ///
    }
  });
  return filteredElements;
}

function find(array, test) {
  var elements = [];
  forwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (passed) {
      elements.push(element);
    }
  });
  return elements;
}

function prune(array, test) {
  var prunedElement = undefined;
  array.some(function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1,
          deletedElements = array.splice(start, deleteCount),
          firstDeletedElement = first(deletedElements);
      prunedElement = firstDeletedElement; ///

      return true;
    }
  });
  return prunedElement;
}

function patch(array, element, test) {
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      return true;
    }
  });

  if (found) {
    array.push(element);
  }

  return found;
}

function augment(array1, array2, test) {
  array2.forEach(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      array1.push(element);
    }
  });
}

function separate(array, array1, array2, test) {
  array.forEach(function (element, index) {
    var passed = test(element, index);
    passed ? array1.push(element) : array2.push(element);
  });
}

function forwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function backwardsSome(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (result) {
      return true;
    }
  }

  return false;
}

function forwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function backwardsEvery(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index],
        result = callback(element, index);

    if (!result) {
      return false;
    }
  }

  return true;
}

function forwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  forwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function backwardsReduce(array, callback, initialValue) {
  var value = initialValue;
  backwardsForEach(array, function (element, index) {
    value = callback(value, element, index);
  });
  return value;
}

function forwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = 0; index < arrayLength; index++) {
    var element = array[index];
    callback(element, index);
  }
}

function backwardsForEach(array, callback) {
  var arrayLength = array.length;

  for (var index = arrayLength - 1; index >= 0; index--) {
    var element = array[index];
    callback(element, index);
  }
}

var _default = {
  first: first,
  second: second,
  third: third,
  fourth: fourth,
  fifth: fifth,
  fifthLast: fifthLast,
  fourthLast: fourthLast,
  thirdLast: thirdLast,
  secondLast: secondLast,
  last: last,
  tail: tail,
  push: push,
  unshift: unshift,
  concat: concat,
  clear: clear,
  copy: copy,
  merge: merge,
  splice: splice,
  replace: replace,
  filter: filter,
  find: find,
  prune: prune,
  patch: patch,
  augment: augment,
  separate: separate,
  forwardsSome: forwardsSome,
  backwardsSome: backwardsSome,
  forwardsEvery: forwardsEvery,
  backwardsEvery: backwardsEvery,
  forwardsReduce: forwardsReduce,
  backwardsReduce: backwardsReduce,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whilst = whilst;
exports.forEach = forEach;
exports.sequence = sequence;
exports.eventually = eventually;
exports.repeatedly = repeatedly;
exports.forwardsForEach = forwardsForEach;
exports.backwardsForEach = backwardsForEach;
exports["default"] = void 0;

function whilst(callback, done, context) {
  var count = -1;

  function next() {
    count++;
    var index = count,
        ///
    terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      callback = callbacks[index];
      callback(next, done, context, index);
    }
  }

  next();
}

function eventually(callbacks, done, context) {
  var length = callbacks.length; ///

  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  callbacks.forEach(function (callback, index) {
    callback(next, done, context, index);
  });
}

function repeatedly(callback, length, done, context) {
  var count = 0;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    }
  }

  for (var index = 0; index < length; index++) {
    callback(next, done, context, index);
  }
}

function forwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = -1;

  function next() {
    count++;
    var terminate = count === length;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

function backwardsForEach(array, callback, done, context) {
  var length = array.length; ///

  var count = length;

  function next() {
    count--;
    var terminate = count === -1;

    if (terminate) {
      done();
    } else {
      var index = count,
          ///
      element = array[index];
      callback(element, next, done, context, index);
    }
  }

  next();
}

var _default = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence,
  eventually: eventually,
  repeatedly: repeatedly,
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};
exports["default"] = _default;

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkEntryExists = checkEntryExists;
exports.checkFileExists = checkFileExists;
exports.checkDirectoryExists = checkDirectoryExists;
exports.isEntryFile = isEntryFile;
exports.isEntryDirectory = isEntryDirectory;
exports.isDirectoryEmpty = isDirectoryEmpty;
exports.readDirectory = readDirectory;
exports.readFile = readFile;
exports.writeFile = writeFile;
exports.appendToFile = appendToFile;
exports.createDirectory = createDirectory;
exports.renameFile = renameFile;
exports.getStats = getStats;
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _constants = require("../constants");

var _path = require("../utilities/path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function checkEntryExists(entryPath) {
  var entryExists = _fs["default"].existsSync(entryPath);

  return entryExists;
}

function checkFileExists(filePath) {
  var fileExists = false;
  var entryPath = filePath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryFile = isEntryFile(entryPath);

    if (entryFile) {
      fileExists = true;
    }
  }

  return fileExists;
}

function checkDirectoryExists(directoryPath) {
  var directoryExists = false;
  var entryPath = directoryPath,
      ///
  entryExists = checkEntryExists(entryPath);

  if (entryExists) {
    var entryDirectory = isEntryDirectory(entryPath);

    if (entryDirectory) {
      directoryExists = true;
    }
  }

  return directoryExists;
}

function isEntryFile(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory(),
      entryFile = !entryDirectory;

  return entryFile;
}

function isEntryDirectory(entryPath) {
  var stat = _fs["default"].statSync(entryPath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(directoryPath) {
  var subEntryNames = readDirectory(directoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;
  return directoryEmpty;
}

function readDirectory(directoryPath) {
  var subEntryNames = _fs["default"].readdirSync(directoryPath);

  return subEntryNames;
}

function readFile(filePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.UTF8_ENCODING;

  var options = {
    encoding: encoding
  },
      content = _fs["default"].readFileSync(filePath, options);

  return content;
}

function writeFile(filePath, content) {
  _fs["default"].writeFileSync(filePath, content);
}

function appendToFile(filePath, content) {
  _fs["default"].appendFileSync(filePath, content);
}

function createDirectory(directoryPath) {
  var directoryPathWithoutBottommostName = (0, _path.pathWithoutBottommostNameFromPath)(directoryPath);

  if (directoryPathWithoutBottommostName !== "." && directoryPathWithoutBottommostName !== null) {
    var parentDirectoryPath = directoryPathWithoutBottommostName,
        ///
    parentDirectoryExists = checkDirectoryExists(parentDirectoryPath);

    if (!parentDirectoryExists) {
      createDirectory(parentDirectoryPath);
    }
  }

  _fs["default"].mkdirSync(directoryPath);
}

function renameFile(oldFilePath, newFilePath) {
  _fs["default"].renameSync(oldFilePath, newFilePath);
}

function getStats(filePath) {
  return _fs["default"].statSync(filePath);
}

var _default = {
  checkEntryExists: checkEntryExists,
  checkFileExists: checkFileExists,
  checkDirectoryExists: checkDirectoryExists,
  isEntryFile: isEntryFile,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  readDirectory: readDirectory,
  readFile: readFile,
  writeFile: writeFile,
  appendToFile: appendToFile,
  createDirectory: createDirectory,
  renameFile: renameFile,
  getStats: getStats
};
exports["default"] = _default;

},{"../constants":51,"../utilities/path":62,"fs":20}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _rc = _interopRequireDefault(require("./miscellaneous/rc"));

var _log = _interopRequireDefault(require("./miscellaneous/log"));

var _onETX = _interopRequireDefault(require("./miscellaneous/onETX"));

var _prompt = _interopRequireDefault(require("./miscellaneous/prompt"));

var _ajax = require("./miscellaneous/ajax");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  log: _log["default"],
  rc: _rc["default"],
  get: _ajax.get,
  post: _ajax.post,
  onETX: _onETX["default"],
  prompt: _prompt["default"]
};
exports["default"] = _default;

},{"./miscellaneous/ajax":57,"./miscellaneous/log":58,"./miscellaneous/onETX":59,"./miscellaneous/prompt":60,"./miscellaneous/rc":61}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;

var _constants = require("../../constants");

function get(host, uri, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.GET_METHOD,
      body = undefined;
  request(host, uri, parameters, method, body, callback);
}

function post(host, uri, json, parameters, callback) {
  if (callback === undefined) {
    callback = parameters; ///

    parameters = {};
  }

  var method = _constants.POST_METHOD,
      body = JSON.stringify(json);
  request(host, uri, parameters, method, body, callback);
}

function request(host, uri, parameters, method, body, callback) {
  var url = urlFromHostURIAndParameters(host, uri, parameters),
      xmlHttpRequest = new XMLHttpRequest();

  xmlHttpRequest.onreadystatechange = function () {
    var readyState = xmlHttpRequest.readyState,
        status = xmlHttpRequest.status,
        responseText = xmlHttpRequest.responseText;

    if (readyState == 4) {
      var json = null;

      if (status == 200) {
        var jsonString = responseText; ///

        try {
          json = JSON.parse(jsonString);
        } catch (error) {///
        }

        callback(json);
      }
    }
  };

  var contentType = _constants.APPLICATION_JSON_CHARSET_UTF8_CONTENT_TYPE;
  xmlHttpRequest.open(method, url);
  xmlHttpRequest.setRequestHeader("content-type", contentType);
  xmlHttpRequest.send(body);
}

function queryStringFromParameters(parameters) {
  var names = Object.keys(parameters),
      namesLength = names.length,
      lastIndex = namesLength - 1,
      queryString = names.reduce(function (queryString, name, index) {
    var value = parameters[name],
        encodedName = encodeURIComponent(name),
        encodedValue = encodeURIComponent(value),
        ampersandOrNothing = index !== lastIndex ? "&" : "";
    queryString += "".concat(encodedName, "=").concat(encodedValue).concat(ampersandOrNothing);
    return queryString;
  }, "");
  return queryString;
}

function urlFromHostURIAndParameters(host, uri, parameters) {
  var queryString = queryStringFromParameters(parameters),
      url = queryString === "" ? "".concat(host).concat(uri) : "".concat(host).concat(uri, "?").concat(queryString);
  return url;
}

},{"../../constants":51}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = log;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _path2 = require("../../utilities/path");

var _fileSystem = require("../../utilities/fileSystem");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logLevel = _constants.DEFAULT_LOG_LEVEL,
    logFileBaseName = _constants.DEFAULT_LOG_FILE_BASE_NAME,
    logDirectoryPath = _constants.DEFAULT_LOG_DIRECTORY_PATH;

function log(messageOrError) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var salientStackMessageIndex = 1;
  var levels = [_constants.TRACE, _constants.DEBUG, _constants.INFO, _constants.WARNING, _constants.ERROR, _constants.FATAL];

  if (level !== "") {
    var levelIndex = levels.indexOf(level),
        logLevelIndex = levels.indexOf(logLevel);

    if (levelIndex < logLevelIndex) {
      return;
    }

    salientStackMessageIndex += 1;
    level = "".concat(level, " "); ///
  }

  var error, message;

  if (messageOrError instanceof Error) {
    error = messageOrError; ///

    var _error = error;
    message = _error.message;
  } else {
    message = messageOrError; ///

    error = new Error(message);
  }

  var _error2 = error,
      stack = _error2.stack,
      stackMessages = stackMessagesFromStack(stack),
      pertinentStackMessage = stackMessages[salientStackMessageIndex],
      stackMessage = pertinentStackMessage,
      currentDateAndTimeString = getCurrentDateAndTimeString(),
      filePath = filePathFromStackMessage(stackMessage),
      lineNumber = lineNumberFromStackMessage(stackMessage),
      logMessage = "".concat(level).concat(currentDateAndTimeString, " ").concat(filePath, "(").concat(lineNumber, ") ").concat(message);
  console.log(logMessage);

  if (logDirectoryPath !== null) {
    rollOverLogFile();
    var logFilePath = getLogFilePath(),
        logFileContent = "".concat(logMessage, "\n");
    (0, _fileSystem.appendToFile)(logFilePath, logFileContent);
  }

  return logMessage;
}

function trace(message) {
  return log(message, _constants.TRACE);
}

function debug(message) {
  return log(message, _constants.DEBUG);
}

function info(message) {
  return log(message, _constants.INFO);
}

function warning(message) {
  return log(message, _constants.WARNING);
}

function error(message) {
  return log(message, _constants.ERROR);
}

function fatal(message) {
  return log(message, _constants.FATAL);
}

function setLogLevel(level) {
  logLevel = level;
}

function setLogFileBaseName(fileBaseName) {
  logFileBaseName = fileBaseName;
}

function setLogDirectoryPath(directoryPath) {
  logDirectoryPath = directoryPath;
}

function setLogOptions(logOptions) {
  var level = logOptions.level,
      fileBaseName = logOptions.fileBaseName,
      directoryPath = logOptions.directoryPath;
  setLogLevel(level);
  setLogFileBaseName(fileBaseName);
  setLogDirectoryPath(directoryPath);
}

function getLogFileContent() {
  var logFilePath = getLogFilePath(),
      logFileContent = (0, _fileSystem.readFile)(logFilePath);
  return logFileContent;
}

Object.assign(log, {
  TRACE: _constants.TRACE,
  DEBUG: _constants.DEBUG,
  INFO: _constants.INFO,
  WARNING: _constants.WARNING,
  ERROR: _constants.ERROR,
  FATAL: _constants.FATAL,
  trace: trace,
  debug: debug,
  info: info,
  warning: warning,
  error: error,
  fatal: fatal,
  setLogLevel: setLogLevel,
  setLogFileBaseName: setLogFileBaseName,
  setLogDirectoryPath: setLogDirectoryPath,
  setLogOptions: setLogOptions,
  getLogFileContent: getLogFileContent
});

function getLogFilePath() {
  var logFileName = "".concat(logFileBaseName, ".log"),
      logFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, logFileName);
  return logFilePath;
}

function getRolledOverLogFilePath() {
  var currentDateString = getCurrentDateString(),
      rolledOverLogFileName = "".concat(logFileBaseName, ".").concat(currentDateString, ".log"),
      rolledOverLogFilePath = (0, _path2.concatenatePaths)(logDirectoryPath, rolledOverLogFileName);
  return rolledOverLogFilePath;
}

function getLogFileLastModifiedDate() {
  var logFilePath = getLogFilePath(),
      logFileStats = (0, _fileSystem.getStats)(logFilePath),
      mtime = logFileStats.mtime,
      logFileLastModifiedDate = new Date(mtime); ///

  return logFileLastModifiedDate;
}

function rollOverLogFile() {
  var logFilePath = getLogFilePath(),
      logFileExists = (0, _fileSystem.checkFileExists)(logFilePath);

  if (!logFileExists) {
    return;
  }

  var logFileLastModifiedDate = getLogFileLastModifiedDate(),
      logFileLastModifiedDateCurrentDate = isDateCurrentDate(logFileLastModifiedDate);

  if (!logFileLastModifiedDateCurrentDate) {
    var rolledOverLogFilePath = getRolledOverLogFilePath();
    (0, _fileSystem.renameFile)(logFilePath, rolledOverLogFilePath);
  }
}

function isDateCurrentDate(date) {
  var currentDate = new Date(),
      dateString = date.toDateString(),
      currentDateString = currentDate.toDateString(),
      dateCurrentDate = dateString === currentDateString;
  return dateCurrentDate;
}

function getCurrentDateString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year);
  return currentDateAndTimeString;
}

function getCurrentDateAndTimeString() {
  var date = new Date(),
      day = padStartWithZeroes(date.getDate(), 2),
      ///
  month = padStartWithZeroes(date.getMonth() + 1, 2),
      ///
  year = date.getFullYear(),
      hours = padStartWithZeroes(date.getHours(), 2),
      minutes = padStartWithZeroes(date.getMinutes(), 2),
      seconds = padStartWithZeroes(date.getSeconds(), 2),
      milliseconds = padStartWithZeroes(date.getMilliseconds(), 3),
      currentDateAndTimeString = "".concat(day, "-").concat(month, "-").concat(year, " ").concat(hours, ":").concat(minutes, ":").concat(seconds, ".").concat(milliseconds);
  return currentDateAndTimeString;
}

function stackMessagesFromStack(stack) {
  var stackMessages = [],
      stackLines = stack.split(/\r\n|\n/);
  var stackMessage = "";
  stackLines.forEach(function (stackLine) {
    var matches = /^\s*at.*/.test(stackLine);
    stackMessage = stackMessage === "" ? stackLine : "".concat(stackMessage, "\n").concat(stackLine);

    if (matches) {
      stackMessages.push(stackMessage);
      stackMessage = "";
    }
  });
  return stackMessages;
}

function filePathFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/(\/.+):\d+:\d+/m),
      secondMatch = (0, _array.second)(matches),
      absoluteFilePath = secondMatch,
      ///
  currentWorkingDirectoryPath = _path["default"].resolve("."),
      ///
  currentWorkingDirectoryPathLength = currentWorkingDirectoryPath.length,
      start = currentWorkingDirectoryPathLength + 1,
      ///
  filePath = absoluteFilePath.substr(start);

  return filePath;
}

function lineNumberFromStackMessage(stackMessage) {
  var matches = stackMessage.match(/:(\d+)/m),
      secondMatch = (0, _array.second)(matches),
      lineNumber = secondMatch; ///

  return lineNumber;
}

function padStartWithZeroes(string, targetLength) {
  var padString = "0",
      paddedString = padStart(string, targetLength, padString);
  return paddedString;
}

function padStart(string, targetLength, padString) {
  var padding = "";

  for (var index = 0; index < targetLength; index++) {
    padding += padString;
  }

  var paddedString = "".concat(padding).concat(string).substr(-targetLength);
  return paddedString;
}

},{"../../constants":51,"../../utilities/array":53,"../../utilities/fileSystem":55,"../../utilities/path":62,"path":64}],59:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = onETX;

var _constants = require("../../constants");

function onETX(handler) {
  var event = _constants.DATA_EVENT;

  if (process.stdin.setRawMode) {
    var rawMode = true,
        encoding = _constants.UTF8_ENCODING;
    process.stdin.setRawMode(rawMode);
    process.stdin.setEncoding(encoding);
    process.stdin.resume();
    process.stdin.addListener(event, dataHandler);
    return offExt;
  }

  function offExt() {
    process.stdin.removeListener(event, dataHandler);
  }

  function dataHandler(character) {
    if (character === _constants.ETX_CHARACTER) {
      handler();
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":51,"_process":65}],60:[function(require,module,exports){
(function (process){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = prompt;

var _onETX = _interopRequireDefault(require("./onETX"));

var _asynchronous = require("../../utilities/asynchronous");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function prompt(options, callback) {
  var value = null,
      _options$attempts = options.attempts,
      attempts = _options$attempts === void 0 ? 3 : _options$attempts,
      context = {
    value: value,
    attempts: attempts,
    options: options
  };
  (0, _asynchronous.whilst)(attempt, function () {
    var value = context.value;
    callback(value);
  }, context);
}

function attempt(next, done, context) {
  var attempts = context.attempts;
  var terminate = attempts-- === 0;

  if (terminate) {
    done();
    return;
  }

  var options = context.options,
      _options$hidden = options.hidden,
      hidden = _options$hidden === void 0 ? false : _options$hidden,
      _options$encoding = options.encoding,
      encoding = _options$encoding === void 0 ? "utf8" : _options$encoding,
      description = options.description,
      _options$initialValue = options.initialValue,
      initialValue = _options$initialValue === void 0 ? "" : _options$initialValue,
      errorMessage = options.errorMessage,
      validationPattern = options.validationPattern,
      validationFunction = options.validationFunction;
  input(description, initialValue, encoding, hidden, callback);

  function callback(value) {
    var valid = validationFunction ? ///
    validationFunction(value) : validationPattern.test(value);

    if (valid) {
      Object.assign(context, {
        value: value
      });
      done();
    } else {
      console.log(errorMessage);
      Object.assign(context, {
        attempts: attempts
      });
      next();
    }
  }
}

function input(description, initialValue, encoding, hidden, callback) {
  var value = initialValue; ///

  var event = _constants.DATA_EVENT,
      rawMode = true,
      offETX = (0, _onETX["default"])(function () {
    console.log(_constants.CTRL_C);
    process.exit();
  });
  process.stdin.setEncoding(encoding);
  process.stdin.setRawMode(rawMode);
  process.stdout.write(description);

  if (!hidden) {
    process.stdout.write(value);
  }

  process.stdin.resume();
  process.stdin.on(event, listener);

  function listener(chunk) {
    var character = chunk.toString(encoding);

    switch (character) {
      case _constants.LINE_FEED_CHARACTER:
      case _constants.CARRIAGE_RETURN_CHARACTER:
        process.stdout.write(_constants.LINE_FEED_CHARACTER);
        process.stdin.removeListener(event, listener);
        process.stdin.pause();
        offETX();
        callback(value);
        break;

      case _constants.BACKSPACE_CHARACTER:
        value = value.slice(0, value.length - 1);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(description);

        if (!hidden) {
          process.stdout.write(value);
        }

        break;

      default:
        value += character;

        if (!hidden) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(description);
          process.stdout.write(value);
        }

        break;
    }
  }
}

}).call(this,require('_process'))

},{"../../constants":51,"../../utilities/asynchronous":54,"./onETX":59,"_process":65}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = rc;

var _path = _interopRequireDefault(require("path"));

var _array = require("../../utilities/array");

var _constants = require("../../constants");

var _fileSystem = require("../../utilities/fileSystem");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pathResolver = _path["default"].resolve,
    baseExtension = _constants.DEFAULT_RC_BASE_EXTENSION;

function rc() {
  var environmentNameOrArgv = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var environment,
      environmentName,
      environmentNameOrArgvArgv = environmentNameOrArgv instanceof Array;

  if (environmentNameOrArgvArgv) {
    var argv = environmentNameOrArgv; ///

    environmentName = environmentNameFromArgv(argv);
  } else {
    environmentName = environmentNameOrArgv; ///
  }

  var json = readRCFile(),
      environments = json.environments;

  if (environmentName === null) {
    var firstEnvironment = (0, _array.first)(environments);
    environment = firstEnvironment; ///
  } else {
    environment = environments.find(function (environment) {
      var name = environment.name,
          found = name === environmentName;
      return found;
    });
  }

  delete environment.name;
  Object.assign(rc, environment);
  return environment;
}

function readRCFile() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = (0, _fileSystem.readFile)(absoluteRCFilePath),
      json = JSON.parse(fileContent);
  return json;
}

function writeRCFile(json) {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      fileContent = JSON.stringify(json, null, "\t");
  (0, _fileSystem.writeFile)(absoluteRCFilePath, fileContent);
}

function updateRCFile(addedProperties) {
  var json = readRCFile();

  if (addedProperties) {
    Object.assign(json, addedProperties);
  }

  for (var _len = arguments.length, deletedPropertyNames = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    deletedPropertyNames[_key - 1] = arguments[_key];
  }

  deletedPropertyNames.forEach(function (deletedPropertyName) {
    delete json[deletedPropertyName];
  });
  writeRCFile(json);
}

function checkRCFileExists() {
  var absoluteRCFilePath = absoluteRCFilePathFromNothing(),
      rcFileExists = (0, _fileSystem.checkFileExists)(absoluteRCFilePath);
  return rcFileExists;
}

function createVacuousRCFile() {
  var json = {
    "environments": [{}]
  };
  writeRCFile(json);
}

function setRCBaseExtension(rcBaseExtension) {
  baseExtension = rcBaseExtension;
}

function setRCPathResolver(rcPathResolver) {
  pathResolver = rcPathResolver;
}

Object.assign(rc, {
  readRCFile: readRCFile,
  writeRCFile: writeRCFile,
  updateRCFile: updateRCFile,
  checkRCFileExists: checkRCFileExists,
  createVacuousRCFile: createVacuousRCFile,
  setRCBaseExtension: setRCBaseExtension,
  setRCPathResolver: setRCPathResolver
});

function environmentNameFromArgv(argv) {
  var environmentName = null;
  argv.find(function (argument) {
    ///
    var matches = argument.match(/--environment=(.+)/),
        found = matches !== null;

    if (found) {
      var secondMatch = (0, _array.second)(matches);
      environmentName = secondMatch;
    }

    return found;
  });
  return environmentName;
}

function absoluteRCFilePathFromNothing() {
  var filePath = "./.".concat(baseExtension, "rc"),
      absoluteRCFilePath = pathResolver(filePath);
  return absoluteRCFilePath;
}

},{"../../constants":51,"../../utilities/array":53,"../../utilities/fileSystem":55,"path":64}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPathName = isPathName;
exports.isPathTopmostName = isPathTopmostName;
exports.isPathRelativePath = isPathRelativePath;
exports.isPathAbsolutePath = isPathAbsolutePath;
exports.isTopmostNameInAbsolutePath = isTopmostNameInAbsolutePath;
exports.combinePaths = combinePaths;
exports.concatenatePaths = concatenatePaths;
exports.bottommostNameFromPath = bottommostNameFromPath;
exports.topmostDirectoryPathFromPath = topmostDirectoryPathFromPath;
exports.topmostDirectoryNameFromPath = topmostDirectoryNameFromPath;
exports.pathWithoutBottommostNameFromPath = pathWithoutBottommostNameFromPath;
exports.pathWithoutTopmostDirectoryNameFromPath = pathWithoutTopmostDirectoryNameFromPath;
exports["default"] = void 0;

var _array = require("../utilities/array");

function isPathName(path) {
  path = path.replace(/^\//, "").replace(/\/$/, ""); ///

  var pathName = /\//.test(path) === false;
  return pathName;
}

function isPathTopmostName(path) {
  var pathName = isPathName(path),
      pathAbsolutePath = isPathAbsolutePath(path),
      pathTopmostName = pathName && pathAbsolutePath;
  return pathTopmostName;
}

function isPathRelativePath(path) {
  var pathRelativePath = !/^\//.test(path);
  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathAbsolutePath = /^\//.test(path);
  return pathAbsolutePath;
}

function isTopmostNameInAbsolutePath(topmostName, absolutePath) {
  var regExp = new RegExp("^".concat(topmostName, "(?:\\/.+)?$")),
      topmostNameInAbsolutePath = regExp.test(absolutePath);
  return topmostNameInAbsolutePath;
}

function combinePaths(path, relativePath) {
  var combinedPath = null;
  var pathNames = path.split(/\//),
      relativePathNames = relativePath.split(/\//);
  var lastPathName,
      firstRelativePathName = (0, _array.first)(relativePathNames);

  if (firstRelativePathName === ".") {
    relativePathNames.shift();
  }

  firstRelativePathName = (0, _array.first)(relativePathNames);
  lastPathName = (0, _array.last)(pathNames);

  while (firstRelativePathName === ".." && lastPathName !== undefined) {
    relativePathNames.shift();
    pathNames.pop();
    firstRelativePathName = (0, _array.first)(relativePathNames);
    lastPathName = (0, _array.last)(pathNames);
  }

  if (lastPathName !== undefined) {
    var combinedPathNames = [].concat(pathNames).concat(relativePathNames);
    combinedPath = combinedPathNames.join("/");
  }

  return combinedPath;
}

function concatenatePaths(path, relativePath) {
  path = path.replace(/\/$/, ""); ///

  var concatenatedPath = "".concat(path, "/").concat(relativePath);
  return concatenatedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;
  var matches = path.match(/^.*\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = (0, _array.second)(matches),
      topmostDirectoryPath = secondMatch; ///

  return topmostDirectoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;
  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;
  var matches = path.match(/^(.*)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;
  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = (0, _array.second)(matches);
    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

var _default = {
  isPathName: isPathName,
  isPathTopmostName: isPathTopmostName,
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isTopmostNameInAbsolutePath: isTopmostNameInAbsolutePath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};
exports["default"] = _default;

},{"../utilities/array":53}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseFile = parseFile;
exports.parseContent = parseContent;
exports.parseLine = parseLine;
exports["default"] = void 0;

var _fileSystem = require("../utilities/fileSystem");

function parseFile(filePath, args, regex) {
  var content = (0, _fileSystem.readFile)(filePath),
      parsedContent = parseContent(content, args, regex);
  return parsedContent;
}

function parseContent(content, args, regex) {
  var lines = content.split("\n"),
      parsedLines = parseLines(lines, args, regex),
      parsedContent = parsedLines.join("\n");
  return parsedContent;
}

function parseLine(line, args) {
  var regex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /\${(.+?)}/g;
  var parsedLine = line.replace(regex, function (match, token) {
    var parsedToken = parseToken(token, args);
    return parsedToken;
  });
  return parsedLine;
}

var _default = {
  parseFile: parseFile,
  parseContent: parseContent,
  parseLine: parseLine
};
exports["default"] = _default;

function parseLines(lines, args, regex) {
  var parsedLines = lines.map(function (line) {
    var parsedLine = parseLine(line, args, regex);
    return parsedLine;
  });
  return parsedLines;
}

function parseToken(token, args) {
  var parsedToken = "";

  if (args.hasOwnProperty(token)) {
    parsedToken = args[token];
  }

  return parsedToken;
}

},{"../utilities/fileSystem":55}],64:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":65}],65:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYnV0dG9uL25hbWUuanMiLCJsaWIvY29uc3RhbnRzLmpzIiwibGliL2Ryb3BUYXJnZXQuanMiLCJsaWIvZW50cmllcy5qcyIsImxpYi9lbnRyeS5qcyIsImxpYi9lbnRyeS9kcmFnZ2FibGUuanMiLCJsaWIvZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUuanMiLCJsaWIvZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lLmpzIiwibGliL2VudHJ5L21hcmtlci5qcyIsImxpYi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyIsImxpYi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiLCJsaWIvZXhhbXBsZS5qcyIsImxpYi9leGFtcGxlL3ZpZXcuanMiLCJsaWIvZXhwbG9yZXIuanMiLCJsaWIvaW5kZXguanMiLCJsaWIvb3B0aW9ucy5qcyIsImxpYi9ydWJiaXNoQmluLmpzIiwibGliL3R5cGVzLmpzIiwibGliL3V0aWxpdGllcy9uYW1lLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvaW5wdXRFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL2lucHV0RWxlbWVudC9pbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9pbnB1dEVsZW1lbnQvdGV4dGFyZWEuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWlzY2VsbGFuZW91cy9ib3VuZHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWlzY2VsbGFuZW91cy9vZmZzZXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9ldmVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvanN4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9rZXkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL21vdXNlLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9yZXNpemUuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL3Njcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvc3RhdGUuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvcmVhY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdGV4dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdXRpbGl0aWVzL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9kb20uanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdXRpbGl0aWVzL2VsZW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9uYW1lLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9vYmplY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXN5bmNocm9ub3VzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL2ZpbGVTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL2FqYXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9sb2cuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9vbkVUWC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3Byb21wdC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3JjLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL3BhdGguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvdGVtcGxhdGUuanMiLCJub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVEsSyxHQUFVLHlCLENBQVYsSzs7SUFFYSxVOzs7Ozs7Ozs7Ozs7OzhCQUNUO0FBQ1IsVUFBTSxhQUFhLEdBQUcsS0FBSyxnQkFBTCxFQUF0QjtBQUFBLFVBQ00saUJBQWlCLEdB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IElucHV0RWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBnZXROYW1lKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50VGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gZmlyc3RDaGlsZEVsZW1lbnRUZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbihcImRibGNsaWNrXCIsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldE5hbWUgPSB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSxcblx0XHRcdFx0ICBvbkRvdWJsZUNsaWNrID0gdGhpcy5vbkRvdWJsZUNsaWNrLmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5hbWUsXG4gICAgICBvbkRvdWJsZUNsaWNrXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiYnV0dG9uXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJuYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJuYW1lXCJcbiAgXTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNztcbmV4cG9ydCBjb25zdCBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFbGVtZW50IH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kcm9wVGFyZ2V0cyA9IGRyb3BUYXJnZXRzO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBudWxsO1xuXG4gICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXM7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcm9wVGFyZ2V0cy5zb21lKChkcm9wVGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7ICAvLy9cblxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGxldCBtYXJrZWREcm9wVGFyZ2V0ID0gbnVsbDtcblxuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICB1bm1hcmtHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgKCkgPT4ge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gbGFzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnkgPSBmaXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBzLmZpbmQoKHBhdGhNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICB7IHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGNhbGxiYWNrIH0gPSBwYXRoTWFwO1xuXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgdHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRSA6XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgICB0YXJnZXRGaWxlUGF0aCA9IHRhcmdldFBhdGg7XG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgdGhpcy5kcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5hZGREcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQsIHJlY2lwcm9jYXRlZCA9IGZhbHNlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCk7XG5cbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG4gICAgICBcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwcm9jYXRlZCkge1xuICAgICAgZHJvcFRhcmdldC5yZW1vdmVEcm9wVGFyZ2V0KHRoaXMpOyAvLy9cbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXSxcbiAgICAgICAgICBkcm9wVGFyZ2V0ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHJldHVybiBkcm9wVGFyZ2V0O1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRmlsZU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWVcIjtcbmltcG9ydCBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZVwiO1xuaW1wb3J0IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBmcm9tIFwiLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZVwiO1xuXG5pbXBvcnQgeyBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTLCBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoLCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGggfSA9IHBhdGhVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKFwibGkuZW50cnlcIiksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGlzTWFya2VyRW50cnlQcmVzZW50KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVByZXNlbnQgPSAobWFya2VyRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSxcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChmaWxlTmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSwgIC8vL1xuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZUVudHJ5ID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcblxuICAgICAgICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZUVudHJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyRW50cnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG5cbiAgICBjb25zdCBuYW1lID0gbWFya2VyRW50cnlOYW1lLCAvLy9cbiAgICAgICAgICB0eXBlID0gZHJhZ2dhYmxlRW50cnlUeXBlOyAgLy8vXG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+XG5cbiAgICAgICAgO1xuXG4gICAgICAgIG1hcmtlckVudHJ5ID0gZmlsZU5hbWVNYXJrZXJFbnRyeTsgIC8vL1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPVxuXG4gICAgICAgICAgPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTsgLy8vXG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBuYW1lID0gZmlsZU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmV4cGxvcmVyLCAvLy9cbiAgICAgICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmV4cGxvcmVyLmdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9XG5cbiAgICAgICAgICAgIDxEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz5cblxuICAgICAgICAgICxcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlckVudHJ5TmFtZSA9IG1hcmtlckVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJFbnRyeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyRW50cnlQYXRoKTtcblxuICAgICAgbWFya2VyRW50cnlQYXRoID0gbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkID0gZmFsc2UpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lKSB7XG4gICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWU7IC8vL1xuXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnNldENvbGxhcHNlZChjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNFbXB0eSgpO1xuXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaW5kTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTsgIC8vL1xuICAgICAgICAgIH0sIEZJTEVfTkFNRV9NQVJLRVJfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNUb3Btb3N0KCk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlckVudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBtYXJrZXJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlckVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRmlsZVBhdGhzKGZpbGVQYXRocyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgZmlsZVBhdGhzLnB1c2goZmlsZVBhdGgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoZGlyZWN0b3J5UGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeVBhdGhzLnB1c2goZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke2RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWV9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KChmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyhzdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZE1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGxldCBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gdHJ1ZTtcblxuICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0KSB7XG4gICAgICAgICAgY29uc3Qgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICAgIGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHJhZ0ludG9TdWJEaXJlY3Rvcmllcykge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnkobmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBmaW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhmaWxlTmFtZSwgRklMRV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGRpcmVjdG9yeU5hbWUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgICB0eXBlc0luY2x1ZGVzRW50cnlUeXBlID0gdHlwZXMuaW5jbHVkZXMoZW50cnlUeXBlKTtcblxuICAgICAgaWYgKHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKChlbnRyeSkgPT4ge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKG5hbWUsIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeUJ5VHlwZXMoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgLi4udHlwZXMpO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcblxuICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSB8fCBudWxsOyAvLy87XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZmluZEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJ5ID0gZW50cmllcy5maW5kKGNhbGxiYWNrKSB8fCBudWxsOyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG5cdCAgY29uc3QgZ2V0RXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgaXNFbXB0eSA9IHRoaXMuaXNFbXB0eS5iaW5kKHRoaXMpLFxuICAgICAgICAgIGFkZE1hcmtlciA9IHRoaXMuYWRkTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlTWFya2VyID0gdGhpcy5yZW1vdmVNYXJrZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRGaWxlUGF0aCA9IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICByZW1vdmVGaWxlUGF0aCA9IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGREaXJlY3RvcnlQYXRoID0gdGhpcy5hZGREaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCA9IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50ID0gdGhpcy5pc01hcmtlckVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudC5iaW5kKHRoaXMpLFxuICAgICAgICAgIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlTWFya2VyRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VyRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyk7XG5cbiAgICByZXR1cm4gKHtcbiAgICAgIGdldEV4cGxvcmVyLFxuICAgICAgaXNFbXB0eSxcbiAgICAgIGFkZE1hcmtlcixcbiAgICAgIHJlbW92ZU1hcmtlcixcbiAgICAgIGFkZEZpbGVQYXRoLFxuICAgICAgcmVtb3ZlRmlsZVBhdGgsXG4gICAgICBhZGREaXJlY3RvcnlQYXRoLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aCxcbiAgICAgIGlzTWFya2VyRW50cnlQcmVzZW50LFxuICAgICAgaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQsXG4gICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlTWFya2VyRW50cnksXG4gICAgICByZXRyaWV2ZUZpbGVQYXRocyxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyxcbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcInVsXCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJlbnRyaWVzXCJcbiAgfTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBlbnRyaWVzID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGV4cGxvcmVyKTtcblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cnlcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm5hbWVcIlxuICBdO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHdpbmRvdywgY29uc3RhbnRzIH0gZnJvbSBcImVhc3lcIjtcblxuaW1wb3J0IEVudHJ5IGZyb20gXCIuLi9lbnRyeVwiO1xuaW1wb3J0IG9wdGlvbnMgZnJvbSBcIi4uL29wdGlvbnNcIjtcblxuaW1wb3J0IHsgRVNDQVBFX0tFWUNPREUsIFNUQVJUX0RSQUdHSU5HX0RFTEFZIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IExFRlRfTU9VU0VfQlVUVE9OIH0gPSBjb25zdGFudHMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLCBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HIH0gPSBvcHRpb25zO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLnNldEluaXRpYWxTdGF0ZSgpO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gZXhwbG9yZXIucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoY29sbGFwc2VkQm91bmRzKTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcywgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKFwiZHJhZ2dpbmdcIik7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBsZXQgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG5cbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IGV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgICBcbiAgICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblxuICAgICAgdGhpcy5yZXNldFRpbWVvdXQoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgY29uc3QgeyBidXR0b24sIHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQsXG4gICAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICAgIHdpbmRvdy5vbihcImJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7IC8vL1xuXG4gICAgd2luZG93Lm9uTW91c2VVcCh0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTtcblxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgaWYgKGJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICB3aW5kb3cub2ZmKFwiYmx1clwiLCB0aGlzLm1vdXNlVXBIYW5kbGVyLCB0aGlzKTsgIC8vL1xuXG4gICAgd2luZG93Lm9mZk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlciwgdGhpcyk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpczsgIC8vL1xuICAgICAgXG4gICAgICBleHBsb3Jlci5zdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksICgpID0+IHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsgcGFnZVgsIHBhZ2VZIH0gPSBldmVudCxcbiAgICAgICAgICBtb3VzZVRvcCA9IHBhZ2VZLFxuICAgICAgICAgIG1vdXNlTGVmdCA9IHBhZ2VYO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQsXG4gICAgICAgICAgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBleHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gdGhpcy5nZXRUb3BPZmZzZXQoKSxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gdGhpcy5nZXRMZWZ0T2Zmc2V0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0b3BPZmZzZXQgLSB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyBsZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3AsXG4gICAgICBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICByZXNldFRpbWVvdXQoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICB9XG4gIFxuICBnZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHN0YXRlID0gdGhpcy5nZXRTdGF0ZSgpLFxuICAgICAgICAgIHsgdGltZW91dCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdGltZW91dDtcbiAgfVxuXG4gIGdldFRvcE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRvcE9mZnNldCB9ID0gc3RhdGU7XG5cbiAgICByZXR1cm4gdG9wT2Zmc2V0O1xuICB9XG5cbiAgZ2V0TGVmdE9mZnNldCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IGxlZnRPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzZXRUaW1lb3V0KHRpbWVvdXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRpbWVvdXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldFRvcE9mZnNldCh0b3BPZmZzZXQpIHtcbiAgICB0aGlzLnVwZGF0ZVN0YXRlKHtcbiAgICAgIHRvcE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IG51bGwsXG4gICAgICAgICAgdG9wT2Zmc2V0ID0gbnVsbCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRpbWVvdXQsXG4gICAgICB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBpbml0aWFsaXNlKHByb3BlcnRpZXMpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcblxuICAgIGNvbnN0IG1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKSxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSB0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIFxuICAgIHRoaXMub25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlcik7XG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwibGlcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRyYWdnYWJsZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwiZXhwbG9yZXJcIlxuICBdO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi4vLi4vZW50cmllc1wiO1xuaW1wb3J0IE5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lXCI7XG5pbXBvcnQgRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L2RyYWdnYWJsZVwiO1xuXG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5jb25zdCB7IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcyhcImNvbGxhcHNlZFwiKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeVByZXNlbnQgPSB0aGlzLmlzTWFya2VyRW50cnlQcmVzZW50KCksXG4gICAgICAgICAgbWFya2VkID0gbWFya2VyRW50cnlQcmVzZW50OyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBiZWZvcmUgPSB0cnVlO1xuICAgICAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzVG9wbW9zdCgpIHtcbiAgICBjb25zdCBwYXRoID0gdGhpcy5nZXRQYXRoKCksXG4gICAgICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKSxcbiAgICAgICAgICB0b3Btb3N0ID0gKHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvcG1vc3Q7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBzZXRDb2xsYXBzZWQoY29sbGFwc2VkKSB7XG4gICAgY29sbGFwc2VkID9cbiAgICAgIHRoaXMuY29sbGFwc2UoKSA6XG4gICAgICAgIHRoaXMuZXhwYW5kKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25DbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcn0gLz4sXG4gICAgICA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+LFxuICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgXSk7XG4gIH1cbiAgXG4gIGluaXRpYWxpc2UoY29sbGFwc2VkKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcblxuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgY29sbGFwc2VkID0gZmFsc2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEUsIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZGlyZWN0b3J5LW5hbWVcIlxuICB9O1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcImNvbGxhcHNlZFwiXG4gIF07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE5hbWVCdXR0b24gZnJvbSBcIi4uLy4uL2J1dHRvbi9uYW1lXCI7XG5pbXBvcnQgRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L2RyYWdnYWJsZVwiO1xuXG5pbXBvcnQgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL25hbWVcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVTdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlU3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcblxuICAgIHJldHVybiAoW1xuXG4gICAgICA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+XG5cbiAgICBdKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHR5cGUgPSBGSUxFX05BTUVfVFlQRSwgIC8vL1xuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIGV4cGxvcmVyKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEVudHJ5IGZyb20gXCIuLi9lbnRyeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXJrZXJFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHR5cGUsIG5hbWUpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5uYW1lO1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJtYXJrZXJcIlxuICB9O1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbWFya2VyRW50cnkgPSBFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUsIG5hbWUpO1xuXG4gICAgcmV0dXJuIG1hcmtlckVudHJ5O1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE1hcmtlckVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9tYXJrZXJcIjtcblxuaW1wb3J0IHsgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG5cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShkcmFnZ2FibGVFbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSwgIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuICB9XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJkaXJlY3RvcnktbmFtZVwiXG4gIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE1hcmtlckVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9tYXJrZXJcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbGVOYW1lTWFya2VyRW50cnkgZXh0ZW5kcyBNYXJrZXJFbnRyeSB7XG4gIGlzQmVmb3JlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZHJhZ2dhYmxlRW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFLFxuICAgICAgICAgIGZpbGVOYW1lTWFya2VyRW50cnkgPSBNYXJrZXJFbnRyeS5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIHR5cGUpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImZpbGUtbmFtZVwiXG4gIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgUmVhY3QsIEJvZHkgfSBmcm9tIFwiZWFzeVwiO1xuXG5pbXBvcnQgVmlldyBmcm9tIFwiLi9leGFtcGxlL3ZpZXdcIlxuXG5PYmplY3QuYXNzaWduKHdpbmRvdywge1xuICBSZWFjdFxufSk7XG5cbmNvbnN0IGJvZHkgPSBuZXcgQm9keSgpO1xuXG5ib2R5LnByZXBlbmQoXG5cbiAgPFZpZXcgLz5cblxuKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFeHBsb3JlciwgUnViYmlzaEJpbiB9IGZyb20gXCIuLi9pbmRleFwiO1xuXG5jb25zdCBWaWV3ID0gKHByb3BlcnRpZXMpID0+IHtcbiAgY29uc3QgZXhwbG9yZXIgPVxuXG4gICAgICAgICAgPEV4cGxvcmVyIHRvcG1vc3REaXJlY3RvcnlOYW1lPVwiZXhwbG9yZXJcIlxuICAgICAgICAgICAgICAgICAgICBvbk9wZW49e29wZW5IYW5kbGVyfVxuICAgICAgICAgICAgICAgICAgICBvbk1vdmU9e21vdmVIYW5kbGVyfVxuICAgICAgICAgIC8+XG5cbiAgICAgICAgLFxuICAgICAgICBydWJiaXNoQmluID1cblxuICAgICAgICAgIDxSdWJiaXNoQmluIG9uUmVtb3ZlPXtyZW1vdmVIYW5kbGVyfSAvPlxuXG4gICAgICAgIDtcblxuXG4gIGV4cGxvcmVyLmFkZERpcmVjdG9yeVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxXCIpO1xuICBleHBsb3Jlci5hZGREaXJlY3RvcnlQYXRoKFwiZXhwbG9yZXIvZGlyZWN0b3J5MlwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUxLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkxL2ZpbGUyLnR4dFwiKTtcbiAgZXhwbG9yZXIuYWRkRmlsZVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkyL2ZpbGUzLnR4dFwiKTtcblxuICBleHBsb3Jlci5hZGREcm9wVGFyZ2V0KHJ1YmJpc2hCaW4pO1xuXG4gIHJ1YmJpc2hCaW4uYWRkRHJvcFRhcmdldChleHBsb3Jlcik7XG5cbiAgcmV0dXJuIChcblxuICAgIDxkaXYgY2xhc3NOYW1lPVwidmlld1wiPlxuICAgICAge2V4cGxvcmVyfVxuICAgICAge3J1YmJpc2hCaW59XG4gICAgPC9kaXY+XG5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXc7XG5cbmZ1bmN0aW9uIG9wZW5IYW5kbGVyKGZpbGVQYXRoKSB7XG4gIGFsZXJ0KGZpbGVQYXRoKVxufVxuXG5mdW5jdGlvbiBtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGFycmF5VXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgRW50cmllcyBmcm9tIFwiLi9lbnRyaWVzXCI7XG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5pbXBvcnQgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGZyb20gXCIuL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lXCI7XG5cbmltcG9ydCB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCB7IHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICBzZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgdGhpcy5vcHRpb25zW29wdGlvbl0gPSB0cnVlO1xuICB9XG5cbiAgdW5zZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgZGVsZXRlKHRoaXMub3B0aW9uc1tvcHRpb25dKTtcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uUHJlc2VudDtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBjb25zdCBmaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzKCk7XG5cbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuXG4gIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lKCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lOyAgLy8vXG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBnZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gIH1cblxuICBtYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG1hcmtlckVudHJ5UGF0aCxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgaWYgKHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnlOYW1lID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZSA9IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBgJHtkcmFnZ2FibGVFbnRyeVBhdGh9LyR7cHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWV9YDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeVR5cGU7ICAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBtYXJrZXJFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgIH1cblxuICAgIHRoaXMuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ICE9PSB0aGlzKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICAgIGlmIChkcmFnZ2luZ1dpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHRoaXMudW5tYXJrKCk7XG5cbiAgICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTsgLy8vXG5cbiAgICBsZXQgdGFyZ2V0UGF0aCA9IG51bGwsXG4gICAgICAgIGR1cGxpY2F0ZSA9IGZhbHNlO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgbmFtZSA9IGRyYWdnYWJsZUVudHJ5TmFtZSwgIC8vL1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGR1cGxpY2F0ZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChkdXBsaWNhdGUgfHwgdW5tb3ZlZCkge1xuICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeVN1YkVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCAoKSA9PiB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQudW5tYXJrKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy51bm1hcmtHbG9iYWxseSgpO1xuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGRyYWdnaW5nV2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQgPSB0aGlzLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19XSVRISU4pO1xuXG4gICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyKGZpbGVQYXRoKTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBlbnRyaWVzID1cblxuICAgICAgICAgICAgPEVudHJpZXMgZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgO1xuXG4gICAgZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBlbnRyaWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiZGl2XCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJleHBsb3JlclwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25PcGVuXCIsXG4gICAgXCJvbk1vdmVcIixcbiAgICBcIm9wdGlvbnNcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlOYW1lXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyA9IHt9fSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlIHx8IGRlZmF1bHRNb3ZlSGFuZGxlciwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4gfHwgZGVmYXVsdE9wZW5IYW5kbGVyLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuXG4gICAgZXhwbG9yZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0T3BlbkhhbmRsZXIoc291cmNlUGF0aCkge1xuICAvLy9cbn1cblxuZnVuY3Rpb24gZGVmYXVsdE1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGAke3RhcmdldFBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlQYXRofWA7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgXCJcXFxcKFwiKS5yZXBsYWNlKC9cXCkvZywgXCJcXFxcKVwiKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYF4ke3NvdXJjZVBhdGh9KC4qJClgKSxcbiAgICAgICAgbWF0Y2hlcyA9IGRyYWdnYWJsZUVudHJ5UGF0aC5tYXRjaChyZWdFeHApLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBvcHRpb25zIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFeHBsb3JlciB9IGZyb20gXCIuL2V4cGxvcmVyXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFJ1YmJpc2hCaW4gfSBmcm9tIFwiLi9ydWJiaXNoQmluXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IE5PX0RSQUdHSU5HX1dJVEhJTiA9IFwiTk9fRFJBR0dJTkdfV0lUSElOXCI7XG5leHBvcnQgY29uc3QgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMgPSBcIk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTXCI7XG5leHBvcnQgY29uc3QgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgPSBcIk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTXCI7XG5leHBvcnQgY29uc3QgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyA9IFwiUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFU1wiO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgPSBcIkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkdcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBOT19EUkFHR0lOR19XSVRISU4sXG4gIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTLFxuICBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyxcbiAgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyxcbiAgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lOR1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRHJvcFRhcmdldCBmcm9tIFwiLi9kcm9wVGFyZ2V0XCI7XG5cbmltcG9ydCB7IERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcyhcIm9wZW5cIik7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcyhcIm9wZW5cIik7XG5cbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHVubWFyaygpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkID09PSB0aGlzKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICB0aGlzLnVubWFyaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGV4cGxvcmVyLCAgLy8vXG4gICAgICAgICAgICBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfVxuICB9XG5cbiAgbWFya0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICB9XG5cbiAgbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoKGRyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICBcbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInJ1YmJpc2gtYmluXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvblJlbW92ZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlIHx8IGRlZmF1bHRSZW1vdmVIYW5kbGVyLCAvLy9cbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXIsICAvLy9cbiAgICAgICAgICBydWJiaXNoQmluID0gRHJvcFRhcmdldC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIG1vdmVIYW5kbGVyKTtcblxuICAgIHJ1YmJpc2hCaW4uaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIHJldHVybiBydWJiaXNoQmluO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRSZW1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBESVJFQ1RPUllfTkFNRV9UWVBFKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gbnVsbDsgIC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY29uc3QgRklMRV9OQU1FX1RZUEUgPSBcIkZJTEVfTkFNRV9UWVBFXCI7XG5leHBvcnQgY29uc3QgRElSRUNUT1JZX05BTUVfVFlQRSA9IFwiRElSRUNUT1JZX05BTUVfVFlQRVwiO1xuZXhwb3J0IGNvbnN0IEZJTEVfTkFNRV9NQVJLRVJfVFlQRSA9IFwiRklMRV9OQU1FX01BUktFUl9UWVBFXCI7XG5leHBvcnQgY29uc3QgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgPSBcIkRJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuc2lvbkZyb21OYW1lKG5hbWUpIHtcbiAgbGV0IGV4dGVuc2lvbiA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14uKlxcLihbXi5dKykkLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIGV4dGVuc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG4gIH1cblxuICByZXR1cm4gZXh0ZW5zaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gIGxldCBuYW1lV2l0aG91dEV4dGVuc2lvbiA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14oLispXFwuW14uXSskLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiBuYW1lV2l0aG91dEV4dGVuc2lvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpIHtcbiAgbGV0IGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiZWZvcmU7XG59XG4iLCIiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IFNWR19OQU1FU1BBQ0VfVVJJID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuZXhwb3J0IGNvbnN0IExFRlRfTU9VU0VfQlVUVE9OID0gMDtcbmV4cG9ydCBjb25zdCBSSUdIVF9NT1VTRV9CVVRUT04gPSAyO1xuZXhwb3J0IGNvbnN0IE1JRERMRV9NT1VTRV9CVVRUT04gPSAxO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIExFRlRfTU9VU0VfQlVUVE9OLFxuICBSSUdIVF9NT1VTRV9CVVRUT04sXG4gIE1JRERMRV9NT1VTRV9CVVRUT05cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgb25DbGljaywgb2ZmQ2xpY2sgfSBmcm9tIFwiLi9taXhpbnMvY2xpY2tcIjtcbmltcG9ydCB7IG9uS2V5VXAsIG9mZktleVVwLCBvbktleURvd24sIG9mZktleURvd24gfSBmcm9tIFwiLi9taXhpbnMva2V5XCI7XG5pbXBvcnQgeyBvbiwgb2ZmLCBhZGRFdmVudExpc3RlbmVyLCBmaW5kRXZlbnRMaXN0ZW5lciwgZmluZEV2ZW50TGlzdGVuZXJzLCByZW1vdmVFdmVudExpc3RlbmVyIH0gZnJvbSBcIi4vbWl4aW5zL2V2ZW50XCI7XG5pbXBvcnQgeyBvbk1vdXNlVXAsIG9uTW91c2VEb3duLCBvbk1vdXNlT3Zlciwgb25Nb3VzZU91dCwgb25Nb3VzZU1vdmUsIG9mZk1vdXNlVXAsIG9mZk1vdXNlRG93biwgb2ZmTW91c2VPdmVyLCBvZmZNb3VzZU91dCwgb2ZmTW91c2VNb3ZlIH0gZnJvbSBcIi4vbWl4aW5zL21vdXNlXCI7XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgb24gPSBvbjtcbiAgb2ZmID0gb2ZmO1xuXG4gIG9uQ2xpY2sgPSBvbkNsaWNrO1xuICBvZmZDbGljayA9IG9mZkNsaWNrO1xuXG4gIG9uUmVzaXplID0gb25SZXNpemU7XG4gIG9mZlJlc2l6ZSA9IG9mZlJlc2l6ZTtcblxuICBvbktleVVwID0gb25LZXlVcDtcbiAgb2ZmS2V5VXAgPSBvZmZLZXlVcDtcbiAgb25LZXlEb3duID0gb25LZXlEb3duO1xuICBvZmZLZXlEb3duID0gb2ZmS2V5RG93bjtcblxuICBvbk1vdXNlVXAgPSBvbk1vdXNlVXA7XG4gIG9uTW91c2VEb3duID0gb25Nb3VzZURvd247XG4gIG9uTW91c2VPdmVyID0gb25Nb3VzZU92ZXI7XG4gIG9uTW91c2VPdXQgPSBvbk1vdXNlT3V0O1xuICBvbk1vdXNlTW92ZSA9IG9uTW91c2VNb3ZlO1xuICBvZmZNb3VzZVVwID0gb2ZmTW91c2VVcDtcbiAgb2ZmTW91c2VEb3duID0gb2ZmTW91c2VEb3duO1xuICBvZmZNb3VzZU92ZXIgPSBvZmZNb3VzZU92ZXI7XG4gIG9mZk1vdXNlT3V0ID0gb2ZmTW91c2VPdXQ7XG4gIG9mZk1vdXNlTW92ZSA9IG9mZk1vdXNlTW92ZTtcblxuICBhZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbiAgZmluZEV2ZW50TGlzdGVuZXIgPSBmaW5kRXZlbnRMaXN0ZW5lcjtcbiAgZmluZEV2ZW50TGlzdGVuZXJzID0gZmluZEV2ZW50TGlzdGVuZXJzO1xuICByZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudDsgLy8vXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgPyB1bmRlZmluZWQgOiBuZXcgRG9jdW1lbnQoKTsgIC8vL1xuXG5mdW5jdGlvbiBvblJlc2l6ZShyZXNpemVIYW5kbGVyLCBlbGVtZW50KSB7fSAvLy9cblxuZnVuY3Rpb24gb2ZmUmVzaXplKHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpIHt9ICAvLy9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgT2Zmc2V0IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvb2Zmc2V0XCI7XG5pbXBvcnQgQm91bmRzIGZyb20gXCIuL21pc2NlbGxhbmVvdXMvYm91bmRzXCI7XG5cbmltcG9ydCB7IGNvbWJpbmUgfSBmcm9tIFwiLi91dGlsaXRpZXMvb2JqZWN0XCI7XG5pbXBvcnQgeyBpc1NWR1RhZ05hbWUgfSBmcm9tIFwiLi91dGlsaXRpZXMvbmFtZVwiO1xuaW1wb3J0IHsgZmlyc3QsIGF1Z21lbnQgfSBmcm9tIFwiLi91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7IFNWR19OQU1FU1BBQ0VfVVJJIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yLCBlbGVtZW50c0Zyb21ET01FbGVtZW50cywgZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yLCBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZSB9IGZyb20gXCIuL3V0aWxpdGllcy9kb21cIjtcblxuaW1wb3J0IHsgb25DbGljaywgb2ZmQ2xpY2sgfSBmcm9tIFwiLi9taXhpbnMvY2xpY2tcIjtcbmltcG9ydCB7IGdldFN0YXRlLCBzZXRTdGF0ZSwgdXBkYXRlU3RhdGUgfSBmcm9tIFwiLi9taXhpbnMvc3RhdGVcIjtcbmltcG9ydCB7IG9uS2V5VXAsIG9mZktleVVwLCBvbktleURvd24sIG9mZktleURvd24gfSBmcm9tIFwiLi9taXhpbnMva2V5XCI7XG5pbXBvcnQgeyBvblJlc2l6ZSwgb2ZmUmVzaXplLCBhZGRSZXNpemVPYmplY3QsIHJlbW92ZVJlc2l6ZU9iamVjdCB9IGZyb20gXCIuL21peGlucy9yZXNpemVcIjtcbmltcG9ydCB7IGdldENvbnRleHQsIGdldFByb3BlcnRpZXMsIGFzc2lnbkNvbnRleHQsIGFwcGx5UHJvcGVydGllcyB9IGZyb20gXCIuL21peGlucy9qc3hcIjtcbmltcG9ydCB7IG9uU2Nyb2xsLCBvZmZTY3JvbGwsIGdldFNjcm9sbFRvcCwgZ2V0U2Nyb2xsTGVmdCwgc2V0U2Nyb2xsVG9wLCBzZXRTY3JvbGxMZWZ0IH0gZnJvbSBcIi4vbWl4aW5zL3Njcm9sbFwiO1xuaW1wb3J0IHsgb24sIG9mZiwgYWRkRXZlbnRMaXN0ZW5lciwgZmluZEV2ZW50TGlzdGVuZXIsIGZpbmRFdmVudExpc3RlbmVycywgcmVtb3ZlRXZlbnRMaXN0ZW5lciB9IGZyb20gXCIuL21peGlucy9ldmVudFwiO1xuaW1wb3J0IHsgb25Nb3VzZVVwLCBvbk1vdXNlRG93biwgb25Nb3VzZU92ZXIsIG9uTW91c2VPdXQsIG9uTW91c2VNb3ZlLCBvZmZNb3VzZVVwLCBvZmZNb3VzZURvd24sIG9mZk1vdXNlT3Zlciwgb2ZmTW91c2VPdXQsIG9mZk1vdXNlTW92ZSB9IGZyb20gXCIuL21peGlucy9tb3VzZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGVtZW50IHtcbiAgb24gPSBvbjtcbiAgb2ZmID0gb2ZmO1xuXG4gIG9uQ2xpY2sgPSBvbkNsaWNrO1xuICBvZmZDbGljayA9IG9mZkNsaWNrO1xuXG4gIG9uUmVzaXplID0gb25SZXNpemU7XG4gIG9mZlJlc2l6ZSA9IG9mZlJlc2l6ZTtcbiAgYWRkUmVzaXplT2JqZWN0ID0gYWRkUmVzaXplT2JqZWN0O1xuICByZW1vdmVSZXNpemVPYmplY3QgPSByZW1vdmVSZXNpemVPYmplY3Q7XG5cbiAgZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcbiAgc2V0U3RhdGUgPSBzZXRTdGF0ZTtcbiAgdXBkYXRlU3RhdGUgPSB1cGRhdGVTdGF0ZTtcblxuICBvbktleVVwID0gb25LZXlVcDtcbiAgb2ZmS2V5VXAgPSBvZmZLZXlVcDtcbiAgb25LZXlEb3duID0gb25LZXlEb3duO1xuICBvZmZLZXlEb3duID0gb2ZmS2V5RG93bjtcblxuICBvbk1vdXNlVXAgPSBvbk1vdXNlVXA7XG4gIG9uTW91c2VEb3duID0gb25Nb3VzZURvd247XG4gIG9uTW91c2VPdmVyID0gb25Nb3VzZU92ZXI7XG4gIG9uTW91c2VPdXQgPSBvbk1vdXNlT3V0O1xuICBvbk1vdXNlTW92ZSA9IG9uTW91c2VNb3ZlO1xuICBvZmZNb3VzZVVwID0gb2ZmTW91c2VVcDtcbiAgb2ZmTW91c2VEb3duID0gb2ZmTW91c2VEb3duO1xuICBvZmZNb3VzZU92ZXIgPSBvZmZNb3VzZU92ZXI7XG4gIG9mZk1vdXNlT3V0ID0gb2ZmTW91c2VPdXQ7XG4gIG9mZk1vdXNlTW92ZSA9IG9mZk1vdXNlTW92ZTtcblxuICBvblNjcm9sbCA9IG9uU2Nyb2xsO1xuICBvZmZTY3JvbGwgPSBvZmZTY3JvbGw7XG4gIGdldFNjcm9sbFRvcCA9IGdldFNjcm9sbFRvcDtcbiAgZ2V0U2Nyb2xsTGVmdCA9IGdldFNjcm9sbExlZnQ7XG4gIHNldFNjcm9sbFRvcCA9IHNldFNjcm9sbFRvcDtcbiAgc2V0U2Nyb2xsTGVmdCA9IHNldFNjcm9sbExlZnQ7XG5cbiAgZ2V0Q29udGV4dCA9IGdldENvbnRleHQ7XG4gIGdldFByb3BlcnRpZXMgPSBnZXRQcm9wZXJ0aWVzO1xuICBhc3NpZ25Db250ZXh0ID0gYXNzaWduQ29udGV4dDtcbiAgYXBwbHlQcm9wZXJ0aWVzID0gYXBwbHlQcm9wZXJ0aWVzO1xuXG4gIGFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuICBmaW5kRXZlbnRMaXN0ZW5lciA9IGZpbmRFdmVudExpc3RlbmVyO1xuICBmaW5kRXZlbnRMaXN0ZW5lcnMgPSBmaW5kRXZlbnRMaXN0ZW5lcnM7XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50KSB7XG4gICAgaWYgKHR5cGVvZiBzZWxlY3Rvck9yRE9NRWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3Qgc2VsZWN0b3IgPSBzZWxlY3Rvck9yRE9NRWxlbWVudDtcblxuICAgICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBzZWxlY3Rvck9yRE9NRWxlbWVudDsgIC8vL1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50O1xuICAgIH1cblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7IC8vL1xuICB9XG5cbiAgZ2V0RE9NRWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb21FbGVtZW50O1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkge1xuICAgIHdpZHRoID0gYCR7d2lkdGh9cHhgOyAvLy9cblxuICAgIHRoaXMuc3R5bGUoXCJ3aWR0aFwiLCB3aWR0aCk7XG4gIH1cblxuICBnZXRIZWlnaHQoaW5jbHVkZUJvcmRlciA9IHRydWUpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5vZmZzZXRIZWlnaHQgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHNldEhlaWdodChoZWlnaHQpIHtcbiAgICBoZWlnaHQgPSBgJHtoZWlnaHR9cHhgOyAvLy9cblxuICAgIHRoaXMuc3R5bGUoXCJoZWlnaHRcIiwgaGVpZ2h0KTtcbiAgfVxuXG4gIGhhc0F0dHJpYnV0ZShuYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaGFzQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICBjbGVhckF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lOyB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuXG4gIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpOyB9XG5cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH1cblxuICBjbGVhckNsYXNzZXMoKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSBcIlwiOyB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIGFkZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hZGQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICBwcmVwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0Q2hpbGRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIGZpcnN0Q2hpbGRET01FbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgYWRkKGVsZW1lbnQpIHsgdGhpcy5hcHBlbmQoZWxlbWVudCk7IH1cblxuICByZW1vdmUoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KGRpc3BsYXlTdHlsZSA9IFwiYmxvY2tcIikgeyB0aGlzLmRpc3BsYXkoZGlzcGxheVN0eWxlKTsgfVxuXG4gIGhpZGUoKSB7IHRoaXMuc3R5bGUoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTsgfVxuXG4gIGRpc3BsYXkoZGlzcGxheSkgeyB0aGlzLnN0eWxlKFwiZGlzcGxheVwiLCBkaXNwbGF5KTsgfVxuXG4gIGVuYWJsZSgpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZShcImRpc2FibGVkXCIpOyB9XG5cbiAgZGlzYWJsZSgpIHsgdGhpcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpOyB9XG5cbiAgaXNFbmFibGVkKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5pc0Rpc2FibGVkKCksXG4gICAgICAgICAgZW5hYmxlZCA9ICFkaXNhYmxlZDtcblxuICAgIHJldHVybiBlbmFibGVkO1xuICB9XG5cbiAgaXNEaXNhYmxlZCgpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuaGFzQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG5cbiAgICByZXR1cm4gZGlzYWJsZWQ7XG4gIH1cbiAgXG4gIGlzRGlzcGxheWVkKCkge1xuICAgIGNvbnN0IGRpc3BsYXkgPSB0aGlzLnN0eWxlKFwiZGlzcGxheVwiKSxcbiAgICAgICAgICBkaXNwbGF5ZWQgPSAoZGlzcGxheSAhPT0gXCJub25lXCIpO1xuICAgIFxuICAgIHJldHVybiBkaXNwbGF5ZWQ7XG4gIH1cblxuICBpc1Nob3dpbmcoKSB7XG4gICAgY29uc3QgZGlzcGxheWVkID0gdGhpcy5pc0Rpc3BsYXllZCgpLFxuICAgICAgICAgIHNob3dpbmcgPSBkaXNwbGF5ZWQ7ICAvLy9cblxuICAgIHJldHVybiBzaG93aW5nO1xuICB9XG5cbiAgaXNIaWRkZW4oKSB7XG4gICAgY29uc3QgZGlzcGxheWVkID0gdGhpcy5pc0Rpc3BsYXllZCgpLFxuICAgICAgICAgIGhpZGRlbiA9ICFkaXNwbGF5ZWQ7XG5cbiAgICByZXR1cm4gaGlkZGVuO1xuICB9XG5cbiAgc3R5bGUobmFtZSwgdmFsdWUpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0eWxlID0gdGhpcy5kb21FbGVtZW50LnN0eWxlW25hbWVdO1xuXG4gICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuICB9XG5cbiAgaHRtbChodG1sKSB7XG4gICAgaWYgKGh0bWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gdGhpcy5kb21FbGVtZW50LmlubmVySFRNTDtcblxuICAgICAgaHRtbCA9IGlubmVySFRNTDsgLy8vXG5cbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSBodG1sOyAvLy9cblxuICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNzcyhjc3MpIHtcbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICBjc3MgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXB1dGVkU3R5bGUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wdXRlZFN0eWxlWzBdLCAgLy8vXG4gICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgICBjc3NbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjc3MgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGxldCBuYW1lID0gY3NzOyAvLy9cblxuICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb21FbGVtZW50KSxcbiAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgY3NzID0gdmFsdWU7ICAvLy9cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhjc3MpOyAvLy9cblxuICAgICAgbmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNzc1tuYW1lXTtcblxuICAgICAgICB0aGlzLnN0eWxlKG5hbWUsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbiAgYmx1cigpIHsgdGhpcy5kb21FbGVtZW50LmJsdXIoKTsgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGdldERlc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9IFwiKlwiKSB7XG4gICAgY29uc3QgZG9tTm9kZSA9IHRoaXMuZG9tRWxlbWVudCwgIC8vL1xuICAgICAgICAgIGRlc2NlbmRhbnRET01Ob2RlcyA9IGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUpLFxuICAgICAgICAgIGRlc2NlbmRhbnRET01FbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzQnlTZWxlY3RvcihkZXNjZW5kYW50RE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBkZXNjZW5kYW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhkZXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGRlc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldENoaWxkRWxlbWVudHMoc2VsZWN0b3IgPSBcIipcIikge1xuICAgIGNvbnN0IGNoaWxkRE9NTm9kZXMgPSB0aGlzLmRvbUVsZW1lbnQuY2hpbGROb2RlcyxcbiAgICAgICAgICBjaGlsZERPTUVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yKGNoaWxkRE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoY2hpbGRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGdldFBhcmVudEVsZW1lbnQoc2VsZWN0b3IgPSBcIipcIikge1xuICAgIGxldCBwYXJlbnRFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGlmIChwYXJlbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAocGFyZW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBjb25zdCBwYXJlbnRET01FbGVtZW50cyA9IFtwYXJlbnRET01FbGVtZW50XSxcbiAgICAgICAgICAgICAgcGFyZW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhwYXJlbnRET01FbGVtZW50cyksXG4gICAgICAgICAgICAgIGZpcnN0UGFyZW50RWxlbWVudCA9IGZpcnN0KHBhcmVudEVsZW1lbnRzKTtcblxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RQYXJlbnRFbGVtZW50IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBnZXRBc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9IFwiKlwiKSB7XG4gICAgY29uc3QgYXNjZW5kYW50RE9NRWxlbWVudHMgPSBbXSxcbiAgICAgICAgICBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBsZXQgYXNjZW5kYW50RE9NRWxlbWVudCA9IHBhcmVudERPTUVsZW1lbnQ7ICAvLy9cbiAgICB3aGlsZSAoYXNjZW5kYW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFzY2VuZGFudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgYXNjZW5kYW50RE9NRWxlbWVudHMucHVzaChhc2NlbmRhbnRET01FbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgYXNjZW5kYW50RE9NRWxlbWVudCA9IGFzY2VuZGFudERPTUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBhc2NlbmRhbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGFzY2VuZGFudERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBhc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldFByZXZpb3VzU2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSBcIipcIikge1xuICAgIGxldCBwcmV2aW91c1NpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZpb3VzU2libGluZ0RPTU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQucHJldmlvdXNTaWJsaW5nOyAgLy8vXG5cbiAgICBpZiAoKHByZXZpb3VzU2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IocHJldmlvdXNTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBwcmV2aW91c1NpYmxpbmdFbGVtZW50ID0gcHJldmlvdXNTaWJsaW5nRE9NTm9kZS5fX2VsZW1lbnRfXyB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgZ2V0TmV4dFNpYmxpbmdFbGVtZW50KHNlbGVjdG9yID0gXCIqXCIpIHtcbiAgICBsZXQgbmV4dFNpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IG5leHRTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5uZXh0U2libGluZztcblxuICAgIGlmICgobmV4dFNpYmxpbmdET01Ob2RlICE9PSBudWxsKSAmJiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKG5leHRTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBuZXh0U2libGluZ0VsZW1lbnQgPSBuZXh0U2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21UYWdOYW1lKHRhZ05hbWUsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBmcm9tVGFnTmFtZShFbGVtZW50LCB0YWdOYW1lLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0ge30sIC8vL1xuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gW107IC8vL1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IENsYXNzLnRhZ05hbWUsXG4gICAgICAgICAgZWxlbWVudCA9IGZyb21UYWdOYW1lKENsYXNzLCB0YWdOYW1lLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpLFxuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpO1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbmZ1bmN0aW9uIGZyb21UYWdOYW1lKENsYXNzLCB0YWdOYW1lLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9IGlzU1ZHVGFnTmFtZSh0YWdOYW1lKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhTVkdfTkFNRVNQQUNFX1VSSSwgdGFnTmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG5cbiAgcmV0dXJuIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xufVxuXG5mdW5jdGlvbiBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuXG4gIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoQ2xhc3MsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykpO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcywgZGVmYXVsdFByb3BlcnRpZXMgPSB7fSkge1xuICBpZiAoQ2xhc3MuaGFzT3duUHJvcGVydHkoXCJkZWZhdWx0UHJvcGVydGllc1wiKSkge1xuICAgIGNvbWJpbmUoZGVmYXVsdFByb3BlcnRpZXMsIENsYXNzLmRlZmF1bHRQcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNvbnN0IHN1cGVyQ2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3MpO1xuXG4gIGlmIChzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3Moc3VwZXJDbGFzcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmV0dXJuIGRlZmF1bHRQcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBpZ25vcmVkUHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcywgaWdub3JlZFByb3BlcnRpZXMgPSBbXSkge1xuICBpZiAoQ2xhc3MuaGFzT3duUHJvcGVydHkoXCJpZ25vcmVkUHJvcGVydGllc1wiKSkge1xuICAgIGF1Z21lbnQoaWdub3JlZFByb3BlcnRpZXMsIENsYXNzLmlnbm9yZWRQcm9wZXJ0aWVzLCAoaWdub3JlZFByb3BlcnR5KSA9PiAhaWdub3JlZFByb3BlcnRpZXMuaW5jbHVkZXMoaWdub3JlZFByb3BlcnR5KSk7XG4gIH1cblxuICBjb25zdCBzdXBlckNsYXNzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKENsYXNzKTtcblxuICBpZiAoc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIGlnbm9yZWRQcm9wZXJ0aWVzRnJvbUNsYXNzKHN1cGVyQ2xhc3MsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHJldHVybiBpZ25vcmVkUHJvcGVydGllcztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50ID0gXCJib2R5XCIpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiYm9keVwiO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yRE9NRWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3JPckRPTUVsZW1lbnQpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImJ1dHRvblwiO1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uQ2xpY2tcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgPSBudWxsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2ssIC8vL1xuICAgICAgICAgIGJ1dHRvbiA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjbGlja0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBidXR0b247XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGVja2JveCBleHRlbmRzIEVsZW1lbnQge1xuICBvbkNoYW5nZSA9IG9uQ2hhbmdlO1xuICBvZmZDaGFuZ2UgPSBvZmZDaGFuZ2U7XG5cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPckRPTUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG5cbiAgICB0aGlzLmNoZWNrKGNoZWNrZWQpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2hlY2soY2hlY2tlZCA9IHRydWUpIHsgdGhpcy5kb21FbGVtZW50LmNoZWNrZWQgPSBjaGVja2VkOyB9XG5cbiAgaXNDaGVja2VkKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmNoZWNrZWQ7IH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiaW5wdXRcIjtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbkNoYW5nZVwiLFxuICAgIFwiY2hlY2tlZFwiXG4gIF07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIHR5cGU6IFwiY2hlY2tib3hcIlxuICB9O1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlID0gbnVsbCwgY2hlY2tlZCA9IG51bGwgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlLCAvLy9cbiAgICAgICAgICBjaGVja2JveCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKTtcblxuICAgIHJldHVybiBjaGVja2JveDtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJjbGlja1wiLCBjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KTsgfSAvLy9cblxuZnVuY3Rpb24gb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJjbGlja1wiLCBjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KTsgfSAvLy9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi4vZWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaW5rIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiYVwiO1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uQ2xpY2tcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgPSBudWxsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2ssIC8vL1xuICAgICAgICAgIGxpbmsgPSBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2xpY2tIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gbGluaztcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbGVjdCBleHRlbmRzIEVsZW1lbnQge1xuICBvbkNoYW5nZSA9IG9uQ2hhbmdlO1xuICBvZmZDaGFuZ2UgPSBvZmZDaGFuZ2U7XG5cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPckRPTUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlKCkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlLCAgLy8vXG4gICAgICAgICAgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHZhbHVlOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gIH1cblxuICBzZXRTZWxlY3RlZE9wdGlvbkJ5VmFsdWUoc2VsZWN0ZWRPcHRpb25WYWx1ZSkge1xuICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTsgIC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwic2VsZWN0XCI7XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25DaGFuZ2VcIlxuICBdO1xuXG4gIHN0YXRpYyBmcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlID0gbnVsbCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xuICAgICAgICAgIHNlbGVjdCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gc2VsZWN0O1xuICB9XG59XG5cblxuZnVuY3Rpb24gb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwiY2hhbmdlXCIsIGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmZ1bmN0aW9uIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwiY2hhbmdlXCIsIGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpOyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb2R5IH0gZnJvbSBcIi4vZWxlbWVudC9ib2R5XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJ1dHRvbiB9IGZyb20gXCIuL2VsZW1lbnQvYnV0dG9uXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIENoZWNrYm94IH0gZnJvbSBcIi4vZWxlbWVudC9jaGVja2JveFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaW5rIH0gZnJvbSBcIi4vZWxlbWVudC9saW5rXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFNlbGVjdCB9IGZyb20gXCIuL2VsZW1lbnQvc2VsZWN0XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIElucHV0IH0gZnJvbSBcIi4vaW5wdXRFbGVtZW50L2lucHV0XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRleHRhcmVhIH0gZnJvbSBcIi4vaW5wdXRFbGVtZW50L3RleHRhcmVhXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEVsZW1lbnQgfSBmcm9tIFwiLi9lbGVtZW50XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFRleHRFbGVtZW50IH0gZnJvbSBcIi4vdGV4dEVsZW1lbnRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW5wdXRFbGVtZW50IH0gZnJvbSBcIi4vaW5wdXRFbGVtZW50XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpbmRvdyB9IGZyb20gXCIuL3dpbmRvd1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBkb2N1bWVudCB9IGZyb20gXCIuL2RvY3VtZW50XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNvbnN0YW50cyB9IGZyb20gXCIuL2NvbnN0YW50c1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBCb3VuZHMgfSBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL2JvdW5kc1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBPZmZzZXQgfSBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL29mZnNldFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBSZWFjdCB9IGZyb20gXCIuL3JlYWN0XCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4vZWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnB1dEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgb25DaGFuZ2UgPSBvbkNoYW5nZTtcbiAgb2ZmQ2hhbmdlID0gb2ZmQ2hhbmdlO1xuXG4gIG9uUmVzaXplID0gb25SZXNpemU7XG4gIG9mZlJlc2l6ZSA9IG9mZlJlc2l6ZTtcblxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yRE9NRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG5cbiAgZ2V0U2VsZWN0aW9uU3RhcnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBpc1JlYWRPbmx5KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnJlYWRPbmx5OyB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cblxuICBzZXRTZWxlY3Rpb25TdGFydChzZWxlY3Rpb25TdGFydCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDsgfVxuXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7IHRoaXMuZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyB9XG5cbiAgc2VsZWN0KCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0KCk7IH1cblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbkNoYW5nZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSA9IG51bGwgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJjaGFuZ2VcIiwgY2hhbmdlSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJjaGFuZ2VcIiwgY2hhbmdlSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb25SZXNpemUocmVzaXplSGFuZGxlciwgZWxlbWVudCkge30gLy8vXG5cbmZ1bmN0aW9uIG9mZlJlc2l6ZShyZXNpemVIYW5kbGVyLCBlbGVtZW50KSB7fSAgLy8vXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IElucHV0RWxlbWVudCBmcm9tIFwiLi4vaW5wdXRFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0IGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSBcImlucHV0XCI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IElucHV0RWxlbWVudCBmcm9tIFwiLi4vaW5wdXRFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRhcmVhIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgc3RhdGljIHRhZ05hbWUgPSBcInRleHRhcmVhXCI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm91bmRzIHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG5cbiAgZ2V0Qm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLmJvdHRvbTtcbiAgfVxuXG4gIGdldFJpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0O1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0O1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuYm90dG9tIC0gdGhpcy50b3A7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG4gIFxuICBzZXRUb3AodG9wKSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gIH1cblxuICBzZXRMZWZ0KGxlZnQpIHtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9XG5cbiAgc2V0Qm90dG9tKGJvdHRvbSkge1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICB9XG5cbiAgc2V0UmlnaHQocmlnaHQpIHtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gIH1cblxuICBzaGlmdChob3Jpem9udGFsT2Zmc2V0LCB2ZXJ0aWNhbE9mZnNldCkge1xuICAgIHRoaXMudG9wICs9IHZlcnRpY2FsT2Zmc2V0O1xuICAgIHRoaXMubGVmdCArPSBob3Jpem9udGFsT2Zmc2V0O1xuICAgIHRoaXMuYm90dG9tICs9IHZlcnRpY2FsT2Zmc2V0O1xuICAgIHRoaXMucmlnaHQgKz0gaG9yaXpvbnRhbE9mZnNldDtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgcmV0dXJuICggICh0aGlzLnRvcCA8IG1vdXNlVG9wKVxuICAgICAgICAgICAmJiAodGhpcy5sZWZ0IDwgbW91c2VMZWZ0KVxuICAgICAgICAgICAmJiAodGhpcy5ib3R0b20gPiBtb3VzZVRvcClcbiAgICAgICAgICAgJiYgKHRoaXMucmlnaHQgPiBtb3VzZUxlZnQpICApO1xuICB9XG5cbiAgYXJlT3ZlcmxhcHBpbmcoYm91bmRzKSB7XG4gICAgcmV0dXJuICggICh0aGlzLnRvcCA8IGJvdW5kcy5ib3R0b20pXG4gICAgICAgICAgICYmICh0aGlzLmxlZnQgPCBib3VuZHMucmlnaHQpXG4gICAgICAgICAgICYmICh0aGlzLmJvdHRvbSA+IGJvdW5kcy50b3ApXG4gICAgICAgICAgICYmICh0aGlzLnJpZ2h0ID4gYm91bmRzLmxlZnQpICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21Cb3VuZGluZ0NsaWVudFJlY3QoYm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0LCAvLy9cbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0LCAgLy8vXG4gICAgICAgICAgdG9wID0gYm91bmRpbmdDbGllbnRSZWN0LnRvcCArIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgICBsZWZ0ID0gYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyB3aW5kb3dTY3JvbGxMZWZ0LFxuICAgICAgICAgIGJvdHRvbSA9IGJvdW5kaW5nQ2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgcmlnaHQgPSBib3VuZGluZ0NsaWVudFJlY3QucmlnaHQgKyB3aW5kb3dTY3JvbGxMZWZ0LFxuICAgICAgICAgIGJvdW5kcyA9IG5ldyBCb3VuZHModG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRvcExlZnRXaWR0aEFuZEhlaWdodCh0b3AsIGxlZnQsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBjb25zdCBib3R0b20gPSB0b3AgKyBoZWlnaHQsXG4gICAgICAgICAgcmlnaHQgPSBsZWZ0ICsgd2lkdGgsXG4gICAgICAgICAgYm91bmRzID0gbmV3IEJvdW5kcyh0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9mZnNldCB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uQ2xpY2soY2xpY2tIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJjbGlja1wiLCBjbGlja0hhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZDbGljayhjbGlja0hhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIsIGVsZW1lbnQpOyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtyZW1vdmVSZXNpemVPYmplY3R9IGZyb20gXCIuL3Jlc2l6ZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gb24oZXZlbnRUeXBlcywgaGFuZGxlciwgZWxlbWVudCkge1xuICBldmVudFR5cGVzID0gZXZlbnRUeXBlcy5zcGxpdChcIiBcIik7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaCgoZXZlbnRUeXBlKSA9PiB7XG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gXCJyZXNpemVcIikge1xuICAgICAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmZpbmRFdmVudExpc3RlbmVycyhcInJlc2l6ZVwiKSxcbiAgICAgICAgICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzTGVuZ3RoID0gcmVzaXplRXZlbnRMaXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICBpZiAocmVzaXplRXZlbnRMaXN0ZW5lcnNMZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5hZGRSZXNpemVPYmplY3QoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZihldmVudFR5cGVzLCBoYW5kbGVyLCBlbGVtZW50KSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KFwiIFwiKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gXCJyZXNpemVcIikge1xuICAgICAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmZpbmRFdmVudExpc3RlbmVycyhcInJlc2l6ZVwiKSxcbiAgICAgICAgICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzTGVuZ3RoID0gcmVzaXplRXZlbnRMaXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgICBpZiAocmVzaXplRXZlbnRMaXN0ZW5lcnNMZW5ndGggPT09IDApIHtcbiAgICAgICAgcmVtb3ZlUmVzaXplT2JqZWN0KHRoaXMpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCA9IHRoaXMpIHtcbiAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KFwiZXZlbnRMaXN0ZW5lcnNcIikpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gW107XG4gIH1cblxuICBjb25zdCBldmVudExpc3RlbmVyID0gY3JlYXRlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpO1xuXG4gIHRoaXMuZXZlbnRMaXN0ZW5lcnMucHVzaChldmVudExpc3RlbmVyKTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50ID0gdGhpcykge1xuICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5maW5kRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpLFxuICAgICAgICBpbmRleCA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuaW5kZXhPZihldmVudExpc3RlbmVyKSxcbiAgICAgICAgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgdGhpcy5ldmVudExpc3RlbmVycy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcblxuICBpZiAodGhpcy5ldmVudExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVycztcbiAgfVxuXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLmZpbmQoKGV2ZW50TGlzdGVuZXIpID0+IHtcbiAgICBjb25zdCBmb3VuZCA9ICggKGV2ZW50TGlzdGVuZXIuZWxlbWVudCA9PT0gZWxlbWVudCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50TGlzdGVuZXIuaGFuZGxlciA9PT0gaGFuZGxlcikgJiZcbiAgICAgICAgICAgICAgICAgICAgKGV2ZW50TGlzdGVuZXIuZXZlbnRUeXBlID09PSBldmVudFR5cGUpICk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRXZlbnRMaXN0ZW5lcnMoZXZlbnRUeXBlKSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXJzID0gW107XG5cbiAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoXCJldmVudExpc3RlbmVyc1wiKSkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgoZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgICAgY29uc3QgZm91bmQgPSAoZXZlbnRMaXN0ZW5lci5ldmVudFR5cGUgPT09IGV2ZW50VHlwZSk7XG5cbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICBldmVudExpc3RlbmVycy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXJzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCkge1xuICBsZXQgZXZlbnRMaXN0ZW5lcjtcblxuICBldmVudExpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gICAgaGFuZGxlci5jYWxsKGVsZW1lbnQsIGV2ZW50LCBlbGVtZW50KVxuICB9O1xuXG4gIE9iamVjdC5hc3NpZ24oZXZlbnRMaXN0ZW5lciwge1xuICAgIGVsZW1lbnQsXG4gICAgaGFuZGxlcixcbiAgICBldmVudFR5cGVcbiAgfSk7XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgY29tYmluZSwgcHJ1bmUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL29iamVjdFwiO1xuaW1wb3J0IHsgZmlyc3QsIGd1YXJhbnRlZSB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7IFNWR19OQU1FU1BBQ0VfVVJJIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgaXNIVE1MQXR0cmlidXRlTmFtZSwgaXNTVkdBdHRyaWJ1dGVOYW1lIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyByZW1vdmVGYWxzZXlFbGVtZW50cywgcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9lbGVtZW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcykge1xuICBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydGllcyk7IC8vL1xuXG4gIGNvbWJpbmUocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKHRoaXMsIHByb3BlcnRpZXMpIHx8IHByb3BlcnRpZXMuY2hpbGRFbGVtZW50czsgIC8vL1xuXG4gIHBydW5lKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBzdmcgPSAodGhpcy5kb21FbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0gU1ZHX05BTUVTUEFDRV9VUkkpLCAvLy9cbiAgICAgICAgbmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTsgIC8vL1xuXG4gIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XG5cbiAgICBpZiAoZmFsc2UpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgYWRkSGFuZGxlcih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZU5hbWUobmFtZSwgc3ZnKSkge1xuICAgICAgYWRkQXR0cmlidXRlKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KFwicHJvcGVydGllc1wiKSkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAgICAgcHJvcGVydGllc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBjb250ZXh0ID0ge307XG5cbiAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKChjaGlsZEVsZW1lbnQpID0+IHtcbiAgICB1cGRhdGVDb250ZXh0KGNoaWxkRWxlbWVudCwgY29udGV4dCk7XG5cbiAgICBjaGlsZEVsZW1lbnQuYWRkVG8odGhpcyk7XG4gIH0pO1xuXG4gIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgIGNvbnRleHRcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgcmV0dXJuIHRoaXMuY29udGV4dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbkNvbnRleHQobmFtZXMsIHRoZW5EZWxldGUpIHtcbiAgY29uc3QgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAxKSB7XG4gICAgY29uc3QgZmlyc3RBcmd1bWVudCA9IGZpcnN0KGFyZ3VtZW50cyk7XG5cbiAgICBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gIH1cblxuICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRleHRbbmFtZV0sXG4gICAgICAgICAgcHJvcGVydHlOYW1lID0gbmFtZSwgIC8vL1xuICAgICAgICAgIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICB9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvcik7XG5cbiAgICBpZiAodGhlbkRlbGV0ZSkge1xuICAgICAgZGVsZXRlIHRoaXMuY29udGV4dFtuYW1lXTtcbiAgICB9XG4gIH0sIFtdKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gbnVsbDtcblxuICBpZiAodHlwZW9mIGVsZW1lbnQuY2hpbGRFbGVtZW50cyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2hpbGRFbGVtZW50cyA9IGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKTtcblxuICAgIGNoaWxkRWxlbWVudHMgPSBndWFyYW50ZWUoY2hpbGRFbGVtZW50cyk7XG5cbiAgICBjaGlsZEVsZW1lbnRzID0gcmVtb3ZlRmFsc2V5RWxlbWVudHMoY2hpbGRFbGVtZW50cyk7XG5cbiAgICBjaGlsZEVsZW1lbnRzID0gcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzKGNoaWxkRWxlbWVudHMpO1xuICB9XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRleHQoY2hpbGRFbGVtZW50LCBjb250ZXh0KSB7XG4gIGNvbnN0IHBhcmVudENvbnRleHQgPSAodHlwZW9mIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0ID09PSBcImZ1bmN0aW9uXCIpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LnBhcmVudENvbnRleHQoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LmNvbnRleHQ7IC8vL1xuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwgcGFyZW50Q29udGV4dCk7XG5cbiAgZGVsZXRlIGNoaWxkRWxlbWVudC5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBhZGRIYW5kbGVyKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9IG5hbWUuc3Vic3RyKDIpLnRvTG93ZXJDYXNlKCksIC8vL1xuICAgICAgICBoYW5kbGVyID0gdmFsdWU7ICAvLy9cblxuICBlbGVtZW50Lm9uKGV2ZW50VHlwZSwgaGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJpYnV0ZShlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBpZiAobmFtZSA9PT0gXCJjbGFzc05hbWVcIikge1xuICAgIG5hbWUgPSBcImNsYXNzXCI7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gXCJodG1sRm9yXCIpIHtcbiAgICBuYW1lID0gXCJmb3JcIjtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSwgc3ZnKSB7XG4gIHJldHVybiBzdmcgPyBpc1NWR0F0dHJpYnV0ZU5hbWUobmFtZSkgOiBpc0hUTUxBdHRyaWJ1dGVOYW1lKG5hbWUpXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uS2V5VXAoa2V5VXBIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZLZXlVcChrZXlVcEhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvbktleURvd24oa2V5RG93bkhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZLZXlEb3duKGtleURvd25IYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwia2V5ZG93blwiLCBrZXlEb3duSGFuZGxlciwgZWxlbWVudCk7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZVVwKG1vdXNlVXBIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJtb3VzZXVwXCIsIG1vdXNlVXBIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb2ZmTW91c2VVcChtb3VzZVVwSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcIm1vdXNldXBcIiwgbW91c2VVcEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlT3V0KG1vdXNlT3V0SGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwibW91c2VvdXRcIiwgbW91c2VPdXRIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb2ZmTW91c2VPdXQobW91c2VPdXRIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwibW91c2VvdXRcIiwgbW91c2VPdXRIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bkhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZNb3VzZURvd24obW91c2VEb3duSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcIm1vdXNlZG93blwiLCBtb3VzZURvd25IYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZU92ZXIobW91c2VPdmVySGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwibW91c2VvdmVyXCIsIG1vdXNlT3ZlckhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZNb3VzZU92ZXIobW91c2VPdmVySGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcIm1vdXNlb3ZlclwiLCBtb3VzZU92ZXJIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb25Nb3VzZU1vdmUobW91c2VNb3ZlSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZUhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZNb3VzZU1vdmUobW91c2VNb3ZlSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcIm1vdXNlbW92ZVwiLCBtb3VzZU1vdmVIYW5kbGVyLCBlbGVtZW50KTsgfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblJlc2l6ZShyZXNpemVIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJyZXNpemVcIiwgcmVzaXplSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZlJlc2l6ZShyZXNpemVIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwicmVzaXplXCIsIHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRSZXNpemVPYmplY3QoKSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvYmplY3RcIiksXG4gICAgICAgIHN0eWxlID0gYGRpc3BsYXk6IGJsb2NrOyBcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyBcbiAgICAgICAgICAgICAgICAgdG9wOiAwOyBcbiAgICAgICAgICAgICAgICAgbGVmdDogMDsgXG4gICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsgXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgXG4gICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyBcbiAgICAgICAgICAgICAgICAgei1pbmRleDogLTE7YCxcbiAgICAgICAgZGF0YSA9IFwiYWJvdXQ6YmxhbmtcIixcbiAgICAgICAgdHlwZSA9IFwidGV4dC9odG1sXCI7XG5cbiAgcmVzaXplT2JqZWN0LnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIHN0eWxlKTtcbiAgcmVzaXplT2JqZWN0LmRhdGEgPSBkYXRhO1xuICByZXNpemVPYmplY3QudHlwZSA9IHR5cGU7XG5cbiAgdGhpcy5fX3Jlc2l6ZU9iamVjdF9fID0gcmVzaXplT2JqZWN0O1xuXG4gIHJlc2l6ZU9iamVjdC5vbmxvYWQgPSAoKSA9PiByZXNpemVPYmplY3RMb2FkSGFuZGxlcih0aGlzKTtcblxuICB0aGlzLmRvbUVsZW1lbnQuYXBwZW5kQ2hpbGQocmVzaXplT2JqZWN0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdCgpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gdGhpcy5fX3Jlc2l6ZU9iamVjdF9fLFxuICAgICAgICBvYmplY3RXaW5kb3cgPSByZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3OyAgLy8vXG5cbiAgb2JqZWN0V2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVzaXplRXZlbnRMaXN0ZW5lcik7XG5cbiAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUNoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZWxlbWVudC5fX3Jlc2l6ZU9iamVjdF9fLFxuICAgICAgICByZXNpemVPYmplY3RXaW5kb3cgPSByZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3OyAgLy8vXG5cbiAgcmVzaXplT2JqZWN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSBlbGVtZW50LmZpbmRFdmVudExpc3RlbmVycyhcInJlc2l6ZVwiKTtcblxuICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzLmZvckVhY2goKHJlc2l6ZUV2ZW50TGlzdGVuZXIpID0+IHJlc2l6ZUV2ZW50TGlzdGVuZXIuY2FsbChlbGVtZW50LCBldmVudCwgZWxlbWVudCkpO1xuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25TY3JvbGwoc2Nyb2xsSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwic2Nyb2xsXCIsIHNjcm9sbEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZTY3JvbGwoc2Nyb2xsSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcInNjcm9sbFwiLCBzY3JvbGxIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcDsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0OyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbExlZnQoc2Nyb2xsTGVmdCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU3RhdGUodXBkYXRlKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgdXBkYXRlKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50XCI7XG5cbmltcG9ydCB7IGZsYXR0ZW4gfSBmcm9tIFwiLi91dGlsaXRpZXMvYXJyYXlcIjtcbmltcG9ydCB7IHJlbW92ZUZhbHNleUVsZW1lbnRzLCByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMgfSBmcm9tIFwiLi91dGlsaXRpZXMvZWxlbWVudHNcIjtcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmaXJzdEFyZ3VtZW50LCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgbGV0IGVsZW1lbnQgPSBudWxsO1xuXG4gIGlmIChmaXJzdEFyZ3VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50c0Zyb21SZW1haW5pbmdBcmd1bWVudHMocmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIHByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNoaWxkRWxlbWVudHNcbiAgICB9LCBwcm9wZXJ0aWVzKTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChpc1N1YmNsYXNzT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IENsYXNzID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gQ2xhc3MuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gZmlyc3RBcmd1bWVudDsgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBFbGVtZW50LmZyb21UYWdOYW1lKHRhZ05hbWUsIHByb3BlcnRpZXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gZWxlbWVudEZ1bmN0aW9uKHByb3BlcnRpZXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBSZWFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudFxufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3Q7XG5cbmZ1bmN0aW9uIGNoaWxkRWxlbWVudHNGcm9tUmVtYWluaW5nQXJndW1lbnRzKHJlbWFpbmluZ0FyZ3VtZW50cykge1xuICByZW1haW5pbmdBcmd1bWVudHMgPSBmbGF0dGVuKHJlbWFpbmluZ0FyZ3VtZW50cyk7IC8vL1xuXG4gIGxldCBjaGlsZEVsZW1lbnRzID0gcmVtYWluaW5nQXJndW1lbnRzOyAvLy9cblxuICBjaGlsZEVsZW1lbnRzID0gcmVtb3ZlRmFsc2V5RWxlbWVudHMoY2hpbGRFbGVtZW50cyk7XG5cbiAgY2hpbGRFbGVtZW50cyA9IHJlcGxhY2VTdHJpbmdzV2l0aFRleHRFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gaXNTdWJjbGFzc09mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50Lm5hbWUgPT09IENsYXNzLm5hbWUpIHsgLy8vXG4gICAgdHlwZU9mID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBhcmd1bWVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhcmd1bWVudCk7IC8vL1xuXG4gICAgaWYgKGFyZ3VtZW50KSB7XG4gICAgICB0eXBlT2YgPSBpc1N1YmNsYXNzT2YoYXJndW1lbnQsIENsYXNzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZU9mO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBPZmZzZXQgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9vZmZzZXRcIjtcbmltcG9ydCBCb3VuZHMgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9ib3VuZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7IC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpcztcbiAgfVxuXG4gIGdldFRleHQoKSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGhpcy5kb21FbGVtZW50Lm5vZGVWYWx1ZSxcbiAgICAgICAgICB0ZXh0ID0gbm9kZVZhbHVlOyAvLy9cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGV4dDsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIGNvbnN0IGNsaWVudFdpZHRoID0gdGhpcy5kb21FbGVtZW50LmNsaWVudFdpZHRoLFxuICAgICAgICAgIHdpZHRoID0gY2xpZW50V2lkdGg7ICAvLy9cblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpIHtcbiAgICBjb25zdCBjbGllbnRIZWlnaHQgPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgIGhlaWdodCA9IGNsaWVudEhlaWdodDsgIC8vL1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucHJlcGVuZCh0aGlzKTsgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hcHBlbmQodGhpcyk7IH1cblxuICBhZGRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYWRkKHRoaXMpOyB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucmVtb3ZlKHRoaXMpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIGluc2VydEFmdGVyKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50Lm5leHRTaWJsaW5nKTsgIC8vL1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGljZShhcnJheTEsIHN0YXJ0LCBkZWxldGVDb3VudCA9IEluZmluaXR5LCBhcnJheTIgPSBbXSkge1xuICBjb25zdCBhcmdzID0gW3N0YXJ0LCBkZWxldGVDb3VudCwgLi4uYXJyYXkyXSxcbiAgICAgICBkZWxldGVkSXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYXJyYXkxLCBhcmdzKTtcblxuICByZXR1cm4gZGVsZXRlZEl0ZW1zQXJyYXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGF0dGVuKGFycmF5KSB7XG4gIHJldHVybiBhcnJheS5yZWR1Y2UoKGFycmF5LCBlbGVtZW50KSA9PiB7XG4gICAgYXJyYXkgPSBhcnJheS5jb25jYXQoZWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBhcnJheTtcbiAgfSwgW10pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3VhcmFudGVlKGFycmF5T3JFbGVtZW50KSB7XG4gIGFycmF5T3JFbGVtZW50ID0gYXJyYXlPckVsZW1lbnQgfHwgW107XG5cbiAgcmV0dXJuIChhcnJheU9yRWxlbWVudCBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICBhcnJheU9yRWxlbWVudCA6XG4gICAgICAgICAgICAgIFthcnJheU9yRWxlbWVudF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdWdtZW50KGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5Mi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzcGxpY2UgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FycmF5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhkb21FbGVtZW50cykge1xuICBjb25zdCBkb21FbGVtZW50c1dpdGhFbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzKGRvbUVsZW1lbnRzLCAoZG9tRWxlbWVudCkgPT4gKGRvbUVsZW1lbnQuX19lbGVtZW50X18gIT09IHVuZGVmaW5lZCkpLFxuICAgICAgICBlbGVtZW50cyA9IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzLm1hcCgoZG9tRWxlbWVudCkgPT4gZG9tRWxlbWVudC5fX2VsZW1lbnRfXyk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzID0gW10pIHtcbiAgY29uc3Qgc3RhcnQgPSAtMSxcbiAgICAgICAgZGVsZXRlQ291bnQgPSAwLFxuICAgICAgICBjaGlsZERPTU5vZGVzID0gZG9tTm9kZS5jaGlsZE5vZGVzOyAgLy8vXG5cbiAgc3BsaWNlKGRlc2NlbmRhbnRET01Ob2Rlcywgc3RhcnQsIGRlbGV0ZUNvdW50LCBjaGlsZERPTU5vZGVzKTtcblxuICBjaGlsZERPTU5vZGVzLmZvckVhY2goKGNoaWxkRE9NTm9kZSkgPT4gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoY2hpbGRET01Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMpKTtcblxuICByZXR1cm4gZGVzY2VuZGFudERPTU5vZGVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yKGRvbU5vZGVzLCBzZWxlY3Rvcikge1xuICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gZmlsdGVyRE9NTm9kZXMoZG9tTm9kZXMsIChkb21Ob2RlKSA9PiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKSk7XG5cbiAgcmV0dXJuIGZpbHRlcmVkRE9NTm9kZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGRvbU5vZGVUeXBlID0gZG9tTm9kZS5ub2RlVHlwZTtcblxuICBzd2l0Y2ggKGRvbU5vZGVUeXBlKSB7XG4gICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERSA6IHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb21Ob2RlOyAvLy9cblxuICAgICAgcmV0dXJuIGRvbUVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgY2FzZSBOb2RlLlRFWFRfTk9ERSA6IHtcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gXCIqXCIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRE9NTm9kZXMoZG9tTm9kZXMsIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRET01Ob2RlcyA9IFtdLFxuICAgICAgICBkb21Ob2Rlc0xlbmd0aCA9IGRvbU5vZGVzLmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZG9tTm9kZXNMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBkb21Ob2RlID0gZG9tTm9kZXNbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IHRlc3QoZG9tTm9kZSk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBmaWx0ZXJlZERPTU5vZGVzLnB1c2goZG9tTm9kZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmVkRE9NTm9kZXM7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IFRleHRFbGVtZW50IGZyb20gXCIuLi90ZXh0RWxlbWVudFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRmFsc2V5RWxlbWVudHMoZWxlbWVudHMpIHtcbiAgZWxlbWVudHMgPSBlbGVtZW50cy5yZWR1Y2UoKGVsZW1lbnRzLCBlbGVtZW50KSA9PiB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzKGVsZW1lbnRzKSB7XG4gIGVsZW1lbnRzID0gZWxlbWVudHMubWFwKChlbGVtZW50KSA9PiB7ICAvLy9cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBlbGVtZW50LCAgLy8vXG4gICAgICAgICAgICB0ZXh0RWxlbWVudCA9IG5ldyBUZXh0RWxlbWVudCh0ZXh0KTtcblxuICAgICAgZWxlbWVudCA9IHRleHRFbGVtZW50OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NWR1RhZ05hbWUodGFnTmFtZSkge1xuICByZXR1cm4gc3ZnVGFnTmFtZXMuaW5jbHVkZXModGFnTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1NWR0F0dHJpYnV0ZU5hbWUoYXR0cmlidXRlTmFtZSkge1xuICByZXR1cm4gc3ZnQXR0cmlidXRlTmFtZXMuaW5jbHVkZXMoYXR0cmlidXRlTmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0hUTUxBdHRyaWJ1dGVOYW1lKGF0dHJpYnV0ZU5hbWUpIHtcbiAgcmV0dXJuIGh0bWxBdHRyaWJ1dGVOYW1lcy5pbmNsdWRlcyhhdHRyaWJ1dGVOYW1lKTtcbn1cblxuY29uc3Qgc3ZnVGFnTmFtZXMgPSBbXG4gICAgICAgIFwiYWx0R2x5cGhcIiwgXCJhbmltYXRlXCIsIFwiYW5pbWF0ZUNvbG9yXCIsIFwiYW5pbWF0ZU1vdGlvblwiLCBcImFuaW1hdGVUcmFuc2Zvcm1cIiwgXCJhbmltYXRpb25cIiwgXCJhdWRpb1wiLFxuICAgICAgICBcImNpcmNsZVwiLCBcImNsaXBQYXRoXCIsIFwiY29sb3ItcHJvZmlsZVwiLCBcImN1cnNvclwiLFxuICAgICAgICBcImRlZnNcIiwgXCJkZXNjXCIsIFwiZGlzY2FyZFwiLFxuICAgICAgICBcImVsbGlwc2VcIixcbiAgICAgICAgXCJmZUJsZW5kXCIsIFwiZmVDb2xvck1hdHJpeFwiLCBcImZlQ29tcG9uZW50VHJhbnNmZXJcIiwgXCJmZUNvbXBvc2l0ZVwiLCBcImZlQ29udm9sdmVNYXRyaXhcIiwgXCJmZURpZmZ1c2VMaWdodGluZ1wiLCBcImZlRGlzcGxhY2VtZW50TWFwXCIsIFwiZmVEaXN0YW50TGlnaHRcIiwgXCJmZURyb3BTaGFkb3dcIiwgXCJmZUZsb29kXCIsIFwiZmVGdW5jQVwiLCBcImZlRnVuY0JcIiwgXCJmZUZ1bmNHXCIsIFwiZmVGdW5jUlwiLCBcImZlR2F1c3NpYW5CbHVyXCIsIFwiZmVJbWFnZVwiLCBcImZlTWVyZ2VcIiwgXCJmZU1lcmdlTm9kZVwiLCBcImZlTW9ycGhvbG9neVwiLCBcImZlT2Zmc2V0XCIsIFwiZmVQb2ludExpZ2h0XCIsIFwiZmVTcGVjdWxhckxpZ2h0aW5nXCIsIFwiZmVTcG90TGlnaHRcIiwgXCJmZVRpbGVcIiwgXCJmZVR1cmJ1bGVuY2VcIiwgXCJmaWx0ZXJcIiwgXCJmb250XCIsIFwiZm9udC1mYWNlXCIsIFwiZm9udC1mYWNlLWZvcm1hdFwiLCBcImZvbnQtZmFjZS1uYW1lXCIsIFwiZm9udC1mYWNlLXVyaVwiLCBcImZvcmVpZ25PYmplY3RcIixcbiAgICAgICAgXCJnXCIsIFwiZ2x5cGhcIiwgXCJnbHlwaFJlZlwiLFxuICAgICAgICBcImhhbmRsZXJcIiwgXCJoYXRjaFwiLCBcImhhdGNocGF0aFwiLCBcImhrZXJuXCIsXG4gICAgICAgIFwiaW1hZ2VcIiwgXCJsaW5lXCIsIFwibGluZWFyR3JhZGllbnRcIixcbiAgICAgICAgXCJsaXN0ZW5lclwiLFxuICAgICAgICBcIm1hcmtlclwiLCBcIm1hc2tcIiwgXCJtZXNoXCIsIFwibWVzaGdyYWRpZW50XCIsIFwibWVzaHBhdGNoXCIsIFwibWVzaHJvd1wiLCBcIm1ldGFkYXRhXCIsIFwibWlzc2luZy1nbHlwaFwiLCBcIm1wYXRoXCIsXG4gICAgICAgIFwicGF0aFwiLCBcInBhdHRlcm5cIiwgXCJwb2x5Z29uXCIsIFwicG9seWxpbmVcIiwgXCJwcmVmZXRjaFwiLFxuICAgICAgICBcInJhZGlhbEdyYWRpZW50XCIsIFwicmVjdFwiLFxuICAgICAgICBcInNjcmlwdFwiLCBcInNldFwiLCBcInNvbGlkY29sb3JcIiwgXCJzdG9wXCIsIFwic3R5bGVcIiwgXCJzdmdcIiwgXCJzd2l0Y2hcIiwgXCJzeW1ib2xcIixcbiAgICAgICAgXCJ0YnJlYWtcIiwgXCJ0ZXh0XCIsIFwidGV4dEFyZWFcIiwgXCJ0ZXh0UGF0aFwiLCBcInRpdGxlXCIsIFwidHJlZlwiLCBcInRzcGFuXCIsXG4gICAgICAgIFwidW5rbm93blwiLCBcInVzZVwiLFxuICAgICAgICBcInZpZGVvXCIsIFwidmlld1wiLCBcInZrZXJuXCJcbiAgICAgIF0sXG4gICAgICBzdmdBdHRyaWJ1dGVOYW1lcyA9IFtcbiAgICAgICAgXCJhY2NlbnQtaGVpZ2h0XCIsIFwiYWNjdW11bGF0ZVwiLCBcImFkZGl0aXZlXCIsIFwiYWxpZ25tZW50LWJhc2VsaW5lXCIsIFwiYWxwaGFiZXRpY1wiLCBcImFtcGxpdHVkZVwiLCBcImFyYWJpYy1mb3JtXCIsIFwiYXNjZW50XCIsIFwiYXR0cmlidXRlTmFtZVwiLCBcImF0dHJpYnV0ZVR5cGVcIiwgXCJhemltdXRoXCIsXG4gICAgICAgIFwiYmFuZHdpZHRoXCIsIFwiYmFzZUZyZXF1ZW5jeVwiLCBcImJhc2VQcm9maWxlXCIsIFwiYmFzZWxpbmUtc2hpZnRcIiwgXCJiYm94XCIsIFwiYmVnaW5cIiwgXCJiaWFzXCIsIFwiYnlcIixcbiAgICAgICAgXCJjYWxjTW9kZVwiLCBcImNhcC1oZWlnaHRcIiwgXCJjbGlwXCIsIFwiY2xhc3NOYW1lXCIsIFwiY2xpcC1wYXRoXCIsIFwiY2xpcC1ydWxlXCIsIFwiY2xpcFBhdGhVbml0c1wiLCBcImNvbG9yXCIsIFwiY29sb3ItaW50ZXJwb2xhdGlvblwiLCBcImNvbG9yLWludGVycG9sYXRpb24tZmlsdGVyc1wiLCBcImNvbG9yLXByb2ZpbGVcIiwgXCJjb2xvci1yZW5kZXJpbmdcIiwgXCJjb250ZW50U2NyaXB0VHlwZVwiLCBcImNvbnRlbnRTdHlsZVR5cGVcIiwgXCJjcm9zc29yaWdpblwiLCBcImN1cnNvclwiLCBcImN4XCIsIFwiY3lcIixcbiAgICAgICAgXCJkXCIsIFwiZGVmYXVsdEFjdGlvblwiLCBcImRlc2NlbnRcIiwgXCJkaWZmdXNlQ29uc3RhbnRcIiwgXCJkaXJlY3Rpb25cIiwgXCJkaXNwbGF5XCIsIFwiZGl2aXNvclwiLCBcImRvbWluYW50LWJhc2VsaW5lXCIsIFwiZG93bmxvYWRcIiwgXCJkdXJcIiwgXCJkeFwiLCBcImR5XCIsXG4gICAgICAgIFwiZWRnZU1vZGVcIiwgXCJlZGl0YWJsZVwiLCBcImVsZXZhdGlvblwiLCBcImVuYWJsZS1iYWNrZ3JvdW5kXCIsIFwiZW5kXCIsIFwiZXZlbnRcIiwgXCJleHBvbmVudFwiLCBcImV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWRcIixcbiAgICAgICAgXCJmaWxsXCIsIFwiZmlsbC1vcGFjaXR5XCIsIFwiZmlsbC1ydWxlXCIsIFwiZmlsdGVyXCIsIFwiZmlsdGVyUmVzXCIsIFwiZmlsdGVyVW5pdHNcIiwgXCJmbG9vZC1jb2xvclwiLCBcImZsb29kLW9wYWNpdHlcIiwgXCJmb2N1c0hpZ2hsaWdodFwiLCBcImZvY3VzYWJsZVwiLCBcImZvbnQtZmFtaWx5XCIsIFwiZm9udC1zaXplXCIsIFwiZm9udC1zaXplLWFkanVzdFwiLCBcImZvbnQtc3RyZXRjaFwiLCBcImZvbnQtc3R5bGVcIiwgXCJmb250LXZhcmlhbnRcIiwgXCJmb250LXdlaWdodFwiLCBcImZvcm1hdFwiLCBcImZyXCIsIFwiZnJvbVwiLCBcImZ4XCIsIFwiZnlcIixcbiAgICAgICAgXCJnMVwiLCBcImcyXCIsIFwiZ2x5cGgtbmFtZVwiLCBcImdseXBoLW9yaWVudGF0aW9uLWhvcml6b250YWxcIiwgXCJnbHlwaC1vcmllbnRhdGlvbi12ZXJ0aWNhbFwiLCBcImdseXBoUmVmXCIsIFwiZ3JhZGllbnRUcmFuc2Zvcm1cIiwgXCJncmFkaWVudFVuaXRzXCIsXG4gICAgICAgIFwiaGFuZGxlclwiLCBcImhhbmdpbmdcIiwgXCJoYXRjaENvbnRlbnRVbml0c1wiLCBcImhhdGNoVW5pdHNcIiwgXCJoZWlnaHRcIiwgXCJob3Jpei1hZHYteFwiLCBcImhvcml6LW9yaWdpbi14XCIsIFwiaG9yaXotb3JpZ2luLXlcIiwgXCJocmVmXCIsIFwiaHJlZmxhbmdcIixcbiAgICAgICAgXCJpZGVvZ3JhcGhpY1wiLCBcImltYWdlLXJlbmRlcmluZ1wiLCBcImluXCIsIFwiaW4yXCIsIFwiaW5pdGlhbFZpc2liaWxpdHlcIiwgXCJpbnRlcmNlcHRcIixcbiAgICAgICAgXCJrXCIsIFwiazFcIiwgXCJrMlwiLCBcImszXCIsIFwiazRcIiwgXCJrZXJuZWxNYXRyaXhcIiwgXCJrZXJuZWxVbml0TGVuZ3RoXCIsIFwia2VybmluZ1wiLCBcImtleVBvaW50c1wiLCBcImtleVNwbGluZXNcIiwgXCJrZXlUaW1lc1wiLFxuICAgICAgICBcImxlbmd0aEFkanVzdFwiLCBcImxldHRlci1zcGFjaW5nXCIsIFwibGlnaHRpbmctY29sb3JcIiwgXCJsaW1pdGluZ0NvbmVBbmdsZVwiLCBcImxvY2FsXCIsXG4gICAgICAgIFwibWFya2VyLWVuZFwiLCBcIm1hcmtlci1taWRcIiwgXCJtYXJrZXItc3RhcnRcIiwgXCJtYXJrZXJIZWlnaHRcIiwgXCJtYXJrZXJVbml0c1wiLCBcIm1hcmtlcldpZHRoXCIsIFwibWFza1wiLCBcIm1hc2tDb250ZW50VW5pdHNcIiwgXCJtYXNrVW5pdHNcIiwgXCJtYXRoZW1hdGljYWxcIiwgXCJtYXhcIiwgXCJtZWRpYVwiLCBcIm1lZGlhQ2hhcmFjdGVyRW5jb2RpbmdcIiwgXCJtZWRpYUNvbnRlbnRFbmNvZGluZ3NcIiwgXCJtZWRpYVNpemVcIiwgXCJtZWRpYVRpbWVcIiwgXCJtZXRob2RcIiwgXCJtaW5cIiwgXCJtb2RlXCIsXG4gICAgICAgIFwibmFtZVwiLCBcIm5hdi1kb3duXCIsIFwibmF2LWRvd24tbGVmdFwiLCBcIm5hdi1kb3duLXJpZ2h0XCIsIFwibmF2LWxlZnRcIiwgXCJuYXYtbmV4dFwiLCBcIm5hdi1wcmV2XCIsIFwibmF2LXJpZ2h0XCIsIFwibmF2LXVwXCIsIFwibmF2LXVwLWxlZnRcIiwgXCJuYXYtdXAtcmlnaHRcIiwgXCJudW1PY3RhdmVzXCIsXG4gICAgICAgIFwib2JzZXJ2ZXJcIiwgXCJvZmZzZXRcIiwgXCJvcGFjaXR5XCIsIFwib3BlcmF0b3JcIiwgXCJvcmRlclwiLCBcIm9yaWVudFwiLCBcIm9yaWVudGF0aW9uXCIsIFwib3JpZ2luXCIsIFwib3ZlcmZsb3dcIiwgXCJvdmVybGF5XCIsIFwib3ZlcmxpbmUtcG9zaXRpb25cIiwgXCJvdmVybGluZS10aGlja25lc3NcIixcbiAgICAgICAgXCJwYW5vc2UtMVwiLCBcInBhdGhcIiwgXCJwYXRoTGVuZ3RoXCIsIFwicGF0dGVybkNvbnRlbnRVbml0c1wiLCBcInBhdHRlcm5UcmFuc2Zvcm1cIiwgXCJwYXR0ZXJuVW5pdHNcIiwgXCJwaGFzZVwiLCBcInBpdGNoXCIsIFwicGxheWJhY2tPcmRlclwiLCBcInBsYXliYWNrb3JkZXJcIiwgXCJwb2ludGVyLWV2ZW50c1wiLCBcInBvaW50c1wiLCBcInBvaW50c0F0WFwiLCBcInBvaW50c0F0WVwiLCBcInBvaW50c0F0WlwiLCBcInByZXNlcnZlQWxwaGFcIiwgXCJwcmVzZXJ2ZUFzcGVjdFJhdGlvXCIsIFwicHJpbWl0aXZlVW5pdHNcIiwgXCJwcm9wYWdhdGVcIixcbiAgICAgICAgXCJyXCIsIFwicmFkaXVzXCIsIFwicmVmWFwiLCBcInJlZllcIiwgXCJyZW5kZXJpbmctaW50ZW50XCIsIFwicmVwZWF0Q291bnRcIiwgXCJyZXBlYXREdXJcIiwgXCJyZXF1aXJlZEV4dGVuc2lvbnNcIiwgXCJyZXF1aXJlZEZlYXR1cmVzXCIsIFwicmVxdWlyZWRGb250c1wiLCBcInJlcXVpcmVkRm9ybWF0c1wiLCBcInJlc3RhcnRcIiwgXCJyZXN1bHRcIiwgXCJyb3RhdGVcIiwgXCJyeFwiLCBcInJ5XCIsXG4gICAgICAgIFwic2NhbGVcIiwgXCJzZWVkXCIsIFwic2hhcGUtcmVuZGVyaW5nXCIsIFwic2lkZVwiLCBcInNsb3BlXCIsIFwic25hcHNob3RUaW1lXCIsIFwic3BhY2luZ1wiLCBcInNwZWN1bGFyQ29uc3RhbnRcIiwgXCJzcGVjdWxhckV4cG9uZW50XCIsIFwic3ByZWFkTWV0aG9kXCIsIFwic3JjXCIsIFwic3RhcnRPZmZzZXRcIiwgXCJzdGREZXZpYXRpb25cIiwgXCJzdGVtaFwiLCBcInN0ZW12XCIsIFwic3RpdGNoVGlsZXNcIiwgXCJzdG9wLWNvbG9yXCIsIFwic3RvcC1vcGFjaXR5XCIsIFwic3RyaWtldGhyb3VnaC1wb3NpdGlvblwiLCBcInN0cmlrZXRocm91Z2gtdGhpY2tuZXNzXCIsIFwic3RyaW5nXCIsIFwic3Ryb2tlXCIsIFwic3Ryb2tlLWRhc2hhcnJheVwiLCBcInN0cm9rZS1kYXNob2Zmc2V0XCIsIFwic3Ryb2tlLWxpbmVjYXBcIiwgXCJzdHJva2UtbGluZWpvaW5cIiwgXCJzdHJva2UtbWl0ZXJsaW1pdFwiLCBcInN0cm9rZS1vcGFjaXR5XCIsIFwic3Ryb2tlLXdpZHRoXCIsIFwic3R5bGVcIiwgXCJzdXJmYWNlU2NhbGVcIiwgXCJzeW5jQmVoYXZpb3JcIiwgXCJzeW5jQmVoYXZpb3JEZWZhdWx0XCIsIFwic3luY01hc3RlclwiLCBcInN5bmNUb2xlcmFuY2VcIiwgXCJzeW5jVG9sZXJhbmNlRGVmYXVsdFwiLCBcInN5c3RlbUxhbmd1YWdlXCIsXG4gICAgICAgIFwidGFibGVWYWx1ZXNcIiwgXCJ0YXJnZXRcIiwgXCJ0YXJnZXRYXCIsIFwidGFyZ2V0WVwiLCBcInRleHQtYW5jaG9yXCIsIFwidGV4dC1kZWNvcmF0aW9uXCIsIFwidGV4dC1yZW5kZXJpbmdcIiwgXCJ0ZXh0TGVuZ3RoXCIsIFwidGltZWxpbmVCZWdpblwiLCBcInRpbWVsaW5lYmVnaW5cIiwgXCJ0aXRsZVwiLCBcInRvXCIsIFwidHJhbnNmb3JtXCIsIFwidHJhbnNmb3JtQmVoYXZpb3JcIiwgXCJ0eXBlXCIsXG4gICAgICAgIFwidTFcIiwgXCJ1MlwiLCBcInVuZGVybGluZS1wb3NpdGlvblwiLCBcInVuZGVybGluZS10aGlja25lc3NcIiwgXCJ1bmljb2RlXCIsIFwidW5pY29kZS1iaWRpXCIsIFwidW5pY29kZS1yYW5nZVwiLCBcInVuaXRzLXBlci1lbVwiLFxuICAgICAgICBcInYtYWxwaGFiZXRpY1wiLCBcInYtaGFuZ2luZ1wiLCBcInYtaWRlb2dyYXBoaWNcIiwgXCJ2LW1hdGhlbWF0aWNhbFwiLCBcInZhbHVlc1wiLCBcInZlcnNpb25cIiwgXCJ2ZXJ0LWFkdi15XCIsIFwidmVydC1vcmlnaW4teFwiLCBcInZlcnQtb3JpZ2luLXlcIiwgXCJ2aWV3Qm94XCIsIFwidmlld1RhcmdldFwiLCBcInZpc2liaWxpdHlcIixcbiAgICAgICAgXCJ3aWR0aFwiLCBcIndpZHRoc1wiLCBcIndvcmQtc3BhY2luZ1wiLCBcIndyaXRpbmctbW9kZVwiLFxuICAgICAgICBcInhcIiwgXCJ4LWhlaWdodFwiLCBcIngxXCIsIFwieDJcIiwgXCJ4Q2hhbm5lbFNlbGVjdG9yXCIsXG4gICAgICAgIFwieVwiLCBcInkxXCIsIFwieTJcIiwgXCJ5Q2hhbm5lbFNlbGVjdG9yXCIsXG4gICAgICAgIFwielwiLCBcInpvb21BbmRQYW5cIlxuICAgICAgXSxcbiAgICAgIGh0bWxBdHRyaWJ1dGVOYW1lcyA9IFtcbiAgICAgICAgXCJhY2NlcHRcIiwgXCJhY2NlcHRDaGFyc2V0XCIsIFwiYWNjZXNzS2V5XCIsIFwiYWN0aW9uXCIsIFwiYWxsb3dcIiwgXCJhbGxvd0Z1bGxTY3JlZW5cIiwgXCJhbGxvd1RyYW5zcGFyZW5jeVwiLCBcImFsdFwiLCBcImFzeW5jXCIsIFwiYXV0b0NvbXBsZXRlXCIsIFwiYXV0b0ZvY3VzXCIsIFwiYXV0b1BsYXlcIixcbiAgICAgICAgXCJjYXB0dXJlXCIsIFwiY2VsbFBhZGRpbmdcIiwgXCJjZWxsU3BhY2luZ1wiLCBcImNoYWxsZW5nZVwiLCBcImNoYXJTZXRcIiwgXCJjaGVja2VkXCIsIFwiY2l0ZVwiLCBcImNsYXNzSURcIiwgXCJjbGFzc05hbWVcIiwgXCJjb2xTcGFuXCIsIFwiY29sc1wiLCBcImNvbnRlbnRcIiwgXCJjb250ZW50RWRpdGFibGVcIiwgXCJjb250ZXh0TWVudVwiLCBcImNvbnRyb2xzXCIsIFwiY29vcmRzXCIsIFwiY3Jvc3NPcmlnaW5cIixcbiAgICAgICAgXCJkYXRhXCIsIFwiZGF0ZVRpbWVcIiwgXCJkZWZhdWx0XCIsIFwiZGVmZXJcIiwgXCJkaXJcIiwgXCJkaXNhYmxlZFwiLCBcImRvd25sb2FkXCIsIFwiZHJhZ2dhYmxlXCIsXG4gICAgICAgIFwiZW5jVHlwZVwiLFxuICAgICAgICBcImZvcm1cIiwgXCJmb3JtQWN0aW9uXCIsIFwiZm9ybUVuY1R5cGVcIiwgXCJmb3JtTWV0aG9kXCIsIFwiZm9ybU5vVmFsaWRhdGVcIiwgXCJmb3JtVGFyZ2V0XCIsIFwiZnJhbWVCb3JkZXJcIixcbiAgICAgICAgXCJoZWFkZXJzXCIsIFwiaGVpZ2h0XCIsIFwiaGlkZGVuXCIsIFwiaGlnaFwiLCBcImhyZWZcIiwgXCJocmVmTGFuZ1wiLCBcImh0bWxGb3JcIiwgXCJodHRwRXF1aXZcIixcbiAgICAgICAgXCJpY29uXCIsIFwiaWRcIiwgXCJpbnB1dE1vZGVcIiwgXCJpbnRlZ3JpdHlcIiwgXCJpc1wiLFxuICAgICAgICBcImtleVBhcmFtc1wiLCBcImtleVR5cGVcIiwgXCJraW5kXCIsXG4gICAgICAgIFwibGFiZWxcIiwgXCJsYW5nXCIsIFwibGlzdFwiLCBcImxvb3BcIiwgXCJsb3dcIixcbiAgICAgICAgXCJtYW5pZmVzdFwiLCBcIm1hcmdpbkhlaWdodFwiLCBcIm1hcmdpbldpZHRoXCIsIFwibWF4XCIsIFwibWF4TGVuZ3RoXCIsIFwibWVkaWFcIiwgXCJtZWRpYUdyb3VwXCIsIFwibWV0aG9kXCIsIFwibWluXCIsIFwibWluTGVuZ3RoXCIsIFwibXVsdGlwbGVcIiwgXCJtdXRlZFwiLFxuICAgICAgICBcIm5hbWVcIiwgXCJub1ZhbGlkYXRlXCIsIFwibm9uY2VcIixcbiAgICAgICAgXCJvcGVuXCIsIFwib3B0aW11bVwiLFxuICAgICAgICBcInBhdHRlcm5cIiwgXCJwbGFjZWhvbGRlclwiLCBcInBvc3RlclwiLCBcInByZWxvYWRcIiwgXCJwcm9maWxlXCIsXG4gICAgICAgIFwicmFkaW9Hcm91cFwiLCBcInJlYWRPbmx5XCIsIFwicmVsXCIsIFwicmVxdWlyZWRcIiwgXCJyZXZlcnNlZFwiLCBcInJvbGVcIiwgXCJyb3dTcGFuXCIsIFwicm93c1wiLFxuICAgICAgICBcInNhbmRib3hcIiwgXCJzY29wZVwiLCBcInNjb3BlZFwiLCBcInNjcm9sbGluZ1wiLCBcInNlYW1sZXNzXCIsIFwic2VsZWN0ZWRcIiwgXCJzaGFwZVwiLCBcInNpemVcIiwgXCJzaXplc1wiLCBcInNwYW5cIiwgXCJzcGVsbENoZWNrXCIsIFwic3JjXCIsIFwic3JjRG9jXCIsIFwic3JjTGFuZ1wiLCBcInNyY1NldFwiLCBcInN0YXJ0XCIsIFwic3RlcFwiLCBcInN0eWxlXCIsIFwic3VtbWFyeVwiLFxuICAgICAgICBcInRhYkluZGV4XCIsIFwidGFyZ2V0XCIsIFwidGl0bGVcIiwgXCJ0eXBlXCIsXG4gICAgICAgIFwidXNlTWFwXCIsXG4gICAgICAgIFwidmFsdWVcIixcbiAgICAgICAgXCJ3aWR0aFwiLFxuICAgICAgICBcIndtb2RlXCIsXG4gICAgICAgIFwid3JhcFwiXG4gICAgICBdO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lKHRhcmdldE9iamVjdCwgc291cmNlT2JqZWN0ID0ge30pIHtcbiAgY29uc3Qgc291cmNlS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZU9iamVjdCk7XG5cbiAgc291cmNlS2V5cy5mb3JFYWNoKChzb3VyY2VLZXkpID0+IHtcbiAgICBjb25zdCB0YXJnZXRQcm9wZXJ0eSA9IHRhcmdldE9iamVjdFtzb3VyY2VLZXldLFxuICAgICAgICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlT2JqZWN0W3NvdXJjZUtleV07XG5cbiAgICB0YXJnZXRPYmplY3Rbc291cmNlS2V5XSA9IHRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShzb3VyY2VLZXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0YXJnZXRQcm9wZXJ0eX0gJHtzb3VyY2VQcm9wZXJ0eX1gIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQcm9wZXJ0eTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcnVuZSh0YXJnZXRPYmplY3QsIHNvdXJjZUtleXMpIHtcbiAgc291cmNlS2V5cy5mb3JFYWNoKChzb3VyY2VLZXkpID0+IHtcbiAgICBpZiAodGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KHNvdXJjZUtleSkpIHtcbiAgICAgIGRlbGV0ZSB0YXJnZXRPYmplY3Rbc291cmNlS2V5XTtcbiAgICB9XG4gIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IG9uQ2xpY2ssIG9mZkNsaWNrIH0gZnJvbSBcIi4vbWl4aW5zL2NsaWNrXCI7XG5pbXBvcnQgeyBvblJlc2l6ZSwgb2ZmUmVzaXplIH0gZnJvbSBcIi4vbWl4aW5zL3Jlc2l6ZVwiO1xuaW1wb3J0IHsgb25LZXlVcCwgb2ZmS2V5VXAsIG9uS2V5RG93biwgb2ZmS2V5RG93biB9IGZyb20gXCIuL21peGlucy9rZXlcIjtcbmltcG9ydCB7IG9uLCBvZmYsIGFkZEV2ZW50TGlzdGVuZXIsIGZpbmRFdmVudExpc3RlbmVyLCBmaW5kRXZlbnRMaXN0ZW5lcnMsIHJlbW92ZUV2ZW50TGlzdGVuZXIgfSBmcm9tIFwiLi9taXhpbnMvZXZlbnRcIjtcbmltcG9ydCB7IG9uTW91c2VVcCwgb25Nb3VzZURvd24sIG9uTW91c2VPdmVyLCBvbk1vdXNlT3V0LCBvbk1vdXNlTW92ZSwgb2ZmTW91c2VVcCwgb2ZmTW91c2VEb3duLCBvZmZNb3VzZU92ZXIsIG9mZk1vdXNlT3V0LCBvZmZNb3VzZU1vdmUgfSBmcm9tIFwiLi9taXhpbnMvbW91c2VcIjtcblxuY2xhc3MgV2luZG93IHtcbiAgb24gPSBvbjtcbiAgb2ZmID0gb2ZmO1xuXG4gIG9uQ2xpY2sgPSBvbkNsaWNrO1xuICBvZmZDbGljayA9IG9mZkNsaWNrO1xuXG4gIG9uUmVzaXplID0gb25SZXNpemU7XG4gIG9mZlJlc2l6ZSA9IG9mZlJlc2l6ZTtcbiAgYWRkUmVzaXplT2JqZWN0ID0gYWRkUmVzaXplT2JqZWN0O1xuICByZW1vdmVSZXNpemVPYmplY3QgPSByZW1vdmVSZXNpemVPYmplY3Q7XG5cbiAgb25LZXlVcCA9IG9uS2V5VXA7XG4gIG9mZktleVVwID0gb2ZmS2V5VXA7XG4gIG9uS2V5RG93biA9IG9uS2V5RG93bjtcbiAgb2ZmS2V5RG93biA9IG9mZktleURvd247XG5cbiAgb25Nb3VzZVVwID0gb25Nb3VzZVVwO1xuICBvbk1vdXNlRG93biA9IG9uTW91c2VEb3duO1xuICBvbk1vdXNlT3ZlciA9IG9uTW91c2VPdmVyO1xuICBvbk1vdXNlT3V0ID0gb25Nb3VzZU91dDtcbiAgb25Nb3VzZU1vdmUgPSBvbk1vdXNlTW92ZTtcbiAgb2ZmTW91c2VVcCA9IG9mZk1vdXNlVXA7XG4gIG9mZk1vdXNlRG93biA9IG9mZk1vdXNlRG93bjtcbiAgb2ZmTW91c2VPdmVyID0gb2ZmTW91c2VPdmVyO1xuICBvZmZNb3VzZU91dCA9IG9mZk1vdXNlT3V0O1xuICBvZmZNb3VzZU1vdmUgPSBvZmZNb3VzZU1vdmU7XG5cbiAgYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG4gIGZpbmRFdmVudExpc3RlbmVyID0gZmluZEV2ZW50TGlzdGVuZXI7XG4gIGZpbmRFdmVudExpc3RlbmVycyA9IGZpbmRFdmVudExpc3RlbmVycztcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gd2luZG93OyAvLy9cbiAgfVxuXG4gIGFzc2lnbiguLi5zb3VyY2VzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kb21FbGVtZW50OyAvLy9cblxuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKTtcbiAgfVxuXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVyV2lkdGg7IH0gLy8vXG4gIFxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIZWlnaHQ7IH0gLy8vXG5cbiAgZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VZT2Zmc2V0OyB9ICAvLy9cblxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VYT2Zmc2V0OyB9IC8vL1xufVxuXG5leHBvcnQgZGVmYXVsdCAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgPyB1bmRlZmluZWQgOiBuZXcgV2luZG93KCk7ICAvLy9cblxuZnVuY3Rpb24gYWRkUmVzaXplT2JqZWN0KCkge30gLy8vXG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdCgpIHt9IC8vL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBUUkFDRSA9IFwiVFJBQ0VcIjtcbmV4cG9ydCBjb25zdCBERUJVRyA9IFwiREVCVUdcIjtcbmV4cG9ydCBjb25zdCBJTkZPID0gXCJJTkZPXCI7XG5leHBvcnQgY29uc3QgV0FSTklORyA9IFwiV0FSTklOR1wiO1xuZXhwb3J0IGNvbnN0IEVSUk9SID0gXCJFUlJPUlwiO1xuZXhwb3J0IGNvbnN0IEZBVEFMID0gXCJGQVRBTFwiO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HX0xFVkVMID0gV0FSTklORztcbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSCA9IG51bGw7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0dfRklMRV9CQVNFX05BTUUgPSBcImRlZmF1bHRcIjtcblxuZXhwb3J0IGNvbnN0IEdFVF9NRVRIT0QgPSBcIkdFVFwiO1xuZXhwb3J0IGNvbnN0IFBPU1RfTUVUSE9EID0gXCJQT1NUXCI7XG5leHBvcnQgY29uc3QgQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFID0gXCJhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9VVRGLThcIjtcblxuZXhwb3J0IGNvbnN0IERBVEFfRVZFTlQgPSBcImRhdGFcIjtcbmV4cG9ydCBjb25zdCBVVEY4X0VOQ09ESU5HID0gXCJ1dGY4XCI7XG5cbmV4cG9ydCBjb25zdCBDVFJMX0MgPSBcIl5DXCI7XG5leHBvcnQgY29uc3QgRVRYX0NIQVJBQ1RFUiA9IFwiXFx1MDAwM1wiO1xuZXhwb3J0IGNvbnN0IEJBQ0tTUEFDRV9DSEFSQUNURVIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyk7XG5leHBvcnQgY29uc3QgTElORV9GRUVEX0NIQVJBQ1RFUiA9IFwiXFxuXCI7XG5leHBvcnQgY29uc3QgQ0FSUklBR0VfUkVUVVJOX0NIQVJBQ1RFUiA9IFwiXFxyXCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OID0gXCJcIjsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXRoVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL3BhdGhcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvYXJyYXlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgdGVtcGxhdGVVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvdGVtcGxhdGVcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgZmlsZVN5c3RlbVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGFzeW5jaHJvbm91c1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9hc3luY2hyb25vdXNcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgbWlzY2VsbGFuZW91c1V0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzXCI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTt9XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWNvbmQoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzFdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB0aGlyZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMl07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvdXJ0aChhcnJheSkgeyByZXR1cm4gYXJyYXlbM107IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpZnRoKGFycmF5KSB7IHJldHVybiBhcnJheVs0XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZmlmdGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA1XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZm91cnRoTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gNF07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHRoaXJkTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gM107IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDJdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdGFpbChhcnJheSkgeyByZXR1cm4gYXJyYXkuc2xpY2UoMSk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHB1c2goYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB1bnNoaWZ0KGFycmF5MSwgYXJyYXkyKSB7IEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGFycmF5MSwgYXJyYXkyKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0KGFycmF5MSwgZWxlbWVudE9yQXJyYXkyKSB7XG4gIGNvbnN0IGFycmF5MiA9IChlbGVtZW50T3JBcnJheTIgaW5zdGFuY2VvZiBBcnJheSkgP1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50T3JBcnJheTIgOlxuICAgICAgICAgICAgICAgICAgICAgW2VsZW1lbnRPckFycmF5Ml07XG4gIFxuICBwdXNoKGFycmF5MSwgYXJyYXkyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKGFycmF5KSB7XG4gIGNvbnN0IHN0YXJ0ID0gMDtcbiAgXG4gIHJldHVybiBhcnJheS5zcGxpY2Uoc3RhcnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weShhcnJheTEsIGFycmF5Mikge1xuICBjb25zdCBzdGFydCA9IDAsXG4gICAgICAgIGRlbGV0ZUNvdW50ID0gYXJyYXkyLmxlbmd0aDsgIC8vL1xuICBcbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQgPSBJbmZpbml0eSwgYXJyYXkyID0gW10pIHtcbiAgY29uc3QgYXJncyA9IFtzdGFydCwgZGVsZXRlQ291bnQsIC4uLmFycmF5Ml0sXG4gICAgICAgIGRlbGV0ZWRJdGVtc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhcnJheTEsIGFyZ3MpO1xuXG4gIHJldHVybiBkZWxldGVkSXRlbXNBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIFxuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBzdGFydCA9IGluZGV4OyAgLy8vXG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICBpZiAoZm91bmQpIHtcbiAgICBjb25zdCBkZWxldGVDb3VudCA9IDE7XG5cbiAgICBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50LCBlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlcihhcnJheSwgdGVzdCkge1xuICBjb25zdCBmaWx0ZXJlZEVsZW1lbnRzID0gW107XG4gIFxuICBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBmaWx0ZXJlZEVsZW1lbnRzLnVuc2hpZnQoZmlyc3REZWxldGVkRWxlbWVudCk7ICAvLy9cbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGZpbHRlcmVkRWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kKGFycmF5LCB0ZXN0KSB7XG4gIGNvbnN0IGVsZW1lbnRzID0gW107XG5cbiAgZm9yd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcnVuZShhcnJheSwgdGVzdCkge1xuICBsZXQgcHJ1bmVkRWxlbWVudCA9IHVuZGVmaW5lZDtcbiAgXG4gIGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXBhc3NlZCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxLFxuICAgICAgICAgICAgZGVsZXRlZEVsZW1lbnRzID0gYXJyYXkuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCksXG4gICAgICAgICAgICBmaXJzdERlbGV0ZWRFbGVtZW50ID0gZmlyc3QoZGVsZXRlZEVsZW1lbnRzKTtcbiAgICAgIFxuICAgICAgcHJ1bmVkRWxlbWVudCA9IGZpcnN0RGVsZXRlZEVsZW1lbnQ7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIHJldHVybiBwcnVuZWRFbGVtZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0Y2goYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgY29uc3QgZm91bmQgPSBhcnJheS5zb21lKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuXG4gIGlmIChmb3VuZCkge1xuICAgIGFycmF5LnB1c2goZWxlbWVudCk7XG4gIH1cblxuICByZXR1cm4gZm91bmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhdWdtZW50KGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5Mi5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcGFyYXRlKGFycmF5LCBhcnJheTEsIGFycmF5MiwgdGVzdCkge1xuICBhcnJheS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgcGFzc2VkID9cbiAgICAgIGFycmF5MS5wdXNoKGVsZW1lbnQpIDpcbiAgICAgICAgYXJyYXkyLnB1c2goZWxlbWVudCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgICBcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNTb21lKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IGFycmF5TGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNFdmVyeShhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFja3dhcmRzRXZlcnkoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNSZWR1Y2UoYXJyYXksIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgbGV0IHZhbHVlID0gaW5pdGlhbFZhbHVlO1xuXG4gIGZvcndhcmRzRm9yRWFjaChhcnJheSwgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgZWxlbWVudCwgaW5kZXgpO1xuICB9KTtcblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNSZWR1Y2UoYXJyYXksIGNhbGxiYWNrLCBpbml0aWFsVmFsdWUpIHtcbiAgbGV0IHZhbHVlID0gaW5pdGlhbFZhbHVlO1xuXG4gIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIHZhbHVlID0gY2FsbGJhY2sodmFsdWUsIGVsZW1lbnQsIGluZGV4KTtcbiAgfSk7XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xuXG4gICAgY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IGFycmF5TGVuZ3RoIC0gMTsgaW5kZXggPj0gMDsgaW5kZXgtLSkge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBmaXJzdCxcbiAgc2Vjb25kLFxuICB0aGlyZCxcbiAgZm91cnRoLFxuICBmaWZ0aCxcbiAgZmlmdGhMYXN0LFxuICBmb3VydGhMYXN0LFxuICB0aGlyZExhc3QsXG4gIHNlY29uZExhc3QsXG4gIGxhc3QsXG4gIHRhaWwsXG4gIHB1c2gsXG4gIHVuc2hpZnQsXG4gIGNvbmNhdCxcbiAgY2xlYXIsXG4gIGNvcHksXG4gIG1lcmdlLFxuICBzcGxpY2UsXG4gIHJlcGxhY2UsXG4gIGZpbHRlcixcbiAgZmluZCxcbiAgcHJ1bmUsXG4gIHBhdGNoLFxuICBhdWdtZW50LFxuICBzZXBhcmF0ZSxcbiAgZm9yd2FyZHNTb21lLFxuICBiYWNrd2FyZHNTb21lLFxuICBmb3J3YXJkc0V2ZXJ5LFxuICBiYWNrd2FyZHNFdmVyeSxcbiAgZm9yd2FyZHNSZWR1Y2UsXG4gIGJhY2t3YXJkc1JlZHVjZSxcbiAgZm9yd2FyZHNGb3JFYWNoLFxuICBiYWNrd2FyZHNGb3JFYWNoXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gd2hpbHN0KGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgIHRlcm1pbmF0ZSA9IGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gY2FsbGJhY2tzW2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50dWFsbHkoY2FsbGJhY2tzLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gY2FsbGJhY2tzLmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjYWxsYmFja3MuZm9yRWFjaCgoY2FsbGJhY2ssIGluZGV4KSA9PiB7XHJcbiAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiByZXBlYXRlZGx5KGNhbGxiYWNrLCBsZW5ndGgsIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgdGVybWluYXRlID0gKGNvdW50ID09PSBsZW5ndGgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYmFja3dhcmRzRm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gbGVuZ3RoO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQtLTtcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IC0xKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKGVsZW1lbnQsIG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIHdoaWxzdCxcclxuICBmb3JFYWNoLFxyXG4gIHNlcXVlbmNlLFxyXG4gIGV2ZW50dWFsbHksXHJcbiAgcmVwZWF0ZWRseSxcclxuICBmb3J3YXJkc0ZvckVhY2gsXHJcbiAgYmFja3dhcmRzRm9yRWFjaFxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5pbXBvcnQgeyBVVEY4X0VOQ09ESU5HIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCkge1xuICBjb25zdCBlbnRyeUV4aXN0cyA9IGZzLmV4aXN0c1N5bmMoZW50cnlQYXRoKTtcblxuICByZXR1cm4gZW50cnlFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0ZpbGVFeGlzdHMoZmlsZVBhdGgpIHtcbiAgbGV0IGZpbGVFeGlzdHMgPSBmYWxzZTtcbiAgXG4gIGNvbnN0IGVudHJ5UGF0aCA9IGZpbGVQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCk7XG4gIFxuICBpZiAoZW50cnlFeGlzdHMpIHtcbiAgICBjb25zdCBlbnRyeUZpbGUgPSBpc0VudHJ5RmlsZShlbnRyeVBhdGgpO1xuICAgIFxuICAgIGlmIChlbnRyeUZpbGUpIHtcbiAgICAgIGZpbGVFeGlzdHMgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGZpbGVFeGlzdHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja0RpcmVjdG9yeUV4aXN0cyhkaXJlY3RvcnlQYXRoKSB7XG4gIGxldCBkaXJlY3RvcnlFeGlzdHMgPSBmYWxzZTtcblxuICBjb25zdCBlbnRyeVBhdGggPSBkaXJlY3RvcnlQYXRoLCAvLy9cbiAgICAgICAgZW50cnlFeGlzdHMgPSBjaGVja0VudHJ5RXhpc3RzKGVudHJ5UGF0aCk7XG5cbiAgaWYgKGVudHJ5RXhpc3RzKSB7XG4gICAgY29uc3QgZW50cnlEaXJlY3RvcnkgPSBpc0VudHJ5RGlyZWN0b3J5KGVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZW50cnlEaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRpcmVjdG9yeUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50cnlGaWxlKGVudHJ5UGF0aCkge1xuICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMoZW50cnlQYXRoKSxcbiAgICAgICAgZW50cnlEaXJlY3RvcnkgPSBzdGF0LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGVudHJ5RmlsZSA9ICFlbnRyeURpcmVjdG9yeTtcblxuICByZXR1cm4gZW50cnlGaWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeURpcmVjdG9yeShlbnRyeVBhdGgpIHtcbiAgY29uc3Qgc3RhdCA9IGZzLnN0YXRTeW5jKGVudHJ5UGF0aCksXG4gICAgICAgIGVudHJ5RGlyZWN0b3J5ID0gc3RhdC5pc0RpcmVjdG9yeSgpO1xuXG4gIHJldHVybiBlbnRyeURpcmVjdG9yeTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlyZWN0b3J5RW1wdHkoZGlyZWN0b3J5UGF0aCkge1xuICBjb25zdCBzdWJFbnRyeU5hbWVzID0gcmVhZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgc3ViRW50cnlOYW1lc0xlbmd0aCA9IHN1YkVudHJ5TmFtZXMubGVuZ3RoLFxuICAgICAgICBkaXJlY3RvcnlFbXB0eSA9IChzdWJFbnRyeU5hbWVzTGVuZ3RoID09PSAwKTtcblxuICByZXR1cm4gZGlyZWN0b3J5RW1wdHk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3Qgc3ViRW50cnlOYW1lcyA9IGZzLnJlYWRkaXJTeW5jKGRpcmVjdG9yeVBhdGgpO1xuXG4gIHJldHVybiBzdWJFbnRyeU5hbWVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVhZEZpbGUoZmlsZVBhdGgsIGVuY29kaW5nID0gVVRGOF9FTkNPRElORykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVGaWxlKGZpbGVQYXRoLCBjb250ZW50KSB7XG4gIGZzLndyaXRlRmlsZVN5bmMoZmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kVG9GaWxlKGZpbGVQYXRoLCBjb250ZW50KSB7XG4gIGZzLmFwcGVuZEZpbGVTeW5jKGZpbGVQYXRoLCBjb250ZW50KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgaWYgKChkaXJlY3RvcnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lICE9PSBcIi5cIikgJiYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgIT09IG51bGwpKSB7XG4gICAgY29uc3QgcGFyZW50RGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsICAvLy9cbiAgICAgICAgICBwYXJlbnREaXJlY3RvcnlFeGlzdHMgPSBjaGVja0RpcmVjdG9yeUV4aXN0cyhwYXJlbnREaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmICghcGFyZW50RGlyZWN0b3J5RXhpc3RzKSB7XG4gICAgICBjcmVhdGVEaXJlY3RvcnkocGFyZW50RGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgZnMubWtkaXJTeW5jKGRpcmVjdG9yeVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuYW1lRmlsZShvbGRGaWxlUGF0aCwgbmV3RmlsZVBhdGgpIHtcbiAgZnMucmVuYW1lU3luYyhvbGRGaWxlUGF0aCwgbmV3RmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhdHMoZmlsZVBhdGgpIHtcbiAgcmV0dXJuIGZzLnN0YXRTeW5jKGZpbGVQYXRoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGVja0VudHJ5RXhpc3RzLFxuICBjaGVja0ZpbGVFeGlzdHMsXG4gIGNoZWNrRGlyZWN0b3J5RXhpc3RzLFxuICBpc0VudHJ5RmlsZSxcbiAgaXNFbnRyeURpcmVjdG9yeSxcbiAgaXNEaXJlY3RvcnlFbXB0eSxcbiAgcmVhZERpcmVjdG9yeSxcbiAgcmVhZEZpbGUsXG4gIHdyaXRlRmlsZSxcbiAgYXBwZW5kVG9GaWxlLFxuICBjcmVhdGVEaXJlY3RvcnksXG4gIHJlbmFtZUZpbGUsXG4gIGdldFN0YXRzXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByYyBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL3JjXCI7XG5pbXBvcnQgbG9nIGZyb20gXCIuL21pc2NlbGxhbmVvdXMvbG9nXCI7XG5pbXBvcnQgb25FVFggZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9vbkVUWFwiO1xuaW1wb3J0IHByb21wdCBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL3Byb21wdFwiO1xuXG5pbXBvcnQgeyBnZXQsIHBvc3QgfSBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL2FqYXhcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBsb2csXG4gIHJjLFxuICBnZXQsXG4gIHBvc3QsXG4gIG9uRVRYLFxuICBwcm9tcHRcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgR0VUX01FVEhPRCwgUE9TVF9NRVRIT0QsIEFQUExJQ0FUSU9OX0pTT05fQ0hBUlNFVF9VVEY4X0NPTlRFTlRfVFlQRSB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldChob3N0LCB1cmksIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBHRVRfTUVUSE9ELFxuICAgICAgICBib2R5ID0gdW5kZWZpbmVkO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvc3QoaG9zdCwgdXJpLCBqc29uLCBwYXJhbWV0ZXJzLCBjYWxsYmFjaykge1xuICBpZiAoY2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgIGNhbGxiYWNrID0gcGFyYW1ldGVyczsgLy8vXG4gICAgcGFyYW1ldGVycyA9IHt9O1xuICB9XG5cbiAgY29uc3QgbWV0aG9kID0gUE9TVF9NRVRIT0QsXG4gICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShqc29uKTtcblxuICByZXF1ZXN0KGhvc3QsIHVyaSwgcGFyYW1ldGVycywgbWV0aG9kLCBib2R5LCBjYWxsYmFjayk7XG59XG5cbmZ1bmN0aW9uIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHVybCA9IHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpLFxuICAgICAgICB4bWxIdHRwUmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHJlYWR5U3RhdGUsIHN0YXR1cywgcmVzcG9uc2VUZXh0IH0gPSB4bWxIdHRwUmVxdWVzdDtcblxuICAgIGlmIChyZWFkeVN0YXRlID09IDQpIHtcbiAgICAgIGxldCBqc29uID0gbnVsbDtcblxuICAgICAgaWYgKHN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY29uc3QganNvblN0cmluZyA9IHJlc3BvbnNlVGV4dDsgLy8vXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBqc29uID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAvLy9cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGxiYWNrKGpzb24pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBjb250ZW50VHlwZSA9IEFQUExJQ0FUSU9OX0pTT05fQ0hBUlNFVF9VVEY4X0NPTlRFTlRfVFlQRTtcblxuICB4bWxIdHRwUmVxdWVzdC5vcGVuKG1ldGhvZCwgdXJsKTtcblxuICB4bWxIdHRwUmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKFwiY29udGVudC10eXBlXCIsIGNvbnRlbnRUeXBlKTtcblxuICB4bWxIdHRwUmVxdWVzdC5zZW5kKGJvZHkpO1xufVxuXG5mdW5jdGlvbiBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgbmFtZXNMZW5ndGggPSBuYW1lcy5sZW5ndGgsXG4gICAgICAgIGxhc3RJbmRleCA9IG5hbWVzTGVuZ3RoIC0gMSxcbiAgICAgICAgcXVlcnlTdHJpbmcgPSBuYW1lcy5yZWR1Y2UoKHF1ZXJ5U3RyaW5nLCBuYW1lLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGFyYW1ldGVyc1tuYW1lXSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkTmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSxcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpLFxuICAgICAgICAgICAgICAgIGFtcGVyc2FuZE9yTm90aGluZyA9IChpbmRleCAhPT0gbGFzdEluZGV4KSA/IFwiJlwiIDogXCJcIjtcbiAgXG4gICAgICAgICAgcXVlcnlTdHJpbmcgKz0gYCR7ZW5jb2RlZE5hbWV9PSR7ZW5jb2RlZFZhbHVlfSR7YW1wZXJzYW5kT3JOb3RoaW5nfWA7XG4gIFxuICAgICAgICAgIHJldHVybiBxdWVyeVN0cmluZztcbiAgICAgICAgfSwgXCJcIik7XG5cbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xufVxuXG5mdW5jdGlvbiB1cmxGcm9tSG9zdFVSSUFuZFBhcmFtZXRlcnMoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzKSB7XG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmdGcm9tUGFyYW1ldGVycyhwYXJhbWV0ZXJzKSxcbiAgICAgICAgdXJsID0gKHF1ZXJ5U3RyaW5nID09PSBcIlwiKSA/XG4gICAgICAgICAgICAgIGAke2hvc3R9JHt1cml9YCA6XG4gICAgICAgICAgICAgICAgYCR7aG9zdH0ke3VyaX0/JHtxdWVyeVN0cmluZ31gO1xuXG4gIHJldHVybiB1cmw7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW1wb3J0IHsgc2Vjb25kIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgY29uY2F0ZW5hdGVQYXRocyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcGF0aFwiO1xuaW1wb3J0IHsgY2hlY2tGaWxlRXhpc3RzLCByZWFkRmlsZSwgYXBwZW5kVG9GaWxlLCByZW5hbWVGaWxlLCBnZXRTdGF0cyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvZmlsZVN5c3RlbVwiO1xuaW1wb3J0IHsgVFJBQ0UsIERFQlVHLCBJTkZPLCBXQVJOSU5HLCBFUlJPUiwgRkFUQUwsIERFRkFVTFRfTE9HX0xFVkVMLCBERUZBVUxUX0xPR19GSUxFX0JBU0VfTkFNRSwgREVGQVVMVF9MT0dfRElSRUNUT1JZX1BBVEggfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmxldCBsb2dMZXZlbCA9IERFRkFVTFRfTE9HX0xFVkVMLFxuICAgIGxvZ0ZpbGVCYXNlTmFtZSA9IERFRkFVTFRfTE9HX0ZJTEVfQkFTRV9OQU1FLFxuICAgIGxvZ0RpcmVjdG9yeVBhdGggPSBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSDtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKG1lc3NhZ2VPckVycm9yLCBsZXZlbCA9IFwiXCIpIHtcbiAgbGV0IHNhbGllbnRTdGFja01lc3NhZ2VJbmRleCA9IDE7XG5cbiAgY29uc3QgbGV2ZWxzID0gW1xuICAgIFRSQUNFLFxuICAgIERFQlVHLFxuICAgIElORk8sXG4gICAgV0FSTklORyxcbiAgICBFUlJPUixcbiAgICBGQVRBTCxcbiAgXTtcblxuICBpZiAobGV2ZWwgIT09IFwiXCIpIHtcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gbGV2ZWxzLmluZGV4T2YobGV2ZWwpLFxuICAgICAgICAgIGxvZ0xldmVsSW5kZXggPSBsZXZlbHMuaW5kZXhPZihsb2dMZXZlbCk7XG5cbiAgICBpZiAobGV2ZWxJbmRleCA8IGxvZ0xldmVsSW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzYWxpZW50U3RhY2tNZXNzYWdlSW5kZXggKz0gMTtcblxuICAgIGxldmVsID0gYCR7bGV2ZWx9IGA7ICAvLy9cbiAgfVxuXG4gIGxldCBlcnJvcixcbiAgICAgIG1lc3NhZ2U7XG5cbiAgaWYgKG1lc3NhZ2VPckVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBlcnJvciA9IG1lc3NhZ2VPckVycm9yOyAvLy9cblxuICAgICh7IG1lc3NhZ2UgfSA9IGVycm9yKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0gbWVzc2FnZU9yRXJyb3I7IC8vL1xuXG4gICAgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH1cblxuICBjb25zdCB7IHN0YWNrIH0gPSBlcnJvcixcbiAgICAgICAgc3RhY2tNZXNzYWdlcyA9IHN0YWNrTWVzc2FnZXNGcm9tU3RhY2soc3RhY2spLFxuICAgICAgICBwZXJ0aW5lbnRTdGFja01lc3NhZ2UgPSBzdGFja01lc3NhZ2VzW3NhbGllbnRTdGFja01lc3NhZ2VJbmRleF0sXG4gICAgICAgIHN0YWNrTWVzc2FnZSA9IHBlcnRpbmVudFN0YWNrTWVzc2FnZSwgLy8vXG4gICAgICAgIGN1cnJlbnREYXRlQW5kVGltZVN0cmluZyA9IGdldEN1cnJlbnREYXRlQW5kVGltZVN0cmluZygpLFxuICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpLFxuICAgICAgICBsaW5lTnVtYmVyID0gbGluZU51bWJlckZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSxcbiAgICAgICAgbG9nTWVzc2FnZSA9IGAke2xldmVsfSR7Y3VycmVudERhdGVBbmRUaW1lU3RyaW5nfSAke2ZpbGVQYXRofSgke2xpbmVOdW1iZXJ9KSAke21lc3NhZ2V9YDtcblxuICBjb25zb2xlLmxvZyhsb2dNZXNzYWdlKTtcblxuICBpZiAobG9nRGlyZWN0b3J5UGF0aCAhPT0gbnVsbCkge1xuICAgIHJvbGxPdmVyTG9nRmlsZSgpO1xuXG4gICAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICAgIGxvZ0ZpbGVDb250ZW50ID0gYCR7bG9nTWVzc2FnZX1cXG5gO1xuXG4gICAgYXBwZW5kVG9GaWxlKGxvZ0ZpbGVQYXRoLCBsb2dGaWxlQ29udGVudCk7XG4gIH1cblxuICByZXR1cm4gbG9nTWVzc2FnZTtcbn1cblxuZnVuY3Rpb24gdHJhY2UobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIFRSQUNFKTsgfVxuXG5mdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgREVCVUcpOyB9XG5cbmZ1bmN0aW9uIGluZm8obWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIElORk8pOyB9XG5cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIFdBUk5JTkcpOyB9XG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBFUlJPUik7IH1cblxuZnVuY3Rpb24gZmF0YWwobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIEZBVEFMKTsgfVxuXG5mdW5jdGlvbiBzZXRMb2dMZXZlbChsZXZlbCkgeyBsb2dMZXZlbCA9IGxldmVsOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0ZpbGVCYXNlTmFtZShmaWxlQmFzZU5hbWUpIHsgbG9nRmlsZUJhc2VOYW1lID0gZmlsZUJhc2VOYW1lOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0RpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkgeyBsb2dEaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aDsgfVxuXG5mdW5jdGlvbiBzZXRMb2dPcHRpb25zKGxvZ09wdGlvbnMpIHtcbiAgY29uc3QgeyBsZXZlbCwgZmlsZUJhc2VOYW1lLCBkaXJlY3RvcnlQYXRoIH0gPSBsb2dPcHRpb25zO1xuXG4gIHNldExvZ0xldmVsKGxldmVsKTtcblxuICBzZXRMb2dGaWxlQmFzZU5hbWUoZmlsZUJhc2VOYW1lKTtcblxuICBzZXRMb2dEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dGaWxlQ29udGVudCgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlQ29udGVudCA9IHJlYWRGaWxlKGxvZ0ZpbGVQYXRoKTtcblxuICByZXR1cm4gbG9nRmlsZUNvbnRlbnQ7XG59XG5cbk9iamVjdC5hc3NpZ24obG9nLCB7XG4gIFRSQUNFLFxuICBERUJVRyxcbiAgSU5GTyxcbiAgV0FSTklORyxcbiAgRVJST1IsXG4gIEZBVEFMLFxuICB0cmFjZSxcbiAgZGVidWcsXG4gIGluZm8sXG4gIHdhcm5pbmcsXG4gIGVycm9yLFxuICBmYXRhbCxcbiAgc2V0TG9nTGV2ZWwsXG4gIHNldExvZ0ZpbGVCYXNlTmFtZSxcbiAgc2V0TG9nRGlyZWN0b3J5UGF0aCxcbiAgc2V0TG9nT3B0aW9ucyxcbiAgZ2V0TG9nRmlsZUNvbnRlbnRcbn0pO1xuXG5mdW5jdGlvbiBnZXRMb2dGaWxlUGF0aCgpIHtcbiAgY29uc3QgbG9nRmlsZU5hbWUgPSBgJHtsb2dGaWxlQmFzZU5hbWV9LmxvZ2AsXG4gICAgICAgIGxvZ0ZpbGVQYXRoID0gY29uY2F0ZW5hdGVQYXRocyhsb2dEaXJlY3RvcnlQYXRoLCBsb2dGaWxlTmFtZSk7XG5cbiAgcmV0dXJuIGxvZ0ZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRSb2xsZWRPdmVyTG9nRmlsZVBhdGgoKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlU3RyaW5nID0gZ2V0Q3VycmVudERhdGVTdHJpbmcoKSxcbiAgICAgICAgcm9sbGVkT3ZlckxvZ0ZpbGVOYW1lID0gYCR7bG9nRmlsZUJhc2VOYW1lfS4ke2N1cnJlbnREYXRlU3RyaW5nfS5sb2dgLFxuICAgICAgICByb2xsZWRPdmVyTG9nRmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGxvZ0RpcmVjdG9yeVBhdGgsIHJvbGxlZE92ZXJMb2dGaWxlTmFtZSk7XG5cbiAgcmV0dXJuIHJvbGxlZE92ZXJMb2dGaWxlUGF0aDtcbn1cblxuZnVuY3Rpb24gZ2V0TG9nRmlsZUxhc3RNb2RpZmllZERhdGUoKSB7XG4gIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgbG9nRmlsZVN0YXRzID0gZ2V0U3RhdHMobG9nRmlsZVBhdGgpLFxuICAgICAgICB7IG10aW1lIH0gPSBsb2dGaWxlU3RhdHMsXG4gICAgICAgIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlID0gbmV3IERhdGUobXRpbWUpOyAgLy8vXG5cbiAgcmV0dXJuIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlO1xufVxuXG5mdW5jdGlvbiByb2xsT3ZlckxvZ0ZpbGUoKSB7XG4gIGNvbnN0IGxvZ0ZpbGVQYXRoID0gZ2V0TG9nRmlsZVBhdGgoKSxcbiAgICAgICAgbG9nRmlsZUV4aXN0cyA9IGNoZWNrRmlsZUV4aXN0cyhsb2dGaWxlUGF0aCk7XG5cbiAgaWYgKCFsb2dGaWxlRXhpc3RzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpLFxuICAgICAgICBsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZUN1cnJlbnREYXRlID0gaXNEYXRlQ3VycmVudERhdGUobG9nRmlsZUxhc3RNb2RpZmllZERhdGUpO1xuXG4gIGlmICghbG9nRmlsZUxhc3RNb2RpZmllZERhdGVDdXJyZW50RGF0ZSkge1xuICAgIGNvbnN0IHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpO1xuXG4gICAgcmVuYW1lRmlsZShsb2dGaWxlUGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0RhdGVDdXJyZW50RGF0ZShkYXRlKSB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKSxcbiAgICAgICAgZGF0ZVN0cmluZyA9IGRhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGN1cnJlbnREYXRlU3RyaW5nID0gY3VycmVudERhdGUudG9EYXRlU3RyaW5nKCksXG4gICAgICAgIGRhdGVDdXJyZW50RGF0ZSA9IChkYXRlU3RyaW5nID09PSBjdXJyZW50RGF0ZVN0cmluZyk7XG5cbiAgcmV0dXJuIGRhdGVDdXJyZW50RGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3VycmVudERhdGVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gYCR7ZGF5fS0ke21vbnRofS0ke3llYXJ9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcoKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXkgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXREYXRlKCksIDIpLCAgLy8vXG4gICAgICAgIG1vbnRoID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TW9udGgoKSArIDEsIDIpLCAvLy9cbiAgICAgICAgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKSxcbiAgICAgICAgaG91cnMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRIb3VycygpLCAyKSxcbiAgICAgICAgbWludXRlcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldE1pbnV0ZXMoKSwgMiksXG4gICAgICAgIHNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRTZWNvbmRzKCksIDIpLFxuICAgICAgICBtaWxsaXNlY29uZHMgPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSwgMyksXG4gICAgICAgIGN1cnJlbnREYXRlQW5kVGltZVN0cmluZyA9IGAke2RheX0tJHttb250aH0tJHt5ZWFyfSAke2hvdXJzfToke21pbnV0ZXN9OiR7c2Vjb25kc30uJHttaWxsaXNlY29uZHN9YDtcblxuICByZXR1cm4gY3VycmVudERhdGVBbmRUaW1lU3RyaW5nO1xufVxuXG5mdW5jdGlvbiBzdGFja01lc3NhZ2VzRnJvbVN0YWNrKHN0YWNrKSB7XG4gIGNvbnN0IHN0YWNrTWVzc2FnZXMgPSBbXSxcbiAgICAgICAgc3RhY2tMaW5lcyA9IHN0YWNrLnNwbGl0KC9cXHJcXG58XFxuLyk7XG5cbiAgbGV0IHN0YWNrTWVzc2FnZSA9IFwiXCI7XG5cbiAgc3RhY2tMaW5lcy5mb3JFYWNoKChzdGFja0xpbmUpID0+IHtcbiAgICBjb25zdCBtYXRjaGVzID0gL15cXHMqYXQuKi8udGVzdChzdGFja0xpbmUpO1xuXG4gICAgc3RhY2tNZXNzYWdlID0gKHN0YWNrTWVzc2FnZSA9PT0gXCJcIikgP1xuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrTGluZSA6XG4gICAgICAgICAgICAgICAgICAgICAgICBgJHtzdGFja01lc3NhZ2V9XFxuJHtzdGFja0xpbmV9YDtcblxuICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICBzdGFja01lc3NhZ2VzLnB1c2goc3RhY2tNZXNzYWdlKTtcblxuICAgICAgc3RhY2tNZXNzYWdlID0gXCJcIjtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBzdGFja01lc3NhZ2VzO1xufVxuXG5mdW5jdGlvbiBmaWxlUGF0aEZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdGFja01lc3NhZ2UubWF0Y2goLyhcXC8uKyk6XFxkKzpcXGQrL20pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgYWJzb2x1dGVGaWxlUGF0aCA9IHNlY29uZE1hdGNoLCAgLy8vXG4gICAgICAgIGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aCA9IHBhdGgucmVzb2x2ZShcIi5cIiksICAvLy9cbiAgICAgICAgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoTGVuZ3RoID0gY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoLmxlbmd0aCxcbiAgICAgICAgc3RhcnQgPSBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGhMZW5ndGggKyAxLCAgLy8vXG4gICAgICAgIGZpbGVQYXRoID0gYWJzb2x1dGVGaWxlUGF0aC5zdWJzdHIoc3RhcnQpO1xuXG4gIHJldHVybiBmaWxlUGF0aDtcbn1cblxuZnVuY3Rpb24gbGluZU51bWJlckZyb21TdGFja01lc3NhZ2Uoc3RhY2tNZXNzYWdlKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBzdGFja01lc3NhZ2UubWF0Y2goLzooXFxkKykvbSksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBsaW5lTnVtYmVyID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBsaW5lTnVtYmVyO1xufVxuXG5mdW5jdGlvbiBwYWRTdGFydFdpdGhaZXJvZXMoc3RyaW5nLCB0YXJnZXRMZW5ndGgpIHtcbiAgY29uc3QgcGFkU3RyaW5nID0gXCIwXCIsXG4gICAgICAgIHBhZGRlZFN0cmluZyA9IHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpO1xuXG4gIHJldHVybiBwYWRkZWRTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0KHN0cmluZywgdGFyZ2V0TGVuZ3RoLCBwYWRTdHJpbmcpIHtcbiAgbGV0IHBhZGRpbmcgPSBcIlwiO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0YXJnZXRMZW5ndGg7IGluZGV4KyspIHtcbiAgICBwYWRkaW5nICs9IHBhZFN0cmluZztcbiAgfVxuXG4gIGNvbnN0IHBhZGRlZFN0cmluZyA9IGAke3BhZGRpbmd9JHtzdHJpbmd9YC5zdWJzdHIoLXRhcmdldExlbmd0aCk7XG5cbiAgcmV0dXJuIHBhZGRlZFN0cmluZztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBEQVRBX0VWRU5ULCBFVFhfQ0hBUkFDVEVSLCBVVEY4X0VOQ09ESU5HIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvbkVUWChoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50ID0gREFUQV9FVkVOVDtcblxuICBpZiAocHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKSB7XG4gICAgY29uc3QgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgICAgZW5jb2RpbmcgPSBVVEY4X0VOQ09ESU5HO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuICAgIHByb2Nlc3Muc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5yZXN1bWUoKTtcblxuICAgIHByb2Nlc3Muc3RkaW4uYWRkTGlzdGVuZXIoZXZlbnQsIGRhdGFIYW5kbGVyKTtcblxuICAgIHJldHVybiBvZmZFeHQ7XG4gIH1cblxuICBmdW5jdGlvbiBvZmZFeHQoKSB7XG4gICAgcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihldmVudCwgZGF0YUhhbmRsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0YUhhbmRsZXIoY2hhcmFjdGVyKSB7XG4gICAgaWYgKGNoYXJhY3RlciA9PT0gRVRYX0NIQVJBQ1RFUikge1xuICAgICAgaGFuZGxlcigpO1xuICAgIH1cbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBvbkVUWCBmcm9tIFwiLi9vbkVUWFwiO1xuXG5pbXBvcnQgeyB3aGlsc3QgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FzeW5jaHJvbm91c1wiO1xuXG5pbXBvcnQgeyBDVFJMX0MsIERBVEFfRVZFTlQsIEJBQ0tTUEFDRV9DSEFSQUNURVIsIExJTkVfRkVFRF9DSEFSQUNURVIsIENBUlJJQUdFX1JFVFVSTl9DSEFSQUNURVIgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb21wdChvcHRpb25zLCBjYWxsYmFjaykge1xuICBjb25zdCB2YWx1ZSA9IG51bGwsXG4gICAgICAgIHsgYXR0ZW1wdHMgPSAzIH0gPSBvcHRpb25zLFxuICAgICAgICBjb250ZXh0ID0ge1xuICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgfTtcblxuICB3aGlsc3QoYXR0ZW1wdCwgKCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWUgfSA9IGNvbnRleHQ7XG4gICAgXG4gICAgY2FsbGJhY2sodmFsdWUpO1xuICB9LCBjb250ZXh0KTtcbn1cblxuZnVuY3Rpb24gYXR0ZW1wdChuZXh0LCBkb25lLCBjb250ZXh0KSB7XG4gIGxldCB7IGF0dGVtcHRzIH0gPSBjb250ZXh0O1xuXG4gIGNvbnN0IHRlcm1pbmF0ZSA9IChhdHRlbXB0cy0tID09PSAwKTtcbiAgXG4gIGlmICh0ZXJtaW5hdGUpIHtcbiAgICBkb25lKCk7XG4gICAgXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBvcHRpb25zIH0gPSBjb250ZXh0LFxuICAgICAgICB7IGhpZGRlbiA9IGZhbHNlLFxuICAgICAgICAgIGVuY29kaW5nID0gXCJ1dGY4XCIsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgaW5pdGlhbFZhbHVlID0gXCJcIixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvblBhdHRlcm4sXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uIH0gPSBvcHRpb25zO1xuXG4gIGlucHV0KGRlc2NyaXB0aW9uLCBpbml0aWFsVmFsdWUsIGVuY29kaW5nLCBoaWRkZW4sIGNhbGxiYWNrKTtcblxuICBmdW5jdGlvbiBjYWxsYmFjayh2YWx1ZSkge1xuICAgIGNvbnN0IHZhbGlkID0gdmFsaWRhdGlvbkZ1bmN0aW9uID8gIC8vL1xuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24odmFsdWUpIDpcbiAgICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUGF0dGVybi50ZXN0KHZhbHVlKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coZXJyb3JNZXNzYWdlKTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgICAgIGF0dGVtcHRzXG4gICAgICB9KTtcblxuICAgICAgbmV4dCgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpbnB1dChkZXNjcmlwdGlvbiwgaW5pdGlhbFZhbHVlLCBlbmNvZGluZywgaGlkZGVuLCBjYWxsYmFjaykge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7IC8vL1xuXG4gIGNvbnN0IGV2ZW50ID0gREFUQV9FVkVOVCxcbiAgICAgICAgcmF3TW9kZSA9IHRydWUsXG4gICAgICAgIG9mZkVUWCA9IG9uRVRYKCgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhDVFJMX0MpO1xuXG4gICAgICAgICAgcHJvY2Vzcy5leGl0KCk7XG4gICAgICAgIH0pO1xuXG4gIHByb2Nlc3Muc3RkaW4uc2V0RW5jb2RpbmcoZW5jb2RpbmcpO1xuXG4gIHByb2Nlc3Muc3RkaW4uc2V0UmF3TW9kZShyYXdNb2RlKTtcblxuICBwcm9jZXNzLnN0ZG91dC53cml0ZShkZXNjcmlwdGlvbik7XG5cbiAgaWYgKCFoaWRkZW4pIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZSh2YWx1ZSk7XG4gIH1cblxuICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuXG4gIHByb2Nlc3Muc3RkaW4ub24oZXZlbnQsIGxpc3RlbmVyKTtcblxuICBmdW5jdGlvbiBsaXN0ZW5lcihjaHVuaykge1xuICAgIGNvbnN0IGNoYXJhY3RlciA9IGNodW5rLnRvU3RyaW5nKGVuY29kaW5nKTtcblxuICAgIHN3aXRjaCAoY2hhcmFjdGVyKSB7XG4gICAgICBjYXNlIExJTkVfRkVFRF9DSEFSQUNURVIgOlxuICAgICAgY2FzZSBDQVJSSUFHRV9SRVRVUk5fQ0hBUkFDVEVSIDpcbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoTElORV9GRUVEX0NIQVJBQ1RFUik7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXIpO1xuXG4gICAgICAgIHByb2Nlc3Muc3RkaW4ucGF1c2UoKTtcblxuICAgICAgICBvZmZFVFgoKTtcblxuICAgICAgICBjYWxsYmFjayh2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEJBQ0tTUEFDRV9DSEFSQUNURVIgOlxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCAtIDEpO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LmNsZWFyTGluZSgpO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO1xuXG4gICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICBpZiAoIWhpZGRlbikge1xuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFsdWUgKz0gY2hhcmFjdGVyO1xuXG4gICAgICAgIGlmICghaGlkZGVuKSB7XG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKCk7XG5cbiAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5jdXJzb3JUbygwKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBmaXJzdCwgc2Vjb25kIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgREVGQVVMVF9SQ19CQVNFX0VYVEVOU0lPTiB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJlYWRGaWxlLCB3cml0ZUZpbGUsIGNoZWNrRmlsZUV4aXN0cyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvZmlsZVN5c3RlbVwiO1xuXG5sZXQgcGF0aFJlc29sdmVyID0gcGF0aC5yZXNvbHZlLFxuICAgIGJhc2VFeHRlbnNpb24gPSBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByYyhlbnZpcm9ubWVudE5hbWVPckFyZ3YgPSBudWxsKSB7XG4gIGxldCBlbnZpcm9ubWVudCxcbiAgICAgIGVudmlyb25tZW50TmFtZSxcbiAgICAgIGVudmlyb25tZW50TmFtZU9yQXJndkFyZ3YgPSAoZW52aXJvbm1lbnROYW1lT3JBcmd2IGluc3RhbmNlb2YgQXJyYXkpO1xuXG4gIGlmIChlbnZpcm9ubWVudE5hbWVPckFyZ3ZBcmd2KSB7XG4gICAgY29uc3QgYXJndiA9IGVudmlyb25tZW50TmFtZU9yQXJndjsgLy8vXG5cbiAgICBlbnZpcm9ubWVudE5hbWUgPSBlbnZpcm9ubWVudE5hbWVGcm9tQXJndihhcmd2KTtcbiAgfSBlbHNlIHtcbiAgICBlbnZpcm9ubWVudE5hbWUgPSBlbnZpcm9ubWVudE5hbWVPckFyZ3Y7ICAvLy9cbiAgfVxuXG4gIGNvbnN0IGpzb24gPSByZWFkUkNGaWxlKCksXG4gICAgICAgIHsgZW52aXJvbm1lbnRzIH0gPSBqc29uO1xuXG4gIGlmIChlbnZpcm9ubWVudE5hbWUgPT09IG51bGwpIHtcbiAgICBjb25zdCBmaXJzdEVudmlyb25tZW50ID0gZmlyc3QoZW52aXJvbm1lbnRzKTtcblxuICAgIGVudmlyb25tZW50ID0gZmlyc3RFbnZpcm9ubWVudDsgLy8vXG4gIH0gZWxzZSB7XG4gICAgZW52aXJvbm1lbnQgPSBlbnZpcm9ubWVudHMuZmluZCgoZW52aXJvbm1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSB9ID0gZW52aXJvbm1lbnQsXG4gICAgICAgICAgICBmb3VuZCA9IChuYW1lID09PSBlbnZpcm9ubWVudE5hbWUpO1xuXG4gICAgICByZXR1cm4gZm91bmQ7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUgZW52aXJvbm1lbnQubmFtZTtcblxuICBPYmplY3QuYXNzaWduKHJjLCBlbnZpcm9ubWVudCk7XG5cbiAgcmV0dXJuIGVudmlyb25tZW50O1xufVxuXG5mdW5jdGlvbiByZWFkUkNGaWxlKCkge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICBmaWxlQ29udGVudCA9IHJlYWRGaWxlKGFic29sdXRlUkNGaWxlUGF0aCksXG4gICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGZpbGVDb250ZW50KTtcblxuICByZXR1cm4ganNvbjsgICAgICBcbn1cblxuZnVuY3Rpb24gd3JpdGVSQ0ZpbGUoanNvbikge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICBmaWxlQ29udGVudCA9IEpTT04uc3RyaW5naWZ5KGpzb24sIG51bGwsIGBcXHRgKTtcblxuICB3cml0ZUZpbGUoYWJzb2x1dGVSQ0ZpbGVQYXRoLCBmaWxlQ29udGVudCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVJDRmlsZShhZGRlZFByb3BlcnRpZXMsIC4uLmRlbGV0ZWRQcm9wZXJ0eU5hbWVzKSB7XG4gIGxldCBqc29uID0gcmVhZFJDRmlsZSgpO1xuXG4gIGlmIChhZGRlZFByb3BlcnRpZXMpIHtcbiAgICBPYmplY3QuYXNzaWduKGpzb24sIGFkZGVkUHJvcGVydGllcyk7XG4gIH1cblxuICBkZWxldGVkUHJvcGVydHlOYW1lcy5mb3JFYWNoKChkZWxldGVkUHJvcGVydHlOYW1lKSA9PiB7XG4gICAgZGVsZXRlIGpzb25bZGVsZXRlZFByb3BlcnR5TmFtZV07XG4gIH0pO1xuXG4gIHdyaXRlUkNGaWxlKGpzb24pOyAgICAgIFxufVxuXG5mdW5jdGlvbiBjaGVja1JDRmlsZUV4aXN0cygpIHtcbiAgY29uc3QgYWJzb2x1dGVSQ0ZpbGVQYXRoID0gYWJzb2x1dGVSQ0ZpbGVQYXRoRnJvbU5vdGhpbmcoKSxcbiAgICAgICAgcmNGaWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKGFic29sdXRlUkNGaWxlUGF0aCk7XG5cbiAgcmV0dXJuIHJjRmlsZUV4aXN0cztcbn1cblxuZnVuY3Rpb24gY3JlYXRlVmFjdW91c1JDRmlsZSgpIHtcbiAgY29uc3QganNvbiA9IHtcbiAgICBcImVudmlyb25tZW50c1wiOiBbXG4gICAgICB7fVxuICAgIF1cbiAgfTtcblxuICB3cml0ZVJDRmlsZShqc29uKTtcbn1cblxuZnVuY3Rpb24gc2V0UkNCYXNlRXh0ZW5zaW9uKHJjQmFzZUV4dGVuc2lvbikgeyBiYXNlRXh0ZW5zaW9uID0gcmNCYXNlRXh0ZW5zaW9uOyB9XG5cbmZ1bmN0aW9uIHNldFJDUGF0aFJlc29sdmVyKHJjUGF0aFJlc29sdmVyKSB7IHBhdGhSZXNvbHZlciA9IHJjUGF0aFJlc29sdmVyOyB9XG5cbk9iamVjdC5hc3NpZ24ocmMsIHtcbiAgcmVhZFJDRmlsZSxcbiAgd3JpdGVSQ0ZpbGUsXG4gIHVwZGF0ZVJDRmlsZSxcbiAgY2hlY2tSQ0ZpbGVFeGlzdHMsXG4gIGNyZWF0ZVZhY3VvdXNSQ0ZpbGUsXG4gIHNldFJDQmFzZUV4dGVuc2lvbixcbiAgc2V0UkNQYXRoUmVzb2x2ZXJcbn0pO1xuXG5mdW5jdGlvbiBlbnZpcm9ubWVudE5hbWVGcm9tQXJndihhcmd2KSB7XG4gIGxldCBlbnZpcm9ubWVudE5hbWUgPSBudWxsO1xuXG4gIGFyZ3YuZmluZCgoYXJndW1lbnQpID0+IHsgIC8vL1xuICAgIGNvbnN0IG1hdGNoZXMgPSBhcmd1bWVudC5tYXRjaCgvLS1lbnZpcm9ubWVudD0oLispLyksXG4gICAgICAgICAgZm91bmQgPSAobWF0Y2hlcyAhPT0gbnVsbCk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBlbnZpcm9ubWVudE5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gZm91bmQ7XG4gIH0pO1xuXG4gIHJldHVybiBlbnZpcm9ubWVudE5hbWU7XG59XG5cbmZ1bmN0aW9uIGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCkge1xuICBjb25zdCBmaWxlUGF0aCA9IGAuLy4ke2Jhc2VFeHRlbnNpb259cmNgLFxuICAgICAgICBhYnNvbHV0ZVJDRmlsZVBhdGggPSBwYXRoUmVzb2x2ZXIoZmlsZVBhdGgpO1xuXG4gIHJldHVybiBhYnNvbHV0ZVJDRmlsZVBhdGg7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgZmlyc3QsIHNlY29uZCwgbGFzdCB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aE5hbWUocGF0aCkge1xuICBwYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvLyxcIlwiKS5yZXBsYWNlKC9cXC8kLywgXCJcIik7IC8vL1xuXG4gIGNvbnN0IHBhdGhOYW1lID0gKC9cXC8vLnRlc3QocGF0aCkgPT09IGZhbHNlKTtcblxuICByZXR1cm4gcGF0aE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhUb3Btb3N0TmFtZShwYXRoKSB7XG4gIGNvbnN0IHBhdGhOYW1lID0gaXNQYXRoTmFtZShwYXRoKSxcbiAgICAgICAgcGF0aEFic29sdXRlUGF0aCA9IGlzUGF0aEFic29sdXRlUGF0aChwYXRoKSxcbiAgICAgICAgcGF0aFRvcG1vc3ROYW1lID0gKHBhdGhOYW1lICYmIHBhdGhBYnNvbHV0ZVBhdGgpO1xuXG4gIHJldHVybiBwYXRoVG9wbW9zdE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhSZWxhdGl2ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoUmVsYXRpdmVQYXRoID0gIS9eXFwvLy50ZXN0KHBhdGgpO1xuXG4gIHJldHVybiBwYXRoUmVsYXRpdmVQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXRoQWJzb2x1dGVQYXRoKHBhdGgpIHtcbiAgY29uc3QgcGF0aEFic29sdXRlUGF0aCA9IC9eXFwvLy50ZXN0KHBhdGgpO1xuXG4gIHJldHVybiBwYXRoQWJzb2x1dGVQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUb3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoKHRvcG1vc3ROYW1lLCBhYnNvbHV0ZVBhdGgpIHtcbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7dG9wbW9zdE5hbWV9KD86XFxcXC8uKyk/JGApLFxuICAgICAgICB0b3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoID0gcmVnRXhwLnRlc3QoYWJzb2x1dGVQYXRoKTtcblxuICByZXR1cm4gdG9wbW9zdE5hbWVJbkFic29sdXRlUGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tYmluZVBhdGhzKHBhdGgsIHJlbGF0aXZlUGF0aCkge1xuICBsZXQgY29tYmluZWRQYXRoID0gbnVsbDtcblxuICBjb25zdCBwYXRoTmFtZXMgPSBwYXRoLnNwbGl0KC9cXC8vKSxcbiAgICAgICAgcmVsYXRpdmVQYXRoTmFtZXMgPSByZWxhdGl2ZVBhdGguc3BsaXQoL1xcLy8pO1xuXG4gIGxldCBsYXN0UGF0aE5hbWUsXG4gICAgICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG5cbiAgaWYgKGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9PT0gXCIuXCIpIHtcbiAgICByZWxhdGl2ZVBhdGhOYW1lcy5zaGlmdCgpO1xuICB9XG5cbiAgZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID0gZmlyc3QocmVsYXRpdmVQYXRoTmFtZXMpO1xuICBsYXN0UGF0aE5hbWUgPSBsYXN0KHBhdGhOYW1lcyk7XG5cbiAgd2hpbGUgKChmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPT09IFwiLi5cIikgJiYgKGxhc3RQYXRoTmFtZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHJlbGF0aXZlUGF0aE5hbWVzLnNoaWZ0KCk7XG4gICAgcGF0aE5hbWVzLnBvcCgpO1xuXG4gICAgZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID0gZmlyc3QocmVsYXRpdmVQYXRoTmFtZXMpO1xuICAgIGxhc3RQYXRoTmFtZSA9IGxhc3QocGF0aE5hbWVzKTtcbiAgfVxuXG4gIGlmIChsYXN0UGF0aE5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNvbWJpbmVkUGF0aE5hbWVzID0gW10uY29uY2F0KHBhdGhOYW1lcykuY29uY2F0KHJlbGF0aXZlUGF0aE5hbWVzKTtcblxuICAgIGNvbWJpbmVkUGF0aCA9IGNvbWJpbmVkUGF0aE5hbWVzLmpvaW4oXCIvXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNvbWJpbmVkUGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmNhdGVuYXRlUGF0aHMocGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTsgIC8vL1xuXG4gIGNvbnN0IGNvbmNhdGVuYXRlZFBhdGggPSBgJHtwYXRofS8ke3JlbGF0aXZlUGF0aH1gO1xuXG4gIHJldHVybiBjb25jYXRlbmF0ZWRQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBib3R0b21tb3N0TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14uKlxcLyhbXlxcL10rXFwvPykkLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIGJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiBib3R0b21tb3N0TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgocGF0aCkge1xuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKylcXC9bXlxcL10rXFwvPyQvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlQYXRoID0gc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5UGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSspXFwvLiskLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKilcXC9bXlxcL10rXFwvPyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAvLy9cbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eW15cXC9dK1xcLyguKykkLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgfVxuXG4gIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGlzUGF0aE5hbWUsXG4gIGlzUGF0aFRvcG1vc3ROYW1lLFxuICBpc1BhdGhSZWxhdGl2ZVBhdGgsXG4gIGlzUGF0aEFic29sdXRlUGF0aCxcbiAgaXNUb3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoLFxuICBjb21iaW5lUGF0aHMsXG4gIGNvbmNhdGVuYXRlUGF0aHMsXG4gIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgsXG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgsXG4gIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCxcbiAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHJlYWRGaWxlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUZpbGUoZmlsZVBhdGgsIGFyZ3MsIHJlZ2V4KSB7XG4gIGNvbnN0IGNvbnRlbnQgPSByZWFkRmlsZShmaWxlUGF0aCksXG4gICAgICAgIHBhcnNlZENvbnRlbnQgPSBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncywgcmVnZXgpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb250ZW50KGNvbnRlbnQsIGFyZ3MsIHJlZ2V4KSB7XG4gIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdChcIlxcblwiKSxcbiAgICAgICAgcGFyc2VkTGluZXMgPSBwYXJzZUxpbmVzKGxpbmVzLCBhcmdzLCByZWdleCksXG4gICAgICAgIHBhcnNlZENvbnRlbnQgPSBwYXJzZWRMaW5lcy5qb2luKFwiXFxuXCIpO1xuXG4gIHJldHVybiBwYXJzZWRDb250ZW50O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VMaW5lKGxpbmUsIGFyZ3MsIHJlZ2V4ID0gL1xcJHsoLis/KX0vZykge1xuICBjb25zdCBwYXJzZWRMaW5lID0gbGluZS5yZXBsYWNlKHJlZ2V4LCAobWF0Y2gsIHRva2VuKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkVG9rZW4gPSBwYXJzZVRva2VuKHRva2VuLCBhcmdzKTtcblxuICAgIHJldHVybiBwYXJzZWRUb2tlbjtcbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZExpbmU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcGFyc2VGaWxlLFxuICBwYXJzZUNvbnRlbnQsXG4gIHBhcnNlTGluZVxufTtcblxuZnVuY3Rpb24gcGFyc2VMaW5lcyhsaW5lcywgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgcGFyc2VkTGluZXMgPSBsaW5lcy5tYXAoKGxpbmUpID0+IHtcbiAgICBjb25zdCBwYXJzZWRMaW5lID0gcGFyc2VMaW5lKGxpbmUsIGFyZ3MsIHJlZ2V4KTtcblxuICAgIHJldHVybiBwYXJzZWRMaW5lO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZXM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpIHtcbiAgbGV0IHBhcnNlZFRva2VuID0gXCJcIjtcblxuICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eSh0b2tlbikpIHtcbiAgICBwYXJzZWRUb2tlbiA9IGFyZ3NbdG9rZW5dO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZFRva2VuO1xufVxuIiwiLy8gLmRpcm5hbWUsIC5iYXNlbmFtZSwgYW5kIC5leHRuYW1lIG1ldGhvZHMgYXJlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSxcbi8vIGJhY2twb3J0ZWQgYW5kIHRyYW5zcGxpdGVkIHdpdGggQmFiZWwsIHdpdGggYmFja3dhcmRzLWNvbXBhdCBmaXhlc1xuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG4gIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gIGlmIChoYXNSb290ICYmIGVuZCA9PT0gMSkge1xuICAgIC8vIHJldHVybiAnLy8nO1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXQgZml4OlxuICAgIHJldHVybiAnLyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2UoMCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBwYXRoIGNvbXBvbmVudFxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuLy8gVXNlcyBhIG1peGVkIGFwcHJvYWNoIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSwgYXMgZXh0IGJlaGF2aW9yIGNoYW5nZWRcbi8vIGluIG5ldyBOb2RlLmpzIHZlcnNpb25zLCBzbyBvbmx5IGJhc2VuYW1lKCkgYWJvdmUgaXMgYmFja3BvcnRlZCBoZXJlXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24gKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IGJhc2VuYW1lKHBhdGgpO1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gIHZhciBzdGFydFBhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBleHRlbnNpb25cbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSlcbiAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgIHByZURvdFN0YXRlID0gMTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
