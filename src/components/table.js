import React from 'react';
import './table.css';

const Table = ({list, onSortSelect}) => 
<div className="table">
  <div className="table-header">
    <span className="clmn-width-10"></span>
    <span className="clmn-width-40">Camper Name</span>
    <span className="clmn-width-40"><button onClick={() => onSortSelect("recent")} >Points in Past 30 Days</button></span>
    <span className="clmn-width-40"><button onClick={() => onSortSelect("alltime")} >All Time Points</button></span>
  </div>
  {list.map((item,index) =>  
    <div key={item.username} className="table-row">
      <span className="clmn-width-10">{index+1}</span>
      <span className="clmn-width-40">
        <img src={item.img}/>
        <a href={`https://www.freecodecamp.org/${item.username}`} target="_blank">{item.username}</a></span>
      <span className="clmn-width-40">{item.recent}</span>
      <span className="clmn-width-40">{item.alltime}</span>
    </div>
  )}
</div>

export default Table;