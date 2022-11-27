import React from 'react';
import PropTypes from 'prop-types';

import { Button, Col, Container, Row, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>

        <Row className='mt-3'>
          <Col className='label'>Director:</Col>
          <Col className='value'>{director.name}</Col>
        </Row>
        <Row className='mt-3'>
          <Col className='label'>Bio:</Col>
          <Col className='value'>{director.bio}</Col>
        </Row>
        <Row className='mt-3'>
          <Col className='label'>Birthday:</Col>
          <Col className='value'>{director.birthday}</Col>
        </Row>

        <Button className='mt-3' onClick={() => {
          onBackClick(null);
        }}>Back</Button>

      </Container>
    )
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired
  }).isRequired,
};
