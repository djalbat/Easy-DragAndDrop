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
DragEvent.dragging = function(entry) { return new DragEvent(entry, DragEvent.types.DRAGGING); };

DragEvent.types = {
  START: 'START',
  STOP: 'STOP',
  DRAGGING: 'DRAGGING'
};

module.exports = DragEvent;
