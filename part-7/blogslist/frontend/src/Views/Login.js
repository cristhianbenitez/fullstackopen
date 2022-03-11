import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { handleLogin } from '../reducers/userSlice';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useField } from '../hooks/useField';

export const Login = () => {
  const { reset: resetUsername, ...userName } = useField('name');
  const { reset: resetPassword, ...password } = useField('password');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin({ username: userName.value, password: password.value }, navigate));
    resetUsername();
    resetPassword();
  };

  return (
    <Form onSubmit={handleSubmit} className="w-25 mx-auto m-5 d-flex flex-column align-items-start">
      <h2 className="mb-4">Login</h2>
      <Form.Label htmlFor="username">Username</Form.Label>
      <Form.Control {...userName} id="username" aria-describedby="usernameHelpBlog" />
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control {...password} id="inputPassword5" aria-describedby="passwordHelpBlock" />
      <Form.Text id="passwordHelpBlock" muted className="mb-3">
        Your password must be whatever you want
      </Form.Text>
      <Button type="submit" className="d-block" variant="outline-primary">
        Submit
      </Button>
    </Form>
  );
};
