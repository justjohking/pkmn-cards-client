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
      <div className="home-div"> 
      
      <NavLink exact to="/">
      <img className="pokeball-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/1200px-Pok%C3%A9_Ball_icon.svg.png" alt="" />

      </NavLink>
      </div>
      
      <ul className="nav-list">
        {context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/cards" className="NavLink">All Cards</NavLink>
            </li>
            <li>
              <NavLink to="/profile/cards" className="NavLink">My Cards</NavLink>
            </li>
            <li>
            <div class="dropdown">
              <button class="dropbtn" className="NavLink">Shop
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
              <NavLink to="/profile" className="NavLink">
                {context.user && context.user.email}
              </NavLink>
            </li>
            <li>
              <p onClick={handleLogout} className="NavLink">Logout</p>
            </li>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <li>
              <NavLink to="/signin" className="NavLink">Log in</NavLink>
            </li>
            <li>
              <NavLink to="/signup" className="NavLink">Create account</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(NavMain);
