import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      const headers = {
        "Content-Type": "application/json",
        "auth-token": token,
      };
      axios
        .get("/api/verify", {
          headers: headers,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      this.setState({
        redirect: true,
      });
    }
  }

  handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      redirect: true,
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login"></Redirect>;
    }
    return (
      <div className="loggedIn">
        Welcome!
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToAppIcon />}
          onClick={this.handleLogOut}
        >
          Logout
        </Button>
      </div>
    );
  }
}

export default Post;
