(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.easyuidraganddrop = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  options: require('./lib/options'),
  Explorer: require('./lib/explorer'),
  RubbishBin: require('./lib/rubbishBin')
};

},{"./lib/explorer":3,"./lib/options":15,"./lib/rubbishBin":16}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options');

var DroppableElement = function (_Element) {
  _inherits(DroppableElement, _Element);

  function DroppableElement(selector, moveHandler) {
    _classCallCheck(this, DroppableElement);

    var _this = _possibleConstructorReturn(this, (DroppableElement.__proto__ || Object.getPrototypeOf(DroppableElement)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.droppableElements = [];
    return _this;
  }

  _createClass(DroppableElement, [{
    key: 'addDroppableElement',
    value: function addDroppableElement(droppableElement) {
      this.droppableElements.push(droppableElement);
    }
  }, {
    key: 'removeDroppableElement',
    value: function removeDroppableElement(droppableElement) {
      var index = indexOf(this.droppableElements, droppableElement),
          found = index !== -1;

      if (found) {
        this.droppableElements.splice(index, 1);
      }
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntryCollapsedBounds) {
      var bounds = this.getBounds(),
          boundsOverlappingDraggableEntry = bounds.areOverlapping(draggableEntryCollapsedBounds),
          overlappingDraggableEntry = boundsOverlappingDraggableEntry;

      return overlappingDraggableEntry;
    }
  }, {
    key: 'getDroppableElementToBeMarked',
    value: function getDroppableElementToBeMarked(draggableEntry) {
      var droppableElementToBeMarked = this.droppableElements.reduce(function (droppableElementToBeMarked, droppableElement) {
        if (droppableElementToBeMarked === null) {
          if (droppableElement.isToBeMarked(draggableEntry)) {
            ///
            droppableElementToBeMarked = droppableElement;
          }
        }

        return droppableElementToBeMarked;
      }, null);

      return droppableElementToBeMarked;
    }
  }, {
    key: 'getMarkedDroppableElement',
    value: function getMarkedDroppableElement() {
      var markedDroppableElement = this.droppableElements.reduce(function (markedDroppableElement, droppableElement) {
        if (markedDroppableElement === null) {
          var droppableElementMarked = droppableElement.isMarked();

          if (droppableElementMarked) {
            markedDroppableElement = droppableElement;
          }
        }

        return markedDroppableElement;
      }, null);

      return markedDroppableElement;
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarker();
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.removeMarker();
      }
    }
  }, {
    key: 'moveDraggableEntries',
    value: function moveDraggableEntries(draggableEntries, sourcePath, targetPath, done) {
      var pathMaps = this.pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath);

      this.moveHandler(pathMaps, function () {
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectories = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

        if (removeEmptyParentDirectories) {
          draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          var _this2 = this;

          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectories) {
              draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            (function () {
              var sourcePath = draggableEntryPath,
                  ///
              pathMap = find(pathMaps, function (pathMap) {
                var sourceDraggableEntryPath = sourcePath,
                    movedPath = pathMap[sourceDraggableEntryPath],
                    found = movedPath !== undefined;

                return found;
              }),
                  movedPath = pathMap[sourcePath];

              _this2.moveDraggableEntry(draggableEntry, sourcePath, movedPath);
            })();
          }
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, movedPath) {
      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        movedDirectoryPath = movedPath;

        this.moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath);
      } else {
        var file = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        movedFilePath = movedPath; ///

        this.moveFile(file, sourceFilePath, movedFilePath);
      }
    }
  }]);

  return DroppableElement;
}(Element);

module.exports = DroppableElement;

function indexOf(array, element) {
  var index = -1;

  array.some(function (currentElement, currentElementIndex) {
    if (currentElement === element) {
      index = currentElementIndex;

      return true;
    } else {
      return false;
    }
  });

  return index;
}

function find(array, callback) {
  var element = null;

  array.some(function (currentElement) {
    if (callback(currentElement)) {
      element = currentElement;

      return true;
    } else {
      return false;
    }
  });

  return element;
}

function first(array) {
  return array[0];
}
function last(array) {
  return array[array.length - 1];
}

},{"./options":15,"./util":17,"easyui":18}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var util = require('./util'),
    options = require('./options'),
    DroppableElement = require('./droppableElement'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

var Explorer = function (_DroppableElement) {
  _inherits(Explorer, _DroppableElement);

  function Explorer(selector, rootDirectoryName, openHandler, moveHandler) {
    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    var name = rootDirectoryName,
        ///
    explorer = _this,
        ///
    rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer, className: 'directory' });

    _this.openHandler = openHandler;

    _this.options = {};

    _this.rootDirectory = rootDirectory;

    _this.append(rootDirectory);
    return _this;
  }

  _createClass(Explorer, [{
    key: 'setOption',
    value: function setOption(option) {
      this.options[option] = true;
    }
  }, {
    key: 'unsetOption',
    value: function unsetOption(option) {
      delete this.options[option];
    }
  }, {
    key: 'hasOption',
    value: function hasOption(option) {
      option = this.options[option] === true; ///

      return option;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      return this.rootDirectory.getFilePaths();
    }
  }, {
    key: 'getRootDirectoryName',
    value: function getRootDirectoryName() {
      return this.rootDirectory.getName();
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      return this.rootDirectory.getMarkedDirectory();
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      return this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry);
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      return this.rootDirectory.getDraggableEntryPath(draggableEntry);
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      this.rootDirectory.addFile(filePath);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      this.rootDirectory.addDirectory(directoryPath, collapsed);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      this.rootDirectory.removeFile(filePath);
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      this.rootDirectory.removeDirectory(directoryPath);
    }
  }, {
    key: 'addMarkerInPlace',
    value: function addMarkerInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerPath = draggableEntryPath;

        this.rootDirectory.addMarker(markerPath, draggableEntryType);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryMarker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });

      this.append(topmostDirectoryMarker);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        this.rootDirectory.removeMarker();
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        topmostDirectoryMarker.remove();
      }
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var rootDirectoryMarked = this.rootDirectory.isMarked();

      if (rootDirectoryMarked) {
        marked = true;
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        marked = topmostDirectoryMarker !== null;
      }

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'retrieveTopmostDirectoryMarker',
    value: function retrieveTopmostDirectoryMarker() {
      var topmostDirectoryMarker = null;

      var childListElements = this.getChildElements('li');

      childListElements.some(function (childElement) {
        if (childElement instanceof DirectoryMarker) {
          topmostDirectoryMarker = childElement; ///

          return true;
        } else {
          return false;
        }
      });

      return topmostDirectoryMarker;
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerInPlace(draggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDroppableElement = marked ? this : this.getMarkedDroppableElement(),
          markedDirectory = markedDroppableElement.getMarkedDirectory(),
          markedDirectoryPath = markedDirectory !== null ? markedDirectory.getPath() : null,
          draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryPath,
          unmoved = sourcePath === targetPath;

      if (marked && unmoved) {
        this.removeMarker();

        done();
      } else {
        var subDraggableEntries = draggableEntry.getSubEntries(),
            draggableEntries = subDraggableEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDroppableElement.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDroppableElement.removeMarker();

          done();
        });
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerGlobally();
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry) {
      var explorer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;

      var marked = this.isMarked();

      if (marked) {
        var directoryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var within = explorer === this,
              ///
          noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

          if (!noDragging) {
            var markedDirectory = this.getMarkedDirectory();

            directoryOverlappingDraggableEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectory !== directoryOverlappingDraggableEntry) {
              this.removeMarker();

              this.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
            }
          }
        } else {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDroppableElement = this.getMarkedDroppableElement();

        markedDroppableElement.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      var explorer = directory.getExplorer();

      var directoryPath = void 0;

      if (movedDirectoryPath === sourceDirectoryPath) {} else if (movedDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);

        var collapsed = directory.isCollapsed();

        directoryPath = movedDirectoryPath; ///

        this.addDirectory(directoryPath, collapsed);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      var explorer = file.getExplorer();

      var filePath = void 0;

      if (movedFilePath === sourceFilePath) {} else if (movedFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);

        filePath = movedFilePath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'openFile',
    value: function openFile(file) {
      var filePath = file.getPath(this.rootDirectory),
          sourcePath = filePath;

      this.openHandler(sourcePath);
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = sourcePath === null ? util.prependTargetPath(draggableEntryPath, targetPath) : util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, rootDirectoryName, openHandler, moveHandler) {
      return Element.clone(Explorer, selector, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, rootDirectoryName, openHandler, moveHandler) {
      return Element.fromHTML(Explorer, html, rootDirectoryName, openHandler, moveHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var rootDirectoryName = properties.rootDirectoryName;
      var openHandler = properties.openHandler;
      var onMove = properties.onMove;
      var moveHandler = onMove; ///

      return Element.fromProperties(Explorer, properties, rootDirectoryName, openHandler, moveHandler);
    }
  }]);

  return Explorer;
}(DroppableElement);

Object.assign(Explorer, {
  tagName: 'div',
  ignoredAttributes: ['rootDirectoryName', 'openHandler', 'onMove']
});

module.exports = Explorer;

},{"./droppableElement":2,"./explorer/draggableEntry/directory/root":6,"./explorer/entry/marker/directory":11,"./options":15,"./util":17,"easyui":18}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    window = easyui.window,
    React = easyui.React;

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    _this.nameButton = React.createElement(NameButton, { name: name, className: 'name' });

    _this.explorer = explorer;

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.onMouseDown(_this.mouseDownHandler.bind(_this));
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getName',
    value: function getName() {
      return this.nameButton.getName();
    }
  }, {
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'getType',
    value: function getType() {
      return this.type;
    }
  }, {
    key: 'getPath',
    value: function getPath() {
      var path = this.explorer.getDraggableEntryPath(this);

      return path;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var bounds = this.getBounds(),
          collapsedBounds = bounds; ///

      return collapsedBounds;
    }
  }, {
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return false;
    }
  }, {
    key: 'isOverlappingCollapsedBounds',
    value: function isOverlappingCollapsedBounds(collapsedBounds) {
      var bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

      return overlappingCollapsedBounds;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.nameButton.setName(name);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.nameButton.onDoubleClick(handler);
    }
  }, {
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING),
          bounds = this.getBounds();

      var top = bounds.getTop(),
          left = bounds.getLeft();

      this.topOffset = top - mouseTop;
      this.leftOffset = left - mouseLeft;

      top = top + 'px';
      left = left + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      if (escapeKeyStopsDragging) {
        this.on('keydown', this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDragging) {
        this.off('keydown', this.keyDownHandler.bind(this));
      }

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      var top = mouseTop + this.topOffset,
          left = mouseLeft + this.leftOffset;

      top = top + 'px';
      left = left + 'px';

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }, {
    key: 'startWaitingToDrag',
    value: function startWaitingToDrag(mouseTop, mouseLeft, mouseButton) {
      if (this.timeout === null) {
        this.timeout = setTimeout(function () {
          this.timeout = null;

          var rootDirectory = this.isRootDirectory(),
              subEntry = !rootDirectory,
              ///
          noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectory = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY);

          if (noDragging || subEntry && noDraggingSubEntries || rootDirectory && noDraggingRootDirectory) {
            return;
          }

          var mouseOver = this.isMouseOver(mouseTop, mouseLeft);

          if (mouseOver) {
            var startedDragging = this.explorer.startDragging(this);

            if (startedDragging) {
              this.startDragging(mouseTop, mouseLeft);
            }
          }
        }.bind(this), START_DRAGGING_DELAY);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      if (this.timeout !== null) {
        clearTimeout(this.timeout);

        this.timeout = null;
      }
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'isMouseOver',
    value: function isMouseOver(mouseTop, mouseLeft) {
      var collapsedBounds = this.getCollapsedBounds(),
          collapsedBoundsOverlappingMouse = collapsedBounds.isOverlappingMouse(mouseTop, mouseLeft),
          mouseOver = collapsedBoundsOverlappingMouse;

      return mouseOver;
    }
  }, {
    key: 'mouseDownHandler',
    value: function mouseDownHandler(mouseTop, mouseLeft, mouseButton) {
      window.on('mouseup blur', this.mouseUpHandler.bind(this));

      window.onMouseMove(this.mouseMoveHandler.bind(this));

      if (mouseButton === Element.LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
      window.off('mouseup blur', this.mouseUpHandler.bind(this));

      window.offMouseMove(this.mouseMoveHandler.bind(this));

      var dragging = this.isDragging();

      if (dragging) {
        this.explorer.stopDragging(this, function () {
          this.stopDragging();
        }.bind(this));
      } else {
        this.stopWaitingToDrag();
      }
    }
  }, {
    key: 'mouseMoveHandler',
    value: function mouseMoveHandler(mouseTop, mouseLeft, mouseButton) {
      var dragging = this.isDragging();

      if (dragging) {
        this.dragging(mouseTop, mouseLeft);
      }
    }
  }, {
    key: 'keyDownHandler',
    value: function keyDownHandler(event) {
      var keyCode = event.keyCode || event.which;

      if (keyCode === ESCAPE_KEYCODE) {
        var dragging = this.isDragging();

        if (dragging) {
          this.explorer.escapeDragging();

          this.stopDragging();
        }
      }
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return Element.fromProperties.apply(Element, [Class, properties].concat(remainingArguments));
    }
  }]);

  return DraggableEntry;
}(Element);

Object.assign(DraggableEntry, {
  tagName: 'div'
});

module.exports = DraggableEntry;

},{"../options":15,"./nameButton":13,"easyui":18}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    React = easyui.React;

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    ToggleButton = require('../toggleButton'),
    DraggableEntry = require('../draggableEntry');

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name) {
    var collapsed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var explorer = arguments[3];

    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var updateHandler = _this.toggleButtonUpdateHandler.bind(_this),
        toggleButton = React.createElement(ToggleButton, { updateHandler: updateHandler, className: 'toggle' }),
        entries = React.createElement(Entries, { Directory: Directory });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.entries = entries;

    _this.toggleButton = toggleButton;

    _this.append(toggleButton);

    _this.append(entries);

    !collapsed ? _this.expand() : _this.collapse();
    return _this;
  }

  _createClass(Directory, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return true;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          return true;

        case Entry.types.DIRECTORY:

          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;
      }
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = [];

      this.forEachFile(function (file) {
        var subEntry = file; ///

        subEntries.push(subEntry);
      });

      this.forEachDirectory(function (directory) {
        var subEntry = directory,
            ///
        directorySubEntries = directory.getSubEntries();

        subEntries.push(subEntry);

        subEntries = subEntries.concat(directorySubEntries);
      });

      return subEntries;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      var filePaths = [];

      this.forEachFile(function (file) {
        var filePath = file.getPath();

        filePaths.push(filePath);
      });

      this.forEachDirectory(function (directory) {
        var directoryFilePaths = directory.getFilePaths();

        filePaths = filePaths.concat(directoryFilePaths);
      });

      return filePaths;
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: 'isOverlappingDraggableEntry',
    value: function isOverlappingDraggableEntry(draggableEntry) {
      var overlappingDraggableEntry = void 0;

      if (this === draggableEntry) {
        overlappingDraggableEntry = false;
      } else {
        var collapsed = this.isCollapsed();

        if (collapsed) {
          overlappingDraggableEntry = false;
        } else {
          var draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
              overlappingDraggableEntryCollapsedBounds = _get(Directory.prototype.__proto__ || Object.getPrototypeOf(Directory.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.toggleButton.isCollapsed();
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.toggleButton.expand();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.toggleButton.collapse();
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.hasFile(fileName);

        if (!entriesFile) {
          var explorer = this.getExplorer();

          this.entries.addFile(fileName, explorer);
        }
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (!entriesDirectory) {
          var explorer = this.getExplorer();

          this.entries.addDirectory(directoryName, collapsed, explorer);
        }
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var removeEmptyParentDirectories = null; ///

      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

      if (topmostDirectory !== null) {
        var filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

        removeEmptyParentDirectories = topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.hasFile(fileName);

        if (entriesFile) {
          removeEmptyParentDirectories = this.entries.removeFile(fileName);
        }
      }

      if (removeEmptyParentDirectories === true) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var removeEmptyParentDirectories = null; ///

      var addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

      if (topmostDirectory !== null) {
        var directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

        removeEmptyParentDirectories = topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectory = this.entries.hasDirectory(directoryName);

        if (entriesDirectory) {
          removeEmptyParentDirectories = this.entries.removeDirectory(directoryName);
        }
      }

      if (removeEmptyParentDirectories === true) {
        var rootDirectory = this.isRootDirectory();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var topmostDirectoryName = util.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarker(markerName, draggableEntryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

        topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, draggableEntryType);
      }
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var removed = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        this.entries.removeMarker();

        removed = true;
      } else {
        removed = this.entries.someDirectory(function (directory) {
          var removed = directory.removeMarker();

          return removed;
        });
      }

      return removed;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        marked = entriesMarked;
      } else {
        var directoryMarked = this.entries.someDirectory(function (directory) {
          var directoryMarked = directory.isMarked();

          return directoryMarked;
        });

        marked = directoryMarked;
      }

      return marked;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.entries.isEmpty();
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(callback) {
      this.entries.forEachFile(callback);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(callback) {
      this.entries.forEachDirectory(callback);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(callback) {
      this.entries.someDirectory(callback);
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = void 0;

      var name = this.getName();

      if (draggableEntry === this) {
        draggableEntryPath = name; ///
      } else {
        draggableEntryPath = this.entries.getDraggableEntryPath(draggableEntry);

        if (draggableEntryPath !== null) {
          draggableEntryPath = name + '/' + draggableEntryPath;
        }
      }

      return draggableEntryPath;
    }
  }, {
    key: 'topmostDirectory',
    value: function topmostDirectory(path, addIfNecessary) {
      var topmostDirectory = void 0;

      var topmostDirectoryName = util.topmostDirectoryName(path);

      if (topmostDirectoryName === null) {
        topmostDirectory = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

          if (!entriesDirectory) {
            var collapsed = true,
                explorer = this.getExplorer();

            this.entries.addDirectory(topmostDirectoryName, collapsed, explorer);
          }
        }

        topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);
      }

      return topmostDirectory;
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = this.entries.getMarkedDirectory();

      if (markedDirectory === null) {
        var marked = this.isMarked();

        if (marked) {
          markedDirectory = this;
        }
      }

      return markedDirectory;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null;

      var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

      if (overlappingDraggableEntry) {
        directoryOverlappingDraggableEntry = this.entries.getDirectoryOverlappingDraggableEntry(draggableEntry);

        if (directoryOverlappingDraggableEntry === null) {
          directoryOverlappingDraggableEntry = this;
        }
      }

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'toggleButtonUpdateHandler',
    value: function toggleButtonUpdateHandler(collapsed) {
      collapsed ? this.addClass('collapsed') : this.removeClass('collapsed');
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggleButton.toggle();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = Directory;
      }

      var _properties = properties;
      var name = _properties.name;
      var collapsed = _properties.collapsed;
      var explorer = _properties.explorer;


      return DraggableEntry.fromProperties(Class, properties, name, collapsed, explorer);
    }
  }]);

  return Directory;
}(DraggableEntry);

Object.assign(Directory, {
  ignoredAttributes: ['name', 'collapsed', 'explorer']
});

module.exports = Directory;

},{"../../util":17,"../draggableEntry":4,"../entries":8,"../entry":9,"../toggleButton":14,"easyui":18}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var util = require('../../../util'),
    options = require('../../../options'),
    Directory = require('../directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory() {
    _classCallCheck(this, RootDirectory);

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).apply(this, arguments));
  }

  _createClass(RootDirectory, [{
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingEntry = void 0;

      var explorer = this.getExplorer(),
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectories) {
        var overlappingEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryOverlappingEntry = overlappingEntry ? this : null;
      } else {
        directoryOverlappingEntry = _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'getDirectoryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryOverlappingEntry;
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeDirectory', this).call(this, directoryPathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Directory.fromProperties(RootDirectory, properties);
    }
  }]);

  return RootDirectory;
}(Directory);

module.exports = RootDirectory;

},{"../../../options":15,"../../../util":17,"../directory":5}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry'),
    DraggableEntry = require('../draggableEntry');

var File = function (_DraggableEntry) {
  _inherits(File, _DraggableEntry);

  function File(selector, name, explorer) {
    _classCallCheck(this, File);

    var type = Entry.types.FILE;

    var _this = _possibleConstructorReturn(this, (File.__proto__ || Object.getPrototypeOf(File)).call(this, selector, name, explorer, type));

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
  }

  _createClass(File, [{
    key: 'isDirectory',
    value: function isDirectory() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.FILE:
        case Entry.types.MARKER:

          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;
          break;

        case Entry.types.DIRECTORY:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'getSubEntries',
    value: function getSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFile(file);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var name = properties.name;
      var explorer = properties.explorer;


      return DraggableEntry.fromProperties(File, properties, name, explorer);
    }
  }]);

  return File;
}(DraggableEntry);

Object.assign(File, {
  ignoredAttributes: ['name', 'explorer']
});

module.exports = File;

},{"../draggableEntry":4,"../entry":9}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/marker/file'),
    DirectoryMarker = require('./entry/marker/directory');

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, Directory) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

    _this.Directory = Directory;
    return _this;
  }

  _createClass(Entries, [{
    key: 'addFile',
    value: function addFile(fileName, explorer) {
      var file = React.createElement(File, { fileName: fileName, explorer: explorer, className: 'file' }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, explorer) {
      var name = directoryName,
          directory = React.createElement(this.Directory, { name: name, collapsed: collapsed, explorer: explorer, className: 'directory' }),
          entry = directory; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(fileName) {
      var file = this.retrieveFile(fileName),
          explorer = file.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      file.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName),
          explorer = directory.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directory.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'hasFile',
    value: function hasFile(fileName) {
      var file = this.retrieveFile(fileName);

      file = file !== null; ///

      return file;
    }
  }, {
    key: 'hasDirectory',
    value: function hasDirectory(directoryName) {
      var directory = this.retrieveDirectory(directoryName);

      directory = directory !== null; ///

      return directory;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(markerName, draggableEntryType) {
      var marker = void 0;

      var name = markerName; ///

      switch (draggableEntryType) {
        case Entry.types.FILE:
          marker = React.createElement(FileMarker, { name: name, className: 'marker' });
          break;

        case Entry.types.DIRECTORY:
          marker = React.createElement(DirectoryMarker, { name: name, className: 'marker' });
          break;
      }

      var entry = marker; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      var marker = this.retrieveMarker();

      marker.remove();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarker(),
          marked = marker !== null;

      return marked;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var entries = this.getEntries(),
          entriesLength = entries.length,
          empty = entriesLength === 0;

      return empty;
    }
  }, {
    key: 'addEntry',
    value: function addEntry(entry) {
      var nextEntry = entry,
          entries = this.getEntries();

      var previousEntry = null;

      entries.some(function (entry) {
        var nextEntryBefore = nextEntry.isBefore(entry);

        if (nextEntryBefore) {
          previousEntry = entry;

          return true;
        } else {
          return false;
        }
      });

      if (previousEntry === null) {
        this.append(nextEntry);
      } else {
        nextEntry.insertBefore(previousEntry);
      }
    }
  }, {
    key: 'retrieveFile',
    value: function retrieveFile(fileName) {
      return this.retrieveEntryByType(fileName, Entry.types.FILE);
    }
  }, {
    key: 'retrieveDirectory',
    value: function retrieveDirectory(directoryName) {
      return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY);
    }
  }, {
    key: 'retrieveMarker',
    value: function retrieveMarker() {
      var marker = null;

      var type = Entry.types.MARKER;

      this.someEntryByType(function (entry) {
        marker = entry; ///

        return true;
      }, type);

      return marker;
    }
  }, {
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      this.someDirectory(function (directory) {
        markedDirectory = directory.getMarkedDirectory();

        if (markedDirectory !== null) {
          return true;
        } else {
          return false;
        }
      });

      return markedDirectory;
    }
  }, {
    key: 'getDraggableEntryPath',
    value: function getDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = null;

      this.someEntry(function (entry) {
        if (entry === draggableEntry) {
          ///
          var entryName = entry.getName();

          draggableEntryPath = entryName; ///

          return true;
        } else {
          return false;
        }
      });

      if (draggableEntryPath === null) {
        this.someDirectory(function (directory) {
          var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          } else {
            return false;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null;

      this.someDirectory(function (directory) {
        directoryOverlappingDraggableEntry = directory.getDirectoryOverlappingDraggableEntry(draggableEntry);

        if (directoryOverlappingDraggableEntry !== null) {
          return true;
        } else {
          return false;
        }
      });

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'forEachFile',
    value: function forEachFile(callback) {
      this.forEachEntryByType(callback, Entry.types.FILE);
    }
  }, {
    key: 'forEachDirectory',
    value: function forEachDirectory(callback) {
      this.forEachEntryByType(callback, Entry.types.DIRECTORY);
    }
  }, {
    key: 'someFile',
    value: function someFile(callback) {
      return this.someEntryByType(callback, Entry.types.FILE);
    }
  }, {
    key: 'someDirectory',
    value: function someDirectory(callback) {
      return this.someEntryByType(callback, Entry.types.DIRECTORY);
    }
  }, {
    key: 'forEachEntry',
    value: function forEachEntry(callback) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        callback(entry);
      });
    }
  }, {
    key: 'forEachEntryByType',
    value: function forEachEntryByType(callback, type) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          callback(entry);
        }
      });
    }
  }, {
    key: 'someEntry',
    value: function someEntry(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: 'someEntryByType',
    value: function someEntryByType(callback, type) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        var entryType = entry.getType();

        if (entryType === type) {
          return callback(entry);
        } else {
          return false;
        }
      });
    }
  }, {
    key: 'retrieveEntryByType',
    value: function retrieveEntryByType(name, type) {
      var foundEntry = null;

      this.someEntryByType(function (entry) {
        var entryName = entry.getName();

        if (entryName === name) {
          foundEntry = entry;

          return true;
        } else {
          return false;
        }
      }, type);

      var entry = foundEntry; ///

      return entry;
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var childListElements = this.getChildElements('li'),
          entries = childListElements; ///

      return entries;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var Directory = properties.Directory;


      return Element.fromProperties(Entries, properties, Directory);
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  ignoredAttributes: ['Directory']
});

module.exports = Entries;

},{"../options":15,"./draggableEntry/file":7,"./entry":9,"./entry/marker/directory":11,"./entry/marker/file":12,"easyui":18}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element,
    React = easyui.React;

var NameButton = require('./nameButton');

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    _this.nameButton = React.createElement(NameButton, { name: name, className: 'name' });

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
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var name = properties.name;


      return Element.fromProperties(Class, properties, name);
    }
  }]);

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  ignoredAttributes: ['name'],
  types: {
    FILE: 'FILE',
    MARKER: 'MARKER',
    DIRECTORY: 'DIRECTORY'
  }
});

module.exports = Entry;

},{"./nameButton":13,"easyui":18}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry');

var Marker = function (_Entry) {
  _inherits(Marker, _Entry);

  function Marker(selector, name) {
    _classCallCheck(this, Marker);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, selector, name, type));
  }

  _createClass(Marker, null, [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      return Entry.fromProperties(Class, properties);
    }
  }]);

  return Marker;
}(Entry);

module.exports = Marker;

},{"../entry":9}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    Marker = require('../marker');

var DirectoryMarker = function (_Marker) {
  _inherits(DirectoryMarker, _Marker);

  function DirectoryMarker() {
    _classCallCheck(this, DirectoryMarker);

    return _possibleConstructorReturn(this, (DirectoryMarker.__proto__ || Object.getPrototypeOf(DirectoryMarker)).apply(this, arguments));
  }

  _createClass(DirectoryMarker, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = entryType === Entry.types.FILE ? true : name.localeCompare(entryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Marker.fromProperties(DirectoryMarker, properties);
    }
  }]);

  return DirectoryMarker;
}(Marker);

module.exports = DirectoryMarker;

},{"../../entry":9,"../marker":10}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    Marker = require('../marker');

var FileMarker = function (_Marker) {
  _inherits(FileMarker, _Marker);

  function FileMarker() {
    _classCallCheck(this, FileMarker);

    return _possibleConstructorReturn(this, (FileMarker.__proto__ || Object.getPrototypeOf(FileMarker)).apply(this, arguments));
  }

  _createClass(FileMarker, [{
    key: 'isBefore',
    value: function isBefore(entry) {
      var name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = entryType === Entry.types.DIRECTORY ? false : name.localeCompare(entryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return Marker.fromProperties(FileMarker, properties);
    }
  }]);

  return FileMarker;
}(Marker);

module.exports = FileMarker;

},{"../../entry":9,"../marker":10}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    InputElement = easyui.InputElement;

var NameButton = function (_InputElement) {
  _inherits(NameButton, _InputElement);

  function NameButton(selector, name, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, selector));

    _this.setName(name);

    if (doubleClickHandler) {
      _this.onDoubleClick(doubleClickHandler);
    }
    return _this;
  }

  _createClass(NameButton, [{
    key: 'getName',
    value: function getName() {
      var name = this.html(); ///

      return name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      var html = name; ///

      this.html(html);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var name = properties.name;
      var onDoubleClick = properties.onDoubleClick;
      var doubleClickHandler = onDoubleClick; ///

      return InputElement.fromProperties(NameButton, properties, name, doubleClickHandler);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  type: 'button',
  ignoredAttributes: ['name', 'onDoubleClick']
});

module.exports = NameButton;

},{"easyui":18}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    InputElement = easyui.InputElement;

var ToggleButton = function (_InputElement) {
  _inherits(ToggleButton, _InputElement);

  function ToggleButton(selector, updateHandler) {
    _classCallCheck(this, ToggleButton);

    var _this = _possibleConstructorReturn(this, (ToggleButton.__proto__ || Object.getPrototypeOf(ToggleButton)).call(this, selector));

    _this.updateHandler = updateHandler;

    _this.onClick(_this.clickHandler.bind(_this));
    return _this;
  }

  _createClass(ToggleButton, [{
    key: 'isCollapsed',
    value: function isCollapsed() {
      return this.collapsed;
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.collapsed = false;

      this.update();
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.collapsed = true;

      this.update();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.collapsed = !this.collapsed;

      this.update();
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      this.toggle();
    }
  }, {
    key: 'update',
    value: function update() {
      var html = this.collapsed ? ToggleButton.BLACK_RIGHT_POINTING_TRIANGLE : ToggleButton.BLACK_DOWN_POINTING_TRIANGLE;

      this.html(html);

      this.updateHandler(this.collapsed);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var updateHandler = properties.updateHandler;


      return InputElement.fromProperties(ToggleButton, properties, updateHandler);
    }
  }]);

  return ToggleButton;
}(InputElement);

Object.assign(ToggleButton, {
  tagName: 'button',
  ignoredAttributes: ['updateHandler'],
  BLACK_RIGHT_POINTING_TRIANGLE: '&#x025b6',
  BLACK_DOWN_POINTING_TRIANGLE: '&#x025bc'
});

module.exports = ToggleButton;

},{"easyui":18}],15:[function(require,module,exports){
'use strict';

var options = {
  NO_DRAGGING: 'NO_DRAGGING',
  NO_DRAGGING_WITHIN: 'NO_DRAGGING_WITHIN',
  NO_DRAGGING_SUB_ENTRIES: 'NO_DRAGGING_SUB_ENTRIES',
  NO_DRAGGING_ROOT_DIRECTORY: 'NO_DRAGGING_ROOT_DIRECTORY',
  NO_DRAGGING_INTO_SUB_DIRECTORIES: 'NO_DRAGGING_INTO_SUB_DIRECTORIES',
  REMOVE_EMPTY_PARENT_DIRECTORIES: 'REMOVE_EMPTY_PARENT_DIRECTORIES',
  ESCAPE_KEY_STOPS_DRAGGING: 'ESCAPE_KEY_STOPS_DRAGGING'
};

module.exports = options;

},{}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easyui = require('easyui'),
    Element = easyui.Element;

var DroppableElement = require('./droppableElement');

var RubbishBin = function (_DroppableElement) {
  _inherits(RubbishBin, _DroppableElement);

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var droppableElementMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, droppableElementMoveHandler));

    _this.close();
    return _this;
  }

  _createClass(RubbishBin, [{
    key: 'getMarkedDirectory',
    value: function getMarkedDirectory() {
      var markedDirectory = null;

      return markedDirectory;
    }
  }, {
    key: 'getDirectoryOverlappingDraggableEntry',
    value: function getDirectoryOverlappingDraggableEntry(draggableEntry) {
      var directoryOverlappingDraggableEntry = null; ///

      return directoryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      this.open();
    }
  }, {
    key: 'removeMarker',
    value: function removeMarker() {
      this.close();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var open = this.isOpen(),
          marked = open; ///

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

      return toBeMarked;
    }
  }, {
    key: 'dragging',
    value: function dragging(draggableEntry, explorer) {
      var marked = this.isMarked();

      if (marked) {
        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (!toBeMarked) {
          var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggableEntry);

          if (droppableElementToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            droppableElementToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, movedDirectoryPath) {
      if (movedDirectoryPath === null) {
        var explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, movedFilePath) {
      if (movedFilePath === null) {
        var explorer = file.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      }
    }
  }, {
    key: 'open',
    value: function open() {
      this.addClass('open');
    }
  }, {
    key: 'close',
    value: function close() {
      this.removeClass('open');
    }
  }, {
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
    }
  }, {
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = {},
            draggableEntryPath = draggableEntry.getPath(),
            sourceDraggableEntryPath = draggableEntryPath,
            ///
        targetDraggableEntryPath = null;

        pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

        return pathMap;
      });

      return pathMaps;
    }
  }], [{
    key: 'clone',
    value: function clone(selector, removeHandler) {
      return Element.clone(RubbishBin, selector, removeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, removeHandler) {
      return Element.fromHTML(RubbishBin, html, removeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove;
      var removeHandler = onRemove; ///

      return Element.fromProperties(RubbishBin, properties, removeHandler);
    }
  }]);

  return RubbishBin;
}(DroppableElement);

Object.assign(RubbishBin, {
  tagName: 'div',
  ignoredAttributes: ['onRemove']
});

module.exports = RubbishBin;

},{"./droppableElement":2,"easyui":18}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = function () {
  function util() {
    _classCallCheck(this, util);
  }

  _createClass(util, null, [{
    key: 'isPathTopmostDirectoryName',
    value: function isPathTopmostDirectoryName(path) {
      var topmostDirectoryName = util.topmostDirectoryName(path),
          pathTopmostDirectoryName = topmostDirectoryName === null; ///

      return pathTopmostDirectoryName;
    }
  }, {
    key: 'bottommostName',
    value: function bottommostName(path) {
      var bottommostName = null;

      var matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = second(matches);

        bottommostName = secondMatch; ///
      }

      return bottommostName;
    }
  }, {
    key: 'topmostDirectoryName',
    value: function topmostDirectoryName(path) {
      var topmostDirectoryName = null;

      var matches = path.match(/^([^\/]*)\//);

      if (matches !== null) {
        var secondMatch = second(matches);

        topmostDirectoryName = secondMatch; ///
      }

      return topmostDirectoryName;
    }
  }, {
    key: 'pathWithoutBottommostName',
    value: function pathWithoutBottommostName(path) {
      var pathWithoutBottommostName = null;

      var matches = path.match(/(^.*)\/[^\/]*$/);

      if (matches !== null) {
        var secondMatch = second(matches);

        pathWithoutBottommostName = secondMatch; ///
      }

      return pathWithoutBottommostName;
    }
  }, {
    key: 'pathWithoutTopmostDirectoryName',
    value: function pathWithoutTopmostDirectoryName(path) {
      var pathWithoutTopmostDirectoryName = null;

      var matches = path.match(/^[^\/]*\/(.*$)/);

      if (matches !== null) {
        var secondMatch = second(matches);

        pathWithoutTopmostDirectoryName = secondMatch;
      }

      return pathWithoutTopmostDirectoryName;
    }
  }, {
    key: 'prependTargetPath',
    value: function prependTargetPath(entryPath, targetPath) {
      entryPath = targetPath + '/' + entryPath;

      return entryPath;
    }
  }, {
    key: 'replaceSourcePathWithTargetPath',
    value: function replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath) {
      var regExp = new RegExp('^' + sourcePath + '(.*$)'),
          matches = entryPath.match(regExp),
          secondMatch = second(matches);

      entryPath = targetPath + secondMatch; ///

      return entryPath;
    }
  }]);

  return util;
}();

module.exports = util;

function second(array) {
  return array[1];
}

},{}],18:[function(require,module,exports){
'use strict';

module.exports = {
  React: require('./lib/react'),
  Element: require('./lib/element'),
  InputElement: require('./lib/inputElement'),
  document: require('./lib/document'),
  window: require('./lib/window'),
  Div: require('./lib/element/div'),
  Span: require('./lib/element/span'),
  Body: require('./lib/element/body'),
  Link: require('./lib/inputElement/link'),
  Input: require('./lib/inputElement/input'),
  Select: require('./lib/inputElement/select'),
  Button: require('./lib/inputElement/button'),
  Checkbox: require('./lib/inputElement/checkbox'),
  Textarea: require('./lib/inputElement/textarea'),
  Bounds: require('./lib/misc/bounds'),
  Offset: require('./lib/misc/offset')
};

},{"./lib/document":19,"./lib/element":20,"./lib/element/body":21,"./lib/element/div":22,"./lib/element/span":23,"./lib/inputElement":24,"./lib/inputElement/button":25,"./lib/inputElement/checkbox":26,"./lib/inputElement/input":27,"./lib/inputElement/link":28,"./lib/inputElement/select":29,"./lib/inputElement/textarea":30,"./lib/misc/bounds":31,"./lib/misc/offset":32,"./lib/react":38,"./lib/window":39}],19:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse');

var Document = function Document() {
  _classCallCheck(this, Document);

  this.domElement = document;

  this.handlersMap = {};
};

Object.assign(Document.prototype, eventMixin);
Object.assign(Document.prototype, clickMixin);
Object.assign(Document.prototype, mouseMixin);

module.exports = new Document(); ///

},{"./mixin/click":33,"./mixin/event":34,"./mixin/mouse":36}],20:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = require('./misc/offset'),
    Bounds = require('./misc/bounds'),
    jsxMixin = require('./mixin/jsx'),
    eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse'),
    resizeMixin = require('./mixin/resize');

var Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.domElement = domElementFromSelector(selector);

    this.domElement.__element__ = this;

    this.handlersMap = {};
  }

  _createClass(Element, [{
    key: 'clone',
    value: function clone() {
      return Element.clone(this);
    }
  }, {
    key: 'getOffset',
    value: function getOffset() {
      var top = this.domElement.offsetTop,
          ///
      left = this.domElement.offsetLeft,
          ///
      offset = new Offset(top, left);

      return offset;
    }
  }, {
    key: 'getBounds',
    value: function getBounds() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);

      return bounds;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var width = includeBorder ? this.domElement.offsetWidth : this.domElement.clientWidth;

      return width;
    }
  }, {
    key: 'setWidth',
    value: function setWidth(width) {
      this.domElement.style.width = width + 'px';
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var height = includeBorder ? this.domElement.offsetHeight : this.domElement.clientHeight;

      return height;
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      this.domElement.style.height = height + 'px';
    }
  }, {
    key: 'getAttribute',
    value: function getAttribute(name) {
      return this.domElement.getAttribute(name);
    }
  }, {
    key: 'setAttribute',
    value: function setAttribute(name, value) {
      this.domElement.setAttribute(name, value);
    }
  }, {
    key: 'clearAttribute',
    value: function clearAttribute(name) {
      this.domElement.removeAttribute(name);
    }
  }, {
    key: 'addAttribute',
    value: function addAttribute(name, value) {
      this.setAttribute(name, value);
    }
  }, {
    key: 'removeAttribute',
    value: function removeAttribute(name) {
      this.clearAttribute(name);
    }
  }, {
    key: 'setClass',
    value: function setClass(className) {
      this.domElement.className = className;
    }
  }, {
    key: 'addClass',
    value: function addClass(className) {
      this.domElement.classList.add(className);
    }
  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      this.domElement.classList.remove(className);
    }
  }, {
    key: 'toggleClass',
    value: function toggleClass(className) {
      this.domElement.classList.toggle(className);
    }
  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      return this.domElement.classList.contains(className);
    }
  }, {
    key: 'clearClasses',
    value: function clearClasses() {
      this.domElement.className = '';
    }
  }, {
    key: 'prepend',
    value: function prepend(elementOrString) {
      var domElement = domElementFromElementOrString(elementOrString),
          firstChildDOMElement = this.domElement.firstChild;

      this.domElement.insertBefore(domElement, firstChildDOMElement);
    }
  }, {
    key: 'append',
    value: function append(elementOrString) {
      var domElement = domElementFromElementOrString(elementOrString);

      this.domElement.insertBefore(domElement, null); ///
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parentElement) {
      var parentDOMElement = parentElement.domElement,
          firstSiblingDOMElement = parentDOMElement.firstChild; ///

      parentDOMElement.insertBefore(this.domElement, firstSiblingDOMElement);
    }
  }, {
    key: 'prependTo',
    value: function prependTo(parentElement) {
      var parentDOMElement = parentElement.domElement;

      parentDOMElement.insertBefore(this.domElement, null); ///
    }
  }, {
    key: 'removeFrom',
    value: function removeFrom(parentElement) {
      var parentDOMElement = parentElement.domElement;

      parentDOMElement.removeChild(this.domElement);
    }
  }, {
    key: 'remove',
    value: function remove(element) {
      if (element) {
        var domElement = element.domElement;

        this.domElement.removeChild(domElement);
      } else {
        this.domElement.remove();
      }
    }
  }, {
    key: 'insertBefore',
    value: function insertBefore(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement);
    }
  }, {
    key: 'insertAfter',
    value: function insertAfter(siblingElement) {
      var parentDOMNode = siblingElement.domElement.parentNode,
          siblingDOMElement = siblingElement.domElement;

      parentDOMNode.insertBefore(this.domElement, siblingDOMElement.nextSibling); ///
    }
  }, {
    key: 'show',
    value: function show() {
      var displayStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'block';
      this.domElement.style.display = displayStyle;
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.domElement.style.display = 'none';
    }
  }, {
    key: 'enable',
    value: function enable() {
      this.clearAttribute('disabled');
    }
  }, {
    key: 'disable',
    value: function disable() {
      this.setAttribute('disabled', 'disabled');
    }
  }, {
    key: 'html',
    value: function html(_html) {
      if (_html === undefined) {
        _html = this.domElement.innerHTML; ///

        return _html;
      } else {
        var innerHTML = _html; ///

        this.domElement.innerHTML = innerHTML;
      }
    }
  }, {
    key: 'css',
    value: function css(_css) {
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

          this.domElement.style[name] = value;
        }.bind(this));
      }
    }
  }, {
    key: 'getDescendantElements',
    value: function getDescendantElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var descendantDOMElements = this.domElement.querySelectorAll(selector),
          descendantElements = elementsFromDOMElements(descendantDOMElements);

      return descendantElements;
    }
  }, {
    key: 'getChildElements',
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var descendantDOMElements = this.domElement.querySelectorAll(selector),
          allChildDOMElements = this.domElement.children,
          childDOMElements = filter(allChildDOMElements, function (childDOMElement) {
        return some(descendantDOMElements, function (descendantDOMElement) {
          return descendantDOMElement === childDOMElement;
        });
      }),
          childElements = elementsFromDOMElements(childDOMElements);

      return childElements;
    }
  }, {
    key: 'getParentElement',
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
    key: 'getAscendantElements',
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
  }], [{
    key: 'clone',
    value: function clone(Class, element) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      if (Class instanceof Element) {
        element = Class;
        remainingArguments.shift();
        Class = Element;
      }

      var deep = true,
          domElement = element.domElement.cloneNode(deep);

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new (Function.prototype.bind.apply(Class, remainingArguments))();
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(Class, html) {
      for (var _len2 = arguments.length, remainingArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      if (typeof Class === 'string') {
        html = Class;
        remainingArguments.shift();
        Class = Element;
      }

      var outerDOMElement = document.createElement('div');

      outerDOMElement.innerHTML = html; ///

      var domElement = outerDOMElement.firstChild;

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new (Function.prototype.bind.apply(Class, remainingArguments))();
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(Class, domElement) {
      for (var _len3 = arguments.length, remainingArguments = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      if ((typeof Class === 'undefined' ? 'undefined' : _typeof(Class)) === 'object') {
        domElement = Class;
        remainingArguments.shift();
        Class = Element;
      }

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new (Function.prototype.bind.apply(Class, remainingArguments))();
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len4 = arguments.length, remainingArguments = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      var tagName = Class.tagName,
          ignoredProperties = Class.ignoredProperties,
          additionalProperties = Class.additionalProperties,
          html = '<' + tagName + '></' + tagName + '>',
          element = Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments));

      element.applyProperties(properties, ignoredProperties, additionalProperties);

      return element;
    }
  }]);

  return Element;
}();

Object.assign(Element.prototype, jsxMixin);
Object.assign(Element.prototype, eventMixin);
Object.assign(Element.prototype, clickMixin);
Object.assign(Element.prototype, mouseMixin);
Object.assign(Element.prototype, resizeMixin);

Element.LEFT_MOUSE_BUTTON = 0;
Element.MIDDLE_MOUSE_BUTTON = 1;
Element.RIGHT_MOUSE_BUTTON = 2;

module.exports = Element;

function domElementFromSelector(selector) {
  var domElement = typeof selector === 'string' ? document.querySelectorAll(selector)[0] : ///
  selector; ///

  return domElement;
}

function domElementFromElementOrString(elementOrString) {
  var domElement = void 0;

  if (typeof elementOrString === 'string') {
    var string = elementOrString; ///

    domElement = document.createTextNode(string); ///
  } else {
    var element = elementOrString; ///

    domElement = element.domElement;
  }

  return domElement;
}

function elementsFromDOMElements(domElements) {
  var domElementsWithElements = filter(domElements, function (domElement) {
    return domElement.__element__ !== undefined;
  }),
      elements = domElementsWithElements.map(function (domElement) {
    return domElement.__element__;
  });

  return elements;
}

function some(array, test) {
  var result = false;

  for (var index = 0; index < array.length; index++) {
    var element = array[index];

    result = test(element);

    if (result) {
      result = true;

      break;
    }
  }

  return result;
}

function filter(array, test) {
  var filteredArray = [];

  for (var index = 0; index < array.length; index++) {
    var element = array[index],
        result = test(element);

    if (result) {
      filteredArray.push(element);
    }
  }

  return filteredArray;
}

function first(array) {
  return array[0];
}

},{"./misc/bounds":31,"./misc/offset":32,"./mixin/click":33,"./mixin/event":34,"./mixin/jsx":35,"./mixin/mouse":36,"./mixin/resize":37}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Body = function (_Element) {
  _inherits(Body, _Element);

  function Body() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

    _classCallCheck(this, Body);

    return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).call(this, selector));
  }

  _createClass(Body, [{
    key: 'clone',
    value: function clone() {
      return Body.clone(this);
    }
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Body, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Body, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Body, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = Body;
      }

      return Element.fromProperties(Class, properties);
    }
  }]);

  return Body;
}(Element);

Body.tagName = 'body';

module.exports = Body;

},{"../element":20}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Div = function (_Element) {
  _inherits(Div, _Element);

  function Div(selector) {
    _classCallCheck(this, Div);

    return _possibleConstructorReturn(this, (Div.__proto__ || Object.getPrototypeOf(Div)).call(this, selector));
  }

  _createClass(Div, [{
    key: 'clone',
    value: function clone() {
      return Div.clone(this);
    }
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Div, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Div, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Div, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = Div;
      }

      return Element.fromProperties(Class, properties);
    }
  }]);

  return Div;
}(Element);

Div.tagName = 'div';

module.exports = Div;

},{"../element":20}],23:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Span = function (_Element) {
  _inherits(Span, _Element);

  function Span(selector) {
    _classCallCheck(this, Span);

    return _possibleConstructorReturn(this, (Span.__proto__ || Object.getPrototypeOf(Span)).call(this, selector));
  }

  _createClass(Span, [{
    key: 'clone',
    value: function clone() {
      return Span.clone(this);
    }
  }], [{
    key: 'clone',
    value: function clone(element) {
      return Element.clone(Span, element);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html) {
      return Element.fromHTML(Span, html);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement) {
      return Element.fromDOMElement(Span, domElement);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = Span;
      }

      return Element.fromProperties(Class, properties);
    }
  }]);

  return Span;
}(Element);

Span.tagName = 'span';

module.exports = Span;

},{"../element":20}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('./element');

var InputElement = function (_Element) {
  _inherits(InputElement, _Element);

  function InputElement(selector) {
    _classCallCheck(this, InputElement);

    return _possibleConstructorReturn(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).call(this, selector));
  }

  _createClass(InputElement, [{
    key: 'hasFocus',
    value: function hasFocus() {
      var focus = document.activeElement === this.domElement; ///

      return focus;
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.domElement.focus();
    }
  }], [{
    key: 'clone',
    value: function clone(Class, element) {
      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      return Element.clone.apply(Element, [Class, element].concat(remainingArguments));
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(Class, html) {
      for (var _len2 = arguments.length, remainingArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

      return Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments));
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(Class, domElement) {
      for (var _len3 = arguments.length, remainingArguments = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        remainingArguments[_key3 - 2] = arguments[_key3];
      }

      return Element.fromDOMElement.apply(Element, [Class, domElement].concat(remainingArguments));
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      for (var _len4 = arguments.length, remainingArguments = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        remainingArguments[_key4 - 2] = arguments[_key4];
      }

      return Element.fromProperties.apply(Element, [Class, properties].concat(remainingArguments));
    }
  }]);

  return InputElement;
}(Element);

module.exports = InputElement;

},{"./element":20}],25:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Button = function (_InputElement) {
  _inherits(Button, _InputElement);

  function Button(selector, clickHandler) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, selector));

    if (clickHandler) {
      _this.onClick(clickHandler);
    }
    return _this;
  }

  _createClass(Button, [{
    key: 'clone',
    value: function clone(clickHandler) {
      return Button.clone(this, clickHandler);
    }
  }, {
    key: 'onClick',
    value: function onClick(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateClickHandler;
      }

      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'onClick', this).call(this, handler);
    }
  }, {
    key: 'offClick',
    value: function offClick(handler) {
      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'offClick', this).call(this, handler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return InputElement.clone(Button, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return InputElement.fromHTML(Button, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return InputElement.fromDOMElement(Button, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick; ///

      return InputElement.fromProperties(Button, properties, clickHandler);
    }
  }]);

  return Button;
}(InputElement);

Object.assign(Button, {
  tagName: 'button',
  ignoredProperties: ['onClick']
});

module.exports = Button;

function defaultIntermediateClickHandler(handler, event) {
  var mouseButton = event.button,
      preventDefault = handler(mouseButton);

  return preventDefault;
}

},{"../inputElement":24}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Checkbox = function (_InputElement) {
  _inherits(Checkbox, _InputElement);

  function Checkbox(selector, changeHandler) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, selector));

    if (changeHandler) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(Checkbox, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Checkbox.clone(this, changeHandler);
    }
  }, {
    key: 'onChange',
    value: function onChange(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateChangeHandler.bind(this);
      }

      this.on('click', handler); ///
    }
  }, {
    key: 'offChange',
    value: function offChange(handler) {
      this.off('click', handler); ///
    }
  }, {
    key: 'check',
    value: function check() {
      var checked = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      checked ? this.setAttribute('checked', 'checked') : this.clearAttribute('checked');
    }
  }, {
    key: 'isChecked',
    value: function isChecked() {
      return this.domElement.checked;
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Checkbox, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Checkbox, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Checkbox, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///    

      return InputElement.fromProperties(Checkbox, properties, changeHandler);
    }
  }]);

  return Checkbox;
}(InputElement);

Object.assign(Checkbox, {
  tagName: 'input',
  ignoredProperties: ['onChange'],
  additionalProperties: {
    type: 'checkbox'
  }
});

module.exports = Checkbox;

function defaultIntermediateChangeHandler(handler, event) {
  var checked = this.isChecked(),
      preventDefault = handler(checked);

  return preventDefault;
}

},{"../inputElement":24}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Input = function (_InputElement) {
  _inherits(Input, _InputElement);

  function Input(selector, changeHandler) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, selector));

    if (changeHandler) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(Input, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Input.clone(this, changeHandler);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.domElement.value;
    }
  }, {
    key: 'getSelectionStart',
    value: function getSelectionStart() {
      return this.domElement.selectionStart;
    }
  }, {
    key: 'getSelectionEnd',
    value: function getSelectionEnd() {
      return this.domElement.selectionEnd;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.domElement.value = value;
    }
  }, {
    key: 'setSelectionStart',
    value: function setSelectionStart(selectionStart) {
      this.domElement.selectionStart = selectionStart;
    }
  }, {
    key: 'setSelectionEnd',
    value: function setSelectionEnd(selectionEnd) {
      this.domElement.selectionEnd = selectionEnd;
    }
  }, {
    key: 'onChange',
    value: function onChange(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateChangeHandler.bind(this);
      }

      this.on('change', handler);
    }
  }, {
    key: 'offChange',
    value: function offChange(handler) {
      this.off('change', handler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Input, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Input, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Input, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///    

      return InputElement.fromProperties(Input, properties, changeHandler);
    }
  }]);

  return Input;
}(InputElement);

Object.assign(Input, {
  tagName: 'input',
  ignoredProperties: ['onChange']
});

module.exports = Input;

function defaultIntermediateChangeHandler(handler, event) {
  var value = this.getValue(),
      preventDefault = handler(value);

  return preventDefault;
}

},{"../inputElement":24}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Link = function (_InputElement) {
  _inherits(Link, _InputElement);

  function Link(selector, clickHandler) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, selector));

    if (clickHandler) {
      _this.onClick(clickHandler);
    }
    return _this;
  }

  _createClass(Link, [{
    key: 'clone',
    value: function clone(clickHandler) {
      return Link.clone(this, clickHandler);
    }
  }, {
    key: 'onClick',
    value: function onClick(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateClickHandler.bind(this);
      }

      this.on('click', handler);
    }
  }, {
    key: 'offClick',
    value: function offClick(handler) {
      this.off('click', handler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return InputElement.clone(Link, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return InputElement.fromHTML(Link, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return InputElement.fromDOMElement(Link, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick; ///    

      return InputElement.fromProperties(Link, properties, clickHandler);
    }
  }]);

  return Link;
}(InputElement);

Object.assign(Link, {
  tagName: 'a',
  ignoredProperties: ['onClick']
});

module.exports = Link;

function defaultIntermediateClickHandler(handler, event) {
  var href = this.getAttribute('href'),
      preventDefault = handler(href);

  return preventDefault;
}

},{"../inputElement":24}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Select = function (_InputElement) {
  _inherits(Select, _InputElement);

  function Select(selector, changeHandler) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, selector));

    if (changeHandler) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(Select, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Select.clone(this, changeHandler);
    }
  }, {
    key: 'getSelectedOptionValue',
    value: function getSelectedOptionValue() {
      return this.domElement.value;
    } ///

  }, {
    key: 'setSelectedOptionByValue',
    value: function setSelectedOptionByValue(value) {
      this.domElement.value = value;
    } ///

  }, {
    key: 'onChange',
    value: function onChange(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateChangeHandler.bind(this);
      }

      this.on('change', handler);
    }
  }, {
    key: 'offChange',
    value: function offChange(handler) {
      this.off('change', handler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Select, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Select, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Select, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///    

      return InputElement.fromProperties(Select, properties, changeHandler);
    }
  }]);

  return Select;
}(InputElement);

Object.assign(Select, {
  tagName: 'select',
  ignoredProperties: ['onChange']
});

module.exports = Select;

function defaultIntermediateChangeHandler(handler, event) {
  var selectedOptionValue = this.getSelectedOptionValue(),
      preventDefault = handler(selectedOptionValue);

  return preventDefault;
}

},{"../inputElement":24}],30:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Textarea = function (_InputElement) {
  _inherits(Textarea, _InputElement);

  function Textarea(selector, changeHandler, scrollHandler) {
    _classCallCheck(this, Textarea);

    var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, selector));

    if (changeHandler) {
      _this.onChange(changeHandler);
    }

    if (scrollHandler) {
      _this.onScroll(scrollHandler);
    }
    return _this;
  }

  _createClass(Textarea, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Textarea.clone(this, changeHandler);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.domElement.value;
    }
  }, {
    key: 'getSelectionStart',
    value: function getSelectionStart() {
      return this.domElement.selectionStart;
    }
  }, {
    key: 'getSelectionEnd',
    value: function getSelectionEnd() {
      return this.domElement.selectionEnd;
    }
  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.domElement.scrollTop;
    }
  }, {
    key: 'getScrollLeft',
    value: function getScrollLeft() {
      return this.domElement.scrollLeft;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      this.domElement.value = value;
    }
  }, {
    key: 'setSelectionStart',
    value: function setSelectionStart(selectionStart) {
      this.domElement.selectionStart = selectionStart;
    }
  }, {
    key: 'setSelectionEnd',
    value: function setSelectionEnd(selectionEnd) {
      this.domElement.selectionEnd = selectionEnd;
    }
  }, {
    key: 'setScrollTop',
    value: function setScrollTop(scrollTop) {
      this.domElement.scrollTop = scrollTop;
    }
  }, {
    key: 'setScrollLeft',
    value: function setScrollLeft(scrollLeft) {
      this.domElement.scrollLeft = scrollLeft;
    }
  }, {
    key: 'onChange',
    value: function onChange(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateChangeHandler.bind(this);
      }

      this.on('change', handler);
    }
  }, {
    key: 'offChange',
    value: function offChange(handler) {
      this.off('change', handler);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateScrollHandler.bind(this);
      }

      this.on('scroll', handler);
    }
  }, {
    key: 'offScroll',
    value: function offScroll(handler) {
      this.off('scroll', handler);
    }
  }, {
    key: 'onResize',
    value: function onResize(resizeHandler) {}
  }, {
    key: 'offResize',
    value: function offResize(resizeHandler) {}
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler, scrollHandler) {
      return InputElement.clone(Textarea, element, changeHandler, scrollHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler, scrollHandler) {
      return InputElement.fromHTML(Textarea, html, changeHandler, scrollHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler, scrollHandler) {
      return InputElement.fromDOMElement(Textarea, domElement, changeHandler, scrollHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          onScroll = properties.onScroll,
          changeHandler = onChange,
          scrollHandler = onScroll; ///

      return InputElement.fromProperties(Textarea, properties, changeHandler, scrollHandler);
    }
  }]);

  return Textarea;
}(InputElement);

Object.assign(Textarea, {
  tagName: 'textarea',
  ignoredProperties: ['onChange', 'onScroll']
});

module.exports = Textarea;

function defaultIntermediateChangeHandler(handler, event) {
  var value = this.getValue(),
      preventDefault = handler(value);

  return preventDefault;
}

function defaultIntermediateScrollHandler(handler, event) {
  var scrollTop = this.getScrollTop(),
      scrollLeft = this.getScrollLeft(),
      preventDefault = handler(scrollTop, scrollLeft);

  return preventDefault;
}

},{"../inputElement":24}],31:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bounds = function () {
  function Bounds(top, left, bottom, right) {
    _classCallCheck(this, Bounds);

    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  _createClass(Bounds, [{
    key: 'getTop',
    value: function getTop() {
      return this.top;
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      return this.left;
    }
  }, {
    key: 'getBottom',
    value: function getBottom() {
      return this.bottom;
    }
  }, {
    key: 'getRight',
    value: function getRight() {
      return this.right;
    }
  }, {
    key: 'isOverlappingMouse',
    value: function isOverlappingMouse(mouseTop, mouseLeft) {
      return this.top < mouseTop && this.left < mouseLeft && this.bottom > mouseTop && this.right > mouseLeft;
    }
  }, {
    key: 'areOverlapping',
    value: function areOverlapping(bounds) {
      return this.top < bounds.bottom && this.left < bounds.right && this.bottom > bounds.top && this.right > bounds.left;
    }
  }], [{
    key: 'fromBoundingClientRect',
    value: function fromBoundingClientRect(boundingClientRect) {
      var top = boundingClientRect.top,
          left = boundingClientRect.left,
          bottom = boundingClientRect.bottom,
          right = boundingClientRect.right,
          bounds = new Bounds(top, left, bottom, right);

      return bounds;
    }
  }]);

  return Bounds;
}();

module.exports = Bounds;

},{}],32:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = function () {
  function Offset(top, left) {
    _classCallCheck(this, Offset);

    this.top = top;
    this.left = left;
  }

  _createClass(Offset, [{
    key: 'getTop',
    value: function getTop() {
      return this.top;
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      return this.left;
    }
  }]);

  return Offset;
}();

module.exports = Offset;

},{}],33:[function(require,module,exports){
'use strict';

function onClick(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('click', handler);
}

function offClick(handler) {
  this.off('click', handler);
}

var clickMixin = {
  onClick: onClick,
  offClick: offClick
};

module.exports = clickMixin;

function defaultIntermediateHandler(handler, event) {
  var mouseTop = event.pageY,
      ///
  mouseLeft = event.pageX,
      ///
  mouseButton = event.button,
      ///
  preventDefault = handler(mouseTop, mouseLeft, mouseButton);

  return preventDefault;
}

},{}],34:[function(require,module,exports){
'use strict';

function on(eventTypes, handler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var addEventListener = this.addHandler(eventType, handler);

    if (addEventListener) {
      this.domElement.addEventListener(eventType, eventListener.bind(this));
    }
  }.bind(this));
}

function off(eventTypes, handler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var removeEventListener = this.removeHandler(eventType, handler);

    if (removeEventListener) {
      this.domElement.removeEventListener(eventType, eventListener.bind(this));
    }
  }.bind(this));
}

function addHandler(eventType, handler) {
  var addEventListener = false,
      handlers = this.handlersMap[eventType];

  if (handlers === undefined) {
    handlers = [];

    this.handlersMap[eventType] = handlers;

    addEventListener = true;
  }

  handlers.push(handler);

  return addEventListener;
}

function removeHandler(eventType, handler) {
  var removeEventListener = false,
      handlers = this.handlersMap[eventType];

  if (handlers.length === 0) {
    delete this.handlersMap[eventType];

    removeEventListener = true;
  } else {
    var index = handlers.indexOf(handler);

    if (index > -1) {
      var deleteCount = 1;

      handlers.splice(index, deleteCount);
    }
  }

  return removeEventListener;
}

var eventMixin = {
  on: on,
  off: off,
  addHandler: addHandler,
  removeHandler: removeHandler
};

module.exports = eventMixin;

function eventListener(event) {
  var eventType = event.type,
      handlers = this.handlersMap[eventType];

  var preventEventDefault = false;

  handlers.forEach(function (handler) {
    if (handler.intermediateHandler !== undefined) {
      var preventDefault = handler.intermediateHandler(handler, event);

      if (preventDefault === true) {
        preventEventDefault = true;
      }
    } else {
      var _preventDefault = handler(event);

      if (_preventDefault === true) {
        preventEventDefault = true;
      }
    }
  });

  if (preventEventDefault) {
    event.preventDefault();
  }
}

},{}],35:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function applyProperties(properties, ignoredProperties, additionalProperties) {
  this.properties = {};

  properties = Object.assign({}, properties); ///

  unassign(properties, ignoredProperties);

  Object.assign(properties, additionalProperties);

  var names = Object.keys(properties);

  names.forEach(function (name) {
    if (name === 'childElements') {
      var childElements = properties['childElements'];

      childElements.forEach(function (childElement) {
        this.append(childElement);
      }.bind(this));
    } else {
      var value = properties[name];

      if (false) {} else if (isHandlerName(name)) {
        addHandler(this, name, value);
      } else if (isAttributeName(name)) {
        addAttribute(this, name, value);
      } else {
        this.properties[name] = value;
      }
    }
  }.bind(this));
}

var jsxMixin = {
  applyProperties: applyProperties
};

module.exports = jsxMixin;

function unassign(properties, ignoredProperties) {
  if (ignoredProperties !== undefined) {
    var ignoredPropertyNames = ignoredProperties; ///

    ignoredPropertyNames.forEach(function (ignoredPropertyName) {
      delete properties[ignoredPropertyName];
    });
  }
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

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var keys = Object.keys(value);

    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    }.bind(this));
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

function isAttributeName(name) {
  return attributeNames.includes(name);
}

var attributeNames = ['accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap'];

},{}],36:[function(require,module,exports){
'use strict';

function onMouseUp(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('mouseup', handler);
}

function onMouseDown(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('mousedown', handler);
}

function onMouseOver(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('mouseover', handler);
}

function onMouseOut(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('mouseout', handler);
}

function onMouseMove(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('mousemove', handler);
}

function offMouseUp(handler) {
  this.off('mouseup', handler);
}

function offMouseDown(handler) {
  this.off('mousedown', handler);
}

function offMouseOver(handler) {
  this.off('mouseover', handler);
}

function offMouseOut(handler) {
  this.off('mouseout', handler);
}

function offMouseMove(handler) {
  this.off('mousemove', handler);
}

var mouseMixin = {
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

module.exports = mouseMixin;

function defaultIntermediateHandler(handler, event) {
  var mouseTop = event.pageY,
      ///
  mouseLeft = event.pageX,
      ///
  mouseButton = event.button,
      ///
  preventDefault = handler(mouseTop, mouseLeft, mouseButton);

  return preventDefault;
}

},{}],37:[function(require,module,exports){
'use strict';

function onResize(handler) {
  var eventType = 'resize',
      addEventListener = this.addHandler(eventType, handler);

  if (addEventListener) {
    appendResizeObject(this);
  }
}

function offResize(handler) {
  var eventType = 'resize',
      removeEventListener = this.removeHandler(eventType, handler);

  if (removeEventListener) {
    removeResizeObject(this);
  }
}

var resizeMixin = {
  onResize: onResize,
  offResize: offResize
};

module.exports = resizeMixin;

function appendResizeObject(element) {
  var resizeObject = document.createElement('object'),
      domElement = element.domElement,
      style = ' display: block; \n                  position: absolute; \n                  top: 0; \n                  left: 0; \n                  height: 100%; \n                  width: 100%; \n                  overflow: hidden; \n                  pointer-events: none; \n                  z-index: -1;';

  resizeObject.setAttribute('style', style);
  resizeObject.data = 'about:blank';
  resizeObject.type = 'text/html';

  element.__resizeObject__ = resizeObject;

  resizeObject.onload = function () {
    resizeObjectLoadHandler(element);
  };

  domElement.appendChild(resizeObject);
}

function removeResizeObject(element) {
  var domElement = element.domElement,
      resizeObject = element.__resizeObject__,
      objectWindow = resizeObject.contentDocument.defaultView; ///

  objectWindow.removeEventListener('resize', resizeListener);

  domElement.removeChild(resizeObject);
}

function resizeObjectLoadHandler(element) {
  var resizeObject = element.__resizeObject__,
      resizeObjectWindow = resizeObject.contentDocument.defaultView; ///

  resizeObjectWindow.addEventListener('resize', function () {
    eventListener(element);
  });
}

function eventListener(element) {
  var width = element.getWidth(),
      height = element.getHeight(),
      handlers = element.handlersMap['resize'];

  handlers.forEach(function (handler) {
    handler(width, height);
  });
}

},{}],38:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = require('./element');

var React = function () {
  function React() {
    _classCallCheck(this, React);
  }

  _createClass(React, null, [{
    key: 'createElement',
    value: function createElement(firstArgument, properties) {
      for (var _len = arguments.length, childElements = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        childElements[_key - 2] = arguments[_key];
      }

      var element = null;

      if (firstArgument !== undefined) {
        childElements = flattenChildElements(childElements);

        properties = Object.assign({
          childElements: childElements
        }, properties);

        if (false) {} else if (typeof firstArgument === 'string') {
          var tagName = firstArgument,
              ///
          html = '<' + tagName + '></' + tagName + '>';

          element = Element.fromHTML(html);

          element.applyProperties(properties);
        } else if (isTypeOf(firstArgument, Element)) {
          var Class = firstArgument; ///

          element = Class.fromProperties(properties);
        } else if (firstArgument.prototype.render) {
          var _Class = firstArgument,
              ///
          instance = new _Class(properties);

          element = instance.render();
        } else if (typeof firstArgument === 'function') {
          var elementFunction = firstArgument; ///

          element = elementFunction(properties);
        }
      }

      return element;
    }
  }]);

  return React;
}();

module.exports = React;

function flattenChildElements(childElements) {
  childElements = childElements.reduce(function (childElements, childElement) {
    ///
    childElements = childElements.concat(childElement);

    return childElements;
  }, []);

  return childElements;
}

function isTypeOf(argument, Class) {
  var typeOf = false;

  if (argument === Class) {
    ///
    typeOf = true;
  } else {
    argument = Object.getPrototypeOf(argument); ///

    if (argument) {
      typeOf = isTypeOf(argument, Class);
    }
  }

  return typeOf;
}

},{"./element":20}],39:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse');

var Window = function () {
  function Window() {
    _classCallCheck(this, Window);

    this.domElement = window;

    this.handlersMap = {};
  }

  _createClass(Window, [{
    key: 'getWidth',
    value: function getWidth() {
      return this.domElement.innerWidth;
    } ///

  }, {
    key: 'getHeight',
    value: function getHeight() {
      return this.domElement.innerHeight;
    } ///

  }, {
    key: 'onResize',
    value: function onResize(handler) {
      var type = 'resize',
          addEventListener = this.addHandler(type, handler);

      if (addEventListener) {
        this.domElement.addEventListener(type, eventListener.bind(this));
      }
    }
  }, {
    key: 'offResize',
    value: function offResize(handler) {
      var type = 'resize',
          removeEventListener = this.removeHandler(type, handler);

      if (removeEventListener) {
        this.domElement.removeEventListener(type, eventListener.bind(this));
      }
    }
  }]);

  return Window;
}();

Object.assign(Window.prototype, eventMixin);
Object.assign(Window.prototype, clickMixin);
Object.assign(Window.prototype, mouseMixin);

module.exports = new Window(); ///

function eventListener(event) {
  var type = event.type,
      handlers = this.handlersMap[type],
      width = this.getWidth(),
      height = this.getHeight();

  handlers.forEach(function (handler) {
    handler(width, height);
  });
}

},{"./mixin/click":33,"./mixin/event":34,"./mixin/mouse":36}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wcGFibGVFbGVtZW50LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyL2ZpbGUuanMiLCJlczYvZXhwbG9yZXIvbmFtZUJ1dHRvbi5qcyIsImVzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiLCJlczYvb3B0aW9ucy5qcyIsImVzNi9ydWJiaXNoQmluLmpzIiwiZXM2L3V0aWwuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZWxlbWVudC9ib2R5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZWxlbWVudC9kaXYuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9lbGVtZW50L3NwYW4uanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2NoZWNrYm94LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQvc2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvbWlzYy9ib3VuZHMuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXNjL29mZnNldC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L21peGluL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvbWl4aW4vZXZlbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXhpbi9qc3guanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXhpbi9tb3VzZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L21peGluL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L3JlYWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvd2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7Ozs7Ozs7OztBQUVBLElBQU0sU0FBUyxRQUFRLFFBQVIsQ0FBZjtBQUFBLElBQ00sVUFBVSxPQUFPLE9BRHZCOztBQUdBLElBQU0sT0FBTyxRQUFRLFFBQVIsQ0FBYjtBQUFBLElBQ00sVUFBVSxRQUFRLFdBQVIsQ0FEaEI7O0lBR00sZ0I7OztBQUNKLDRCQUFZLFFBQVosRUFBc0IsV0FBdEIsRUFBbUM7QUFBQTs7QUFBQSxvSUFDM0IsUUFEMkI7O0FBR2pDLFVBQUssV0FBTCxHQUFtQixXQUFuQjs7QUFFQSxVQUFLLGlCQUFMLEdBQXlCLEVB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RUFBUztBQUNoQixVQUFNLE9BQU8sUUFBYjtBQUFBLFVBQ00sbUJBQW1CLEtBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixPQUF0QixDQUR6Qjs7QUFHQSxVQUFJLGdCQUFKLEVBQXNCO0FBQ3BCLGFBQUssVUFBTCxDQUFnQixnQkFBaEIsQ0FBaUMsSUFBakMsRUFBdUMsY0FBYyxJQUFkLENBQW1CLElBQW5CLENBQXZDO0FBQ0Q7QUFDRjs7OzhCQUVTLE8sRUFBUztBQUNqQixVQUFNLE9BQU8sUUFBYjtBQUFBLFVBQ00sc0JBQXNCLEtBQUssYUFBTCxDQUFtQixJQUFuQixFQUF5QixPQUF6QixDQUQ1Qjs7QUFHQSxVQUFJLG1CQUFKLEVBQXlCO0FBQ3ZCLGFBQUssVUFBTCxDQUFnQixtQkFBaEIsQ0FBb0MsSUFBcEMsRUFBMEMsY0FBYyxJQUFkLENBQW1CLElBQW5CLENBQTFDO0FBQ0Q7QUFDRjs7Ozs7O0FBR0gsT0FBTyxNQUFQLENBQWMsT0FBTyxTQUFyQixFQUFnQyxVQUFoQztBQUNBLE9BQU8sTUFBUCxDQUFjLE9BQU8sU0FBckIsRUFBZ0MsVUFBaEM7QUFDQSxPQUFPLE1BQVAsQ0FBYyxPQUFPLFNBQXJCLEVBQWdDLFVBQWhDOztBQUVBLE9BQU8sT0FBUCxHQUFpQixJQUFJLE1BQUosRUFBakIsQyxDQUFnQzs7QUFFaEMsU0FBUyxhQUFULENBQXVCLEtBQXZCLEVBQThCO0FBQzVCLE1BQU0sT0FBTyxNQUFNLElBQW5CO0FBQUEsTUFDTSxXQUFXLEtBQUssV0FBTCxDQUFpQixJQUFqQixDQURqQjtBQUFBLE1BRU0sUUFBUSxLQUFLLFFBQUwsRUFGZDtBQUFBLE1BR00sU0FBUyxLQUFLLFNBQUwsRUFIZjs7QUFLQSxXQUFTLE9BQVQsQ0FBaUIsVUFBUyxPQUFULEVBQWtCO0FBQ2pDLFlBQVEsS0FBUixFQUFlLE1BQWY7QUFDRCxHQUZEO0FBR0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3B0aW9uczogcmVxdWlyZSgnLi9saWIvb3B0aW9ucycpLFxuICBFeHBsb3JlcjogcmVxdWlyZSgnLi9saWIvZXhwbG9yZXInKSxcbiAgUnViYmlzaEJpbjogcmVxdWlyZSgnLi9saWIvcnViYmlzaEJpbicpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jbGFzcyBEcm9wcGFibGVFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzID0gW107XG4gIH1cblxuICBhZGREcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnB1c2goZHJvcHBhYmxlRWxlbWVudCk7XG4gIH1cblxuICByZW1vdmVEcm9wcGFibGVFbGVtZW50KGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICBjb25zdCBpbmRleCA9IGluZGV4T2YodGhpcy5kcm9wcGFibGVFbGVtZW50cywgZHJvcHBhYmxlRWxlbWVudCksXG4gICAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy5kcm9wcGFibGVFbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcykge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyksXG4gICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnJlZHVjZShmdW5jdGlvbihkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID09PSBudWxsKSB7XG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50LmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkpIHsgLy8vXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZDtcbiAgfVxuXG4gIGdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSB7XG4gICAgY29uc3QgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQsIGRyb3BwYWJsZUVsZW1lbnQpIHtcbiAgICAgIGlmIChtYXJrZWREcm9wcGFibGVFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwYWJsZUVsZW1lbnRNYXJrZWQgPSBkcm9wcGFibGVFbGVtZW50LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudE1hcmtlZCkge1xuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBkcm9wcGFibGVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtYXJrZWREcm9wcGFibGVFbGVtZW50O1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gIH1cblxuICByZW1vdmVNYXJrZXJHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci51bnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgfVxuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSBsYXN0RHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKTtcblxuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgICBwYXRoTWFwID0gZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IHNvdXJjZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdLFxuICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKG1vdmVkUGF0aCAhPT0gdW5kZWZpbmVkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG1vdmVkUGF0aCA9IHBhdGhNYXBbc291cmNlUGF0aF07XG5cbiAgICAgICAgICB0aGlzLm1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIG1vdmVkUGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIG1vdmVkRGlyZWN0b3J5UGF0aCA9IG1vdmVkUGF0aDtcblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgbW92ZWRGaWxlUGF0aCA9IG1vdmVkUGF0aDsgIC8vL1xuXG4gICAgICB0aGlzLm1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wcGFibGVFbGVtZW50O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIGxldCBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBpbmRleDtcbn1cblxuZnVuY3Rpb24gZmluZChhcnJheSwgY2FsbGJhY2spIHtcbiAgbGV0IGVsZW1lbnQgPSBudWxsO1xuICBcbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgIGlmIChjYWxsYmFjayhjdXJyZW50RWxlbWVudCkpIHtcbiAgICAgIGVsZW1lbnQgPSBjdXJyZW50RWxlbWVudDtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0pO1xuICBcbiAgcmV0dXJuIGVsZW1lbnQ7ICBcbn1cblxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdOyB9XG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBEcm9wcGFibGVFbGVtZW50ID0gcmVxdWlyZSgnLi9kcm9wcGFibGVFbGVtZW50JyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKSxcbiAgICAgIFJvb3REaXJlY3RvcnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS9yb290Jyk7XG5cbmNsYXNzIEV4cGxvcmVyIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIGNvbnN0IG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZGlyZWN0b3J5XCIgLz47XG5cbiAgICB0aGlzLm9wZW5IYW5kbGVyID0gb3BlbkhhbmRsZXI7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeSA9IHJvb3REaXJlY3Rvcnk7XG5cbiAgICB0aGlzLmFwcGVuZChyb290RGlyZWN0b3J5KTtcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTsgfVxuICBcbiAgZ2V0Um9vdERpcmVjdG9yeU5hbWUoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TmFtZSgpOyB9XG4gIFxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7IH1cbiAgXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTsgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7IHJldHVybiB0aGlzLnJvb3REaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTsgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7IHRoaXMucm9vdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTsgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHsgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGgpOyB9XG4gIFxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpOyB9XG5cbiAgYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLmlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZXJQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkuYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlclBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5yb290RGlyZWN0b3J5LmlzTWFya2VkKCk7XG5cbiAgICBpZiAocm9vdERpcmVjdG9yeU1hcmtlZCkge1xuICAgICAgdGhpcy5yb290RGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlci5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuICAgIFxuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICByZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpO1xuXG4gICAgY2hpbGRMaXN0RWxlbWVudHMuc29tZShmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgIGlmIChjaGlsZEVsZW1lbnQgaW5zdGFuY2VvZiBEaXJlY3RvcnlNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlNYXJrZXI7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFydGVkRHJhZ2dpbmc7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGRvbmUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSBtYXJrZWQgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gbWFya2VkRHJvcHBhYmxlRWxlbWVudC5nZXRNYXJrZWREaXJlY3RvcnkoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlQYXRoID0gKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlZERpcmVjdG9yeS5nZXRQYXRoKCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSB1dGlsLnBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lLFxuICAgICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlQYXRoLFxuICAgICAgICAgIHVubW92ZWQgPSAoc291cmNlUGF0aCA9PT0gdGFyZ2V0UGF0aCk7XG5cbiAgICBpZiAobWFya2VkICYmIHVubW92ZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3ViRHJhZ2dhYmxlRW50cmllcyA9IGRyYWdnYWJsZUVudHJ5LmdldFN1YkVudHJpZXMoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXMgPSBzdWJEcmFnZ2FibGVFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIGRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3JlciA9IHRoaXMpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgICBcbiAgICAgIGNvbnN0IHRvQmVNYXJrZWQgPSB0aGlzLmlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmICh0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IHdpdGhpbiA9IChleHBsb3JlciA9PT0gdGhpcyksIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nV2l0aGluID0gdGhpcy5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19XSVRISU4pLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gd2l0aGluICYmIG5vRHJhZ2dpbmdXaXRoaW47XG5cbiAgICAgICAgaWYgKCFub0RyYWdnaW5nKSB7XG4gICAgICAgICAgY29uc3QgbWFya2VkRGlyZWN0b3J5ID0gdGhpcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICAgICAgdGhpcy5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IHRoaXMuZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpO1xuXG4gICAgICBtYXJrZWREcm9wcGFibGVFbGVtZW50LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgICAgXG4gICAgICBmaWxlUGF0aCA9IG1vdmVkRmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW5GaWxlKGZpbGUpIHtcbiAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCh0aGlzLnJvb3REaXJlY3RvcnkpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBmaWxlUGF0aDtcbiAgICBcbiAgICB0aGlzLm9wZW5IYW5kbGVyKHNvdXJjZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHt9LFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1dGlsLnByZXBlbmRUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0gPSB0YXJnZXREcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoRXhwbG9yZXIsIHNlbGVjdG9yLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoRXhwbG9yZXIsIGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBvbk1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmU7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRXhwbG9yZXIsIHByb3BlcnRpZXMsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29wZW5IYW5kbGVyJywgXG4gICAgJ29uTW92ZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgd2luZG93ID0gZWFzeXVpLndpbmRvdyxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm5hbWVcIiAvPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZXhwbG9yZXIuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKHRoaXMpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpO1xuXG4gICAgbGV0IHRvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgbGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IHRvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGxlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgO1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgICAgICAgIHRvcDogdG9wLFxuICAgICAgICAgICAgbGVmdDogbGVmdFxuICAgICAgICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub24oJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBzdG9wRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vZmYoJ2tleWRvd24nLCB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgbGV0IHRvcCA9IG1vdXNlVG9wICsgdGhpcy50b3BPZmZzZXQsXG4gICAgICAgIGxlZnQgPSBtb3VzZUxlZnQgKyB0aGlzLmxlZnRPZmZzZXQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgO1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDtcblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXJvb3REaXJlY3RvcnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkpO1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2Rpdidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQgPSBmYWxzZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uID0gPFRvZ2dsZUJ1dHRvbiB1cGRhdGVIYW5kbGVyPXt1cGRhdGVIYW5kbGVyfSBjbGFzc05hbWU9XCJ0b2dnbGVcIiAvPixcbiAgICAgICAgICBlbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5PXtEaXJlY3Rvcnl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IHRvZ2dsZUJ1dHRvbjtcbiAgICBcbiAgICB0aGlzLmFwcGVuZCh0b2dnbGVCdXR0b24pOyAgICBcbiAgICBcbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBsZXQgZmlsZVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKCk7XG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB7IG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeSwge1xuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJyxcbiAgICAnY29sbGFwc2VkJyxcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuICAgIFxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHN1cGVyLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTsgICAgXG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeS5mcm9tUHJvcGVydGllcyhSb290RGlyZWN0b3J5LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3Rvcnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwOyAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlKGZpbGUpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGUsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGUsIHtcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZScpLFxuICAgICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IGZpbGUgPSA8RmlsZSBmaWxlTmFtZT17ZmlsZU5hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY2xhc3NOYW1lPVwiZmlsZVwiIC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5ID0gPHRoaXMuRGlyZWN0b3J5IG5hbWU9e25hbWV9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNsYXNzTmFtZT1cImRpcmVjdG9yeVwiIC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5OyAgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGZpbGUucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBkaXJlY3RvcnkucmVtb3ZlKCk7XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGhhc0ZpbGUoZmlsZU5hbWUpIHtcbiAgICBsZXQgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKTtcblxuICAgIGZpbGUgPSAoZmlsZSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGU7XG4gIH1cblxuICBoYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgIFxuICAgIGRpcmVjdG9yeSA9IChkaXJlY3RvcnkgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBkaXJlY3Rvcnk7XG4gIH1cblxuICBhZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgbGV0IG1hcmtlcjtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgICAgbWFya2VyID0gPEZpbGVNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcbiAgICAgICAgbWFya2VyID0gPERpcmVjdG9yeU1hcmtlciBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJtYXJrZXJcIiAvPjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXI7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpO1xuXG4gICAgbWFya2VyLnJlbW92ZSgpO1xuICB9XG4gIFxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGxldCBwcmV2aW91c0VudHJ5ID0gbnVsbDtcblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGUoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShkaXJlY3RvcnlOYW1lLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICByZXRyaWV2ZU1hcmtlcigpIHtcbiAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIG1hcmtlZERpcmVjdG9yeSA9IGRpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeS5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aDsgLy8vXG4gICAgICAgICAgXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRmlsZShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICBsZXQgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5IH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ0RpcmVjdG9yeSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQsXG4gICAgICBSZWFjdCA9IGVhc3l1aS5SZWFjdDtcblxuY29uc3QgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jbGFzcyBFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm5hbWVcIiAvPjtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBcbiAgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZSdcbiAgXSxcbiAgdHlwZXM6IHtcbiAgICBGSUxFOiAnRklMRScsXG4gICAgTUFSS0VSOiAnTUFSS0VSJyxcbiAgICBESVJFQ1RPUlk6ICdESVJFQ1RPUlknXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5Jyk7XG5cbmNsYXNzIE1hcmtlciBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyID0gcmVxdWlyZSgnLi4vbWFya2VyJyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIE1hcmtlciB7XG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgYmVmb3JlID0gKGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRklMRSkgP1xuICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICAgIChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gTWFya2VyLmZyb21Qcm9wZXJ0aWVzKERpcmVjdG9yeU1hcmtlciwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlciA9IHJlcXVpcmUoJy4uL21hcmtlcicpO1xuXG5jbGFzcyBGaWxlTWFya2VyIGV4dGVuZHMgTWFya2VyIHtcbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBiZWZvcmUgPSAoZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpID8gXG4gICAgICAgICAgICAgICAgICAgICBmYWxzZSA6IFxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIE1hcmtlci5mcm9tUHJvcGVydGllcyhGaWxlTWFya2VyLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgSW5wdXRFbGVtZW50ID0gZWFzeXVpLklucHV0RWxlbWVudDtcblxuY2xhc3MgTmFtZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLnNldE5hbWUobmFtZSk7XG4gICAgXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5odG1sKCk7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBjb25zdCBodG1sID0gbmFtZTsgIC8vL1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuICB9XG4gIFxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdkYmxjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgb25Eb3VibGVDbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkb3VibGVDbGlja0hhbmRsZXIgPSBvbkRvdWJsZUNsaWNrOyAvLy9cbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKE5hbWVCdXR0b24sIHByb3BlcnRpZXMsIG5hbWUsIGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihOYW1lQnV0dG9uLCB7XG4gIHR5cGU6ICdidXR0b24nLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJyxcbiAgICAnb25Eb3VibGVDbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBJbnB1dEVsZW1lbnQgPSBlYXN5dWkuSW5wdXRFbGVtZW50O1xuXG5jbGFzcyBUb2dnbGVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdXBkYXRlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlciA9IHVwZGF0ZUhhbmRsZXI7XG5cbiAgICB0aGlzLm9uQ2xpY2sodGhpcy5jbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xsYXBzZWQ7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuICBcbiAgY2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3QgaHRtbCA9IHRoaXMuY29sbGFwc2VkID8gXG4gICAgICAgICAgICAgICAgICAgVG9nZ2xlQnV0dG9uLkJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFIDogXG4gICAgICAgICAgICAgICAgICAgICBUb2dnbGVCdXR0b24uQkxBQ0tfRE9XTl9QT0lOVElOR19UUklBTkdMRTtcblxuICAgIHRoaXMuaHRtbChodG1sKTtcblxuICAgIHRoaXMudXBkYXRlSGFuZGxlcih0aGlzLmNvbGxhcHNlZCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgdXBkYXRlSGFuZGxlciB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFRvZ2dsZUJ1dHRvbiwgcHJvcGVydGllcywgdXBkYXRlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihUb2dnbGVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ3VwZGF0ZUhhbmRsZXInXG4gIF0sXG4gIEJMQUNLX1JJR0hUX1BPSU5USU5HX1RSSUFOR0xFOiAnJiN4MDI1YjYnLFxuICBCTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFOiAnJiN4MDI1YmMnXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUb2dnbGVCdXR0b247XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBvcHRpb25zID0ge1xuICBOT19EUkFHR0lORzogJ05PX0RSQUdHSU5HJyxcbiAgTk9fRFJBR0dJTkdfV0lUSElOOiAnTk9fRFJBR0dJTkdfV0lUSElOJyxcbiAgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVM6ICdOT19EUkFHR0lOR19TVUJfRU5UUklFUycsXG4gIE5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZOiAnTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlknLFxuICBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUzogJ05PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTJyxcbiAgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUzogJ1JFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMnLFxuICBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HOiAnRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gb3B0aW9ucztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQ7XG5cbmNvbnN0IERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKTtcblxuY2xhc3MgUnViYmlzaEJpbiBleHRlbmRzIERyb3BwYWJsZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIGNvbnN0IGRyb3BwYWJsZUVsZW1lbnRNb3ZlSGFuZGxlciA9IHJlbW92ZUhhbmRsZXI7ICAvLy9cbiAgICBcbiAgICBzdXBlcihzZWxlY3RvciwgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIG1vdmVkRGlyZWN0b3J5UGF0aCkge1xuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpIHtcbiAgICBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnb3BlbicpO1xuICB9XG5cbiAgaXNPcGVuKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmhhc0NsYXNzKCdvcGVuJyk7XG4gICAgXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShSdWJiaXNoQmluLCBzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFJ1YmJpc2hCaW4sIGh0bWwsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhSdWJiaXNoQmluLCBwcm9wZXJ0aWVzLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFJ1YmJpc2hCaW4sIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ29uUmVtb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyB1dGlsIHtcbiAgc3RhdGljIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICBsZXQgYm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLipcXC8oW15cXC9dKiQpLyk7XG4gICAgXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuICAgICAgXG4gICAgICBib3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xuICB9XG5cbiAgc3RhdGljIHRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSopXFwvLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC8oXi4qKVxcL1teXFwvXSokLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eW15cXC9dKlxcLyguKiQpLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuICBcbiAgc3RhdGljIHByZXBlbmRUYXJnZXRQYXRoKGVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgICBlbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgJy8nICsgZW50cnlQYXRoO1xuICAgIFxuICAgIHJldHVybiBlbnRyeVBhdGg7XG4gIH1cblxuICBzdGF0aWMgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZVBhdGggKyAnKC4qJCknKSxcbiAgICAgICAgICBtYXRjaGVzID0gZW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBlbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7XG5cbmZ1bmN0aW9uIHNlY29uZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMV07IH1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIFJlYWN0OiByZXF1aXJlKCcuL2xpYi9yZWFjdCcpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50JyksXG4gIElucHV0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50JyksXG4gIGRvY3VtZW50OiByZXF1aXJlKCcuL2xpYi9kb2N1bWVudCcpLFxuICB3aW5kb3c6IHJlcXVpcmUoJy4vbGliL3dpbmRvdycpLFxuICBEaXY6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvZGl2JyksXG4gIFNwYW46IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvc3BhbicpLFxuICBCb2R5OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2JvZHknKSxcbiAgTGluazogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L2xpbmsnKSxcbiAgSW5wdXQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9pbnB1dCcpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9zZWxlY3QnKSxcbiAgQnV0dG9uOiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvYnV0dG9uJyksXG4gIENoZWNrYm94OiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvY2hlY2tib3gnKSxcbiAgVGV4dGFyZWE6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC90ZXh0YXJlYScpLFxuICBCb3VuZHM6IHJlcXVpcmUoJy4vbGliL21pc2MvYm91bmRzJyksXG4gIE9mZnNldDogcmVxdWlyZSgnLi9saWIvbWlzYy9vZmZzZXQnKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpO1xuXG5jbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBtb3VzZU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRG9jdW1lbnQoKTsgIC8vL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2Mvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2MvYm91bmRzJyksXG4gICAgICBqc3hNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vanN4JyksXG4gICAgICBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICByZXNpemVNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vcmVzaXplJyk7XG5cbmNsYXNzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpcztcbiAgICBcbiAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUodGhpcyk7IH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3Qgd2lkdGggID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0V2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7IH1cblxuICBnZXRIZWlnaHQoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGVpZ2h0ICA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5vZmZzZXRIZWlnaHQgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgOyB9XG5cbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICBjbGVhckF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lOyB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuXG4gIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpOyB9XG5cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH1cblxuICBjbGVhckNsYXNzZXMoKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSAnJzsgfVxuXG4gIHByZXBlbmQoZWxlbWVudE9yU3RyaW5nKSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGRvbUVsZW1lbnRGcm9tRWxlbWVudE9yU3RyaW5nKGVsZW1lbnRPclN0cmluZyksXG4gICAgICAgICAgZmlyc3RDaGlsZERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgZmlyc3RDaGlsZERPTUVsZW1lbnQpO1xuICB9XG4gIFxuICBhcHBlbmQoZWxlbWVudE9yU3RyaW5nKSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGRvbUVsZW1lbnRGcm9tRWxlbWVudE9yU3RyaW5nKGVsZW1lbnRPclN0cmluZyk7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIG51bGwpOyAvLy9cbiAgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0U2libGluZ0RPTUVsZW1lbnQgPSBwYXJlbnRET01FbGVtZW50LmZpcnN0Q2hpbGQ7IC8vL1xuXG4gICAgcGFyZW50RE9NRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBmaXJzdFNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTUVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTUVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHNob3coZGlzcGxheVN0eWxlID0gJ2Jsb2NrJykgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTdHlsZTsgfVxuXG4gIGhpZGUoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgZW5hYmxlKCkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKCdkaXNhYmxlZCcpOyB9XG5cbiAgZGlzYWJsZSgpIHsgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7IH1cblxuICBodG1sKGh0bWwpIHtcbiAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBodG1sID0gdGhpcy5kb21FbGVtZW50LmlubmVySFRNTDsgLy8vXG5cbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSBodG1sOyAvLy9cblxuICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNzcyhjc3MpIHtcbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICBjc3MgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXB1dGVkU3R5bGUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wdXRlZFN0eWxlWzBdLCAgLy8vXG4gICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgICBjc3NbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmFtZSA9IGNzczsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgIGNzcyA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoY3NzKTsgLy8vXG5cbiAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNzc1tuYW1lXTtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgZGVzY2VuZGFudERPTUVsZW1lbnRzID0gdGhpcy5kb21FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpLFxuICAgICAgICAgIGRlc2NlbmRhbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRlc2NlbmRhbnRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gZGVzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q2hpbGRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGRlc2NlbmRhbnRET01FbGVtZW50cyA9IHRoaXMuZG9tRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSxcbiAgICAgICAgICBhbGxDaGlsZERPTUVsZW1lbnRzID0gdGhpcy5kb21FbGVtZW50LmNoaWxkcmVuLFxuICAgICAgICAgIGNoaWxkRE9NRWxlbWVudHMgPSBmaWx0ZXIoYWxsQ2hpbGRET01FbGVtZW50cywgZnVuY3Rpb24oY2hpbGRET01FbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gc29tZShkZXNjZW5kYW50RE9NRWxlbWVudHMsIGZ1bmN0aW9uKGRlc2NlbmRhbnRET01FbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiAoZGVzY2VuZGFudERPTUVsZW1lbnQgPT09IGNoaWxkRE9NRWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoY2hpbGRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGdldFBhcmVudEVsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgcGFyZW50RWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocGFyZW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHBhcmVudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgY29uc3QgcGFyZW50RE9NRWxlbWVudHMgPSBbcGFyZW50RE9NRWxlbWVudF0sXG4gICAgICAgICAgICAgIHBhcmVudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMocGFyZW50RE9NRWxlbWVudHMpLFxuICAgICAgICAgICAgICBmaXJzdFBhcmVudEVsZW1lbnQgPSBmaXJzdChwYXJlbnRFbGVtZW50cyk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCA9IGZpcnN0UGFyZW50RWxlbWVudCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgZ2V0QXNjZW5kYW50RWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBhc2NlbmRhbnRET01FbGVtZW50cyA9IFtdLFxuICAgICAgICAgIHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGxldCBhc2NlbmRhbnRET01FbGVtZW50ID0gcGFyZW50RE9NRWxlbWVudDsgIC8vL1xuICAgIHdoaWxlIChhc2NlbmRhbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoYXNjZW5kYW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBhc2NlbmRhbnRET01FbGVtZW50cy5wdXNoKGFzY2VuZGFudERPTUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBhc2NlbmRhbnRET01FbGVtZW50ID0gYXNjZW5kYW50RE9NRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGFzY2VuZGFudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoYXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGFzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBpZiAoQ2xhc3MgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gQ2xhc3M7XG4gICAgICByZW1haW5pbmdBcmd1bWVudHMuc2hpZnQoKTtcbiAgICAgIENsYXNzID0gRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWVwID0gdHJ1ZSxcbiAgICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LmNsb25lTm9kZShkZWVwKTtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBpZiAodHlwZW9mIENsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgaHRtbCA9IENsYXNzO1xuICAgICAgcmVtYWluaW5nQXJndW1lbnRzLnNoaWZ0KCk7XG4gICAgICBDbGFzcyA9IEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0ZXJET01FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBvdXRlckRPTUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDsgIC8vL1xuXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IG91dGVyRE9NRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGlmICh0eXBlb2YgQ2xhc3MgPT09ICdvYmplY3QnKSB7XG4gICAgICBkb21FbGVtZW50ID0gQ2xhc3M7XG4gICAgICByZW1haW5pbmdBcmd1bWVudHMuc2hpZnQoKTtcbiAgICAgIENsYXNzID0gRWxlbWVudDtcbiAgICB9XG5cbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IENsYXNzLnRhZ05hbWUsXG4gICAgICAgICAgaWdub3JlZFByb3BlcnRpZXMgPSBDbGFzcy5pZ25vcmVkUHJvcGVydGllcyxcbiAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IENsYXNzLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0+PC8ke3RhZ05hbWV9PmAsXG4gICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcywgYWRkaXRpb25hbFByb3BlcnRpZXMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwganN4TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgcmVzaXplTWl4aW4pO1xuXG5FbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OID0gMDtcbkVsZW1lbnQuTUlERExFX01PVVNFX0JVVFRPTiA9IDE7XG5FbGVtZW50LlJJR0hUX01PVVNFX0JVVFRPTiA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcblxuZnVuY3Rpb24gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcikge1xuICBjb25zdCBkb21FbGVtZW50ID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID9cbiAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilbMF0gOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I7ICAvLy9cblxuICByZXR1cm4gZG9tRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZG9tRWxlbWVudEZyb21FbGVtZW50T3JTdHJpbmcoZWxlbWVudE9yU3RyaW5nKSB7XG4gIGxldCBkb21FbGVtZW50O1xuXG4gIGlmICh0eXBlb2YgZWxlbWVudE9yU3RyaW5nID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHN0cmluZyA9IGVsZW1lbnRPclN0cmluZzsgLy8vXG5cbiAgICBkb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyaW5nKTsgLy8vXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGVsZW1lbnRPclN0cmluZzsgIC8vL1xuXG4gICAgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBkb21FbGVtZW50O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhkb21FbGVtZW50cykge1xuICBjb25zdCBkb21FbGVtZW50c1dpdGhFbGVtZW50cyA9IGZpbHRlcihkb21FbGVtZW50cywgZnVuY3Rpb24oZG9tRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiAoZG9tRWxlbWVudC5fX2VsZW1lbnRfXyAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSksXG4gICAgICAgIGVsZW1lbnRzID0gZG9tRWxlbWVudHNXaXRoRWxlbWVudHMubWFwKGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5fX2VsZW1lbnRfXztcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBzb21lKGFycmF5LCB0ZXN0KSB7XG4gIGxldCByZXN1bHQgPSBmYWxzZTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgIHJlc3VsdCA9IHRlc3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXN1bHQgPSB0cnVlO1xuXG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IHRlc3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBmaWx0ZXJlZEFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmVkQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2JvZHknKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBCb2R5LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShCb2R5LCBlbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQm9keSwgaHRtbCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJvZHksIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gQm9keTtcbiAgICB9XG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG4gIH1cbn1cblxuQm9keS50YWdOYW1lID0gJ2JvZHknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvZHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIERpdiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRGl2LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShEaXYsIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChEaXYsIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGl2O1xuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5EaXYudGFnTmFtZSA9ICdkaXYnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpdjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gU3Bhbi5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoU3BhbiwgZWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChTcGFuLCBkb21FbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IFNwYW47XG4gICAgfVxuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cblNwYW4udGFnTmFtZSA9ICdzcGFuJztcblxubW9kdWxlLmV4cG9ydHMgPSBTcGFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShDbGFzcywgZWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEVsZW1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2xpY2tIYW5kbGVyKSB7IHJldHVybiBCdXR0b24uY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcjtcbiAgICB9XG4gICAgXG4gICAgc3VwZXIub25DbGljayhoYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNsaWNrKGhhbmRsZXIpIHtcbiAgICBzdXBlci5vZmZDbGljayhoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKEJ1dHRvbiwgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKEJ1dHRvbiwgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KEJ1dHRvbiwgZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2s7IC8vL1xuXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKG1vdXNlQnV0dG9uKTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBDaGVja2JveCBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gQ2hlY2tib3guY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBvbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NsaWNrJywgaGFuZGxlcik7ICAvLy9cbiAgfVxuICBcbiAgb2ZmQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2xpY2snLCBoYW5kbGVyKTsgIC8vL1xuICB9XG5cbiAgY2hlY2soY2hlY2tlZCA9IHRydWUpIHtcbiAgICBjaGVja2VkID9cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKSA6XG4gICAgICAgIHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIGlzQ2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jaGVja2VkOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKENoZWNrYm94LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChDaGVja2JveCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQ2hlY2tib3gsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZTsgLy8vICAgIFxuXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhDaGVja2JveCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDaGVja2JveCwge1xuICB0YWdOYW1lOiAnaW5wdXQnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZSdcbiAgXSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICB0eXBlOiAnY2hlY2tib3gnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBjaGVja2VkID0gdGhpcy5pc0NoZWNrZWQoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKGNoZWNrZWQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW5wdXRFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW5wdXRFbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG4gIFxuICBnZXRTZWxlY3Rpb25TdGFydCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydDsgfVxuICBcbiAgZ2V0U2VsZWN0aW9uRW5kKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZDsgfVxuICBcbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cbiAgXG4gIHNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0OyB9XG4gIFxuICBzZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7IH1cblxuICBvbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoSW5wdXQsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKElucHV0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChJbnB1dCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy8gICAgXG5cbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQpIHtcbiAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgTGluayBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIExpbmsuY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShMaW5rLCBlbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KExpbmssIGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjbGlja0hhbmRsZXIgPSBvbkNsaWNrOyAvLy8gICAgXG5cbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKExpbmssIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihMaW5rLCB7XG4gIHRhZ05hbWU6ICdhJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKGhyZWYpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFNlbGVjdC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIGdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH0gLy8vXG5cbiAgc2V0U2VsZWN0ZWRPcHRpb25CeVZhbHVlKHZhbHVlKSB7IHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyB9IC8vL1xuXG4gIG9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShTZWxlY3QsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFNlbGVjdCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU2VsZWN0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoU2VsZWN0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFNlbGVjdCwge1xuICB0YWdOYW1lOiAnc2VsZWN0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQpIHtcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoc2VsZWN0ZWRPcHRpb25WYWx1ZSk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmIChzY3JvbGxIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uU2Nyb2xsKHNjcm9sbEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH1cbiAgXG4gIGdldFNlbGVjdGlvblN0YXJ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0OyB9XG4gIFxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XG4gIFxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQ7IH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgfVxuICBcbiAgc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7IH1cbiAgXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuICBcbiAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wOyB9XG4gIFxuICBzZXRTY3JvbGxMZWZ0KHNjcm9sbExlZnQpIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0OyB9XG5cbiAgb25DaGFuZ2UoaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5vbignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbignc2Nyb2xsJywgaGFuZGxlcik7XG4gIH1cblxuICBvZmZTY3JvbGwoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XG4gIFxuICBvZmZSZXNpemUocmVzaXplSGFuZGxlcikge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoVGV4dGFyZWEsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFRleHRhcmVhLCBodG1sLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChUZXh0YXJlYSwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsOyAvLy9cbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRleHRhcmVhLCB7XG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJyxcbiAgICAnb25TY3JvbGwnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHZhbHVlKTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCb3VuZHMge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cblxuICBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90dG9tO1xuICB9XG5cbiAgZ2V0UmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMubGVmdCA8IG1vdXNlTGVmdCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKSAmJlxuICAgICAgICAgICAgICAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KSAmJlxuICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgIGJvdHRvbSA9IGJvdW5kaW5nQ2xpZW50UmVjdC5ib3R0b20sXG4gICAgICAgICAgcmlnaHQgPSBib3VuZGluZ0NsaWVudFJlY3QucmlnaHQsXG4gICAgICAgICAgYm91bmRzID0gbmV3IEJvdW5kcyh0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgT2Zmc2V0IHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPZmZzZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uQ2xpY2soaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuICBcbiAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyKTsgXG59XG5cbmZ1bmN0aW9uIG9mZkNsaWNrKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7IH1cblxuY29uc3QgY2xpY2tNaXhpbiA9IHtcbiAgb25DbGljazogb25DbGljayxcbiAgb2ZmQ2xpY2s6IG9mZkNsaWNrXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsaWNrTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbihldmVudFR5cGVzLCBoYW5kbGVyKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICBjb25zdCBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5hZGRIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgICBpZiAoYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgICBcbiAgICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihldmVudFR5cGUsIGhhbmRsZXIpIHtcbiAgbGV0IGFkZEV2ZW50TGlzdGVuZXIgPSBmYWxzZSxcbiAgICAgIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtldmVudFR5cGVdO1xuXG4gIGlmIChoYW5kbGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlcnMgPSBbXTtcblxuICAgIHRoaXMuaGFuZGxlcnNNYXBbZXZlbnRUeXBlXSA9IGhhbmRsZXJzO1xuXG4gICAgYWRkRXZlbnRMaXN0ZW5lciA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuXG4gIHJldHVybiBhZGRFdmVudExpc3RlbmVyO1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICBsZXQgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZhbHNlLFxuICAgICAgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSAodGhpcy5oYW5kbGVyc01hcFtldmVudFR5cGVdKTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBkZWxldGVDb3VudCA9IDE7XG5cbiAgICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW1vdmVFdmVudExpc3RlbmVyO1xufVxuXG5jb25zdCBldmVudE1peGluID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICBhZGRIYW5kbGVyOiBhZGRIYW5kbGVyLFxuICByZW1vdmVIYW5kbGVyOiByZW1vdmVIYW5kbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50TWl4aW47XG5cbmZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW2V2ZW50VHlwZV07XG5cbiAgbGV0IHByZXZlbnRFdmVudERlZmF1bHQgPSBmYWxzZTtcblxuICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KTtcbiAgICAgIFxuICAgICAgaWYgKHByZXZlbnREZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIHByZXZlbnRFdmVudERlZmF1bHQgPSB0cnVlO1xuICAgICAgfSAgXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihldmVudCk7XG4gICAgICBcbiAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBwcmV2ZW50RXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgaWYgKHByZXZlbnRFdmVudERlZmF1bHQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcywgYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG5cbiAgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BlcnRpZXMpOyAvLy9cbiAgXG4gIHVuYXNzaWduKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIGFkZGl0aW9uYWxQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGlmIChuYW1lID09PSAnY2hpbGRFbGVtZW50cycpIHtcbiAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBwcm9wZXJ0aWVzWydjaGlsZEVsZW1lbnRzJ107XG5cbiAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoY2hpbGRFbGVtZW50KTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcblxuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgICBhZGRIYW5kbGVyKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBdHRyaWJ1dGVOYW1lKG5hbWUpKSB7XG4gICAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmNvbnN0IGpzeE1peGluID0ge1xuICBhcHBseVByb3BlcnRpZXM6IGFwcGx5UHJvcGVydGllc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBqc3hNaXhpbjtcblxuZnVuY3Rpb24gdW5hc3NpZ24ocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpIHtcbiAgaWYgKGlnbm9yZWRQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBpZ25vcmVkUHJvcGVydHlOYW1lcyA9IGlnbm9yZWRQcm9wZXJ0aWVzOyAvLy9cblxuICAgIGlnbm9yZWRQcm9wZXJ0eU5hbWVzLmZvckVhY2goZnVuY3Rpb24oaWdub3JlZFByb3BlcnR5TmFtZSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbaWdub3JlZFByb3BlcnR5TmFtZV07XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAvLy9cbiAgICAgICAgaGFuZGxlciA9IHZhbHVlOyAgLy8vXG5cbiAgZWxlbWVudC5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSB7XG4gICAgbmFtZSA9ICdjbGFzcyc7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgbmFtZSA9ICdmb3InO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSkge1xuICByZXR1cm4gYXR0cmlidXRlTmFtZXMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1xuICAnYWNjZXB0JywgJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXNzS2V5JywgJ2FjdGlvbicsICdhbGxvd0Z1bGxTY3JlZW4nLCAnYWxsb3dUcmFuc3BhcmVuY3knLCAnYWx0JywgJ2FzeW5jJywgJ2F1dG9Db21wbGV0ZScsICdhdXRvRm9jdXMnLCAnYXV0b1BsYXknLFxuICAnY2FwdHVyZScsICdjZWxsUGFkZGluZycsICdjZWxsU3BhY2luZycsICdjaGFsbGVuZ2UnLCAnY2hhclNldCcsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3NJRCcsICdjbGFzc05hbWUnLCAnY29sU3BhbicsICdjb2xzJywgJ2NvbnRlbnQnLCAnY29udGVudEVkaXRhYmxlJywgJ2NvbnRleHRNZW51JywgJ2NvbnRyb2xzJywgJ2Nvb3JkcycsICdjcm9zc09yaWdpbicsXG4gICdkYXRhJywgJ2RhdGVUaW1lJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsXG4gICdlbmNUeXBlJyxcbiAgJ2Zvcm0nLCAnZm9ybUFjdGlvbicsICdmb3JtRW5jVHlwZScsICdmb3JtTWV0aG9kJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2Zvcm1UYXJnZXQnLCAnZnJhbWVCb3JkZXInLFxuICAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmTGFuZycsICdodG1sRm9yJywgJ2h0dHBFcXVpdicsXG4gICdpY29uJywgJ2lkJywgJ2lucHV0TW9kZScsICdpbnRlZ3JpdHknLCAnaXMnLFxuICAna2V5UGFyYW1zJywgJ2tleVR5cGUnLCAna2luZCcsXG4gICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9vcCcsICdsb3cnLFxuICAnbWFuaWZlc3QnLCAnbWFyZ2luSGVpZ2h0JywgJ21hcmdpbldpZHRoJywgJ21heCcsICdtYXhMZW5ndGgnLCAnbWVkaWEnLCAnbWVkaWFHcm91cCcsICdtZXRob2QnLCAnbWluJywgJ21pbkxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsXG4gICduYW1lJywgJ25vVmFsaWRhdGUnLCAnbm9uY2UnLFxuICAnb3BlbicsICdvcHRpbXVtJyxcbiAgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHJvZmlsZScsXG4gICdyYWRpb0dyb3VwJywgJ3JlYWRPbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd1NwYW4nLCAncm93cycsXG4gICdzYW5kYm94JywgJ3Njb3BlJywgJ3Njb3BlZCcsICdzY3JvbGxpbmcnLCAnc2VhbWxlc3MnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NwZWxsQ2hlY2snLCAnc3JjJywgJ3NyY0RvYycsICdzcmNMYW5nJywgJ3NyY1NldCcsICdzdGFydCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLFxuICAndGFiSW5kZXgnLCAndGFyZ2V0JywgJ3RpdGxlJywgJ3R5cGUnLFxuICAndXNlTWFwJyxcbiAgJ3ZhbHVlJyxcbiAgJ3dpZHRoJyxcbiAgJ3dtb2RlJyxcbiAgJ3dyYXAnXG5dO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG4gIFxuICB0aGlzLm9uKCdtb3VzZXVwJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2Vkb3duJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3ZlcihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3V0KGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cblxuICB0aGlzLm9uKCdtb3VzZW91dCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ21vdXNlbW92ZScsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb2ZmTW91c2VVcChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VEb3duKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ21vdXNlZG93bicsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW92ZXInLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU91dChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlTW92ZShoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW1vdmUnLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBtb3VzZU1peGluID0ge1xuICBvbk1vdXNlVXA6IG9uTW91c2VVcCxcbiAgb25Nb3VzZURvd246IG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlOiBvbk1vdXNlTW92ZSxcbiAgb2ZmTW91c2VVcDogb2ZmTW91c2VVcCxcbiAgb2ZmTW91c2VEb3duOiBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3Zlcjogb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dDogb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZTogb2ZmTW91c2VNb3ZlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdXNlTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5hZGRIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgaWYgKGFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBhcHBlbmRSZXNpemVPYmplY3QodGhpcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmUmVzaXplKGhhbmRsZXIpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZScsXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdCh0aGlzKTtcbiAgfVxufVxuXG5jb25zdCByZXNpemVNaXhpbiA9IHtcbiAgb25SZXNpemU6IG9uUmVzaXplLFxuICBvZmZSZXNpemU6IG9mZlJlc2l6ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemVNaXhpbjtcblxuZnVuY3Rpb24gYXBwZW5kUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHN0eWxlID0gYCBkaXNwbGF5OiBibG9jazsgXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICAgdG9wOiAwOyBcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IDA7IFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47IFxuICAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICAgICAgICAgICAgei1pbmRleDogLTE7YDtcblxuICByZXNpemVPYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgcmVzaXplT2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICByZXNpemVPYmplY3QudHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyA9IHJlc2l6ZU9iamVjdDtcblxuICByZXNpemVPYmplY3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudClcbiAgfTtcblxuICBkb21FbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVMaXN0ZW5lcik7XG5cbiAgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZXNpemVPYmplY3RMb2FkSGFuZGxlcihlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgcmVzaXplT2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIHJlc2l6ZU9iamVjdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcihlbGVtZW50KSB7XG4gIGNvbnN0IHdpZHRoID0gZWxlbWVudC5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSBlbGVtZW50LmdldEhlaWdodCgpLFxuICAgICAgICBoYW5kbGVycyA9IGVsZW1lbnQuaGFuZGxlcnNNYXBbJ3Jlc2l6ZSddO1xuXG4gIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgaGFuZGxlcih3aWR0aCwgaGVpZ2h0KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKTtcblxuY2xhc3MgUmVhY3Qge1xuICBzdGF0aWMgY3JlYXRlRWxlbWVudChmaXJzdEFyZ3VtZW50LCBwcm9wZXJ0aWVzLCAuLi5jaGlsZEVsZW1lbnRzKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2hpbGRFbGVtZW50cyA9IGZsYXR0ZW5DaGlsZEVsZW1lbnRzKGNoaWxkRWxlbWVudHMpO1xuXG4gICAgICBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNoaWxkRWxlbWVudHM6IGNoaWxkRWxlbWVudHNcbiAgICAgIH0sIHByb3BlcnRpZXMpO1xuXG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGZpcnN0QXJndW1lbnQsICAvLy9cbiAgICAgICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfT48LyR7dGFnTmFtZX0+YDtcblxuICAgICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tSFRNTChodG1sKTtcblxuICAgICAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNUeXBlT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgICAgZWxlbWVudCA9IENsYXNzLmZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICAgICAgfSBlbHNlIGlmIChmaXJzdEFyZ3VtZW50LnByb3RvdHlwZS5yZW5kZXIpIHtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50LCAgLy8vXG4gICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IENsYXNzKHByb3BlcnRpZXMpO1xuXG4gICAgICAgIGVsZW1lbnQgPSBpbnN0YW5jZS5yZW5kZXIoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50RnVuY3Rpb24ocHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuZnVuY3Rpb24gZmxhdHRlbkNoaWxkRWxlbWVudHMoY2hpbGRFbGVtZW50cykge1xuICBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24oY2hpbGRFbGVtZW50cywgY2hpbGRFbGVtZW50KSB7ICAvLy9cbiAgICBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50cy5jb25jYXQoY2hpbGRFbGVtZW50KTtcblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50ID09PSBDbGFzcykgeyAvLy9cbiAgICB0eXBlT2YgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGFyZ3VtZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3VtZW50KTsgLy8vXG5cbiAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgIHR5cGVPZiA9IGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVPZjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpO1xuXG5jbGFzcyBXaW5kb3cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSB3aW5kb3c7XG5cbiAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XG4gIH1cbiAgXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVyV2lkdGg7IH0gLy8vXG4gIFxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIZWlnaHQ7IH0gLy8vXG4gIFxuICBvblJlc2l6ZShoYW5kbGVyKSB7XG4gICAgY29uc3QgdHlwZSA9ICdyZXNpemUnLFxuICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIgPSB0aGlzLmFkZEhhbmRsZXIodHlwZSwgaGFuZGxlcik7XG5cbiAgICBpZiAoYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBvZmZSZXNpemUoaGFuZGxlcikge1xuICAgIGNvbnN0IHR5cGUgPSAncmVzaXplJyxcbiAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyID0gdGhpcy5yZW1vdmVIYW5kbGVyKHR5cGUsIGhhbmRsZXIpO1xuXG4gICAgaWYgKHJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGV2ZW50TGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBtb3VzZU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgV2luZG93KCk7ICAvLy9cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcihldmVudCkge1xuICBjb25zdCB0eXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW3R5cGVdLFxuICAgICAgICB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKTtcblxuICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICBoYW5kbGVyKHdpZHRoLCBoZWlnaHQpO1xuICB9KTtcbn1cbiJdfQ==
