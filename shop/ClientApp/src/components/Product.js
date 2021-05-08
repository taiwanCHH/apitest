import React from 'react';
import PropTypes from 'prop-types';
import { Col, Card, CardImg, CardBody, CardText, CardTitle, CardSubtitle, Button } from 'reactstrap';
export default function Product(props) {
  return (
    <Col sm={6} md={4} className="mb-3">
      <Card>
        <CardImg width={'100%'} src={props.product.imgUrl} />
        <CardBody >
          <CardTitle tag="h5">{props.product.name}</CardTitle>
          <CardSubtitle>價格：{props.product.price}</CardSubtitle>
          <CardText>{props.product.content}</CardText>
          <Button color="secondary" onClick={() => {
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
  onClick: PropTypes.func,
}