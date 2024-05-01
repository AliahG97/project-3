import OrderHeader from "../components/Order/Card/OrderHeader";
import OrderBody from "../components/Order/Card/OrderBody";
import UserInformation from "../components/UserInformation";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USER_DATA } from '../utils/queries';
import Auth from '../utils/auth';

// import { AuthService } from "../utils/auth";

const Profile = () => {

  const userData = Auth.getProfile();
  
  if (!userData) {
    throw new Error('something went wrong!');
  }

  const user = useQuery(QUERY_USER_DATA);
  console.log('user: ', user);

  // const [getOneOrder, { error, data }] = useQuery(QUERY_ONE_ORDER);
  // const [getOrders] = useQuery(QUERY_ORDERS);

  // const handleOrderChange = async (event) => {
  //   event.preventDefault();
  //   console.log(formState);

  //   try {
  //   //  const response = await getOneOrder(event.id);

  //   //  if (!response.ok) {
  //   //   throw new Error('something went wrong!');
  //   //  }
  //   console.log('success');

  //    const { token, user } = await response.json();
  //    console.log(user);
  //   //  AuthService.login(token);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const orders = (user) => {
    if (!user.orders) {
      <Row>
        <p>No Previous Orders!</p>
      </Row>
    } else {
    user.orders.map((order, index) => {
      <div key={index}>
        <Button onClick={null}>
          <OrderHeader key={order}/>
        </Button>
      </div>
    })
  };
};

  return (
    <>
    <div className="text-light bg-dark p-5">
    <Container>
      <Row>
        <UserInformation key={user}/>
      </Row>
      <Col xs="4" m="3">
      {orders(user)}
      </Col>
      <Col xs="8" m="9">
      <OrderBody key={user.orders}/>
      </Col>
      </Container>
    </div>
    </>
  )
}

export default Profile;
