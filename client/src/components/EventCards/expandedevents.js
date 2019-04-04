import React, {Component} from "react";
import Button from "../button"
import Categories from "../../json/category.json"

class ExpandedEventCard extends Component {
  state = {
    images : []
  };
  componentDidMount(){
    const imageRefs = [];
    for(let i = 0; i < Categories.length; i++){
      for(let j =0; j < this.props.category.length; j++){
        if(Categories[i].option === this.props.category[j]){
          imageRefs.push(Categories[i].logoRef)
        }
      }
    }
    this.setState({images: imageRefs});
  }
  render(){
    return (
        <div className="card col-12">
          <div className="content">
            <ul>
              <li>
                <strong>Name:</strong> {this.props.name}
              </li>
              <li>
                <strong>Location:</strong> {this.props.location}
              </li>
              <li>
                <strong>Event Info:</strong> {this.props.info}
              </li>
              <li>
                <strong>Categories:</strong> 
                <br></br>
                {this.state.images.map(image => (
                  <img src={image} alt="Italian Trulli" height="100" width="200" key={image}/>
                ))}
              </li>
              <li>
                <strong>Start Date:</strong> {this.props.start}
                <strong>End Date:</strong> {this.props.end}
              </li>
            </ul>
          </div>
          {this.props.page.includes("view") ?
            (          
              <Button
                name="Get More Info"
                color= "success"
                id = {this.props.id}
                clickFunction = {this.props.clickFunction}
              />
            ) :
            (<div className="text-center">
              <Button
                name="More Info"
                color= "success"
                id = {this.props.id}
                clickFunction = {this.props.clickFunction}
              />
              <Button
                name="Edit"
                color= "primary"
                id = {this.props.id}
                clickFunction = {this.props.clickEdit}
              />
              <Button
                name="Delete"
                color= "danger"
                id = {this.props.id}
                clickFunction = {this.props.clickDelete}
              />
            </div>)
          }

        </div>
    
    );
  }
}


export default ExpandedEventCard;
