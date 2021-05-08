import React, { useEffect } from 'react';
import { ContextStore } from '../index.js';
import { Button, Table } from 'reactstrap';
import { useHistory } from "react-router-dom";
import * as ActionType from '../store/ActionType';
import axios from 'axios';

export function CartCount() {
    const value = React.useContext(ContextStore)

    return (
        <React.Fragment>
            {
                value.cart.length
            }
        </React.Fragment>
    )
}

export function CartTable() {

    const { isAuth, cart, dispatch } = React.useContext(ContextStore);
    const history = useHistory()
    useEffect(() => {
        if (!isAuth) {
            history.push("/");
        }
    });
    const totalPrice = cart.reduce((acc, item) => (acc += item.price), 0);

    const token = localStorage.getItem('token')
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
    const deleteCartItem = (id) => {
        axios.delete('/api/Cart/' + id, {
            headers: headers
        })
            .then(response => {
                dispatch({ type: ActionType.DELETE_CART_ITEM, id: id })
            })
            .catch(e => {
                console.log(e.response.data.errors)
            });




    }
    return (
        <React.Fragment>
            <h1>Cart</h1>
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
                            <tr key={index} >
                                <th scope="row">{index + 1}</th>
                                <td width="250">{item.name}</td>
                                <td>{item.price}</td>
                                <td><Button color="danger" onClick={() => deleteCartItem(item.id)}>X</Button>{' '}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <Button className="btn btn-primary" onClick={() => alert('金額:' + totalPrice)}>結帳</Button>
        </React.Fragment>
    )
}