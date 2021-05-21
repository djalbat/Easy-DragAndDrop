"use strict";

import withStyle from "easy-with-style";  ///

import { pathUtilities, arrayUtilities } from "necessary";

import Entries from "./entries";
import DropTarget from "./dropTarget";
import FileNameMarkerEntry from "./entry/marker/fileName";
import FileNameDraggableEntry from "./entry/draggable/fileName";
import DirectoryNameMarkerEntry from "./entry/marker/directoryName";
import DirectoryNameDraggableEntry from "./entry/draggable/directoryName";

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
    const topmostDirectoryNameDraggableEntry = this.findTopmostDirectoryNameDraggableEntry(),
          topmostDirectoryNameDraggableEntryName = topmostDirectoryNameDraggableEntry.getName(),
          topmostDirectoryName = topmostDirectoryNameDraggableEntryName;  ///

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

  getFileNameDraggableEntry() {
    const { FileNameDraggableEntry } = this.constructor;

    return FileNameDraggableEntry;
  }

  getDirectoryNameMarkerEntry() {
    const { DirectoryNameMarkerEntry } = this.constructor;

    return DirectoryNameMarkerEntry;
  }

  getDirectoryNameDraggableEntry() {
    const { DirectoryNameDraggableEntry } = this.constructor;

    return DirectoryNameDraggableEntry;
  }

  mark(draggableEntry, previousDraggableEntry) {
    let markerEntryPath,
        draggableEntryType;

    const draggableEntryPath = draggableEntry.getPath();

    if (previousDraggableEntry !== null) {
      const previousDraggableEntryName = previousDraggableEntry.getName(),
            previousDraggableEntryType = previousDraggableEntry.getType();

      markerEntryPath = `${draggableEntryPath}/${previousDraggableEntryName}`;

      draggableEntryType = previousDraggableEntryType;  ///
    } else {
      draggableEntryType = draggableEntry.getType();

      markerEntryPath = draggableEntryPath; ///
    }

    this.addMarker(markerEntryPath, draggableEntryType);
  }

  unmark() {
    this.removeMarker();
  }

  isMarked() {
    const markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
          marked = (markedDirectoryNameDraggableEntry !== null);

    return marked;
  }

  isToBeMarked(draggableEntry) {
    const bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry),
          toBeMarked = (bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry !== null);

    return toBeMarked;
  }

  startDragging(draggableEntry) {
    const marked = this.isMarked(),
          startedDragging = !marked;

    if (startedDragging) {
      const previousDraggableEntry = null;

      this.mark(draggableEntry, previousDraggableEntry);
    }

    return startedDragging;
  }

  dragging(draggableEntry) {
    const explorer = draggableEntry.getExplorer(),
          markedDropTarget = this.getMarkedDropTarget();

    if (markedDropTarget !== this) {
      markedDropTarget.dragging(draggableEntry);

      return;
    }

    const dropTargetToBeMarked = this.getDropTargetToBeMarked(draggableEntry);

    if (dropTargetToBeMarked === this) {
      const draggingWithin = (explorer === this), ///
            noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

      if (draggingWithin && noDraggingWithinOptionPresent) {
        return;
      }

      const markedDirectoryNameDraggableEntry = this.retrieveMarkedDirectoryNameDraggableEntry(),
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

      if (markedDirectoryNameDraggableEntry !== bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry) {
        const previousDraggableEntry = draggableEntry;  ///

        draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;  ///

        this.unmark();

        this.mark(draggableEntry, previousDraggableEntry);
      }
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

  stopDragging(draggableEntry, done) {
    const markedDropTarget = this.getMarkedDropTarget(),
          draggableEntryPath = draggableEntry.getPath(),
          markedDirectoryNameDraggableEntry = markedDropTarget.retrieveMarkedDirectoryNameDraggableEntry(),
          draggableEntryPathWithoutBottommostName = pathWithoutBottommostNameFromPath(draggableEntryPath),
          sourcePath = draggableEntryPathWithoutBottommostName; ///

    let targetPath = null,
        duplicate = false;

    if (markedDirectoryNameDraggableEntry !== null) {
      const draggableEntryName = draggableEntry.getName(),
            name = draggableEntryName,  ///
            draggableEntryPresent = markedDirectoryNameDraggableEntry.isDraggableEntryPresent(name);

      if (draggableEntryPresent) {
        duplicate = true;
      } else {
        const markedDirectoryNameDraggableEntryPath = markedDirectoryNameDraggableEntry.getPath();

        targetPath = markedDirectoryNameDraggableEntryPath; ///
      }
    }

    const unmoved = (sourcePath === targetPath);

    if (duplicate || unmoved) {
      markedDropTarget.unmark();

      done();
    } else {
      const draggableEntrySubEntries = draggableEntry.retrieveDraggableSubEntries(),
            draggableEntries = draggableEntrySubEntries; ///

      draggableEntries.reverse();

      draggableEntries.push(draggableEntry);

      markedDropTarget.moveDraggableEntries(draggableEntries, sourcePath, targetPath, () => {
        markedDropTarget.unmark();

        done();
      });
    }
  }

  escapeDragging() {
    this.unmarkGlobally();
  }

  markDraggableEntry(draggableEntry) {
    const explorer = draggableEntry.getExplorer(),
          draggingWithin = (explorer === this), ///
          noDraggingWithinOptionPresent = this.isOptionPresent(NO_DRAGGING_WITHIN);

    if (draggingWithin && noDraggingWithinOptionPresent) {
      const previousDraggableEntry = null;

      this.mark(draggableEntry, previousDraggableEntry);
    } else {
      const previousDraggableEntry = draggableEntry,  ///
            bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry = this.retrieveBottommostDirectoryNameDraggableEntryOverlappingDraggableEntry(draggableEntry);

      draggableEntry = bottommostDirectoryNameDraggableEntryOverlappingDraggableEntry;  ///

      this.mark(draggableEntry, previousDraggableEntry);
    }
  }

  moveFileNameDraggableEntry(fileNameDraggableEntry, sourceFilePath, targetFilePath) {
    let draggableEntry = null;
    
    const explorer = fileNameDraggableEntry.getExplorer();

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

      fileNameDraggableEntry = this.addFilePath(filePath);

      draggableEntry = fileNameDraggableEntry;  ///
    }
    
    return draggableEntry;
  }
  
  moveDirectoryNameDraggableEntry(directoryNameDraggableEntry, sourceDirectoryPath, targetDirectoryPath) {
    let draggableEntry = null;
    
    const explorer = directoryNameDraggableEntry.getExplorer();
    
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

      const collapsed = directoryNameDraggableEntry.isCollapsed();

      directoryNameDraggableEntry = this.addDirectoryPath(directoryPath, collapsed);

      draggableEntry = directoryNameDraggableEntry; ///
    }
    
    return draggableEntry;
  }

  openFileNameDraggableEntry(fileNameDraggableEntry) {
    const fileNameDraggableEntryPath = fileNameDraggableEntry.getPath(),
          filePath = fileNameDraggableEntryPath;  ///

    this.openHandler(filePath);
  }

  pathMapsFromDraggableEntries(draggableEntries, sourcePath, targetPath) {
    const pathMaps = draggableEntries.map((draggableEntry) => {
      const pathMap = pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath);

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

    entries.addDirectoryNameDraggableEntry(directoryName, collapsed);

    const childElements = entries;  ///

    return childElements;
  }

  initialise() {
    this.assignContext();
  }

  static Entries = Entries;

  static FileNameMarkerEntry = FileNameMarkerEntry;

  static FileNameDraggableEntry = FileNameDraggableEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;

  static DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;

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

function pathMapFromDraggableEntry(draggableEntry, sourcePath, targetPath) {
  const draggableEntryPath = draggableEntry.getPath(),
        draggableEntryType = draggableEntry.getType(),
        draggableEntryDirectoryNameDraggableEntry = (draggableEntryType === DIRECTORY_NAME_TYPE),
        directory = draggableEntryDirectoryNameDraggableEntry;  ///

  targetPath = (sourcePath === null) ?
                  prependTargetPathToDraggableEntryPath(draggableEntryPath, targetPath) :  ///
                    replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath); ///

  sourcePath = draggableEntryPath;  ///

  const pathMap = {
    sourcePath,
    targetPath,
    directory
  };

  return pathMap;
}

function prependTargetPathToDraggableEntryPath(draggableEntryPath,  targetPath) {
  draggableEntryPath = `${targetPath}/${draggableEntryPath}`;

  return draggableEntryPath;
}

function replaceSourcePathWithTargetPathInDraggableEntryPath(draggableEntryPath, sourcePath, targetPath) {
  sourcePath = sourcePath.replace(/\(/g, "\\(").replace(/\)/g, "\\)");  ///

  const regExp = new RegExp(`^${sourcePath}(.*$)`),
        matches = draggableEntryPath.match(regExp),
        secondMatch = second(matches);

  draggableEntryPath = targetPath + secondMatch; ///

  return draggableEntryPath;
}
