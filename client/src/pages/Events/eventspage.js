import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Wrapper from "../../components/Wrapper/index.js";
import ExpandedEventCard from "../../components/EventCards/expandedevents.js";
import SelectField from "../../components/form/selectField.js";
import InputField from "../../components/form/inputfield";
import Button from "../../components/button";
import locations from "../../json/locations.json";
import categorys from "../../json/category.json";
import API from "../../utils/api";

class EventsPage extends Component {
  state = {
    currentSearchField: "",
    searchOptions: [
      {
        option: "category"
      },
      {
        option: "location"
      },
      {
        option: "name"
      }
    ],
    categoryOption: categorys,
    locationOption: locations,
    search: "",
    events: []
  }
  updateValue = event => {
    this.setState({ currentSearchField: event.target.value });
  }
  getSearch = event => {
    this.setState({ search: event.target.value })
  }
  clickCard = (event) => {
    this.props.history.push(`/events/${event.target.id}`)
  }
  onClickFunction = () => {
    const searchObject = {
      [this.state.currentSearchField]: this.state.search
    }
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
      <div className="container">
        <SelectField
          fieldName="Search Option"
          id="searchOption"
          default="Search"
          options={this.state.searchOptions}
          onChangeValue={this.updateValue}
        />
        {(() => {
          switch (this.state.currentSearchField) {
            case 'category':
              return <div>
                <SelectField
                  fieldName="Category"
                  id="category"
                  default="Category"
                  options={this.state.categoryOption}
                  onChangeValue={this.getSearch}
                />
                <Button
                  name="Search"
                  color="primary"
                  clickFunction={this.onClickFunction}
                />
              </div>
            case 'location':
              return <div>
                <SelectField
                  fieldName="Location"
                  id="location"
                  default="Location"
                  options={this.state.locationOption}
                  onChangeValue={this.getSearch}
                />
                <Button
                  name="Search"
                  color="primary"
                  clickFunction={this.onClickFunction}
                />
              </div>
            case 'name':
              return <div>
                <InputField
                  fieldName="Name:"
                  id="name"
                  type="text"
                  onChangeValue={this.getSearch}
                />
                <Button
                  name="Search"
                  color="primary"
                  clickFunction={this.onClickFunction}
                />
              </div>
            default:
              return null;
          }
        })()}
        <Wrapper>
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
}

export default withRouter(EventsPage);
