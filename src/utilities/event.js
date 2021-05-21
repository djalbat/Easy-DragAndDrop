"use strict";

import { window } from "easy";

export function mouseTopFromEvent(event) {
  const { pageY } = event,
        scrollTop = window.getScrollTop(),
        mouseTop = pageY + scrollTop;

  return mouseTop;
}

export function mouseLeftFromEvent(event) {
  const { pageX } = event,
        scrollLeft = window.getScrollLeft(),
        mouseLeft = pageX + scrollLeft;

  return mouseLeft;
}

