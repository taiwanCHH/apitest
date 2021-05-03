import React, { Component } from 'react';
import {ContextStore} from '../index.js';

export function Cart(){
    const value = React.useContext(ContextStore)
  
    return (
        <React.Fragment>
          {
            value.products.length
          }
        </React.Fragment>
      )
}

export function CartCount(){
    const value = React.useContext(ContextStore)
  
    return (
        <React.Fragment>
          {
            value.products.length
          }
        </React.Fragment>
      )
}