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

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options');

var Element = easy.Element,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first,
    last = arrayUtilities.last,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES;

var DropTarget = function (_Element) {
  _inherits(DropTarget, _Element);

  function DropTarget(selector) {
    var moveHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (pathMaps, done) {
      done();
    };

    _classCallCheck(this, DropTarget);

    var _this = _possibleConstructorReturn(this, (DropTarget.__proto__ || Object.getPrototypeOf(DropTarget)).call(this, selector));

    _this.moveHandler = moveHandler;

    _this.setInitialState();
    return _this;
  }

  _createClass(DropTarget, [{
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
      var dropTargets = this.getDropTargets(),
          dropTargetToBeMarked = dropTargets.reduce(function (dropTargetToBeMarked, dropTarget) {
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
      var dropTargets = this.getDropTargets(),
          markedDropTarget = dropTargets.reduce(function (markedDropTarget, dropTarget) {
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
        var lastDraggableEntry = last(draggableEntries),
            firstDraggableEntry = first(draggableEntries),
            firstDraggableEntryExplorer = firstDraggableEntry.getExplorer(),
            draggableEntriesExplorer = firstDraggableEntryExplorer,
            ///
        removeEmptyParentDirectoriesOptionPresent = draggableEntriesExplorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES); ///

        if (removeEmptyParentDirectoriesOptionPresent) {
          draggableEntriesExplorer.unsetOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
        }

        draggableEntries.forEach(function (draggableEntry) {
          if (draggableEntry === lastDraggableEntry) {
            if (removeEmptyParentDirectoriesOptionPresent) {
              draggableEntriesExplorer.setOption(REMOVE_EMPTY_PARENT_DIRECTORIES);
            }
          }

          var draggableEntryPath = draggableEntry.getPath();

          if (draggableEntryPath !== null) {
            var pathMap = pathMaps.find(function (pathMap) {
              var sourcePath = pathMap.sourcePath,
                  found = sourcePath === draggableEntryPath;


              return found;
            }),
                _sourcePath = pathMap.sourcePath,
                _targetPath = pathMap.targetPath,
                callback = pathMap.callback;


            draggableEntry = this.moveDraggableEntry(draggableEntry, _sourcePath, _targetPath);

            if (callback) {
              callback(draggableEntry);
            }
          }

          return draggableEntries;
        }.bind(this), []);

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

        draggableEntry = this.moveDirectoryNameDraggableEntry(directoryDraggableEntry, sourceDirectoryPath, targetDirectoryPath);
      } else {
        var fileNameDraggableEntry = draggableEntry,
            ///
        sourceFilePath = sourcePath,
            ///
        targetFilePath = targetPath;

        draggableEntry = this.moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath);
      }

      return draggableEntry;
    }
  }, {
    key: 'addDropTarget',
    value: function addDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets();

      dropTargets.push(dropTarget);
    }
  }, {
    key: 'removeDropTarget',
    value: function removeDropTarget(dropTarget) {
      var dropTargets = this.getDropTargets();

      var index = dropTargets.indexOf(dropTarget),
          found = index !== -1;

      if (found) {
        var start = index,
            ///
        deleteCount = 1;

        dropTargets.splice(start, deleteCount);
      }
    }
  }, {
    key: 'getDropTargets',
    value: function getDropTargets() {
      return this.fromState('dropTargets');
    }
  }, {
    key: 'setInitialState',
    value: function setInitialState() {
      var dropTargets = [];

      this.setState({
        dropTargets: dropTargets
      });
    }
  }]);

  return DropTarget;
}(Element);

module.exports = DropTarget;

},{"./options":14,"easy":18,"necessary":45}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var options = require('./options'),
    DropTarget = require('./dropTarget'),
    DirectoryNameMarkerEntry = require('./explorer/entry/marker/directoryName'),
    TopmostDirectoryNameDraggableEntry = require('./explorer/entry/draggable/directoryName/topmost');

var pathUtilities = necessary.pathUtilities,
    arrayUtilities = necessary.arrayUtilities,
    Element = easy.Element,
    React = easy.React,
    first = arrayUtilities.first,
    second = arrayUtilities.second,
    NO_DRAGGING_WITHIN = options.NO_DRAGGING_WITHIN,
    isPathTopmostDirectoryName = pathUtilities.isPathTopmostDirectoryName,
    pathWithoutBottommostNameFromPath = pathUtilities.pathWithoutBottommostNameFromPath;

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
    key: 'isOptionPresent',
    value: function isOptionPresent(option) {
      var optionPresent = this.options[option] === true;

      return optionPresent;
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var marked = void 0;

      var topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

      if (topmostDirectoryNameDraggableEntryMarked) {
        marked = true;
      } else {
        var topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

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
    key: 'getDirectoryPaths',
    value: function getDirectoryPaths() {
      var directoryPaths = this.retrieveDirectoryPaths();

      return directoryPaths;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(draggableEntry, directoryNameDraggableEntryOverlappingDraggableEntry) {
      var draggableEntryName = draggableEntry.getName(),
          draggableEntryType = draggableEntry.getType(),
          directoryOverlappingDraggableEntryPath = directoryNameDraggableEntryOverlappingDraggableEntry.getPath(),
          markerEntryPath = directoryOverlappingDraggableEntryPath + '/' + draggableEntryName;

      this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
    }
  }, {
    key: 'addMarkerEntryInPlace',
    value: function addMarkerEntryInPlace(draggableEntry) {
      var draggableEntryPath = draggableEntry.getPath(),
          draggableEntryType = draggableEntry.getType(),
          draggableEntryPathTopmostDirectoryName = isPathTopmostDirectoryName(draggableEntryPath);

      if (draggableEntryPathTopmostDirectoryName) {
        var topmostDirectoryMarkerPath = draggableEntryPath;

        this.addTopmostDirectoryMarkerEntry(topmostDirectoryMarkerPath);
      } else {
        var markerEntryPath = draggableEntryPath;

        this.addTopmostDirectoryNameDraggableEntryMarkerEntry(markerEntryPath, draggableEntryType);
      }
    }
  }, {
    key: 'addTopmostDirectoryMarkerEntry',
    value: function addTopmostDirectoryMarkerEntry(topmostDirectoryMarkerPath) {
      var topmostDirectoryMarkerName = topmostDirectoryMarkerPath,
          ///
      name = topmostDirectoryMarkerName,
          ///
      topmostDirectoryNameMarkerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });

      this.append(topmostDirectoryNameMarkerEntry);
    }
  }, {
    key: 'findTopmostDirectoryNameMarkerEntry',
    value: function findTopmostDirectoryNameMarkerEntry() {
      var topmostDirectoryNameMarkerEntry = null;

      var childDirectoryNameMarkerEntryListItemElements = this.getChildElements('li.directoryName marker entry'),
          childDirectoryNameMarkerEntryListItemElementsLength = childDirectoryNameMarkerEntryListItemElements.length;

      if (childDirectoryNameMarkerEntryListItemElementsLength === 1) {
        var firstChildDirectoryNameMarkerEntryListItemElement = first(childDirectoryNameMarkerEntryListItemElements);

        topmostDirectoryNameMarkerEntry = firstChildDirectoryNameMarkerEntryListItemElement; ///
      }

      return topmostDirectoryNameMarkerEntry;
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var topmostDirectoryNameDraggableEntryMarked = this.isTopmostDirectoryNameDraggableEntryMarked();

      if (topmostDirectoryNameDraggableEntryMarked) {
        this.removeTopmostDirectoryNameDraggableEntryMarkerEntry();
      } else {
        var topmostDirectoryNameMarkerEntry = this.findTopmostDirectoryNameMarkerEntry();

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
        markedDropTarget.removeMarkerEntry();

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
          noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN),
              noDragging = within && noDraggingWithinOptionPresent;

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
      var draggableEntry = null;

      var explorer = fileNameDraggableEntry.getExplorer();

      var filePath = void 0;

      if (targetFilePath === sourceFilePath) {} else if (targetFilePath === null) {
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
    key: 'moveDirectoryNameDraggableEntry',
    value: function moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
      var draggableEntry = null;

      var explorer = directoryNameDraggableEntry.getExplorer();

      var directoryPath = void 0;

      if (targetDirectoryPath === sourceDirectoryPath) {} else if (targetDirectoryPath === null) {
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
    key: 'openFileNameDraggableEntry',
    value: function openFileNameDraggableEntry(fileNameDraggableEntry) {
      var topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(),
          fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(topmostDirectoryNameDraggableEntry),
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
      var topmostDirectoryName = properties.topmostDirectoryName,
          topmostDirectoryCollapsed = properties.topmostDirectoryCollapsed,
          name = topmostDirectoryName,
          collapsed = topmostDirectoryCollapsed,
          explorer = this,
          topmostDirectory = React.createElement(TopmostDirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed });


      return topmostDirectory;
    }
  }, {
    key: 'initialise',
    value: function initialise() {
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


      explorer.initialise();

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
  ignoredProperties: ['topmostDirectoryName', 'topmostDirectoryCollapsed', 'onOpen', 'onMove', 'options']
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
      secondMatch = second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}

},{"./dropTarget":2,"./explorer/entry/draggable/directoryName/topmost":8,"./explorer/entry/marker/directoryName":11,"./options":14,"easy":18,"necessary":45}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var options = require('../options'),
    Entry = require('./entry'),
    FileNameMarkerEntry = require('./entry/marker/fileName'),
    FileNameDraggableEntry = require('./entry/draggable/fileName'),
    DirectoryNameMarkerEntry = require('./entry/marker/directoryName');

var Element = easy.Element,
    React = easy.React,
    types = Entry.types,
    REMOVE_EMPTY_PARENT_DIRECTORIES = options.REMOVE_EMPTY_PARENT_DIRECTORIES,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

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
    value: function addFileNameDraggableEntry(fileName, explorer) {
      var name = fileName,
          fileNameDraggableEntry = React.createElement(FileNameDraggableEntry, { name: name, explorer: explorer }),
          entry = fileNameDraggableEntry; ///

      this.addEntry(entry);

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryNameDraggableEntry',
    value: function addDirectoryNameDraggableEntry(directoryName, explorer, collapsed) {
      var name = directoryName,
          directoryNameDraggableEntry = React.createElement(this.DirectoryNameDraggableEntry, { name: name, explorer: explorer, collapsed: collapsed }),
          entry = directoryNameDraggableEntry; ///

      this.addEntry(entry);

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFileNameDraggableEntry',
    value: function removeFileNameDraggableEntry(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          explorer = fileNameDraggableEntry.getExplorer(),
          removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES),
          removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

      fileNameDraggableEntry.remove();

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'removeDirectoryNameDraggableEntry',
    value: function removeDirectoryNameDraggableEntry(directoryName) {
      var removeEmptyParentDirectories = false;

      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryEmpty = directoryNameDraggableEntry.isEmpty();

      if (directoryNameDraggableEntryEmpty) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            removeEmptyParentDirectoriesOptionPresent = explorer.isOptionPresent(REMOVE_EMPTY_PARENT_DIRECTORIES);

        removeEmptyParentDirectories = removeEmptyParentDirectoriesOptionPresent; ///

        directoryNameDraggableEntry.remove();
      }

      return removeEmptyParentDirectories;
    }
  }, {
    key: 'isDraggableEntryPresent',
    value: function isDraggableEntryPresent(name) {
      var draggableEntry = this.findDraggableEntry(name),
          draggableEntryPresent = draggableEntry !== null; ///

      return draggableEntryPresent;
    }
  }, {
    key: 'isFileNameDraggableEntryPresent',
    value: function isFileNameDraggableEntryPresent(fileName) {
      var fileNameDraggableEntry = this.findFileNameDraggableEntry(fileName),
          fileNameDraggableEntryPresent = fileNameDraggableEntry !== null; ///

      return fileNameDraggableEntryPresent;
    }
  }, {
    key: 'isDirectoryNameDraggableEntryPresent',
    value: function isDirectoryNameDraggableEntryPresent(directoryName) {
      var directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
          directoryNameDraggableEntryPresent = directoryNameDraggableEntry !== null; ///

      return directoryNameDraggableEntryPresent;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerName, draggableEntryType) {
      var markerEntry = void 0;

      var name = markerName; ///

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          markerEntry = React.createElement(FileNameMarkerEntry, { name: name });
          break;

        case DIRECTORY_NAME_TYPE:
          markerEntry = React.createElement(DirectoryNameMarkerEntry, { name: name });
          break;
      }

      var entry = markerEntry; ///

      this.addEntry(entry);
    }
  }, {
    key: 'removeMarkerEntry',
    value: function removeMarkerEntry() {
      var markerEntry = this.findMarkerEntry();

      markerEntry.remove();
    }
  }, {
    key: 'isMarked',
    value: function isMarked() {
      var markerEntry = this.findMarkerEntry(),
          marked = markerEntry !== null;

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
          previousEntry = this.findEntry(function (entry) {
        var nextEntryBeforeEntry = nextEntry.isBefore(entry),
            found = nextEntryBeforeEntry; ///

        return found;
      });

      if (previousEntry === null) {
        this.append(nextEntry);
      } else {
        nextEntry.insertBefore(previousEntry);
      }
    }
  }, {
    key: 'findMarkerEntry',
    value: function findMarkerEntry() {
      var markerEntry = this.findEntryByTypes(function (entry) {
        var found = true; ///

        return found;
      }, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE);

      return markerEntry;
    }
  }, {
    key: 'findDraggableEntry',
    value: function findDraggableEntry(name) {
      return this.findEntryByNameAndTypes(name, FILE_NAME_TYPE, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'findFileNameDraggableEntry',
    value: function findFileNameDraggableEntry(fileName) {
      return this.findEntryByNameAndTypes(fileName, FILE_NAME_TYPE);
    }
  }, {
    key: 'findDirectoryNameDraggableEntry',
    value: function findDirectoryNameDraggableEntry(directoryName) {
      return this.findEntryByNameAndTypes(directoryName, DIRECTORY_NAME_TYPE);
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
      this.forEachEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: 'forEachDirectoryNameDraggableEntry',
    value: function forEachDirectoryNameDraggableEntry(callback) {
      this.forEachEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'someFileNameDraggableEntry',
    value: function someFileNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, FILE_NAME_TYPE);
    }
  }, {
    key: 'someDirectoryNameDraggableEntry',
    value: function someDirectoryNameDraggableEntry(callback) {
      return this.someEntryByTypes(callback, DIRECTORY_NAME_TYPE);
    }
  }, {
    key: 'forEachEntryByTypes',
    value: function forEachEntryByTypes(callback) {
      for (var _len = arguments.length, types = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
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
    key: 'forEachEntry',
    value: function forEachEntry(callback) {
      var entries = this.getEntries();

      entries.forEach(function (entry) {
        callback(entry);
      });
    }
  }, {
    key: 'someEntryByTypes',
    value: function someEntryByTypes(callback) {
      for (var _len2 = arguments.length, types = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
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
    key: 'someEntry',
    value: function someEntry(callback) {
      var entries = this.getEntries();

      return entries.some(function (entry) {
        return callback(entry);
      });
    }
  }, {
    key: 'findEntryByNameAndTypes',
    value: function findEntryByNameAndTypes(name) {
      for (var _len3 = arguments.length, types = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        types[_key3 - 1] = arguments[_key3];
      }

      var entry = this.findEntryByTypes.apply(this, [function (entry) {
        var entryName = entry.getName(),
            found = entryName === name;

        return found;
      }].concat(types));

      return entry;
    }
  }, {
    key: 'findEntryByTypes',
    value: function findEntryByTypes(callback) {
      for (var _len4 = arguments.length, types = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        types[_key4 - 1] = arguments[_key4];
      }

      var entries = this.getEntries(),
          entry = entries.find(function (entry) {
        var entryType = entry.getType(),
            typesIncludesEntryType = types.includes(entryType);

        if (typesIncludesEntryType) {
          var found = callback(entry);

          return found;
        }
      }) || null; ///;

      return entry;
    }
  }, {
    key: 'findEntryByName',
    value: function findEntryByName(name) {
      var entry = this.findEntry(function (entry) {
        var entryName = entry.getName(),
            found = entryName === name;

        return found;
      });

      return entry;
    }
  }, {
    key: 'findEntry',
    value: function findEntry(callback) {
      var entries = this.getEntries(),
          entry = entries.find(callback) || null; ///

      return entry;
    }
  }, {
    key: 'getEntries',
    value: function getEntries() {
      var childEntryListItemElements = this.getChildElements('li.entry'),
          entries = childEntryListItemElements; ///

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

},{"../options":14,"./entry":5,"./entry/draggable/fileName":9,"./entry/marker/directoryName":11,"./entry/marker/fileName":12,"easy":18}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Element = easy.Element,
    React = easy.React;

var Entry = function (_Element) {
  _inherits(Entry, _Element);

  function Entry(selector, type) {
    _classCallCheck(this, Entry);

    var _this = _possibleConstructorReturn(this, (Entry.__proto__ || Object.getPrototypeOf(Entry)).call(this, selector));

    _this.type = type;
    return _this;
  }

  _createClass(Entry, [{
    key: 'getType',
    value: function getType() {
      return this.type;
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

  return Entry;
}(Element);

Object.assign(Entry, {
  tagName: 'li',
  defaultProperties: {
    className: 'entry'
  },
  ignoredProperties: ['name'],
  types: {
    FILE_NAME_TYPE: 'FILE_NAME_TYPE',
    DIRECTORY_NAME_TYPE: 'DIRECTORY_NAME_TYPE',
    FILE_NAME_MARKER_TYPE: 'FILE_NAME_MARKER_TYPE',
    DIRECTORY_NAME_MARKER_TYPE: 'DIRECTORY_NAME_MARKER_TYPE'
  }
});

module.exports = Entry;

},{"easy":18}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy');

var Entry = require('../entry'),
    options = require('../../options'),
    NameButton = require('../nameButton');

var ESCAPE_KEYCODE = 27,
    START_DRAGGING_DELAY = 175;

var window = easy.window,
    React = easy.React,
    Element = easy.Element,
    LEFT_MOUSE_BUTTON = Element.LEFT_MOUSE_BUTTON,
    NO_DRAGGING = options.NO_DRAGGING,
    NO_DRAGGING_SUB_ENTRIES = options.NO_DRAGGING_SUB_ENTRIES,
    NO_DRAGGING_TOPMOST_DIRECTORY = options.NO_DRAGGING_TOPMOST_DIRECTORY,
    ESCAPE_KEY_STOPS_DRAGGING = options.ESCAPE_KEY_STOPS_DRAGGING;

var DraggableEntry = function (_Entry) {
  _inherits(DraggableEntry, _Entry);

  function DraggableEntry(selector, type, explorer) {
    _classCallCheck(this, DraggableEntry);

    var _this = _possibleConstructorReturn(this, (DraggableEntry.__proto__ || Object.getPrototypeOf(DraggableEntry)).call(this, selector, type));

    _this.explorer = explorer;

    _this.setInitialState();
    return _this;
  }

  _createClass(DraggableEntry, [{
    key: 'getExplorer',
    value: function getExplorer() {
      return this.explorer;
    }
  }, {
    key: 'isDragging',
    value: function isDragging() {
      var dragging = this.hasClass('dragging');

      return dragging;
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
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
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
    key: 'startDragging',
    value: function startDragging(mouseTop, mouseLeft) {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING),
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

      this.addClass('dragging');

      this.drag(mouseTop, mouseLeft);
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var escapeKeyStopsDraggingOptionPresent = this.explorer.isOptionPresent(ESCAPE_KEY_STOPS_DRAGGING);

      if (escapeKeyStopsDraggingOptionPresent) {
        this.offKeyDown();
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
      var timeout = this.getTimeout();

      if (timeout === null) {
        timeout = setTimeout(function () {
          this.resetTimeout();

          var topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry(),
              subEntry = !topmostDirectoryNameDraggableEntry,
              ///
          noDraggingOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING),
              noDraggingSubEntriesOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_SUB_ENTRIES),
              noDraggingTopmostDirectoryNameDraggableEntryOptionPresent = this.explorer.isOptionPresent(NO_DRAGGING_TOPMOST_DIRECTORY); ///

          if (noDraggingOptionPresent || subEntry && noDraggingSubEntriesOptionPresent || topmostDirectoryNameDraggableEntry && noDraggingTopmostDirectoryNameDraggableEntryOptionPresent) {
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

        this.setTimeout(timeout);
      }
    }
  }, {
    key: 'stopWaitingToDrag',
    value: function stopWaitingToDrag() {
      var timeout = this.getTimeout();

      if (timeout !== null) {
        clearTimeout(timeout);

        this.resetTimeout();
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
      window.on('blur', this.mouseUpHandler, this); ///

      window.onMouseUp(this.mouseUpHandler, this);

      window.onMouseMove(this.mouseMoveHandler, this);

      if (mouseButton === LEFT_MOUSE_BUTTON) {
        var dragging = this.isDragging();

        if (!dragging) {
          this.startWaitingToDrag(mouseTop, mouseLeft);
        }
      }
    }
  }, {
    key: 'mouseUpHandler',
    value: function mouseUpHandler(mouseTop, mouseLeft, mouseButton) {
      window.off('blur', this.mouseUpHandler, this); ///

      window.offMouseUp(this.mouseUpHandler, this);

      window.offMouseMove(this.mouseMoveHandler, this);

      var dragging = this.isDragging();

      if (dragging) {
        var draggableEntry = this; ///

        this.explorer.stopDragging(draggableEntry, function () {
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
          windowScrollLeft = window.getScrollLeft(),
          topOffset = this.getTopOffset(),
          leftOffset = this.getLeftOffset();

      var top = mouseTop + topOffset - windowScrollTop,
          left = mouseLeft + leftOffset - windowScrollLeft;

      top = top + 'px'; ///
      left = left + 'px'; ///

      var css = {
        top: top,
        left: left
      };

      this.css(css);

      this.explorer.dragging(this);
    }
  }, {
    key: 'resetTimeout',
    value: function resetTimeout() {
      var timeout = null;

      this.setTimeout(timeout);
    }
  }, {
    key: 'getTimeout',
    value: function getTimeout() {
      return this.fromState('timeout');
    }
  }, {
    key: 'getTopOffset',
    value: function getTopOffset() {
      return this.fromState('topOffset');
    }
  }, {
    key: 'getLeftOffset',
    value: function getLeftOffset() {
      return this.fromState('leftOffset');
    }
  }, {
    key: 'setTimeout',
    value: function setTimeout(timeout) {
      this.updateState({
        timeout: timeout
      });
    }
  }, {
    key: 'setTopOffset',
    value: function setTopOffset(topOffset) {
      this.updateState({
        topOffset: topOffset
      });
    }
  }, {
    key: 'setLeftOffset',
    value: function setLeftOffset(leftOffset) {
      this.updateState({
        leftOffset: leftOffset
      });
    }
  }, {
    key: 'setInitialState',
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
    key: 'childElements',
    value: function childElements(properties) {
      var name = properties.name;


      return React.createElement(
        NameButton,
        null,
        name
      );
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      this.assignContext();

      var mouseDownHandler = this.mouseDownHandler.bind(this);

      this.onMouseDown(mouseDownHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var explorer = properties.explorer,
          draggableEntry = Entry.fromProperties(Class, properties, explorer);


      return draggableEntry;
    }
  }]);

  return DraggableEntry;
}(Entry);

Object.assign(DraggableEntry, {
  tagName: 'li',
  defaultProperties: {
    className: 'draggable'
  },
  ignoredProperties: ['explorer']
});

module.exports = DraggableEntry;

},{"../../options":14,"../entry":5,"../nameButton":13,"easy":18}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var Entry = require('../../entry'),
    Entries = require('../../entries'),
    DraggableEntry = require('../../entry/draggable');

var pathUtilities = necessary.pathUtilities,
    types = Entry.types,
    Button = easy.Button,
    React = easy.React,
    topmostDirectoryNameFromPath = pathUtilities.topmostDirectoryNameFromPath,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameDraggableEntry = function (_DraggableEntry) {
  _inherits(DirectoryNameDraggableEntry, _DraggableEntry);

  function DirectoryNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, DirectoryNameDraggableEntry);

    var type = DIRECTORY_NAME_TYPE;

    var _this = _possibleConstructorReturn(this, (DirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry)).call(this, selector, type, explorer));

    var toggleButtonClickHandler = _this.toggleButtonClickHandler.bind(_this);

    _this.entries = React.createElement(Entries, { DirectoryNameDraggableEntry: DirectoryNameDraggableEntry });

    _this.toggleButton = React.createElement(Button, { className: 'toggle', onClick: toggleButtonClickHandler });
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
      var before = void 0;

      var entryType = entry.getType();

      switch (entryType) {
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = name.localeCompare(entryName) < 0;

          break;
      }

      return before;
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
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

        fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName);
      } else {
        var fileName = filePath,
            ///
        entriesFile = this.entries.isFileNameDraggableEntryPresent(fileName);

        if (!entriesFile) {
          var explorer = this.getExplorer();

          fileNameDraggableEntry = this.entries.addFileNameDraggableEntry(fileName, explorer);
        }
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath, collapsed) {
      var directoryNameDraggableEntry = null;

      var addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

        directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
      } else {
        var directoryName = directoryPath,
            ///
        entriesDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = entriesDirectoryNameDraggableEntry !== null;

        if (entriesDirectoryNameDraggableEntryPresent) {
          entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
        } else {
          var explorer = this.getExplorer();

          directoryNameDraggableEntry = this.entries.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed);
        }
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var removeEmptyParentDirectoryNameDraggableEntries = null; ///

      var addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

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
        var topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

        if (!topmostDirectory) {
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
      var removeEmptyParentDirectoryNameDraggableEntries = false;

      var addIfNecessary = false,
          ///
      topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

      if (topmostDirectoryNameDraggableEntry !== null) {
        var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

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
        var topmostDirectory = this.isTopmostDirectoryNameDraggableEntry();

        if (!topmostDirectory) {
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
      var topmostDirectoryName = topmostDirectoryNameFromPath(markerPath);

      if (topmostDirectoryName === null) {
        var markerName = markerPath; ///

        this.entries.addMarkerEntry(markerName, draggableEntryType);
      } else {
        var topmostDirectoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName),
            markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

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
    key: 'isDraggableEntryPresent',
    value: function isDraggableEntryPresent(name) {
      return this.entries.isDraggableEntryPresent(name);
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
            directoryFilePaths = directoryNameDraggableEntryFilePaths;

        filePaths = filePaths.concat(directoryFilePaths);
      });

      return filePaths;
    }
  }, {
    key: 'retrieveDirectoryPaths',
    value: function retrieveDirectoryPaths() {
      var directoryPaths = [];

      this.forEachDirectoryNameDraggableEntry(function (directoryNameDraggableEntry) {
        var directoryNameDraggableEntryPath = directoryNameDraggableEntry.getPath(),
            directoryNameDraggableEntryDirectoryPaths = directoryNameDraggableEntry.retrieveDirectoryPaths(),
            directoryPath = directoryNameDraggableEntryPath,
            ///
        directoryDirectoryPaths = directoryNameDraggableEntryDirectoryPaths;

        directoryPaths.push(directoryPath);

        directoryPaths = directoryPaths.concat(directoryDirectoryPaths);
      });

      return directoryPaths;
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

      var topmostDirectoryName = topmostDirectoryNameFromPath(path);

      if (topmostDirectoryName === null) {
        topmostDirectoryNameDraggableEntry = null;
      } else {
        if (addIfNecessary) {
          var entriesDirectoryNameDraggableEntryPresent = this.entries.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

          if (!entriesDirectoryNameDraggableEntryPresent) {
            var collapsed = true,
                ///
            explorer = this.getExplorer();

            this.entries.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed);
          }
        }

        var directoryNameDraggableEntry = this.entries.findDirectoryNameDraggableEntry(topmostDirectoryName);

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
    key: 'setCollapsed',
    value: function setCollapsed(collapsed) {
      collapsed ? this.collapse() : this.expand();
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
  }, {
    key: 'initialise',
    value: function initialise(collapsed) {
      _get(DirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(DirectoryNameDraggableEntry.prototype), 'initialise', this).call(this);

      this.onDoubleClick(this.doubleClickHandler.bind(this));

      this.append(this.entries);

      this.prepend(this.toggleButton);

      this.setCollapsed(collapsed);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = DirectoryNameDraggableEntry;
      }

      var _properties = properties,
          collapsed = _properties.collapsed,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);


      directoryNameDraggableEntry.initialise(collapsed);

      return directoryNameDraggableEntry;
    }
  }]);

  return DirectoryNameDraggableEntry;
}(DraggableEntry);

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directoryName'
  },
  ignoredProperties: ['collapsed']
});

module.exports = DirectoryNameDraggableEntry;

},{"../../entries":4,"../../entry":5,"../../entry/draggable":6,"easy":18,"necessary":45}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var necessary = require('necessary');

var options = require('../../../../options'),
    DirectoryNameDraggableEntry = require('../../../entry/draggable/directoryName');

var pathUtilities = necessary.pathUtilities,
    NO_DRAGGING_INTO_SUB_DIRECTORIES = options.NO_DRAGGING_INTO_SUB_DIRECTORIES,
    pathWithoutTopmostDirectoryNameFromPath = pathUtilities.pathWithoutTopmostDirectoryNameFromPath;

var TopmostDirectoryNameDraggableEntry = function (_DirectoryNameDraggab) {
  _inherits(TopmostDirectoryNameDraggableEntry, _DirectoryNameDraggab);

  function TopmostDirectoryNameDraggableEntry() {
    _classCallCheck(this, TopmostDirectoryNameDraggableEntry);

    return _possibleConstructorReturn(this, (TopmostDirectoryNameDraggableEntry.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry)).apply(this, arguments));
  }

  _createClass(TopmostDirectoryNameDraggableEntry, [{
    key: 'retrieve',
    value: function retrieve() {
      return this; ///
    }
  }, {
    key: 'isTopmostDirectoryNameDraggableEntry',
    value: function isTopmostDirectoryNameDraggableEntry() {
      return true;
    }
  }, {
    key: 'addFilePath',
    value: function addFilePath(filePath) {
      var fileNameDraggableEntry = null;

      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        fileNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addFilePath', this).call(this, filePathWithoutTopmostDirectoryName);
      }

      return fileNameDraggableEntry;
    }
  }, {
    key: 'addDirectoryPath',
    value: function addDirectoryPath(directoryPath) {
      var collapsed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var directoryNameDraggableEntry = null;

      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        directoryNameDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addDirectoryPath', this).call(this, directoryPathWithoutTopmostDirectoryName, collapsed);
      }

      return directoryNameDraggableEntry;
    }
  }, {
    key: 'removeFilePath',
    value: function removeFilePath(filePath) {
      var filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      if (filePathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeFilePath', this).call(this, filePathWithoutTopmostDirectoryName);
      }
    }
  }, {
    key: 'removeDirectoryPath',
    value: function removeDirectoryPath(directoryPath) {
      var directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      if (directoryPathWithoutTopmostDirectoryName !== null) {
        _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'removeDirectoryPath', this).call(this, directoryPathWithoutTopmostDirectoryName);
      }
    }
  }, {
    key: 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry',
    value: function retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
      var directoryNameDraggableEntryOverlappingDraggableEntry = void 0;

      var explorer = this.getExplorer(),
          noDraggingIntoSubdirectoriesOptionPresent = explorer.isOptionPresent(NO_DRAGGING_INTO_SUB_DIRECTORIES);

      if (noDraggingIntoSubdirectoriesOptionPresent) {
        var overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

        directoryNameDraggableEntryOverlappingDraggableEntry = overlappingDraggableEntry ? this : null;
      } else {
        directoryNameDraggableEntryOverlappingDraggableEntry = _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry', this).call(this, draggableEntry);
      }

      return directoryNameDraggableEntryOverlappingDraggableEntry;
    }
  }, {
    key: 'addMarkerEntry',
    value: function addMarkerEntry(markerPath, draggableEntryType) {
      var markerPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(markerPath);

      _get(TopmostDirectoryNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(TopmostDirectoryNameDraggableEntry.prototype), 'addMarkerEntry', this).call(this, markerPathWithoutTopmostDirectoryName, draggableEntryType);
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
        retrieveTopmostDirectoryNameDraggableEntry: this.retrieve.bind(this), ///
        retrieveMarkedDirectoryNameDraggableEntry: this.retrieveMarkedDirectoryNameDraggableEntry.bind(this),
        retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry: this.retrieveDirectoryNameDraggableEntryOverlappingDraggableEntry.bind(this),
        addTopmostDirectoryNameDraggableEntryMarkerEntry: this.addMarkerEntry.bind(this), ///
        removeTopmostDirectoryNameDraggableEntryMarkerEntry: this.removeMarkerEntry.bind(this), ///
        isTopmostDirectoryNameDraggableEntryMarked: this.isMarked.bind(this), ///
        getTopmostDirectoryName: this.getName.bind(this), ///
        retrieveFilePaths: this.retrieveFilePaths.bind(this),
        retrieveDirectoryPaths: this.retrieveDirectoryPaths.bind(this)
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return DirectoryNameDraggableEntry.fromProperties(TopmostDirectoryNameDraggableEntry, properties);
    }
  }]);

  return TopmostDirectoryNameDraggableEntry;
}(DirectoryNameDraggableEntry);

module.exports = TopmostDirectoryNameDraggableEntry;

},{"../../../../options":14,"../../../entry/draggable/directoryName":7,"necessary":45}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    DraggableEntry = require('../../entry/draggable'),
    nameUtilities = require('../../../utilities/name');

var types = Entry.types,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var FileNameDraggableEntry = function (_DraggableEntry) {
  _inherits(FileNameDraggableEntry, _DraggableEntry);

  function FileNameDraggableEntry(selector, explorer) {
    _classCallCheck(this, FileNameDraggableEntry);

    var type = FILE_NAME_TYPE;

    return _possibleConstructorReturn(this, (FileNameDraggableEntry.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry)).call(this, selector, type, explorer));
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
        case FILE_NAME_TYPE:
        case FILE_NAME_MARKER_TYPE:
        case DIRECTORY_NAME_MARKER_TYPE:
          var name = this.getName(),
              entryName = entry.getName();

          before = nameIsBeforeEntryName(name, entryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

      return before;
    }
  }, {
    key: 'retrieveSubEntries',
    value: function retrieveSubEntries() {
      var subEntries = []; ///

      return subEntries;
    }
  }, {
    key: 'doubleClickHandler',
    value: function doubleClickHandler() {
      var explorer = this.getExplorer(),
          file = this; ///

      explorer.openFileNameDraggableEntry(file);
    }
  }, {
    key: 'initialise',
    value: function initialise() {
      _get(FileNameDraggableEntry.prototype.__proto__ || Object.getPrototypeOf(FileNameDraggableEntry.prototype), 'initialise', this).call(this);

      var doubleClickHandler = this.doubleClickHandler.bind(this);

      this.onDoubleClick(doubleClickHandler);
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      if (arguments.length === 1) {
        properties = Class;
        Class = FileNameDraggableEntry;
      }

      var fileNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);

      fileNameDraggableEntry.initialise();

      return fileNameDraggableEntry;
    }
  }]);

  return FileNameDraggableEntry;
}(DraggableEntry);

Object.assign(FileNameDraggableEntry, {
  defaultProperties: {
    className: 'fileName'
  }
});

module.exports = FileNameDraggableEntry;

},{"../../../utilities/name":16,"../../entry":5,"../../entry/draggable":6}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../entry');

var MarkerEntry = function (_Entry) {
  _inherits(MarkerEntry, _Entry);

  function MarkerEntry(selector, type, name) {
    _classCallCheck(this, MarkerEntry);

    var _this = _possibleConstructorReturn(this, (MarkerEntry.__proto__ || Object.getPrototypeOf(MarkerEntry)).call(this, selector, type));

    _this.name = name;
    return _this;
  }

  _createClass(MarkerEntry, [{
    key: 'getName',
    value: function getName() {
      return this.name;
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(Class, properties) {
      var name = properties.name,
          markerEntry = Entry.fromProperties(Class, properties, name);


      return markerEntry;
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

},{"../entry":5}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker');

var types = Entry.types,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE,
    DIRECTORY_NAME_MARKER_TYPE = types.DIRECTORY_NAME_MARKER_TYPE;

var DirectoryNameMarkerEntry = function (_MarkerEntry) {
  _inherits(DirectoryNameMarkerEntry, _MarkerEntry);

  function DirectoryNameMarkerEntry(selector, name) {
    _classCallCheck(this, DirectoryNameMarkerEntry);

    var type = DIRECTORY_NAME_MARKER_TYPE;

    return _possibleConstructorReturn(this, (DirectoryNameMarkerEntry.__proto__ || Object.getPrototypeOf(DirectoryNameMarkerEntry)).call(this, selector, type, name));
  }

  _createClass(DirectoryNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          before = true;

          break;

        case DIRECTORY_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = name.localeCompare(draggableEntryName) < 0;

          break;
      }

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

Object.assign(DirectoryNameMarkerEntry, {
  defaultProperties: {
    className: 'directoryName'
  }
});

module.exports = DirectoryNameMarkerEntry;

},{"../../entry":5,"../../entry/marker":10}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = require('../../entry'),
    MarkerEntry = require('../../entry/marker'),
    nameUtilities = require('../../../utilities/name');

var types = Entry.types,
    nameIsBeforeEntryName = nameUtilities.nameIsBeforeEntryName,
    FILE_NAME_TYPE = types.FILE_NAME_TYPE,
    FILE_NAME_MARKER_TYPE = types.FILE_NAME_MARKER_TYPE,
    DIRECTORY_NAME_TYPE = types.DIRECTORY_NAME_TYPE;

var FileNameMarkerEntry = function (_MarkerEntry) {
  _inherits(FileNameMarkerEntry, _MarkerEntry);

  function FileNameMarkerEntry(selector, name) {
    _classCallCheck(this, FileNameMarkerEntry);

    var type = FILE_NAME_MARKER_TYPE;

    return _possibleConstructorReturn(this, (FileNameMarkerEntry.__proto__ || Object.getPrototypeOf(FileNameMarkerEntry)).call(this, selector, type, name));
  }

  _createClass(FileNameMarkerEntry, [{
    key: 'isBefore',
    value: function isBefore(draggableEntry) {
      var before = void 0;

      var draggableEntryType = draggableEntry.getType();

      switch (draggableEntryType) {
        case FILE_NAME_TYPE:
          var name = this.getName(),
              draggableEntryName = draggableEntry.getName();

          before = nameIsBeforeEntryName(name, draggableEntryName);
          break;

        case DIRECTORY_NAME_TYPE:
          before = false;
          break;
      }

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

Object.assign(FileNameMarkerEntry, {
  defaultProperties: {
    className: 'fileName'
  }
});

module.exports = FileNameMarkerEntry;

},{"../../../utilities/name":16,"../../entry":5,"../../entry/marker":10}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var easy = require('easy'),
    necessary = require('necessary');

var InputElement = easy.InputElement,
    arrayUtilities = necessary.arrayUtilities,
    first = arrayUtilities.first;

var NameButton = function (_InputElement) {
  _inherits(NameButton, _InputElement);

  function NameButton() {
    _classCallCheck(this, NameButton);

    return _possibleConstructorReturn(this, (NameButton.__proto__ || Object.getPrototypeOf(NameButton)).apply(this, arguments));
  }

  _createClass(NameButton, [{
    key: 'getName',
    value: function getName() {
      var childElements = this.getChildElements(),
          firstChildElement = first(childElements),
          firstChildElementText = firstChildElement.getText(),
          name = firstChildElementText; ///

      return name;
    }
  }, {
    key: 'onDoubleClick',
    value: function onDoubleClick(handler) {
      this.on('dblclick', handler);
    }
  }, {
    key: 'parentContext',
    value: function parentContext() {
      return {
        getName: this.getName.bind(this),
        onDoubleClick: this.onDoubleClick.bind(this)
      };
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      return InputElement.fromProperties(NameButton, properties);
    }
  }]);

  return NameButton;
}(InputElement);

Object.assign(NameButton, {
  tagName: 'button',
  defaultProperties: {
    className: 'name'
  },
  ignoredProperties: ['name']
});

module.exports = NameButton;

},{"easy":18,"necessary":45}],14:[function(require,module,exports){
'use strict';

var options = {
  NO_DRAGGING: 'NO_DRAGGING',
  NO_DRAGGING_WITHIN: 'NO_DRAGGING_WITHIN',
  NO_DRAGGING_SUB_ENTRIES: 'NO_DRAGGING_SUB_ENTRIES',
  NO_DRAGGING_TOPMOST_DIRECTORY: 'NO_DRAGGING_TOPMOST_DIRECTORY',
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

    return _possibleConstructorReturn(this, (RubbishBin.__proto__ || Object.getPrototypeOf(RubbishBin)).call(this, selector, moveHandler));
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
      var draggableEntry = null;

      if (targetDirectoryPath === null) {
        var explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath; ///

        explorer.removeDirectoryPath(directoryPath);
      }

      return draggableEntry;
    }
  }, {
    key: 'moveFileNameDraggableEntry',
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
    key: 'pathMapsFromDraggableEntries',
    value: function pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
      var pathMaps = draggableEntries.map(function (draggableEntry) {
        var pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

        return pathMap;
      });

      return pathMaps;
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
    key: 'initialise',
    value: function initialise() {
      this.close();
    }
  }], [{
    key: 'fromProperties',
    value: function fromProperties(properties) {
      var onRemove = properties.onRemove,
          removeHandler = onRemove,
          rubbishBin = Element.fromProperties(RubbishBin, properties, removeHandler);


      rubbishBin.initialise();

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

},{"./dropTarget":2,"easy":18}],16:[function(require,module,exports){
'use strict';

var necessary = require('necessary');

var arrayUtilities = necessary.arrayUtilities,
    second = arrayUtilities.second;


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

module.exports = {
  extensionFromName: extensionFromName,
  nameWithoutExtensionFromName: nameWithoutExtensionFromName,
  nameIsBeforeEntryName: nameIsBeforeEntryName
};

},{"necessary":45}],17:[function(require,module,exports){

},{}],18:[function(require,module,exports){
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

},{"./lib/document":19,"./lib/element":20,"./lib/element/body":21,"./lib/element/button":22,"./lib/element/checkbox":23,"./lib/element/div":24,"./lib/element/link":25,"./lib/element/select":26,"./lib/element/span":27,"./lib/inputElement":28,"./lib/inputElement/input":29,"./lib/inputElement/textarea":30,"./lib/misc/bounds":31,"./lib/misc/offset":32,"./lib/react":40,"./lib/textElement":41,"./lib/window":44}],19:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    mouseMixin = require('./mixin/mouse'),
    keyMixin = require('./mixin/key');

var Document = function Document() {
  _classCallCheck(this, Document);

  this.domElement = document; ///
};

Object.assign(Document.prototype, eventMixin);
Object.assign(Document.prototype, clickMixin);
Object.assign(Document.prototype, mouseMixin);
Object.assign(Document.prototype, keyMixin);

module.exports = new Document(); ///

},{"./mixin/click":33,"./mixin/event":34,"./mixin/key":36,"./mixin/mouse":37}],20:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var Offset = require('./misc/offset'),
    Bounds = require('./misc/bounds'),
    jsxMixin = require('./mixin/jsx'),
    eventMixin = require('./mixin/event'),
    clickMixin = require('./mixin/click'),
    scrollMixin = require('./mixin/scroll'),
    resizeMixin = require('./mixin/resize'),
    mouseMixin = require('./mixin/mouse'),
    keyMixin = require('./mixin/key'),
    domUtilities = require('./utilities/dom'),
    objectUtilities = require('./utilities/object');

var array = necessary.array,
    first = array.first,
    augment = array.augment;

var Element = function () {
  function Element(selector) {
    _classCallCheck(this, Element);

    this.domElement = domUtilities.domElementFromSelector(selector);

    this.domElement.__element__ = this; ///
  }

  _createClass(Element, [{
    key: 'clone',
    value: function clone() {
      return Element.clone(this);
    }
  }, {
    key: 'getDOMElement',
    value: function getDOMElement() {
      return this.domElement;
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
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

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
      var includeBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var height = includeBorder ? this.domElement.offsetHeight : this.domElement.clientHeight;

      return height;
    }
  }, {
    key: 'setHeight',
    value: function setHeight(height) {
      this.domElement.style.height = height;
    }
  }, {
    key: 'hasAttribute',
    value: function hasAttribute(name) {
      return this.domElement.hasAttribute(name);
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
    key: 'addTo',
    value: function addTo(parentElement) {
      parentElement.add(this);
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
    key: 'add',
    value: function add(element) {
      this.append(element);
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
      this.display(displayStyle);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.domElement.style.display = 'none';
    }
  }, {
    key: 'display',
    value: function display(displayStyle) {
      this.domElement.style.display = displayStyle;
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
    key: 'isEnabled',
    value: function isEnabled() {
      var disabled = this.isDisabled(),
          enabled = !disabled;

      return enabled;
    }
  }, {
    key: 'isDisabled',
    value: function isDisabled() {
      var disabled = this.hasAttribute('disabled');

      return disabled;
    }
  }, {
    key: 'isDisplayed',
    value: function isDisplayed() {
      return this.domElement.style.display !== 'none';
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
      descendantDOMNodes = domUtilities.descendantDOMNodesFromDOMNode(domNode),
          descendantDOMElements = domUtilities.filterDOMNodesBySelector(descendantDOMNodes, selector),
          descendantElements = domUtilities.elementsFromDOMElements(descendantDOMElements);

      return descendantElements;
    }
  }, {
    key: 'getChildElements',
    value: function getChildElements() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var childDOMNodes = this.domElement.childNodes,
          childDOMElements = domUtilities.filterDOMNodesBySelector(childDOMNodes, selector),
          childElements = domUtilities.elementsFromDOMElements(childDOMElements);

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
              parentElements = domUtilities.elementsFromDOMElements(parentDOMElements),
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

      var ascendantElements = domUtilities.elementsFromDOMElements(ascendantDOMElements);

      return ascendantElements;
    }
  }, {
    key: 'getPreviousSiblingElement',
    value: function getPreviousSiblingElement() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';

      var previousSiblingElement = null;

      var previousSiblingDOMNode = this.domElement.previousSibling; ///

      if (previousSiblingDOMNode !== null && domUtilities.domNodeMatchesSelector(previousSiblingDOMNode, selector)) {
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

      if (nextSiblingDOMNode !== null && domUtilities.domNodeMatchesSelector(nextSiblingDOMNode, selector)) {
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
          element = Element.fromHTML.apply(Element, [Class, html].concat(remainingArguments)),
          defaultProperties = defaultPropertiesFromClass(Class),
          ignoredProperties = ignoredPropertiesFromClass(Class);

      element.applyProperties(properties, defaultProperties, ignoredProperties);

      return element;
    }
  }, {
    key: 'fromString',
    value: function fromString(string, properties) {
      for (var _len5 = arguments.length, remainingArguments = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        remainingArguments[_key5 - 2] = arguments[_key5];
      }

      var tagName = string,
          ///
      html = '<' + tagName + ' />',
          element = Element.fromHTML.apply(Element, [Element, html].concat(remainingArguments)),
          defaultProperties = {},
          ///
      ignoredProperties = []; ///

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
  RIGHT_MOUSE_BUTTON: 2,
  MIDDLE_MOUSE_BUTTON: 1
});

module.exports = Element;

function defaultPropertiesFromClass(Class) {
  var defaultProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  objectUtilities.combine(defaultProperties, Class.defaultProperties);

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    defaultPropertiesFromClass(superClass, defaultProperties);
  }

  return defaultProperties;
}

function ignoredPropertiesFromClass(Class) {
  var ignoredProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  augment(ignoredProperties, Class.ignoredProperties || [], function (ignoredProperty) {
    return !ignoredProperties.includes(ignoredProperty);
  });

  var superClass = Object.getPrototypeOf(Class);

  if (superClass !== null) {
    ignoredPropertiesFromClass(superClass, ignoredProperties);
  }

  return ignoredProperties;
}

},{"./misc/bounds":31,"./misc/offset":32,"./mixin/click":33,"./mixin/event":34,"./mixin/jsx":35,"./mixin/key":36,"./mixin/mouse":37,"./mixin/resize":38,"./mixin/scroll":39,"./utilities/dom":42,"./utilities/object":43,"necessary":45}],21:[function(require,module,exports){
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

},{"../element":20}],22:[function(require,module,exports){
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
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;

      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'onClick', this).call(this, clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler, object) {
      _get(Button.prototype.__proto__ || Object.getPrototypeOf(Button.prototype), 'offClick', this).call(this, clickHandler, object);
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

function defaultIntermediateClickHandler(clickHandler, event, targetElement) {
  var mouseButton = event.button;

  clickHandler(mouseButton, event, targetElement);
}

},{"../element":20}],23:[function(require,module,exports){
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
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;

      this.on('click', changeHandler, object, intermediateChangeHandler); ///
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler, object) {
      this.off('click', changeHandler, object); ///
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
      var domElement = this.getDOMElement(),
          checked = domElement.checked;

      return checked;
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

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  var checkbox = targetElement,
      ///
  checked = checkbox.isChecked();

  changeHandler(checked, event, targetElement);
}

},{"../element":20}],24:[function(require,module,exports){
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

},{"../element":20}],25:[function(require,module,exports){
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
    value: function onClick(clickHandler, object) {
      var intermediateClickHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateClickHandler;

      this.on('click', clickHandler, object, intermediateClickHandler);
    }
  }, {
    key: 'offClick',
    value: function offClick(clickHandler, object) {
      this.off('click', clickHandler, object);
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

function defaultIntermediateClickHandler(clickHandler, event, targetElement) {
  var link = targetElement,
      ///
  href = link.getAttribute('href');

  clickHandler(href, event, targetElement);
}

},{"../element":20}],26:[function(require,module,exports){
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
    value: function onChange(changeHandler, object) {
      var intermediateChangeHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateChangeHandler;

      this.on('change', changeHandler, object, intermediateChangeHandler);
    }
  }, {
    key: 'offChange',
    value: function offChange(changeHandler, object) {
      this.off('change', changeHandler, object);
    }
  }, {
    key: 'getSelectedOptionValue',
    value: function getSelectedOptionValue() {
      var domElement = this.getDOMElement(),
          selectedOptionValue = domElement.value; ///

      return selectedOptionValue;
    }
  }, {
    key: 'setSelectedOptionByValue',
    value: function setSelectedOptionByValue(selectedOptionValue) {
      var value = selectedOptionValue,
          ///
      domElement = this.getDOMElement();

      domElement.value = value;
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

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  var select = targetElement,
      ///
  selectedOptionValue = select.getSelectedOptionValue();

  changeHandler(selectedOptionValue, event, targetElement);
}

},{"../element":20}],27:[function(require,module,exports){
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

},{"../element":20}],28:[function(require,module,exports){
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
    key: 'onResize',
    value: function onResize() {}
  }, {
    key: 'offResize',
    value: function offResize() {}
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
    key: 'isReadOnly',
    value: function isReadOnly() {
      return this.domElement.readOnly;
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
    key: 'setReadOnly',
    value: function setReadOnly(readOnly) {
      this.domElement.readOnly = readOnly;
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
  }, {
    key: 'fromString',
    value: function fromString(string, properties) {
      var onChange = properties.onChange,
          changeHandler = onChange; ///

      for (var _len5 = arguments.length, remainingArguments = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        remainingArguments[_key5 - 2] = arguments[_key5];
      }

      return Element.fromString.apply(Element, [string, properties, changeHandler].concat(remainingArguments));
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
  value = inputElement.getValue();

  changeHandler(value, event, targetElement);
}

},{"./element":20}],29:[function(require,module,exports){
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

},{"../inputElement":28}],30:[function(require,module,exports){
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

},{"../inputElement":28}],31:[function(require,module,exports){
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

function onClick(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('click', handler, object, intermediateHandler);
}

function offClick(handler, object) {
  this.off('click', handler, object);
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
  mouseButton = event.button; ///

  handler(mouseTop, mouseLeft, mouseButton, event, targetElement);
}

},{}],34:[function(require,module,exports){
'use strict';

function on(eventTypes, handler) {
  var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var intermediateHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = this.addEventListener(eventType, handler, object, intermediateHandler);

    this.domElement.addEventListener(eventType, eventListener);
  }.bind(this));
}

function off(eventTypes, handler) {
  var object = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function (eventType) {
    var eventListener = this.removeEventListener(eventType, handler, object);

    this.domElement.removeEventListener(eventType, eventListener);
  }.bind(this));
}

var eventMixin = {
  on: on,
  off: off,
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
};

module.exports = eventMixin;

function addEventListener(eventType, handler, object, intermediateHandler) {
  if (!this.hasOwnProperty('eventListeners')) {
    this.eventListeners = [];
  }

  var targetElement = this,
      ///
  eventListeners = this.eventListeners,
      eventListener = createEventListener(targetElement, eventType, handler, object, intermediateHandler);

  eventListeners.push(eventListener);

  return eventListener;
}

function removeEventListener(eventType, handler, object) {
  var eventListeners = this.eventListeners,
      eventListener = findEventListener(eventListeners, eventType, handler, object),
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

function createEventListener(targetElement, eventType, handler, object, intermediateHandler) {
  var eventListener = void 0;

  if (intermediateHandler === null) {
    eventListener = function eventListener(event) {
      handler.call(object, event, targetElement);
    };
  } else {
    eventListener = function eventListener(event) {
      intermediateHandler(function (event) {
        handler.call.apply(handler, [object].concat(Array.prototype.slice.call(arguments)));
      }, event, targetElement);
    };
  }

  Object.assign(eventListener, {
    eventType: eventType,
    handler: handler,
    object: object
  });

  return eventListener;
}

function findEventListener(eventListeners, eventType, handler, object) {
  var eventListener = eventListeners.find(function (eventListener) {
    var found = eventListener.object === object && eventListener.handler === handler && eventListener.eventType === eventType; ///

    return found;
  });

  return eventListener;
}

},{}],35:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var necessary = require('necessary');

var TextElement = require('../textElement'),
    objectUtilities = require('../utilities/object');

var array = necessary.array,
    first = array.first;


function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  objectUtilities.combine(properties, defaultProperties);

  var childElements = childElementsFromElementAndProperties(this, properties);

  objectUtilities.prune(properties, ignoredProperties);

  var names = Object.keys(properties); ///

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
    childElement.addTo(parentElement);

    updateParentContext(childElement, parentElement);
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

function fromState(name) {
  var value = this.state[name];

  return value;
}

function updateState(update) {
  Object.assign(this.state, update);
}

function assignContext(names, thenDelete) {
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
    var value = this.context[name],
        propertyName = name,
        ///
    descriptor = {
      value: value
    };

    Object.defineProperty(this, propertyName, descriptor);

    if (thenDelete) {
      delete this.context[name];
    }
  }.bind(this), []);
}

var jsxMixin = {
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  getState: getState,
  setState: setState,
  fromState: fromState,
  updateState: updateState,
  assignContext: assignContext
};

module.exports = jsxMixin;

function updateParentContext(childElement, parentElement) {
  var parentContext = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  delete childElement.context;
}

function childElementsFromElementAndProperties(element, properties) {
  var childElements = typeof element.childElements === 'function' ? element.childElements(properties) : properties.childElements;

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

},{"../textElement":41,"../utilities/object":43,"necessary":45}],36:[function(require,module,exports){
'use strict';

function onKeyUp(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keyup', handler, object, intermediateHandler);
}

function onKeyDown(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keydown', handler, object, intermediateHandler);
}

function offKeyUp(handler, object) {
  this.off('keyup', handler, object);
}

function offKeyDown(handler, object) {
  this.off('keydown', handler, object);
}

var keyMixin = {
  onKeyUp: onKeyUp,
  onKeyDown: onKeyDown,
  offKeyUp: offKeyUp,
  offKeyDown: offKeyDown
};

module.exports = keyMixin;

function defaultIntermediateHandler(handler, event, targetElement) {
  var keyCode = event.keyCode;

  handler(keyCode, event, targetElement);
}

},{}],37:[function(require,module,exports){
'use strict';

function onMouseUp(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseup', handler, object, intermediateHandler);
}

function onMouseDown(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mousedown', handler, object, intermediateHandler);
}

function onMouseOver(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseover', handler, object, intermediateHandler);
}

function onMouseOut(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mouseout', handler, object, intermediateHandler);
}

function onMouseMove(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('mousemove', handler, object, intermediateHandler);
}

function offMouseUp(handler, object) {
  this.off('mouseup', handler, object);
}

function offMouseDown(handler, object) {
  this.off('mousedown', handler, object);
}

function offMouseOver(handler, object) {
  this.off('mouseover', handler, object);
}

function offMouseOut(handler, object) {
  this.off('mouseout', handler, object);
}

function offMouseMove(handler, object) {
  this.off('mousemove', handler, object);
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
  mouseButton = event.button; ///

  handler(mouseTop, mouseLeft, mouseButton, event, targetElement);
}

},{}],38:[function(require,module,exports){
'use strict';

function onResize(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;

  var element = this,
      ///
  resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    addResizeObject(element);
  }

  var eventType = 'resize';

  this.addEventListener(eventType, handler, object, intermediateHandler);
}

function offResize(handler, object) {
  var eventType = 'resize';

  this.removeEventListener(eventType, handler, object);

  var element = this,
      ///
  resizeEventListeners = findResizeEventListeners(element);

  if (resizeEventListeners.length === 0) {
    removeResizeObject(element);
  }
}

var resizeMixin = {
  onResize: onResize,
  offResize: offResize
};

module.exports = resizeMixin;

function addResizeObject(element) {
  var resizeObject = document.createElement('object'),
      domElement = element.getDOMElement(),
      style = 'display: block; \n                 position: absolute; \n                 top: 0; \n                 left: 0; \n                 height: 100%; \n                 width: 100%; \n                 overflow: hidden; \n                 pointer-events: none; \n                 z-index: -1;',
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

function defaultIntermediateResizeHandler(handler, event, targetElement) {
  var window = targetElement,
      ///
  width = window.getWidth(),
      height = window.getHeight();

  handler(width, height, event, targetElement);
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

},{}],39:[function(require,module,exports){
'use strict';

function onScroll(handler, object) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('scroll', handler, object, intermediateHandler);
}

function offScroll(handler, object) {
  this.off('scroll', handler, object);
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
      scrollLeft = targetElement.getScrollLeft();

  handler(scrollTop, scrollLeft, event, targetElement);
}

},{}],40:[function(require,module,exports){
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

    if (false) {} else if (isSubclassOf(firstArgument, Element)) {
      var Class = firstArgument; ///

      element = Class.fromProperties(properties);
    } else if (typeof firstArgument === 'string') {
      var string = firstArgument; ///

      element = Element.fromString(string, properties);
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

},{"./element":20,"./textElement":41}],41:[function(require,module,exports){
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
    key: 'addTo',
    value: function addTo(parentElement) {
      parentElement.add(this);
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

},{"./misc/bounds":31,"./misc/offset":32}],42:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var necessary = require('necessary');

var array = necessary.array,
    splice = array.splice;

var domUtilities = function () {
  function domUtilities() {
    _classCallCheck(this, domUtilities);
  }

  _createClass(domUtilities, null, [{
    key: 'domElementFromSelector',
    value: function domElementFromSelector(selector) {
      var domElement = typeof selector === 'string' ? document.querySelectorAll(selector)[0] : ///
      selector; ///

      return domElement;
    }
  }, {
    key: 'elementsFromDOMElements',
    value: function elementsFromDOMElements(domElements) {
      var domElementsWithElements = domUtilities.filterDOMNodes(domElements, function (domElement) {
        return domElement.__element__ !== undefined;
      }),
          elements = domElementsWithElements.map(function (domElement) {
        return domElement.__element__;
      });

      return elements;
    }
  }, {
    key: 'descendantDOMNodesFromDOMNode',
    value: function descendantDOMNodesFromDOMNode(domNode) {
      var descendantDOMNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var start = -1,
          deleteCount = 0,
          childDOMNodes = domNode.childNodes; ///

      splice(descendantDOMNodes, start, deleteCount, childDOMNodes);

      childDOMNodes.forEach(function (childDOMNode) {
        domUtilities.descendantDOMNodesFromDOMNode(childDOMNode, descendantDOMNodes);
      });

      return descendantDOMNodes;
    }
  }, {
    key: 'filterDOMNodesBySelector',
    value: function filterDOMNodesBySelector(domNodes, selector) {
      var filteredDOMNodes = domUtilities.filterDOMNodes(domNodes, function (domNode) {
        return domUtilities.domNodeMatchesSelector(domNode, selector);
      });

      return filteredDOMNodes;
    }
  }, {
    key: 'domNodeMatchesSelector',
    value: function domNodeMatchesSelector(domNode, selector) {
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
  }, {
    key: 'filterDOMNodes',
    value: function filterDOMNodes(domNodes, test) {
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
  }]);

  return domUtilities;
}();

module.exports = domUtilities;

},{"necessary":45}],43:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var objectUtilities = function () {
  function objectUtilities() {
    _classCallCheck(this, objectUtilities);
  }

  _createClass(objectUtilities, null, [{
    key: 'combine',
    value: function combine(targetObject) {
      var sourceObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var sourceKeys = Object.keys(sourceObject);

      sourceKeys.forEach(function (sourceKey) {
        var targetProperty = targetObject[sourceKey],
            sourceProperty = sourceObject[sourceKey];

        targetObject[sourceKey] = targetObject.hasOwnProperty(sourceKey) ? targetProperty + ' ' + sourceProperty : sourceProperty;
      });
    }
  }, {
    key: 'prune',
    value: function prune(targetObject, sourceKeys) {
      sourceKeys.forEach(function (sourceKey) {
        if (targetObject.hasOwnProperty(sourceKey)) {
          delete targetObject[sourceKey];
        }
      });
    }
  }]);

  return objectUtilities;
}();

module.exports = objectUtilities;

},{}],44:[function(require,module,exports){
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

    this.domElement = window; ///
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
    value: function onResize(handler, object) {
      var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateResizeHandler;

      var eventTypes = 'resize';

      this.on(eventTypes, handler, object, intermediateHandler);
    }
  }, {
    key: 'offResize',
    value: function offResize(handler, object) {
      var eventTypes = 'resize';

      this.off(eventTypes, handler, object);
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
      height = window.getHeight();

  handler(width, height, event, targetElement);
}

},{"./mixin/click":33,"./mixin/event":34,"./mixin/key":36,"./mixin/mouse":37}],45:[function(require,module,exports){
'use strict';

module.exports = {
  pathUtilities: require('./lib/utilities/path'),
  arrayUtilities: require('./lib/utilities/array'),
  fileSystemUtilities: require('./lib/utilities/fileSystem'),
  asynchronousUtilities: require('./lib/utilities/asynchronous')
};

},{"./lib/utilities/array":46,"./lib/utilities/asynchronous":47,"./lib/utilities/fileSystem":48,"./lib/utilities/path":49}],46:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  var start = array2.length,
      ///
  deleteCount = 0;

  splice(array1, start, deleteCount, array2);
}

function splice(array1, start, deleteCount) {
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
  backwardsForEach(array, function (element, index) {
    var passed = test(element, index);

    if (!passed) {
      var start = index,
          ///
      deleteCount = 1;

      array.splice(start, deleteCount);
    }
  });
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
  var found = array.some(function (element, index) {
    var passed = test(element, index);

    if (passed) {
      var start = index,
          ///
      deleteCount = 1;

      array.splice(start, deleteCount);

      return true;
    }
  });

  return found;
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

function separate(array, test, array1, array2) {
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

module.exports = {
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
  forwardsForEach: forwardsForEach,
  backwardsForEach: backwardsForEach
};

},{}],47:[function(require,module,exports){
'use strict';

function whilst(callback, done, context) {
  var index = -1;

  function next() {
    index++;

    var terminate = callback(next, done, context, index);

    if (terminate) {
      done();
    }
  }

  next();
}

function forEach(array, callback, done, context) {
  var arrayLength = array.length;

  var index = -1;

  function next() {
    index++;

    var terminate = index === arrayLength;

    if (terminate) {
      done();
    } else {
      var element = array[index];

      callback(element, next, done, context, index);
    }
  }

  next();
}

function sequence(callbacks, done, context) {
  var callbacksLength = callbacks.length;

  var index = -1;

  function next() {
    index++;

    var terminate = index === callbacksLength;

    if (terminate) {
      done();
    } else {
      var callback = callbacks[index];

      callback(next, done, context, index);
    }
  }

  next();
}

module.exports = {
  whilst: whilst,
  forEach: forEach,
  sequence: sequence
};

},{}],48:[function(require,module,exports){
'use strict';

var fs = require('fs');

function entryExists(absoluteFilePath) {
  return fs.existsSync(absoluteFilePath);
}

function fileExists(absoluteFilePath) {
  return fs.existsSync(absoluteFilePath);
}

function isEntryDirectory(absolutePath) {
  var stat = fs.statSync(absolutePath),
      entryDirectory = stat.isDirectory();

  return entryDirectory;
}

function isDirectoryEmpty(absoluteDirectoryPath) {
  var subEntryNames = readDirectory(absoluteDirectoryPath),
      subEntryNamesLength = subEntryNames.length,
      directoryEmpty = subEntryNamesLength === 0;

  return directoryEmpty;
}

function writeFile(absoluteFilePath, content) {
  fs.writeFileSync(absoluteFilePath, content);
}

function readFile(absoluteFilePath) {
  var encoding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'utf8';

  var options = {
    encoding: encoding
  },
      content = fs.readFileSync(absoluteFilePath, options);

  return content;
}

function readDirectory(absoluteDirectoryPath) {
  var subEntryNames = fs.readdirSync(absoluteDirectoryPath);

  return subEntryNames;
}

module.exports = {
  entryExists: entryExists,
  fileExists: fileExists,
  isEntryDirectory: isEntryDirectory,
  isDirectoryEmpty: isDirectoryEmpty,
  writeFile: writeFile,
  readFile: readFile,
  readDirectory: readDirectory
};

},{"fs":17}],49:[function(require,module,exports){
'use strict';

var array = require('./array');

var first = array.first,
    second = array.second,
    last = array.last;


function isPathRelativePath(path) {
  var position = path.search(/^\.{1,2}\//),
      pathRelativePath = position !== -1;

  return pathRelativePath;
}

function isPathAbsolutePath(path) {
  var pathRelativePath = isPathRelativePath(path),
      pathAbsolutePath = !pathRelativePath; ///

  return pathAbsolutePath;
}

function isPathTopmostDirectoryName(path) {
  var position = path.search(/^[^\/]+\/?$/),
      pathTopmostDirectoryName = position !== -1;

  return pathTopmostDirectoryName;
}

function isTopmostDirectoryNameContainedInPath(topmostDirectoryName, path) {
  topmostDirectoryName = topmostDirectoryName.replace(/\/$/, ''); ///

  var regExp = new RegExp('^' + topmostDirectoryName + '(?:\\/.+)?$'),
      position = path.search(regExp),
      topmostDirectoryNameContainedInFilePath = position !== -1;

  return topmostDirectoryNameContainedInFilePath;
}

function combinePaths(directoryPath, relativePath) {
  var absolutePath = null;

  var directoryPathSubEntryNames = directoryPath.split('/'),
      relativeFilePathSubEntryNames = relativePath.split('/');

  var firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames),
      lastDirectoryPathSubEntryName = void 0;

  if (firstRelativeFilePathSubEntryName === '.') {
    relativeFilePathSubEntryNames.shift();
  }

  firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
  lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);

  while (firstRelativeFilePathSubEntryName === '..' && lastDirectoryPathSubEntryName !== undefined) {
    relativeFilePathSubEntryNames.shift();
    directoryPathSubEntryNames.pop();

    firstRelativeFilePathSubEntryName = first(relativeFilePathSubEntryNames);
    lastDirectoryPathSubEntryName = last(directoryPathSubEntryNames);
  }

  if (lastDirectoryPathSubEntryName !== undefined) {
    var absoluteFilePathSubEntryNames = [].concat(directoryPathSubEntryNames).concat(relativeFilePathSubEntryNames);

    absolutePath = absoluteFilePathSubEntryNames.join('/');
  }

  return absolutePath;
}

function concatenatePaths(path1, path2) {
  path1 = path1.replace(/\/$/, ''); ///

  var combinedPath = path1 + '/' + path2;

  return combinedPath;
}

function bottommostNameFromPath(path) {
  var bottommostName = null;

  var matches = path.match(/^.+\/([^\/]+\/?)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    bottommostName = secondMatch; ///
  }

  return bottommostName;
}

function topmostDirectoryPathFromPath(path) {
  var matches = path.match(/^(.+)\/[^\/]+\/?$/),
      secondMatch = second(matches),
      directoryPath = secondMatch; ///

  return directoryPath;
}

function topmostDirectoryNameFromPath(path) {
  var topmostDirectoryName = null;

  var matches = path.match(/^([^\/]+)\/.+$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    topmostDirectoryName = secondMatch; ///
  }

  return topmostDirectoryName;
}

function pathWithoutBottommostNameFromPath(path) {
  var pathWithoutBottommostName = null;

  var matches = path.match(/(^.+)\/[^\/]+\/?$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutBottommostName = secondMatch; ///
  }

  return pathWithoutBottommostName;
}

function pathWithoutTopmostDirectoryNameFromPath(path) {
  var pathWithoutTopmostDirectoryName = null;

  var matches = path.match(/^[^\/]+\/(.+)$/);

  if (matches !== null) {
    var secondMatch = second(matches);

    pathWithoutTopmostDirectoryName = secondMatch;
  }

  return pathWithoutTopmostDirectoryName;
}

module.exports = {
  isPathRelativePath: isPathRelativePath,
  isPathAbsolutePath: isPathAbsolutePath,
  isPathTopmostDirectoryName: isPathTopmostDirectoryName,
  isTopmostDirectoryNameContainedInPath: isTopmostDirectoryNameContainedInPath,
  combinePaths: combinePaths,
  concatenatePaths: concatenatePaths,
  bottommostNameFromPath: bottommostNameFromPath,
  topmostDirectoryPathFromPath: topmostDirectoryPathFromPath,
  topmostDirectoryNameFromPath: topmostDirectoryNameFromPath,
  pathWithoutBottommostNameFromPath: pathWithoutBottommostNameFromPath,
  pathWithoutTopmostDirectoryNameFromPath: pathWithoutTopmostDirectoryNameFromPath
};

},{"./array":46}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImVzNi9kcm9wVGFyZ2V0LmpzIiwiZXM2L2V4cGxvcmVyLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJpZXMuanMiLCJlczYvZXhwbG9yZXIvZW50cnkuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvZHJhZ2dhYmxlLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lL3RvcG1vc3QuanMiLCJlczYvZXhwbG9yZXIvZW50cnkvZHJhZ2dhYmxlL2ZpbGVOYW1lLmpzIiwiZXM2L2V4cGxvcmVyL2VudHJ5L21hcmtlci5qcyIsImVzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZS5qcyIsImVzNi9leHBsb3Jlci9lbnRyeS9tYXJrZXIvZmlsZU5hbWUuanMiLCJlczYvZXhwbG9yZXIvbmFtZUJ1dHRvbi5qcyIsImVzNi9vcHRpb25zLmpzIiwiZXM2L3J1YmJpc2hCaW4uanMiLCJlczYvdXRpbGl0aWVzL25hbWUuanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9saWIvX2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2JvZHkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9idXR0b24uanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9jaGVja2JveC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2Rpdi5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9lbGVtZW50L2xpbmsuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zZWxlY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvZWxlbWVudC9zcGFuLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L2lucHV0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9pbnB1dEVsZW1lbnQvaW5wdXQuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvaW5wdXRFbGVtZW50L3RleHRhcmVhLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2MvYm91bmRzLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21pc2Mvb2Zmc2V0LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2NsaWNrLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2V2ZW50LmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL2pzeC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9taXhpbi9rZXkuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vbW91c2UuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvbWl4aW4vcmVzaXplLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L21peGluL3Njcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi9yZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi90ZXh0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9lYXN5L2VzNi91dGlsaXRpZXMvZG9tLmpzIiwibm9kZV9tb2R1bGVzL2Vhc3kvZXM2L3V0aWxpdGllcy9vYmplY3QuanMiLCJub2RlX21vZHVsZXMvZWFzeS9lczYvd2luZG93LmpzIiwibm9kZV9tb2R1bGVzL25lY2Vzc2FyeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9hc3luY2hyb25vdXMuanMiLCJub2RlX21vZHVsZXMvbmVjZXNzYXJ5L2VzNi91dGlsaXRpZXMvZmlsZVN5c3RlbS5qcyIsIm5vZGVfbW9kdWxlcy9uZWNlc3NhcnkvZXM2L3V0aWxpdGllcy9wYXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7Ozs7Ozs7OztBQUVBLElBQU0sT0FBTyxRQUFRLE1BQVIsQ0FBYjtBQUFBLElBQ00sWUFBWSxRQUFRLFdBQVIsQ0FEbEI7O0FBR0EsSUFBTSxVQUFVLFFBQVEsV0FBUixDQUFoQjs7QUFFTSxJQUFFLE9BQUYsR0FBYyxJQUFkLENBQUUsT0FBRjtBQUFBLElBQ0UsY0FERixHQUNxQixTQURyQixDQUNFLGNBREY7QUFBQSxJQUVFLEtBRkYsR0FFa0IsY0FGbEIsQ0FFRSxLQUZGO0FBQUEsSUFFUyxJQUZULEdBRWtCLGNBRmxCLENBRVMsSUFGVDtBQUFBLElBR0UsK0JBSEYsR0FHc0MsT0FIdEMsQ0FHRSwrQkFIRjs7SUFLQSxVOzs7QUFDSixzQkFBWSxRQUFaLEVBQTBFO0FBQUEsUUFBcEQsV0FBb0QsdUVBQXRDLFVBQVMsUUFBVCxFQUFtQixJQUFuQixFQUF5QjtBQUFFO0FBQVMsS0FBRTs7QUFBQTs7QUFBQSx3SEFDbEUsUUFEa0U7O0FBR3hFLFVBQUssV0FBTCxHQUFtQixXQUFuQjs7QUFFQSxVQUFLLGVBQUw7QUFMd0U7QUFNekU7Ozs7Z0RBRTJCLDZCLEVBQStCO0FBQ3pELFVBQU0sU0FBUyxLQUFLLFNBQUwsRUFBZjtBQUFBLFVBQ00sa0NBQWtDLE9BQU8sY0FBUCxDQUFzQiw2QkFBdEIsQ0FEeEM7QUFBQSxVQUVNLDRCQUE0QiwrQkFGbEM7O0FBSUEsYUFBTyx5QkFBUDtBQUNEOzs7NENBRXVCLGMsRUFBZ0I7QUFDdEMsVUFBTSxjQUFjLEtBQUssY0FBTCxFQUFwQjtBQUFBLFVBQ00sdUJBQXVCLFlBQVksTUFBWixDQUFtQixVQUFTLG9CQUFULEVBQStCLFVBQS9CLEVBQTJDO0FBQ25GLFlBQUkseUJB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QyxxQ0FKeEI7QUFLZixnQkFBYyxZQUxDO0FBTWYsb0JBQWtCLGdCQU5IO0FBT2YsMEJBQXdCLHNCQVBUO0FBUWYsZ0NBQThCLDRCQVJmO0FBU2YsZ0NBQThCLDRCQVRmO0FBVWYscUNBQW1DLGlDQVZwQjtBQVdmLDJDQUF5QztBQVgxQixDQUFqQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBvcHRpb25zOiByZXF1aXJlKCcuL2xpYi9vcHRpb25zJyksXG4gIEV4cGxvcmVyOiByZXF1aXJlKCcuL2xpYi9leHBsb3JlcicpLFxuICBSdWJiaXNoQmluOiByZXF1aXJlKCcuL2xpYi9ydWJiaXNoQmluJylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5JyksXG4gICAgICBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4vb3B0aW9ucycpO1xuXG5jb25zdCB7IEVsZW1lbnQgfSA9IGVhc3ksXG4gICAgICB7IGFycmF5VXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IGZpcnN0LCBsYXN0IH0gPSBhcnJheVV0aWxpdGllcyxcbiAgICAgIHsgUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucztcblxuY2xhc3MgRHJvcFRhcmdldCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgbW92ZUhhbmRsZXIgPSBmdW5jdGlvbihwYXRoTWFwcywgZG9uZSkgeyBkb25lKCk7IH0pIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gICAgXG4gICAgdGhpcy5tb3ZlSGFuZGxlciA9IG1vdmVIYW5kbGVyO1xuICAgIFxuICAgIHRoaXMuc2V0SW5pdGlhbFN0YXRlKCk7XG4gIH1cblxuICBpc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIGJvdW5kc092ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBib3VuZHNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuXG4gICAgcmV0dXJuIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSkge1xuICAgIGNvbnN0IGRyb3BUYXJnZXRzID0gdGhpcy5nZXREcm9wVGFyZ2V0cygpLFxuICAgICAgICAgIGRyb3BUYXJnZXRUb0JlTWFya2VkID0gZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKGRyb3BUYXJnZXRUb0JlTWFya2VkLCBkcm9wVGFyZ2V0KSB7XG4gICAgICAgICAgICBpZiAoZHJvcFRhcmdldFRvQmVNYXJrZWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKGRyb3BUYXJnZXQuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSkgeyAvLy9cbiAgICAgICAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZCA9IGRyb3BUYXJnZXQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIGRyb3BUYXJnZXRUb0JlTWFya2VkO1xuICB9XG5cbiAgZ2V0TWFya2VkRHJvcFRhcmdldCgpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gZHJvcFRhcmdldHMucmVkdWNlKGZ1bmN0aW9uKG1hcmtlZERyb3BUYXJnZXQsIGRyb3BUYXJnZXQpIHtcbiAgICAgICAgICAgIGlmIChtYXJrZWREcm9wVGFyZ2V0ID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGRyb3BUYXJnZXRNYXJrZWQgPSBkcm9wVGFyZ2V0LmlzTWFya2VkKCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBpZiAoZHJvcFRhcmdldE1hcmtlZCkge1xuICAgICAgICAgICAgICAgIG1hcmtlZERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICBcbiAgICAgICAgICAgIHJldHVybiBtYXJrZWREcm9wVGFyZ2V0O1xuICAgICAgICAgIH0sIG51bGwpO1xuXG4gICAgcmV0dXJuIG1hcmtlZERyb3BUYXJnZXQ7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5KCkge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChtYXJrZWQpIHtcbiAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgfVxuICB9XG5cbiAgbW92ZURyYWdnYWJsZUVudHJpZXMoZHJhZ2dhYmxlRW50cmllcywgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgZG9uZSkge1xuICAgIGNvbnN0IHBhdGhNYXBzID0gdGhpcy5wYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpO1xuXG4gICAgdGhpcy5tb3ZlSGFuZGxlcihwYXRoTWFwcywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBsYXN0RHJhZ2dhYmxlRW50cnkgPSBsYXN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeSA9IGZpcnN0KGRyYWdnYWJsZUVudHJpZXMpLFxuICAgICAgICAgICAgZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyID0gZmlyc3REcmFnZ2FibGVFbnRyeUV4cGxvcmVyLCAvLy9cbiAgICAgICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTsgLy8vXG5cbiAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICBkcmFnZ2FibGVFbnRyaWVzRXhwbG9yZXIudW5zZXRPcHRpb24oUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyk7XG4gICAgICB9XG5cbiAgICAgIGRyYWdnYWJsZUVudHJpZXMuZm9yRWFjaChmdW5jdGlvbihkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBpZiAoZHJhZ2dhYmxlRW50cnkgPT09IGxhc3REcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgIGlmIChyZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgICAgICAgZHJhZ2dhYmxlRW50cmllc0V4cGxvcmVyLnNldE9wdGlvbihSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCk7XG5cbiAgICAgICAgaWYgKGRyYWdnYWJsZUVudHJ5UGF0aCAhPT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IHBhdGhNYXAgPSBwYXRoTWFwcy5maW5kKGZ1bmN0aW9uKHBhdGhNYXApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHsgc291cmNlUGF0aCB9ID0gcGF0aE1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kID0gKHNvdXJjZVBhdGggPT09IGRyYWdnYWJsZUVudHJ5UGF0aCk7XG4gIFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHsgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCwgY2FsbGJhY2sgfSA9IHBhdGhNYXA7XG5cbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5LCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZHJhZ2dhYmxlRW50cmllcztcbiAgICAgIH0uYmluZCh0aGlzKSwgW10pO1xuXG4gICAgICBkb25lKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG1vdmVEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgIC8vL1xuICAgICAgICAgICAgc291cmNlRGlyZWN0b3J5UGF0aCA9IHNvdXJjZVBhdGgsIC8vL1xuICAgICAgICAgICAgdGFyZ2V0RGlyZWN0b3J5UGF0aCA9IHRhcmdldFBhdGg7IC8vL1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IHRoaXMubW92ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBkcmFnZ2FibGVFbnRyeSwgLy8vXG4gICAgICAgICAgICBzb3VyY2VGaWxlUGF0aCA9IHNvdXJjZVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldEZpbGVQYXRoID0gdGFyZ2V0UGF0aDtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSB0aGlzLm1vdmVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lRHJhZ2dhYmxlRW50cnksIHNvdXJjZUZpbGVQYXRoLCB0YXJnZXRGaWxlUGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBhZGREcm9wVGFyZ2V0KGRyb3BUYXJnZXQpIHtcbiAgICBjb25zdCBkcm9wVGFyZ2V0cyA9IHRoaXMuZ2V0RHJvcFRhcmdldHMoKTtcbiAgICBcbiAgICBkcm9wVGFyZ2V0cy5wdXNoKGRyb3BUYXJnZXQpO1xuICB9XG5cbiAgcmVtb3ZlRHJvcFRhcmdldChkcm9wVGFyZ2V0KSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSB0aGlzLmdldERyb3BUYXJnZXRzKCk7XG5cbiAgICBjb25zdCBpbmRleCA9IGRyb3BUYXJnZXRzLmluZGV4T2YoZHJvcFRhcmdldCksXG4gICAgICAgICAgZm91bmQgPSAoaW5kZXggIT09IC0xKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpbmRleCwgIC8vL1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuICAgICAgXG4gICAgICBkcm9wVGFyZ2V0cy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcbiAgICB9XG4gIH1cblxuICBnZXREcm9wVGFyZ2V0cygpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCdkcm9wVGFyZ2V0cycpOyB9XG4gIFxuICBzZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgY29uc3QgZHJvcFRhcmdldHMgPSBbXTtcbiAgICBcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyb3BUYXJnZXRzOiBkcm9wVGFyZ2V0c1xuICAgIH0pO1xuICB9ICBcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEcm9wVGFyZ2V0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IG9wdGlvbnMgPSByZXF1aXJlKCcuL29wdGlvbnMnKSxcbiAgICAgIERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHJlcXVpcmUoJy4vZXhwbG9yZXIvZW50cnkvbWFya2VyL2RpcmVjdG9yeU5hbWUnKSxcbiAgICAgIFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2V4cGxvcmVyL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lL3RvcG1vc3QnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzLCBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBFbGVtZW50LCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgZmlyc3QsIHNlY29uZCB9ID0gYXJyYXlVdGlsaXRpZXMsXG4gICAgICB7IE5PX0RSQUdHSU5HX1dJVEhJTiB9ID0gb3B0aW9ucyxcbiAgICAgIHsgaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUsIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWVGcm9tUGF0aCB9ID0gcGF0aFV0aWxpdGllcztcblxuY2xhc3MgRXhwbG9yZXIgZXh0ZW5kcyBEcm9wVGFyZ2V0IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG1vdmVIYW5kbGVyLCBvcGVuSGFuZGxlciA9IGZ1bmN0aW9uKHNvdXJjZVBhdGgpIHt9LCBvcHRpb25zID0ge30pIHtcbiAgICBzdXBlcihzZWxlY3RvciwgbW92ZUhhbmRsZXIpO1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlciA9IG9wZW5IYW5kbGVyO1xuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIHNldE9wdGlvbihvcHRpb24pIHtcbiAgICB0aGlzLm9wdGlvbnNbb3B0aW9uXSA9IHRydWU7XG4gIH1cblxuICB1bnNldE9wdGlvbihvcHRpb24pIHtcbiAgICBkZWxldGUodGhpcy5vcHRpb25zW29wdGlvbl0pO1xuICB9XG5cbiAgaXNPcHRpb25QcmVzZW50KG9wdGlvbikge1xuICAgIGNvbnN0IG9wdGlvblByZXNlbnQgPSAodGhpcy5vcHRpb25zW29wdGlvbl0gPT09IHRydWUpO1xuXG4gICAgcmV0dXJuIG9wdGlvblByZXNlbnQ7XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBsZXQgbWFya2VkO1xuXG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCA9IHRoaXMuaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZCkge1xuICAgICAgbWFya2VkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IHRoaXMuZmluZFRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkoKTtcblxuICAgICAgbWFya2VkID0gKHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgIT09IG51bGwpO1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc1RvQmVNYXJrZWQoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gdG9CZU1hcmtlZDtcbiAgfVxuICBcbiAgZ2V0RmlsZVBhdGhzKCkge1xuICAgIGNvbnN0IGZpbGVQYXRocyA9IHRoaXMucmV0cmlldmVGaWxlUGF0aHMoKTtcbiAgICBcbiAgICByZXR1cm4gZmlsZVBhdGhzO1xuICB9XG5cbiAgZ2V0RGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aHMgPSB0aGlzLnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKTtcblxuICAgIHJldHVybiBkaXJlY3RvcnlQYXRocztcbiAgfVxuICBcbiAgYWRkTWFya2VyRW50cnkoZHJhZ2dhYmxlRW50cnksIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRpcmVjdG9yeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgbWFya2VyRW50cnlQYXRoID0gYCR7ZGlyZWN0b3J5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeVBhdGh9LyR7ZHJhZ2dhYmxlRW50cnlOYW1lfWA7XG5cbiAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeUluUGxhY2UoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lID0gaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUoZHJhZ2dhYmxlRW50cnlQYXRoKTtcblxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGhUb3Btb3N0RGlyZWN0b3J5TmFtZSkge1xuICAgICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlclBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7XG5cbiAgICAgIHRoaXMuYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlckVudHJ5KHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VyRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgICB0aGlzLmFkZFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeShtYXJrZXJFbnRyeVBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgYWRkVG9wbW9zdERpcmVjdG9yeU1hcmtlckVudHJ5KHRvcG1vc3REaXJlY3RvcnlNYXJrZXJQYXRoKSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU1hcmtlck5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyUGF0aCwgIC8vL1xuICAgICAgICAgIG5hbWUgPSB0b3Btb3N0RGlyZWN0b3J5TWFya2VyTmFtZSwgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuXG4gICAgdGhpcy5hcHBlbmQodG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSk7XG4gIH1cblxuICBmaW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpIHtcbiAgICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoJ2xpLmRpcmVjdG9yeU5hbWUgbWFya2VyIGVudHJ5JyksXG4gICAgICAgICBjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHNMZW5ndGggPSBjaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudHMubGVuZ3RoO1xuXG4gICAgaWYgKGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50c0xlbmd0aCA9PT0gMSkge1xuICAgICAgY29uc3QgZmlyc3RDaGlsZERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeUxpc3RJdGVtRWxlbWVudCA9IGZpcnN0KGNoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50cyk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnkgPSBmaXJzdENoaWxkRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5TGlzdEl0ZW1FbGVtZW50OyAgLy8vXG5cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRvcG1vc3REaXJlY3RvcnlOYW1lTWFya2VyRW50cnk7XG4gIH1cblxuICByZW1vdmVNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gdGhpcy5pc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkKSB7XG4gICAgICB0aGlzLnJlbW92ZVRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZXJFbnRyeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gdGhpcy5maW5kVG9wbW9zdERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBtYXJrZWQgPSB0aGlzLmlzTWFya2VkKCksXG4gICAgICAgICAgc3RhcnRlZERyYWdnaW5nID0gIW1hcmtlZDtcblxuICAgIGlmIChzdGFydGVkRHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhcnRlZERyYWdnaW5nO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBkb25lKSB7XG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgIG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKSxcbiAgICAgICAgICBtYXJrZWREcm9wVGFyZ2V0ID0gbWFya2VkID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpLFxuICAgICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG1hcmtlZERyb3BUYXJnZXQucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoKSxcbiAgICAgICAgICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lOyAvLy9cblxuICAgIGxldCB0YXJnZXRQYXRoID0gbnVsbCxcbiAgICAgICAgZHVwbGljYXRlID0gZmFsc2U7XG5cbiAgICBpZiAobWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkcmFnZ2FibGVFbnRyeU5hbWUgPSBkcmFnZ2FibGVFbnRyeS5nZXROYW1lKCksXG4gICAgICAgICAgICBuYW1lID0gZHJhZ2dhYmxlRW50cnlOYW1lLCAgLy8vXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyeVByZXNlbnQgPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaXNEcmFnZ2FibGVFbnRyeVByZXNlbnQobmFtZSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgZHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpO1xuXG4gICAgICAgIHRhcmdldFBhdGggPSBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoOyAvLy9cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB1bm1vdmVkID0gKHNvdXJjZVBhdGggPT09IHRhcmdldFBhdGgpO1xuXG4gICAgaWYgKGR1cGxpY2F0ZSB8fCB1bm1vdmVkKSB7XG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgIGRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCksXG4gICAgICAgICAgICBkcmFnZ2FibGVFbnRyaWVzID0gZHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzOyAvLy9cblxuICAgICAgZHJhZ2dhYmxlRW50cmllcy5yZXZlcnNlKCk7XG4gICAgICBkcmFnZ2FibGVFbnRyaWVzLnB1c2goZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0Lm1vdmVEcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgsIGZ1bmN0aW9uKCkge1xuICAgICAgICBtYXJrZWREcm9wVGFyZ2V0LnJlbW92ZU1hcmtlckVudHJ5KCk7XG5cbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyID0gdGhpcykge1xuICAgIGNvbnN0IG1hcmtlZCA9IHRoaXMuaXNNYXJrZWQoKTtcbiAgICBcbiAgICBpZiAobWFya2VkKSB7XG4gICAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgICAgIFxuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKHRvQmVNYXJrZWQpIHtcbiAgICAgICAgY29uc3Qgd2l0aGluID0gKGV4cGxvcmVyID09PSB0aGlzKSwgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdXaXRoaW5PcHRpb25QcmVzZW50ID0gdGhpcy5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkdfV0lUSElOKSxcbiAgICAgICAgICAgICAgbm9EcmFnZ2luZyA9IHdpdGhpbiAmJiBub0RyYWdnaW5nV2l0aGluT3B0aW9uUHJlc2VudDtcblxuICAgICAgICBpZiAoIW5vRHJhZ2dpbmcpIHtcbiAgICAgICAgICBjb25zdCBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlTWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCk7XG5cbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICAgICAgICB0aGlzLmFkZE1hcmtlckVudHJ5KGRyYWdnYWJsZUVudHJ5LCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFya2VkRHJvcFRhcmdldCA9IHRoaXMuZ2V0TWFya2VkRHJvcFRhcmdldCgpO1xuXG4gICAgICBtYXJrZWREcm9wVGFyZ2V0LmRyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBleHBsb3Jlcik7XG4gICAgfVxuICB9XG5cbiAgZXNjYXBlRHJhZ2dpbmcoKSB7XG4gICAgdGhpcy5yZW1vdmVNYXJrZXJFbnRyeUdsb2JhbGx5KCk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIFxuICAgIGNvbnN0IGV4cGxvcmVyID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpO1xuXG4gICAgbGV0IGZpbGVQYXRoO1xuXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBzb3VyY2VGaWxlUGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXRGaWxlUGF0aCA9PT0gbnVsbCkge1xuICAgICAgZmlsZVBhdGggPSBzb3VyY2VGaWxlUGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVGaWxlUGF0aChmaWxlUGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlUGF0aCA9IHRhcmdldEZpbGVQYXRoOyAvLy9cblxuICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuYWRkRmlsZVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBkcmFnZ2FibGVFbnRyeSA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG4gIFxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGxldCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZXhwbG9yZXIgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKTtcbiAgICBcbiAgICBsZXQgZGlyZWN0b3J5UGF0aDtcbiAgICBcbiAgICBpZiAodGFyZ2V0RGlyZWN0b3J5UGF0aCA9PT0gc291cmNlRGlyZWN0b3J5UGF0aCkge1xuXG4gICAgfSBlbHNlIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3RvcnlQYXRoID0gc291cmNlRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICBleHBsb3Jlci5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRoID0gdGFyZ2V0RGlyZWN0b3J5UGF0aDsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbGxhcHNlZCA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5pc0NvbGxhcHNlZCgpO1xuXG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmFkZERpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCwgY29sbGFwc2VkKTtcblxuICAgICAgZHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBvcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSksXG4gICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgdGhpcy5vcGVuSGFuZGxlcihmaWxlUGF0aCk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG5cbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgY2hpbGRFbGVtZW50cyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyB0b3Btb3N0RGlyZWN0b3J5TmFtZSwgdG9wbW9zdERpcmVjdG9yeUNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBuYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUsIC8vL1xuICAgICAgICAgIGNvbGxhcHNlZCA9IHRvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQsIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gdGhpcywgIC8vL1xuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnkgPSA8VG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IGNvbGxhcHNlZD17Y29sbGFwc2VkfSAvPjtcblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5O1xuICB9XG5cbiAgaW5pdGlhbGlzZSgpIHtcbiAgICB0aGlzLmFzc2lnbkNvbnRleHQoKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbk1vdmUsIG9uT3Blbiwgb3B0aW9ucyB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtb3ZlSGFuZGxlciA9IG9uTW92ZSwgLy8vXG4gICAgICAgICAgb3BlbkhhbmRsZXIgPSBvbk9wZW4sIC8vL1xuICAgICAgICAgIGV4cGxvcmVyID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhFeHBsb3JlciwgcHJvcGVydGllcywgbW92ZUhhbmRsZXIsIG9wZW5IYW5kbGVyLCBvcHRpb25zKTtcblxuICAgIGV4cGxvcmVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gZXhwbG9yZXI7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFeHBsb3Jlciwge1xuICB0YWdOYW1lOiAndWwnLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2V4cGxvcmVyJ1xuICB9LFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICd0b3Btb3N0RGlyZWN0b3J5TmFtZScsXG4gICAgJ3RvcG1vc3REaXJlY3RvcnlDb2xsYXBzZWQnLFxuICAgICdvbk9wZW4nLFxuICAgICdvbk1vdmUnLFxuICAgICdvcHRpb25zJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeHBsb3JlcjtcblxuZnVuY3Rpb24gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCkge1xuICBjb25zdCBkcmFnZ2FibGVFbnRyeVBhdGggPSBkcmFnZ2FibGVFbnRyeS5nZXRQYXRoKCksXG4gICAgICAgIGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gZHJhZ2dhYmxlRW50cnkuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSxcbiAgICAgICAgZGlyZWN0b3J5ID0gZHJhZ2dhYmxlRW50cnlEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7ICAvLy9cblxuICB0YXJnZXRQYXRoID0gKHNvdXJjZVBhdGggPT09IG51bGwpID9cbiAgICAgICAgICAgICAgICAgIHByZXBlbmRUYXJnZXRQYXRoVG9EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCB0YXJnZXRQYXRoKSA6ICAvLy9cbiAgICAgICAgICAgICAgICAgICAgcmVwbGFjZVNvdXJjZVBhdGhXaXRoVGFyZ2V0UGF0aEluRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7IC8vL1xuXG4gIHNvdXJjZVBhdGggPSBkcmFnZ2FibGVFbnRyeVBhdGg7ICAvLy9cblxuICBjb25zdCBwYXRoTWFwID0ge1xuICAgIHNvdXJjZVBhdGg6IHNvdXJjZVBhdGgsXG4gICAgdGFyZ2V0UGF0aDogdGFyZ2V0UGF0aCxcbiAgICBkaXJlY3Rvcnk6IGRpcmVjdG9yeVxuICB9O1xuXG4gIHJldHVybiBwYXRoTWFwO1xufVxuXG5mdW5jdGlvbiBwcmVwZW5kVGFyZ2V0UGF0aFRvRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5UGF0aCwgIHRhcmdldFBhdGgpIHtcbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7dGFyZ2V0UGF0aH0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuXG5mdW5jdGlvbiByZXBsYWNlU291cmNlUGF0aFdpdGhUYXJnZXRQYXRoSW5EcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnlQYXRoLCBzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKSB7XG4gIHNvdXJjZVBhdGggPSBzb3VyY2VQYXRoLnJlcGxhY2UoL1xcKC9nLCAnXFxcXCgnKS5yZXBsYWNlKC9cXCkvZywgJ1xcXFwpJyk7ICAvLy9cblxuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeJHtzb3VyY2VQYXRofSguKiQpYCksXG4gICAgICAgIG1hdGNoZXMgPSBkcmFnZ2FibGVFbnRyeVBhdGgubWF0Y2gocmVnRXhwKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgZHJhZ2dhYmxlRW50cnlQYXRoID0gdGFyZ2V0UGF0aCArIHNlY29uZE1hdGNoOyAvLy9cblxuICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCBvcHRpb25zID0gcmVxdWlyZSgnLi4vb3B0aW9ucycpLFxuICAgICAgRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5JyksXG4gICAgICBGaWxlTmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZmlsZU5hbWUnKSxcbiAgICAgIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuL2VudHJ5L2RyYWdnYWJsZS9maWxlTmFtZScpLFxuICAgICAgRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5ID0gcmVxdWlyZSgnLi9lbnRyeS9tYXJrZXIvZGlyZWN0b3J5TmFtZScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5LFxuICAgICAgeyB0eXBlcyB9ID0gRW50cnksXG4gICAgICB7IFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVMgfSA9IG9wdGlvbnMsXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBGSUxFX05BTUVfTUFSS0VSX1RZUEUsIERJUkVDVE9SWV9OQU1FX01BUktFUl9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRW50cmllcyBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgdGhpcy5EaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIGFkZEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbmFtZSA9IGZpbGVOYW1lLFxuICAgICAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSA8RmlsZU5hbWVEcmFnZ2FibGVFbnRyeSBuYW1lPXtuYW1lfSBleHBsb3Jlcj17ZXhwbG9yZXJ9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTsgLy8vXG5cbiAgICB0aGlzLmFkZEVudHJ5KGVudHJ5KTtcbiAgICBcbiAgICByZXR1cm4gZmlsZU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGFkZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKSB7XG4gICAgY29uc3QgbmFtZSA9IGRpcmVjdG9yeU5hbWUsXG4gICAgICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gPHRoaXMuRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IG5hbWU9e25hbWV9IGV4cGxvcmVyPXtleHBsb3Jlcn0gY29sbGFwc2VkPXtjb2xsYXBzZWR9IC8+LFxuICAgICAgICAgIGVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG4gICAgXG4gICAgdGhpcy5hZGRFbnRyeShlbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJlbW92ZUZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZXhwbG9yZXIgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3Rvcmllc09wdGlvblByZXNlbnQgPSBleHBsb3Jlci5pc09wdGlvblByZXNlbnQoUkVNT1ZFX0VNUFRZX1BBUkVOVF9ESVJFQ1RPUklFUyksXG4gICAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAvLy9cblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlKCk7XG4gICAgXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzID0gZmFsc2U7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUpLFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUVtcHR5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzRW1wdHkoKTtcbiAgICBcbiAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5RW1wdHkpIHtcbiAgICAgIGNvbnN0IGV4cGxvcmVyID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldEV4cGxvcmVyKCksXG4gICAgICAgICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCA9IGV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcyA9IHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3JpZXNPcHRpb25QcmVzZW50OyAgLy8vXG5cbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcmllcztcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IHRoaXMuZmluZERyYWdnYWJsZUVudHJ5KG5hbWUpLFxuICAgICAgICAgIGRyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChkcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpIHtcbiAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5maW5kRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSksXG4gICAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCk7IC8vL1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50O1xuICB9XG5cbiAgaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksICAgIFxuICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudDtcbiAgfVxuXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGxldCBtYXJrZXJFbnRyeTtcbiAgICBcbiAgICBjb25zdCBuYW1lID0gbWFya2VyTmFtZTsgIC8vL1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEUgOlxuICAgICAgICBtYXJrZXJFbnRyeSA9IDxGaWxlTmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFIDpcbiAgICAgICAgbWFya2VyRW50cnkgPSA8RGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5IG5hbWU9e25hbWV9IC8+O1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBlbnRyeSA9IG1hcmtlckVudHJ5OyAvLy9cblxuICAgIHRoaXMuYWRkRW50cnkoZW50cnkpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VyRW50cnkgPSB0aGlzLmZpbmRNYXJrZXJFbnRyeSgpO1xuXG4gICAgbWFya2VyRW50cnkucmVtb3ZlKCk7XG4gIH1cbiAgXG4gIGlzTWFya2VkKCkge1xuICAgIGNvbnN0IG1hcmtlckVudHJ5ID0gdGhpcy5maW5kTWFya2VyRW50cnkoKSxcbiAgICAgICAgICBtYXJrZWQgPSAobWFya2VyRW50cnkhPT0gbnVsbCk7XG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNFbXB0eSgpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCksXG4gICAgICAgICAgZW50cmllc0xlbmd0aCA9IGVudHJpZXMubGVuZ3RoLFxuICAgICAgICAgIGVtcHR5ID0gKGVudHJpZXNMZW5ndGggPT09IDApO1xuXG4gICAgcmV0dXJuIGVtcHR5O1xuICB9XG4gIFxuICBhZGRFbnRyeShlbnRyeSkge1xuICAgIGNvbnN0IG5leHRFbnRyeSA9IGVudHJ5LFxuICAgICAgICAgIHByZXZpb3VzRW50cnkgPSB0aGlzLmZpbmRFbnRyeShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgbmV4dEVudHJ5QmVmb3JlRW50cnkgPSBuZXh0RW50cnkuaXNCZWZvcmUoZW50cnkpLFxuICAgICAgICAgICAgICAgICAgZm91bmQgPSBuZXh0RW50cnlCZWZvcmVFbnRyeTsgLy8vXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgICB9KTtcblxuICAgIGlmIChwcmV2aW91c0VudHJ5ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmFwcGVuZChuZXh0RW50cnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXh0RW50cnkuaW5zZXJ0QmVmb3JlKHByZXZpb3VzRW50cnkpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRNYXJrZXJFbnRyeSgpIHtcbiAgICBjb25zdCBtYXJrZXJFbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZm91bmQgPSB0cnVlOyAvLy9cbiAgXG4gICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgfSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSk7XG5cbiAgICByZXR1cm4gbWFya2VyRW50cnk7XG4gIH1cblxuICBmaW5kRHJhZ2dhYmxlRW50cnkobmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhuYW1lLCBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIGZpbmRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lKSB7IHJldHVybiB0aGlzLmZpbmRFbnRyeUJ5TmFtZUFuZFR5cGVzKGZpbGVOYW1lLCBGSUxFX05BTUVfVFlQRSkgfVxuXG4gIGZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSkgeyByZXR1cm4gdGhpcy5maW5kRW50cnlCeU5hbWVBbmRUeXBlcyhkaXJlY3RvcnlOYW1lLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICB0aGlzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKTtcblxuICAgICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbiAgXG4gIHJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgbGV0IGRyYWdnYWJsZUVudHJ5UGF0aCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zb21lRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGlmIChlbnRyeSA9PT0gZHJhZ2dhYmxlRW50cnkpIHsgIC8vL1xuICAgICAgICBjb25zdCBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG4gICAgICAgIFxuICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBlbnRyeU5hbWU7ICAvLy9cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggPT09IG51bGwpIHtcbiAgICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5RHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIGlmIChkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBkaXJlY3RvcnlEcmFnZ2FibGVFbnRyeVBhdGg7IC8vL1xuICAgICAgICAgIFxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5UGF0aDtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHRoaXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRklMRV9OQU1FX1RZUEUpIH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgRElSRUNUT1JZX05BTUVfVFlQRSkgfVxuXG4gIHNvbWVGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHJldHVybiB0aGlzLnNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIEZJTEVfTkFNRV9UWVBFKSB9XG5cbiAgc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjaykgeyByZXR1cm4gdGhpcy5zb21lRW50cnlCeVR5cGVzKGNhbGxiYWNrLCBESVJFQ1RPUllfTkFNRV9UWVBFKSB9XG5cbiAgZm9yRWFjaEVudHJ5QnlUeXBlcyhjYWxsYmFjaywgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5VHlwZSA9IGVudHJ5LmdldFR5cGUoKSxcbiAgICAgICAgICAgIHR5cGVzSW5jbHVkZXNFbnRyeVR5cGUgPSB0eXBlcy5pbmNsdWRlcyhlbnRyeVR5cGUpO1xuXG4gICAgICBpZiAodHlwZXNJbmNsdWRlc0VudHJ5VHlwZSkge1xuICAgICAgICBjYWxsYmFjayhlbnRyeSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmb3JFYWNoRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICBlbnRyaWVzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNhbGxiYWNrKGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvbWVFbnRyeUJ5VHlwZXMoY2FsbGJhY2ssIC4uLnR5cGVzKSB7XG4gICAgY29uc3QgZW50cmllcyA9IHRoaXMuZ2V0RW50cmllcygpO1xuXG4gICAgcmV0dXJuIGVudHJpZXMuc29tZShmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNhbGxiYWNrKGVudHJ5KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb21lRW50cnkoY2FsbGJhY2spIHtcbiAgICBjb25zdCBlbnRyaWVzID0gdGhpcy5nZXRFbnRyaWVzKCk7XG5cbiAgICByZXR1cm4gZW50cmllcy5zb21lKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICByZXR1cm4gY2FsbGJhY2soZW50cnkpO1xuICAgIH0pO1xuICB9XG5cbiAgZmluZEVudHJ5QnlOYW1lQW5kVHlwZXMobmFtZSwgLi4udHlwZXMpIHtcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMuZmluZEVudHJ5QnlUeXBlcyhmdW5jdGlvbihlbnRyeSkge1xuICAgICAgY29uc3QgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgZm91bmQgPSAoZW50cnlOYW1lID09PSBuYW1lKTtcbiAgICAgIFxuICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH0sIC4uLnR5cGVzKTtcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeVR5cGVzKGNhbGxiYWNrLCAuLi50eXBlcykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpLFxuICAgICAgICAgICAgICAgICAgdHlwZXNJbmNsdWRlc0VudHJ5VHlwZSA9IHR5cGVzLmluY2x1ZGVzKGVudHJ5VHlwZSk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlc0luY2x1ZGVzRW50cnlUeXBlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvdW5kID0gY2FsbGJhY2soZW50cnkpO1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pIHx8IG51bGw7IC8vLztcbiAgICBcbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBmaW5kRW50cnlCeU5hbWUobmFtZSkge1xuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5maW5kRW50cnkoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgIGNvbnN0IGVudHJ5TmFtZSA9IGVudHJ5LmdldE5hbWUoKSxcbiAgICAgICAgICAgIGZvdW5kID0gKGVudHJ5TmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBlbnRyeTtcbiAgfVxuXG4gIGZpbmRFbnRyeShjYWxsYmFjaykge1xuICAgIGNvbnN0IGVudHJpZXMgPSB0aGlzLmdldEVudHJpZXMoKSxcbiAgICAgICAgICBlbnRyeSA9IGVudHJpZXMuZmluZChjYWxsYmFjaykgfHwgbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZW50cnk7XG4gIH1cblxuICBnZXRFbnRyaWVzKCkge1xuICAgIGNvbnN0IGNoaWxkRW50cnlMaXN0SXRlbUVsZW1lbnRzID0gdGhpcy5nZXRDaGlsZEVsZW1lbnRzKCdsaS5lbnRyeScpLFxuICAgICAgICAgIGVudHJpZXMgPSBjaGlsZEVudHJ5TGlzdEl0ZW1FbGVtZW50czsgIC8vL1xuXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGVudHJpZXMgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEVudHJpZXMsIHByb3BlcnRpZXMsIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSk7XG4gICAgXG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihFbnRyaWVzLCB7XG4gIHRhZ05hbWU6ICd1bCcsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cmllcydcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5J1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbnRyaWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpO1xuXG5jb25zdCB7IEVsZW1lbnQsIFJlYWN0IH0gPSBlYXN5O1xuXG5jbGFzcyBFbnRyeSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSkge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIHJldHVybiB0aGlzLnR5cGU7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKEVudHJ5LCB7XG4gIHRhZ05hbWU6ICdsaScsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZW50cnknXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ25hbWUnXG4gIF0sXG4gIHR5cGVzOiB7XG4gICAgRklMRV9OQU1FX1RZUEU6ICdGSUxFX05BTUVfVFlQRScsXG4gICAgRElSRUNUT1JZX05BTUVfVFlQRTogJ0RJUkVDVE9SWV9OQU1FX1RZUEUnLFxuICAgIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTogJ0ZJTEVfTkFNRV9NQVJLRVJfVFlQRScsXG4gICAgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6ICdESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRW50cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKSxcbiAgICAgIG9wdGlvbnMgPSByZXF1aXJlKCcuLi8uLi9vcHRpb25zJyksXG4gICAgICBOYW1lQnV0dG9uID0gcmVxdWlyZSgnLi4vbmFtZUJ1dHRvbicpO1xuXG5jb25zdCBFU0NBUEVfS0VZQ09ERSA9IDI3LFxuICAgICAgU1RBUlRfRFJBR0dJTkdfREVMQVkgPSAxNzU7XG5cbmNvbnN0IHsgd2luZG93LCBSZWFjdCwgRWxlbWVudCB9ID0gZWFzeSxcbiAgICAgIHsgTEVGVF9NT1VTRV9CVVRUT04gfSA9IEVsZW1lbnQsXG4gICAgICB7IE5PX0RSQUdHSU5HLCBOT19EUkFHR0lOR19TVUJfRU5UUklFUywgTk9fRFJBR0dJTkdfVE9QTU9TVF9ESVJFQ1RPUlksIEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcgfSA9IG9wdGlvbnM7XG5cbmNsYXNzIERyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRW50cnkge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpIHtcbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSk7XG5cbiAgICB0aGlzLmV4cGxvcmVyID0gZXhwbG9yZXI7XG4gICAgXG4gICAgdGhpcy5zZXRJbml0aWFsU3RhdGUoKTtcbiAgfVxuXG4gIGdldEV4cGxvcmVyKCkge1xuICAgIHJldHVybiB0aGlzLmV4cGxvcmVyO1xuICB9XG5cbiAgaXNEcmFnZ2luZygpIHtcbiAgICBjb25zdCBkcmFnZ2luZyA9IHRoaXMuaGFzQ2xhc3MoJ2RyYWdnaW5nJyk7XG5cbiAgICByZXR1cm4gZHJhZ2dpbmc7XG4gIH1cblxuICBnZXRQYXRoKCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gdGhpcywgIC8vL1xuICAgICAgICAgIHBhdGggPSB0aGlzLmV4cGxvcmVyLnJldHJpZXZlRHJhZ2dhYmxlRW50cnlQYXRoKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0Q29sbGFwc2VkQm91bmRzKCkge1xuICAgIGNvbnN0IGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG4gIFxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ0NvbGxhcHNlZEJvdW5kcyhjb2xsYXBzZWRCb3VuZHMpIHtcbiAgICBjb25zdCBib3VuZHMgPSB0aGlzLmdldEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nQ29sbGFwc2VkQm91bmRzID0gYm91bmRzLmFyZU92ZXJsYXBwaW5nKGNvbGxhcHNlZEJvdW5kcyk7XG5cbiAgICByZXR1cm4gb3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHM7XG4gIH1cblxuICBzdGFydERyYWdnaW5nKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KEVTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcpLFxuICAgICAgICAgIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgYm91bmRzVG9wID0gYm91bmRzLmdldFRvcCgpLFxuICAgICAgICAgIGJvdW5kc0xlZnQgPSBib3VuZHMuZ2V0TGVmdCgpLFxuICAgICAgICAgIHRvcE9mZnNldCA9IGJvdW5kc1RvcCAtIG1vdXNlVG9wLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSBib3VuZHNMZWZ0IC0gbW91c2VMZWZ0O1xuXG4gICAgdGhpcy5zZXRUb3BPZmZzZXQodG9wT2Zmc2V0KTtcblxuICAgIHRoaXMuc2V0TGVmdE9mZnNldChsZWZ0T2Zmc2V0KTtcblxuICAgIGlmIChlc2NhcGVLZXlTdG9wc0RyYWdnaW5nT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qga2V5RG93bkhhbmRsZXIgPSB0aGlzLmtleURvd25IYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgICBcbiAgICAgIHRoaXMub25LZXlEb3duKGtleURvd25IYW5kbGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLmFkZENsYXNzKCdkcmFnZ2luZycpO1xuXG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuICB9XG5cbiAgc3RvcERyYWdnaW5nKCkge1xuICAgIGNvbnN0IGVzY2FwZUtleVN0b3BzRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORyk7XG5cbiAgICBpZiAoZXNjYXBlS2V5U3RvcHNEcmFnZ2luZ09wdGlvblByZXNlbnQpIHtcbiAgICAgIHRoaXMub2ZmS2V5RG93bigpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2RyYWdnaW5nJyk7XG4gIH1cblxuICBkcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KSB7XG4gICAgdGhpcy5kcmFnKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0V2FpdGluZ1RvRHJhZyhtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIGxldCB0aW1lb3V0ID0gdGhpcy5nZXRUaW1lb3V0KCk7XG4gICAgXG4gICAgaWYgKHRpbWVvdXQgPT09IG51bGwpIHtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuXG4gICAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpLFxuICAgICAgICAgICAgICBzdWJFbnRyeSA9ICF0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAgLy8vXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdPcHRpb25QcmVzZW50ID0gdGhpcy5leHBsb3Jlci5pc09wdGlvblByZXNlbnQoTk9fRFJBR0dJTkcpLFxuICAgICAgICAgICAgICBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQgPSB0aGlzLmV4cGxvcmVyLmlzT3B0aW9uUHJlc2VudChOT19EUkFHR0lOR19TVUJfRU5UUklFUyksXG4gICAgICAgICAgICAgIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCA9IHRoaXMuZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZKTsgIC8vL1xuXG4gICAgICAgIGlmICgobm9EcmFnZ2luZ09wdGlvblByZXNlbnQpIHx8IChzdWJFbnRyeSAmJiBub0RyYWdnaW5nU3ViRW50cmllc09wdGlvblByZXNlbnQpIHx8ICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICYmIG5vRHJhZ2dpbmdUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3B0aW9uUHJlc2VudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBtb3VzZU92ZXIgPSB0aGlzLmlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpO1xuXG4gICAgICAgIGlmIChtb3VzZU92ZXIpIHtcbiAgICAgICAgICBjb25zdCBzdGFydGVkRHJhZ2dpbmcgPSB0aGlzLmV4cGxvcmVyLnN0YXJ0RHJhZ2dpbmcodGhpcyk7XG5cbiAgICAgICAgICBpZiAoc3RhcnRlZERyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RHJhZ2dpbmcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcyksIFNUQVJUX0RSQUdHSU5HX0RFTEFZKTtcbiAgICAgIFxuICAgICAgdGhpcy5zZXRUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH1cbiAgfVxuXG4gIHN0b3BXYWl0aW5nVG9EcmFnKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSB0aGlzLmdldFRpbWVvdXQoKTtcbiAgICBcbiAgICBpZiAodGltZW91dCAhPT0gbnVsbCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuXG4gICAgICB0aGlzLnJlc2V0VGltZW91dCgpO1xuICAgIH1cbiAgfVxuXG4gIGlzTW91c2VPdmVyKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICBjb25zdCBjb2xsYXBzZWRCb3VuZHMgPSB0aGlzLmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2UgPSBjb2xsYXBzZWRCb3VuZHMuaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpLFxuICAgICAgICAgIG1vdXNlT3ZlciA9IGNvbGxhcHNlZEJvdW5kc092ZXJsYXBwaW5nTW91c2U7XG5cbiAgICByZXR1cm4gbW91c2VPdmVyO1xuICB9XG5cbiAgbW91c2VEb3duSGFuZGxlcihtb3VzZVRvcCwgbW91c2VMZWZ0LCBtb3VzZUJ1dHRvbikge1xuICAgIHdpbmRvdy5vbignYmx1cicsIHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpOyAvLy9cblxuICAgIHdpbmRvdy5vbk1vdXNlVXAodGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7XG5cbiAgICB3aW5kb3cub25Nb3VzZU1vdmUodGhpcy5tb3VzZU1vdmVIYW5kbGVyLCB0aGlzKTtcblxuICAgIGlmIChtb3VzZUJ1dHRvbiA9PT0gTEVGVF9NT1VTRV9CVVRUT04pIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmICghZHJhZ2dpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydFdhaXRpbmdUb0RyYWcobW91c2VUb3AsIG1vdXNlTGVmdCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbW91c2VVcEhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24pIHtcbiAgICB3aW5kb3cub2ZmKCdibHVyJywgdGhpcy5tb3VzZVVwSGFuZGxlciwgdGhpcyk7ICAvLy9cblxuICAgIHdpbmRvdy5vZmZNb3VzZVVwKHRoaXMubW91c2VVcEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgd2luZG93Lm9mZk1vdXNlTW92ZSh0aGlzLm1vdXNlTW92ZUhhbmRsZXIsIHRoaXMpO1xuXG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnkgPSB0aGlzOyAgLy8vXG4gICAgICBcbiAgICAgIHRoaXMuZXhwbG9yZXIuc3RvcERyYWdnaW5nKGRyYWdnYWJsZUVudHJ5LCBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RvcFdhaXRpbmdUb0RyYWcoKTtcbiAgICB9XG4gIH1cblxuICBtb3VzZU1vdmVIYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uKSB7XG4gICAgY29uc3QgZHJhZ2dpbmcgPSB0aGlzLmlzRHJhZ2dpbmcoKTtcblxuICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZyhtb3VzZVRvcCwgbW91c2VMZWZ0KTtcbiAgICB9XG4gIH1cblxuICBrZXlEb3duSGFuZGxlcihrZXlDb2RlKSB7XG4gICAgY29uc3QgZXNjYXBlS2V5ID0gKGtleUNvZGUgPT09IEVTQ0FQRV9LRVlDT0RFKTtcblxuICAgIGlmIChlc2NhcGVLZXkpIHtcbiAgICAgIGNvbnN0IGRyYWdnaW5nID0gdGhpcy5pc0RyYWdnaW5nKCk7XG5cbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICB0aGlzLmV4cGxvcmVyLmVzY2FwZURyYWdnaW5nKCk7XG5cbiAgICAgICAgdGhpcy5zdG9wRHJhZ2dpbmcoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIGRyYWcobW91c2VUb3AsIG1vdXNlTGVmdCkge1xuICAgIGNvbnN0IHdpbmRvd1Njcm9sbFRvcCA9IHdpbmRvdy5nZXRTY3JvbGxUb3AoKSxcbiAgICAgICAgICB3aW5kb3dTY3JvbGxMZWZ0ID0gd2luZG93LmdldFNjcm9sbExlZnQoKSxcbiAgICAgICAgICB0b3BPZmZzZXQgPSB0aGlzLmdldFRvcE9mZnNldCgpLFxuICAgICAgICAgIGxlZnRPZmZzZXQgPSB0aGlzLmdldExlZnRPZmZzZXQoKTtcblxuICAgIGxldCB0b3AgPSBtb3VzZVRvcCArIHRvcE9mZnNldCAtIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgbGVmdCA9IG1vdXNlTGVmdCArIGxlZnRPZmZzZXQgLSB3aW5kb3dTY3JvbGxMZWZ0O1xuXG4gICAgdG9wID0gYCR7dG9wfXB4YDsgLy8vXG4gICAgbGVmdCA9IGAke2xlZnR9cHhgOyAvLy9cblxuICAgIGNvbnN0IGNzcyA9IHtcbiAgICAgIHRvcDogdG9wLFxuICAgICAgbGVmdDogbGVmdFxuICAgIH07XG5cbiAgICB0aGlzLmNzcyhjc3MpO1xuXG4gICAgdGhpcy5leHBsb3Jlci5kcmFnZ2luZyh0aGlzKTtcbiAgfVxuICBcbiAgcmVzZXRUaW1lb3V0KCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsO1xuICAgIFxuICAgIHRoaXMuc2V0VGltZW91dCh0aW1lb3V0KTtcbiAgfVxuICBcbiAgZ2V0VGltZW91dCgpIHsgcmV0dXJuIHRoaXMuZnJvbVN0YXRlKCd0aW1lb3V0Jyk7IH1cblxuICBnZXRUb3BPZmZzZXQoKSB7IHJldHVybiB0aGlzLmZyb21TdGF0ZSgndG9wT2Zmc2V0Jyk7IH1cblxuICBnZXRMZWZ0T2Zmc2V0KCkgeyByZXR1cm4gdGhpcy5mcm9tU3RhdGUoJ2xlZnRPZmZzZXQnKTsgfVxuXG4gIHNldFRpbWVvdXQodGltZW91dCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdGltZW91dDogdGltZW91dFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VG9wT2Zmc2V0KHRvcE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXRcbiAgICB9KTtcbiAgfVxuXG4gIHNldExlZnRPZmZzZXQobGVmdE9mZnNldCkge1xuICAgIHRoaXMudXBkYXRlU3RhdGUoe1xuICAgICAgbGVmdE9mZnNldDogbGVmdE9mZnNldFxuICAgIH0pO1xuICB9XG5cbiAgc2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIGNvbnN0IHRpbWVvdXQgPSBudWxsLFxuICAgICAgICAgIHRvcE9mZnNldCA9IG51bGwsXG4gICAgICAgICAgbGVmdE9mZnNldCA9IG51bGw7XG4gICAgXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB0aW1lb3V0OiB0aW1lb3V0LFxuICAgICAgdG9wT2Zmc2V0OiB0b3BPZmZzZXQsXG4gICAgICBsZWZ0T2Zmc2V0OiBsZWZ0T2Zmc2V0XG4gICAgfSk7XG4gIH1cblxuICBjaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG5hbWUgfSA9IHByb3BlcnRpZXM7XG5cbiAgICByZXR1cm4oXG5cbiAgICAgIDxOYW1lQnV0dG9uPntuYW1lfTwvTmFtZUJ1dHRvbj5cblxuICAgICk7XG4gIH1cblxuICBpbml0aWFsaXNlKCkge1xuICAgIHRoaXMuYXNzaWduQ29udGV4dCgpO1xuXG4gICAgY29uc3QgbW91c2VEb3duSGFuZGxlciA9IHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5vbk1vdXNlRG93bihtb3VzZURvd25IYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgZXhwbG9yZXIgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgZHJhZ2dhYmxlRW50cnkgPSBFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgZXhwbG9yZXIpO1xuXG4gICAgcmV0dXJuIGRyYWdnYWJsZUVudHJ5O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oRHJhZ2dhYmxlRW50cnksIHtcbiAgdGFnTmFtZTogJ2xpJyxcbiAgZGVmYXVsdFByb3BlcnRpZXM6IHtcbiAgICBjbGFzc05hbWU6ICdkcmFnZ2FibGUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2V4cGxvcmVyJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGVFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZWFzeSA9IHJlcXVpcmUoJ2Vhc3knKSxcbiAgICAgIG5lY2Vzc2FyeSA9IHJlcXVpcmUoJ25lY2Vzc2FyeScpO1xuXG5jb25zdCBFbnRyeSA9IHJlcXVpcmUoJy4uLy4uL2VudHJ5JyksXG4gICAgICBFbnRyaWVzID0gcmVxdWlyZSgnLi4vLi4vZW50cmllcycpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKTtcblxuY29uc3QgeyBwYXRoVXRpbGl0aWVzIH0gPSBuZWNlc3NhcnksXG4gICAgICB7IHR5cGVzIH0gPSBFbnRyeSxcbiAgICAgIHsgQnV0dG9uLCBSZWFjdCB9ID0gZWFzeSxcbiAgICAgIHsgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCwgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSBleHRlbmRzIERyYWdnYWJsZUVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IERJUkVDVE9SWV9OQU1FX1RZUEU7XG5cbiAgICBzdXBlcihzZWxlY3RvciwgdHlwZSwgZXhwbG9yZXIpO1xuXG4gICAgY29uc3QgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyID0gdGhpcy50b2dnbGVCdXR0b25DbGlja0hhbmRsZXIuYmluZCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLmVudHJpZXMgPSA8RW50cmllcyBEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk9e0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeX0gLz47XG4gICAgXG4gICAgdGhpcy50b2dnbGVCdXR0b24gPSA8QnV0dG9uIGNsYXNzTmFtZT1cInRvZ2dsZVwiIG9uQ2xpY2s9e3RvZ2dsZUJ1dHRvbkNsaWNrSGFuZGxlcn0gLz47XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzQmVmb3JlKGVudHJ5KSB7XG4gICAgbGV0IGJlZm9yZTtcbiAgICBcbiAgICBjb25zdCBlbnRyeVR5cGUgPSBlbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgIGNhc2UgRklMRV9OQU1FX01BUktFUl9UWVBFOlxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICBcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgICBlbnRyeU5hbWUgPSBlbnRyeS5nZXROYW1lKCk7XG5cbiAgICAgICAgYmVmb3JlID0gKG5hbWUubG9jYWxlQ29tcGFyZShlbnRyeU5hbWUpIDwgMCk7XG5cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBiZWZvcmU7XG4gIH1cblxuICBnZXRDb2xsYXBzZWRCb3VuZHMoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5pc0NvbGxhcHNlZCgpO1xuXG4gICAgdGhpcy5jb2xsYXBzZSgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gc3VwZXIuZ2V0Qm91bmRzKCksXG4gICAgICAgICAgY29sbGFwc2VkQm91bmRzID0gYm91bmRzOyAgLy8vXG5cbiAgICBpZiAoIWNvbGxhcHNlZCkge1xuICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGFwc2VkQm91bmRzO1xuICB9XG5cbiAgaXNDb2xsYXBzZWQoKSB7XG4gICAgY29uc3QgY29sbGFwc2VkID0gdGhpcy5oYXNDbGFzcygnY29sbGFwc2VkJyk7XG5cbiAgICByZXR1cm4gY29sbGFwc2VkO1xuICB9XG5cbiAgaXNNYXJrZWQoKSB7XG4gICAgbGV0IG1hcmtlZDtcblxuICAgIGNvbnN0IGVudHJpZXNNYXJrZWQgPSB0aGlzLmVudHJpZXMuaXNNYXJrZWQoKTtcblxuICAgIGlmIChlbnRyaWVzTWFya2VkKSB7XG4gICAgICBtYXJrZWQgPSBlbnRyaWVzTWFya2VkO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQgPSB0aGlzLmVudHJpZXMuc29tZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmlzTWFya2VkKCk7XG5cbiAgICAgICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlZDtcbiAgICAgIH0pO1xuXG4gICAgICBtYXJrZWQgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlNYXJrZWQ7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiBtYXJrZWQ7XG4gIH1cblxuICBpc0VtcHR5KCkgeyByZXR1cm4gdGhpcy5lbnRyaWVzLmlzRW1wdHkoKTsgfVxuXG4gIGlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICAgIFxuICAgIGlmICh0aGlzID09PSBkcmFnZ2FibGVFbnRyeSkge1xuICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2xsYXBzZWQgPSB0aGlzLmlzQ29sbGFwc2VkKCk7XG4gICAgICBcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBkcmFnZ2FibGVFbnRyeS5nZXRDb2xsYXBzZWRCb3VuZHMoKSxcbiAgICAgICAgICAgICAgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IHN1cGVyLmlzT3ZlcmxhcHBpbmdDb2xsYXBzZWRCb3VuZHMoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpO1xuXG4gICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IHRydWUsXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZpbGVQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZmlsZVBhdGgpO1xuXG4gICAgICBmaWxlTmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGRGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGZpbGVOYW1lID0gZmlsZVBhdGgsICAvLy9cbiAgICAgICAgICAgIGVudHJpZXNGaWxlID0gdGhpcy5lbnRyaWVzLmlzRmlsZU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQoZmlsZU5hbWUpO1xuXG4gICAgICBpZiAoIWVudHJpZXNGaWxlKSB7XG4gICAgICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpO1xuICAgICAgICBcbiAgICAgICAgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5hZGRGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGZpbGVOYW1lLCBleHBsb3Jlcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSB0cnVlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShkaXJlY3RvcnlQYXRoLCBhZGRJZk5lY2Vzc2FyeSk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGRpcmVjdG9yeU5hbWUgPSBkaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gdGhpcy5lbnRyaWVzLmZpbmREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5UHJlc2VudCA9IChlbnRyaWVzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKTtcblxuICAgICAgaWYgKGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgIGVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBleHBsb3JlciA9IHRoaXMuZ2V0RXhwbG9yZXIoKTtcblxuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWUsIGV4cGxvcmVyLCBjb2xsYXBzZWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGxldCByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gbnVsbDsgLy8vXG5cbiAgICBjb25zdCBhZGRJZk5lY2Vzc2FyeSA9IGZhbHNlLFxuICAgICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLnJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlUGF0aCwgYWRkSWZOZWNlc3NhcnkpO1xuXG4gICAgaWYgKHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGZpbGVQYXRoLCAgLy8vXG4gICAgICAgICAgICBlbnRyaWVzRmlsZSA9IHRoaXMuZW50cmllcy5pc0ZpbGVOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGZpbGVOYW1lKTtcblxuICAgICAgaWYgKGVudHJpZXNGaWxlKSB7XG4gICAgICAgIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPSB0aGlzLmVudHJpZXMucmVtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXRvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cblxuICByZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHtcbiAgICBsZXQgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IGZhbHNlO1xuXG4gICAgY29uc3QgYWRkSWZOZWNlc3NhcnkgPSBmYWxzZSwgLy8vXG4gICAgICAgICAgdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMucmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeVBhdGgsIGFkZElmTmVjZXNzYXJ5KTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICByZW1vdmVFbXB0eVBhcmVudERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyaWVzID0gdG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5yZW1vdmVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lID0gZGlyZWN0b3J5UGF0aCwgIC8vL1xuICAgICAgICAgICAgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmVudHJpZXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KGRpcmVjdG9yeU5hbWUpO1xuXG4gICAgICBpZiAoZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQpIHtcbiAgICAgICAgcmVtb3ZlRW1wdHlQYXJlbnREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cmllcyA9IHRoaXMuZW50cmllcy5yZW1vdmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZGlyZWN0b3J5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXMgPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnkgPSB0aGlzLmlzVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgICBpZiAoIXRvcG1vc3REaXJlY3RvcnkpIHtcbiAgICAgICAgY29uc3QgZW1wdHkgPSB0aGlzLmlzRW1wdHkoKTtcblxuICAgICAgICBpZiAoZW1wdHkpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbW92ZUVtcHR5UGFyZW50RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJpZXM7XG4gIH1cbiAgXG4gIGFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGgsIGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIGlmICh0b3Btb3N0RGlyZWN0b3J5TmFtZSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VyTmFtZSA9IG1hcmtlclBhdGg7ICAvLy9cblxuICAgICAgdGhpcy5lbnRyaWVzLmFkZE1hcmtlckVudHJ5KG1hcmtlck5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBtYXJrZXJQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKG1hcmtlclBhdGgpO1xuXG4gICAgICB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgbGV0IHJlbW92ZWQ7XG5cbiAgICBjb25zdCBlbnRyaWVzTWFya2VkID0gdGhpcy5lbnRyaWVzLmlzTWFya2VkKCk7XG4gICAgXG4gICAgaWYgKGVudHJpZXNNYXJrZWQpIHtcbiAgICAgIHRoaXMuZW50cmllcy5yZW1vdmVNYXJrZXJFbnRyeSgpO1xuXG4gICAgICByZW1vdmVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVtb3ZlZCA9IHRoaXMuZW50cmllcy5zb21lRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGZ1bmN0aW9uKGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJlbW92ZU1hcmtlckVudHJ5KCk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gcmVtb3ZlZDtcbiAgfVxuXG4gIGlzRHJhZ2dhYmxlRW50cnlQcmVzZW50KG5hbWUpIHsgcmV0dXJuIHRoaXMuZW50cmllcy5pc0RyYWdnYWJsZUVudHJ5UHJlc2VudChuYW1lKTsgfVxuXG4gIGZvckVhY2hGaWxlTmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShjYWxsYmFjayk7IH1cblxuICBmb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKSB7IHRoaXMuZW50cmllcy5mb3JFYWNoRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGNhbGxiYWNrKTsgfVxuXG4gIHNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spIHsgdGhpcy5lbnRyaWVzLnNvbWVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoY2FsbGJhY2spOyB9XG5cbiAgcmV0cmlldmVGaWxlUGF0aHMoKSB7XG4gICAgbGV0IGZpbGVQYXRocyA9IFtdO1xuXG4gICAgdGhpcy5mb3JFYWNoRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihmaWxlTmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aCA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICAgICAgZmlsZVBhdGggPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5UGF0aDsgIC8vL1xuXG4gICAgICBmaWxlUGF0aHMucHVzaChmaWxlUGF0aCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlGaWxlUGF0aHMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVGaWxlUGF0aHMoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeUZpbGVQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeUZpbGVQYXRocztcblxuICAgICAgZmlsZVBhdGhzID0gZmlsZVBhdGhzLmNvbmNhdChkaXJlY3RvcnlGaWxlUGF0aHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZpbGVQYXRocztcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgbGV0IGRpcmVjdG9yeVBhdGhzID0gW107XG5cbiAgICB0aGlzLmZvckVhY2hEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmdldFBhdGgoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeURpcmVjdG9yeVBhdGhzID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LnJldHJpZXZlRGlyZWN0b3J5UGF0aHMoKSxcbiAgICAgICAgICAgIGRpcmVjdG9yeVBhdGggPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQYXRoLCAgLy8vXG4gICAgICAgICAgICBkaXJlY3RvcnlEaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeURpcmVjdG9yeVBhdGhzO1xuXG4gICAgICBkaXJlY3RvcnlQYXRocy5wdXNoKGRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBkaXJlY3RvcnlQYXRocyA9IGRpcmVjdG9yeVBhdGhzLmNvbmNhdChkaXJlY3RvcnlEaXJlY3RvcnlQYXRocyk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICByZXRyaWV2ZVN1YkVudHJpZXMoKSB7XG4gICAgbGV0IHN1YkVudHJpZXMgPSBbXTtcblxuICAgIHRoaXMuZm9yRWFjaEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkoZnVuY3Rpb24oZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgY29uc3Qgc3ViRW50cnkgPSBmaWxlTmFtZURyYWdnYWJsZUVudHJ5OyAvLy9cblxuICAgICAgc3ViRW50cmllcy5wdXNoKHN1YkVudHJ5KTtcbiAgICB9KTtcblxuICAgIHRoaXMuZm9yRWFjaERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeShmdW5jdGlvbihkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkpIHtcbiAgICAgIGNvbnN0IHN1YkVudHJ5ID0gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LCAvLy9cbiAgICAgICAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVN1YkVudHJpZXMgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkucmV0cmlldmVTdWJFbnRyaWVzKCk7XG5cbiAgICAgIHN1YkVudHJpZXMucHVzaChzdWJFbnRyeSk7XG5cbiAgICAgIHN1YkVudHJpZXMgPSBzdWJFbnRyaWVzLmNvbmNhdChkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlTdWJFbnRyaWVzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBzdWJFbnRyaWVzO1xuICB9XG5cbiAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGgoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZHJhZ2dhYmxlRW50cnlQYXRoO1xuXG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0TmFtZSgpO1xuXG4gICAgaWYgKGRyYWdnYWJsZUVudHJ5ID09PSB0aGlzKSB7XG4gICAgICBkcmFnZ2FibGVFbnRyeVBhdGggPSBuYW1lOyAgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdnYWJsZUVudHJ5UGF0aCA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURyYWdnYWJsZUVudHJ5UGF0aChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgIGlmIChkcmFnZ2FibGVFbnRyeVBhdGggIT09IG51bGwpIHtcbiAgICAgICAgZHJhZ2dhYmxlRW50cnlQYXRoID0gYCR7bmFtZX0vJHtkcmFnZ2FibGVFbnRyeVBhdGh9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnlQYXRoO1xuICB9XG5cbiAgcmV0cmlldmVUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHBhdGgsIGFkZElmTmVjZXNzYXJ5KSB7XG4gICAgbGV0IHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG5cbiAgICBjb25zdCB0b3Btb3N0RGlyZWN0b3J5TmFtZSA9IHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCk7XG5cbiAgICBpZiAodG9wbW9zdERpcmVjdG9yeU5hbWUgPT09IG51bGwpIHtcbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoYWRkSWZOZWNlc3NhcnkpIHtcbiAgICAgICAgY29uc3QgZW50cmllc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeVByZXNlbnQgPSB0aGlzLmVudHJpZXMuaXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KHRvcG1vc3REaXJlY3RvcnlOYW1lKTtcblxuICAgICAgICBpZiAoIWVudHJpZXNEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlQcmVzZW50KSB7XG4gICAgICAgICAgY29uc3QgY29sbGFwc2VkID0gdHJ1ZSwgLy8vXG4gICAgICAgICAgICAgICAgZXhwbG9yZXIgPSB0aGlzLmdldEV4cGxvcmVyKCk7XG5cbiAgICAgICAgICB0aGlzLmVudHJpZXMuYWRkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KHRvcG1vc3REaXJlY3RvcnlOYW1lLCBleHBsb3JlciwgY29sbGFwc2VkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmVudHJpZXMuZmluZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSh0b3Btb3N0RGlyZWN0b3J5TmFtZSk7XG5cbiAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7IC8vL1xuICAgIH1cblxuICAgIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgbGV0IG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpO1xuXG4gICAgaWYgKG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuICAgICAgXG4gICAgICBpZiAobWFya2VkKSB7XG4gICAgICAgIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHRoaXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIHJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGNvbnN0IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSB0aGlzLmlzT3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICBpZiAob3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuZW50cmllcy5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuXG4gICAgICBpZiAoZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9PT0gbnVsbCkge1xuICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuICBcbiAgdG9nZ2xlQnV0dG9uQ2xpY2tIYW5kbGVyKCkge1xuICAgIHRoaXMudG9nZ2xlKCk7XG4gIH1cblxuICBkb3VibGVDbGlja0hhbmRsZXIoKSB7XG4gICAgdGhpcy50b2dnbGUoKTtcbiAgfVxuXG4gIHNldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBjb2xsYXBzZWQgP1xuICAgICAgdGhpcy5jb2xsYXBzZSgpIDpcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgfVxuXG4gIGNvbGxhcHNlKCkge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgZXhwYW5kKCkge1xuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG5cbiAgdG9nZ2xlKCkge1xuICAgIHRoaXMudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcpO1xuICB9XG4gIFxuICBpbml0aWFsaXNlKGNvbGxhcHNlZCkge1xuICAgIHN1cGVyLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICB0aGlzLm9uRG91YmxlQ2xpY2sodGhpcy5kb3VibGVDbGlja0hhbmRsZXIuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLmFwcGVuZCh0aGlzLmVudHJpZXMpO1xuXG4gICAgdGhpcy5wcmVwZW5kKHRoaXMudG9nZ2xlQnV0dG9uKTtcblxuICAgIHRoaXMuc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCk7XG4gIH1cbiAgXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbGxhcHNlZCB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBEcmFnZ2FibGVFbnRyeS5mcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcyk7XG5cbiAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZShjb2xsYXBzZWQpO1xuXG4gICAgcmV0dXJuIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeU5hbWUnXG4gIH0sXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ2NvbGxhcHNlZCdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3Qgb3B0aW9ucyA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL29wdGlvbnMnKSxcbiAgICAgIERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IHJlcXVpcmUoJy4uLy4uLy4uL2VudHJ5L2RyYWdnYWJsZS9kaXJlY3RvcnlOYW1lJyk7XG5cbmNvbnN0IHsgcGF0aFV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUyB9ID0gb3B0aW9ucyxcbiAgICAgIHsgcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoIH0gPSBwYXRoVXRpbGl0aWVzO1xuXG5jbGFzcyBUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IGV4dGVuZHMgRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5IHtcbiAgcmV0cmlldmUoKSB7XG4gICAgcmV0dXJuIHRoaXM7ICAvLy9cbiAgfVxuICBcbiAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYWRkRmlsZVBhdGgoZmlsZVBhdGgpIHtcbiAgICBsZXQgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG5cbiAgICBjb25zdCBmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChmaWxlUGF0aCk7XG5cbiAgICBpZiAoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgIT09IG51bGwpIHtcbiAgICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5hZGRGaWxlUGF0aChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBhZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgsIGNvbGxhcHNlZCA9IGZhbHNlKSB7XG4gICAgbGV0IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgY29uc3QgZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChkaXJlY3RvcnlQYXRoKTtcblxuICAgIGlmIChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lICE9PSBudWxsKSB7XG4gICAgICBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5hZGREaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGNvbGxhcHNlZCk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZW1vdmVGaWxlUGF0aChmaWxlUGF0aCkge1xuICAgIGNvbnN0IGZpbGVQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoKGZpbGVQYXRoKTtcblxuICAgIGlmIChmaWxlUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZURpcmVjdG9yeVBhdGgoZGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeVBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUgPSBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgoZGlyZWN0b3J5UGF0aCk7XG5cbiAgICBpZiAoZGlyZWN0b3J5UGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSAhPT0gbnVsbCkge1xuICAgICAgc3VwZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lKTtcbiAgICB9XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcblxuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIG5vRHJhZ2dpbmdJbnRvU3ViZGlyZWN0b3JpZXNPcHRpb25QcmVzZW50ID0gZXhwbG9yZXIuaXNPcHRpb25QcmVzZW50KE5PX0RSQUdHSU5HX0lOVE9fU1VCX0RJUkVDVE9SSUVTKTtcblxuICAgIGlmIChub0RyYWdnaW5nSW50b1N1YmRpcmVjdG9yaWVzT3B0aW9uUHJlc2VudCkge1xuICAgICAgY29uc3Qgb3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IHRoaXMuaXNPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5KGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkgPSBzdXBlci5yZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpO1xuICAgIH1cblxuICAgIHJldHVybiBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5O1xuICB9XG5cbiAgYWRkTWFya2VyRW50cnkobWFya2VyUGF0aCwgZHJhZ2dhYmxlRW50cnlUeXBlKSB7XG4gICAgY29uc3QgbWFya2VyUGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZSA9IHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChtYXJrZXJQYXRoKTtcblxuICAgIHN1cGVyLmFkZE1hcmtlckVudHJ5KG1hcmtlclBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWUsIGRyYWdnYWJsZUVudHJ5VHlwZSk7XG4gIH1cblxuICBwYXJlbnRDb250ZXh0KCkge1xuICAgIHJldHVybiAoe1xuICAgICAgYWRkRmlsZVBhdGg6IHRoaXMuYWRkRmlsZVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZUZpbGVQYXRoOiB0aGlzLnJlbW92ZUZpbGVQYXRoLmJpbmQodGhpcyksXG4gICAgICBhZGREaXJlY3RvcnlQYXRoOiB0aGlzLmFkZERpcmVjdG9yeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJlbW92ZURpcmVjdG9yeVBhdGg6IHRoaXMucmVtb3ZlRGlyZWN0b3J5UGF0aC5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGg6IHRoaXMucmV0cmlldmVEcmFnZ2FibGVFbnRyeVBhdGguYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZS5iaW5kKHRoaXMpLCAgLy8vXG4gICAgICByZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTogdGhpcy5yZXRyaWV2ZU1hcmtlZERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgcmV0cmlldmVEaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5OiB0aGlzLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeS5iaW5kKHRoaXMpLFxuICAgICAgYWRkVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLmFkZE1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgcmVtb3ZlVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU1hcmtlckVudHJ5OiB0aGlzLnJlbW92ZU1hcmtlckVudHJ5LmJpbmQodGhpcyksIC8vL1xuICAgICAgaXNUb3Btb3N0RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5TWFya2VkOiB0aGlzLmlzTWFya2VkLmJpbmQodGhpcyksICAvLy9cbiAgICAgIGdldFRvcG1vc3REaXJlY3RvcnlOYW1lOiB0aGlzLmdldE5hbWUuYmluZCh0aGlzKSwgIC8vL1xuICAgICAgcmV0cmlldmVGaWxlUGF0aHM6IHRoaXMucmV0cmlldmVGaWxlUGF0aHMuYmluZCh0aGlzKSxcbiAgICAgIHJldHJpZXZlRGlyZWN0b3J5UGF0aHM6IHRoaXMucmV0cmlldmVEaXJlY3RvcnlQYXRocy5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKFRvcG1vc3REaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVG9wbW9zdERpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgRHJhZ2dhYmxlRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9kcmFnZ2FibGUnKSxcbiAgICAgIG5hbWVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlsaXRpZXMvbmFtZScpO1xuXG5jb25zdCB7IHR5cGVzIH0gPSBFbnRyeSxcbiAgICAgIHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gPSBuYW1lVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRElSRUNUT1JZX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIEZpbGVOYW1lRHJhZ2dhYmxlRW50cnkgZXh0ZW5kcyBEcmFnZ2FibGVFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBleHBsb3Jlcikge1xuICAgIGNvbnN0IHR5cGUgPSBGSUxFX05BTUVfVFlQRTtcblxuICAgIHN1cGVyKHNlbGVjdG9yLCB0eXBlLCBleHBsb3Jlcik7XG4gIH1cblxuICBpc0RpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc0JlZm9yZShlbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG4gICAgXG4gICAgY29uc3QgZW50cnlUeXBlID0gZW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChlbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICBjYXNlIEZJTEVfTkFNRV9NQVJLRVJfVFlQRTpcbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZW50cnlOYW1lID0gZW50cnkuZ2V0TmFtZSgpO1xuICAgICAgICAgIFxuICAgICAgICBiZWZvcmUgPSBuYW1lSXNCZWZvcmVFbnRyeU5hbWUobmFtZSwgZW50cnlOYW1lKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgRElSRUNUT1JZX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gZmFsc2U7ICAgICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuXG4gIHJldHJpZXZlU3ViRW50cmllcygpIHtcbiAgICBjb25zdCBzdWJFbnRyaWVzID0gW107ICAvLy9cbiAgICBcbiAgICByZXR1cm4gc3ViRW50cmllcztcbiAgfVxuICBcbiAgZG91YmxlQ2xpY2tIYW5kbGVyKCkge1xuICAgIGNvbnN0IGV4cGxvcmVyID0gdGhpcy5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgIGZpbGUgPSB0aGlzOyAvLy9cbiAgICBcbiAgICBleHBsb3Jlci5vcGVuRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlKTtcbiAgfVxuICBcbiAgaW5pdGlhbGlzZSgpICB7XG4gICAgc3VwZXIuaW5pdGlhbGlzZSgpO1xuICAgIFxuICAgIGNvbnN0IGRvdWJsZUNsaWNrSGFuZGxlciA9IHRoaXMuZG91YmxlQ2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLm9uRG91YmxlQ2xpY2soZG91YmxlQ2xpY2tIYW5kbGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBwcm9wZXJ0aWVzID0gQ2xhc3M7XG4gICAgICBDbGFzcyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gICAgfVxuXG4gICAgY29uc3QgZmlsZU5hbWVEcmFnZ2FibGVFbnRyeSA9IERyYWdnYWJsZUVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzKTtcblxuICAgIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuaW5pdGlhbGlzZSgpO1xuXG4gICAgcmV0dXJuIGZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihGaWxlTmFtZURyYWdnYWJsZUVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnZmlsZU5hbWUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZpbGVOYW1lRHJhZ2dhYmxlRW50cnk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVudHJ5ID0gcmVxdWlyZSgnLi4vZW50cnknKTtcblxuY2xhc3MgTWFya2VyRW50cnkgZXh0ZW5kcyBFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCB0eXBlLCBuYW1lKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUpO1xuXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfVxuXG4gIGdldE5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcykge1xuICAgIGNvbnN0IHsgbmFtZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBtYXJrZXJFbnRyeSA9IEVudHJ5LmZyb21Qcm9wZXJ0aWVzKENsYXNzLCBwcm9wZXJ0aWVzLCBuYW1lKTtcblxuICAgIHJldHVybiBtYXJrZXJFbnRyeTtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKE1hcmtlckVudHJ5LCB7XG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbWFya2VyJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXJrZXJFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9tYXJrZXInKTtcblxuY29uc3QgeyB0eXBlcyB9ID0gRW50cnksXG4gICAgICB7IEZJTEVfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFLCBESVJFQ1RPUllfTkFNRV9NQVJLRVJfVFlQRSB9ID0gdHlwZXM7XG5cbmNsYXNzIERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRElSRUNUT1JZX05BTUVfTUFSS0VSX1RZUEU7XG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIG5hbWUpO1xuICB9XG4gIFxuICBpc0JlZm9yZShkcmFnZ2FibGVFbnRyeSkge1xuICAgIGxldCBiZWZvcmU7XG5cbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeVR5cGUgPSBkcmFnZ2FibGVFbnRyeS5nZXRUeXBlKCk7XG5cbiAgICBzd2l0Y2ggKGRyYWdnYWJsZUVudHJ5VHlwZSkge1xuICAgICAgY2FzZSBGSUxFX05BTUVfVFlQRTpcbiAgICAgICAgYmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBjb25zdCBuYW1lID0gdGhpcy5nZXROYW1lKCksXG4gICAgICAgICAgICAgIGRyYWdnYWJsZUVudHJ5TmFtZSA9IGRyYWdnYWJsZUVudHJ5LmdldE5hbWUoKTtcblxuICAgICAgICBiZWZvcmUgPSAobmFtZS5sb2NhbGVDb21wYXJlKGRyYWdnYWJsZUVudHJ5TmFtZSkgPCAwKTtcblxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYmVmb3JlO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gTWFya2VyRW50cnkuZnJvbVByb3BlcnRpZXMoRGlyZWN0b3J5TmFtZU1hcmtlckVudHJ5LCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2RpcmVjdG9yeU5hbWUnXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpcmVjdG9yeU5hbWVNYXJrZXJFbnRyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeScpLFxuICAgICAgTWFya2VyRW50cnkgPSByZXF1aXJlKCcuLi8uLi9lbnRyeS9tYXJrZXInKSxcbiAgICAgIG5hbWVVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlsaXRpZXMvbmFtZScpO1xuXG5jb25zdCB7IHR5cGVzIH0gPSBFbnRyeSxcbiAgICAgIHsgbmFtZUlzQmVmb3JlRW50cnlOYW1lIH0gPSBuYW1lVXRpbGl0aWVzLFxuICAgICAgeyBGSUxFX05BTUVfVFlQRSwgRklMRV9OQU1FX01BUktFUl9UWVBFLCBESVJFQ1RPUllfTkFNRV9UWVBFIH0gPSB0eXBlcztcblxuY2xhc3MgRmlsZU5hbWVNYXJrZXJFbnRyeSBleHRlbmRzIE1hcmtlckVudHJ5IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IsIG5hbWUpIHtcbiAgICBjb25zdCB0eXBlID0gRklMRV9OQU1FX01BUktFUl9UWVBFO1xuXG4gICAgc3VwZXIoc2VsZWN0b3IsIHR5cGUsIG5hbWUpO1xuICB9XG5cbiAgaXNCZWZvcmUoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBsZXQgYmVmb3JlO1xuXG4gICAgY29uc3QgZHJhZ2dhYmxlRW50cnlUeXBlID0gZHJhZ2dhYmxlRW50cnkuZ2V0VHlwZSgpO1xuXG4gICAgc3dpdGNoIChkcmFnZ2FibGVFbnRyeVR5cGUpIHtcbiAgICAgIGNhc2UgRklMRV9OQU1FX1RZUEU6XG4gICAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLmdldE5hbWUoKSxcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlRW50cnlOYW1lID0gZHJhZ2dhYmxlRW50cnkuZ2V0TmFtZSgpO1xuXG4gICAgICAgIGJlZm9yZSA9IG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBkcmFnZ2FibGVFbnRyeU5hbWUpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBESVJFQ1RPUllfTkFNRV9UWVBFOlxuICAgICAgICBiZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJlZm9yZTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIE1hcmtlckVudHJ5LmZyb21Qcm9wZXJ0aWVzKEZpbGVOYW1lTWFya2VyRW50cnksIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oRmlsZU5hbWVNYXJrZXJFbnRyeSwge1xuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIGNsYXNzTmFtZTogJ2ZpbGVOYW1lJ1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBGaWxlTmFtZU1hcmtlckVudHJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBlYXN5ID0gcmVxdWlyZSgnZWFzeScpLFxuICAgICAgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHsgSW5wdXRFbGVtZW50IH0gPSBlYXN5LFxuICAgICAgeyBhcnJheVV0aWxpdGllcyB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCB9ID0gYXJyYXlVdGlsaXRpZXM7XG5cbmNsYXNzIE5hbWVCdXR0b24gZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBnZXROYW1lKCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSB0aGlzLmdldENoaWxkRWxlbWVudHMoKSxcbiAgICAgICAgICBmaXJzdENoaWxkRWxlbWVudCA9IGZpcnN0KGNoaWxkRWxlbWVudHMpLFxuICAgICAgICAgIGZpcnN0Q2hpbGRFbGVtZW50VGV4dCA9IGZpcnN0Q2hpbGRFbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgICBuYW1lID0gZmlyc3RDaGlsZEVsZW1lbnRUZXh0OyAvLy9cblxuICAgIHJldHVybiBuYW1lO1xuICB9XG5cbiAgb25Eb3VibGVDbGljayhoYW5kbGVyKSB7XG4gICAgdGhpcy5vbignZGJsY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxuICBcbiAgcGFyZW50Q29udGV4dCgpIHtcbiAgICByZXR1cm4gKHtcbiAgICAgIGdldE5hbWU6IHRoaXMuZ2V0TmFtZS5iaW5kKHRoaXMpLFxuICAgICAgb25Eb3VibGVDbGljazogdGhpcy5vbkRvdWJsZUNsaWNrLmJpbmQodGhpcylcbiAgICB9KTtcbiAgfVxuICBcbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhOYW1lQnV0dG9uLCBwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKE5hbWVCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAnbmFtZSdcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnbmFtZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTmFtZUJ1dHRvbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3Qgb3B0aW9ucyA9IHtcbiAgTk9fRFJBR0dJTkc6ICdOT19EUkFHR0lORycsXG4gIE5PX0RSQUdHSU5HX1dJVEhJTjogJ05PX0RSQUdHSU5HX1dJVEhJTicsXG4gIE5PX0RSQUdHSU5HX1NVQl9FTlRSSUVTOiAnTk9fRFJBR0dJTkdfU1VCX0VOVFJJRVMnLFxuICBOT19EUkFHR0lOR19UT1BNT1NUX0RJUkVDVE9SWTogJ05PX0RSQUdHSU5HX1RPUE1PU1RfRElSRUNUT1JZJyxcbiAgTk9fRFJBR0dJTkdfSU5UT19TVUJfRElSRUNUT1JJRVM6ICdOT19EUkFHR0lOR19JTlRPX1NVQl9ESVJFQ1RPUklFUycsXG4gIFJFTU9WRV9FTVBUWV9QQVJFTlRfRElSRUNUT1JJRVM6ICdSRU1PVkVfRU1QVFlfUEFSRU5UX0RJUkVDVE9SSUVTJyxcbiAgRVNDQVBFX0tFWV9TVE9QU19EUkFHR0lORzogJ0VTQ0FQRV9LRVlfU1RPUFNfRFJBR0dJTkcnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG9wdGlvbnM7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGVhc3kgPSByZXF1aXJlKCdlYXN5Jyk7XG5cbmNvbnN0IERyb3BUYXJnZXQgPSByZXF1aXJlKCcuL2Ryb3BUYXJnZXQnKTtcblxuY29uc3QgeyBFbGVtZW50IH0gPSBlYXN5O1xuXG5jbGFzcyBSdWJiaXNoQmluIGV4dGVuZHMgRHJvcFRhcmdldCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCByZW1vdmVIYW5kbGVyKSB7XG4gICAgY29uc3QgbW92ZUhhbmRsZXIgPSByZW1vdmVIYW5kbGVyOyAgLy8vXG4gICAgXG4gICAgc3VwZXIoc2VsZWN0b3IsIG1vdmVIYW5kbGVyKTtcbiAgfVxuXG4gIGlzT3BlbigpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5oYXNDbGFzcygnb3BlbicpO1xuXG4gICAgcmV0dXJuIG9wZW47XG4gIH1cblxuICBpc01hcmtlZCgpIHtcbiAgICBjb25zdCBvcGVuID0gdGhpcy5pc09wZW4oKSxcbiAgICAgICAgICBtYXJrZWQgPSBvcGVuOyAgLy8vXG5cbiAgICByZXR1cm4gbWFya2VkO1xuICB9XG5cbiAgaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZHMoKSxcbiAgICAgICAgICBkcmFnZ2FibGVFbnRyeUNvbGxhcHNlZEJvdW5kcyA9IGRyYWdnYWJsZUVudHJ5LmdldENvbGxhcHNlZEJvdW5kcygpLFxuICAgICAgICAgIG92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMgPSBib3VuZHMuYXJlT3ZlcmxhcHBpbmcoZHJhZ2dhYmxlRW50cnlDb2xsYXBzZWRCb3VuZHMpLFxuICAgICAgICAgIHRvQmVNYXJrZWQgPSBvdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5Q29sbGFwc2VkQm91bmRzOyAvLy9cblxuICAgIHJldHVybiB0b0JlTWFya2VkO1xuICB9XG5cbiAgb3BlbigpIHtcbiAgICB0aGlzLmFkZENsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCdvcGVuJyk7XG4gIH1cblxuICBhZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSkge1xuICAgIHRoaXMub3BlbigpO1xuICB9XG5cbiAgcmVtb3ZlTWFya2VyRW50cnkoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgZHJhZ2dpbmcoZHJhZ2dhYmxlRW50cnksIGV4cGxvcmVyKSB7XG4gICAgY29uc3QgbWFya2VkID0gdGhpcy5pc01hcmtlZCgpO1xuXG4gICAgaWYgKG1hcmtlZCkge1xuICAgICAgY29uc3QgdG9CZU1hcmtlZCA9IHRoaXMuaXNUb0JlTWFya2VkKGRyYWdnYWJsZUVudHJ5KTtcblxuICAgICAgaWYgKCF0b0JlTWFya2VkKSB7XG4gICAgICAgIGNvbnN0IGRyb3BUYXJnZXRUb0JlTWFya2VkID0gdGhpcy5nZXREcm9wVGFyZ2V0VG9CZU1hcmtlZChkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgaWYgKGRyb3BUYXJnZXRUb0JlTWFya2VkICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSA9IGRyb3BUYXJnZXRUb0JlTWFya2VkLnJldHJpZXZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSk7XG5cbiAgICAgICAgICBkcm9wVGFyZ2V0VG9CZU1hcmtlZC5hZGRNYXJrZXJFbnRyeShkcmFnZ2FibGVFbnRyeSwgZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwbG9yZXIuYWRkTWFya2VyRW50cnlJblBsYWNlKGRyYWdnYWJsZUVudHJ5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVtb3ZlTWFya2VyRW50cnkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb3ZlRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSwgc291cmNlRGlyZWN0b3J5UGF0aCwgdGFyZ2V0RGlyZWN0b3J5UGF0aCkge1xuICAgIGNvbnN0IGRyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIGlmICh0YXJnZXREaXJlY3RvcnlQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGRpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeS5nZXRFeHBsb3JlcigpLFxuICAgICAgICAgICAgZGlyZWN0b3J5UGF0aCA9IHNvdXJjZURpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRGlyZWN0b3J5UGF0aChkaXJlY3RvcnlQYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBtb3ZlRmlsZU5hbWVEcmFnZ2FibGVFbnRyeShmaWxlTmFtZURyYWdnYWJsZUVudHJ5LCBzb3VyY2VGaWxlUGF0aCwgdGFyZ2V0RmlsZVBhdGgpIHtcbiAgICBjb25zdCBkcmFnZ2FibGVFbnRyeSA9IG51bGw7XG4gICAgXG4gICAgaWYgKHRhcmdldEZpbGVQYXRoID09PSBudWxsKSB7XG4gICAgICBjb25zdCBleHBsb3JlciA9IGZpbGVOYW1lRHJhZ2dhYmxlRW50cnkuZ2V0RXhwbG9yZXIoKSxcbiAgICAgICAgICAgIGZpbGVQYXRoID0gc291cmNlRmlsZVBhdGg7ICAvLy9cblxuICAgICAgZXhwbG9yZXIucmVtb3ZlRmlsZVBhdGgoZmlsZVBhdGgpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICBwYXRoTWFwc0Zyb21EcmFnZ2FibGVFbnRyaWVzKGRyYWdnYWJsZUVudHJpZXMsIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgICBjb25zdCBwYXRoTWFwcyA9IGRyYWdnYWJsZUVudHJpZXMubWFwKGZ1bmN0aW9uKGRyYWdnYWJsZUVudHJ5KSB7XG4gICAgICBjb25zdCBwYXRoTWFwID0gcGF0aE1hcEZyb21EcmFnZ2FibGVFbnRyeShkcmFnZ2FibGVFbnRyeSwgc291cmNlUGF0aCwgdGFyZ2V0UGF0aCk7XG4gICAgICBcbiAgICAgIHJldHVybiBwYXRoTWFwO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHBhdGhNYXBzO1xuICB9XG5cbiAgcmV0cmlldmVNYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnkoKSB7XG4gICAgY29uc3QgbWFya2VkRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5ID0gbnVsbDtcblxuICAgIHJldHVybiBtYXJrZWREaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnk7XG4gIH1cblxuICByZXRyaWV2ZURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeU92ZXJsYXBwaW5nRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnkpIHtcbiAgICBjb25zdCBkaXJlY3RvcnlOYW1lRHJhZ2dhYmxlRW50cnlPdmVybGFwcGluZ0RyYWdnYWJsZUVudHJ5ID0gbnVsbDsgLy8vXG5cbiAgICByZXR1cm4gZGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5T3ZlcmxhcHBpbmdEcmFnZ2FibGVFbnRyeTtcbiAgfVxuXG4gIGluaXRpYWxpc2UoKSB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uUmVtb3ZlIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIHJlbW92ZUhhbmRsZXIgPSBvblJlbW92ZSwgLy8vXG4gICAgICAgICAgcnViYmlzaEJpbiA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoUnViYmlzaEJpbiwgcHJvcGVydGllcywgcmVtb3ZlSGFuZGxlcik7XG5cbiAgICBydWJiaXNoQmluLmluaXRpYWxpc2UoKTtcbiAgICBcbiAgICByZXR1cm4gcnViYmlzaEJpbjtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKFJ1YmJpc2hCaW4sIHtcbiAgdGFnTmFtZTogJ2RpdicsXG4gIGRlZmF1bHRQcm9wZXJ0aWVzOiB7XG4gICAgY2xhc3NOYW1lOiAncnViYmlzaEJpbidcbiAgfSxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25SZW1vdmUnXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJ1YmJpc2hCaW47XG5cbmZ1bmN0aW9uIHBhdGhNYXBGcm9tRHJhZ2dhYmxlRW50cnkoZHJhZ2dhYmxlRW50cnksIHNvdXJjZVBhdGgsIHRhcmdldFBhdGgpIHtcbiAgY29uc3QgZHJhZ2dhYmxlRW50cnlQYXRoID0gZHJhZ2dhYmxlRW50cnkuZ2V0UGF0aCgpLFxuICAgICAgICBkcmFnZ2FibGVFbnRyeURpcmVjdG9yeU5hbWVEcmFnZ2FibGVFbnRyeSA9IGRyYWdnYWJsZUVudHJ5LmlzRGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5KCksXG4gICAgICAgIGRpcmVjdG9yeSA9IGRyYWdnYWJsZUVudHJ5RGlyZWN0b3J5TmFtZURyYWdnYWJsZUVudHJ5OyAgLy8vXG5cbiAgdGFyZ2V0UGF0aCA9IG51bGw7ICAvLy9cblxuICBzb3VyY2VQYXRoID0gZHJhZ2dhYmxlRW50cnlQYXRoOyAgLy8vXG5cbiAgY29uc3QgcGF0aE1hcCA9IHtcbiAgICBzb3VyY2VQYXRoOiBzb3VyY2VQYXRoLFxuICAgIHRhcmdldFBhdGg6IHRhcmdldFBhdGgsXG4gICAgZGlyZWN0b3J5OiBkaXJlY3RvcnlcbiAgfTtcblxuICByZXR1cm4gcGF0aE1hcDtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHsgYXJyYXlVdGlsaXRpZXMgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgc2Vjb25kIH0gPSBhcnJheVV0aWxpdGllcztcblxuZnVuY3Rpb24gZXh0ZW5zaW9uRnJvbU5hbWUobmFtZSkge1xuICBsZXQgZXh0ZW5zaW9uID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXi4qXFwuKFteLl0rKSQvKTtcblxuICBpZiAobWF0Y2hlcyAhPT0gbnVsbCkge1xuICAgIGNvbnN0IHNlY29uZE1hdGNoID0gc2Vjb25kKG1hdGNoZXMpO1xuXG4gICAgZXh0ZW5zaW9uID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiBleHRlbnNpb247XG59XG5cbmZ1bmN0aW9uIG5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUobmFtZSkge1xuICBsZXQgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBuYW1lLm1hdGNoKC9eKC4rKVxcLlteLl0rJC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBuYW1lV2l0aG91dEV4dGVuc2lvbiA9IHNlY29uZE1hdGNoOyAgLy8vXG4gIH1cblxuICByZXR1cm4gbmFtZVdpdGhvdXRFeHRlbnNpb247XG59XG5cbmZ1bmN0aW9uIG5hbWVJc0JlZm9yZUVudHJ5TmFtZShuYW1lLCBlbnRyeU5hbWUpIHtcbiAgbGV0IGJlZm9yZSA9IChuYW1lLmxvY2FsZUNvbXBhcmUoZW50cnlOYW1lKSA8IDApO1xuXG4gIGNvbnN0IG5hbWVFeHRlbnNpb24gPSBleHRlbnNpb25Gcm9tTmFtZShuYW1lKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uID0gZXh0ZW5zaW9uRnJvbU5hbWUoZW50cnlOYW1lKSxcbiAgICAgICAgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lV2l0aG91dEV4dGVuc2lvbkZyb21OYW1lKG5hbWUpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVdpdGhvdXRFeHRlbnNpb25Gcm9tTmFtZShlbnRyeU5hbWUpLFxuICAgICAgICBuYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChuYW1lRXh0ZW5zaW9uICE9PSBudWxsKSxcbiAgICAgICAgZW50cnlOYW1lRXh0ZW5zaW9uUHJlc2VudCA9IChlbnRyeU5hbWVFeHRlbnNpb24gIT09IG51bGwpLFxuICAgICAgICBuYW1lV2l0aG91dEV4dGVuc2lvbk1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb24gPT09IG51bGwpLFxuICAgICAgICBlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZyA9IChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uID09PSBudWxsKSxcbiAgICAgICAgZXh0ZW5zaW9uc0JvdGhQcmVzZW50ID0gKG5hbWVFeHRlbnNpb25QcmVzZW50ICYmIGVudHJ5TmFtZUV4dGVuc2lvblByZXNlbnQpLFxuICAgICAgICBuYW1lc1dpdGhvdXRFeHRlbnNpb25zQm90aE1pc3NpbmcgPSAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nICYmIGVudHJ5TmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKTtcblxuICBpZiAobmFtZXNXaXRob3V0RXh0ZW5zaW9uc0JvdGhNaXNzaW5nKSB7XG4gICAgLy8vXG4gIH0gZWxzZSBpZiAobmFtZVdpdGhvdXRFeHRlbnNpb25NaXNzaW5nKSB7XG4gICAgYmVmb3JlID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChlbnRyeU5hbWVXaXRob3V0RXh0ZW5zaW9uTWlzc2luZykge1xuICAgIGJlZm9yZSA9IGZhbHNlO1xuICB9IGVsc2Uge1xuICAgIGlmIChleHRlbnNpb25zQm90aFByZXNlbnQpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbnNEaWZmZXIgPSAobmFtZUV4dGVuc2lvbiAhPT0gZW50cnlOYW1lRXh0ZW5zaW9uKTtcblxuICAgICAgaWYgKGV4dGVuc2lvbnNEaWZmZXIpIHtcbiAgICAgICAgYmVmb3JlID0gKG5hbWVFeHRlbnNpb24ubG9jYWxlQ29tcGFyZShlbnRyeU5hbWVFeHRlbnNpb24pIDwgMCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuYW1lRXh0ZW5zaW9uUHJlc2VudCkge1xuICAgICAgYmVmb3JlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChlbnRyeU5hbWVFeHRlbnNpb25QcmVzZW50KSB7XG4gICAgICBiZWZvcmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBiZWZvcmU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBleHRlbnNpb25Gcm9tTmFtZTogZXh0ZW5zaW9uRnJvbU5hbWUsXG4gIG5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWU6IG5hbWVXaXRob3V0RXh0ZW5zaW9uRnJvbU5hbWUsXG4gIG5hbWVJc0JlZm9yZUVudHJ5TmFtZTogbmFtZUlzQmVmb3JlRW50cnlOYW1lXG59O1xuIiwiIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgd2luZG93OiByZXF1aXJlKCcuL2xpYi93aW5kb3cnKSxcbiAgZG9jdW1lbnQ6IHJlcXVpcmUoJy4vbGliL2RvY3VtZW50JyksXG4gIERpdjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9kaXYnKSxcbiAgU3BhbjogcmVxdWlyZSgnLi9saWIvZWxlbWVudC9zcGFuJyksXG4gIEJvZHk6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYm9keScpLFxuICBMaW5rOiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2xpbmsnKSxcbiAgU2VsZWN0OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L3NlbGVjdCcpLFxuICBCdXR0b246IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQvYnV0dG9uJyksXG4gIENoZWNrYm94OiByZXF1aXJlKCcuL2xpYi9lbGVtZW50L2NoZWNrYm94JyksXG4gIEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2VsZW1lbnQnKSxcbiAgVGV4dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL3RleHRFbGVtZW50JyksXG4gIElucHV0OiByZXF1aXJlKCcuL2xpYi9pbnB1dEVsZW1lbnQvaW5wdXQnKSxcbiAgVGV4dGFyZWE6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudC90ZXh0YXJlYScpLFxuICBJbnB1dEVsZW1lbnQ6IHJlcXVpcmUoJy4vbGliL2lucHV0RWxlbWVudCcpLFxuICBCb3VuZHM6IHJlcXVpcmUoJy4vbGliL21pc2MvYm91bmRzJyksXG4gIE9mZnNldDogcmVxdWlyZSgnLi9saWIvbWlzYy9vZmZzZXQnKSxcbiAgUmVhY3Q6IHJlcXVpcmUoJy4vbGliL3JlYWN0Jylcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2V2ZW50JyksXG4gICAgICBjbGlja01peGluID0gcmVxdWlyZSgnLi9taXhpbi9jbGljaycpLFxuICAgICAgbW91c2VNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vbW91c2UnKSxcbiAgICAgIGtleU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9rZXknKTtcblxuY2xhc3MgRG9jdW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudDsgLy8vXG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGV2ZW50TWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIG1vdXNlTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihEb2N1bWVudC5wcm90b3R5cGUsIGtleU1peGluKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRG9jdW1lbnQoKTsgIC8vL1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuZWNlc3NhcnkgPSByZXF1aXJlKCduZWNlc3NhcnknKTtcblxuY29uc3QgT2Zmc2V0ID0gcmVxdWlyZSgnLi9taXNjL29mZnNldCcpLFxuICAgICAgQm91bmRzID0gcmVxdWlyZSgnLi9taXNjL2JvdW5kcycpLFxuICAgICAganN4TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2pzeCcpLFxuICAgICAgZXZlbnRNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vZXZlbnQnKSxcbiAgICAgIGNsaWNrTWl4aW4gPSByZXF1aXJlKCcuL21peGluL2NsaWNrJyksXG4gICAgICBzY3JvbGxNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vc2Nyb2xsJyksXG4gICAgICByZXNpemVNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vcmVzaXplJyksXG4gICAgICBtb3VzZU1peGluID0gcmVxdWlyZSgnLi9taXhpbi9tb3VzZScpLFxuICAgICAga2V5TWl4aW4gPSByZXF1aXJlKCcuL21peGluL2tleScpLFxuICAgICAgZG9tVXRpbGl0aWVzID0gcmVxdWlyZSgnLi91dGlsaXRpZXMvZG9tJyksXG4gICAgICBvYmplY3RVdGlsaXRpZXMgPSByZXF1aXJlKCcuL3V0aWxpdGllcy9vYmplY3QnKTtcblxuY29uc3QgeyBhcnJheSB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCwgYXVnbWVudCB9ID0gYXJyYXk7XG5cbmNsYXNzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3Rvcikge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvbVV0aWxpdGllcy5kb21FbGVtZW50RnJvbVNlbGVjdG9yKHNlbGVjdG9yKTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7IC8vL1xuICB9XG5cbiAgY2xvbmUoKSB7IHJldHVybiBFbGVtZW50LmNsb25lKHRoaXMpOyB9XG4gIFxuICBnZXRET01FbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRvbUVsZW1lbnQ7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoaW5jbHVkZUJvcmRlciA9IHRydWUpIHtcbiAgICBjb25zdCB3aWR0aCA9IGluY2x1ZGVCb3JkZXIgP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0V2lkdGggOlxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZG9tRWxlbWVudC5jbGllbnRXaWR0aDtcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHNldFdpZHRoKHdpZHRoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoOyB9XG5cbiAgZ2V0SGVpZ2h0KGluY2x1ZGVCb3JkZXIgPSB0cnVlKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW5jbHVkZUJvcmRlciA/XG4gICAgICAgICAgICAgICAgICAgICB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0SGVpZ2h0IDpcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBzZXRIZWlnaHQoaGVpZ2h0KSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQ7IH1cblxuICBoYXNBdHRyaWJ1dGUobmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50Lmhhc0F0dHJpYnV0ZShuYW1lKTsgfVxuXG4gIGdldEF0dHJpYnV0ZShuYW1lKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuZ2V0QXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7IHRoaXMuZG9tRWxlbWVudC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpOyB9XG5cbiAgY2xlYXJBdHRyaWJ1dGUobmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyB9XG5cbiAgYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7IHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKTsgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShuYW1lKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUobmFtZSk7IH1cblxuICBzZXRDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTsgfVxuXG4gIGFkZENsYXNzKGNsYXNzTmFtZSkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpOyB9XG5cbiAgcmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKSB7IHRoaXMuZG9tRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7IH1cblxuICB0b2dnbGVDbGFzcyhjbGFzc05hbWUpIHsgdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoY2xhc3NOYW1lKTsgfVxuXG4gIGhhc0NsYXNzKGNsYXNzTmFtZSkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpOyB9XG5cbiAgY2xlYXJDbGFzc2VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuY2xhc3NOYW1lID0gJyc7IH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgYWRkVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFkZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHByZXBlbmQoZWxlbWVudCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQsXG4gICAgICAgICAgZmlyc3RDaGlsZERPTUVsZW1lbnQgPSB0aGlzLmRvbUVsZW1lbnQuZmlyc3RDaGlsZDtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5pbnNlcnRCZWZvcmUoZG9tRWxlbWVudCwgZmlyc3RDaGlsZERPTUVsZW1lbnQpO1xuICB9XG5cbiAgYXBwZW5kKGVsZW1lbnQpIHtcbiAgICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgdGhpcy5kb21FbGVtZW50Lmluc2VydEJlZm9yZShkb21FbGVtZW50LCBudWxsKTsgLy8vXG4gIH1cblxuICBhZGQoZWxlbWVudCkgeyB0aGlzLmFwcGVuZChlbGVtZW50KTsgfVxuXG4gIHJlbW92ZShlbGVtZW50KSB7XG4gICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBlbGVtZW50LmRvbUVsZW1lbnQ7XG5cbiAgICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVDaGlsZChkb21FbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb21FbGVtZW50LnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3coZGlzcGxheVN0eWxlID0gJ2Jsb2NrJykgeyB0aGlzLmRpc3BsYXkoZGlzcGxheVN0eWxlKTsgfVxuXG4gIGhpZGUoKSB7IHRoaXMuZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9XG5cbiAgZGlzcGxheShkaXNwbGF5U3R5bGUpIHsgdGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5U3R5bGU7IH1cblxuICBlbmFibGUoKSB7IHRoaXMuY2xlYXJBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IH1cblxuICBkaXNhYmxlKCkgeyB0aGlzLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTsgfVxuXG4gIGlzRW5hYmxlZCgpIHtcbiAgICBjb25zdCBkaXNhYmxlZCA9IHRoaXMuaXNEaXNhYmxlZCgpLFxuICAgICAgICAgIGVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICByZXR1cm4gZW5hYmxlZDtcbiAgfVxuXG4gIGlzRGlzYWJsZWQoKSB7XG4gICAgY29uc3QgZGlzYWJsZWQgPSB0aGlzLmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgIHJldHVybiBkaXNhYmxlZDtcbiAgfVxuICBcbiAgaXNEaXNwbGF5ZWQoKSB7IHJldHVybiAodGhpcy5kb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgIT09ICdub25lJyk7IH0gICAgXG5cbiAgaHRtbChodG1sKSB7XG4gICAgaWYgKGh0bWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgaW5uZXJIVE1MID0gdGhpcy5kb21FbGVtZW50LmlubmVySFRNTDtcblxuICAgICAgaHRtbCA9IGlubmVySFRNTDsgLy8vXG5cbiAgICAgIHJldHVybiBodG1sO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbm5lckhUTUwgPSBodG1sOyAvLy9cblxuICAgICAgdGhpcy5kb21FbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTFxuICAgIH1cbiAgfVxuXG4gIGNzcyhjc3MpIHtcbiAgICBpZiAoY3NzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICBjc3MgPSB7fTtcblxuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGNvbXB1dGVkU3R5bGUubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBjb21wdXRlZFN0eWxlWzBdLCAgLy8vXG4gICAgICAgICAgICAgIHZhbHVlID0gY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpOyAvLy9cblxuICAgICAgICBjc3NbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNzcztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgbmFtZSA9IGNzczsgLy8vXG5cbiAgICAgIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuZG9tRWxlbWVudCksXG4gICAgICAgICAgICB2YWx1ZSA9IGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTsgLy8vXG5cbiAgICAgIGNzcyA9IHZhbHVlOyAgLy8vXG5cbiAgICAgIHJldHVybiBjc3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoY3NzKTsgLy8vXG5cbiAgICAgIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGNzc1tuYW1lXTtcblxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQuc3R5bGVbbmFtZV0gPSB2YWx1ZTtcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgYmx1cigpIHsgdGhpcy5kb21FbGVtZW50LmJsdXIoKTsgfVxuXG4gIGZvY3VzKCkgeyB0aGlzLmRvbUVsZW1lbnQuZm9jdXMoKTsgfVxuXG4gIGhhc0ZvY3VzKCkge1xuICAgIGNvbnN0IGZvY3VzID0gKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IHRoaXMuZG9tRWxlbWVudCk7ICAvLy9cblxuICAgIHJldHVybiBmb2N1cztcbiAgfVxuXG4gIGdldERlc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGRvbU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQsICAvLy9cbiAgICAgICAgICBkZXNjZW5kYW50RE9NTm9kZXMgPSBkb21VdGlsaXRpZXMuZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoZG9tTm9kZSksXG4gICAgICAgICAgZGVzY2VuZGFudERPTUVsZW1lbnRzID0gZG9tVXRpbGl0aWVzLmZpbHRlckRPTU5vZGVzQnlTZWxlY3RvcihkZXNjZW5kYW50RE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBkZXNjZW5kYW50RWxlbWVudHMgPSBkb21VdGlsaXRpZXMuZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoZGVzY2VuZGFudERPTUVsZW1lbnRzKTtcblxuICAgIHJldHVybiBkZXNjZW5kYW50RWxlbWVudHM7XG4gIH1cblxuICBnZXRDaGlsZEVsZW1lbnRzKHNlbGVjdG9yID0gJyonKSB7XG4gICAgY29uc3QgY2hpbGRET01Ob2RlcyA9IHRoaXMuZG9tRWxlbWVudC5jaGlsZE5vZGVzLFxuICAgICAgICAgIGNoaWxkRE9NRWxlbWVudHMgPSBkb21VdGlsaXRpZXMuZmlsdGVyRE9NTm9kZXNCeVNlbGVjdG9yKGNoaWxkRE9NTm9kZXMsIHNlbGVjdG9yKSxcbiAgICAgICAgICBjaGlsZEVsZW1lbnRzID0gZG9tVXRpbGl0aWVzLmVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGNoaWxkRE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGNoaWxkRWxlbWVudHM7XG4gIH1cblxuICBnZXRQYXJlbnRFbGVtZW50KHNlbGVjdG9yID0gJyonKSB7XG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHBhcmVudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChwYXJlbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudERPTUVsZW1lbnRzID0gW3BhcmVudERPTUVsZW1lbnRdLFxuICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50cyA9IGRvbVV0aWxpdGllcy5lbGVtZW50c0Zyb21ET01FbGVtZW50cyhwYXJlbnRET01FbGVtZW50cyksXG4gICAgICAgICAgICAgIGZpcnN0UGFyZW50RWxlbWVudCA9IGZpcnN0KHBhcmVudEVsZW1lbnRzKTtcblxuICAgICAgICBwYXJlbnRFbGVtZW50ID0gZmlyc3RQYXJlbnRFbGVtZW50IHx8IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudEVsZW1lbnQ7XG4gIH1cblxuICBnZXRBc2NlbmRhbnRFbGVtZW50cyhzZWxlY3RvciA9ICcqJykge1xuICAgIGNvbnN0IGFzY2VuZGFudERPTUVsZW1lbnRzID0gW10sXG4gICAgICAgICAgcGFyZW50RE9NRWxlbWVudCA9IHRoaXMuZG9tRWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgbGV0IGFzY2VuZGFudERPTUVsZW1lbnQgPSBwYXJlbnRET01FbGVtZW50OyAgLy8vXG4gICAgd2hpbGUgKGFzY2VuZGFudERPTUVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgIGlmIChhc2NlbmRhbnRET01FbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgIGFzY2VuZGFudERPTUVsZW1lbnRzLnB1c2goYXNjZW5kYW50RE9NRWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGFzY2VuZGFudERPTUVsZW1lbnQgPSBhc2NlbmRhbnRET01FbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgY29uc3QgYXNjZW5kYW50RWxlbWVudHMgPSBkb21VdGlsaXRpZXMuZWxlbWVudHNGcm9tRE9NRWxlbWVudHMoYXNjZW5kYW50RE9NRWxlbWVudHMpO1xuXG4gICAgcmV0dXJuIGFzY2VuZGFudEVsZW1lbnRzO1xuICB9XG5cbiAgZ2V0UHJldmlvdXNTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBwcmV2aW91c1NpYmxpbmdFbGVtZW50ID0gbnVsbDtcblxuICAgIGNvbnN0IHByZXZpb3VzU2libGluZ0RPTU5vZGUgPSB0aGlzLmRvbUVsZW1lbnQucHJldmlvdXNTaWJsaW5nOyAgLy8vXG5cbiAgICBpZiAoKHByZXZpb3VzU2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbVV0aWxpdGllcy5kb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKHByZXZpb3VzU2libGluZ0RPTU5vZGUsIHNlbGVjdG9yKSkge1xuICAgICAgcHJldmlvdXNTaWJsaW5nRWxlbWVudCA9IHByZXZpb3VzU2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldmlvdXNTaWJsaW5nRWxlbWVudDtcbiAgfVxuXG4gIGdldE5leHRTaWJsaW5nRWxlbWVudChzZWxlY3RvciA9ICcqJykge1xuICAgIGxldCBuZXh0U2libGluZ0VsZW1lbnQgPSBudWxsO1xuXG4gICAgY29uc3QgbmV4dFNpYmxpbmdET01Ob2RlID0gdGhpcy5kb21FbGVtZW50Lm5leHRTaWJsaW5nO1xuXG4gICAgaWYgKChuZXh0U2libGluZ0RPTU5vZGUgIT09IG51bGwpICYmIGRvbVV0aWxpdGllcy5kb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKG5leHRTaWJsaW5nRE9NTm9kZSwgc2VsZWN0b3IpKSB7XG4gICAgICBuZXh0U2libGluZ0VsZW1lbnQgPSBuZXh0U2libGluZ0RPTU5vZGUuX19lbGVtZW50X18gfHwgbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNpYmxpbmdFbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBkZWVwID0gdHJ1ZSxcbiAgICAgICAgICBkb21FbGVtZW50ID0gZWxlbWVudC5kb21FbGVtZW50LmNsb25lTm9kZShkZWVwKTtcblxuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KGRvbUVsZW1lbnQpO1xuICAgIHJlbWFpbmluZ0FyZ3VtZW50cy51bnNoaWZ0KG51bGwpO1xuXG4gICAgcmV0dXJuIG5ldyAoRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQuYXBwbHkoQ2xhc3MsIHJlbWFpbmluZ0FyZ3VtZW50cykpO1xuICB9XG5cbiAgc3RhdGljIGZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCBvdXRlckRPTUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIG91dGVyRE9NRWxlbWVudC5pbm5lckhUTUwgPSBodG1sOyAgLy8vXG5cbiAgICBjb25zdCBkb21FbGVtZW50ID0gb3V0ZXJET01FbGVtZW50LmZpcnN0Q2hpbGQ7XG5cbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChkb21FbGVtZW50KTtcbiAgICByZW1haW5pbmdBcmd1bWVudHMudW5zaGlmdChudWxsKTtcblxuICAgIHJldHVybiBuZXcgKEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmFwcGx5KENsYXNzLCByZW1haW5pbmdBcmd1bWVudHMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQoZG9tRWxlbWVudCk7XG4gICAgcmVtYWluaW5nQXJndW1lbnRzLnVuc2hpZnQobnVsbCk7XG5cbiAgICByZXR1cm4gbmV3IChGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShDbGFzcywgcmVtYWluaW5nQXJndW1lbnRzKSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBDbGFzcy50YWdOYW1lLFxuICAgICAgICAgIGh0bWwgPSBgPCR7dGFnTmFtZX0gLz5gLFxuICAgICAgICAgIGVsZW1lbnQgPSBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpLFxuICAgICAgICAgIGRlZmF1bHRQcm9wZXJ0aWVzID0gZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpLFxuICAgICAgICAgIGlnbm9yZWRQcm9wZXJ0aWVzID0gaWdub3JlZFByb3BlcnRpZXNGcm9tQ2xhc3MoQ2xhc3MpO1xuXG4gICAgZWxlbWVudC5hcHBseVByb3BlcnRpZXMocHJvcGVydGllcywgZGVmYXVsdFByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgc3RhdGljIGZyb21TdHJpbmcoc3RyaW5nLCBwcm9wZXJ0aWVzLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICBjb25zdCB0YWdOYW1lID0gc3RyaW5nLCAgLy8vXG4gICAgICAgICAgaHRtbCA9IGA8JHt0YWdOYW1lfSAvPmAsXG4gICAgICAgICAgZWxlbWVudCA9IEVsZW1lbnQuZnJvbUhUTUwoRWxlbWVudCwgaHRtbCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKSxcbiAgICAgICAgICBkZWZhdWx0UHJvcGVydGllcyA9IHt9LCAvLy9cbiAgICAgICAgICBpZ25vcmVkUHJvcGVydGllcyA9IFtdOyAvLy9cblxuICAgIGVsZW1lbnQuYXBwbHlQcm9wZXJ0aWVzKHByb3BlcnRpZXMsIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufVxuXG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBqc3hNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBldmVudE1peGluKTtcbk9iamVjdC5hc3NpZ24oRWxlbWVudC5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgc2Nyb2xsTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgcmVzaXplTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihFbGVtZW50LnByb3RvdHlwZSwgbW91c2VNaXhpbik7XG5PYmplY3QuYXNzaWduKEVsZW1lbnQucHJvdG90eXBlLCBrZXlNaXhpbik7XG5cbk9iamVjdC5hc3NpZ24oRWxlbWVudCwge1xuICBMRUZUX01PVVNFX0JVVFRPTjogMCxcbiAgUklHSFRfTU9VU0VfQlVUVE9OOiAyLFxuICBNSURETEVfTU9VU0VfQlVUVE9OOiAxXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50O1xuXG5mdW5jdGlvbiBkZWZhdWx0UHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcywgZGVmYXVsdFByb3BlcnRpZXMgPSB7fSkge1xuICBvYmplY3RVdGlsaXRpZXMuY29tYmluZShkZWZhdWx0UHJvcGVydGllcywgQ2xhc3MuZGVmYXVsdFByb3BlcnRpZXMpO1xuXG4gIGNvbnN0IHN1cGVyQ2xhc3MgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2xhc3MpO1xuXG4gIGlmIChzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgZGVmYXVsdFByb3BlcnRpZXNGcm9tQ2xhc3Moc3VwZXJDbGFzcywgZGVmYXVsdFByb3BlcnRpZXMpO1xuICB9XG5cbiAgcmV0dXJuIGRlZmF1bHRQcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBpZ25vcmVkUHJvcGVydGllc0Zyb21DbGFzcyhDbGFzcywgaWdub3JlZFByb3BlcnRpZXMgPSBbXSkge1xuICBhdWdtZW50KGlnbm9yZWRQcm9wZXJ0aWVzLCBDbGFzcy5pZ25vcmVkUHJvcGVydGllcyB8fCBbXSwgZnVuY3Rpb24oaWdub3JlZFByb3BlcnR5KSB7XG4gICAgcmV0dXJuICFpZ25vcmVkUHJvcGVydGllcy5pbmNsdWRlcyhpZ25vcmVkUHJvcGVydHkpO1xuICB9KTtcblxuICBjb25zdCBzdXBlckNsYXNzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKENsYXNzKTtcblxuICBpZiAoc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIGlnbm9yZWRQcm9wZXJ0aWVzRnJvbUNsYXNzKHN1cGVyQ2xhc3MsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHJldHVybiBpZ25vcmVkUHJvcGVydGllcztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgQm9keSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciA9ICdib2R5Jykge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcbiAgfVxuXG4gIGNsb25lKCkgeyByZXR1cm4gQm9keS5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmNsb25lKEJvZHksIGVsZW1lbnQpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQm9keSwgaHRtbCk7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChCb2R5LCBkb21FbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKEJvZHksIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oQm9keSwge1xuICB0YWdOYW1lOiAnYm9keSdcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJvZHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEJ1dHRvbi5jbG9uZSh0aGlzLCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgb25DbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2xpY2tIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcikge1xuICAgIHN1cGVyLm9uQ2xpY2soY2xpY2tIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNsaWNrSGFuZGxlcik7XG4gIH1cblxuICBvZmZDbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCkge1xuICAgIHN1cGVyLm9mZkNsaWNrKGNsaWNrSGFuZGxlciwgb2JqZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQnV0dG9uLCBlbGVtZW50LCBjbGlja0hhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNsaWNrSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChCdXR0b24sIGh0bWwsIGNsaWNrSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmZyb21ET01FbGVtZW50KEJ1dHRvbiwgZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2ssIC8vL1xuICAgICAgICAgIGJ1dHRvbiA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQnV0dG9uLCBwcm9wZXJ0aWVzLCBjbGlja0hhbmRsZXIpO1xuICAgIFxuICAgIHJldHVybiBidXR0b247XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihCdXR0b24sIHtcbiAgdGFnTmFtZTogJ2J1dHRvbicsXG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2xpY2snXG4gIF1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihjbGlja0hhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuICBcbiAgY2xpY2tIYW5kbGVyKG1vdXNlQnV0dG9uLCBldmVudCwgdGFyZ2V0RWxlbWVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCcuLi9lbGVtZW50Jyk7XG5cbmNsYXNzIENoZWNrYm94IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyLCBjaGVja2VkKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKGNoZWNrZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jaGVjayhjaGVja2VkKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBDaGVja2JveC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIG9uQ2hhbmdlKGNoYW5nZUhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vbignY2xpY2snLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIpOyAgLy8vXG4gIH1cbiAgXG4gIG9mZkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBvYmplY3QpIHtcbiAgICB0aGlzLm9mZignY2xpY2snLCBjaGFuZ2VIYW5kbGVyLCBvYmplY3QpOyAgLy8vXG4gIH1cblxuICBjaGVjayhjaGVja2VkID0gdHJ1ZSkge1xuICAgIGNoZWNrZWQgP1xuICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpIDpcbiAgICAgICAgdGhpcy5jbGVhckF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xuICB9XG5cbiAgaXNDaGVja2VkKCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcbiAgICAgICAgY2hlY2tlZCA9IGRvbUVsZW1lbnQuY2hlY2tlZDtcblxuICAgIHJldHVybiBjaGVja2VkO1xuICB9XG5cbiAgb25SZXNpemUoKSB7fVxuXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoQ2hlY2tib3gsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoQ2hlY2tib3gsIGh0bWwsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoQ2hlY2tib3gsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHtcbiAgICBjb25zdCB7IG9uQ2hhbmdlLCBjaGVja2VkIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNoYW5nZUhhbmRsZXIgPSBvbkNoYW5nZSwgLy8vICAgIFxuICAgICAgICAgIGNoZWNrYm94ID0gRWxlbWVudC5mcm9tUHJvcGVydGllcyhDaGVja2JveCwgcHJvcGVydGllcywgY2hhbmdlSGFuZGxlciwgY2hlY2tlZCk7XG4gICAgXG4gICAgcmV0dXJuIGNoZWNrYm94O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oQ2hlY2tib3gsIHtcbiAgdGFnTmFtZTogJ2lucHV0JyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DaGFuZ2UnLFxuICAgICdjaGVja2VkJ1xuICBdLFxuICBkZWZhdWx0UHJvcGVydGllczoge1xuICAgIHR5cGU6ICdjaGVja2JveCdcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hlY2tib3g7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGNoYW5nZUhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGNoZWNrYm94ID0gdGFyZ2V0RWxlbWVudCwgLy8vXG4gICAgICAgIGNoZWNrZWQgPSBjaGVja2JveC5pc0NoZWNrZWQoKTtcbiAgXG4gIGNoYW5nZUhhbmRsZXIoY2hlY2tlZCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi4vZWxlbWVudCcpO1xuXG5jbGFzcyBEaXYgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3Ioc2VsZWN0b3IpIHtcbiAgICBzdXBlcihzZWxlY3Rvcik7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIERpdi5jbG9uZSh0aGlzKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50KSB7IHJldHVybiBFbGVtZW50LmNsb25lKERpdiwgZWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCkgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChEaXYsIGh0bWwpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoRGl2LCBkb21FbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKERpdiwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihEaXYsIHtcbiAgdGFnTmFtZTogJ2Rpdidcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERpdjtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgTGluayBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2xpY2tIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNsaWNrSGFuZGxlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLm9uQ2xpY2soY2xpY2tIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjbGlja0hhbmRsZXIpIHsgcmV0dXJuIExpbmsuY2xvbmUodGhpcywgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIG9uQ2xpY2soY2xpY2tIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNsaWNrSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIpIHtcbiAgICB0aGlzLm9uKCdjbGljaycsIGNsaWNrSGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVDbGlja0hhbmRsZXIpO1xuICB9XG4gIFxuICBvZmZDbGljayhjbGlja0hhbmRsZXIsIG9iamVjdCkge1xuICAgIHRoaXMub2ZmKCdjbGljaycsIGNsaWNrSGFuZGxlciwgb2JqZWN0KTtcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuY2xvbmUoTGluaywgZWxlbWVudCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sLCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbUhUTUwoTGluaywgaHRtbCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjbGlja0hhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoTGluaywgZG9tRWxlbWVudCwgY2xpY2tIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSBwcm9wZXJ0aWVzLFxuICAgICAgICAgIGNsaWNrSGFuZGxlciA9IG9uQ2xpY2ssIC8vL1xuICAgICAgICAgIGxpbmsgPSBFbGVtZW50LmZyb21Qcm9wZXJ0aWVzKExpbmssIHByb3BlcnRpZXMsIGNsaWNrSGFuZGxlcik7XG4gICAgXG4gICAgcmV0dXJuIGxpbms7XG4gIH1cbn1cblxuT2JqZWN0LmFzc2lnbihMaW5rLCB7XG4gIHRhZ05hbWU6ICdhJyxcbiAgaWdub3JlZFByb3BlcnRpZXM6IFtcbiAgICAnb25DbGljaydcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTGluaztcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUNsaWNrSGFuZGxlcihjbGlja0hhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGxpbmsgPSB0YXJnZXRFbGVtZW50LCAvLy9cbiAgICAgICAgaHJlZiA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gIFxuICBjbGlja0hhbmRsZXIoaHJlZiwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xufSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU2VsZWN0IGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKHNlbGVjdG9yLCBjaGFuZ2VIYW5kbGVyKSB7XG4gICAgc3VwZXIoc2VsZWN0b3IpO1xuXG4gICAgaWYgKGNoYW5nZUhhbmRsZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5vbkNoYW5nZShjaGFuZ2VIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBTZWxlY3QuY2xvbmUodGhpcywgY2hhbmdlSGFuZGxlcik7IH1cblxuICBvbkNoYW5nZShjaGFuZ2VIYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUNoYW5nZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcikge1xuICAgIHRoaXMub24oJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlciwgb2JqZWN0KSB7XG4gICAgdGhpcy5vZmYoJ2NoYW5nZScsIGNoYW5nZUhhbmRsZXIsIG9iamVjdCk7XG4gIH1cblxuICBnZXRTZWxlY3RlZE9wdGlvblZhbHVlKCkge1xuICAgIGNvbnN0IGRvbUVsZW1lbnQgPSB0aGlzLmdldERPTUVsZW1lbnQoKSxcbiAgICAgICAgICBzZWxlY3RlZE9wdGlvblZhbHVlID0gZG9tRWxlbWVudC52YWx1ZTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBzZWxlY3RlZE9wdGlvblZhbHVlO1xuICB9XG5cbiAgc2V0U2VsZWN0ZWRPcHRpb25CeVZhbHVlKHNlbGVjdGVkT3B0aW9uVmFsdWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHNlbGVjdGVkT3B0aW9uVmFsdWUsICAvLy9cbiAgICAgICAgICBkb21FbGVtZW50ID0gdGhpcy5nZXRET01FbGVtZW50KCk7XG4gICAgXG4gICAgZG9tRWxlbWVudC52YWx1ZSA9IHZhbHVlOyBcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBFbGVtZW50LmNsb25lKFNlbGVjdCwgZWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gRWxlbWVudC5mcm9tSFRNTChTZWxlY3QsIGh0bWwsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU2VsZWN0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2UsIC8vL1xuICAgICAgICAgIHNlbGVjdCA9IEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoU2VsZWN0LCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyKTtcbiAgICBcbiAgICByZXR1cm4gc2VsZWN0O1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oU2VsZWN0LCB7XG4gIHRhZ05hbWU6ICdzZWxlY3QnLFxuICBpZ25vcmVkUHJvcGVydGllczogW1xuICAgICdvbkNoYW5nZSdcbiAgXVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2VsZWN0O1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcihjaGFuZ2VIYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBzZWxlY3QgPSB0YXJnZXRFbGVtZW50LCAvLy9cbiAgICAgICAgc2VsZWN0ZWRPcHRpb25WYWx1ZSA9IHNlbGVjdC5nZXRTZWxlY3RlZE9wdGlvblZhbHVlKCk7XG4gIFxuICBjaGFuZ2VIYW5kbGVyKHNlbGVjdGVkT3B0aW9uVmFsdWUsIGV2ZW50LCB0YXJnZXRFbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJy4uL2VsZW1lbnQnKTtcblxuY2xhc3MgU3BhbiBleHRlbmRzIEVsZW1lbnQge1xuICBjbG9uZSgpIHsgcmV0dXJuIFNwYW4uY2xvbmUodGhpcyk7IH1cblxuICBvblJlc2l6ZSgpIHt9XG5cbiAgb2ZmUmVzaXplKCkge31cblxuICBzdGF0aWMgY2xvbmUoZWxlbWVudCkgeyByZXR1cm4gRWxlbWVudC5jbG9uZShTcGFuLCBlbGVtZW50KTsgfVxuXG4gIHN0YXRpYyBmcm9tSFRNTChodG1sKSB7IHJldHVybiBFbGVtZW50LmZyb21IVE1MKFNwYW4sIGh0bWwpOyB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KGRvbUVsZW1lbnQpIHsgcmV0dXJuIEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoU3BhbiwgZG9tRWxlbWVudCk7IH1cblxuICBzdGF0aWMgZnJvbVByb3BlcnRpZXMocHJvcGVydGllcykgeyByZXR1cm4gRWxlbWVudC5mcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKTsgfVxufVxuXG5PYmplY3QuYXNzaWduKFNwYW4sIHtcbiAgdGFnTmFtZTogJ3NwYW4nXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTcGFuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50Jyk7XG5cbmNsYXNzIElucHV0RWxlbWVudCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihzZWxlY3RvciwgY2hhbmdlSGFuZGxlcikge1xuICAgIHN1cGVyKHNlbGVjdG9yKTtcblxuICAgIGlmIChjaGFuZ2VIYW5kbGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UoY2hhbmdlSGFuZGxlcik7XG4gICAgfVxuICB9XG5cbiAgb25SZXNpemUoKSB7fVxuXG4gIG9mZlJlc2l6ZSgpIHt9XG5cbiAgb25DaGFuZ2UoY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKSB7XG4gICAgdGhpcy5vbignY2hhbmdlJywgY2hhbmdlSGFuZGxlciwgaW50ZXJtZWRpYXRlQ2hhbmdlSGFuZGxlcik7XG4gIH1cblxuICBvZmZDaGFuZ2UoY2hhbmdlSGFuZGxlcikge1xuICAgIHRoaXMub2ZmKCdjaGFuZ2UnLCBjaGFuZ2VIYW5kbGVyKTtcbiAgfVxuXG4gIGdldFZhbHVlKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnZhbHVlOyB9XG5cbiAgZ2V0U2VsZWN0aW9uU3RhcnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7IH1cblxuICBnZXRTZWxlY3Rpb25FbmQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uRW5kOyB9XG4gIFxuICBpc1JlYWRPbmx5KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnJlYWRPbmx5OyB9XG5cbiAgc2V0VmFsdWUodmFsdWUpIHsgdGhpcy5kb21FbGVtZW50LnZhbHVlID0gdmFsdWU7IH1cblxuICBzZXRTZWxlY3Rpb25TdGFydChzZWxlY3Rpb25TdGFydCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3Rpb25TdGFydDsgfVxuXG4gIHNldFNlbGVjdGlvbkVuZChzZWxlY3Rpb25FbmQpIHsgdGhpcy5kb21FbGVtZW50LnNlbGVjdGlvbkVuZCA9IHNlbGVjdGlvbkVuZDsgfVxuXG4gIHNldFJlYWRPbmx5KHJlYWRPbmx5KSB7IHRoaXMuZG9tRWxlbWVudC5yZWFkT25seSA9IHJlYWRPbmx5OyB9XG5cbiAgc2VsZWN0KCkgeyB0aGlzLmRvbUVsZW1lbnQuc2VsZWN0KCk7IH1cblxuICBzdGF0aWMgY2xvbmUoQ2xhc3MsIGVsZW1lbnQsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmNsb25lKENsYXNzLCBlbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG4gIFxuICBzdGF0aWMgZnJvbUhUTUwoQ2xhc3MsIGh0bWwsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIHJldHVybiBFbGVtZW50LmZyb21IVE1MKENsYXNzLCBodG1sLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG5cbiAgc3RhdGljIGZyb21ET01FbGVtZW50KENsYXNzLCBkb21FbGVtZW50LCAuLi5yZW1haW5pbmdBcmd1bWVudHMpIHtcbiAgICByZXR1cm4gRWxlbWVudC5mcm9tRE9NRWxlbWVudChDbGFzcywgZG9tRWxlbWVudCwgLi4ucmVtYWluaW5nQXJndW1lbnRzKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhDbGFzcywgcHJvcGVydGllcywgLi4ucmVtYWluaW5nQXJndW1lbnRzKSB7XG4gICAgY29uc3QgeyBvbkNoYW5nZSB9ID0gcHJvcGVydGllcyxcbiAgICAgICAgICBjaGFuZ2VIYW5kbGVyID0gb25DaGFuZ2U7IC8vL1xuXG4gICAgcmV0dXJuIEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoQ2xhc3MsIHByb3BlcnRpZXMsIGNoYW5nZUhhbmRsZXIsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cyk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVN0cmluZyhzdHJpbmcsIHByb3BlcnRpZXMsIC4uLnJlbWFpbmluZ0FyZ3VtZW50cykge1xuICAgIGNvbnN0IHsgb25DaGFuZ2UgfSA9IHByb3BlcnRpZXMsXG4gICAgICAgICAgY2hhbmdlSGFuZGxlciA9IG9uQ2hhbmdlOyAvLy9cblxuICAgIHJldHVybiBFbGVtZW50LmZyb21TdHJpbmcoc3RyaW5nLCBwcm9wZXJ0aWVzLCBjaGFuZ2VIYW5kbGVyLCAuLi5yZW1haW5pbmdBcmd1bWVudHMpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oSW5wdXRFbGVtZW50LCB7XG4gIGlnbm9yZWRQcm9wZXJ0aWVzOiBbXG4gICAgJ29uQ2hhbmdlJ1xuICBdXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnB1dEVsZW1lbnQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVDaGFuZ2VIYW5kbGVyKGNoYW5nZUhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGlucHV0RWxlbWVudCA9IHRhcmdldEVsZW1lbnQsIC8vL1xuICAgICAgICB2YWx1ZSA9IGlucHV0RWxlbWVudC5nZXRWYWx1ZSgpO1xuICBcbiAgY2hhbmdlSGFuZGxlcih2YWx1ZSwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBJbnB1dEVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnB1dEVsZW1lbnQnKTtcblxuY2xhc3MgSW5wdXQgZXh0ZW5kcyBJbnB1dEVsZW1lbnQge1xuICBjbG9uZShjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dC5jbG9uZSh0aGlzLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBjbG9uZShlbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuY2xvbmUoSW5wdXQsIGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21IVE1MKGh0bWwsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tSFRNTChJbnB1dCwgaHRtbCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbURPTUVsZW1lbnQoZG9tRWxlbWVudCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21ET01FbGVtZW50KElucHV0LCBkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvcGVydGllcyhwcm9wZXJ0aWVzKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbVByb3BlcnRpZXMoSW5wdXQsIHByb3BlcnRpZXMpOyB9XG59XG5cbk9iamVjdC5hc3NpZ24oSW5wdXQsIHtcbiAgdGFnTmFtZTogJ2lucHV0J1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IElucHV0RWxlbWVudCA9IHJlcXVpcmUoJy4uL2lucHV0RWxlbWVudCcpO1xuXG5jbGFzcyBUZXh0YXJlYSBleHRlbmRzIElucHV0RWxlbWVudCB7XG4gIGNsb25lKGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIFRleHRhcmVhLmNsb25lKHRoaXMsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGNsb25lKGVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpIHsgcmV0dXJuIElucHV0RWxlbWVudC5jbG9uZShUZXh0YXJlYSwgZWxlbWVudCwgY2hhbmdlSGFuZGxlcik7IH1cblxuICBzdGF0aWMgZnJvbUhUTUwoaHRtbCwgY2hhbmdlSGFuZGxlcikgeyByZXR1cm4gSW5wdXRFbGVtZW50LmZyb21IVE1MKFRleHRhcmVhLCBodG1sLCBjaGFuZ2VIYW5kbGVyKTsgfVxuXG4gIHN0YXRpYyBmcm9tRE9NRWxlbWVudChkb21FbGVtZW50LCBjaGFuZ2VIYW5kbGVyKSB7IHJldHVybiBJbnB1dEVsZW1lbnQuZnJvbURPTUVsZW1lbnQoVGV4dGFyZWEsIGRvbUVsZW1lbnQsIGNoYW5nZUhhbmRsZXIpOyB9XG5cbiAgc3RhdGljIGZyb21Qcm9wZXJ0aWVzKHByb3BlcnRpZXMpIHsgcmV0dXJuIElucHV0RWxlbWVudC5mcm9tUHJvcGVydGllcyhUZXh0YXJlYSwgcHJvcGVydGllcyk7IH1cbn1cblxuT2JqZWN0LmFzc2lnbihUZXh0YXJlYSwge1xuICB0YWdOYW1lOiAndGV4dGFyZWEnXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0YXJlYTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgQm91bmRzIHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0LCBib3R0b20sIHJpZ2h0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgICB0aGlzLmJvdHRvbSA9IGJvdHRvbTtcbiAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XG4gIH1cblxuICBnZXRUb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9wO1xuICB9XG5cbiAgZ2V0TGVmdCgpIHtcbiAgICByZXR1cm4gdGhpcy5sZWZ0O1xuICB9XG5cbiAgZ2V0Qm90dG9tKCkge1xuICAgIHJldHVybiB0aGlzLmJvdHRvbTtcbiAgfVxuXG4gIGdldFJpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0O1xuICB9XG5cbiAgaXNPdmVybGFwcGluZ01vdXNlKG1vdXNlVG9wLCBtb3VzZUxlZnQpIHtcbiAgICByZXR1cm4gKCAgKHRoaXMudG9wIDwgbW91c2VUb3ApICYmXG4gICAgICAgICAgICAgICh0aGlzLmxlZnQgPCBtb3VzZUxlZnQpICYmXG4gICAgICAgICAgICAgICh0aGlzLmJvdHRvbSA+IG1vdXNlVG9wKSAmJlxuICAgICAgICAgICAgICAodGhpcy5yaWdodCA+IG1vdXNlTGVmdCkgICk7XG4gIH1cblxuICBhcmVPdmVybGFwcGluZyhib3VuZHMpIHtcbiAgICByZXR1cm4gKCAgKHRoaXMudG9wIDwgYm91bmRzLmJvdHRvbSkgJiZcbiAgICAgICAgICAgICAgKHRoaXMubGVmdCA8IGJvdW5kcy5yaWdodCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMuYm90dG9tID4gYm91bmRzLnRvcCkgJiZcbiAgICAgICAgICAgICAgKHRoaXMucmlnaHQgPiBib3VuZHMubGVmdCkgICk7XG4gIH1cblxuICBzdGF0aWMgZnJvbUJvdW5kaW5nQ2xpZW50UmVjdChib3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICBjb25zdCB3aW5kb3dTY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQsIC8vL1xuICAgICAgICAgIHdpbmRvd1Njcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQsICAvLy9cbiAgICAgICAgICB0b3AgPSBib3VuZGluZ0NsaWVudFJlY3QudG9wICsgd2luZG93U2Nyb2xsVG9wLFxuICAgICAgICAgIGxlZnQgPSBib3VuZGluZ0NsaWVudFJlY3QubGVmdCArIHdpbmRvd1Njcm9sbExlZnQsXG4gICAgICAgICAgYm90dG9tID0gYm91bmRpbmdDbGllbnRSZWN0LmJvdHRvbSArIHdpbmRvd1Njcm9sbFRvcCxcbiAgICAgICAgICByaWdodCA9IGJvdW5kaW5nQ2xpZW50UmVjdC5yaWdodCArIHdpbmRvd1Njcm9sbExlZnQsXG4gICAgICAgICAgYm91bmRzID0gbmV3IEJvdW5kcyh0b3AsIGxlZnQsIGJvdHRvbSwgcmlnaHQpO1xuXG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvdW5kcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3MgT2Zmc2V0IHtcbiAgY29uc3RydWN0b3IodG9wLCBsZWZ0KSB7XG4gICAgdGhpcy50b3AgPSB0b3A7XG4gICAgdGhpcy5sZWZ0ID0gbGVmdDtcbiAgfVxuXG4gIGdldFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy50b3A7XG4gIH1cblxuICBnZXRMZWZ0KCkge1xuICAgIHJldHVybiB0aGlzLmxlZnQ7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBPZmZzZXQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uQ2xpY2soaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignY2xpY2snLCBoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZDbGljayhoYW5kbGVyLCBvYmplY3QpIHsgdGhpcy5vZmYoJ2NsaWNrJywgaGFuZGxlciwgb2JqZWN0KTsgfVxuXG5jb25zdCBjbGlja01peGluID0ge1xuICBvbkNsaWNrOiBvbkNsaWNrLFxuICBvZmZDbGljazogb2ZmQ2xpY2tcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY2xpY2tNaXhpbjtcblxuZnVuY3Rpb24gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIoaGFuZGxlciwgZXZlbnQsIHRhcmdldEVsZW1lbnQpIHtcbiAgY29uc3QgbW91c2VUb3AgPSBldmVudC5wYWdlWSwgIC8vL1xuICAgICAgICBtb3VzZUxlZnQgPSBldmVudC5wYWdlWCwgLy8vXG4gICAgICAgIG1vdXNlQnV0dG9uID0gZXZlbnQuYnV0dG9uOyAvLy9cbiAgXG4gIGhhbmRsZXIobW91c2VUb3AsIG1vdXNlTGVmdCwgbW91c2VCdXR0b24sIGV2ZW50LCB0YXJnZXRFbGVtZW50KTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb24oZXZlbnRUeXBlcywgaGFuZGxlciwgb2JqZWN0ID0gbnVsbCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IG51bGwpIHtcbiAgZXZlbnRUeXBlcyA9IGV2ZW50VHlwZXMuc3BsaXQoJyAnKTsgLy8vXG5cbiAgZXZlbnRUeXBlcy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50VHlwZSkge1xuICAgIGNvbnN0IGV2ZW50TGlzdGVuZXIgPSB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCBoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xuICAgIFxuICAgIHRoaXMuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIG9mZihldmVudFR5cGVzLCBoYW5kbGVyLCBvYmplY3QgPSBudWxsKSB7XG4gIGV2ZW50VHlwZXMgPSBldmVudFR5cGVzLnNwbGl0KCcgJyk7IC8vL1xuXG4gIGV2ZW50VHlwZXMuZm9yRWFjaChmdW5jdGlvbihldmVudFR5cGUpIHtcbiAgICBjb25zdCBldmVudExpc3RlbmVyID0gdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgb2JqZWN0KTtcblxuICAgIHRoaXMuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgZXZlbnRMaXN0ZW5lcik7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmNvbnN0IGV2ZW50TWl4aW4gPSB7XG4gIG9uOiBvbixcbiAgb2ZmOiBvZmYsXG4gIGFkZEV2ZW50TGlzdGVuZXI6IGFkZEV2ZW50TGlzdGVuZXIsXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXI6IHJlbW92ZUV2ZW50TGlzdGVuZXJcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZXZlbnRNaXhpbjtcblxuZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoJ2V2ZW50TGlzdGVuZXJzJykpIHtcbiAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0gW107XG4gIH1cbiAgXG4gIGNvbnN0IHRhcmdldEVsZW1lbnQgPSB0aGlzLCAvLy9cbiAgICAgICAgZXZlbnRMaXN0ZW5lcnMgPSB0aGlzLmV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBldmVudExpc3RlbmVyID0gY3JlYXRlRXZlbnRMaXN0ZW5lcih0YXJnZXRFbGVtZW50LCBldmVudFR5cGUsIGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG5cbiAgZXZlbnRMaXN0ZW5lcnMucHVzaChldmVudExpc3RlbmVyKTtcblxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIG9iamVjdCkge1xuICBjb25zdCBldmVudExpc3RlbmVycyA9IHRoaXMuZXZlbnRMaXN0ZW5lcnMsXG4gICAgICAgIGV2ZW50TGlzdGVuZXIgPSBmaW5kRXZlbnRMaXN0ZW5lcihldmVudExpc3RlbmVycywgZXZlbnRUeXBlLCBoYW5kbGVyLCBvYmplY3QpLFxuICAgICAgICBpbmRleCA9IGV2ZW50TGlzdGVuZXJzLmluZGV4T2YoZXZlbnRMaXN0ZW5lciksXG4gICAgICAgIHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgZGVsZXRlQ291bnQgPSAxO1xuXG4gIGV2ZW50TGlzdGVuZXJzLnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuXG4gIGlmIChldmVudExpc3RlbmVycy5sZW5ndGggPT09IDApIHtcbiAgICBkZWxldGUgdGhpcy5ldmVudExpc3RlbmVycztcbiAgfVxuICBcbiAgcmV0dXJuIGV2ZW50TGlzdGVuZXI7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUV2ZW50TGlzdGVuZXIodGFyZ2V0RWxlbWVudCwgZXZlbnRUeXBlLCBoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgbGV0IGV2ZW50TGlzdGVuZXI7XG4gIFxuICBpZiAoaW50ZXJtZWRpYXRlSGFuZGxlciA9PT0gbnVsbCkge1xuICAgIGV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaGFuZGxlci5jYWxsKG9iamVjdCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBldmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGludGVybWVkaWF0ZUhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaGFuZGxlci5jYWxsKG9iamVjdCwgLi4uYXJndW1lbnRzKTtcbiAgICAgIH0sIGV2ZW50LCB0YXJnZXRFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuYXNzaWduKGV2ZW50TGlzdGVuZXIsIHtcbiAgICBldmVudFR5cGU6IGV2ZW50VHlwZSxcbiAgICBoYW5kbGVyOiBoYW5kbGVyLFxuICAgIG9iamVjdDogb2JqZWN0XG4gIH0pO1xuXG4gIHJldHVybiBldmVudExpc3RlbmVyO1xufVxuXG5mdW5jdGlvbiBmaW5kRXZlbnRMaXN0ZW5lcihldmVudExpc3RlbmVycywgZXZlbnRUeXBlLCBoYW5kbGVyLCBvYmplY3QpIHtcbiAgY29uc3QgZXZlbnRMaXN0ZW5lciA9IGV2ZW50TGlzdGVuZXJzLmZpbmQoZnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikge1xuICAgIGNvbnN0IGZvdW5kID0gKCAoZXZlbnRMaXN0ZW5lci5vYmplY3QgPT09IG9iamVjdCkgJiYgXG4gICAgICAgICAgICAgICAgICAgIChldmVudExpc3RlbmVyLmhhbmRsZXIgPT09IGhhbmRsZXIpICYmIFxuICAgICAgICAgICAgICAgICAgICAoZXZlbnRMaXN0ZW5lci5ldmVudFR5cGUgPT09IGV2ZW50VHlwZSkgKTsgIC8vL1xuICAgIFxuICAgIHJldHVybiBmb3VuZDtcbiAgfSk7XG4gIFxuICByZXR1cm4gZXZlbnRMaXN0ZW5lcjtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IFRleHRFbGVtZW50ID0gcmVxdWlyZSgnLi4vdGV4dEVsZW1lbnQnKSxcbiAgICAgIG9iamVjdFV0aWxpdGllcyA9IHJlcXVpcmUoJy4uL3V0aWxpdGllcy9vYmplY3QnKTtcblxuY29uc3QgeyBhcnJheSB9ID0gbmVjZXNzYXJ5LFxuICAgICAgeyBmaXJzdCB9ID0gYXJyYXk7XG5cbmZ1bmN0aW9uIGFwcGx5UHJvcGVydGllcyhwcm9wZXJ0aWVzID0ge30sIGRlZmF1bHRQcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcykge1xuICBvYmplY3RVdGlsaXRpZXMuY29tYmluZShwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHNGcm9tRWxlbWVudEFuZFByb3BlcnRpZXModGhpcywgcHJvcGVydGllcyk7XG5cbiAgb2JqZWN0VXRpbGl0aWVzLnBydW5lKHByb3BlcnRpZXMsIGlnbm9yZWRQcm9wZXJ0aWVzKTtcblxuICBjb25zdCBuYW1lcyA9IE9iamVjdC5rZXlzKHByb3BlcnRpZXMpOyAgLy8vXG5cbiAgbmFtZXMuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgY29uc3QgdmFsdWUgPSBwcm9wZXJ0aWVzW25hbWVdO1xuXG4gICAgaWYgKGZhbHNlKSB7XG5cbiAgICB9IGVsc2UgaWYgKGlzSGFuZGxlck5hbWUobmFtZSkpIHtcbiAgICAgIGFkZEhhbmRsZXIodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoaXNBdHRyaWJ1dGVOYW1lKG5hbWUpKSB7XG4gICAgICBhZGRBdHRyaWJ1dGUodGhpcywgbmFtZSwgdmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkoJ3Byb3BlcnRpZXMnKSkge1xuICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLCB7XG4gICAgICAgICAgcHJvcGVydGllczogcHJvcGVydGllc1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcm9wZXJ0aWVzW25hbWVdID0gdmFsdWU7XG4gICAgfVxuICB9LmJpbmQodGhpcykpO1xuXG4gIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzOyAvLy9cblxuICBjaGlsZEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24oY2hpbGRFbGVtZW50KSB7XG4gICAgY2hpbGRFbGVtZW50LmFkZFRvKHBhcmVudEVsZW1lbnQpO1xuXG4gICAgdXBkYXRlUGFyZW50Q29udGV4dChjaGlsZEVsZW1lbnQsIHBhcmVudEVsZW1lbnQpO1xuICB9LmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKCkge1xuICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDb250ZXh0KCkge1xuICByZXR1cm4gdGhpcy5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgcmV0dXJuIHRoaXMuc3RhdGU7XG59XG5cbmZ1bmN0aW9uIHNldFN0YXRlKHN0YXRlKSB7XG4gIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gZnJvbVN0YXRlKG5hbWUpIHtcbiAgY29uc3QgdmFsdWUgPSB0aGlzLnN0YXRlW25hbWVdO1xuXG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU3RhdGUodXBkYXRlKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcy5zdGF0ZSwgdXBkYXRlKTtcbn1cblxuZnVuY3Rpb24gYXNzaWduQ29udGV4dChuYW1lcywgdGhlbkRlbGV0ZSkge1xuICBjb25zdCBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCBmaXJzdEFyZ3VtZW50ID0gZmlyc3QoYXJndW1lbnRzKTtcblxuICAgIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICAgIHRoZW5EZWxldGUgPSBmaXJzdEFyZ3VtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYXJndW1lbnRzTGVuZ3RoID09PSAwKSB7XG4gICAgbmFtZXMgPSBPYmplY3Qua2V5cyh0aGlzLmNvbnRleHQpO1xuXG4gICAgdGhlbkRlbGV0ZSA9IHRydWU7XG4gIH1cblxuICBuYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuY29udGV4dFtuYW1lXSxcbiAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBuYW1lLCAgLy8vXG4gICAgICAgICAgZGVzY3JpcHRvciA9IHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgIH07XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yKTtcblxuICAgIGlmICh0aGVuRGVsZXRlKSB7XG4gICAgICBkZWxldGUgdGhpcy5jb250ZXh0W25hbWVdO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpLCBbXSk7XG59XG5cbmNvbnN0IGpzeE1peGluID0ge1xuICBhcHBseVByb3BlcnRpZXM6IGFwcGx5UHJvcGVydGllcyxcbiAgZ2V0UHJvcGVydGllczogZ2V0UHJvcGVydGllcyxcbiAgZ2V0Q29udGV4dDogZ2V0Q29udGV4dCxcbiAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICBzZXRTdGF0ZTogc2V0U3RhdGUsXG4gIGZyb21TdGF0ZTogZnJvbVN0YXRlLFxuICB1cGRhdGVTdGF0ZTogdXBkYXRlU3RhdGUsXG4gIGFzc2lnbkNvbnRleHQ6IGFzc2lnbkNvbnRleHRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ganN4TWl4aW47XG5cbmZ1bmN0aW9uIHVwZGF0ZVBhcmVudENvbnRleHQoY2hpbGRFbGVtZW50LCBwYXJlbnRFbGVtZW50KSB7XG4gIGNvbnN0IHBhcmVudENvbnRleHQgPSAodHlwZW9mIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5jb250ZXh0O1xuXG4gIHBhcmVudEVsZW1lbnQuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudEVsZW1lbnQuY29udGV4dCwgcGFyZW50Q29udGV4dCk7XG5cbiAgZGVsZXRlIGNoaWxkRWxlbWVudC5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgbGV0IGNoaWxkRWxlbWVudHMgPSAodHlwZW9mIGVsZW1lbnQuY2hpbGRFbGVtZW50cyA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jaGlsZEVsZW1lbnRzO1xuXG4gIGNoaWxkRWxlbWVudHMgPSAoY2hpbGRFbGVtZW50cyAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICAgICAgICAgKChjaGlsZEVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50cyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hpbGRFbGVtZW50c10pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW107XG5cbiAgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHMubWFwKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgY2hpbGRFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dCA9IGNoaWxkRWxlbWVudCwgIC8vL1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBuZXcgVGV4dEVsZW1lbnQodGV4dCk7XG5cbiAgICAgIGNoaWxkRWxlbWVudCA9IHRleHRFbGVtZW50OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAvLy9cbiAgICAgICAgaGFuZGxlciA9IHZhbHVlOyAgLy8vXG5cbiAgZWxlbWVudC5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSB7XG4gICAgbmFtZSA9ICdjbGFzcyc7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgbmFtZSA9ICdmb3InO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSkge1xuICByZXR1cm4gYXR0cmlidXRlTmFtZXMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1xuICAnYWNjZXB0JywgJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXNzS2V5JywgJ2FjdGlvbicsICdhbGxvd0Z1bGxTY3JlZW4nLCAnYWxsb3dUcmFuc3BhcmVuY3knLCAnYWx0JywgJ2FzeW5jJywgJ2F1dG9Db21wbGV0ZScsICdhdXRvRm9jdXMnLCAnYXV0b1BsYXknLFxuICAnY2FwdHVyZScsICdjZWxsUGFkZGluZycsICdjZWxsU3BhY2luZycsICdjaGFsbGVuZ2UnLCAnY2hhclNldCcsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3NJRCcsICdjbGFzc05hbWUnLCAnY29sU3BhbicsICdjb2xzJywgJ2NvbnRlbnQnLCAnY29udGVudEVkaXRhYmxlJywgJ2NvbnRleHRNZW51JywgJ2NvbnRyb2xzJywgJ2Nvb3JkcycsICdjcm9zc09yaWdpbicsXG4gICdkYXRhJywgJ2RhdGVUaW1lJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsXG4gICdlbmNUeXBlJyxcbiAgJ2Zvcm0nLCAnZm9ybUFjdGlvbicsICdmb3JtRW5jVHlwZScsICdmb3JtTWV0aG9kJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2Zvcm1UYXJnZXQnLCAnZnJhbWVCb3JkZXInLFxuICAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmTGFuZycsICdodG1sRm9yJywgJ2h0dHBFcXVpdicsXG4gICdpY29uJywgJ2lkJywgJ2lucHV0TW9kZScsICdpbnRlZ3JpdHknLCAnaXMnLFxuICAna2V5UGFyYW1zJywgJ2tleVR5cGUnLCAna2luZCcsXG4gICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9vcCcsICdsb3cnLFxuICAnbWFuaWZlc3QnLCAnbWFyZ2luSGVpZ2h0JywgJ21hcmdpbldpZHRoJywgJ21heCcsICdtYXhMZW5ndGgnLCAnbWVkaWEnLCAnbWVkaWFHcm91cCcsICdtZXRob2QnLCAnbWluJywgJ21pbkxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsXG4gICduYW1lJywgJ25vVmFsaWRhdGUnLCAnbm9uY2UnLFxuICAnb3BlbicsICdvcHRpbXVtJyxcbiAgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHJvZmlsZScsXG4gICdyYWRpb0dyb3VwJywgJ3JlYWRPbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd1NwYW4nLCAncm93cycsXG4gICdzYW5kYm94JywgJ3Njb3BlJywgJ3Njb3BlZCcsICdzY3JvbGxpbmcnLCAnc2VhbWxlc3MnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NwZWxsQ2hlY2snLCAnc3JjJywgJ3NyY0RvYycsICdzcmNMYW5nJywgJ3NyY1NldCcsICdzdGFydCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLFxuICAndGFiSW5kZXgnLCAndGFyZ2V0JywgJ3RpdGxlJywgJ3R5cGUnLFxuICAndXNlTWFwJyxcbiAgJ3ZhbHVlJyxcbiAgJ3dpZHRoJyxcbiAgJ3dtb2RlJyxcbiAgJ3dyYXAnXG5dO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbktleVVwKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ2tleXVwJywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25LZXlEb3duKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ2tleWRvd24nLCBoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBvZmZLZXlVcChoYW5kbGVyLCBvYmplY3QpIHsgdGhpcy5vZmYoJ2tleXVwJywgaGFuZGxlciwgb2JqZWN0KTsgfVxuXG5mdW5jdGlvbiBvZmZLZXlEb3duKGhhbmRsZXIsIG9iamVjdCkgeyB0aGlzLm9mZigna2V5ZG93bicsIGhhbmRsZXIsIG9iamVjdCk7IH1cblxuY29uc3Qga2V5TWl4aW4gPSB7XG4gIG9uS2V5VXA6IG9uS2V5VXAsXG4gIG9uS2V5RG93bjogb25LZXlEb3duLFxuICBvZmZLZXlVcDogb2ZmS2V5VXAsXG4gIG9mZktleURvd246IG9mZktleURvd25cbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IGtleUNvZGUgPSBldmVudC5rZXlDb2RlO1xuICBcbiAgaGFuZGxlcihrZXlDb2RlLCBldmVudCwgdGFyZ2V0RWxlbWVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uTW91c2VVcChoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdtb3VzZXVwJywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZURvd24oaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2Vkb3duJywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU92ZXIoaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignbW91c2VvdmVyJywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25Nb3VzZU91dChoYW5kbGVyLCBvYmplY3QsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdtb3VzZW91dCcsIGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9uTW91c2VNb3ZlKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKSB7XG4gIHRoaXMub24oJ21vdXNlbW92ZScsIGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZk1vdXNlVXAoaGFuZGxlciwgb2JqZWN0KSB7IHRoaXMub2ZmKCdtb3VzZXVwJywgaGFuZGxlciwgb2JqZWN0KTsgfVxuXG5mdW5jdGlvbiBvZmZNb3VzZURvd24oaGFuZGxlciwgb2JqZWN0KSB7IHRoaXMub2ZmKCdtb3VzZWRvd24nLCBoYW5kbGVyLCBvYmplY3QpOyB9XG5cbmZ1bmN0aW9uIG9mZk1vdXNlT3ZlcihoYW5kbGVyLCBvYmplY3QpIHsgdGhpcy5vZmYoJ21vdXNlb3ZlcicsIGhhbmRsZXIsIG9iamVjdCk7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VPdXQoaGFuZGxlciwgb2JqZWN0KSB7IHRoaXMub2ZmKCdtb3VzZW91dCcsIGhhbmRsZXIsIG9iamVjdCk7IH1cblxuZnVuY3Rpb24gb2ZmTW91c2VNb3ZlKGhhbmRsZXIsIG9iamVjdCkgeyB0aGlzLm9mZignbW91c2Vtb3ZlJywgaGFuZGxlciwgb2JqZWN0KTsgfVxuXG5jb25zdCBtb3VzZU1peGluID0ge1xuICBvbk1vdXNlVXA6IG9uTW91c2VVcCxcbiAgb25Nb3VzZURvd246IG9uTW91c2VEb3duLFxuICBvbk1vdXNlT3Zlcjogb25Nb3VzZU92ZXIsXG4gIG9uTW91c2VPdXQ6IG9uTW91c2VPdXQsXG4gIG9uTW91c2VNb3ZlOiBvbk1vdXNlTW92ZSxcbiAgb2ZmTW91c2VVcDogb2ZmTW91c2VVcCxcbiAgb2ZmTW91c2VEb3duOiBvZmZNb3VzZURvd24sXG4gIG9mZk1vdXNlT3Zlcjogb2ZmTW91c2VPdmVyLFxuICBvZmZNb3VzZU91dDogb2ZmTW91c2VPdXQsXG4gIG9mZk1vdXNlTW92ZTogb2ZmTW91c2VNb3ZlXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdXNlTWl4aW47XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCB0YXJnZXRFbGVtZW50KSB7XG4gIGNvbnN0IG1vdXNlVG9wID0gZXZlbnQucGFnZVksICAvLy9cbiAgICAgICAgbW91c2VMZWZ0ID0gZXZlbnQucGFnZVgsIC8vL1xuICAgICAgICBtb3VzZUJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjsgLy8vXG4gIFxuICBoYW5kbGVyKG1vdXNlVG9wLCBtb3VzZUxlZnQsIG1vdXNlQnV0dG9uLCBldmVudCwgdGFyZ2V0RWxlbWVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG9uUmVzaXplKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKSB7XG4gIGNvbnN0IGVsZW1lbnQgPSB0aGlzLCAvLy9cbiAgICAgICAgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCk7XG5cbiAgaWYgKHJlc2l6ZUV2ZW50TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIGFkZFJlc2l6ZU9iamVjdChlbGVtZW50KTtcbiAgfVxuXG4gIGNvbnN0IGV2ZW50VHlwZSA9ICdyZXNpemUnO1xuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihldmVudFR5cGUsIGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZlJlc2l6ZShoYW5kbGVyLCBvYmplY3QpIHtcbiAgY29uc3QgZXZlbnRUeXBlID0gJ3Jlc2l6ZSc7XG5cbiAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgaGFuZGxlciwgb2JqZWN0KTtcblxuICBjb25zdCBlbGVtZW50ID0gdGhpcywgLy8vXG4gICAgICAgIHJlc2l6ZUV2ZW50TGlzdGVuZXJzID0gZmluZFJlc2l6ZUV2ZW50TGlzdGVuZXJzKGVsZW1lbnQpO1xuICBcbiAgaWYgKHJlc2l6ZUV2ZW50TGlzdGVuZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJlbW92ZVJlc2l6ZU9iamVjdChlbGVtZW50KTtcbiAgfVxufVxuXG5jb25zdCByZXNpemVNaXhpbiA9IHtcbiAgb25SZXNpemU6IG9uUmVzaXplLFxuICBvZmZSZXNpemU6IG9mZlJlc2l6ZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXNpemVNaXhpbjtcblxuZnVuY3Rpb24gYWRkUmVzaXplT2JqZWN0KGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2JqZWN0JyksXG4gICAgICAgIGRvbUVsZW1lbnQgPSBlbGVtZW50LmdldERPTUVsZW1lbnQoKSxcbiAgICAgICAgc3R5bGUgPSBgZGlzcGxheTogYmxvY2s7IFxuICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7IFxuICAgICAgICAgICAgICAgICB0b3A6IDA7IFxuICAgICAgICAgICAgICAgICBsZWZ0OiAwOyBcbiAgICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDAlOyBcbiAgICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7IFxuICAgICAgICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyBcbiAgICAgICAgICAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7IFxuICAgICAgICAgICAgICAgICB6LWluZGV4OiAtMTtgLFxuICAgICAgICBkYXRhID0gJ2Fib3V0OmJsYW5rJyxcbiAgICAgICAgdHlwZSA9ICd0ZXh0L2h0bWwnO1xuXG4gIHJlc2l6ZU9iamVjdC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGUpO1xuICByZXNpemVPYmplY3QuZGF0YSA9IGRhdGE7XG4gIHJlc2l6ZU9iamVjdC50eXBlID0gdHlwZTtcblxuICBlbGVtZW50Ll9fcmVzaXplT2JqZWN0X18gPSByZXNpemVPYmplY3Q7XG5cbiAgcmVzaXplT2JqZWN0Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpXG4gIH07XG5cbiAgZG9tRWxlbWVudC5hcHBlbmRDaGlsZChyZXNpemVPYmplY3QpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVSZXNpemVPYmplY3QoZWxlbWVudCkge1xuICBjb25zdCBkb21FbGVtZW50ID0gZWxlbWVudC5nZXRET01FbGVtZW50KCksXG4gICAgICAgIHJlc2l6ZU9iamVjdCA9IGVsZW1lbnQuX19yZXNpemVPYmplY3RfXyxcbiAgICAgICAgb2JqZWN0V2luZG93ID0gcmVzaXplT2JqZWN0LmNvbnRlbnREb2N1bWVudC5kZWZhdWx0VmlldzsgIC8vL1xuXG4gIG9iamVjdFdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVFdmVudExpc3RlbmVyKTtcblxuICBkb21FbGVtZW50LnJlbW92ZUNoaWxkKHJlc2l6ZU9iamVjdCk7XG59XG5cbmZ1bmN0aW9uIHJlc2l6ZU9iamVjdExvYWRIYW5kbGVyKGVsZW1lbnQpIHtcbiAgY29uc3QgcmVzaXplT2JqZWN0ID0gZWxlbWVudC5fX3Jlc2l6ZU9iamVjdF9fLFxuICAgICAgICByZXNpemVPYmplY3RXaW5kb3cgPSByZXNpemVPYmplY3QuY29udGVudERvY3VtZW50LmRlZmF1bHRWaWV3OyAgLy8vXG5cbiAgcmVzaXplT2JqZWN0V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgY29uc3QgcmVzaXplRXZlbnRMaXN0ZW5lcnMgPSBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCk7XG5cbiAgICByZXNpemVFdmVudExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uKHJlc2l6ZUV2ZW50TGlzdGVuZXIpe1xuICAgICAgcmVzaXplRXZlbnRMaXN0ZW5lcihldmVudCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCB3aW5kb3cgPSB0YXJnZXRFbGVtZW50LCAvLy9cbiAgICAgICAgd2lkdGggPSB3aW5kb3cuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmdldEhlaWdodCgpO1xuXG4gIGhhbmRsZXIod2lkdGgsIGhlaWdodCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xufVxuXG5mdW5jdGlvbiBmaW5kUmVzaXplRXZlbnRMaXN0ZW5lcnMoZWxlbWVudCkge1xuICBjb25zdCByZXNpemVFdmVudExpc3RlbmVycyA9IFtdO1xuICBcbiAgaWYgKGVsZW1lbnQuaGFzT3duUHJvcGVydHkoJ2V2ZW50TGlzdGVuZXJzJykpIHtcbiAgICBjb25zdCBldmVudExpc3RlbmVycyA9IGVsZW1lbnQuZXZlbnRMaXN0ZW5lcnM7ICAvLy9cblxuICAgIGV2ZW50TGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRMaXN0ZW5lcikge1xuICAgICAgaWYgKGV2ZW50TGlzdGVuZXIuZXZlbnRUeXBlID09PSAncmVzaXplJykge1xuICAgICAgICBjb25zdCByZXNpemVFdmVudExpc3RlbmVyID0gZXZlbnRMaXN0ZW5lcjtcblxuICAgICAgICByZXNpemVFdmVudExpc3RlbmVycy5wdXNoKHJlc2l6ZUV2ZW50TGlzdGVuZXIpO1xuICAgICAgfSAgICAgIFxuICAgIH0pO1xuICB9ICBcbiAgXG4gIHJldHVybiByZXNpemVFdmVudExpc3RlbmVycztcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25TY3JvbGwoaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbignc2Nyb2xsJywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb2ZmU2Nyb2xsKGhhbmRsZXIsIG9iamVjdCkgeyB0aGlzLm9mZignc2Nyb2xsJywgaGFuZGxlciwgb2JqZWN0KTsgfVxuXG5mdW5jdGlvbiBnZXRTY3JvbGxUb3AoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsVG9wOyB9XG5cbmZ1bmN0aW9uIGdldFNjcm9sbExlZnQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuc2Nyb2xsTGVmdDsgfVxuXG5mdW5jdGlvbiBzZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3A7IH1cblxuZnVuY3Rpb24gc2V0U2Nyb2xsTGVmdChzY3JvbGxMZWZ0KSB7IHRoaXMuZG9tRWxlbWVudC5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdDsgfVxuXG5jb25zdCBzY3JvbGxNaXhpbiA9IHtcbiAgb25TY3JvbGw6IG9uU2Nyb2xsLFxuICBvZmZTY3JvbGw6IG9mZlNjcm9sbCxcbiAgZ2V0U2Nyb2xsVG9wOiBnZXRTY3JvbGxUb3AsXG4gIGdldFNjcm9sbExlZnQ6IGdldFNjcm9sbExlZnQsXG4gIHNldFNjcm9sbFRvcDogc2V0U2Nyb2xsVG9wLFxuICBzZXRTY3JvbGxMZWZ0OiBzZXRTY3JvbGxMZWZ0XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNjcm9sbE1peGluO1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCBzY3JvbGxUb3AgPSB0YXJnZXRFbGVtZW50LmdldFNjcm9sbFRvcCgpLFxuICAgICAgICBzY3JvbGxMZWZ0ID0gdGFyZ2V0RWxlbWVudC5nZXRTY3JvbGxMZWZ0KCk7XG4gIFxuICBoYW5kbGVyKHNjcm9sbFRvcCwgc2Nyb2xsTGVmdCwgZXZlbnQsIHRhcmdldEVsZW1lbnQpO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnLi9lbGVtZW50JyksXG4gICAgICBUZXh0RWxlbWVudCA9IHJlcXVpcmUoJy4vdGV4dEVsZW1lbnQnKTtcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudChmaXJzdEFyZ3VtZW50LCBwcm9wZXJ0aWVzLCAuLi5jaGlsZEFyZ3VtZW50cykge1xuICBsZXQgZWxlbWVudCA9IG51bGw7XG5cbiAgaWYgKGZpcnN0QXJndW1lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IGNoaWxkRWxlbWVudHMgPSBjaGlsZEVsZW1lbnRzRnJvbUNoaWxkQXJndW1lbnRzKGNoaWxkQXJndW1lbnRzKTtcblxuICAgIHByb3BlcnRpZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIGNoaWxkRWxlbWVudHM6IGNoaWxkRWxlbWVudHNcbiAgICB9LCBwcm9wZXJ0aWVzKTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChpc1N1YmNsYXNzT2YoZmlyc3RBcmd1bWVudCwgRWxlbWVudCkpIHtcbiAgICAgIGNvbnN0IENsYXNzID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gQ2xhc3MuZnJvbVByb3BlcnRpZXMocHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IHN0cmluZyA9IGZpcnN0QXJndW1lbnQ7IC8vL1xuXG4gICAgICBlbGVtZW50ID0gRWxlbWVudC5mcm9tU3RyaW5nKHN0cmluZywgcHJvcGVydGllcyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZmlyc3RBcmd1bWVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3QgZWxlbWVudEZ1bmN0aW9uID0gZmlyc3RBcmd1bWVudDsgIC8vL1xuXG4gICAgICBlbGVtZW50ID0gZWxlbWVudEZ1bmN0aW9uKHByb3BlcnRpZXMpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5jb25zdCBSZWFjdCA9IHtcbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDtcblxuZnVuY3Rpb24gY2hpbGRFbGVtZW50c0Zyb21DaGlsZEFyZ3VtZW50cyhjaGlsZEFyZ3VtZW50cykge1xuICBjaGlsZEFyZ3VtZW50cyA9IGNoaWxkQXJndW1lbnRzLnJlZHVjZShmdW5jdGlvbihjaGlsZEFyZ3VtZW50cywgY2hpbGRBcmd1bWVudCkge1xuICAgIGNoaWxkQXJndW1lbnRzID0gY2hpbGRBcmd1bWVudHMuY29uY2F0KGNoaWxkQXJndW1lbnQpO1xuXG4gICAgcmV0dXJuIGNoaWxkQXJndW1lbnRzO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2hpbGRFbGVtZW50cyA9IGNoaWxkQXJndW1lbnRzLm1hcChmdW5jdGlvbihjaGlsZEFyZ3VtZW50KSB7XG4gICAgbGV0IGNoaWxkRWxlbWVudDtcbiAgICBcbiAgICBpZiAodHlwZW9mIGNoaWxkQXJndW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gY2hpbGRBcmd1bWVudCwgLy8vXG4gICAgICAgICAgICB0ZXh0RWxlbWVudCA9IG5ldyBUZXh0RWxlbWVudCh0ZXh0KTtcblxuICAgICAgY2hpbGRFbGVtZW50ID0gdGV4dEVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkRWxlbWVudCA9IGNoaWxkQXJndW1lbnQ7ICAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gaXNTdWJjbGFzc09mKGFyZ3VtZW50LCBDbGFzcykge1xuICBsZXQgdHlwZU9mID0gZmFsc2U7XG5cbiAgaWYgKGFyZ3VtZW50Lm5hbWUgPT09IENsYXNzLm5hbWUpIHsgLy8vXG4gICAgdHlwZU9mID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBhcmd1bWVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhcmd1bWVudCk7IC8vL1xuXG4gICAgaWYgKGFyZ3VtZW50KSB7XG4gICAgICB0eXBlT2YgPSBpc1N1YmNsYXNzT2YoYXJndW1lbnQsIENsYXNzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHlwZU9mO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBPZmZzZXQgPSByZXF1aXJlKCcuL21pc2Mvb2Zmc2V0JyksXG4gICAgICBCb3VuZHMgPSByZXF1aXJlKCcuL21pc2MvYm91bmRzJyk7XG5cbmNsYXNzIFRleHRFbGVtZW50IHtcbiAgY29uc3RydWN0b3IodGV4dCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpOyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5fX2VsZW1lbnRfXyA9IHRoaXM7XG4gIH1cblxuICBjbG9uZSgpIHsgcmV0dXJuIFRleHRFbGVtZW50LmNsb25lKHRoaXMpOyB9XG5cbiAgZ2V0VGV4dCgpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0aGlzLmRvbUVsZW1lbnQubm9kZVZhbHVlLFxuICAgICAgICAgIHRleHQgPSBub2RlVmFsdWU7IC8vL1xuXG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cblxuICBzZXRUZXh0KHRleHQpIHtcbiAgICBjb25zdCBub2RlVmFsdWUgPSB0ZXh0OyAvLy9cblxuICAgIHRoaXMuZG9tRWxlbWVudC5ub2RlVmFsdWUgPSBub2RlVmFsdWU7XG4gIH1cblxuICBnZXRPZmZzZXQoKSB7XG4gICAgY29uc3QgdG9wID0gdGhpcy5kb21FbGVtZW50Lm9mZnNldFRvcCwgIC8vL1xuICAgICAgICAgIGxlZnQgPSB0aGlzLmRvbUVsZW1lbnQub2Zmc2V0TGVmdCwgIC8vL1xuICAgICAgICAgIG9mZnNldCA9IG5ldyBPZmZzZXQodG9wLCBsZWZ0KTtcblxuICAgIHJldHVybiBvZmZzZXQ7XG4gIH1cblxuICBnZXRCb3VuZHMoKSB7XG4gICAgY29uc3QgYm91bmRpbmdDbGllbnRSZWN0ID0gdGhpcy5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgICAgIGJvdW5kcyA9IEJvdW5kcy5mcm9tQm91bmRpbmdDbGllbnRSZWN0KGJvdW5kaW5nQ2xpZW50UmVjdCk7XG5cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZ2V0V2lkdGgoKSB7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmRvbUVsZW1lbnQuY2xpZW50V2lkdGg7XG5cbiAgICByZXR1cm4gd2lkdGg7XG4gIH1cblxuICBnZXRIZWlnaHQoKSB7XG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5kb21FbGVtZW50LmNsaWVudEhlaWdodDtcblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBwcmVwZW5kVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnByZXBlbmQodGhpcyk7IH1cblxuICBhcHBlbmRUbyhwYXJlbnRFbGVtZW50KSB7IHBhcmVudEVsZW1lbnQuYXBwZW5kKHRoaXMpOyB9XG5cbiAgYWRkVG8ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LmFkZCh0aGlzKTsgfVxuXG4gIHJlbW92ZUZyb20ocGFyZW50RWxlbWVudCkgeyBwYXJlbnRFbGVtZW50LnJlbW92ZSh0aGlzKTsgfVxuXG4gIGluc2VydEJlZm9yZShzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudCk7XG4gIH1cblxuICBpbnNlcnRBZnRlcihzaWJsaW5nRWxlbWVudCkge1xuICAgIGNvbnN0IHBhcmVudERPTU5vZGUgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50LnBhcmVudE5vZGUsXG4gICAgICAgICAgc2libGluZ0RPTUVsZW1lbnQgPSBzaWJsaW5nRWxlbWVudC5kb21FbGVtZW50O1xuXG4gICAgcGFyZW50RE9NTm9kZS5pbnNlcnRCZWZvcmUodGhpcy5kb21FbGVtZW50LCBzaWJsaW5nRE9NRWxlbWVudC5uZXh0U2libGluZyk7ICAvLy9cbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICB0aGlzLmRvbUVsZW1lbnQucmVtb3ZlKCk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUZXh0RWxlbWVudDtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmVjZXNzYXJ5ID0gcmVxdWlyZSgnbmVjZXNzYXJ5Jyk7XG5cbmNvbnN0IHsgYXJyYXkgfSA9IG5lY2Vzc2FyeSxcbiAgICAgIHsgc3BsaWNlIH0gPSBhcnJheTtcblxuY2xhc3MgZG9tVXRpbGl0aWVzIHtcbiAgc3RhdGljIGRvbUVsZW1lbnRGcm9tU2VsZWN0b3Ioc2VsZWN0b3IpIHtcbiAgY29uc3QgZG9tRWxlbWVudCA9ICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSA/XG4gICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogIC8vL1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOyAgLy8vXG5cbiAgcmV0dXJuIGRvbUVsZW1lbnQ7XG59XG5cbiAgc3RhdGljIGVsZW1lbnRzRnJvbURPTUVsZW1lbnRzKGRvbUVsZW1lbnRzKSB7XG4gICAgY29uc3QgZG9tRWxlbWVudHNXaXRoRWxlbWVudHMgPSBkb21VdGlsaXRpZXMuZmlsdGVyRE9NTm9kZXMoZG9tRWxlbWVudHMsIGZ1bmN0aW9uKGRvbUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiAoZG9tRWxlbWVudC5fX2VsZW1lbnRfXyAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBlbGVtZW50cyA9IGRvbUVsZW1lbnRzV2l0aEVsZW1lbnRzLm1hcChmdW5jdGlvbihkb21FbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5fX2VsZW1lbnRfXztcbiAgICAgICAgICB9KTtcbiAgXG4gICAgcmV0dXJuIGVsZW1lbnRzO1xuICB9XG5cbiAgc3RhdGljIGRlc2NlbmRhbnRET01Ob2Rlc0Zyb21ET01Ob2RlKGRvbU5vZGUsIGRlc2NlbmRhbnRET01Ob2RlcyA9IFtdKSB7XG4gICAgY29uc3Qgc3RhcnQgPSAtMSxcbiAgICAgICAgICBkZWxldGVDb3VudCA9IDAsXG4gICAgICAgICAgY2hpbGRET01Ob2RlcyA9IGRvbU5vZGUuY2hpbGROb2RlczsgIC8vL1xuICBcbiAgICBzcGxpY2UoZGVzY2VuZGFudERPTU5vZGVzLCBzdGFydCwgZGVsZXRlQ291bnQsIGNoaWxkRE9NTm9kZXMpO1xuICBcbiAgICBjaGlsZERPTU5vZGVzLmZvckVhY2goZnVuY3Rpb24oY2hpbGRET01Ob2RlKSB7XG4gICAgICBkb21VdGlsaXRpZXMuZGVzY2VuZGFudERPTU5vZGVzRnJvbURPTU5vZGUoY2hpbGRET01Ob2RlLCBkZXNjZW5kYW50RE9NTm9kZXMpO1xuICAgIH0pO1xuICBcbiAgICByZXR1cm4gZGVzY2VuZGFudERPTU5vZGVzO1xuICB9XG5cbiAgc3RhdGljIGZpbHRlckRPTU5vZGVzQnlTZWxlY3Rvcihkb21Ob2Rlcywgc2VsZWN0b3IpIHtcbiAgICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gZG9tVXRpbGl0aWVzLmZpbHRlckRPTU5vZGVzKGRvbU5vZGVzLCBmdW5jdGlvbihkb21Ob2RlKSB7XG4gICAgICByZXR1cm4gZG9tVXRpbGl0aWVzLmRvbU5vZGVNYXRjaGVzU2VsZWN0b3IoZG9tTm9kZSwgc2VsZWN0b3IpO1xuICAgIH0pO1xuICBcbiAgICByZXR1cm4gZmlsdGVyZWRET01Ob2RlcztcbiAgfVxuXG4gIHN0YXRpYyBkb21Ob2RlTWF0Y2hlc1NlbGVjdG9yKGRvbU5vZGUsIHNlbGVjdG9yKSB7XG4gICAgY29uc3QgZG9tTm9kZVR5cGUgPSBkb21Ob2RlLm5vZGVUeXBlO1xuICBcbiAgICBzd2l0Y2ggKGRvbU5vZGVUeXBlKSB7XG4gICAgICBjYXNlIE5vZGUuRUxFTUVOVF9OT0RFIDoge1xuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9tTm9kZTsgLy8vXG4gIFxuICAgICAgICByZXR1cm4gZG9tRWxlbWVudC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgIH1cbiAgXG4gICAgICBjYXNlIE5vZGUuVEVYVF9OT0RFIDoge1xuICAgICAgICBpZiAoc2VsZWN0b3IgPT09ICcqJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICBcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZmlsdGVyRE9NTm9kZXMoZG9tTm9kZXMsIHRlc3QpIHtcbiAgICBjb25zdCBmaWx0ZXJlZERPTU5vZGVzID0gW10sXG4gICAgICAgICAgZG9tTm9kZXNMZW5ndGggPSBkb21Ob2Rlcy5sZW5ndGg7XG4gIFxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBkb21Ob2Rlc0xlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZG9tTm9kZSA9IGRvbU5vZGVzW2luZGV4XSxcbiAgICAgICAgICAgIHJlc3VsdCA9IHRlc3QoZG9tTm9kZSk7XG4gIFxuICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICBmaWx0ZXJlZERPTU5vZGVzLnB1c2goZG9tTm9kZSk7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICByZXR1cm4gZmlsdGVyZWRET01Ob2RlcztcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbVV0aWxpdGllcztcbiIsIid1c2Ugc3RyaWN0JztcblxuY2xhc3Mgb2JqZWN0VXRpbGl0aWVzIHtcbiAgc3RhdGljIGNvbWJpbmUodGFyZ2V0T2JqZWN0LCBzb3VyY2VPYmplY3QgPSB7fSkge1xuICAgIGNvbnN0IHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2VPYmplY3QpO1xuXG4gICAgc291cmNlS2V5cy5mb3JFYWNoKGZ1bmN0aW9uKHNvdXJjZUtleSkge1xuICAgICAgY29uc3QgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRPYmplY3Rbc291cmNlS2V5XSxcbiAgICAgICAgICAgIHNvdXJjZVByb3BlcnR5ID0gc291cmNlT2JqZWN0W3NvdXJjZUtleV07XG5cbiAgICAgIHRhcmdldE9iamVjdFtzb3VyY2VLZXldID0gdGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KHNvdXJjZUtleSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYCR7dGFyZ2V0UHJvcGVydHl9ICR7c291cmNlUHJvcGVydHl9YCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VQcm9wZXJ0eTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBwcnVuZSh0YXJnZXRPYmplY3QsIHNvdXJjZUtleXMpIHtcbiAgICBzb3VyY2VLZXlzLmZvckVhY2goZnVuY3Rpb24oc291cmNlS2V5KSB7XG4gICAgICBpZiAodGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KHNvdXJjZUtleSkpIHtcbiAgICAgICAgZGVsZXRlIHRhcmdldE9iamVjdFtzb3VyY2VLZXldO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0VXRpbGl0aWVzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBldmVudE1peGluID0gcmVxdWlyZSgnLi9taXhpbi9ldmVudCcpLFxuICAgICAgY2xpY2tNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4vY2xpY2snKSxcbiAgICAgIG1vdXNlTWl4aW4gPSByZXF1aXJlKCcuL21peGluL21vdXNlJyksXG4gICAgICBrZXlNaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4va2V5Jyk7XG5cbmNsYXNzIFdpbmRvdyB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZG9tRWxlbWVudCA9IHdpbmRvdzsgLy8vXG4gIH1cblxuICBhc3NpZ24oLi4uc291cmNlcykge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZG9tRWxlbWVudDsgLy8vXG5cbiAgICBPYmplY3QuYXNzaWduKHRhcmdldCwgLi4uc291cmNlcyk7XG4gIH1cbiAgXG4gIGdldFdpZHRoKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LmlubmVyV2lkdGg7IH0gLy8vXG4gIFxuICBnZXRIZWlnaHQoKSB7IHJldHVybiB0aGlzLmRvbUVsZW1lbnQuaW5uZXJIZWlnaHQ7IH0gLy8vXG5cbiAgZ2V0U2Nyb2xsVG9wKCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VZT2Zmc2V0OyB9ICAvLy9cblxuICBnZXRTY3JvbGxMZWZ0KCkgeyByZXR1cm4gdGhpcy5kb21FbGVtZW50LnBhZ2VYT2Zmc2V0OyB9IC8vL1xuXG4gIG9uUmVzaXplKGhhbmRsZXIsIG9iamVjdCwgaW50ZXJtZWRpYXRlSGFuZGxlciA9IGRlZmF1bHRJbnRlcm1lZGlhdGVSZXNpemVIYW5kbGVyKSB7XG4gICAgY29uc3QgZXZlbnRUeXBlcyA9ICdyZXNpemUnO1xuICAgIFxuICAgIHRoaXMub24oZXZlbnRUeXBlcywgaGFuZGxlciwgb2JqZWN0LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbiAgfVxuXG4gIG9mZlJlc2l6ZShoYW5kbGVyLCBvYmplY3QpIHtcbiAgICBjb25zdCBldmVudFR5cGVzID0gJ3Jlc2l6ZSc7XG5cbiAgICB0aGlzLm9mZihldmVudFR5cGVzLCBoYW5kbGVyLCBvYmplY3QpO1xuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwgZXZlbnRNaXhpbik7XG5PYmplY3QuYXNzaWduKFdpbmRvdy5wcm90b3R5cGUsIGNsaWNrTWl4aW4pO1xuT2JqZWN0LmFzc2lnbihXaW5kb3cucHJvdG90eXBlLCBtb3VzZU1peGluKTtcbk9iamVjdC5hc3NpZ24oV2luZG93LnByb3RvdHlwZSwga2V5TWl4aW4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBXaW5kb3coKTsgIC8vL1xuXG5mdW5jdGlvbiBkZWZhdWx0SW50ZXJtZWRpYXRlUmVzaXplSGFuZGxlcihoYW5kbGVyLCBldmVudCwgdGFyZ2V0RWxlbWVudCkge1xuICBjb25zdCB3aW5kb3cgPSB0YXJnZXRFbGVtZW50LCAvLy9cbiAgICAgICAgd2lkdGggPSB3aW5kb3cuZ2V0V2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0ID0gd2luZG93LmdldEhlaWdodCgpO1xuICBcbiAgaGFuZGxlcih3aWR0aCwgaGVpZ2h0LCBldmVudCwgdGFyZ2V0RWxlbWVudCk7XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwYXRoVXRpbGl0aWVzOiByZXF1aXJlKCcuL2xpYi91dGlsaXRpZXMvcGF0aCcpLFxuICBhcnJheVV0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL2FycmF5JyksXG4gIGZpbGVTeXN0ZW1VdGlsaXRpZXM6IHJlcXVpcmUoJy4vbGliL3V0aWxpdGllcy9maWxlU3lzdGVtJyksXG4gIGFzeW5jaHJvbm91c1V0aWxpdGllczogcmVxdWlyZSgnLi9saWIvdXRpbGl0aWVzL2FzeW5jaHJvbm91cycpXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBmaXJzdChhcnJheSkgeyByZXR1cm4gYXJyYXlbMF07IH1cblxuZnVuY3Rpb24gc2Vjb25kKGFycmF5KSB7IHJldHVybiBhcnJheVsxXTsgfVxuXG5mdW5jdGlvbiB0aGlyZChhcnJheSkgeyByZXR1cm4gYXJyYXlbMl07IH1cblxuZnVuY3Rpb24gZm91cnRoKGFycmF5KSB7IHJldHVybiBhcnJheVszXTsgfVxuXG5mdW5jdGlvbiBmaWZ0aChhcnJheSkgeyByZXR1cm4gYXJyYXlbNF07IH1cblxuZnVuY3Rpb24gZmlmdGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA1XTsgfVxuXG5mdW5jdGlvbiBmb3VydGhMYXN0KGFycmF5KSB7IHJldHVybiBhcnJheVthcnJheS5sZW5ndGggLSA0XTsgfVxuXG5mdW5jdGlvbiB0aGlyZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDNdOyB9XG5cbmZ1bmN0aW9uIHNlY29uZExhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDJdOyB9XG5cbmZ1bmN0aW9uIGxhc3QoYXJyYXkpIHsgcmV0dXJuIGFycmF5W2FycmF5Lmxlbmd0aCAtIDFdOyB9XG5cbmZ1bmN0aW9uIHRhaWwoYXJyYXkpIHsgcmV0dXJuIGFycmF5LnNsaWNlKDEpOyB9XG5cbmZ1bmN0aW9uIHB1c2goYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmZ1bmN0aW9uIHVuc2hpZnQoYXJyYXkxLCBhcnJheTIpIHsgQXJyYXkucHJvdG90eXBlLnVuc2hpZnQuYXBwbHkoYXJyYXkxLCBhcnJheTIpOyB9XG5cbmZ1bmN0aW9uIGNsZWFyKGFycmF5KSB7XG4gIGNvbnN0IHN0YXJ0ID0gMDtcbiAgXG4gIHJldHVybiBhcnJheS5zcGxpY2Uoc3RhcnQpO1xufVxuXG5mdW5jdGlvbiBjb3B5KGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gMCxcbiAgICAgICAgZGVsZXRlQ291bnQgPSBhcnJheTIubGVuZ3RoOyAgLy8vXG4gIFxuICBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5Mik7XG59XG5cbmZ1bmN0aW9uIG1lcmdlKGFycmF5MSwgYXJyYXkyKSB7XG4gIGNvbnN0IHN0YXJ0ID0gYXJyYXkyLmxlbmd0aCwgIC8vL1xuICAgICAgICBkZWxldGVDb3VudCA9IDA7XG5cbiAgc3BsaWNlKGFycmF5MSwgc3RhcnQsIGRlbGV0ZUNvdW50LCBhcnJheTIpO1xufVxuXG5mdW5jdGlvbiBzcGxpY2UoYXJyYXkxLCBzdGFydCwgZGVsZXRlQ291bnQsIGFycmF5MiA9IFtdKSB7XG4gIGNvbnN0IGFyZ3MgPSBbc3RhcnQsIGRlbGV0ZUNvdW50LCAuLi5hcnJheTJdLFxuICAgICAgICBkZWxldGVkSXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zcGxpY2UuYXBwbHkoYXJyYXkxLCBhcmdzKTtcblxuICByZXR1cm4gZGVsZXRlZEl0ZW1zQXJyYXk7XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2UoYXJyYXksIGVsZW1lbnQsIHRlc3QpIHtcbiAgbGV0IHN0YXJ0ID0gLTE7XG4gIFxuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHN0YXJ0ID0gaW5kZXg7ICAvLy9cbiAgICAgIFxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9KTtcbiAgXG4gIGlmIChmb3VuZCkge1xuICAgIGNvbnN0IGRlbGV0ZUNvdW50ID0gMTtcblxuICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQsIGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXIoYXJyYXksIHRlc3QpIHtcbiAgYmFja3dhcmRzRm9yRWFjaChhcnJheSwgZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmICghcGFzc2VkKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGluZGV4LCAgLy8vXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDE7XG5cbiAgICAgIGFycmF5LnNwbGljZShzdGFydCwgZGVsZXRlQ291bnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZpbmQoYXJyYXksIHRlc3QpIHtcbiAgY29uc3QgZWxlbWVudHMgPSBbXTtcblxuICBmb3J3YXJkc0ZvckVhY2goYXJyYXksIGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBwcnVuZShhcnJheSwgdGVzdCkge1xuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXgsICAvLy9cbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMTtcblxuICAgICAgYXJyYXkuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5mdW5jdGlvbiBwYXRjaChhcnJheSwgZWxlbWVudCwgdGVzdCkge1xuICBjb25zdCBmb3VuZCA9IGFycmF5LnNvbWUoZnVuY3Rpb24oZWxlbWVudCwgaW5kZXgpIHtcbiAgICBjb25zdCBwYXNzZWQgPSB0ZXN0KGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChwYXNzZWQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSk7XG5cblxuICBpZiAoZm91bmQpIHtcbiAgICBhcnJheS5wdXNoKGVsZW1lbnQpO1xuICB9XG5cbiAgcmV0dXJuIGZvdW5kO1xufVxuXG5mdW5jdGlvbiBhdWdtZW50KGFycmF5MSwgYXJyYXkyLCB0ZXN0KSB7XG4gIGFycmF5Mi5mb3JFYWNoKGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgY29uc3QgcGFzc2VkID0gdGVzdChlbGVtZW50LCBpbmRleCk7XG5cbiAgICBpZiAocGFzc2VkKSB7XG4gICAgICBhcnJheTEucHVzaChlbGVtZW50KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXBhcmF0ZShhcnJheSwgdGVzdCwgYXJyYXkxLCBhcnJheTIpIHtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbGVtZW50LCBpbmRleCkge1xuICAgIGNvbnN0IHBhc3NlZCA9IHRlc3QoZWxlbWVudCwgaW5kZXgpO1xuXG4gICAgcGFzc2VkID9cbiAgICAgIGFycmF5MS5wdXNoKGVsZW1lbnQpIDpcbiAgICAgICAgYXJyYXkyLnB1c2goZWxlbWVudCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBmb3J3YXJkc1NvbWUoYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBhcnJheUxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF0sXG4gICAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICAgIFxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gYmFja3dhcmRzU29tZShhcnJheSwgY2FsbGJhY2spIHtcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgZm9yICh2YXIgaW5kZXggPSBhcnJheUxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcblxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZm9yd2FyZHNGb3JFYWNoKGFycmF5LCBjYWxsYmFjaykge1xuICBjb25zdCBhcnJheUxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXlMZW5ndGg7IGluZGV4KyspIHtcbiAgICBjb25zdCBlbGVtZW50ID0gYXJyYXlbaW5kZXhdO1xuXG4gICAgY2FsbGJhY2soZWxlbWVudCwgaW5kZXgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJhY2t3YXJkc0ZvckVhY2goYXJyYXksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGFycmF5TGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGZvciAodmFyIGluZGV4ID0gYXJyYXlMZW5ndGggLSAxOyBpbmRleCA+PSAwOyBpbmRleC0tKSB7XG4gICAgY29uc3QgZWxlbWVudCA9IGFycmF5W2luZGV4XTtcblxuICAgIGNhbGxiYWNrKGVsZW1lbnQsIGluZGV4KTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZmlyc3Q6IGZpcnN0LFxuICBzZWNvbmQ6IHNlY29uZCxcbiAgdGhpcmQ6IHRoaXJkLFxuICBmb3VydGg6IGZvdXJ0aCxcbiAgZmlmdGg6IGZpZnRoLFxuICBmaWZ0aExhc3Q6IGZpZnRoTGFzdCxcbiAgZm91cnRoTGFzdDogZm91cnRoTGFzdCxcbiAgdGhpcmRMYXN0OiB0aGlyZExhc3QsXG4gIHNlY29uZExhc3Q6IHNlY29uZExhc3QsXG4gIGxhc3Q6IGxhc3QsXG4gIHRhaWw6IHRhaWwsXG4gIHB1c2g6IHB1c2gsXG4gIHVuc2hpZnQ6IHVuc2hpZnQsXG4gIGNsZWFyOiBjbGVhcixcbiAgY29weTogY29weSxcbiAgbWVyZ2U6IG1lcmdlLFxuICBzcGxpY2U6IHNwbGljZSxcbiAgcmVwbGFjZTogcmVwbGFjZSxcbiAgZmlsdGVyOiBmaWx0ZXIsXG4gIGZpbmQ6IGZpbmQsXG4gIHBydW5lOiBwcnVuZSxcbiAgcGF0Y2g6IHBhdGNoLFxuICBhdWdtZW50OiBhdWdtZW50LFxuICBzZXBhcmF0ZTogc2VwYXJhdGUsXG4gIGZvcndhcmRzU29tZTogZm9yd2FyZHNTb21lLFxuICBiYWNrd2FyZHNTb21lOiBiYWNrd2FyZHNTb21lLFxuICBmb3J3YXJkc0ZvckVhY2g6IGZvcndhcmRzRm9yRWFjaCxcbiAgYmFja3dhcmRzRm9yRWFjaDogYmFja3dhcmRzRm9yRWFjaFxufTtcbiIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmZ1bmN0aW9uIHdoaWxzdChjYWxsYmFjaywgZG9uZSwgY29udGV4dCkge1xyXG4gIGxldCBpbmRleCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgaW5kZXgrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZvckVhY2goYXJyYXksIGNhbGxiYWNrLCBkb25lLCBjb250ZXh0KSB7XHJcbiAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XHJcblxyXG4gIGxldCBpbmRleCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgaW5kZXgrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoaW5kZXggPT09IGFycmF5TGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGVybWluYXRlKSB7XHJcbiAgICAgIGRvbmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJheVtpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhlbGVtZW50LCBuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNlcXVlbmNlKGNhbGxiYWNrcywgZG9uZSwgY29udGV4dCkge1xyXG4gIGNvbnN0IGNhbGxiYWNrc0xlbmd0aCA9IGNhbGxiYWNrcy5sZW5ndGg7XHJcblxyXG4gIGxldCBpbmRleCA9IC0xO1xyXG5cclxuICBmdW5jdGlvbiBuZXh0KCkge1xyXG4gICAgaW5kZXgrKztcclxuXHJcbiAgICBjb25zdCB0ZXJtaW5hdGUgPSAoaW5kZXggPT09IGNhbGxiYWNrc0xlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRlcm1pbmF0ZSkge1xyXG4gICAgICBkb25lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBjYWxsYmFjayA9IGNhbGxiYWNrc1tpbmRleF07XHJcblxyXG4gICAgICBjYWxsYmFjayhuZXh0LCBkb25lLCBjb250ZXh0LCBpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0KCk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIHdoaWxzdDogd2hpbHN0LFxyXG4gIGZvckVhY2g6IGZvckVhY2gsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlXHJcbn07XHJcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuXG5mdW5jdGlvbiBlbnRyeUV4aXN0cyhhYnNvbHV0ZUZpbGVQYXRoKSB7XG4gIHJldHVybiBmcy5leGlzdHNTeW5jKGFic29sdXRlRmlsZVBhdGgpO1xufVxuXG5mdW5jdGlvbiBmaWxlRXhpc3RzKGFic29sdXRlRmlsZVBhdGgpIHtcbiAgcmV0dXJuIGZzLmV4aXN0c1N5bmMoYWJzb2x1dGVGaWxlUGF0aCk7XG59XG5cbmZ1bmN0aW9uIGlzRW50cnlEaXJlY3RvcnkoYWJzb2x1dGVQYXRoKSB7XG4gIGNvbnN0IHN0YXQgPSBmcy5zdGF0U3luYyhhYnNvbHV0ZVBhdGgpLFxuICAgICAgICBlbnRyeURpcmVjdG9yeSA9IHN0YXQuaXNEaXJlY3RvcnkoKTtcblxuICByZXR1cm4gZW50cnlEaXJlY3Rvcnk7XG59XG5cbmZ1bmN0aW9uIGlzRGlyZWN0b3J5RW1wdHkoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKSB7XG4gIGNvbnN0IHN1YkVudHJ5TmFtZXMgPSByZWFkRGlyZWN0b3J5KGFic29sdXRlRGlyZWN0b3J5UGF0aCksXG4gICAgICAgIHN1YkVudHJ5TmFtZXNMZW5ndGggPSBzdWJFbnRyeU5hbWVzLmxlbmd0aCxcbiAgICAgICAgZGlyZWN0b3J5RW1wdHkgPSAoc3ViRW50cnlOYW1lc0xlbmd0aCA9PT0gMCk7XG5cbiAgcmV0dXJuIGRpcmVjdG9yeUVtcHR5O1xufVxuXG5mdW5jdGlvbiB3cml0ZUZpbGUoYWJzb2x1dGVGaWxlUGF0aCwgY29udGVudCkge1xuICBmcy53cml0ZUZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIGNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiByZWFkRmlsZShhYnNvbHV0ZUZpbGVQYXRoLCBlbmNvZGluZyA9ICd1dGY4Jykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgIGVuY29kaW5nOiBlbmNvZGluZ1xuICAgICAgICB9LFxuICAgICAgICBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKGFic29sdXRlRmlsZVBhdGgsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBjb250ZW50O1xufVxuXG5mdW5jdGlvbiByZWFkRGlyZWN0b3J5KGFic29sdXRlRGlyZWN0b3J5UGF0aCkge1xuICBjb25zdCBzdWJFbnRyeU5hbWVzID0gZnMucmVhZGRpclN5bmMoYWJzb2x1dGVEaXJlY3RvcnlQYXRoKTtcblxuICByZXR1cm4gc3ViRW50cnlOYW1lcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGVudHJ5RXhpc3RzOiBlbnRyeUV4aXN0cyxcbiAgZmlsZUV4aXN0czogZmlsZUV4aXN0cyxcbiAgaXNFbnRyeURpcmVjdG9yeTogaXNFbnRyeURpcmVjdG9yeSxcbiAgaXNEaXJlY3RvcnlFbXB0eTogaXNEaXJlY3RvcnlFbXB0eSxcbiAgd3JpdGVGaWxlOiB3cml0ZUZpbGUsXG4gIHJlYWRGaWxlOiByZWFkRmlsZSxcbiAgcmVhZERpcmVjdG9yeTogcmVhZERpcmVjdG9yeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXJyYXkgPSByZXF1aXJlKCcuL2FycmF5Jyk7XG5cbmNvbnN0IHsgZmlyc3QsIHNlY29uZCwgbGFzdCB9ID0gYXJyYXk7XG5cbmZ1bmN0aW9uIGlzUGF0aFJlbGF0aXZlUGF0aChwYXRoKSB7XG4gIGNvbnN0IHBvc2l0aW9uID0gcGF0aC5zZWFyY2goL15cXC57MSwyfVxcLy8pLFxuICAgICAgICBwYXRoUmVsYXRpdmVQYXRoID0gKHBvc2l0aW9uICE9PSAtMSk7XG5cbiAgcmV0dXJuIHBhdGhSZWxhdGl2ZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGlzUGF0aEFic29sdXRlUGF0aChwYXRoKSB7XG4gIGNvbnN0IHBhdGhSZWxhdGl2ZVBhdGggPSBpc1BhdGhSZWxhdGl2ZVBhdGgocGF0aCksXG4gICAgICAgIHBhdGhBYnNvbHV0ZVBhdGggPSAhcGF0aFJlbGF0aXZlUGF0aDsgLy8vXG5cbiAgcmV0dXJuIHBhdGhBYnNvbHV0ZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lKHBhdGgpIHtcbiAgY29uc3QgcG9zaXRpb24gPSBwYXRoLnNlYXJjaCgvXlteXFwvXStcXC8/JC8pLFxuICAgICAgICBwYXRoVG9wbW9zdERpcmVjdG9yeU5hbWUgPSAocG9zaXRpb24gIT09IC0xKTtcblxuICByZXR1cm4gcGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lO1xufVxuXG5mdW5jdGlvbiBpc1RvcG1vc3REaXJlY3RvcnlOYW1lQ29udGFpbmVkSW5QYXRoKHRvcG1vc3REaXJlY3RvcnlOYW1lLCBwYXRoKSB7XG4gIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gdG9wbW9zdERpcmVjdG9yeU5hbWUucmVwbGFjZSgvXFwvJC8sICcnKTsgLy8vXG5cbiAgY29uc3QgcmVnRXhwID0gbmV3IFJlZ0V4cChgXiR7dG9wbW9zdERpcmVjdG9yeU5hbWV9KD86XFxcXC8uKyk/JGApLFxuICAgICAgICBwb3NpdGlvbiA9IHBhdGguc2VhcmNoKHJlZ0V4cCksXG4gICAgICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lQ29udGFpbmVkSW5GaWxlUGF0aCA9IChwb3NpdGlvbiAhPT0gLTEpO1xuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZUNvbnRhaW5lZEluRmlsZVBhdGg7XG59XG5cbmZ1bmN0aW9uIGNvbWJpbmVQYXRocyhkaXJlY3RvcnlQYXRoLCByZWxhdGl2ZVBhdGgpIHtcbiAgbGV0IGFic29sdXRlUGF0aCA9IG51bGw7XG5cbiAgY29uc3QgZGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZXMgPSBkaXJlY3RvcnlQYXRoLnNwbGl0KCcvJyksXG4gICAgICAgIHJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWVzID0gcmVsYXRpdmVQYXRoLnNwbGl0KCcvJyk7XG5cbiAgbGV0IGZpcnN0UmVsYXRpdmVGaWxlUGF0aFN1YkVudHJ5TmFtZSA9IGZpcnN0KHJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWVzKSxcbiAgICAgIGxhc3REaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lO1xuXG4gIGlmIChmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPT09ICcuJykge1xuICAgIHJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWVzLnNoaWZ0KCk7XG4gIH1cblxuICBmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPSBmaXJzdChyZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyk7XG4gIGxhc3REaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lID0gbGFzdChkaXJlY3RvcnlQYXRoU3ViRW50cnlOYW1lcyk7XG5cbiAgd2hpbGUgKChmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPT09ICcuLicpICYmIChsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZSAhPT0gdW5kZWZpbmVkKSkge1xuICAgIHJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWVzLnNoaWZ0KCk7XG4gICAgZGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZXMucG9wKCk7XG5cbiAgICBmaXJzdFJlbGF0aXZlRmlsZVBhdGhTdWJFbnRyeU5hbWUgPSBmaXJzdChyZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyk7XG4gICAgbGFzdERpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWUgPSBsYXN0KGRpcmVjdG9yeVBhdGhTdWJFbnRyeU5hbWVzKTtcbiAgfVxuXG4gIGlmIChsYXN0RGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgYWJzb2x1dGVGaWxlUGF0aFN1YkVudHJ5TmFtZXMgPSBbXS5jb25jYXQoZGlyZWN0b3J5UGF0aFN1YkVudHJ5TmFtZXMpLmNvbmNhdChyZWxhdGl2ZUZpbGVQYXRoU3ViRW50cnlOYW1lcyk7XG5cbiAgICBhYnNvbHV0ZVBhdGggPSBhYnNvbHV0ZUZpbGVQYXRoU3ViRW50cnlOYW1lcy5qb2luKCcvJyk7XG4gIH1cblxuICByZXR1cm4gYWJzb2x1dGVQYXRoO1xufVxuXG5mdW5jdGlvbiBjb25jYXRlbmF0ZVBhdGhzKHBhdGgxLCBwYXRoMikge1xuICBwYXRoMSA9IHBhdGgxLnJlcGxhY2UoL1xcLyQvLCAnJyk7ICAvLy9cblxuICBjb25zdCBjb21iaW5lZFBhdGggPSBgJHtwYXRoMX0vJHtwYXRoMn1gO1xuXG4gIHJldHVybiBjb21iaW5lZFBhdGg7XG59XG5cbmZ1bmN0aW9uIGJvdHRvbW1vc3ROYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgYm90dG9tbW9zdE5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eLitcXC8oW15cXC9dK1xcLz8pJC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBib3R0b21tb3N0TmFtZSA9IHNlY29uZE1hdGNoOyAgLy8vXG4gIH1cblxuICByZXR1cm4gYm90dG9tbW9zdE5hbWU7XG59XG5cbmZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlQYXRoRnJvbVBhdGgocGF0aCkge1xuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXiguKylcXC9bXlxcL10rXFwvPyQvKSxcbiAgICAgICAgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyksXG4gICAgICAgIGRpcmVjdG9yeVBhdGggPSBzZWNvbmRNYXRjaDsgLy8vXG5cbiAgcmV0dXJuIGRpcmVjdG9yeVBhdGg7XG59XG5cbmZ1bmN0aW9uIHRvcG1vc3REaXJlY3RvcnlOYW1lRnJvbVBhdGgocGF0aCkge1xuICBsZXQgdG9wbW9zdERpcmVjdG9yeU5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC9eKFteXFwvXSspXFwvLiskLyk7XG5cbiAgaWYgKG1hdGNoZXMgIT09IG51bGwpIHtcbiAgICBjb25zdCBzZWNvbmRNYXRjaCA9IHNlY29uZChtYXRjaGVzKTtcblxuICAgIHRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7ICAvLy9cbiAgfVxuXG4gIHJldHVybiB0b3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxuZnVuY3Rpb24gcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoKHBhdGgpIHtcbiAgbGV0IHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWUgPSBudWxsO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSBwYXRoLm1hdGNoKC8oXi4rKVxcL1teXFwvXStcXC8/JC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lID0gc2Vjb25kTWF0Y2g7IC8vL1xuICB9XG5cbiAgcmV0dXJuIHBhdGhXaXRob3V0Qm90dG9tbW9zdE5hbWU7XG59XG5cbmZ1bmN0aW9uIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aChwYXRoKSB7XG4gIGxldCBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gbnVsbDtcblxuICBjb25zdCBtYXRjaGVzID0gcGF0aC5tYXRjaCgvXlteXFwvXStcXC8oLispJC8pO1xuXG4gIGlmIChtYXRjaGVzICE9PSBudWxsKSB7XG4gICAgY29uc3Qgc2Vjb25kTWF0Y2ggPSBzZWNvbmQobWF0Y2hlcyk7XG5cbiAgICBwYXRoV2l0aG91dFRvcG1vc3REaXJlY3RvcnlOYW1lID0gc2Vjb25kTWF0Y2g7XG4gIH1cblxuICByZXR1cm4gcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzUGF0aFJlbGF0aXZlUGF0aDogaXNQYXRoUmVsYXRpdmVQYXRoLFxuICBpc1BhdGhBYnNvbHV0ZVBhdGg6IGlzUGF0aEFic29sdXRlUGF0aCxcbiAgaXNQYXRoVG9wbW9zdERpcmVjdG9yeU5hbWU6IGlzUGF0aFRvcG1vc3REaXJlY3RvcnlOYW1lLFxuICBpc1RvcG1vc3REaXJlY3RvcnlOYW1lQ29udGFpbmVkSW5QYXRoOiBpc1RvcG1vc3REaXJlY3RvcnlOYW1lQ29udGFpbmVkSW5QYXRoLFxuICBjb21iaW5lUGF0aHM6IGNvbWJpbmVQYXRocyxcbiAgY29uY2F0ZW5hdGVQYXRoczogY29uY2F0ZW5hdGVQYXRocyxcbiAgYm90dG9tbW9zdE5hbWVGcm9tUGF0aDogYm90dG9tbW9zdE5hbWVGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aDogdG9wbW9zdERpcmVjdG9yeVBhdGhGcm9tUGF0aCxcbiAgdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aDogdG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aCxcbiAgcGF0aFdpdGhvdXRCb3R0b21tb3N0TmFtZUZyb21QYXRoOiBwYXRoV2l0aG91dEJvdHRvbW1vc3ROYW1lRnJvbVBhdGgsXG4gIHBhdGhXaXRob3V0VG9wbW9zdERpcmVjdG9yeU5hbWVGcm9tUGF0aDogcGF0aFdpdGhvdXRUb3Btb3N0RGlyZWN0b3J5TmFtZUZyb21QYXRoXG59O1xuIl19
