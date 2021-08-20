import React from "react";
import { Link } from "react-router-dom"

class Home extends React.Component {
  render() {
    return (
      <div>
          <h1>Home</h1>  
          <p><Link to="/cards">See all cards</Link></p>
      </div>
    );
  }
}

export default Home;
