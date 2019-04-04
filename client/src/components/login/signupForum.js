import React, { Component } from "react";
import API from "../../utils/api";
import { withRouter } from 'react-router';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';


//import PasswordModalComponent from "./modalPassword";

class SignUpForum extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    passModal: false,
    userModal: false
  }


  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    if (this.state.confirmPassword === this.state.password) {
      API
        .register({ username: this.state.username, email: this.state.email, password: this.state.password })
        .then((dbModel) =>{
          if (dbModel.data === true) {
          API
            .login({ username: this.state.username, password: this.state.password })
            .then(res => {
              sessionStorage.setItem("user", res.data.username);
              sessionStorage.setItem("email", res.data.email);
              sessionStorage.setItem("id", res.data._id);
              this.setState({ isLoggedIn: res.data })
              this.props.history.push('/');
              window.location.reload();
            })
            .catch(err => console.log(err))
          } //if dbModel.data === true
          else {
           this.setState({ userModal: true });
          }
          })//.then
      .catch (err => console.log(err.response.data));
    }// if passwords match statement
    else {
     this.setState({ passModal: true });
    }
  }//register

  HandleClose = () => {
    this.setState({ passModal: false });
    this.setState({ userModal: false });
  }//HandleClose


  render() {
    return (
      <div className="container my-5">
      <Modal show={this.state.passModal} onHide={this.HandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Uni-Fight Says...</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your passwords do not match please try again.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.HandleClose}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.userModal} onHide={this.HandleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Uni-Fight Says...</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.username} has been already taken.  Please try again.</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.HandleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
                placeholder="Pick a Username" />
            </div>
            <div className="form-group">
              <label htmlFor="email">email</label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Your Email" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter a Password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Re-Enter Password"
              />
            </div>

            <button type="submit" className="btn btn-success" onClick={this.register}>Sign Up!</button>
          </form>

        </div>
      </div>
    )
  }
}

export default withRouter(SignUpForum);