import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { CartTable } from './components/Cart';

import './custom.css'



function App () {
  
     return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={CartTable} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
export default App;