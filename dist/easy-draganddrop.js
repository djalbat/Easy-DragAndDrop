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
      var index = arrayUtil.indexOf(this.dropTargets, dropTarget),
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
    key: 'removeMarkerEntryGlobally',
    value: function removeMarkerEntryGlobally() {
      var marked = this.isMarked();

      if (marked) {
        this.removeMarkerEntry();
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.removeMarkerEntry();
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
        removeEmptyParentDirectoryNameDraggableEntries = draggableEntriesExplorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoryNameDraggableEntries) {
          draggableEntriesExplorer.unsetOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoryNameDraggableEntries) {
              draggableEntriesExplorer.setOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = arrayUtil.find(pathMaps, function (pathMap) {
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
      var draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry();

      if (draggableEntryDirectoryNameDraggableEntry) {
        var directoryDraggableEntry = draggableEntry,
            ///
        sourceDirectoryPath = sourcePath,
            ///
        targetDirectoryPath = targetPath; ///

        this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var fileNameDraggableEntry = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath; ///

        this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
      }
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;

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
    DirectoryNameMarker = require('./explorer/entry/marker/directoryName'),
    RootDirectoryNameDraggableEntry = require('./explorer/draggableEntry/directoryName/root');

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

      var rootDirectoryNameDraggableEntryMarked = this.isRootDirectoryNameDraggableEntryMarked();

      if (rootDirectoryNameDraggableEntryMarked) {
        marked = true;
      } else {
        var topmostDirectoryNameMarkerEntry = this.retrieveTopmostDirectoryNameMarkerEntry();

        marked = topmostDirectoryNameMarkerEntry !== null;
      }

      return marked;
    }
  }, {
    key: 'isToBeMarked',
    value: function isToBeMarked(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = directoryNameDraggableEntryOverlappingDraggableEntry !== null;

      return toBeMarked;
    }
  }, {
    key: 'getFilePaths',
    value: function getFilePaths() {
      var filePaths = this.retrieveFilePaths();

      return filePaths;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryNameDraggableEntryOverlappingDraggableEntry.getPath(),
          markerEntryPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.addRootDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
    }
  }, {
    key: 'addMarkerEntryInPlace',
    value: function addMarkerEntryInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = pathUtil.isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarker(topmostDirectoryMarkerPath);
      } else {
        var markerEntryPath = draggableEntryPath;

        this.addRootDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarker',
    value: function addTopmostDirectoryMarker(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryNameMarkerEntry = React.createElement(DirectoryNameMarker, { name: name });

      this.append(topmostDirectoryNameMarkerEntry);
    }
  }, {
    key: 'retrieveTopmostDirectoryNameMarkerEntry',
    value: function retrieveTopmostDirectoryNameMarkerEntry() {
      var topmostDirectoryNameMarkerEntry = null;

      var childListElements = this.getChildElements('li');

      childListElements.some(function (childElement) {
        if (childElement instanceof DirectoryNameMarker) {
          topmostDirectoryNameMarkerEntry = childElement; ///

          return true;
        }
      });

      return topmostDirectoryNameMarkerEntry;
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var rootDirectoryNameDraggableEntryMarked = this.isRootDirectoryNameDraggableEntryMarked();

      if (rootDirectoryNameDraggableEntryMarked) {
        this.removeRootDirectoryNameDraggableEntryMarkerEntry();
      } else {
        var topmostDirectoryNameMarkerEntry = this.retrieveTopmostDirectoryNameMarkerEntry();

        topmostDirectoryNameMarkerEntry.remove();
      }
    }
  }, {
    key: 'startDragging',
    value: function startDragging(draggableEntry) {
      var marked = this.isMarked(),
          startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerEntryInPlace(draggableEntry);
      }

      return startedDragging;
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(draggableEntry, done) {
      var draggableEntryPath = draggableEntry.getPath(),
          marked = this.isMarked(),
          markedDropTarget = marked ? this : this.getMarkedDropTarget(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry !== null ? markedDirectoryNameDraggableEntry.getPath() : null,
          draggableEntryPathWithoutBottommostName = pathUtil.pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName,
          targetPath = markedDirectoryNameDraggableEntryPath,
          unmoved = sourcePath === targetPath;

      if (marked && unmoved) {
        this.removeMarkerEntry();

        done();
      } else {
        var draggableEntrySubEntries = draggableEntry.retrieveSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

        draggableEntries.reverse();
        draggableEntries.push(draggableEntry);

        markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function () {
          markedDropTarget.removeMarkerEntry();

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
        var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

        var toBeMarked = this.isToBeMarked(draggableEntry);

        if (toBeMarked) {
          var within = explorer === this,
              ///
          noDraggingWithin = this.hasOption(options.NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithin;

          if (!noDragging) {
            var markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry();

            directoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            if (markedDirectoryNameDraggableEntry !== directoryNameDraggableEntryOverlappingDraggableEntry) {
              this.removeMarkerEntry();

              this.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
            }
          }
        } else {
          var dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

          if (dropTargetToBeMarked !== null) {
            directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerEntryInPlace(draggableEntry);
          }

          this.removeMarkerEntry();
        }
      } else {
        var markedDropTarget = this.getMarkedDropTarget();

        markedDropTarget.dragging(draggableEntry, explorer);
      }
    }
  }, {
    key: 'escapeDragging',
    value: function escapeDragging() {
      this.removeMarkerEntryGlobally();
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      var explorer = fileNameDraggableEntry.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
      } else {
        filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);

        filePath = targetFilePath; ///

        var recognised = fileNameDraggableEntry.isRecognised(),
            hidden = fileNameDraggableEntry.isHidden();

        this.addFilePath(filePath, recognised, hidden);
      }
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var explorer = directoryNameDraggableEntry.getExplorer();

      var directoryPath = void 0;

      if (targetDirectoryPath === sourceDirectoryPath) {} else if (targetDirectoryPath === null) {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      } else {
        directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);

        directoryPath = targetDirectoryPath; ///

        var collapsed = directoryNameDraggableEntry.isCollapsed(),
            hidden = directoryNameDraggableEntry.isHidden();

        this.addDirectoryPath(directoryPath, collapsed, hidden);
      }
    }
  }, {
    key: 'openFileNameDraggableEntry',
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var rootDirectoryNameDraggableEntry = this.retrieveRootDirectoryNameDraggableEntry(),
          fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(rootDirectoryNameDraggableEntry),
          filePath = fileNameDraggableEntryPath; ///

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
          rootDirectory = React.createElement(RootDirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed });


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
          openHandler = onOpen,
          explorer = Element.fromProperties(Explorer, properties, moveHandler, openHandler, options);


      return explorer;
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
      draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
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

},{"./dropTarget":2,"./explorer/draggableEntry/directoryName/root":6,"./explorer/entry/marker/directoryName":11,"./options":14,"./util/array":16,"./util/path":18,"easy":19}],4:[function(require,module,exports){
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
      var draggableEntry = this,
          ///
      path = this.explorer.retrieveDraggableEntryPath(draggableEntry);

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
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
    }
  }, {
    key: 'isHidden',
    value: function isHidden() {
      var hidden = this.hasClass('hidden');

      return hidden;
    }
  }, {
    key: 'show',
    value: function show() {
      this.removeClass('hidden');
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.addClass('hidden');
    }
  }, {
    key: 'isRootDirectoryNameDraggableEntry',
    value: function isRootDirectoryNameDraggableEntry() {
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
        this.onKeyDown(this.keyDownHandler.bind(this));
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

          var rootDirectoryNameDraggableEntry = this.isRootDirectoryNameDraggableEntry(),
              subEntry = !rootDirectoryNameDraggableEntry,
              ///
          noDragging = this.explorer.hasOption(options.NO_DRAGGING),
              noDraggingSubEntries = this.explorer.hasOption(options.NO_DRAGGING_SUB_ENTRIES),
              noDraggingRootDirectoryNameDraggableEntry = this.explorer.hasOption(options.NO_DRAGGING_ROOT_DIRECTORY); ///

          if (noDragging || subEntry && noDraggingSubEntries || rootDirectoryNameDraggableEntry && noDraggingRootDirectoryNameDraggableEntry) {
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
    value: function keyDownHandler(keyCode) {
      var escapeKey = keyCode === ESCAPE_KEYCODE;

      if (escapeKey) {
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

      var hidden = properties.hidden,
          draggableEntry = Element.fromProperties.apply(Element, [Class, properties].concat(remainingArguments));


      hidden ? draggableEntry.hide() : draggableEntry.show();

      return draggableEntry;
    }
  }]);

  return DraggableEntry;
}(Element);

Object.assign(DraggableEntry, {
  tagName: 'li',
  ignoredProperties: ['hidden']
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

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector, name, explorer) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = Entry.types.DIRECTORY_NAME;

    var _this = _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, name, explorer, type));

    var entries = React.createElement(Entries, { DirectoryNameDraggableEntry: DirectoryNameDraggableEntry }),
        toggleButton = React.createElement(Button, { className: 'toggle', onClick: _this.toggleButtonClickHandler.bind(_this) });

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));

    _this.entries = entries;

    _this.append(entries);

    _this.prepend(toggleButton);
    return _this;
  }

  _createClass(DirectoryNameDraggableEntry, [{
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.MARKER:
        case Entry.types.FILE_NAME:

          return true;

        case Entry.types.DIRECTORY_NAME:
          var name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

          return before;
      }
    }
  }, {
    key: 'getCollapsedBounds',
    value: function getCollapsedBounds() {
      var collapsed = this.isCollapsed();

      this.collapse();

      var bounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'getBounds', this).call(this),
          collapsedBounds = bounds; ///

      if (!collapsed) {
        this.expand();
      }

      return collapsedBounds;
    }
  }, {
    key: 'isCollapsed',
    value: function isCollapsed() {
      var collapsed = this.hasClass('collapsed');

      return collapsed;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        marked = entriesMarked;
      } else {
        var directoryNameDraggableEntryMarked = this.entries.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var directoryNameDraggableEntryMarked = directoryNameDraggableEntry.isMarked();

          return directoryNameDraggableEntryMarked;
        });

        marked = directoryNameDraggableEntryMarked; ///
      }

      return marked;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return this.entries.isEmpty();
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
              overlappingDraggableEntryCollapsedBounds = _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'isOverlappingCollapsedBounds', this).call(this, draggableEntryCollapsedBounds);

          overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
        }
      }

      return overlappingDraggableEntry;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath, recognised, hidden) {
      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

        topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName, recognised, hidden);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

        if (!entriesFile) {
          var explorer = this.getExplorer();

          this.entries.addFileNameDraggableEntry(fileName, explorer, recognised, hidden);
        }
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed, hidden) {
      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed, hidden);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(directoryName);

        if (!entriesDirectoryNameDraggableEntryPresent) {
          var explorer = this.getExplorer();

          this.entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, hidden);
        }
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

        if (entriesFile) {
          removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeFileNameDraggableEntry(fileName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var rootDirectory = this.isRootDirectoryNameDraggableEntry();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(directoryName);

        if (entriesDirectoryNameDraggableEntryPresent) {
          removeEmptyParentDirectoryNameDraggableEntries = this.entries.removeDirectoryNameDraggableEntry(directoryName);
        }
      }

      if (removeEmptyParentDirectoryNameDraggableEntries === true) {
        var rootDirectory = this.isRootDirectoryNameDraggableEntry();

        if (!rootDirectory) {
          var empty = this.isEmpty();

          if (empty) {
            this.remove();
          }
        }
      }

      return removeEmptyParentDirectoryNameDraggableEntries;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var topmostDirectoryName = pathUtil.topmostDirectoryNameFromPath(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarkerEntry(markerName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.entries.retrieveDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(markerPath);

        topmostDirectoryNameDraggableEntry.addMarkerEntry(markerPathWithoutTopmostDirectoryName, draggableEntryType);
      }
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var removed = void 0;

      var entriesMarked = this.entries.isMarked();

      if (entriesMarked) {
        this.entries.removeMarkerEntry();

        removed = true;
      } else {
        removed = this.entries.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var removed = directoryNameDraggableEntry.removeMarkerEntry();

          return removed;
        });
      }

      return removed;
    }
  }, {
    key: 'forEachFileNameDraggableEntry',
    value: function forEachFileNameDraggableEntry(callback) {
      this.entries.forEachFileNameDraggableEntry(callback);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.entries.forEachDirectoryNameDraggableEntry(callback);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      this.entries.someDirectoryNameDraggableEntry(callback);
    }
  }, {
    key: 'retrieveFilePaths',
    value: function retrieveFilePaths() {
      var filePaths = [];

      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
            filePath = fileNameDraggableEntryPath; ///

        filePaths.push(filePath);
      });

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryFilePaths = directoryNameDraggableEntry.retrieveFilePaths(),
            directoryFilePaths = directoryNameDraggableEntryFilePaths();

        filePaths = filePaths.concat(directoryFilePaths);
      });

      return filePaths;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = [];

      this.forEachFileNameDraggableEntry(function (fileNameDraggableEntry) {
        var subEntry = fileNameDraggableEntry; ///

        subEntries.push(subEntry);
      });

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var subEntry = directoryNameDraggableEntry,
            ///
        directoryNameDraggableEntrySubEntries = directoryNameDraggableEntry.retrieveSubEntries();

        subEntries.push(subEntry);

        subEntries = subEntries.concat(directoryNameDraggableEntrySubEntries);
      });

      return subEntries;
    }
  }, {
    key: 'retrieveDraggableEntryPath',
    value: function retrieveDraggableEntryPath(draggableEntry) {
      var draggableEntryPath = void 0;

      var name = this.getName();

      if (draggableEntry === this) {
        draggableEntryPath = name; ///
      } else {
        draggableEntryPath = this.entries.retrieveDraggableEntryPath(draggableEntry);

        if (draggableEntryPath !== null) {
          draggableEntryPath = name + '/' + draggableEntryPath;
        }
      }

      return draggableEntryPath;
    }
  }, {
    key: 'retrieveTopmostDirectoryNameDraggableEntry',
    value: function retrieveTopmostDirectoryNameDraggableEntry(path, addIfNecessary) {
      var topmostDirectoryNameDraggableEntry = void 0;

      var topmostDirectoryName = pathUtil.topmostDirectoryNameFromPath(path);

      if (topmostDirectoryName === null) {
        topmostDirectoryNameDraggableEntry = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

          if (!entriesDirectoryNameDraggableEntryPresent) {
            var collapsed = true,
                ///
            hidden = false,
                ///
            explorer = this.getExplorer();

            this.entries.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed, hidden);
          }
        }

        var directoryNameDraggableEntry = this.entries.retrieveDirectoryNameDraggableEntry(topmostDirectoryName);

        topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
      }

      return topmostDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = this.entries.retrieveMarkedDirectoryNameDraggableEntry();

      if (markedDirectoryNameDraggableEntry === null) {
        var marked = this.isMarked();

        if (marked) {
          markedDirectoryNameDraggableEntry = this;
        }
      }

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null;

      var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

      if (overlappingDraggableEntry) {
        directoryNameDraggableEntryOverlappingDraggableEntry = this.entries.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry === null) {
          directoryNameDraggableEntryOverlappingDraggableEntry = this;
        }
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
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
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          name = _properties.name,
          explorer = _properties.explorer,
          collapsed = _properties.collapsed,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties, name, explorer);


      collapsed ? directoryNameDraggableEntry.collapse() : directoryNameDraggableEntry.expand();

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directoryName'
  },
  ignoredProperties: ['name', 'explorer', 'collapsed']
});

module.exports = DirectoryNameDraggableEntry;

},{"../../util/path":18,"../draggableEntry":4,"../entries":8,"../entry":9,"easy":19}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var options = require('../../../options'),
    pathUtil = require('../../../util/path'),
    DirectoryNameDraggableEntry = require('../../draggableEntry/directoryName');

var RootDirectoryNameDraggableEntry = function (_DirectoryNameDraggab) {
  _inherits(RootDirectoryNameDraggableEntry, _DirectoryNameDraggab);

  function RootDirectoryNameDraggableEntry() {
    _classCallCheck(this, RootDirectoryNameDraggableEntry);

    return _possibleConstructorReturn(this, (RootDirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry)).apply(this, arguments));
  }

  _createClass(RootDirectoryNameDraggableEntry, [{
    key: 'retrieve',
    value: function retrieve() {
      return this; ///
    }
  }, {
    key: 'isRootDirectoryNameDraggableEntry',
    value: function isRootDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var recognised = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var hidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutRootDirectoryName, recognised, hidden);
      }
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var hidden = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName, collapsed, hidden);
      }
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutRootDirectoryName !== null) {
        _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'removeDirectoryPath', this).call(this, directoryPathWithoutRootDirectoryName);
      }
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

      var explorer = this.getExplorer(),
          noDraggingIntoSubdirectories = explorer.hasOption(options.NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectories) {
        var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryNameDraggableEntryOverlappingDraggableEntry = overlappingDraggableEntry ? this : null;
      } else {
        directoryNameDraggableEntryOverlappingDraggableEntry = _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var markerPathWithoutRootDirectoryName = pathUtil.pathWithoutTopmostDirectoryNameFromPath(markerPath);

      _get(RootDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(RootDirectoryNameDraggableEntry.prototype), 'addMarkerEntry', this).call(this, markerPathWithoutRootDirectoryName, draggableEntryType);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        addFilePath: this.addFilePath.bind(this),
        removeFilePath: this.removeFilePath.bind(this),
        addDirectoryPath: this.addDirectoryPath.bind(this),
        removeDirectoryPath: this.removeDirectoryPath.bind(this),
        retrieveDraggableEntryPath: this.retrieveDraggableEntryPath.bind(this),
        retrieveRootDirectoryNameDraggableEntry: this.retrieve.bind(this), ///
        retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
        retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
        addRootDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
        removeRootDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
        isRootDirectoryNameDraggableEntryMarked: this.isMarked.bind(this), ///
        getRootDirectoryName: this.getName.bind(this), ///
        retrieveFilePaths: this.retrieveFilePaths.bind(this)
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return DirectoryNameDraggableEntry.fromProperties(RootDirectoryNameDraggableEntry, properties);
    }
  }]);

  return RootDirectoryNameDraggableEntry;
}(DirectoryNameDraggableEntry);

module.exports = RootDirectoryNameDraggableEntry;

},{"../../../options":14,"../../../util/path":18,"../../draggableEntry/directoryName":5}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry'),
    nameUtil = require('../../util/name'),
    DraggableEntry = require('../draggableEntry');

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, name, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = Entry.types.FILE_NAME;

    var _this = _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, name, explorer, type));

    _this.onDoubleClick(_this.doubleClickHandler.bind(_this));
    return _this;
  }

  _createClass(FileNameDraggableEntry, [{
    key: 'isDirectoryNameDraggableEntry',
    value: function isDirectoryNameDraggableEntry() {
      return false;
    }
  }, {
    key: 'isBefore',
    value: function isBefore(entry) {
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case Entry.types.MARKER:
        case Entry.types.FILE_NAME:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameIsBeforeEntryName(name, entryName);
          break;

        case Entry.types.DIRECTORY_NAME:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'isRecognised',
    value: function isRecognised() {
      var recognised = this.hasClass('recognised');

      return recognised;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'recognise',
    value: function recognise() {
      this.addClass('recognised');
    }
  }, {
    key: 'overlook',
    value: function overlook() {
      this.removeClass('recognised');
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var name = properties.name,
          explorer = properties.explorer,
          recognised = properties.recognised,
          fileNameDraggableEntry = DraggableEntry.fromProperties(FileNameDraggableEntry, properties, name, explorer);


      recognised ? fileNameDraggableEntry.recognise() : fileNameDraggableEntry.overlook();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  },
  ignoredProperties: ['name', 'explorer', 'recognised']
});

module.exports = FileNameDraggableEntry;

function nameIsBeforeEntryName(name, entryName) {
  var before = name.localeCompare(entryName) < 0;

  var nameExtension = nameUtil.extensionFromName(name),
      entryNameExtension = nameUtil.extensionFromName(entryName),
      nameWithoutExtension = nameUtil.nameWithoutExtensionFromName(name),
      entryNameWithoutExtension = nameUtil.nameWithoutExtensionFromName(entryName),
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
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName'),
    FileNameDraggableEntry = require('./draggableEntry/fileName');

var Element = easy.Element,
    React = easy.React;

var Entries = function (_Element) {
  _inherits(Entries, _Element);

  function Entries(selector, DirectoryNameDraggableEntry) {
    _classCallCheck(this, Entries);

    var _this = _possibleConstructorReturn(this, (Entries.__proto__ || Object.getPrototypeOf(Entries)).call(this, selector));

    _this.DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;
    return _this;
  }

  _createClass(Entries, [{
    key: 'addFileNameDraggableEntry',
    value: function addFileNameDraggableEntry(fileName, explorer, recognised, hidden) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer, recognised: recognised, hidden: hidden }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, hidden) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(this.DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed, hidden: hidden }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeFileNameDraggableEntry',
    value: function removeFileNameDraggableEntry(fileName) {
      var fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      fileNameDraggableEntry.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectoryNameDraggableEntry',
    value: function removeDirectoryNameDraggableEntry(directoryName) {
      var directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
          explorer = directoryNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectories = explorer.hasOption(options.REMOVE_EMPTY_PARENT_DIRECTORIES);

      directoryNameDraggableEntry.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'isFileNameDraggableEntryPresent',
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.retrieveFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null; ///

      return fileNameDraggableEntryPresent;
    }
  }, {
    key: 'isDirectoryNameDraggableEntryPresent',
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.retrieveDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null; ///

      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerName, draggableEntryType) {
      var markerEntry = void 0;

      var name = markerName; ///

      switch (draggableEntryType) {
        case Entry.types.FILE_NAME:
          markerEntry = React.createElement(FileNameMarkerEntry, { name: name });
          break;

        case Entry.types.DIRECTORY_NAME:
          markerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });
          break;
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var markerEntry = this.retrieveMarkerEntry();

      markerEntry.remove();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marker = this.retrieveMarkerEntry(),
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
    key: 'retrieveFileNameDraggableEntry',
    value: function retrieveFileNameDraggableEntry(fileName) {
      return this.retrieveEntryByType(fileName, Entry.types.FILE_NAME);
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntry(directoryName) {
      return this.retrieveEntryByType(directoryName, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'retrieveMarkerEntry',
    value: function retrieveMarkerEntry() {
      var marker = null;

      var type = Entry.types.MARKER;

      this.someEntryByType(function (entry) {
        marker = entry; ///

        return true;
      }, type);

      return marker;
    }
  }, {
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        markedDirectoryNameDraggableEntry = directoryNameDraggableEntry.retrieveMarkedDirectoryNameDraggableEntry();

        if (markedDirectoryNameDraggableEntry !== null) {
          return true;
        }
      });

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDraggableEntryPath',
    value: function retrieveDraggableEntryPath(draggableEntry) {
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
        this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
          var directoryDraggableEntryPath = directoryNameDraggableEntry.retrieveDraggableEntryPath(draggableEntry);

          if (directoryDraggableEntryPath !== null) {
            draggableEntryPath = directoryDraggableEntryPath; ///

            return true;
          }
        });
      }

      return draggableEntryPath;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null;

      this.someDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        directoryNameDraggableEntryOverlappingDraggableEntry = directoryNameDraggableEntry.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

        if (directoryNameDraggableEntryOverlappingDraggableEntry !== null) {
          return true;
        }
      });

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'forEachFileNameDraggableEntry',
    value: function forEachFileNameDraggableEntry(callback) {
      this.forEachEntryByType(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByType(callback, Entry.types.DIRECTORY_NAME);
    }
  }, {
    key: 'someFileNameDraggableEntry',
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByType(callback, Entry.types.FILE_NAME);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByType(callback, Entry.types.DIRECTORY_NAME);
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
      var DirectoryNameDraggableEntry = properties.DirectoryNameDraggableEntry,
          entries = Element.fromProperties(Entries, properties, DirectoryNameDraggableEntry);


      return entries;
    }
  }]);

  return Entries;
}(Element);

Object.assign(Entries, {
  tagName: 'ul',
  defaultProperties: {
    className: 'entries'
  },
  ignoredProperties: ['DirectoryNameDraggableEntry']
});

module.exports = Entries;

},{"../options":14,"./draggableEntry/fileName":7,"./entry":9,"./entry/marker/directoryName":11,"./entry/marker/fileName":12,"easy":19}],9:[function(require,module,exports){
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
      var name = properties.name,
          entry = Element.fromProperties(Class, properties, name);


      return entry;
    }
  }]);

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  ignoredProperties: ['name'],
  types: {
    MARKER: 'MARKER',
    FILE_NAME: 'FILE_NAME',
    DIRECTORY_NAME: 'DIRECTORY_NAME'
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

var MarkerEntry = function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  function MarkerEntry(selector, name) {
    _classCallCheck(this, MarkerEntry);

    var type = Entry.types.MARKER;

    return _possibleConstructorReturn(this, (MarkerEntry.__proto__ || Object.getPrototypeOf(MarkerEntry)).call(this, selector, name, type));
  }

  _createClass(MarkerEntry, null, [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      return Entry.fromProperties(Class, properties);
    }
  }]);

  return MarkerEntry;
}(Entry);

Object.assign(MarkerEntry, {
  defaultProperties: {
    className: 'marker'
  }
});

module.exports = MarkerEntry;

},{"../entry":9}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var DirectoryNameMarkerEntry = function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  function DirectoryNameMarkerEntry() {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    return _possibleConstructorReturn(this, (DirectoryNameMarkerEntry.__proto__ || Object.getPrototypeOf(DirectoryNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var name = this.getName(),
          draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          before = draggableEntryType === Entry.types.FILE_NAME ? true : name.localeCompare(draggableEntryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return MarkerEntry.fromProperties(DirectoryNameMarkerEntry, properties);
    }
  }]);

  return DirectoryNameMarkerEntry;
}(MarkerEntry);

module.exports = DirectoryNameMarkerEntry;

},{"../../entry":9,"../../entry/marker":10}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry() {
    _classCallCheck(this, FileNameMarkerEntry);

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).apply(this, arguments));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var name = this.getName(),
          draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          before = draggableEntryType === Entry.types.DIRECTORY_NAME ? false : name.localeCompare(draggableEntryName) < 0;

      return before;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return MarkerEntry.fromProperties(FileNameMarkerEntry, properties);
    }
  }]);

  return FileNameMarkerEntry;
}(MarkerEntry);

module.exports = FileNameMarkerEntry;

},{"../../entry":9,"../../entry/marker":10}],13:[function(require,module,exports){
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
          doubleClickHandler = onDoubleClick,
          nameButton = InputElement.fromProperties(NameButton, properties, doubleClickHandler);


      return nameButton;
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
    key: 'isOpen',
    value: function isOpen() {
      var open = this.hasClass('open');

      return open;
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
    key: 'retrieveMarkedDirectoryNameDraggableEntry',
    value: function retrieveMarkedDirectoryNameDraggableEntry() {
      var markedDirectoryNameDraggableEntry = null;

      return markedDirectoryNameDraggableEntry;
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = null; ///

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
      this.open();
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      this.close();
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
            var directoryNameDraggableEntryOverlappingDraggableEntry = dropTargetToBeMarked.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

            dropTargetToBeMarked.addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry);
          } else {
            explorer.addMarkerEntryInPlace(draggableEntry);
          }

          this.removeMarkerEntry();
        }
      }
    }
  }, {
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }
    }
  }, {
    key: 'moveFileNameDraggableEntry',
    value: function moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
      if (targetFilePath === null) {
        var explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath; ///

        explorer.removeFilePath(filePath);
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
          removeHandler = onRemove,
          rubbishBin = Element.fromProperties(RubbishBin, properties, removeHandler);


      return rubbishBin;
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
      draggableEntryDirectoryNameDraggableEntry = draggableEntry.isDirectoryNameDraggableEntry(),
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
  }, {
    key: 'indexOf',
    value: function indexOf(array, element) {
      var index = -1;

      array.some(function (currentElement, currentElementIndex) {
        if (currentElement === element) {
          index = currentElementIndex;

          return true;
        }
      });

      return index;
    }
  }, {
    key: 'find',
    value: function find(array, callback) {
      var element = null;

      array.some(function (currentElement) {
        if (callback(currentElement)) {
          element = currentElement;

          return true;
        }
      });

      return element;
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
      var topmostDirectoryName = pathUtil.topmostDirectoryNameFromPath(path),
          pathTopmostDirectoryName = topmostDirectoryName === null; ///

      return pathTopmostDirectoryName;
    }
  }, {
    key: 'bottommostNameFromPath',
    value: function bottommostNameFromPath(path) {
      var bottommostName = null;

      var matches = path.match(/^.*\/([^\/]*$)/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        bottommostName = secondMatch; ///
      }

      return bottommostName;
    }
  }, {
    key: 'topmostDirectoryNameFromPath',
    value: function topmostDirectoryNameFromPath(path) {
      var topmostDirectoryName = null;

      var matches = path.match(/^([^\/]*)\//);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        topmostDirectoryName = secondMatch; ///
      }

      return topmostDirectoryName;
    }
  }, {
    key: 'pathWithoutBottommostNameFromPath',
    value: function pathWithoutBottommostNameFromPath(path) {
      var pathWithoutBottommostName = null;

      var matches = path.match(/(^.*)\/[^\/]*$/);

      if (matches !== null) {
        var secondMatch = arrayUtil.second(matches);

        pathWithoutBottommostName = secondMatch; ///
      }

      return pathWithoutBottommostName;
    }
  }, {
    key: 'pathWithoutTopmostDirectoryNameFromPath',
    value: function pathWithoutTopmostDirectoryNameFromPath(path) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wVGFyZ2V0LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2RpcmVjdG9yeU5hbWUuanMiLCJlczYvZXhwbG9yZXIvZHJhZ2dhYmxlRW50cnkvZGlyZWN0b3J5TmFtZS9yb290LmpzIiwiZXM2L2V4cGxvcmVyL2RyYWdnYWJsZUVudHJ5L2ZpbGVOYW1lLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvbWFya2VyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci9maWxlTmFtZS5qcyIsImVzNi9leHBsb3Jlci9uYW1lQnV0dG9uLmpzIiwiZXM2L29wdGlvbnMuanMiLCJlczYvcnViYmlzaEJpbi5qcyIsImVzNi91dGlsL2FycmF5LmpzIiwiZXM2L3V0aWwvbmFtZS5qcyIsImVzNi91dGlsL3BhdGguanMiLCJub2RlX21vZHVsZXMvZWFzeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9kb2N1bWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvYm9keS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2J1dHRvbi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2NoZWNrYm94LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvZGl2LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2VsZW1lbnQvbGluay5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L3NlbGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L3NwYW4uanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvaW5wdXRFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2lucHV0RWxlbWVudC9pbnB1dC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9pbnB1dEVsZW1lbnQvdGV4dGFyZWEuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWlzYy9ib3VuZHMuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWlzYy9vZmZzZXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vY2xpY2suanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vZXZlbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vanN4LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2tleS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9tb3VzZS5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9yZXNpemUuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vc2Nyb2xsLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L3JlYWN0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L3RleHRFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L3dpbmRvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7Ozs7Ozs7Ozs7QUFFQSxJQUFNLE9BQU8sUUFBUSxNQUFSLENBQWI7O0FBRUEsSUFBTSxVQUFVLFFBQVEsV0FBUixDQUFoQjtBQUFBLElBQ00sWUFBWSxRQUFRLGNBQVIsQ0FEbEI7O0lBR1EsTyxHQUFZLEksQ0FBWixPOztJQUVGLFU7OztBQUNKLHNCQUFZLFFBQVosRUFBMEU7QUFBQSxRQUFwRCxXQUFv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Q00sU0FBUyxLQUFLLFNBQUwsRUFEZjtBQUFBLE1BRU0sZ0JBQWdCLElBRnRCO0FBQUEsTUFFNEI7QUFDdEIsbUJBQWlCLFFBQVEsS0FBUixFQUFlLE1BQWYsRUFBdUIsYUFBdkIsQ0FIdkI7O0FBS0EsU0FBTyxjQUFQO0FBQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgb3B0aW9uczogcmVxdWlyZSgnLi9saWIvb3B0aW9ucycpLFxuICBFeHBsb3JlcjogcmVxdWlyZSgnLi9saWIvZXhwbG9yZXInKSxcbiAgUnViYmlzaEJpbjogcmVxdWlyZSgnLi9saWIvcnViYmlzaEJpbicpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBhcnJheVV0aWwgPSByZXF1aXJlKCcuL3V0aWwvYXJyYXknKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBEcm9wVGFyZ2V0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBtb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKHBhdGhNYXBzLCBkb25lKSB7IGRvbmUoKTsgfSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgICBcbiAgICB0aGlzLm1vdmVIYW5kbGVyID0gbW92ZUhhbmRsZXI7XG5cbiAgICB0aGlzLmRyb3BUYXJnZXRzID0gW107XG4gIH1cblxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICB0aGlzLmRyb3BUYXJnZXRzLnB1c2goZHJvcFRhcmdldCk7XG4gIH1cblxuICByZW1vdmVEcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBpbmRleCA9IGFycmF5VXRpbC5pbmRleE9mKHRoaXMuZHJvcFRhcmdldHMsIGRyb3BUYXJnZXQpLFxuICAgICAgICAgIGZvdW5kID0gKGluZGV4ICE9PSAtMSk7XG5cbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMuZHJvcFRhcmdldHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5kcm9wVGFyZ2V0cy5yZWR1Y2UoZnVuY3Rpb24oZHJvcFRhcmdldFRvQmVNYXJrZWQsIGRyb3BUYXJnZXQpIHtcbiAgICAgIGlmIChkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoZHJvcFRhcmdldC5pc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpKSB7IC8vL1xuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gICAgfSwgbnVsbCk7XG5cbiAgICByZXR1cm4gZHJvcFRhcmdldFRvQmVNYXJrZWQ7XG4gIH1cblxuICBnZXRNYXJrZWREcm9wVGFyZ2V0KCkge1xuICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmRyb3BUYXJnZXRzLnJlZHVjZShmdW5jdGlvbihtYXJrZWREcm9wVGFyZ2V0LCBkcm9wVGFyZ2V0KSB7XG4gICAgICBpZiAobWFya2VkRHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgICBjb25zdCBkcm9wVGFyZ2V0TWFya2VkID0gZHJvcFRhcmdldC5pc01hcmtlZCgpO1xuICAgICAgICBcbiAgICAgICAgaWYgKGRyb3BUYXJnZXRNYXJrZWQpIHtcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWFya2VkRHJvcFRhcmdldDtcbiAgICB9LCBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnlHbG9iYWxseSgpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAobWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG1hcmtlZERyb3BUYXJnZXQgPSB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKTtcblxuICAgICAgbWFya2VkRHJvcFRhcmdldC5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGRvbmUpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IHRoaXMucGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcblxuICAgIHRoaXMubW92ZUhhbmRsZXIocGF0aE1hcHMsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgbGFzdERyYWdnYWJsZUVudHJ5ID0gYXJyYXlVdGlsLmxhc3QoZHJhZ2dhYmxlRW50cmllcyksXG4gICAgICAgICAgICBmaXJzdERyYWdnYWJsZUVudHJ5ID0gYXJyYXlVdGlsLmZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7IC8vL1xuXG4gICAgICBpZiAocmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcykge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgIH1cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gbGFzdERyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMpIHtcbiAgICAgICAgICAgIGRyYWdnYWJsZUVudHJpZXNFeHBsb3Jlci5zZXRPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBhcnJheVV0aWwuZmluZChwYXRoTWFwcywgZnVuY3Rpb24ocGF0aE1hcCkge1xuICAgICAgICAgICAgICAgICAgY29uc3Qgc291cmNlUGF0aCA9IHBhdGhNYXBbJ3NvdXJjZVBhdGgnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCk7XG4gIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHNvdXJjZVBhdGggPSBwYXRoTWFwWydzb3VyY2VQYXRoJ10sXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGF0aCA9IHBhdGhNYXBbJ3RhcmdldFBhdGgnXTtcblxuICAgICAgICAgIHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgZG9uZSgpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cblxuICBtb3ZlRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnksICAvLy9cbiAgICAgICAgICAgIHNvdXJjZURpcmVjdG9yeVBhdGggPSBzb3VyY2VQYXRoLCAvLy9cbiAgICAgICAgICAgIHRhcmdldERpcmVjdG9yeVBhdGggPSB0YXJnZXRQYXRoOyAvLy9cblxuICAgICAgdGhpcy5tb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIHNvdXJjZUZpbGVQYXRoID0gc291cmNlUGF0aCwgIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RmlsZVBhdGggPSB0YXJnZXRQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMubW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRmlsZVBhdGgsIHRhcmdldEZpbGVQYXRoKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi9vcHRpb25zJyksXG4gICAgICBwYXRoVXRpbCA9IHJlcXVpcmUoJy4vdXRpbC9wYXRoJyksXG4gICAgICBhcnJheVV0aWwgPSByZXF1aXJlKCcuL3V0aWwvYXJyYXknKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXIgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L21hcmtlci9kaXJlY3RvcnlOYW1lJyksXG4gICAgICBSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi9leHBsb3Jlci9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lL3Jvb3QnKTtcblxuY29uc3QgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeTtcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaGFzT3B0aW9uKG9wdGlvbikge1xuICAgIG9wdGlvbiA9ICh0aGlzLm9wdGlvbnNbb3B0aW9uXSA9PT0gdHJ1ZSk7IC8vL1xuXG4gICAgcmV0dXJuIG9wdGlvbjtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcbiAgICBcbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG4gIFxuICBhZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZXJFbnRyeVBhdGggPSBkaXJlY3RvcnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5UGF0aCArICcvJyArIGRyYWdnYWJsZUVudHJ5TmFtZTtcblxuICAgIHRoaXMuYWRkUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5KG1hcmtlckVudHJ5UGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5pc1BhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZShkcmFnZ2FibGVFbnRyeVBhdGgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgICAgdGhpcy5hZGRUb3Btb3N0RGlyZWN0b3J5TWFya2VyKHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlcih0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlNYXJrZXJOYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGgsICAvLy9cbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUsICAvLy9cbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gPERpcmVjdG9yeU5hbWVNYXJrZXIgbmFtZT17bmFtZX0gLz47XG5cbiAgICB0aGlzLmFwcGVuZCh0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5KTtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgY2hpbGRMaXN0RWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpJyk7XG5cbiAgICBjaGlsZExpc3RFbGVtZW50cy5zb21lKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgICAgaWYgKGNoaWxkRWxlbWVudCBpbnN0YW5jZW9mIERpcmVjdG9yeU5hbWVNYXJrZXIpIHtcbiAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IGNoaWxkRWxlbWVudDsgIC8vL1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmIChyb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBzdGFydERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpLFxuICAgICAgICAgIHN0YXJ0ZWREcmFnZ2luZyA9ICFtYXJrZWQ7XG5cbiAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICB0aGlzLmFkZE1hcmtlckVudHJ5SW5QbGFjZShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0ZWREcmFnZ2luZztcbiAgfVxuXG4gIHN0b3BEcmFnZ2luZyhkcmFnZ2FibGVFbnRyeSwgZG9uZSkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgbWFya2VkRHJvcFRhcmdldCA9IG1hcmtlZCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldE1hcmtlZERyb3BUYXJnZXQoKSxcbiAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBtYXJrZWREcm9wVGFyZ2V0LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCksXG4gICAgICAgICAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSxcbiAgICAgICAgICB0YXJnZXRQYXRoID0gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UGF0aCxcbiAgICAgICAgICB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKG1hcmtlZCAmJiB1bm1vdmVkKSB7XG4gICAgICB0aGlzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW4gPSB0aGlzLmhhc09wdGlvbihvcHRpb25zLk5PX0RSQUdHSU5HX1dJVEhJTiksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmcgPSB3aXRoaW4gJiYgbm9EcmFnZ2luZ1dpdGhpbjtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcblxuICAgIGxldCBmaWxlUGF0aDtcblxuICAgIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gc291cmNlRmlsZVBhdGgpIHtcblxuICAgIH0gZWxzZSBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlUGF0aCA9IHNvdXJjZUZpbGVQYXRoOyAgLy8vXG5cbiAgICAgIGV4cGxvcmVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoKTtcblxuICAgICAgZmlsZVBhdGggPSB0YXJnZXRGaWxlUGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IHJlY29nbmlzZWQgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmlzUmVjb2duaXNlZCgpLFxuICAgICAgICAgICAgaGlkZGVuID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5pc0hpZGRlbigpO1xuXG4gICAgICB0aGlzLmFkZEZpbGVQYXRoKGZpbGVQYXRoLCByZWNvZ25pc2VkLCBoaWRkZW4pO1xuICAgIH1cbiAgfVxuXG4gIG1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VEaXJlY3RvcnlQYXRoLCB0YXJnZXREaXJlY3RvcnlQYXRoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpLFxuICAgICAgICAgICAgaGlkZGVuID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzSGlkZGVuKCk7XG4gICAgICBcbiAgICAgIHRoaXMuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoLCBjb2xsYXBzZWQsIGhpZGRlbik7XG4gICAgfVxuICB9XG5cbiAgb3BlbkZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIGZpbGVQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICAgIHRoaXMub3BlbkhhbmRsZXIoZmlsZVBhdGgpO1xuICB9XG5cbiAgcGF0aE1hcHNGcm9tRHJhZ2dhYmxlRW50cmllcyhkcmFnZ2FibGVFbnRyaWVzLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gICAgY29uc3QgcGF0aE1hcHMgPSBkcmFnZ2FibGVFbnRyaWVzLm1hcChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgcGF0aE1hcCA9IHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgICByZXR1cm4gcGF0aE1hcDtcbiAgICB9KTtcblxuICAgIHJldHVybiBwYXRoTWFwcztcbiAgfVxuXG4gIGNoaWxkRWxlbWVudHMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgcm9vdERpcmVjdG9yeU5hbWUsIHJvb3REaXJlY3RvcnlDb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgbmFtZSA9IHJvb3REaXJlY3RvcnlOYW1lLCAvLy9cbiAgICAgICAgICBjb2xsYXBzZWQgPSByb290RGlyZWN0b3J5Q29sbGFwc2VkLCAvLy9cbiAgICAgICAgICBleHBsb3JlciA9IHRoaXMsICAvLy9cbiAgICAgICAgICByb290RGlyZWN0b3J5ID0gPFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgbmFtZT17bmFtZX0gZXhwbG9yZXI9e2V4cGxvcmVyfSBjb2xsYXBzZWQ9e2NvbGxhcHNlZH0gLz47XG5cbiAgICByZXR1cm4gcm9vdERpcmVjdG9yeTtcbiAgfVxuXG4gIGFwcGx5UHJvcGVydGllcygpIHtcbiAgICBzdXBlci5hcHBseVByb3BlcnRpZXMoLi4uYXJndW1lbnRzKTtcblxuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uTW92ZSwgb25PcGVuLCBvcHRpb25zIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIG1vdmVIYW5kbGVyID0gb25Nb3ZlLCAvLy9cbiAgICAgICAgICBvcGVuSGFuZGxlciA9IG9uT3BlbiwgLy8vXG4gICAgICAgICAgZXhwbG9yZXIgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEV4cGxvcmVyLCBwcm9wZXJ0aWVzLCBtb3ZlSGFuZGxlciwgb3BlbkhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIFxuICAgIHJldHVybiBleHBsb3JlcjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEV4cGxvcmVyLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZXhwbG9yZXInXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ3Jvb3REaXJlY3RvcnlOYW1lJyxcbiAgICAncm9vdERpcmVjdG9yeUNvbGxhcHNlZCcsXG4gICAgJ29uT3BlbicsXG4gICAgJ29uTW92ZScsXG4gICAgJ29wdGlvbnMnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4cGxvcmVyO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSAoc291cmNlUGF0aCA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgICAgcHJlcGVuZFRhcmdldFBhdGhUb0RyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHRhcmdldFBhdGgpIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTsgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeTogZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCAgdGFyZ2V0UGF0aCkge1xuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgJy8nICsgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VTb3VyY2VQYXRoV2l0aFRhcmdldFBhdGhJbkRyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeVBhdGgsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgc291cmNlUGF0aCA9IHNvdXJjZVBhdGgucmVwbGFjZSgvXFwoL2csICdcXFxcKCcpLnJlcGxhY2UoL1xcKS9nLCAnXFxcXCknKTsgIC8vL1xuXG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14nICsgc291cmNlUGF0aCArICcoLiokKScpLFxuICAgICAgICBtYXRjaGVzID0gZHJhZ2dhYmxlRW50cnlQYXRoLm1hdGNoKHJlZ0V4cCksXG4gICAgICAgIHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0YXJnZXRQYXRoICsgc2Vjb25kTWF0Y2g7IC8vL1xuXG4gIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi9uYW1lQnV0dG9uJyk7XG5cbmNvbnN0IEVTQ0FQRV9LRVlDT0RFID0gMjcsXG4gICAgICBTVEFSVF9EUkFHR0lOR19ERUxBWSA9IDE3NTtcblxuY29uc3QgeyB3aW5kb3csIEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBEcmFnZ2FibGVFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgZXhwbG9yZXIsIHR5cGUpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG5cbiAgICBjb25zdCBuYW1lQnV0dG9uID0gPE5hbWVCdXR0b24+e25hbWV9PC9OYW1lQnV0dG9uPjtcblxuICAgIHRoaXMuZXhwbG9yZXIgPSBleHBsb3JlcjtcbiAgICBcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICB0aGlzLnRvcE9mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sZWZ0T2Zmc2V0ID0gbnVsbDtcbiAgICBcbiAgICB0aGlzLm5hbWVCdXR0b24gPSBuYW1lQnV0dG9uO1xuXG4gICAgdGhpcy5ib3VuZE1vdXNlVXBIYW5kbGVyID0gdGhpcy5tb3VzZVVwSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYm91bmRNb3VzZURvd25IYW5kbGVyID0gdGhpcy5tb3VzZURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgdGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIgPSB0aGlzLm1vdXNlTW92ZUhhbmRsZXIuYmluZCh0aGlzKTtcblxuICAgIHRoaXMub25Nb3VzZURvd24odGhpcy5ib3VuZE1vdXNlRG93bkhhbmRsZXIpO1xuXG4gICAgdGhpcy5hcHBlbmQobmFtZUJ1dHRvbik7XG4gIH1cblxuICBnZXROYW1lKCkgeyByZXR1cm4gdGhpcy5uYW1lQnV0dG9uLmdldE5hbWUoKTsgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG5cbiAgZ2V0UGF0aCgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMsICAvLy9cbiAgICAgICAgICBwYXRoID0gdGhpcy5leHBsb3Jlci5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cbiAgXG4gIGdldENvbGxhcHNlZEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzRHJhZ2dpbmcoKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmhhc0NsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgaXNIaWRkZW4oKSB7XG4gICAgY29uc3QgaGlkZGVuID0gdGhpcy5oYXNDbGFzcygnaGlkZGVuJyk7XG5cbiAgICByZXR1cm4gaGlkZGVuO1xuICB9XG4gIFxuICBzaG93KCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG4gIFxuICBoaWRlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2hpZGRlbicpO1xuICB9XG5cbiAgaXNSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoY29sbGFwc2VkQm91bmRzKSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBvdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyA9IGJvdW5kcy5hcmVPdmVybGFwcGluZyhjb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgc2V0TmFtZShuYW1lKSB7IHRoaXMubmFtZUJ1dHRvbi5zZXROYW1lKG5hbWUpOyB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7IHRoaXMubmFtZUJ1dHRvbi5vbkRvdWJsZUNsaWNrKGhhbmRsZXIpOyB9XG5cbiAgc3RhcnREcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgY29uc3QgZXNjYXBlS2V5U3RvcHNEcmFnZ2luZyA9IHRoaXMuZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyksXG4gICAgICAgICAgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBib3VuZHNUb3AgPSBib3VuZHMuZ2V0VG9wKCksXG4gICAgICAgICAgYm91bmRzTGVmdCA9IGJvdW5kcy5nZXRMZWZ0KCk7XG5cbiAgICB0aGlzLnRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wO1xuICAgIHRoaXMubGVmdE9mZnNldCA9IGJvdW5kc0xlZnQgLSBtb3VzZUxlZnQ7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZykge1xuICAgICAgdGhpcy5vbktleURvd24odGhpcy5rZXlEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLkVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpO1xuXG4gICAgaWYgKGVzY2FwZUtleVN0b3BzRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMub2ZmKCdrZXlkb3duJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVDbGFzcygnZHJhZ2dpbmcnKTtcbiAgfVxuXG4gIGRyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICB0aGlzLmRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG5cbiAgc3RhcnRXYWl0aW5nVG9EcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCA9PT0gbnVsbCkge1xuICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgICBjb25zdCByb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICAgICAgc3ViRW50cnkgPSAhcm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgICBub0RyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lORyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdTdWJFbnRyaWVzID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5leHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5OT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWSk7ICAvLy9cblxuICAgICAgICBpZiAoKG5vRHJhZ2dpbmcpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllcykgfHwgKHJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgJiYgbm9EcmFnZ2luZ1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbW91c2VPdmVyID0gdGhpcy5pc01vdXNlT3Zlcihtb3VzZVRvcCwgbW91c2VMZWZ0KTtcblxuICAgICAgICBpZiAobW91c2VPdmVyKSB7XG4gICAgICAgICAgY29uc3Qgc3RhcnRlZERyYWdnaW5nID0gdGhpcy5leHBsb3Jlci5zdGFydERyYWdnaW5nKHRoaXMpO1xuXG4gICAgICAgICAgaWYgKHN0YXJ0ZWREcmFnZ2luZykge1xuICAgICAgICAgICAgdGhpcy5zdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfS5iaW5kKHRoaXMpLCBTVEFSVF9EUkFHR0lOR19ERUxBWSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcFdhaXRpbmdUb0RyYWcoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG5cbiAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgaXNNb3VzZU92ZXIobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZEJvdW5kcyA9IHRoaXMuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZSA9IGNvbGxhcHNlZEJvdW5kcy5pc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCksXG4gICAgICAgICAgbW91c2VPdmVyID0gY29sbGFwc2VkQm91bmRzT3ZlcmxhcHBpbmdNb3VzZTtcblxuICAgIHJldHVybiBtb3VzZU92ZXI7XG4gIH1cblxuICBtb3VzZURvd25IYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgd2luZG93Lm9uKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vbk1vdXNlTW92ZSh0aGlzLmJvdW5kTW91c2VNb3ZlSGFuZGxlcik7XG5cbiAgICBpZiAobW91c2VCdXR0b24gPT09IEVsZW1lbnQuTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdtb3VzZXVwIGJsdXInLCB0aGlzLmJvdW5kTW91c2VVcEhhbmRsZXIpO1xuICAgIFxuICAgIHdpbmRvdy5vZmZNb3VzZU1vdmUodGhpcy5ib3VuZE1vdXNlTW92ZUhhbmRsZXIpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5leHBsb3Jlci5zdG9wRHJhZ2dpbmcodGhpcywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3BXYWl0aW5nVG9EcmFnKCk7XG4gICAgfVxuICB9XG5cbiAgbW91c2VNb3ZlSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgfVxuICB9XG5cbiAga2V5RG93bkhhbmRsZXIoa2V5Q29kZSkge1xuICAgIGNvbnN0IGVzY2FwZUtleSA9IChrZXlDb2RlID09PSBFU0NBUEVfS0VZQ09ERSk7XG5cbiAgICBpZiAoZXNjYXBlS2V5KSB7XG4gICAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaXNEcmFnZ2luZygpO1xuXG4gICAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5leHBsb3Jlci5lc2NhcGVEcmFnZ2luZygpO1xuXG4gICAgICAgIHRoaXMuc3RvcERyYWdnaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBkcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cuZ2V0U2Nyb2xsVG9wKCksXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5nZXRTY3JvbGxMZWZ0KCk7XG5cbiAgICBsZXQgdG9wID0gbW91c2VUb3AgKyB0aGlzLnRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIHRoaXMubGVmdE9mZnNldCAtIHdpbmRvd1Njcm9sbExlZnQ7XG5cbiAgICB0b3AgPSBgJHt0b3B9cHhgOyAvLy9cbiAgICBsZWZ0ID0gYCR7bGVmdH1weGA7IC8vL1xuXG4gICAgY29uc3QgY3NzID0ge1xuICAgICAgdG9wOiB0b3AsXG4gICAgICBsZWZ0OiBsZWZ0XG4gICAgfTtcblxuICAgIHRoaXMuY3NzKGNzcyk7XG5cbiAgICB0aGlzLmV4cGxvcmVyLmRyYWdnaW5nKHRoaXMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgaGlkZGVuIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcblxuICAgIGhpZGRlbiA/XG4gICAgICBkcmFnZ2FibGVFbnRyeS5oaWRlKCkgOlxuICAgICAgICBkcmFnZ2FibGVFbnRyeS5zaG93KCk7XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEcmFnZ2FibGVFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdoaWRkZW4nXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZUVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uL2VudHJ5JyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vZW50cmllcycpLFxuICAgICAgcGF0aFV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL3BhdGgnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY29uc3QgeyBCdXR0b24sIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBuYW1lLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgY29uc3QgZW50cmllcyA9IDxFbnRyaWVzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeT17RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5fSAvPixcbiAgICAgICAgICB0b2dnbGVCdXR0b24gPSA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RoaXMudG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyl9IC8+O1xuICAgIFxuICAgIHRoaXMub25Eb3VibGVDbGljayh0aGlzLmRvdWJsZUNsaWNrSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuZW50cmllcyA9IGVudHJpZXM7XG5cbiAgICB0aGlzLmFwcGVuZChlbnRyaWVzKTtcblxuICAgIHRoaXMucHJlcGVuZCh0b2dnbGVCdXR0b24pO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgYmVmb3JlID0gbmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwO1xuXG4gICAgICAgIHJldHVybiBiZWZvcmU7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaXNDb2xsYXBzZWQoKTtcblxuICAgIHRoaXMuY29sbGFwc2UoKTtcblxuICAgIGNvbnN0IGJvdW5kcyA9IHN1cGVyLmdldEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kcyA9IGJvdW5kczsgIC8vL1xuXG4gICAgaWYgKCFjb2xsYXBzZWQpIHtcbiAgICAgIHRoaXMuZXhwYW5kKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbGxhcHNlZEJvdW5kcztcbiAgfVxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRoaXMuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuXG4gICAgcmV0dXJuIGNvbGxhcHNlZDtcbiAgfVxuXG4gIGlzTWFya2VkKCkge1xuICAgIGxldCBtYXJrZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG5cbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgbWFya2VkID0gZW50cmllc01hcmtlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc01hcmtlZCgpO1xuXG4gICAgICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ7XG4gICAgICB9KTtcblxuICAgICAgbWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHsgcmV0dXJuIHRoaXMuZW50cmllcy5pc0VtcHR5KCk7IH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICBcbiAgICBpZiAodGhpcyA9PT0gZHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuICAgICAgXG4gICAgICBpZiAoY29sbGFwc2VkKSB7XG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzID0gZHJhZ2dhYmxlRW50cnkuZ2V0Q29sbGFwc2VkQm91bmRzKCksXG4gICAgICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBzdXBlci5pc092ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzKGRyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzKTtcblxuICAgICAgICBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZEZpbGVQYXRoKGZpbGVQYXRoLCByZWNvZ25pc2VkLCBoaWRkZW4pIHtcbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZEZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lLCByZWNvZ25pc2VkLCBoaWRkZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRmlsZSkge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZW50cmllcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCwgaGlkZGVuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCwgaGlkZGVuKSB7XG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCwgaGlkZGVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZSA9IGRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5lbnRyaWVzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIGhpZGRlbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IG51bGw7IC8vL1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSxcbiAgICAgICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBmaWxlUGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0ZpbGUgPSB0aGlzLmVudHJpZXMuaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSk7XG5cbiAgICAgIGlmIChlbnRyaWVzRmlsZSkge1xuICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdGhpcy5lbnRyaWVzLnJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG5cbiAgcmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKSB7XG4gICAgbGV0IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSBudWxsOyAvLy9cblxuICAgIGNvbnN0IGFkZElmTmVjZXNzYXJ5ID0gZmFsc2UsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5lbnRyaWVzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChkaXJlY3RvcnlOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID09PSB0cnVlKSB7XG4gICAgICBjb25zdCByb290RGlyZWN0b3J5ID0gdGhpcy5pc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKCFyb290RGlyZWN0b3J5KSB7XG4gICAgICAgIGNvbnN0IGVtcHR5ID0gdGhpcy5pc0VtcHR5KCk7XG5cbiAgICAgICAgaWYgKGVtcHR5KSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzO1xuICB9XG4gIFxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IG1hcmtlck5hbWUgPSBtYXJrZXJQYXRoOyAgLy8vXG5cbiAgICAgIHRoaXMuZW50cmllcy5hZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICAgIG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgobWFya2VyUGF0aCk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgcmVtb3ZlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAoZW50cmllc01hcmtlZCkge1xuICAgICAgdGhpcy5lbnRyaWVzLnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIHJlbW92ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVkID0gdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZW1vdmVkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZW1vdmVkO1xuICB9XG5cbiAgZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKTsgfVxuXG4gIGZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spOyB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjayk7IH1cblxuICByZXRyaWV2ZUZpbGVQYXRocygpIHtcbiAgICBsZXQgZmlsZVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoKSxcbiAgICAgICAgICBkaXJlY3RvcnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHMoKTtcblxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBsZXQgc3ViRW50cmllcyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBzdWJFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIC8vL1xuICAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlU3ViRW50cmllcygpO1xuXG4gICAgICBzdWJFbnRyaWVzLnB1c2goc3ViRW50cnkpO1xuXG4gICAgICBzdWJFbnRyaWVzID0gc3ViRW50cmllcy5jb25jYXQoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5U3ViRW50cmllcyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aDtcblxuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeSA9PT0gdGhpcykge1xuICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gbmFtZTsgIC8vL1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSB0aGlzLmVudHJpZXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IG5hbWUgKyAnLycgKyBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShwYXRoLCBhZGRJZk5lY2Vzc2FyeSkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC50b3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKSB7XG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgICAgIGNvbnN0IGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gdGhpcy5lbnRyaWVzLmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgICAgaWYgKCFlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCkge1xuICAgICAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IHRydWUsIC8vL1xuICAgICAgICAgICAgICAgIGhpZGRlbiA9IGZhbHNlLCAvLy9cbiAgICAgICAgICAgICAgICBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICAgIHRoaXMuZW50cmllcy5hZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkodG9wbW9zdERpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQsIGhpZGRlbik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChtYXJrZWQpIHtcbiAgICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIGlmIChvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICB0b2dnbGVCdXR0b25DbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIGRvdWJsZUNsaWNrSGFuZGxlcigpIHtcbiAgICB0aGlzLnRvZ2dsZSgpO1xuICB9XG5cbiAgY29sbGFwc2UoKSB7XG4gICAgdGhpcy5hZGRDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICBleHBhbmQoKSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cblxuICB0b2dnbGUoKSB7XG4gICAgdGhpcy50b2dnbGVDbGFzcygnY29sbGFwc2VkJyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRHJhZ2dhYmxlRW50cnkuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcblxuICAgIGNvbGxhcHNlZCA/XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuY29sbGFwc2UoKSA6XG4gICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5leHBhbmQoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHtcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkaXJlY3RvcnlOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdjb2xsYXBzZWQnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIHBhdGhVdGlsID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbC9wYXRoJyksXG4gICAgICBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9kcmFnZ2FibGVFbnRyeS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNsYXNzIFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkge1xuICByZXRyaWV2ZSgpIHtcbiAgICByZXR1cm4gdGhpczsgIC8vL1xuICB9XG4gIFxuICBpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhZGRGaWxlUGF0aChmaWxlUGF0aCwgcmVjb2duaXNlZCA9IHRydWUsIGhpZGRlbiA9IGZhbHNlKSB7XG4gICAgY29uc3QgZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgaWYgKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBzdXBlci5hZGRGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgcmVjb2duaXNlZCwgaGlkZGVuKTtcbiAgICB9XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlLCBoaWRkZW4gPSBmYWxzZSkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgPSBwYXRoVXRpbC5wYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIuYWRkRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lLCBjb2xsYXBzZWQsIGhpZGRlbik7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZUZpbGVQYXRoKGZpbGVQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGRpcmVjdG9yeVBhdGhXaXRob3V0Um9vdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIHN1cGVyLnJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICBub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzID0gZXhwbG9yZXIuaGFzT3B0aW9uKG9wdGlvbnMuTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVMpO1xuXG4gICAgaWYgKG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXMpIHtcbiAgICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID9cbiAgICAgICAgdGhpcyA6XG4gICAgICAgICAgbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHN1cGVyLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJQYXRoLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBjb25zdCBtYXJrZXJQYXRoV2l0aG91dFJvb3REaXJlY3RvcnlOYW1lID0gcGF0aFV0aWwucGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgc3VwZXIuYWRkTWFya2VyRW50cnkobWFya2VyUGF0aFdpdGhvdXRSb290RGlyZWN0b3J5TmFtZSwgZHJhZ2dhYmxlRW50cnlUeXBlKTtcbiAgfVxuXG4gIHBhcmVudENvbnRleHQoKSB7XG4gICAgcmV0dXJuICh7XG4gICAgICBhZGRGaWxlUGF0aDogdGhpcy5hZGRGaWxlUGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRmlsZVBhdGg6IHRoaXMucmVtb3ZlRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIGFkZERpcmVjdG9yeVBhdGg6IHRoaXMuYWRkRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmVtb3ZlRGlyZWN0b3J5UGF0aDogdGhpcy5yZW1vdmVEaXJlY3RvcnlQYXRoLmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aDogdGhpcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlLmJpbmQodGhpcyksICAvLy9cbiAgICAgIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk6IHRoaXMucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5LmJpbmQodGhpcyksXG4gICAgICBhZGRSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMuYWRkTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICByZW1vdmVSb290RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VyRW50cnk6IHRoaXMucmVtb3ZlTWFya2VyRW50cnkuYmluZCh0aGlzKSwgLy8vXG4gICAgICBpc1Jvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ6IHRoaXMuaXNNYXJrZWQuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgZ2V0Um9vdERpcmVjdG9yeU5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZUZpbGVQYXRoczogdGhpcy5yZXRyaWV2ZUZpbGVQYXRocy5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKFJvb3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpLFxuICAgICAgbmFtZVV0aWwgPSByZXF1aXJlKCcuLi8uLi91dGlsL25hbWUnKSxcbiAgICAgIERyYWdnYWJsZUVudHJ5ID0gcmVxdWlyZSgnLi4vZHJhZ2dhYmxlRW50cnknKTtcblxuY2xhc3MgRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IEVudHJ5LnR5cGVzLkZJTEVfTkFNRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCBuYW1lLCBleHBsb3JlciwgdHlwZSk7XG4gICAgXG4gICAgdGhpcy5vbkRvdWJsZUNsaWNrKHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNCZWZvcmUoZW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuICAgIFxuICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgIHN3aXRjaCAoZW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLk1BUktFUjpcbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRklMRV9OQU1FOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcbiAgICAgICAgICBcbiAgICAgICAgYmVmb3JlID0gbmFtZUlzQmVmb3JlRW50cnlOYW1lKG5hbWUsIGVudHJ5TmFtZSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG5cbiAgaXNSZWNvZ25pc2VkKCkge1xuICAgIGNvbnN0IHJlY29nbmlzZWQgPSB0aGlzLmhhc0NsYXNzKCdyZWNvZ25pc2VkJyk7XG5cbiAgICByZXR1cm4gcmVjb2duaXNlZDtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuXG4gIHJlY29nbmlzZSgpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBvdmVybG9vaygpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdyZWNvZ25pc2VkJyk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgY29uc3QgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgZmlsZSA9IHRoaXM7IC8vL1xuICAgIFxuICAgIGV4cGxvcmVyLm9wZW5GaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGUpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSwgZXhwbG9yZXIsIHJlY29nbmlzZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMsIG5hbWUsIGV4cGxvcmVyKTtcblxuICAgIHJlY29nbmlzZWQgP1xuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZWNvZ25pc2UoKSA6XG4gICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkub3Zlcmxvb2soKTtcblxuICAgIHJldHVybiBmaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGVOYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnZXhwbG9yZXInLFxuICAgICdyZWNvZ25pc2VkJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZURyYWdnYWJsZUVudHJ5O1xuXG5mdW5jdGlvbiBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKSB7XG4gIGxldCBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGVudHJ5TmFtZSkgPCAwKTtcbiAgXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBuYW1lVXRpbC5leHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gbmFtZVV0aWwuZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lVXRpbC5uYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVV0aWwubmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiZWZvcmU7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2RyYWdnYWJsZUVudHJ5L2ZpbGVOYW1lJyk7XG5cbmNvbnN0IHsgRWxlbWVudCwgUmVhY3QgfSA9IGVhc3k7XG5cbmNsYXNzIEVudHJpZXMgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3JlciwgcmVjb2duaXNlZCwgaGlkZGVuKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IHJlY29nbmlzZWQ9e3JlY29nbmlzZWR9IGhpZGRlbj17aGlkZGVufSAvPixcbiAgICAgICAgICBlbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSwgZXhwbG9yZXIsIGNvbGxhcHNlZCwgaGlkZGVuKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gPHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IGhpZGRlbj17aGlkZGVufSAvPixcbiAgICAgICAgICBlbnRyeSA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuICAgIFxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IGV4cGxvcmVyLmhhc09wdGlvbihvcHRpb25zLlJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMpO1xuXG4gICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lKSxcbiAgICAgICAgICBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXMgPSBleHBsb3Jlci5oYXNPcHRpb24ob3B0aW9ucy5SRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcblxuICAgIHJldHVybiByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzO1xuICB9XG5cbiAgaXNGaWxlTmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudChmaWxlTmFtZSkge1xuICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLCAgICBcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50ID0gKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQ7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShtYXJrZXJOYW1lLCBkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICBsZXQgbWFya2VyRW50cnk7XG4gICAgXG4gICAgY29uc3QgbmFtZSA9IG1hcmtlck5hbWU7ICAvLy9cblxuICAgIHN3aXRjaCAoZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgICBjYXNlIEVudHJ5LnR5cGVzLkZJTEVfTkFNRTpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RmlsZU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUU6XG4gICAgICAgIG1hcmtlckVudHJ5ID0gPERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBuYW1lPXtuYW1lfSAvPjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3QgZW50cnkgPSBtYXJrZXJFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgfVxuXG4gIHJlbW92ZU1hcmtlckVudHJ5KCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5KCk7XG5cbiAgICBtYXJrZXJFbnRyeS5yZW1vdmUoKTtcbiAgfVxuICBcbiAgaXNNYXJrZWQoKSB7XG4gICAgY29uc3QgbWFya2VyID0gdGhpcy5yZXRyaWV2ZU1hcmtlckVudHJ5KCksXG4gICAgICAgICAgbWFya2VkID0gKG1hcmtlciE9PSBudWxsKTtcblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyaWVzTGVuZ3RoID0gZW50cmllcy5sZW5ndGgsXG4gICAgICAgICAgZW1wdHkgPSAoZW50cmllc0xlbmd0aCA9PT0gMCk7XG5cbiAgICByZXR1cm4gZW1wdHk7XG4gIH1cblxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGxldCBwcmV2aW91c0VudHJ5ID0gbnVsbDtcblxuICAgIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlID0gbmV4dEVudHJ5LmlzQmVmb3JlKGVudHJ5KTtcbiAgICAgIFxuICAgICAgaWYgKG5leHRFbnRyeUJlZm9yZSkge1xuICAgICAgICBwcmV2aW91c0VudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmlvdXNFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgdGhpcy5hcHBlbmQobmV4dEVudHJ5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV4dEVudHJ5Lmluc2VydEJlZm9yZShwcmV2aW91c0VudHJ5KTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHsgcmV0dXJuIHRoaXMucmV0cmlldmVFbnRyeUJ5VHlwZShmaWxlTmFtZSwgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5yZXRyaWV2ZUVudHJ5QnlUeXBlKGRpcmVjdG9yeU5hbWUsIEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSB9XG5cbiAgcmV0cmlldmVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgbWFya2VyID0gbnVsbDtcbiAgICBcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIG1hcmtlciA9IGVudHJ5OyAgLy8vXG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sIHR5cGUpO1xuXG4gICAgcmV0dXJuIG1hcmtlcjtcbiAgfVxuXG4gIHJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIGxldCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgIGlmIChtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICByZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeVBhdGggPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc29tZUVudHJ5KGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBpZiAoZW50cnkgPT09IGRyYWdnYWJsZUVudHJ5KSB7ICAvLy9cbiAgICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICBcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZW50cnlOYW1lOyAgLy8vXG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBcbiAgICBpZiAoZHJhZ2dhYmxlRW50cnlQYXRoID09PSBudWxsKSB7XG4gICAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdG9yeURyYWdnYWJsZUVudHJ5UGF0aCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoICE9PSBudWxsKSB7XG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgICAgICBcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkcmFnZ2FibGVFbnRyeVBhdGg7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBmb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRklMRV9OQU1FKSB9XG5cbiAgZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyB0aGlzLmZvckVhY2hFbnRyeUJ5VHlwZShjYWxsYmFjaywgRW50cnkudHlwZXMuRElSRUNUT1JZX05BTUUpIH1cblxuICBzb21lRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGUoY2FsbGJhY2ssIEVudHJ5LnR5cGVzLkZJTEVfTkFNRSkgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgcmV0dXJuIHRoaXMuc29tZUVudHJ5QnlUeXBlKGNhbGxiYWNrLCBFbnRyeS50eXBlcy5ESVJFQ1RPUllfTkFNRSkgfVxuXG4gIGZvckVhY2hFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlKGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICAgIGlmIChlbnRyeVR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FsbGJhY2soZW50cnkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc29tZUVudHJ5KGNhbGxiYWNrLCB0eXBlKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZShjYWxsYmFjaywgdHlwZSkge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKTtcblxuICAgIHJldHVybiBlbnRyaWVzLnNvbWUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKTtcblxuICAgICAgaWYgKGVudHJ5VHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBjYWxsYmFjayhlbnRyeSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmV0cmlldmVFbnRyeUJ5VHlwZShuYW1lLCB0eXBlKSB7XG4gICAgbGV0IGZvdW5kRW50cnkgPSBudWxsO1xuXG4gICAgdGhpcy5zb21lRW50cnlCeVR5cGUoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgaWYgKGVudHJ5TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICBmb3VuZEVudHJ5ID0gZW50cnk7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSwgdHlwZSk7XG5cbiAgICBjb25zdCBlbnRyeSA9IGZvdW5kRW50cnk7IC8vL1xuXG4gICAgcmV0dXJuIGVudHJ5O1xuICB9XG5cbiAgZ2V0RW50cmllcygpIHtcbiAgICBjb25zdCBjaGlsZExpc3RFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygnbGknKSxcbiAgICAgICAgICBlbnRyaWVzID0gY2hpbGRMaXN0RWxlbWVudHM7ICAvLy9cblxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBlbnRyaWVzID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFbnRyaWVzLCBwcm9wZXJ0aWVzLCBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpO1xuICAgIFxuICAgIHJldHVybiBlbnRyaWVzO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRW50cmllcywge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2VudHJpZXMnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cmllcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKTtcblxuY29uc3QgTmFtZUJ1dHRvbiA9IHJlcXVpcmUoJy4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbmFtZSwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGNvbnN0IG5hbWVCdXR0b24gPSA8TmFtZUJ1dHRvbj57bmFtZX08L05hbWVCdXR0b24+O1xuXG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIHRoaXMubmFtZUJ1dHRvbiA9IG5hbWVCdXR0b247XG5cbiAgICB0aGlzLmFwcGVuZChuYW1lQnV0dG9uKTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7IHJldHVybiB0aGlzLm5hbWVCdXR0b24uZ2V0TmFtZSgpOyB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICByZXR1cm4gdGhpcy50eXBlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZW50cnkgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyeSwge1xuICB0YWdOYW1lOiAnbGknLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJ1xuICBdLFxuICB0eXBlczoge1xuICAgIE1BUktFUjogJ01BUktFUicsXG4gICAgRklMRV9OQU1FOiAnRklMRV9OQU1FJyxcbiAgICBESVJFQ1RPUllfTkFNRTogJ0RJUkVDVE9SWV9OQU1FJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi9lbnRyeScpO1xuXG5jbGFzcyBNYXJrZXJFbnRyeSBleHRlbmRzIEVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRW50cnkudHlwZXMuTUFSS0VSO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIG5hbWUsIHR5cGUpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKSB7IHJldHVybiBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihNYXJrZXJFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ21hcmtlcidcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFya2VyRW50cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnknKSxcbiAgICAgIE1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi4vLi4vZW50cnkvbWFya2VyJyk7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5VHlwZSA9IGRyYWdnYWJsZUVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICBiZWZvcmUgPSAoZHJhZ2dhYmxlRW50cnlUeXBlID09PSBFbnRyeS50eXBlcy5GSUxFX05BTUUpID9cbiAgICAgICAgICAgICAgICAgICAgIHRydWUgOlxuICAgICAgICAgICAgICAgICAgICAgICAobmFtZS5sb2NhbGVDb21wYXJlKGRyYWdnYWJsZUVudHJ5TmFtZSkgPCAwKTtcblxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBNYXJrZXJFbnRyeS5mcm9tUHJvcGVydGllcyhEaXJlY3RvcnlOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5L21hcmtlcicpO1xuXG5jbGFzcyBGaWxlTmFtZU1hcmtlckVudHJ5IGV4dGVuZHMgTWFya2VyRW50cnkge1xuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGJlZm9yZSA9IChkcmFnZ2FibGVFbnRyeVR5cGUgPT09IEVudHJ5LnR5cGVzLkRJUkVDVE9SWV9OQU1FKSA/IFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UgOiBcbiAgICAgICAgICAgICAgICAgICAgICAgKG5hbWUubG9jYWxlQ29tcGFyZShkcmFnZ2FibGVFbnRyeU5hbWUpIDwgMCk7XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gTWFya2VyRW50cnkuZnJvbVByb3BlcnRpZXMoRmlsZU5hbWVNYXJrZXJFbnRyeSwgcHJvcGVydGllcyk7IH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBOYW1lQnV0dG9uIGV4dGVuZHMgSW5wdXRFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGRvdWJsZUNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChkb3VibGVDbGlja0hhbmRsZXIpIHtcbiAgICAgIHRoaXMub25Eb3VibGVDbGljayhkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIH1cbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgY29uc3QgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gYXJyYXlVdGlsLmZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIHRleHQgPSBmaXJzdENoaWxkRWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgICAgbmFtZSA9IHRleHQ7IC8vL1xuXG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBzZXROYW1lKG5hbWUpIHtcbiAgICBjb25zdCB0ZXh0ID0gbmFtZSwgLy8vXG4gICAgICAgICAgY2hpbGRFbGVtZW50cyA9IHRoaXMuZ2V0Q2hpbGRFbGVtZW50cygpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50ID0gYXJyYXlVdGlsLmZpcnN0KGNoaWxkRWxlbWVudHMpO1xuXG4gICAgZmlyc3RDaGlsZEVsZW1lbnQuc2V0VGV4dCh0ZXh0KTtcbiAgfVxuICBcbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uRG91YmxlQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZG91YmxlQ2xpY2tIYW5kbGVyID0gb25Eb3VibGVDbGljaywgLy8vXG4gICAgICAgICAgbmFtZUJ1dHRvbiA9IElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzLCBkb3VibGVDbGlja0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBuYW1lQnV0dG9uO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oTmFtZUJ1dHRvbiwge1xuICB0YWdOYW1lOiAnYnV0dG9uJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICduYW1lJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICduYW1lJyxcbiAgICAnb25Eb3VibGVDbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgTk9fRFJBR0dJTkc6ICdOT19EUkFHR0lORycsXG4gIE5PX0RSQUdHSU5HX1dJVEhJTjogJ05PX0RSQUdHSU5HX1dJVEhJTicsXG4gIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTOiAnTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMnLFxuICBOT19EUkFHR0lOR19ST09UX0RJUkVDVE9SWTogJ05PX0RSQUdHSU5HX1JPT1RfRElSRUNUT1JZJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVM6ICdOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUycsXG4gIFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVM6ICdSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTJyxcbiAgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORzogJ0VTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9wdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcblxuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcbiAgICBcbiAgICByZXR1cm4gbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG51bGw7IC8vL1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBpZiAodGFyZ2V0RmlsZVBhdGggPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICBcbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSwgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUnViYmlzaEJpbiwgcHJvcGVydGllcywgcmVtb3ZlSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIHJ1YmJpc2hCaW47XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihSdWJiaXNoQmluLCB7XG4gIHRhZ05hbWU6ICdkaXYnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ3J1YmJpc2hCaW4nXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uUmVtb3ZlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSdWJiaXNoQmluO1xuXG5mdW5jdGlvbiBwYXRoTWFwRnJvbURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIGNvbnN0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IGRyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeS5pc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICBkaXJlY3RvcnkgPSBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTsgIC8vL1xuXG4gIHRhcmdldFBhdGggPSBudWxsOyAgLy8vXG5cbiAgc291cmNlUGF0aCA9IGRyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gIGNvbnN0IHBhdGhNYXAgPSB7XG4gICAgc291cmNlUGF0aDogc291cmNlUGF0aCxcbiAgICB0YXJnZXRQYXRoOiB0YXJnZXRQYXRoLFxuICAgIGRpcmVjdG9yeTogZGlyZWN0b3J5XG4gIH07XG5cbiAgcmV0dXJuIHBhdGhNYXA7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIGFycmF5VXRpbCB7XG4gIHN0YXRpYyBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuICBzdGF0aWMgc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuXG4gIHN0YXRpYyBsYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSAxXTsgfVxuXG4gIHN0YXRpYyBpbmRleE9mKGFycmF5LCBlbGVtZW50KSB7XG4gICAgbGV0IGluZGV4ID0gLTE7XG5cbiAgICBhcnJheS5zb21lKGZ1bmN0aW9uKGN1cnJlbnRFbGVtZW50LCBjdXJyZW50RWxlbWVudEluZGV4KSB7XG4gICAgICBpZiAoY3VycmVudEVsZW1lbnQgPT09IGVsZW1lbnQpIHtcbiAgICAgICAgaW5kZXggPSBjdXJyZW50RWxlbWVudEluZGV4O1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgc3RhdGljIGZpbmQoYXJyYXksIGNhbGxiYWNrKSB7XG4gICAgbGV0IGVsZW1lbnQgPSBudWxsO1xuXG4gICAgYXJyYXkuc29tZShmdW5jdGlvbihjdXJyZW50RWxlbWVudCkge1xuICAgICAgaWYgKGNhbGxiYWNrKGN1cnJlbnRFbGVtZW50KSkge1xuICAgICAgICBlbGVtZW50ID0gY3VycmVudEVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5VXRpbDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXlVdGlsID0gcmVxdWlyZSgnLi4vdXRpbC9hcnJheScpO1xuXG5jbGFzcyBuYW1lVXRpbCB7XG4gIHN0YXRpYyBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IGV4dGVuc2lvbiA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL14uKlxcLihbXi5dKykkLyk7XG5cbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgICBleHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBleHRlbnNpb247XG4gIH1cblxuICBzdGF0aWMgbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShuYW1lKSB7XG4gICAgbGV0IG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbnVsbDtcblxuICAgIGNvbnN0IG1hdGNoZXMgPSBuYW1lLm1hdGNoKC9eKC4rKVxcLlteLl0rJC8pO1xuXG4gICAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHNlY29uZE1hdGNoID0gYXJyYXlVdGlsLnNlY29uZChtYXRjaGVzKTtcblxuICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBzZWNvbmRNYXRjaDsgIC8vL1xuICAgIH1cblxuICAgIHJldHVybiBuYW1lV2l0aG91dEV4dGVuc2lvbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hbWVVdGlsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhcnJheVV0aWwgPSByZXF1aXJlKCcuLi91dGlsL2FycmF5Jyk7XG5cbmNsYXNzIHBhdGhVdGlsIHtcbiAgc3RhdGljIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhVdGlsLnRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCksXG4gICAgICAgICAgcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lID09PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xuICB9XG5cbiAgc3RhdGljIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgocGF0aCkge1xuICAgIGxldCBib3R0b21tb3N0TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14uKlxcLyhbXlxcL10qJCkvKTtcbiAgICBcbiAgICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBhcnJheVV0aWwuc2Vjb25kKG1hdGNoZXMpO1xuICAgICAgXG4gICAgICBib3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGJvdHRvbW1vc3ROYW1lO1xuICB9XG5cbiAgc3RhdGljIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICAgIGxldCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL14oW15cXC9dKilcXC8vKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gdG9wbW9zdERpcmVjdG9yeU5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgICBsZXQgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goLyheLiopXFwvW15cXC9dKiQvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBzZWNvbmRNYXRjaDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG4gIH1cblxuICBzdGF0aWMgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgICBsZXQgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgbWF0Y2hlcyA9IHBhdGgubWF0Y2goL15bXlxcL10qXFwvKC4qJCkvKTtcblxuICAgIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBzZWNvbmRNYXRjaCA9IGFycmF5VXRpbC5zZWNvbmQobWF0Y2hlcyk7XG5cbiAgICAgIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBzZWNvbmRNYXRjaDtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGhVdGlsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2luZG93OiByZXF1aXJlKCcuL2xpYi93aW5kb3cnKSxcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vbGliL2RvY3VtZW50JyksXG4gIERpdjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9kaXYnKSxcbiAgU3BhbjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9zcGFuJyksXG4gIEJvZHk6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYm9keScpLFxuICBMaW5rOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2xpbmsnKSxcbiAgU2VsZWN0OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NlbGVjdCcpLFxuICBCdXR0b246IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYnV0dG9uJyksXG4gIENoZWNrYm94OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2NoZWNrYm94JyksXG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQnKSxcbiAgVGV4dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL3RleHRFbGVtZW50JyksXG4gIElucHV0OiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvaW5wdXQnKSxcbiAgVGV4dGFyZWE6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC90ZXh0YXJlYScpLFxuICBJbnB1dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudCcpLFxuICBCb3VuZHM6IHJlcXVpcmUoJy4vbGliL21pc2MvYm91bmRzJyksXG4gIE9mZnNldDogcmVxdWlyZSgnLi9saWIvbWlzYy9vZmZzZXQnKSxcbiAgUmVhY3Q6IHJlcXVpcmUoJy4vbGliL3JlYWN0Jylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2V2ZW50JyksXG4gICAgICBjbGlja01peGluID0gcmVxdWlyZSgnLi9taXhpbi9jbGljaycpLFxuICAgICAgbW91c2VNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbW91c2UnKSxcbiAgICAgIGtleU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9rZXknKTtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwgY2xpY2tNaXhpbik7XG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwgbW91c2VNaXhpbik7XG5PYmplY3QuYXNzaWduKERvY3VtZW50LnByb3RvdHlwZSwga2V5TWl4aW4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBEb2N1bWVudCgpOyAgLy8vXG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE9mZnNldCA9IHJlcXVpcmUoJy4vbWlzYy9vZmZzZXQnKSxcbiAgICAgIEJvdW5kcyA9IHJlcXVpcmUoJy4vbWlzYy9ib3VuZHMnKSxcbiAgICAgIGpzeE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9qc3gnKSxcbiAgICAgIGV2ZW50TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2V2ZW50JyksXG4gICAgICBjbGlja01peGluID0gcmVxdWlyZSgnLi9taXhpbi9jbGljaycpLFxuICAgICAgc2Nyb2xsTWl4aW4gPSByZXF1aXJlKCcuL21peGluL3Njcm9sbCcpLFxuICAgICAgcmVzaXplTWl4aW4gPSByZXF1aXJlKCcuL21peGluL3Jlc2l6ZScpLFxuICAgICAgbW91c2VNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbW91c2UnKSxcbiAgICAgIGtleU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9rZXknKTtcblxuY2xhc3MgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9tRWxlbWVudEZyb21TZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuX19lbGVtZW50X18gPSB0aGlzOyAvLy9cbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZSh0aGlzKTsgfVxuXG4gIGdldE9mZnNldCgpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0VG9wLCAgLy8vXG4gICAgICAgICAgbGVmdCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRMZWZ0LCAgLy8vXG4gICAgICAgICAgb2Zmc2V0ID0gbmV3IE9mZnNldCh0b3AsIGxlZnQpO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIGdldEJvdW5kcyhpbmNsdWRlQm9yZGVyID0gZmFsc2UpIHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgYm91bmRzID0gQm91bmRzLmZyb21Cb3VuZGluZ0NsaWVudFJlY3QoYm91bmRpbmdDbGllbnRSZWN0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBnZXRXaWR0aChpbmNsdWRlQm9yZGVyID0gZmFsc2UpIHtcbiAgICBjb25zdCB3aWR0aCA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0V2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHNldFdpZHRoKHdpZHRoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoOyB9XG5cbiAgZ2V0SGVpZ2h0KGluY2x1ZGVCb3JkZXIgPSBmYWxzZSkge1xuICAgIGNvbnN0IGhlaWdodCA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50Lm9mZnNldEhlaWdodCA6XG4gICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5jbGllbnRIZWlnaHQ7XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgc2V0SGVpZ2h0KGhlaWdodCkgeyB0aGlzLmRvbUVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0OyB9XG5cbiAgZ2V0QXR0cmlidXRlKG5hbWUpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5nZXRBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7IH1cblxuICBjbGVhckF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBhZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpIHsgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHsgdGhpcy5jbGVhckF0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIHNldENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lOyB9XG5cbiAgYWRkQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7IH1cblxuICByZW1vdmVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTsgfVxuXG4gIHRvZ2dsZUNsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZShjbGFzc05hbWUpOyB9XG5cbiAgaGFzQ2xhc3MoY2xhc3NOYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7IH1cblxuICBjbGVhckNsYXNzZXMoKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc05hbWUgPSAnJzsgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucHJlcGVuZCh0aGlzKTsgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hcHBlbmQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICBwcmVwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICAgIGZpcnN0Q2hpbGRET01FbGVtZW50ID0gdGhpcy5kb21FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICB0aGlzLmRvbUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGRvbUVsZW1lbnQsIGZpcnN0Q2hpbGRET01FbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZChlbGVtZW50KSB7XG4gICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgbnVsbCk7IC8vL1xuICB9XG5cbiAgcmVtb3ZlKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgY29uc3QgZG9tRWxlbWVudCA9IGVsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZUNoaWxkKGRvbUVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgc2hvdyhkaXNwbGF5U3R5bGUgPSAnYmxvY2snKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVN0eWxlOyB9XG5cbiAgaGlkZSgpIHsgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7IH1cblxuICBlbmFibGUoKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IH1cblxuICBkaXNhYmxlKCkgeyB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTsgfVxuXG4gIGh0bWwoaHRtbCkge1xuICAgIGlmIChodG1sID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGlubmVySFRNTCA9IHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUw7XG5cbiAgICAgIGh0bWwgPSBpbm5lckhUTUw7IC8vL1xuXG4gICAgICByZXR1cm4gaHRtbDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gaHRtbDsgLy8vXG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBpbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBjc3MoY3NzKSB7XG4gICAgaWYgKGNzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgY3NzID0ge307XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb21wdXRlZFN0eWxlLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBuYW1lID0gY29tcHV0ZWRTdHlsZVswXSwgIC8vL1xuICAgICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgICAgY3NzW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY3NzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IG5hbWUgPSBjc3M7IC8vL1xuXG4gICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmRvbUVsZW1lbnQpLFxuICAgICAgICAgICAgdmFsdWUgPSBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSk7IC8vL1xuXG4gICAgICBjc3MgPSB2YWx1ZTsgIC8vL1xuXG4gICAgICByZXR1cm4gY3NzO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKGNzcyk7IC8vL1xuXG4gICAgICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBjc3NbbmFtZV07XG5cbiAgICAgICAgdGhpcy5kb21FbGVtZW50LnN0eWxlW25hbWVdID0gdmFsdWU7XG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgfVxuXG4gIGJsdXIoKSB7IHRoaXMuZG9tRWxlbWVudC5ibHVyKCk7IH1cblxuICBmb2N1cygpIHsgdGhpcy5kb21FbGVtZW50LmZvY3VzKCk7IH1cblxuICBoYXNGb2N1cygpIHtcbiAgICBjb25zdCBmb2N1cyA9IChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSB0aGlzLmRvbUVsZW1lbnQpOyAgLy8vXG5cbiAgICByZXR1cm4gZm9jdXM7XG4gIH1cblxuICBnZXREZXNjZW5kYW50RWxlbWVudHMoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBjb25zdCBkb21Ob2RlID0gdGhpcy5kb21FbGVtZW50LCAgLy8vXG4gICAgICAgICAgZGVzY2VuZGFudERPTU5vZGVzID0gZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSksXG4gICAgICAgICAgZGVzY2VuZGFudEVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXMoZGVzY2VuZGFudERPTU5vZGVzLCBzZWxlY3Rvcik7XG5cbiAgICByZXR1cm4gZGVzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0Q2hpbGRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGNoaWxkRE9NTm9kZXMgPSB0aGlzLmRvbUVsZW1lbnQuY2hpbGROb2RlcyxcbiAgICAgICAgICBjaGlsZERPTUVsZW1lbnRzID0gZmlsdGVyRE9NTm9kZXMoY2hpbGRET01Ob2Rlcywgc2VsZWN0b3IpLFxuICAgICAgICAgIGNoaWxkRWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhjaGlsZERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBjaGlsZEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UGFyZW50RWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBwYXJlbnRFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQucGFyZW50RWxlbWVudDtcblxuICAgIGlmIChwYXJlbnRET01FbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICBpZiAocGFyZW50RE9NRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKSkge1xuICAgICAgICBjb25zdCBwYXJlbnRET01FbGVtZW50cyA9IFtwYXJlbnRET01FbGVtZW50XSxcbiAgICAgICAgICAgICAgcGFyZW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhwYXJlbnRET01FbGVtZW50cyksXG4gICAgICAgICAgICAgIGZpcnN0UGFyZW50RWxlbWVudCA9IGZpcnN0KHBhcmVudEVsZW1lbnRzKTtcblxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RQYXJlbnRFbGVtZW50IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBnZXRBc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGFzY2VuZGFudERPTUVsZW1lbnRzID0gW10sXG4gICAgICAgICAgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgbGV0IGFzY2VuZGFudERPTUVsZW1lbnQgPSBwYXJlbnRET01FbGVtZW50OyAgLy8vXG4gICAgd2hpbGUgKGFzY2VuZGFudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChhc2NlbmRhbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGFzY2VuZGFudERPTUVsZW1lbnRzLnB1c2goYXNjZW5kYW50RE9NRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGFzY2VuZGFudERPTUVsZW1lbnQgPSBhc2NlbmRhbnRET01FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXNjZW5kYW50RWxlbWVudHMgPSBlbGVtZW50c0Zyb21ET01FbGVtZW50cyhhc2NlbmRhbnRET01FbGVtZW50cyk7XG5cbiAgICByZXR1cm4gYXNjZW5kYW50RWxlbWVudHM7XG4gIH1cblxuICBnZXRQcmV2aW91c1NpYmxpbmdFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcHJldmlvdXNTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5wcmV2aW91c1NpYmxpbmc7ICAvLy9cblxuICAgIGlmICgocHJldmlvdXNTaWJsaW5nRE9NTm9kZSAhPT0gbnVsbCkgJiYgZG9tTm9kZU1hdGNoZXNTZWxlY3RvcihwcmV2aW91c1NpYmxpbmdET01Ob2RlLCBzZWxlY3RvcikpIHtcbiAgICAgIHByZXZpb3VzU2libGluZ0VsZW1lbnQgPSBwcmV2aW91c1NpYmxpbmdET01Ob2RlLl9fZWxlbWVudF9fIHx8IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByZXZpb3VzU2libGluZ0VsZW1lbnQ7XG4gIH1cblxuICBnZXROZXh0U2libGluZ0VsZW1lbnQoc2VsZWN0b3IgPSAnKicpIHtcbiAgICBsZXQgbmV4dFNpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IG5leHRTaWJsaW5nRE9NTm9kZSA9IHRoaXMuZG9tRWxlbWVudC5uZXh0U2libGluZztcblxuICAgIGlmICgobmV4dFNpYmxpbmdET01Ob2RlICE9PSBudWxsKSAmJiBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKG5leHRTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBuZXh0U2libGluZ0VsZW1lbnQgPSBuZXh0U2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkZWVwID0gdHJ1ZSxcbiAgICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LmNsb25lTm9kZShkZWVwKTtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBvdXRlckRPTUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIG91dGVyRE9NRWxlbWVudC5pbm5lckhUTUwgPSBodG1sOyAgLy8vXG5cbiAgICBjb25zdCBkb21FbGVtZW50ID0gb3V0ZXJET01FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBDbGFzcy50YWdOYW1lLFxuICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0gLz5gLFxuICAgICAgICAgIGVsZW1lbnQgPSBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuXG4gICAgY29uc3QgZGVmYXVsdFByb3BlcnRpZXMgPSBDbGFzcy5kZWZhdWx0UHJvcGVydGllcyxcbiAgICAgICAgICBpZ25vcmVkUHJvcGVydGllcyA9IENsYXNzLmlnbm9yZWRQcm9wZXJ0aWVzO1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGpzeE1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGV2ZW50TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgY2xpY2tNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBzY3JvbGxNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCByZXNpemVNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBtb3VzZU1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGtleU1peGluKTtcblxuT2JqZWN0LmFzc2lnbihFbGVtZW50LCB7XG4gIExFRlRfTU9VU0VfQlVUVE9OOiAwLFxuICBNSURETEVfTU9VU0VfQlVUVE9OOiAxLFxuICBSSUdIVF9NT1VTRV9CVVRUT046IDJcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOyAgLy8vXG5cbiAgcmV0dXJuIGRvbUVsZW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRvbUVsZW1lbnRzKSB7XG4gIGNvbnN0IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzID0gZmlsdGVyKGRvbUVsZW1lbnRzLCBmdW5jdGlvbihkb21FbGVtZW50KSB7XG4gICAgICAgICAgcmV0dXJuIChkb21FbGVtZW50Ll9fZWxlbWVudF9fICE9PSB1bmRlZmluZWQpO1xuICAgICAgICB9KSxcbiAgICAgICAgZWxlbWVudHMgPSBkb21FbGVtZW50c1dpdGhFbGVtZW50cy5tYXAoZnVuY3Rpb24oZG9tRWxlbWVudCkge1xuICAgICAgICAgIHJldHVybiBkb21FbGVtZW50Ll9fZWxlbWVudF9fO1xuICAgICAgICB9KTtcblxuICByZXR1cm4gZWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUsIGRlc2NlbmRhbnRET01Ob2RlcyA9IFtdKSB7XG4gIGNvbnN0IGNoaWxkRE9NTm9kZXMgPSBkb21Ob2RlLmNoaWxkTm9kZXM7ICAvLy9cblxuICBkZXNjZW5kYW50RE9NTm9kZXMuY29uY2F0KGNoaWxkRE9NTm9kZXMpO1xuXG4gIGNoaWxkRE9NTm9kZXMuZm9yRWFjaChmdW5jdGlvbihjaGlsZERPTU5vZGUpIHtcbiAgICBkZXNjZW5kYW50RE9NTm9kZXNGcm9tRE9NTm9kZShjaGlsZERPTU5vZGUsIGRlc2NlbmRhbnRET01Ob2Rlcyk7XG4gIH0pO1xuXG4gIHJldHVybiBkZXNjZW5kYW50RE9NTm9kZXM7XG59XG5cbmZ1bmN0aW9uIGZpbHRlckRPTU5vZGVzKGRvbU5vZGVzLCBzZWxlY3Rvcikge1xuICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gZmlsdGVyKGRvbU5vZGVzLCBmdW5jdGlvbihkb21Ob2RlKSB7XG4gICAgcmV0dXJuIGRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpO1xuICB9KTtcblxuICByZXR1cm4gZmlsdGVyZWRET01Ob2Rlcztcbn1cblxuZnVuY3Rpb24gZG9tTm9kZU1hdGNoZXNTZWxlY3Rvcihkb21Ob2RlLCBzZWxlY3Rvcikge1xuICBjb25zdCBkb21Ob2RlVHlwZSA9IGRvbU5vZGUubm9kZVR5cGU7XG5cbiAgc3dpdGNoIChkb21Ob2RlVHlwZSkge1xuICAgIGNhc2UgTm9kZS5FTEVNRU5UX05PREUgOiB7XG4gICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tTm9kZTsgLy8vXG5cbiAgICAgIHJldHVybiBkb21FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpO1xuICAgIH1cblxuICAgIGNhc2UgTm9kZS5URVhUX05PREUgOiB7XG4gICAgICBpZiAoc2VsZWN0b3IgPT09ICcqJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGZpbHRlcihhcnJheSwgdGVzdCkge1xuICBjb25zdCBmaWx0ZXJlZEFycmF5ID0gW107XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmF5Lmxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gdGVzdChlbGVtZW50KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIGZpbHRlcmVkQXJyYXkucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmlsdGVyZWRBcnJheTtcbn1cblxuZnVuY3Rpb24gZmlyc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5WzBdOyB9XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIEJvZHkgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IgPSAnYm9keScpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIEJvZHkuY2xvbmUodGhpcyk7IH1cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEJvZHksIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCb2R5LCBodG1sKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQm9keSwgZG9tRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEJvZHksIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQm9keSwge1xuICB0YWdOYW1lOiAnYm9keSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvZHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEJ1dHRvbi5jbG9uZSh0aGlzLCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgb25DbGljayhoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyO1xuICAgIH1cbiAgICBcbiAgICBzdXBlci5vbkNsaWNrKGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2xpY2soaGFuZGxlcikge1xuICAgIHN1cGVyLm9mZkNsaWNrKGhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKEJ1dHRvbiwgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCdXR0b24sIGh0bWwsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQnV0dG9uLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljazsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhCdXR0b24sIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbixcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKG1vdXNlQnV0dG9uLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGNoZWNrZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jaGVjayhjaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBDaGVja2JveC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyKTsgIC8vL1xuICB9XG4gIFxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGhhbmRsZXIpOyAgLy8vXG4gIH1cblxuICBjaGVjayhjaGVja2VkID0gdHJ1ZSkge1xuICAgIGNoZWNrZWQgP1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpIDpcbiAgICAgICAgdGhpcy5jbGVhckF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgaXNDaGVja2VkKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmNoZWNrZWQ7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKENoZWNrYm94LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQ2hlY2tib3gsIGh0bWwsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDaGVja2JveCwgZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UsIGNoZWNrZWQgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy8gICAgXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDaGVja2JveCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgY2hlY2tlZCk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihDaGVja2JveCwge1xuICB0YWdOYW1lOiAnaW5wdXQnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZScsXG4gICAgJ2NoZWNrZWQnXG4gIF0sXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgdHlwZTogJ2NoZWNrYm94J1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBDaGVja2JveDtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgY2hlY2tlZCA9IHRoaXMuaXNDaGVja2VkKCksXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihjaGVja2VkLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIERpdiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gRGl2LmNsb25lKHRoaXMpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5jbG9uZShEaXYsIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChEaXYsIGRvbUVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhEaXYsIHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRGl2LCB7XG4gIHRhZ05hbWU6ICdkaXYnXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEaXY7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIExpbmsgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjbGlja0hhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNsaWNrKGNsaWNrSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgY2xvbmUoY2xpY2tIYW5kbGVyKSB7IHJldHVybiBMaW5rLmNsb25lKHRoaXMsIGNsaWNrSGFuZGxlcik7IH1cblxuICBvbkNsaWNrKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgb2ZmQ2xpY2soaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNsaWNrSGFuZGxlcikge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKExpbmssIGVsZW1lbnQsIGNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2xpY2tIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChMaW5rLCBkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2xpY2tIYW5kbGVyID0gb25DbGljazsgLy8vICAgIFxuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoTGluaywgcHJvcGVydGllcywgY2xpY2tIYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKExpbmssIHtcbiAgdGFnTmFtZTogJ2EnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNsaWNrJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBMaW5rO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGhyZWYgPSB0aGlzLmdldEF0dHJpYnV0ZSgnaHJlZicpLFxuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoaHJlZiwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBTZWxlY3QuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlKCkgeyBcbiAgICBjb25zdCBzZWxlY3RlZE9wdGlvblZhbHVlID0gdGhpcy5kb21FbGVtZW50LnZhbHVlOyAgLy8vXG4gICAgXG4gICAgcmV0dXJuIHNlbGVjdGVkT3B0aW9uVmFsdWU7XG4gIH1cblxuICBzZXRTZWxlY3RlZE9wdGlvbkJ5VmFsdWUoc2VsZWN0ZWRPcHRpb25WYWx1ZSkge1xuICAgIGNvbnN0IHZhbHVlID0gc2VsZWN0ZWRPcHRpb25WYWx1ZTsgIC8vL1xuICAgIFxuICAgIHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyBcbiAgfVxuXG4gIG9uQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDaGFuZ2UoaGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBoYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoU2VsZWN0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoU2VsZWN0LCBodG1sLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU2VsZWN0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vLyAgICBcblxuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFNlbGVjdCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlcik7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihTZWxlY3QsIHtcbiAgdGFnTmFtZTogJ3NlbGVjdCcsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWxlY3Q7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IHNlbGVjdGVkT3B0aW9uVmFsdWUgPSB0aGlzLmdldFNlbGVjdGVkT3B0aW9uVmFsdWUoKSxcbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKHNlbGVjdGVkT3B0aW9uVmFsdWUsIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjbG9uZSgpIHsgcmV0dXJuIFNwYW4uY2xvbmUodGhpcyk7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKFNwYW4sIGVsZW1lbnQpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChTcGFuLCBodG1sKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50KSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU3BhbiwgZG9tRWxlbWVudCk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oU3Bhbiwge1xuICB0YWdOYW1lOiAnc3Bhbidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNwYW47XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuL2VsZW1lbnQnKTtcblxuY2xhc3MgSW5wdXRFbGVtZW50IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBvbkNoYW5nZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2NoYW5nZScsIGhhbmRsZXIpO1xuICB9XG5cbiAgb2ZmQ2hhbmdlKGhhbmRsZXIpIHtcbiAgICB0aGlzLm9mZignY2hhbmdlJywgaGFuZGxlcik7XG4gIH1cblxuICBnZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC52YWx1ZTsgfVxuXG4gIGdldFNlbGVjdGlvblN0YXJ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0OyB9XG5cbiAgZ2V0U2VsZWN0aW9uRW5kKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZDsgfVxuXG4gIHNldFZhbHVlKHZhbHVlKSB7IHRoaXMuZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyB9XG5cbiAgc2V0U2VsZWN0aW9uU3RhcnQoc2VsZWN0aW9uU3RhcnQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBzZXRTZWxlY3Rpb25FbmQoc2VsZWN0aW9uRW5kKSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3Rpb25FbmQgPSBzZWxlY3Rpb25FbmQ7IH1cblxuICBzZWxlY3QoKSB7IHRoaXMuZG9tRWxlbWVudC5zZWxlY3QoKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShDbGFzcywgZWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tSFRNTChDbGFzcywgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoQ2xhc3MsIGRvbUVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZTsgLy8vXG5cbiAgICByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0RWxlbWVudCwge1xuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRFbGVtZW50O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUoKSxcbiAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcih2YWx1ZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uUmVzaXplKCkge31cblxuICBvZmZSZXNpemUoKSB7fVxuICBcbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKElucHV0LCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChJbnB1dCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoSW5wdXQsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKElucHV0LCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKElucHV0LCB7XG4gIHRhZ05hbWU6ICdpbnB1dCdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgVGV4dGFyZWEgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBUZXh0YXJlYS5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uUmVzaXplKCkge31cbiAgXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmNsb25lKFRleHRhcmVhLCBlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChUZXh0YXJlYSwgaHRtbCwgY2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikge1xuICAgIHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoVGV4dGFyZWEsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKFRleHRhcmVhLCBwcm9wZXJ0aWVzKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFRleHRhcmVhLCB7XG4gIHRhZ05hbWU6ICd0ZXh0YXJlYSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRleHRhcmVhO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBCb3VuZHMge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICAgIHRoaXMuYm90dG9tID0gYm90dG9tO1xuICAgIHRoaXMucmlnaHQgPSByaWdodDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cblxuICBnZXRCb3R0b20oKSB7XG4gICAgcmV0dXJuIHRoaXMuYm90dG9tO1xuICB9XG5cbiAgZ2V0UmlnaHQoKSB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHQ7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nTW91c2UobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBtb3VzZVRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMubGVmdCA8IG1vdXNlTGVmdCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID4gbW91c2VUb3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLnJpZ2h0ID4gbW91c2VMZWZ0KSAgKTtcbiAgfVxuXG4gIGFyZU92ZXJsYXBwaW5nKGJvdW5kcykge1xuICAgIHJldHVybiAoICAodGhpcy50b3AgPCBib3VuZHMuYm90dG9tKSAmJlxuICAgICAgICAgICAgICAodGhpcy5sZWZ0IDwgYm91bmRzLnJpZ2h0KSAmJlxuICAgICAgICAgICAgICAodGhpcy5ib3R0b20gPiBib3VuZHMudG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5yaWdodCA+IGJvdW5kcy5sZWZ0KSAgKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCwgLy8vXG4gICAgICAgICAgd2luZG93U2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCwgIC8vL1xuICAgICAgICAgIHRvcCA9IGJvdW5kaW5nQ2xpZW50UmVjdC50b3AgKyB3aW5kb3dTY3JvbGxUb3AsXG4gICAgICAgICAgbGVmdCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5sZWZ0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3R0b20gPSBib3VuZGluZ0NsaWVudFJlY3QuYm90dG9tICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIHJpZ2h0ID0gYm91bmRpbmdDbGllbnRSZWN0LnJpZ2h0ICsgd2luZG93U2Nyb2xsTGVmdCxcbiAgICAgICAgICBib3VuZHMgPSBuZXcgQm91bmRzKHRvcCwgbGVmdCwgYm90dG9tLCByaWdodCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQm91bmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jbGFzcyBPZmZzZXQge1xuICBjb25zdHJ1Y3Rvcih0b3AsIGxlZnQpIHtcbiAgICB0aGlzLnRvcCA9IHRvcDtcbiAgICB0aGlzLmxlZnQgPSBsZWZ0O1xuICB9XG5cbiAgZ2V0VG9wKCkge1xuICAgIHJldHVybiB0aGlzLnRvcDtcbiAgfVxuXG4gIGdldExlZnQoKSB7XG4gICAgcmV0dXJuIHRoaXMubGVmdDtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9mZnNldDtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25DbGljayhoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG4gIFxuICB0aGlzLm9uKCdjbGljaycsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb2ZmQ2xpY2soaGFuZGxlcikgeyB0aGlzLm9mZignY2xpY2snLCBoYW5kbGVyKTsgfVxuXG5jb25zdCBjbGlja01peGluID0ge1xuICBvbkNsaWNrOiBvbkNsaWNrLFxuICBvZmZDbGljazogb2ZmQ2xpY2tcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xpY2tNaXhpbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgbW91c2VUb3AgPSBldmVudC5wYWdlWSwgIC8vL1xuICAgICAgICBtb3VzZUxlZnQgPSBldmVudC5wYWdlWCwgLy8vXG4gICAgICAgIG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uLCAvLy9cbiAgICAgICAgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uLCB0YXJnZXRFbGVtZW50KTtcblxuICByZXR1cm4gcHJldmVudERlZmF1bHQ7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uKGV2ZW50VHlwZXMsIGhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIG9uRXZlbnQodGhpcywgZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gb2ZmKGV2ZW50VHlwZXMsIGhhbmRsZXIpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIG9mZkV2ZW50KHRoaXMsIGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmZcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRNaXhpbjtcblxuZnVuY3Rpb24gb25FdmVudChlbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIpIHtcbiAgaWYgKGVsZW1lbnQuZXZlbnRPYmplY3RNYXAgPT09IHVuZGVmaW5lZCkge1xuICAgIGVsZW1lbnQuZXZlbnRPYmplY3RNYXAgPSB7fTtcblxuICB9XG5cbiAgbGV0IGV2ZW50T2JqZWN0ID0gZWxlbWVudC5ldmVudE9iamVjdE1hcFtldmVudFR5cGVdO1xuXG4gIGlmICghZXZlbnRPYmplY3QpIHtcbiAgICBldmVudE9iamVjdCA9IGNyZWF0ZUV2ZW50T2JqZWN0KCk7XG5cbiAgICBldmVudE9iamVjdC5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQsIGV2ZW50VHlwZSk7XG5cbiAgICBlbGVtZW50LmV2ZW50T2JqZWN0TWFwW2V2ZW50VHlwZV0gPSBldmVudE9iamVjdDtcbiAgfVxuXG4gIGV2ZW50T2JqZWN0LmFkZEhhbmRsZXIoaGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZkV2ZW50KGVsZW1lbnQsIGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICBjb25zdCBldmVudE9iamVjdCA9IGVsZW1lbnQuZXZlbnRPYmplY3RNYXBbZXZlbnRUeXBlXTtcblxuICBjb25zdCBlbXB0eSA9IGV2ZW50T2JqZWN0LnJlbW92ZUhhbmRsZXIoaGFuZGxlcik7XG5cbiAgaWYgKGVtcHR5KSB7XG4gICAgZXZlbnRPYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudFR5cGUpO1xuXG4gICAgZGVsZXRlIGVsZW1lbnQuZXZlbnRPYmplY3RNYXBbZXZlbnRUeXBlXTtcbiAgfVxuXG4gIGNvbnN0IGV2ZW50VHlwZXMgPSBPYmplY3Qua2V5cyhlbGVtZW50LmV2ZW50T2JqZWN0TWFwKTtcblxuICBpZiAoZXZlbnRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICBkZWxldGUgZWxlbWVudC5ldmVudE9iamVjdE1hcDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVFdmVudE9iamVjdCgpIHtcbiAgY29uc3QgaGFuZGxlcnMgPSBbXTtcblxuICBmdW5jdGlvbiBldmVudExpc3RlbmVyKGV2ZW50KSB7XG4gICAgY29uc3QgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQsXG4gICAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGV2ZW50VGFyZ2V0Ll9fZWxlbWVudF9fOyAgLy8vXG5cbiAgICBsZXQgcHJldmVudEV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuXG4gICAgaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgcHJldmVudERlZmF1bHQgPSBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByZXZlbnRFdmVudERlZmF1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHByZXZlbnRFdmVudERlZmF1bHQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocHJldmVudEV2ZW50RGVmYXVsdCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEhhbmRsZXIoaGFuZGxlcikge1xuICAgIGhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVIYW5kbGVyKGhhbmRsZXIgPSBudWxsKSB7XG4gICAgaWYgKGhhbmRsZXIgPT09IG51bGwpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gMDtcblxuICAgICAgaGFuZGxlcnMuc3BsaWNlKHN0YXJ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgaW5kZXggPSBoYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgICAgICBoYW5kbGVycy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbXB0eSA9IChoYW5kbGVycy5sZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudFR5cGUpIHtcbiAgICBlbGVtZW50LmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihlbGVtZW50LCBldmVudFR5cGUpIHtcbiAgICBlbGVtZW50LmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGV2ZW50TGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRIYW5kbGVyOiBhZGRIYW5kbGVyLFxuICAgIHJlbW92ZUhhbmRsZXI6IHJlbW92ZUhhbmRsZXIsXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogYWRkRXZlbnRMaXN0ZW5lcixcbiAgICByZW1vdmVFdmVudExpc3RlbmVyOiByZW1vdmVFdmVudExpc3RlbmVyXG4gIH07XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFRleHRFbGVtZW50ID0gcmVxdWlyZSgnLi4vdGV4dEVsZW1lbnQnKTtcblxuZnVuY3Rpb24gYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMgPSB7fSwgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKSB7XG4gIGFzc2lnbihwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tRWxlbWVudEFuZFByb3BlcnRpZXModGhpcywgcHJvcGVydGllcyk7XG5cbiAgdW5hc3NpZ24ocHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpO1xuXG4gIHRoaXMucHJvcGVydGllcyA9IHt9O1xuXG4gIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMocHJvcGVydGllcyk7XG5cbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xuXG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKGlzSGFuZGxlck5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEhhbmRsZXIodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNBdHRyaWJ1dGVOYW1lKG5hbWUpKSB7XG4gICAgICBhZGRBdHRyaWJ1dGUodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnByb3BlcnRpZXNbbmFtZV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXM7IC8vL1xuXG4gIGNoaWxkRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICBjaGlsZEVsZW1lbnQuYXBwZW5kVG8ocGFyZW50RWxlbWVudCk7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbkNvbnRleHQobmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpLCB0aGVuRGVsZXRlID0gdHJ1ZSkge1xuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBuYW1lLCBkZXNjcmlwdG9yKTtcblxuICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kVG8ocGFyZW50RWxlbWVudCkge1xuICB0aGlzLmNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmNvbnRleHQpO1xuICBcbiAgY29uc3QgcGFyZW50Q29udGV4dCA9IHRoaXMucGFyZW50Q29udGV4dCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50Q29udGV4dCgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQ7XG4gIFxuICBwYXJlbnRFbGVtZW50LmNvbnRleHQgPSBPYmplY3QuYXNzaWduKHt9LCBwYXJlbnRFbGVtZW50LmNvbnRleHQsIHBhcmVudENvbnRleHQpO1xuXG4gIHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpO1xufVxuXG5jb25zdCBqc3hNaXhpbiA9IHtcbiAgYXBwZW5kVG86IGFwcGVuZFRvLFxuICBhc3NpZ25Db250ZXh0OiBhc3NpZ25Db250ZXh0LFxuICBhcHBseVByb3BlcnRpZXM6IGFwcGx5UHJvcGVydGllc1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBqc3hNaXhpbjtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKSB7XG4gIGxldCBjaGlsZEVsZW1lbnRzID0gZWxlbWVudC5jaGlsZEVsZW1lbnRzID9cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMuY2hpbGRFbGVtZW50cztcblxuICBjaGlsZEVsZW1lbnRzID0gKGNoaWxkRWxlbWVudHMgIT09IHVuZGVmaW5lZCkgP1xuICAgICAgICAgICAgICAgICAgICgoY2hpbGRFbGVtZW50cyBpbnN0YW5jZW9mIEFycmF5KSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudHMgOlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NoaWxkRWxlbWVudHNdKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtdO1xuXG4gIGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEVsZW1lbnQpIHtcbiAgICBpZiAodHlwZW9mIGNoaWxkRWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHRleHQgPSBjaGlsZEVsZW1lbnQsICAvLy9cbiAgICAgICAgICAgIHRleHRFbGVtZW50ID0gbmV3IFRleHRFbGVtZW50KHRleHQpO1xuXG4gICAgICBjaGlsZEVsZW1lbnQgPSB0ZXh0RWxlbWVudDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIHVuYXNzaWduKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzID0gW10pIHtcbiAgY29uc3QgaWdub3JlZFByb3BlcnR5TmFtZXMgPSBpZ25vcmVkUHJvcGVydGllczsgLy8vXG5cbiAgaWdub3JlZFByb3BlcnR5TmFtZXMuZm9yRWFjaChmdW5jdGlvbihpZ25vcmVkUHJvcGVydHlOYW1lKSB7XG4gICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoaWdub3JlZFByb3BlcnR5TmFtZSkpIHtcbiAgICAgIGRlbGV0ZSBwcm9wZXJ0aWVzW2lnbm9yZWRQcm9wZXJ0eU5hbWVdO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFzc2lnbihwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyA9IHt9KSB7XG4gIGNvbnN0IGRlZmF1bHRQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmtleXMoZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGRlZmF1bHRQcm9wZXJ0eU5hbWVzLmZvckVhY2goZnVuY3Rpb24oZGVmYXVsdFByb3BlcnR5TmFtZSkge1xuICAgIGlmICghcHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShkZWZhdWx0UHJvcGVydHlOYW1lKSkge1xuICAgICAgY29uc3QgZGVmYXVsdFByb3BlcnR5VmFsdWUgPSBkZWZhdWx0UHJvcGVydGllc1tkZWZhdWx0UHJvcGVydHlOYW1lXTtcblxuICAgICAgcHJvcGVydGllc1tkZWZhdWx0UHJvcGVydHlOYW1lXSA9IGRlZmF1bHRQcm9wZXJ0eVZhbHVlO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEhhbmRsZXIoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gbmFtZS5zdWJzdHIoMikudG9Mb3dlckNhc2UoKSwgLy8vXG4gICAgICAgIGhhbmRsZXIgPSB2YWx1ZTsgIC8vL1xuXG4gIGVsZW1lbnQub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gYWRkQXR0cmlidXRlKGVsZW1lbnQsIG5hbWUsIHZhbHVlKSB7XG4gIGlmIChuYW1lID09PSAnY2xhc3NOYW1lJykge1xuICAgIG5hbWUgPSAnY2xhc3MnO1xuICB9XG5cbiAgaWYgKG5hbWUgPT09ICdodG1sRm9yJykge1xuICAgIG5hbWUgPSAnZm9yJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcblxuICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBlbGVtZW50LmRvbUVsZW1lbnRbbmFtZV1ba2V5XSA9IHZhbHVlW2tleV07XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSBuYW1lOyAvLy9cblxuICAgICAgZWxlbWVudC5hZGRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNIYW5kbGVyTmFtZShuYW1lKSB7XG4gIHJldHVybiBuYW1lLm1hdGNoKC9eb24vKTtcbn1cblxuZnVuY3Rpb24gaXNBdHRyaWJ1dGVOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIGF0dHJpYnV0ZU5hbWVzLmluY2x1ZGVzKG5hbWUpO1xufVxuXG5jb25zdCBhdHRyaWJ1dGVOYW1lcyA9IFtcbiAgJ2FjY2VwdCcsICdhY2NlcHRDaGFyc2V0JywgJ2FjY2Vzc0tleScsICdhY3Rpb24nLCAnYWxsb3dGdWxsU2NyZWVuJywgJ2FsbG93VHJhbnNwYXJlbmN5JywgJ2FsdCcsICdhc3luYycsICdhdXRvQ29tcGxldGUnLCAnYXV0b0ZvY3VzJywgJ2F1dG9QbGF5JyxcbiAgJ2NhcHR1cmUnLCAnY2VsbFBhZGRpbmcnLCAnY2VsbFNwYWNpbmcnLCAnY2hhbGxlbmdlJywgJ2NoYXJTZXQnLCAnY2hlY2tlZCcsICdjaXRlJywgJ2NsYXNzSUQnLCAnY2xhc3NOYW1lJywgJ2NvbFNwYW4nLCAnY29scycsICdjb250ZW50JywgJ2NvbnRlbnRFZGl0YWJsZScsICdjb250ZXh0TWVudScsICdjb250cm9scycsICdjb29yZHMnLCAnY3Jvc3NPcmlnaW4nLFxuICAnZGF0YScsICdkYXRlVGltZScsICdkZWZhdWx0JywgJ2RlZmVyJywgJ2RpcicsICdkaXNhYmxlZCcsICdkb3dubG9hZCcsICdkcmFnZ2FibGUnLFxuICAnZW5jVHlwZScsXG4gICdmb3JtJywgJ2Zvcm1BY3Rpb24nLCAnZm9ybUVuY1R5cGUnLCAnZm9ybU1ldGhvZCcsICdmb3JtTm9WYWxpZGF0ZScsICdmb3JtVGFyZ2V0JywgJ2ZyYW1lQm9yZGVyJyxcbiAgJ2hlYWRlcnMnLCAnaGVpZ2h0JywgJ2hpZGRlbicsICdoaWdoJywgJ2hyZWYnLCAnaHJlZkxhbmcnLCAnaHRtbEZvcicsICdodHRwRXF1aXYnLFxuICAnaWNvbicsICdpZCcsICdpbnB1dE1vZGUnLCAnaW50ZWdyaXR5JywgJ2lzJyxcbiAgJ2tleVBhcmFtcycsICdrZXlUeXBlJywgJ2tpbmQnLFxuICAnbGFiZWwnLCAnbGFuZycsICdsaXN0JywgJ2xvb3AnLCAnbG93JyxcbiAgJ21hbmlmZXN0JywgJ21hcmdpbkhlaWdodCcsICdtYXJnaW5XaWR0aCcsICdtYXgnLCAnbWF4TGVuZ3RoJywgJ21lZGlhJywgJ21lZGlhR3JvdXAnLCAnbWV0aG9kJywgJ21pbicsICdtaW5MZW5ndGgnLCAnbXVsdGlwbGUnLCAnbXV0ZWQnLFxuICAnbmFtZScsICdub1ZhbGlkYXRlJywgJ25vbmNlJyxcbiAgJ29wZW4nLCAnb3B0aW11bScsXG4gICdwYXR0ZXJuJywgJ3BsYWNlaG9sZGVyJywgJ3Bvc3RlcicsICdwcmVsb2FkJywgJ3Byb2ZpbGUnLFxuICAncmFkaW9Hcm91cCcsICdyZWFkT25seScsICdyZWwnLCAncmVxdWlyZWQnLCAncmV2ZXJzZWQnLCAncm9sZScsICdyb3dTcGFuJywgJ3Jvd3MnLFxuICAnc2FuZGJveCcsICdzY29wZScsICdzY29wZWQnLCAnc2Nyb2xsaW5nJywgJ3NlYW1sZXNzJywgJ3NlbGVjdGVkJywgJ3NoYXBlJywgJ3NpemUnLCAnc2l6ZXMnLCAnc3BhbicsICdzcGVsbENoZWNrJywgJ3NyYycsICdzcmNEb2MnLCAnc3JjTGFuZycsICdzcmNTZXQnLCAnc3RhcnQnLCAnc3RlcCcsICdzdHlsZScsICdzdW1tYXJ5JyxcbiAgJ3RhYkluZGV4JywgJ3RhcmdldCcsICd0aXRsZScsICd0eXBlJyxcbiAgJ3VzZU1hcCcsXG4gICd2YWx1ZScsXG4gICd3aWR0aCcsXG4gICd3bW9kZScsXG4gICd3cmFwJ1xuXTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25LZXlVcChoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG4gIFxuICB0aGlzLm9uKCdrZXl1cCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25LZXlEb3duKGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cblxuICB0aGlzLm9uKCdrZXlkb3duJywgaGFuZGxlcik7IFxufVxuXG5mdW5jdGlvbiBvZmZLZXlVcChoYW5kbGVyKSB7IHRoaXMub2ZmKCdrZXl1cCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZktleURvd24oaGFuZGxlcikgeyB0aGlzLm9mZigna2V5ZG93bicsIGhhbmRsZXIpOyB9XG5cbmNvbnN0IGtleU1peGluID0ge1xuICBvbktleVVwOiBvbktleVVwLFxuICBvbktleURvd246IG9uS2V5RG93bixcbiAgb2ZmS2V5VXA6IG9mZktleVVwLFxuICBvZmZLZXlEb3duOiBvZmZLZXlEb3duXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1peGluO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBrZXlDb2RlID0gZXZlbnQua2V5Q29kZSB8fCBldmVudC53aGljaCwgIC8vL1xuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIoa2V5Q29kZSwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbk1vdXNlVXAoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuICBcbiAgdGhpcy5vbignbW91c2V1cCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZURvd24oaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ21vdXNlZG93bicsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU92ZXIoaGFuZGxlcikge1xuICBpZiAoaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID09PSB1bmRlZmluZWQpIHtcbiAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcjtcbiAgfVxuXG4gIHRoaXMub24oJ21vdXNlb3ZlcicsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU91dChoYW5kbGVyKSB7XG4gIGlmIChoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPT09IHVuZGVmaW5lZCkge1xuICAgIGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyO1xuICB9XG5cbiAgdGhpcy5vbignbW91c2VvdXQnLCBoYW5kbGVyKTsgXG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cblxuICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBoYW5kbGVyKTsgXG59XG5cbmZ1bmN0aW9uIG9mZk1vdXNlVXAoaGFuZGxlcikgeyB0aGlzLm9mZignbW91c2V1cCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlRG93bihoYW5kbGVyKSB7IHRoaXMub2ZmKCdtb3VzZWRvd24nLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU92ZXIoaGFuZGxlcikgeyB0aGlzLm9mZignbW91c2VvdmVyJywgaGFuZGxlcik7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VPdXQoaGFuZGxlcikgeyB0aGlzLm9mZignbW91c2VvdXQnLCBoYW5kbGVyKTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZU1vdmUoaGFuZGxlcikgeyB0aGlzLm9mZignbW91c2Vtb3ZlJywgaGFuZGxlcik7IH1cblxuY29uc3QgbW91c2VNaXhpbiA9IHtcbiAgb25Nb3VzZVVwOiBvbk1vdXNlVXAsXG4gIG9uTW91c2VEb3duOiBvbk1vdXNlRG93bixcbiAgb25Nb3VzZU92ZXI6IG9uTW91c2VPdmVyLFxuICBvbk1vdXNlT3V0OiBvbk1vdXNlT3V0LFxuICBvbk1vdXNlTW92ZTogb25Nb3VzZU1vdmUsXG4gIG9mZk1vdXNlVXA6IG9mZk1vdXNlVXAsXG4gIG9mZk1vdXNlRG93bjogb2ZmTW91c2VEb3duLFxuICBvZmZNb3VzZU92ZXI6IG9mZk1vdXNlT3ZlcixcbiAgb2ZmTW91c2VPdXQ6IG9mZk1vdXNlT3V0LFxuICBvZmZNb3VzZU1vdmU6IG9mZk1vdXNlTW92ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb3VzZU1peGluO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBtb3VzZVRvcCA9IGV2ZW50LnBhZ2VZLCAgLy8vXG4gICAgICAgIG1vdXNlTGVmdCA9IGV2ZW50LnBhZ2VYLCAvLy9cbiAgICAgICAgbW91c2VCdXR0b24gPSBldmVudC5idXR0b24sIC8vL1xuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25SZXNpemUoaGFuZGxlcikge1xuICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJyxcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lciA9IHRoaXMub24oZXZlbnRUeXBlLCBoYW5kbGVyKTtcblxuICBpZiAoYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGFwcGVuZFJlc2l6ZU9iamVjdCh0aGlzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvZmZSZXNpemUoaGFuZGxlcikge1xuICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJyxcbiAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9IHRoaXMub2ZmKGV2ZW50VHlwZSwgaGFuZGxlcik7XG5cbiAgaWYgKHJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICByZW1vdmVSZXNpemVPYmplY3QodGhpcyk7XG4gIH1cbn1cblxuY29uc3QgcmVzaXplTWl4aW4gPSB7XG4gIG9uUmVzaXplOiBvblJlc2l6ZSxcbiAgb2ZmUmVzaXplOiBvZmZSZXNpemVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcmVzaXplTWl4aW47XG5cbmZ1bmN0aW9uIGFwcGVuZFJlc2l6ZU9iamVjdChlbGVtZW50KSB7XG4gIGNvbnN0IHJlc2l6ZU9iamVjdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29iamVjdCcpLFxuICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICBzdHlsZSA9IGBkaXNwbGF5OiBibG9jazsgXG4gICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsgXG4gICAgICAgICAgICAgICAgIHRvcDogMDsgXG4gICAgICAgICAgICAgICAgIGxlZnQ6IDA7IFxuICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMCU7IFxuICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTsgXG4gICAgICAgICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47IFxuICAgICAgICAgICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTsgXG4gICAgICAgICAgICAgICAgIHotaW5kZXg6IC0xO2A7XG5cbiAgcmVzaXplT2JqZWN0LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCBzdHlsZSk7XG4gIHJlc2l6ZU9iamVjdC5kYXRhID0gJ2Fib3V0OmJsYW5rJztcbiAgcmVzaXplT2JqZWN0LnR5cGUgPSAndGV4dC9odG1sJztcblxuICBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18gPSByZXNpemVPYmplY3Q7XG5cbiAgcmVzaXplT2JqZWN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpXG4gIH07XG5cbiAgZG9tRWxlbWVudC5hcHBlbmRDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSZXNpemVPYmplY3QoZWxlbWVudCkge1xuICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LFxuICAgICAgICByZXNpemVPYmplY3QgPSBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18sXG4gICAgICAgIG9iamVjdFdpbmRvdyA9IHJlc2l6ZU9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7ICAvLy9cblxuICBvYmplY3RXaW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplTGlzdGVuZXIpO1xuXG4gIGRvbUVsZW1lbnQucmVtb3ZlQ2hpbGQocmVzaXplT2JqZWN0KTtcbn1cblxuZnVuY3Rpb24gcmVzaXplT2JqZWN0TG9hZEhhbmRsZXIoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVPYmplY3QgPSBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18sXG4gICAgICAgIHJlc2l6ZU9iamVjdFdpbmRvdyA9IHJlc2l6ZU9iamVjdC5jb250ZW50RG9jdW1lbnQuZGVmYXVsdFZpZXc7ICAvLy9cblxuICByZXNpemVPYmplY3RXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgZXZlbnRMaXN0ZW5lcihlbGVtZW50KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV2ZW50TGlzdGVuZXIoZWxlbWVudCkge1xuICBjb25zdCB3aWR0aCA9IGVsZW1lbnQuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gZWxlbWVudC5nZXRIZWlnaHQoKSxcbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IGVsZW1lbnQsIC8vL1xuICAgICAgICBoYW5kbGVycyA9IGVsZW1lbnQuaGFuZGxlcnNNYXBbJ3Jlc2l6ZSddO1xuXG4gIGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcil7XG4gICAgaGFuZGxlcih3aWR0aCwgaGVpZ2h0LCB0YXJnZXRFbGVtZW50KTtcbiAgfSk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uU2Nyb2xsKGhhbmRsZXIpIHtcbiAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgaGFuZGxlci5pbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXI7XG4gIH1cbiAgXG4gIHRoaXMub24oJ3Njcm9sbCcsIGhhbmRsZXIpOyBcbn1cblxuZnVuY3Rpb24gb2ZmU2Nyb2xsKGhhbmRsZXIpIHsgdGhpcy5vZmYoJ3Njcm9sbCcsIGhhbmRsZXIpOyB9XG5cbmZ1bmN0aW9uIGdldFNjcm9sbFRvcCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3A7IH1cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0OyB9XG5cbmZ1bmN0aW9uIHNldFNjcm9sbFRvcChzY3JvbGxUb3ApIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbFRvcCA9IHNjcm9sbFRvcDsgfVxuXG5mdW5jdGlvbiBzZXRTY3JvbGxMZWZ0KHNjcm9sbExlZnQpIHsgdGhpcy5kb21FbGVtZW50LnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0OyB9XG5cbmNvbnN0IHNjcm9sbE1peGluID0ge1xuICBvblNjcm9sbDogb25TY3JvbGwsXG4gIG9mZlNjcm9sbDogb2ZmU2Nyb2xsLFxuICBnZXRTY3JvbGxUb3A6IGdldFNjcm9sbFRvcCxcbiAgZ2V0U2Nyb2xsTGVmdDogZ2V0U2Nyb2xsTGVmdCxcbiAgc2V0U2Nyb2xsVG9wOiBzZXRTY3JvbGxUb3AsXG4gIHNldFNjcm9sbExlZnQ6IHNldFNjcm9sbExlZnRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gc2Nyb2xsTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIpIHtcbiAgY29uc3Qgc2Nyb2xsVG9wID0gdGhpcy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgc2Nyb2xsTGVmdCA9IHRoaXMuZ2V0U2Nyb2xsTGVmdCgpLFxuICAgICAgICB0YXJnZXRFbGVtZW50ID0gdGhpcywgLy8vXG4gICAgICAgIHByZXZlbnREZWZhdWx0ID0gaGFuZGxlcihzY3JvbGxUb3AsIHNjcm9sbExlZnQsIHRhcmdldEVsZW1lbnQpO1xuXG4gIHJldHVybiBwcmV2ZW50RGVmYXVsdDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4vZWxlbWVudCcpLFxuICAgICAgVGV4dEVsZW1lbnQgPSByZXF1aXJlKCcuL3RleHRFbGVtZW50Jyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoZmlyc3RBcmd1bWVudCwgcHJvcGVydGllcywgLi4uY2hpbGRBcmd1bWVudHMpIHtcbiAgbGV0IGVsZW1lbnQgPSBudWxsO1xuXG4gIGlmIChmaXJzdEFyZ3VtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50c0Zyb21DaGlsZEFyZ3VtZW50cyhjaGlsZEFyZ3VtZW50cyk7XG5cbiAgICBwcm9wZXJ0aWVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBjaGlsZEVsZW1lbnRzOiBjaGlsZEVsZW1lbnRzXG4gICAgfSwgcHJvcGVydGllcyk7XG5cbiAgICBpZiAoZmFsc2UpIHtcblxuICAgIH0gZWxzZSBpZiAoaXNUeXBlT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IENsYXNzID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gQ2xhc3MuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gZWxlbWVudEZ1bmN0aW9uKHByb3BlcnRpZXMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGZpcnN0QXJndW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0YWdOYW1lID0gZmlyc3RBcmd1bWVudCwgIC8vL1xuICAgICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfSAvPmA7XG5cbiAgICAgIGVsZW1lbnQgPSBFbGVtZW50LmZyb21IVE1MKEVsZW1lbnQsIGh0bWwpO1xuXG4gICAgICBlbGVtZW50LmFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuY29uc3QgUmVhY3QgPSB7XG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7XG5cbmZ1bmN0aW9uIGNoaWxkRWxlbWVudHNGcm9tQ2hpbGRBcmd1bWVudHMoY2hpbGRBcmd1bWVudHMpIHtcbiAgY2hpbGRBcmd1bWVudHMgPSBjaGlsZEFyZ3VtZW50cy5yZWR1Y2UoZnVuY3Rpb24oY2hpbGRBcmd1bWVudHMsIGNoaWxkQXJndW1lbnQpIHtcbiAgICBjaGlsZEFyZ3VtZW50cyA9IGNoaWxkQXJndW1lbnRzLmNvbmNhdChjaGlsZEFyZ3VtZW50KTtcblxuICAgIHJldHVybiBjaGlsZEFyZ3VtZW50cztcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEFyZ3VtZW50cy5tYXAoZnVuY3Rpb24oY2hpbGRBcmd1bWVudCkge1xuICAgIGxldCBjaGlsZEVsZW1lbnQ7XG4gICAgXG4gICAgaWYgKHR5cGVvZiBjaGlsZEFyZ3VtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dCA9IGNoaWxkQXJndW1lbnQsIC8vL1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBuZXcgVGV4dEVsZW1lbnQodGV4dCk7XG5cbiAgICAgIGNoaWxkRWxlbWVudCA9IHRleHRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBjaGlsZEVsZW1lbnQgPSBjaGlsZEFyZ3VtZW50OyAgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudDtcbiAgfSk7XG5cbiAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG59XG5cbmZ1bmN0aW9uIGlzVHlwZU9mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50Lm5hbWUgPT09IENsYXNzLm5hbWUpIHsgLy8vXG4gICAgdHlwZU9mID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBhcmd1bWVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhcmd1bWVudCk7IC8vL1xuXG4gICAgaWYgKGFyZ3VtZW50KSB7XG4gICAgICB0eXBlT2YgPSBpc1R5cGVPZihhcmd1bWVudCwgQ2xhc3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0eXBlT2Y7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IE9mZnNldCA9IHJlcXVpcmUoJy4vbWlzYy9vZmZzZXQnKSxcbiAgICAgIEJvdW5kcyA9IHJlcXVpcmUoJy4vbWlzYy9ib3VuZHMnKTtcblxuY2xhc3MgVGV4dEVsZW1lbnQge1xuICBjb25zdHJ1Y3Rvcih0ZXh0KSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7IC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50Ll9fZWxlbWVudF9fID0gdGhpcztcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gVGV4dEVsZW1lbnQuY2xvbmUodGhpcyk7IH1cblxuICBnZXRUZXh0KCkge1xuICAgIGNvbnN0IG5vZGVWYWx1ZSA9IHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUsXG4gICAgICAgICAgdGV4dCA9IG5vZGVWYWx1ZTsgLy8vXG5cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIHNldFRleHQodGV4dCkge1xuICAgIGNvbnN0IG5vZGVWYWx1ZSA9IHRleHQ7IC8vL1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lm5vZGVWYWx1ZSA9IG5vZGVWYWx1ZTtcbiAgfVxuXG4gIGdldE9mZnNldCgpIHtcbiAgICBjb25zdCB0b3AgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0VG9wLCAgLy8vXG4gICAgICAgICAgbGVmdCA9IHRoaXMuZG9tRWxlbWVudC5vZmZzZXRMZWZ0LCAgLy8vXG4gICAgICAgICAgb2Zmc2V0ID0gbmV3IE9mZnNldCh0b3AsIGxlZnQpO1xuXG4gICAgcmV0dXJuIG9mZnNldDtcbiAgfVxuXG4gIGdldEJvdW5kcygpIHtcbiAgICBjb25zdCBib3VuZGluZ0NsaWVudFJlY3QgPSB0aGlzLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgYm91bmRzID0gQm91bmRzLmZyb21Cb3VuZGluZ0NsaWVudFJlY3QoYm91bmRpbmdDbGllbnRSZWN0KTtcblxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBnZXRXaWR0aCgpIHtcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIGdldEhlaWdodCgpIHtcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIHByZXBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQucHJlcGVuZCh0aGlzKTsgfVxuXG4gIGFwcGVuZFRvKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5hcHBlbmQodGhpcyk7IH1cblxuICByZW1vdmVGcm9tKHBhcmVudEVsZW1lbnQpIHsgcGFyZW50RWxlbWVudC5yZW1vdmUodGhpcyk7IH1cblxuICBpbnNlcnRCZWZvcmUoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQpO1xuICB9XG5cbiAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VsZW1lbnQpIHtcbiAgICBjb25zdCBwYXJlbnRET01Ob2RlID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudC5wYXJlbnROb2RlLFxuICAgICAgICAgIHNpYmxpbmdET01FbGVtZW50ID0gc2libGluZ0VsZW1lbnQuZG9tRWxlbWVudDtcblxuICAgIHBhcmVudERPTU5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuZG9tRWxlbWVudCwgc2libGluZ0RPTUVsZW1lbnQubmV4dFNpYmxpbmcpOyAgLy8vXG4gIH1cblxuICByZW1vdmUoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVGV4dEVsZW1lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2V2ZW50JyksXG4gICAgICBjbGlja01peGluID0gcmVxdWlyZSgnLi9taXhpbi9jbGljaycpLFxuICAgICAgbW91c2VNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbW91c2UnKSxcbiAgICAgIGtleU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9rZXknKTtcblxuY2xhc3MgV2luZG93IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kb21FbGVtZW50ID0gd2luZG93O1xuICB9XG5cbiAgYXNzaWduKC4uLnNvdXJjZXMpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmRvbUVsZW1lbnQ7IC8vL1xuXG4gICAgT2JqZWN0LmFzc2lnbih0YXJnZXQsIC4uLnNvdXJjZXMpO1xuICB9XG4gIFxuICBnZXRXaWR0aCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5pbm5lcldpZHRoOyB9IC8vL1xuICBcbiAgZ2V0SGVpZ2h0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVySGVpZ2h0OyB9IC8vL1xuXG4gIGdldFNjcm9sbFRvcCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5wYWdlWU9mZnNldDsgfSAgLy8vXG5cbiAgZ2V0U2Nyb2xsTGVmdCgpIHsgcmV0dXJuIHRoaXMuZG9tRWxlbWVudC5wYWdlWE9mZnNldDsgfSAvLy9cblxuICBvblJlc2l6ZShoYW5kbGVyKSB7XG4gICAgaWYgKGhhbmRsZXIuaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBoYW5kbGVyLmludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcjtcbiAgICB9XG5cbiAgICBjb25zdCBldmVudFR5cGUgPSAncmVzaXplJztcbiAgICBcbiAgICB0aGlzLm9uKGV2ZW50VHlwZSwgaGFuZGxlcik7XG4gIH1cblxuICBvZmZSZXNpemUoaGFuZGxlcikge1xuICAgIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXG4gICAgdGhpcy5vZmYoZXZlbnRUeXBlLCBoYW5kbGVyKTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGV2ZW50TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBjbGlja01peGluKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgbW91c2VNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGtleU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgV2luZG93KCk7ICAvLy9cblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZVJlc2l6ZUhhbmRsZXIoaGFuZGxlcikge1xuICBjb25zdCB3aWR0aCA9IHRoaXMuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoKSxcbiAgICAgICAgdGFyZ2V0RWxlbWVudCA9IHRoaXMsIC8vL1xuICAgICAgICBwcmV2ZW50RGVmYXVsdCA9IGhhbmRsZXIod2lkdGgsIGhlaWdodCwgdGFyZ2V0RWxlbWVudCk7XG5cbiAgcmV0dXJuIHByZXZlbnREZWZhdWx0O1xufVxuIl19
