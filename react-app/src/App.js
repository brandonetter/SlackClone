import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainWindow from "./components/MainWindow";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>

      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Navigation isLoaded={isLoaded} />
          </Route>
          <Route path="/login">
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>

          <Route path="/signup"></Route>
          <Route path="/chat">
            <MainWindow />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
