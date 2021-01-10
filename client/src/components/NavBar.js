import { slide as Menu } from 'react-burger-menu';
import React from 'react'; 
import '../styles/components/nav.scss';

const NavBar = () => {

    return(
        // <div style={{ "width": "100%", "display": "flex", "alignItems": "center", "position": "relative"}}>
        //     <div className="NavBarLogo"></div>
        //     <div>
            <Menu right width={'100%'} >
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="contact" className="menu-item" href="/privacy">Privacy Policy</a>
            </Menu>
        //     </div>
        // </div>
    )
}

export default NavBar;