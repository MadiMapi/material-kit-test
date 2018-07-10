import Components from "../views/Components/Components.jsx";
import LandingPage from "../views/LandingPage/LandingPage.jsx";
import ProfilePage from "../views/ProfilePage/ProfilePage.jsx";
import LoginPage from "../views/LoginPage/LoginPage.jsx";
import RecipePage from "../views/RecipePage/RecipePage.jsx";

var indexRoutes = [
  { path: "/landing-page", name: "LandingPage", component: LandingPage },
  { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/login-page", name: "LoginPage", component: LoginPage },
  { path: "/recipes", name: "LoginPage", component: RecipePage },
  { path: "/", name: "Components", component: Components }
];

export default indexRoutes;
