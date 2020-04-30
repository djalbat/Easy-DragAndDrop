"use strict";

import { Button } from "easy";
import { pathUtilities } from "necessary";

import Entries from "../../entries";
import NameButton from "../../button/name";
import DraggableEntry from "../../entry/draggable";

import { FILE_NAME_TYPE, DIRECTORY_NAME_TYPE, FILE_NAME_MARKER_TYPE, DIRECTORY_NAME_MARKER_TYPE } from "../../types";

const { pathWithoutTopmostDirectoryNameFromPath } = pathUtilities;

export default class DirectoryNameDraggableEntry extends DraggableEntry {
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
    const collapsed = this.hasClass("collapsed");

    return collapsed;
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
    this.addClass("collapsed");
  }

  expand() {
    this.removeClass("collapsed");
  }

  toggle() {
    this.toggleClass("collapsed");
  }

  childElements(properties) {
    const { name, explorer } = properties,
          toggleButtonClickHandler = this.toggleButtonClickHandler.bind(this);

    return ([

      <Button className="toggle" onClick={toggleButtonClickHandler} />,
      <NameButton>{name}</NameButton>,
      <Entries explorer={explorer} />

    ]);
  }
  
  initialise(properties) {
    const { collapsed = false } = properties;

    this.setCollapsed(collapsed);

    super.initialise(properties);
  }
  
  static fromClass(Class, properties) {
    const type = DIRECTORY_NAME_TYPE, ///
          directoryNameDraggableEntry = DraggableEntry.fromClass(Class, properties, type);

    directoryNameDraggableEntry.initialise(properties);

    return directoryNameDraggableEntry;
  }

  static defaultProperties = {
    className: "directory-name"
  };

  static ignoredProperties = [
    "collapsed"
  ];
}
