import React, { Component } from 'react';
import API from "../utils/api";
import Button from "../components/button"
import ReactPlayer from 'react-player'
import ThemeSaver from "../components/themeswitcher/themeSaver";
import InviteModalComponent from "./InviteModal";
import { withRouter } from 'react-router';


class SingleEventPage extends Component {
  state = {
    categorys: [],
    description: "",
    limit: 0,
    location: "",
    name: "",
    start: "",
    end: "",
    venue: "",
    attendNum: 0,
    attendees: [],
    streamLink: "",
    savedTheme: "/styles/defaultstyle.css"

  };
  componentDidMount = () => {
    const cachedTheme = JSON.parse(localStorage.getItem("cachedTheme"));
    this.setState({
      savedTheme: cachedTheme
    })
    API.getEventById(this.props.match.params.id)
      .then(res => this.setState({
        categorys: res.data.category,
        description: res.data.description,
        limit: res.data.limit,
        location: res.data.location,
        name: res.data.name,
        start: res.data.start,
        end: res.data.end,
        venue: res.data.venue,
        attendNum: res.data.attendees.length,
        attendees: res.data.attendees,
        streamLink: res.data.streamLink,
        isIn: false
      }))
      .then(() => {
        
      })
      .catch(error => console.log(error))
  }
  onClickFunction = () => {
    if (sessionStorage.getItem("id") !== null) {
      const attendObject = {
        userId: sessionStorage.getItem("id"),
        eventId: this.props.match.params.id
      }
      API.attend(attendObject)
        .then(
          //this.props.history.push("/events"),
          //window.location.reload(),
          res => this.setState({
          attendNum: res.data.attendees.length,
          isIn: true,
        }))
        .catch(err => console.log(err));
    }
  }
  leaveEventFunction = () => {
    if (sessionStorage.getItem("id") !== null) {
      const attendObject = {
        userId: sessionStorage.getItem("id"),
        eventId: this.props.match.params.id
      }
      API.leave(attendObject)
        .then(res => this.setState({
          attendNum: res.data.attendees.length,
          isIn: false,
        }))
        .catch(err => console.log(err));
        this.props.history.push('/user/participating');
    }
  }
  render() {
    for (let i=0; i<this.state.attendees.length; i++) {
      if (this.state.attendees[i] === sessionStorage.getItem("id")) {
        this.setState({isIn : true}).then(() =>{})
      }
    }

    if (this.state.isIn) {
      return (
        <React.Fragment>
        <ThemeSaver stylePath={this.state.savedTheme} />

        <div className="container border border-dark">
          <div className="jumbotron bg-light text-dark text-center ">
            <h1 className="display-4"><strong><u>{this.state.name}</u></strong></h1>
            {this.state.categorys.map(category => (
              <h2 className="d-inline-block m-2" key={category}>{category}</h2>
            ))}
            <h4>{this.state.venue} in {this.state.location}</h4>
            {sessionStorage.getItem("id") !== null ?
              (
                <Button
                  name="Leave"
                  color="success"
                  clickFunction={this.leaveEventFunction}
                />
              ) :
              (<p></p>) 
              
            }
            {
              (<InviteModalComponent />)
            }
          </div>
          <p className="text-center">Attendants: {this.state.attendNum}/{this.state.limit}</p>
          <p>{this.state.description}</p>
          {this.state.streamLink.includes("https") ?
            (<ReactPlayer url={this.state.streamLink} />) :
            (<p></p>)
          }
        </div>
        </React.Fragment>
      )//return
    } //if isIn
    else if (this.state.attendees.length >= this.state.limit) {
      return (
        <React.Fragment>
        <ThemeSaver stylePath={this.state.savedTheme} />

        <div className="container border border-dark">
          <div className="jumbotron bg-light text-dark text-center ">
            <h1 className="display-4"><strong><u>{this.state.name}</u></strong></h1>
            {this.state.categorys.map(category => (
              <h2 className="d-inline-block m-2" key={category}>{category}</h2>
            ))}
            <h4>{this.state.venue} in {this.state.location}</h4>
            {sessionStorage.getItem("id") !== null ?
              (
                <small>Sorry, This Event is Full</small>
              ) :
              (<p></p>)
            }
          </div>
          <p className="text-center">Attendants: {this.state.attendNum}/{this.state.limit}</p>
          <p>{this.state.description}</p>
          {this.state.streamLink.includes("https") ?
            (<ReactPlayer url={this.state.streamLink} />) :
            (<p></p>)
          }
        </div>
        </React.Fragment>
      )//return
    }// else if
    else {
    return (
      <React.Fragment>
        <ThemeSaver stylePath={this.state.savedTheme} />

        <div className="container border border-dark">
          <div className="jumbotron bg-light text-dark text-center ">
            <h1 className="display-4"><strong><u>{this.state.name}</u></strong></h1>
            {this.state.categorys.map(category => (
              <h2 className="d-inline-block m-2" key={category}>{category}</h2>
            ))}
            <h4>{this.state.venue} in {this.state.location}</h4>
            {sessionStorage.getItem("id") !== null ?
              (
                <Button
                  name="Join"
                  color="danger"
                  clickFunction={this.onClickFunction}
                />
              ) :
              (<p></p>)
            }
          </div>
          <p className="text-center">Attendants: {this.state.attendNum}/{this.state.limit}</p>
          <p>{this.state.description}</p>
          {this.state.streamLink.includes("https") ?
            (<ReactPlayer url={this.state.streamLink} />) :
            (<p></p>)
          }
        </div>
        </React.Fragment>)//return
    }//else
  }//render
}//class SingleEventPage extends Component

export default withRouter(SingleEventPage);