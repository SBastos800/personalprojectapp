import React, { Component } from "react";
import styles from "./CreateCatCard.module.scss";
import firebase, { firestore } from "../../firebase";
import { globalHistory } from "@reach/router";
import FileUploader from "react-firebase-file-uploader";


export default class CreateCatCard extends Component {
    state = {
        formData: {
            name: "",
            description: "",
            location: "",
            skills: {},
            image: "",
            myCreation: ""
        },
        skills: ["outgoingness", "spontaneity", "friendliness"]
    }

    componentDidMount() {
        if (!this.props.user) globalHistory.navigate("login");
    }

    handleInputChange = (event) => {
        if (this.state.skills.includes(event.target.name)) {
            this.setState({
                formData: {
                    ...this.state.formData,
                    skills: {
                        ...this.state.formData.skills,
                        [event.target.name]: event.target.value
                    }
                }
            })
        } else {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [event.target.name]: event.target.value
                }
            })
        }
    }

    handleUploadSuccess = filename => {
        firebase
          .storage()
          .ref("catimage")
          .child(filename)
          .getDownloadURL()
          .then(url =>
            this.setState({
              formData: {
                ...this.state.formData,
                image: url
              }
            })
          );
      };

    handleSubmit = (event) => {
        event.preventDefault();
        firestore
            .collection("mycatcards")
            .add({
                ...this.state.formData,
                myCreation: this.props.user.uid
            })
            .then(() => {
                console.log("It Worked");
            })
    }

    render() {
        return (
            <form className={styles.formWrapper} onSubmit={this.handleSubmit}>
                <h1>Make your own Cat Card!</h1>
                <section className={styles.inputWrapper}>
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.formData.name}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={this.state.formData.description}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={this.state.formData.location}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="Outgoingness"
                        name="outgoingness"
                        value={this.state.formData.outgoingness}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="Spontaneity"
                        name="spontaneity"
                        value={this.state.formData.spontaneity}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="Friendliness"
                        name="friendliness"
                        value={this.state.formData.friendliness}
                        onChange={this.handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="My Creation"
                        name="myCreation"
                        value={this.state.formData.myCreation}
                        onChange={this.handleInputChange}
                    />
                    <div className={styles.catImage}>
                    <FileUploader
                        accept="image/*"
                        name="catimage"
                        randomizeFilename
                        storageRef={firebase.storage().ref("catimage")}
                        onUploadSuccess={this.handleUploadSuccess}
                        maxHeight={500}
                        maxWidth={500}
                    />
                    </div>
                    <div className={styles.submitButtonWrapper}>
                        <input className={styles.submitButton} type="submit" value="Submit" />
                    </div>
                    <p>After filling in the form, press the SUBMIT button once and go back to Cat Facts to see your newly created card!</p>
                </section>
            </form>
        );
    }
}