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
            this.setState({all: data['all']})
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
        return(
        <>
            <section className={styles.catFactsListWrapper}>
                <h1>Cat Facts</h1>
                <p>Here's your random cat fact!</p>

                <section className={styles.listWrapper} >
                     <Facts random={this.state.all[randomFact]} />
                </section>

                <section className={styles.buttonWrapper} onClick={this.props.signOut}>
                    <button>Sign out</button>
                </section>

                 <section>
                  {this.state.myCards.map((person, index) => (
                        <Card cardData={person} key={index} />
                    ))}
                </section>
            </section> 
        </>
        );
    }
}