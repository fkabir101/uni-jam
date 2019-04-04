import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Wrapper from "../../components/Wrapper/index.js";
import ExpandedEventCard from "../../components/EventCards/expandedevents.js";
import API from "../../utils/api"
import ThemeSaver from "../../components/themeswitcher/themeSaver.js";

class ParticipatingEvents extends Component {
  state = {
    events:[],
    savedtheme: "styles/defaultstyle.css"
  }
  clickCard = (event) =>{
    this.props.history.push(`/events/${event.target.id}`)
  }
  
  componentDidMount() {
    const cachedTheme = JSON.parse(localStorage.getItem("cachedTheme"));
    this.setState({
      savedTheme: cachedTheme
    })
    API
    //finds particpants route goes to utils/api
    .findPart().then(res =>{
        this.setState({events: res.data})
      })
      .catch(err =>{
        console.log(err)
      })
    }

  render () {
    return (
      
        <div className="jumbotron col-8" id="userJumbo">
        <h3>Events You Signed Up For</h3>
       
        <Wrapper>
        <ThemeSaver stylePath={this.state.savedTheme} />

          {this.state.events !== 0 ? 
          (this.state.events.map(event =>
            <ExpandedEventCard
              key={event._id}
              id={event._id}
              clickFunction = {this.clickCard}
              name={event.name}
              location={event.location}
              info={event.description}
              category={event.category}
              start={event.start}
              end={event.end}
              page='view'
            /> 
          )):
            (<p></p>)
          }
        </Wrapper>
        
        </div>
    
    )
  }

}//class Participating Events

export default withRouter(ParticipatingEvents);