// component that contains the carousel with the images

import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from '../styles/components/infographics-carousel.module.scss';
import getArrayOfAllFolderChildren from '../functions/getArrayOfAllFolderChildren';


const InfographicsCarousel = () => {
  const context = require.context('../../src/images/infographics-carousel', true, /\.jpg$/);
  const images = getArrayOfAllFolderChildren(context);

  return (
    <Carousel className={classes.Carousel}>
      {images.map(image => (
        <img src={image}/>
      ))}
    </Carousel>
  )
}

export default InfographicsCarousel;