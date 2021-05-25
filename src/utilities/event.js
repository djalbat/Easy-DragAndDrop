"use strict";

export function mouseTopFromEvent(event) {
  const { pageY } = event,
        mouseTop = pageY; ///

  return mouseTop;
}

export function mouseLeftFromEvent(event) {
  const { pageX } = event,
        mouseLeft = pageX;  ///

  return mouseLeft;
}
