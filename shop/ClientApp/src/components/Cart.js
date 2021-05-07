import React, { Component } from 'react';
import { ContextStore } from '../index.js';
import { Button, Table, Alert } from 'reactstrap';

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
    const { cart, dispatch } = React.useContext(ContextStore);
    const deleteCartItem = (index) => {
        // const cart = this.state.cart;
        // cart.splice(index, 1);

        // this.setState({
        //   cart
        // });
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
                                <td width="250">{item.product.name}</td>
                                <td>{item.product.price}</td>
                                <td><Button color="danger" onClick={() => deleteCartItem(index)}>X</Button>{' '}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </React.Fragment>
    )
}