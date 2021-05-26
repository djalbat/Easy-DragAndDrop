"use strict";

import { pathUtilities } from "necessary";

import DragEntry from "../../entry/drag";
import ToggleButton from "../../button/toggle";
import DirectoryNameButton from "../../button/name/directory";

import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

const { pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

export default class DirectoryNameDragEntry extends DragEntry {
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

  isFileNameDragEntry() {
    return false;
  }

  isDirectoryNameDragEntry() {
    return true;
  }

  isOverlappingDragEntry(dragEntry) {
    let overlappingDragEntry;
    
    if (this === dragEntry) {
      overlappingDragEntry = false;
    } else {
      const collapsed = this.isCollapsed();
      
      if (collapsed) {
        overlappingDragEntry = false;
      } else {
        const dragEntryCollapsedBounds = dragEntry.getCollapsedBounds(),
              overlappingDragEntryCollapsedBounds = super.isOverlappingCollapsedBounds(dragEntryCollapsedBounds);

        overlappingDragEntry = overlappingDragEntryCollapsedBounds;
      }
    }

    return overlappingDragEntry;
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
}
