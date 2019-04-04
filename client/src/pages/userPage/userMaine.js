import React, {Component} from "react";
import {Route, Switch, withRouter } from "react-router-dom";
import UserInfo from "./userInfo";
import ParticipatingEvents from "./participatingEvents";
import OwnedEvents from "./ownedEvents";
import Edit from "./edit";


class UserPage extends Component {
  
  UserPage = () => {
    this.props.history.push('/user');
  }

  OwnedEvents = () => {
    this.props.history.push('/user/owned');
    window.location.reload();
  } 

  parEvents = () => {
    this.props.history.push('/user/participating');
    window.location.reload();
  }

render() {
  return (
      <div>
      <div className="row" id="rowJumbo">
        <div className="jumbotron col-3" id="actionCard">
          <h5>Actions</h5>
          <hr className="my-4"></hr>
          <div className="row rowUserBtn">
            <button type="button" className="btn btn-info col-12" id="userInfoBtn" onClick={this.UserPage}>User Info</button>
            <button type="button" className="btn btn-light col-12" id="partEventBtn" onClick={this.parEvents}>Participating Events</button>
            <button type="button" className="btn btn-dark col-12" id="ownEventBtn" onClick={this.OwnedEvents}>Owned Events</button>
          </div>

          
        </div>
        {/* <ThemeSaver stylePath={this.state.savedTheme}/> */}
     <Switch>
      <Route exact path="/user/" render={() => <UserInfo /> } />
      <Route exact path={`${this.props.match.url}/owned`} render={() => <OwnedEvents />} />
      <Route exact path={`${this.props.match.url}/participating`} render={() => <ParticipatingEvents />} />
      <Route exact path={`${this.props.match.url}/edit/:id`} render={() => <Edit/>} />
    </Switch>
     
      </div>

      </div>
  ) //render
}
}

export default withRouter(UserPage);