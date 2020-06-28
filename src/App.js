import React, {useEffect, useState} from 'react';
import './App.css';
import {
  Route,
  Switch
} from 'react-router-dom';
import Homepage from './MainPage.js';
import OAuth2RedirectHandler from './Components/Authorization/OAuth2RedirectHandler';
import NotFound from './NotFound';

function App() {
  
  return (
    <div className="App">
      <Switch>
            <Route exact path="/" component={Homepage}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
