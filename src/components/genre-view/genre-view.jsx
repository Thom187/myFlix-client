import React from 'react';
import PropTypes from 'prop-types';
import './genre-view.scss';

import { Button, Col, Container, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>

        <Row className='genre'>
          <Col className='label'>Genre:</Col>
          <Col className='value'>{genre.name}</Col>
        </Row>
        <Row className='genre'>
          <Col className='label'>Description:</Col>
          <Col className='value'>{genre.description}</Col>
        </Row>

        <Button className='genre' variant='outline-light' onClick={() => {
          onBackClick(null);
        }}>Back</Button>

      </Container>
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
}