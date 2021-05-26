"use strict";

import withStyle from "easy-with-style";  ///

import Entry from "../entry";
import dragMixins from "../mixins/drag";
import dragEntryMixins from "../mixins/entry/drag";

class DragEntry extends Entry {
  getPath() {
    const explorer = this.getExplorer(),
          dragEntry = this,  ///
          path = explorer.retrieveDragEntryPath(dragEntry);

    return path;
  }

  getExplorer() {
    const { explorer } = this.properties;

    return explorer;
  }

  isOverlappingCollapsedBounds(collapsedBounds) {
    const bounds = this.getBounds(),
          overlappingCollapsedBounds = bounds.areOverlapping(collapsedBounds);

    return overlappingCollapsedBounds;
  }

  isTopmostDirectoryNameDragEntry() {
    let topmostDirectoryNameDragEntry = false;

    const directoryNameDragEntry = this.isDirectoryNameDragEntry();

    if (directoryNameDragEntry) {
      const directoryNameDragEntry = this, ///
            directoryNameDragEntryTopmost = directoryNameDragEntry.isTopmost();

      if (directoryNameDragEntryTopmost) {
        topmostDirectoryNameDragEntry = true;
      }
    }

    return topmostDirectoryNameDragEntry;
  }

  initialise() {
    this.assignContext();
  }

  static tagName = "li";

  static defaultProperties = {
    className: "drag"
  };

  static ignoredProperties = [
    "explorer"
  ];
}

Object.assign(DragEntry.prototype, dragMixins);
Object.assign(DragEntry.prototype, dragEntryMixins);

export default withStyle(DragEntry)`

  .dragging {
    z-index: 1;
    position: fixed;
  }

`;
