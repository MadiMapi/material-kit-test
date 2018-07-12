import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import LockOutline from "@material-ui/icons/LockOutline";
import People from "@material-ui/icons/People";
// core components
import Header from "../../components/Header/Header.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";

import loginPageStyle from "../../assets/jss/material-kit-react/views/loginPage.jsx";

import image from "../../assets/img/food.jpg";
import fire from "../../base";
import {Link} from "react-router-dom";


class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: '',
      password: ''
    };
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  signup(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).then((u) => { console.log(u) })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  render() {
    const { classes, ...rest } = this.props;
    return <div>
        <Header color="transparent" brand="Casual Chef" rightLinks={<HeaderLinks />} fixed {...rest} />
        <div className={classes.pageHeader} style={{ backgroundImage: "url(" + image + ")", backgroundSize: "cover", backgroundPosition: "top center" }}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardBody>
                      <CustomInput 
                      value={this.state.email}
                      onChange={this.handleChange}
                      labelText="Email..." 
                      id="email" formControlProps={{ fullWidth: true }} 
                      inputProps={{ type: "email", endAdornment: 
                      <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment> }} />
                      <CustomInput 
                      value={this.state.password}
                      onChange={this.handleChange}
                      labelText="Password" 
                      id="pass" f
                      ormControlProps={{ fullWidth: true }} inputProps={{ type: "password", endAdornment: <InputAdornment position="end">
                              <LockOutline className={classes.inputIconsColor} />
                            </InputAdornment> }} />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button 
                      type="submit"
                      onClick={this.login}
                      simple color="primary" 
                      size="lg">
                        Log In
                      </Button>
                    </CardFooter>
                    <p className={classes.divider}>
                      Not a member yet? Sign up <Link to='/signup-page'>here</Link>
                    </p>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>;
  }
}

export default withStyles(loginPageStyle)(LoginPage);
