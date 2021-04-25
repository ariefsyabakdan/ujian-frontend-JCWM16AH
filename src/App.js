// import logo from "./logo.svg";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import AuthPage from "./components/authPage";
import NavbarComp from "./components/navbarComp";
import axios from "axios";
import React from "react";
import { keepLogin, getProductAction } from "./actions";
import { connect } from "react-redux";
import CartPage from "./pages/cartPage";
import HistoryPage from "./pages/historyPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.reLogin();
    this.props.getProductAction();
  }

  reLogin = () => {
    let idToken = localStorage.getItem("tkn_id");
    axios
      .get(`http://localhost:2021/users?id=${idToken}`)
      .then((res) => {
        this.props.keepLogin(res.data[0]);
      })
      .catch((err) => {
        console.log("gagal login");
      });
  };

  render() {
    return (
      <div className="App">
        <NavbarComp />
        <Switch>
          <Route path="/" component={LandingPage} exact />
          <Route path="/register" component={AuthPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/history" component={HistoryPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducers }) => {
  return {
    role: authReducers.role,
  };
};

export default connect(mapStateToProps, { keepLogin, getProductAction })(App);
