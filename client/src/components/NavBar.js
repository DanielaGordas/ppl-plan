import { slide as Menu } from 'react-burger-menu';
import React from 'react';
import '../styles/components/nav.scss';

const NavBar = () => {
    return(
        <div style={{ "width": "100%", "display": "flex", "alignItems": "center", "color": "#102773", "background": "linear-gradient(rgba(174, 220, 232, 1), rgba(235, 249, 253, 1))"}}>
            <div className="NavBarLogo"></div>
            <div style={{"border": "1px solid magenta"}}>
                <Menu right width={'100%'} style={{ "border": "1px solid green" }}>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/privacy">Privacy Policy</a>
                </ Menu >
            </div>
        </div>
    )
}

export default NavBar;