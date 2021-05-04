import React, { Component, useEffect, useState } from 'react';
import { Container, Button, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import axios from 'axios';
import Product from './Product.js';
import ContextStore from '../App';
import {Cart} from './Cart.js';
 
export const Home =props=> {
  const[modal,setModal]=useState(false)
  const[products,setProducts]=useState([])
  const[cart,setCart]=useState([])
  

  useEffect(() => {
    axios.get('/api/Product')
      .then((response) => {setProducts(response.data)});
  }, [setProducts]);
  
  

  const addToCart = (product) => {
    const cart = this.state.cart;
    cart.push(product);

    this.setState({
      cart,
    });
  }

  const deleteCartItem = (index) => {
    const cart = this.state.cart;
    cart.splice(index, 1);

    this.setState({
      cart
    });
  }

  const toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  

    // const totalPrice = cart.reduce((acc, item) => (acc += item.price), 0);

    return (
      <div>
        <Container>
        <Row>
            
            <Button color="primary" onClick={toggle}>購物車({cart.length})</Button>
            
        </Row>
        <Row>
          <Cart/>
        </Row>
        <Row>
            {
              products.map(product =>
                <Product
                  key={product.id}
                  disabled={cart.find(item => item.id === product.id)}
                  product={product}
                  onClick={addToCart}
                />
              )
            }
          </Row>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>購物車</ModalHeader>
            <ModalBody>
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>品項</th>
                    <th>價格</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    cart.map((item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td width="250">{item.name}</td>
                        <td>{item.price}</td>
                        <td><Button color="danger" onClick={() => deleteCartItem(index)}>X</Button>{' '}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Alert color="success" className="text-right">
                總價：
                {/* {totalPrice} */}
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={cart.length === 0} onClick={() => alert('totalPrice')}>結帳</Button>{' '}
              <Button color="secondary" onClick={toggle}>取消</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  
}
