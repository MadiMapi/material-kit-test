import axios from "axios";

// The getRecipes method retrieves recipes from the server
// It accepts a "query" or term to search the recipe api for
export default {
  getRecipes: function (query) {
    return axios.get("http://api.yummly.com/v1/api/recipes", {
      params: {
        _app_id: "d8ede27b",
        _app_key: "fcfc836b84d4481049d4da88f3b311a6",
        q: query,
        requirePictures: true
      }
    });
  }
};
