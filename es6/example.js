"use strict";

import { React, Body } from "easy";

import View from "./example/view"

Object.assign(window, {
  React
});

const body = new Body();

body.prepend(

  <View />

);
