import React from "react";
import "./style.css";
import Button from "../button"

function EventCard(props) {
  return (
    <div className="card">
      <div className="content">
        <ul>
          <li>
            <strong>Name:</strong> {props.name}
          </li>
          <li>
            <strong>Event Type:</strong> {props.category.join(", ")}
          </li>
          <li>
            <strong>Location:</strong> {props.location}
          </li>
          <li>
            <strong>Start Time:</strong> {props.start}
            <br />
            <strong>End Time:</strong> {props.end}
          </li>

        </ul>
        <div style={{display: 'flex', justifyContent: 'center', position: 'relative', paddingTop: '30px'}}>
        <Button
          name="Get More Info"
          color="success"
          id={props.id}
          clickFunction={props.clickFunction}
          style={{position: 'absolute'}}
        />
        </div>
      </div>
    </div>

  );
}


export default EventCard;
