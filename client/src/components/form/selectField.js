import React from 'react';

function SelectField(props){
    return(
      <div className="form-group">
        <label>{`${props.fieldName}: `}</label> <br/>
        <select id = {props.id}className="custom-slect" onChange = {props.onChangeValue}>
          <option defaultValue>{props.default}</option>
          {props.options.map(option => (
            <option 
              key={option.option} 
              value={option.option}>
              {option.option}
            </option>
        ))}
        </select>
      </div>
    )
}


export default SelectField;