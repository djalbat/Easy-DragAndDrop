"use strict";

import withStyle from "easy-with-style";  ///

import Entry from "../entry";
import draggableMixins from "../mixins/draggable";
import draggableEntryMixins from "../mixins/entry/draggable";

class DraggableEntry extends Entry {
  getPath() {
    const explorer = this.getExplorer(),
          draggableEntry = this,  ///
          path = explorer.retrieveDraggableEntryPath(draggableEntry);

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

  isTopmostDirectoryNameDraggableEntry() {
    let topmostDirectoryNameDraggableEntry = false;

    const directoryNameDraggableEntry = this.isDirectoryNameDraggableEntry();

    if (directoryNameDraggableEntry) {
      const directoryNameDraggableEntry = this, ///
            directoryNameDraggableEntryTopmost = directoryNameDraggableEntry.isTopmost();

      if (directoryNameDraggableEntryTopmost) {
        topmostDirectoryNameDraggableEntry = true;
      }
    }

    return topmostDirectoryNameDraggableEntry;
  }

  initialise() {
    this.assignContext();
  }

  static tagName = "li";

  static defaultProperties = {
    className: "draggable"
  };

  static ignoredProperties = [
    "explorer"
  ];
}

Object.assign(DraggableEntry.prototype, draggableMixins);
Object.assign(DraggableEntry.prototype, draggableEntryMixins);

export default withStyle(DraggableEntry)`

  .dragging {
    z-index: 1;
    position: fixed;
  }

`;
