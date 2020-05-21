"use strict";

import withStyle from "easy-with-style";  ///

import Button from "../button";

class ToggleButton extends Button {
  expand() {
    this.removeClass("collapsed");
  }

  collapse() {
    this.addClass("collapsed");
  }

  isCollapsed() {
    const collapsed = this.hasClass("collapsed");

    return collapsed;
  }

  parentContext() {
    const isCollapsed = this.isCollapsed.bind(this),
          expandToggleButton = this.expand.bind(this),  ///
          collapseToggleButton = this.collapse.bind(this);  ///

    return ({
      isCollapsed,
      expandToggleButton,
      collapseToggleButton
    });
  }

  static defaultProperties = {
    className: "toggle"
  };
}

export default withStyle(ToggleButton)`

  width: 2rem;
  height: 2.4rem;
  border: none;
  outline: none;
  display: inline-block;
  background-color: transparent;

  ::before {
    width: 1.6rem;
    content: "\\025bc";
  }
  
  .collapsed::before {
    content: "\\025b6";
  }
  
`;
