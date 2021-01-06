import React from 'react';
import Dashboard from './components/Screens/Dashboard';
import Login from './components/Screens/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";




function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Dashboard">
          <Dashboard />          
        </Route>
        <Route path="/">
          <Login />          
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
