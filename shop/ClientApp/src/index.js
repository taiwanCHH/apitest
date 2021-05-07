import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as ActionType from './store/ActionType';
import { updateObject } from './shared/utility';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const productsInitState = {
  cart: [],
  modalLogin: false,
  title: 'Member',
  isAuth: false,
}
export const ContextStore = React.createContext({
  cart: [],
  modalLogin: false,
  title: 'Member',
  isAuth: false,
})
function productsReducer(state, action) {
  switch (action.type) {
    case ActionType.ADD_PRODUCT: return addProduct(state, action);
    case ActionType.AUTH_LOGIN: return authOpenLogin(state, action);
    case ActionType.AUTH_SUCCESS: return authLoginSucces(state, action);
    case ActionType.AUTH_LOGOUT: return authLogout(state, action);
    default:
      return state;
  }
}
const authLogout = (state, action) => {
  console.log('auth: ' + state)
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  return Object.assign({}, state, {
    title: 'Member',
    isAuth: false,
  });
}
const authLoginSucces = (state, action) => {
  console.log('auth: ' + state)
  return Object.assign({}, state, {
    title: action.name,
    isAuth: true
  });
}

const authOpenLogin = (state, action) => {
  console.log('auth: ' + state)
  return Object.assign({}, state, {
    modalLogin: !state.modalLogin
  });
}
const addProduct = (state, action) => {

  return Object.assign({}, state, {
    cart: state.cart.concat({ id: action.product.id, product: action.product })
  });
}

function combineDispatchs(dispatchs) {
  return function (obj) {
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
        cart: pState.cart,
        modalLogin: pState.modalLogin,
        title: pState.title,
        isAuth: pState.isAuth,
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

