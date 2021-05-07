import React, { useEffect, useState } from 'react';
import { Container, Row, Modal, ModalBody, ModalFooter, ModalHeader,
  Button, Form, FormGroup, Label, Input,Alert } from 'reactstrap';
import axios from 'axios';
import Product from './Product.js';
import { ContextStore } from '../index.js';
import * as ActionType from '../store/ActionType';

export const Home = props => {
  const { modalLogin, dispatch } = React.useContext(ContextStore)
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('/api/Product')
      .then((response) => { setProducts(response.data) });
  }, [setProducts]);



  const addToCart = (product) => {
    dispatch({ type: ActionType.ADD_PRODUCT, product: product })
  }

  const toggleLogin = () => {
    dispatch({ type: ActionType.AUTH_LOGIN })
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
        <Modal isOpen={modalLogin} toggle={toggleLogin}>
          <ModalHeader toggle={toggleLogin}>登入</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="email" />
              </FormGroup>
              <FormGroup>
                <Label for="password">密碼</Label>
                <Input type="password" name="password" id="password" placeholder="密碼" />
              </FormGroup>
            </Form>
          </ModalBody>
          <Alert color="primary">
        This is a primary alert — check it out!
          </Alert>
          <ModalFooter>
            <Button color="primary"  onClick={() => alert()}>登入</Button>{' '}
            <Button color="secondary" onClick={toggleLogin}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );

}
