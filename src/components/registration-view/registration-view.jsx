import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap/';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each Input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  // Validate user's input
  const validate = () => {
    let isReq = true;

    if (!username) {
      setUsernameErr('Username is required.');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be at least 5 characters long.');
      isReq = false;
    }

    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long.');
      isReq = false;
    }

    if (!email) {
      setEmailErr('Email is required.');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Invalid email address');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios.post('https://my-flix1987.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Your registration was successful, please login!');
          window.open('/', '_self'); // _self let the page open in current tab
        })
        .catch(response => {
          console.error(response);
          alert('Registration failed.');
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
                <Card.Title>Please register</Card.Title>
                <Form>
                  <Form.Group className='mb-3'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder='Enter a username'
                    />
                    {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength='6'
                      placeholder='Your password must be at least 6 characters'
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group className='mb-3'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder='Enter your email address '
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className='mt-3 d-flex justify-content-between'>
                    <Button
                      variant='primary'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant='primary'
                      href={'/'}
                    >
                      Login
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

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired
};