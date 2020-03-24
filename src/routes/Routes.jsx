import React, { Component } from "react";
import { Router, Redirect, globalHistory } from "@reach/router";
import CardList from "../components/CardList";
import firebase, { providers } from "../firebase";
import Login from "../components/Login";
import CatFactsList from "../components/CatFactsList";
import PrivateRoutes from "../routes/PrivateRoutes";


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
    render() {
        console.log(this.state.user)
        return(
            <Router>
                <Redirect noThrow from="/" to="cards" />
                <Login path="login" signIn={this.signIn} />
                <CardList path="cards" />
                <PrivateRoutes path="private" user={this.state.user}>
                    <CatFactsList path="catfactslist" user={this.state.user} />
                </PrivateRoutes>
                
                <NotFound default />
            </Router>
        );
    }

}