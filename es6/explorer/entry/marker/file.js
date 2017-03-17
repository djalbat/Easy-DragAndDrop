'use strict';

const Entry = require('../../entry'),
      Marker = require('../marker');

class FileMarker extends Marker {
  isBefore(entry) {
    const name = this.getName(),
          entryName = entry.getName(),
          entryType = entry.getType(),
          before = (entryType === Entry.types.DIRECTORY) ? 
                     false : 
                       (name.localeCompare(entryName) < 0);

    return before;
  }
  
  static fromProperties(properties) {
    return Marker.fromProperties(FileMarker, properties);
  }
}

module.exports = FileMarker;