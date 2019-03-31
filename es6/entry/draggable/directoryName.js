'use strict';

const easy = require('easy'),
      necessary = require('necessary');

const Entries = require('../../entries'),
      NameButton = require('../../nameButton'),
      entryTypes = require('../../entryTypes'),
      DraggableEntry = require('../../entry/draggable');

const { Button, React } = easy,
      { pathUtilities } = necessary,
      { topmostDirectoryNameFromPath, pathWithoutTopmostDirectoryNameFromPath } = pathUtilities,
      { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } = entryTypes;

class DirectoryNameDraggableEntry extends DraggableEntry {
  constructor(selector, explorer) {
    const type = DIRECTORY_NAME_TYPE;

    super(selector, type, explorer);
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

  isCollapsed() {
    const collapsed = this.hasClass('collapsed');

    return collapsed;
  }

  isBefore(entry) {
    let before;
    
    const entryType = entry.getType();

    switch (entryType) {
      case FILE_NAME_TYPE:
      case FILE_NAME_MARKER_TYPE:
      case DIRECTORY_NAME_MARKER_TYPE:
        before = true;
          
        break;

      case DIRECTORY_NAME_TYPE:
        const name = this.getName(),
              entryName = entry.getName();

        before = (name.localeCompare(entryName) < 0);

        break;
    }
    
    return before;
  }

  isMarked() {
    const markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent;  ///

    return marked;
  }

  isFileNameDraggableEntry() {
    return false;
  }

  isDirectoryNameDraggableEntry() {
    return true;
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

  addFilePath(filePath) {
    let fileNameDraggableEntry = null;

    const addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      fileNameDraggableEntry = topmostDirectoryNameDraggableEntry.addFilePath(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
            fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

      if (!fileNameDraggableEntryPresent) {
        const explorer = this.getExplorer();
        
        fileNameDraggableEntry = this.addFileNameDraggableEntry(fileName, explorer);
      }
    }

    return fileNameDraggableEntry;
  }

  removeFilePath(filePath) {
    let removeEmptyParentDirectoryNameDraggableEntries = null; ///

    const addIfNecessary = false,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(filePath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const filePathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(filePath);

      removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeFilePath(filePathWithoutTopmostDirectoryName);
    } else {
      const fileName = filePath,  ///
          fileNameDraggableEntryPresent = this.isFileNameDraggableEntryPresent(fileName);

      if (fileNameDraggableEntryPresent) {
        removeEmptyParentDirectoryNameDraggableEntries = this.removeFileNameDraggableEntry(fileName);
      }
    }

    if (removeEmptyParentDirectoryNameDraggableEntries === true) {
      const topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry();

      if (!topmostDirectoryNameDraggableEntry) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectoryNameDraggableEntries;
  }

  addDirectoryPath(directoryPath, collapsed) {
    let directoryNameDraggableEntry = null;

    const addIfNecessary = true,
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      directoryNameDraggableEntry = topmostDirectoryNameDraggableEntry.addDirectoryPath(directoryPathWithoutTopmostDirectoryName, collapsed);
    } else {
      const directoryName = directoryPath,  ///
            entriesDirectoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(directoryName),
            entriesDirectoryNameDraggableEntryPresent = (entriesDirectoryNameDraggableEntry !== null);

      if (entriesDirectoryNameDraggableEntryPresent) {
        entriesDirectoryNameDraggableEntry.setCollapsed(collapsed);
      } else {
        const explorer = this.getExplorer();

        directoryNameDraggableEntry = this.addDirectoryNameDraggableEntry(directoryName, explorer, collapsed, DirectoryNameDraggableEntry);
      }
    }

    return directoryNameDraggableEntry;
  }

  removeDirectoryPath(directoryPath) {
    let removeEmptyParentDirectoryNameDraggableEntries = false;

    const addIfNecessary = false, ///
          topmostDirectoryNameDraggableEntry = this.retrieveTopmostDirectoryNameDraggableEntry(directoryPath, addIfNecessary);

    if (topmostDirectoryNameDraggableEntry !== null) {
      const directoryPathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(directoryPath);

      removeEmptyParentDirectoryNameDraggableEntries = topmostDirectoryNameDraggableEntry.removeDirectoryPath(directoryPathWithoutTopmostDirectoryName);
    } else {
      const directoryName = directoryPath,  ///
            entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(directoryName);

      if (entriesDirectoryNameDraggableEntryPresent) {
        removeEmptyParentDirectoryNameDraggableEntries = this.removeDirectoryNameDraggableEntry(directoryName);
      }
    }

    if (removeEmptyParentDirectoryNameDraggableEntries === true) {
      const topmostDirectoryNameDraggableEntry = this.isTopmostDirectoryNameDraggableEntry();

      if (!topmostDirectoryNameDraggableEntry) {
        const empty = this.isEmpty();

        if (empty) {
          this.remove();
        }
      }
    }

    return removeEmptyParentDirectoryNameDraggableEntries;
  }
  
  retrieveTopmostDirectoryNameDraggableEntry(path, addIfNecessary) {
    let topmostDirectoryNameDraggableEntry;

    const topmostDirectoryName = topmostDirectoryNameFromPath(path);

    if (topmostDirectoryName === null) {
      topmostDirectoryNameDraggableEntry = null;
    } else {
      if (addIfNecessary) {
        const entriesDirectoryNameDraggableEntryPresent = this.isDirectoryNameDraggableEntryPresent(topmostDirectoryName);

        if (!entriesDirectoryNameDraggableEntryPresent) {
          const collapsed = true, ///
                explorer = this.getExplorer();

          this.addDirectoryNameDraggableEntry(topmostDirectoryName, explorer, collapsed, DirectoryNameDraggableEntry);
        }
      }

      const directoryNameDraggableEntry = this.findDirectoryNameDraggableEntry(topmostDirectoryName);

      topmostDirectoryNameDraggableEntry = directoryNameDraggableEntry; ///
    }

    return topmostDirectoryNameDraggableEntry;
  }

  toggleButtonClickHandler() {
    this.toggle();
  }

  doubleClickHandler() {
    this.toggle();
  }

  setCollapsed(collapsed) {
    collapsed ?
      this.collapse() :
        this.expand();
  }

  collapse() {
    this.addClass('collapsed');
  }

  expand() {
    this.removeClass('collapsed');
  }

  toggle() {
    this.toggleClass('collapsed');
  }

  childElements(properties) {
    const { name } = properties,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);

    return ([

      <Button className="toggle" onClick={toggleButtonClickHandler} />,
      <NameButton>{name}</NameButton>,
      <Entries />

    ]);
  }
  
  initialise(collapsed) {
    this.setCollapsed(collapsed);

    super.initialise();
  }
  
  static fromProperties(Class, properties) {
    if (arguments.length === 1) {
      properties = Class;
      Class = DirectoryNameDraggableEntry;
    }

    const { collapsed = false } = properties,
          directoryNameDraggableEntry = DraggableEntry.fromProperties(Class, properties);

    directoryNameDraggableEntry.initialise(collapsed);

    return directoryNameDraggableEntry;
  }
}

Object.assign(DirectoryNameDraggableEntry, {
  defaultProperties: {
    className: 'directory-name'
  },
  ignoredProperties: [
    'collapsed'
  ]
});

module.exports = DirectoryNameDraggableEntry;
