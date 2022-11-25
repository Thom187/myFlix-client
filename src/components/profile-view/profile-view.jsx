import React from 'react';
import axios from 'axios';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserInfo from './user-info';

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log('this.props', this.props);
  }

  getUser = () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .get(`https://my-flix1987.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleUpdateUser = (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .put(
        `https://my-flix1987.herokuapp.com/users/${user}`,
        {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        // const data = response.data;
        console.log('response', res);
        alert('Profile Update successful, please login again!');
        this.setState({
          username: res.data.username,
          password: res.data.password,
          email: res.data.email,
          birthday: res.data.birthday,
        })
        localStorage.clear();

        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleDeleteUser = (e) => {
    const confirmDelete = window.confirm('Do you really want to delete your account?');

    if (confirmDelete) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      axios
        .delete(
          `https://my-flix1987.herokuapp.com/users/${user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          alert('Profile successfully deleted');
          window.location.pathname = '/';
        })
        .catch((e) => {
          console.log(error);
        });
    }
  };
  removeFavoriteMovie = (movie) => {
    // e.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios
      .delete(
        `https://my-flix1987.herokuapp.com/users/${user}/favoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert('Movie was removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      username: value,
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  setEmail(value) {
    this.setState({
      email: value,
    });
  }

  setBirth(value) {
    this.setState({
      birthday: value,
    });
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, username, password, email, birthday } = this.state;

    const favoriteMovie = favoriteMovies.map((movieId) =>
      movies.find((movie) => movie._id === movieId)
    );

    return (
      <Container>
        {/* <Card>
              <Card.Body>
                <Card.Text>Username: {username}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>
                  Birthday: {birthday}
                </Card.Text>
              </Card.Body>
            </Card> */}
        <Row>
          <Col xs={12}>
            <h4 className='mt-4 mb-2'>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovie.map((movie) => (
            <Col lg={3} md={4} xs={6}>
              <Card className='m-2'>
                <Link to={`/movies/${movie._id}`}>
                  <Card.Img
                    src={movie.imagePath}
                    alt={movie.title}
                  ></Card.Img>
                </Link>
                <Card.Body>
                  <Card.Title>
                    {movie.title}
                  </Card.Title>
                  <Button
                    variant='danger'
                    onClick={() => {
                      this.removeFavoriteMovie(movie);
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col xs={12} md={5}>
            <UserInfo username={username} email={email} birthday={birthday} />
          </Col>
          <Col xs={12} md={7} className='mb-4 mt-4'>
            <h4>Update your Profile</h4>

            <Card>
              <Form className='p-4'>
                <Form.Group className='mb-3'>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type='text'
                    name='Username'
                    placeholder='New Username'
                    onChange={(e) => this.setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='Password'
                    placeholder='New Password'
                    onChange={(e) => this.setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='Email'
                    placeholder={this.state.email}
                    onChange={(e) => this.setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className='mb-4'>
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type='date'
                    name='Birthday'
                    placeholder={this.state.birthday}
                    onChange={(e) => this.setBirth(e.target.value)}
                  />
                </Form.Group>
                <div className='d-flex justify-content-between'>
                  <Button
                    variant='warning'
                    type='submit'
                    onClick={this.handleUpdateUser}
                  >
                    Update Profile
                  </Button>
                  <Button
                    variant='danger'
                    type='submit'
                    onClick={this.handleDeleteUser}
                  >
                    Delete Profile
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container >
    );
  }
}