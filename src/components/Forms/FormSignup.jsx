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

        <button className="template-button-all-cards">Submit</button>

        {this.state.messageUsername.length > 0 && 
          (<p>{this.state.message}</p>)}

      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
