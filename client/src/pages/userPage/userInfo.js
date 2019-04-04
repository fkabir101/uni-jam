import React, { Component } from "react";
import ModalComponent from "../../components/modal.js";
import CssSwitcher from "../../components/themeswitcher/cssSwitcher.js";
import { withRouter } from 'react-router';
import ThemeSaver from "../../components/themeswitcher/themeSaver.js";



class UserInfo extends Component {
  state = {
    savedTheme: "/styles/defaultstyle.css"
  }

  componentDidMount() {
    const cachedTheme = JSON.parse(localStorage.getItem("cachedTheme"));
    this.setState({
      savedTheme: cachedTheme
    })
  }

  render() {
    return (
      <div className="jumbotron col-8" id="userJumbo">
        <h2>Hey, {sessionStorage.getItem("user")} you made it to the user page!</h2>
        <h4>Your email is {sessionStorage.getItem("email")}</h4>
        <hr className="my-4"></hr>
       
          <ThemeSaver stylePath={this.state.savedTheme} />
          <ModalComponent
            btnName="DeleteAccount"
            title="Uni-Fight asks..."
            msg="Are you sure you want to delete your account?"
            negative="No! DON'T Delete My Acount"
            affirmative="Yes! Delete My Account."
            primColor="danger"
            secColor="secondary" />
          <CssSwitcher />
       
      </div>
    )
  }
} //class UserInfo

export default withRouter(UserInfo);
