import { Row } from 'react-bootstrap';

const UserInformation = () => {

  return (
    <>
    <Row>
      {user.name}
      <p>Previous Order Count: {user.orders.length}</p>
    </Row>
    </>
  )
}

export default UserInformation;