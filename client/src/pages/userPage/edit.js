import React, {Component} from 'react';
import Form from "../../components/form/form.js";

class Edit extends Component {
  render(){
    return(
      <div className="jumbotron col-8" id="userJumbo">
        <Form
          type="edit"
        />
      </div>
    )
  }
}

export default Edit;