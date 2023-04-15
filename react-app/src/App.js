import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainWindow from "./components/MainWindow";
import EditChannelForm from "./components/ChannelForm/EditChannelForm";
import Landing from "./components/Landing";

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
            <>
              <Navigation isLoaded={isLoaded} />
              <Landing />
            </>
          </Route>
          <Route path="/login">
            <Navigation isLoaded={isLoaded} />
            <LoginFormPage />
          </Route>

          <Route path="/signup"></Route>

          {/* <Route path="/chat/:channelId/edit">
            <EditChannelForm/>
          </Route> */}

          <Route path="/chat/:channelId">
            <MainWindow />
          </Route>

          <Route path="/chat">
            <MainWindow />
          </Route>

          <Route path="/chat-session-reload">
            <Redirect to="/chat" />
          </Route>




        </Switch>
      )}
    </>
  );
}

export default App;
