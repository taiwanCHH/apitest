import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Member, Info, InfoPassword } from './components/Member';
import { CartTable } from './components/Cart';

import './custom.css'



function App() {

  return (
    <Layout>
      <Route exact path='/' component={Home} />
      <Route path='/cart' component={CartTable} />
      <Route path='/register' component={Member} />
      <Route path='/info' component={Info} />
      <Route path='/password' component={InfoPassword} />
    </Layout>
  );
}
export default App;