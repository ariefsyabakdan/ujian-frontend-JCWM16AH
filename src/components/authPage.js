import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import URL_API from "../helper";
import { authLogin } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "transparent",
      redirect: false,
    };
    this.analyze = this.analyze.bind(this);
  }

  analyze(event) {
    const strongRegex = new RegExp("^(?=.*[0,9])");
    const lengthRegex = new RegExp("^(?=.{6,})");
    if (strongRegex.test(event.target.value)) {
      this.setState({ backgroundColor: "red" });
    } else if (lengthRegex.test(event.target.value)) {
      this.setState({ backgroundColor: "pink" });
    } else {
      this.setState({ backgroundColor: "transparent" });
    }
  }

  onBtRegist = () => {
    let username = this.usernameRegist.value;
    let email = this.emailRegist.value;
    let password = this.passwordRegist.value;
    let role = "user";
    let cart = [];
    const strongRegex = new RegExp("^(?=.*[0,9])");
    const lengthRegex = new RegExp("^(?=.{6,})");
    axios
      .post(`http://localhost:2021/users`, {
        username,
        email,
        password,
        role,
        cart,
      })
      .then((res) => {
        alert("sukses");
      })
      .catch((err) => {
        console.log("register Error nih", err);
      });
  };

  onBtLogin = () => {
    this.props.authLogin(this.emailLogin.value, this.passwordLogin.value);
  };

  render() {
    console.log(this.props.id);
    if (this.props.id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h3>Login</h3>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="with a placeholder"
                  innerRef={(element) => (this.emailLogin = element)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                  innerRef={(element) => (this.passwordLogin = element)}
                />
              </FormGroup>
              <Button onClick={this.onBtLogin}>Submit</Button>
            </Form>
          </div>

          <div className="col-md-6">
            <Form>
              <h3>Register</h3>
              <FormGroup>
                <Label for="Username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleUsername1"
                  placeholder="with a placeholder"
                  innerRef={(element) => (this.usernameRegist = element)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail1"
                  placeholder="with a placeholder"
                  innerRef={(element) => (this.emailRegist = element)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  style={{ backgroundColor: this.state.backgroundColor }}
                  type="password"
                  name="password"
                  id="examplePassword1"
                  placeholder="password placeholder"
                  onChange={this.analyze}
                  innerRef={(element) => (this.passwordRegist = element)}
                />
              </FormGroup>
              <Button onClick={this.onBtRegist}>Submit</Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducers }) => {
  return {
    id: authReducers.id,
  };
};

export default connect(mapStateToProps, { authLogin })(AuthPage);
