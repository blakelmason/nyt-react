import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//components
import PageLinks from './components/PageLinks.js';
import Home from './components/home/Home.js';
import Saved from './components/saved/Saved.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container-fluid bg-dark text-light pt-4">
            <div className="row">
              <div className="col text-center">
                <h1 className="mb-4"><u>New York Times Article Scrubber</u></h1>
                <h4>Search for and annotate articles of interest!</h4>
              </div>
            </div>
            <PageLinks />
          </div>
          <div className="bg-info" style={{ height: '2px' }}></div>
          <Route exact path="/" component={Home} />
          <Route exact path="/saved" component={Saved} />
        </div>
      </Router>
    );
  }
}

export default App;
