import React, { useEffect, useState } from 'react';
import { Container, Row } from 'reactstrap';
import axios from 'axios';
import Product from './Product.js';
import {ContextStore} from '../index.js';
import * as ActionType from '../store/ActionType';
 
export const Home =props=> {
  const[products,setProducts]=useState([]);
  const { cart, dispatch } = React.useContext(ContextStore);
  
  useEffect(() => {
    axios.get('/api/Product')
      .then((response) => {setProducts(response.data)});
  }, [setProducts]);
  

  const addToCart = (product) => {
    dispatch({ type: ActionType.ADD_PRODUCT, product: product})
  }

  const deleteCartItem = (index) => {
    // const cart = this.state.cart;
    // cart.splice(index, 1);

    // this.setState({
    //   cart
    // });
  }
    // const totalPrice = cart.reduce((acc, item) => (acc += item.price), 0);

    return (
      <div>
        <Container>
        <Row>
            {
              products.map(product =>
                <Product
                  key={product.id}
                  
                  product={product}
                  onClick={addToCart}
                />
              )
            }
          </Row>
        </Container>
      </div>
    );
  
}
