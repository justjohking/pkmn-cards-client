import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/profile/cards" />;
    }

    return (
      <form onChange={this.handleChange} onSubmit={this.handleSubmit} className="account-form">
            
        <h2>Sign in</h2>

        <div className="first-name">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="last-name">
          <label htmlFor="last-name">First Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>

        <div className="country">
          <label htmlFor="country">First Name</label>
          <input type="text" id="country" name="country" />
        </div>

        <div className="question">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <div className="question">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>

        <button className="button primary">Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignin));
