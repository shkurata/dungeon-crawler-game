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
    this._bind('keyPressHandler');
  }

  componentWillMount() {
    this.setState({
      table: this.randomizeMap(this.createMap(50, 50))
    });
  }

  componentDidMount() {
    this.markActiveCell(this.chooseFreeCell());
    this.drawLine([1, 2], 30, 'horizontal');
    window.addEventListener('keydown', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressHandler);
  }

  createMap(rows, cols) {
    return new Array(rows).fill(new Array(cols).fill(null));
  }

  randomizeMap(table) {
    return table.map(function(row) {
      return row.map(function() {
        return Math.random() < 0.7 ? 1 : 0
      });
    });
  }

  drawLine(point, length, orientation) {
    let table = this.state.table.slice();
    if (orientation === 'horizontal') {
      const row = point[0];
      for (let i = point[1]; i <= length; i++) {
        table[row][i] = 0;
      }
    } else {
      const col = point[1];
      for (let i = point[0]; i <= length; i++) {
        table[i][col] = 0;
      }
    }
    return table;
  }
  // drawLine(a, b) {
  //   let table = this.state.table.slice();
  //   if (a[0] === b[0]) {
  //     const start = Math.min(a[1], b[1]);
  //     const row = a[0];
  //     for (let i = start; i <= Math.abs(a[1] - b[1]); i++) {
  //       table[row][i] = 0;
  //     }
  //   } else {
  //     const start = Math.min(a[0], b[0]);
  //     const col = a[1];
  //     for (let i = start; i <= Math.abs(a[0] - b[0]); i++) {
  //       table[i][col] = 0;
  //     }
  //   }
  //   return table;
  // }

  drawRectangcle(point, width, height) {

  }

  markActiveCell(cell) {
      const oldCell = this.state.curPos;
      let table = this.state.table.slice();
      if (oldCell.length) {
        table[oldCell[0]][oldCell[1]] = 1;
      }
      table[cell[0]][cell[1]] = 2;
      this.setState({
        curPos: cell,
        //table: table
      });
      return table;
  }

  chooseFreeCell() {
    let table = this.state.table;
    let row = Math.floor(Math.random() * table.length);
    let col = table[row].findIndex(el=>el === 1);
    return [row, col];
  }

  checkCell(x, y) {
    const map = this.state.table;
    if (map[x] && map[x][y]) {
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
    e.preventDefault();
    this.markActiveCell(this.getNewCoords(e.code));
  }

  render() {
    return <div>
              <Playground table={this.state.table} />
            </div>
  }
}

export default Game;
