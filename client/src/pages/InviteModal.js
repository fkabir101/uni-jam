import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import API from "../utils/api";
import { withRouter } from 'react-router';

class InviteModalComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      username: ""
    };
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  invite = () => {
    API.getUsername(this.state.username)
    .then(res => {
      API.invite(res.data[0].email,window.location.href,sessionStorage.getItem('user'))
        .then(res => {this.setState({ show: false})})
    })
  }

  render() {
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Invite
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Invite Someone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="form-group">
              <label htmlFor="username">Enter the Username of Someone You Would Like to Invite!</label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
                className="form-control"
                placeholder="Enter Their Username"/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant={this.props.secColor} onClick={this.handleClose}>{this.props.negative}</Button> */}
            <Button variant={this.props.primColor} onClick={this.invite}> Send</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(InviteModalComponent);
