import React from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <label style={styles.label}>
        Username
        <input
          id="user-name"
          type="text"
          style={styles.input}
          value={username}
          onChange={handleUsername}
          autoComplete="username"
        />
      </label>
      <label style={styles.label}>
        Password
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          style={styles.input}
          value={password}
          onChange={handlePassword}
        />
      </label>
      <button type="submit" id="login-btn">
        Login
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1em',
    margin: '1em'
  },
  input: {},
  label: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default LoginForm;
