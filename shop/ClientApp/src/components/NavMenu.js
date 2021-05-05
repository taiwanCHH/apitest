import React, { Component, useState } from 'react';
import {
  Collapse, Container, Navbar, NavbarBrand, NavbarToggler,
  NavItem, NavLink, Dropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { CartCount } from './Cart.js';

export const NavMenu = () => {
  const [collapsed, setcollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [title, setTitle] = useState('Member');

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const toggleNavbar = () => setcollapsed(!collapsed);


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
                  <DropdownItem tag="a" href="/cart" style={{ display: isAuth ? "none" : "block" }}>Sign in</DropdownItem>
                  <DropdownItem tag="a" href="/cart" style={{ display: isAuth ? "none" : "block" }}>Sign up</DropdownItem>
                  <DropdownItem tag="a" href="/cart" style={{ display: isAuth ? "block" : "none" }}>Info</DropdownItem>
                  <DropdownItem tag="a" href="/cart" style={{ display: isAuth ? "block" : "none" }}>Change Password</DropdownItem>
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
