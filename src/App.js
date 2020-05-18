import React, { useState, useEffect} from 'react';
import * as path from 'path';
import logo from './logo.svg';
import './App.css';




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

	  
  const start = () => {
	  
	  audio.play()
	  
  } 
  
  const stop = () => {
	  
	  audio.pause()
	  audio.currentTime = 0
	  
  }
  
  const pause = () => {
	  
	  audio.pause()
	  
  }
  
  const next = () => {
	  
	fetch('/newTrack').then(res => res.json()).then(data => {
      setTrackPath(data.trackpath); 
	});
	
	let track_loc = path.join('http://localhost:3000/', 'tracks', JSON.stringify(trackPath).replace(/\"/g, "")).replace("http:/", "http://")
	let audio = new Audio(track_loc)
	audio.play()
	  
  }

  return (
    <div className="App">
	
      <header className="App-header">
        <p>The current time is {currentTime}.</p>
		<p>The current track is {track_loc}. </p>
      </header>
	  
	  <div>
		<button onClick={start}>Play</button>
		<button onClick={pause}>Pause</button>
		<button onClick={stop}>Stop</button>
		<button onClick={next}>NextTrack</button>
	
	  </div>
	  
    </div>
  );
  
}

export default App;