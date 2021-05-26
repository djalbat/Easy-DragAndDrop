"use strict";

function initialise() {
  const dropTargets = [];

  this.setState({
    dropTargets
  });
}

function addDropTarget(dropTarget, reciprocated = false) {
  const state = this.getState(),
        { dropTargets } = state;

  dropTargets.push(dropTarget);

  if (reciprocated) {
    dropTarget.addDropTarget(this); ///
  }
}

function removeDropTarget(dropTarget, reciprocated = false) {
  const state = this.getState(),
        { dropTargets } = state,
        index = dropTargets.indexOf(dropTarget);

  if (index !== -1) {
    const start = index,  ///
          deleteCount = 1;

    dropTargets.splice(start, deleteCount);
  }

  if (reciprocated) {
    dropTarget.removeDropTarget(this); ///
  }
}

function isOverlappingDragEntry(dragEntryCollapsedBounds) {
  const bounds = this.getBounds(),
        boundsOverlappingDragEntry = bounds.areOverlapping(dragEntryCollapsedBounds),
        overlappingDragEntry = boundsOverlappingDragEntry;

  return overlappingDragEntry;
}

module.exports = {
  initialise,
  addDropTarget,
  removeDropTarget,
  isOverlappingDragEntry
};
