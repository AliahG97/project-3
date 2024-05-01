import { useMutation, useQuery } from "@apollo/client";
import OrderBody from "../components/Order/Card/OrderBody";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { MUTATION_CHECKOUT } from "../utils/mutations";
import { QUERY_CART, QUERY_USER_DATA } from "../utils/queries";

const ShoppingCart = () => {
  const [checkout] = useMutation(MUTATION_CHECKOUT);
  const { data } = useQuery(QUERY_USER_DATA);
  let user;

  if (data) {
    user = data.user;
    console.log('user: ', user);
  }

  const handleCheckout = async (event) => {
    event.preventDefault();

    try {
    const response = await checkout({
      variables: {
        products: data.shoppingCart.products
      },
    });
    console.log('response:', response)
    if (!response) {
      throw new Error('something went wrong!');
    }
  } catch (error) {
    throw new Error(error);
  }

};

  return (
<>
<div className="text-light bg-dark p-5">
  <Container>
    <Row>
    <h2 className="cartHeader">Shopping Cart</h2>
    </Row>
    <Row>
      <Col>
      <OrderBody key={user.shoppingCart}/>
      </Col>
    </Row>
    <Row>
      <Button
      className="checkoutBtn"
      onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Row>
  </Container>
  </div>
  </>
  )
};

export default ShoppingCart;