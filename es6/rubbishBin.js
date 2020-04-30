"use strict";

import DropTarget from "./dropTarget";

import { DIRECTORY_NAME_TYPE } from "./types";

export default class RubbishBin extends DropTarget {
  open() {
    this.addClass("open");
  }

  close() {
    this.removeClass("open");
  }

  isOpen() {
    const open = this.hasClass("open");

    return open;
  }

  mark(draggableEntry, previousDraggableEntry) {
    this.open();
  }

  unmark() {
    this.close();
  }

  isMarked() {
    const open = this.isOpen(),
          marked = open;  ///

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const bounds = this.getBounds(),
          draggableEntryCollapsedBounds = draggableEntry.getCollapsedBounds(),
          overlappingDraggableEntryCollapsedBounds = bounds.areOverlapping(draggableEntryCollapsedBounds),
          toBeMarked = overlappingDraggableEntryCollapsedBounds; ///

    return toBeMarked;
  }

  dragging(draggableEntry) {
    const explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget !== this) {
      return;
    }

    const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

    if (dropTargetToBeMarked === this) {
      ///
    } else if (dropTargetToBeMarked !== null) {
      dropTargetToBeMarked.markDraggableEntry(draggableEntry);

      this.unmark();
    } else {
      const dropTargetToBeMarked = explorer,  ///
            previousDraggableEntry = null;

      dropTargetToBeMarked.mark(draggableEntry, previousDraggableEntry);

      this.unmark();
    }
  }

  markDraggableEntry(draggableEntry) {
    const previousDraggableEntry = null;

    this.mark(draggableEntry, previousDraggableEntry);
  }

  moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
    const draggableEntry = null;

    if (targetFilePath === null) {
      const explorer = fileNameDraggableEntry.getExplorer(),
            filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    }

    return draggableEntry;
  }

  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    const draggableEntry = null;

    if (targetDirectoryPath === null) {
      const explorer = directoryNameDraggableEntry.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    }

    return draggableEntry;
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map((draggableEntry) => {
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);
      
      return pathMap;
    });

    return pathMaps;
  }

  retrieveMarkedDirectoryNameDraggableEntry() {
    const markedDirectoryNameDraggableEntry = null; ///

    return markedDirectoryNameDraggableEntry;
  }

  retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry) {
    const bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = null; ///

    return bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;
  }

  initialise() {
    this.close();
  }

  static tagName = "div";

  static defaultProperties = {
    className: "rubbish-bin"
  };

  static ignoredProperties = [
    "onRemove"
  ];

  static fromClass(Class, properties) {
    const { onRemove } = properties,
          removeHandler = onRemove || defaultRemoveHandler, ///
          moveHandler = removeHandler,  ///
          rubbishBin = DropTarget.fromClass(Class, properties, moveHandler);

    rubbishBin.initialise();
    
    return rubbishBin;
  }
}

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryType = draggableEntry.getType(),
        draggableEntryDirectoryNameDraggableEntry = (draggableEntryType === DIRECTORY_NAME_TYPE),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

  targetPath = null;  ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}
