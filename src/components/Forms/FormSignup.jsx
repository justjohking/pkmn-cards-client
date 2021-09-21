import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import "./Forms.css"

class FormSignup extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
    coutry: "",
    messageUsername: ""
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((res) => {
        this.props.history.push("/signin");
      })
      .catch((error, res) => {
        this.setState({messageUsername: "Woups, this username is already taken!"})
        console.log("error", error)
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <form onSubmit={this.handleSubmit} className="account-form">

      <h2>Signup</h2>

      <div className="first-name">
          <label htmlFor="first-name">First Name</label>
          <input 
          type="text" 
          id="first-name" 
          name="first-name" 
          onChange={this.handleChange}
          value={this.state.firstName}
          />
        </div>

        <div className="last-name">
          <label htmlFor="last-name">Last Name</label>
          <input 
          type="text" 
          id="last-name" 
          name="last-name" 
          onChange={this.handleChange}
          value={this.state.lastName}
          />
        </div>

        <div className="country">
          <label htmlFor="country">Country</label>
          <input 
          type="text" 
          id="country" 
          name="country" 
          onChange={this.handleChange}
          value={this.state.country}
          />
        </div>

        <div className="question">
          <label htmlFor="username">Username</label>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            type="username"
            id="username"
            name="username"
          />
        </div>

        <div className="question">
          <label htmlFor="email">Email</label>
          <input
            onChange={this.handleChange}
            value={this.state.email}
            type="email"
            id="email"
            name="email"
          />
        </div>

        <div className="question">
          <label htmlFor="password">Password</label>
          <input
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
            id="password"
            name="password"
          />
        </div>

        <button className="button primary">Submit</button>

        {this.state.messageUsername.length > 0 && 
          (<p>{this.state.message}</p>)}

      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
