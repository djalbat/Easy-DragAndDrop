"use strict";

import withStyle from "easy-with-style";  ///

import { Explorer } from "../index";  ///

import Entries from "./entries";
import FileNameDragEntry from "./entry/drag/fileName";
import FileNameMarkerEntry from "./entry/marker/fileName";
import DirectoryNameDragEntry from "./entry/drag/directoryName";
import DirectoryNameMarkerEntry from "./entry/marker/directoryName";

export default withStyle(class extends Explorer {
  static Entries = Entries;

  static FileNameMarkerEntry = FileNameMarkerEntry;

  static FileNameDragEntry = FileNameDragEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;

  static DirectoryNameDragEntry = DirectoryNameDragEntry;
})`

  grid-area: explorer;
  font-size: 1.2rem;
  font-weight: bold;
  font-family: monospace;
  
`;
