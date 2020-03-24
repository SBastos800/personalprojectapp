import React, { Component } from "react";
import styles from "./CatFactsList.module.scss";
import Facts from "../CatFactsList/Facts";


export default class CatFactsList extends Component {

    state = {
        url: "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts",
        all: []
    }

    componentDidMount() {
        fetch(this.state.url)
        // .catch(err => {console.log(err)})
        .then(res => res.json())
        .then(data => {
            this.setState({all: data['all']})
        })
    }

    render() {
        const randomFact = Math.floor(Math.random() * 233)
        console.log(this.state.all[randomFact])
        return(
            <section className={styles.catFactsListWrapper}>
                <h1>Cat Facts</h1>
                <p>Here's your random cat fact!</p>
                <section className={styles.listWrapper} >
                     <Facts random={this.state.all[randomFact]} />
                </section>
            </section>
        );
    }
}