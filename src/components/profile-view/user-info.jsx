import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function UserInfo({ username, email, birthday }) {
  return (
    <Row>
      <Col className='mb-4 mt-4'>
        <h4>Your Account</h4>
        <Card>
          <Card.Body>
            <Card.Text>Username: {username}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <Card.Text>
              Birthday: {birthday}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default UserInfo