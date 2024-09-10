import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <nav>
          {user ? (
            <div>
              <span>Welcome, {user.name}</span>
              <button onClick={() => logout()}>Logout</button>
            </div>
          ) : (
            <div>
              <a href="/login">Login</a> | <a href="/register">Register</a>
            </div>
          )}
        </nav>

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/tasks" component={TaskList} user={user} />
          <Redirect from="/" to="/tasks" />
        </Switch>
      </div>
    </Router>
  );
};

// Private route to protect task management
const PrivateRoute = ({ component: Component, user, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      user ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default App;
