import React from 'react';
import { usePreview } from 'react-dnd-preview';

const MyPreview = ({classes, icon}) => {
  const {display, itemType, item, style} = usePreview();
  if (!display) {
    return null;
  }
  return (
    <div class={classes.Card} style={style}>
      {item.name}
    </div>
  )
};

export default MyPreview;