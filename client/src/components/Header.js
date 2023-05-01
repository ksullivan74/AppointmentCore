import React, { useEffect, useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">
          Tabloid
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn && (
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    HOME
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Subscribed Posts</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    My Posts
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">
                    Tags
                  </NavLink>
                </NavItem>

                {userProfile?.userTypeId === 1 && (
                  <NavItem>
                    <NavLink tag={RRNavLink} to="/">
                      User Profiles
                    </NavLink>
                  </NavItem>
                )}
                <NavItem>
                  <a
                    aria-current="page"
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={logout}
                  >
                    Logout
                  </a>
                </NavItem>
              </>
            )}
          </Nav>
          {!isLoggedIn && (
            <>
              <NavItem>
                <NavLink tag={RRNavLink} to="/login">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RRNavLink} to="/register">
                  Register
                </NavLink>
              </NavItem>
            </>
          )}
        </Collapse>
        {isLoggedIn && (
          <div className="nameTag">
            <h4>Welcome, {userProfile?.displayName}</h4>
          </div>
        )}
      </Navbar>
    </div>
  );
}
