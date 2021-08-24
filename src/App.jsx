import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import AllCards from "./pages/AllCards";
import OneCard from "./components/OneCard/OneCard"
import Bids from "./pages/Bids";
import CardsList from "./components/CardsList/CardsList";
import OneUserCardPage from "./components/OneUserCard/OneUserCardPage";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component= {Signin} />
        <Route exact path="/signup" component= {Signup} />
        <Route exact path="/cards" component= {AllCards} />
        <Route exact path="/cards/:id" component ={OneCard} />
        <Route exact path ="/bids" component= {Bids} />
        <ProtectedRoute exact path="/profile" component= {Profile} />
        <ProtectedRoute path="/profile/cards" component={CardsList} />
        <ProtectedRoute exact path="/profile/cards/:id" component={OneUserCardPage} />
      </Switch>
    </div>
  );
}

export default App;
