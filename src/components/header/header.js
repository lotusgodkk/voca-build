import React, { useState } from "react";
import { Collapse, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";
import Viewer from "../viewer/viewer";
import "./header.scss";
function Header(args) {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar fixed="true" expand dark color="info">
      <NavbarBrand href="/">
        <img alt="logo" src="../assets/logo.svg" className="img-fluid" />
        <span className="d-inline-flex"> VocaBuild</span>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen}>
        <Viewer buttonColor="primary" buttonLabel={"Winning Streak"}></Viewer>
      </Collapse>
    </Navbar>
  );
}
export default Header;
