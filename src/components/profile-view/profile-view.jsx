import React from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    this.getUser();
    console.log("this.props", this.props);
  }

  getUser = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .get(`https://my-flix1987.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          user: response.data.username,
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
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://my-flix1987.herokuapp.com/users/${user}`,
        {
          user: this.state.username,
          password: this.state.password,
          email: this.state.email,
          birthday: this.state.birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("response", response);
        alert("Profile was successfully updated");
        this.setState({
          user: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
        });
        localStorage.setItem("user", data.username);

        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleDeleteUser = (e) => {
    const confirmDelete = window.confirm("Do you really want to delete your account?");

    if (confirmDelete) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      axios
        .delete(
          `https://my-flix1987.herokuapp.com/users/${user}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Profile successfully deleted");
          window.location.pathname = "/";
        })
        .catch((e) => {
          console.log(error);
        });
    }
  };
  removeFavoriteMovie = (movie) => {
    // e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://my-flix1987.herokuapp.com/users/${user}/favoriteMovies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      user: value,
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
    const { favoriteMovies, user, password, email, birthday } = this.state;

    const favoriteMovie = favoriteMovies.map((movieId) =>
      movies.find((movie) => movie._id === movieId)
    );

    return (
      <Container>
        <Row>
          <Col className='mb-4 mt-4'>
            <h4>Your Account</h4>
            <Card>
              <Card.Body>
                <Card.Text>Username: {user}</Card.Text>
                <Card.Text>Email: {email}</Card.Text>
                <Card.Text>
                  Birthday: {birthday}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={7} className='mb-4 mt-4'>
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
                    variant='primary'
                    type='submit'
                    onClick={this.handleUpdateUser}
                  >
                    Update Profile
                  </Button>{" "}
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
        <>
          <Row className='mt-4'></Row>
          <Row>
            <Col lg={3} md={6}>
              <h4 className='mb-2'>Favorite Movies</h4>
              {favoriteMovie.map((movie) => (
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
              ))}
            </Col>
          </Row>
        </>
      </Container >
    );
  }
}