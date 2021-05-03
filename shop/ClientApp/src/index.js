import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const productsInitState = { 
  products: [],
}
export const ContextStore = React.createContext({
  products: [],
})
function productsReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return Object.assign({}, state, {
        products: state.products.concat({ id: state.products.length })
      });
    default:
      return state;
  }
}

function combineDispatchs(dispatchs) {
  return function(obj) {
    for (let i = 0; i < dispatchs.length; i++) {
      dispatchs[i](obj);
    }
  };
}

function Application() {
  const [pState, pDispatch] = React.useReducer(productsReducer, productsInitState);
  
  return (
    <ContextStore.Provider
      value={{
        products: pState.products,
        dispatch: combineDispatchs([pDispatch])
      }}
    >
      <App />
    </ContextStore.Provider>
  )
}

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Application />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

