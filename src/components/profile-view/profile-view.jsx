import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Container, Row, Col, CardGroup, Card } from 'react-bootstrap/';
import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each Input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');

  const { user, onBackClick } = props;

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem('token');
    if (isReq && token !== null && user !== null) {
      /* Send a request to the server for authentication */
      axios.put(`https://my-flix1987.herokuapp.com/users/${user}`,
        {
          username: username,
          password: password,
          email: email,
          birthday: birthday
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(response => {
          const data = response.data;
          console.log(data);
          alert('Profile update was successful! Please Login again.');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch(response => {
          console.error(response);
          alert('Update failed.');
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (confirm('Do you really want to delete your account?')) {
      axios.delete(`https://my-flix1987.herokuapp.com/users/${user}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
        .then((response) => {
          alert('Your account has been deleted.');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((e) => console.log(e));
    }
  };


  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Update your profile</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter a username"
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
                      placeholder="Your password must be at least 6 characters"
                    />
                    {passwordErr && <p>{passwordErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address "
                    />
                    {emailErr && <p>{emailErr}</p>}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      value={birthday}
                      onChange={e => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleUpdate}>Update</Button>
                  <Button className="ml-2" onClick={() => {
                    onBackClick(null);
                  }}>Back</Button>
                  <br />
                  <Button className="" variant="danger" type="submit" onClick={handleDelete} >Delete account</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}
