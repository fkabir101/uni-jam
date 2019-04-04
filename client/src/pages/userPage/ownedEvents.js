import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Wrapper from "../../components/Wrapper/index.js";
import ExpandedEventCard from "../../components/EventCards/expandedevents.js";
import API from "../../utils/api"
import ThemeSaver from "../../components/themeswitcher/themeSaver.js";



class OwnedEvents extends Component {
  state = {
    events: [],
    savedTheme: "/styles/defaultstyle.css"

  }
  clickCard = (event) => {
    this.props.history.push(`/events/${event.target.id}`)
  }
  editCard = (event) =>{
    this.props.history.push(`edit/${event.target.id}`)
  }
  deleteCard = (event)=> {
    API.deleteEvent(event.target.id)
    .then(window.location.reload())

  }

  componentDidMount() {
    const CreatorID = sessionStorage.getItem("id");
    const searchObject = {
      creator: CreatorID
    }
    const cachedTheme = JSON.parse(localStorage.getItem("cachedTheme"));
    this.setState({
      savedTheme: cachedTheme
    })
    API.search(searchObject)
      .then(res => {
        this.setState({ events: res.data })
      })
      .catch(err => {
        console.log(err)
      })

  }

  render() {

    return (
      
        <div className="jumbotron col-8" id="userJumbo">
        <h3>Events You Have Created</h3>
        <hr className="my-4"></hr>
        <Wrapper>
          <ThemeSaver stylePath={this.state.savedTheme} />
          {this.state.events !== 0 ?
            (this.state.events.map(event =>
              <ExpandedEventCard
                key={event._id}
                id={event._id}
                clickFunction={this.clickCard}
                clickEdit={this.editCard}
                clickDelete={this.deleteCard}
                name={event.name}
                location={event.location}
                info={event.description}
                category={event.category}
                start={event.start}
                end={event.end}
                page='user'
              />
            )) :
            (<p></p>)
          }
        </Wrapper>




      </div>

    )
  }

}//class owned Events

export default withRouter(OwnedEvents);