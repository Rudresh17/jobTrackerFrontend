// src/Routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';


const Routes = () => {
  return (
    <>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </>
  );
};

export default Routes;
