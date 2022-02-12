import React from 'react';
import WeatherPage from './Components/Weather';
import {BrowserRouter, Switch} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <WeatherPage />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
