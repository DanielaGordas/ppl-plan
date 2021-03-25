import { slide as Menu } from 'react-burger-menu'
import React from 'react'
import '../styles/components/nav.scss'
import AuthenticationButton from '../auth/AuthenticationButton'

const NavBar = () => {
	return (
		<div>
			<Menu right width={'100%'}>
				<a id='home' className='menu-item' href='/'>
					Home
				</a>
				<a id='about' className='menu-item' href='/about'>
					About
				</a>
				<a id='privacy' className='menu-item' href='/privacy'>
					Privacy Policy
				</a>
				<a id='sources' className='menu-item' href='/sources'>
					Sources
				</a>
				<AuthenticationButton />
			</Menu>
		</div>
	)
}

export default NavBar
