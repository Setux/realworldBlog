import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from "prop-types"
import classes from './app.module.scss';
import Header from '../Header';
import Routes from "../Routes";

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <main className={classes.main}>
        <Header />
            <Routes />
      </main>
    </Router>
  </Provider>
);

App.propTypes = {
    store: PropTypes.objectOf(PropTypes.any).isRequired
}

export default App;
