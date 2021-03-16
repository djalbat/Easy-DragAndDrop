"use strict";

import { pathUtilities } from "necessary";

import ToggleButton from "../../button/toggle";
import DraggableEntry from "../../entry/draggable";
import DirectoryNameButton from "../../button/name/directory";

import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

const { pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

export default class DirectoryNameDraggableEntry extends DraggableEntry {
  type = DIRECTORY_NAME_TYPE; ///

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

  getDirectoryNameButton() {
    const { DirectoryNameButton } = this.constructor;

    return DirectoryNameButton;
  }

  getToggleButton() {
    const { ToggleButton } = this.constructor;

    return ToggleButton;
  }

  isMarked() {
    const markerEntryPresent = this.isMarkerEntryPresent(),
          marked = markerEntryPresent;  ///

    return marked;
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

  isTopmost() {
    const path = this.getPath(),
          pathWithoutTopmostDirectoryName = pathWithoutTopmostDirectoryNameFromPath(path),
          topmost = (pathWithoutTopmostDirectoryName === null);

    return topmost;
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
    this.collapseEntries();

    this.collapseToggleButton();
  }

  expand() {
    this.expandEntries();

    this.expandToggleButton();
  }

  toggle() {
    let collapsed = this.isCollapsed();

    collapsed = !collapsed;

    this.setCollapsed(collapsed);
  }

  childElements() {
    const { name, explorer } = this.properties,
          directoryName = name, ///
          Entries = explorer.getEntries(),
          ToggleButton = this.getToggleButton(),
          DirectoryNameButton = this.getDirectoryNameButton(),
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);

    return ([

      <ToggleButton onClick={toggleButtonClickHandler} />,
      <DirectoryNameButton>{directoryName}</DirectoryNameButton>,
      <Entries explorer={explorer} />

    ]);
  }
  
  initialise() {
    super.initialise();

    const { collapsed = false } = this.properties;

    this.setCollapsed(collapsed);
  }

  static ToggleButton = ToggleButton;

  static DirectoryNameButton = DirectoryNameButton;

  static defaultProperties = {
    className: "directory-name"
  };

  static ignoredProperties = [
    "collapsed"
  ];

  static fromClass(Class, properties) {
    const directoryNameDraggableEntry = DraggableEntry.fromClass(Class, properties);

    directoryNameDraggableEntry.initialise();

    return directoryNameDraggableEntry;
  }
}
