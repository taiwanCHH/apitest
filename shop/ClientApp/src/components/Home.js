import React, { useEffect, useState } from 'react';
import {
  Container, Row, Modal, ModalBody, ModalFooter, ModalHeader,
  Button, Form, FormGroup, Label, Input, Alert, FormFeedback
} from 'reactstrap';
import axios from 'axios';
import Product from './Product.js';
import { ContextStore } from '../index.js';
import * as ActionType from '../store/ActionType';
import { checkPassWordValidity, checkEmailValidity } from '../shared/utility.js';
import {decode as base64_decode} from 'base-64';


export const Home = props => {
  const { modalLogin, dispatch } = React.useContext(ContextStore)
  const [products, setProducts] = useState([]);
  const [toastShow, setToastShow] = useState(false);
  const [toastColor, setToastColor] = useState(false);
  const [toastContent, setToastContent] = useState('hello');

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const setInfoEmail = (event) => { setInfo({ ...info, email: event.target.value }); };
  const setInfoFirst = (event) => { setInfo({ ...info, password: event.target.value }); };

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

  const toggleAlert = (isSucces,content) => {
    setToastContent(content)
    setToastColor(isSucces)
    setToastShow(true)
    setTimeout(() => {
      setToastShow(false)
    }, 3000)
  }

  const saveToken = (token)=>{
    let aa=token.split(".");
    let deToken = base64_decode(aa[1]);
    let jsonToken = JSON.parse(deToken);
    localStorage.setItem('token', token);
    localStorage.setItem('name', jsonToken.sub);
    localStorage.setItem('email', jsonToken.email);
    setTimeout(() => {
      toggleLogin()
    }, 3000)
  }

  const sendLogin = () => {
    let errEmail = checkEmailValidity(info.email)
    setErrorEmail(errEmail)
    let errPassword = checkPassWordValidity(info.password, info.password)
    setErrorPassword(errPassword)
    if (errEmail.length === 0 &&
      errPassword.length === 0
    ) {
      const user = {
        "email": info.email,
        "password": info.password
      };
      axios.post('/api/AuthManagement/Login', user)
        .then(response => {
          toggleAlert(true,'Login succes')
          saveToken(response.data.token)
        })
        .catch(e => {
          try {
            let error = JSON.parse(e.response.data.errors[0]);  
            setErrorEmail(error.Email)
          } catch (error) {
            toggleAlert(false,e.response.data.errors)
            console.log(e.response.data.errors)
          }
        });
    }

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
                <Input invalid={errorEmail.length > 0} type="email" onChange={setInfoEmail} name="email" id="email" placeholder="email" />
                <FormFeedback >{errorEmail}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="password">密碼</Label>
                <Input invalid={errorPassword.length > 0} type="password" onChange={setInfoFirst} name="password" id="password" placeholder="密碼" />
                <FormFeedback >{errorPassword}</FormFeedback>
              </FormGroup>
            </Form>
            <Alert color={toastColor?"success":"warning"} isOpen={toastShow}>
              {toastContent}
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={sendLogin}>登入</Button>{' '}
            <Button color="secondary" onClick={toggleLogin}>取消</Button>
          </ModalFooter>
        </Modal>
      </Container>
    </div>
  );

}
