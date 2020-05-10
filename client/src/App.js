import React from "react";
import SignUp from "./components/signUp";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Post from "./components/privateRoutes/post";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Post} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
