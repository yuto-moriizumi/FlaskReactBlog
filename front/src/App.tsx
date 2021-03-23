import React from "react";
import { Link, Route } from "react-router-dom";
import Index from "./views/Index";
import { Nav, Navbar } from "react-bootstrap";
import View from "./views/View";
import Edit from "./views/Edit";
import Post from "./views/Post";

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar className="navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link to="/" className="h2 navbar-brand">
              Flask &amp; React Blog SPA
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Nav.Item>
                  <Link to="/">
                    Home
                    </Link>
                </Nav.Item>
                <Nav.Item className="ml-3">
                  <Link to="/post">
                    新規投稿
                    </Link>
                </Nav.Item>
              </ul>
            </div>
          </div>
        </Navbar>
        <div className="container">
          <div className="blog-body">
            <Route exact path="/post" component={Post} />
            <Route exact path="/entries/:id" component={View} />
            <Route exact path="/entries/:id/edit" component={Edit} />
            <Route exact path="/" component={Index} />
          </div>
          <footer>
            <p className="small">&copy;森泉友登</p>
            <p>
              <img src="{{url_for('static',filename='img/flask-icon.jpg')}}" alt="flaskのアイコン" height="32rem" />
                このサイトはFlaskで作られました
            </p>
          </footer>
        </div>
      </>
    );
  }
}