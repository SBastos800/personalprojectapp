import React, { Component } from "react";
import { Router, Redirect, globalHistory } from "@reach/router";
import styles from './router.module.scss';
import CardList from "../components/CardList";
import firebase, { providers } from "../firebase";
import Login from "../components/Login";
import CatFactsList from "../components/CatFactsList";
import PrivateRoutes from "../routes/PrivateRoutes";
import CreateCatCard from "../components/CreateCatCard";


const NotFound = () => (<h2>Oops, page not found</h2>);

export default class Routes extends Component {
    state = {
        user: null
    }

    signIn = () => {
        firebase
        .auth()
        .signInWithPopup(providers.google)
        .then(result => {
            this.setState({user: result.user})
        })
        .catch(error => {
            console.log(error);
        })
    }

    signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this.setState({user: null});
                globalHistory.navigate("/login");
            })
    }

    render() {
        console.log(this.state.user)
        return(
            <Router className={styles.container}>
                <Redirect noThrow from="/" to="cards" />
                <Login path="login" signIn={this.signIn} />
                <CardList path="cards" />
                <PrivateRoutes path="private" user={this.state.user}>
                    <CatFactsList path="catfactslist" user={this.state.user} signOut={this.signOut} />
                </PrivateRoutes>
                <CreateCatCard path="private/createcatcard" user={this.state.user} />
                <NotFound default />
            </Router>
        );
    }
}