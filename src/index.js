import React from 'react';
import {render} from 'react-dom';
import './index.css';

import App from './App';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Overview from './modules/overview/overview';
import Seismic from './modules/seismic/seismic';
import Fourier from './modules/Fourier/fourier';

render(
  <div>
    <Router>
      <App>
          <Switch>
            <Route exact path="/" component={Overview}/>
            <Route path="/seismic" component={Seismic}/>
            <Route path="/fourier" component={Fourier}/>
          </Switch>
        </App>
    </Router>
  </div>,
  document.getElementById('root')
);

