import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Member } from './components/Member';
import { CartTable } from './components/Cart';

import './custom.css'



function App () {
  
     return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={CartTable} />
        <Route path='/register' component={Member} />
      </Layout>
    );
  }
export default App;