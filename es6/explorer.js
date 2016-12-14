'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    options = require('./options'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, activateHandler, moveHandler) {
    super(selector, moveHandler);

    var explorer = this,  ///
        rootDirectory = RootDirectory.clone(rootDirectoryName, explorer, this.activateFileEventHandler.bind(this));

    this.activateHandler = activateHandler;

    this.rootDirectory = rootDirectory;

    this.options = {};

    this.append(rootDirectory);
  }

  setOption(option) {
    this.options[option] = true;
  }

  unsetOption(option) {
    delete(this.options[option]);
  }

  hasOption(option) {
    option = (this.options[option] === true); ///

    return option;
  }

  addFile(filePath) { this.rootDirectory.addFile(filePath); }
  addDirectory(directoryPath, collapsed) { this.rootDirectory.addDirectory(directoryPath, collapsed); }
  removeFile(filePath, removeEmptyParentDirectories) { this.rootDirectory.removeFile(filePath, removeEmptyParentDirectories); }
  removeDirectory(directoryPath, removeEmptyParentDirectories) { this.rootDirectory.removeDirectory(directoryPath, removeEmptyParentDirectories); }
  getRootDirectoryName() { return this.rootDirectory.getName(); }
  getMarkedDirectory() { return this.rootDirectory.getMarkedDirectory(); }  
  getDirectoryOverlappingDraggableEntry(draggableEntry) { return this.rootDirectory.getDirectoryOverlappingDraggableEntry(draggableEntry); }

  addMarkerInPlace(draggableEntry) {
    var draggableEntryPath = draggableEntry.getPath(),
        draggableEntryType = draggableEntry.getType(),
        draggableEntryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(draggableEntryPath);

    if (!draggableEntryPathTopmostDirectoryName) {
      var markerPath = draggableEntryPath;

      this.rootDirectory.addMarker(markerPath, draggableEntryType);
    } else {
      super.addMarker(draggableEntry)
    }
  }

  addMarker(draggableEntry, directoryOverlappingEntry) {
    var draggableEntryName = draggableEntry.getName(),
        draggableEntryType = draggableEntry.getType(),
        directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
        markerPath = directoryOverlappingEntryPath + '/' + draggableEntryName;

    this.rootDirectory.addMarker(markerPath, draggableEntryType);
  }

  removeMarker() {
    var rootDirectoryMarked = this.rootDirectory.isMarked();

    if (rootDirectoryMarked) {
      this.rootDirectory.removeMarker();
    } else {
      super.removeMarker();
    }
  }

  isMarked() {
    var rootDirectoryMarked = this.rootDirectory.isMarked(),
        marked = rootDirectoryMarked ?
                   true :
                     super.isMarked();

    return marked;
  }

  isToBeMarked(draggableEntry) {
    var directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggableEntry),
        toBeMarked = (directoryOverlappingEntry !== null);

    return toBeMarked;
  }

  startDragging(draggableEntry) {
    var startedDragging,
        noDragging = this.hasOption(options.NO_DRAGGING);

    if (noDragging) {
      startedDragging = false;
    } else {
      var marked = this.isMarked();

      startedDragging = !marked;

      if (startedDragging) {
        this.addMarkerInPlace(draggableEntry);
      }
    }

    return startedDragging;
  }

  stopDragging(draggableEntry, done) {
    var draggableEntryPath = draggableEntry.getPath(),
        marked = this.isMarked(),
        markedDroppableElement = marked ?
                                   this :
                                     this.getMarkedDroppableElement(),
        markedDirectory = markedDroppableElement.getMarkedDirectory(),
        markedDirectoryPath = (markedDirectory !== null) ?
                                markedDirectory.getPath() :
                                  null,
        draggableEntryPathWithoutBottommostName = util.pathWithoutBottommostName(draggableEntryPath),
        sourcePath = draggableEntryPathWithoutBottommostName,
        targetPath = markedDirectoryPath;

    if (marked && (sourcePath === targetPath)) {
      this.removeMarker();

      done();
    } else {
      var subDraggableEntries = draggableEntry.getSubEntries(),
          draggableEntries = subDraggableEntries; ///

      draggableEntries.reverse();
      draggableEntries.push(draggableEntry);

      markedDroppableElement.moveDraggableEntries(draggableEntries, sourcePath, targetPath, function() {
        markedDroppableElement.removeMarker();

        done();
      });
    }
  }

  escapeDragging(draggableEntry) {
    this.removeMarkerGlobally();
  }

  dragging(draggbleEntry, explorer = this) {
    var marked = this.isMarked();
    
    if (marked) {
      var draggableEntryToBeMarked = this.isToBeMarked(draggbleEntry),
          directoryOverlappingEntry;
      
      if (draggableEntryToBeMarked) {
        var markedDirectory = this.getMarkedDirectory();

        directoryOverlappingEntry = this.getDirectoryOverlappingDraggableEntry(draggbleEntry);

        if (markedDirectory !== directoryOverlappingEntry) {
          this.removeMarker();

          this.addMarker(draggbleEntry, directoryOverlappingEntry);
        }
      } else {
        var droppableElementToBeMarked = this.getDroppableElementToBeMarked(draggbleEntry);

        if (droppableElementToBeMarked !== null) {
          directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingDraggableEntry(draggbleEntry);

          droppableElementToBeMarked.addMarker(draggbleEntry, directoryOverlappingEntry);
        } else {
          explorer.addMarkerInPlace(draggbleEntry);
        }

        this.removeMarker();
      }
    } else {
      var markedDroppableElement = this.getMarkedDroppableElement();

      markedDroppableElement.dragging(draggbleEntry, explorer);
    }
  }
  
  moveDirectory(directory, sourcePath, movedPath) {
    if (movedPath === sourcePath) {

    } else if (movedPath === null) {
      directory.remove();
    } else {
      directory.remove();

      var collapsed = directory.isCollapsed(),
          directoryPath = movedPath;

      this.addDirectory(directoryPath, collapsed);
    }
  }

  moveFile(file, sourcePath, movedPath) {
    if (movedPath === sourcePath) {

    } else if (movedPath === null) {
      file.remove();
    } else {
      file.remove();

      var filePath = movedPath; ///

      this.addFile(filePath);
    }
  }

  activateFileEventHandler(activateFileEvent) {
    var file = activateFileEvent.getFile(),
        filePath = file.getPath(this.rootDirectory),
        sourcePath = filePath,  ///
        result = this.activateHandler(sourcePath, callback);

    callback(result);
    
    function callback(result) {
      if (result === false) {
        file.remove();
      }
    }
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    var pathMaps = draggableEntries.map(function(draggableEntry) {
      var pathMap = {},
          draggableEntryPath = draggableEntry.getPath(),
          sourceDraggableEntryPath = draggableEntryPath,  ///
          targetDraggableEntryPath = (sourcePath === null) ?
                                       util.prependTargetPath(draggableEntryPath, targetPath) :
                                         util.replaceSourcePathWithTargetPath(draggableEntryPath, sourcePath, targetPath);

      pathMap[sourceDraggableEntryPath] = targetDraggableEntryPath;

      return pathMap;
    });

    return pathMaps;
  }

  static clone(selector, rootDirectoryName, moveHandler, activateHandler) {
    return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
  }

  static fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
    return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
  }
}

module.exports = Explorer;
