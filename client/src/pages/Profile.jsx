import { OrderHeader } from "../components/Order/Card";
import { UserInformation } from "../components/UserInformation";
import {
  Container,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_ORDER } from '../../utils/mutations';
import { Auth } from "../utils/auth";

const Profile = () => {

  const [formState, setFormState] = useState({
    _id: '',
  });
  const [getOrder, { error, data }] = useMutation(GET_ORDER);

  const handleOrderChange = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
     const response = await getOrder(event.id);

     if (!response.ok) {
      throw new Error('something went wrong!');
     }

     const { token, user } = await response.json();
     console.log(user);
     Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <div className="text-light bg-dark p-5">
    <Container>
      <Row>
        <UserInformation key={user}/>
      </Row>
      <Col xs="4" m="3">
      {user.orders.map(( order) => (
        <Button 
        onClick={handleOrderChange}>
        <OrderHeader key={order}/>
        </Button>
      ))}
      </Col>
      <Col xs="8" m="9">

      </Col>
      </Container>
    </div>
    </>
  )
}

export default Profile;
