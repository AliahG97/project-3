import { useEffect, useState } from 'react';
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
  const { data, loading, error } = useQuery(QUERY_USER_DATA);
  const [ user, setUser ] = useState(null); //set initial user state as null

  useEffect(() => {
    if (data) {
      setUser(data.user); //Update user state when available
      console.log('user: ', user)
    }
  }, [data]);

  

  const handleCheckout = async (event) => {
    event.preventDefault();

    try {
    const response = await checkout({
      variables: {
        products: user.shoppingCart.products
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

if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;

  return (
<>
<div className="text-light bg-dark p-5">
  <Container>
    <Row>
    <h2 className="cartHeader">Shopping Cart</h2>
    </Row>
    <Row>
      { user && user.shoppingCart && <OrderBody key={user.orders}/>}
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