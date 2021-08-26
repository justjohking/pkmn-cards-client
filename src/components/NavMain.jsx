import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";

import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <nav className="NavMain navbar">
      <NavLink exact to="/">
        <h3 className="logo">PokemonTCG</h3>
      </NavLink>
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/cards">All Cards</NavLink>
            </li>
            <li>
              <NavLink to="/profile/cards">My Cards</NavLink>
            </li>
            <li>
            <div class="dropdown">
              <button class="dropbtn">Shop
                <i class="fa fa-caret-down"></i>
              </button>
              <div class="dropdown-content">
                <NavLink to="/auctions" className="NavLink">All Auctions</NavLink>
                <NavLink to="/exchanges" className="NavLink">All Exchanges</NavLink>
                <NavLink to="/profile/auctions" className="NavLink">My Auctions</NavLink>
                <NavLink to="/profile/exchanges" className="NavLink">My Exchanges</NavLink>
              </div>
            </div>
              
            </li>
            <li>
              <NavLink to="/profile">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout}>Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
