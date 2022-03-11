import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navigation from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { handleLogOut } from '../reducers/userSlice';

export const Navbar = () => {
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(handleLogOut());
    navigate('login');
  };

  const LoginLayout = () => (
    <div className="w-100">
      <Nav className="d-flex justify-content-end " activeKey={pathname} variant="pills">
        <Nav.Item>
          <Nav.Link as={Link} to="signup" eventKey="/signup" disabled>
            Sign Up
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="login" eventKey="/login">
            Login
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );

  const HomeLayout = () => (
    <Navigation.Collapse className="justify-content-end">
      <Nav className="me-auto " variant="pills" activeKey={pathname}>
        <Nav.Item>
          <Nav.Link as={Link} to="/" href="/" eventKey="/">
            Blogs
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="users" eventKey="/users">
            Users
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item className="mx-2 my-auto">Logged in as: {user.name}</Nav.Item>
        <Button variant="outline-dark" onClick={logOut}>
          Log Out
        </Button>
      </Nav>
    </Navigation.Collapse>
  );

  return (
    <Container className="mb-4">
      <Navigation variant="tabs" expand="lg" className="mt-2">
        <Navigation.Brand>Blog App</Navigation.Brand>
        <Navigation.Toggle aria-controls="basic-navbar-nav" />
        {user.token ? <HomeLayout /> : <LoginLayout />}
      </Navigation>
    </Container>
  );
};
