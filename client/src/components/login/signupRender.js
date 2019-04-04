import React, { Component } from 'react';

class RenderInput extends Component {


  RenderInput() {

    return (
      <div className="form-group">
        <label>{`${this.props.fieldName}:`}</label>
        <input id={this.props.id} type="text" className="form-control" onBlur={this.props.onChangeValue}></input>
      </div>
    );
  }
}


export default RenderInput;