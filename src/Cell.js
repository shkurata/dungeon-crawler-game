import React from 'react';
// this is the smallest component of the app. It has the following properties:
// 'open' - can be 'true'or 'false' and shows if the player can walk through it,
// 'active' - can be 'true'or 'false' and shows the current possition of the player,
// 'content' -can be 'enemy', 'food' or 'weapon' - shows the contents of the cell
function Cell(props) {

  return <td className={props.status === 2 ? 'active' : props.status === 0 ? 'close' : ''} />
}

export default Cell;
