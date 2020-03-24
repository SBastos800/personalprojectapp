import React, { Component } from "react";
import styles from "./Card.module.scss";
import Skills from "./Skills";

export default class Card extends Component {
    render() {
        return(
            <section className={styles.cardWrapper}>
                 <img className={styles.image}
                    src={this.props.cardData.image}
                />
                  <h3>Name: {this.props.cardData.name}</h3>
                  <p>Description: {this.props.cardData.description}</p>
                  <p>Dates: {this.props.cardData.dates}</p>  
                <Skills className={styles.skillsCss} skills={this.props.cardData.skills} /> 
            </section>
        );
    }
}