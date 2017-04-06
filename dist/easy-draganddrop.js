(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.easydraganddrop = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = {
  options: require('./lib/options'),
  Explorer: require('./lib/explorer'),
  RubbishBin: require('./lib/rubbishBin')
};

},{"./lib/explorer":3,"./lib/options":14,"./lib/rubbishBin":15}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var util = require('./util'),
    options = require('./options');

var Element = easy.Element;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector) {
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.dropTargets = [];
    return _this;
  }

  _createClass(DropTarget, [{
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      this.dropTargets.push(dropTarget);
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var index = indexOf(this.dropTargets, dropTarget),
          found = index !== -1;

      if (found) {
        this.dropTargets.splice(index, 1);
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
    key: 'getDropTargetToBeMarked',
    value: function getDropTargetToBeMarked(draggableEntry) {
      var dropTargetToBeMarked = this.dropTargets.reduce(function (dropTargetToBeMarked, dropTarget) {
        if (dropTargetToBeMarked === null) {
          if (dropTarget.isToBeMarked(draggableEntry)) {
            ///
            dropTargetToBeMarked = dropTarget;
          }
        }

        return dropTargetToBeMarked;
      }, null);

      return dropTargetToBeMarked;
    }
  }, {
    key: 'getMarkedDropTarget',
    value: function getMarkedDropTarget() {
      var markedDropTarget = this.dropTargets.reduce(function (markedDropTarget, dropTarget) {
        if (markedDropTarget === null) {
          var dropTargetMarked = dropTarget.isMarked();

          if (dropTargetMarked) {
            markedDropTarget = dropTarget;
          }
        }

        return markedDropTarget;
      }, null);

      return markedDropTarget;
    }
  }, {
    key: 'removeMarkerGlobally',
    value: function removeMarkerGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarker();
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.removeMarker();
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

  return DropTarget;
}(Element);

module.exports = DropTarget;

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

},{"./options":14,"./util":16,"easy":17}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var util = require('./util'),
    options = require('./options'),
    DropTarget = require('./dropTarget'),
    DirectoryMarker = require('./explorer/entry/marker/directory'),
    RootDirectory = require('./explorer/draggableEntry/directory/root');

var Element = easy.Element,
    React = easy.React;

var Explorer = function (_DropTarget) {
  _inherits(Explorer, _DropTarget);

  function Explorer(selector, moveHandler) {
    var openHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (sourcePath) {};
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Explorer);

    var _this = _possibleConstructorReturn(this, (Explorer.__proto__ || Object.getPrototypeOf(Explorer)).call(this, selector, moveHandler));

    _this.openHandler = openHandler;

    _this.options = options;
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
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var rootDirectoryMarked = this.isRootDirectoryMarked();

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
    key: 'addMarker',
    value: function addMarker(draggableEntry, directoryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryOverlappingDraggableEntry.getPath(),
          markerPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.addRootDirectoryMarker(markerPath, draggableEntryType);
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

        this.addRootDirectoryMarker(markerPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryMarker = React.createElement(DirectoryMarker, { name: name });

      this.append(topmostDirectoryMarker);
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
    key: 'removeMarker',
    value: function removeMarker() {
      var rootDirectoryMarked = this.isRootDirectoryMarked();

      if (rootDirectoryMarked) {
        this.removeRootDirectoryMarker();
      } else {
        var topmostDirectoryMarker = this.retrieveTopmostDirectoryMarker();

        topmostDirectoryMarker.remove();
      }
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
          markedDropTarget = marked ? this : this.getMarkedDropTarget(),
          markedDirectory = markedDropTarget.getMarkedDirectory(),
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

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.removeMarker();

          done();
        });
      }
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
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerInPlace(draggableEntry);
          }

          this.removeMarker();
        }
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerGlobally();
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
    key: 'openFile',
    value: function openFile(file) {
      var rootDirectory = this.getRootDirectory(),
          filePath = file.getPath(rootDirectory);

      this.openHandler(filePath);
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
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          name = rootDirectoryName,
          explorer = this,
          rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer });


      return rootDirectory;
    }
  }, {
    key: 'applyProperties',
    value: function applyProperties() {
      _get(Explorer.prototype.__proto__ || Object.getPrototypeOf(Explorer.prototype), 'applyProperties', this).apply(this, arguments);

      this.assignContext();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onMove = properties.onMove,
          onOpen = properties.onOpen,
          options = properties.options,
          moveHandler = onMove,
          openHandler = onOpen; ///

      return Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);
    }
  }]);

  return Explorer;
}(DropTarget);

Object.assign(Explorer, {
  tagName: 'ul',
  defaultProperties: {
    className: 'explorer'
  },
  ignoredProperties: ['rootDirectoryName', 'onOpen', 'onMove', 'options']
});

module.exports = Explorer;

},{"./dropTarget":2,"./explorer/draggableEntry/directory/root":6,"./explorer/entry/marker/directory":11,"./options":14,"./util":16,"easy":17}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    NameButton = require('./nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    Element = easy.Element,
    React = easy.React;

var DraggableEntry = function (_Element) {
  _inherits(DraggableEntry, _Element);

  function DraggableEntry(selector, name, explorer, type) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector));

    var nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.explorer = explorer;

    _this.type = type;

    _this.timeout = null;
    _this.topOffset = null;
    _this.leftOffset = null;

    _this.nameButton = nameButton;

    _this.boundMouseUpHandler = _this.mouseUpHandler.bind(_this);
    _this.boundMouseDownHandler = _this.mouseDownHandler.bind(_this);
    _this.boundMouseMoveHandler = _this.mouseMoveHandler.bind(_this);

    _this.onMouseDown(_this.boundMouseDownHandler);

    _this.append(nameButton);
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
          bounds = this.getBounds(),
          boundsTop = bounds.getTop(),
          boundsLeft = bounds.getLeft();

      this.topOffset = boundsTop - mouseTop;
      this.leftOffset = boundsLeft - mouseLeft;

      if (escapeKeyStopsDragging) {
        this.on('keydown', this.keyDownHandler.bind(this));
      }

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDragging = this.explorer.hasOption(options.ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDragging) {
        this.off('keydown');
      }

      this.removeClass('dragging');
    }
  }, {
    key: 'dragging',
    value: function dragging(mouseTop, mouseLeft) {
      this.drag(mouseTop, mouseLeft);

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
      window.on('mouseup blur', this.boundMouseUpHandler);

      window.onMouseMove(this.boundMouseMoveHandler);

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
      window.off('mouseup blur', this.boundMouseUpHandler);

      window.offMouseMove(this.boundMouseMoveHandler);

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
  }, {
    key: 'drag',
    value: function drag(mouseTop, mouseLeft) {
      var windowScrollTop = window.getScrollTop(),
          windowScrollLeft = window.getScrollLeft();

      var top = mouseTop + this.topOffset - windowScrollTop,
          left = mouseLeft + this.leftOffset - windowScrollLeft;

      top = top + 'px'; ///
      left = left + 'px'; ///

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
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

},{"../options":14,"./nameButton":13,"easy":17}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var util = require('../../util'),
    Entry = require('../entry'),
    Entries = require('../entries'),
    DraggableEntry = require('../draggableEntry');

var Button = easy.Button,
    React = easy.React;

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name, explorer) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var toggleButton = React.createElement(Button, { className: 'toggle', onClick: _this.toggleButtonClickHandler.bind(_this) }),
        entries = React.createElement(Entries, { Directory: Directory });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.entries = entries;

    _this.append(entries);

    _this.prepend(toggleButton);
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

          this.entries.addDirectory(directoryName, explorer, collapsed);
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

            this.entries.addDirectory(topmostDirectoryName, explorer, collapsed);
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
    key: 'toggleButtonClickHandler',
    value: function toggleButtonClickHandler() {
      this.toggle();
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      this.toggle();
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      this.addClass('collapsed');
    }
  }, {
    key: 'expand',
    value: function expand() {
      this.removeClass('collapsed');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.toggleClass('collapsed');
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
          explorer = _properties.explorer;


      return DraggableEntry.fromProperties(Class, properties, name, explorer);
    }
  }]);

  return Directory;
}(DraggableEntry);

Object.assign(Directory, {
  defaultProperties: {
    className: 'directory'
  },
  ignoredProperties: ['name', 'explorer']
});

module.exports = Directory;

},{"../../util":16,"../draggableEntry":4,"../entries":8,"../entry":9,"easy":17}],6:[function(require,module,exports){
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
    key: 'addMarker',
    value: function addMarker(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        addFile: this.addFile.bind(this),
        addDirectory: this.addDirectory.bind(this),
        removeFile: this.removeFile.bind(this),
        removeDirectory: this.removeDirectory.bind(this),
        getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
        getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
        getMarkedDirectory: this.getMarkedDirectory.bind(this),
        getFilePaths: this.getFilePaths.bind(this),
        addRootDirectoryMarker: this.addMarker.bind(this), ///
        removeRootDirectoryMarker: this.removeMarker.bind(this), ///
        isRootDirectoryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        getRootDirectory: function getRootDirectory() {
          return this;
        }
      };
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

},{"../../../options":14,"../../../util":16,"../directory":5}],7:[function(require,module,exports){
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
  defaultProperties: {
    className: 'file'
  },
  ignoredProperties: ['name', 'explorer']
});

module.exports = File;

},{"../draggableEntry":4,"../entry":9}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    Entry = require('./entry'),
    File = require('./draggableEntry/file'),
    FileMarker = require('./entry/marker/file'),
    DirectoryMarker = require('./entry/marker/directory');

var Element = easy.Element,
    React = easy.React;

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
      var name = fileName,
          file = React.createElement(File, { name: name, explorer: explorer }),
          entry = file; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryName, explorer, collapsed) {
      var name = directoryName,
          className = 'directory ' + (collapsed ? 'collapsed' : ''),
          ///
      directory = React.createElement(this.Directory, { name: name, explorer: explorer, className: className }),
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
          marker = React.createElement(FileMarker, { name: name });
          break;

        case Entry.types.DIRECTORY:
          marker = React.createElement(DirectoryMarker, { name: name });
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
  defaultProperties: {
    className: 'entries'
  },
  ignoredProperties: ['Directory']
});

module.exports = Entries;

},{"../options":14,"./draggableEntry/file":7,"./entry":9,"./entry/marker/directory":11,"./entry/marker/file":12,"easy":17}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var NameButton = require('./nameButton');

var Element = easy.Element,
    React = easy.React;

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, name, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    var nameButton = React.createElement(
      NameButton,
      null,
      name
    );

    _this.type = type;

    _this.nameButton = nameButton;

    _this.append(nameButton);
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
  }], [{
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
  ignoredProperties: ['name'],
  types: {
    FILE: 'FILE',
    MARKER: 'MARKER',
    DIRECTORY: 'DIRECTORY'
  }
});

module.exports = Entry;

},{"./nameButton":13,"easy":17}],10:[function(require,module,exports){
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

Object.assign(Marker, {
  defaultProperties: {
    className: 'marker'
  }
});

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

var easy = require('easy');

var InputElement = easy.InputElement;

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
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: ['name', 'onDoubleClick']
});

module.exports = NameButton;

function first(array) {
  return array[0];
}

},{"easy":17}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var DropTarget = require('./dropTarget');

var Element = easy.Element;

var RubbishBin = function (_DropTarget) {
  _inherits(RubbishBin, _DropTarget);

  function RubbishBin(selector) {
    var removeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, RubbishBin);

    var dropTargetMoveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, dropTargetMoveHandler));

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
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            var directoryOverlappingDraggableEntry = dropTargetToBeMarked.getDirectoryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarker(draggableEntry, directoryOverlappingDraggableEntry);
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
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove; ///

      return Element.fromProperties(RubbishBin, properties, removeHandler);
    }
  }]);

  return RubbishBin;
}(DropTarget);

Object.assign(RubbishBin, {
  tagName: 'div',
  defaultProperties: {
    className: 'rubbishBin'
  },
  ignoredProperties: ['onRemove']
});

module.exports = RubbishBin;

},{"./dropTarget":2,"easy":17}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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
  Bounds: require('./lib/misc/bounds'),
  Offset: require('./lib/misc/offset'),
  React: require('./lib/react')
};

},{"./lib/document":18,"./lib/element":19,"./lib/element/body":20,"./lib/element/button":21,"./lib/element/checkbox":22,"./lib/element/div":23,"./lib/element/link":24,"./lib/element/select":25,"./lib/element/span":26,"./lib/inputElement":27,"./lib/inputElement/input":28,"./lib/inputElement/textarea":29,"./lib/misc/bounds":30,"./lib/misc/offset":31,"./lib/react":39,"./lib/textElement":40,"./lib/window":41}],18:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse'),
    keyMixin = require('./mixin/key');

var Document = function Document() {
  _classCallCheck(this, Document);

  this.domElement = document;
};

Object.assign(Document.prototype, eventMixin);
Object.assign(Document.prototype, clickMixin);
Object.assign(Document.prototype, mouseMixin);
Object.assign(Document.prototype, keyMixin);

module.exports = new Document(); ///

},{"./mixin/click":32,"./mixin/event":33,"./mixin/key":35,"./mixin/mouse":36}],19:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Offset = require('./misc/offset'),
    Bounds = require('./misc/bounds'),
    jsxMixin = require('./mixin/jsx'),
    eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    scrollMixin = require('./mixin/scroll'),
    resizeMixin = require('./mixin/resize'),
    mouseMixin = require('./mixin/mouse'),
    keyMixin = require('./mixin/key');

var Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.domElement = domElementFromSelector(selector);

    this.domElement.__element__ = this; ///
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
      this.domElement.style.width = width;
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
      this.domElement.style.height = height;
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
    key: 'prependTo',
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: 'removeFrom',
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
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
        var innerHTML = this.domElement.innerHTML;

        _html = innerHTML; ///

        return _html;
      } else {
        var _innerHTML = _html; ///

        this.domElement.innerHTML = _innerHTML;
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
    key: 'blur',
    value: function blur() {
      this.domElement.blur();
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.domElement.focus();
    }
  }, {
    key: 'hasFocus',
    value: function hasFocus() {
      var focus = document.activeElement === this.domElement; ///

      return focus;
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
  }, {
    key: 'getPreviousSiblingElement',
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
    key: 'getNextSiblingElement',
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
    key: 'clone',
    value: function clone(Class, element) {
      var deep = true,
          domElement = element.domElement.cloneNode(deep);

      for (var _len = arguments.length, remainingArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        remainingArguments[_key - 2] = arguments[_key];
      }

      remainingArguments.unshift(domElement);
      remainingArguments.unshift(null);

      return new (Function.prototype.bind.apply(Class, remainingArguments))();
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(Class, html) {
      var outerDOMElement = document.createElement('div');

      outerDOMElement.innerHTML = html; ///

      var domElement = outerDOMElement.firstChild;

      for (var _len2 = arguments.length, remainingArguments = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        remainingArguments[_key2 - 2] = arguments[_key2];
      }

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
          html = '<' + tagName + ' />',
          element = Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments));

      var defaultProperties = Class.defaultProperties,
          ignoredProperties = Class.ignoredProperties;

      element.applyProperties(properties, defaultProperties, ignoredProperties);

      return element;
    }
  }]);

  return Element;
}();

Object.assign(Element.prototype, jsxMixin);
Object.assign(Element.prototype, eventMixin);
Object.assign(Element.prototype, clickMixin);
Object.assign(Element.prototype, scrollMixin);
Object.assign(Element.prototype, resizeMixin);
Object.assign(Element.prototype, mouseMixin);
Object.assign(Element.prototype, keyMixin);

Object.assign(Element, {
  LEFT_MOUSE_BUTTON: 0,
  MIDDLE_MOUSE_BUTTON: 1,
  RIGHT_MOUSE_BUTTON: 2
});

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

},{"./misc/bounds":30,"./misc/offset":31,"./mixin/click":32,"./mixin/event":33,"./mixin/jsx":34,"./mixin/key":35,"./mixin/mouse":36,"./mixin/resize":37,"./mixin/scroll":38}],20:[function(require,module,exports){
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

},{"../element":19}],21:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Button = function (_Element) {
  _inherits(Button, _Element);

  function Button(selector, clickHandler) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, selector));

    if (clickHandler !== undefined) {
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
    value: function onClick(clickHandler) {
      var intermediateClickHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateClickHandler;

      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'onClick', this).call(this, clickHandler, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler) {
      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'offClick', this).call(this, clickHandler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return Element.clone(Button, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Button, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Button, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick; ///

      return Element.fromProperties(Button, properties, clickHandler);
    }
  }]);

  return Button;
}(Element);

Object.assign(Button, {
  tagName: 'button',
  ignoredProperties: ['onClick']
});

module.exports = Button;

function defaultIntermediateClickHandler(clickHandler, event, targetElement) {
  var mouseButton = event.button,
      preventDefault = clickHandler(mouseButton, targetElement);

  return preventDefault;
}

},{"../element":19}],22:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Checkbox = function (_Element) {
  _inherits(Checkbox, _Element);

  function Checkbox(selector, changeHandler, checked) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }

    if (checked !== undefined) {
      _this.check(checked);
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
    value: function onChange(changeHandler) {
      var intermediateChangeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateChangeHandler;

      this.on('click', changeHandler, intermediateChangeHandler); ///
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      this.off('click', changeHandler); ///
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
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return Element.clone(Checkbox, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Checkbox, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Checkbox, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          checked = properties.checked,
          changeHandler = onChange; ///    

      return Element.fromProperties(Checkbox, properties, changeHandler, checked);
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

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  var checkbox = targetElement,
      ///
  checked = checkbox.isChecked(),
      preventDefault = changeHandler(checked, targetElement);

  return preventDefault;
}

},{"../element":19}],23:[function(require,module,exports){
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

},{"../element":19}],24:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Link = function (_Element) {
  _inherits(Link, _Element);

  function Link(selector, clickHandler) {
    _classCallCheck(this, Link);

    var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, selector));

    if (clickHandler !== undefined) {
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
    value: function onClick(clickHandler) {
      var intermediateClickHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateClickHandler;

      this.on('click', clickHandler, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler) {
      this.off('click', clickHandler);
    }
  }], [{
    key: 'clone',
    value: function clone(element, clickHandler) {
      return Element.clone(Link, element, clickHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, clickHandler) {
      return Element.fromHTML(Link, html, clickHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, clickHandler) {
      return Element.fromDOMElement(Link, domElement, clickHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onClick = properties.onClick,
          clickHandler = onClick; ///    

      return Element.fromProperties(Link, properties, clickHandler);
    }
  }]);

  return Link;
}(Element);

Object.assign(Link, {
  tagName: 'a',
  ignoredProperties: ['onClick']
});

module.exports = Link;

function defaultIntermediateClickHandler(clickHandler, event, targetElement) {
  var link = targetElement,
      ///
  href = link.getAttribute('href'),
      preventDefault = clickHandler(href, targetElement);

  return preventDefault;
}

},{"../element":19}],25:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Select = function (_Element) {
  _inherits(Select, _Element);

  function Select(selector, changeHandler) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, selector));

    if (changeHandler !== undefined) {
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
    key: 'onChange',
    value: function onChange(changeHandler) {
      var intermediateChangeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateChangeHandler;

      this.on('change', changeHandler, intermediateChangeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      this.off('change', changeHandler);
    }
  }, {
    key: 'getSelectedOptionValue',
    value: function getSelectedOptionValue() {
      var selectedOptionValue = this.domElement.value; ///

      return selectedOptionValue;
    }
  }, {
    key: 'setSelectedOptionByValue',
    value: function setSelectedOptionByValue(selectedOptionValue) {
      var value = selectedOptionValue; ///

      this.domElement.value = value;
    }
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return Element.clone(Select, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return Element.fromHTML(Select, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return Element.fromDOMElement(Select, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///    

      return Element.fromProperties(Select, properties, changeHandler);
    }
  }]);

  return Select;
}(Element);

Object.assign(Select, {
  tagName: 'select',
  ignoredProperties: ['onChange']
});

module.exports = Select;

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  var select = targetElement,
      ///
  selectedOptionValue = select.getSelectedOptionValue(),
      preventDefault = changeHandler(selectedOptionValue, targetElement);

  return preventDefault;
}

},{"../element":19}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('../element');

var Span = function (_Element) {
  _inherits(Span, _Element);

  function Span() {
    _classCallCheck(this, Span);

    return _possibleConstructorReturn(this, (Span.__proto__ || Object.getPrototypeOf(Span)).apply(this, arguments));
  }

  _createClass(Span, [{
    key: 'clone',
    value: function clone() {
      return Span.clone(this);
    }
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
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

},{"../element":19}],27:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Element = require('./element');

var InputElement = function (_Element) {
  _inherits(InputElement, _Element);

  function InputElement(selector, changeHandler) {
    _classCallCheck(this, InputElement);

    var _this = _possibleConstructorReturn(this, (InputElement.__proto__ || Object.getPrototypeOf(InputElement)).call(this, selector));

    if (changeHandler !== undefined) {
      _this.onChange(changeHandler);
    }
    return _this;
  }

  _createClass(InputElement, [{
    key: 'onChange',
    value: function onChange(changeHandler) {
      var intermediateChangeHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateChangeHandler;

      this.on('change', changeHandler, intermediateChangeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler) {
      this.off('change', changeHandler);
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
    key: 'select',
    value: function select() {
      this.domElement.select();
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
      var onChange = properties.onChange,
          changeHandler = onChange; ///

      for (var _len4 = arguments.length, remainingArguments = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
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

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  var inputElement = targetElement,
      ///
  value = inputElement.getValue(),
      preventDefault = changeHandler(value, targetElement);

  return preventDefault;
}

},{"./element":19}],28:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Input = function (_InputElement) {
  _inherits(Input, _InputElement);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Input.clone(this, changeHandler);
    }
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
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
      return InputElement.fromProperties(Input, properties);
    }
  }]);

  return Input;
}(InputElement);

Object.assign(Input, {
  tagName: 'input'
});

module.exports = Input;

},{"../inputElement":27}],29:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InputElement = require('../inputElement');

var Textarea = function (_InputElement) {
  _inherits(Textarea, _InputElement);

  function Textarea() {
    _classCallCheck(this, Textarea);

    return _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).apply(this, arguments));
  }

  _createClass(Textarea, [{
    key: 'clone',
    value: function clone(changeHandler) {
      return Textarea.clone(this, changeHandler);
    }
  }, {
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
  }], [{
    key: 'clone',
    value: function clone(element, changeHandler) {
      return InputElement.clone(Textarea, element, changeHandler);
    }
  }, {
    key: 'fromHTML',
    value: function fromHTML(html, changeHandler) {
      return InputElement.fromHTML(Textarea, html, changeHandler);
    }
  }, {
    key: 'fromDOMElement',
    value: function fromDOMElement(domElement, changeHandler) {
      return InputElement.fromDOMElement(Textarea, domElement, changeHandler);
    }
  }, {
    key: 'fromProperties',
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

},{"../inputElement":27}],30:[function(require,module,exports){
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
  }]);

  return Bounds;
}();

module.exports = Bounds;

},{}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
'use strict';

function onClick(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('click', handler, intermediateHandler);
}

function offClick(handler) {
  this.off('click', handler);
}

var clickMixin = {
  onClick: onClick,
  offClick: offClick
};

module.exports = clickMixin;

function defaultIntermediateHandler(handler, event, targetElement) {
  var mouseTop = event.pageY,
      ///
  mouseLeft = event.pageX,
      ///
  mouseButton = event.button,
      ///
  preventDefault = handler(mouseTop, mouseLeft, mouseButton, targetElement);

  return preventDefault;
}

},{}],33:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function on(eventTypes, handler, intermediateHandler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    onEvent(this, eventType, handler, intermediateHandler);
  }.bind(this));
}

function off(eventTypes, handler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    offEvent(this, eventType, handler);
  }.bind(this));
}

var eventMixin = {
  on: on,
  off: off
};

module.exports = eventMixin;

function onEvent(element, eventType, handler, intermediateHandler) {
  if (!element.hasOwnProperty('eventObjectMap')) {
    var eventObjectMap = {};

    Object.assign(element, {
      eventObjectMap: eventObjectMap
    });
  }

  var eventObject = element.eventObjectMap[eventType];

  if (!eventObject) {
    eventObject = createEventObject();

    element.eventObjectMap[eventType] = eventObject;
  }

  eventObject.addHandler(element, eventType, handler, intermediateHandler);
}

function offEvent(element, eventType, handler) {
  var eventObject = element.eventObjectMap[eventType],
      noneRemaining = eventObject.removeHandler(element, eventType, handler);

  if (noneRemaining) {
    delete element.eventObjectMap[eventType];
  }

  var eventTypes = Object.keys(element.eventObjectMap);

  if (eventTypes.length === 0) {
    delete element.eventObjectMap;
  }
}

function createEventObject() {
  var eventListeners = [];

  function addHandler(element, eventType, handler, intermediateHandler) {
    var targetElement = element,
        ///
    eventListener = createEventListener(handler, intermediateHandler, targetElement);

    element.domElement.addEventListener(eventType, eventListener);

    eventListeners.push(eventListener);
  }

  function removeHandler(element, eventType) {
    var handler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (handler === null) {
      eventListeners.forEach(function (eventListener) {
        element.domElement.removeEventListener(eventType, eventListener);
      });

      var start = 0;

      eventListeners.splice(start);
    } else {
      var index = indexOfEventListener(eventListeners, handler),
          eventListener = eventListeners[index];

      element.domElement.removeEventListener(eventType, eventListener);

      var _start = index,
          ///
      deleteCount = 1;

      eventListeners.splice(_start, deleteCount);
    }

    var noneRemaining = eventListeners.length === 0; ///

    return noneRemaining;
  }

  return {
    addHandler: addHandler,
    removeHandler: removeHandler
  };
}

function createEventListener(handler, intermediateHandler, targetElement) {
  if ((typeof intermediateHandler === 'undefined' ? 'undefined' : _typeof(intermediateHandler)) === 'object') {
    var object = intermediateHandler; ///

    intermediateHandler = createBindingIntermediateHandler(object); ///
  }

  var eventListener = function eventListener(event) {
    var preventDefault = intermediateHandler !== undefined ? intermediateHandler(handler, event, targetElement) : handler(event, targetElement);

    if (preventDefault === true) {
      event.preventDefault();
    }

    event.stopPropagation();
  };

  Object.assign(eventListener, {
    handler: handler
  });

  return eventListener;
}

function createBindingIntermediateHandler(object) {
  var bindingIntermediateHandler = function bindingIntermediateHandler(handler, event, targetElement) {
    var preventDefault = handler.call(object, event, targetElement);

    return preventDefault;
  };

  return bindingIntermediateHandler;
}

function indexOfEventListener(eventListeners, handler) {
  var foundIndex = undefined; ///

  eventListeners.forEach(function (eventListener, index) {
    if (eventListener.handler === handler) {
      ///
      foundIndex = index;
    }
  });

  var index = foundIndex; ///

  return index;
}

},{}],34:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TextElement = require('../textElement');

function appendTo(parentElement) {
  var parentContext = this.parentContext ? this.parentContext() : this.context;

  if (parentContext !== undefined) {
    if (!parentElement.hasOwnProperty('context')) {
      var context = {};

      Object.assign(parentElement, {
        context: context
      });
    }

    parentElement.context = Object.assign(parentElement.context, parentContext);
  }

  parentElement.append(this);
}

function removeFrom(parentElement) {
  parentElement.remove(this);
}

function assignContext() {
  var names = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Object.keys(this.context);
  var thenDelete = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  names.forEach(function (name) {
    var value = this.context[name],
        descriptor = {
      value: value
    };

    Object.defineProperty(this, name, descriptor);

    if (thenDelete) {
      delete this.context[name];
    }
  }.bind(this));
}

function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  assign(properties, defaultProperties);

  var childElements = childElementsFromElementAndProperties(this, properties);

  unassign(properties, ignoredProperties);

  var names = Object.keys(properties);

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {} else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      if (!this.hasOwnProperty('properties')) {
        var _properties = {};

        Object.assign(this, {
          properties: _properties
        });
      }

      this.properties[name] = value;
    }
  }.bind(this));

  var parentElement = this; ///

  childElements.forEach(function (childElement) {
    childElement.appendTo(parentElement);
  }.bind(this));
}

function getProperties() {
  return this.properties;
}

function getContext() {
  return this.context;
}

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

var jsxMixin = {
  appendTo: appendTo,
  removeFrom: removeFrom,
  assignContext: assignContext,
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  getState: getState,
  setState: setState
};

module.exports = jsxMixin;

function childElementsFromElementAndProperties(element, properties) {
  var childElements = element.childElements ? element.childElements(properties) : properties.childElements;

  childElements = childElements !== undefined ? childElements instanceof Array ? childElements : [childElements] : [];

  childElements = childElements.map(function (childElement) {
    if (typeof childElement === 'string') {
      var text = childElement,
          ///
      textElement = new TextElement(text);

      childElement = textElement; ///
    }

    return childElement;
  });

  return childElements;
}

function unassign(properties) {
  var ignoredProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var ignoredPropertyNames = ignoredProperties; ///

  ignoredPropertyNames.forEach(function (ignoredPropertyName) {
    if (properties.hasOwnProperty(ignoredPropertyName)) {
      delete properties[ignoredPropertyName];
    }
  });
}

function assign(properties) {
  var defaultProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaultPropertyNames = Object.keys(defaultProperties);

  defaultPropertyNames.forEach(function (defaultPropertyName) {
    if (!properties.hasOwnProperty(defaultPropertyName)) {
      var defaultPropertyValue = defaultProperties[defaultPropertyName];

      properties[defaultPropertyName] = defaultPropertyValue;
    }
  });
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

},{"../textElement":40}],35:[function(require,module,exports){
'use strict';

function onKeyUp(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('keyup', handler, intermediateHandler);
}

function onKeyDown(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('keydown', handler, intermediateHandler);
}

function offKeyUp(handler) {
  this.off('keyup', handler);
}

function offKeyDown(handler) {
  this.off('keydown', handler);
}

var keyMixin = {
  onKeyUp: onKeyUp,
  onKeyDown: onKeyDown,
  offKeyUp: offKeyUp,
  offKeyDown: offKeyDown
};

module.exports = keyMixin;

function defaultIntermediateHandler(handler, event, targetElement) {
  var keyCode = event.keyCode,
      preventDefault = handler(keyCode, targetElement);

  return preventDefault;
}

},{}],36:[function(require,module,exports){
'use strict';

function onMouseUp(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('mouseup', handler, intermediateHandler);
}

function onMouseDown(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('mousedown', handler, intermediateHandler);
}

function onMouseOver(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('mouseover', handler, intermediateHandler);
}

function onMouseOut(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('mouseout', handler, intermediateHandler);
}

function onMouseMove(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('mousemove', handler, intermediateHandler);
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

function defaultIntermediateHandler(handler, event, targetElement) {
  var mouseTop = event.pageY,
      ///
  mouseLeft = event.pageX,
      ///
  mouseButton = event.button,
      ///
  preventDefault = handler(mouseTop, mouseLeft, mouseButton, targetElement);

  return preventDefault;
}

},{}],37:[function(require,module,exports){
'use strict';

function onResize(handler) {
  var eventType = 'resize',
      addEventListener = this.on(eventType, handler);

  if (addEventListener) {
    appendResizeObject(this);
  }
}

function offResize(handler) {
  var eventType = 'resize',
      removeEventListener = this.off(eventType, handler);

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
      style = 'display: block; \n                 position: absolute; \n                 top: 0; \n                 left: 0; \n                 height: 100%; \n                 width: 100%; \n                 overflow: hidden; \n                 pointer-events: none; \n                 z-index: -1;';

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
      targetElement = element,
      ///
  handlers = element.handlersMap['resize'];

  handlers.forEach(function (handler) {
    handler(width, height, targetElement);
  });
}

},{}],38:[function(require,module,exports){
'use strict';

function onScroll(handler) {
  var intermediateHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultIntermediateHandler;

  this.on('scroll', handler, intermediateHandler);
}

function offScroll(handler) {
  this.off('scroll', handler);
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

var scrollMixin = {
  onScroll: onScroll,
  offScroll: offScroll,
  getScrollTop: getScrollTop,
  getScrollLeft: getScrollLeft,
  setScrollTop: setScrollTop,
  setScrollLeft: setScrollLeft
};

module.exports = scrollMixin;

function defaultIntermediateHandler(handler, event, targetElement) {
  var scrollTop = targetElement.getScrollTop(),
      scrollLeft = targetElement.getScrollLeft(),
      preventDefault = handler(scrollTop, scrollLeft, targetElement);

  return preventDefault;
}

},{}],39:[function(require,module,exports){
'use strict';

var Element = require('./element'),
    TextElement = require('./textElement');

function createElement(firstArgument, properties) {
  var element = null;

  if (firstArgument !== undefined) {
    for (var _len = arguments.length, childArguments = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      childArguments[_key - 2] = arguments[_key];
    }

    var childElements = childElementsFromChildArguments(childArguments);

    properties = Object.assign({
      childElements: childElements
    }, properties);

    if (false) {} else if (isTypeOf(firstArgument, Element)) {
      var Class = firstArgument; ///

      element = Class.fromProperties(properties);
    } else if (typeof firstArgument === 'function') {
      var elementFunction = firstArgument; ///

      element = elementFunction(properties);
    } else if (typeof firstArgument === 'string') {
      var tagName = firstArgument,
          ///
      html = '<' + tagName + ' />';

      element = Element.fromHTML(Element, html);

      element.applyProperties(properties);
    }
  }

  return element;
}

var React = {
  createElement: createElement
};

module.exports = React;

function childElementsFromChildArguments(childArguments) {
  childArguments = childArguments.reduce(function (childArguments, childArgument) {
    childArguments = childArguments.concat(childArgument);

    return childArguments;
  }, []);

  var childElements = childArguments.map(function (childArgument) {
    var childElement = void 0;

    if (typeof childArgument === 'string') {
      var text = childArgument,
          ///
      textElement = new TextElement(text);

      childElement = textElement;
    } else {
      childElement = childArgument; ///
    }

    return childElement;
  });

  return childElements;
}

function isTypeOf(argument, Class) {
  var typeOf = false;

  if (argument.name === Class.name) {
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

},{"./element":19,"./textElement":40}],40:[function(require,module,exports){
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
    key: 'prependTo',
    value: function prependTo(parentElement) {
      parentElement.prepend(this);
    }
  }, {
    key: 'appendTo',
    value: function appendTo(parentElement) {
      parentElement.append(this);
    }
  }, {
    key: 'removeFrom',
    value: function removeFrom(parentElement) {
      parentElement.remove(this);
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
    key: 'remove',
    value: function remove() {
      this.domElement.remove();
    }
  }]);

  return TextElement;
}();

module.exports = TextElement;

},{"./misc/bounds":30,"./misc/offset":31}],41:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse'),
    keyMixin = require('./mixin/key');

var Window = function () {
  function Window() {
    _classCallCheck(this, Window);

    this.domElement = window;
  }

  _createClass(Window, [{
    key: 'assign',
    value: function assign() {
      var target = this.domElement; ///

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      Object.assign.apply(Object, [target].concat(sources));
    }
  }, {
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
    key: 'getScrollTop',
    value: function getScrollTop() {
      return this.domElement.pageYOffset;
    } ///

  }, {
    key: 'getScrollLeft',
    value: function getScrollLeft() {
      return this.domElement.pageXOffset;
    } ///

  }, {
    key: 'onResize',
    value: function onResize(handler) {
      if (handler.intermediateHandler === undefined) {
        handler.intermediateHandler = defaultIntermediateResizeHandler;
      }

      var eventType = 'resize';

      this.on(eventType, handler);
    }
  }, {
    key: 'offResize',
    value: function offResize(handler) {
      var eventType = 'resize';

      this.off(eventType, handler);
    }
  }]);

  return Window;
}();

Object.assign(Window.prototype, eventMixin);
Object.assign(Window.prototype, clickMixin);
Object.assign(Window.prototype, mouseMixin);
Object.assign(Window.prototype, keyMixin);

module.exports = new Window(); ///

function defaultIntermediateResizeHandler(handler, event, targetElement) {
  var window = targetElement,
      ///
  width = window.getWidth(),
      height = targetElement.getHeight(),
      preventDefault = handler(width, height, targetElement);

  return preventDefault;
}

},{"./mixin/click":32,"./mixin/event":33,"./mixin/key":35,"./mixin/mouse":36}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wVGFyZ2V0LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyL2ZpbGUuanMiLCJlczYvZXhwbG9yZXIvbmFtZUJ1dHRvbi5qcyIsImVzNi9vcHRpb25zLmpzIiwiZXM2L3J1YmJpc2hCaW4uanMiLCJlczYvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2RvY3VtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9ib2R5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvYnV0dG9uLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvY2hlY2tib3guanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9kaXYuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9saW5rLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvc2VsZWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvc3Bhbi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9pbnB1dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvaW5wdXRFbGVtZW50L2lucHV0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2lucHV0RWxlbWVudC90ZXh0YXJlYS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXNjL2JvdW5kcy5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXNjL29mZnNldC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9jbGljay5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9ldmVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9qc3guanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4va2V5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL21vdXNlLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL3Jlc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9zY3JvbGwuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvcmVhY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvdGV4dEVsZW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvd2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7Ozs7Ozs7OztBQUVBLElBQU0sT0FBTyxRQUFRLE1BQVIsQ0FBYjs7QUFFQSxJQUFNLE9BQU8sUUFBUSxRQUFSLENBQWI7QUFBQSxJQUNNLFVBQVUsUUFBUSxXQUFSLENBRGhCOztJQUdRLE8sR0FBWSxJLENBQVosTzs7SUFFRixVOzs7QUFDSixzQkFBWSxRQUFaLEVBQTBFO0FBQUEsUUFBcEQsV0FBb0QsdUVBQXRDLFVBQVMsUUFBVCxFQUFtQixJQUFuQixFQUF5QjtBQUFFO0FBQVMsS0FBRTs7QUFBQTs7QUFBQSx3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Q0FBZ0IsV0FBdkI7QUFBcUMsSyxDQUFDOzs7O21DQUVyQztBQUFFLGFBQU8sS0FBSyxVQUFMLENBQWdCLFdBQXZCO0FBQXFDLEssQ0FBRTs7OztvQ0FFeEM7QUFBRSxhQUFPLEtBQUssVUFBTCxDQUFnQixXQUF2QjtBQUFxQyxLLENBQUM7Ozs7NkJBRS9DLE8sRUFBUztBQUNoQixVQUFJLFFBQVEsbUJBQVIsS0FBZ0MsU0FBcEMsRUFBK0M7QUFDN0MsZ0JBQVEsbUJBQVIsR0FBOEIsZ0NBQTlCO0FBQ0Q7O0FBRUQsVUFBTSxZQUFZLFFBQWxCOztBQUVBLFdBQUssRUFBTCxDQUFRLFNBQVIsRUFBbUIsT0FBbkI7QUFDRDs7OzhCQUVTLE8sRUFBUztBQUNqQixVQUFNLFlBQVksUUFBbEI7O0FBRUEsV0FBSyxHQUFMLENBQVMsU0FBVCxFQUFvQixPQUFwQjtBQUNEOzs7Ozs7QUFHSCxPQUFPLE1BQVAsQ0FBYyxPQUFPLFNBQXJCLEVBQWdDLFVBQWhDO0FBQ0EsT0FBTyxNQUFQLENBQWMsT0FBTyxTQUFyQixFQUFnQyxVQUFoQztBQUNBLE9BQU8sTUFBUCxDQUFjLE9BQU8sU0FBckIsRUFBZ0MsVUFBaEM7QUFDQSxPQUFPLE1BQVAsQ0FBYyxPQUFPLFNBQXJCLEVBQWdDLFFBQWhDOztBQUVBLE9BQU8sT0FBUCxHQUFpQixJQUFJLE1BQUosRUFBakIsQyxDQUFnQzs7QUFFaEMsU0FBUyxnQ0FBVCxDQUEwQyxPQUExQyxFQUFtRCxLQUFuRCxFQUEwRCxhQUExRCxFQUF5RTtBQUN2RSxNQUFNLFNBQVMsYUFBZjtBQUFBLE1BQThCO0FBQ3hCLFVBQVEsT0FBTyxRQUFQLEVBRGQ7QUFBQSxNQUVNLFNBQVMsY0FBYyxTQUFkLEVBRmY7QUFBQSxNQUdNLGlCQUFpQixRQUFRLEtBQVIsRUFBZSxNQUFmLEVBQXVCLGFBQXZCLENBSHZCOztBQUtBLFNBQU8sY0FBUDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9wdGlvbnM6IHJlcXVpcmUoJy4vbGliL29wdGlvbnMnKSxcbiAgRXhwbG9yZXI6IHJlcXVpcmUoJy4vbGliL2V4cGxvcmVyJyksXG4gIFJ1YmJpc2hCaW46IHJlcXVpcmUoJy4vbGliL3J1YmJpc2hCaW4nKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpLFxuICAgICAgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIHRoaXMuZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BUYXJnZXRzLCBkcm9wVGFyZ2V0KSxcbiAgICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSB7XG4gICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5kcm9wVGFyZ2V0cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcFRhcmdldCwgZHJvcFRhcmdldCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gZmlyc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIgPSBmaXJzdERyYWdnYWJsZUVudHJ5RXhwbG9yZXIsIC8vL1xuICAgICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnVuc2V0T3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuc2V0T3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgIHBhdGhNYXAgPSBmaW5kKHBhdGhNYXBzLCBmdW5jdGlvbihwYXRoTWFwKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoID0gc291cmNlUGF0aCxcbiAgICAgICAgICAgICAgICAgICAgICBtb3ZlZFBhdGggPSBwYXRoTWFwW3NvdXJjZURyYWdnYWJsZUVudHJ5UGF0aF0sXG4gICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSAobW92ZWRQYXRoICE9PSB1bmRlZmluZWQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgbW92ZWRQYXRoID0gcGF0aE1hcFtzb3VyY2VQYXRoXTtcblxuICAgICAgICAgIHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCBtb3ZlZFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgbW92ZWRQYXRoKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgbW92ZWREaXJlY3RvcnlQYXRoID0gbW92ZWRQYXRoO1xuXG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCBtb3ZlZERpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlID0gZHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICAgc291cmNlRmlsZVBhdGggPSBzb3VyY2VQYXRoLCAgLy8vXG4gICAgICAgICAgICBtb3ZlZEZpbGVQYXRoID0gbW92ZWRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIG1vdmVkRmlsZVBhdGgpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERyb3BUYXJnZXQ7XG5cbmZ1bmN0aW9uIGluZGV4T2YoYXJyYXksIGVsZW1lbnQpIHtcbiAgbGV0IGluZGV4ID0gLTE7XG5cbiAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCwgY3VycmVudEVsZW1lbnRJbmRleCkge1xuICAgIGlmIChjdXJyZW50RWxlbWVudCA9PT0gZWxlbWVudCkge1xuICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGluZGV4O1xufVxuXG5mdW5jdGlvbiBmaW5kKGFycmF5LCBjYWxsYmFjaykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG4gIFxuICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50KSB7XG4gICAgaWYgKGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgZWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xuICAgICAgXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHV0aWwgPSByZXF1aXJlKCcuL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyUGF0aCA9IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlOYW1lO1xuXG4gICAgdGhpcy5hZGRSb290RGlyZWN0b3J5TWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkUm9vdERpcmVjdG9yeU1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BUYXJnZXQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gdXRpbC5wYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5UGF0aCxcbiAgICAgICAgICB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKG1hcmtlZCAmJiB1bm1vdmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN1YkRyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyeS5nZXRTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gc3ViRHJhZ2dhYmxlRW50cmllczsgLy8vXG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucmV2ZXJzZSgpO1xuICAgICAgZHJhZ2dhYmxlRW50cmllcy5wdXNoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5tb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIgPSB0aGlzKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgICAgXG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAodG9CZU1hcmtlZCkge1xuICAgICAgICBjb25zdCB3aXRoaW4gPSAoZXhwbG9yZXIgPT09IHRoaXMpLCAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZ1dpdGhpbiA9IHRoaXMuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHdpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluO1xuXG4gICAgICAgIGlmICghbm9EcmFnZ2luZykge1xuICAgICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgICAgIHRoaXMuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5kcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpO1xuICAgIH1cbiAgfVxuXG4gIGVzY2FwZURyYWdnaW5nKCkge1xuICAgIHRoaXMucmVtb3ZlTWFya2VyR2xvYmFsbHkoKTtcbiAgfVxuXG4gIG1vdmVGaWxlKGZpbGUsIHNvdXJjZUZpbGVQYXRoLCBtb3ZlZEZpbGVQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCk7XG5cbiAgICBsZXQgZmlsZVBhdGg7XG5cbiAgICBpZiAobW92ZWRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAobW92ZWRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSBtb3ZlZEZpbGVQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGRGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAobW92ZWREaXJlY3RvcnlQYXRoID09PSBzb3VyY2VEaXJlY3RvcnlQYXRoKSB7XG5cbiAgICB9IGVsc2UgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeS5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBkaXJlY3RvcnlQYXRoID0gbW92ZWREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZShmaWxlKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuZ2V0Um9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0ge30sXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgICBzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHV0aWwucHJlcGVuZFRhcmdldFBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXRpbC5yZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHBhdGhNYXBbc291cmNlRHJhZ2dhYmxlRW50cnlQYXRoXSA9IHRhcmdldERyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgcmV0dXJuIHBhdGhNYXA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGF0aE1hcHM7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IHJvb3REaXJlY3RvcnlOYW1lIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG5hbWUgPSByb290RGlyZWN0b3J5TmFtZSwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLCAgLy8vXG4gICAgICAgICAgcm9vdERpcmVjdG9yeSA9IDxSb290RGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gLz47XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxuXG4gIGFwcGx5UHJvcGVydGllcygpIHtcbiAgICBzdXBlci5hcHBseVByb3BlcnRpZXMoLi4uYXJndW1lbnRzKTtcblxuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbjsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJywgXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgdGhpcy50b3BPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmFtZUJ1dHRvbjtcblxuICAgIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlciA9IHRoaXMubW91c2VVcEhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kTW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRNb3VzZU1vdmVIYW5kbGVyID0gdGhpcy5tb3VzZU1vdmVIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uTW91c2VEb3duKHRoaXMuYm91bmRNb3VzZURvd25IYW5kbGVyKTtcblxuICAgIHRoaXMuYXBwZW5kKG5hbWVCdXR0b24pO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRFeHBsb3JlcigpIHtcbiAgICByZXR1cm4gdGhpcy5leHBsb3JlcjtcbiAgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuXG4gIGdldFBhdGgoKSB7XG4gICAgY29uc3QgcGF0aCA9IHRoaXMuZXhwbG9yZXIuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKHRoaXMpO1xuICAgIFxuICAgIHJldHVybiBwYXRoO1xuICB9XG4gIFxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHsgdGhpcy5uYW1lQnV0dG9uLnNldE5hbWUobmFtZSk7IH1cblxuICBvbkRvdWJsZUNsaWNrKGhhbmRsZXIpIHsgdGhpcy5uYW1lQnV0dG9uLm9uRG91YmxlQ2xpY2soaGFuZGxlcik7IH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKSxcbiAgICAgICAgICBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc1RvcCA9IGJvdW5kcy5nZXRUb3AoKSxcbiAgICAgICAgICBib3VuZHNMZWZ0ID0gYm91bmRzLmdldExlZnQoKTtcblxuICAgIHRoaXMudG9wT2Zmc2V0ID0gYm91bmRzVG9wIC0gbW91c2VUb3A7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gYm91bmRzTGVmdCAtIG1vdXNlTGVmdDtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9uKCdrZXlkb3duJywgdGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7XG5cbiAgICAgICAgaWYgKChub0RyYWdnaW5nKSB8fCAoc3ViRW50cnkgJiYgbm9EcmFnZ2luZ1N1YkVudHJpZXMpIHx8IChyb290RGlyZWN0b3J5ICYmIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5KSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG1vdXNlT3ZlciA9IHRoaXMuaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICAgICAgaWYgKG1vdXNlT3Zlcikge1xuICAgICAgICAgIGNvbnN0IHN0YXJ0ZWREcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuc3RhcnREcmFnZ2luZyh0aGlzKTtcblxuICAgICAgICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSwgU1RBUlRfRFJBR0dJTkdfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgIT09IG51bGwpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuICAgIFxuICAgIHJldHVybiBkcmFnZ2luZztcbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignbW91c2V1cCBibHVyJywgdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyKTtcbiAgICBcbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgaWYgKG1vdXNlQnV0dG9uID09PSBFbGVtZW50LkxFRlRfTU9VU0VfQlVUVE9OKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoIWRyYWdnaW5nKSB7XG4gICAgICAgIHRoaXMuc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vdXNlVXBIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9mZignbW91c2V1cCBibHVyJywgdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyKTtcbiAgICBcbiAgICB3aW5kb3cub2ZmTW91c2VNb3ZlKHRoaXMuYm91bmRNb3VzZU1vdmVIYW5kbGVyKTtcblxuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnN0b3BEcmFnZ2luZygpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdG9wV2FpdGluZ1RvRHJhZygpO1xuICAgIH1cbiAgfVxuXG4gIG1vdXNlTW92ZUhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgIH1cbiAgfVxuXG4gIGtleURvd25IYW5kbGVyKGV2ZW50KSB7XG4gICAgY29uc3Qga2V5Q29kZSA9IGV2ZW50LmtleUNvZGUgfHwgZXZlbnQud2hpY2g7XG5cbiAgICBpZiAoa2V5Q29kZSA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRoaXMudG9wT2Zmc2V0IC0gd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICBsZWZ0ID0gbW91c2VMZWZ0ICsgdGhpcy5sZWZ0T2Zmc2V0IC0gd2luZG93U2Nyb2xsTGVmdDtcblxuICAgIHRvcCA9IGAke3RvcH1weGA7IC8vL1xuICAgIGxlZnQgPSBgJHtsZWZ0fXB4YDsgLy8vXG5cbiAgICBjb25zdCBjc3MgPSB7XG4gICAgICB0b3A6IHRvcCxcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9O1xuXG4gICAgdGhpcy5jc3MoY3NzKTtcblxuICAgIHRoaXMuZXhwbG9yZXIuZHJhZ2dpbmcodGhpcyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwnKSxcbiAgICAgIEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNvbnN0IHsgQnV0dG9uLCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRGlyZWN0b3J5IGV4dGVuZHMgRHJhZ2dhYmxlRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuRElSRUNUT1JZO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcbiAgICBcbiAgICBjb25zdCB0b2dnbGVCdXR0b24gPSA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyl9IC8+LFxuICAgICAgICAgIGVudHJpZXMgPSA8RW50cmllcyBEaXJlY3Rvcnk9e0RpcmVjdG9yeX0gLz47XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5lbnRyaWVzID0gZW50cmllcztcblxuICAgIHRoaXMuYXBwZW5kKGVudHJpZXMpO1xuXG4gICAgdGhpcy5wcmVwZW5kKHRvZ2dsZUJ1dHRvbik7XG4gIH1cblxuICBpc0RpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRTpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuTUFSS0VSOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWTpcblxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG4gIFxuICBnZXRTdWJFbnRyaWVzKCkge1xuICAgIGxldCBzdWJFbnRyaWVzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGRpcmVjdG9yeSwgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5LmdldFN1YkVudHJpZXMoKTtcblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICAgIFxuICAgICAgc3ViRW50cmllcyA9IHN1YkVudHJpZXMuY29uY2F0KGRpcmVjdG9yeVN1YkVudHJpZXMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN1YkVudHJpZXM7XG4gIH1cblxuICBnZXRGaWxlUGF0aHMoKSB7XG4gICAgbGV0IGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZShmdW5jdGlvbihmaWxlKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IGZpbGUuZ2V0UGF0aCgpO1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnkuZ2V0RmlsZVBhdGhzKCk7XG4gICAgICBcbiAgICAgIGZpbGVQYXRocyA9IGZpbGVQYXRocy5jb25jYXQoZGlyZWN0b3J5RmlsZVBhdGhzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmaWxlUGF0aHM7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRGaWxlKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaGFzRmlsZShmaWxlTmFtZSk7XG5cbiAgICAgIGlmICghZW50cmllc0ZpbGUpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRmlsZShmaWxlTmFtZSwgZXhwbG9yZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRmlsZShmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmhhc0ZpbGUoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0ZpbGUpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVGaWxlKGZpbGVOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHRvcG1vc3REaXJlY3RvcnkucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeSkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdGhpcy5lbnRyaWVzLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmICghcm9vdERpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBlbXB0eSA9IHRoaXMuaXNFbXB0eSgpO1xuXG4gICAgICAgIGlmIChlbXB0eSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuICBcbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZE1hcmtlcihtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBsZXQgcmVtb3ZlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5LnJlbW92ZU1hcmtlcigpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlbW92ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZWQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgZW50cmllc01hcmtlZCA9IHRoaXMuZW50cmllcy5pc01hcmtlZCgpO1xuICAgIFxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gZGlyZWN0b3J5LmlzTWFya2VkKCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gZGlyZWN0b3J5TWFya2VkO1xuICAgICAgfSk7XG5cbiAgICAgIG1hcmtlZCA9IGRpcmVjdG9yeU1hcmtlZDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmVudHJpZXMuaXNFbXB0eSgpOyB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlKGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShjYWxsYmFjayk7IH1cblxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllcy5nZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWUgKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHRvcG1vc3REaXJlY3RvcnkocGF0aCwgYWRkSWZOZWNlc3NhcnkpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeTtcblxuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZGRJZk5lY2Vzc2FyeSkge1xuICAgICAgICBjb25zdCBlbnRyaWVzRGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLmhhc0RpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMucmV0cmlldmVEaXJlY3RvcnkodG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPT09IG51bGwpIHtcbiAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHRvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBpc0NvbGxhcHNlZCgpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmhhc0NsYXNzKCdjb2xsYXBzZWQnKTtcblxuICAgIHJldHVybiBjb2xsYXBzZWQ7XG4gIH1cblxuICBjb2xsYXBzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIGV4cGFuZCgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuXG4gIHRvZ2dsZSgpIHtcbiAgICB0aGlzLnRvZ2dsZUNsYXNzKCdjb2xsYXBzZWQnKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHByb3BlcnRpZXMgPSBDbGFzcztcbiAgICAgIENsYXNzID0gRGlyZWN0b3J5O1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSwgZXhwbG9yZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZGlyZWN0b3J5J1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgdXRpbCA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWwnKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi8uLi9vcHRpb25zJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGlzUm9vdERpcmVjdG9yeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFkZEZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuXG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyk7XG5cbiAgICBpZiAobm9EcmFnZ2luZ0ludG9TdWJkaXJlY3Rvcmllcykge1xuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IG92ZXJsYXBwaW5nRW50cnkgP1xuICAgICAgICAgIHRoaXMgOlxuICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnkgPSBzdXBlci5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gdXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRGaWxlOiB0aGlzLmFkZEZpbGUuYmluZCh0aGlzKSxcbiAgICAgIGFkZERpcmVjdG9yeTogdGhpcy5hZGREaXJlY3RvcnkuYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZUZpbGU6IHRoaXMucmVtb3ZlRmlsZS5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5OiB0aGlzLnJlbW92ZURpcmVjdG9yeS5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTogdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBnZXREcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoLmJpbmQodGhpcyksXG4gICAgICBnZXRNYXJrZWREaXJlY3Rvcnk6IHRoaXMuZ2V0TWFya2VkRGlyZWN0b3J5LmJpbmQodGhpcyksXG4gICAgICBnZXRGaWxlUGF0aHM6IHRoaXMuZ2V0RmlsZVBhdGhzLmJpbmQodGhpcyksXG4gICAgICBhZGRSb290RGlyZWN0b3J5TWFya2VyOiB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIHJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXI6IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksIC8vL1xuICAgICAgaXNSb290RGlyZWN0b3J5TWFya2VkOiB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3RvcnlOYW1lOiB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeTogZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBEaXJlY3RvcnkuZnJvbVByb3BlcnRpZXMoUm9vdERpcmVjdG9yeSwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb290RGlyZWN0b3J5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG5cbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgICAgXG4gICAgICAgIGJlZm9yZSA9IG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMDsgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZShmaWxlKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhGaWxlLCBwcm9wZXJ0aWVzLCBuYW1lLCBleHBsb3Jlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlLCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlID0gcmVxdWlyZSgnLi9kcmFnZ2FibGVFbnRyeS9maWxlJyksXG4gICAgICBGaWxlTWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZScpLFxuICAgICAgRGlyZWN0b3J5TWFya2VyID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5Jyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5ID0gRGlyZWN0b3J5O1xuICB9XG4gIFxuICBhZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IG5hbWUgPSBmaWxlTmFtZSxcbiAgICAgICAgICBmaWxlID0gPEZpbGUgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGU7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IG5hbWUgPSBkaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIGNsYXNzTmFtZSA9IGBkaXJlY3RvcnkgJHtjb2xsYXBzZWQgPyAnY29sbGFwc2VkJyA6ICcnfWAsICAvLy9cbiAgICAgICAgICBkaXJlY3RvcnkgPSA8dGhpcy5EaXJlY3RvcnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0gLz4sXG4gICAgICAgICAgZW50cnkgPSBkaXJlY3Rvcnk7ICAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGRpcmVjdG9yeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaGFzRmlsZShmaWxlTmFtZSkge1xuICAgIGxldCBmaWxlID0gdGhpcy5yZXRyaWV2ZUZpbGUoZmlsZU5hbWUpO1xuXG4gICAgZmlsZSA9IChmaWxlICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZmlsZTtcbiAgfVxuXG4gIGhhc0RpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgbGV0IGRpcmVjdG9yeSA9IHRoaXMucmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgXG4gICAgZGlyZWN0b3J5ID0gKGRpcmVjdG9yeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyO1xuICAgIFxuICAgIGNvbnN0IG5hbWUgPSBtYXJrZXJOYW1lOyAgLy8vXG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgICBtYXJrZXIgPSA8RmlsZU1hcmtlciBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBtYXJrZXIgPSA8RGlyZWN0b3J5TWFya2VyIG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlcjsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCBtYXJrZXIgPSB0aGlzLnJldHJpZXZlTWFya2VyKCk7XG5cbiAgICBtYXJrZXIucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzRW1wdHkoKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpLFxuICAgICAgICAgIGVudHJpZXNMZW5ndGggPSBlbnRyaWVzLmxlbmd0aCxcbiAgICAgICAgICBlbXB0eSA9IChlbnRyaWVzTGVuZ3RoID09PSAwKTtcblxuICAgIHJldHVybiBlbXB0eTtcbiAgfVxuXG4gIGFkZEVudHJ5KGVudHJ5KSB7XG4gICAgY29uc3QgbmV4dEVudHJ5ID0gZW50cnksXG4gICAgICAgICAgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgbGV0IHByZXZpb3VzRW50cnkgPSBudWxsO1xuXG4gICAgZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBuZXh0RW50cnlCZWZvcmUgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpO1xuICAgICAgXG4gICAgICBpZiAobmV4dEVudHJ5QmVmb3JlKSB7XG4gICAgICAgIHByZXZpb3VzRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHJpZXZlRmlsZShmaWxlTmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGZpbGVOYW1lLCBFbnRyeS50eXBlcy5GSUxFKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHJldHJpZXZlTWFya2VyKCkge1xuICAgIGxldCBtYXJrZXIgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgbWFya2VyID0gZW50cnk7ICAvLy9cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSwgdHlwZSk7XG5cbiAgICByZXR1cm4gbWFya2VyO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5ID0gZGlyZWN0b3J5LmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuICBcbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5LmdldERyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnkuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkRJUkVDVE9SWSkgfVxuXG4gIHNvbWVGaWxlKGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIHJldHVybiBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHJpZXZlRW50cnlCeVR5cGUobmFtZSwgdHlwZSkge1xuICAgIGxldCBmb3VuZEVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgIGlmIChlbnRyeU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgZm91bmRFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sIHR5cGUpO1xuXG4gICAgY29uc3QgZW50cnkgPSBmb3VuZEVudHJ5OyAvLy9cblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGdldEVudHJpZXMoKSB7XG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyksXG4gICAgICAgICAgZW50cmllcyA9IGNoaWxkTGlzdEVsZW1lbnRzOyAgLy8vXG5cbiAgICByZXR1cm4gZW50cmllcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBEaXJlY3RvcnkgfSA9IHByb3BlcnRpZXM7XG4gICAgXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoRW50cmllcywgcHJvcGVydGllcywgRGlyZWN0b3J5KTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJpZXMsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdlbnRyaWVzJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdEaXJlY3RvcnknXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVudHJpZXM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cnkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldFR5cGUoKSB7XG4gICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBuYW1lIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaScsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnXG4gIF0sXG4gIHR5cGVzOiB7XG4gICAgRklMRTogJ0ZJTEUnLFxuICAgIE1BUktFUjogJ01BUktFUicsXG4gICAgRElSRUNUT1JZOiAnRElSRUNUT1JZJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBNYXJrZXIgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCB0eXBlKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIHJldHVybiBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihNYXJrZXIsIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdtYXJrZXInXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcmtlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyID0gcmVxdWlyZSgnLi4vbWFya2VyJyk7XG5cbmNsYXNzIERpcmVjdG9yeU1hcmtlciBleHRlbmRzIE1hcmtlciB7XG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgYmVmb3JlID0gKGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRklMRSkgP1xuICAgICAgICAgICAgICAgICAgICAgdHJ1ZSA6XG4gICAgICAgICAgICAgICAgICAgICAgIChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gTWFya2VyLmZyb21Qcm9wZXJ0aWVzKERpcmVjdG9yeU1hcmtlciwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3RvcnlNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlciA9IHJlcXVpcmUoJy4uL21hcmtlcicpO1xuXG5jbGFzcyBGaWxlTWFya2VyIGV4dGVuZHMgTWFya2VyIHtcbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBiZWZvcmUgPSAoZW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpID8gXG4gICAgICAgICAgICAgICAgICAgICBmYWxzZSA6IFxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIE1hcmtlci5mcm9tUHJvcGVydGllcyhGaWxlTWFya2VyLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gZmlyc3QoY2hpbGRFbGVtZW50cyksXG4gICAgICAgICAgdGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gdGV4dDsgLy8vXG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIHNldE5hbWUobmFtZSkge1xuICAgIGNvbnN0IHRleHQgPSBuYW1lLCAvLy9cbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCksXG4gICAgICAgICAgZmlyc3RDaGlsZEVsZW1lbnQgPSBmaXJzdChjaGlsZEVsZW1lbnRzKTtcblxuICAgIGZpcnN0Q2hpbGRFbGVtZW50LnNldFRleHQodGV4dCk7XG4gIH1cbiAgXG4gIG9uRG91YmxlQ2xpY2soaGFuZGxlcikge1xuICAgIHRoaXMub24oJ2RibGNsaWNrJywgaGFuZGxlcik7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkRvdWJsZUNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRvdWJsZUNsaWNrSGFuZGxlciA9IG9uRG91YmxlQ2xpY2s7IC8vL1xuICAgIFxuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTmFtZUJ1dHRvbiwgcHJvcGVydGllcywgZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ29uRG91YmxlQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5hbWVCdXR0b247XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvcHRpb25zID0ge1xuICBOT19EUkFHR0lORzogJ05PX0RSQUdHSU5HJyxcbiAgTk9fRFJBR0dJTkdfV0lUSElOOiAnTk9fRFJBR0dJTkdfV0lUSElOJyxcbiAgTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVM6ICdOT19EUkFHR0lOR19TVUJfRU5UUklFUycsXG4gIE5PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZOiAnTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlknLFxuICBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUzogJ05PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTJyxcbiAgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUzogJ1JFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMnLFxuICBFU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HOiAnRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORydcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gb3B0aW9ucztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgRHJvcFRhcmdldCA9IHJlcXVpcmUoJy4vZHJvcFRhcmdldCcpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIFJ1YmJpc2hCaW4gZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIHJlbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihwYXRoTWFwcywgZG9uZSkgeyBkb25lKCk7IH0gKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldE1vdmVIYW5kbGVyID0gcmVtb3ZlSGFuZGxlcjsgIC8vL1xuICAgIFxuICAgIHN1cGVyKHNlbGVjdG9yLCBkcm9wVGFyZ2V0TW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZ2V0TWFya2VkRGlyZWN0b3J5KCkge1xuICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeTtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG9wZW4gPSB0aGlzLmlzT3BlbigpLFxuICAgICAgICAgIG1hcmtlZCA9IG9wZW47ICAvLy9cbiAgICBcbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG4gIFxuICBkcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZXhwbG9yZXIpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBjb25zdCB0b0JlTWFya2VkID0gdGhpcy5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoIXRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldFRvQmVNYXJrZWQgPSB0aGlzLmdldERyb3BUYXJnZXRUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgIT09IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZHJvcFRhcmdldFRvQmVNYXJrZWQuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4cGxvcmVyLmFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgbW92ZWREaXJlY3RvcnlQYXRoKSB7XG4gICAgaWYgKG1vdmVkRGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgbW92ZWRGaWxlUGF0aCkge1xuICAgIGlmIChtb3ZlZEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBpc09wZW4oKSB7XG4gICAgY29uc3Qgb3BlbiA9IHRoaXMuaGFzQ2xhc3MoJ29wZW4nKTtcbiAgICBcbiAgICByZXR1cm4gb3BlbjtcbiAgfVxuXG4gIHBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gZHJhZ2dhYmxlRW50cmllcy5tYXAoZnVuY3Rpb24oZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHBhdGhNYXAgPSB7fSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIHNvdXJjZURyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcblxuICAgICAgcGF0aE1hcFtzb3VyY2VEcmFnZ2FibGVFbnRyeVBhdGhdID0gdGFyZ2V0RHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvblJlbW92ZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmVIYW5kbGVyID0gb25SZW1vdmU7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUnViYmlzaEJpbiwgcHJvcGVydGllcywgcmVtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSdWJiaXNoQmluLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ3J1YmJpc2hCaW4nXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uUmVtb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyB1dGlsIHtcbiAgc3RhdGljIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHV0aWwudG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCksXG4gICAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGJvdHRvbW1vc3ROYW1lKHBhdGgpIHtcbiAgICBsZXQgYm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLipcXC8oW15cXC9dKiQpLyk7XG4gICAgXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuICAgICAgXG4gICAgICBib3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xuICB9XG5cbiAgc3RhdGljIHRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSopXFwvLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC8oXi4qKVxcL1teXFwvXSokLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eW15cXC9dKlxcLyguKiQpLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuICBcbiAgc3RhdGljIHByZXBlbmRUYXJnZXRQYXRoKGVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgICBlbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgJy8nICsgZW50cnlQYXRoO1xuICAgIFxuICAgIHJldHVybiBlbnRyeVBhdGg7XG4gIH1cblxuICBzdGF0aWMgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aChlbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKCdeJyArIHNvdXJjZVBhdGggKyAnKC4qJCknKSxcbiAgICAgICAgICBtYXRjaGVzID0gZW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBlbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5UGF0aDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWw7XG5cbmZ1bmN0aW9uIHNlY29uZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMV07IH1cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHdpbmRvdzogcmVxdWlyZSgnLi9saWIvd2luZG93JyksXG4gIGRvY3VtZW50OiByZXF1aXJlKCcuL2xpYi9kb2N1bWVudCcpLFxuICBEaXY6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvZGl2JyksXG4gIFNwYW46IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvc3BhbicpLFxuICBCb2R5OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2JvZHknKSxcbiAgTGluazogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9saW5rJyksXG4gIFNlbGVjdDogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9zZWxlY3QnKSxcbiAgQnV0dG9uOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2J1dHRvbicpLFxuICBDaGVja2JveDogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9jaGVja2JveCcpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50JyksXG4gIFRleHRFbGVtZW50OiByZXF1aXJlKCcuL2xpYi90ZXh0RWxlbWVudCcpLFxuICBJbnB1dDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L2lucHV0JyksXG4gIFRleHRhcmVhOiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvdGV4dGFyZWEnKSxcbiAgSW5wdXRFbGVtZW50OiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQnKSxcbiAgQm91bmRzOiByZXF1aXJlKCcuL2xpYi9taXNjL2JvdW5kcycpLFxuICBPZmZzZXQ6IHJlcXVpcmUoJy4vbGliL21pc2Mvb2Zmc2V0JyksXG4gIFJlYWN0OiByZXF1aXJlKCcuL2xpYi9yZWFjdCcpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICBrZXlNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4va2V5Jyk7XG5cbmNsYXNzIERvY3VtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQ7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGV2ZW50TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGtleU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRG9jdW1lbnQoKTsgIC8vL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2Mvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2MvYm91bmRzJyksXG4gICAgICBqc3hNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vanN4JyksXG4gICAgICBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIHNjcm9sbE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9zY3JvbGwnKSxcbiAgICAgIHJlc2l6ZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9yZXNpemUnKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICBrZXlNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4va2V5Jyk7XG5cbmNsYXNzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpczsgLy8vXG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUodGhpcyk7IH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3Qgd2lkdGggPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldFdpZHRoIDpcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBzZXRXaWR0aCh3aWR0aCkgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUud2lkdGggPSB3aWR0aDsgfVxuXG4gIGdldEhlaWdodChpbmNsdWRlQm9yZGVyID0gZmFsc2UpIHtcbiAgICBjb25zdCBoZWlnaHQgPSBpbmNsdWRlQm9yZGVyID9cbiAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5vZmZzZXRIZWlnaHQgOlxuICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHNldEhlaWdodChoZWlnaHQpIHsgdGhpcy5kb21FbGVtZW50LnN0eWxlLmhlaWdodCA9IGhlaWdodDsgfVxuXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7IHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgY2xlYXJBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7IHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTsgfVxuXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH1cblxuICB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTsgfVxuXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpOyB9XG5cbiAgY2xlYXJDbGFzc2VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7IH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucmVtb3ZlKHRoaXMpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIGluc2VydEFmdGVyKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50Lm5leHRTaWJsaW5nKTsgIC8vL1xuICB9XG5cbiAgcHJlcGVuZChlbGVtZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudCxcbiAgICAgICAgICBmaXJzdENoaWxkRE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lmluc2VydEJlZm9yZShkb21FbGVtZW50LCBmaXJzdENoaWxkRE9NRWxlbWVudCk7XG4gIH1cblxuICBhcHBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIG51bGwpOyAvLy9cbiAgfVxuXG4gIHJlbW92ZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coZGlzcGxheVN0eWxlID0gJ2Jsb2NrJykgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTdHlsZTsgfVxuXG4gIGhpZGUoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgZW5hYmxlKCkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKCdkaXNhYmxlZCcpOyB9XG5cbiAgZGlzYWJsZSgpIHsgdGhpcy5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7IH1cblxuICBodG1sKGh0bWwpIHtcbiAgICBpZiAoaHRtbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIVE1MO1xuXG4gICAgICBodG1sID0gaW5uZXJIVE1MOyAvLy9cblxuICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlubmVySFRNTCA9IGh0bWw7IC8vL1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIVE1MID0gaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgY3NzKGNzcykge1xuICAgIGlmIChjc3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb21FbGVtZW50KSxcbiAgICAgICAgICAgIGNzcyA9IHt9O1xuXG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgY29tcHV0ZWRTdHlsZS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IGNvbXB1dGVkU3R5bGVbMF0sICAvLy9cbiAgICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICAgIGNzc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCBuYW1lID0gY3NzOyAvLy9cblxuICAgICAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5kb21FbGVtZW50KSxcbiAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgY3NzID0gdmFsdWU7ICAvLy9cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhjc3MpOyAvLy9cblxuICAgICAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY3NzW25hbWVdO1xuXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5zdHlsZVtuYW1lXSA9IHZhbHVlO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gIH1cblxuICBibHVyKCkgeyB0aGlzLmRvbUVsZW1lbnQuYmx1cigpOyB9XG5cbiAgZm9jdXMoKSB7IHRoaXMuZG9tRWxlbWVudC5mb2N1cygpOyB9XG5cbiAgaGFzRm9jdXMoKSB7XG4gICAgY29uc3QgZm9jdXMgPSAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gdGhpcy5kb21FbGVtZW50KTsgIC8vL1xuXG4gICAgcmV0dXJuIGZvY3VzO1xuICB9XG5cbiAgZ2V0RGVzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgZG9tTm9kZSA9IHRoaXMuZG9tRWxlbWVudCwgIC8vL1xuICAgICAgICAgIGRlc2NlbmRhbnRET01Ob2RlcyA9IGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUpLFxuICAgICAgICAgIGRlc2NlbmRhbnRFbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzKGRlc2NlbmRhbnRET01Ob2Rlcywgc2VsZWN0b3IpO1xuXG4gICAgcmV0dXJuIGRlc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldENoaWxkRWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBjaGlsZERPTU5vZGVzID0gdGhpcy5kb21FbGVtZW50LmNoaWxkTm9kZXMsXG4gICAgICAgICAgY2hpbGRET01FbGVtZW50cyA9IGZpbHRlckRPTU5vZGVzKGNoaWxkRE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoY2hpbGRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50cztcbiAgfVxuXG4gIGdldFBhcmVudEVsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgcGFyZW50RWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocGFyZW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKHBhcmVudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgY29uc3QgcGFyZW50RE9NRWxlbWVudHMgPSBbcGFyZW50RE9NRWxlbWVudF0sXG4gICAgICAgICAgICAgIHBhcmVudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMocGFyZW50RE9NRWxlbWVudHMpLFxuICAgICAgICAgICAgICBmaXJzdFBhcmVudEVsZW1lbnQgPSBmaXJzdChwYXJlbnRFbGVtZW50cyk7XG5cbiAgICAgICAgcGFyZW50RWxlbWVudCA9IGZpcnN0UGFyZW50RWxlbWVudCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnRFbGVtZW50O1xuICB9XG5cbiAgZ2V0QXNjZW5kYW50RWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBhc2NlbmRhbnRET01FbGVtZW50cyA9IFtdLFxuICAgICAgICAgIHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGxldCBhc2NlbmRhbnRET01FbGVtZW50ID0gcGFyZW50RE9NRWxlbWVudDsgIC8vL1xuICAgIHdoaWxlIChhc2NlbmRhbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAoYXNjZW5kYW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBhc2NlbmRhbnRET01FbGVtZW50cy5wdXNoKGFzY2VuZGFudERPTUVsZW1lbnQpO1xuICAgICAgfVxuXG4gICAgICBhc2NlbmRhbnRET01FbGVtZW50ID0gYXNjZW5kYW50RE9NRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgIH1cblxuICAgIGNvbnN0IGFzY2VuZGFudEVsZW1lbnRzID0gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoYXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGFzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBwcmV2aW91c1NpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZpb3VzU2libGluZ0RPTU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQucHJldmlvdXNTaWJsaW5nOyAgLy8vXG5cbiAgICBpZiAoKHByZXZpb3VzU2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IocHJldmlvdXNTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBwcmV2aW91c1NpYmxpbmdFbGVtZW50ID0gcHJldmlvdXNTaWJsaW5nRE9NTm9kZS5fX2VsZW1lbnRfXyB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBwcmV2aW91c1NpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgZ2V0TmV4dFNpYmxpbmdFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IG5leHRTaWJsaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBuZXh0U2libGluZ0RPTU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQubmV4dFNpYmxpbmc7XG5cbiAgICBpZiAoKG5leHRTaWJsaW5nRE9NTm9kZSAhPT0gbnVsbCkgJiYgZG9tTm9kZU1hdGNoZXNTZWxlY3RvcihuZXh0U2libGluZ0RPTU5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgbmV4dFNpYmxpbmdFbGVtZW50ID0gbmV4dFNpYmxpbmdET01Ob2RlLl9fZWxlbWVudF9fIHx8IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTaWJsaW5nRWxlbWVudDtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShDbGFzcywgZWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgZGVlcCA9IHRydWUsXG4gICAgICAgICAgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudC5jbG9uZU5vZGUoZGVlcCk7XG5cbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChDbGFzcywgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3Qgb3V0ZXJET01FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBvdXRlckRPTUVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDsgIC8vL1xuXG4gICAgY29uc3QgZG9tRWxlbWVudCA9IG91dGVyRE9NRWxlbWVudC5maXJzdENoaWxkO1xuXG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gQ2xhc3MudGFnTmFtZSxcbiAgICAgICAgICBodG1sID0gYDwke3RhZ05hbWV9IC8+YCxcbiAgICAgICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tSFRNTChDbGFzcywgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIGNvbnN0IGRlZmF1bHRQcm9wZXJ0aWVzID0gQ2xhc3MuZGVmYXVsdFByb3BlcnRpZXMsXG4gICAgICAgICAgaWdub3JlZFByb3BlcnRpZXMgPSBDbGFzcy5pZ25vcmVkUHJvcGVydGllcztcblxuICAgIGVsZW1lbnQuYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBqc3hNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgc2Nyb2xsTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgcmVzaXplTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgbW91c2VNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBrZXlNaXhpbik7XG5cbk9iamVjdC5hc3NpZ24oRWxlbWVudCwge1xuICBMRUZUX01PVVNFX0JVVFRPTjogMCxcbiAgTUlERExFX01PVVNFX0JVVFRPTjogMSxcbiAgUklHSFRfTU9VU0VfQlVUVE9OOiAyXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50O1xuXG5mdW5jdGlvbiBkb21FbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykgP1xuICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVswXSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RvcjsgIC8vL1xuXG4gIHJldHVybiBkb21FbGVtZW50O1xufVxuXG5mdW5jdGlvbiBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhkb21FbGVtZW50cykge1xuICBjb25zdCBkb21FbGVtZW50c1dpdGhFbGVtZW50cyA9IGZpbHRlcihkb21FbGVtZW50cywgZnVuY3Rpb24oZG9tRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiAoZG9tRWxlbWVudC5fX2VsZW1lbnRfXyAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgfSksXG4gICAgICAgIGVsZW1lbnRzID0gZG9tRWxlbWVudHNXaXRoRWxlbWVudHMubWFwKGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5fX2VsZW1lbnRfXztcbiAgICAgICAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShkb21Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMgPSBbXSkge1xuICBjb25zdCBjaGlsZERPTU5vZGVzID0gZG9tTm9kZS5jaGlsZE5vZGVzOyAgLy8vXG5cbiAgZGVzY2VuZGFudERPTU5vZGVzLmNvbmNhdChjaGlsZERPTU5vZGVzKTtcblxuICBjaGlsZERPTU5vZGVzLmZvckVhY2goZnVuY3Rpb24oY2hpbGRET01Ob2RlKSB7XG4gICAgZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoY2hpbGRET01Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMpO1xuICB9KTtcblxuICByZXR1cm4gZGVzY2VuZGFudERPTU5vZGVzO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJET01Ob2Rlcyhkb21Ob2Rlcywgc2VsZWN0b3IpIHtcbiAgY29uc3QgZmlsdGVyZWRET01Ob2RlcyA9IGZpbHRlcihkb21Ob2RlcywgZnVuY3Rpb24oZG9tTm9kZSkge1xuICAgIHJldHVybiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZpbHRlcmVkRE9NTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tTm9kZVR5cGUgPSBkb21Ob2RlLm5vZGVUeXBlO1xuXG4gIHN3aXRjaCAoZG9tTm9kZVR5cGUpIHtcbiAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFIDoge1xuICAgICAgY29uc3QgZG9tRWxlbWVudCA9IGRvbU5vZGU7IC8vL1xuXG4gICAgICByZXR1cm4gZG9tRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBjYXNlIE5vZGUuVEVYVF9OT0RFIDoge1xuICAgICAgaWYgKHNlbGVjdG9yID09PSAnKicpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZmlsdGVyZWRBcnJheSA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBhcnJheS5sZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IHRlc3QoZWxlbWVudCk7XG5cbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICBmaWx0ZXJlZEFycmF5LnB1c2goZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbHRlcmVkQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGZpcnN0KGFycmF5KSB7IHJldHVybiBhcnJheVswXTsgfVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCb2R5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yID0gJ2JvZHknKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBCb2R5LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShCb2R5LCBlbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQm9keSwgaHRtbCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJvZHksIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhCb2R5LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEJvZHksIHtcbiAgdGFnTmFtZTogJ2JvZHknXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBCb2R5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjbGlja0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2xpY2tIYW5kbGVyKSB7IHJldHVybiBCdXR0b24uY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soY2xpY2tIYW5kbGVyLCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIub25DbGljayhjbGlja0hhbmRsZXIsIGludGVybWVkaWF0ZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBvZmZDbGljayhjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlci5vZmZDbGljayhjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEJ1dHRvbiwgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCdXR0b24sIGh0bWwsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQnV0dG9uLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljazsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihjbGlja0hhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGNsaWNrSGFuZGxlcihtb3VzZUJ1dHRvbiwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBDaGVja2JveCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlciwgY2hlY2tlZCkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICAgIFxuICAgIGlmIChjaGVja2VkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY2hlY2soY2hlY2tlZCk7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gQ2hlY2tib3guY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjbGljaycsIGNoYW5nZUhhbmRsZXIsIGludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpOyAgLy8vXG4gIH1cbiAgXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgY2hhbmdlSGFuZGxlcik7ICAvLy9cbiAgfVxuXG4gIGNoZWNrKGNoZWNrZWQgPSB0cnVlKSB7XG4gICAgY2hlY2tlZCA/XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJykgOlxuICAgICAgICB0aGlzLmNsZWFyQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBpc0NoZWNrZWQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2hlY2tlZDsgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2hlY2tib3gsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChDaGVja2JveCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KENoZWNrYm94LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgY2hlY2tlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENoZWNrYm94LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKENoZWNrYm94LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJyxcbiAgICAnY2hlY2tlZCdcbiAgXSxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICB0eXBlOiAnY2hlY2tib3gnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihjaGFuZ2VIYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBjaGVja2JveCA9IHRhcmdldEVsZW1lbnQsIC8vL1xuICAgICAgICBjaGVja2VkID0gY2hlY2tib3guaXNDaGVja2VkKCksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gY2hhbmdlSGFuZGxlcihjaGVja2VkLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIERpdiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRGl2LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShEaXYsIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChEaXYsIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhEaXYsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGl2LCB7XG4gIHRhZ05hbWU6ICdkaXYnXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXY7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIExpbmsgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjbGlja0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2xpY2tIYW5kbGVyKSB7IHJldHVybiBMaW5rLmNsb25lKHRoaXMsIGNsaWNrSGFuZGxlcik7IH1cblxuICBvbkNsaWNrKGNsaWNrSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcikge1xuICAgIHRoaXMub24oJ2NsaWNrJywgY2xpY2tIYW5kbGVyLCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhjbGlja0hhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2xpY2snLCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKExpbmssIGVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChMaW5rLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljazsgLy8vICAgIFxuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTGluaywgcHJvcGVydGllcywgY2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKExpbmssIHtcbiAgdGFnTmFtZTogJ2EnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNsaWNrJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGNsaWNrSGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgbGluayA9IHRhcmdldEVsZW1lbnQsIC8vL1xuICAgICAgICBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBjbGlja0hhbmRsZXIoaHJlZiwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBTZWxlY3QuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpIHtcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gIH1cblxuICBzZXRTZWxlY3RlZE9wdGlvbkJ5VmFsdWUoc2VsZWN0ZWRPcHRpb25WYWx1ZSkge1xuICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTsgIC8vL1xuICAgIFxuICAgIHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyBcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoU2VsZWN0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoU2VsZWN0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU2VsZWN0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFNlbGVjdCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTZWxlY3QsIHtcbiAgdGFnTmFtZTogJ3NlbGVjdCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGNoYW5nZUhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IHNlbGVjdCA9IHRhcmdldEVsZW1lbnQsIC8vL1xuICAgICAgICBzZWxlY3RlZE9wdGlvblZhbHVlID0gc2VsZWN0LmdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBjaGFuZ2VIYW5kbGVyKHNlbGVjdGVkT3B0aW9uVmFsdWUsIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjbG9uZSgpIHsgcmV0dXJuIFNwYW4uY2xvbmUodGhpcyk7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFNwYW4sIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChTcGFuLCBodG1sKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU3BhbiwgZG9tRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oU3Bhbiwge1xuICB0YWdOYW1lOiAnc3Bhbidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwYW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKTtcblxuY2xhc3MgSW5wdXRFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyLCBpbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgZ2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQudmFsdWU7IH1cblxuICBnZXRTZWxlY3Rpb25TdGFydCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydDsgfVxuXG4gIGdldFNlbGVjdGlvbkVuZCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQ7IH1cblxuICBzZXRWYWx1ZSh2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQudmFsdWUgPSB2YWx1ZTsgfVxuXG4gIHNldFNlbGVjdGlvblN0YXJ0KHNlbGVjdGlvblN0YXJ0KSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IHNlbGVjdGlvblN0YXJ0OyB9XG5cbiAgc2V0U2VsZWN0aW9uRW5kKHNlbGVjdGlvbkVuZCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kID0gc2VsZWN0aW9uRW5kOyB9XG5cbiAgc2VsZWN0KCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0KCk7IH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihJbnB1dEVsZW1lbnQsIHtcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RWxlbWVudDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoY2hhbmdlSGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgaW5wdXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudCwgLy8vXG4gICAgICAgIHZhbHVlID0gaW5wdXRFbGVtZW50LmdldFZhbHVlKCksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gY2hhbmdlSGFuZGxlcih2YWx1ZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuICBcbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKElucHV0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChJbnB1dCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoSW5wdXQsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBUZXh0YXJlYS5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uUmVzaXplKCkge31cbiAgXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKFRleHRhcmVhLCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChUZXh0YXJlYSwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoVGV4dGFyZWEsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFRleHRhcmVhLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRleHRhcmVhLCB7XG4gIHRhZ05hbWU6ICd0ZXh0YXJlYSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCb3VuZHMge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cblxuICBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90dG9tO1xuICB9XG5cbiAgZ2V0UmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMubGVmdCA8IG1vdXNlTGVmdCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKSAmJlxuICAgICAgICAgICAgICAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KSAmJlxuICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCwgLy8vXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCwgIC8vL1xuICAgICAgICAgIHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3R0b20gPSBib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIHJpZ2h0ID0gYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3VuZHMgPSBuZXcgQm91bmRzKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm91bmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBPZmZzZXQge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9XG5cbiAgZ2V0VG9wKCkge1xuICAgIHJldHVybiB0aGlzLnRvcDtcbiAgfVxuXG4gIGdldExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9mZnNldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25DbGljayhoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmQ2xpY2soaGFuZGxlcikgeyB0aGlzLm9mZignY2xpY2snLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBjbGlja01peGluID0ge1xuICBvbkNsaWNrOiBvbkNsaWNrLFxuICBvZmZDbGljazogb2ZmQ2xpY2tcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xpY2tNaXhpbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgbW91c2VUb3AgPSBldmVudC5wYWdlWSwgIC8vL1xuICAgICAgICBtb3VzZUxlZnQgPSBldmVudC5wYWdlWCwgLy8vXG4gICAgICAgIG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uLCAvLy9cbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uKGV2ZW50VHlwZXMsIGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIG9uRXZlbnQodGhpcywgZXZlbnRUeXBlLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIG9mZkV2ZW50KHRoaXMsIGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmZcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRNaXhpbjtcblxuZnVuY3Rpb24gb25FdmVudChlbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgaWYgKCFlbGVtZW50Lmhhc093blByb3BlcnR5KCdldmVudE9iamVjdE1hcCcpKSB7XG4gICAgY29uc3QgZXZlbnRPYmplY3RNYXAgPSB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudCwge1xuICAgICAgZXZlbnRPYmplY3RNYXA6IGV2ZW50T2JqZWN0TWFwXG4gICAgfSk7XG4gIH1cblxuICBsZXQgZXZlbnRPYmplY3QgPSBlbGVtZW50LmV2ZW50T2JqZWN0TWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKCFldmVudE9iamVjdCkge1xuICAgIGV2ZW50T2JqZWN0ID0gY3JlYXRlRXZlbnRPYmplY3QoKTtcblxuICAgIGVsZW1lbnQuZXZlbnRPYmplY3RNYXBbZXZlbnRUeXBlXSA9IGV2ZW50T2JqZWN0O1xuICB9XG5cbiAgZXZlbnRPYmplY3QuYWRkSGFuZGxlcihlbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZFdmVudChlbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIpIHtcbiAgY29uc3QgZXZlbnRPYmplY3QgPSBlbGVtZW50LmV2ZW50T2JqZWN0TWFwW2V2ZW50VHlwZV0sXG4gICAgICAgIG5vbmVSZW1haW5pbmcgPSBldmVudE9iamVjdC5yZW1vdmVIYW5kbGVyKGVsZW1lbnQsIGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgaWYgKG5vbmVSZW1haW5pbmcpIHtcbiAgICBkZWxldGUgZWxlbWVudC5ldmVudE9iamVjdE1hcFtldmVudFR5cGVdO1xuICB9XG5cbiAgY29uc3QgZXZlbnRUeXBlcyA9IE9iamVjdC5rZXlzKGVsZW1lbnQuZXZlbnRPYmplY3RNYXApO1xuXG4gIGlmIChldmVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSBlbGVtZW50LmV2ZW50T2JqZWN0TWFwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50T2JqZWN0KCkge1xuICBjb25zdCBldmVudExpc3RlbmVycyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgZXZlbnRUeXBlLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gICAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGVsZW1lbnQsICAvLy9cbiAgICAgICAgICBldmVudExpc3RlbmVyID0gY3JlYXRlRXZlbnRMaXN0ZW5lcihoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyLCB0YXJnZXRFbGVtZW50KTtcblxuICAgIGVsZW1lbnQuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG5cbiAgICBldmVudExpc3RlbmVycy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlSGFuZGxlcihlbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIgPSBudWxsKSB7XG4gICAgaWYgKGhhbmRsZXIgPT09IG51bGwpIHtcbiAgICAgIGV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICBlbGVtZW50LmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gMDtcblxuICAgICAgZXZlbnRMaXN0ZW5lcnMuc3BsaWNlKHN0YXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBpbmRleE9mRXZlbnRMaXN0ZW5lcihldmVudExpc3RlbmVycywgaGFuZGxlciksXG4gICAgICAgICAgICBldmVudExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lcnNbaW5kZXhdO1xuXG4gICAgICBlbGVtZW50LmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuXG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICAgIGV2ZW50TGlzdGVuZXJzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cblxuICAgIGNvbnN0IG5vbmVSZW1haW5pbmcgPSAoZXZlbnRMaXN0ZW5lcnMubGVuZ3RoID09PSAwKTsgIC8vL1xuXG4gICAgcmV0dXJuIG5vbmVSZW1haW5pbmc7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZEhhbmRsZXI6IGFkZEhhbmRsZXIsXG4gICAgcmVtb3ZlSGFuZGxlcjogcmVtb3ZlSGFuZGxlclxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudExpc3RlbmVyKGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIsIHRhcmdldEVsZW1lbnQpIHtcbiAgaWYgKHR5cGVvZiBpbnRlcm1lZGlhdGVIYW5kbGVyID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnN0IG9iamVjdCA9IGludGVybWVkaWF0ZUhhbmRsZXI7ICAvLy9cblxuICAgIGludGVybWVkaWF0ZUhhbmRsZXIgPSBjcmVhdGVCaW5kaW5nSW50ZXJtZWRpYXRlSGFuZGxlcihvYmplY3QpOyAvLy9cbiAgfVxuXG4gIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gKGludGVybWVkaWF0ZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyKGV2ZW50LCB0YXJnZXRFbGVtZW50KTtcblxuICAgIGlmIChwcmV2ZW50RGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfTtcblxuICBPYmplY3QuYXNzaWduKGV2ZW50TGlzdGVuZXIsIHtcbiAgICBoYW5kbGVyOiBoYW5kbGVyXG4gIH0pO1xuXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVCaW5kaW5nSW50ZXJtZWRpYXRlSGFuZGxlcihvYmplY3QpIHtcbiAgY29uc3QgYmluZGluZ0ludGVybWVkaWF0ZUhhbmRsZXIgPSBmdW5jdGlvbihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlci5jYWxsKG9iamVjdCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xuICB9O1xuXG4gIHJldHVybiBiaW5kaW5nSW50ZXJtZWRpYXRlSGFuZGxlcjtcbn1cblxuZnVuY3Rpb24gaW5kZXhPZkV2ZW50TGlzdGVuZXIoZXZlbnRMaXN0ZW5lcnMsIGhhbmRsZXIpIHtcbiAgbGV0IGZvdW5kSW5kZXggPSB1bmRlZmluZWQ7IC8vL1xuXG4gIGV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRMaXN0ZW5lciwgaW5kZXgpIHtcbiAgICBpZiAoZXZlbnRMaXN0ZW5lci5oYW5kbGVyID09PSBoYW5kbGVyKSB7ICAvLy9cbiAgICAgIGZvdW5kSW5kZXggPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGluZGV4ID0gZm91bmRJbmRleDsgLy8vXG5cbiAgcmV0dXJuIGluZGV4O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4uL3RleHRFbGVtZW50Jyk7XG5cbmZ1bmN0aW9uIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHtcbiAgY29uc3QgcGFyZW50Q29udGV4dCA9IHRoaXMucGFyZW50Q29udGV4dCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQ7XG5cbiAgaWYgKHBhcmVudENvbnRleHQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICghcGFyZW50RWxlbWVudC5oYXNPd25Qcm9wZXJ0eSgnY29udGV4dCcpKSB7XG4gICAgICBjb25zdCBjb250ZXh0ID0ge307XG5cbiAgICAgIE9iamVjdC5hc3NpZ24ocGFyZW50RWxlbWVudCwge1xuICAgICAgICBjb250ZXh0OiBjb250ZXh0XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXJlbnRFbGVtZW50LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKHBhcmVudEVsZW1lbnQuY29udGV4dCwgcGFyZW50Q29udGV4dCk7XG4gIH1cblxuICBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7XG4gIHBhcmVudEVsZW1lbnQucmVtb3ZlKHRoaXMpO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Db250ZXh0KG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5jb250ZXh0KSwgdGhlbkRlbGV0ZSA9IHRydWUpIHtcbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmNvbnRleHRbbmFtZV0sXG4gICAgICAgICAgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgbmFtZSwgZGVzY3JpcHRvcik7XG5cbiAgICBpZiAodGhlbkRlbGV0ZSkge1xuICAgICAgZGVsZXRlIHRoaXMuY29udGV4dFtuYW1lXTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzID0ge30sIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcykge1xuICBhc3NpZ24ocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKHRoaXMsIHByb3BlcnRpZXMpO1xuXG4gIHVuYXNzaWduKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpO1xuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChpc0hhbmRsZXJOYW1lKG5hbWUpKSB7XG4gICAgICBhZGRIYW5kbGVyKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzQXR0cmlidXRlTmFtZShuYW1lKSkge1xuICAgICAgYWRkQXR0cmlidXRlKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KCdwcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BlcnRpZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcblxuICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpczsgLy8vXG5cbiAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIGNoaWxkRWxlbWVudC5hcHBlbmRUbyhwYXJlbnRFbGVtZW50KTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcGVydGllcygpIHtcbiAgcmV0dXJuIHRoaXMucHJvcGVydGllcztcbn1cblxuZnVuY3Rpb24gZ2V0Q29udGV4dCgpIHtcbiAgcmV0dXJuIHRoaXMuY29udGV4dDtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG4gIHJldHVybiB0aGlzLnN0YXRlO1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0ZShzdGF0ZSkge1xuICB0aGlzLnN0YXRlID0gc3RhdGU7XG59XG5cbmNvbnN0IGpzeE1peGluID0ge1xuICBhcHBlbmRUbzogYXBwZW5kVG8sXG4gIHJlbW92ZUZyb206IHJlbW92ZUZyb20sXG4gIGFzc2lnbkNvbnRleHQ6IGFzc2lnbkNvbnRleHQsXG4gIGFwcGx5UHJvcGVydGllczogYXBwbHlQcm9wZXJ0aWVzLFxuICBnZXRQcm9wZXJ0aWVzOiBnZXRQcm9wZXJ0aWVzLFxuICBnZXRDb250ZXh0OiBnZXRDb250ZXh0LFxuICBnZXRTdGF0ZTogZ2V0U3RhdGUsXG4gIHNldFN0YXRlOiBzZXRTdGF0ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBqc3hNaXhpbjtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gZWxlbWVudC5jaGlsZEVsZW1lbnRzID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY2hpbGRFbGVtZW50cztcblxuICBjaGlsZEVsZW1lbnRzID0gKGNoaWxkRWxlbWVudHMgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICgoY2hpbGRFbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudHMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoaWxkRWxlbWVudHNdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuXG4gIGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjaGlsZEVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBjaGlsZEVsZW1lbnQgPSB0ZXh0RWxlbWVudDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIHVuYXNzaWduKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzID0gW10pIHtcbiAgY29uc3QgaWdub3JlZFByb3BlcnR5TmFtZXMgPSBpZ25vcmVkUHJvcGVydGllczsgLy8vXG5cbiAgaWdub3JlZFByb3BlcnR5TmFtZXMuZm9yRWFjaChmdW5jdGlvbihpZ25vcmVkUHJvcGVydHlOYW1lKSB7XG4gICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoaWdub3JlZFByb3BlcnR5TmFtZSkpIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2lnbm9yZWRQcm9wZXJ0eU5hbWVdO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbihwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyA9IHt9KSB7XG4gIGNvbnN0IGRlZmF1bHRQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmtleXMoZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGRlZmF1bHRQcm9wZXJ0eU5hbWVzLmZvckVhY2goZnVuY3Rpb24oZGVmYXVsdFByb3BlcnR5TmFtZSkge1xuICAgIGlmICghcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShkZWZhdWx0UHJvcGVydHlOYW1lKSkge1xuICAgICAgY29uc3QgZGVmYXVsdFByb3BlcnR5VmFsdWUgPSBkZWZhdWx0UHJvcGVydGllc1tkZWZhdWx0UHJvcGVydHlOYW1lXTtcblxuICAgICAgcHJvcGVydGllc1tkZWZhdWx0UHJvcGVydHlOYW1lXSA9IGRlZmF1bHRQcm9wZXJ0eVZhbHVlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgIG5hbWUgPSAnY2xhc3MnO1xuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdodG1sRm9yJykge1xuICAgIG5hbWUgPSAnZm9yJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBlbGVtZW50LmRvbUVsZW1lbnRbbmFtZV1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBuYW1lOyAvLy9cblxuICAgICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYW5kbGVyTmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lLm1hdGNoKC9eb24vKTtcbn1cblxuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBhdHRyaWJ1dGVOYW1lcyA9IFtcbiAgJ2FjY2VwdCcsICdhY2NlcHRDaGFyc2V0JywgJ2FjY2Vzc0tleScsICdhY3Rpb24nLCAnYWxsb3dGdWxsU2NyZWVuJywgJ2FsbG93VHJhbnNwYXJlbmN5JywgJ2FsdCcsICdhc3luYycsICdhdXRvQ29tcGxldGUnLCAnYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JyxcbiAgJ2NhcHR1cmUnLCAnY2VsbFBhZGRpbmcnLCAnY2VsbFNwYWNpbmcnLCAnY2hhbGxlbmdlJywgJ2NoYXJTZXQnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzSUQnLCAnY2xhc3NOYW1lJywgJ2NvbFNwYW4nLCAnY29scycsICdjb250ZW50JywgJ2NvbnRlbnRFZGl0YWJsZScsICdjb250ZXh0TWVudScsICdjb250cm9scycsICdjb29yZHMnLCAnY3Jvc3NPcmlnaW4nLFxuICAnZGF0YScsICdkYXRlVGltZScsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2RpcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLFxuICAnZW5jVHlwZScsXG4gICdmb3JtJywgJ2Zvcm1BY3Rpb24nLCAnZm9ybUVuY1R5cGUnLCAnZm9ybU1ldGhvZCcsICdmb3JtTm9WYWxpZGF0ZScsICdmb3JtVGFyZ2V0JywgJ2ZyYW1lQm9yZGVyJyxcbiAgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZkxhbmcnLCAnaHRtbEZvcicsICdodHRwRXF1aXYnLFxuICAnaWNvbicsICdpZCcsICdpbnB1dE1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzJyxcbiAgJ2tleVBhcmFtcycsICdrZXlUeXBlJywgJ2tpbmQnLFxuICAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvb3AnLCAnbG93JyxcbiAgJ21hbmlmZXN0JywgJ21hcmdpbkhlaWdodCcsICdtYXJnaW5XaWR0aCcsICdtYXgnLCAnbWF4TGVuZ3RoJywgJ21lZGlhJywgJ21lZGlhR3JvdXAnLCAnbWV0aG9kJywgJ21pbicsICdtaW5MZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLFxuICAnbmFtZScsICdub1ZhbGlkYXRlJywgJ25vbmNlJyxcbiAgJ29wZW4nLCAnb3B0aW11bScsXG4gICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3Byb2ZpbGUnLFxuICAncmFkaW9Hcm91cCcsICdyZWFkT25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dTcGFuJywgJ3Jvd3MnLFxuICAnc2FuZGJveCcsICdzY29wZScsICdzY29wZWQnLCAnc2Nyb2xsaW5nJywgJ3NlYW1sZXNzJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcGVsbENoZWNrJywgJ3NyYycsICdzcmNEb2MnLCAnc3JjTGFuZycsICdzcmNTZXQnLCAnc3RhcnQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JyxcbiAgJ3RhYkluZGV4JywgJ3RhcmdldCcsICd0aXRsZScsICd0eXBlJyxcbiAgJ3VzZU1hcCcsXG4gICd2YWx1ZScsXG4gICd3aWR0aCcsXG4gICd3bW9kZScsXG4gICd3cmFwJ1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25LZXlVcChoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbigna2V5dXAnLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25LZXlEb3duKGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdrZXlkb3duJywgaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZktleVVwKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ2tleXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmS2V5RG93bihoYW5kbGVyKSB7IHRoaXMub2ZmKCdrZXlkb3duJywgaGFuZGxlcik7IH1cblxuY29uc3Qga2V5TWl4aW4gPSB7XG4gIG9uS2V5VXA6IG9uS2V5VXAsXG4gIG9uS2V5RG93bjogb25LZXlEb3duLFxuICBvZmZLZXlVcDogb2ZmS2V5VXAsXG4gIG9mZktleURvd246IG9mZktleURvd25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoa2V5Q29kZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbk1vdXNlVXAoaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNldXAnLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZURvd24oaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlZG93bicsIGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3ZlcihoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VPdXQoaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlb3V0JywgaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBoYW5kbGVyLCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmTW91c2VVcChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VEb3duKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ21vdXNlZG93bicsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW92ZXInLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU91dChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlTW92ZShoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW1vdmUnLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBtb3VzZU1peGluID0ge1xuICBvbk1vdXNlVXA6IG9uTW91c2VVcCxcbiAgb25Nb3VzZURvd246IG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlOiBvbk1vdXNlTW92ZSxcbiAgb2ZmTW91c2VVcDogb2ZmTW91c2VVcCxcbiAgb2ZmTW91c2VEb3duOiBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3Zlcjogb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dDogb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZTogb2ZmTW91c2VNb3ZlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdXNlTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbiwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG4gIGlmIChhZGRFdmVudExpc3RlbmVyKSB7XG4gICAgYXBwZW5kUmVzaXplT2JqZWN0KHRoaXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZlJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyID0gdGhpcy5vZmYoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdCh0aGlzKTtcbiAgfVxufVxuXG5jb25zdCByZXNpemVNaXhpbiA9IHtcbiAgb25SZXNpemU6IG9uUmVzaXplLFxuICBvZmZSZXNpemU6IG9mZlJlc2l6ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemVNaXhpbjtcblxuZnVuY3Rpb24gYXBwZW5kUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHN0eWxlID0gYGRpc3BsYXk6IGJsb2NrOyBcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyBcbiAgICAgICAgICAgICAgICAgdG9wOiAwOyBcbiAgICAgICAgICAgICAgICAgbGVmdDogMDsgXG4gICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsgXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgXG4gICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyBcbiAgICAgICAgICAgICAgICAgei1pbmRleDogLTE7YDtcblxuICByZXNpemVPYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgcmVzaXplT2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICByZXNpemVPYmplY3QudHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyA9IHJlc2l6ZU9iamVjdDtcblxuICByZXNpemVPYmplY3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudClcbiAgfTtcblxuICBkb21FbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVMaXN0ZW5lcik7XG5cbiAgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZXNpemVPYmplY3RMb2FkSGFuZGxlcihlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgcmVzaXplT2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIHJlc2l6ZU9iamVjdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcihlbGVtZW50KSB7XG4gIGNvbnN0IHdpZHRoID0gZWxlbWVudC5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSBlbGVtZW50LmdldEhlaWdodCgpLFxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIGhhbmRsZXJzID0gZWxlbWVudC5oYW5kbGVyc01hcFsncmVzaXplJ107XG5cbiAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKXtcbiAgICBoYW5kbGVyKHdpZHRoLCBoZWlnaHQsIHRhcmdldEVsZW1lbnQpO1xuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25TY3JvbGwoaGFuZGxlciwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ3Njcm9sbCcsIGhhbmRsZXIsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZTY3JvbGwoaGFuZGxlcikgeyB0aGlzLm9mZignc2Nyb2xsJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcDsgfVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQ7IH1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wOyB9XG5cbmZ1bmN0aW9uIHNldFNjcm9sbExlZnQoc2Nyb2xsTGVmdCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7IH1cblxuY29uc3Qgc2Nyb2xsTWl4aW4gPSB7XG4gIG9uU2Nyb2xsOiBvblNjcm9sbCxcbiAgb2ZmU2Nyb2xsOiBvZmZTY3JvbGwsXG4gIGdldFNjcm9sbFRvcDogZ2V0U2Nyb2xsVG9wLFxuICBnZXRTY3JvbGxMZWZ0OiBnZXRTY3JvbGxMZWZ0LFxuICBzZXRTY3JvbGxUb3A6IHNldFNjcm9sbFRvcCxcbiAgc2V0U2Nyb2xsTGVmdDogc2V0U2Nyb2xsTGVmdFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY3JvbGxNaXhpbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3Qgc2Nyb2xsVG9wID0gdGFyZ2V0RWxlbWVudC5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgc2Nyb2xsTGVmdCA9IHRhcmdldEVsZW1lbnQuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoc2Nyb2xsVG9wLCBzY3JvbGxMZWZ0LCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKSxcbiAgICAgIFRleHRFbGVtZW50ID0gcmVxdWlyZSgnLi90ZXh0RWxlbWVudCcpO1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KGZpcnN0QXJndW1lbnQsIHByb3BlcnRpZXMsIC4uLmNoaWxkQXJndW1lbnRzKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcblxuICBpZiAoZmlyc3RBcmd1bWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tQ2hpbGRBcmd1bWVudHMoY2hpbGRBcmd1bWVudHMpO1xuXG4gICAgcHJvcGVydGllcyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgY2hpbGRFbGVtZW50czogY2hpbGRFbGVtZW50c1xuICAgIH0sIHByb3BlcnRpZXMpO1xuXG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKGlzVHlwZU9mKGZpcnN0QXJndW1lbnQsIEVsZW1lbnQpKSB7XG4gICAgICBjb25zdCBDbGFzcyA9IGZpcnN0QXJndW1lbnQ7ICAvLy9cblxuICAgICAgZWxlbWVudCA9IENsYXNzLmZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnRGdW5jdGlvbiA9IGZpcnN0QXJndW1lbnQ7ICAvLy9cblxuICAgICAgZWxlbWVudCA9IGVsZW1lbnRGdW5jdGlvbihwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGFnTmFtZSA9IGZpcnN0QXJndW1lbnQsICAvLy9cbiAgICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0gLz5gO1xuXG4gICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tSFRNTChFbGVtZW50LCBodG1sKTtcblxuICAgICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbmNvbnN0IFJlYWN0ID0ge1xuICBjcmVhdGVFbGVtZW50OiBjcmVhdGVFbGVtZW50XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0O1xuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUNoaWxkQXJndW1lbnRzKGNoaWxkQXJndW1lbnRzKSB7XG4gIGNoaWxkQXJndW1lbnRzID0gY2hpbGRBcmd1bWVudHMucmVkdWNlKGZ1bmN0aW9uKGNoaWxkQXJndW1lbnRzLCBjaGlsZEFyZ3VtZW50KSB7XG4gICAgY2hpbGRBcmd1bWVudHMgPSBjaGlsZEFyZ3VtZW50cy5jb25jYXQoY2hpbGRBcmd1bWVudCk7XG5cbiAgICByZXR1cm4gY2hpbGRBcmd1bWVudHM7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjaGlsZEVsZW1lbnRzID0gY2hpbGRBcmd1bWVudHMubWFwKGZ1bmN0aW9uKGNoaWxkQXJndW1lbnQpIHtcbiAgICBsZXQgY2hpbGRFbGVtZW50O1xuICAgIFxuICAgIGlmICh0eXBlb2YgY2hpbGRBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjaGlsZEFyZ3VtZW50LCAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBjaGlsZEVsZW1lbnQgPSB0ZXh0RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2hpbGRFbGVtZW50ID0gY2hpbGRBcmd1bWVudDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnQ7XG4gIH0pO1xuXG4gIHJldHVybiBjaGlsZEVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBpc1R5cGVPZihhcmd1bWVudCwgQ2xhc3MpIHtcbiAgbGV0IHR5cGVPZiA9IGZhbHNlO1xuXG4gIGlmIChhcmd1bWVudC5uYW1lID09PSBDbGFzcy5uYW1lKSB7IC8vL1xuICAgIHR5cGVPZiA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgYXJndW1lbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXJndW1lbnQpOyAvLy9cblxuICAgIGlmIChhcmd1bWVudCkge1xuICAgICAgdHlwZU9mID0gaXNUeXBlT2YoYXJndW1lbnQsIENsYXNzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZU9mO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2Mvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2MvYm91bmRzJyk7XG5cbmNsYXNzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpOyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIFRleHRFbGVtZW50LmNsb25lKHRoaXMpOyB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlLFxuICAgICAgICAgIHRleHQgPSBub2RlVmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBzZXRUZXh0KHRleHQpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0ZXh0OyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBnZXRIZWlnaHQoKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgcmVtb3ZlRnJvbShwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucmVtb3ZlKHRoaXMpOyB9XG5cbiAgaW5zZXJ0QmVmb3JlKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50KTtcbiAgfVxuXG4gIGluc2VydEFmdGVyKHNpYmxpbmdFbGVtZW50KSB7XG4gICAgY29uc3QgcGFyZW50RE9NTm9kZSA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQucGFyZW50Tm9kZSxcbiAgICAgICAgICBzaWJsaW5nRE9NRWxlbWVudCA9IHNpYmxpbmdFbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICBwYXJlbnRET01Ob2RlLmluc2VydEJlZm9yZSh0aGlzLmRvbUVsZW1lbnQsIHNpYmxpbmdET01FbGVtZW50Lm5leHRTaWJsaW5nKTsgIC8vL1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRFbGVtZW50O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICBrZXlNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4va2V5Jyk7XG5cbmNsYXNzIFdpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IHdpbmRvdztcbiAgfVxuXG4gIGFzc2lnbiguLi5zb3VyY2VzKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5kb21FbGVtZW50OyAvLy9cblxuICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCAuLi5zb3VyY2VzKTtcbiAgfVxuICBcbiAgZ2V0V2lkdGgoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJXaWR0aDsgfSAvLy9cbiAgXG4gIGdldEhlaWdodCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5pbm5lckhlaWdodDsgfSAvLy9cblxuICBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVlPZmZzZXQ7IH0gIC8vL1xuXG4gIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQucGFnZVhPZmZzZXQ7IH0gLy8vXG5cbiAgb25SZXNpemUoaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZVJlc2l6ZUhhbmRsZXI7XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG4gICAgXG4gICAgdGhpcy5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmUmVzaXplKGhhbmRsZXIpIHtcbiAgICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcblxuICAgIHRoaXMub2ZmKGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgY2xpY2tNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBrZXlNaXhpbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IFdpbmRvdygpOyAgLy8vXG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IHdpbmRvdyA9IHRhcmdldEVsZW1lbnQsIC8vL1xuICAgICAgICB3aWR0aCA9IHdpbmRvdy5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSB0YXJnZXRFbGVtZW50LmdldEhlaWdodCgpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIod2lkdGgsIGhlaWdodCwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIl19
