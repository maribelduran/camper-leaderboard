import React from 'react';
import Button from './button';
import classNames from 'classnames';



//only using angle-down since we are reverse ordering only
const DownArrow = () => 
<span className="fa fa-angle-down"></span> 

const Sort = ({sortKey, onChangeSortOn, activeSortKey,  children}) => {

  const isActiveSortKey = (sortKey === activeSortKey);
  const sortClass = classNames(
    'button-inline',
    { 'button-active': isActiveSortKey }
  );
  return (
    <Button
      onClick={() => onChangeSortOn(sortKey)}
      className={sortClass}
      >
      {children}
      { isActiveSortKey ? 
      <DownArrow />
      : null
      }
    </Button>
    )
}
export default Sort;