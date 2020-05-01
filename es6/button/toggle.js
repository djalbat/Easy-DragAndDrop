"use strict";

import withStyle from "easy-with-style";  ///

import { Button } from "easy";

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

  outline: none;
  border: none;
  height: 2.4rem;
  width: 2rem;
  position: relative;
  vertical-align: top;
  background-color: transparent;
  
  .collapsed {
    content: "\\025b6";
  }

  ::before {
    position: absolute;
    top: 0.4rem;
    left: 0.4rem;
    width: 1.6rem;
    content: "\\025bc";
  }
  
`;
