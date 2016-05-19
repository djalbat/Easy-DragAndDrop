'use strict';

class DragEvent {
  constructor(entry, type) {
    this.entry = entry;
    this.type = type;
  }

  getEntry() {
    return this.entry;
  }

  getType() {
    return this.type;
  }
}

DragEvent.start = function(entry) { return new DragEvent(entry, DragEvent.types.START); };
DragEvent.stop = function(entry) { return new DragEvent(entry, DragEvent.types.STOP); };
DragEvent.drag = function(entry) { return new DragEvent(entry, DragEvent.types.DRAG); };

DragEvent.types = {
  START: 'START',
  STOP: 'STOP',
  DRAG: 'DRAG'
};

module.exports = DragEvent;
