import React from "react";
import API from "../../utils/API";
import { formatTime } from "../../helpers"
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import NavPills from "../../components/NavPills/NavPills.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";

import profile from "../../assets/img/faces/christian.jpg";

import profilePageStyle from "../../assets/jss/material-kit-react/views/profilePage.jsx";

class RecipePage extends React.Component {
  state = {
    recipes: [],
    recipeSearch: ""
  };

  handleInputChange = event => {
    // Destructure the name and value properties off of event.target
    // Update the appropriate state
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getRecipes(this.state.recipeSearch)
      .then(res => this.setState({ recipes: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
        <Header
          color="transparent"
          brand="Casual Chef"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{ height: 200, color: "white" }}
          {...rest}
        />
        <Parallax small filter image={require("../../assets/img/food.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div>
                      <img src={profile} alt="..." className={imageClasses} />
                    </div>
                    <div className={classes.name}>
                      <h1 className={classes.title}>Let's Get Cookin'</h1>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <div className={classes.description}>
                <p>
                  Have a dish you want to try? Search for it below to discover
                  recipes. Our search engine is powered by Yummly's API.{" "}
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={4} md={4} lg={3}>
                  <CustomInput
                    labelText="Enter a dish"
                    id="float"
                    name="recipeSearch"
                    value={this.state.recipeSearch}
                    onChange={this.handleInputChange}
                    formControlProps={{ fullWidth: true }}
                  />
                </GridItem>
                <GridItem xs={6} sm={6} md={4}>
                  <Button color="success" onClick={this.handleFormSubmit}>
                    Yummy
                  </Button>
                </GridItem>
              </GridContainer>

              {/* <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills alignCenter color="primary" tabs={[{ tabButton: "Studio", tabIcon: Camera, tabContent: <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={studio1} className={navImageClasses} />
                              <img alt="..." src={studio2} className={navImageClasses} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={studio5} className={navImageClasses} />
                              <img alt="..." src={studio4} className={navImageClasses} />
                            </GridItem>
                          </GridContainer> }, { tabButton: "Work", tabIcon: Palette, tabContent: <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={work1} className={navImageClasses} />
                              <img alt="..." src={work2} className={navImageClasses} />
                              <img alt="..." src={work3} className={navImageClasses} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={work4} className={navImageClasses} />
                              <img alt="..." src={work5} className={navImageClasses} />
                            </GridItem>
                          </GridContainer> }, { tabButton: "Favorite", tabIcon: Favorite, tabContent: <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={work4} className={navImageClasses} />
                              <img alt="..." src={studio3} className={navImageClasses} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img alt="..." src={work2} className={navImageClasses} />
                              <img alt="..." src={work1} className={navImageClasses} />
                              <img alt="..." src={studio1} className={navImageClasses} />
                            </GridItem>
                          </GridContainer> }]} />
                </GridItem>
              </GridContainer> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(profilePageStyle)(RecipePage);
