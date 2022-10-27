// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import HostNavigation from "./components/HostNavigation";
import './index.css'
import AllSpotsGrid from './components/AllSpotsGrid/AllSpotsGrid'
import Host from "./components/Host/Host";
import SpotIDPage from "./components/SpotIDPage/SpotIDPage";
import About from "./components/About/About";
import Bookings from "./components/Bookings/Bookings";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>



      {isLoaded && (
        <Switch>
          <Route path='/' exact={true}>
            <Navigation isLoaded={isLoaded} />
            <AllSpotsGrid />
          </Route>
          <Route path='/host'>
            <HostNavigation isLoaded={isLoaded} />
            <Host />
          </Route>
          <Route path='/spots/:spotID'>
            <Navigation isLoaded={isLoaded} />
            <SpotIDPage />
          </Route>
          <Route path='/about'>
            <Navigation isLoaded={isLoaded} />
            <About />
          </Route>
          <Route path='/bookings'>
            <Navigation isLoaded={isLoaded} />
            <Bookings />
          </Route>
          <Route>
            <Navigation isLoaded={isLoaded} />
            <div className="four">
              404 Page Not Found
            </div>
            <div className="fourlow">
              Click the logo to return home!
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
