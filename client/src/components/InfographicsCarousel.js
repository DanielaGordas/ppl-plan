import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from '../styles/components/infographics-carousel.module.scss';


const InfographicsCarousel = () => {
  const imagesContext = require.context('../../src/images/infographics-carousel', true, /\.jpg$/);
  const images = imagesContext.keys();
  const joinedPaths = [];
  images.forEach(i => {
    joinedPaths.push(imagesContext(i));
  });

  return (
    <Carousel className={classes.Carousel}>
      <div>
        <img src={joinedPaths[1]} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={joinedPaths[0]} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={joinedPaths[2]} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  )
}

export default InfographicsCarousel;