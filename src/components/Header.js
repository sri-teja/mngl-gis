import React, { useState, useEffect } from "react";
import {Link,NavLink} from 'react-router-dom'
import "./header.css"
import { CSSTransition } from "react-transition-group";

function Header() {
	const [isNavVisible, setNavVisibility] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 700px)");
		mediaQuery.addListener(handleMediaQueryChange);
		handleMediaQueryChange(mediaQuery);

		return () => {
		  mediaQuery.removeListener(handleMediaQueryChange);
		};
	}, []);

	const handleMediaQueryChange = mediaQuery => {
		if (mediaQuery.matches) {
			setIsSmallScreen(true);
		} else {
			setIsSmallScreen(false);
		}
	};
	const style={ color:"#000" }

	const toggleNav = () => {
		setNavVisibility(!isNavVisible);
	};

	return (
		<React.Fragment>
			<div className="menu-mobile menu-activated-on-click color-scheme-light">
				<div className="mm-logo-buttons-w">
				<Link className="mm-logo" to="/login">
					<img src="./favicon.ico" alt="logo" className="logo" style={{height: "25px", width:"25px", margin: "10px"}}/>
				</Link>
				<div className="mm-buttons">
				<div className="mobile-menu-trigger">                 
				<div onClick={toggleNav} className="fa fa-bars"></div>
				</div>
				</div>
				</div>

				<CSSTransition 
				in={!isSmallScreen || isNavVisible}
				timeout={350}
				classNames="NavAnimation"
				unmountOnExit>
					<nav className="Nav">
						<NavLink to="/">Home</NavLink>
					</nav>
				</CSSTransition>
	   		</div>

			<div className="menu-w color-scheme-light fixed-top color-style-default menu-position-top menu-layout-compact sub-menu-style-over sub-menu-color-bright selected-menu-color-bright menu-activated-on-hover menu-has-selected-link">
				<div className="logo-w">
					<div className="logo-w menu-size">
						<Link to="/login" className="logo">
						<img alt="logo" src='./logo192.png' className="logo" style={{height: "25px", width:"25px", margin: "10px"}}/>MNGL Dashboard
						</Link>
					</div>
				</div>
				<div className="top-bar color-scheme-light">
					<ul>
						<li>
							<NavLink exact to="/login" activeStyle={style}>Home</NavLink>
						</li>
					</ul> 
				</div>
			</div>
		</React.Fragment>
	);
};

export default Header;