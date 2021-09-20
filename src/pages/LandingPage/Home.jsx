import React from "react";
import { Link } from "react-router-dom";
import { withUser } from "../../components/Auth/withUser";
import "./Home.css"
class Home extends React.Component {
  render() {
    return (
      <div className="main-div">
          
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pok%C3%A9mon_Trading_Card_Game_logo.svg/1280px-Pok%C3%A9mon_Trading_Card_Game_logo.svg.png" alt="" />          
          <div className="template-button">
            <Link to="/cards">See all cards</Link>
          </div>
      </div>
    );
  }
}

export default withUser(Home);
