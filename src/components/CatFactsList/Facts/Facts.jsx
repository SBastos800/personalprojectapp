import React, { Component } from "react";
import styles from "./Facts.module.scss";

export default class Facts extends Component {
    render() {
        // console.log(this.props.random)
        if (this.props.random) {
            return(
                <section className={styles.factsWrapper}> 
                     <h3>{this.props.random.user.name.first + this.props.random.user.name.last}</h3>
                     <p>{this.props.random.text}</p>
                     <p>{this.props.random.upvotes}</p>
                </section>
            );
        } else {
            return(
                <section className={styles.factsWrapper}></section>
            )
        }
    }
}