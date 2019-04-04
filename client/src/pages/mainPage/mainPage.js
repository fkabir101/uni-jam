import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Wrapper from "../../components/Wrapper/index.js";
import EventCard from "../../components/EventCards/EventCard.js";
import ExpandedEventCard from "../../components/EventCards/expandedevents.js";
import API from "../../utils/api.js";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";




class MainPage extends Component {
  state = {
    Events: [],
    SortedEvents: [],
    responsive: {
      0: {
        items: 1
      },
      1024: {
        items: 3
      }
    }
  };

  componentDidMount = () => {
    API.getEvents()
      .then(res => this.setState({
        Events: res.data
      }))
      .catch(err => console.log(err));


    API.getSortedEvents()
      .then(res => this.setState({
        SortedEvents: res.data
      }))
      .catch(console.log)
  }
  clickCard = (event) => {
    this.props.history.push(`/events/${event.target.id}`)
  }
  render() {
    if (this.state.Events.length === 0) {
      return <div>Nothing To Show</div>
    }
    return (
      <React.Fragment>
        <Wrapper>
          <h2>Recently Created Events</h2>
          <AliceCarousel responsive={this.state.responsive}>
            {this.state.Events.length ? this.state.Events.map(eventData => {
              return (
                <EventCard
                  key={eventData._id}
                  id={eventData._id}
                  name={eventData.name}
                  location={eventData.location}
                  category={eventData.category}
                  start={eventData.start}
                  end={eventData.end}
                  style={{maxHeight: '325px', maxWidth: '325px'}}
                  clickFunction={this.clickCard}
                />
              );
            }) : []}
          </AliceCarousel >
          <h2>Upcoming Events</h2>
          {this.state.SortedEvents !== 0 ?
            (this.state.SortedEvents.map(event =>
              <ExpandedEventCard
                key={event._id}
                id={event._id}
                clickFunction={this.clickCard}
                name={event.name}
                location={event.location}
                info={event.description}
                category={event.category}
                start={event.start}
                end={event.end}
                page='view'
              />
            )) :
            (<p></p>)
          }
        </Wrapper>
      </React.Fragment>
    );
  }
}

export default withRouter(MainPage);
