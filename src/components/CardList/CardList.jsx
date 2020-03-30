import React, { Component } from "react";
import styles from "./CardList.module.scss";
import Card from "../../components/CardList/Card";
import SearchBar from "../CardList/SearchBar";

import firebase, { firestore } from "../../firebase";

export default class CardList extends Component {

    state = {
        users: [],
        searchText: "",
        filteredCards: []
    }

    setSearchText = (event) => {
        const searchText = event.target.value;
        this.setState({ searchText }, this.filterCards)
    }
  

    filterCards = () => {
        let filteredCards = this.state.users.filter(user => {
            return user.name
            .toUpperCase()
            .includes(this.state.searchText.toUpperCase());
        })
        this.setState({ filteredCards });
    }

    componentDidMount() {
        firestore
            .collection("users")
            .get()
            .then((query) => {
                const users = query.docs.map(doc => doc.data());
                this.setState(
                    {
                        users: users,
                        filteredCards: users
                    }
                )
            })
    }

    render() {
        // console.log(this.state.searchText) 
        return (
            <>
                <section className={styles.cardListWrapper}>
                    <div className={styles.astrologyHeading}>
                        <h1 className={styles.catLovers}>Cat Lovers</h1>
                    </div>
                    <SearchBar searchText={this.state.searchText} setSearchText={this.setSearchText} />
                    <p className={styles.introToCats}>Here's a collection of the cuttest Cats! You can give it a try and search a card by name. For cat lovers, is going to be difficult to choose your favourite...they are all lovely!! LOGIN to find more about Cats!</p>
                    <section className={styles.cardList}>
                        {this.state.filteredCards.map((person, index) => (
                            <Card cardData={person} key={index} />
                        ))}
                    </section>
                </section>
            </>
        );
    }
}