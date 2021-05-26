"use strict";

import withStyle from "easy-with-style";  ///

import { pathUtilities, arrayUtilities } from "necessary";

import Entries from "./entries";
import DropTarget from "./dropTarget";
import FileNameDragEntry from "./entry/drag/fileName";
import FileNameMarkerEntry from "./entry/marker/fileName";
import DirectoryNameDragEntry from "./entry/drag/directoryName";
import DirectoryNameMarkerEntry from "./entry/marker/directoryName";

import { NO_DRAGGING_WITHIN } from "./options";
import { DIRECTORY_NAME_TYPE } from "./types";

const { second } = arrayUtilities,
      { pathWithoutBottommostNameFromPath } = pathUtilities;

class Explorer extends DropTarget {
  constructor(selector, dropTargets, moveHandler, openHandler, options) {
    super(selector, dropTargets, moveHandler);

    this.openHandler = openHandler;

    this.options = options;
  }

  isOptionPresent(option) {
    const optionPresent = !!this.options[option];

    return optionPresent;
  }

  setOptions(options) {
    this.options = options;
  }

  setOption(option) {
    this.options[option] = true;
  }

  unsetOption(option) {
    delete(this.options[option]);
  }

  getFilePaths() {
    const filePaths = this.retrieveFilePaths();

    return filePaths;
  }

  getDirectoryPaths() {
    const directoryPaths = this.retrieveDirectoryPaths();

    return directoryPaths;
  }

  getTopmostDirectoryName() {
    const topmostDirectoryNameDragEntry = this.findTopmostDirectoryNameDragEntry(),
          topmostDirectoryNameDragEntryName = topmostDirectoryNameDragEntry.getName(),
          topmostDirectoryName = topmostDirectoryNameDragEntryName;  ///

    return topmostDirectoryName;
  }

  getEntries() {
    const { Entries } = this.constructor;

    return Entries;
  }

  getFileNameMarkerEntry() {
    const { FileNameMarkerEntry } = this.constructor;

    return FileNameMarkerEntry;
  }

  getFileNameDragEntry() {
    const { FileNameDragEntry } = this.constructor;

    return FileNameDragEntry;
  }

  getDirectoryNameMarkerEntry() {
    const { DirectoryNameMarkerEntry } = this.constructor;

    return DirectoryNameMarkerEntry;
  }

  getDirectoryNameDragEntry() {
    const { DirectoryNameDragEntry } = this.constructor;

    return DirectoryNameDragEntry;
  }

  mark(dragEntry, previousDragEntry) {
    let markerEntryPath,
        dragEntryType;

    const dragEntryPath = dragEntry.getPath();

    if (previousDragEntry !== null) {
      const previousDragEntryName = previousDragEntry.getName(),
            previousDragEntryType = previousDragEntry.getType();

      markerEntryPath = `${dragEntryPath}/${previousDragEntryName}`;

      dragEntryType = previousDragEntryType;  ///
    } else {
      dragEntryType = dragEntry.getType();

      markerEntryPath = dragEntryPath; ///
    }

    this.addMarker(markerEntryPath, dragEntryType);
  }

  unmark() {
    this.removeMarker();
  }

  isMarked() {
    const markedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry(),
          marked = (markedDirectoryNameDragEntry !== null);

    return marked;
  }

  isToBeMarked(dragEntry) {
    const bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry),
          toBeMarked = (bottommostDirectoryNameDragEntryOverlappingDragEntry !== null);

    return toBeMarked;
  }

  hasStartedDragging(dragEntry) {
    const marked = this.isMarked(),
          startedDragging = !marked;

    if (startedDragging) {
      const previousDragEntry = null;

      this.mark(dragEntry, previousDragEntry);
    }

    return startedDragging;
  }

  dragging(dragEntry) {
    const explorer = dragEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget !== this) {
      markedDropTarget.dragging(dragEntry);

      return;
    }

    const dropTargetToBeMarked = this.getDropTargetToBeMarked(dragEntry);

    if (dropTargetToBeMarked === this) {
      const draggingWithin = (explorer === this), ///
            noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

      if (draggingWithin && noDraggingWithinOptionPresent) {
        return;
      }

      const markedDirectoryNameDragEntry = this.retrieveMarkedDirectoryNameDragEntry(),
            bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);

      if (markedDirectoryNameDragEntry !== bottommostDirectoryNameDragEntryOverlappingDragEntry) {
        const previousDragEntry = dragEntry;  ///

        dragEntry = bottommostDirectoryNameDragEntryOverlappingDragEntry;  ///

        this.unmark();

        this.mark(dragEntry, previousDragEntry);
      }
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

  stopDragging(dragEntry, done) {
    const markedDropTarget = this.getMarkedDropTarget(),
          dragEntryPath = dragEntry.getPath(),
          markedDirectoryNameDragEntry = markedDropTarget.retrieveMarkedDirectoryNameDragEntry(),
          dragEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(dragEntryPath),
          sourcePath = dragEntryPathWithoutBottommostName; ///

    let targetPath = null,
        duplicate = false;

    if (markedDirectoryNameDragEntry !== null) {
      const dragEntryName = dragEntry.getName(),
            name = dragEntryName,  ///
            dragEntryPresent = markedDirectoryNameDragEntry.isDragEntryPresent(name);

      if (dragEntryPresent) {
        duplicate = true;
      } else {
        const markedDirectoryNameDragEntryPath = markedDirectoryNameDragEntry.getPath();

        targetPath = markedDirectoryNameDragEntryPath; ///
      }
    }

    const unmoved = (sourcePath === targetPath);

    if (duplicate || unmoved) {
      markedDropTarget.unmark();

      done();
    } else {
      const dragEntrySubEntries = dragEntry.retrieveDragSubEntries(),
            dragEntries = dragEntrySubEntries; ///

      dragEntries.reverse();

      dragEntries.push(dragEntry);

      markedDropTarget.moveDragEntries(dragEntries, sourcePath, targetPath, () => {
        markedDropTarget.unmark();

        done();
      });
    }
  }

  escapeDragging() {
    this.unmarkGlobally();
  }

  markDragEntry(dragEntry) {
    const explorer = dragEntry.getExplorer(),
          draggingWithin = (explorer === this), ///
          noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

    if (draggingWithin && noDraggingWithinOptionPresent) {
      const previousDragEntry = null;

      this.mark(dragEntry, previousDragEntry);
    } else {
      const previousDragEntry = dragEntry,  ///
            bottommostDirectoryNameDragEntryOverlappingDragEntry = this.retrieveBottommostDirectoryNameDragEntryOverlappingDragEntry(dragEntry);

      dragEntry = bottommostDirectoryNameDragEntryOverlappingDragEntry;  ///

      this.mark(dragEntry, previousDragEntry);
    }
  }

  moveFileNameDragEntry(fileNameDragEntry, sourceFilePath, targetFilePath) {
    let dragEntry = null;
    
    const explorer = fileNameDragEntry.getExplorer();

    let filePath;

    if (targetFilePath === sourceFilePath) {
      ///
    } else if (targetFilePath === null) {
      filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);
    } else {
      filePath = sourceFilePath;  ///

      explorer.removeFilePath(filePath);

      filePath = targetFilePath; ///

      fileNameDragEntry = this.addFilePath(filePath);

      dragEntry = fileNameDragEntry;  ///
    }
    
    return dragEntry;
  }
  
  moveDirectoryNameDragEntry(directoryNameDragEntry, sourceDirectoryPath, targetDirectoryPath) {
    let dragEntry = null;
    
    const explorer = directoryNameDragEntry.getExplorer();
    
    let directoryPath;
    
    if (targetDirectoryPath === sourceDirectoryPath) {
      ///
    } else if (targetDirectoryPath === null) {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);
    } else {
      directoryPath = sourceDirectoryPath;  ///

      explorer.removeDirectoryPath(directoryPath);

      directoryPath = targetDirectoryPath; ///

      const collapsed = directoryNameDragEntry.isCollapsed();

      directoryNameDragEntry = this.addDirectoryPath(directoryPath, collapsed);

      dragEntry = directoryNameDragEntry; ///
    }
    
    return dragEntry;
  }

  openFileNameDragEntry(fileNameDragEntry) {
    const fileNameDragEntryPath = fileNameDragEntry.getPath(),
          filePath = fileNameDragEntryPath;  ///

    this.openHandler(filePath);
  }

  pathMapsFromDragEntries(dragEntries, sourcePath, targetPath) {
    const pathMaps = dragEntries.map((dragEntry) => {
      const pathMap = pathMapFromDragEntry(dragEntry, sourcePath, targetPath);

      return pathMap;
    });

    return pathMaps;
  }

  childElements() {
    const { topmostDirectoryName, topmostDirectoryCollapsed } = this.properties,
          Entries = this.getEntries(),
          explorer = this,  ///
          collapsed = topmostDirectoryCollapsed,  ///
          directoryName = topmostDirectoryName, ///
          entries =

            <Entries explorer={explorer} />

          ;

    const directoryNameDragEntry = entries.createDirectoryNameDragEntry(directoryName, collapsed);

    entries.addEntry(directoryNameDragEntry);

    const childElements = entries;  ///

    return childElements;
  }

  initialise() {
    this.assignContext();
  }

  static Entries = Entries;

  static FileNameMarkerEntry = FileNameMarkerEntry;

  static FileNameDragEntry = FileNameDragEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;

  static DirectoryNameDragEntry = DirectoryNameDragEntry;

  static tagName = "div";

  static defaultProperties = {
    className: "explorer"
  };

  static ignoredProperties = [
    "onOpen",
    "onMove",
    "options",
    "topmostDirectoryName",
    "topmostDirectoryCollapsed"
  ];

  static fromClass(Class, properties) {
    const { onMove = defaultMoveHandler, onOpen = defaultOpenHandler, options = {} } = properties, ///
          moveHandler = onMove, ///
          openHandler = onOpen, ///
          explorer = DropTarget.fromClass(Class, properties, moveHandler, openHandler, options);

    return explorer;
  }
}

export default withStyle(Explorer)`

  width: auto;
  display: inline-block;
  position: relative;
  overflow: hidden;
  margin-left: -2.4rem;

`;

function defaultOpenHandler(sourcePath) {
  ///
}

function defaultMoveHandler(pathMaps, done) {
  done();
}

function pathMapFromDragEntry(dragEntry, sourcePath, targetPath) {
  const dragEntryPath = dragEntry.getPath(),
        dragEntryType = dragEntry.getType(),
        dragEntryDirectoryNameDragEntry = (dragEntryType === DIRECTORY_NAME_TYPE),
        directory = dragEntryDirectoryNameDragEntry;  ///

  targetPath = (sourcePath === null) ?
                  prependTargetPathToDragEntryPath(dragEntryPath, targetPath) :  ///
                    replaceSourcePathWithTargetPathInDragEntryPath(dragEntryPath, sourcePath, targetPath); ///

  sourcePath = dragEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}

function prependTargetPathToDragEntryPath(dragEntryPath,  targetPath) {
  dragEntryPath = `${targetPath}/${dragEntryPath}`;

  return dragEntryPath;
}

function replaceSourcePathWithTargetPathInDragEntryPath(dragEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, "\\(").replace(/\)/g, "\\)");  ///

  const regExp = new RegExp(`^${sourcePath}(.*$)`),
        matches = dragEntryPath.match(regExp),
        secondMatch = second(matches);

  dragEntryPath = targetPath + secondMatch; ///

  return dragEntryPath;
}
