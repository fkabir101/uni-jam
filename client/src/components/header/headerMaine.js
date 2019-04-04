import React from "react";
import RenderNavbar from "./navButtons";
import "./style/header.css";

function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="header">
      <a className="navbar-brand" id="title" href="/">Uni-Jam</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
        <div></div>
        </ul>
        <span className="navbar-text">
        <RenderNavbar isLoggedIn={props.isLoggedIn} loginCheck={props.loginCheck}/>
    </span>
      </div>
    </nav>
  )
};

export default Header;