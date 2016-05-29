'use strict';

var easyui = require('easyui'),
    Element = easyui.Element;

var util = require('./util');

class DroppableElement extends Element {
  constructor(selector) {
    super(selector);
  }

  isOverlappingDraggableElement(draggableElement) {
    var bounds = this.getBounds(),
        draggableElementDraggingBounds = draggableElement.getDraggingBounds(),
        overlappingDraggableElement = bounds.areOverlapping(draggableElementDraggingBounds);

    return overlappingDraggableElement;
  }
  
  moveEntries(entry, subEntries, sourcePath, targetPath, done) {
    this.moveSubEntries(subEntries, sourcePath, targetPath, function() {
      var isSubEntry = false;

      this.moveEntry(entry, sourcePath, targetPath, isSubEntry, done);
    }.bind(this));
  }

  moveSubEntries(subEntries, sourcePath, targetPath, done) {
    subEntries.reverse(); ///

    var isSubEntry = true;

    asyncForEach(
      subEntries,
      function(subEntry, next) {
        this.moveEntry(subEntry, sourcePath, targetPath, isSubEntry, next);
      }.bind(this),
      done
    )
  }

  moveEntry(entry, sourcePath, targetPath, isSubEntry, next) {
    var entryPath = entry.getPath(),
        sourceEntryPath = entryPath,  ///
        targetEntryPath = targetPath === null ?
          null :
            util.replaceTopmostPath(entryPath, sourcePath, targetPath), ///
        entryIsDirectory = entry.isDirectory();

    entryIsDirectory ?
      this.moveDirectory(entry, sourceEntryPath, targetEntryPath, isSubEntry, next) :
        this.moveFile(entry, sourceEntryPath, targetEntryPath, isSubEntry, next);
  }
}

module.exports = DroppableElement;

function asyncForEach(array, cb, done) {
  var arrayLength = array.length,
      index = -1;

  var next = function() {
    index++;

    if (index === arrayLength) {
      done();
    } else {
      var element = array[index];

      cb(element, next);
    }
  };

  next();
}
