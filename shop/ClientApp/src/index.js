import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

export const ContextStore = React.createContext({
  todos: []
})



ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <ContextStore.Provider value={{todos: ['run']}}>
    <App />
    </ContextStore.Provider>
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

