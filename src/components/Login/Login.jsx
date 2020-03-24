import React, { Component } from "react";
import styles from "./Login.module.scss";

export default class Login extends Component {
    render() {
        return(
            <div onClick={this.props.signIn} className={styles.google}>
                <button>Sign in with google</button>
            </div>
        );
    }
}