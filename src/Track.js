import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'Track Name',
            description: 'Track Description',
            artist: 'Artist Name',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Daytona_by_Pusha_T.jpg',
            location: ''
        }
    }

    
    
    render() {
      return (
        <div className="Track">
	
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.state.image} />
        <Card.Body>
          <Card.Title>{this.state.title}</Card.Title>
          <Card.Title>{this.state.artist}</Card.Title>
          <Card.Text>
          {this.state.description}
          </Card.Text>
          <Button >Play</Button>
          <Button >Pause</Button>
          <Button >Stop</Button>
          <Button >Next</Button>
      
        </Card.Body>
      </Card>
      
      
            
          </div>

      );
    }
  }
  
  // Example usage: <ShoppingList name="Mark" />