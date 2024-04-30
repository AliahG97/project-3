import { OrderHeader, OrderBody } from "../components/Order/Card";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';

const ShoppingCart = (order) => {
<>
<div className="text-light bg-dark p-5">
  <Container>
    <Row>
      <OrderHeader key={order}/>
    </Row>
    <Row>
      <Col>
      <OrderBody key={order}/>
      </Col>
    </Row>
  </Container>
  </div>
  </>
};

export default ShoppingCart;