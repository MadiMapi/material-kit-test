import Components from "../views/Components/Components.jsx";
import LandingPage from "../views/LandingPage/LandingPage.jsx";
import ProfilePage from "../views/ProfilePage/ProfilePage.jsx";
import LoginPage from "../views/LoginPage/LoginPage.jsx";
import RecipePage from "../views/RecipePage/RecipePage.jsx";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import firebase from "../base";
import SignupPage from "../views/SignupPage/SignupPage";
import fire from "../base";

class Router extends React.Component {
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login-page" component={LoginPage} />
          <Route exact path="/signup-page" component={SignupPage} />
          <Route exact path="/landing-page" component={LandingPage} />
          <PrivateRoute
            path="/recipes"
            component={RecipePage}
            authenticated={this.state.user}
          ></PrivateRoute>
          <PrivateRoute
          path="/profile-page"
          component={ProfilePage}
          authenticated={this.state.user}
          />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
