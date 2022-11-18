import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  addToFavoriteMovies(e) {
    const { movie } = this.props;
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    e.preventDefault();
    axios.
      post(`https://my-flix1987.herokuapp.com/users/${user}/favoriteMovies/${movie._id}`,
        { user: localStorage.getItem('user') },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert('Added to your Favorites.');
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.imagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.description}</span>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.director.name}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.genre.name}</span>
        </div>

        <Link to={`/directors/${movie.director.name}`}>
          <Button variant="link">Director</Button>
        </Link>

        <Link to={`/genres/${movie.genre.name}`}>
          <Button variant="link">Genre</Button>
        </Link>

        <Button
          className='mr-2'
          onClick={(e) => this.addToFavoriteMovies(e)}
        >
          Add to Favorites
        </Button>

        <Button onClick={() => {
          onBackClick(null);
        }}>Back</Button>

      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imagePath: PropTypes.string.isRequired,
    actors: PropTypes.array,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthday: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};