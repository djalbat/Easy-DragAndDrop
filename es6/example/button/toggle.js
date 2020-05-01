"use strict";

import withStyle from "easy-with-style";  ///

import { ToggleButton } from "../../index";

export default withStyle(ToggleButton)`

  background-color: green;
  
  .collapsed {
    background-color: lightgreen;
  }
  
`;
