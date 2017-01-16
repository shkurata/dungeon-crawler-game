import React from 'react';
import Playground from './Playground.js';
import BaseComponent from './BaseComponent.js';

class Game extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      table: [],
      curPos: []
    };
    this._bind('keyPressHandler'
                // 'createMap',
                // 'createRandomMap',
                // 'markActiveCell'
             );
  }

  componentWillMount() {
    this.setState({
      table: this.randomizeMap(this.createMap(10, 20))
    });
  }

  componentDidMount() {
    let freeCell = this.chooseFreeCell();
    this.setState({
      curPos: freeCell,
      table: this.markActiveCell(freeCell)
    });
    window.addEventListener('keydown', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressHandler);
  }

  componentWillUpdate(nProps, nState) {

  }

  createMap(rows, cols) {
    return new Array(rows).fill(new Array(cols).fill(null));
  }

  randomizeMap(table) {
    return table.map(function(row) {
      return row.map(function() {
        return {open: Math.random() < 0.7 ? true : false, active: false}
      });
    });
  }

  markActiveCell(cell) {
    return this.state.table.map(function(val, r) {
      return val.map(function(el, c) {
        el.active = cell[0] === r && cell[1] === c ? true : false;
        return el;
      });
    });
  }

  chooseFreeCell() {
    let table = this.state.table;
    let row = Math.floor(Math.random() * table.length);
    let col = table[row].findIndex(el=>el.open);
    return [row, col];
  }

  checkCell(x, y) {
    const map = this.state.table;
    if (map[x] && map[x][y] && map[x][y].open) {
      return true;
    }
    return false;
  }

  getNewCoords(direction) {
    let [nX, nY] = this.state.curPos;
    switch (direction) {
      case 'ArrowLeft':
        nY--;
        break;
      case 'ArrowRight':
        nY++;
        break;
      case 'ArrowUp':
        nX--;
        break;
      case 'ArrowDown':
        nX++;
        break;
      default:
    }
    if (this.checkCell(nX, nY)) {
      return [nX, nY];
    } else {
      return this.state.curPos;
    }
  }

  keyPressHandler(e) {
    let nextCell = this.getNewCoords(e.code);
    this.setState({
      table: this.markActiveCell(nextCell),
      curPos: nextCell,
    });
  }

  render() {
    return <Playground table={this.state.table}
                   />
  }
}

export default Game;
