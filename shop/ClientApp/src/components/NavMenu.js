import React, { useState } from 'react';
import {
  Collapse, Container, Navbar, NavbarBrand, NavbarToggler,
  NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { CartCount } from './Cart.js';
import { ContextStore } from '../index.js';
import * as ActionType from '../store/ActionType';
import { useHistory } from "react-router-dom";

export const NavMenu = () => {
  const { title, isAuth, dispatch } = React.useContext(ContextStore);
  const history = useHistory()
  const [collapsed, setcollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggleNavbar = () => setcollapsed(!collapsed);
  const toggleLogin = () => {
    dispatch({ type: ActionType.AUTH_LOGIN })
  }
  const toggleLogout = () => {
    dispatch({ type: ActionType.AUTH_LOGOUT })
    if (isAuth) {
      history.push("/")
    }
  }
  const toggleCart = () => {
    if (isAuth) {
      history.push("/cart")
    } else {
      toggleLogin()
    }
  }


  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">shop</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-dark" onClick={toggleCart}>Cart(<CartCount />)</NavLink>
              </NavItem>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={toggleLogin} style={{ display: isAuth ? "none" : "block" }}>Login</DropdownItem>
                  <DropdownItem tag={Link} to="/register" style={{ display: isAuth ? "none" : "block" }}>Register</DropdownItem>
                  <DropdownItem tag={Link} to="/info" style={{ display: isAuth ? "block" : "none" }}>Info</DropdownItem>
                  <DropdownItem tag={Link} to="/password" style={{ display: isAuth ? "block" : "none" }}>Change Password</DropdownItem>
                  <DropdownItem onClick={toggleLogout} style={{ display: isAuth ? "block" : "none" }}>Log Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );

}
