import React from 'react';
import Playground from './Playground.js';
import BaseComponent from './BaseComponent.js';

class Game extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: []
    };
    // this._bind('createMap',
    //            'createRandomMap',
    //            'markActiveCell');
  }

  componentWillMount() {
    this.setState({
      table: this.createMap()
    });
  }

  componentDidMount() {
    this.setState({
      table: this.markActiveCell(1, 1)
    });
  }

  createMap() {
    return new Array(10).fill(new Array(20).fill(true));
  }

  createRandomMap() {
    return this.state.table.map(function(row) {
      return row.map(function() {
        return Math.random() < 0.7 ? true : false
      });
    });
  }

  markActiveCell(row, col) {
    var table = this.state.table.slice();
    table[row][col] = false;
    return table;
  }

  render() {
    return <Playground table={this.state.table}/>
  }
}

export default Game;
