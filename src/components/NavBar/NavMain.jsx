import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import './NavBar.css'


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
    <nav>

        <ul className="nav-list left">
          <li>
            <NavLink exact to="/">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/cards" className="NavLink">All Cards</NavLink>
          </li>
        </ul>
      

        <ul className="nav-list right">
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/profile/cards" className="NavLink">My Cards</NavLink>
              </li>

              <li>
                <div className="dropdown">
                  <p className="dropdown-text">Shop</p>
                  <div className="dropdown-content">
                    <NavLink to="/auctions" className="dropdown-item">All Auctions</NavLink>
                    <NavLink to="/exchanges" className="dropdown-item">All Exchanges</NavLink>
                  </div>
                </div>
              </li>

              <li>
                <div className="dropdown">
                <p className="dropdown-text">My Activity</p>
                <div className="dropdown-content">
                  <NavLink to="/profile/auctions" className="dropdown-item">My Auctions</NavLink>
                  <NavLink to="/profile/exchanges" className="dropdown-item">My Exchanges</NavLink>
                </div>
                </div>
              </li>

              <li>
                <div className="dropdown">
                  <p className="dropdown-text">Username</p>
                  <div className="dropdown-content">
                    <NavLink to="/profile" className="dropdown-item">Profile</NavLink>
                    <p onClick={handleLogout} className="dropdown-item">Logout</p>
                  </div>
                </div>
              </li>

            </React.Fragment>
          )}

          {!context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/signin" className="NavLink">Sign in</NavLink>
              </li>
              <li>
                <NavLink to="/signup" className="NavLink">Sign up</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>

    </nav>
  );
};

export default withUser(NavMain);
