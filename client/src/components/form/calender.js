import React, { Component } from 'react';
import Calendar from 'react-calendar';
 
class CalendarComponent extends Component {
  state = {
    date: new Date(),
  }
  constructor(){
    super();
    this.giveToParent = this.giveToParent.bind(this);
  }
  onChange = date => {
    this.setState({ date }, this.giveToParent);   
  }

  giveToParent(){
    this.props.onChangeValue(this.state.date, this.props.id);
  }
 
  render() {
    return (
      <div id={this.props.id}>
        <Calendar
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default CalendarComponent