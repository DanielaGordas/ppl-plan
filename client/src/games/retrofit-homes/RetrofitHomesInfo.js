import getArrayOfAllFolderChildren from '../../functions/getArrayOfAllFolderChildren';
import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from '../../styles/components/infographics-carousel.module.scss'
import '../../styles/components/button.scss';

const RetrofitHomesInfo = ({title}) => {
    const context = require.context("../../images/circular-economy-infographics/", true, /\.jpg$/);
    const images = getArrayOfAllFolderChildren(context);
  
    return (
        <div className={classes.Container}>
            <h3 className={classes.CarouselTitle}>{title}</h3>
            <Carousel showArrows={true} infiniteLoop useKeyboardArrows autoPlay showThumbs={false} interval={6000} className={classes.Carousel} >
                {images.map((image, index) => (
                <img key={index} src={image} alt=""/>
                ))}
            </Carousel>
            <Link to="retrofithomes/intro"> <button className="Btn">I'm Ready!</button></Link>
      </div>
    )
  }
  
  export default RetrofitHomesInfo;