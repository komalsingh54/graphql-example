import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { isLoggedIn, logout } from './auth';
import { CompanyDetail } from './CompanyDetail';
import { LoginForm } from './LoginForm';
import { JobBoard } from './JobBoard';
import { JobDetail } from './JobDetail';
import { JobForm } from './JobForm';
import { NavBar } from './NavBar';

export const App = (props) => {
  const history = createBrowserHistory();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const handleLogin = () => {
    setLoggedIn(true);
    console.log(history);
    history.push('/');
  }

  const handleLogout = (history) => {
    logout();
    setLoggedIn(false);
    history.push('/');
  }

  return (
    <Router history={history}>
      <div>
        <NavBar loggedIn={loggedIn} onLogout={() => handleLogout()} />
        <section className="section">
          <div className="container">
            <Switch>
              <Route exact path="/"><JobBoard /></Route>
              <Route path="/companies/:companyId"><CompanyDetail /></Route>
              <Route exact path="/jobs/new"><JobForm /></Route>
              <Route path="/jobs/:jobId"><JobDetail/></Route>
              <Route exact path="/login" render={() => <LoginForm onLogin={() => handleLogin()} />} />
            </Switch>
          </div>
        </section>
      </div>
    </Router>
  );
}
