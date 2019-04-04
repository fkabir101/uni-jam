import React, { Component } from 'react';

class InputField extends Component {


  render(){
    if(this.props.size === "large"){
      return(
        <div className="form-group">
          <label>{`${this.props.fieldName}:`}</label>
          <textarea  id={this.props.id} rows="4" cols="90" type={this.props.type} className="form-control" onBlur ={this.props.onChangeValue}></textarea>
        </div>      
      )
    }
    else{
      if(this.props.type === "url"){
        return(
          <div className="form-group">
            <label>{`${this.props.fieldName}:`}</label>
            <input id={this.props.id} type={this.props.type} className="form-control" onBlur ={this.props.onChangeValue} pattern="https://.*" size="30" required></input>
          </div>
        );
      }
      else{
        return(
          <div className="form-group">
            <label>{`${this.props.fieldName}:`}</label>
            <input id={this.props.id} type={this.props.type} className="form-control" onBlur ={this.props.onChangeValue}></input>
          </div>
        );
      }
    }
  }
}
export default InputField;