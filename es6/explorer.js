'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util'),
    DroppableElement = require('./droppableElement'),
    RootDirectory = require('./explorer/draggableEntry/rootDirectory');

class Explorer extends DroppableElement {
  constructor(selector, rootDirectoryName, activateHandler, moveHandler) {
    super(selector, moveHandler);

    var rootDirectory = RootDirectory.clone(rootDirectoryName, this.dragEventHandler.bind(this), this.activateFileEventHandler.bind(this));

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
  getRootDirectoryName() { return this.rootDirectory.getName(); }
  getMarkedDirectory() { return this.rootDirectory.getMarkedDirectory(); }
  
  getDirectoryOverlappingEntry(entry) {
    var noDragsToSubdirectories = this.hasOption(Explorer.options.NO_DRAGS_TO_SUBDIRECTORIES),
        directoryOverlappingEntry = this.rootDirectory.getDirectoryOverlappingEntry(entry, noDragsToSubdirectories);

    return directoryOverlappingEntry;
  }

  addMarkerInPlace(entry) {
    var entryPath = entry.getPath(),
        entryType = entry.getType(),
        entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);

    if (!entryPathTopmostDirectoryName) {
      var markerPath = entryPath;

      this.rootDirectory.addMarker(markerPath, entryType);
    } else {
      super.addMarker(entry)
    }
  }

  addMarker(entry, directoryOverlappingEntry) {
    var entryName = entry.getName(),
        entryType = entry.getType(),
        directoryOverlappingEntryPath = directoryOverlappingEntry.getPath(),
        markerPath = directoryOverlappingEntryPath + '/' + entryName;

    this.rootDirectory.addMarker(markerPath, entryType);
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

  isToBeMarked(entry) {
    var toBeMarked,
        entryPath = entry.getPath(),
        noExplorerDrags = this.hasOption(Explorer.options.NO_EXPLORER_DRAGS),
        entryPathTopmostDirectoryName = util.isPathTopmostDirectoryName(entryPath);
    
    if (noExplorerDrags && entryPathTopmostDirectoryName) {
      toBeMarked = false;
    } else {
      var directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);
      
      toBeMarked = (directoryOverlappingEntry !== null);
    }
        
    return toBeMarked;
  }

  startDragging(entry) {
    var startDragging,
        noDraggingEntries = this.hasOption(Explorer.options.NO_DRAGGING);

    if (noDraggingEntries) {
      startDragging = false;
    } else {
      var marked = this.isMarked();

      startDragging = !marked;

      if (startDragging) {
        this.addMarkerInPlace(entry);
      }
    }

    return startDragging;
  }

  stopDragging(entry, done) {
    var entryPath = entry.getPath(),
        marked = this.isMarked(),
        markedDroppableElement = marked ?
                                   this :
                                     this.getMarkedDroppableElement(),
        markedDirectory = markedDroppableElement.getMarkedDirectory(),
        markedDirectoryPath = (markedDirectory !== null) ?
                                markedDirectory.getPath() :
                                  null,
        entryPathWithoutBottommostName = util.pathWithoutBottommostName(entryPath),
        sourcePath = entryPathWithoutBottommostName,
        targetPath = markedDirectoryPath;

    if (marked) {
      if (sourcePath === targetPath) {
        this.removeMarker();

        done();
      }
    }

    var subEntries = entry.getSubEntries(),
        entries = subEntries; ///

    entries.reverse();
    entries.push(entry);

    markedDroppableElement.moveEntries(entries, sourcePath, targetPath, function() {
      markedDroppableElement.removeMarker();

      done();
    });
  }

  escapeDragging(entry) {
    this.removeMarkerGlobally();
  }

  dragging(entry, explorer = this) {
    var marked = this.isMarked();
    
    if (marked) {
      var toBeMarked = this.isToBeMarked(entry),
          directoryOverlappingEntry;
      
      if (toBeMarked) {
        var markedDirectory = this.getMarkedDirectory();

        directoryOverlappingEntry = this.getDirectoryOverlappingEntry(entry);

        if (markedDirectory !== directoryOverlappingEntry) {
          this.removeMarker();

          this.addMarker(entry, directoryOverlappingEntry);
        }
      } else {
        var droppableElementToBeMarked = this.getDroppableElementToBeMarked(entry);

        if (droppableElementToBeMarked !== null) {
          directoryOverlappingEntry = droppableElementToBeMarked.getDirectoryOverlappingEntry(entry);

          droppableElementToBeMarked.addMarker(entry, directoryOverlappingEntry);
        } else {
          explorer.addMarkerInPlace(entry);
        }

        this.removeMarker();
      }
    } else {
      var markedDroppableElement = this.getMarkedDroppableElement();

      markedDroppableElement.dragging(entry, explorer);
    }
  }
  
  moveDirectory(directory, sourcePath, movedPath) {
    if (false) {

    } else if (movedPath === sourcePath) {

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
    if (false) {

    } else if (movedPath === sourcePath) {

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

  entryPathMapsFromEntries(entries, sourcePath, targetPath) {
    var entryPathMaps = entries.map(function(entry) {
      var entryPathMap = {},
          entryPath = entry.getPath(),
          sourceEntryPath = entryPath,  ///
          targetEntryPath = (sourcePath === null) ?
                              util.prependTargetPath(entryPath, targetPath) :
                                util.replaceSourcePathWithTargetPath(entryPath, sourcePath, targetPath);

      entryPathMap[sourceEntryPath] = targetEntryPath;

      return entryPathMap;
    });

    return entryPathMaps;
  }

  static clone(selector, rootDirectoryName, moveHandler, activateHandler) {
    return Element.clone(Explorer, selector, rootDirectoryName, moveHandler, activateHandler);
  }

  static fromHTML(html, rootDirectoryName, moveHandler, activateHandler) {
    return Element.fromHTML(Explorer, html, rootDirectoryName, moveHandler, activateHandler);
  }
}

Explorer.options = {
  NO_DRAGGING: 'NO_DRAGGING',
  NO_EXPLORER_DRAGS: 'NO_EXPLORER_DRAGS',
  NO_DRAGS_TO_SUBDIRECTORIES: 'NO_DRAGS_TO_SUBDIRECTORIES'
};

module.exports = Explorer;
