import { slide as Menu } from 'react-burger-menu';
import React from 'react'; 
import '../styles/components/nav.scss';

const NavBar = () => {

    return(
        <Menu right width={ '100%' } >
            <a id="home" className="menu-item" href="/">Home</a>
            <a id="contact" className="menu-item" href="/privacy">Privacy Policy</a>
        </Menu>
    )
}

export default NavBar;