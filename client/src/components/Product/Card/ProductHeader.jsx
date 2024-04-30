import { Card, Row } from 'react-bootstrap';

export default function ProductHeader({ product }) {

  return (
    <Row>
    <Card.Title>{product.name}</Card.Title>
    <Card.Body>{product.price}</Card.Body>
    </Row>
  )
}