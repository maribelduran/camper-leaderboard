import React from 'react';
import Sort from './sort'
import './table.css';

const Table = ({list, onChangeSortOn, activeSortKey }) => 

<div className="table">
  <div className="table-header">
    <span className="table-clmn-10"></span>
    <span className="table-clmn-40">Camper Name</span>
    <span className="table-clmn-40 center-content">
      <Sort 
        sortKey={'recent'}
        onChangeSortOn={onChangeSortOn}
        activeSortKey={activeSortKey}
        >
        Points in Past 30 Days
      </Sort>
    </span>
    <span className="table-clmn-40 center-content">
    <Sort 
        sortKey={'alltime'}
        onChangeSortOn={onChangeSortOn}
        activeSortKey={activeSortKey}
        >
        All Time Points
      </Sort>
      
    </span>
  </div>
  {list.map((item,index) =>  
    <div key={item.username} className="table-row">
      <span className="table-clmn-10">{index+1}</span>
      <span className="table-clmn-40">
        <img src={item.img}/>
        <a href={`https://www.freecodecamp.org/${item.username}`} target="_blank">{item.username}</a></span>
      <span className="table-clmn-40 center-content">{item.recent}</span>
      <span className="table-clmn-40 center-content">{item.alltime}</span>
    </div>
  )}
</div>

export default Table;