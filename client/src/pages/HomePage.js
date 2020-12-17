import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/button.scss'
import classes from '../styles/pages/home.module.scss';
import logo from '../images/logo-tagline.jpg';
import covid from '../images/homepage/covid.jpg';
import field from '../images/homepage/field.jpg';
import windmill from '../images/homepage/wind.jpg';  
import NavBar from '../components/NavBar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
    return(
        <>
        <NavBar />
            <div className={classes.Home}>
                <img className={classes.HomeLogo} src={logo} alt="logo"/>
                <div className={classes.Carousel}>
                    <Carousel showArrows={true} infiniteLoop useKeyboardArrows autoPlay showThumbs={false} interval={6000}>
                        <div className={classes.CarouselItem}>
                            <img src={covid}  className={classes.CarouselImg}/>
                            <p className="legend">70% of the UK and globally think we should be taking climate change seriously.</p>
                        </div>
                        <div className={classes.CarouselItem}>
                            <img src={field} className={classes.CarouselImg}/>
                            <p className="legend">74% of councils, and the UK government, have declared a climate emergency.</p>
                        </div>
                        <div className={classes.CarouselItem}>
                            <img src={windmill} className={classes.CarouselImg}/>
                            <p className="legend">According to leading economists a green recovery is the best way to recover from Covid.</p>
                        </div>
                    </Carousel>
                </div>
                <Link to="/user"><button className="Btn">Participate</button></Link>
            </div>
        </>
    )
}

export default HomePage;