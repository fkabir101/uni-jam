import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import API from "../../utils/api";

class LoginForum extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    password: ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    e.preventDefault();
    API
      .login({username: this.state.username, password: this.state.password})
      .then(res => {
        sessionStorage.setItem("user", res.data.username);
        sessionStorage.setItem("email", res.data.email);
        sessionStorage.setItem("id", res.data._id);
        this.props.loginCheck();

        this.setState({isLoggedIn: res.data})

      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to="/"/>

    }

    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Your Username"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Your Password"
              />
            </div>

            <button type="submit" className="btn btn-success" onClick={this.login}>Login</button>
          </form>

        </div>
      </div>
    )
  }
}

export default LoginForum;