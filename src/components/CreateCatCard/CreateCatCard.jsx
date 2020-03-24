import React, { Component } from "react";
import { firestore } from "../../firebase";
import { globalHistory } from "@reach/router";

export default class CreateCatCard extends Component {
    state = {
        formData: {
            name: "",
            description: "",
            location: "",
            skills: {},
            myCreation: ""
        },
        skills: ["outgoingness", "spontaneity", "friendliness"]
    }

    componentDidMount() {
        if(!this.props.user) globalHistory.navigate("login");
        
    }

    handleInputChange = (event) => {
        if(this.state.skills.includes(event.target.name)) {
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

    handleSubmit = (event) => {
        event.preventDefault();
        firestore
            .collection("mycatcards")
            // .add(this.props.user.uid)    // set the ID of our document, use the same id of the authentication
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
            <form onSubmit={this.handleSubmit}>
                <h1>Make your own Cat Card!</h1>
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
                <input type="submit" value="Submit" />

            </form>
        );
    }
}