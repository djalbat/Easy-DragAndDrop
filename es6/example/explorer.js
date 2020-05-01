"use strict";

import { Explorer } from "../index";

import Entries from "./entries";
import FileNameMarkerEntry from "./entry/marker/fileName";
import FileNameDraggableEntry from "./entry/draggable/fileName";
import DirectoryNameMarkerEntry from "./entry/marker/directoryName";
import DirectoryNameDraggableEntry from "./entry/draggable/directoryName";

export default class extends Explorer {
  static Entries = Entries;

  static FileNameMarkerEntry = FileNameMarkerEntry;

  static FileNameDraggableEntry = FileNameDraggableEntry;

  static DirectoryNameMarkerEntry = DirectoryNameMarkerEntry;

  static DirectoryNameDraggableEntry = DirectoryNameDraggableEntry;
};
