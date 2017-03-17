'use strict';

const easyui = require('easyui'),
      React = easyui.React;

const util = require('../../util'),
      Entry = require('../entry'),
      Entries = require('../entries'),
      ToggleButton = require('../toggleButton'),
      DraggableEntry = require('../draggableEntry');

class Directory extends DraggableEntry {
  constructor(selector, name, explorer, collapsed = false) {
    const type = Entry.types.DIRECTORY;

    super(selector, name, explorer, type);
    
    const updateHandler = this.toggleButtonUpdateHandler.bind(this),
          toggleButton = <ToggleButton updateHandler={updateHandler} className="toggle" />,
          entries = <Entries Directory={Directory} className="entries" />;
    
    this.onDoubleClick(this.doubleClickHandler.bind(this));

    this.toggleButton = toggleButton;

    this.entries = entries;

    this.append(entries);

    this.prepend(toggleButton);

    collapsed ?
      this.collapse() :
        this.expand();
  }

  isDirectory() {
    return true;
  }

  isBefore(entry) {
    const entryType = entry.getType();

    switch (entryType) {
      case Entry.types.FILE:
      case Entry.types.MARKER:

        return true;

      case Entry.types.DIRECTORY:

        const name = this.getName(),
              entryName = entry.getName(),
              before = name.localeCompare(entryName) < 0;

        return before;
    }
  }
  
  getSubEntries() {
    let subEntries = [];

    this.forEachFile(function(file) {
      const subEntry = file; ///

      subEntries.push(subEntry);
    });

    this.forEachDirectory(function(directory) {
      const subEntry = directory, ///
            directorySubEntries = directory.getSubEntries();

      subEntries.push(subEntry);
      
      subEntries = subEntries.concat(directorySubEntries);
    });

    return subEntries;
  }

  getFilePaths() {
    let filePaths = [];

    this.forEachFile(function(file) {
      const filePath = file.getPath();

      filePaths.push(filePath);
    });

    this.forEachDirectory(function(directory) {
      const directoryFilePaths = directory.getFilePaths();
      
      filePaths = filePaths.concat(directoryFilePaths);
    });

    return filePaths;
  }

  getCollapsedBounds() {
    const collapsed = this.isCollapsed();

    this.collapse();

    const bounds = super.getBounds(),
        collapsedBounds = bounds;  ///

    if (!collapsed) {
      this.expand();
    }

    return collapsedBounds;
  }

  isOverlappingDraggableEntry(draggableEntry) {
    let overlappingDraggableEntry;
    
    if (this === draggableEntry) {
      overlappingDraggableEntry = false;
    } else {
      const collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlappingDraggableEntry = false;
      } else {
        const draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
            overlappingDraggableEntryCollapsedBounds = super.isOverlappingCollapsedBounds(draggableEntryCollapsedBounds);

        overlappingDraggableEntry = overlappingDraggableEntryCollapsedBounds;
      }
    }

    return overlappingDraggableEntry;
  }

  isCollapsed() { return this.toggleButton.isCollapsed(); }

  expand() { this.toggleButton.expand(); }

  collapse() { this.toggleButton.collapse(); }

  addFile(filePath) {
    const addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

    if (topmostDirectory !== null) {
      const filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      topmostDirectory.addFile(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
            entriesFile = this.entries.hasFile(fileName);

      if (!entriesFile) {
        const explorer = this.getExplorer();
        
        this.entries.addFile(fileName, explorer);
      }
    }
  }

  addDirectory(directoryPath, collapsed) {
    const addIfNecessary = true,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

    if (topmostDirectory !== null) {
      const directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      topmostDirectory.addDirectory(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      const directoryName = directoryPath,  ///
            entriesDirectory = this.entries.hasDirectory(directoryName);

      if (!entriesDirectory) {
        const explorer = this.getExplorer();

        this.entries.addDirectory(directoryName, explorer, collapsed);
      }
    }
  }

  removeFile(filePath) {
    let removeEmptyParentDirectories = null; ///

    const addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(filePath, addIfNecessary);

    if (topmostDirectory !== null) {
      const filePathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(filePath);

      removeEmptyParentDirectories = topmostDirectory.removeFile(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
            entriesFile = this.entries.hasFile(fileName);

      if (entriesFile) {
        removeEmptyParentDirectories = this.entries.removeFile(fileName);
      }
    }

    if (removeEmptyParentDirectories === true) {
      const rootDirectory = this.isRootDirectory();

      if (!rootDirectory) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectories;
  }

  removeDirectory(directoryPath) {
    let removeEmptyParentDirectories = null; ///

    const addIfNecessary = false,
          topmostDirectory = this.topmostDirectory(directoryPath, addIfNecessary);

    if (topmostDirectory !== null) {
      const directoryPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(directoryPath);

      removeEmptyParentDirectories = topmostDirectory.removeDirectory(directoryPathWithoutTopmostDirectoryName);
    } else {
      const directoryName = directoryPath,  ///
          entriesDirectory = this.entries.hasDirectory(directoryName);

      if (entriesDirectory) {
        removeEmptyParentDirectories = this.entries.removeDirectory(directoryName);
      }
    }

    if (removeEmptyParentDirectories === true) {
      const rootDirectory = this.isRootDirectory();

      if (!rootDirectory) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectories;
  }
  
  addMarker(markerPath, draggableEntryType) {
    const topmostDirectoryName = util.topmostDirectoryName(markerPath);

    if (topmostDirectoryName === null) {
      const markerName = markerPath;  ///

      this.entries.addMarker(markerName, draggableEntryType);
    } else {
      const topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName),
          markerPathWithoutTopmostDirectoryName = util.pathWithoutTopmostDirectoryName(markerPath);

      topmostDirectory.addMarker(markerPathWithoutTopmostDirectoryName, draggableEntryType);
    }
  }

  removeMarker() {
    let removed;

    const entriesMarked = this.entries.isMarked();
    
    if (entriesMarked) {
      this.entries.removeMarker();

      removed = true;
    } else {
      removed = this.entries.someDirectory(function(directory) {
        const removed = directory.removeMarker();
        
        return removed;
      });
    }
    
    return removed;
  }

  isMarked() {
    let marked;

    const entriesMarked = this.entries.isMarked();
    
    if (entriesMarked) {
      marked = entriesMarked;
    } else {
      const directoryMarked = this.entries.someDirectory(function(directory) {
        const directoryMarked = directory.isMarked();
        
        return directoryMarked;
      });

      marked = directoryMarked;
    }
    
    return marked;
  }

  isEmpty() { return this.entries.isEmpty(); }

  forEachFile(callback) { this.entries.forEachFile(callback); }

  forEachDirectory(callback) { this.entries.forEachDirectory(callback); }

  someDirectory(callback) { this.entries.someDirectory(callback); }

  getDraggableEntryPath(draggableEntry) {
    let draggableEntryPath;

    const name = this.getName();

    if (draggableEntry === this) {
      draggableEntryPath = name;  ///
    } else {
      draggableEntryPath = this.entries.getDraggableEntryPath(draggableEntry);

      if (draggableEntryPath !== null) {
        draggableEntryPath = name + '/' + draggableEntryPath;
      }
    }

    return draggableEntryPath;
  }

  topmostDirectory(path, addIfNecessary) {
    let topmostDirectory;

    const topmostDirectoryName = util.topmostDirectoryName(path);

    if (topmostDirectoryName === null) {
      topmostDirectory = null;
    } else {
      if (addIfNecessary) {
        const entriesDirectory = this.entries.hasDirectory(topmostDirectoryName);

        if (!entriesDirectory) {
          const collapsed = true,
                explorer = this.getExplorer();

          this.entries.addDirectory(topmostDirectoryName, explorer, collapsed);
        }
      }

      topmostDirectory = this.entries.retrieveDirectory(topmostDirectoryName);
    }

    return topmostDirectory;
  }

  getMarkedDirectory() {
    let markedDirectory = this.entries.getMarkedDirectory();

    if (markedDirectory === null) {
      const marked = this.isMarked();
      
      if (marked) {
        markedDirectory = this;
      }
    }

    return markedDirectory;
  }

  getDirectoryOverlappingDraggableEntry(draggableEntry) {
    let directoryOverlappingDraggableEntry = null;

    const overlappingDraggableEntry = this.isOverlappingDraggableEntry(draggableEntry);

    if (overlappingDraggableEntry) {
      directoryOverlappingDraggableEntry = this.entries.getDirectoryOverlappingDraggableEntry(draggableEntry);

      if (directoryOverlappingDraggableEntry === null) {
        directoryOverlappingDraggableEntry = this;
      }
    }

    return directoryOverlappingDraggableEntry;
  }
  
  toggleButtonUpdateHandler(collapsed) {
    collapsed ? 
      this.addClass('collapsed') : 
        this.removeClass('collapsed');
  }

  doubleClickHandler() {
    this.toggleButton.toggle();
  }

  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = Directory;
    }
    
    const { name, explorer, collapsed } = properties;
    
    return DraggableEntry.fromProperties(Class, properties, name, explorer, collapsed);
  }
}

Object.assign(Directory, {
  ignoredAttributes: [
    'name',
    'explorer',
    'collapsed'
  ]
});

module.exports = Directory;
