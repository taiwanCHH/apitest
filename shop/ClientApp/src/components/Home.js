import React, { Component } from 'react';
import { Container, Button, Row, Modal, ModalHeader, ModalBody, ModalFooter, Table, Alert } from 'reactstrap';
import axios from 'axios';
import Product from './Product.js';
import ContextStore from '../App';
import {Todos} from './Todos.js';
 
export class Home extends Component {
  state = {
    modal: false,
    products: [],
    cart: [],
  }

  componentDidMount = () => {
    this.getProductList();
  }
  
  getProductList = () => {
    axios.get('/api/Product')
      .then((response) => {
        this.setState({
          products: response.data,
        });
      });
  }

  addToCart = (product) => {
    const cart = this.state.cart;
    cart.push(product);

    this.setState({
      cart,
    });
  }

  deleteCartItem = (index) => {
    const cart = this.state.cart;
    cart.splice(index, 1);

    this.setState({
      cart
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  }

  

  render () {
    const { modal, products, cart } = this.state;
    const totalPrice = cart.reduce((acc, item) => (acc += item.price), 0);

    return (
      <div>
        <Container>
        <Row>
            
            <Button color="primary" onClick={this.toggle}>購物車({cart.length})</Button>
            
        </Row>
        <Row>
          <Todos/>
        </Row>
        <Row>
            {
              products.map(product =>
                <Product
                  key={product.id}
                  disabled={cart.find(item => item.id === product.id)}
                  product={product}
                  onClick={this.addToCart}
                />
              )
            }
          </Row>

          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>購物車</ModalHeader>
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
                        <td><Button color="danger" onClick={() => this.deleteCartItem(index)}>X</Button>{' '}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
              <Alert color="success" className="text-right">
                總價：
                {totalPrice}
              </Alert>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" disabled={cart.length === 0} onClick={() => alert(totalPrice)}>結帳</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>取消</Button>
            </ModalFooter>
          </Modal>
        </Container>
      </div>
    );
  }
}
