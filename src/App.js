import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';



function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);
  
  let audio = new Audio("http://localhost:3000/BEAT.wav")
  
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

  return (
    <div className="App">
	
      <header className="App-header">
        <p>The current time is {currentTime}.</p>
      </header>
	  
	  <div>
		<button onClick={start}>Play</button>
		<button onClick={pause}>Pause</button>
		<button onClick={stop}>Stop</button>
	  </div>
	 
	  
    </div>
  );
}

export default App;