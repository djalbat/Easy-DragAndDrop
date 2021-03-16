"use strict";

import { DirectoryNameDraggableEntry } from "../../../index"; ///

import ToggleButton from "../../button/toggle";
import DirectoryNameButton from "../../button/name/directory";

export default class extends DirectoryNameDraggableEntry {
  static ToggleButton = ToggleButton;

  static DirectoryNameButton = DirectoryNameButton;
};
