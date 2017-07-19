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

var options = require('./options'),
    arrayUtil = require('./util/array');

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
        var lastDraggableEntry = arrayUtil.last(draggableEntries),
            firstDraggableEntry = arrayUtil.first(draggableEntries),
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
            var pathMap = find(pathMaps, function (pathMap) {
              var sourcePath = pathMap['sourcePath'],
                  found = sourcePath === draggableEntryPath;

              return found;
            }),
                _sourcePath = pathMap['sourcePath'],
                _targetPath = pathMap['targetPath'];

            this.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);
          }
        }.bind(this));

        done();
      }.bind(this));
    }
  }, {
    key: 'moveDraggableEntry',
    value: function moveDraggableEntry(draggableEntry, sourcePath, targetPath) {
      var draggableEntryDirectory = draggableEntry.isDirectory();

      if (draggableEntryDirectory) {
        var directory = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        targetDirectoryPath = targetPath;

        this.moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var file = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath; ///

        this.moveFile(file, sourceFilePath, targetFilePath);
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
    }
  });

  return element;
}

},{"./options":14,"./util/array":16,"easy":19}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('./options'),
    pathUtil = require('./util/path'),
    arrayUtil = require('./util/array'),
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
    key: 'getFilePaths',
    value: function getFilePaths() {
      return this.rootDirectory.getFilePaths();
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
          draggableEntryPathTopmostDirectoryName = pathUtil.isPathTopmostDirectoryName(draggableEntryPath);

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
          draggableEntryPathWithoutBottommostName = pathUtil.pathWithoutBottommostName(draggableEntryPath),
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
    value: function moveFile(file, sourceFilePath, targetFilePath) {
      var explorer = file.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFile(filePath);

        filePath = targetFilePath; ///

        this.addFile(filePath);
      }
    }
  }, {
    key: 'moveDirectory',
    value: function moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
      var explorer = directory.getExplorer();

      var directoryPath = void 0;

      if (targetDirectoryPath === sourceDirectoryPath) {} else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);

        var collapsed = directory.isCollapsed();

        directoryPath = targetDirectoryPath; ///

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
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

        return pathMap;
      });

      return pathMaps;
    }
  }, {
    key: 'childElements',
    value: function childElements(properties) {
      var rootDirectoryName = properties.rootDirectoryName,
          rootDirectoryCollapsed = properties.rootDirectoryCollapsed,
          name = rootDirectoryName,
          collapsed = rootDirectoryCollapsed,
          explorer = this,
          rootDirectory = React.createElement(RootDirectory, { name: name, explorer: explorer, collapsed: collapsed });


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
  ignoredProperties: ['rootDirectoryName', 'rootDirectoryCollapsed', 'onOpen', 'onMove', 'options']
});

module.exports = Explorer;

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryDirectory = draggableEntry.isDirectory(),
      directory = draggableEntryDirectory; ///

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
  draggableEntryPath = targetPath + '/' + draggableEntryPath;

  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, '\\(').replace(/\)/g, '\\)'); ///

  var regExp = new RegExp('^' + sourcePath + '(.*$)'),
      matches = draggableEntryPath.match(regExp),
      secondMatch = arrayUtil.second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}

},{"./dropTarget":2,"./explorer/draggableEntry/directory/root":6,"./explorer/entry/marker/directory":11,"./options":14,"./util/array":16,"./util/path":18,"easy":19}],4:[function(require,module,exports){
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

},{"../options":14,"./nameButton":13,"easy":19}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    Entries = require('../entries'),
    pathUtil = require('../../util/path'),
    DraggableEntry = require('../draggableEntry');

var Button = easy.Button,
    React = easy.React;

var Directory = function (_DraggableEntry) {
  _inherits(Directory, _DraggableEntry);

  function Directory(selector, name, explorer) {
    _classCallCheck(this, Directory);

    var type = Entry.types.DIRECTORY;

    var _this = _possibleConstructorReturn(this, (Directory.__proto__ || Object.getPrototypeOf(Directory)).call(this, selector, name, explorer, type));

    var entries = React.createElement(Entries, { Directory: Directory }),
        toggleButton = React.createElement(Button, { className: 'toggle', onClick: _this.toggleButtonClickHandler.bind(_this) });

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
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

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
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

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
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
      var topmostDirectoryName = pathUtil.topmostDirectoryName(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarker(markerName, draggableEntryType);
      } else {
        var topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(markerPath);

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

      var topmostDirectoryName = pathUtil.topmostDirectoryName(path);

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
          explorer = _properties.explorer,
          collapsed = _properties.collapsed;


      var directory = DraggableEntry.fromProperties(Class, properties, name, explorer);

      collapsed ? ///
      directory.collapse() : directory.expand();

      return directory;
    }
  }]);

  return Directory;
}(DraggableEntry);

Object.assign(Directory, {
  defaultProperties: {
    className: 'directory'
  },
  ignoredProperties: ['name', 'explorer', 'collapsed']
});

module.exports = Directory;

},{"../../util/path":18,"../draggableEntry":4,"../entries":8,"../entry":9,"easy":19}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = require('../../../options'),
    pathUtil = require('../../../util/path'),
    Directory = require('../directory');

var RootDirectory = function (_Directory) {
  _inherits(RootDirectory, _Directory);

  function RootDirectory() {
    _classCallCheck(this, RootDirectory);

    return _possibleConstructorReturn(this, (RootDirectory.__proto__ || Object.getPrototypeOf(RootDirectory)).apply(this, arguments));
  }

  _createClass(RootDirectory, [{
    key: 'get',
    value: function get() {
      return this; ///
    }
  }, {
    key: 'isRootDirectory',
    value: function isRootDirectory() {
      return true;
    }
  }, {
    key: 'addFile',
    value: function addFile(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'addDirectory',
    value: function addDirectory(directoryPath, collapsed) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addDirectory', this).call(this, directoryPathWithoutRootDirectoryName, collapsed);
      }
    }
  }, {
    key: 'removeFile',
    value: function removeFile(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'removeFile', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectory',
    value: function removeDirectory(directoryPath) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(directoryPath);

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
      var markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryName(markerPath);

      _get(RootDirectory.prototype.__proto__ || Object.getPrototypeOf(RootDirectory.prototype), 'addMarker', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        addFile: this.addFile.bind(this),
        removeFile: this.removeFile.bind(this),
        addDirectory: this.addDirectory.bind(this),
        removeDirectory: this.removeDirectory.bind(this),
        getMarkedDirectory: this.getMarkedDirectory.bind(this),
        getDraggableEntryPath: this.getDraggableEntryPath.bind(this),
        getDirectoryOverlappingDraggableEntry: this.getDirectoryOverlappingDraggableEntry.bind(this),
        addRootDirectoryMarker: this.addMarker.bind(this), ///
        removeRootDirectoryMarker: this.removeMarker.bind(this), ///
        isRootDirectoryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        getRootDirectory: this.get.bind(this), ///
        getFilePaths: this.getFilePaths.bind(this)
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

},{"../../../options":14,"../../../util/path":18,"../directory":5}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry'),
    nameUtil = require('../../util/name'),
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

          before = nameIsBeforeEntryName(name, entryName);
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

function nameIsBeforeEntryName(name, entryName) {
  var before = name.localeCompare(entryName) < 0;

  var nameExtension = nameUtil.extensionFromName(name),
      entryNameExtension = nameUtil.extensionFromName(entryName),
      nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
      entryNameWithoutExtension = nameUTil.nameWithoutExtensionFromName(entryName),
      nameExtensionPresent = nameExtension !== null,
      entryNameExtensionPresent = entryNameExtension !== null,
      nameWithoutExtensionMissing = nameWithoutExtension === null,
      entryNameWithoutExtensionMissing = entryNameWithoutExtension === null,
      extensionsBothPresent = nameExtensionPresent && entryNameExtensionPresent,
      namesWithoutExtensionsBothMissing = nameWithoutExtensionMissing && entryNameWithoutExtensionMissing;

  if (namesWithoutExtensionsBothMissing) {
    ///
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

},{"../../util/name":17,"../draggableEntry":4,"../entry":9}],8:[function(require,module,exports){
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
          directory = React.createElement(this.Directory, { name: name, explorer: explorer, collapsed: collapsed }),
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
        }
      });

      if (draggableEntryPath === null) {
        this.someDirectory(function (directory) {
          var directoryDraggableEntryPath = directory.getDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
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
          var result = callback(entry);

          return result;
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

},{"../options":14,"./draggableEntry/file":7,"./entry":9,"./entry/marker/directory":11,"./entry/marker/file":12,"easy":19}],9:[function(require,module,exports){
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

},{"./nameButton":13,"easy":19}],10:[function(require,module,exports){
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

var arrayUtil = require('../util/array');

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
          firstChildElement = arrayUtil.first(childElements),
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
          firstChildElement = arrayUtil.first(childElements);

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

},{"../util/array":16,"easy":19}],14:[function(require,module,exports){
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

  function RubbishBin(selector, removeHandler) {
    _classCallCheck(this, RubbishBin);

    var moveHandler = removeHandler; ///

    var _this = _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, moveHandler));

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
    value: function moveDirectory(directory, sourceDirectoryPath, targetDirectoryPath) {
      if (targetDirectoryPath === null) {
        var explorer = directory.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectory(directoryPath);
      }
    }
  }, {
    key: 'moveFile',
    value: function moveFile(file, sourceFilePath, targetFilePath) {
      if (targetFilePath === null) {
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
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

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

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  var draggableEntryPath = draggableEntry.getPath(),
      draggableEntryDirectory = draggableEntry.isDirectory(),
      directory = draggableEntryDirectory; ///

  targetPath = null; ///

  sourcePath = draggableEntryPath; ///

  var pathMap = {
    sourcePath: sourcePath,
    targetPath: targetPath,
    directory: directory
  };

  return pathMap;
}

},{"./dropTarget":2,"easy":19}],16:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = function () {
  function arrayUtil() {
    _classCallCheck(this, arrayUtil);
  }

  _createClass(arrayUtil, null, [{
    key: 'first',
    value: function first(array) {
      return array[0];
    }
  }, {
    key: 'second',
    value: function second(array) {
      return array[1];
    }
  }, {
    key: 'last',
    value: function last(array) {
      return array[array.length - 1];
    }
  }]);

  return arrayUtil;
}();

module.exports = arrayUtil;

},{}],17:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = require('../util/array');

var nameUtil = function () {
  function nameUtil() {
    _classCallCheck(this, nameUtil);
  }

  _createClass(nameUtil, null, [{
    key: 'extensionFromName',
    value: function extensionFromName(name) {
      var extension = null;

      var matches = name.match(/^.*\.([^.]+)$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        extension = secondMatch; ///
      }

      return extension;
    }
  }, {
    key: 'nameWithoutExtensionFromName',
    value: function nameWithoutExtensionFromName(name) {
      var nameWithoutExtension = null;

      var matches = name.match(/^(.+)\.[^.]+$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        nameWithoutExtension = secondMatch; ///
      }

      return nameWithoutExtension;
    }
  }]);

  return nameUtil;
}();

module.exports = nameUtil;

},{"../util/array":16}],18:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var arrayUtil = require('../util/array');

var pathUtil = function () {
  function pathUtil() {
    _classCallCheck(this, pathUtil);
  }

  _createClass(pathUtil, null, [{
    key: 'isPathTopmostDirectoryName',
    value: function isPathTopmostDirectoryName(path) {
      var topmostDirectoryName = pathUtil.topmostDirectoryName(path),
          pathTopmostDirectoryName = topmostDirectoryName === null; ///

      return pathTopmostDirectoryName;
    }
  }, {
    key: 'bottommostName',
    value: function bottommostName(path) {
      var bottommostName = null;

      var matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

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
        var secondMatch = arrayUtil.second(matches);

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
        var secondMatch = arrayUtil.second(matches);

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
        var secondMatch = arrayUtil.second(matches);

        pathWithoutTopmostDirectoryName = secondMatch;
      }

      return pathWithoutTopmostDirectoryName;
    }
  }]);

  return pathUtil;
}();

module.exports = pathUtil;

},{"../util/array":16}],19:[function(require,module,exports){
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

},{"./lib/document":20,"./lib/element":21,"./lib/element/body":22,"./lib/element/button":23,"./lib/element/checkbox":24,"./lib/element/div":25,"./lib/element/link":26,"./lib/element/select":27,"./lib/element/span":28,"./lib/inputElement":29,"./lib/inputElement/input":30,"./lib/inputElement/textarea":31,"./lib/misc/bounds":32,"./lib/misc/offset":33,"./lib/react":41,"./lib/textElement":42,"./lib/window":43}],20:[function(require,module,exports){
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

},{"./mixin/click":34,"./mixin/event":35,"./mixin/key":37,"./mixin/mouse":38}],21:[function(require,module,exports){
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

},{"./misc/bounds":32,"./misc/offset":33,"./mixin/click":34,"./mixin/event":35,"./mixin/jsx":36,"./mixin/key":37,"./mixin/mouse":38,"./mixin/resize":39,"./mixin/scroll":40}],22:[function(require,module,exports){
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

},{"../element":21}],23:[function(require,module,exports){
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

function defaultIntermediateClickHandler(handler, event, targetElement) {
  var mouseButton = event.button,
      preventDefault = handler(mouseButton, targetElement);

  return preventDefault;
}

},{"../element":21}],24:[function(require,module,exports){
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

function defaultIntermediateChangeHandler(handler, event, targetElement) {
  var checked = this.isChecked(),
      preventDefault = handler(checked, targetElement);

  return preventDefault;
}

},{"../element":21}],25:[function(require,module,exports){
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

},{"../element":21}],26:[function(require,module,exports){
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

function defaultIntermediateClickHandler(handler, event, targetElement) {
  var href = this.getAttribute('href'),
      preventDefault = handler(href, targetElement);

  return preventDefault;
}

},{"../element":21}],27:[function(require,module,exports){
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

function defaultIntermediateChangeHandler(handler, event, targetElement) {
  var selectedOptionValue = this.getSelectedOptionValue(),
      preventDefault = handler(selectedOptionValue, targetElement);

  return preventDefault;
}

},{"../element":21}],28:[function(require,module,exports){
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

},{"../element":21}],29:[function(require,module,exports){
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

function defaultIntermediateChangeHandler(handler, event, targetElement) {
  var value = this.getValue(),
      preventDefault = handler(value, targetElement);

  return preventDefault;
}

},{"./element":21}],30:[function(require,module,exports){
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

},{"../inputElement":29}],31:[function(require,module,exports){
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

},{"../inputElement":29}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
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

},{}],35:[function(require,module,exports){
'use strict';

function on(eventTypes, handler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    onEvent(this, eventType, handler);
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

function onEvent(element, eventType, handler) {
  if (element.eventObjectMap === undefined) {
    element.eventObjectMap = {};
  }

  var eventObject = element.eventObjectMap[eventType];

  if (!eventObject) {
    eventObject = createEventObject();

    eventObject.addEventListener(element, eventType);

    element.eventObjectMap[eventType] = eventObject;
  }

  eventObject.addHandler(handler);
}

function offEvent(element, eventType, handler) {
  var eventObject = element.eventObjectMap[eventType];

  var empty = eventObject.removeHandler(handler);

  if (empty) {
    eventObject.removeEventListener(element, eventType);

    delete element.eventObjectMap[eventType];
  }

  var eventTypes = Object.keys(element.eventObjectMap);

  if (eventTypes.length === 0) {
    delete element.eventObjectMap;
  }
}

function createEventObject() {
  var handlers = [];

  function eventListener(event) {
    var eventTarget = event.target,
        targetElement = eventTarget.__element__; ///

    var preventEventDefault = false;

    handlers.forEach(function (handler) {
      if (handler.intermediateHandler !== undefined) {
        var preventDefault = handler.intermediateHandler(handler, event, targetElement);

        if (preventDefault === true) {
          preventEventDefault = true;
        }
      } else {
        var _preventDefault = handler(event, targetElement);

        if (_preventDefault === true) {
          preventEventDefault = true;
        }
      }
    });

    if (preventEventDefault) {
      event.preventDefault();
    }

    event.stopPropagation();
  }

  function addHandler(handler) {
    handlers.push(handler);
  }

  function removeHandler() {
    var handler = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (handler === null) {
      var start = 0;

      handlers.splice(start);
    } else {
      var index = handlers.indexOf(handler);

      if (index > -1) {
        var _start = index,
            ///
        deleteCount = 1;

        handlers.splice(_start, deleteCount);
      }
    }

    var empty = handlers.length === 0;

    return empty;
  }

  function addEventListener(element, eventType) {
    element.domElement.addEventListener(eventType, eventListener);
  }

  function removeEventListener(element, eventType) {
    element.domElement.removeEventListener(eventType, eventListener);
  }

  return {
    addHandler: addHandler,
    removeHandler: removeHandler,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
  };
}

},{}],36:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TextElement = require('../textElement');

function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  assign(properties, defaultProperties);

  var childElements = childElementsFromElementAndProperties(this, properties);

  unassign(properties, ignoredProperties);

  this.properties = {};

  var names = Object.keys(properties);

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {} else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      this.properties[name] = value;
    }
  }.bind(this));

  var parentElement = this; ///

  childElements.forEach(function (childElement) {
    childElement.appendTo(parentElement);
  }.bind(this));
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

function appendTo(parentElement) {
  this.context = Object.assign({}, this.context);

  var parentContext = this.parentContext ? this.parentContext() : this.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  parentElement.append(this);
}

var jsxMixin = {
  appendTo: appendTo,
  assignContext: assignContext,
  applyProperties: applyProperties
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

},{"../textElement":42}],37:[function(require,module,exports){
'use strict';

function onKeyUp(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('keyup', handler);
}

function onKeyDown(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('keydown', handler);
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
  var keyCode = event.keyCode || event.which,
      ///
  preventDefault = handler(keyCode, targetElement);

  return preventDefault;
}

},{}],38:[function(require,module,exports){
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

},{}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
'use strict';

function onScroll(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = defaultIntermediateHandler;
  }

  this.on('scroll', handler);
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

function defaultIntermediateHandler(handler) {
  var scrollTop = this.getScrollTop(),
      scrollLeft = this.getScrollLeft(),
      targetElement = this,
      ///
  preventDefault = handler(scrollTop, scrollLeft, targetElement);

  return preventDefault;
}

},{}],41:[function(require,module,exports){
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

},{"./element":21,"./textElement":42}],42:[function(require,module,exports){
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

},{"./misc/bounds":32,"./misc/offset":33}],43:[function(require,module,exports){
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

function defaultIntermediateResizeHandler(handler) {
  var width = this.getWidth(),
      height = this.getHeight(),
      targetElement = this,
      ///
  preventDefault = handler(width, height, targetElement);

  return preventDefault;
}

},{"./mixin/click":34,"./mixin/event":35,"./mixin/key":37,"./mixin/mouse":38}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wVGFyZ2V0LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeS5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3Rvcnkvcm9vdC5qcyIsImVzNi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9maWxlLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyL2ZpbGUuanMiLCJlczYvZXhwbG9yZXIvbmFtZUJ1dHRvbi5qcyIsImVzNi9vcHRpb25zLmpzIiwiZXM2L3J1YmJpc2hCaW4uanMiLCJlczYvdXRpbC9hcnJheS5qcyIsImVzNi91dGlsL25hbWUuanMiLCJlczYvdXRpbC9wYXRoLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2Rpdi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zcGFuLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2lucHV0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9pbnB1dEVsZW1lbnQvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2MvYm91bmRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2Mvb2Zmc2V0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2pzeC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9rZXkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vbW91c2UuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vcmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL3Njcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9yZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi90ZXh0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi93aW5kb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOzs7Ozs7Ozs7O0FBRUEsSUFBTSxPQUFPLFFBQVEsTUFBUixDQUFiOztBQUVBLElBQU0sVUFBVSxRQUFRLFdBQVIsQ0FBaEI7QUFBQSxJQUNNLFlBQVksUUFBUSxjQUFSLENBRGxCOztJQUdRLE8sR0FBWSxJLENBQVosTzs7SUFFRixVOzs7QUFDSixzQkFBWSxRQUFaLEVBQTBFO0FBQUEsUUFBcEQsV0FBb0QsdUVBQXRDLFVBQVMsUUFBVCxF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QUFoQzs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsSUFBSSxNQUFKLEVBQWpCLEMsQ0FBZ0M7O0FBRWhDLFNBQVMsZ0NBQVQsQ0FBMEMsT0FBMUMsRUFBbUQ7QUFDakQsTUFBTSxRQUFRLEtBQUssUUFBTCxFQUFkO0FBQUEsTUFDTSxTQUFTLEtBQUssU0FBTCxFQURmO0FBQUEsTUFFTSxnQkFBZ0IsSUFGdEI7QUFBQSxNQUU0QjtBQUN0QixtQkFBaUIsUUFBUSxLQUFSLEVBQWUsTUFBZixFQUF1QixhQUF2QixDQUh2Qjs7QUFLQSxTQUFPLGNBQVA7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvcHRpb25zOiByZXF1aXJlKCcuL2xpYi9vcHRpb25zJyksXG4gIEV4cGxvcmVyOiByZXF1aXJlKCcuL2xpYi9leHBsb3JlcicpLFxuICBSdWJiaXNoQmluOiByZXF1aXJlKCcuL2xpYi9ydWJiaXNoQmluJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIGFycmF5VXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9hcnJheScpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3k7XG5cbmNsYXNzIERyb3BUYXJnZXQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyID0gZnVuY3Rpb24ocGF0aE1hcHMsIGRvbmUpIHsgZG9uZSgpOyB9KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICAgIFxuICAgIHRoaXMubW92ZUhhbmRsZXIgPSBtb3ZlSGFuZGxlcjtcblxuICAgIHRoaXMuZHJvcFRhcmdldHMgPSBbXTtcbiAgfVxuXG4gIGFkZERyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIHRoaXMuZHJvcFRhcmdldHMucHVzaChkcm9wVGFyZ2V0KTtcbiAgfVxuXG4gIHJlbW92ZURyb3BUYXJnZXQoZHJvcFRhcmdldCkge1xuICAgIGNvbnN0IGluZGV4ID0gaW5kZXhPZih0aGlzLmRyb3BUYXJnZXRzLCBkcm9wVGFyZ2V0KSxcbiAgICAgICAgICBmb3VuZCA9IChpbmRleCAhPT0gLTEpO1xuXG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICB0aGlzLmRyb3BUYXJnZXRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gYm91bmRzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSB7XG4gICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5kcm9wVGFyZ2V0cy5yZWR1Y2UoZnVuY3Rpb24obWFya2VkRHJvcFRhcmdldCwgZHJvcFRhcmdldCkge1xuICAgICAgaWYgKG1hcmtlZERyb3BUYXJnZXQgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgZHJvcFRhcmdldE1hcmtlZCA9IGRyb3BUYXJnZXQuaXNNYXJrZWQoKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0TWFya2VkKSB7XG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXIoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoLCBkb25lKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSB0aGlzLnBhdGhNYXBzRnJvbURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICB0aGlzLm1vdmVIYW5kbGVyKHBhdGhNYXBzLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGxhc3REcmFnZ2FibGVFbnRyeSA9IGFycmF5VXRpbC5sYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGFycmF5VXRpbC5maXJzdChkcmFnZ2FibGVFbnRyaWVzKSxcbiAgICAgICAgICAgIGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3JlciA9IGZpcnN0RHJhZ2dhYmxlRW50cnlFeHBsb3JlciwgLy8vXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBmaW5kKHBhdGhNYXBzLCBmdW5jdGlvbihwYXRoTWFwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2VQYXRoID0gcGF0aE1hcFsnc291cmNlUGF0aCddLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSAoc291cmNlUGF0aCA9PT0gZHJhZ2dhYmxlRW50cnlQYXRoKTtcbiAgXG4gICAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc291cmNlUGF0aCA9IHBhdGhNYXBbJ3NvdXJjZVBhdGgnXSxcbiAgICAgICAgICAgICAgICB0YXJnZXRQYXRoID0gcGF0aE1hcFsndGFyZ2V0UGF0aCddO1xuXG4gICAgICAgICAgdGhpcy5tb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoO1xuXG4gICAgICB0aGlzLm1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGUoZmlsZSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuXG5mdW5jdGlvbiBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gIGxldCBpbmRleCA9IC0xO1xuXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQsIGN1cnJlbnRFbGVtZW50SW5kZXgpIHtcbiAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgIGluZGV4ID0gY3VycmVudEVsZW1lbnRJbmRleDtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaW5kZXg7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGxldCBlbGVtZW50ID0gbnVsbDtcbiAgXG4gIGFycmF5LnNvbWUoZnVuY3Rpb24oY3VycmVudEVsZW1lbnQpIHtcbiAgICBpZiAoY2FsbGJhY2soY3VycmVudEVsZW1lbnQpKSB7XG4gICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG4gICAgICBcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG4gIFxuICByZXR1cm4gZWxlbWVudDsgIFxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9wYXRoJyksXG4gICAgICBhcnJheVV0aWwgPSByZXF1aXJlKCcuL3V0aWwvYXJyYXknKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU1hcmtlciA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeScpLFxuICAgICAgUm9vdERpcmVjdG9yeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5L3Jvb3QnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlNYXJrZXIoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlNYXJrZXIgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gKGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpO1xuXG4gICAgcmV0dXJuIHRvQmVNYXJrZWQ7XG4gIH1cbiAgXG4gIGdldEZpbGVQYXRocygpIHsgcmV0dXJuIHRoaXMucm9vdERpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTsgfVxuXG4gIGFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJQYXRoID0gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeU5hbWU7XG5cbiAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwuaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkUm9vdERpcmVjdG9yeU1hcmtlcihtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH1cbiAgfVxuXG4gIGFkZFRvcG1vc3REaXJlY3RvcnlNYXJrZXIodG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoLCAgLy8vXG4gICAgICAgICAgbmFtZSA9IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lLCAgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TWFya2VyKTtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU1hcmtlcigpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU1hcmtlcikge1xuICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TWFya2VyID0gY2hpbGRFbGVtZW50OyAgLy8vXG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU1hcmtlcjtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXIoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlciA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TWFya2VyKCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlNYXJrZXIucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnREcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBzdGFydGVkRHJhZ2dpbmcgPSAhbWFya2VkO1xuXG4gICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgdGhpcy5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeSA9IG1hcmtlZERyb3BUYXJnZXQuZ2V0TWFya2VkRGlyZWN0b3J5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5UGF0aCA9IChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpLFxuICAgICAgICAgIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUsXG4gICAgICAgICAgdGFyZ2V0UGF0aCA9IG1hcmtlZERpcmVjdG9yeVBhdGgsXG4gICAgICAgICAgdW5tb3ZlZCA9IChzb3VyY2VQYXRoID09PSB0YXJnZXRQYXRoKTtcblxuICAgIGlmIChtYXJrZWQgJiYgdW5tb3ZlZCkge1xuICAgICAgdGhpcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdWJEcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkuZ2V0U3ViRW50cmllcygpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllcyA9IHN1YkRyYWdnYWJsZUVudHJpZXM7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnJldmVyc2UoKTtcbiAgICAgIGRyYWdnYWJsZUVudHJpZXMucHVzaChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQubW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG1hcmtlZERyb3BUYXJnZXQucmVtb3ZlTWFya2VyKCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSB0aGlzLmdldE1hcmtlZERpcmVjdG9yeSgpO1xuXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBpZiAobWFya2VkRGlyZWN0b3J5ICE9PSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IHRoaXMuZ2V0RHJvcFRhcmdldFRvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkLmFkZE1hcmtlcihkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VySW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbW92ZU1hcmtlcigpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBtYXJrZWREcm9wVGFyZ2V0ID0gdGhpcy5nZXRNYXJrZWREcm9wVGFyZ2V0KCk7XG5cbiAgICAgIG1hcmtlZERyb3BUYXJnZXQuZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKTtcbiAgICB9XG4gIH1cblxuICBlc2NhcGVEcmFnZ2luZygpIHtcbiAgICB0aGlzLnJlbW92ZU1hcmtlckdsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZShmaWxlUGF0aCk7XG5cbiAgICAgIGZpbGVQYXRoID0gdGFyZ2V0RmlsZVBhdGg7IC8vL1xuXG4gICAgICB0aGlzLmFkZEZpbGUoZmlsZVBhdGgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgY29uc3QgY29sbGFwc2VkID0gZGlyZWN0b3J5LmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGRpcmVjdG9yeVBhdGggPSB0YXJnZXREaXJlY3RvcnlQYXRoOyAvLy9cblxuICAgICAgdGhpcy5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcbiAgICB9XG4gIH1cblxuICBvcGVuRmlsZShmaWxlKSB7XG4gICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuZ2V0Um9vdERpcmVjdG9yeSgpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKHJvb3REaXJlY3RvcnkpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyByb290RGlyZWN0b3J5TmFtZSwgcm9vdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBuYW1lID0gcm9vdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHJvb3REaXJlY3RvcnlDb2xsYXBzZWQsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIHJvb3REaXJlY3RvcnkgPSA8Um9vdERpcmVjdG9yeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPjtcblxuICAgIHJldHVybiByb290RGlyZWN0b3J5O1xuICB9XG5cbiAgYXBwbHlQcm9wZXJ0aWVzKCkge1xuICAgIHN1cGVyLmFwcGx5UHJvcGVydGllcyguLi5hcmd1bWVudHMpO1xuXG4gICAgdGhpcy5hc3NpZ25Db250ZXh0KCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25Nb3ZlLCBvbk9wZW4sIG9wdGlvbnMgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbW92ZUhhbmRsZXIgPSBvbk1vdmUsIC8vL1xuICAgICAgICAgIG9wZW5IYW5kbGVyID0gb25PcGVuOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRXhwbG9yZXIsIHtcbiAgdGFnTmFtZTogJ3VsJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdleHBsb3JlcidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAncm9vdERpcmVjdG9yeU5hbWUnLFxuICAgICdyb290RGlyZWN0b3J5Q29sbGFwc2VkJyxcbiAgICAnb25PcGVuJyxcbiAgICAnb25Nb3ZlJyxcbiAgICAnb3B0aW9ucydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRXhwbG9yZXI7XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5KCksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IChzb3VyY2VQYXRoID09PSBudWxsKSA/XG4gICAgICAgICAgICAgICAgICBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgdGFyZ2V0UGF0aCkgOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpOyAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5OiBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cblxuZnVuY3Rpb24gcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsICB0YXJnZXRQYXRoKSB7XG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBzb3VyY2VQYXRoID0gc291cmNlUGF0aC5yZXBsYWNlKC9cXCgvZywgJ1xcXFwoJykucmVwbGFjZSgvXFwpL2csICdcXFxcKScpOyAgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cCgnXicgKyBzb3VyY2VQYXRoICsgJyguKiQpJyksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRhcmdldFBhdGggKyBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uL29wdGlvbnMnKSxcbiAgICAgIE5hbWVCdXR0b24gPSByZXF1aXJlKCcuL25hbWVCdXR0b24nKTtcblxuY29uc3QgRVNDQVBFX0tFWUNPREUgPSAyNyxcbiAgICAgIFNUQVJUX0RSQUdHSU5HX0RFTEFZID0gMTc1O1xuXG5jb25zdCB7IHdpbmRvdywgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy5leHBsb3JlciA9IGV4cGxvcmVyO1xuICAgIFxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMudG9wT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxlZnRPZmZzZXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5hbWVCdXR0b247XG5cbiAgICB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIgPSB0aGlzLm1vdXNlVXBIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZE1vdXNlRG93bkhhbmRsZXIgPSB0aGlzLm1vdXNlRG93bkhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB0aGlzLmJvdW5kTW91c2VNb3ZlSGFuZGxlciA9IHRoaXMubW91c2VNb3ZlSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bih0aGlzLmJvdW5kTW91c2VEb3duSGFuZGxlcik7XG5cbiAgICB0aGlzLmFwcGVuZChuYW1lQnV0dG9uKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0RXhwbG9yZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhwbG9yZXI7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmV4cGxvcmVyLmdldERyYWdnYWJsZUVudHJ5UGF0aCh0aGlzKTtcbiAgICBcbiAgICByZXR1cm4gcGF0aDtcbiAgfVxuICBcbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbigna2V5ZG93bicsIHRoaXMua2V5RG93bkhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgdGhpcy5hZGRDbGFzcygnZHJhZ2dpbmcnKTtcblxuICAgIHRoaXMuZHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZygpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5FU0NBUEVfS0VZX1NUT1BTX0RSQUdHSU5HKTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nKSB7XG4gICAgICB0aGlzLm9mZigna2V5ZG93bicpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGlmICh0aGlzLnRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgcm9vdERpcmVjdG9yeSA9IHRoaXMuaXNSb290RGlyZWN0b3J5KCksXG4gICAgICAgICAgICAgIHN1YkVudHJ5ID0gIXJvb3REaXJlY3RvcnksICAvLy9cbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllcyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfUk9PVF9ESVJFQ1RPUlkpO1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZykgfHwgKHN1YkVudHJ5ICYmIG5vRHJhZ2dpbmdTdWJFbnRyaWVzKSB8fCAocm9vdERpcmVjdG9yeSAmJiBub0RyYWdnaW5nUm9vdERpcmVjdG9yeSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICB9XG4gIH1cblxuICBzdG9wV2FpdGluZ1RvRHJhZygpIHtcbiAgICBpZiAodGhpcy50aW1lb3V0ICE9PSBudWxsKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBpc0RyYWdnaW5nKCkge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5oYXNDbGFzcygnZHJhZ2dpbmcnKTtcbiAgICBcbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBpc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgY29sbGFwc2VkQm91bmRzID0gdGhpcy5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlID0gY29sbGFwc2VkQm91bmRzLmlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSxcbiAgICAgICAgICBtb3VzZU92ZXIgPSBjb2xsYXBzZWRCb3VuZHNPdmVybGFwcGluZ01vdXNlO1xuXG4gICAgcmV0dXJuIG1vdXNlT3ZlcjtcbiAgfVxuXG4gIG1vdXNlRG93bkhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub24oJ21vdXNldXAgYmx1cicsIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlcik7XG4gICAgXG4gICAgd2luZG93Lm9uTW91c2VNb3ZlKHRoaXMuYm91bmRNb3VzZU1vdmVIYW5kbGVyKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gRWxlbWVudC5MRUZUX01PVVNFX0JVVFRPTikge1xuICAgICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgICAgaWYgKCFkcmFnZ2luZykge1xuICAgICAgICB0aGlzLnN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3VzZVVwSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vZmYoJ21vdXNldXAgYmx1cicsIHRoaXMuYm91bmRNb3VzZVVwSGFuZGxlcik7XG4gICAgXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLmJvdW5kTW91c2VNb3ZlSGFuZGxlcik7XG5cbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmV4cGxvcmVyLnN0b3BEcmFnZ2luZyh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihldmVudCkge1xuICAgIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoO1xuXG4gICAgaWYgKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlRW50cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIEVudHJpZXMgPSByZXF1aXJlKCcuLi9lbnRyaWVzJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4uLy4uL3V0aWwvcGF0aCcpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi9kcmFnZ2FibGVFbnRyeScpO1xuXG5jb25zdCB7IEJ1dHRvbiwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIERpcmVjdG9yeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkRJUkVDVE9SWTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgY29uc3QgZW50cmllcyA9IDxFbnRyaWVzIERpcmVjdG9yeT17RGlyZWN0b3J5fSAvPixcbiAgICAgICAgICB0b2dnbGVCdXR0b24gPSA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgIHRoaXMucHJlcGVuZCh0b2dnbGVCdXR0b24pO1xuICB9XG5cbiAgaXNEaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBiZWZvcmUgPSBuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDA7XG5cbiAgICAgICAgcmV0dXJuIGJlZm9yZTtcbiAgICB9XG4gIH1cbiAgXG4gIGdldFN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGUoZnVuY3Rpb24oZmlsZSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlOyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeVN1YkVudHJpZXMgPSBkaXJlY3RvcnkuZ2V0U3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgICAgXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIGdldEZpbGVQYXRocygpIHtcbiAgICBsZXQgZmlsZVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gZmlsZS5nZXRQYXRoKCk7XG5cbiAgICAgIGZpbGVQYXRocy5wdXNoKGZpbGVQYXRoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeS5nZXRGaWxlUGF0aHMoKTtcbiAgICAgIFxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG5cbiAgICB0aGlzLmNvbGxhcHNlKCk7XG5cbiAgICBjb25zdCBib3VuZHMgPSBzdXBlci5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBjb2xsYXBzZWRCb3VuZHMgPSBib3VuZHM7ICAvLy9cblxuICAgIGlmICghY29sbGFwc2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIHJldHVybiBjb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gc3VwZXIuaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5LmFkZEZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRmlsZSkge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlKGZpbGVOYW1lLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gdHJ1ZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy50b3Btb3N0RGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGREaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgY29sbGFwc2VkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMudG9wbW9zdERpcmVjdG9yeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0b3Btb3N0RGlyZWN0b3J5LnJlbW92ZUZpbGUoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5oYXNGaWxlKGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHJvb3REaXJlY3RvcnkgPSB0aGlzLmlzUm9vdERpcmVjdG9yeSgpO1xuXG4gICAgICBpZiAoIXJvb3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLnRvcG1vc3REaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gdG9wbW9zdERpcmVjdG9yeS5yZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgZW50cmllc0RpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5oYXNEaXJlY3RvcnkoZGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRGlyZWN0b3J5KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG4gIFxuICBhZGRNYXJrZXIobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlcihtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZShtYXJrZXJQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeS5hZGRNYXJrZXIobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXIoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXIoKTtcblxuICAgICAgcmVtb3ZlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlbW92ZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeShmdW5jdGlvbihkaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGRpcmVjdG9yeS5yZW1vdmVNYXJrZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU1hcmtlZCA9IGRpcmVjdG9yeS5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlNYXJrZWQ7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGZvckVhY2hGaWxlKGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnkoY2FsbGJhY2spOyB9XG5cbiAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICB0b3Btb3N0RGlyZWN0b3J5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3Rvcnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXNEaXJlY3RvcnkgPSB0aGlzLmVudHJpZXMuaGFzRGlyZWN0b3J5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnkpIHtcbiAgICAgICAgICBjb25zdCBjb2xsYXBzZWQgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuXG4gICAgICAgICAgdGhpcy5lbnRyaWVzLmFkZERpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdG9wbW9zdERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3Rvcnk7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IHRoaXMuZW50cmllcy5nZXRNYXJrZWREaXJlY3RvcnkoKTtcblxuICAgIGlmIChtYXJrZWREaXJlY3RvcnkgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICAgIFxuICAgICAgaWYgKG1hcmtlZCkge1xuICAgICAgICBtYXJrZWREaXJlY3RvcnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcHJvcGVydGllcyA9IENsYXNzO1xuICAgICAgQ2xhc3MgPSBEaXJlY3Rvcnk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBleHBsb3JlciwgY29sbGFwc2VkIH0gPSBwcm9wZXJ0aWVzO1xuXG4gICAgY29uc3QgZGlyZWN0b3J5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcblxuICAgIGNvbGxhcHNlZCA/IC8vL1xuICAgICAgZGlyZWN0b3J5LmNvbGxhcHNlKCkgOlxuICAgICAgICBkaXJlY3RvcnkuZXhwYW5kKCk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGlyZWN0b3J5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZGlyZWN0b3J5J1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIHBhdGhVdGlsID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9wYXRoJyksXG4gICAgICBEaXJlY3RvcnkgPSByZXF1aXJlKCcuLi9kaXJlY3RvcnknKTtcblxuY2xhc3MgUm9vdERpcmVjdG9yeSBleHRlbmRzIERpcmVjdG9yeSB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gdGhpczsgIC8vL1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRGaWxlKGZpbGVQYXRoKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRmlsZShmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkRGlyZWN0b3J5KGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLmFkZERpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZUZpbGUoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5yZW1vdmVGaWxlKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnkoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU92ZXJsYXBwaW5nRW50cnk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgbm9EcmFnZ2luZ0ludG9TdWJkaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzKSB7XG4gICAgICBjb25zdCBvdmVybGFwcGluZ0VudHJ5ID0gdGhpcy5pc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5ID0gb3ZlcmxhcHBpbmdFbnRyeSA/XG4gICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdFbnRyeSA9IHN1cGVyLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0VudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyKG1hcmtlclBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIHJldHVybiB7XG4gICAgICBhZGRGaWxlOiB0aGlzLmFkZEZpbGUuYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZUZpbGU6IHRoaXMucmVtb3ZlRmlsZS5iaW5kKHRoaXMpLFxuICAgICAgYWRkRGlyZWN0b3J5OiB0aGlzLmFkZERpcmVjdG9yeS5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5OiB0aGlzLnJlbW92ZURpcmVjdG9yeS5iaW5kKHRoaXMpLFxuICAgICAgZ2V0TWFya2VkRGlyZWN0b3J5OiB0aGlzLmdldE1hcmtlZERpcmVjdG9yeS5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RHJhZ2dhYmxlRW50cnlQYXRoOiB0aGlzLmdldERyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgZ2V0RGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTogdGhpcy5nZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBhZGRSb290RGlyZWN0b3J5TWFya2VyOiB0aGlzLmFkZE1hcmtlci5iaW5kKHRoaXMpLCAvLy9cbiAgICAgIHJlbW92ZVJvb3REaXJlY3RvcnlNYXJrZXI6IHRoaXMucmVtb3ZlTWFya2VyLmJpbmQodGhpcyksIC8vL1xuICAgICAgaXNSb290RGlyZWN0b3J5TWFya2VkOiB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFJvb3REaXJlY3RvcnlOYW1lOiB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeTogdGhpcy5nZXQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0RmlsZVBhdGhzOiB0aGlzLmdldEZpbGVQYXRocy5iaW5kKHRoaXMpXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIERpcmVjdG9yeS5mcm9tUHJvcGVydGllcyhSb290RGlyZWN0b3J5LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3REaXJlY3Rvcnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG5hbWVVdGlsID0gcmVxdWlyZSgnLi4vLi4vdXRpbC9uYW1lJyksXG4gICAgICBEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uL2RyYWdnYWJsZUVudHJ5Jyk7XG5cbmNsYXNzIEZpbGUgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5GSUxFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyLCB0eXBlKTtcblxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGlzRGlyZWN0b3J5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBFbnRyeS50eXBlcy5GSUxFOlxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5NQVJLRVI6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICAgIFxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgZ2V0U3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZShmaWxlKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyIH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhGaWxlLCBwcm9wZXJ0aWVzLCBuYW1lLCBleHBsb3Jlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlLCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZScsXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlO1xuXG5mdW5jdGlvbiBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gIGxldCBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcbiAgXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBuYW1lVXRpbC5leHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbC5uYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVVUaWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIGJlZm9yZTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnknKSxcbiAgICAgIEZpbGUgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGUnKSxcbiAgICAgIEZpbGVNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9maWxlJyksXG4gICAgICBEaXJlY3RvcnlNYXJrZXIgPSByZXF1aXJlKCcuL2VudHJ5L21hcmtlci9kaXJlY3RvcnknKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnkgPSBEaXJlY3Rvcnk7XG4gIH1cbiAgXG4gIGFkZEZpbGUoZmlsZU5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGUgPSA8RmlsZSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5ID0gPHRoaXMuRGlyZWN0b3J5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICByZW1vdmVGaWxlKGZpbGVOYW1lKSB7XG4gICAgY29uc3QgZmlsZSA9IHRoaXMucmV0cmlldmVGaWxlKGZpbGVOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGZpbGUuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG5cbiAgICBmaWxlLnJlbW92ZSgpO1xuICAgIFxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGV4cGxvcmVyID0gZGlyZWN0b3J5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZGlyZWN0b3J5LnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICBoYXNGaWxlKGZpbGVOYW1lKSB7XG4gICAgbGV0IGZpbGUgPSB0aGlzLnJldHJpZXZlRmlsZShmaWxlTmFtZSk7XG5cbiAgICBmaWxlID0gKGZpbGUgIT09IG51bGwpOyAvLy9cblxuICAgIHJldHVybiBmaWxlO1xuICB9XG5cbiAgaGFzRGlyZWN0b3J5KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBsZXQgZGlyZWN0b3J5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKTtcbiAgICBcbiAgICBkaXJlY3RvcnkgPSAoZGlyZWN0b3J5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5O1xuICB9XG5cbiAgYWRkTWFya2VyKG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXI7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEU6XG4gICAgICAgIG1hcmtlciA9IDxGaWxlTWFya2VyIG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBFbnRyeS50eXBlcy5ESVJFQ1RPUlk6XG4gICAgICAgIG1hcmtlciA9IDxEaXJlY3RvcnlNYXJrZXIgbmFtZT17bmFtZX0gLz47XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gbWFya2VyOyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyKCkge1xuICAgIGNvbnN0IG1hcmtlciA9IHRoaXMucmV0cmlldmVNYXJrZXIoKTtcblxuICAgIG1hcmtlci5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlcigpLFxuICAgICAgICAgIG1hcmtlZCA9IChtYXJrZXIhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgYWRkRW50cnkoZW50cnkpIHtcbiAgICBjb25zdCBuZXh0RW50cnkgPSBlbnRyeSxcbiAgICAgICAgICBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBsZXQgcHJldmlvdXNFbnRyeSA9IG51bGw7XG5cbiAgICBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IG5leHRFbnRyeUJlZm9yZSA9IG5leHRFbnRyeS5pc0JlZm9yZShlbnRyeSk7XG4gICAgICBcbiAgICAgIGlmIChuZXh0RW50cnlCZWZvcmUpIHtcbiAgICAgICAgcHJldmlvdXNFbnRyeSA9IGVudHJ5O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHByZXZpb3VzRW50cnkgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5leHRFbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHRFbnRyeS5pbnNlcnRCZWZvcmUocHJldmlvdXNFbnRyeSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVGaWxlKGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZmlsZU5hbWUsIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeShkaXJlY3RvcnlOYW1lKSB7IHJldHVybiB0aGlzLnJldHJpZXZlRW50cnlCeVR5cGUoZGlyZWN0b3J5TmFtZSwgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgcmV0cmlldmVNYXJrZXIoKSB7XG4gICAgbGV0IG1hcmtlciA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLk1BUktFUjtcblxuICAgIHRoaXMuc29tZUVudHJ5QnlUeXBlKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBtYXJrZXIgPSBlbnRyeTsgIC8vL1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0eXBlKTtcblxuICAgIHJldHVybiBtYXJrZXI7XG4gIH1cblxuICBnZXRNYXJrZWREaXJlY3RvcnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnkgPSBkaXJlY3RvcnkuZ2V0TWFya2VkRGlyZWN0b3J5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5O1xuICB9XG4gIFxuICBnZXREcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLnNvbWVFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgaWYgKGVudHJ5ID09PSBkcmFnZ2FibGVFbnRyeSkgeyAgLy8vXG4gICAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IGVudHJ5TmFtZTsgIC8vL1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5zb21lRGlyZWN0b3J5KGZ1bmN0aW9uKGRpcmVjdG9yeSkge1xuICAgICAgICBjb25zdCBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnkuZ2V0RHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIGdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnkoZnVuY3Rpb24oZGlyZWN0b3J5KSB7XG4gICAgICBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5LmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgZm9yRWFjaEZpbGUoY2FsbGJhY2spIHsgdGhpcy5mb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUlkpIH1cblxuICBzb21lRmlsZShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEUpIH1cblxuICBzb21lRGlyZWN0b3J5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZKSB9XG5cbiAgZm9yRWFjaEVudHJ5KGNhbGxiYWNrKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnlCeVR5cGUoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2ssIHR5cGUpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgICBpZiAoZW50cnlUeXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXRyaWV2ZUVudHJ5QnlUeXBlKG5hbWUsIHR5cGUpIHtcbiAgICBsZXQgZm91bmRFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVFbnRyeUJ5VHlwZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICBpZiAoZW50cnlOYW1lID09PSBuYW1lKSB7XG4gICAgICAgIGZvdW5kRW50cnkgPSBlbnRyeTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9LCB0eXBlKTtcblxuICAgIGNvbnN0IGVudHJ5ID0gZm91bmRFbnRyeTsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkTGlzdEVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZExpc3RFbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5IH0gPSBwcm9wZXJ0aWVzO1xuICAgIFxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnRGlyZWN0b3J5J1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJ5IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCB0eXBlKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgY29uc3QgbmFtZUJ1dHRvbiA9IDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj47XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy5uYW1lQnV0dG9uID0gbmFtZUJ1dHRvbjtcblxuICAgIHRoaXMuYXBwZW5kKG5hbWVCdXR0b24pO1xuICB9XG5cbiAgZ2V0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZUJ1dHRvbi5nZXROYW1lKCk7IH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcztcbiAgICBcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgbmFtZSk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIEZJTEU6ICdGSUxFJyxcbiAgICBNQVJLRVI6ICdNQVJLRVInLFxuICAgIERJUkVDVE9SWTogJ0RJUkVDVE9SWSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKTtcblxuY2xhc3MgTWFya2VyIGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSkge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5NQVJLRVI7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgbmFtZSwgdHlwZSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTWFya2VyLCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbWFya2VyJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlciA9IHJlcXVpcmUoJy4uL21hcmtlcicpO1xuXG5jbGFzcyBEaXJlY3RvcnlNYXJrZXIgZXh0ZW5kcyBNYXJrZXIge1xuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGJlZm9yZSA9IChlbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkZJTEUpID9cbiAgICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIE1hcmtlci5mcm9tUHJvcGVydGllcyhEaXJlY3RvcnlNYXJrZXIsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TWFya2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXIgPSByZXF1aXJlKCcuLi9tYXJrZXInKTtcblxuY2xhc3MgRmlsZU1hcmtlciBleHRlbmRzIE1hcmtlciB7XG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgYmVmb3JlID0gKGVudHJ5VHlwZSA9PT0gRW50cnkudHlwZXMuRElSRUNUT1JZKSA/IFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBNYXJrZXIuZnJvbVByb3BlcnRpZXMoRmlsZU1hcmtlciwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTWFya2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gYXJyYXlVdGlsLmZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIHRleHQgPSBmaXJzdENoaWxkRWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgICAgbmFtZSA9IHRleHQ7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBjb25zdCB0ZXh0ID0gbmFtZSwgLy8vXG4gICAgICAgICAgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gYXJyYXlVdGlsLmZpcnN0KGNoaWxkRWxlbWVudHMpO1xuXG4gICAgZmlyc3RDaGlsZEVsZW1lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgfVxuICBcbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uRG91YmxlQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gb25Eb3VibGVDbGljazsgLy8vXG4gICAgXG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzLCBkb3VibGVDbGlja0hhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTmFtZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICduYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnb25Eb3VibGVDbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgTk9fRFJBR0dJTkc6ICdOT19EUkFHR0lORycsXG4gIE5PX0RSQUdHSU5HX1dJVEhJTjogJ05PX0RSQUdHSU5HX1dJVEhJTicsXG4gIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTOiAnTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMnLFxuICBOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWTogJ05PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVM6ICdOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUycsXG4gIFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVM6ICdSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTJyxcbiAgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORzogJ0VTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9wdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGdldE1hcmtlZERpcmVjdG9yeSgpIHtcbiAgICBjb25zdCBtYXJrZWREaXJlY3RvcnkgPSBudWxsO1xuICAgIFxuICAgIHJldHVybiBtYXJrZWREaXJlY3Rvcnk7XG4gIH1cblxuICBnZXREaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXIoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICB0aGlzLm9wZW4oKTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlcigpIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIG1hcmtlZDtcbiAgfVxuXG4gIGlzVG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKSxcbiAgICAgICAgICB0b0JlTWFya2VkID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kczsgLy8vXG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLmdldERpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgZHJvcFRhcmdldFRvQmVNYXJrZWQuYWRkTWFya2VyKGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBsb3Jlci5hZGRNYXJrZXJJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW92ZURpcmVjdG9yeShkaXJlY3RvcnksIHNvdXJjZURpcmVjdG9yeVBhdGgsIHRhcmdldERpcmVjdG9yeVBhdGgpIHtcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBzb3VyY2VEaXJlY3RvcnlQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZURpcmVjdG9yeShkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZShmaWxlLCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlKGZpbGVQYXRoKTtcbiAgICB9XG4gIH1cblxuICBvcGVuKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuICAgIFxuICAgIHJldHVybiBvcGVuO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuICAgICAgXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvblJlbW92ZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICByZW1vdmVIYW5kbGVyID0gb25SZW1vdmU7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUnViYmlzaEJpbiwgcHJvcGVydGllcywgcmVtb3ZlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSdWJiaXNoQmluLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ3J1YmJpc2hCaW4nXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uUmVtb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeSgpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeTogZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIGFycmF5VXRpbCB7XG4gIHN0YXRpYyBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuICBzdGF0aWMgc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuXG4gIHN0YXRpYyBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5VXRpbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpO1xuXG5jbGFzcyBuYW1lVXRpbCB7XG4gIHN0YXRpYyBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14uKlxcLihbXi5dKykkLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBleHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbnVsbDtcblxuICAgIGNvbnN0IG1hdGNoZXMgPSBuYW1lLm1hdGNoKC9eKC4rKVxcLlteLl0rJC8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lV2l0aG91dEV4dGVuc2lvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hbWVVdGlsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNsYXNzIHBhdGhVdGlsIHtcbiAgc3RhdGljIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpLFxuICAgICAgICAgIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSA9ICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIHBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBib3R0b21tb3N0TmFtZShwYXRoKSB7XG4gICAgbGV0IGJvdHRvbW1vc3ROYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXi4qXFwvKFteXFwvXSokKS8pO1xuICAgIFxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG4gICAgICBcbiAgICAgIGJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gYm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgdG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oW15cXC9dKilcXC8vKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZShwYXRoKSB7XG4gICAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC8oXi4qKVxcL1teXFwvXSokLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lO1xuICB9XG5cbiAgc3RhdGljIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUocGF0aCkge1xuICAgIGxldCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXlteXFwvXSpcXC8oLiokKS8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHNlY29uZE1hdGNoO1xuICAgIH1cblxuICAgIHJldHVybiBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGF0aFV0aWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB3aW5kb3c6IHJlcXVpcmUoJy4vbGliL3dpbmRvdycpLFxuICBkb2N1bWVudDogcmVxdWlyZSgnLi9saWIvZG9jdW1lbnQnKSxcbiAgRGl2OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2RpdicpLFxuICBTcGFuOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NwYW4nKSxcbiAgQm9keTogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9ib2R5JyksXG4gIExpbms6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvbGluaycpLFxuICBTZWxlY3Q6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvc2VsZWN0JyksXG4gIEJ1dHRvbjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9idXR0b24nKSxcbiAgQ2hlY2tib3g6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvY2hlY2tib3gnKSxcbiAgRWxlbWVudDogcmVxdWlyZSgnLi9saWIvZWxlbWVudCcpLFxuICBUZXh0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvdGV4dEVsZW1lbnQnKSxcbiAgSW5wdXQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC9pbnB1dCcpLFxuICBUZXh0YXJlYTogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50L3RleHRhcmVhJyksXG4gIElucHV0RWxlbWVudDogcmVxdWlyZSgnLi9saWIvaW5wdXRFbGVtZW50JyksXG4gIEJvdW5kczogcmVxdWlyZSgnLi9saWIvbWlzYy9ib3VuZHMnKSxcbiAgT2Zmc2V0OiByZXF1aXJlKCcuL2xpYi9taXNjL29mZnNldCcpLFxuICBSZWFjdDogcmVxdWlyZSgnLi9saWIvcmVhY3QnKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpLFxuICAgICAga2V5TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2tleScpO1xuXG5jbGFzcyBEb2N1bWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBtb3VzZU1peGluKTtcbk9iamVjdC5hc3NpZ24oRG9jdW1lbnQucHJvdG90eXBlLCBrZXlNaXhpbik7XG5cbm1vZHVsZS5leHBvcnRzID0gbmV3IERvY3VtZW50KCk7ICAvLy9cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjL2JvdW5kcycpLFxuICAgICAganN4TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2pzeCcpLFxuICAgICAgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBzY3JvbGxNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vc2Nyb2xsJyksXG4gICAgICByZXNpemVNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vcmVzaXplJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpLFxuICAgICAga2V5TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2tleScpO1xuXG5jbGFzcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb21FbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7IC8vL1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBFbGVtZW50LmNsb25lKHRoaXMpOyB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKGluY2x1ZGVCb3JkZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKGluY2x1ZGVCb3JkZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IHdpZHRoID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5vZmZzZXRXaWR0aCA6XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgc2V0V2lkdGgod2lkdGgpIHsgdGhpcy5kb21FbGVtZW50LnN0eWxlLndpZHRoID0gd2lkdGg7IH1cblxuICBnZXRIZWlnaHQoaW5jbHVkZUJvcmRlciA9IGZhbHNlKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7IH1cblxuICBnZXRBdHRyaWJ1dGUobmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmdldEF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLmRvbUVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIGNsZWFyQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5kb21FbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIGFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSkgeyB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICByZW1vdmVBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmNsZWFyQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0Q2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWU7IH1cblxuICBhZGRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTsgfVxuXG4gIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpOyB9XG5cbiAgdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzTmFtZSk7IH1cblxuICBoYXNDbGFzcyhjbGFzc05hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTsgfVxuXG4gIGNsZWFyQ2xhc3NlcygpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9ICcnOyB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHByZXBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgICAgZmlyc3RDaGlsZERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgZmlyc3RDaGlsZERPTUVsZW1lbnQpO1xuICB9XG5cbiAgYXBwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lmluc2VydEJlZm9yZShkb21FbGVtZW50LCBudWxsKTsgLy8vXG4gIH1cblxuICByZW1vdmUoZWxlbWVudCkge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQoZG9tRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzaG93KGRpc3BsYXlTdHlsZSA9ICdibG9jaycpIHsgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5U3R5bGU7IH1cblxuICBoaWRlKCkgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfVxuXG4gIGVuYWJsZSgpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZSgnZGlzYWJsZWQnKTsgfVxuXG4gIGRpc2FibGUoKSB7IHRoaXMuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpOyB9XG5cbiAgaHRtbChodG1sKSB7XG4gICAgaWYgKGh0bWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gdGhpcy5kb21FbGVtZW50LmlubmVySFRNTDtcblxuICAgICAgaHRtbCA9IGlubmVySFRNTDsgLy8vXG5cbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSBodG1sOyAvLy9cblxuICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNzcyhjc3MpIHtcbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICBjc3MgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXB1dGVkU3R5bGUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wdXRlZFN0eWxlWzBdLCAgLy8vXG4gICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgICBjc3NbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmFtZSA9IGNzczsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgIGNzcyA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoY3NzKTsgLy8vXG5cbiAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNzc1tuYW1lXTtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgYmx1cigpIHsgdGhpcy5kb21FbGVtZW50LmJsdXIoKTsgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGdldERlc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGRvbU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQsICAvLy9cbiAgICAgICAgICBkZXNjZW5kYW50RE9NTm9kZXMgPSBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShkb21Ob2RlKSxcbiAgICAgICAgICBkZXNjZW5kYW50RWxlbWVudHMgPSBmaWx0ZXJET01Ob2RlcyhkZXNjZW5kYW50RE9NTm9kZXMsIHNlbGVjdG9yKTtcblxuICAgIHJldHVybiBkZXNjZW5kYW50RWxlbWVudHM7XG4gIH1cblxuICBnZXRDaGlsZEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgY2hpbGRET01Ob2RlcyA9IHRoaXMuZG9tRWxlbWVudC5jaGlsZE5vZGVzLFxuICAgICAgICAgIGNoaWxkRE9NRWxlbWVudHMgPSBmaWx0ZXJET01Ob2RlcyhjaGlsZERPTU5vZGVzLCBzZWxlY3RvciksXG4gICAgICAgICAgY2hpbGRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGNoaWxkRE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBnZXRQYXJlbnRFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHBhcmVudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChwYXJlbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnRzID0gW3BhcmVudERPTUVsZW1lbnRdLFxuICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKHBhcmVudERPTUVsZW1lbnRzKSxcbiAgICAgICAgICAgICAgZmlyc3RQYXJlbnRFbGVtZW50ID0gZmlyc3QocGFyZW50RWxlbWVudHMpO1xuXG4gICAgICAgIHBhcmVudEVsZW1lbnQgPSBmaXJzdFBhcmVudEVsZW1lbnQgfHwgbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIGdldEFzY2VuZGFudEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgYXNjZW5kYW50RE9NRWxlbWVudHMgPSBbXSxcbiAgICAgICAgICBwYXJlbnRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICBsZXQgYXNjZW5kYW50RE9NRWxlbWVudCA9IHBhcmVudERPTUVsZW1lbnQ7ICAvLy9cbiAgICB3aGlsZSAoYXNjZW5kYW50RE9NRWxlbWVudCAhPT0gbnVsbCkge1xuICAgICAgaWYgKGFzY2VuZGFudERPTUVsZW1lbnQubWF0Y2hlcyhzZWxlY3RvcikpIHtcbiAgICAgICAgYXNjZW5kYW50RE9NRWxlbWVudHMucHVzaChhc2NlbmRhbnRET01FbGVtZW50KTtcbiAgICAgIH1cblxuICAgICAgYXNjZW5kYW50RE9NRWxlbWVudCA9IGFzY2VuZGFudERPTUVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICB9XG5cbiAgICBjb25zdCBhc2NlbmRhbnRFbGVtZW50cyA9IGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGFzY2VuZGFudERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBhc2NlbmRhbnRFbGVtZW50cztcbiAgfVxuXG4gIGdldFByZXZpb3VzU2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgcHJldmlvdXNTaWJsaW5nRWxlbWVudCA9IG51bGw7XG5cbiAgICBjb25zdCBwcmV2aW91c1NpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50LnByZXZpb3VzU2libGluZzsgIC8vL1xuXG4gICAgaWYgKChwcmV2aW91c1NpYmxpbmdET01Ob2RlICE9PSBudWxsKSAmJiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKHByZXZpb3VzU2libGluZ0RPTU5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgcHJldmlvdXNTaWJsaW5nRWxlbWVudCA9IHByZXZpb3VzU2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nRWxlbWVudDtcbiAgfVxuXG4gIGdldE5leHRTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBuZXh0U2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgbmV4dFNpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50Lm5leHRTaWJsaW5nO1xuXG4gICAgaWYgKChuZXh0U2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IobmV4dFNpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIG5leHRTaWJsaW5nRWxlbWVudCA9IG5leHRTaWJsaW5nRE9NTm9kZS5fX2VsZW1lbnRfXyB8fCBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IGRlZXAgPSB0cnVlLFxuICAgICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQuY2xvbmVOb2RlKGRlZXApO1xuXG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IG91dGVyRE9NRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgb3V0ZXJET01FbGVtZW50LmlubmVySFRNTCA9IGh0bWw7ICAvLy9cblxuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBvdXRlckRPTUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgdGFnTmFtZSA9IENsYXNzLnRhZ05hbWUsXG4gICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfSAvPmAsXG4gICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG5cbiAgICBjb25zdCBkZWZhdWx0UHJvcGVydGllcyA9IENsYXNzLmRlZmF1bHRQcm9wZXJ0aWVzLFxuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gQ2xhc3MuaWdub3JlZFByb3BlcnRpZXM7XG5cbiAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwganN4TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIHNjcm9sbE1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIHJlc2l6ZU1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwga2V5TWl4aW4pO1xuXG5PYmplY3QuYXNzaWduKEVsZW1lbnQsIHtcbiAgTEVGVF9NT1VTRV9CVVRUT046IDAsXG4gIE1JRERMRV9NT1VTRV9CVVRUT046IDEsXG4gIFJJR0hUX01PVVNFX0JVVFRPTjogMlxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRWxlbWVudDtcblxuZnVuY3Rpb24gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcikge1xuICBjb25zdCBkb21FbGVtZW50ID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID9cbiAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcilbMF0gOiAgLy8vXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I7ICAvLy9cblxuICByZXR1cm4gZG9tRWxlbWVudDtcbn1cblxuZnVuY3Rpb24gZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoZG9tRWxlbWVudHMpIHtcbiAgY29uc3QgZG9tRWxlbWVudHNXaXRoRWxlbWVudHMgPSBmaWx0ZXIoZG9tRWxlbWVudHMsIGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICByZXR1cm4gKGRvbUVsZW1lbnQuX19lbGVtZW50X18gIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIH0pLFxuICAgICAgICBlbGVtZW50cyA9IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzLm1hcChmdW5jdGlvbihkb21FbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGRvbUVsZW1lbnQuX19lbGVtZW50X187XG4gICAgICAgIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZnVuY3Rpb24gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzID0gW10pIHtcbiAgY29uc3QgY2hpbGRET01Ob2RlcyA9IGRvbU5vZGUuY2hpbGROb2RlczsgIC8vL1xuXG4gIGRlc2NlbmRhbnRET01Ob2Rlcy5jb25jYXQoY2hpbGRET01Ob2Rlcyk7XG5cbiAgY2hpbGRET01Ob2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkRE9NTm9kZSkge1xuICAgIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGNoaWxkRE9NTm9kZSwgZGVzY2VuZGFudERPTU5vZGVzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRlc2NlbmRhbnRET01Ob2Rlcztcbn1cblxuZnVuY3Rpb24gZmlsdGVyRE9NTm9kZXMoZG9tTm9kZXMsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGZpbHRlcmVkRE9NTm9kZXMgPSBmaWx0ZXIoZG9tTm9kZXMsIGZ1bmN0aW9uKGRvbU5vZGUpIHtcbiAgICByZXR1cm4gZG9tTm9kZU1hdGNoZXNTZWxlY3Rvcihkb21Ob2RlLCBzZWxlY3Rvcik7XG4gIH0pO1xuXG4gIHJldHVybiBmaWx0ZXJlZERPTU5vZGVzO1xufVxuXG5mdW5jdGlvbiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IGRvbU5vZGVUeXBlID0gZG9tTm9kZS5ub2RlVHlwZTtcblxuICBzd2l0Y2ggKGRvbU5vZGVUeXBlKSB7XG4gICAgY2FzZSBOb2RlLkVMRU1FTlRfTk9ERSA6IHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb21Ob2RlOyAvLy9cblxuICAgICAgcmV0dXJuIGRvbUVsZW1lbnQubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgfVxuXG4gICAgY2FzZSBOb2RlLlRFWFRfTk9ERSA6IHtcbiAgICAgIGlmIChzZWxlY3RvciA9PT0gJyonKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyKGFycmF5LCB0ZXN0KSB7XG4gIGNvbnN0IGZpbHRlcmVkQXJyYXkgPSBbXTtcblxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgICByZXN1bHQgPSB0ZXN0KGVsZW1lbnQpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgZmlsdGVyZWRBcnJheS5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaWx0ZXJlZEFycmF5O1xufVxuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQm9keSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciA9ICdib2R5Jykge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gQm9keS5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQm9keSwgZWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEJvZHksIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChCb2R5LCBkb21FbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQm9keSwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCb2R5LCB7XG4gIHRhZ05hbWU6ICdib2R5J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQm9keTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjbGlja0hhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2xpY2tIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DbGljayhjbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNsaWNrSGFuZGxlcikgeyByZXR1cm4gQnV0dG9uLmNsb25lKHRoaXMsIGNsaWNrSGFuZGxlcik7IH1cblxuICBvbkNsaWNrKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDbGlja0hhbmRsZXI7XG4gICAgfVxuICAgIFxuICAgIHN1cGVyLm9uQ2xpY2soaGFuZGxlcik7XG4gIH1cblxuICBvZmZDbGljayhoYW5kbGVyKSB7XG4gICAgc3VwZXIub2ZmQ2xpY2soaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQnV0dG9uLCBlbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKEJ1dHRvbiwgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChCdXR0b24sIGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjbGlja0hhbmRsZXIgPSBvbkNsaWNrOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEJ1dHRvbiwgcHJvcGVydGllcywgY2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIobW91c2VCdXR0b24sIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQ2hlY2tib3ggZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIsIGNoZWNrZWQpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgICBcbiAgICBpZiAoY2hlY2tlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNoZWNrKGNoZWNrZWQpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIENoZWNrYm94LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25DaGFuZ2UoaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIpOyAgLy8vXG4gIH1cbiAgXG4gIG9mZkNoYW5nZShoYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7ICAvLy9cbiAgfVxuXG4gIGNoZWNrKGNoZWNrZWQgPSB0cnVlKSB7XG4gICAgY2hlY2tlZCA/XG4gICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICdjaGVja2VkJykgOlxuICAgICAgICB0aGlzLmNsZWFyQXR0cmlidXRlKCdjaGVja2VkJyk7XG4gIH1cblxuICBpc0NoZWNrZWQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2hlY2tlZDsgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2hlY2tib3gsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChDaGVja2JveCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KENoZWNrYm94LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSwgY2hlY2tlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENoZWNrYm94LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKENoZWNrYm94LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJyxcbiAgICAnY2hlY2tlZCdcbiAgXSxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICB0eXBlOiAnY2hlY2tib3gnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoZWNrYm94O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBjaGVja2VkID0gdGhpcy5pc0NoZWNrZWQoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKGNoZWNrZWQsIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgRGl2IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBEaXYuY2xvbmUodGhpcyk7IH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKERpdiwgZWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKERpdiwgaHRtbCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KERpdiwgZG9tRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKERpdiwgcHJvcGVydGllcyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXYsIHtcbiAgdGFnTmFtZTogJ2Rpdidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpdjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgTGluayBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIExpbmsuY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoTGluaywgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChMaW5rLCBodG1sLCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KExpbmssIGRvbUVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DbGljayB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjbGlja0hhbmRsZXIgPSBvbkNsaWNrOyAvLy8gICAgXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhMaW5rLCBwcm9wZXJ0aWVzLCBjbGlja0hhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTGluaywge1xuICB0YWdOYW1lOiAnYScsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpbms7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgaHJlZiA9IHRoaXMuZ2V0QXR0cmlidXRlKCdocmVmJyksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihocmVmLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBTZWxlY3QgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFNlbGVjdC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIGdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSB7IFxuICAgIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQudmFsdWU7ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc2VsZWN0ZWRPcHRpb25WYWx1ZTtcbiAgfVxuXG4gIHNldFNlbGVjdGVkT3B0aW9uQnlWYWx1ZShzZWxlY3RlZE9wdGlvblZhbHVlKSB7XG4gICAgY29uc3QgdmFsdWUgPSBzZWxlY3RlZE9wdGlvblZhbHVlOyAgLy8vXG4gICAgXG4gICAgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IFxuICB9XG5cbiAgb25DaGFuZ2UoaGFuZGxlcikge1xuICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5vbignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cbiAgXG4gIG9mZkNoYW5nZShoYW5kbGVyKSB7XG4gICAgdGhpcy5vZmYoJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShTZWxlY3QsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChTZWxlY3QsIGh0bWwsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChTZWxlY3QsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZTsgLy8vICAgIFxuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoU2VsZWN0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFNlbGVjdCwge1xuICB0YWdOYW1lOiAnc2VsZWN0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNlbGVjdDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3Qgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRPcHRpb25WYWx1ZSgpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoc2VsZWN0ZWRPcHRpb25WYWx1ZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBTcGFuIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNsb25lKCkgeyByZXR1cm4gU3Bhbi5jbG9uZSh0aGlzKTsgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoU3BhbiwgZWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChTcGFuLCBkb21FbGVtZW50KTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTcGFuLCB7XG4gIHRhZ05hbWU6ICdzcGFuJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3BhbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudCcpO1xuXG5jbGFzcyBJbnB1dEVsZW1lbnQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBpZiAoY2hhbmdlSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIG9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG5cbiAgZ2V0U2VsZWN0aW9uU3RhcnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cblxuICBzZXRTZWxlY3Rpb25TdGFydChzZWxlY3Rpb25TdGFydCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDsgfVxuXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuXG4gIHNlbGVjdCgpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdCgpOyB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShDbGFzcywgZWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChDbGFzcywgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSW5wdXRFbGVtZW50LCB7XG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpLFxuICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHZhbHVlLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBJbnB1dCBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0LmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25SZXNpemUoKSB7fVxuXG4gIG9mZlJlc2l6ZSgpIHt9XG4gIFxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoSW5wdXQsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKElucHV0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChJbnB1dCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoSW5wdXQsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSW5wdXQsIHtcbiAgdGFnTmFtZTogJ2lucHV0J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgb25SZXNpemUoKSB7fVxuICBcbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoVGV4dGFyZWEsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFRleHRhcmVhLCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tRE9NRWxlbWVudChUZXh0YXJlYSwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoVGV4dGFyZWEsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oVGV4dGFyZWEsIHtcbiAgdGFnTmFtZTogJ3RleHRhcmVhJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dGFyZWE7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIEJvdW5kcyB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gICAgdGhpcy5ib3R0b20gPSBib3R0b207XG4gICAgdGhpcy5yaWdodCA9IHJpZ2h0O1xuICB9XG5cbiAgZ2V0VG9wKCkge1xuICAgIHJldHVybiB0aGlzLnRvcDtcbiAgfVxuXG4gIGdldExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxuXG4gIGdldEJvdHRvbSgpIHtcbiAgICByZXR1cm4gdGhpcy5ib3R0b207XG4gIH1cblxuICBnZXRSaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5yaWdodDtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdNb3VzZShtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgcmV0dXJuICggICh0aGlzLnRvcCA8IG1vdXNlVG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5sZWZ0IDwgbW91c2VMZWZ0KSAmJlxuICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPiBtb3VzZVRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMucmlnaHQgPiBtb3VzZUxlZnQpICApO1xuICB9XG5cbiAgYXJlT3ZlcmxhcHBpbmcoYm91bmRzKSB7XG4gICAgcmV0dXJuICggICh0aGlzLnRvcCA8IGJvdW5kcy5ib3R0b20pICYmXG4gICAgICAgICAgICAgICh0aGlzLmxlZnQgPCBib3VuZHMucmlnaHQpICYmXG4gICAgICAgICAgICAgICh0aGlzLmJvdHRvbSA+IGJvdW5kcy50b3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID4gYm91bmRzLmxlZnQpICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21Cb3VuZGluZ0NsaWVudFJlY3QoYm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgY29uc3Qgd2luZG93U2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0LCAvLy9cbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0LCAgLy8vXG4gICAgICAgICAgdG9wID0gYm91bmRpbmdDbGllbnRSZWN0LnRvcCArIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgICBsZWZ0ID0gYm91bmRpbmdDbGllbnRSZWN0LmxlZnQgKyB3aW5kb3dTY3JvbGxMZWZ0LFxuICAgICAgICAgIGJvdHRvbSA9IGJvdW5kaW5nQ2xpZW50UmVjdC5ib3R0b20gKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgcmlnaHQgPSBib3VuZGluZ0NsaWVudFJlY3QucmlnaHQgKyB3aW5kb3dTY3JvbGxMZWZ0LFxuICAgICAgICAgIGJvdW5kcyA9IG5ldyBCb3VuZHModG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCb3VuZHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIE9mZnNldCB7XG4gIGNvbnN0cnVjdG9yKHRvcCwgbGVmdCkge1xuICAgIHRoaXMudG9wID0gdG9wO1xuICAgIHRoaXMubGVmdCA9IGxlZnQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gT2Zmc2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbkNsaWNrKGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cbiAgXG4gIHRoaXMub24oJ2NsaWNrJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvZmZDbGljayhoYW5kbGVyKSB7IHRoaXMub2ZmKCdjbGljaycsIGhhbmRsZXIpOyB9XG5cbmNvbnN0IGNsaWNrTWl4aW4gPSB7XG4gIG9uQ2xpY2s6IG9uQ2xpY2ssXG4gIG9mZkNsaWNrOiBvZmZDbGlja1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGlja01peGluO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBtb3VzZVRvcCA9IGV2ZW50LnBhZ2VZLCAgLy8vXG4gICAgICAgIG1vdXNlTGVmdCA9IGV2ZW50LnBhZ2VYLCAvLy9cbiAgICAgICAgbW91c2VCdXR0b24gPSBldmVudC5idXR0b24sIC8vL1xuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb24oZXZlbnRUeXBlcywgaGFuZGxlcikge1xuICBldmVudFR5cGVzID0gZXZlbnRUeXBlcy5zcGxpdCgnICcpOyAvLy9cblxuICBldmVudFR5cGVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlKSB7XG4gICAgb25FdmVudCh0aGlzLCBldmVudFR5cGUsIGhhbmRsZXIpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBvZmYoZXZlbnRUeXBlcywgaGFuZGxlcikge1xuICBldmVudFR5cGVzID0gZXZlbnRUeXBlcy5zcGxpdCgnICcpOyAvLy9cblxuICBldmVudFR5cGVzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRUeXBlKSB7XG4gICAgb2ZmRXZlbnQodGhpcywgZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuY29uc3QgZXZlbnRNaXhpbiA9IHtcbiAgb246IG9uLFxuICBvZmY6IG9mZlxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBldmVudE1peGluO1xuXG5mdW5jdGlvbiBvbkV2ZW50KGVsZW1lbnQsIGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICBpZiAoZWxlbWVudC5ldmVudE9iamVjdE1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZWxlbWVudC5ldmVudE9iamVjdE1hcCA9IHt9O1xuXG4gIH1cblxuICBsZXQgZXZlbnRPYmplY3QgPSBlbGVtZW50LmV2ZW50T2JqZWN0TWFwW2V2ZW50VHlwZV07XG5cbiAgaWYgKCFldmVudE9iamVjdCkge1xuICAgIGV2ZW50T2JqZWN0ID0gY3JlYXRlRXZlbnRPYmplY3QoKTtcblxuICAgIGV2ZW50T2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoZWxlbWVudCwgZXZlbnRUeXBlKTtcblxuICAgIGVsZW1lbnQuZXZlbnRPYmplY3RNYXBbZXZlbnRUeXBlXSA9IGV2ZW50T2JqZWN0O1xuICB9XG5cbiAgZXZlbnRPYmplY3QuYWRkSGFuZGxlcihoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmRXZlbnQoZWxlbWVudCwgZXZlbnRUeXBlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50T2JqZWN0ID0gZWxlbWVudC5ldmVudE9iamVjdE1hcFtldmVudFR5cGVdO1xuXG4gIGNvbnN0IGVtcHR5ID0gZXZlbnRPYmplY3QucmVtb3ZlSGFuZGxlcihoYW5kbGVyKTtcblxuICBpZiAoZW1wdHkpIHtcbiAgICBldmVudE9iamVjdC5yZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50VHlwZSk7XG5cbiAgICBkZWxldGUgZWxlbWVudC5ldmVudE9iamVjdE1hcFtldmVudFR5cGVdO1xuICB9XG5cbiAgY29uc3QgZXZlbnRUeXBlcyA9IE9iamVjdC5rZXlzKGVsZW1lbnQuZXZlbnRPYmplY3RNYXApO1xuXG4gIGlmIChldmVudFR5cGVzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSBlbGVtZW50LmV2ZW50T2JqZWN0TWFwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50T2JqZWN0KCkge1xuICBjb25zdCBoYW5kbGVycyA9IFtdO1xuXG4gIGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoZXZlbnQpIHtcbiAgICBjb25zdCBldmVudFRhcmdldCA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgICB0YXJnZXRFbGVtZW50ID0gZXZlbnRUYXJnZXQuX19lbGVtZW50X187ICAvLy9cblxuICAgIGxldCBwcmV2ZW50RXZlbnREZWZhdWx0ID0gZmFsc2U7XG5cbiAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgcHJldmVudEV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihldmVudCwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgICAgICAgaWYgKHByZXZlbnREZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgcHJldmVudEV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChwcmV2ZW50RXZlbnREZWZhdWx0KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgaGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUhhbmRsZXIoaGFuZGxlciA9IG51bGwpIHtcbiAgICBpZiAoaGFuZGxlciA9PT0gbnVsbCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSAwO1xuXG4gICAgICBoYW5kbGVycy5zcGxpY2Uoc3RhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmRleCA9IGhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG5cbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gICAgICAgIGhhbmRsZXJzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGVtcHR5ID0gKGhhbmRsZXJzLmxlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50VHlwZSkge1xuICAgIGVsZW1lbnQuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50VHlwZSkge1xuICAgIGVsZW1lbnQuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFkZEhhbmRsZXI6IGFkZEhhbmRsZXIsXG4gICAgcmVtb3ZlSGFuZGxlcjogcmVtb3ZlSGFuZGxlcixcbiAgICBhZGRFdmVudExpc3RlbmVyOiBhZGRFdmVudExpc3RlbmVyLFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHJlbW92ZUV2ZW50TGlzdGVuZXJcbiAgfTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgVGV4dEVsZW1lbnQgPSByZXF1aXJlKCcuLi90ZXh0RWxlbWVudCcpO1xuXG5mdW5jdGlvbiBhcHBseVByb3BlcnRpZXMocHJvcGVydGllcyA9IHt9LCBkZWZhdWx0UHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpIHtcbiAgYXNzaWduKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyh0aGlzLCBwcm9wZXJ0aWVzKTtcblxuICB1bmFzc2lnbihwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgdGhpcy5wcm9wZXJ0aWVzID0ge307XG5cbiAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTtcblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHByb3BlcnRpZXNbbmFtZV07XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAoaXNIYW5kbGVyTmFtZShuYW1lKSkge1xuICAgICAgYWRkSGFuZGxlcih0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIGlmIChpc0F0dHJpYnV0ZU5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEF0dHJpYnV0ZSh0aGlzLCBuYW1lLCB2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcblxuICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpczsgLy8vXG5cbiAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIGNoaWxkRWxlbWVudC5hcHBlbmRUbyhwYXJlbnRFbGVtZW50KTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCksIHRoZW5EZWxldGUgPSB0cnVlKSB7XG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb250ZXh0W25hbWVdLFxuICAgICAgICAgIGRlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICB9O1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIG5hbWUsIGRlc2NyaXB0b3IpO1xuXG4gICAgaWYgKHRoZW5EZWxldGUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHRbbmFtZV07XG4gICAgfVxuICB9LmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7XG4gIHRoaXMuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuY29udGV4dCk7XG4gIFxuICBjb25zdCBwYXJlbnRDb250ZXh0ID0gdGhpcy5wYXJlbnRDb250ZXh0ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnRDb250ZXh0KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dDtcbiAgXG4gIHBhcmVudEVsZW1lbnQuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudEVsZW1lbnQuY29udGV4dCwgcGFyZW50Q29udGV4dCk7XG5cbiAgcGFyZW50RWxlbWVudC5hcHBlbmQodGhpcyk7XG59XG5cbmNvbnN0IGpzeE1peGluID0ge1xuICBhcHBlbmRUbzogYXBwZW5kVG8sXG4gIGFzc2lnbkNvbnRleHQ6IGFzc2lnbkNvbnRleHQsXG4gIGFwcGx5UHJvcGVydGllczogYXBwbHlQcm9wZXJ0aWVzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGpzeE1peGluO1xuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgbGV0IGNoaWxkRWxlbWVudHMgPSBlbGVtZW50LmNoaWxkRWxlbWVudHMgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jaGlsZEVsZW1lbnRzO1xuXG4gIGNoaWxkRWxlbWVudHMgPSAoY2hpbGRFbGVtZW50cyAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICAgICAgICAgKChjaGlsZEVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50cyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hpbGRFbGVtZW50c10pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW107XG5cbiAgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHMubWFwKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgY2hpbGRFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dCA9IGNoaWxkRWxlbWVudCwgIC8vL1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBuZXcgVGV4dEVsZW1lbnQodGV4dCk7XG5cbiAgICAgIGNoaWxkRWxlbWVudCA9IHRleHRFbGVtZW50OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gdW5hc3NpZ24ocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMgPSBbXSkge1xuICBjb25zdCBpZ25vcmVkUHJvcGVydHlOYW1lcyA9IGlnbm9yZWRQcm9wZXJ0aWVzOyAvLy9cblxuICBpZ25vcmVkUHJvcGVydHlOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGlnbm9yZWRQcm9wZXJ0eU5hbWUpIHtcbiAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShpZ25vcmVkUHJvcGVydHlOYW1lKSkge1xuICAgICAgZGVsZXRlIHByb3BlcnRpZXNbaWdub3JlZFByb3BlcnR5TmFtZV07XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYXNzaWduKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzID0ge30pIHtcbiAgY29uc3QgZGVmYXVsdFByb3BlcnR5TmFtZXMgPSBPYmplY3Qua2V5cyhkZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgZGVmYXVsdFByb3BlcnR5TmFtZXMuZm9yRWFjaChmdW5jdGlvbihkZWZhdWx0UHJvcGVydHlOYW1lKSB7XG4gICAgaWYgKCFwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGRlZmF1bHRQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICBjb25zdCBkZWZhdWx0UHJvcGVydHlWYWx1ZSA9IGRlZmF1bHRQcm9wZXJ0aWVzW2RlZmF1bHRQcm9wZXJ0eU5hbWVdO1xuXG4gICAgICBwcm9wZXJ0aWVzW2RlZmF1bHRQcm9wZXJ0eU5hbWVdID0gZGVmYXVsdFByb3BlcnR5VmFsdWU7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAvLy9cbiAgICAgICAgaGFuZGxlciA9IHZhbHVlOyAgLy8vXG5cbiAgZWxlbWVudC5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSB7XG4gICAgbmFtZSA9ICdjbGFzcyc7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgbmFtZSA9ICdmb3InO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSkge1xuICByZXR1cm4gYXR0cmlidXRlTmFtZXMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1xuICAnYWNjZXB0JywgJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXNzS2V5JywgJ2FjdGlvbicsICdhbGxvd0Z1bGxTY3JlZW4nLCAnYWxsb3dUcmFuc3BhcmVuY3knLCAnYWx0JywgJ2FzeW5jJywgJ2F1dG9Db21wbGV0ZScsICdhdXRvRm9jdXMnLCAnYXV0b1BsYXknLFxuICAnY2FwdHVyZScsICdjZWxsUGFkZGluZycsICdjZWxsU3BhY2luZycsICdjaGFsbGVuZ2UnLCAnY2hhclNldCcsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3NJRCcsICdjbGFzc05hbWUnLCAnY29sU3BhbicsICdjb2xzJywgJ2NvbnRlbnQnLCAnY29udGVudEVkaXRhYmxlJywgJ2NvbnRleHRNZW51JywgJ2NvbnRyb2xzJywgJ2Nvb3JkcycsICdjcm9zc09yaWdpbicsXG4gICdkYXRhJywgJ2RhdGVUaW1lJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsXG4gICdlbmNUeXBlJyxcbiAgJ2Zvcm0nLCAnZm9ybUFjdGlvbicsICdmb3JtRW5jVHlwZScsICdmb3JtTWV0aG9kJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2Zvcm1UYXJnZXQnLCAnZnJhbWVCb3JkZXInLFxuICAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmTGFuZycsICdodG1sRm9yJywgJ2h0dHBFcXVpdicsXG4gICdpY29uJywgJ2lkJywgJ2lucHV0TW9kZScsICdpbnRlZ3JpdHknLCAnaXMnLFxuICAna2V5UGFyYW1zJywgJ2tleVR5cGUnLCAna2luZCcsXG4gICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9vcCcsICdsb3cnLFxuICAnbWFuaWZlc3QnLCAnbWFyZ2luSGVpZ2h0JywgJ21hcmdpbldpZHRoJywgJ21heCcsICdtYXhMZW5ndGgnLCAnbWVkaWEnLCAnbWVkaWFHcm91cCcsICdtZXRob2QnLCAnbWluJywgJ21pbkxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsXG4gICduYW1lJywgJ25vVmFsaWRhdGUnLCAnbm9uY2UnLFxuICAnb3BlbicsICdvcHRpbXVtJyxcbiAgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHJvZmlsZScsXG4gICdyYWRpb0dyb3VwJywgJ3JlYWRPbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd1NwYW4nLCAncm93cycsXG4gICdzYW5kYm94JywgJ3Njb3BlJywgJ3Njb3BlZCcsICdzY3JvbGxpbmcnLCAnc2VhbWxlc3MnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NwZWxsQ2hlY2snLCAnc3JjJywgJ3NyY0RvYycsICdzcmNMYW5nJywgJ3NyY1NldCcsICdzdGFydCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLFxuICAndGFiSW5kZXgnLCAndGFyZ2V0JywgJ3RpdGxlJywgJ3R5cGUnLFxuICAndXNlTWFwJyxcbiAgJ3ZhbHVlJyxcbiAgJ3dpZHRoJyxcbiAgJ3dtb2RlJyxcbiAgJ3dyYXAnXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbktleVVwKGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cbiAgXG4gIHRoaXMub24oJ2tleXVwJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbktleURvd24oaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ2tleWRvd24nLCBoYW5kbGVyKTsgXG59XG5cbmZ1bmN0aW9uIG9mZktleVVwKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ2tleXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmS2V5RG93bihoYW5kbGVyKSB7IHRoaXMub2ZmKCdrZXlkb3duJywgaGFuZGxlcik7IH1cblxuY29uc3Qga2V5TWl4aW4gPSB7XG4gIG9uS2V5VXA6IG9uS2V5VXAsXG4gIG9uS2V5RG93bjogb25LZXlEb3duLFxuICBvZmZLZXlVcDogb2ZmS2V5VXAsXG4gIG9mZktleURvd246IG9mZktleURvd25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlIHx8IGV2ZW50LndoaWNoLCAgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihrZXlDb2RlLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG4gIFxuICB0aGlzLm9uKCdtb3VzZXVwJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlRG93bihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2Vkb3duJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3ZlcihoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvbk1vdXNlT3V0KGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cblxuICB0aGlzLm9uKCdtb3VzZW91dCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ21vdXNlbW92ZScsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb2ZmTW91c2VVcChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VEb3duKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ21vdXNlZG93bicsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW92ZXInLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU91dChoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlTW92ZShoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZW1vdmUnLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBtb3VzZU1peGluID0ge1xuICBvbk1vdXNlVXA6IG9uTW91c2VVcCxcbiAgb25Nb3VzZURvd246IG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlOiBvbk1vdXNlTW92ZSxcbiAgb2ZmTW91c2VVcDogb2ZmTW91c2VVcCxcbiAgb2ZmTW91c2VEb3duOiBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3Zlcjogb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dDogb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZTogb2ZmTW91c2VNb3ZlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdXNlTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbiwgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbiwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvblJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICBhZGRFdmVudExpc3RlbmVyID0gdGhpcy5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xuXG4gIGlmIChhZGRFdmVudExpc3RlbmVyKSB7XG4gICAgYXBwZW5kUmVzaXplT2JqZWN0KHRoaXMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9mZlJlc2l6ZShoYW5kbGVyKSB7XG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnLFxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyID0gdGhpcy5vZmYoZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICBpZiAocmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdCh0aGlzKTtcbiAgfVxufVxuXG5jb25zdCByZXNpemVNaXhpbiA9IHtcbiAgb25SZXNpemU6IG9uUmVzaXplLFxuICBvZmZSZXNpemU6IG9mZlJlc2l6ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemVNaXhpbjtcblxuZnVuY3Rpb24gYXBwZW5kUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHN0eWxlID0gYGRpc3BsYXk6IGJsb2NrOyBcbiAgICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlOyBcbiAgICAgICAgICAgICAgICAgdG9wOiAwOyBcbiAgICAgICAgICAgICAgICAgbGVmdDogMDsgXG4gICAgICAgICAgICAgICAgIGhlaWdodDogMTAwJTsgXG4gICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgXG4gICAgICAgICAgICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lOyBcbiAgICAgICAgICAgICAgICAgei1pbmRleDogLTE7YDtcblxuICByZXNpemVPYmplY3Quc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgcmVzaXplT2JqZWN0LmRhdGEgPSAnYWJvdXQ6YmxhbmsnO1xuICByZXNpemVPYmplY3QudHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyA9IHJlc2l6ZU9iamVjdDtcblxuICByZXNpemVPYmplY3Qub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudClcbiAgfTtcblxuICBkb21FbGVtZW50LmFwcGVuZENoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVMaXN0ZW5lcik7XG5cbiAgZG9tRWxlbWVudC5yZW1vdmVDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZXNpemVPYmplY3RMb2FkSGFuZGxlcihlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgcmVzaXplT2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIHJlc2l6ZU9iamVjdFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICBldmVudExpc3RlbmVyKGVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcihlbGVtZW50KSB7XG4gIGNvbnN0IHdpZHRoID0gZWxlbWVudC5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSBlbGVtZW50LmdldEhlaWdodCgpLFxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gZWxlbWVudCwgLy8vXG4gICAgICAgIGhhbmRsZXJzID0gZWxlbWVudC5oYW5kbGVyc01hcFsncmVzaXplJ107XG5cbiAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKXtcbiAgICBoYW5kbGVyKHdpZHRoLCBoZWlnaHQsIHRhcmdldEVsZW1lbnQpO1xuICB9KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25TY3JvbGwoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuICBcbiAgdGhpcy5vbignc2Nyb2xsJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvZmZTY3JvbGwoaGFuZGxlcikgeyB0aGlzLm9mZignc2Nyb2xsJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcDsgfVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQ7IH1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsVG9wKHNjcm9sbFRvcCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wOyB9XG5cbmZ1bmN0aW9uIHNldFNjcm9sbExlZnQoc2Nyb2xsTGVmdCkgeyB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQ7IH1cblxuY29uc3Qgc2Nyb2xsTWl4aW4gPSB7XG4gIG9uU2Nyb2xsOiBvblNjcm9sbCxcbiAgb2ZmU2Nyb2xsOiBvZmZTY3JvbGwsXG4gIGdldFNjcm9sbFRvcDogZ2V0U2Nyb2xsVG9wLFxuICBnZXRTY3JvbGxMZWZ0OiBnZXRTY3JvbGxMZWZ0LFxuICBzZXRTY3JvbGxUb3A6IHNldFNjcm9sbFRvcCxcbiAgc2V0U2Nyb2xsTGVmdDogc2V0U2Nyb2xsTGVmdFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBzY3JvbGxNaXhpbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlcikge1xuICBjb25zdCBzY3JvbGxUb3AgPSB0aGlzLmdldFNjcm9sbFRvcCgpLFxuICAgICAgICBzY3JvbGxMZWZ0ID0gdGhpcy5nZXRTY3JvbGxMZWZ0KCksXG4gICAgICAgIHRhcmdldEVsZW1lbnQgPSB0aGlzLCAvLy9cbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gICAgICBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4vdGV4dEVsZW1lbnQnKTtcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmaXJzdEFyZ3VtZW50LCBwcm9wZXJ0aWVzLCAuLi5jaGlsZEFyZ3VtZW50cykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbUNoaWxkQXJndW1lbnRzKGNoaWxkQXJndW1lbnRzKTtcblxuICAgIHByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNoaWxkRWxlbWVudHM6IGNoaWxkRWxlbWVudHNcbiAgICB9LCBwcm9wZXJ0aWVzKTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChpc1R5cGVPZihmaXJzdEFyZ3VtZW50LCBFbGVtZW50KSkge1xuICAgICAgY29uc3QgQ2xhc3MgPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBDbGFzcy5mcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb25zdCBlbGVtZW50RnVuY3Rpb24gPSBmaXJzdEFyZ3VtZW50OyAgLy8vXG5cbiAgICAgIGVsZW1lbnQgPSBlbGVtZW50RnVuY3Rpb24ocHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBmaXJzdEFyZ3VtZW50LCAgLy8vXG4gICAgICAgICAgICBodG1sID0gYDwke3RhZ05hbWV9IC8+YDtcblxuICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoRWxlbWVudCwgaHRtbCk7XG5cbiAgICAgIGVsZW1lbnQuYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBSZWFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21DaGlsZEFyZ3VtZW50cyhjaGlsZEFyZ3VtZW50cykge1xuICBjaGlsZEFyZ3VtZW50cyA9IGNoaWxkQXJndW1lbnRzLnJlZHVjZShmdW5jdGlvbihjaGlsZEFyZ3VtZW50cywgY2hpbGRBcmd1bWVudCkge1xuICAgIGNoaWxkQXJndW1lbnRzID0gY2hpbGRBcmd1bWVudHMuY29uY2F0KGNoaWxkQXJndW1lbnQpO1xuXG4gICAgcmV0dXJuIGNoaWxkQXJndW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkQXJndW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEFyZ3VtZW50KSB7XG4gICAgbGV0IGNoaWxkRWxlbWVudDtcbiAgICBcbiAgICBpZiAodHlwZW9mIGNoaWxkQXJndW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gY2hpbGRBcmd1bWVudCwgLy8vXG4gICAgICAgICAgICB0ZXh0RWxlbWVudCA9IG5ldyBUZXh0RWxlbWVudCh0ZXh0KTtcblxuICAgICAgY2hpbGRFbGVtZW50ID0gdGV4dEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkRWxlbWVudCA9IGNoaWxkQXJndW1lbnQ7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gaXNUeXBlT2YoYXJndW1lbnQsIENsYXNzKSB7XG4gIGxldCB0eXBlT2YgPSBmYWxzZTtcblxuICBpZiAoYXJndW1lbnQubmFtZSA9PT0gQ2xhc3MubmFtZSkgeyAvLy9cbiAgICB0eXBlT2YgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIGFyZ3VtZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFyZ3VtZW50KTsgLy8vXG5cbiAgICBpZiAoYXJndW1lbnQpIHtcbiAgICAgIHR5cGVPZiA9IGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHR5cGVPZjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjL2JvdW5kcycpO1xuXG5jbGFzcyBUZXh0RWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHRleHQpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzO1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBUZXh0RWxlbWVudC5jbG9uZSh0aGlzKTsgfVxuXG4gIGdldFRleHQoKSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGhpcy5kb21FbGVtZW50Lm5vZGVWYWx1ZSxcbiAgICAgICAgICB0ZXh0ID0gbm9kZVZhbHVlOyAvLy9cblxuICAgIHJldHVybiB0ZXh0O1xuICB9XG5cbiAgc2V0VGV4dCh0ZXh0KSB7XG4gICAgY29uc3Qgbm9kZVZhbHVlID0gdGV4dDsgLy8vXG5cbiAgICB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlID0gbm9kZVZhbHVlO1xuICB9XG5cbiAgZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IHRvcCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRUb3AsICAvLy9cbiAgICAgICAgICBsZWZ0ID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldExlZnQsICAvLy9cbiAgICAgICAgICBvZmZzZXQgPSBuZXcgT2Zmc2V0KHRvcCwgbGVmdCk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xuICB9XG5cbiAgZ2V0Qm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kaW5nQ2xpZW50UmVjdCA9IHRoaXMuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgICBib3VuZHMgPSBCb3VuZHMuZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGdldFdpZHRoKCkge1xuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgZ2V0SGVpZ2h0KCkge1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgcHJlcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5wcmVwZW5kKHRoaXMpOyB9XG5cbiAgYXBwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFwcGVuZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWxlbWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpLFxuICAgICAga2V5TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2tleScpO1xuXG5jbGFzcyBXaW5kb3cge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSB3aW5kb3c7XG4gIH1cblxuICBhc3NpZ24oLi4uc291cmNlcykge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZG9tRWxlbWVudDsgLy8vXG5cbiAgICBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uc291cmNlcyk7XG4gIH1cbiAgXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVyV2lkdGg7IH0gLy8vXG4gIFxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIZWlnaHQ7IH0gLy8vXG5cbiAgZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VZT2Zmc2V0OyB9ICAvLy9cblxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VYT2Zmc2V0OyB9IC8vL1xuXG4gIG9uUmVzaXplKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyO1xuICAgIH1cblxuICAgIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuICAgIFxuICAgIHRoaXMub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxuXG4gIG9mZlJlc2l6ZShoYW5kbGVyKSB7XG4gICAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cbiAgICB0aGlzLm9mZihldmVudFR5cGUsIGhhbmRsZXIpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBtb3VzZU1peGluKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwga2V5TWl4aW4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBXaW5kb3coKTsgIC8vL1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcihoYW5kbGVyKSB7XG4gIGNvbnN0IHdpZHRoID0gdGhpcy5nZXRXaWR0aCgpLFxuICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodCgpLFxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gdGhpcywgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcih3aWR0aCwgaGVpZ2h0LCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iXX0=
