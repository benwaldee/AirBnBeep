// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './index.css'


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
          <Route path='/about'>
            TODO: make about page
            <div>
              scroll test
            </div>
            <div>
              scroll test
            </div>
            <div>
              scroll test
            </div>
            <div>
              scroll test
            </div><div>
              scroll test
            </div><div>
              scroll test
            </div><div>
              scroll test
            </div><div>
              scroll test
            </div><div>
              scroll test
            </div><div>
              scroll test
            </div>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
