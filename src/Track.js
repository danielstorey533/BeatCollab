import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// Format time correctly
function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

export default class Track extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            title: 'Track Name',
            description: 'Track Description',
            artist: 'Artist Name',
            image: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Daytona_by_Pusha_T.jpg',
            location: ''
			currentTime: null
			duration: null
			player: "stopped"
        }
    }

	// This updates the time live
	componentDidMount() {
		this.player.addEventListener("timeupdate", e => {
			this.setState({
			currentTime: e.target.currentTime,
			duration: e.target.duration
			});
		});
	}
	
	componentWillUnmount() {
		this.player.removeEventListener("timeupdate", () => {});
	}
	
	componentDidUpdate(prevProps, prevState) {
		
		if (this.state.selectedTrack !== prevState.selectedTrack) {
			
			let track = this.state.selectedTrack;

			if (track) {
				this.player.src = this.state.selectedTrack;
				this.player.play();
				this.setState({ player: "playing", duration: this.player.duration });
			}
		}
		
		if (this.state.player !== prevState.player) {
			
			if (this.state.player === "paused") {
				this.player.pause();
			} else if (this.state.player === "stopped") {
				this.player.pause();
				this.player.currentTime = 0;
				this.setState({ selectedTrack: null });
			} else if (
				this.state.player === "playing" &&
				prevState.player === "paused"
			) {
				this.player.play();
			  }
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