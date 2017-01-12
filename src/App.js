import React, { Component } from 'react';
import './style/App.min.css';
import Game from './Game.js';

class App extends Component {
  render() {
    return(
      <div className="App">
        <div className="App-header">
          <h2>Dungeon Crawler Game</h2>
        </div>
        <p className="App-intro">
          Type "Free Code Camp" to start the game :)
        </p>
        <Game />
      </div>
    );
  }
}

export default App;
