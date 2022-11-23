import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap/';
import axios from 'axios';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user's input
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username is required.');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://my-flix1987.herokuapp.com/login', {
        username: username,
        password: password
      })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          alert('Login failed.')
        });
    }
  };

  return (
    <Container>
      <Row className='mt-3'>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Login</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter your username"
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength="6"
                      placeholder="Enter your Password"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <div className='mt-3 d-flex justify-content-between'>
                    <Button
                      variant='primary'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                    <Button
                      className='ml-2'
                      variant='primary'
                      href={"/register"}
                    >
                      Register
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
