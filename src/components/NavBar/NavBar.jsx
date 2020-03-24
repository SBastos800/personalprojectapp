import React, { Component } from "react";
import styles from "./NavBar.module.scss";
import NavItem from "./NavItem";



export default class NavBar extends Component  {
    render() {
        return(
            <nav className={styles.navBarWrapper}>
                <ul className={styles.navList}>
                    <NavItem route="/login" name="Login" /> 
                    <NavItem route="/cards" name="Cards" />
                    <NavItem route="/private/catfactslist" name="Facts" />
                </ul>
            </nav>
        )
    }
}

