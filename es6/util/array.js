'use strict';

class arrayUtil {
  static first(array) { return array[0]; }

  static second(array) { return array[1]; }

  static last(array) { return array[array.length - 1]; }

  static indexOf(array, element) {
    let index = -1;

    array.some(function(currentElement, currentElementIndex) {
      if (currentElement === element) {
        index = currentElementIndex;

        return true;
      }
    });

    return index;
  }

  static find(array, callback) {
    let element = null;

    array.some(function(currentElement) {
      if (callback(currentElement)) {
        element = currentElement;

        return true;
      }
    });

    return element;
  }
}

module.exports = arrayUtil;
