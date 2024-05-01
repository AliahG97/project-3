import OrderBody from "../components/Order/Card/OrderBody";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';

const ShoppingCart = (cart) => {
  return (
<>
<div className="text-light bg-dark p-5">
  <Container>
    <Row>
      <Col>
      <OrderBody key={cart}/>
      </Col>
    </Row>
  </Container>
  </div>
  </>
  )
};

export default ShoppingCart;