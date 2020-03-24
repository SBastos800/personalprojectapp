import React, { Component } from "react";
import styles from "./NavItem.module.scss";
import { Link } from "@reach/router";

export default class NavItem extends Component {
    render() {
        return(
            <p className={styles.navItem} >
                <Link to={this.props.route}>{this.props.name}</Link>
            </p>
        )
    }
}