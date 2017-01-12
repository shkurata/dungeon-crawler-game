import React from 'react';
import Cell from './Cell.js';

function Playground(props) {
  const table = props.table.map((v, i)=>
      <tr key={i}>
        {v.map((e,n)=>
               <Cell key={n} row={i}
                     col={n} status={e} />)}
      </tr>
    );

  return (
    <table>
        <tbody>
            {table}
        </tbody>
    </table>
  );
}

export default Playground;
