import React from 'react';

export default class Player extends React.Component {

    constructor(props){
        super(props);

        this.state = {
			selectedTrack: null
        }
    }

    render() {
		
		const list = [{ id: 1, title: "Campfire Story"}, {id: 2, title: "Botting Up"}].map(item => {
			return (
			
				<li  
					key={item.id}
					onClick={() => this.setState({selectedTrack: item.title})}
				>
				{item.title}
				</li>
			);
		});
			
		return (
		
			<>
				<h1>My Little Player</h1>
				<ul>{list}</ul>
				<audio />
			</>
		);
    }
  }
  
  
  //let track_loc = path.join('http://localhost:3000/', 'tracks', JSON.stringify(trackPath).replace(/\"/g, "")).replace("http:/", "http://")
  //let audio = new Audio(track_loc)
