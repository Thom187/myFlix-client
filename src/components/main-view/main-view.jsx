import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, title: 'The Shawshank Redemption', description: 'desc1...', imagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg' },
        { _id: 2, title: 'The Green Mile', description: 'desc2...', imagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/velWPhVMQeQKcxggNEU8YmIo52R.jpg' },
        { _id: 3, title: 'Pulp Fiction', description: 'desc3...', imagePath: 'https://www.themoviedb.org/t/p/w220_and_h330_face/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The List is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => {
              this.setSelectedMovie(movie)
            }} />))
        }
      </div>
    );
  }
}