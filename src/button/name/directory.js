"use strict";

import withStyle from "easy-with-style";  ///

import NameButton from "../../button/name";

class DirectoryNameButton extends NameButton {
  static defaultProperties ={
    className: "directory"
  };
}

export default withStyle(DirectoryNameButton)`

  padding-left: 2.4rem;
  background-image: url("css/image/directory.png");
  background-position: 0.3rem 0.6rem;

`;
