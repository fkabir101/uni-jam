import React from 'react';

function CheckBox(props){
  if(props.isChecked === "true")
    return(
      <div className="form-check custom-control-inline">
        <label>
          {`${props.fieldName} `}
          <input
            value= {props.fieldName}
            type="checkbox"
            onChange={props.onChangeValue}
            checked="checked"
            />
        </label>
      </div>
    )
  else{
    return(
      <div className="form-check custom-control-inline">
        <label>
          {`${props.fieldName} `}
          <input
            value= {props.fieldName}
            type="checkbox"
            onChange={props.onChangeValue}
            />
        </label>
      </div>
    )
  }
}


export default CheckBox;