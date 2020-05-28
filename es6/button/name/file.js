"use strict";

import withStyle from "easy-with-style";  ///

import NameButton from "../../button/name";

class FileNameButton extends NameButton {
  static defaultProperties ={
    className: "file"
  };
}

export default withStyle(FileNameButton)`

  padding-left: 4rem;
  background-image: url("css/image/file.png");
  background-position: 2.2rem 0.5rem;

`;
