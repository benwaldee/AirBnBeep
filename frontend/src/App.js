// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './index.css'
import AllSpotsGrid from './components/AllSpotsGrid/AllSpotsGrid'
import Host from "./components/Host/Host";
import SpotIDPage from "./components/SpotIDPage/SpotIDPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <AllSpotsGrid />
          </Route>
          <Route path='/host'>
            <Host />
          </Route>
          <Route path='/spots/:spotID'>
            <SpotIDPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
