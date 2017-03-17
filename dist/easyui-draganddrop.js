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
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectories) {
              draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var _sourcePath = draggableEntryPath,
                ///
            pathMap = find(pathMaps, function (pathMap) {
              var sourceDraggableEntryPath = _sourcePath,
                  movedPath = pathMap[sourceDraggableEntryPath],
                  found = movedPath !== undefined;

              return found;
            }),
                movedPath = pathMap[_sourcePath];

            this.moveDraggableEntry(draggableEntry, _sourcePath, movedPath);
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
      var rootDirectoryName = properties.rootDirectoryName,
          openHandler = properties.openHandler,
          onMove = properties.onMove,
          moveHandler = onMove; ///

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

    _this.nameButton = React.createElement(
      NameButton,
      { className: 'name' },
      name
    );

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
  tagName: 'li'
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

      var _properties = properties,
          name = _properties.name,
          collapsed = _properties.collapsed,
          explorer = _properties.explorer;


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
      var name = properties.name,
          explorer = properties.explorer;


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
      var file = React.createElement(
        File,
        { explorer: explorer, className: 'file' },
        fileName
      ),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, collapsed, explorer) {
      var name = directoryName,
          directory = React.createElement(
        this.Directory,
        { name: name, collapsed: collapsed, explorer: explorer, className: 'directory' },
        directoryName
      ),
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

  function NameButton(selector, doubleClickHandler) {
    _classCallCheck(this, NameButton);

    var _this = _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).call(this, selector));

    if (doubleClickHandler) {
      _this.onDoubleClick(doubleClickHandler);
    }
    return _this;
  }

  _createClass(NameButton, [{
    key: 'getName',
    value: function getName() {
      var childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          text = firstChildElement.getText(),
          name = text; ///

      return name;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      var text = name,
          ///
      childElements = this.getChildElements(),
          firstChildElement = first(childElements);

      firstChildElement.setText(text);
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onDoubleClick = properties.onDoubleClick,
          doubleClickHandler = onDoubleClick; ///

      return InputElement.fromProperties(NameButton, properties, doubleClickHandler);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  tagName: 'button',
  ignoredAttributes: ['name', 'onDoubleClick']
});

module.exports = NameButton;

function first(array) {
  return array[0];
}

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
      var onRemove = properties.onRemove,
          removeHandler = onRemove; ///

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
  window: require('./lib/window'),
  document: require('./lib/document'),
  TextElement: require('./lib/textElement'),
  Div: require('./lib/element/div'),
  Span: require('./lib/element/span'),
  Body: require('./lib/element/body'),
  Element: require('./lib/element'),
  Link: require('./lib/inputElement/link'),
  Input: require('./lib/inputElement/input'),
  Select: require('./lib/inputElement/select'),
  Button: require('./lib/inputElement/button'),
  Checkbox: require('./lib/inputElement/checkbox'),
  Textarea: require('./lib/inputElement/textarea'),
  InputElement: require('./lib/inputElement'),
  Bounds: require('./lib/misc/bounds'),
  Offset: require('./lib/misc/offset'),
  React: require('./lib/react')
};

},{"./lib/document":19,"./lib/element":20,"./lib/element/body":21,"./lib/element/div":22,"./lib/element/span":23,"./lib/inputElement":24,"./lib/inputElement/button":25,"./lib/inputElement/checkbox":26,"./lib/inputElement/input":27,"./lib/inputElement/link":28,"./lib/inputElement/select":29,"./lib/inputElement/textarea":30,"./lib/misc/bounds":31,"./lib/misc/offset":32,"./lib/react":38,"./lib/textElement":39,"./lib/window":40}],19:[function(require,module,exports){
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
    value: function prepend(element) {
      var domElement = element.domElement,
          firstChildDOMElement = this.domElement.firstChild;

      this.domElement.insertBefore(domElement, firstChildDOMElement);
    }
  }, {
    key: 'append',
    value: function append(element) {
      var domElement = element.domElement;

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

      var domNode = this.domElement,
          ///
      descendantDOMNodes = descendantDOMNodesFromDOMNode(domNode),
          descendantElements = filterDOMNodes(descendantDOMNodes, selector);

      return descendantElements;
    }
  }, {
    key: 'getChildElements',
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var childDOMNodes = this.domElement.childNodes,
          childDOMElements = filterDOMNodes(childDOMNodes, selector),
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

function elementsFromDOMElements(domElements) {
  var domElementsWithElements = filter(domElements, function (domElement) {
    return domElement.__element__ !== undefined;
  }),
      elements = domElementsWithElements.map(function (domElement) {
    return domElement.__element__;
  });

  return elements;
}

function descendantDOMNodesFromDOMNode(domNode) {
  var descendantDOMNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var childDOMNodes = domNode.childNodes; ///

  descendantDOMNodes.concat(childDOMNodes);

  childDOMNodes.forEach(function (childDOMNode) {
    descendantDOMNodesFromDOMNode(childDOMNode, descendantDOMNodes);
  });

  return descendantDOMNodes;
}

function filterDOMNodes(domNodes, selector) {
  var filteredDOMNodes = filter(domNodes, function (domNode) {
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
  });

  return filteredDOMNodes;
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

var Element = require('./element'),
    TextElement = require('./textElement');

var React = function () {
  function React() {
    _classCallCheck(this, React);
  }

  _createClass(React, null, [{
    key: 'createElement',
    value: function createElement(firstArgument, properties) {
      var element = null;

      if (firstArgument !== undefined) {
        for (var _len = arguments.length, childArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          childArguments[_key - 2] = arguments[_key];
        }

        var childElements = childElementsFromChildArguments(childArguments);

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

function childElementsFromChildArguments(childArguments) {
  childArguments = childArguments.reduce(function (childArguments, childArgument) {
    childArguments = childArguments.concat(childArgument);

    return childArguments;
  }, []);

  var childElements = childArguments.map(function (childArgument) {
    var childElement = void 0;

    if (childArgument instanceof Element) {
      childElement = childArgument; ///
    } else {
      var text = childArgument,
          ///
      textElement = new TextElement(text);

      childElement = textElement;
    }

    return childElement;
  });

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

},{"./element":20,"./textElement":39}],39:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = require('./misc/offset'),
    Bounds = require('./misc/bounds');

var TextElement = function () {
  function TextElement(text) {
    _classCallCheck(this, TextElement);

    this.domElement = document.createTextNode(text); ///

    this.domElement.__element__ = this;
  }

  _createClass(TextElement, [{
    key: 'clone',
    value: function clone() {
      return TextElement.clone(this);
    }
  }, {
    key: 'getText',
    value: function getText() {
      var nodeValue = this.domElement.nodeValue,
          text = nodeValue; ///

      return text;
    }
  }, {
    key: 'setText',
    value: function setText(text) {
      var nodeValue = text; ///

      this.domElement.nodeValue = nodeValue;
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
      var boundingClientRect = this.domElement.getBoundingClientRect(),
          bounds = Bounds.fromBoundingClientRect(boundingClientRect);

      return bounds;
    }
  }, {
    key: 'getWidth',
    value: function getWidth() {
      var width = this.domElement.clientWidth;

      return width;
    }
  }, {
    key: 'getHeight',
    value: function getHeight() {
      var height = this.domElement.clientHeight;

      return height;
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
    value: function remove() {
      this.domElement.remove();
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
  }]);

  return TextElement;
}();

module.exports = TextElement;

},{"./misc/bounds":31,"./misc/offset":32}],40:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wcGFibGVFbGVtZW50LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyL2ZpbGUuanMiLCJlczYvZXhwbG9yZXIvbmFtZUJ1dHRvbi5qcyIsImVzNi9leHBsb3Jlci90b2dnbGVCdXR0b24uanMiLCJlczYvb3B0aW9ucy5qcyIsImVzNi9ydWJiaXNoQmluLmpzIiwiZXM2L3V0aWwuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZWxlbWVudC9ib2R5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvZWxlbWVudC9kaXYuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9lbGVtZW50L3NwYW4uanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2NoZWNrYm94LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9pbnB1dEVsZW1lbnQvc2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvbWlzYy9ib3VuZHMuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXNjL29mZnNldC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L21peGluL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvbWl4aW4vZXZlbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXhpbi9qc3guanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi9taXhpbi9tb3VzZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L21peGluL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5dWkvZXM2L3JlYWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3l1aS9lczYvdGV4dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeXVpL2VzNi93aW5kb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOzs7Ozs7Ozs7O0FBRUEsSUFBTSxTQUFTLFFBQVEsUUFBUixDQUFmO0FBQUEsSUFDTSxVQUFVLE9BQU8sT0FEdkI7O0FBR0EsSUFBTSxPQUFPLFFBQVEsUUFBUixDQUFiO0FBQUEsSUFDTSxVQUFVLFFBQVEsV0FBUixDQURoQjs7SUFHTSxnQjs7O0FBQ0osNEJBQVksUUFBWixFQUFzQixXQUF0QixFQUFtQztBQUFBOztBQUFBLG9JQUMzQixRQUQyQjs7QUFHakMsVUFBSyxX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QUssUUFBTCxFQUZkO0FBQUEsTUFHTSxTQUFTLEtBQUssU0FBTCxFQUhmOztBQUtBLFdBQVMsT0FBVCxDQUFpQixVQUFTLE9BQVQsRUFBa0I7QUFDakMsWUFBUSxLQUFSLEVBQWUsTUFBZjtBQUNELEdBRkQ7QUFHRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvcHRpb25zOiByZXF1aXJlKCcuL2xpYi9vcHRpb25zJyksXG4gIEV4cGxvcmVyOiByZXF1aXJlKCcuL2xpYi9leHBsb3JlcicpLFxuICBSdWJiaXNoQmluOiByZXF1aXJlKCcuL2xpYi9ydWJiaXNoQmluJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi91dGlsJyksXG4gICAgICBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyk7XG5cbmNsYXNzIERyb3BwYWJsZUVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucHVzaChkcm9wcGFibGVFbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BwYWJsZUVsZW1lbnQoZHJvcHBhYmxlRWxlbWVudCkge1xuICAgIGNvbnN0IGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLCBkcm9wcGFibGVFbGVtZW50KSxcbiAgICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BwYWJsZUVsZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZHJvcHBhYmxlRWxlbWVudHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLCBkcm9wcGFibGVFbGVtZW50KSB7XG4gICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BwYWJsZUVsZW1lbnQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcHBhYmxlRWxlbWVudCgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5kcm9wcGFibGVFbGVtZW50cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcHBhYmxlRWxlbWVudCwgZHJvcHBhYmxlRWxlbWVudCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudE1hcmtlZCA9IGRyb3BwYWJsZUVsZW1lbnQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IGRyb3BwYWJsZUVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcHBhYmxlRWxlbWVudDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BwYWJsZUVsZW1lbnQgPSB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKTtcblxuICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKHBhdGhNYXBzLCBmdW5jdGlvbihwYXRoTWFwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICAgIHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgbW92ZWREaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgICBtb3ZlZEZpbGVQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BwYWJsZUVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGVsZW1lbnQpIHtcbiAgbGV0IGluZGV4ID0gLTE7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYWxsYmFjaykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BwYWJsZUVsZW1lbnQgPSByZXF1aXJlKCcuL2Ryb3BwYWJsZUVsZW1lbnQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wcGFibGVFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgY29uc3QgbmFtZSA9IHJvb3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICByb290RGlyZWN0b3J5ID0gPFJvb3REaXJlY3RvcnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIiAvPjtcblxuICAgIHRoaXMub3BlbkhhbmRsZXIgPSBvcGVuSGFuZGxlcjtcblxuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5ID0gcm9vdERpcmVjdG9yeTtcblxuICAgIHRoaXMuYXBwZW5kKHJvb3REaXJlY3RvcnkpO1xuICB9XG5cbiAgc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIHRoaXMub3B0aW9uc1tvcHRpb25dID0gdHJ1ZTtcbiAgfVxuXG4gIHVuc2V0T3B0aW9uKG9wdGlvbikge1xuICAgIGRlbGV0ZSh0aGlzLm9wdGlvbnNbb3B0aW9uXSk7XG4gIH1cblxuICBoYXNPcHRpb24ob3B0aW9uKSB7XG4gICAgb3B0aW9uID0gKHRoaXMub3B0aW9uc1tvcHRpb25dID09PSB0cnVlKTsgLy8vXG5cbiAgICByZXR1cm4gb3B0aW9uO1xuICB9XG5cbiAgZ2V0RmlsZVBhdGhzKCkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldEZpbGVQYXRocygpOyB9XG4gIFxuICBnZXRSb290RGlyZWN0b3J5TmFtZSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXROYW1lKCk7IH1cbiAgXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRNYXJrZWREaXJlY3RvcnkoKTsgfVxuICBcbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkgeyByZXR1cm4gdGhpcy5yb290RGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpOyB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkuYWRkRmlsZShmaWxlUGF0aCk7IH1cbiAgXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHsgdGhpcy5yb290RGlyZWN0b3J5LmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpOyB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkgeyB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aCk7IH1cbiAgXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7IHRoaXMucm9vdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7IH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMucm9vdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5yb290RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gPERpcmVjdG9yeU1hcmtlciBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJtYXJrZXJcIiAvPjtcblxuICAgIHRoaXMuYXBwZW5kKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlNYXJrZWQgPSB0aGlzLnJvb3REaXJlY3RvcnkuaXNNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJvb3REaXJlY3RvcnkucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG4gICAgXG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeU1hcmtlZCA9IHRoaXMucm9vdERpcmVjdG9yeS5pc01hcmtlZCgpO1xuXG4gICAgaWYgKHJvb3REaXJlY3RvcnlNYXJrZWQpIHtcbiAgICAgIG1hcmtlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpO1xuXG4gICAgICBtYXJrZWQgPSAodG9wbW9zdERpcmVjdG9yeU1hcmtlciAhPT0gbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcHBhYmxlRWxlbWVudCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BwYWJsZUVsZW1lbnQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSBtYXJrZWREcm9wcGFibGVFbGVtZW50LmdldE1hcmtlZERpcmVjdG9yeSgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeVBhdGggPSAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VkRGlyZWN0b3J5LmdldFBhdGgoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChtYXJrZWQgJiYgdW5tb3ZlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJHbG9iYWxseSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wcGFibGVFbGVtZW50ID0gdGhpcy5nZXRNYXJrZWREcm9wcGFibGVFbGVtZW50KCk7XG5cbiAgICAgIG1hcmtlZERyb3BwYWJsZUVsZW1lbnQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cbiAgXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpO1xuICAgIFxuICAgIGxldCBkaXJlY3RvcnlQYXRoO1xuICAgIFxuICAgIGlmIChtb3ZlZERpcmVjdG9yeVBhdGggPT09IHNvdXJjZURpcmVjdG9yeVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBtb3ZlZERpcmVjdG9yeVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCk7XG4gICAgXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKG1vdmVkRmlsZVBhdGggPT09IHNvdXJjZUZpbGVQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRoID0gbW92ZWRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIHRoaXMuYWRkRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGUoZmlsZSkge1xuICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHRoaXMucm9vdERpcmVjdG9yeSksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGZpbGVQYXRoO1xuICAgIFxuICAgIHRoaXMub3BlbkhhbmRsZXIoc291cmNlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShFeHBsb3Jlciwgc2VsZWN0b3IsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIHJvb3REaXJlY3RvcnlOYW1lLCBvcGVuSGFuZGxlciwgbW92ZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChFeHBsb3JlciwgaHRtbCwgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyByb290RGlyZWN0b3J5TmFtZSwgb3BlbkhhbmRsZXIsIG9uTW92ZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgcm9vdERpcmVjdG9yeU5hbWUsIG9wZW5IYW5kbGVyLCBtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAncm9vdERpcmVjdG9yeU5hbWUnLCBcbiAgICAnb3BlbkhhbmRsZXInLCBcbiAgICAnb25Nb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeXVpID0gcmVxdWlyZSgnZWFzeXVpJyksXG4gICAgICBFbGVtZW50ID0gZWFzeXVpLkVsZW1lbnQsXG4gICAgICB3aW5kb3cgPSBlYXN5dWkud2luZG93LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gPE5hbWVCdXR0b24gY2xhc3NOYW1lPVwibmFtZVwiPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmV4cGxvcmVyLmdldERyYWdnYWJsZUVudHJ5UGF0aCh0aGlzKTtcbiAgICBcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKTtcblxuICAgIGxldCB0b3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgIGxlZnQgPSBib3VuZHMuZ2V0TGVmdCgpO1xuXG4gICAgdGhpcy50b3BPZmZzZXQgPSB0b3AgLSBtb3VzZVRvcDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBsZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDtcbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICAgICAgICB0b3A6IHRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGxlZnRcbiAgICAgICAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdkcmFnZ2luZycpO1xuICB9XG5cbiAgZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0LFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDtcbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7XG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cblxuICBzdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ID09PSBudWxsKSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuXG4gICAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICFyb290RGlyZWN0b3J5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1N1YkVudHJpZXMgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZKTtcblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaDtcblxuICAgIGlmIChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuZXhwbG9yZXIuZXNjYXBlRHJhZ2dpbmcoKTtcblxuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERyYWdnYWJsZUVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCB1dGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbCcpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgRW50cmllcyA9IHJlcXVpcmUoJy4uL2VudHJpZXMnKSxcbiAgICAgIFRvZ2dsZUJ1dHRvbiA9IHJlcXVpcmUoJy4uL3RvZ2dsZUJ1dHRvbicpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jbGFzcyBEaXJlY3RvcnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBjb2xsYXBzZWQgPSBmYWxzZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICBjb25zdCB1cGRhdGVIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25VcGRhdGVIYW5kbGVyLmJpbmQodGhpcyksXG4gICAgICAgICAgdG9nZ2xlQnV0dG9uID0gPFRvZ2dsZUJ1dHRvbiB1cGRhdGVIYW5kbGVyPXt1cGRhdGVIYW5kbGVyfSBjbGFzc05hbWU9XCJ0b2dnbGVcIiAvPixcbiAgICAgICAgICBlbnRyaWVzID0gPEVudHJpZXMgRGlyZWN0b3J5PXtEaXJlY3Rvcnl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLnRvZ2dsZUJ1dHRvbiA9IHRvZ2dsZUJ1dHRvbjtcbiAgICBcbiAgICB0aGlzLmFwcGVuZCh0b2dnbGVCdXR0b24pOyAgICBcbiAgICBcbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgICFjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5leHBhbmQoKSA6XG4gICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuXG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBsZXQgZmlsZVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKCk7XG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gICAgXG4gICAgaWYgKHRoaXMgPT09IGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKGNvbGxhcHNlZCkge1xuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7IHJldHVybiB0aGlzLnRvZ2dsZUJ1dHRvbi5pc0NvbGxhcHNlZCgpOyB9XG5cbiAgZXhwYW5kKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5leHBhbmQoKTsgfVxuXG4gIGNvbGxhcHNlKCkgeyB0aGlzLnRvZ2dsZUJ1dHRvbi5jb2xsYXBzZSgpOyB9XG5cbiAgYWRkRmlsZShmaWxlUGF0aCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXIobWFya2VyTmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuXG4gICAgICAgIGlmICghZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsXG4gICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uVXBkYXRlSGFuZGxlcihjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgPyBcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpIDogXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlQnV0dG9uLnRvZ2dsZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB7IG5hbWUsIGNvbGxhcHNlZCwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lLCBjb2xsYXBzZWQsIGV4cGxvcmVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeSwge1xuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICduYW1lJyxcbiAgICAnY29sbGFwc2VkJyxcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgICBcbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuICAgIFxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdFbnRyeSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHN1cGVyLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTsgICAgXG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSB1dGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeS5mcm9tUHJvcGVydGllcyhSb290RGlyZWN0b3J5LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3Rvcnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpO1xuXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwOyAgICAgIFxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGJlZm9yZSA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIGNvbnN0IHN1YkVudHJpZXMgPSBbXTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG4gIFxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlKGZpbGUpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGUsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEZpbGUsIHtcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudCxcbiAgICAgIFJlYWN0ID0gZWFzeXVpLlJlYWN0O1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZScpLFxuICAgICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5Jyk7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IGZpbGUgPSA8RmlsZSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNsYXNzTmFtZT1cImZpbGVcIj57ZmlsZU5hbWV9PC9GaWxlPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGRpcmVjdG9yeSA9IDx0aGlzLkRpcmVjdG9yeSBuYW1lPXtuYW1lfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjbGFzc05hbWU9XCJkaXJlY3RvcnlcIj57ZGlyZWN0b3J5TmFtZX08L3RoaXMuRGlyZWN0b3J5PixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeTsgIC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBmaWxlLnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBoYXNGaWxlKGZpbGVOYW1lKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSk7XG5cbiAgICBmaWxlID0gKGZpbGUgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICBcbiAgICBkaXJlY3RvcnkgPSAoZGlyZWN0b3J5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXI7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IDxGaWxlTWFya2VyIG5hbWU9e25hbWV9IGNsYXNzTmFtZT1cIm1hcmtlclwiIC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gY2xhc3NOYW1lPVwibWFya2VyXCIgLz47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeSA9IG51bGw7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeS5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgc29tZUZpbGUoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgbGV0IGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBEaXJlY3RvcnkpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBpZ25vcmVkQXR0cmlidXRlczogW1xuICAgICdEaXJlY3RvcnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3l1aSA9IHJlcXVpcmUoJ2Vhc3l1aScpLFxuICAgICAgRWxlbWVudCA9IGVhc3l1aS5FbGVtZW50LFxuICAgICAgUmVhY3QgPSBlYXN5dWkuUmVhY3Q7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbiBuYW1lPXtuYW1lfSBjbGFzc05hbWU9XCJuYW1lXCIgLz47XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbiAgXG4gIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaScsXG4gIGlnbm9yZWRBdHRyaWJ1dGVzOiBbXG4gICAgJ25hbWUnXG4gIF0sXG4gIHR5cGVzOiB7XG4gICAgRklMRTogJ0ZJTEUnLFxuICAgIE1BUktFUjogJ01BUktFUicsXG4gICAgRElSRUNUT1JZOiAnRElSRUNUT1JZJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBNYXJrZXIgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIHJldHVybiBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlciA9IHJlcXVpcmUoJy4uL21hcmtlcicpO1xuXG5jbGFzcyBEaXJlY3RvcnlNYXJrZXIgZXh0ZW5kcyBNYXJrZXIge1xuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGJlZm9yZSA9IChlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkZJTEUpID9cbiAgICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIE1hcmtlci5mcm9tUHJvcGVydGllcyhEaXJlY3RvcnlNYXJrZXIsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TWFya2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXIgPSByZXF1aXJlKCcuLi9tYXJrZXInKTtcblxuY2xhc3MgRmlsZU1hcmtlciBleHRlbmRzIE1hcmtlciB7XG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgYmVmb3JlID0gKGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRElSRUNUT1JZKSA/IFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBNYXJrZXIuZnJvbVByb3BlcnRpZXMoRmlsZU1hcmtlciwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTWFya2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3l1aS5JbnB1dEVsZW1lbnQ7XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgZG91YmxlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkRvdWJsZUNsaWNrKGRvdWJsZUNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgZ2V0TmFtZSgpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKSxcbiAgICAgICAgICB0ZXh0ID0gZmlyc3RDaGlsZEVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICAgIG5hbWUgPSB0ZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7XG4gICAgY29uc3QgdGV4dCA9IG5hbWUsIC8vL1xuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpO1xuXG4gICAgZmlyc3RDaGlsZEVsZW1lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgfVxuICBcbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uRG91YmxlQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gb25Eb3VibGVDbGljazsgLy8vXG4gICAgXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzLCBkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTmFtZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ29uRG91YmxlQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIElucHV0RWxlbWVudCA9IGVhc3l1aS5JbnB1dEVsZW1lbnQ7XG5cbmNsYXNzIFRvZ2dsZUJ1dHRvbiBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB1cGRhdGVIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyID0gdXBkYXRlSGFuZGxlcjtcblxuICAgIHRoaXMub25DbGljayh0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbGxhcHNlZDtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuY29sbGFwc2VkID0gdHJ1ZTtcblxuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy5jb2xsYXBzZWQgPSAhdGhpcy5jb2xsYXBzZWQ7XG5cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG4gIFxuICBjbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBodG1sID0gdGhpcy5jb2xsYXBzZWQgPyBcbiAgICAgICAgICAgICAgICAgICBUb2dnbGVCdXR0b24uQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEUgOiBcbiAgICAgICAgICAgICAgICAgICAgIFRvZ2dsZUJ1dHRvbi5CTEFDS19ET1dOX1BPSU5USU5HX1RSSUFOR0xFO1xuXG4gICAgdGhpcy5odG1sKGh0bWwpO1xuXG4gICAgdGhpcy51cGRhdGVIYW5kbGVyKHRoaXMuY29sbGFwc2VkKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB1cGRhdGVIYW5kbGVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVG9nZ2xlQnV0dG9uLCBwcm9wZXJ0aWVzLCB1cGRhdGVIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRvZ2dsZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAndXBkYXRlSGFuZGxlcidcbiAgXSxcbiAgQkxBQ0tfUklHSFRfUE9JTlRJTkdfVFJJQU5HTEU6ICcmI3gwMjViNicsXG4gIEJMQUNLX0RPV05fUE9JTlRJTkdfVFJJQU5HTEU6ICcmI3gwMjViYydcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRvZ2dsZUJ1dHRvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9wdGlvbnMgPSB7XG4gIE5PX0RSQUdHSU5HOiAnTk9fRFJBR0dJTkcnLFxuICBOT19EUkFHR0lOR19XSVRISU46ICdOT19EUkFHR0lOR19XSVRISU4nLFxuICBOT19EUkFHR0lOR19TVUJfRU5UUklFUzogJ05PX0RSQUdHSU5HX1NVQl9FTlRSSUVTJyxcbiAgTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlk6ICdOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWScsXG4gIE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTOiAnTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMnLFxuICBSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTOiAnUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUycsXG4gIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkc6ICdFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HJ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBvcHRpb25zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5dWkgPSByZXF1aXJlKCdlYXN5dWknKSxcbiAgICAgIEVsZW1lbnQgPSBlYXN5dWkuRWxlbWVudDtcblxuY29uc3QgRHJvcHBhYmxlRWxlbWVudCA9IHJlcXVpcmUoJy4vZHJvcHBhYmxlRWxlbWVudCcpO1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcHBhYmxlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wcGFibGVFbGVtZW50TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3QgZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BwYWJsZUVsZW1lbnRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcHBhYmxlRWxlbWVudFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wcGFibGVFbGVtZW50VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICBcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShzZWxlY3RvciwgcmVtb3ZlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFJ1YmJpc2hCaW4sIHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoUnViYmlzaEJpbiwgaHRtbCwgcmVtb3ZlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25SZW1vdmUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgcmVtb3ZlSGFuZGxlciA9IG9uUmVtb3ZlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFJ1YmJpc2hCaW4sIHByb3BlcnRpZXMsIHJlbW92ZUhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oUnViYmlzaEJpbiwge1xuICB0YWdOYW1lOiAnZGl2JyxcbiAgaWdub3JlZEF0dHJpYnV0ZXM6IFtcbiAgICAnb25SZW1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIHV0aWwge1xuICBzdGF0aWMgaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSxcbiAgICAgICAgICBwYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBwYXRoVG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBzdGF0aWMgYm90dG9tbW9zdE5hbWUocGF0aCkge1xuICAgIGxldCBib3R0b21tb3N0TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14uKlxcLyhbXlxcL10qJCkvKTtcbiAgICBcbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG4gICAgICBcbiAgICAgIGJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgdG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oW15cXC9dKilcXC8vKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICBsZXQgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgICAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10qXFwvKC4qJCkvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG4gIFxuICBzdGF0aWMgcHJlcGVuZFRhcmdldFBhdGgoZW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICAgIGVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBlbnRyeVBhdGg7XG4gICAgXG4gICAgcmV0dXJuIGVudHJ5UGF0aDtcbiAgfVxuXG4gIHN0YXRpYyByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlUGF0aCArICcoLiokKScpLFxuICAgICAgICAgIG1hdGNoZXMgPSBlbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgICBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIGVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnlQYXRoO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbDtcblxuZnVuY3Rpb24gc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2luZG93OiByZXF1aXJlKCcuL2xpYi93aW5kb3cnKSxcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vbGliL2RvY3VtZW50JyksXG4gIFRleHRFbGVtZW50OiByZXF1aXJlKCcuL2xpYi90ZXh0RWxlbWVudCcpLFxuICBEaXY6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvZGl2JyksXG4gIFNwYW46IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvc3BhbicpLFxuICBCb2R5OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2JvZHknKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9saWIvZWxlbWVudCcpLFxuICBMaW5rOiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvbGluaycpLFxuICBJbnB1dDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L2lucHV0JyksXG4gIFNlbGVjdDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L3NlbGVjdCcpLFxuICBCdXR0b246IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9idXR0b24nKSxcbiAgQ2hlY2tib3g6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9jaGVja2JveCcpLFxuICBUZXh0YXJlYTogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L3RleHRhcmVhJyksXG4gIElucHV0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50JyksXG4gIEJvdW5kczogcmVxdWlyZSgnLi9saWIvbWlzYy9ib3VuZHMnKSxcbiAgT2Zmc2V0OiByZXF1aXJlKCcuL2xpYi9taXNjL29mZnNldCcpLFxuICBSZWFjdDogcmVxdWlyZSgnLi9saWIvcmVhY3QnKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpO1xuXG5jbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50O1xuXG4gICAgdGhpcy5oYW5kbGVyc01hcCA9IHt9O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBtb3VzZU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRG9jdW1lbnQoKTsgIC8vL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2Mvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2MvYm91bmRzJyksXG4gICAgICBqc3hNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vanN4JyksXG4gICAgICBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICByZXNpemVNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vcmVzaXplJyk7XG5cbmNsYXNzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpcztcbiAgICBcbiAgICB0aGlzLmhhbmRsZXJzTWFwID0ge307XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUodGhpcyk7IH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7IH1cblxuICBnZXRIZWlnaHQoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgOyB9XG5cbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICBjbGVhckF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lOyB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuXG4gIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpOyB9XG5cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH1cblxuICBjbGVhckNsYXNzZXMoKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSAnJzsgfVxuXG4gIHByZXBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgICAgZmlyc3RDaGlsZERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgZmlyc3RDaGlsZERPTUVsZW1lbnQpO1xuICB9XG4gIFxuICBhcHBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIG51bGwpOyAvLy9cbiAgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0U2libGluZ0RPTUVsZW1lbnQgPSBwYXJlbnRET01FbGVtZW50LmZpcnN0Q2hpbGQ7IC8vL1xuXG4gICAgcGFyZW50RE9NRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBmaXJzdFNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTUVsZW1lbnQuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHBhcmVudEVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTUVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5kb21FbGVtZW50KTtcbiAgfVxuXG4gIHJlbW92ZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHNob3coZGlzcGxheVN0eWxlID0gJ2Jsb2NrJykgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTdHlsZTsgfVxuXG4gIGhpZGUoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgZW5hYmxlKCkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKCdkaXNhYmxlZCcpOyB9XG5cbiAgZGlzYWJsZSgpIHsgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7IH1cblxuICBodG1sKGh0bWwpIHtcbiAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBodG1sID0gdGhpcy5kb21FbGVtZW50LmlubmVySFRNTDsgLy8vXG5cbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSBodG1sOyAvLy9cblxuICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNzcyhjc3MpIHtcbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICBjc3MgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXB1dGVkU3R5bGUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wdXRlZFN0eWxlWzBdLCAgLy8vXG4gICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgICBjc3NbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmFtZSA9IGNzczsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgIGNzcyA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoY3NzKTsgLy8vXG5cbiAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNzc1tuYW1lXTtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGVzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgZG9tTm9kZSA9IHRoaXMuZG9tRWxlbWVudCwgIC8vL1xuICAgICAgICAgIGRlc2NlbmRhbnRET01Ob2RlcyA9IGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUpLFxuICAgICAgICAgIGRlc2NlbmRhbnRFbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzKGRlc2NlbmRhbnRET01Ob2Rlcywgc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGRlc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldENoaWxkRWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBjaGlsZERPTU5vZGVzID0gdGhpcy5kb21FbGVtZW50LmNoaWxkTm9kZXMsXG4gICAgICAgICAgY2hpbGRET01FbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzKGNoaWxkRE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoY2hpbGRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGdldFBhcmVudEVsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgcGFyZW50RWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocGFyZW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHBhcmVudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgY29uc3QgcGFyZW50RE9NRWxlbWVudHMgPSBbcGFyZW50RE9NRWxlbWVudF0sXG4gICAgICAgICAgICAgIHBhcmVudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMocGFyZW50RE9NRWxlbWVudHMpLFxuICAgICAgICAgICAgICBmaXJzdFBhcmVudEVsZW1lbnQgPSBmaXJzdChwYXJlbnRFbGVtZW50cyk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCA9IGZpcnN0UGFyZW50RWxlbWVudCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgZ2V0QXNjZW5kYW50RWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBhc2NlbmRhbnRET01FbGVtZW50cyA9IFtdLFxuICAgICAgICAgIHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGxldCBhc2NlbmRhbnRET01FbGVtZW50ID0gcGFyZW50RE9NRWxlbWVudDsgIC8vL1xuICAgIHdoaWxlIChhc2NlbmRhbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoYXNjZW5kYW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBhc2NlbmRhbnRET01FbGVtZW50cy5wdXNoKGFzY2VuZGFudERPTUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBhc2NlbmRhbnRET01FbGVtZW50ID0gYXNjZW5kYW50RE9NRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGFzY2VuZGFudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoYXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGFzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBpZiAoQ2xhc3MgaW5zdGFuY2VvZiBFbGVtZW50KSB7XG4gICAgICBlbGVtZW50ID0gQ2xhc3M7XG4gICAgICByZW1haW5pbmdBcmd1bWVudHMuc2hpZnQoKTtcbiAgICAgIENsYXNzID0gRWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBkZWVwID0gdHJ1ZSxcbiAgICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LmNsb25lTm9kZShkZWVwKTtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBpZiAodHlwZW9mIENsYXNzID09PSAnc3RyaW5nJykge1xuICAgICAgaHRtbCA9IENsYXNzO1xuICAgICAgcmVtYWluaW5nQXJndW1lbnRzLnNoaWZ0KCk7XG4gICAgICBDbGFzcyA9IEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0ZXJET01FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBvdXRlckRPTUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDsgIC8vL1xuXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IG91dGVyRE9NRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGlmICh0eXBlb2YgQ2xhc3MgPT09ICdvYmplY3QnKSB7XG4gICAgICBkb21FbGVtZW50ID0gQ2xhc3M7XG4gICAgICByZW1haW5pbmdBcmd1bWVudHMuc2hpZnQoKTtcbiAgICAgIENsYXNzID0gRWxlbWVudDtcbiAgICB9XG5cbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IENsYXNzLnRhZ05hbWUsXG4gICAgICAgICAgaWdub3JlZFByb3BlcnRpZXMgPSBDbGFzcy5pZ25vcmVkUHJvcGVydGllcyxcbiAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllcyA9IENsYXNzLmFkZGl0aW9uYWxQcm9wZXJ0aWVzLFxuICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0+PC8ke3RhZ05hbWV9PmAsXG4gICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcywgYWRkaXRpb25hbFByb3BlcnRpZXMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwganN4TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgcmVzaXplTWl4aW4pO1xuXG5FbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OID0gMDtcbkVsZW1lbnQuTUlERExFX01PVVNFX0JVVFRPTiA9IDE7XG5FbGVtZW50LlJJR0hUX01PVVNFX0JVVFRPTiA9IDI7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcblxuZnVuY3Rpb24gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcikge1xuICBjb25zdCBkb21FbGVtZW50ID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID9cbiAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilbMF0gOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I7ICAvLy9cblxuICByZXR1cm4gZG9tRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoZG9tRWxlbWVudHMpIHtcbiAgY29uc3QgZG9tRWxlbWVudHNXaXRoRWxlbWVudHMgPSBmaWx0ZXIoZG9tRWxlbWVudHMsIGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gKGRvbUVsZW1lbnQuX19lbGVtZW50X18gIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0pLFxuICAgICAgICBlbGVtZW50cyA9IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzLm1hcChmdW5jdGlvbihkb21FbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuX19lbGVtZW50X187XG4gICAgICAgIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzID0gW10pIHtcbiAgY29uc3QgY2hpbGRET01Ob2RlcyA9IGRvbU5vZGUuY2hpbGROb2RlczsgIC8vL1xuXG4gIGRlc2NlbmRhbnRET01Ob2Rlcy5jb25jYXQoY2hpbGRET01Ob2Rlcyk7XG5cbiAgY2hpbGRET01Ob2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkRE9NTm9kZSkge1xuICAgIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGNoaWxkRE9NTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc2NlbmRhbnRET01Ob2Rlcztcbn1cblxuZnVuY3Rpb24gZmlsdGVyRE9NTm9kZXMoZG9tTm9kZXMsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGZpbHRlcmVkRE9NTm9kZXMgPSBmaWx0ZXIoZG9tTm9kZXMsIGZ1bmN0aW9uKGRvbU5vZGUpIHtcbiAgICBjb25zdCBkb21Ob2RlVHlwZSA9IGRvbU5vZGUubm9kZVR5cGU7XG5cbiAgICBzd2l0Y2ggKGRvbU5vZGVUeXBlKSB7XG4gICAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFIDoge1xuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tTm9kZTsgLy8vXG5cbiAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgTm9kZS5URVhUX05PREUgOiB7XG4gICAgICAgIGlmIChzZWxlY3RvciA9PT0gJyonKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuXG4gIHJldHVybiBmaWx0ZXJlZERPTU5vZGVzO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IHRlc3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBmaWx0ZXJlZEFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmVkQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2JvZHknKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBCb2R5LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShCb2R5LCBlbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQm9keSwgaHRtbCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJvZHksIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gQm9keTtcbiAgICB9XG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG4gIH1cbn1cblxuQm9keS50YWdOYW1lID0gJ2JvZHknO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvZHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIERpdiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRGl2LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShEaXYsIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChEaXYsIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGl2O1xuICAgIH1cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5EaXYudGFnTmFtZSA9ICdkaXYnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpdjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gU3Bhbi5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoU3BhbiwgZWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChTcGFuLCBkb21FbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IFNwYW47XG4gICAgfVxuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cblNwYW4udGFnTmFtZSA9ICdzcGFuJztcblxubW9kdWxlLmV4cG9ydHMgPSBTcGFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShDbGFzcywgZWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEVsZW1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2xpY2tIYW5kbGVyKSB7IHJldHVybiBCdXR0b24uY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcjtcbiAgICB9XG4gICAgXG4gICAgc3VwZXIub25DbGljayhoYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNsaWNrKGhhbmRsZXIpIHtcbiAgICBzdXBlci5vZmZDbGljayhoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKEJ1dHRvbiwgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKEJ1dHRvbiwgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KEJ1dHRvbiwgZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2s7IC8vL1xuXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKG1vdXNlQnV0dG9uKTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBDaGVja2JveCBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gQ2hlY2tib3guY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBvbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NsaWNrJywgaGFuZGxlcik7ICAvLy9cbiAgfVxuICBcbiAgb2ZmQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2xpY2snLCBoYW5kbGVyKTsgIC8vL1xuICB9XG5cbiAgY2hlY2soY2hlY2tlZCA9IHRydWUpIHtcbiAgICBjaGVja2VkID9cbiAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdjaGVja2VkJywgJ2NoZWNrZWQnKSA6XG4gICAgICAgIHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgfVxuXG4gIGlzQ2hlY2tlZCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jaGVja2VkOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKENoZWNrYm94LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChDaGVja2JveCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQ2hlY2tib3gsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZTsgLy8vICAgIFxuXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhDaGVja2JveCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDaGVja2JveCwge1xuICB0YWdOYW1lOiAnaW5wdXQnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZSdcbiAgXSxcbiAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHtcbiAgICB0eXBlOiAnY2hlY2tib3gnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBjaGVja2VkID0gdGhpcy5pc0NoZWNrZWQoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKGNoZWNrZWQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgSW5wdXRFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW5wdXRFbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0IGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlcikge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG4gIFxuICBnZXRTZWxlY3Rpb25TdGFydCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydDsgfVxuICBcbiAgZ2V0U2VsZWN0aW9uRW5kKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZDsgfVxuICBcbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cbiAgXG4gIHNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0OyB9XG4gIFxuICBzZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7IH1cblxuICBvbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoSW5wdXQsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKElucHV0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChJbnB1dCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy8gICAgXG5cbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQpIHtcbiAgY29uc3QgdmFsdWUgPSB0aGlzLmdldFZhbHVlKCksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcih2YWx1ZSk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgTGluayBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIExpbmsuY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShMaW5rLCBlbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KExpbmssIGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjbGlja0hhbmRsZXIgPSBvbkNsaWNrOyAvLy8gICAgXG5cbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKExpbmssIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihMaW5rLCB7XG4gIHRhZ05hbWU6ICdhJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCBocmVmID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKGhyZWYpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFNlbGVjdC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIGdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH0gLy8vXG5cbiAgc2V0U2VsZWN0ZWRPcHRpb25CeVZhbHVlKHZhbHVlKSB7IHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyB9IC8vL1xuXG4gIG9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShTZWxlY3QsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFNlbGVjdCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU2VsZWN0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoU2VsZWN0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFNlbGVjdCwge1xuICB0YWdOYW1lOiAnc2VsZWN0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQpIHtcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoc2VsZWN0ZWRPcHRpb25WYWx1ZSk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cblxuICAgIGlmIChzY3JvbGxIYW5kbGVyKSB7XG4gICAgICB0aGlzLm9uU2Nyb2xsKHNjcm9sbEhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH1cbiAgXG4gIGdldFNlbGVjdGlvblN0YXJ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0OyB9XG4gIFxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XG4gIFxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQ7IH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgfVxuICBcbiAgc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7IH1cbiAgXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuICBcbiAgc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wOyB9XG4gIFxuICBzZXRTY3JvbGxMZWZ0KHNjcm9sbExlZnQpIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0OyB9XG5cbiAgb25DaGFuZ2UoaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5vbignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIG9uU2Nyb2xsKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbignc2Nyb2xsJywgaGFuZGxlcik7XG4gIH1cblxuICBvZmZTY3JvbGwoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdzY3JvbGwnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIG9uUmVzaXplKHJlc2l6ZUhhbmRsZXIpIHt9XG4gIFxuICBvZmZSZXNpemUocmVzaXplSGFuZGxlcikge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoVGV4dGFyZWEsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIsIHNjcm9sbEhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFRleHRhcmVhLCBodG1sLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChUZXh0YXJlYSwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlciwgc2Nyb2xsSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIG9uU2Nyb2xsIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vXG4gICAgICAgICAgc2Nyb2xsSGFuZGxlciA9IG9uU2Nyb2xsOyAvLy9cbiAgICBcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFRleHRhcmVhLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBzY3JvbGxIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRleHRhcmVhLCB7XG4gIHRhZ05hbWU6ICd0ZXh0YXJlYScsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJyxcbiAgICAnb25TY3JvbGwnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCkge1xuICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHZhbHVlKTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVTY3JvbGxIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IHNjcm9sbFRvcCA9IHRoaXMuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgIHNjcm9sbExlZnQgPSB0aGlzLmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCb3VuZHMge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cblxuICBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90dG9tO1xuICB9XG5cbiAgZ2V0UmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMubGVmdCA8IG1vdXNlTGVmdCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKSAmJlxuICAgICAgICAgICAgICAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KSAmJlxuICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0LFxuICAgICAgICAgIGJvdHRvbSA9IGJvdW5kaW5nQ2xpZW50UmVjdC5ib3R0b20sXG4gICAgICAgICAgcmlnaHQgPSBib3VuZGluZ0NsaWVudFJlY3QucmlnaHQsXG4gICAgICAgICAgYm91bmRzID0gbmV3IEJvdW5kcyh0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgT2Zmc2V0IHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPZmZzZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uQ2xpY2soaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuICBcbiAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyKTsgXG59XG5cbmZ1bmN0aW9uIG9mZkNsaWNrKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7IH1cblxuY29uc3QgY2xpY2tNaXhpbiA9IHtcbiAgb25DbGljazogb25DbGljayxcbiAgb2ZmQ2xpY2s6IG9mZkNsaWNrXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsaWNrTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbihldmVudFR5cGVzLCBoYW5kbGVyKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICBjb25zdCBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5hZGRIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgICBpZiAoYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIGNvbnN0IHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgICBcbiAgICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihldmVudFR5cGUsIGhhbmRsZXIpIHtcbiAgbGV0IGFkZEV2ZW50TGlzdGVuZXIgPSBmYWxzZSxcbiAgICAgIGhhbmRsZXJzID0gdGhpcy5oYW5kbGVyc01hcFtldmVudFR5cGVdO1xuXG4gIGlmIChoYW5kbGVycyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlcnMgPSBbXTtcblxuICAgIHRoaXMuaGFuZGxlcnNNYXBbZXZlbnRUeXBlXSA9IGhhbmRsZXJzO1xuXG4gICAgYWRkRXZlbnRMaXN0ZW5lciA9IHRydWU7XG4gIH1cblxuICBoYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuXG4gIHJldHVybiBhZGRFdmVudExpc3RlbmVyO1xufVxuXG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICBsZXQgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZhbHNlLFxuICAgICAgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSAodGhpcy5oYW5kbGVyc01hcFtldmVudFR5cGVdKTtcblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGluZGV4ID0gaGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICBjb25zdCBkZWxldGVDb3VudCA9IDE7XG5cbiAgICAgIGhhbmRsZXJzLnNwbGljZShpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZW1vdmVFdmVudExpc3RlbmVyO1xufVxuXG5jb25zdCBldmVudE1peGluID0ge1xuICBvbjogb24sXG4gIG9mZjogb2ZmLFxuICBhZGRIYW5kbGVyOiBhZGRIYW5kbGVyLFxuICByZW1vdmVIYW5kbGVyOiByZW1vdmVIYW5kbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50TWl4aW47XG5cbmZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gZXZlbnQudHlwZSxcbiAgICAgICAgaGFuZGxlcnMgPSB0aGlzLmhhbmRsZXJzTWFwW2V2ZW50VHlwZV07XG5cbiAgbGV0IHByZXZlbnRFdmVudERlZmF1bHQgPSBmYWxzZTtcblxuICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KTtcbiAgICAgIFxuICAgICAgaWYgKHByZXZlbnREZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICAgIHByZXZlbnRFdmVudERlZmF1bHQgPSB0cnVlO1xuICAgICAgfSAgXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihldmVudCk7XG4gICAgICBcbiAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgICBwcmV2ZW50RXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBcbiAgaWYgKHByZXZlbnRFdmVudERlZmF1bHQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcywgYWRkaXRpb25hbFByb3BlcnRpZXMpIHtcbiAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG5cbiAgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BlcnRpZXMpOyAvLy9cbiAgXG4gIHVuYXNzaWduKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICBPYmplY3QuYXNzaWduKHByb3BlcnRpZXMsIGFkZGl0aW9uYWxQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGlmIChuYW1lID09PSAnY2hpbGRFbGVtZW50cycpIHtcbiAgICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBwcm9wZXJ0aWVzWydjaGlsZEVsZW1lbnRzJ107XG5cbiAgICAgIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoY2hpbGRFbGVtZW50KTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcblxuICAgICAgaWYgKGZhbHNlKSB7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgICBhZGRIYW5kbGVyKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBdHRyaWJ1dGVOYW1lKG5hbWUpKSB7XG4gICAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmNvbnN0IGpzeE1peGluID0ge1xuICBhcHBseVByb3BlcnRpZXM6IGFwcGx5UHJvcGVydGllc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBqc3hNaXhpbjtcblxuZnVuY3Rpb24gdW5hc3NpZ24ocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpIHtcbiAgaWYgKGlnbm9yZWRQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBpZ25vcmVkUHJvcGVydHlOYW1lcyA9IGlnbm9yZWRQcm9wZXJ0aWVzOyAvLy9cblxuICAgIGlnbm9yZWRQcm9wZXJ0eU5hbWVzLmZvckVhY2goZnVuY3Rpb24oaWdub3JlZFByb3BlcnR5TmFtZSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbaWdub3JlZFByb3BlcnR5TmFtZV07XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAvLy9cbiAgICAgICAgaGFuZGxlciA9IHZhbHVlOyAgLy8vXG5cbiAgZWxlbWVudC5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSB7XG4gICAgbmFtZSA9ICdjbGFzcyc7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgbmFtZSA9ICdmb3InO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSkge1xuICByZXR1cm4gYXR0cmlidXRlTmFtZXMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1xuICAnYWNjZXB0JywgJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXNzS2V5JywgJ2FjdGlvbicsICdhbGxvd0Z1bGxTY3JlZW4nLCAnYWxsb3dUcmFuc3BhcmVuY3knLCAnYWx0JywgJ2FzeW5jJywgJ2F1dG9Db21wbGV0ZScsICdhdXRvRm9jdXMnLCAnYXV0b1BsYXknLFxuICAnY2FwdHVyZScsICdjZWxsUGFkZGluZycsICdjZWxsU3BhY2luZycsICdjaGFsbGVuZ2UnLCAnY2hhclNldCcsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3NJRCcsICdjbGFzc05hbWUnLCAnY29sU3BhbicsICdjb2xzJywgJ2NvbnRlbnQnLCAnY29udGVudEVkaXRhYmxlJywgJ2NvbnRleHRNZW51JywgJ2NvbnRyb2xzJywgJ2Nvb3JkcycsICdjcm9zc09yaWdpbicsXG4gICdkYXRhJywgJ2RhdGVUaW1lJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsXG4gICdlbmNUeXBlJyxcbiAgJ2Zvcm0nLCAnZm9ybUFjdGlvbicsICdmb3JtRW5jVHlwZScsICdmb3JtTWV0aG9kJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2Zvcm1UYXJnZXQnLCAnZnJhbWVCb3JkZXInLFxuICAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmTGFuZycsICdodG1sRm9yJywgJ2h0dHBFcXVpdicsXG4gICdpY29uJywgJ2lkJywgJ2lucHV0TW9kZScsICdpbnRlZ3JpdHknLCAnaXMnLFxuICAna2V5UGFyYW1zJywgJ2tleVR5cGUnLCAna2luZCcsXG4gICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9vcCcsICdsb3cnLFxuICAnbWFuaWZlc3QnLCAnbWFyZ2luSGVpZ2h0JywgJ21hcmdpbldpZHRoJywgJ21heCcsICdtYXhMZW5ndGgnLCAnbWVkaWEnLCAnbWVkaWFHcm91cCcsICdtZXRob2QnLCAnbWluJywgJ21pbkxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsXG4gICduYW1lJywgJ25vVmFsaWRhdGUnLCAnbm9uY2UnLFxuICAnb3BlbicsICdvcHRpbXVtJyxcbiAgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHJvZmlsZScsXG4gICdyYWRpb0dyb3VwJywgJ3JlYWRPbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd1NwYW4nLCAncm93cycsXG4gICdzYW5kYm94JywgJ3Njb3BlJywgJ3Njb3BlZCcsICdzY3JvbGxpbmcnLCAnc2VhbWxlc3MnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NwZWxsQ2hlY2snLCAnc3JjJywgJ3NyY0RvYycsICdzcmNMYW5nJywgJ3NyY1NldCcsICdzdGFydCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLFxuICAndGFiSW5kZXgnLCAndGFyZ2V0JywgJ3RpdGxlJywgJ3R5cGUnLFxuICAndXNlTWFwJyxcbiAgJ3ZhbHVlJyxcbiAgJ3dpZHRoJyxcbiAgJ3dtb2RlJyxcbiAgJ3dyYXAnXG5dO1xuXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG4gIFxuICB0aGlzLm9uKCdtb3VzZXVwJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2Vkb3duJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3ZlcihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3V0KGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cblxuICB0aGlzLm9uKCdtb3VzZW91dCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ21vdXNlbW92ZScsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb2ZmTW91c2VVcChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VEb3duKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ21vdXNlZG93bicsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW92ZXInLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU91dChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlTW92ZShoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW1vdmUnLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBtb3VzZU1peGluID0ge1xuICBvbk1vdXNlVXA6IG9uTW91c2VVcCxcbiAgb25Nb3VzZURvd246IG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlOiBvbk1vdXNlTW92ZSxcbiAgb2ZmTW91c2VVcDogb2ZmTW91c2VVcCxcbiAgb2ZmTW91c2VEb3duOiBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3Zlcjogb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dDogb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZTogb2ZmTW91c2VNb3ZlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdXNlTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbik7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5hZGRIYW5kbGVyKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgaWYgKGFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBhcHBlbmRSZXNpemVPYmplY3QodGhpcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb2ZmUmVzaXplKGhhbmRsZXIpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZScsXG4gICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXIoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdCh0aGlzKTtcbiAgfVxufVxuXG5jb25zdCByZXNpemVNaXhpbiA9IHtcbiAgb25SZXNpemU6IG9uUmVzaXplLFxuICBvZmZSZXNpemU6IG9mZlJlc2l6ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemVNaXhpbjtcblxuZnVuY3Rpb24gYXBwZW5kUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHN0eWxlID0gYCBkaXNwbGF5OiBibG9jazsgXG4gICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICAgdG9wOiAwOyBcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IDA7IFxuICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47IFxuICAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICAgICAgICAgICAgei1pbmRleDogLTE7YDtcblxuICByZXNpemVPYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgcmVzaXplT2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICByZXNpemVPYmplY3QudHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyA9IHJlc2l6ZU9iamVjdDtcblxuICByZXNpemVPYmplY3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudClcbiAgfTtcblxuICBkb21FbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVMaXN0ZW5lcik7XG5cbiAgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZXNpemVPYmplY3RMb2FkSGFuZGxlcihlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgcmVzaXplT2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIHJlc2l6ZU9iamVjdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcihlbGVtZW50KSB7XG4gIGNvbnN0IHdpZHRoID0gZWxlbWVudC5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSBlbGVtZW50LmdldEhlaWdodCgpLFxuICAgICAgICBoYW5kbGVycyA9IGVsZW1lbnQuaGFuZGxlcnNNYXBbJ3Jlc2l6ZSddO1xuXG4gIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgaGFuZGxlcih3aWR0aCwgaGVpZ2h0KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKSxcbiAgICAgIFRleHRFbGVtZW50ID0gcmVxdWlyZSgnLi90ZXh0RWxlbWVudCcpO1xuXG5jbGFzcyBSZWFjdCB7XG4gIHN0YXRpYyBjcmVhdGVFbGVtZW50KGZpcnN0QXJndW1lbnQsIHByb3BlcnRpZXMsIC4uLmNoaWxkQXJndW1lbnRzKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBudWxsO1xuXG4gICAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tQ2hpbGRBcmd1bWVudHMoY2hpbGRBcmd1bWVudHMpO1xuXG4gICAgICBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgIGNoaWxkRWxlbWVudHM6IGNoaWxkRWxlbWVudHNcbiAgICAgIH0sIHByb3BlcnRpZXMpO1xuXG4gICAgICBpZiAoZmFsc2UpIHtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IGZpcnN0QXJndW1lbnQsICAvLy9cbiAgICAgICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfT48LyR7dGFnTmFtZX0+YDtcblxuICAgICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tSFRNTChodG1sKTtcblxuICAgICAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNUeXBlT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgICAgZWxlbWVudCA9IENsYXNzLmZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICAgICAgfSBlbHNlIGlmIChmaXJzdEFyZ3VtZW50LnByb3RvdHlwZS5yZW5kZXIpIHtcbiAgICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50LCAgLy8vXG4gICAgICAgICAgICAgIGluc3RhbmNlID0gbmV3IENsYXNzKHByb3BlcnRpZXMpO1xuXG4gICAgICAgIGVsZW1lbnQgPSBpbnN0YW5jZS5yZW5kZXIoKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50RnVuY3Rpb24ocHJvcGVydGllcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21DaGlsZEFyZ3VtZW50cyhjaGlsZEFyZ3VtZW50cykge1xuICBjaGlsZEFyZ3VtZW50cyA9IGNoaWxkQXJndW1lbnRzLnJlZHVjZShmdW5jdGlvbihjaGlsZEFyZ3VtZW50cywgY2hpbGRBcmd1bWVudCkge1xuICAgIGNoaWxkQXJndW1lbnRzID0gY2hpbGRBcmd1bWVudHMuY29uY2F0KGNoaWxkQXJndW1lbnQpO1xuXG4gICAgcmV0dXJuIGNoaWxkQXJndW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkQXJndW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEFyZ3VtZW50KSB7XG4gICAgbGV0IGNoaWxkRWxlbWVudDtcblxuICAgIGlmIChjaGlsZEFyZ3VtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgY2hpbGRFbGVtZW50ID0gY2hpbGRBcmd1bWVudDsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0ZXh0ID0gY2hpbGRBcmd1bWVudCwgLy8vXG4gICAgICAgICAgICB0ZXh0RWxlbWVudCA9IG5ldyBUZXh0RWxlbWVudCh0ZXh0KTtcblxuICAgICAgY2hpbGRFbGVtZW50ID0gdGV4dEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50ID09PSBDbGFzcykgeyAvLy9cbiAgICB0eXBlT2YgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGFyZ3VtZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3VtZW50KTsgLy8vXG5cbiAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgIHR5cGVPZiA9IGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVPZjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjL2JvdW5kcycpO1xuXG5jbGFzcyBUZXh0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBUZXh0RWxlbWVudC5jbG9uZSh0aGlzKTsgfVxuXG4gIGdldFRleHQoKSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGhpcy5kb21FbGVtZW50Lm5vZGVWYWx1ZSxcbiAgICAgICAgICB0ZXh0ID0gbm9kZVZhbHVlOyAvLy9cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGV4dDsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgICAgZmlyc3RTaWJsaW5nRE9NRWxlbWVudCA9IHBhcmVudERPTUVsZW1lbnQuZmlyc3RDaGlsZDsgLy8vXG5cbiAgICBwYXJlbnRET01FbGVtZW50Lmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIGZpcnN0U2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NRWxlbWVudC5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBudWxsKTsgLy8vXG4gIH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gcGFyZW50RWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NRWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmRvbUVsZW1lbnQpO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyk7XG5cbmNsYXNzIFdpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IHdpbmRvdztcblxuICAgIHRoaXMuaGFuZGxlcnNNYXAgPSB7fTtcbiAgfVxuICBcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJXaWR0aDsgfSAvLy9cbiAgXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5pbm5lckhlaWdodDsgfSAvLy9cbiAgXG4gIG9uUmVzaXplKGhhbmRsZXIpIHtcbiAgICBjb25zdCB0eXBlID0gJ3Jlc2l6ZScsXG4gICAgICAgICAgYWRkRXZlbnRMaXN0ZW5lciA9IHRoaXMuYWRkSGFuZGxlcih0eXBlLCBoYW5kbGVyKTtcblxuICAgIGlmIChhZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIG9mZlJlc2l6ZShoYW5kbGVyKSB7XG4gICAgY29uc3QgdHlwZSA9ICdyZXNpemUnLFxuICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSB0aGlzLnJlbW92ZUhhbmRsZXIodHlwZSwgaGFuZGxlcik7XG5cbiAgICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgY2xpY2tNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBXaW5kb3coKTsgIC8vL1xuXG5mdW5jdGlvbiBldmVudExpc3RlbmVyKGV2ZW50KSB7XG4gIGNvbnN0IHR5cGUgPSBldmVudC50eXBlLFxuICAgICAgICBoYW5kbGVycyA9IHRoaXMuaGFuZGxlcnNNYXBbdHlwZV0sXG4gICAgICAgIHdpZHRoID0gdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodCgpO1xuXG4gIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgIGhhbmRsZXIod2lkdGgsIGhlaWdodCk7XG4gIH0pO1xufVxuIl19
