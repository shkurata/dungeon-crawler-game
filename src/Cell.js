import React from 'react';
// this is the smallest component of the app. It has one property:
// 'status'  with the following values:
//           'open' - shows thet the player can walk through it
//           'close' - it is a wall
//           'enemy', 'food', 'weapon' - if it contains something
function Cell(props) {

  return <td className={props.status ? 'open' : 'close'} />
}

export default Cell;
