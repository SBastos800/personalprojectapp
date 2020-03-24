import React, { Component } from 'react';
import styles from './App.module.scss';
import NavBar from "../../components/NavBar";
import CardList from "../../components/CardList";
import Routes from "../../routes/Routes";

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <NavBar />
        {/* <CardList /> */}
        <Routes />
      </div>
    );
  }
  
}


