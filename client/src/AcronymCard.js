import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import AOS from 'aos';
import '../node_modules/aos/dist/aos.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AcronymCard = (props) => {
  AOS.init();
  return (
    <Card bg="light" style={{ width: '18rem' }} data-aos="zoom-in" data-aos-anchor-placement="center-bottom">
      <Card.Header>{props.acronym}</Card.Header>
      <Card.Body>
        <Card.Title>{props.phrase}</Card.Title>
        <Card.Text>
          Tags: {props.tags.map((tag) => {
            return <Badge pill variant="info">{tag}</Badge>
          })}
        </Card.Text>
      </Card.Body>
    </Card>
  )
};

export default AcronymCard;