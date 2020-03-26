import React, { Component } from "react";
import styles from "./CatFactsList.module.scss";
import Facts from "../CatFactsList/Facts";
import { firestore } from "../../firebase";
import Card from "../CardList/Card";


export default class CatFactsList extends Component {

    state = {
        url: "https://cors-anywhere.herokuapp.com/https://cat-fact.herokuapp.com/facts",
        all: [],
        myCards: []
    }

    componentDidMount() {
        fetch(this.state.url)
            // .catch(err => {console.log(err)})
            .then(res => res.json())
            .then(data => {
                this.setState({ all: data['all'] })
            })

        firestore
            .collection("mycatcards")
            // .where("myCreation", "==", this.props.user.uid)
            .get()
            .then((query) => {
                const myCards = query.docs.map(doc => doc.data());
                this.setState({ myCards });
            })
    }

    render() {
        const randomFact = Math.floor(Math.random() * 233)
        console.log(this.state.myCards)
        return (
            <>
                <section className={styles.catFactsListWrapper}>
                    <section className={styles.buttonWrapper} onClick={this.props.signOut}>
                        <button>Sign out</button>
                    </section>
                    <h1 className={styles.catFacts}>Cat Facts</h1>
                    <p className={styles.catsPara}>Here's your random cat fact! Every time you login, you'll be able to discover a new fact about cats. Enjoy the cats world! </p>
                    <section className={styles.listWrapper} >
                        <Facts random={this.state.all[randomFact]} />
                    </section>
                    <p className={styles.catsPara}>HERE'S YOUR OWN CAT'S CARDS!</p>
                    <p className={styles.catsPara}>You can create different cards with your favourite cats and store them here:</p>
                    <section className={styles.cardsWrapper}>
                        {this.state.myCards.map((person, index) => (
                            <Card cardData={person} key={index} />
                        ))}
                    </section>
                </section>
            </>
        );
    }
}