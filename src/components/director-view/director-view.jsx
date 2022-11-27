import React from 'react';
import PropTypes from 'prop-types';
import './director-view.scss'

import { Button, Col, Container, Row, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>

        <Row className='director'>
          <Col className='label'>Director:</Col>
          <Col className='value'>{director.name}</Col>
        </Row>
        <Row className='director'>
          <Col className='label'>Bio:</Col>
          <Col className='value'>{director.bio}</Col>
        </Row>
        <Row className='director'>
          <Col className='label'>Birthday:</Col>
          <Col className='value'>{director.birthday}</Col>
        </Row>

        <Button className='director' variant='outline-light' onClick={() => {
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