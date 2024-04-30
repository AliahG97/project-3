import OrderHeader from "../components/Order/Card/OrderHeader";
import OrderBody from "../components/Order/Card/OrderBody";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { QUERY_ONE_ORDER } from "../utils/queries";

const ShoppingCart = () => {

  const { data } = useQuery(QUERY_ONE_ORDER);
  let order;

  if (data) {
    order = data.user;
  }

  return (
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
  )
};

export default ShoppingCart;