"use strict";

import withStyle from "easy-with-style";  ///

import { Explorer } from "../index";  ///

import Entries from "./entries";
import FileNameMarkerEntry from "./entry/marker/fileName";
import FileNameDraggableEntry from "./entry/draggable/fileName";
import DirectoryNameMarkerEntry from "./entry/marker/directoryName";
import DirectoryNameDraggableEntry from "./entry/draggable/directoryName";

export default withStyle(class extends Explorer {
  static Entries = Entries;

  static FileNameMarkerEntry = FileNameMarkerEntry;

  static FileNameDraggableEntry = FileNameDraggableEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;

  static DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;
})`

  font-size: 1.2rem;
  font-weight: bold;
  font-family: monospace;
  
`;
