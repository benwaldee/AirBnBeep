// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './index.css'
import NavBorder from './components/NavBorder/NavBorder'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <NavBorder />
      {isLoaded && (
        <Switch>
          <Route path='/about'>
            TODO: make about page
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
