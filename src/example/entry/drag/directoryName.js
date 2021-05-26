"use strict";

import { DirectoryNameDragEntry } from "../../../index"; ///

import ToggleButton from "../../button/toggle";
import DirectoryNameButton from "../../button/name/directory";

export default class extends DirectoryNameDragEntry {
  static ToggleButton = ToggleButton;

  static DirectoryNameButton = DirectoryNameButton;
};
