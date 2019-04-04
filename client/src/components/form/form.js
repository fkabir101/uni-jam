import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import InputField from './inputfield'
import SelectField from "./selectField";
import CheckBox from "./checkbox";
import CalenderComponent from "./calender"
import Button from "../button"
import Moment from "moment";
import locations from "../../json/locations.json"
import categorys from "../../json/category.json"
import API from "../../utils/api";
import "./style/form.css";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      venue: "",
      limit: "",
      start:"",
      startUnix: 0,
      end:"",
      category:[],
      location:"",
      streamLink:"",
      creator:""
    };
  }
  componentDidMount(){
    this.setState({creator:sessionStorage.getItem("id")})

    if(this.props.type === "edit"){
      API.getEventById(this.props.match.params.id)
      .then(res => this.setState({
        category: res.data.category,
        description: res.data.description,
        limit: res.data.limit,
        location: res.data.location,
        name: res.data.name,
        start: res.data.start,
        startUnix: res.data.startUnix,
        end: res.data.end,
        venue: res.data.venue,
        attendNum: res.data.attendees.length,
        attendees: res.data.attendees,
        streamLink: res.data.streamLink
      }))
      .then(() => {
        
      })
      .catch(error => console.log(error))
    }
  }
  updateValue = event =>{
    this.setState({[event.target.id]: event.target.value});
  }
  getCheckBoxValue = event =>{
    if(!this.state.category.includes(event.target.value)){
      this.setState({category: [...this.state.category, event.target.value]});
    }
    else{
      const categoryTempArray = this.state.category
      for( let i = 0; i < categoryTempArray.length-1; i++){ 
        if ( categoryTempArray[i] === event.target.value) {
          categoryTempArray.splice(i, 1); 
        }
     }
     this.setState({category: categoryTempArray});
    }
  }
  getDate = (value, type) =>{
    let date = String(value);
    date = date.slice(0, 15);
    if(type === "start"){
      const unixTime=Moment(date, "ddd MMM DD YYYY").format("X");
      this.setState({[type] : date, startUnix:unixTime});
    }
    else{
      this.setState({[type] : date});
    }
  }
  onClickEditFunction = ()=>{
      const unixStart = this.state.startUnix;
      const unixEnd = Moment(this.state.end, "ddd MMM DD YYYY").format("X");
      if(unixEnd >= unixStart){
        API.update(this.props.match.params.id,this.state)
        .then(res => {
          this.props.history.push('/user/owned')
        })
        .catch(error => console.log(error)) 
      }
      else{
        alert("Error: Start date takes place before end date");
      }
  }    
  onClickFunction = ()=>{
    const unixStart = this.state.startUnix;
    const unixEnd = Moment(this.state.end, "ddd MMM DD YYYY").format("X");
    if(unixEnd >= unixStart){
      API.createEvent(this.state)
      .then(res => {
        this.props.history.push('/')
      })
      .catch(error => console.log(error)) 
    }
    else{
      alert("Error: Start date takes place before end date");
    }
  }

  render(){

    return (
      <div className="container">
        <form onSubmit = {this.onClickFunction}>
          <InputField 
            fieldName="Event Name"
            id="name"
            type="text"
            onChangeValue = {this.updateValue}
          />
          <InputField 
            fieldName="Description"
            size= "large"
            type="text"
            id="description"
            onChangeValue = {this.updateValue}
          />
          <InputField 
            fieldName="Venue"
            id="venue"
            type="text"
            onChangeValue = {this.updateValue}
          />
          <InputField 
            fieldName="Max Participants"
            id="limit"
            type="number"
            onChangeValue = {this.updateValue}
          />
          <SelectField 
            fieldName="Location"
            default="Location"
            id="location" 
            options={locations}
            onChangeValue = {this.updateValue}
          />
          <label>Categories:</label> <br/>
          {categorys.map(category => {
            if(!this.state.category.includes(category.option)){
              return <CheckBox 
                key={category.option}
                fieldName={category.option}
                onChangeValue = {this.getCheckBoxValue}
              />
            }
            else{
              return <CheckBox 
                key={category.option}
                fieldName={category.option}
                onChangeValue = {this.getCheckBoxValue}
                isChecked="true"
              />
            }
          })}
          <br/>
          <br/>
          <div className = "row">
            <div className = "col-6">
              <p>Start Date: </p>
              <CalenderComponent
              id="start"
              onChangeValue = {this.getDate}
              />
            </div>
            <div className = "col-6">
              <p>End Date: </p>
              <CalenderComponent
              id="end"
              onChangeValue = {this.getDate}
              />
            </div>
          </div>
          <br/>
          <InputField 
            fieldName="Stream Link (leave empty if none)"
            id="streamLink"
            type="url"
            onChangeValue = {this.updateValue}
          />
           {(() =>{switch(this.props.type){
              case "edit":
                return <div>
                  <Button 
                  name="Edit" 
                  color="primary"
                  clickFunction = {this.onClickEditFunction}
                  />
                </div>;
              default:
                return <div>
                  <Button 
                  name="Submit" 
                  color="primary"
                  clickFunction = {this.onClickFunction}
                  />
                </div>;
              }
            })()}
        </form>
      </div>
    )
  }
}


export default withRouter(Form);

