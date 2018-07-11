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

class Router extends React.Component {
  state = {
    loading: true,
    authenticated: false,
    user: null
  };
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          currentUser: user,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          currentUser: null,
          loading: false
        });
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
            authenticated={this.state.authenticated}
          />
          <PrivateRoute
          path="/profile-page"
          component={ProfilePage}
          authenticated={this.state.authenticated}
          />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
