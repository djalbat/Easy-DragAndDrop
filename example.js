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

  function DraggableEntry() {
    _classCallCheck(this, DraggableEntry);

    return _super.apply(this, arguments);
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
      var _this = this;

      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          _this.resetTimeout();

          var explorer = _this.getExplorer(),
              topmostDirectoryNameDraggableEntry = _this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              noDraggingSubEntriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES);

          if (topmostDirectoryNameDraggableEntry) {
            return;
          }

          if (subEntry && noDraggingSubEntriesOptionPresent) {
            return;
          }

          var mouseOver = _this.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = explorer.startDragging(_this);

            if (startedDragging) {
              _this.startDragging(mouseTop, mouseLeft);
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
      var _this2 = this;

      _easy.window.off("blur", this.mouseUpHandler, this); ///


      _easy.window.offMouseUp(this.mouseUpHandler, this);

      _easy.window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var explorer = this.getExplorer(),
            draggableEntry = this; ///

        explorer.stopDragging(draggableEntry, function () {
          _this2.stopDragging();
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
      this.setInitialState();
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
    value: function initialise(properties) {
      var _properties$collapsed = properties.collapsed,
          collapsed = _properties$collapsed === void 0 ? false : _properties$collapsed;
      this.setCollapsed(collapsed);

      _get(_getPrototypeOf(DirectoryNameDraggableEntry.prototype), "initialise", this).call(this, properties);
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var type = _types.DIRECTORY_NAME_TYPE,
          ///
      directoryNameDraggableEntry = _draggable["default"].fromClass(Class, properties, type);

      directoryNameDraggableEntry.initialise(properties);
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

      fileNameDraggableEntry.initialise(properties);
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
    key: "isOptionPresent",
    value: function isOptionPresent(option) {
      var optionPresent = !!this.options[option];
      return optionPresent;
    }
  }, {
    key: "setOptions",
    value: function setOptions(options) {
      this.options = options;
    }
  }, {
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
    value: function initialise(properties) {
      this.assignContext();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onMove = properties.onMove,
          onMove = _properties$onMove === void 0 ? defaultMoveHandler : _properties$onMove,
          _properties$onOpen = properties.onOpen,
          onOpen = _properties$onOpen === void 0 ? defaultOpenHandler : _properties$onOpen,
          _properties$options = properties.options,
          options = _properties$options === void 0 ? defaultOptions : _properties$options,
          moveHandler = onMove,
          openHandler = onOpen,
          explorer = _dropTarget["default"].fromClass(Class, properties, moveHandler, openHandler, options);

      explorer.initialise(properties);
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

var defaultOptions = {};

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
    value: function initialise(properties) {
      this.close();
    }
  }], [{
    key: "fromClass",
    value: function fromClass(Class, properties) {
      var _properties$onRemove = properties.onRemove,
          onRemove = _properties$onRemove === void 0 ? defaultRemoveHandler : _properties$onRemove,
          removeHandler = onRemove,
          moveHandler = removeHandler,
          rubbishBin = _dropTarget["default"].fromClass(Class, properties, moveHandler);

      rubbishBin.initialise(properties);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYnV0dG9uL25hbWUuanMiLCJsaWIvY29uc3RhbnRzLmpzIiwibGliL2Ryb3BUYXJnZXQuanMiLCJsaWIvZW50cmllcy5qcyIsImxpYi9lbnRyeS5qcyIsImxpYi9lbnRyeS9kcmFnZ2FibGUuanMiLCJsaWIvZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWUuanMiLCJsaWIvZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lLmpzIiwibGliL2VudHJ5L21hcmtlci5qcyIsImxpYi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyIsImxpYi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiLCJsaWIvZXhhbXBsZS5qcyIsImxpYi9leGFtcGxlL3ZpZXcuanMiLCJsaWIvZXhwbG9yZXIuanMiLCJsaWIvaW5kZXguanMiLCJsaWIvb3B0aW9ucy5qcyIsImxpYi9ydWJiaXNoQmluLmpzIiwibGliL3R5cGVzLmpzIiwibGliL3V0aWxpdGllcy9uYW1lLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9jb25zdGFudHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvaW5wdXRFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL2lucHV0RWxlbWVudC9pbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9pbnB1dEVsZW1lbnQvdGV4dGFyZWEuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWlzY2VsbGFuZW91cy9ib3VuZHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWlzY2VsbGFuZW91cy9vZmZzZXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9ldmVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvanN4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9rZXkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL21vdXNlLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL21peGlucy9yZXNpemUuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvbWl4aW5zL3Njcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2xpYi9taXhpbnMvc3RhdGUuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvcmVhY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdGV4dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdXRpbGl0aWVzL2FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9kb20uanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvdXRpbGl0aWVzL2VsZW1lbnRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9uYW1lLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvbGliL3V0aWxpdGllcy9vYmplY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9saWIvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvY29uc3RhbnRzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXJyYXkuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvYXN5bmNocm9ub3VzLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL2ZpbGVTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL2FqYXguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9sb2cuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvbWlzY2VsbGFuZW91cy9vbkVUWC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3Byb21wdC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvbGliL3V0aWxpdGllcy9taXNjZWxsYW5lb3VzL3JjLmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9saWIvdXRpbGl0aWVzL3BhdGguanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2xpYi91dGlsaXRpZXMvdGVtcGxhdGUuanMiLCJub2RlX21vZHVsZXMvcGF0aC1icm93c2VyaWZ5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRVEsSyxHQUFVLHlCLENBQVYsSzs7SUFFYSxVOzs7Ozs7Ozs7Ozs7OzhCQUNUO0FBQ1IsVUFBTSxhQUFhLEdBQUcsS0FBSyxnQkFBTCxFQUF0QjtBQUFBLFVBQ00saUJBQWlCLEdB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBJbnB1dEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudFRleHQgPSBmaXJzdENoaWxkRWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgICAgbmFtZSA9IGZpcnN0Q2hpbGRFbGVtZW50VGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikge1xuICAgIHRoaXMub24oXCJkYmxjbGlja1wiLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgcGFyZW50Q29udGV4dCgpIHtcblx0ICBjb25zdCBnZXROYW1lID0gdGhpcy5nZXROYW1lLmJpbmQodGhpcyksXG5cdFx0XHRcdCAgb25Eb3VibGVDbGljayA9IHRoaXMub25Eb3VibGVDbGljay5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXROYW1lLFxuICAgICAgb25Eb3VibGVDbGlja1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHRhZ05hbWUgPSBcImJ1dHRvblwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwibmFtZVwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwibmFtZVwiXG4gIF07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjc7XG5leHBvcnQgY29uc3QgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgRWxlbWVudCB9IGZyb20gXCJlYXN5XCI7XG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9IGZyb20gXCIuL29wdGlvbnNcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgeyBmaXJzdCwgbGFzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRyb3BUYXJnZXRzLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBkcm9wVGFyZ2V0cztcblxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gbnVsbDtcblxuICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc29tZSgoZHJvcFRhcmdldCkgPT4ge1xuICAgICAgICBjb25zdCB0b0JlTWFya2VkID0gZHJvcFRhcmdldC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSBkcm9wVGFyZ2V0OyAgLy8vXG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBsZXQgbWFya2VkRHJvcFRhcmdldCA9IG51bGw7XG5cbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpczsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNvbWUoKGRyb3BUYXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgdW5tYXJrR2xvYmFsbHkoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsICgpID0+IHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpOyAvLy9cblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKChkcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKChwYXRoTWFwKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCB7IHNvdXJjZVBhdGggfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VQYXRoID09PSBkcmFnZ2FibGVFbnRyeVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgeyBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBjYWxsYmFjayB9ID0gcGF0aE1hcDtcblxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICAgIFxuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgY2FsbGJhY2soZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gdGhpcy5tb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpOyAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBzb3VyY2VEaXJlY3RvcnlQYXRoID0gc291cmNlUGF0aCwgLy8vXG4gICAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoOyAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgYWRkRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIHRoaXMuZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcblxuICAgIGlmIChyZWNpcHJvY2F0ZWQpIHtcbiAgICAgIGRyb3BUYXJnZXQuYWRkRHJvcFRhcmdldCh0aGlzKTsgLy8vXG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0LCByZWNpcHJvY2F0ZWQgPSBmYWxzZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5kcm9wVGFyZ2V0cy5pbmRleE9mKGRyb3BUYXJnZXQpO1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuICAgICAgXG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cblxuICAgIGlmIChyZWNpcHJvY2F0ZWQpIHtcbiAgICAgIGRyb3BUYXJnZXQucmVtb3ZlRHJvcFRhcmdldCh0aGlzKTsgLy8vXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gW10sXG4gICAgICAgICAgZHJvcFRhcmdldCA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldDtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuaW1wb3J0IHsgcGF0aFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IEZpbGVOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2ZpbGVOYW1lXCI7XG5pbXBvcnQgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi9lbnRyeS9kcmFnZ2FibGUvZmlsZU5hbWVcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgZnJvbSBcIi4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWVcIjtcblxuaW1wb3J0IHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUywgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCwgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyaWVzIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cyhcImxpLmVudHJ5XCIpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBpc01hcmtlckVudHJ5UHJlc2VudCgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZE1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VyRW50cnlQcmVzZW50ID0gKG1hcmtlckVudHJ5ICE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeShuYW1lKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksICAvLy9cbiAgICAgICAgICBwcmV2aW91c0VudHJ5ID0gdGhpcy5maW5kRW50cnkoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmVFbnRyeSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG5cbiAgICAgICAgICAgIGlmIChuZXh0RW50cnlCZWZvcmVFbnRyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlckVudHJ5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5O1xuXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlckVudHJ5TmFtZSwgLy8vXG4gICAgICAgICAgdHlwZSA9IGRyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZmlsZU5hbWVNYXJrZXJFbnRyeSA9XG5cbiAgICAgICAgICA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPlxuXG4gICAgICAgIDtcblxuICAgICAgICBtYXJrZXJFbnRyeSA9IGZpbGVOYW1lTWFya2VyRW50cnk7ICAvLy9cblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID1cblxuICAgICAgICAgIDxEaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgbmFtZT17bmFtZX0gLz5cblxuICAgICAgICA7XG5cbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7IC8vL1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cblxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlcixcbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID1cblxuICAgICAgICAgICAgPEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPlxuXG4gICAgICAgICAgLFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5leHBsb3JlciwgLy8vXG4gICAgICAgICAgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5nZXREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPVxuXG4gICAgICAgICAgICA8RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICAsXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJFbnRyeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZXJFbnRyeU5hbWUgPSBtYXJrZXJFbnRyeVBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJFbnRyeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgICAgbWFya2VyRW50cnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlckVudHJ5UGF0aCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IG1hcmtlckVudHJ5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyKG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeU5hbWUpIHtcbiAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZTsgLy8vXG5cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKSxcbiAgICAgICAgICBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZVBhdGggPSBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTsgLy8vXG5cbiAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgICBjb25zdCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0VtcHR5KCk7XG5cbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlFbXB0eSkge1xuICAgICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSB0b3Btb3N0RGlyZWN0b3J5TmFtZUVudHJ5TmFtZSkge1xuICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRW50cnkuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlOyAvLy9cblxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lOyAvLy9cblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcblxuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5zZXRDb2xsYXBzZWQoY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICAgIGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5UGF0aCA9IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7IC8vL1xuXG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgIGNvbnN0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcblxuICAgICAgICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5KSB7XG4gICAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZmluZE1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7ICAvLy9cbiAgICAgICAgICB9LCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxuXG4gIGZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5KChlbnRyeSkgPT4ge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBmaW5kTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZpbmRUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlUb3Btb3N0ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzVG9wbW9zdCgpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKTtcblxuICAgIGlmIChtYXJrZXJFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgbWFya2VyRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZXJFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUZpbGVQYXRocyhmaWxlUGF0aHMgPSBbXSkge1xuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoZmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzKGRpcmVjdG9yeVBhdGhzID0gW10pIHtcbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlQYXRocyhkaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmZpbmREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBgJHtkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlOYW1lfS8ke2RyYWdnYWJsZUVudHJ5UGF0aH1gO1xuXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyA9IFtdKSB7XG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoc3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmRNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSA9PiB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBsZXQgZHJhZ0ludG9TdWJEaXJlY3RvcmllcyA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCkge1xuICAgICAgICAgIGNvbnN0IG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgICAgICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50KSB7XG4gICAgICAgICAgICBkcmFnSW50b1N1YkRpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRyYWdJbnRvU3ViRGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSk7IH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBGSUxFX05BTUVfVFlQRSk7IH1cblxuICBzb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgRklMRV9OQU1FX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUpOyB9XG5cbiAgZmluZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMuZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMoZmlsZU5hbWUsIEZJTEVfTkFNRV9UWVBFKTsgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKTsgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZSgoZW50cnkpID0+IHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnlCeVR5cGVzKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICAgICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG5cbiAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkgfHwgbnVsbDsgLy8vO1xuICAgIFxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeUJ5TmFtZShuYW1lKSB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmZpbmRFbnRyeSgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuXHQgIGNvbnN0IGdldEV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3Jlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIGlzRW1wdHkgPSB0aGlzLmlzRW1wdHkuYmluZCh0aGlzKSxcbiAgICAgICAgICBhZGRNYXJrZXIgPSB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZU1hcmtlciA9IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRmlsZVBhdGggPSB0aGlzLmFkZEZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgcmVtb3ZlRmlsZVBhdGggPSB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICAgICAgYWRkRGlyZWN0b3J5UGF0aCA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGggPSB0aGlzLnJlbW92ZURpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgICAgICBpc01hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBpc0RyYWdnYWJsZUVudHJ5UHJlc2VudCA9IHRoaXMuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQuYmluZCh0aGlzKSxcbiAgICAgICAgICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYmluZCh0aGlzKSxcbiAgICAgICAgICByZXRyaWV2ZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVGaWxlUGF0aHMgPSB0aGlzLnJldHJpZXZlRmlsZVBhdGhzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVEaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoID0gdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgICAgIHJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcyA9IHRoaXMucmV0cmlldmVEcmFnZ2FibGVTdWJFbnRyaWVzLmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICAgICAgcmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVCb3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuICh7XG4gICAgICBnZXRFeHBsb3JlcixcbiAgICAgIGlzRW1wdHksXG4gICAgICBhZGRNYXJrZXIsXG4gICAgICByZW1vdmVNYXJrZXIsXG4gICAgICBhZGRGaWxlUGF0aCxcbiAgICAgIHJlbW92ZUZpbGVQYXRoLFxuICAgICAgYWRkRGlyZWN0b3J5UGF0aCxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGgsXG4gICAgICBpc01hcmtlckVudHJ5UHJlc2VudCxcbiAgICAgIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50LFxuICAgICAgZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksXG4gICAgICByZXRyaWV2ZU1hcmtlckVudHJ5LFxuICAgICAgcmV0cmlldmVGaWxlUGF0aHMsXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeVBhdGhzLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgsXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMsXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgIHJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJ1bFwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZW50cmllc1wiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cmllcyA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBleHBsb3Jlcik7XG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEVsZW1lbnQgfSBmcm9tIFwiZWFzeVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwibGlcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImVudHJ5XCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJuYW1lXCJcbiAgXTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyB3aW5kb3csIGNvbnN0YW50cyB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCBFbnRyeSBmcm9tIFwiLi4vZW50cnlcIjtcbmltcG9ydCBvcHRpb25zIGZyb20gXCIuLi9vcHRpb25zXCI7XG5cbmltcG9ydCB7IEVTQ0FQRV9LRVlDT0RFLCBTVEFSVF9EUkFHR0lOR19ERUxBWSB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBMRUZUX01PVVNFX0JVVFRPTiB9ID0gY29uc3RhbnRzLFxuICAgICAgeyBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyB9ID0gb3B0aW9ucztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcGF0aCA9IGV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoXCJkcmFnZ2luZ1wiKTtcblxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMsIC8vL1xuICAgICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5VG9wbW9zdCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc1RvcG1vc3QoKTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVRvcG1vc3QpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSBib3VuZHNUb3AgLSBtb3VzZVRvcCxcbiAgICAgICAgICBsZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIHRoaXMuc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCk7XG5cbiAgICB0aGlzLnNldExlZnRPZmZzZXQobGVmdE9mZnNldCk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGtleURvd25IYW5kbGVyID0gdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgICAgXG4gICAgICB0aGlzLm9uS2V5RG93bihrZXlEb3duSGFuZGxlcik7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcyhcImRyYWdnaW5nXCIpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50KSB7XG4gICAgICB0aGlzLm9mZktleURvd24oKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKFwiZHJhZ2dpbmdcIik7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgbGV0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKTtcblxuICAgICAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSBleHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgICAgXG4gICAgICB0aGlzLnNldFRpbWVvdXQodGltZW91dCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgY29uc3QgdGltZW91dCA9IHRoaXMuZ2V0VGltZW91dCgpO1xuICAgIFxuICAgIGlmICh0aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG5cbiAgICAgIHRoaXMucmVzZXRUaW1lb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihldmVudCwgZWxlbWVudCkge1xuICAgIGNvbnN0IHsgYnV0dG9uLCBwYWdlWCwgcGFnZVkgfSA9IGV2ZW50LFxuICAgICAgICAgIG1vdXNlVG9wID0gcGFnZVksXG4gICAgICAgICAgbW91c2VMZWZ0ID0gcGFnZVg7XG5cbiAgICB3aW5kb3cub24oXCJibHVyXCIsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cblxuICAgIHdpbmRvdy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGlmIChidXR0b24gPT09IExFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKGV2ZW50LCBlbGVtZW50KSB7XG4gICAgd2luZG93Lm9mZihcImJsdXJcIiwgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cblxuICAgIHdpbmRvdy5vZmZNb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXM7ICAvLy9cbiAgICAgIFxuICAgICAgZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IHBhZ2VYLCBwYWdlWSB9ID0gZXZlbnQsXG4gICAgICAgICAgbW91c2VUb3AgPSBwYWdlWSxcbiAgICAgICAgICBtb3VzZUxlZnQgPSBwYWdlWDtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQsIGVsZW1lbnQpIHtcbiAgICBjb25zdCB7IGtleUNvZGUgfSA9IGV2ZW50LFxuICAgICAgICAgIGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IHRoaXMuZ2V0VG9wT2Zmc2V0KCksXG4gICAgICAgICAgbGVmdE9mZnNldCA9IHRoaXMuZ2V0TGVmdE9mZnNldCgpO1xuXG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgbGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wLFxuICAgICAgbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICBleHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHtcbiAgICBjb25zdCBzdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoKSxcbiAgICAgICAgICB7IHRpbWVvdXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRpbWVvdXQ7XG4gIH1cblxuICBnZXRUb3BPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyB0b3BPZmZzZXQgfSA9IHN0YXRlO1xuXG4gICAgcmV0dXJuIHRvcE9mZnNldDtcbiAgfVxuXG4gIGdldExlZnRPZmZzZXQoKSB7XG4gICAgY29uc3Qgc3RhdGUgPSB0aGlzLmdldFN0YXRlKCksXG4gICAgICAgICAgeyBsZWZ0T2Zmc2V0IH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc2V0VGltZW91dCh0aW1lb3V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0aW1lb3V0XG4gICAgfSk7XG4gIH1cblxuICBzZXRUb3BPZmZzZXQodG9wT2Zmc2V0KSB7XG4gICAgdGhpcy51cGRhdGVTdGF0ZSh7XG4gICAgICB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0LFxuICAgICAgbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG5cbiAgICBjb25zdCBtb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gdGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLm9uTW91c2VEb3duKG1vdXNlRG93bkhhbmRsZXIpO1xuICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJsaVwiO1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZHJhZ2dhYmxlXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJleHBsb3JlclwiXG4gIF07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcImVhc3lcIjtcbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuLi8uLi9lbnRyaWVzXCI7XG5pbXBvcnQgTmFtZUJ1dHRvbiBmcm9tIFwiLi4vLi4vYnV0dG9uL25hbWVcIjtcbmltcG9ydCBEcmFnZ2FibGVFbnRyeSBmcm9tIFwiLi4vLi4vZW50cnkvZHJhZ2dhYmxlXCI7XG5cbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gZnJvbSBcIi4uLy4uL3R5cGVzXCI7XG5cbmNvbnN0IHsgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKFwiY29sbGFwc2VkXCIpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5UHJlc2VudCA9IHRoaXMuaXNNYXJrZXJFbnRyeVByZXNlbnQoKSxcbiAgICAgICAgICBtYXJrZWQgPSBtYXJrZXJFbnRyeVByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNUb3Btb3N0KCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKSxcbiAgICAgICAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpLFxuICAgICAgICAgIHRvcG1vc3QgPSAocGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9wbW9zdDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoXCJjb2xsYXBzZWRcIik7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcyhcImNvbGxhcHNlZFwiKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKFwiY29sbGFwc2VkXCIpO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIgPSB0aGlzLnRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgcmV0dXJuIChbXG5cbiAgICAgIDxCdXR0b24gY2xhc3NOYW1lPVwidG9nZ2xlXCIgb25DbGljaz17dG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyfSAvPixcbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj4sXG4gICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICBdKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBjb2xsYXBzZWQgPSBmYWxzZSB9ID0gcHJvcGVydGllcztcblxuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG5cbiAgICBzdXBlci5pbml0aWFsaXNlKHByb3BlcnRpZXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEUsIC8vL1xuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShwcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJjb2xsYXBzZWRcIlxuICBdO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBOYW1lQnV0dG9uIGZyb20gXCIuLi8uLi9idXR0b24vbmFtZVwiO1xuaW1wb3J0IERyYWdnYWJsZUVudHJ5IGZyb20gXCIuLi8uLi9lbnRyeS9kcmFnZ2FibGVcIjtcblxuaW1wb3J0IHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9IGZyb20gXCIuLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGaWxlTmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gIH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcblxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEZJTEVfTkFNRV9UWVBFOlxuICAgICAgY2FzZSBGSUxFX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICBjYXNlIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBpc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXRyaWV2ZURyYWdnYWJsZVN1YkVudHJpZXMoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlU3ViRW50cmllcyA9IFtdOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZVN1YkVudHJpZXM7XG4gIH1cbiAgXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBmaWxlID0gdGhpczsgLy8vXG4gICAgXG4gICAgZXhwbG9yZXIub3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZSk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4gKFtcblxuICAgICAgPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPlxuXG4gICAgXSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBleHBsb3JlciB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICB0eXBlID0gRklMRV9OQU1FX1RZUEUsICAvLy9cbiAgICAgICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlLCBleHBsb3Jlcik7XG5cbiAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmluaXRpYWxpc2UocHJvcGVydGllcyk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZmlsZS1uYW1lXCJcbiAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRW50cnkgZnJvbSBcIi4uL2VudHJ5XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmtlckVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgbmFtZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlKTtcblxuICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gIH1cblxuICBnZXROYW1lKCkge1xuICAgIHJldHVybiB0aGlzLm5hbWU7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcIm1hcmtlclwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSkge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtYXJrZXJFbnRyeSA9IEVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSwgbmFtZSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgTWFya2VyRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L21hcmtlclwiO1xuXG5pbXBvcnQgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGRyYWdnYWJsZUVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFLCAgLy8vXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gTWFya2VyRW50cnkuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCB0eXBlKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcImRpcmVjdG9yeS1uYW1lXCJcbiAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgTWFya2VyRW50cnkgZnJvbSBcIi4uLy4uL2VudHJ5L21hcmtlclwiO1xuXG5pbXBvcnQgeyBuYW1lSXNCZWZvcmVFbnRyeU5hbWUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL25hbWVcIjtcbmltcG9ydCB7IEZJTEVfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX1RZUEUgfSBmcm9tIFwiLi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsZU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBkcmFnZ2FibGVFbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfTUFSS0VSX1RZUEUsXG4gICAgICAgICAgZmlsZU5hbWVNYXJrZXJFbnRyeSA9IE1hcmtlckVudHJ5LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgdHlwZSk7XG5cbiAgICByZXR1cm4gZmlsZU5hbWVNYXJrZXJFbnRyeTtcbiAgfVxuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcGVydGllcyA9IHtcbiAgICBjbGFzc05hbWU6IFwiZmlsZS1uYW1lXCJcbiAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBSZWFjdCwgQm9keSB9IGZyb20gXCJlYXN5XCI7XG5cbmltcG9ydCBWaWV3IGZyb20gXCIuL2V4YW1wbGUvdmlld1wiXG5cbk9iamVjdC5hc3NpZ24od2luZG93LCB7XG4gIFJlYWN0XG59KTtcblxuY29uc3QgYm9keSA9IG5ldyBCb2R5KCk7XG5cbmJvZHkucHJlcGVuZChcblxuICA8VmlldyAvPlxuXG4pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEV4cGxvcmVyLCBSdWJiaXNoQmluIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5cbmNvbnN0IFZpZXcgPSAocHJvcGVydGllcykgPT4ge1xuICBjb25zdCBleHBsb3JlciA9XG5cbiAgICAgICAgICA8RXhwbG9yZXIgdG9wbW9zdERpcmVjdG9yeU5hbWU9XCJleHBsb3JlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uT3Blbj17b3BlbkhhbmRsZXJ9XG4gICAgICAgICAgICAgICAgICAgIG9uTW92ZT17bW92ZUhhbmRsZXJ9XG4gICAgICAgICAgLz5cblxuICAgICAgICAsXG4gICAgICAgIHJ1YmJpc2hCaW4gPVxuXG4gICAgICAgICAgPFJ1YmJpc2hCaW4gb25SZW1vdmU9e3JlbW92ZUhhbmRsZXJ9IC8+XG5cbiAgICAgICAgO1xuXG5cbiAgZXhwbG9yZXIuYWRkRGlyZWN0b3J5UGF0aChcImV4cGxvcmVyL2RpcmVjdG9yeTFcIik7XG4gIGV4cGxvcmVyLmFkZERpcmVjdG9yeVBhdGgoXCJleHBsb3Jlci9kaXJlY3RvcnkyXCIpO1xuICBleHBsb3Jlci5hZGRGaWxlUGF0aChcImV4cGxvcmVyL2RpcmVjdG9yeTEvZmlsZTEudHh0XCIpO1xuICBleHBsb3Jlci5hZGRGaWxlUGF0aChcImV4cGxvcmVyL2RpcmVjdG9yeTEvZmlsZTIudHh0XCIpO1xuICBleHBsb3Jlci5hZGRGaWxlUGF0aChcImV4cGxvcmVyL2RpcmVjdG9yeTIvZmlsZTMudHh0XCIpO1xuXG4gIGV4cGxvcmVyLmFkZERyb3BUYXJnZXQocnViYmlzaEJpbik7XG5cbiAgcnViYmlzaEJpbi5hZGREcm9wVGFyZ2V0KGV4cGxvcmVyKTtcblxuICByZXR1cm4gKFxuXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ2aWV3XCI+XG4gICAgICB7ZXhwbG9yZXJ9XG4gICAgICB7cnViYmlzaEJpbn1cbiAgICA8L2Rpdj5cblxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVmlldztcblxuZnVuY3Rpb24gb3BlbkhhbmRsZXIoZmlsZVBhdGgpIHtcbiAgYWxlcnQoZmlsZVBhdGgpXG59XG5cbmZ1bmN0aW9uIG1vdmVIYW5kbGVyKHBhdGhNYXBzLCBkb25lKSB7XG4gIGRvbmUoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSGFuZGxlcihwYXRoTWFwcywgZG9uZSkge1xuICBkb25lKCk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcGF0aFV0aWxpdGllcywgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCBFbnRyaWVzIGZyb20gXCIuL2VudHJpZXNcIjtcbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcbmltcG9ydCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZnJvbSBcIi4vZW50cnkvZHJhZ2dhYmxlL2RpcmVjdG9yeU5hbWVcIjtcblxuaW1wb3J0IHsgTk9fRFJBR0dJTkdfV0lUSElOIH0gZnJvbSBcIi4vb3B0aW9uc1wiO1xuaW1wb3J0IHsgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNvbnN0IHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBsb3JlciBleHRlbmRzIERyb3BUYXJnZXQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZHJvcFRhcmdldHMsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciwgb3B0aW9ucykge1xuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wVGFyZ2V0cywgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIGlzT3B0aW9uUHJlc2VudChvcHRpb24pIHtcbiAgICBjb25zdCBvcHRpb25QcmVzZW50ID0gISF0aGlzLm9wdGlvbnNbb3B0aW9uXTtcblxuICAgIHJldHVybiBvcHRpb25QcmVzZW50O1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXREaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRocyA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocygpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0VG9wbW9zdERpcmVjdG9yeU5hbWUoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU5hbWU7ICAvLy9cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cbiAgfVxuXG4gIG1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgbWFya2VyRW50cnlQYXRoLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICBpZiAocHJldmlvdXNEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgcHJldmlvdXNEcmFnZ2FibGVFbnRyeU5hbWUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnlUeXBlID0gcHJldmlvdXNEcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGAke2RyYWdnYWJsZUVudHJ5UGF0aH0vJHtwcmV2aW91c0RyYWdnYWJsZUVudHJ5TmFtZX1gO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBwcmV2aW91c0RyYWdnYWJsZUVudHJ5VHlwZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIG1hcmtlckVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgfVxuXG4gICAgdGhpcy5hZGRNYXJrZXIobWFya2VyRW50cnlQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgICAgdGhpcy5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgIT09IHRoaXMpIHtcbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gdGhpcykge1xuICAgICAgY29uc3QgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKTtcblxuICAgICAgaWYgKGRyYWdnaW5nV2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlQm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgICAgICAgdGhpcy51bm1hcmsoKTtcblxuICAgICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnVubWFyaygpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlU3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5U3ViRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsICgpID0+IHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC51bm1hcmsoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnVubWFya0dsb2JhbGx5KCk7XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZHJhZ2dpbmdXaXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudCA9IHRoaXMuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1dJVEhJTik7XG5cbiAgICBpZiAoZHJhZ2dpbmdXaXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbk9wdGlvblByZXNlbnQpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIGJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gICAgICB0aGlzLm1hcmsoZHJhZ2dhYmxlRW50cnksIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5hZGRGaWxlUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIGRyYWdnYWJsZUVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHRhcmdldERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzQ29sbGFwc2VkKCk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIG9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHRvcG1vc3REaXJlY3RvcnlOYW1lLCB0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQsICAvLy9cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGVudHJpZXMgPVxuXG4gICAgICAgICAgICA8RW50cmllcyBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+XG5cbiAgICAgICAgICA7XG5cbiAgICBlbnRyaWVzLmFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuXG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGVudHJpZXM7ICAvLy9cblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgaW5pdGlhbGlzZShwcm9wZXJ0aWVzKSB7XG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiZGl2XCI7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wZXJ0aWVzID0ge1xuICAgIGNsYXNzTmFtZTogXCJleHBsb3JlclwiXG4gIH07XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25PcGVuXCIsXG4gICAgXCJvbk1vdmVcIixcbiAgICBcIm9wdGlvbnNcIixcbiAgICBcInRvcG1vc3REaXJlY3RvcnlOYW1lXCIsXG4gICAgXCJ0b3Btb3N0RGlyZWN0b3J5Q29sbGFwc2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUgPSBkZWZhdWx0TW92ZUhhbmRsZXIsIG9uT3BlbiA9IGRlZmF1bHRPcGVuSGFuZGxlciwgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zfSA9IHByb3BlcnRpZXMsIC8vL1xuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBEcm9wVGFyZ2V0LmZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UocHJvcGVydGllcyk7XG4gICAgXG4gICAgcmV0dXJuIGV4cGxvcmVyO1xuICB9XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge307XG5cbmZ1bmN0aW9uIGRlZmF1bHRPcGVuSGFuZGxlcihzb3VyY2VQYXRoKSB7XG4gIC8vL1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0TW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCBcIlxcXFwoXCIpLnJlcGxhY2UoL1xcKS9nLCBcIlxcXFwpXCIpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7c291cmNlUGF0aH0oLiokKWApLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIG9wdGlvbnMgfSBmcm9tIFwiLi9vcHRpb25zXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEV4cGxvcmVyIH0gZnJvbSBcIi4vZXhwbG9yZXJcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUnViYmlzaEJpbiB9IGZyb20gXCIuL3J1YmJpc2hCaW5cIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY29uc3QgTk9fRFJBR0dJTkdfV0lUSElOID0gXCJOT19EUkFHR0lOR19XSVRISU5cIjtcbmV4cG9ydCBjb25zdCBOT19EUkFHR0lOR19TVUJfRU5UUklFUyA9IFwiTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVNcIjtcbmV4cG9ydCBjb25zdCBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyA9IFwiTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVNcIjtcbmV4cG9ydCBjb25zdCBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTID0gXCJSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTXCI7XG5leHBvcnQgY29uc3QgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyA9IFwiRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lOR1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIE5PX0RSQUdHSU5HX1dJVEhJTixcbiAgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMsXG4gIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTLFxuICBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTLFxuICBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBEcm9wVGFyZ2V0IGZyb20gXCIuL2Ryb3BUYXJnZXRcIjtcblxuaW1wb3J0IHsgRElSRUNUT1JZX05BTUVfVFlQRSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKFwib3BlblwiKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKFwib3BlblwiKTtcblxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgbWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgdW5tYXJrKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgdG9CZU1hcmtlZCA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7IC8vL1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICBpZiAobWFya2VkRHJvcFRhcmdldCAhPT0gdGhpcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IHRoaXMpIHtcbiAgICAgIC8vL1xuICAgIH0gZWxzZSBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLm1hcmtEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIHRoaXMudW5tYXJrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZXhwbG9yZXIsICAvLy9cbiAgICAgICAgICAgIHByZXZpb3VzRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5tYXJrKGRyYWdnYWJsZUVudHJ5LCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgdGhpcy51bm1hcmsoKTtcbiAgICB9XG4gIH1cblxuICBtYXJrRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBwcmV2aW91c0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMubWFyayhkcmFnZ2FibGVFbnRyeSwgcHJldmlvdXNEcmFnZ2FibGVFbnRyeSk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcCgoZHJhZ2dhYmxlRW50cnkpID0+IHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZUJvdHRvbW1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm90dG9tbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsOyAvLy9cblxuICAgIHJldHVybiBib3R0b21tb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UocHJvcGVydGllcykge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJkaXZcIjtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgY2xhc3NOYW1lOiBcInJ1YmJpc2gtYmluXCJcbiAgfTtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvblJlbW92ZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgPSBkZWZhdWx0UmVtb3ZlSGFuZGxlcn0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSwgLy8vXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyLCAgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IERyb3BUYXJnZXQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlcik7XG5cbiAgICBydWJiaXNoQmluLmluaXRpYWxpc2UocHJvcGVydGllcyk7XG4gICAgXG4gICAgcmV0dXJuIHJ1YmJpc2hCaW47XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFJlbW92ZUhhbmRsZXIocGF0aE1hcHMsIGRvbmUpIHtcbiAgZG9uZSgpO1xufVxuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IERJUkVDVE9SWV9OQU1FX1RZUEUpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBjb25zdCBGSUxFX05BTUVfVFlQRSA9IFwiRklMRV9OQU1FX1RZUEVcIjtcbmV4cG9ydCBjb25zdCBESVJFQ1RPUllfTkFNRV9UWVBFID0gXCJESVJFQ1RPUllfTkFNRV9UWVBFXCI7XG5leHBvcnQgY29uc3QgRklMRV9OQU1FX01BUktFUl9UWVBFID0gXCJGSUxFX05BTUVfTUFSS0VSX1RZUEVcIjtcbmV4cG9ydCBjb25zdCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSA9IFwiRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEVcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuY29uc3QgeyBzZWNvbmQgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSkge1xuICBsZXQgZXh0ZW5zaW9uID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXi4qXFwuKFteLl0rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgZXh0ZW5zaW9uID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiBleHRlbnNpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpIHtcbiAgbGV0IG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXiguKylcXC5bXi5dKyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIG5hbWVXaXRob3V0RXh0ZW5zaW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSkge1xuICBsZXQgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgY29uc3QgbmFtZUV4dGVuc2lvbiA9IGV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVFeHRlbnNpb24gPSBleHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbiA9IG5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUobmFtZSksXG4gICAgICAgIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKGVudHJ5TmFtZSksXG4gICAgICAgIG5hbWVFeHRlbnNpb25QcmVzZW50ID0gKG5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50ID0gKGVudHJ5TmFtZUV4dGVuc2lvbiAhPT0gbnVsbCksXG4gICAgICAgIG5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChuYW1lV2l0aG91dEV4dGVuc2lvbiA9PT0gbnVsbCksXG4gICAgICAgIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nID0gKGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBleHRlbnNpb25zQm90aFByZXNlbnQgPSAobmFtZUV4dGVuc2lvblByZXNlbnQgJiYgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCksXG4gICAgICAgIG5hbWVzV2l0aG91dEV4dGVuc2lvbnNCb3RoTWlzc2luZyA9IChuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgJiYgZW50cnlOYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcpO1xuXG4gIGlmIChuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcpIHtcbiAgICAvLy9cbiAgfSBlbHNlIGlmIChuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcpIHtcbiAgICBiZWZvcmUgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGV4dGVuc2lvbnNCb3RoUHJlc2VudCkge1xuICAgICAgY29uc3QgZXh0ZW5zaW9uc0RpZmZlciA9IChuYW1lRXh0ZW5zaW9uICE9PSBlbnRyeU5hbWVFeHRlbnNpb24pO1xuXG4gICAgICBpZiAoZXh0ZW5zaW9uc0RpZmZlcikge1xuICAgICAgICBiZWZvcmUgPSAobmFtZUV4dGVuc2lvbi5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZUV4dGVuc2lvbikgPCAwKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpIHtcbiAgICAgIGJlZm9yZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJlZm9yZTtcbn1cbiIsIiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgY29uc3QgU1ZHX05BTUVTUEFDRV9VUkkgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5leHBvcnQgY29uc3QgTEVGVF9NT1VTRV9CVVRUT04gPSAwO1xuZXhwb3J0IGNvbnN0IFJJR0hUX01PVVNFX0JVVFRPTiA9IDI7XG5leHBvcnQgY29uc3QgTUlERExFX01PVVNFX0JVVFRPTiA9IDE7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgTEVGVF9NT1VTRV9CVVRUT04sXG4gIFJJR0hUX01PVVNFX0JVVFRPTixcbiAgTUlERExFX01PVVNFX0JVVFRPTlxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBvbkNsaWNrLCBvZmZDbGljayB9IGZyb20gXCIuL21peGlucy9jbGlja1wiO1xuaW1wb3J0IHsgb25LZXlVcCwgb2ZmS2V5VXAsIG9uS2V5RG93biwgb2ZmS2V5RG93biB9IGZyb20gXCIuL21peGlucy9rZXlcIjtcbmltcG9ydCB7IG9uLCBvZmYsIGFkZEV2ZW50TGlzdGVuZXIsIGZpbmRFdmVudExpc3RlbmVyLCBmaW5kRXZlbnRMaXN0ZW5lcnMsIHJlbW92ZUV2ZW50TGlzdGVuZXIgfSBmcm9tIFwiLi9taXhpbnMvZXZlbnRcIjtcbmltcG9ydCB7IG9uTW91c2VVcCwgb25Nb3VzZURvd24sIG9uTW91c2VPdmVyLCBvbk1vdXNlT3V0LCBvbk1vdXNlTW92ZSwgb2ZmTW91c2VVcCwgb2ZmTW91c2VEb3duLCBvZmZNb3VzZU92ZXIsIG9mZk1vdXNlT3V0LCBvZmZNb3VzZU1vdmUgfSBmcm9tIFwiLi9taXhpbnMvbW91c2VcIjtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBvbiA9IG9uO1xuICBvZmYgPSBvZmY7XG5cbiAgb25DbGljayA9IG9uQ2xpY2s7XG4gIG9mZkNsaWNrID0gb2ZmQ2xpY2s7XG5cbiAgb25SZXNpemUgPSBvblJlc2l6ZTtcbiAgb2ZmUmVzaXplID0gb2ZmUmVzaXplO1xuXG4gIG9uS2V5VXAgPSBvbktleVVwO1xuICBvZmZLZXlVcCA9IG9mZktleVVwO1xuICBvbktleURvd24gPSBvbktleURvd247XG4gIG9mZktleURvd24gPSBvZmZLZXlEb3duO1xuXG4gIG9uTW91c2VVcCA9IG9uTW91c2VVcDtcbiAgb25Nb3VzZURvd24gPSBvbk1vdXNlRG93bjtcbiAgb25Nb3VzZU92ZXIgPSBvbk1vdXNlT3ZlcjtcbiAgb25Nb3VzZU91dCA9IG9uTW91c2VPdXQ7XG4gIG9uTW91c2VNb3ZlID0gb25Nb3VzZU1vdmU7XG4gIG9mZk1vdXNlVXAgPSBvZmZNb3VzZVVwO1xuICBvZmZNb3VzZURvd24gPSBvZmZNb3VzZURvd247XG4gIG9mZk1vdXNlT3ZlciA9IG9mZk1vdXNlT3ZlcjtcbiAgb2ZmTW91c2VPdXQgPSBvZmZNb3VzZU91dDtcbiAgb2ZmTW91c2VNb3ZlID0gb2ZmTW91c2VNb3ZlO1xuXG4gIGFkZEV2ZW50TGlzdGVuZXIgPSBhZGRFdmVudExpc3RlbmVyO1xuICBmaW5kRXZlbnRMaXN0ZW5lciA9IGZpbmRFdmVudExpc3RlbmVyO1xuICBmaW5kRXZlbnRMaXN0ZW5lcnMgPSBmaW5kRXZlbnRMaXN0ZW5lcnM7XG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50OyAvLy9cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSA/IHVuZGVmaW5lZCA6IG5ldyBEb2N1bWVudCgpOyAgLy8vXG5cbmZ1bmN0aW9uIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpIHt9IC8vL1xuXG5mdW5jdGlvbiBvZmZSZXNpemUocmVzaXplSGFuZGxlciwgZWxlbWVudCkge30gIC8vL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBPZmZzZXQgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9vZmZzZXRcIjtcbmltcG9ydCBCb3VuZHMgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9ib3VuZHNcIjtcblxuaW1wb3J0IHsgY29tYmluZSB9IGZyb20gXCIuL3V0aWxpdGllcy9vYmplY3RcIjtcbmltcG9ydCB7IGlzU1ZHVGFnTmFtZSB9IGZyb20gXCIuL3V0aWxpdGllcy9uYW1lXCI7XG5pbXBvcnQgeyBmaXJzdCwgYXVnbWVudCB9IGZyb20gXCIuL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgU1ZHX05BTUVTUEFDRV9VUkkgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IsIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzLCBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IsIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlIH0gZnJvbSBcIi4vdXRpbGl0aWVzL2RvbVwiO1xuXG5pbXBvcnQgeyBvbkNsaWNrLCBvZmZDbGljayB9IGZyb20gXCIuL21peGlucy9jbGlja1wiO1xuaW1wb3J0IHsgZ2V0U3RhdGUsIHNldFN0YXRlLCB1cGRhdGVTdGF0ZSB9IGZyb20gXCIuL21peGlucy9zdGF0ZVwiO1xuaW1wb3J0IHsgb25LZXlVcCwgb2ZmS2V5VXAsIG9uS2V5RG93biwgb2ZmS2V5RG93biB9IGZyb20gXCIuL21peGlucy9rZXlcIjtcbmltcG9ydCB7IG9uUmVzaXplLCBvZmZSZXNpemUsIGFkZFJlc2l6ZU9iamVjdCwgcmVtb3ZlUmVzaXplT2JqZWN0IH0gZnJvbSBcIi4vbWl4aW5zL3Jlc2l6ZVwiO1xuaW1wb3J0IHsgZ2V0Q29udGV4dCwgZ2V0UHJvcGVydGllcywgYXNzaWduQ29udGV4dCwgYXBwbHlQcm9wZXJ0aWVzIH0gZnJvbSBcIi4vbWl4aW5zL2pzeFwiO1xuaW1wb3J0IHsgb25TY3JvbGwsIG9mZlNjcm9sbCwgZ2V0U2Nyb2xsVG9wLCBnZXRTY3JvbGxMZWZ0LCBzZXRTY3JvbGxUb3AsIHNldFNjcm9sbExlZnQgfSBmcm9tIFwiLi9taXhpbnMvc2Nyb2xsXCI7XG5pbXBvcnQgeyBvbiwgb2ZmLCBhZGRFdmVudExpc3RlbmVyLCBmaW5kRXZlbnRMaXN0ZW5lciwgZmluZEV2ZW50TGlzdGVuZXJzLCByZW1vdmVFdmVudExpc3RlbmVyIH0gZnJvbSBcIi4vbWl4aW5zL2V2ZW50XCI7XG5pbXBvcnQgeyBvbk1vdXNlVXAsIG9uTW91c2VEb3duLCBvbk1vdXNlT3Zlciwgb25Nb3VzZU91dCwgb25Nb3VzZU1vdmUsIG9mZk1vdXNlVXAsIG9mZk1vdXNlRG93biwgb2ZmTW91c2VPdmVyLCBvZmZNb3VzZU91dCwgb2ZmTW91c2VNb3ZlIH0gZnJvbSBcIi4vbWl4aW5zL21vdXNlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsZW1lbnQge1xuICBvbiA9IG9uO1xuICBvZmYgPSBvZmY7XG5cbiAgb25DbGljayA9IG9uQ2xpY2s7XG4gIG9mZkNsaWNrID0gb2ZmQ2xpY2s7XG5cbiAgb25SZXNpemUgPSBvblJlc2l6ZTtcbiAgb2ZmUmVzaXplID0gb2ZmUmVzaXplO1xuICBhZGRSZXNpemVPYmplY3QgPSBhZGRSZXNpemVPYmplY3Q7XG4gIHJlbW92ZVJlc2l6ZU9iamVjdCA9IHJlbW92ZVJlc2l6ZU9iamVjdDtcblxuICBnZXRTdGF0ZSA9IGdldFN0YXRlO1xuICBzZXRTdGF0ZSA9IHNldFN0YXRlO1xuICB1cGRhdGVTdGF0ZSA9IHVwZGF0ZVN0YXRlO1xuXG4gIG9uS2V5VXAgPSBvbktleVVwO1xuICBvZmZLZXlVcCA9IG9mZktleVVwO1xuICBvbktleURvd24gPSBvbktleURvd247XG4gIG9mZktleURvd24gPSBvZmZLZXlEb3duO1xuXG4gIG9uTW91c2VVcCA9IG9uTW91c2VVcDtcbiAgb25Nb3VzZURvd24gPSBvbk1vdXNlRG93bjtcbiAgb25Nb3VzZU92ZXIgPSBvbk1vdXNlT3ZlcjtcbiAgb25Nb3VzZU91dCA9IG9uTW91c2VPdXQ7XG4gIG9uTW91c2VNb3ZlID0gb25Nb3VzZU1vdmU7XG4gIG9mZk1vdXNlVXAgPSBvZmZNb3VzZVVwO1xuICBvZmZNb3VzZURvd24gPSBvZmZNb3VzZURvd247XG4gIG9mZk1vdXNlT3ZlciA9IG9mZk1vdXNlT3ZlcjtcbiAgb2ZmTW91c2VPdXQgPSBvZmZNb3VzZU91dDtcbiAgb2ZmTW91c2VNb3ZlID0gb2ZmTW91c2VNb3ZlO1xuXG4gIG9uU2Nyb2xsID0gb25TY3JvbGw7XG4gIG9mZlNjcm9sbCA9IG9mZlNjcm9sbDtcbiAgZ2V0U2Nyb2xsVG9wID0gZ2V0U2Nyb2xsVG9wO1xuICBnZXRTY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsTGVmdDtcbiAgc2V0U2Nyb2xsVG9wID0gc2V0U2Nyb2xsVG9wO1xuICBzZXRTY3JvbGxMZWZ0ID0gc2V0U2Nyb2xsTGVmdDtcblxuICBnZXRDb250ZXh0ID0gZ2V0Q29udGV4dDtcbiAgZ2V0UHJvcGVydGllcyA9IGdldFByb3BlcnRpZXM7XG4gIGFzc2lnbkNvbnRleHQgPSBhc3NpZ25Db250ZXh0O1xuICBhcHBseVByb3BlcnRpZXMgPSBhcHBseVByb3BlcnRpZXM7XG5cbiAgYWRkRXZlbnRMaXN0ZW5lciA9IGFkZEV2ZW50TGlzdGVuZXI7XG4gIGZpbmRFdmVudExpc3RlbmVyID0gZmluZEV2ZW50TGlzdGVuZXI7XG4gIGZpbmRFdmVudExpc3RlbmVycyA9IGZpbmRFdmVudExpc3RlbmVycztcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPckRPTUVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JET01FbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IHNlbGVjdG9yT3JET01FbGVtZW50O1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZG9tRWxlbWVudCA9IHNlbGVjdG9yT3JET01FbGVtZW50OyAgLy8vXG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnQ7XG4gICAgfVxuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpczsgLy8vXG4gIH1cblxuICBnZXRET01FbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQ7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoaW5jbHVkZUJvcmRlciA9IHRydWUpIHtcbiAgICBjb25zdCB3aWR0aCA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0V2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHNldFdpZHRoKHdpZHRoKSB7XG4gICAgd2lkdGggPSBgJHt3aWR0aH1weGA7IC8vL1xuXG4gICAgdGhpcy5zdHlsZShcIndpZHRoXCIsIHdpZHRoKTtcbiAgfVxuXG4gIGdldEhlaWdodChpbmNsdWRlQm9yZGVyID0gdHJ1ZSkge1xuICAgIGNvbnN0IGhlaWdodCA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldEhlaWdodCA6XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgc2V0SGVpZ2h0KGhlaWdodCkge1xuICAgIGhlaWdodCA9IGAke2hlaWdodH1weGA7IC8vL1xuXG4gICAgdGhpcy5zdHlsZShcImhlaWdodFwiLCBoZWlnaHQpO1xuICB9XG5cbiAgaGFzQXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5oYXNBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIGNsZWFyQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5kb21FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIGFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0Q2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7IH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG5cbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7IH1cblxuICBoYXNDbGFzcyhjbGFzc05hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTsgfVxuXG4gIGNsZWFyQ2xhc3NlcygpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9IFwiXCI7IH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgYWRkVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFkZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHByZXBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgICAgZmlyc3RDaGlsZERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgZmlyc3RDaGlsZERPTUVsZW1lbnQpO1xuICB9XG5cbiAgYXBwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lmluc2VydEJlZm9yZShkb21FbGVtZW50LCBudWxsKTsgLy8vXG4gIH1cblxuICBhZGQoZWxlbWVudCkgeyB0aGlzLmFwcGVuZChlbGVtZW50KTsgfVxuXG4gIHJlbW92ZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coZGlzcGxheVN0eWxlID0gXCJibG9ja1wiKSB7IHRoaXMuZGlzcGxheShkaXNwbGF5U3R5bGUpOyB9XG5cbiAgaGlkZSgpIHsgdGhpcy5zdHlsZShcImRpc3BsYXlcIiwgXCJub25lXCIpOyB9XG5cbiAgZGlzcGxheShkaXNwbGF5KSB7IHRoaXMuc3R5bGUoXCJkaXNwbGF5XCIsIGRpc3BsYXkpOyB9XG5cbiAgZW5hYmxlKCkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7IH1cblxuICBkaXNhYmxlKCkgeyB0aGlzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7IH1cblxuICBpc0VuYWJsZWQoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLmlzRGlzYWJsZWQoKSxcbiAgICAgICAgICBlbmFibGVkID0gIWRpc2FibGVkO1xuXG4gICAgcmV0dXJuIGVuYWJsZWQ7XG4gIH1cblxuICBpc0Rpc2FibGVkKCkge1xuICAgIGNvbnN0IGRpc2FibGVkID0gdGhpcy5oYXNBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcblxuICAgIHJldHVybiBkaXNhYmxlZDtcbiAgfVxuICBcbiAgaXNEaXNwbGF5ZWQoKSB7XG4gICAgY29uc3QgZGlzcGxheSA9IHRoaXMuc3R5bGUoXCJkaXNwbGF5XCIpLFxuICAgICAgICAgIGRpc3BsYXllZCA9IChkaXNwbGF5ICE9PSBcIm5vbmVcIik7XG4gICAgXG4gICAgcmV0dXJuIGRpc3BsYXllZDtcbiAgfVxuXG4gIGlzU2hvd2luZygpIHtcbiAgICBjb25zdCBkaXNwbGF5ZWQgPSB0aGlzLmlzRGlzcGxheWVkKCksXG4gICAgICAgICAgc2hvd2luZyA9IGRpc3BsYXllZDsgIC8vL1xuXG4gICAgcmV0dXJuIHNob3dpbmc7XG4gIH1cblxuICBpc0hpZGRlbigpIHtcbiAgICBjb25zdCBkaXNwbGF5ZWQgPSB0aGlzLmlzRGlzcGxheWVkKCksXG4gICAgICAgICAgaGlkZGVuID0gIWRpc3BsYXllZDtcblxuICAgIHJldHVybiBoaWRkZW47XG4gIH1cblxuICBzdHlsZShuYW1lLCB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3R5bGUgPSB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV07XG5cbiAgICAgIHJldHVybiBzdHlsZTtcbiAgICB9XG4gIH1cblxuICBodG1sKGh0bWwpIHtcbiAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICBodG1sID0gaW5uZXJIVE1MOyAvLy9cblxuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlubmVySFRNTCA9IGh0bWw7IC8vL1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgY3NzKGNzcykge1xuICAgIGlmIChjc3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb21FbGVtZW50KSxcbiAgICAgICAgICAgIGNzcyA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tcHV0ZWRTdHlsZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGNvbXB1dGVkU3R5bGVbMF0sICAvLy9cbiAgICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICAgIGNzc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNzcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbGV0IG5hbWUgPSBjc3M7IC8vL1xuXG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICBjc3MgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKGNzcyk7IC8vL1xuXG4gICAgICBuYW1lcy5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3NzW25hbWVdO1xuXG4gICAgICAgIHRoaXMuc3R5bGUobmFtZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxuICBibHVyKCkgeyB0aGlzLmRvbUVsZW1lbnQuYmx1cigpOyB9XG5cbiAgZm9jdXMoKSB7IHRoaXMuZG9tRWxlbWVudC5mb2N1cygpOyB9XG5cbiAgaGFzRm9jdXMoKSB7XG4gICAgY29uc3QgZm9jdXMgPSAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5kb21FbGVtZW50KTsgIC8vL1xuXG4gICAgcmV0dXJuIGZvY3VzO1xuICB9XG5cbiAgZ2V0RGVzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gXCIqXCIpIHtcbiAgICBjb25zdCBkb21Ob2RlID0gdGhpcy5kb21FbGVtZW50LCAgLy8vXG4gICAgICAgICAgZGVzY2VuZGFudERPTU5vZGVzID0gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSksXG4gICAgICAgICAgZGVzY2VuZGFudERPTUVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yKGRlc2NlbmRhbnRET01Ob2Rlcywgc2VsZWN0b3IpLFxuICAgICAgICAgIGRlc2NlbmRhbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRlc2NlbmRhbnRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gZGVzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q2hpbGRFbGVtZW50cyhzZWxlY3RvciA9IFwiKlwiKSB7XG4gICAgY29uc3QgY2hpbGRET01Ob2RlcyA9IHRoaXMuZG9tRWxlbWVudC5jaGlsZE5vZGVzLFxuICAgICAgICAgIGNoaWxkRE9NRWxlbWVudHMgPSBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IoY2hpbGRET01Ob2Rlcywgc2VsZWN0b3IpLFxuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhjaGlsZERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UGFyZW50RWxlbWVudChzZWxlY3RvciA9IFwiKlwiKSB7XG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHBhcmVudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChwYXJlbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnRzID0gW3BhcmVudERPTUVsZW1lbnRdLFxuICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKHBhcmVudERPTUVsZW1lbnRzKSxcbiAgICAgICAgICAgICAgZmlyc3RQYXJlbnRFbGVtZW50ID0gZmlyc3QocGFyZW50RWxlbWVudHMpO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBmaXJzdFBhcmVudEVsZW1lbnQgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIGdldEFzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gXCIqXCIpIHtcbiAgICBjb25zdCBhc2NlbmRhbnRET01FbGVtZW50cyA9IFtdLFxuICAgICAgICAgIHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGxldCBhc2NlbmRhbnRET01FbGVtZW50ID0gcGFyZW50RE9NRWxlbWVudDsgIC8vL1xuICAgIHdoaWxlIChhc2NlbmRhbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoYXNjZW5kYW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBhc2NlbmRhbnRET01FbGVtZW50cy5wdXNoKGFzY2VuZGFudERPTUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBhc2NlbmRhbnRET01FbGVtZW50ID0gYXNjZW5kYW50RE9NRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGFzY2VuZGFudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoYXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGFzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9IFwiKlwiKSB7XG4gICAgbGV0IHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmlvdXNTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5wcmV2aW91c1NpYmxpbmc7ICAvLy9cblxuICAgIGlmICgocHJldmlvdXNTaWJsaW5nRE9NTm9kZSAhPT0gbnVsbCkgJiYgZG9tTm9kZU1hdGNoZXNTZWxlY3RvcihwcmV2aW91c1NpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBwcmV2aW91c1NpYmxpbmdET01Ob2RlLl9fZWxlbWVudF9fIHx8IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBnZXROZXh0U2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSBcIipcIikge1xuICAgIGxldCBuZXh0U2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgbmV4dFNpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50Lm5leHRTaWJsaW5nO1xuXG4gICAgaWYgKChuZXh0U2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IobmV4dFNpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIG5leHRTaWJsaW5nRWxlbWVudCA9IG5leHRTaWJsaW5nRE9NTm9kZS5fX2VsZW1lbnRfXyB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbVRhZ05hbWUodGFnTmFtZSwgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGZyb21UYWdOYW1lKEVsZW1lbnQsIHRhZ05hbWUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyksXG4gICAgICAgICAgZGVmYXVsdFByb3BlcnRpZXMgPSB7fSwgLy8vXG4gICAgICAgICAgaWdub3JlZFByb3BlcnRpZXMgPSBbXTsgLy8vXG5cbiAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gQ2xhc3MudGFnTmFtZSxcbiAgICAgICAgICBlbGVtZW50ID0gZnJvbVRhZ05hbWUoQ2xhc3MsIHRhZ05hbWUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyksXG4gICAgICAgICAgZGVmYXVsdFByb3BlcnRpZXMgPSBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcyksXG4gICAgICAgICAgaWdub3JlZFByb3BlcnRpZXMgPSBpZ25vcmVkUHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcyk7XG5cbiAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gZnJvbVRhZ05hbWUoQ2xhc3MsIHRhZ05hbWUsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICBjb25zdCBkb21FbGVtZW50ID0gaXNTVkdUYWdOYW1lKHRhZ05hbWUpID9cbiAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OQU1FU1BBQ0VfVVJJLCB0YWdOYW1lKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcblxuICByZXR1cm4gZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG59XG5cbmZ1bmN0aW9uIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG5cbiAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuY2FsbChDbGFzcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSk7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRQcm9wZXJ0aWVzRnJvbUNsYXNzKENsYXNzLCBkZWZhdWx0UHJvcGVydGllcyA9IHt9KSB7XG4gIGlmIChDbGFzcy5oYXNPd25Qcm9wZXJ0eShcImRlZmF1bHRQcm9wZXJ0aWVzXCIpKSB7XG4gICAgY29tYmluZShkZWZhdWx0UHJvcGVydGllcywgQ2xhc3MuZGVmYXVsdFByb3BlcnRpZXMpO1xuICB9XG5cbiAgY29uc3Qgc3VwZXJDbGFzcyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihDbGFzcyk7XG5cbiAgaWYgKHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhzdXBlckNsYXNzLCBkZWZhdWx0UHJvcGVydGllcyk7XG4gIH1cblxuICByZXR1cm4gZGVmYXVsdFByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGlnbm9yZWRQcm9wZXJ0aWVzRnJvbUNsYXNzKENsYXNzLCBpZ25vcmVkUHJvcGVydGllcyA9IFtdKSB7XG4gIGlmIChDbGFzcy5oYXNPd25Qcm9wZXJ0eShcImlnbm9yZWRQcm9wZXJ0aWVzXCIpKSB7XG4gICAgYXVnbWVudChpZ25vcmVkUHJvcGVydGllcywgQ2xhc3MuaWdub3JlZFByb3BlcnRpZXMsIChpZ25vcmVkUHJvcGVydHkpID0+ICFpZ25vcmVkUHJvcGVydGllcy5pbmNsdWRlcyhpZ25vcmVkUHJvcGVydHkpKTtcbiAgfVxuXG4gIGNvbnN0IHN1cGVyQ2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3MpO1xuXG4gIGlmIChzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3Moc3VwZXJDbGFzcywgaWdub3JlZFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmV0dXJuIGlnbm9yZWRQcm9wZXJ0aWVzO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPckRPTUVsZW1lbnQgPSBcImJvZHlcIikge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJib2R5XCI7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4uL2VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnV0dG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvck9yRE9NRWxlbWVudCk7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdGFnTmFtZSA9IFwiYnV0dG9uXCI7XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25DbGlja1wiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayA9IG51bGwgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljaywgLy8vXG4gICAgICAgICAgYnV0dG9uID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIGJ1dHRvbjtcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoZWNrYm94IGV4dGVuZHMgRWxlbWVudCB7XG4gIG9uQ2hhbmdlID0gb25DaGFuZ2U7XG4gIG9mZkNoYW5nZSA9IG9mZkNoYW5nZTtcblxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yRE9NRWxlbWVudCwgY2hhbmdlSGFuZGxlciwgY2hlY2tlZCkge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcblxuICAgIHRoaXMuY2hlY2soY2hlY2tlZCk7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjaGVjayhjaGVja2VkID0gdHJ1ZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2hlY2tlZCA9IGNoZWNrZWQ7IH1cblxuICBpc0NoZWNrZWQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2hlY2tlZDsgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJpbnB1dFwiO1xuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uQ2hhbmdlXCIsXG4gICAgXCJjaGVja2VkXCJcbiAgXTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BlcnRpZXMgPSB7XG4gICAgdHlwZTogXCJjaGVja2JveFwiXG4gIH07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgPSBudWxsLCBjaGVja2VkID0gbnVsbCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xuICAgICAgICAgIGNoZWNrYm94ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpO1xuXG4gICAgcmV0dXJuIGNoZWNrYm94O1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcImNsaWNrXCIsIGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpOyB9IC8vL1xuXG5mdW5jdGlvbiBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcImNsaWNrXCIsIGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpOyB9IC8vL1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpbmsgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3JPckRPTUVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcblxuICAgIGlmIChjbGlja0hhbmRsZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMub25DbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJhXCI7XG5cbiAgc3RhdGljIGlnbm9yZWRQcm9wZXJ0aWVzID0gW1xuICAgIFwib25DbGlja1wiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayA9IG51bGwgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljaywgLy8vXG4gICAgICAgICAgbGluayA9IEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjbGlja0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBsaW5rO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IEVsZW1lbnQgZnJvbSBcIi4uL2VsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VsZWN0IGV4dGVuZHMgRWxlbWVudCB7XG4gIG9uQ2hhbmdlID0gb25DaGFuZ2U7XG4gIG9mZkNoYW5nZSA9IG9mZkNoYW5nZTtcblxuICBjb25zdHJ1Y3RvcihzZWxlY3Rvck9yRE9NRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yT3JET01FbGVtZW50KTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQudmFsdWUsICAvLy9cbiAgICAgICAgICBzZWxlY3RlZE9wdGlvblZhbHVlID0gdmFsdWU7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkT3B0aW9uQnlWYWx1ZShzZWxlY3RlZE9wdGlvblZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlOyAgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHN0YXRpYyB0YWdOYW1lID0gXCJzZWxlY3RcIjtcblxuICBzdGF0aWMgaWdub3JlZFByb3BlcnRpZXMgPSBbXG4gICAgXCJvbkNoYW5nZVwiXG4gIF07XG5cbiAgc3RhdGljIGZyb21DbGFzcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgPSBudWxsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXG4gICAgICAgICAgc2VsZWN0ID0gRWxlbWVudC5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBzZWxlY3Q7XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJjaGFuZ2VcIiwgY2hhbmdlSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJjaGFuZ2VcIiwgY2hhbmdlSGFuZGxlciwgZWxlbWVudCk7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIEJvZHkgfSBmcm9tIFwiLi9lbGVtZW50L2JvZHlcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQnV0dG9uIH0gZnJvbSBcIi4vZWxlbWVudC9idXR0b25cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgQ2hlY2tib3ggfSBmcm9tIFwiLi9lbGVtZW50L2NoZWNrYm94XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIExpbmsgfSBmcm9tIFwiLi9lbGVtZW50L2xpbmtcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgU2VsZWN0IH0gZnJvbSBcIi4vZWxlbWVudC9zZWxlY3RcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgSW5wdXQgfSBmcm9tIFwiLi9pbnB1dEVsZW1lbnQvaW5wdXRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dGFyZWEgfSBmcm9tIFwiLi9pbnB1dEVsZW1lbnQvdGV4dGFyZWFcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgRWxlbWVudCB9IGZyb20gXCIuL2VsZW1lbnRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dEVsZW1lbnQgfSBmcm9tIFwiLi90ZXh0RWxlbWVudFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBJbnB1dEVsZW1lbnQgfSBmcm9tIFwiLi9pbnB1dEVsZW1lbnRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgd2luZG93IH0gZnJvbSBcIi4vd2luZG93XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIGRvY3VtZW50IH0gZnJvbSBcIi4vZG9jdW1lbnRcIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgY29uc3RhbnRzIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEJvdW5kcyB9IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvYm91bmRzXCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIE9mZnNldCB9IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvb2Zmc2V0XCI7XG5leHBvcnQgeyBkZWZhdWx0IGFzIFJlYWN0IH0gZnJvbSBcIi4vcmVhY3RcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgRWxlbWVudCBmcm9tIFwiLi9lbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBvbkNoYW5nZSA9IG9uQ2hhbmdlO1xuICBvZmZDaGFuZ2UgPSBvZmZDaGFuZ2U7XG5cbiAgb25SZXNpemUgPSBvblJlc2l6ZTtcbiAgb2ZmUmVzaXplID0gb2ZmUmVzaXplO1xuXG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yT3JET01FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3JPckRPTUVsZW1lbnQpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH1cblxuICBnZXRTZWxlY3Rpb25TdGFydCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydDsgfVxuXG4gIGdldFNlbGVjdGlvbkVuZCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQ7IH1cbiAgXG4gIGlzUmVhZE9ubHkoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucmVhZE9ubHk7IH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgfVxuXG4gIHNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0OyB9XG5cbiAgc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kOyB9XG5cbiAgc2V0UmVhZE9ubHkocmVhZE9ubHkpIHsgdGhpcy5kb21FbGVtZW50LnJlYWRPbmx5ID0gcmVhZE9ubHk7IH1cblxuICBzZWxlY3QoKSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3QoKTsgfVxuXG4gIHN0YXRpYyBpZ25vcmVkUHJvcGVydGllcyA9IFtcbiAgICBcIm9uQ2hhbmdlXCJcbiAgXTtcblxuICBzdGF0aWMgZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlID0gbnVsbCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUNsYXNzKENsYXNzLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcImNoYW5nZVwiLCBjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcImNoYW5nZVwiLCBjaGFuZ2VIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5mdW5jdGlvbiBvblJlc2l6ZShyZXNpemVIYW5kbGVyLCBlbGVtZW50KSB7fSAvLy9cblxuZnVuY3Rpb24gb2ZmUmVzaXplKHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpIHt9ICAvLy9cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgSW5wdXRFbGVtZW50IGZyb20gXCIuLi9pbnB1dEVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9IFwiaW5wdXRcIjtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgSW5wdXRFbGVtZW50IGZyb20gXCIuLi9pbnB1dEVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBzdGF0aWMgdGFnTmFtZSA9IFwidGV4dGFyZWFcIjtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuZHMge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cblxuICBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90dG9tO1xuICB9XG5cbiAgZ2V0UmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBnZXRXaWR0aCgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMucmlnaHQgLSB0aGlzLmxlZnQ7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBnZXRIZWlnaHQoKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5ib3R0b20gLSB0aGlzLnRvcDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cbiAgXG4gIHNldFRvcCh0b3ApIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgfVxuXG4gIHNldExlZnQobGVmdCkge1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBzZXRCb3R0b20oYm90dG9tKSB7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gIH1cblxuICBzZXRSaWdodChyaWdodCkge1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIHNoaWZ0KGhvcml6b250YWxPZmZzZXQsIHZlcnRpY2FsT2Zmc2V0KSB7XG4gICAgdGhpcy50b3AgKz0gdmVydGljYWxPZmZzZXQ7XG4gICAgdGhpcy5sZWZ0ICs9IGhvcml6b250YWxPZmZzZXQ7XG4gICAgdGhpcy5ib3R0b20gKz0gdmVydGljYWxPZmZzZXQ7XG4gICAgdGhpcy5yaWdodCArPSBob3Jpem9udGFsT2Zmc2V0O1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICByZXR1cm4gKCAgKHRoaXMudG9wIDwgbW91c2VUb3ApXG4gICAgICAgICAgICYmICh0aGlzLmxlZnQgPCBtb3VzZUxlZnQpXG4gICAgICAgICAgICYmICh0aGlzLmJvdHRvbSA+IG1vdXNlVG9wKVxuICAgICAgICAgICAmJiAodGhpcy5yaWdodCA+IG1vdXNlTGVmdCkgICk7XG4gIH1cblxuICBhcmVPdmVybGFwcGluZyhib3VuZHMpIHtcbiAgICByZXR1cm4gKCAgKHRoaXMudG9wIDwgYm91bmRzLmJvdHRvbSlcbiAgICAgICAgICAgJiYgKHRoaXMubGVmdCA8IGJvdW5kcy5yaWdodClcbiAgICAgICAgICAgJiYgKHRoaXMuYm90dG9tID4gYm91bmRzLnRvcClcbiAgICAgICAgICAgJiYgKHRoaXMucmlnaHQgPiBib3VuZHMubGVmdCkgICk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQsIC8vL1xuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQsICAvLy9cbiAgICAgICAgICB0b3AgPSBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIGxlZnQgPSBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArIHdpbmRvd1Njcm9sbExlZnQsXG4gICAgICAgICAgYm90dG9tID0gYm91bmRpbmdDbGllbnRSZWN0LmJvdHRvbSArIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgICByaWdodCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5yaWdodCArIHdpbmRvd1Njcm9sbExlZnQsXG4gICAgICAgICAgYm91bmRzID0gbmV3IEJvdW5kcyh0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tVG9wTGVmdFdpZHRoQW5kSGVpZ2h0KHRvcCwgbGVmdCwgd2lkdGgsIGhlaWdodCkge1xuICAgIGNvbnN0IGJvdHRvbSA9IHRvcCArIGhlaWdodCxcbiAgICAgICAgICByaWdodCA9IGxlZnQgKyB3aWR0aCxcbiAgICAgICAgICBib3VuZHMgPSBuZXcgQm91bmRzKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2Zmc2V0IHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25DbGljayhjbGlja0hhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZkNsaWNrKGNsaWNrSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcImNsaWNrXCIsIGNsaWNrSGFuZGxlciwgZWxlbWVudCk7IH1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge3JlbW92ZVJlc2l6ZU9iamVjdH0gZnJvbSBcIi4vcmVzaXplXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbihldmVudFR5cGVzLCBoYW5kbGVyLCBlbGVtZW50KSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KFwiIFwiKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKChldmVudFR5cGUpID0+IHtcbiAgICBpZiAoZXZlbnRUeXBlID09PSBcInJlc2l6ZVwiKSB7XG4gICAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IHRoaXMuZmluZEV2ZW50TGlzdGVuZXJzKFwicmVzaXplXCIpLFxuICAgICAgICAgICAgcmVzaXplRXZlbnRMaXN0ZW5lcnNMZW5ndGggPSByZXNpemVFdmVudExpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIGlmIChyZXNpemVFdmVudExpc3RlbmVyc0xlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmFkZFJlc2l6ZU9iamVjdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIsIGVsZW1lbnQpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoXCIgXCIpOyAvLy9cblxuICBldmVudFR5cGVzLmZvckVhY2goKGV2ZW50VHlwZSkgPT4ge1xuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSBcInJlc2l6ZVwiKSB7XG4gICAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IHRoaXMuZmluZEV2ZW50TGlzdGVuZXJzKFwicmVzaXplXCIpLFxuICAgICAgICAgICAgcmVzaXplRXZlbnRMaXN0ZW5lcnNMZW5ndGggPSByZXNpemVFdmVudExpc3RlbmVycy5sZW5ndGg7XG5cbiAgICAgIGlmIChyZXNpemVFdmVudExpc3RlbmVyc0xlbmd0aCA9PT0gMCkge1xuICAgICAgICByZW1vdmVSZXNpemVPYmplY3QodGhpcyk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50ID0gdGhpcykge1xuICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoXCJldmVudExpc3RlbmVyc1wiKSkge1xuICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgfVxuXG4gIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSBjcmVhdGVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCk7XG5cbiAgdGhpcy5ldmVudExpc3RlbmVycy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQgPSB0aGlzKSB7XG4gIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLmZpbmRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgZWxlbWVudCksXG4gICAgICAgIGluZGV4ID0gdGhpcy5ldmVudExpc3RlbmVycy5pbmRleE9mKGV2ZW50TGlzdGVuZXIpLFxuICAgICAgICBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICB0aGlzLmV2ZW50TGlzdGVuZXJzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuXG4gIGlmICh0aGlzLmV2ZW50TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSB0aGlzLmV2ZW50TGlzdGVuZXJzO1xuICB9XG5cbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIGVsZW1lbnQpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lciA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMuZmluZCgoZXZlbnRMaXN0ZW5lcikgPT4ge1xuICAgIGNvbnN0IGZvdW5kID0gKCAoZXZlbnRMaXN0ZW5lci5lbGVtZW50ID09PSBlbGVtZW50KSAmJlxuICAgICAgICAgICAgICAgICAgICAoZXZlbnRMaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyKSAmJlxuICAgICAgICAgICAgICAgICAgICAoZXZlbnRMaXN0ZW5lci5ldmVudFR5cGUgPT09IGV2ZW50VHlwZSkgKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRFdmVudExpc3RlbmVycyhldmVudFR5cGUpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lcnMgPSBbXTtcblxuICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShcImV2ZW50TGlzdGVuZXJzXCIpKSB7XG4gICAgdGhpcy5ldmVudExpc3RlbmVycy5mb3JFYWNoKChldmVudExpc3RlbmVyKSA9PiB7XG4gICAgICBjb25zdCBmb3VuZCA9IChldmVudExpc3RlbmVyLmV2ZW50VHlwZSA9PT0gZXZlbnRUeXBlKTtcblxuICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcnM7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBlbGVtZW50KSB7XG4gIGxldCBldmVudExpc3RlbmVyO1xuXG4gIGV2ZW50TGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgICBoYW5kbGVyLmNhbGwoZWxlbWVudCwgZXZlbnQsIGVsZW1lbnQpXG4gIH07XG5cbiAgT2JqZWN0LmFzc2lnbihldmVudExpc3RlbmVyLCB7XG4gICAgZWxlbWVudCxcbiAgICBoYW5kbGVyLFxuICAgIGV2ZW50VHlwZVxuICB9KTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBjb21iaW5lLCBwcnVuZSB9IGZyb20gXCIuLi91dGlsaXRpZXMvb2JqZWN0XCI7XG5pbXBvcnQgeyBmaXJzdCwgZ3VhcmFudGVlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgU1ZHX05BTUVTUEFDRV9VUkkgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBpc0hUTUxBdHRyaWJ1dGVOYW1lLCBpc1NWR0F0dHJpYnV0ZU5hbWUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL25hbWVcIjtcbmltcG9ydCB7IHJlbW92ZUZhbHNleUVsZW1lbnRzLCByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2VsZW1lbnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKSB7XG4gIHByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHt9LCBwcm9wZXJ0aWVzKTsgLy8vXG5cbiAgY29tYmluZShwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tRWxlbWVudEFuZFByb3BlcnRpZXModGhpcywgcHJvcGVydGllcykgfHwgcHJvcGVydGllcy5jaGlsZEVsZW1lbnRzOyAgLy8vXG5cbiAgcHJ1bmUocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IHN2ZyA9ICh0aGlzLmRvbUVsZW1lbnQubmFtZXNwYWNlVVJJID09PSBTVkdfTkFNRVNQQUNFX1VSSSksIC8vL1xuICAgICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpOyAgLy8vXG5cbiAgbmFtZXMuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcblxuICAgIGlmIChmYWxzZSkge1xuICAgICAgLy8vXG4gICAgfSBlbHNlIGlmIChpc0hhbmRsZXJOYW1lKG5hbWUpKSB7XG4gICAgICBhZGRIYW5kbGVyKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzQXR0cmlidXRlTmFtZShuYW1lLCBzdmcpKSB7XG4gICAgICBhZGRBdHRyaWJ1dGUodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoXCJwcm9wZXJ0aWVzXCIpKSB7XG4gICAgICAgIGNvbnN0IHByb3BlcnRpZXMgPSB7fTtcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNvbnRleHQgPSB7fTtcblxuICBjaGlsZEVsZW1lbnRzLmZvckVhY2goKGNoaWxkRWxlbWVudCkgPT4ge1xuICAgIHVwZGF0ZUNvbnRleHQoY2hpbGRFbGVtZW50LCBjb250ZXh0KTtcblxuICAgIGNoaWxkRWxlbWVudC5hZGRUbyh0aGlzKTtcbiAgfSk7XG5cbiAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgY29udGV4dFxuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0KCkge1xuICByZXR1cm4gdGhpcy5jb250ZXh0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICBjb25zdCBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaXJzdEFyZ3VtZW50ID0gZmlyc3QoYXJndW1lbnRzKTtcblxuICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5jb250ZXh0KTtcblxuICAgICAgdGhlbkRlbGV0ZSA9IGZpcnN0QXJndW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoZW5EZWxldGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgfVxuXG4gIG5hbWVzLmZvckVhY2goKG5hbWUpID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBuYW1lLCAgLy8vXG4gICAgICAgICAgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yKTtcblxuICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgfSwgW10pO1xufVxuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgbGV0IGNoaWxkRWxlbWVudHMgPSBudWxsO1xuXG4gIGlmICh0eXBlb2YgZWxlbWVudC5jaGlsZEVsZW1lbnRzID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudC5jaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpO1xuXG4gICAgY2hpbGRFbGVtZW50cyA9IGd1YXJhbnRlZShjaGlsZEVsZW1lbnRzKTtcblxuICAgIGNoaWxkRWxlbWVudHMgPSByZW1vdmVGYWxzZXlFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcblxuICAgIGNoaWxkRWxlbWVudHMgPSByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMoY2hpbGRFbGVtZW50cyk7XG4gIH1cblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udGV4dChjaGlsZEVsZW1lbnQsIGNvbnRleHQpIHtcbiAgY29uc3QgcGFyZW50Q29udGV4dCA9ICh0eXBlb2YgY2hpbGRFbGVtZW50LnBhcmVudENvbnRleHQgPT09IFwiZnVuY3Rpb25cIikgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY29udGV4dDsgLy8vXG5cbiAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCBwYXJlbnRDb250ZXh0KTtcblxuICBkZWxldGUgY2hpbGRFbGVtZW50LmNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSBcImNsYXNzTmFtZVwiKSB7XG4gICAgbmFtZSA9IFwiY2xhc3NcIjtcbiAgfVxuXG4gIGlmIChuYW1lID09PSBcImh0bWxGb3JcIikge1xuICAgIG5hbWUgPSBcImZvclwiO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSk7XG5cbiAgICBrZXlzLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgZWxlbWVudC5kb21FbGVtZW50W25hbWVdW2tleV0gPSB2YWx1ZVtrZXldO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gbmFtZTsgLy8vXG5cbiAgICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzSGFuZGxlck5hbWUobmFtZSkge1xuICByZXR1cm4gbmFtZS5tYXRjaCgvXm9uLyk7XG59XG5cbmZ1bmN0aW9uIGlzQXR0cmlidXRlTmFtZShuYW1lLCBzdmcpIHtcbiAgcmV0dXJuIHN2ZyA/IGlzU1ZHQXR0cmlidXRlTmFtZShuYW1lKSA6IGlzSFRNTEF0dHJpYnV0ZU5hbWUobmFtZSlcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25LZXlVcChrZXlVcEhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcImtleXVwXCIsIGtleVVwSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZktleVVwKGtleVVwSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9mZihcImtleXVwXCIsIGtleVVwSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uS2V5RG93bihrZXlEb3duSGFuZGxlciwgZWxlbWVudCkgeyB0aGlzLm9uKFwia2V5ZG93blwiLCBrZXlEb3duSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZktleURvd24oa2V5RG93bkhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJrZXlkb3duXCIsIGtleURvd25IYW5kbGVyLCBlbGVtZW50KTsgfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlVXAobW91c2VVcEhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcIm1vdXNldXBcIiwgbW91c2VVcEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZNb3VzZVVwKG1vdXNlVXBIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwibW91c2V1cFwiLCBtb3VzZVVwSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uTW91c2VPdXQobW91c2VPdXRIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJtb3VzZW91dFwiLCBtb3VzZU91dEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvZmZNb3VzZU91dChtb3VzZU91dEhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJtb3VzZW91dFwiLCBtb3VzZU91dEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJtb3VzZWRvd25cIiwgbW91c2VEb3duSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwibW91c2Vkb3duXCIsIG1vdXNlRG93bkhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlT3Zlcihtb3VzZU92ZXJIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJtb3VzZW92ZXJcIiwgbW91c2VPdmVySGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZk1vdXNlT3Zlcihtb3VzZU92ZXJIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwibW91c2VvdmVyXCIsIG1vdXNlT3ZlckhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBvbk1vdXNlTW92ZShtb3VzZU1vdmVIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZk1vdXNlTW92ZShtb3VzZU1vdmVIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZUhhbmRsZXIsIGVsZW1lbnQpOyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vbihcInJlc2l6ZVwiLCByZXNpemVIYW5kbGVyLCBlbGVtZW50KTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gb2ZmUmVzaXplKHJlc2l6ZUhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoXCJyZXNpemVcIiwgcmVzaXplSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFJlc2l6ZU9iamVjdCgpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9iamVjdFwiKSxcbiAgICAgICAgc3R5bGUgPSBgZGlzcGxheTogYmxvY2s7IFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICB0b3A6IDA7IFxuICAgICAgICAgICAgICAgICBsZWZ0OiAwOyBcbiAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7IFxuICAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyBcbiAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICAgICAgICAgICB6LWluZGV4OiAtMTtgLFxuICAgICAgICBkYXRhID0gXCJhYm91dDpibGFua1wiLFxuICAgICAgICB0eXBlID0gXCJ0ZXh0L2h0bWxcIjtcblxuICByZXNpemVPYmplY3Quc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgc3R5bGUpO1xuICByZXNpemVPYmplY3QuZGF0YSA9IGRhdGE7XG4gIHJlc2l6ZU9iamVjdC50eXBlID0gdHlwZTtcblxuICB0aGlzLl9fcmVzaXplT2JqZWN0X18gPSByZXNpemVPYmplY3Q7XG5cbiAgcmVzaXplT2JqZWN0Lm9ubG9hZCA9ICgpID0+IHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKHRoaXMpO1xuXG4gIHRoaXMuZG9tRWxlbWVudC5hcHBlbmRDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUmVzaXplT2JqZWN0KCkge1xuICBjb25zdCByZXNpemVPYmplY3QgPSB0aGlzLl9fcmVzaXplT2JqZWN0X18sXG4gICAgICAgIG9iamVjdFdpbmRvdyA9IHJlc2l6ZU9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7ICAvLy9cblxuICBvYmplY3RXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZXNpemVFdmVudExpc3RlbmVyKTtcblxuICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQocmVzaXplT2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVPYmplY3QgPSBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18sXG4gICAgICAgIHJlc2l6ZU9iamVjdFdpbmRvdyA9IHJlc2l6ZU9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7ICAvLy9cblxuICByZXNpemVPYmplY3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoZXZlbnQpID0+IHtcbiAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IGVsZW1lbnQuZmluZEV2ZW50TGlzdGVuZXJzKFwicmVzaXplXCIpO1xuXG4gICAgcmVzaXplRXZlbnRMaXN0ZW5lcnMuZm9yRWFjaCgocmVzaXplRXZlbnRMaXN0ZW5lcikgPT4gcmVzaXplRXZlbnRMaXN0ZW5lci5jYWxsKGVsZW1lbnQsIGV2ZW50LCBlbGVtZW50KSk7XG4gIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBvblNjcm9sbChzY3JvbGxIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub24oXCJzY3JvbGxcIiwgc2Nyb2xsSGFuZGxlciwgZWxlbWVudCk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZlNjcm9sbChzY3JvbGxIYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKFwic2Nyb2xsXCIsIHNjcm9sbEhhbmRsZXIsIGVsZW1lbnQpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQ7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbFRvcChzY3JvbGxUb3ApIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U2Nyb2xsTGVmdChzY3JvbGxMZWZ0KSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDsgfVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVTdGF0ZSh1cGRhdGUpIHtcbiAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLCB1cGRhdGUpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBFbGVtZW50IGZyb20gXCIuL2VsZW1lbnRcIjtcblxuaW1wb3J0IHsgZmxhdHRlbiB9IGZyb20gXCIuL3V0aWxpdGllcy9hcnJheVwiO1xuaW1wb3J0IHsgcmVtb3ZlRmFsc2V5RWxlbWVudHMsIHJlcGxhY2VTdHJpbmdzV2l0aFRleHRFbGVtZW50cyB9IGZyb20gXCIuL3V0aWxpdGllcy9lbGVtZW50c1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZpcnN0QXJndW1lbnQsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbVJlbWFpbmluZ0FyZ3VtZW50cyhyZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2hpbGRFbGVtZW50c1xuICAgIH0sIHByb3BlcnRpZXMpO1xuXG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKGlzU3ViY2xhc3NPZihmaXJzdEFyZ3VtZW50LCBFbGVtZW50KSkge1xuICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBDbGFzcy5mcm9tQ2xhc3MoQ2xhc3MsIHByb3BlcnRpZXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBmaXJzdEFyZ3VtZW50OyAvLy9cblxuICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbVRhZ05hbWUodGFnTmFtZSwgcHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBjb25zdCBlbGVtZW50RnVuY3Rpb24gPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50RnVuY3Rpb24ocHJvcGVydGllcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmNvbnN0IFJlYWN0ID0ge1xuICBjcmVhdGVFbGVtZW50XG59O1xuXG5leHBvcnQgZGVmYXVsdCBSZWFjdDtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21SZW1haW5pbmdBcmd1bWVudHMocmVtYWluaW5nQXJndW1lbnRzKSB7XG4gIHJlbWFpbmluZ0FyZ3VtZW50cyA9IGZsYXR0ZW4ocmVtYWluaW5nQXJndW1lbnRzKTsgLy8vXG5cbiAgbGV0IGNoaWxkRWxlbWVudHMgPSByZW1haW5pbmdBcmd1bWVudHM7IC8vL1xuXG4gIGNoaWxkRWxlbWVudHMgPSByZW1vdmVGYWxzZXlFbGVtZW50cyhjaGlsZEVsZW1lbnRzKTtcblxuICBjaGlsZEVsZW1lbnRzID0gcmVwbGFjZVN0cmluZ3NXaXRoVGV4dEVsZW1lbnRzKGNoaWxkRWxlbWVudHMpO1xuXG4gIHJldHVybiBjaGlsZEVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBpc1N1YmNsYXNzT2YoYXJndW1lbnQsIENsYXNzKSB7XG4gIGxldCB0eXBlT2YgPSBmYWxzZTtcblxuICBpZiAoYXJndW1lbnQubmFtZSA9PT0gQ2xhc3MubmFtZSkgeyAvLy9cbiAgICB0eXBlT2YgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGFyZ3VtZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3VtZW50KTsgLy8vXG5cbiAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgIHR5cGVPZiA9IGlzU3ViY2xhc3NPZihhcmd1bWVudCwgQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlT2Y7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IE9mZnNldCBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL29mZnNldFwiO1xuaW1wb3J0IEJvdW5kcyBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL2JvdW5kc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzO1xuICB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlLFxuICAgICAgICAgIHRleHQgPSBub2RlVmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBzZXRUZXh0KHRleHQpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0ZXh0OyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7XG4gICAgY29uc3QgY2xpZW50V2lkdGggPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgd2lkdGggPSBjbGllbnRXaWR0aDsgIC8vL1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgaGVpZ2h0ID0gY2xpZW50SGVpZ2h0OyAgLy8vXG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIGFkZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hZGQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50ID0gSW5maW5pdHksIGFycmF5MiA9IFtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBbc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcnJheTJdLFxuICAgICAgIGRlbGV0ZWRJdGVtc0FycmF5ID0gQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseShhcnJheTEsIGFyZ3MpO1xuXG4gIHJldHVybiBkZWxldGVkSXRlbXNBcnJheTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgcmV0dXJuIGFycmF5LnJlZHVjZSgoYXJyYXksIGVsZW1lbnQpID0+IHtcbiAgICBhcnJheSA9IGFycmF5LmNvbmNhdChlbGVtZW50KTsgIC8vL1xuXG4gICAgcmV0dXJuIGFycmF5O1xuICB9LCBbXSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBndWFyYW50ZWUoYXJyYXlPckVsZW1lbnQpIHtcbiAgYXJyYXlPckVsZW1lbnQgPSBhcnJheU9yRWxlbWVudCB8fCBbXTtcblxuICByZXR1cm4gKGFycmF5T3JFbGVtZW50IGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgICAgIGFycmF5T3JFbGVtZW50IDpcbiAgICAgICAgICAgICAgW2FycmF5T3JFbGVtZW50XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1Z21lbnQoYXJyYXkxLCBhcnJheTIsIHRlc3QpIHtcbiAgYXJyYXkyLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNwbGljZSB9IGZyb20gXCIuLi91dGlsaXRpZXMvYXJyYXlcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRvbUVsZW1lbnRzKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXMoZG9tRWxlbWVudHMsIChkb21FbGVtZW50KSA9PiAoZG9tRWxlbWVudC5fX2VsZW1lbnRfXyAhPT0gdW5kZWZpbmVkKSksXG4gICAgICAgIGVsZW1lbnRzID0gZG9tRWxlbWVudHNXaXRoRWxlbWVudHMubWFwKChkb21FbGVtZW50KSA9PiBkb21FbGVtZW50Ll9fZWxlbWVudF9fKTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShkb21Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMgPSBbXSkge1xuICBjb25zdCBzdGFydCA9IC0xLFxuICAgICAgICBkZWxldGVDb3VudCA9IDAsXG4gICAgICAgIGNoaWxkRE9NTm9kZXMgPSBkb21Ob2RlLmNoaWxkTm9kZXM7ICAvLy9cblxuICBzcGxpY2UoZGVzY2VuZGFudERPTU5vZGVzLCBzdGFydCwgZGVsZXRlQ291bnQsIGNoaWxkRE9NTm9kZXMpO1xuXG4gIGNoaWxkRE9NTm9kZXMuZm9yRWFjaCgoY2hpbGRET01Ob2RlKSA9PiBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShjaGlsZERPTU5vZGUsIGRlc2NlbmRhbnRET01Ob2RlcykpO1xuXG4gIHJldHVybiBkZXNjZW5kYW50RE9NTm9kZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJET01Ob2Rlc0J5U2VsZWN0b3IoZG9tTm9kZXMsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGZpbHRlcmVkRE9NTm9kZXMgPSBmaWx0ZXJET01Ob2Rlcyhkb21Ob2RlcywgKGRvbU5vZGUpID0+IGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpKTtcblxuICByZXR1cm4gZmlsdGVyZWRET01Ob2Rlcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tTm9kZVR5cGUgPSBkb21Ob2RlLm5vZGVUeXBlO1xuXG4gIHN3aXRjaCAoZG9tTm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFIDoge1xuICAgICAgY29uc3QgZG9tRWxlbWVudCA9IGRvbU5vZGU7IC8vL1xuXG4gICAgICByZXR1cm4gZG9tRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBjYXNlIE5vZGUuVEVYVF9OT0RFIDoge1xuICAgICAgaWYgKHNlbGVjdG9yID09PSBcIipcIikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXJET01Ob2Rlcyhkb21Ob2RlcywgdGVzdCkge1xuICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gW10sXG4gICAgICAgIGRvbU5vZGVzTGVuZ3RoID0gZG9tTm9kZXMubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkb21Ob2Rlc0xlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGRvbU5vZGUgPSBkb21Ob2Rlc1tpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gdGVzdChkb21Ob2RlKTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGZpbHRlcmVkRE9NTm9kZXMucHVzaChkb21Ob2RlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWRET01Ob2Rlcztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgVGV4dEVsZW1lbnQgZnJvbSBcIi4uL3RleHRFbGVtZW50XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVGYWxzZXlFbGVtZW50cyhlbGVtZW50cykge1xuICBlbGVtZW50cyA9IGVsZW1lbnRzLnJlZHVjZSgoZWxlbWVudHMsIGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxlbWVudHM7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlU3RyaW5nc1dpdGhUZXh0RWxlbWVudHMoZWxlbWVudHMpIHtcbiAgZWxlbWVudHMgPSBlbGVtZW50cy5tYXAoKGVsZW1lbnQpID0+IHsgIC8vL1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgY29uc3QgdGV4dCA9IGVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBlbGVtZW50ID0gdGV4dEVsZW1lbnQ7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzU1ZHVGFnTmFtZSh0YWdOYW1lKSB7XG4gIHJldHVybiBzdmdUYWdOYW1lcy5pbmNsdWRlcyh0YWdOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU1ZHQXR0cmlidXRlTmFtZShhdHRyaWJ1dGVOYW1lKSB7XG4gIHJldHVybiBzdmdBdHRyaWJ1dGVOYW1lcy5pbmNsdWRlcyhhdHRyaWJ1dGVOYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSFRNTEF0dHJpYnV0ZU5hbWUoYXR0cmlidXRlTmFtZSkge1xuICByZXR1cm4gaHRtbEF0dHJpYnV0ZU5hbWVzLmluY2x1ZGVzKGF0dHJpYnV0ZU5hbWUpO1xufVxuXG5jb25zdCBzdmdUYWdOYW1lcyA9IFtcbiAgICAgICAgXCJhbHRHbHlwaFwiLCBcImFuaW1hdGVcIiwgXCJhbmltYXRlQ29sb3JcIiwgXCJhbmltYXRlTW90aW9uXCIsIFwiYW5pbWF0ZVRyYW5zZm9ybVwiLCBcImFuaW1hdGlvblwiLCBcImF1ZGlvXCIsXG4gICAgICAgIFwiY2lyY2xlXCIsIFwiY2xpcFBhdGhcIiwgXCJjb2xvci1wcm9maWxlXCIsIFwiY3Vyc29yXCIsXG4gICAgICAgIFwiZGVmc1wiLCBcImRlc2NcIiwgXCJkaXNjYXJkXCIsXG4gICAgICAgIFwiZWxsaXBzZVwiLFxuICAgICAgICBcImZlQmxlbmRcIiwgXCJmZUNvbG9yTWF0cml4XCIsIFwiZmVDb21wb25lbnRUcmFuc2ZlclwiLCBcImZlQ29tcG9zaXRlXCIsIFwiZmVDb252b2x2ZU1hdHJpeFwiLCBcImZlRGlmZnVzZUxpZ2h0aW5nXCIsIFwiZmVEaXNwbGFjZW1lbnRNYXBcIiwgXCJmZURpc3RhbnRMaWdodFwiLCBcImZlRHJvcFNoYWRvd1wiLCBcImZlRmxvb2RcIiwgXCJmZUZ1bmNBXCIsIFwiZmVGdW5jQlwiLCBcImZlRnVuY0dcIiwgXCJmZUZ1bmNSXCIsIFwiZmVHYXVzc2lhbkJsdXJcIiwgXCJmZUltYWdlXCIsIFwiZmVNZXJnZVwiLCBcImZlTWVyZ2VOb2RlXCIsIFwiZmVNb3JwaG9sb2d5XCIsIFwiZmVPZmZzZXRcIiwgXCJmZVBvaW50TGlnaHRcIiwgXCJmZVNwZWN1bGFyTGlnaHRpbmdcIiwgXCJmZVNwb3RMaWdodFwiLCBcImZlVGlsZVwiLCBcImZlVHVyYnVsZW5jZVwiLCBcImZpbHRlclwiLCBcImZvbnRcIiwgXCJmb250LWZhY2VcIiwgXCJmb250LWZhY2UtZm9ybWF0XCIsIFwiZm9udC1mYWNlLW5hbWVcIiwgXCJmb250LWZhY2UtdXJpXCIsIFwiZm9yZWlnbk9iamVjdFwiLFxuICAgICAgICBcImdcIiwgXCJnbHlwaFwiLCBcImdseXBoUmVmXCIsXG4gICAgICAgIFwiaGFuZGxlclwiLCBcImhhdGNoXCIsIFwiaGF0Y2hwYXRoXCIsIFwiaGtlcm5cIixcbiAgICAgICAgXCJpbWFnZVwiLCBcImxpbmVcIiwgXCJsaW5lYXJHcmFkaWVudFwiLFxuICAgICAgICBcImxpc3RlbmVyXCIsXG4gICAgICAgIFwibWFya2VyXCIsIFwibWFza1wiLCBcIm1lc2hcIiwgXCJtZXNoZ3JhZGllbnRcIiwgXCJtZXNocGF0Y2hcIiwgXCJtZXNocm93XCIsIFwibWV0YWRhdGFcIiwgXCJtaXNzaW5nLWdseXBoXCIsIFwibXBhdGhcIixcbiAgICAgICAgXCJwYXRoXCIsIFwicGF0dGVyblwiLCBcInBvbHlnb25cIiwgXCJwb2x5bGluZVwiLCBcInByZWZldGNoXCIsXG4gICAgICAgIFwicmFkaWFsR3JhZGllbnRcIiwgXCJyZWN0XCIsXG4gICAgICAgIFwic2NyaXB0XCIsIFwic2V0XCIsIFwic29saWRjb2xvclwiLCBcInN0b3BcIiwgXCJzdHlsZVwiLCBcInN2Z1wiLCBcInN3aXRjaFwiLCBcInN5bWJvbFwiLFxuICAgICAgICBcInRicmVha1wiLCBcInRleHRcIiwgXCJ0ZXh0QXJlYVwiLCBcInRleHRQYXRoXCIsIFwidGl0bGVcIiwgXCJ0cmVmXCIsIFwidHNwYW5cIixcbiAgICAgICAgXCJ1bmtub3duXCIsIFwidXNlXCIsXG4gICAgICAgIFwidmlkZW9cIiwgXCJ2aWV3XCIsIFwidmtlcm5cIlxuICAgICAgXSxcbiAgICAgIHN2Z0F0dHJpYnV0ZU5hbWVzID0gW1xuICAgICAgICBcImFjY2VudC1oZWlnaHRcIiwgXCJhY2N1bXVsYXRlXCIsIFwiYWRkaXRpdmVcIiwgXCJhbGlnbm1lbnQtYmFzZWxpbmVcIiwgXCJhbHBoYWJldGljXCIsIFwiYW1wbGl0dWRlXCIsIFwiYXJhYmljLWZvcm1cIiwgXCJhc2NlbnRcIiwgXCJhdHRyaWJ1dGVOYW1lXCIsIFwiYXR0cmlidXRlVHlwZVwiLCBcImF6aW11dGhcIixcbiAgICAgICAgXCJiYW5kd2lkdGhcIiwgXCJiYXNlRnJlcXVlbmN5XCIsIFwiYmFzZVByb2ZpbGVcIiwgXCJiYXNlbGluZS1zaGlmdFwiLCBcImJib3hcIiwgXCJiZWdpblwiLCBcImJpYXNcIiwgXCJieVwiLFxuICAgICAgICBcImNhbGNNb2RlXCIsIFwiY2FwLWhlaWdodFwiLCBcImNsaXBcIiwgXCJjbGFzc05hbWVcIiwgXCJjbGlwLXBhdGhcIiwgXCJjbGlwLXJ1bGVcIiwgXCJjbGlwUGF0aFVuaXRzXCIsIFwiY29sb3JcIiwgXCJjb2xvci1pbnRlcnBvbGF0aW9uXCIsIFwiY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzXCIsIFwiY29sb3ItcHJvZmlsZVwiLCBcImNvbG9yLXJlbmRlcmluZ1wiLCBcImNvbnRlbnRTY3JpcHRUeXBlXCIsIFwiY29udGVudFN0eWxlVHlwZVwiLCBcImNyb3Nzb3JpZ2luXCIsIFwiY3Vyc29yXCIsIFwiY3hcIiwgXCJjeVwiLFxuICAgICAgICBcImRcIiwgXCJkZWZhdWx0QWN0aW9uXCIsIFwiZGVzY2VudFwiLCBcImRpZmZ1c2VDb25zdGFudFwiLCBcImRpcmVjdGlvblwiLCBcImRpc3BsYXlcIiwgXCJkaXZpc29yXCIsIFwiZG9taW5hbnQtYmFzZWxpbmVcIiwgXCJkb3dubG9hZFwiLCBcImR1clwiLCBcImR4XCIsIFwiZHlcIixcbiAgICAgICAgXCJlZGdlTW9kZVwiLCBcImVkaXRhYmxlXCIsIFwiZWxldmF0aW9uXCIsIFwiZW5hYmxlLWJhY2tncm91bmRcIiwgXCJlbmRcIiwgXCJldmVudFwiLCBcImV4cG9uZW50XCIsIFwiZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZFwiLFxuICAgICAgICBcImZpbGxcIiwgXCJmaWxsLW9wYWNpdHlcIiwgXCJmaWxsLXJ1bGVcIiwgXCJmaWx0ZXJcIiwgXCJmaWx0ZXJSZXNcIiwgXCJmaWx0ZXJVbml0c1wiLCBcImZsb29kLWNvbG9yXCIsIFwiZmxvb2Qtb3BhY2l0eVwiLCBcImZvY3VzSGlnaGxpZ2h0XCIsIFwiZm9jdXNhYmxlXCIsIFwiZm9udC1mYW1pbHlcIiwgXCJmb250LXNpemVcIiwgXCJmb250LXNpemUtYWRqdXN0XCIsIFwiZm9udC1zdHJldGNoXCIsIFwiZm9udC1zdHlsZVwiLCBcImZvbnQtdmFyaWFudFwiLCBcImZvbnQtd2VpZ2h0XCIsIFwiZm9ybWF0XCIsIFwiZnJcIiwgXCJmcm9tXCIsIFwiZnhcIiwgXCJmeVwiLFxuICAgICAgICBcImcxXCIsIFwiZzJcIiwgXCJnbHlwaC1uYW1lXCIsIFwiZ2x5cGgtb3JpZW50YXRpb24taG9yaXpvbnRhbFwiLCBcImdseXBoLW9yaWVudGF0aW9uLXZlcnRpY2FsXCIsIFwiZ2x5cGhSZWZcIiwgXCJncmFkaWVudFRyYW5zZm9ybVwiLCBcImdyYWRpZW50VW5pdHNcIixcbiAgICAgICAgXCJoYW5kbGVyXCIsIFwiaGFuZ2luZ1wiLCBcImhhdGNoQ29udGVudFVuaXRzXCIsIFwiaGF0Y2hVbml0c1wiLCBcImhlaWdodFwiLCBcImhvcml6LWFkdi14XCIsIFwiaG9yaXotb3JpZ2luLXhcIiwgXCJob3Jpei1vcmlnaW4teVwiLCBcImhyZWZcIiwgXCJocmVmbGFuZ1wiLFxuICAgICAgICBcImlkZW9ncmFwaGljXCIsIFwiaW1hZ2UtcmVuZGVyaW5nXCIsIFwiaW5cIiwgXCJpbjJcIiwgXCJpbml0aWFsVmlzaWJpbGl0eVwiLCBcImludGVyY2VwdFwiLFxuICAgICAgICBcImtcIiwgXCJrMVwiLCBcImsyXCIsIFwiazNcIiwgXCJrNFwiLCBcImtlcm5lbE1hdHJpeFwiLCBcImtlcm5lbFVuaXRMZW5ndGhcIiwgXCJrZXJuaW5nXCIsIFwia2V5UG9pbnRzXCIsIFwia2V5U3BsaW5lc1wiLCBcImtleVRpbWVzXCIsXG4gICAgICAgIFwibGVuZ3RoQWRqdXN0XCIsIFwibGV0dGVyLXNwYWNpbmdcIiwgXCJsaWdodGluZy1jb2xvclwiLCBcImxpbWl0aW5nQ29uZUFuZ2xlXCIsIFwibG9jYWxcIixcbiAgICAgICAgXCJtYXJrZXItZW5kXCIsIFwibWFya2VyLW1pZFwiLCBcIm1hcmtlci1zdGFydFwiLCBcIm1hcmtlckhlaWdodFwiLCBcIm1hcmtlclVuaXRzXCIsIFwibWFya2VyV2lkdGhcIiwgXCJtYXNrXCIsIFwibWFza0NvbnRlbnRVbml0c1wiLCBcIm1hc2tVbml0c1wiLCBcIm1hdGhlbWF0aWNhbFwiLCBcIm1heFwiLCBcIm1lZGlhXCIsIFwibWVkaWFDaGFyYWN0ZXJFbmNvZGluZ1wiLCBcIm1lZGlhQ29udGVudEVuY29kaW5nc1wiLCBcIm1lZGlhU2l6ZVwiLCBcIm1lZGlhVGltZVwiLCBcIm1ldGhvZFwiLCBcIm1pblwiLCBcIm1vZGVcIixcbiAgICAgICAgXCJuYW1lXCIsIFwibmF2LWRvd25cIiwgXCJuYXYtZG93bi1sZWZ0XCIsIFwibmF2LWRvd24tcmlnaHRcIiwgXCJuYXYtbGVmdFwiLCBcIm5hdi1uZXh0XCIsIFwibmF2LXByZXZcIiwgXCJuYXYtcmlnaHRcIiwgXCJuYXYtdXBcIiwgXCJuYXYtdXAtbGVmdFwiLCBcIm5hdi11cC1yaWdodFwiLCBcIm51bU9jdGF2ZXNcIixcbiAgICAgICAgXCJvYnNlcnZlclwiLCBcIm9mZnNldFwiLCBcIm9wYWNpdHlcIiwgXCJvcGVyYXRvclwiLCBcIm9yZGVyXCIsIFwib3JpZW50XCIsIFwib3JpZW50YXRpb25cIiwgXCJvcmlnaW5cIiwgXCJvdmVyZmxvd1wiLCBcIm92ZXJsYXlcIiwgXCJvdmVybGluZS1wb3NpdGlvblwiLCBcIm92ZXJsaW5lLXRoaWNrbmVzc1wiLFxuICAgICAgICBcInBhbm9zZS0xXCIsIFwicGF0aFwiLCBcInBhdGhMZW5ndGhcIiwgXCJwYXR0ZXJuQ29udGVudFVuaXRzXCIsIFwicGF0dGVyblRyYW5zZm9ybVwiLCBcInBhdHRlcm5Vbml0c1wiLCBcInBoYXNlXCIsIFwicGl0Y2hcIiwgXCJwbGF5YmFja09yZGVyXCIsIFwicGxheWJhY2tvcmRlclwiLCBcInBvaW50ZXItZXZlbnRzXCIsIFwicG9pbnRzXCIsIFwicG9pbnRzQXRYXCIsIFwicG9pbnRzQXRZXCIsIFwicG9pbnRzQXRaXCIsIFwicHJlc2VydmVBbHBoYVwiLCBcInByZXNlcnZlQXNwZWN0UmF0aW9cIiwgXCJwcmltaXRpdmVVbml0c1wiLCBcInByb3BhZ2F0ZVwiLFxuICAgICAgICBcInJcIiwgXCJyYWRpdXNcIiwgXCJyZWZYXCIsIFwicmVmWVwiLCBcInJlbmRlcmluZy1pbnRlbnRcIiwgXCJyZXBlYXRDb3VudFwiLCBcInJlcGVhdER1clwiLCBcInJlcXVpcmVkRXh0ZW5zaW9uc1wiLCBcInJlcXVpcmVkRmVhdHVyZXNcIiwgXCJyZXF1aXJlZEZvbnRzXCIsIFwicmVxdWlyZWRGb3JtYXRzXCIsIFwicmVzdGFydFwiLCBcInJlc3VsdFwiLCBcInJvdGF0ZVwiLCBcInJ4XCIsIFwicnlcIixcbiAgICAgICAgXCJzY2FsZVwiLCBcInNlZWRcIiwgXCJzaGFwZS1yZW5kZXJpbmdcIiwgXCJzaWRlXCIsIFwic2xvcGVcIiwgXCJzbmFwc2hvdFRpbWVcIiwgXCJzcGFjaW5nXCIsIFwic3BlY3VsYXJDb25zdGFudFwiLCBcInNwZWN1bGFyRXhwb25lbnRcIiwgXCJzcHJlYWRNZXRob2RcIiwgXCJzcmNcIiwgXCJzdGFydE9mZnNldFwiLCBcInN0ZERldmlhdGlvblwiLCBcInN0ZW1oXCIsIFwic3RlbXZcIiwgXCJzdGl0Y2hUaWxlc1wiLCBcInN0b3AtY29sb3JcIiwgXCJzdG9wLW9wYWNpdHlcIiwgXCJzdHJpa2V0aHJvdWdoLXBvc2l0aW9uXCIsIFwic3RyaWtldGhyb3VnaC10aGlja25lc3NcIiwgXCJzdHJpbmdcIiwgXCJzdHJva2VcIiwgXCJzdHJva2UtZGFzaGFycmF5XCIsIFwic3Ryb2tlLWRhc2hvZmZzZXRcIiwgXCJzdHJva2UtbGluZWNhcFwiLCBcInN0cm9rZS1saW5lam9pblwiLCBcInN0cm9rZS1taXRlcmxpbWl0XCIsIFwic3Ryb2tlLW9wYWNpdHlcIiwgXCJzdHJva2Utd2lkdGhcIiwgXCJzdHlsZVwiLCBcInN1cmZhY2VTY2FsZVwiLCBcInN5bmNCZWhhdmlvclwiLCBcInN5bmNCZWhhdmlvckRlZmF1bHRcIiwgXCJzeW5jTWFzdGVyXCIsIFwic3luY1RvbGVyYW5jZVwiLCBcInN5bmNUb2xlcmFuY2VEZWZhdWx0XCIsIFwic3lzdGVtTGFuZ3VhZ2VcIixcbiAgICAgICAgXCJ0YWJsZVZhbHVlc1wiLCBcInRhcmdldFwiLCBcInRhcmdldFhcIiwgXCJ0YXJnZXRZXCIsIFwidGV4dC1hbmNob3JcIiwgXCJ0ZXh0LWRlY29yYXRpb25cIiwgXCJ0ZXh0LXJlbmRlcmluZ1wiLCBcInRleHRMZW5ndGhcIiwgXCJ0aW1lbGluZUJlZ2luXCIsIFwidGltZWxpbmViZWdpblwiLCBcInRpdGxlXCIsIFwidG9cIiwgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2Zvcm1CZWhhdmlvclwiLCBcInR5cGVcIixcbiAgICAgICAgXCJ1MVwiLCBcInUyXCIsIFwidW5kZXJsaW5lLXBvc2l0aW9uXCIsIFwidW5kZXJsaW5lLXRoaWNrbmVzc1wiLCBcInVuaWNvZGVcIiwgXCJ1bmljb2RlLWJpZGlcIiwgXCJ1bmljb2RlLXJhbmdlXCIsIFwidW5pdHMtcGVyLWVtXCIsXG4gICAgICAgIFwidi1hbHBoYWJldGljXCIsIFwidi1oYW5naW5nXCIsIFwidi1pZGVvZ3JhcGhpY1wiLCBcInYtbWF0aGVtYXRpY2FsXCIsIFwidmFsdWVzXCIsIFwidmVyc2lvblwiLCBcInZlcnQtYWR2LXlcIiwgXCJ2ZXJ0LW9yaWdpbi14XCIsIFwidmVydC1vcmlnaW4teVwiLCBcInZpZXdCb3hcIiwgXCJ2aWV3VGFyZ2V0XCIsIFwidmlzaWJpbGl0eVwiLFxuICAgICAgICBcIndpZHRoXCIsIFwid2lkdGhzXCIsIFwid29yZC1zcGFjaW5nXCIsIFwid3JpdGluZy1tb2RlXCIsXG4gICAgICAgIFwieFwiLCBcIngtaGVpZ2h0XCIsIFwieDFcIiwgXCJ4MlwiLCBcInhDaGFubmVsU2VsZWN0b3JcIixcbiAgICAgICAgXCJ5XCIsIFwieTFcIiwgXCJ5MlwiLCBcInlDaGFubmVsU2VsZWN0b3JcIixcbiAgICAgICAgXCJ6XCIsIFwiem9vbUFuZFBhblwiXG4gICAgICBdLFxuICAgICAgaHRtbEF0dHJpYnV0ZU5hbWVzID0gW1xuICAgICAgICBcImFjY2VwdFwiLCBcImFjY2VwdENoYXJzZXRcIiwgXCJhY2Nlc3NLZXlcIiwgXCJhY3Rpb25cIiwgXCJhbGxvd1wiLCBcImFsbG93RnVsbFNjcmVlblwiLCBcImFsbG93VHJhbnNwYXJlbmN5XCIsIFwiYWx0XCIsIFwiYXN5bmNcIiwgXCJhdXRvQ29tcGxldGVcIiwgXCJhdXRvRm9jdXNcIiwgXCJhdXRvUGxheVwiLFxuICAgICAgICBcImNhcHR1cmVcIiwgXCJjZWxsUGFkZGluZ1wiLCBcImNlbGxTcGFjaW5nXCIsIFwiY2hhbGxlbmdlXCIsIFwiY2hhclNldFwiLCBcImNoZWNrZWRcIiwgXCJjaXRlXCIsIFwiY2xhc3NJRFwiLCBcImNsYXNzTmFtZVwiLCBcImNvbFNwYW5cIiwgXCJjb2xzXCIsIFwiY29udGVudFwiLCBcImNvbnRlbnRFZGl0YWJsZVwiLCBcImNvbnRleHRNZW51XCIsIFwiY29udHJvbHNcIiwgXCJjb29yZHNcIiwgXCJjcm9zc09yaWdpblwiLFxuICAgICAgICBcImRhdGFcIiwgXCJkYXRlVGltZVwiLCBcImRlZmF1bHRcIiwgXCJkZWZlclwiLCBcImRpclwiLCBcImRpc2FibGVkXCIsIFwiZG93bmxvYWRcIiwgXCJkcmFnZ2FibGVcIixcbiAgICAgICAgXCJlbmNUeXBlXCIsXG4gICAgICAgIFwiZm9ybVwiLCBcImZvcm1BY3Rpb25cIiwgXCJmb3JtRW5jVHlwZVwiLCBcImZvcm1NZXRob2RcIiwgXCJmb3JtTm9WYWxpZGF0ZVwiLCBcImZvcm1UYXJnZXRcIiwgXCJmcmFtZUJvcmRlclwiLFxuICAgICAgICBcImhlYWRlcnNcIiwgXCJoZWlnaHRcIiwgXCJoaWRkZW5cIiwgXCJoaWdoXCIsIFwiaHJlZlwiLCBcImhyZWZMYW5nXCIsIFwiaHRtbEZvclwiLCBcImh0dHBFcXVpdlwiLFxuICAgICAgICBcImljb25cIiwgXCJpZFwiLCBcImlucHV0TW9kZVwiLCBcImludGVncml0eVwiLCBcImlzXCIsXG4gICAgICAgIFwia2V5UGFyYW1zXCIsIFwia2V5VHlwZVwiLCBcImtpbmRcIixcbiAgICAgICAgXCJsYWJlbFwiLCBcImxhbmdcIiwgXCJsaXN0XCIsIFwibG9vcFwiLCBcImxvd1wiLFxuICAgICAgICBcIm1hbmlmZXN0XCIsIFwibWFyZ2luSGVpZ2h0XCIsIFwibWFyZ2luV2lkdGhcIiwgXCJtYXhcIiwgXCJtYXhMZW5ndGhcIiwgXCJtZWRpYVwiLCBcIm1lZGlhR3JvdXBcIiwgXCJtZXRob2RcIiwgXCJtaW5cIiwgXCJtaW5MZW5ndGhcIiwgXCJtdWx0aXBsZVwiLCBcIm11dGVkXCIsXG4gICAgICAgIFwibmFtZVwiLCBcIm5vVmFsaWRhdGVcIiwgXCJub25jZVwiLFxuICAgICAgICBcIm9wZW5cIiwgXCJvcHRpbXVtXCIsXG4gICAgICAgIFwicGF0dGVyblwiLCBcInBsYWNlaG9sZGVyXCIsIFwicG9zdGVyXCIsIFwicHJlbG9hZFwiLCBcInByb2ZpbGVcIixcbiAgICAgICAgXCJyYWRpb0dyb3VwXCIsIFwicmVhZE9ubHlcIiwgXCJyZWxcIiwgXCJyZXF1aXJlZFwiLCBcInJldmVyc2VkXCIsIFwicm9sZVwiLCBcInJvd1NwYW5cIiwgXCJyb3dzXCIsXG4gICAgICAgIFwic2FuZGJveFwiLCBcInNjb3BlXCIsIFwic2NvcGVkXCIsIFwic2Nyb2xsaW5nXCIsIFwic2VhbWxlc3NcIiwgXCJzZWxlY3RlZFwiLCBcInNoYXBlXCIsIFwic2l6ZVwiLCBcInNpemVzXCIsIFwic3BhblwiLCBcInNwZWxsQ2hlY2tcIiwgXCJzcmNcIiwgXCJzcmNEb2NcIiwgXCJzcmNMYW5nXCIsIFwic3JjU2V0XCIsIFwic3RhcnRcIiwgXCJzdGVwXCIsIFwic3R5bGVcIiwgXCJzdW1tYXJ5XCIsXG4gICAgICAgIFwidGFiSW5kZXhcIiwgXCJ0YXJnZXRcIiwgXCJ0aXRsZVwiLCBcInR5cGVcIixcbiAgICAgICAgXCJ1c2VNYXBcIixcbiAgICAgICAgXCJ2YWx1ZVwiLFxuICAgICAgICBcIndpZHRoXCIsXG4gICAgICAgIFwid21vZGVcIixcbiAgICAgICAgXCJ3cmFwXCJcbiAgICAgIF07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbWJpbmUodGFyZ2V0T2JqZWN0LCBzb3VyY2VPYmplY3QgPSB7fSkge1xuICBjb25zdCBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlT2JqZWN0KTtcblxuICBzb3VyY2VLZXlzLmZvckVhY2goKHNvdXJjZUtleSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldFByb3BlcnR5ID0gdGFyZ2V0T2JqZWN0W3NvdXJjZUtleV0sXG4gICAgICAgICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2VPYmplY3Rbc291cmNlS2V5XTtcblxuICAgIHRhcmdldE9iamVjdFtzb3VyY2VLZXldID0gdGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KHNvdXJjZUtleSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGAke3RhcmdldFByb3BlcnR5fSAke3NvdXJjZVByb3BlcnR5fWAgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVByb3BlcnR5O1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBydW5lKHRhcmdldE9iamVjdCwgc291cmNlS2V5cykge1xuICBzb3VyY2VLZXlzLmZvckVhY2goKHNvdXJjZUtleSkgPT4ge1xuICAgIGlmICh0YXJnZXRPYmplY3QuaGFzT3duUHJvcGVydHkoc291cmNlS2V5KSkge1xuICAgICAgZGVsZXRlIHRhcmdldE9iamVjdFtzb3VyY2VLZXldO1xuICAgIH1cbiAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgb25DbGljaywgb2ZmQ2xpY2sgfSBmcm9tIFwiLi9taXhpbnMvY2xpY2tcIjtcbmltcG9ydCB7IG9uUmVzaXplLCBvZmZSZXNpemUgfSBmcm9tIFwiLi9taXhpbnMvcmVzaXplXCI7XG5pbXBvcnQgeyBvbktleVVwLCBvZmZLZXlVcCwgb25LZXlEb3duLCBvZmZLZXlEb3duIH0gZnJvbSBcIi4vbWl4aW5zL2tleVwiO1xuaW1wb3J0IHsgb24sIG9mZiwgYWRkRXZlbnRMaXN0ZW5lciwgZmluZEV2ZW50TGlzdGVuZXIsIGZpbmRFdmVudExpc3RlbmVycywgcmVtb3ZlRXZlbnRMaXN0ZW5lciB9IGZyb20gXCIuL21peGlucy9ldmVudFwiO1xuaW1wb3J0IHsgb25Nb3VzZVVwLCBvbk1vdXNlRG93biwgb25Nb3VzZU92ZXIsIG9uTW91c2VPdXQsIG9uTW91c2VNb3ZlLCBvZmZNb3VzZVVwLCBvZmZNb3VzZURvd24sIG9mZk1vdXNlT3Zlciwgb2ZmTW91c2VPdXQsIG9mZk1vdXNlTW92ZSB9IGZyb20gXCIuL21peGlucy9tb3VzZVwiO1xuXG5jbGFzcyBXaW5kb3cge1xuICBvbiA9IG9uO1xuICBvZmYgPSBvZmY7XG5cbiAgb25DbGljayA9IG9uQ2xpY2s7XG4gIG9mZkNsaWNrID0gb2ZmQ2xpY2s7XG5cbiAgb25SZXNpemUgPSBvblJlc2l6ZTtcbiAgb2ZmUmVzaXplID0gb2ZmUmVzaXplO1xuICBhZGRSZXNpemVPYmplY3QgPSBhZGRSZXNpemVPYmplY3Q7XG4gIHJlbW92ZVJlc2l6ZU9iamVjdCA9IHJlbW92ZVJlc2l6ZU9iamVjdDtcblxuICBvbktleVVwID0gb25LZXlVcDtcbiAgb2ZmS2V5VXAgPSBvZmZLZXlVcDtcbiAgb25LZXlEb3duID0gb25LZXlEb3duO1xuICBvZmZLZXlEb3duID0gb2ZmS2V5RG93bjtcblxuICBvbk1vdXNlVXAgPSBvbk1vdXNlVXA7XG4gIG9uTW91c2VEb3duID0gb25Nb3VzZURvd247XG4gIG9uTW91c2VPdmVyID0gb25Nb3VzZU92ZXI7XG4gIG9uTW91c2VPdXQgPSBvbk1vdXNlT3V0O1xuICBvbk1vdXNlTW92ZSA9IG9uTW91c2VNb3ZlO1xuICBvZmZNb3VzZVVwID0gb2ZmTW91c2VVcDtcbiAgb2ZmTW91c2VEb3duID0gb2ZmTW91c2VEb3duO1xuICBvZmZNb3VzZU92ZXIgPSBvZmZNb3VzZU92ZXI7XG4gIG9mZk1vdXNlT3V0ID0gb2ZmTW91c2VPdXQ7XG4gIG9mZk1vdXNlTW92ZSA9IG9mZk1vdXNlTW92ZTtcblxuICBhZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lcjtcbiAgZmluZEV2ZW50TGlzdGVuZXIgPSBmaW5kRXZlbnRMaXN0ZW5lcjtcbiAgZmluZEV2ZW50TGlzdGVuZXJzID0gZmluZEV2ZW50TGlzdGVuZXJzO1xuICByZW1vdmVFdmVudExpc3RlbmVyID0gcmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSB3aW5kb3c7IC8vL1xuICB9XG5cbiAgYXNzaWduKC4uLnNvdXJjZXMpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRvbUVsZW1lbnQ7IC8vL1xuXG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpO1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJXaWR0aDsgfSAvLy9cbiAgXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5pbm5lckhlaWdodDsgfSAvLy9cblxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVlPZmZzZXQ7IH0gIC8vL1xuXG4gIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVhPZmZzZXQ7IH0gLy8vXG59XG5cbmV4cG9ydCBkZWZhdWx0ICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSA/IHVuZGVmaW5lZCA6IG5ldyBXaW5kb3coKTsgIC8vL1xuXG5mdW5jdGlvbiBhZGRSZXNpemVPYmplY3QoKSB7fSAvLy9cblxuZnVuY3Rpb24gcmVtb3ZlUmVzaXplT2JqZWN0KCkge30gLy8vXG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0IGNvbnN0IFRSQUNFID0gXCJUUkFDRVwiO1xuZXhwb3J0IGNvbnN0IERFQlVHID0gXCJERUJVR1wiO1xuZXhwb3J0IGNvbnN0IElORk8gPSBcIklORk9cIjtcbmV4cG9ydCBjb25zdCBXQVJOSU5HID0gXCJXQVJOSU5HXCI7XG5leHBvcnQgY29uc3QgRVJST1IgPSBcIkVSUk9SXCI7XG5leHBvcnQgY29uc3QgRkFUQUwgPSBcIkZBVEFMXCI7XG5leHBvcnQgY29uc3QgREVGQVVMVF9MT0dfTEVWRUwgPSBXQVJOSU5HO1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HX0RJUkVDVE9SWV9QQVRIID0gbnVsbDtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0xPR19GSUxFX0JBU0VfTkFNRSA9IFwiZGVmYXVsdFwiO1xuXG5leHBvcnQgY29uc3QgR0VUX01FVEhPRCA9IFwiR0VUXCI7XG5leHBvcnQgY29uc3QgUE9TVF9NRVRIT0QgPSBcIlBPU1RcIjtcbmV4cG9ydCBjb25zdCBBUFBMSUNBVElPTl9KU09OX0NIQVJTRVRfVVRGOF9DT05URU5UX1RZUEUgPSBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD1VVEYtOFwiO1xuXG5leHBvcnQgY29uc3QgREFUQV9FVkVOVCA9IFwiZGF0YVwiO1xuZXhwb3J0IGNvbnN0IFVURjhfRU5DT0RJTkcgPSBcInV0ZjhcIjtcblxuZXhwb3J0IGNvbnN0IENUUkxfQyA9IFwiXkNcIjtcbmV4cG9ydCBjb25zdCBFVFhfQ0hBUkFDVEVSID0gXCJcXHUwMDAzXCI7XG5leHBvcnQgY29uc3QgQkFDS1NQQUNFX0NIQVJBQ1RFUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMTI3KTtcbmV4cG9ydCBjb25zdCBMSU5FX0ZFRURfQ0hBUkFDVEVSID0gXCJcXG5cIjtcbmV4cG9ydCBjb25zdCBDQVJSSUFHRV9SRVRVUk5fQ0hBUkFDVEVSID0gXCJcXHJcIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUkNfQkFTRV9FWFRFTlNJT04gPSBcIlwiOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgeyBkZWZhdWx0IGFzIHBhdGhVdGlsaXRpZXMgfSBmcm9tIFwiLi91dGlsaXRpZXMvcGF0aFwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBhcnJheVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy9hcnJheVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyB0ZW1wbGF0ZVV0aWxpdGllcyB9IGZyb20gXCIuL3V0aWxpdGllcy90ZW1wbGF0ZVwiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL2ZpbGVTeXN0ZW1cIjtcbmV4cG9ydCB7IGRlZmF1bHQgYXMgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL2FzeW5jaHJvbm91c1wiO1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBtaXNjZWxsYW5lb3VzVXRpbGl0aWVzIH0gZnJvbSBcIi4vdXRpbGl0aWVzL21pc2NlbGxhbmVvdXNcIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdO31cblxuZXhwb3J0IGZ1bmN0aW9uIHNlY29uZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMV07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHRoaXJkKGFycmF5KSB7IHJldHVybiBhcnJheVsyXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZm91cnRoKGFycmF5KSB7IHJldHVybiBhcnJheVszXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gZmlmdGgoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzRdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWZ0aExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDVdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3VydGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA0XTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdGhpcmRMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAzXTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gc2Vjb25kTGFzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbYXJyYXkubGVuZ3RoIC0gMl07IH1cblxuZXhwb3J0IGZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiB0YWlsKGFycmF5KSB7IHJldHVybiBhcnJheS5zbGljZSgxKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gcHVzaChhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuc2hpZnQoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQoYXJyYXkxLCBlbGVtZW50T3JBcnJheTIpIHtcbiAgY29uc3QgYXJyYXkyID0gKGVsZW1lbnRPckFycmF5MiBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRPckFycmF5MiA6XG4gICAgICAgICAgICAgICAgICAgICBbZWxlbWVudE9yQXJyYXkyXTtcbiAgXG4gIHB1c2goYXJyYXkxLCBhcnJheTIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoYXJyYXkpIHtcbiAgY29uc3Qgc3RhcnQgPSAwO1xuICBcbiAgcmV0dXJuIGFycmF5LnNwbGljZShzdGFydCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gMCxcbiAgICAgICAgZGVsZXRlQ291bnQgPSBhcnJheTIubGVuZ3RoOyAgLy8vXG4gIFxuICBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5Mik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZShhcnJheTEsIGFycmF5MikgeyBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShhcnJheTEsIGFycmF5Mik7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHNwbGljZShhcnJheTEsIHN0YXJ0LCBkZWxldGVDb3VudCA9IEluZmluaXR5LCBhcnJheTIgPSBbXSkge1xuICBjb25zdCBhcmdzID0gW3N0YXJ0LCBkZWxldGVDb3VudCwgLi4uYXJyYXkyXSxcbiAgICAgICAgZGVsZXRlZEl0ZW1zQXJyYXkgPSBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KGFycmF5MSwgYXJncyk7XG5cbiAgcmV0dXJuIGRlbGV0ZWRJdGVtc0FycmF5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVwbGFjZShhcnJheSwgZWxlbWVudCwgdGVzdCkge1xuICBsZXQgc3RhcnQgPSAtMTtcbiAgXG4gIGNvbnN0IGZvdW5kID0gYXJyYXkuc29tZSgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHN0YXJ0ID0gaW5kZXg7ICAvLy9cbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIGlmIChmb3VuZCkge1xuICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKGFycmF5LCB0ZXN0KSB7XG4gIGNvbnN0IGZpbHRlcmVkRWxlbWVudHMgPSBbXTtcbiAgXG4gIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKCFwYXNzZWQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMSxcbiAgICAgICAgICAgIGRlbGV0ZWRFbGVtZW50cyA9IGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpLFxuICAgICAgICAgICAgZmlyc3REZWxldGVkRWxlbWVudCA9IGZpcnN0KGRlbGV0ZWRFbGVtZW50cyk7XG4gICAgICBcbiAgICAgIGZpbHRlcmVkRWxlbWVudHMudW5zaGlmdChmaXJzdERlbGV0ZWRFbGVtZW50KTsgIC8vL1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZmlsdGVyZWRFbGVtZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmQoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goYXJyYXksIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgaWYgKHBhc3NlZCkge1xuICAgICAgZWxlbWVudHMucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBydW5lKGFycmF5LCB0ZXN0KSB7XG4gIGxldCBwcnVuZWRFbGVtZW50ID0gdW5kZWZpbmVkO1xuICBcbiAgYXJyYXkuc29tZSgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgICBkZWxldGVkRWxlbWVudHMgPSBhcnJheS5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KSxcbiAgICAgICAgICAgIGZpcnN0RGVsZXRlZEVsZW1lbnQgPSBmaXJzdChkZWxldGVkRWxlbWVudHMpO1xuICAgICAgXG4gICAgICBwcnVuZWRFbGVtZW50ID0gZmlyc3REZWxldGVkRWxlbWVudDsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIHBydW5lZEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRjaChhcnJheSwgZWxlbWVudCwgdGVzdCkge1xuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0pO1xuXG5cbiAgaWYgKGZvdW5kKSB7XG4gICAgYXJyYXkucHVzaChlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBmb3VuZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGF1Z21lbnQoYXJyYXkxLCBhcnJheTIsIHRlc3QpIHtcbiAgYXJyYXkyLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VwYXJhdGUoYXJyYXksIGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5LmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBwYXNzZWQgP1xuICAgICAgYXJyYXkxLnB1c2goZWxlbWVudCkgOlxuICAgICAgICBhcnJheTIucHVzaChlbGVtZW50KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICAgIFxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0V2ZXJ5KGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNFdmVyeShhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaW5kZXggPSBhcnJheUxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc1JlZHVjZShhcnJheSwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgZm9yd2FyZHNGb3JFYWNoKGFycmF5LCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICB2YWx1ZSA9IGNhbGxiYWNrKHZhbHVlLCBlbGVtZW50LCBpbmRleCk7XG4gIH0pO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc1JlZHVjZShhcnJheSwgY2FsbGJhY2ssIGluaXRpYWxWYWx1ZSkge1xuICBsZXQgdmFsdWUgPSBpbml0aWFsVmFsdWU7XG5cbiAgYmFja3dhcmRzRm9yRWFjaChhcnJheSwgKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgdmFsdWUgPSBjYWxsYmFjayh2YWx1ZSwgZWxlbWVudCwgaW5kZXgpO1xuICB9KTtcblxuICByZXR1cm4gdmFsdWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XG5cbiAgICBjYWxsYmFjayhlbGVtZW50LCBpbmRleCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAobGV0IGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgIGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZpcnN0LFxuICBzZWNvbmQsXG4gIHRoaXJkLFxuICBmb3VydGgsXG4gIGZpZnRoLFxuICBmaWZ0aExhc3QsXG4gIGZvdXJ0aExhc3QsXG4gIHRoaXJkTGFzdCxcbiAgc2Vjb25kTGFzdCxcbiAgbGFzdCxcbiAgdGFpbCxcbiAgcHVzaCxcbiAgdW5zaGlmdCxcbiAgY29uY2F0LFxuICBjbGVhcixcbiAgY29weSxcbiAgbWVyZ2UsXG4gIHNwbGljZSxcbiAgcmVwbGFjZSxcbiAgZmlsdGVyLFxuICBmaW5kLFxuICBwcnVuZSxcbiAgcGF0Y2gsXG4gIGF1Z21lbnQsXG4gIHNlcGFyYXRlLFxuICBmb3J3YXJkc1NvbWUsXG4gIGJhY2t3YXJkc1NvbWUsXG4gIGZvcndhcmRzRXZlcnksXG4gIGJhY2t3YXJkc0V2ZXJ5LFxuICBmb3J3YXJkc1JlZHVjZSxcbiAgYmFja3dhcmRzUmVkdWNlLFxuICBmb3J3YXJkc0ZvckVhY2gsXG4gIGJhY2t3YXJkc0ZvckVhY2hcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB3aGlsc3QoY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBsZXQgY291bnQgPSAtMTtcclxuXHJcbiAgZnVuY3Rpb24gbmV4dCgpIHtcclxuICAgIGNvdW50Kys7XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgdGVybWluYXRlID0gY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZm9yRWFjaChhcnJheSwgY2FsbGJhY2ssIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcclxuXHJcbiAgICAgIGNhbGxiYWNrKGVsZW1lbnQsIG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHQoKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbmNlKGNhbGxiYWNrcywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGNhbGxiYWNrcy5sZW5ndGg7ICAvLy9cclxuXHJcbiAgbGV0IGNvdW50ID0gLTE7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGluZGV4ID0gY291bnQsICAvLy9cclxuICAgICAgICAgICAgY2FsbGJhY2sgPSBjYWxsYmFja3NbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2sobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXZlbnR1YWxseShjYWxsYmFja3MsIGRvbmUsIGNvbnRleHQpIHtcclxuICBjb25zdCBsZW5ndGggPSBjYWxsYmFja3MubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaywgaW5kZXgpID0+IHtcclxuICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlcGVhdGVkbHkoY2FsbGJhY2ssIGxlbmd0aCwgZG9uZSwgY29udGV4dCkge1xyXG4gIGxldCBjb3VudCA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudCsrO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gbGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcclxuICAgIGNhbGxiYWNrKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyAgLy8vXHJcblxyXG4gIGxldCBjb3VudCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgY291bnQrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoY291bnQgPT09IGxlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBpbmRleCA9IGNvdW50LCAgLy8vXHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBiYWNrd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgIC8vL1xyXG5cclxuICBsZXQgY291bnQgPSBsZW5ndGg7XHJcblxyXG4gIGZ1bmN0aW9uIG5leHQoKSB7XHJcbiAgICBjb3VudC0tO1xyXG5cclxuICAgIGNvbnN0IHRlcm1pbmF0ZSA9IChjb3VudCA9PT0gLTEpO1xyXG5cclxuICAgIGlmICh0ZXJtaW5hdGUpIHtcclxuICAgICAgZG9uZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgaW5kZXggPSBjb3VudCwgIC8vL1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xyXG5cclxuICAgICAgY2FsbGJhY2soZWxlbWVudCwgbmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dCgpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgd2hpbHN0LFxyXG4gIGZvckVhY2gsXHJcbiAgc2VxdWVuY2UsXHJcbiAgZXZlbnR1YWxseSxcclxuICByZXBlYXRlZGx5LFxyXG4gIGZvcndhcmRzRm9yRWFjaCxcclxuICBiYWNrd2FyZHNGb3JFYWNoXHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgZnMgZnJvbSBcImZzXCI7XG5cbmltcG9ydCB7IFVURjhfRU5DT0RJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGggfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3BhdGhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKSB7XG4gIGNvbnN0IGVudHJ5RXhpc3RzID0gZnMuZXhpc3RzU3luYyhlbnRyeVBhdGgpO1xuXG4gIHJldHVybiBlbnRyeUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRmlsZUV4aXN0cyhmaWxlUGF0aCkge1xuICBsZXQgZmlsZUV4aXN0cyA9IGZhbHNlO1xuICBcbiAgY29uc3QgZW50cnlQYXRoID0gZmlsZVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKTtcbiAgXG4gIGlmIChlbnRyeUV4aXN0cykge1xuICAgIGNvbnN0IGVudHJ5RmlsZSA9IGlzRW50cnlGaWxlKGVudHJ5UGF0aCk7XG4gICAgXG4gICAgaWYgKGVudHJ5RmlsZSkge1xuICAgICAgZmlsZUV4aXN0cyA9IHRydWU7XG4gICAgfVxuICB9XG4gIFxuICByZXR1cm4gZmlsZUV4aXN0cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRGlyZWN0b3J5RXhpc3RzKGRpcmVjdG9yeVBhdGgpIHtcbiAgbGV0IGRpcmVjdG9yeUV4aXN0cyA9IGZhbHNlO1xuXG4gIGNvbnN0IGVudHJ5UGF0aCA9IGRpcmVjdG9yeVBhdGgsIC8vL1xuICAgICAgICBlbnRyeUV4aXN0cyA9IGNoZWNrRW50cnlFeGlzdHMoZW50cnlQYXRoKTtcblxuICBpZiAoZW50cnlFeGlzdHMpIHtcbiAgICBjb25zdCBlbnRyeURpcmVjdG9yeSA9IGlzRW50cnlEaXJlY3RvcnkoZW50cnlQYXRoKTtcblxuICAgIGlmIChlbnRyeURpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5RXhpc3RzID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGlyZWN0b3J5RXhpc3RzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFbnRyeUZpbGUoZW50cnlQYXRoKSB7XG4gIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhlbnRyeVBhdGgpLFxuICAgICAgICBlbnRyeURpcmVjdG9yeSA9IHN0YXQuaXNEaXJlY3RvcnkoKSxcbiAgICAgICAgZW50cnlGaWxlID0gIWVudHJ5RGlyZWN0b3J5O1xuXG4gIHJldHVybiBlbnRyeUZpbGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VudHJ5RGlyZWN0b3J5KGVudHJ5UGF0aCkge1xuICBjb25zdCBzdGF0ID0gZnMuc3RhdFN5bmMoZW50cnlQYXRoKSxcbiAgICAgICAgZW50cnlEaXJlY3RvcnkgPSBzdGF0LmlzRGlyZWN0b3J5KCk7XG5cbiAgcmV0dXJuIGVudHJ5RGlyZWN0b3J5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaXJlY3RvcnlFbXB0eShkaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IHN1YkVudHJ5TmFtZXMgPSByZWFkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpLFxuICAgICAgICBzdWJFbnRyeU5hbWVzTGVuZ3RoID0gc3ViRW50cnlOYW1lcy5sZW5ndGgsXG4gICAgICAgIGRpcmVjdG9yeUVtcHR5ID0gKHN1YkVudHJ5TmFtZXNMZW5ndGggPT09IDApO1xuXG4gIHJldHVybiBkaXJlY3RvcnlFbXB0eTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICBjb25zdCBzdWJFbnRyeU5hbWVzID0gZnMucmVhZGRpclN5bmMoZGlyZWN0b3J5UGF0aCk7XG5cbiAgcmV0dXJuIHN1YkVudHJ5TmFtZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkRmlsZShmaWxlUGF0aCwgZW5jb2RpbmcgPSBVVEY4X0VOQ09ESU5HKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfSxcbiAgICAgICAgY29udGVudCA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aCwgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZUZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpIHtcbiAgZnMud3JpdGVGaWxlU3luYyhmaWxlUGF0aCwgY29udGVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRUb0ZpbGUoZmlsZVBhdGgsIGNvbnRlbnQpIHtcbiAgZnMuYXBwZW5kRmlsZVN5bmMoZmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpIHtcbiAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICBpZiAoKGRpcmVjdG9yeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgIT09IFwiLlwiKSAmJiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSAhPT0gbnVsbCkpIHtcbiAgICBjb25zdCBwYXJlbnREaXJlY3RvcnlQYXRoID0gZGlyZWN0b3J5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSwgIC8vL1xuICAgICAgICAgIHBhcmVudERpcmVjdG9yeUV4aXN0cyA9IGNoZWNrRGlyZWN0b3J5RXhpc3RzKHBhcmVudERpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKCFwYXJlbnREaXJlY3RvcnlFeGlzdHMpIHtcbiAgICAgIGNyZWF0ZURpcmVjdG9yeShwYXJlbnREaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBmcy5ta2RpclN5bmMoZGlyZWN0b3J5UGF0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5hbWVGaWxlKG9sZEZpbGVQYXRoLCBuZXdGaWxlUGF0aCkge1xuICBmcy5yZW5hbWVTeW5jKG9sZEZpbGVQYXRoLCBuZXdGaWxlUGF0aCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0cyhmaWxlUGF0aCkge1xuICByZXR1cm4gZnMuc3RhdFN5bmMoZmlsZVBhdGgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGNoZWNrRW50cnlFeGlzdHMsXG4gIGNoZWNrRmlsZUV4aXN0cyxcbiAgY2hlY2tEaXJlY3RvcnlFeGlzdHMsXG4gIGlzRW50cnlGaWxlLFxuICBpc0VudHJ5RGlyZWN0b3J5LFxuICBpc0RpcmVjdG9yeUVtcHR5LFxuICByZWFkRGlyZWN0b3J5LFxuICByZWFkRmlsZSxcbiAgd3JpdGVGaWxlLFxuICBhcHBlbmRUb0ZpbGUsXG4gIGNyZWF0ZURpcmVjdG9yeSxcbiAgcmVuYW1lRmlsZSxcbiAgZ2V0U3RhdHNcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHJjIGZyb20gXCIuL21pc2NlbGxhbmVvdXMvcmNcIjtcbmltcG9ydCBsb2cgZnJvbSBcIi4vbWlzY2VsbGFuZW91cy9sb2dcIjtcbmltcG9ydCBvbkVUWCBmcm9tIFwiLi9taXNjZWxsYW5lb3VzL29uRVRYXCI7XG5pbXBvcnQgcHJvbXB0IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvcHJvbXB0XCI7XG5cbmltcG9ydCB7IGdldCwgcG9zdCB9IGZyb20gXCIuL21pc2NlbGxhbmVvdXMvYWpheFwiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGxvZyxcbiAgcmMsXG4gIGdldCxcbiAgcG9zdCxcbiAgb25FVFgsXG4gIHByb21wdFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBHRVRfTUVUSE9ELCBQT1NUX01FVEhPRCwgQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0KGhvc3QsIHVyaSwgcGFyYW1ldGVycywgY2FsbGJhY2spIHtcbiAgaWYgKGNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICBjYWxsYmFjayA9IHBhcmFtZXRlcnM7IC8vL1xuICAgIHBhcmFtZXRlcnMgPSB7fTtcbiAgfVxuXG4gIGNvbnN0IG1ldGhvZCA9IEdFVF9NRVRIT0QsXG4gICAgICAgIGJvZHkgPSB1bmRlZmluZWQ7XG5cbiAgcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdChob3N0LCB1cmksIGpzb24sIHBhcmFtZXRlcnMsIGNhbGxiYWNrKSB7XG4gIGlmIChjYWxsYmFjayA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2FsbGJhY2sgPSBwYXJhbWV0ZXJzOyAvLy9cbiAgICBwYXJhbWV0ZXJzID0ge307XG4gIH1cblxuICBjb25zdCBtZXRob2QgPSBQT1NUX01FVEhPRCxcbiAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KGpzb24pO1xuXG4gIHJlcXVlc3QoaG9zdCwgdXJpLCBwYXJhbWV0ZXJzLCBtZXRob2QsIGJvZHksIGNhbGxiYWNrKTtcbn1cblxuZnVuY3Rpb24gcmVxdWVzdChob3N0LCB1cmksIHBhcmFtZXRlcnMsIG1ldGhvZCwgYm9keSwgY2FsbGJhY2spIHtcbiAgY29uc3QgdXJsID0gdXJsRnJvbUhvc3RVUklBbmRQYXJhbWV0ZXJzKGhvc3QsIHVyaSwgcGFyYW1ldGVycyksXG4gICAgICAgIHhtbEh0dHBSZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgeG1sSHR0cFJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcmVhZHlTdGF0ZSwgc3RhdHVzLCByZXNwb25zZVRleHQgfSA9IHhtbEh0dHBSZXF1ZXN0O1xuXG4gICAgaWYgKHJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgbGV0IGpzb24gPSBudWxsO1xuXG4gICAgICBpZiAoc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjb25zdCBqc29uU3RyaW5nID0gcmVzcG9uc2VUZXh0OyAvLy9cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIC8vL1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2soanNvbik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGNvbnRlbnRUeXBlID0gQVBQTElDQVRJT05fSlNPTl9DSEFSU0VUX1VURjhfQ09OVEVOVF9UWVBFO1xuXG4gIHhtbEh0dHBSZXF1ZXN0Lm9wZW4obWV0aG9kLCB1cmwpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoXCJjb250ZW50LXR5cGVcIiwgY29udGVudFR5cGUpO1xuXG4gIHhtbEh0dHBSZXF1ZXN0LnNlbmQoYm9keSk7XG59XG5cbmZ1bmN0aW9uIHF1ZXJ5U3RyaW5nRnJvbVBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLFxuICAgICAgICBuYW1lc0xlbmd0aCA9IG5hbWVzLmxlbmd0aCxcbiAgICAgICAgbGFzdEluZGV4ID0gbmFtZXNMZW5ndGggLSAxLFxuICAgICAgICBxdWVyeVN0cmluZyA9IG5hbWVzLnJlZHVjZSgocXVlcnlTdHJpbmcsIG5hbWUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBwYXJhbWV0ZXJzW25hbWVdLFxuICAgICAgICAgICAgICAgIGVuY29kZWROYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpLFxuICAgICAgICAgICAgICAgIGVuY29kZWRWYWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSksXG4gICAgICAgICAgICAgICAgYW1wZXJzYW5kT3JOb3RoaW5nID0gKGluZGV4ICE9PSBsYXN0SW5kZXgpID8gXCImXCIgOiBcIlwiO1xuICBcbiAgICAgICAgICBxdWVyeVN0cmluZyArPSBgJHtlbmNvZGVkTmFtZX09JHtlbmNvZGVkVmFsdWV9JHthbXBlcnNhbmRPck5vdGhpbmd9YDtcbiAgXG4gICAgICAgICAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xuICAgICAgICB9LCBcIlwiKTtcblxuICByZXR1cm4gcXVlcnlTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHVybEZyb21Ib3N0VVJJQW5kUGFyYW1ldGVycyhob3N0LCB1cmksIHBhcmFtZXRlcnMpIHtcbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZ0Zyb21QYXJhbWV0ZXJzKHBhcmFtZXRlcnMpLFxuICAgICAgICB1cmwgPSAocXVlcnlTdHJpbmcgPT09IFwiXCIpID9cbiAgICAgICAgICAgICAgYCR7aG9zdH0ke3VyaX1gIDpcbiAgICAgICAgICAgICAgICBgJHtob3N0fSR7dXJpfT8ke3F1ZXJ5U3RyaW5nfWA7XG5cbiAgcmV0dXJuIHVybDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuXG5pbXBvcnQgeyBzZWNvbmQgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBjb25jYXRlbmF0ZVBhdGhzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9wYXRoXCI7XG5pbXBvcnQgeyBjaGVja0ZpbGVFeGlzdHMsIHJlYWRGaWxlLCBhcHBlbmRUb0ZpbGUsIHJlbmFtZUZpbGUsIGdldFN0YXRzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5pbXBvcnQgeyBUUkFDRSwgREVCVUcsIElORk8sIFdBUk5JTkcsIEVSUk9SLCBGQVRBTCwgREVGQVVMVF9MT0dfTEVWRUwsIERFRkFVTFRfTE9HX0ZJTEVfQkFTRV9OQU1FLCBERUZBVUxUX0xPR19ESVJFQ1RPUllfUEFUSCB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxubGV0IGxvZ0xldmVsID0gREVGQVVMVF9MT0dfTEVWRUwsXG4gICAgbG9nRmlsZUJhc2VOYW1lID0gREVGQVVMVF9MT0dfRklMRV9CQVNFX05BTUUsXG4gICAgbG9nRGlyZWN0b3J5UGF0aCA9IERFRkFVTFRfTE9HX0RJUkVDVE9SWV9QQVRIO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2cobWVzc2FnZU9yRXJyb3IsIGxldmVsID0gXCJcIikge1xuICBsZXQgc2FsaWVudFN0YWNrTWVzc2FnZUluZGV4ID0gMTtcblxuICBjb25zdCBsZXZlbHMgPSBbXG4gICAgVFJBQ0UsXG4gICAgREVCVUcsXG4gICAgSU5GTyxcbiAgICBXQVJOSU5HLFxuICAgIEVSUk9SLFxuICAgIEZBVEFMLFxuICBdO1xuXG4gIGlmIChsZXZlbCAhPT0gXCJcIikge1xuICAgIGNvbnN0IGxldmVsSW5kZXggPSBsZXZlbHMuaW5kZXhPZihsZXZlbCksXG4gICAgICAgICAgbG9nTGV2ZWxJbmRleCA9IGxldmVscy5pbmRleE9mKGxvZ0xldmVsKTtcblxuICAgIGlmIChsZXZlbEluZGV4IDwgbG9nTGV2ZWxJbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNhbGllbnRTdGFja01lc3NhZ2VJbmRleCArPSAxO1xuXG4gICAgbGV2ZWwgPSBgJHtsZXZlbH0gYDsgIC8vL1xuICB9XG5cbiAgbGV0IGVycm9yLFxuICAgICAgbWVzc2FnZTtcblxuICBpZiAobWVzc2FnZU9yRXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIGVycm9yID0gbWVzc2FnZU9yRXJyb3I7IC8vL1xuXG4gICAgKHsgbWVzc2FnZSB9ID0gZXJyb3IpO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSBtZXNzYWdlT3JFcnJvcjsgLy8vXG5cbiAgICBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgfVxuXG4gIGNvbnN0IHsgc3RhY2sgfSA9IGVycm9yLFxuICAgICAgICBzdGFja01lc3NhZ2VzID0gc3RhY2tNZXNzYWdlc0Zyb21TdGFjayhzdGFjayksXG4gICAgICAgIHBlcnRpbmVudFN0YWNrTWVzc2FnZSA9IHN0YWNrTWVzc2FnZXNbc2FsaWVudFN0YWNrTWVzc2FnZUluZGV4XSxcbiAgICAgICAgc3RhY2tNZXNzYWdlID0gcGVydGluZW50U3RhY2tNZXNzYWdlLCAvLy9cbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gZ2V0Q3VycmVudERhdGVBbmRUaW1lU3RyaW5nKCksXG4gICAgICAgIGZpbGVQYXRoID0gZmlsZVBhdGhGcm9tU3RhY2tNZXNzYWdlKHN0YWNrTWVzc2FnZSksXG4gICAgICAgIGxpbmVOdW1iZXIgPSBsaW5lTnVtYmVyRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpLFxuICAgICAgICBsb2dNZXNzYWdlID0gYCR7bGV2ZWx9JHtjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmd9ICR7ZmlsZVBhdGh9KCR7bGluZU51bWJlcn0pICR7bWVzc2FnZX1gO1xuXG4gIGNvbnNvbGUubG9nKGxvZ01lc3NhZ2UpO1xuXG4gIGlmIChsb2dEaXJlY3RvcnlQYXRoICE9PSBudWxsKSB7XG4gICAgcm9sbE92ZXJMb2dGaWxlKCk7XG5cbiAgICBjb25zdCBsb2dGaWxlUGF0aCA9IGdldExvZ0ZpbGVQYXRoKCksXG4gICAgICAgICAgbG9nRmlsZUNvbnRlbnQgPSBgJHtsb2dNZXNzYWdlfVxcbmA7XG5cbiAgICBhcHBlbmRUb0ZpbGUobG9nRmlsZVBhdGgsIGxvZ0ZpbGVDb250ZW50KTtcbiAgfVxuXG4gIHJldHVybiBsb2dNZXNzYWdlO1xufVxuXG5mdW5jdGlvbiB0cmFjZShtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgVFJBQ0UpOyB9XG5cbmZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2UpIHsgcmV0dXJuIGxvZyhtZXNzYWdlLCBERUJVRyk7IH1cblxuZnVuY3Rpb24gaW5mbyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgSU5GTyk7IH1cblxuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgV0FSTklORyk7IH1cblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkgeyByZXR1cm4gbG9nKG1lc3NhZ2UsIEVSUk9SKTsgfVxuXG5mdW5jdGlvbiBmYXRhbChtZXNzYWdlKSB7IHJldHVybiBsb2cobWVzc2FnZSwgRkFUQUwpOyB9XG5cbmZ1bmN0aW9uIHNldExvZ0xldmVsKGxldmVsKSB7IGxvZ0xldmVsID0gbGV2ZWw7IH1cblxuZnVuY3Rpb24gc2V0TG9nRmlsZUJhc2VOYW1lKGZpbGVCYXNlTmFtZSkgeyBsb2dGaWxlQmFzZU5hbWUgPSBmaWxlQmFzZU5hbWU7IH1cblxuZnVuY3Rpb24gc2V0TG9nRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7IGxvZ0RpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlQYXRoOyB9XG5cbmZ1bmN0aW9uIHNldExvZ09wdGlvbnMobG9nT3B0aW9ucykge1xuICBjb25zdCB7IGxldmVsLCBmaWxlQmFzZU5hbWUsIGRpcmVjdG9yeVBhdGggfSA9IGxvZ09wdGlvbnM7XG5cbiAgc2V0TG9nTGV2ZWwobGV2ZWwpO1xuXG4gIHNldExvZ0ZpbGVCYXNlTmFtZShmaWxlQmFzZU5hbWUpO1xuXG4gIHNldExvZ0RpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCk7XG59XG5cbmZ1bmN0aW9uIGdldExvZ0ZpbGVDb250ZW50KCkge1xuICBjb25zdCBsb2dGaWxlUGF0aCA9IGdldExvZ0ZpbGVQYXRoKCksXG4gICAgICAgIGxvZ0ZpbGVDb250ZW50ID0gcmVhZEZpbGUobG9nRmlsZVBhdGgpO1xuXG4gIHJldHVybiBsb2dGaWxlQ29udGVudDtcbn1cblxuT2JqZWN0LmFzc2lnbihsb2csIHtcbiAgVFJBQ0UsXG4gIERFQlVHLFxuICBJTkZPLFxuICBXQVJOSU5HLFxuICBFUlJPUixcbiAgRkFUQUwsXG4gIHRyYWNlLFxuICBkZWJ1ZyxcbiAgaW5mbyxcbiAgd2FybmluZyxcbiAgZXJyb3IsXG4gIGZhdGFsLFxuICBzZXRMb2dMZXZlbCxcbiAgc2V0TG9nRmlsZUJhc2VOYW1lLFxuICBzZXRMb2dEaXJlY3RvcnlQYXRoLFxuICBzZXRMb2dPcHRpb25zLFxuICBnZXRMb2dGaWxlQ29udGVudFxufSk7XG5cbmZ1bmN0aW9uIGdldExvZ0ZpbGVQYXRoKCkge1xuICBjb25zdCBsb2dGaWxlTmFtZSA9IGAke2xvZ0ZpbGVCYXNlTmFtZX0ubG9nYCxcbiAgICAgICAgbG9nRmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGxvZ0RpcmVjdG9yeVBhdGgsIGxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gbG9nRmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGdldFJvbGxlZE92ZXJMb2dGaWxlUGF0aCgpIHtcbiAgY29uc3QgY3VycmVudERhdGVTdHJpbmcgPSBnZXRDdXJyZW50RGF0ZVN0cmluZygpLFxuICAgICAgICByb2xsZWRPdmVyTG9nRmlsZU5hbWUgPSBgJHtsb2dGaWxlQmFzZU5hbWV9LiR7Y3VycmVudERhdGVTdHJpbmd9LmxvZ2AsXG4gICAgICAgIHJvbGxlZE92ZXJMb2dGaWxlUGF0aCA9IGNvbmNhdGVuYXRlUGF0aHMobG9nRGlyZWN0b3J5UGF0aCwgcm9sbGVkT3ZlckxvZ0ZpbGVOYW1lKTtcblxuICByZXR1cm4gcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBnZXRMb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlU3RhdHMgPSBnZXRTdGF0cyhsb2dGaWxlUGF0aCksXG4gICAgICAgIHsgbXRpbWUgfSA9IGxvZ0ZpbGVTdGF0cyxcbiAgICAgICAgbG9nRmlsZUxhc3RNb2RpZmllZERhdGUgPSBuZXcgRGF0ZShtdGltZSk7ICAvLy9cblxuICByZXR1cm4gbG9nRmlsZUxhc3RNb2RpZmllZERhdGU7XG59XG5cbmZ1bmN0aW9uIHJvbGxPdmVyTG9nRmlsZSgpIHtcbiAgY29uc3QgbG9nRmlsZVBhdGggPSBnZXRMb2dGaWxlUGF0aCgpLFxuICAgICAgICBsb2dGaWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKGxvZ0ZpbGVQYXRoKTtcblxuICBpZiAoIWxvZ0ZpbGVFeGlzdHMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSA9IGdldExvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlKCksXG4gICAgICAgIGxvZ0ZpbGVMYXN0TW9kaWZpZWREYXRlQ3VycmVudERhdGUgPSBpc0RhdGVDdXJyZW50RGF0ZShsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZSk7XG5cbiAgaWYgKCFsb2dGaWxlTGFzdE1vZGlmaWVkRGF0ZUN1cnJlbnREYXRlKSB7XG4gICAgY29uc3Qgcm9sbGVkT3ZlckxvZ0ZpbGVQYXRoID0gZ2V0Um9sbGVkT3ZlckxvZ0ZpbGVQYXRoKCk7XG5cbiAgICByZW5hbWVGaWxlKGxvZ0ZpbGVQYXRoLCByb2xsZWRPdmVyTG9nRmlsZVBhdGgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzRGF0ZUN1cnJlbnREYXRlKGRhdGUpIHtcbiAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpLFxuICAgICAgICBkYXRlU3RyaW5nID0gZGF0ZS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgY3VycmVudERhdGVTdHJpbmcgPSBjdXJyZW50RGF0ZS50b0RhdGVTdHJpbmcoKSxcbiAgICAgICAgZGF0ZUN1cnJlbnREYXRlID0gKGRhdGVTdHJpbmcgPT09IGN1cnJlbnREYXRlU3RyaW5nKTtcblxuICByZXR1cm4gZGF0ZUN1cnJlbnREYXRlO1xufVxuXG5mdW5jdGlvbiBnZXRDdXJyZW50RGF0ZVN0cmluZygpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRheSA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldERhdGUoKSwgMiksICAvLy9cbiAgICAgICAgbW9udGggPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNb250aCgpICsgMSwgMiksIC8vL1xuICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmcgPSBgJHtkYXl9LSR7bW9udGh9LSR7eWVhcn1gO1xuXG4gIHJldHVybiBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGdldEN1cnJlbnREYXRlQW5kVGltZVN0cmluZygpIHtcbiAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCksXG4gICAgICAgIGRheSA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldERhdGUoKSwgMiksICAvLy9cbiAgICAgICAgbW9udGggPSBwYWRTdGFydFdpdGhaZXJvZXMoZGF0ZS5nZXRNb250aCgpICsgMSwgMiksIC8vL1xuICAgICAgICB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpLFxuICAgICAgICBob3VycyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldEhvdXJzKCksIDIpLFxuICAgICAgICBtaW51dGVzID0gcGFkU3RhcnRXaXRoWmVyb2VzKGRhdGUuZ2V0TWludXRlcygpLCAyKSxcbiAgICAgICAgc2Vjb25kcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldFNlY29uZHMoKSwgMiksXG4gICAgICAgIG1pbGxpc2Vjb25kcyA9IHBhZFN0YXJ0V2l0aFplcm9lcyhkYXRlLmdldE1pbGxpc2Vjb25kcygpLCAzKSxcbiAgICAgICAgY3VycmVudERhdGVBbmRUaW1lU3RyaW5nID0gYCR7ZGF5fS0ke21vbnRofS0ke3llYXJ9ICR7aG91cnN9OiR7bWludXRlc306JHtzZWNvbmRzfS4ke21pbGxpc2Vjb25kc31gO1xuXG4gIHJldHVybiBjdXJyZW50RGF0ZUFuZFRpbWVTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIHN0YWNrTWVzc2FnZXNGcm9tU3RhY2soc3RhY2spIHtcbiAgY29uc3Qgc3RhY2tNZXNzYWdlcyA9IFtdLFxuICAgICAgICBzdGFja0xpbmVzID0gc3RhY2suc3BsaXQoL1xcclxcbnxcXG4vKTtcblxuICBsZXQgc3RhY2tNZXNzYWdlID0gXCJcIjtcblxuICBzdGFja0xpbmVzLmZvckVhY2goKHN0YWNrTGluZSkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAvXlxccyphdC4qLy50ZXN0KHN0YWNrTGluZSk7XG5cbiAgICBzdGFja01lc3NhZ2UgPSAoc3RhY2tNZXNzYWdlID09PSBcIlwiKSA/XG4gICAgICAgICAgICAgICAgICAgICAgc3RhY2tMaW5lIDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGAke3N0YWNrTWVzc2FnZX1cXG4ke3N0YWNrTGluZX1gO1xuXG4gICAgaWYgKG1hdGNoZXMpIHtcbiAgICAgIHN0YWNrTWVzc2FnZXMucHVzaChzdGFja01lc3NhZ2UpO1xuXG4gICAgICBzdGFja01lc3NhZ2UgPSBcIlwiO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHN0YWNrTWVzc2FnZXM7XG59XG5cbmZ1bmN0aW9uIGZpbGVQYXRoRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YWNrTWVzc2FnZS5tYXRjaCgvKFxcLy4rKTpcXGQrOlxcZCsvbSksXG4gICAgICAgIHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpLFxuICAgICAgICBhYnNvbHV0ZUZpbGVQYXRoID0gc2Vjb25kTWF0Y2gsICAvLy9cbiAgICAgICAgY3VycmVudFdvcmtpbmdEaXJlY3RvcnlQYXRoID0gcGF0aC5yZXNvbHZlKFwiLlwiKSwgIC8vL1xuICAgICAgICBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGhMZW5ndGggPSBjdXJyZW50V29ya2luZ0RpcmVjdG9yeVBhdGgubGVuZ3RoLFxuICAgICAgICBzdGFydCA9IGN1cnJlbnRXb3JraW5nRGlyZWN0b3J5UGF0aExlbmd0aCArIDEsICAvLy9cbiAgICAgICAgZmlsZVBhdGggPSBhYnNvbHV0ZUZpbGVQYXRoLnN1YnN0cihzdGFydCk7XG5cbiAgcmV0dXJuIGZpbGVQYXRoO1xufVxuXG5mdW5jdGlvbiBsaW5lTnVtYmVyRnJvbVN0YWNrTWVzc2FnZShzdGFja01lc3NhZ2UpIHtcbiAgY29uc3QgbWF0Y2hlcyA9IHN0YWNrTWVzc2FnZS5tYXRjaCgvOihcXGQrKS9tKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIGxpbmVOdW1iZXIgPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGxpbmVOdW1iZXI7XG59XG5cbmZ1bmN0aW9uIHBhZFN0YXJ0V2l0aFplcm9lcyhzdHJpbmcsIHRhcmdldExlbmd0aCkge1xuICBjb25zdCBwYWRTdHJpbmcgPSBcIjBcIixcbiAgICAgICAgcGFkZGVkU3RyaW5nID0gcGFkU3RhcnQoc3RyaW5nLCB0YXJnZXRMZW5ndGgsIHBhZFN0cmluZyk7XG5cbiAgcmV0dXJuIHBhZGRlZFN0cmluZztcbn1cblxuZnVuY3Rpb24gcGFkU3RhcnQoc3RyaW5nLCB0YXJnZXRMZW5ndGgsIHBhZFN0cmluZykge1xuICBsZXQgcGFkZGluZyA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRhcmdldExlbmd0aDsgaW5kZXgrKykge1xuICAgIHBhZGRpbmcgKz0gcGFkU3RyaW5nO1xuICB9XG5cbiAgY29uc3QgcGFkZGVkU3RyaW5nID0gYCR7cGFkZGluZ30ke3N0cmluZ31gLnN1YnN0cigtdGFyZ2V0TGVuZ3RoKTtcblxuICByZXR1cm4gcGFkZGVkU3RyaW5nO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IERBVEFfRVZFTlQsIEVUWF9DSEFSQUNURVIsIFVURjhfRU5DT0RJTkcgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG9uRVRYKGhhbmRsZXIpIHtcbiAgY29uc3QgZXZlbnQgPSBEQVRBX0VWRU5UO1xuXG4gIGlmIChwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUpIHtcbiAgICBjb25zdCByYXdNb2RlID0gdHJ1ZSxcbiAgICAgICAgICBlbmNvZGluZyA9IFVURjhfRU5DT0RJTkc7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnNldFJhd01vZGUocmF3TW9kZSk7XG4gICAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG5cbiAgICBwcm9jZXNzLnN0ZGluLnJlc3VtZSgpO1xuXG4gICAgcHJvY2Vzcy5zdGRpbi5hZGRMaXN0ZW5lcihldmVudCwgZGF0YUhhbmRsZXIpO1xuXG4gICAgcmV0dXJuIG9mZkV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZkV4dCgpIHtcbiAgICBwcm9jZXNzLnN0ZGluLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBkYXRhSGFuZGxlcik7XG4gIH1cblxuICBmdW5jdGlvbiBkYXRhSGFuZGxlcihjaGFyYWN0ZXIpIHtcbiAgICBpZiAoY2hhcmFjdGVyID09PSBFVFhfQ0hBUkFDVEVSKSB7XG4gICAgICBoYW5kbGVyKCk7XG4gICAgfVxuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IG9uRVRYIGZyb20gXCIuL29uRVRYXCI7XG5cbmltcG9ydCB7IHdoaWxzdCB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvYXN5bmNocm9ub3VzXCI7XG5cbmltcG9ydCB7IENUUkxfQywgREFUQV9FVkVOVCwgQkFDS1NQQUNFX0NIQVJBQ1RFUiwgTElORV9GRUVEX0NIQVJBQ1RFUiwgQ0FSUklBR0VfUkVUVVJOX0NIQVJBQ1RFUiB9IGZyb20gXCIuLi8uLi9jb25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJvbXB0KG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHZhbHVlID0gbnVsbCxcbiAgICAgICAgeyBhdHRlbXB0cyA9IDMgfSA9IG9wdGlvbnMsXG4gICAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgb3B0aW9uc1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChhdHRlbXB0LCAoKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gY29udGV4dDtcbiAgICBcbiAgICBjYWxsYmFjayh2YWx1ZSk7XG4gIH0sIGNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBhdHRlbXB0KG5leHQsIGRvbmUsIGNvbnRleHQpIHtcbiAgbGV0IHsgYXR0ZW1wdHMgfSA9IGNvbnRleHQ7XG5cbiAgY29uc3QgdGVybWluYXRlID0gKGF0dGVtcHRzLS0gPT09IDApO1xuICBcbiAgaWYgKHRlcm1pbmF0ZSkge1xuICAgIGRvbmUoKTtcbiAgICBcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IG9wdGlvbnMgfSA9IGNvbnRleHQsXG4gICAgICAgIHsgaGlkZGVuID0gZmFsc2UsXG4gICAgICAgICAgZW5jb2RpbmcgPSBcInV0ZjhcIixcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBpbml0aWFsVmFsdWUgPSBcIlwiLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uUGF0dGVybixcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gfSA9IG9wdGlvbnM7XG5cbiAgaW5wdXQoZGVzY3JpcHRpb24sIGluaXRpYWxWYWx1ZSwgZW5jb2RpbmcsIGhpZGRlbiwgY2FsbGJhY2spO1xuXG4gIGZ1bmN0aW9uIGNhbGxiYWNrKHZhbHVlKSB7XG4gICAgY29uc3QgdmFsaWQgPSB2YWxpZGF0aW9uRnVuY3Rpb24gPyAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbih2YWx1ZSkgOlxuICAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25QYXR0ZXJuLnRlc3QodmFsdWUpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9KTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvck1lc3NhZ2UpO1xuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHtcbiAgICAgICAgYXR0ZW1wdHNcbiAgICAgIH0pO1xuXG4gICAgICBuZXh0KCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGlucHV0KGRlc2NyaXB0aW9uLCBpbml0aWFsVmFsdWUsIGVuY29kaW5nLCBoaWRkZW4sIGNhbGxiYWNrKSB7XG4gIGxldCB2YWx1ZSA9IGluaXRpYWxWYWx1ZTsgLy8vXG5cbiAgY29uc3QgZXZlbnQgPSBEQVRBX0VWRU5ULFxuICAgICAgICByYXdNb2RlID0gdHJ1ZSxcbiAgICAgICAgb2ZmRVRYID0gb25FVFgoKCkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKENUUkxfQyk7XG5cbiAgICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICAgICAgfSk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5zZXRFbmNvZGluZyhlbmNvZGluZyk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5zZXRSYXdNb2RlKHJhd01vZGUpO1xuXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGRlc2NyaXB0aW9uKTtcblxuICBpZiAoIWhpZGRlbikge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKHZhbHVlKTtcbiAgfVxuXG4gIHByb2Nlc3Muc3RkaW4ucmVzdW1lKCk7XG5cbiAgcHJvY2Vzcy5zdGRpbi5vbihldmVudCwgbGlzdGVuZXIpO1xuXG4gIGZ1bmN0aW9uIGxpc3RlbmVyKGNodW5rKSB7XG4gICAgY29uc3QgY2hhcmFjdGVyID0gY2h1bmsudG9TdHJpbmcoZW5jb2RpbmcpO1xuXG4gICAgc3dpdGNoIChjaGFyYWN0ZXIpIHtcbiAgICAgIGNhc2UgTElORV9GRUVEX0NIQVJBQ1RFUiA6XG4gICAgICBjYXNlIENBUlJJQUdFX1JFVFVSTl9DSEFSQUNURVIgOlxuICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShMSU5FX0ZFRURfQ0hBUkFDVEVSKTtcblxuICAgICAgICBwcm9jZXNzLnN0ZGluLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcik7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5wYXVzZSgpO1xuXG4gICAgICAgIG9mZkVUWCgpO1xuXG4gICAgICAgIGNhbGxiYWNrKHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgQkFDS1NQQUNFX0NIQVJBQ1RFUiA6XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgdmFsdWUubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY2xlYXJMaW5lKCk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQuY3Vyc29yVG8oMCk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGlmICghaGlkZGVuKSB7XG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YWx1ZSArPSBjaGFyYWN0ZXI7XG5cbiAgICAgICAgaWYgKCFoaWRkZW4pIHtcbiAgICAgICAgICBwcm9jZXNzLnN0ZG91dC5jbGVhckxpbmUoKTtcblxuICAgICAgICAgIHByb2Nlc3Muc3Rkb3V0LmN1cnNvclRvKDApO1xuXG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZGVzY3JpcHRpb24pO1xuXG4gICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmltcG9ydCB7IGZpcnN0LCBzZWNvbmQgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2FycmF5XCI7XG5pbXBvcnQgeyBERUZBVUxUX1JDX0JBU0VfRVhURU5TSU9OIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgcmVhZEZpbGUsIHdyaXRlRmlsZSwgY2hlY2tGaWxlRXhpc3RzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9maWxlU3lzdGVtXCI7XG5cbmxldCBwYXRoUmVzb2x2ZXIgPSBwYXRoLnJlc29sdmUsXG4gICAgYmFzZUV4dGVuc2lvbiA9IERFRkFVTFRfUkNfQkFTRV9FWFRFTlNJT047XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJjKGVudmlyb25tZW50TmFtZU9yQXJndiA9IG51bGwpIHtcbiAgbGV0IGVudmlyb25tZW50LFxuICAgICAgZW52aXJvbm1lbnROYW1lLFxuICAgICAgZW52aXJvbm1lbnROYW1lT3JBcmd2QXJndiA9IChlbnZpcm9ubWVudE5hbWVPckFyZ3YgaW5zdGFuY2VvZiBBcnJheSk7XG5cbiAgaWYgKGVudmlyb25tZW50TmFtZU9yQXJndkFyZ3YpIHtcbiAgICBjb25zdCBhcmd2ID0gZW52aXJvbm1lbnROYW1lT3JBcmd2OyAvLy9cblxuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZUZyb21Bcmd2KGFyZ3YpO1xuICB9IGVsc2Uge1xuICAgIGVudmlyb25tZW50TmFtZSA9IGVudmlyb25tZW50TmFtZU9yQXJndjsgIC8vL1xuICB9XG5cbiAgY29uc3QganNvbiA9IHJlYWRSQ0ZpbGUoKSxcbiAgICAgICAgeyBlbnZpcm9ubWVudHMgfSA9IGpzb247XG5cbiAgaWYgKGVudmlyb25tZW50TmFtZSA9PT0gbnVsbCkge1xuICAgIGNvbnN0IGZpcnN0RW52aXJvbm1lbnQgPSBmaXJzdChlbnZpcm9ubWVudHMpO1xuXG4gICAgZW52aXJvbm1lbnQgPSBmaXJzdEVudmlyb25tZW50OyAvLy9cbiAgfSBlbHNlIHtcbiAgICBlbnZpcm9ubWVudCA9IGVudmlyb25tZW50cy5maW5kKChlbnZpcm9ubWVudCkgPT4ge1xuICAgICAgY29uc3QgeyBuYW1lIH0gPSBlbnZpcm9ubWVudCxcbiAgICAgICAgICAgIGZvdW5kID0gKG5hbWUgPT09IGVudmlyb25tZW50TmFtZSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9KTtcbiAgfVxuXG4gIGRlbGV0ZSBlbnZpcm9ubWVudC5uYW1lO1xuXG4gIE9iamVjdC5hc3NpZ24ocmMsIGVudmlyb25tZW50KTtcblxuICByZXR1cm4gZW52aXJvbm1lbnQ7XG59XG5cbmZ1bmN0aW9uIHJlYWRSQ0ZpbGUoKSB7XG4gIGNvbnN0IGFic29sdXRlUkNGaWxlUGF0aCA9IGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCksXG4gICAgICAgIGZpbGVDb250ZW50ID0gcmVhZEZpbGUoYWJzb2x1dGVSQ0ZpbGVQYXRoKSxcbiAgICAgICAganNvbiA9IEpTT04ucGFyc2UoZmlsZUNvbnRlbnQpO1xuXG4gIHJldHVybiBqc29uOyAgICAgIFxufVxuXG5mdW5jdGlvbiB3cml0ZVJDRmlsZShqc29uKSB7XG4gIGNvbnN0IGFic29sdXRlUkNGaWxlUGF0aCA9IGFic29sdXRlUkNGaWxlUGF0aEZyb21Ob3RoaW5nKCksXG4gICAgICAgIGZpbGVDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgYFxcdGApO1xuXG4gIHdyaXRlRmlsZShhYnNvbHV0ZVJDRmlsZVBhdGgsIGZpbGVDb250ZW50KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUkNGaWxlKGFkZGVkUHJvcGVydGllcywgLi4uZGVsZXRlZFByb3BlcnR5TmFtZXMpIHtcbiAgbGV0IGpzb24gPSByZWFkUkNGaWxlKCk7XG5cbiAgaWYgKGFkZGVkUHJvcGVydGllcykge1xuICAgIE9iamVjdC5hc3NpZ24oanNvbiwgYWRkZWRQcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGRlbGV0ZWRQcm9wZXJ0eU5hbWVzLmZvckVhY2goKGRlbGV0ZWRQcm9wZXJ0eU5hbWUpID0+IHtcbiAgICBkZWxldGUganNvbltkZWxldGVkUHJvcGVydHlOYW1lXTtcbiAgfSk7XG5cbiAgd3JpdGVSQ0ZpbGUoanNvbik7ICAgICAgXG59XG5cbmZ1bmN0aW9uIGNoZWNrUkNGaWxlRXhpc3RzKCkge1xuICBjb25zdCBhYnNvbHV0ZVJDRmlsZVBhdGggPSBhYnNvbHV0ZVJDRmlsZVBhdGhGcm9tTm90aGluZygpLFxuICAgICAgICByY0ZpbGVFeGlzdHMgPSBjaGVja0ZpbGVFeGlzdHMoYWJzb2x1dGVSQ0ZpbGVQYXRoKTtcblxuICByZXR1cm4gcmNGaWxlRXhpc3RzO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVWYWN1b3VzUkNGaWxlKCkge1xuICBjb25zdCBqc29uID0ge1xuICAgIFwiZW52aXJvbm1lbnRzXCI6IFtcbiAgICAgIHt9XG4gICAgXVxuICB9O1xuXG4gIHdyaXRlUkNGaWxlKGpzb24pO1xufVxuXG5mdW5jdGlvbiBzZXRSQ0Jhc2VFeHRlbnNpb24ocmNCYXNlRXh0ZW5zaW9uKSB7IGJhc2VFeHRlbnNpb24gPSByY0Jhc2VFeHRlbnNpb247IH1cblxuZnVuY3Rpb24gc2V0UkNQYXRoUmVzb2x2ZXIocmNQYXRoUmVzb2x2ZXIpIHsgcGF0aFJlc29sdmVyID0gcmNQYXRoUmVzb2x2ZXI7IH1cblxuT2JqZWN0LmFzc2lnbihyYywge1xuICByZWFkUkNGaWxlLFxuICB3cml0ZVJDRmlsZSxcbiAgdXBkYXRlUkNGaWxlLFxuICBjaGVja1JDRmlsZUV4aXN0cyxcbiAgY3JlYXRlVmFjdW91c1JDRmlsZSxcbiAgc2V0UkNCYXNlRXh0ZW5zaW9uLFxuICBzZXRSQ1BhdGhSZXNvbHZlclxufSk7XG5cbmZ1bmN0aW9uIGVudmlyb25tZW50TmFtZUZyb21Bcmd2KGFyZ3YpIHtcbiAgbGV0IGVudmlyb25tZW50TmFtZSA9IG51bGw7XG5cbiAgYXJndi5maW5kKChhcmd1bWVudCkgPT4geyAgLy8vXG4gICAgY29uc3QgbWF0Y2hlcyA9IGFyZ3VtZW50Lm1hdGNoKC8tLWVudmlyb25tZW50PSguKykvKSxcbiAgICAgICAgICBmb3VuZCA9IChtYXRjaGVzICE9PSBudWxsKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIGVudmlyb25tZW50TmFtZSA9IHNlY29uZE1hdGNoO1xuICAgIH1cblxuICAgIHJldHVybiBmb3VuZDtcbiAgfSk7XG5cbiAgcmV0dXJuIGVudmlyb25tZW50TmFtZTtcbn1cblxuZnVuY3Rpb24gYWJzb2x1dGVSQ0ZpbGVQYXRoRnJvbU5vdGhpbmcoKSB7XG4gIGNvbnN0IGZpbGVQYXRoID0gYC4vLiR7YmFzZUV4dGVuc2lvbn1yY2AsXG4gICAgICAgIGFic29sdXRlUkNGaWxlUGF0aCA9IHBhdGhSZXNvbHZlcihmaWxlUGF0aCk7XG5cbiAgcmV0dXJuIGFic29sdXRlUkNGaWxlUGF0aDtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBmaXJzdCwgc2Vjb25kLCBsYXN0IH0gZnJvbSBcIi4uL3V0aWxpdGllcy9hcnJheVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNQYXRoTmFtZShwYXRoKSB7XG4gIHBhdGggPSBwYXRoLnJlcGxhY2UoL15cXC8vLFwiXCIpLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTsgLy8vXG5cbiAgY29uc3QgcGF0aE5hbWUgPSAoL1xcLy8udGVzdChwYXRoKSA9PT0gZmFsc2UpO1xuXG4gIHJldHVybiBwYXRoTmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFRvcG1vc3ROYW1lKHBhdGgpIHtcbiAgY29uc3QgcGF0aE5hbWUgPSBpc1BhdGhOYW1lKHBhdGgpLFxuICAgICAgICBwYXRoQWJzb2x1dGVQYXRoID0gaXNQYXRoQWJzb2x1dGVQYXRoKHBhdGgpLFxuICAgICAgICBwYXRoVG9wbW9zdE5hbWUgPSAocGF0aE5hbWUgJiYgcGF0aEFic29sdXRlUGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhUb3Btb3N0TmFtZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUGF0aFJlbGF0aXZlUGF0aChwYXRoKSB7XG4gIGNvbnN0IHBhdGhSZWxhdGl2ZVBhdGggPSAhL15cXC8vLnRlc3QocGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhSZWxhdGl2ZVBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhBYnNvbHV0ZVBhdGgocGF0aCkge1xuICBjb25zdCBwYXRoQWJzb2x1dGVQYXRoID0gL15cXC8vLnRlc3QocGF0aCk7XG5cbiAgcmV0dXJuIHBhdGhBYnNvbHV0ZVBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGgodG9wbW9zdE5hbWUsIGFic29sdXRlUGF0aCkge1xuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHt0b3Btb3N0TmFtZX0oPzpcXFxcLy4rKT8kYCksXG4gICAgICAgIHRvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGggPSByZWdFeHAudGVzdChhYnNvbHV0ZVBhdGgpO1xuXG4gIHJldHVybiB0b3Btb3N0TmFtZUluQWJzb2x1dGVQYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21iaW5lUGF0aHMocGF0aCwgcmVsYXRpdmVQYXRoKSB7XG4gIGxldCBjb21iaW5lZFBhdGggPSBudWxsO1xuXG4gIGNvbnN0IHBhdGhOYW1lcyA9IHBhdGguc3BsaXQoL1xcLy8pLFxuICAgICAgICByZWxhdGl2ZVBhdGhOYW1lcyA9IHJlbGF0aXZlUGF0aC5zcGxpdCgvXFwvLyk7XG5cbiAgbGV0IGxhc3RQYXRoTmFtZSxcbiAgICAgIGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9IGZpcnN0KHJlbGF0aXZlUGF0aE5hbWVzKTtcblxuICBpZiAoZmlyc3RSZWxhdGl2ZVBhdGhOYW1lID09PSBcIi5cIikge1xuICAgIHJlbGF0aXZlUGF0aE5hbWVzLnNoaWZ0KCk7XG4gIH1cblxuICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG4gIGxhc3RQYXRoTmFtZSA9IGxhc3QocGF0aE5hbWVzKTtcblxuICB3aGlsZSAoKGZpcnN0UmVsYXRpdmVQYXRoTmFtZSA9PT0gXCIuLlwiKSAmJiAobGFzdFBhdGhOYW1lICE9PSB1bmRlZmluZWQpKSB7XG4gICAgcmVsYXRpdmVQYXRoTmFtZXMuc2hpZnQoKTtcbiAgICBwYXRoTmFtZXMucG9wKCk7XG5cbiAgICBmaXJzdFJlbGF0aXZlUGF0aE5hbWUgPSBmaXJzdChyZWxhdGl2ZVBhdGhOYW1lcyk7XG4gICAgbGFzdFBhdGhOYW1lID0gbGFzdChwYXRoTmFtZXMpO1xuICB9XG5cbiAgaWYgKGxhc3RQYXRoTmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY29tYmluZWRQYXRoTmFtZXMgPSBbXS5jb25jYXQocGF0aE5hbWVzKS5jb25jYXQocmVsYXRpdmVQYXRoTmFtZXMpO1xuXG4gICAgY29tYmluZWRQYXRoID0gY29tYmluZWRQYXRoTmFtZXMuam9pbihcIi9cIik7XG4gIH1cblxuICByZXR1cm4gY29tYmluZWRQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uY2F0ZW5hdGVQYXRocyhwYXRoLCByZWxhdGl2ZVBhdGgpIHtcbiAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvJC8sIFwiXCIpOyAgLy8vXG5cbiAgY29uc3QgY29uY2F0ZW5hdGVkUGF0aCA9IGAke3BhdGh9LyR7cmVsYXRpdmVQYXRofWA7XG5cbiAgcmV0dXJuIGNvbmNhdGVuYXRlZFBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBib3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4qXFwvKFteXFwvXStcXC8/KSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgYm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aChwYXRoKSB7XG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKC4rKVxcL1teXFwvXStcXC8/JC8pLFxuICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKSxcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeVBhdGggPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlQYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oW15cXC9dKylcXC8uKyQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICB9XG5cbiAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKC4qKVxcL1teXFwvXStcXC8/JC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7IC8vL1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG5cbiAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10rXFwvKC4rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNQYXRoTmFtZSxcbiAgaXNQYXRoVG9wbW9zdE5hbWUsXG4gIGlzUGF0aFJlbGF0aXZlUGF0aCxcbiAgaXNQYXRoQWJzb2x1dGVQYXRoLFxuICBpc1RvcG1vc3ROYW1lSW5BYnNvbHV0ZVBhdGgsXG4gIGNvbWJpbmVQYXRocyxcbiAgY29uY2F0ZW5hdGVQYXRocyxcbiAgYm90dG9tbW9zdE5hbWVGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCxcbiAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoLFxuICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGhcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgcmVhZEZpbGUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2ZpbGVTeXN0ZW1cIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlRmlsZShmaWxlUGF0aCwgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgY29udGVudCA9IHJlYWRGaWxlKGZpbGVQYXRoKSxcbiAgICAgICAgcGFyc2VkQ29udGVudCA9IHBhcnNlQ29udGVudChjb250ZW50LCBhcmdzLCByZWdleCk7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbnRlbnQoY29udGVudCwgYXJncywgcmVnZXgpIHtcbiAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KFwiXFxuXCIpLFxuICAgICAgICBwYXJzZWRMaW5lcyA9IHBhcnNlTGluZXMobGluZXMsIGFyZ3MsIHJlZ2V4KSxcbiAgICAgICAgcGFyc2VkQ29udGVudCA9IHBhcnNlZExpbmVzLmpvaW4oXCJcXG5cIik7XG5cbiAgcmV0dXJuIHBhcnNlZENvbnRlbnQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUxpbmUobGluZSwgYXJncywgcmVnZXggPSAvXFwkeyguKz8pfS9nKSB7XG4gIGNvbnN0IHBhcnNlZExpbmUgPSBsaW5lLnJlcGxhY2UocmVnZXgsIChtYXRjaCwgdG9rZW4pID0+IHtcbiAgICBjb25zdCBwYXJzZWRUb2tlbiA9IHBhcnNlVG9rZW4odG9rZW4sIGFyZ3MpO1xuXG4gICAgcmV0dXJuIHBhcnNlZFRva2VuO1xuICB9KTtcblxuICByZXR1cm4gcGFyc2VkTGluZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBwYXJzZUZpbGUsXG4gIHBhcnNlQ29udGVudCxcbiAgcGFyc2VMaW5lXG59O1xuXG5mdW5jdGlvbiBwYXJzZUxpbmVzKGxpbmVzLCBhcmdzLCByZWdleCkge1xuICBjb25zdCBwYXJzZWRMaW5lcyA9IGxpbmVzLm1hcCgobGluZSkgPT4ge1xuICAgIGNvbnN0IHBhcnNlZExpbmUgPSBwYXJzZUxpbmUobGluZSwgYXJncywgcmVnZXgpO1xuXG4gICAgcmV0dXJuIHBhcnNlZExpbmU7XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWRMaW5lcztcbn1cblxuZnVuY3Rpb24gcGFyc2VUb2tlbih0b2tlbiwgYXJncykge1xuICBsZXQgcGFyc2VkVG9rZW4gPSBcIlwiO1xuXG4gIGlmIChhcmdzLmhhc093blByb3BlcnR5KHRva2VuKSkge1xuICAgIHBhcnNlZFRva2VuID0gYXJnc1t0b2tlbl07XG4gIH1cblxuICByZXR1cm4gcGFyc2VkVG9rZW47XG59XG4iLCIvLyAuZGlybmFtZSwgLmJhc2VuYW1lLCBhbmQgLmV4dG5hbWUgbWV0aG9kcyBhcmUgZXh0cmFjdGVkIGZyb20gTm9kZS5qcyB2OC4xMS4xLFxuLy8gYmFja3BvcnRlZCBhbmQgdHJhbnNwbGl0ZWQgd2l0aCBCYWJlbCwgd2l0aCBiYWNrd2FyZHMtY29tcGF0IGZpeGVzXG5cbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyByZXNvbHZlcyAuIGFuZCAuLiBlbGVtZW50cyBpbiBhIHBhdGggYXJyYXkgd2l0aCBkaXJlY3RvcnkgbmFtZXMgdGhlcmVcbi8vIG11c3QgYmUgbm8gc2xhc2hlcywgZW1wdHkgZWxlbWVudHMsIG9yIGRldmljZSBuYW1lcyAoYzpcXCkgaW4gdGhlIGFycmF5XG4vLyAoc28gYWxzbyBubyBsZWFkaW5nIGFuZCB0cmFpbGluZyBzbGFzaGVzIC0gaXQgZG9lcyBub3QgZGlzdGluZ3Vpc2hcbi8vIHJlbGF0aXZlIGFuZCBhYnNvbHV0ZSBwYXRocylcbmZ1bmN0aW9uIG5vcm1hbGl6ZUFycmF5KHBhcnRzLCBhbGxvd0Fib3ZlUm9vdCkge1xuICAvLyBpZiB0aGUgcGF0aCB0cmllcyB0byBnbyBhYm92ZSB0aGUgcm9vdCwgYHVwYCBlbmRzIHVwID4gMFxuICB2YXIgdXAgPSAwO1xuICBmb3IgKHZhciBpID0gcGFydHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICB2YXIgbGFzdCA9IHBhcnRzW2ldO1xuICAgIGlmIChsYXN0ID09PSAnLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKGxhc3QgPT09ICcuLicpIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgcGFydHMuc3BsaWNlKGksIDEpO1xuICAgICAgdXAtLTtcbiAgICB9XG4gIH1cblxuICAvLyBpZiB0aGUgcGF0aCBpcyBhbGxvd2VkIHRvIGdvIGFib3ZlIHRoZSByb290LCByZXN0b3JlIGxlYWRpbmcgLi5zXG4gIGlmIChhbGxvd0Fib3ZlUm9vdCkge1xuICAgIGZvciAoOyB1cC0tOyB1cCkge1xuICAgICAgcGFydHMudW5zaGlmdCgnLi4nKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFydHM7XG59XG5cbi8vIHBhdGgucmVzb2x2ZShbZnJvbSAuLi5dLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVzb2x2ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzb2x2ZWRQYXRoID0gJycsXG4gICAgICByZXNvbHZlZEFic29sdXRlID0gZmFsc2U7XG5cbiAgZm9yICh2YXIgaSA9IGFyZ3VtZW50cy5sZW5ndGggLSAxOyBpID49IC0xICYmICFyZXNvbHZlZEFic29sdXRlOyBpLS0pIHtcbiAgICB2YXIgcGF0aCA9IChpID49IDApID8gYXJndW1lbnRzW2ldIDogcHJvY2Vzcy5jd2QoKTtcblxuICAgIC8vIFNraXAgZW1wdHkgYW5kIGludmFsaWQgZW50cmllc1xuICAgIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyB0byBwYXRoLnJlc29sdmUgbXVzdCBiZSBzdHJpbmdzJyk7XG4gICAgfSBlbHNlIGlmICghcGF0aCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZWRQYXRoID0gcGF0aCArICcvJyArIHJlc29sdmVkUGF0aDtcbiAgICByZXNvbHZlZEFic29sdXRlID0gcGF0aC5jaGFyQXQoMCkgPT09ICcvJztcbiAgfVxuXG4gIC8vIEF0IHRoaXMgcG9pbnQgdGhlIHBhdGggc2hvdWxkIGJlIHJlc29sdmVkIHRvIGEgZnVsbCBhYnNvbHV0ZSBwYXRoLCBidXRcbiAgLy8gaGFuZGxlIHJlbGF0aXZlIHBhdGhzIHRvIGJlIHNhZmUgKG1pZ2h0IGhhcHBlbiB3aGVuIHByb2Nlc3MuY3dkKCkgZmFpbHMpXG5cbiAgLy8gTm9ybWFsaXplIHRoZSBwYXRoXG4gIHJlc29sdmVkUGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihyZXNvbHZlZFBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhcmVzb2x2ZWRBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIHJldHVybiAoKHJlc29sdmVkQWJzb2x1dGUgPyAnLycgOiAnJykgKyByZXNvbHZlZFBhdGgpIHx8ICcuJztcbn07XG5cbi8vIHBhdGgubm9ybWFsaXplKHBhdGgpXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdmFyIGlzQWJzb2x1dGUgPSBleHBvcnRzLmlzQWJzb2x1dGUocGF0aCksXG4gICAgICB0cmFpbGluZ1NsYXNoID0gc3Vic3RyKHBhdGgsIC0xKSA9PT0gJy8nO1xuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICBwYXRoID0gbm9ybWFsaXplQXJyYXkoZmlsdGVyKHBhdGguc3BsaXQoJy8nKSwgZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhIXA7XG4gIH0pLCAhaXNBYnNvbHV0ZSkuam9pbignLycpO1xuXG4gIGlmICghcGF0aCAmJiAhaXNBYnNvbHV0ZSkge1xuICAgIHBhdGggPSAnLic7XG4gIH1cbiAgaWYgKHBhdGggJiYgdHJhaWxpbmdTbGFzaCkge1xuICAgIHBhdGggKz0gJy8nO1xuICB9XG5cbiAgcmV0dXJuIChpc0Fic29sdXRlID8gJy8nIDogJycpICsgcGF0aDtcbn07XG5cbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMuaXNBYnNvbHV0ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguY2hhckF0KDApID09PSAnLyc7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmpvaW4gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHBhdGhzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKTtcbiAgcmV0dXJuIGV4cG9ydHMubm9ybWFsaXplKGZpbHRlcihwYXRocywgZnVuY3Rpb24ocCwgaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIHAgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5qb2luIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSkuam9pbignLycpKTtcbn07XG5cblxuLy8gcGF0aC5yZWxhdGl2ZShmcm9tLCB0bylcbi8vIHBvc2l4IHZlcnNpb25cbmV4cG9ydHMucmVsYXRpdmUgPSBmdW5jdGlvbihmcm9tLCB0bykge1xuICBmcm9tID0gZXhwb3J0cy5yZXNvbHZlKGZyb20pLnN1YnN0cigxKTtcbiAgdG8gPSBleHBvcnRzLnJlc29sdmUodG8pLnN1YnN0cigxKTtcblxuICBmdW5jdGlvbiB0cmltKGFycikge1xuICAgIHZhciBzdGFydCA9IDA7XG4gICAgZm9yICg7IHN0YXJ0IDwgYXJyLmxlbmd0aDsgc3RhcnQrKykge1xuICAgICAgaWYgKGFycltzdGFydF0gIT09ICcnKSBicmVhaztcbiAgICB9XG5cbiAgICB2YXIgZW5kID0gYXJyLmxlbmd0aCAtIDE7XG4gICAgZm9yICg7IGVuZCA+PSAwOyBlbmQtLSkge1xuICAgICAgaWYgKGFycltlbmRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKHN0YXJ0ID4gZW5kKSByZXR1cm4gW107XG4gICAgcmV0dXJuIGFyci5zbGljZShzdGFydCwgZW5kIC0gc3RhcnQgKyAxKTtcbiAgfVxuXG4gIHZhciBmcm9tUGFydHMgPSB0cmltKGZyb20uc3BsaXQoJy8nKSk7XG4gIHZhciB0b1BhcnRzID0gdHJpbSh0by5zcGxpdCgnLycpKTtcblxuICB2YXIgbGVuZ3RoID0gTWF0aC5taW4oZnJvbVBhcnRzLmxlbmd0aCwgdG9QYXJ0cy5sZW5ndGgpO1xuICB2YXIgc2FtZVBhcnRzTGVuZ3RoID0gbGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGZyb21QYXJ0c1tpXSAhPT0gdG9QYXJ0c1tpXSkge1xuICAgICAgc2FtZVBhcnRzTGVuZ3RoID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHZhciBvdXRwdXRQYXJ0cyA9IFtdO1xuICBmb3IgKHZhciBpID0gc2FtZVBhcnRzTGVuZ3RoOyBpIDwgZnJvbVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgb3V0cHV0UGFydHMucHVzaCgnLi4nKTtcbiAgfVxuXG4gIG91dHB1dFBhcnRzID0gb3V0cHV0UGFydHMuY29uY2F0KHRvUGFydHMuc2xpY2Uoc2FtZVBhcnRzTGVuZ3RoKSk7XG5cbiAgcmV0dXJuIG91dHB1dFBhcnRzLmpvaW4oJy8nKTtcbn07XG5cbmV4cG9ydHMuc2VwID0gJy8nO1xuZXhwb3J0cy5kZWxpbWl0ZXIgPSAnOic7XG5cbmV4cG9ydHMuZGlybmFtZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gIGlmICh0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHBhdGggPSBwYXRoICsgJyc7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcuJztcbiAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoMCk7XG4gIHZhciBoYXNSb290ID0gY29kZSA9PT0gNDcgLyovKi87XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMTsgLS1pKSB7XG4gICAgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgLy8gV2Ugc2F3IHRoZSBmaXJzdCBub24tcGF0aCBzZXBhcmF0b3JcbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSByZXR1cm4gaGFzUm9vdCA/ICcvJyA6ICcuJztcbiAgaWYgKGhhc1Jvb3QgJiYgZW5kID09PSAxKSB7XG4gICAgLy8gcmV0dXJuICcvLyc7XG4gICAgLy8gQmFja3dhcmRzLWNvbXBhdCBmaXg6XG4gICAgcmV0dXJuICcvJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZSgwLCBlbmQpO1xufTtcblxuZnVuY3Rpb24gYmFzZW5hbWUocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuXG4gIHZhciBzdGFydCA9IDA7XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIHZhciBpO1xuXG4gIGZvciAoaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICBpZiAocGF0aC5jaGFyQ29kZUF0KGkpID09PSA0NyAvKi8qLykge1xuICAgICAgICAvLyBJZiB3ZSByZWFjaGVkIGEgcGF0aCBzZXBhcmF0b3IgdGhhdCB3YXMgbm90IHBhcnQgb2YgYSBzZXQgb2YgcGF0aFxuICAgICAgICAvLyBzZXBhcmF0b3JzIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZywgc3RvcCBub3dcbiAgICAgICAgaWYgKCFtYXRjaGVkU2xhc2gpIHtcbiAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgIC8vIHBhdGggY29tcG9uZW50XG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICAgIGVuZCA9IGkgKyAxO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlbmQgPT09IC0xKSByZXR1cm4gJyc7XG4gIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0LCBlbmQpO1xufVxuXG4vLyBVc2VzIGEgbWl4ZWQgYXBwcm9hY2ggZm9yIGJhY2t3YXJkcy1jb21wYXRpYmlsaXR5LCBhcyBleHQgYmVoYXZpb3IgY2hhbmdlZFxuLy8gaW4gbmV3IE5vZGUuanMgdmVyc2lvbnMsIHNvIG9ubHkgYmFzZW5hbWUoKSBhYm92ZSBpcyBiYWNrcG9ydGVkIGhlcmVcbmV4cG9ydHMuYmFzZW5hbWUgPSBmdW5jdGlvbiAocGF0aCwgZXh0KSB7XG4gIHZhciBmID0gYmFzZW5hbWUocGF0aCk7XG4gIGlmIChleHQgJiYgZi5zdWJzdHIoLTEgKiBleHQubGVuZ3RoKSA9PT0gZXh0KSB7XG4gICAgZiA9IGYuc3Vic3RyKDAsIGYubGVuZ3RoIC0gZXh0Lmxlbmd0aCk7XG4gIH1cbiAgcmV0dXJuIGY7XG59O1xuXG5leHBvcnRzLmV4dG5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICB2YXIgc3RhcnREb3QgPSAtMTtcbiAgdmFyIHN0YXJ0UGFydCA9IDA7XG4gIHZhciBlbmQgPSAtMTtcbiAgdmFyIG1hdGNoZWRTbGFzaCA9IHRydWU7XG4gIC8vIFRyYWNrIHRoZSBzdGF0ZSBvZiBjaGFyYWN0ZXJzIChpZiBhbnkpIHdlIHNlZSBiZWZvcmUgb3VyIGZpcnN0IGRvdCBhbmRcbiAgLy8gYWZ0ZXIgYW55IHBhdGggc2VwYXJhdG9yIHdlIGZpbmRcbiAgdmFyIHByZURvdFN0YXRlID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhdGgubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICB2YXIgY29kZSA9IHBhdGguY2hhckNvZGVBdChpKTtcbiAgICBpZiAoY29kZSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnRQYXJ0ID0gaSArIDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgaWYgKGVuZCA9PT0gLTEpIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yLCBtYXJrIHRoaXMgYXMgdGhlIGVuZCBvZiBvdXJcbiAgICAgIC8vIGV4dGVuc2lvblxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gICAgaWYgKGNvZGUgPT09IDQ2IC8qLiovKSB7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGRvdCwgbWFyayBpdCBhcyB0aGUgc3RhcnQgb2Ygb3VyIGV4dGVuc2lvblxuICAgICAgICBpZiAoc3RhcnREb3QgPT09IC0xKVxuICAgICAgICAgIHN0YXJ0RG90ID0gaTtcbiAgICAgICAgZWxzZSBpZiAocHJlRG90U3RhdGUgIT09IDEpXG4gICAgICAgICAgcHJlRG90U3RhdGUgPSAxO1xuICAgIH0gZWxzZSBpZiAoc3RhcnREb3QgIT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgYSBub24tZG90IGFuZCBub24tcGF0aCBzZXBhcmF0b3IgYmVmb3JlIG91ciBkb3QsIHNvIHdlIHNob3VsZFxuICAgICAgLy8gaGF2ZSBhIGdvb2QgY2hhbmNlIGF0IGhhdmluZyBhIG5vbi1lbXB0eSBleHRlbnNpb25cbiAgICAgIHByZURvdFN0YXRlID0gLTE7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN0YXJ0RG90ID09PSAtMSB8fCBlbmQgPT09IC0xIHx8XG4gICAgICAvLyBXZSBzYXcgYSBub24tZG90IGNoYXJhY3RlciBpbW1lZGlhdGVseSBiZWZvcmUgdGhlIGRvdFxuICAgICAgcHJlRG90U3RhdGUgPT09IDAgfHxcbiAgICAgIC8vIFRoZSAocmlnaHQtbW9zdCkgdHJpbW1lZCBwYXRoIGNvbXBvbmVudCBpcyBleGFjdGx5ICcuLidcbiAgICAgIHByZURvdFN0YXRlID09PSAxICYmIHN0YXJ0RG90ID09PSBlbmQgLSAxICYmIHN0YXJ0RG90ID09PSBzdGFydFBhcnQgKyAxKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIHJldHVybiBwYXRoLnNsaWNlKHN0YXJ0RG90LCBlbmQpO1xufTtcblxuZnVuY3Rpb24gZmlsdGVyICh4cywgZikge1xuICAgIGlmICh4cy5maWx0ZXIpIHJldHVybiB4cy5maWx0ZXIoZik7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGYoeHNbaV0sIGksIHhzKSkgcmVzLnB1c2goeHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBTdHJpbmcucHJvdG90eXBlLnN1YnN0ciAtIG5lZ2F0aXZlIGluZGV4IGRvbid0IHdvcmsgaW4gSUU4XG52YXIgc3Vic3RyID0gJ2FiJy5zdWJzdHIoLTEpID09PSAnYidcbiAgICA/IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHsgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbikgfVxuICAgIDogZnVuY3Rpb24gKHN0ciwgc3RhcnQsIGxlbikge1xuICAgICAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IHN0ci5sZW5ndGggKyBzdGFydDtcbiAgICAgICAgcmV0dXJuIHN0ci5zdWJzdHIoc3RhcnQsIGxlbik7XG4gICAgfVxuO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiJdfQ==
