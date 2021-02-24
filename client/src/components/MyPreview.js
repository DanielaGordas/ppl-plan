import React from 'react';
import { usePreview } from 'react-dnd-preview';

const MyPreview = ({classes}) => {
  const {display, item, style} = usePreview();
  if (!display) {
    return null;
  }
  return (
    <div className={classes.Card} style={style}>
      {item.icon ? <img src={item.icon} alt=""/> : item.name}
    </div>
  )
};

export default MyPreview;