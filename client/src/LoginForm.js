import React, { useState } from 'react';
import { login } from './auth';

export const LoginForm = (props) => {
  const {onLogin} = props;
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    login(email, password).then((ok) => {
      if (ok) {
        onLogin();
      } else {
        setError(true);
      }
    });
  }

  return (
    <form>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" name="email" value={email}
            onChange={(event) => setEmail(event.target.value)} />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" name="password" value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{error && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" onClick={(event) => handleClick(event)}>Login</button>
        </div>
      </div>
    </form>
  );
}
