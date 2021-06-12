import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from './components/main/Main';
import Auth from './components/auth/Auth';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </div>
  );
};

export default App;
