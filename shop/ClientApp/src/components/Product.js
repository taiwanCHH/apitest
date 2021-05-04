import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
import {ContextStore} from '../index.js';
export default function Product (props) {
  const { products, dispatch } = React.useContext(ContextStore);
    return (
      <Col sm={6} md={4} className="mb-3">
        <Card>
          <CardImg width={'100%'} src={props.product.imgUrl} />
          <CardBody >
            <CardTitle tag="h5">{props.product.name}</CardTitle>
            <CardSubtitle>價格：{props.product.price}</CardSubtitle>
            <CardText>{props.product.content}</CardText>
            <Button disabled={props.disabled} color="secondary" onClick={() => 
              {
                dispatch({ type: "ADD_PRODUCT",value: props.product})
                props.onClick(props.product)
              }
              }>
              購買
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  
}
Product.propTypes = {
  product: PropTypes.object,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}