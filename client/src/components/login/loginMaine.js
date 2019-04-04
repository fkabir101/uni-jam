import React from "react";
import LoginForum from "./loginForum";
import SignUpForum from "./signupForum";
import "./style/login.css";

function Login(props) {
  return (
    <div>
      <div className="row" id="logRow">
      <div className="container xs-col-12 col-md-6">
      <div className="jumbotron" id="SignUpJumbo">
      <div className="text-center">
          <h1>Sign Up</h1>
        </div>
        <hr className="my-4"></hr>
          <SignUpForum />
      </div>
      </div>

      <br />

    <div className="container xs-col-12 col-md-6">
      <div className="jumbotron" id="LoginJumbo">
        <div className="text-center">
          <h1>Login</h1>
        </div>
        <hr className="my-4"></hr>
          <LoginForum loginCheck={props.loginCheck}/>
      </div>
      </div>
      
      </div>
    </div>
  )
};


export default Login;