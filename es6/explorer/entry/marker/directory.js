'use strict';

const Entry = require('../../entry'),
      Marker = require('../marker');

class DirectoryMarker extends Marker {
  isBefore(entry) {
    const name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = (entryType === Entry.types.FILE) ?
                     true :
                       (name.localeCompare(entryName) < 0);

    return before;
  }
  
  static fromProperties(properties) {
    return Marker.fromProperties(DirectoryMarker, properties);
  }
}

module.exports = DirectoryMarker;
