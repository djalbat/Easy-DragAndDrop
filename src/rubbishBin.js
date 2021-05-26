"use strict";

import withStyle from "easy-with-style";  ///

import DropTarget from "./dropTarget";

import { DIRECTORY_NAME_TYPE } from "./types";

class RubbishBin extends DropTarget {
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

  mark(dragEntry, previousDragEntry) {
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

  isToBeMarked(dragEntry) {
    const bounds = this.getBounds(),
          dragEntryCollapsedBounds = dragEntry.getCollapsedBounds(),
          overlappingDragEntryCollapsedBounds = bounds.areOverlapping(dragEntryCollapsedBounds),
          toBeMarked = overlappingDragEntryCollapsedBounds; ///

    return toBeMarked;
  }

  dragging(dragEntry) {
    const explorer = dragEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget !== this) {
      return;
    }

    const dropTargetToBeMarked = this.getDropTargetToBeMarked(dragEntry);

    if (dropTargetToBeMarked === this) {
      ///
    } else if (dropTargetToBeMarked !== null) {
      dropTargetToBeMarked.markDragEntry(dragEntry);

      this.unmark();
    } else {
      const dropTargetToBeMarked = explorer,  ///
            previousDragEntry = null;

      dropTargetToBeMarked.mark(dragEntry, previousDragEntry);

      this.unmark();
    }
  }

  markDragEntry(dragEntry) {
    const previousDragEntry = null;

    this.mark(dragEntry, previousDragEntry);
  }

  moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath) {
    const dragEntry = null;

    if (targetFilePath === null) {
      const explorer = fileNameDragEntry.getExplorer(),
            filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    }

    return dragEntry;
  }

  moveDirectoryNameDragEntry(directoryNameDragEntry, sourceDirectoryPath, targetDirectoryPath) {
    const dragEntry = null;

    if (targetDirectoryPath === null) {
      const explorer = directoryNameDragEntry.getExplorer(),
            directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    }

    return dragEntry;
  }

  pathMapsFromDragEntries(dragEntries, sourcePath, targetPath) {
    const pathMaps = dragEntries.map((dragEntry) => {
      const pathMap = pathMapFromDragEntry(dragEntry, sourcePath, targetPath);
      
      return pathMap;
    });

    return pathMaps;
  }

  retrieveMarkedDirectoryNameDragEntry() {
    const markedDirectoryNameDragEntry = null; ///

    return markedDirectoryNameDragEntry;
  }

  retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry) {
    const bottommostDirectoryNameDragEntryOverlappingDragEntry = null; ///

    return bottommostDirectoryNameDragEntryOverlappingDragEntry;
  }

  initialise() {
    this.close();

    super.initialise();
  }

  static tagName = "div";

  static defaultProperties = {
    className: "rubbish-bin"
  };

  static ignoredProperties = [
    "onRemove"
  ];

  static fromClass(Class, properties) {
    const { onRemove = defaultRemoveHandler} = properties,
          removeHandler = onRemove, ///
          moveHandler = removeHandler,  ///
          rubbishBin = DropTarget.fromClass(Class, properties, moveHandler);

    return rubbishBin;
  }
}

export default withStyle(RubbishBin)`

  width: 4rem;
  height: 4rem;
  background-image: url("css/image/rubbish-bin.png");
  background-repeat: no-repeat;
  
  .open {
    background-image: url("css/image/open-rubbish-bin.png");
  }

`;

function defaultRemoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDragEntry(dragEntry, sourcePath, targetPath) {
  const dragEntryPath = dragEntry.getPath(),
        dragEntryType = dragEntry.getType(),
        dragEntryDirectoryNameDragEntry = (dragEntryType === DIRECTORY_NAME_TYPE),
        directory = dragEntryDirectoryNameDragEntry;  ///

  targetPath = null;  ///

  sourcePath = dragEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}
