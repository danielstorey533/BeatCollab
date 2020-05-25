import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import * as path from 'path';
import logo from './logo.svg';
import './App.css';
import Track from './Track';




function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [trackPath, setTrackPath] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
	
	fetch('/newTrack').then(res => res.json()).then(data => {
      setTrackPath(data.trackpath); 
	});
	
	
  }, []);
  
  let track_loc = path.join('http://localhost:3000/', 'tracks', JSON.stringify(trackPath).replace(/\"/g, "")).replace("http:/", "http://")
  let audio = new Audio(track_loc)

	  
  return (
    <div className="App">
	
  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/5/5e/Daytona_by_Pusha_T.jpg" />
  <Card.Body>
    <Card.Title>{track_loc}</Card.Title>
    <Card.Text>
      Brief beat synopsis will go here which is passed up from the python backend.
    </Card.Text>
  </Card.Body>
</Card>



	  
    </div>
  );
  
}

export default App;