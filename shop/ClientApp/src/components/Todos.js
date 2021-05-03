import React, { Component } from 'react';
import {ContextStore} from '../index.js';

export function Todos(){
    const value = React.useContext(ContextStore)
  
    return (
        <React.Fragment>
          {
            value.todos.map(todo => <div key={todo}>{todo}</div>)
          }
        </React.Fragment>
      )
}