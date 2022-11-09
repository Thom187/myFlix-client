import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap/';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked,this function is invoked
  and updates the state of the `selectedMovie` *property to that movie*/
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  /* When a user successfully logs in, this function updates
  the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  getMovies(token) {
    axios.get('https://my-flix1987.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);


    /* If there is no user, the LoginView is rendered. 
    If there is a user logged in, the user details are
    *passed as a prop to the LoginView*/
    if (!user) return <LoginView onLoggedIn={user =>
      this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {/*If the state of `selectedMovie` is not null,
        that selected movie will be returned otherwise,
        all *movies will be returned*/}
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie}
                onBackClick={newSelectedMovie => {
                  this.setSelectedMovie(newSelectedMovie);
                }} />
            </Col>
          )
          :
          movies.map(movie => (
            <Col sm={6} md={4} lg={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }} />
            </Col>
          ))
        }
        <Button onClick={() => {
          this.onLoggedOut()
        }}>Logout</Button>
      </Row>
    );
  }
}