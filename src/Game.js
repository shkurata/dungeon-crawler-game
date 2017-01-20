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
      //table: this.randomizeMap(this.createMap(50, 50))
      table: this.createMap(50, 50)
    });
  }

  componentDidMount() {
    this.markActiveCell(this.chooseFreeCell());
    //this.drawLine([1, 2], 30, 'horizontal');
    this.drawRectangles();
    window.addEventListener('keydown', this.keyPressHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyPressHandler);
  }

  createMap(rows, cols) {
    return new Array(rows).fill(new Array(cols).fill(0));
  }

  randomizeMap(table) {
    return table.map(function(row) {
      return row.map(function() {
        return Math.random() < 0.7 ? 1 : 0
      });
    });
  }

  drawRectangles() {
    const table = this.state.table.map(row=>row.slice());
    let curPointRow = 1;
    let curPointCol = 1;
    let availSpaceRow = table[0].length - 1;
    let availSpaceCol =  table.length - 1;
    function random3to8() {
      return Math.floor(Math.random() * 6) + 3;
    }
    function makeRandomSize() {
      const width = random3to8();
      const height =  random3to8();
      return [width, height];
    }
    function drawRectangle() {
      const [row, col] = [curPointRow, curPointCol];
      const [width, height] = makeRandomSize();
      if (availSpaceCol > 4) {
        for (let i = 0; i < width; i++) {
          for (let j = 0; j < height; j++) {
            table[row + i][col + j] = 1;
          }
        }
        curPointRow += height;
        curPointCol += width;
        availSpaceRow -= height + 1;
        availSpaceCol -= width + 1;
        return true;
      } else {
        return false;
      }
    }
    while (drawRectangle()) {}

    this.setState({
      table: table
    });
  }

  markActiveCell(cell) {
      const oldCell = this.state.curPos;
      const table = this.state.table.map(row=>row.slice());
      if (oldCell.length) {
        table[oldCell[0]][oldCell[1]] = 1;
      }
      table[cell[0]][cell[1]] = 2;
      this.setState({
        curPos: cell,
        table: table
      });
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
