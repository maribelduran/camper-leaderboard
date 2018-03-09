import React from 'react';

const Table = ({list}) => 
<div className="table">
  <div className="table-header">
    <span></span>
    <span>Camper Name</span>
    <span>Points in past 30 days</span>
    <span>All Time Points</span>
    </div>
    {list.map((item,index) => 
      <div key={item.username}>
        {index+1} {item.username} {item.recent} {item.alltime}
      </div>
    )}
</div>

export default Table;