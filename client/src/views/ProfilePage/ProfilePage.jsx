import React from "react";
import {Link} from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import Header from "../../components/Header/Header.jsx";
import Button from "@material-ui/core/Button";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import HeaderLinks from "../../components/Header/HeaderLinks.jsx";
import Parallax from "../../components/Parallax/Parallax.jsx";
//mongo components
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import { Col, Row } from "../../components/Grid2";

import profilePageStyle from "../../assets/jss/material-kit-react/views/profilePage.jsx";
import API from "../../utils/API";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";


class ProfilePage extends React.Component {
  state = {
    recipes: [],
    title: "",
    chef: "",
    ingredients: ""
  };

  componentDidMount() {
    this.loadRec();
  }

  
  loadRec = () => {
    API.getRec()
      .then(res =>
        this.setState({
          recipes: res.data,
          title: "",
          chef: "",
          ingredients: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteRecipe = id => {
    API.deleteRecipe(id)
      .then(() => this.loadRec())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.chef) {
      API.saveRecipe({
        title: this.state.title,
        chef: this.state.chef,
        ingredients: this.state.ingredients
      })
        .then(() => this.loadRec())
        .catch(err => console.log(err));
    }
  };
  render() {
    const { classes, ...rest } = this.props;
    return <div>
        <Header color="transparent" brand="Casual Chef" rightLinks={<HeaderLinks />} fixed changeColorOnScroll={{ height: 200, color: "white" }} {...rest} />
        <Parallax small filter image={require("../../assets/img/food.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <Jumbotron>
                <h1>Add Your Own Recipes</h1>
              </Jumbotron>
              <div className={classes.container}>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={4}>
                  <form className={classes.container}>
                      <FormControl className={classNames(classes.margin, classes.textField)}>
                        <InputLabel>Title</InputLabel>
                        <Input value={this.state.title} onChange={this.handleInputChange} name="title" />
                      </FormControl>
                      <FormControl className={classNames(classes.margin, classes.textField)}>
                        <InputLabel>Chef</InputLabel>
                        <Input value={this.state.chef} onChange={this.handleInputChange} name="chef" />
                      </FormControl>
                      <FormControl className={classNames(classes.margin, classes.textField)}>
                        <TextField id="textarea" label="Ingredients" placeholder="Ingredients" multiline className={classes.textField} margin="normal" value={this.state.ingredients} onChange={this.handleInputChange} name="ingredients" />
                      </FormControl>

                      <Button type="submit" color="primary" disabled={!(this.state.chef && this.state.title)} onClick={this.handleFormSubmit}>
                        Submit Recipe
                      </Button>
                    </form>
                  </GridItem>
                </GridContainer>
              </div>
              <GridContainer justify="center">
                <Row>
                  <Col size="md-6 sm-12">
                    <Jumbotron>
                      <h1>Recipes On My List</h1>
                    </Jumbotron>
                    {this.state.recipes.length ? <List>
                        {this.state.recipes.map(recipe => (
                          <ListItem key={recipe._id}>
                            <Link to={"/recipes/" + recipe._id}>
                              <strong>
                                {recipe.title} by {recipe.chef}
                              </strong>
                            </Link>
                            <Button
                              color="secondary"
                              onClick={() => this.deleteRecipe(recipe._id)}
                            />
                          </ListItem>
                        ))}
                      </List> : <h3>No Results to Display</h3>}
                  </Col>
                </Row>
              </GridContainer>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default withStyles(profilePageStyle)(ProfilePage);
