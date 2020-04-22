import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom';

// Import pages
import Friwords from './pages/Friwords';
import MemeGeneratorPage from './pages/MemeGeneratorPage'

// CSS Files
import './App.css';
import './assets/css/friwords.css';

const App = () => (
    <Router>
        <Switch>
            <Route path="/meme/new">
                <MemeGeneratorPage />
            </Route>
            <Route path="/">
                <Friwords />
            </Route>
        </Switch>
    </Router>
);

export default App;
