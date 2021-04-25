import React from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
} from "reactstrap";
import { authLogout } from "../actions";
import { connect } from "react-redux";

class NavbarComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  btLogout = () => {
    localStorage.removeItem("tkn_id");
    this.props.authLogout();
    this.setState({ redirect: true });
  };

  render() {
    console.log("isi username", this.props.authReducers);
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">reactstrap</NavbarBrand>
          <NavbarToggler onClick={!this.state.isOpen} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <Link to="/history">
                <NavItem>
                  <NavLink href="/components/">Transaction History</NavLink>
                </NavItem>
              </Link>
              <NavItem>
                <Link to="/cart">
                  <NavLink href="https://github.com/reactstrap/reactstrap">
                    Cart
                  </NavLink>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            {this.props.user.id == null ? (
              <>
                <Link to="/register">
                  <NavbarText>Login/Register</NavbarText>
                </Link>
              </>
            ) : (
              <></>
            )}
            <NavbarText>&nbsp;{this.props.email}</NavbarText>
            <span></span>
            {this.props.user.id ? (
              <>
                <Button onClick={this.btLogout}>
                  <NavbarText NavbarText>&nbsp;Logout</NavbarText>
                </Button>
              </>
            ) : (
              <></>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ authReducers }) => {
  return {
    username: authReducers.username,
    email: authReducers.email,
    user: authReducers,
  };
};

export default connect(mapStateToProps, { authLogout })(NavbarComp);
