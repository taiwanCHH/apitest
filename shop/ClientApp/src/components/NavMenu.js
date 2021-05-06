import React, { Component, useState } from 'react';
import {
  Collapse, Container, Navbar, NavbarBrand, NavbarToggler,
  NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { CartCount } from './Cart.js';
import { ContextStore } from '../index.js';
import * as ActionType from '../store/ActionType';

export const NavMenu = () => {
  const { cart, dispatch } = React.useContext(ContextStore);

  const [collapsed, setcollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [title, setTitle] = useState('Member');

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggleNavbar = () => setcollapsed(!collapsed);
  const toggleLogin = () => {
    dispatch({ type: ActionType.AUTH_LOGIN })
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
                <NavLink tag={Link} className="text-dark" to="/cart">Cart(<CartCount />)</NavLink>
              </NavItem>
              <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle nav caret>
                  {title}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag="login" onClick={toggleLogin} style={{ display: isAuth ? "none" : "block" }}>Sign in</DropdownItem>
                  <DropdownItem tag={Link} to="/register" style={{ display: isAuth ? "none" : "block" }}>Register</DropdownItem>
                  <DropdownItem tag="info" href="/info" style={{ display: isAuth ? "block" : "none" }}>Info</DropdownItem>
                  <DropdownItem tag="changepw" href="/changepw" style={{ display: isAuth ? "block" : "none" }}>Change Password</DropdownItem>
                  <DropdownItem style={{ display: isAuth ? "block" : "none" }}>Log Out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );

}
