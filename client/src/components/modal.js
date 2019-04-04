import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import API from "../utils/api";
import { withRouter } from 'react-router';

class ModalComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  delete = (e) => {
    e.preventDefault();
    const userId = sessionStorage.getItem("id");
  API
    .remove(userId)
    .then(res => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("id");
      this.setState({isLoggedIn: false});
      localStorage.clear();
      this.props.history.push('/login');
      window.location.reload();
   })
  }

  render() {
    return (
      <>
        <Button variant="danger" onClick={this.handleShow}>
          {this.props.btnName}
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.msg}</Modal.Body>
          <Modal.Footer>
            <Button variant={this.props.secColor} onClick={this.handleClose}>{this.props.negative}</Button>
            <Button variant={this.props.primColor} onClick={this.delete}> {this.props.affirmative}</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default withRouter(ModalComponent);
