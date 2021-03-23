import React from "react";
import { Link, Route } from "react-router-dom";
import Index from "./views/Index";
import { Nav, Navbar, Image } from "react-bootstrap";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="light" expand="sm">
          <Navbar.Brand>
            <Link to="/" className="h2">
              Flask &amp; React Blog SPA
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route exact path="/" component={Index} />
      </>
    );
  }
}