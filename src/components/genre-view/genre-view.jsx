import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row, Col } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>

        <Row className='mt-3'>
          <Col className='label'>Genre:</Col>
          <Col className='value'>{genre.name}</Col>
        </Row>
        <Row className='mt-3'>
          <Col className='label'>Description:</Col>
          <Col className='value'>{genre.description}</Col>
        </Row>

        <Button className='mt-3' onClick={() => {
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