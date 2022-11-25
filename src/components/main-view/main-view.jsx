import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


import { Row, Col, Button } from 'react-bootstrap/';

import { Menubar } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
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

  getMovies(token) {
    axios.get('https://my-flix1987.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates
  the `user` property in state to that particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    localStorage.setItem('birthday', authData.user.birthday);
    localStorage.setItem('password', authData.user.password);
    localStorage.setItem('email', authData.user.email);
    localStorage.setItem('favoriteMovies', authData.user.favoriteMovies);
    this.getMovies(authData.token);
  }

  // /*When a movie is clicked,this function is invoked
  // and updates the state of the `selectedMovie` *property to that movie*/
  // setSelectedMovie(newSelectedMovie) {
  //   this.setState({
  //     selectedMovie: newSelectedMovie
  //   });
  // }

  // onRegistration(register) {
  //   this.setState({
  //     register
  //   });
  // }


  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }

  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <Menubar user={user} />
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path='/'
            render={() => {
              /* If there is no user, the LoginView is rendered. 
              If there is a user logged in, the user details are
              *passed as a prop to the LoginView*/
              if (!user) return (
                <Col md={8}>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
              // Before the movies have been loaded
              if (movies.length === 0) return <div className='main-view' />;

              return (
                <MoviesList movies={movies} />
              );
            }} />
          <Route path='/register' render={() => {
            if (user) return <Redirect to='/' />
            return (
              <Col md={8}>
                <RegistrationView />
              </Col>
            )
          }} />

          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!user) return (
              <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() =>
                  history.goBack()} />
            </Col>
          }} />

          <Route path='/directors/:name' render={({ match, history }) => {
            if (!user) return (
              <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />
            return <Col >
              <DirectorView director={movies.find(m => m.director.name === match.params.name).director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path='/genres/:name' render={({ match, history }) => {
            if (!user) return (
              <Col md={8}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            )
            if (movies.length === 0) return <div className='main-view' />
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.genre.name === match.params.name).genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to='/' />
            return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);