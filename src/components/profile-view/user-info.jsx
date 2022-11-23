import React from 'react';
import { Card } from 'react-bootstrap';

function UserInfo({ username, email, birthday }) {
  return (
    <Card>
      <Card.Body>
        <Card.Text>Username: {username}</Card.Text>
        <Card.Text>Email: {email}</Card.Text>
        <Card.Text>
          Birthday: {birthday}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default UserInfo