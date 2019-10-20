import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AcronymCard = (props) => (
  <Card bg="light" style={{ width: '18rem' }}>
    <Card.Header>{props.acronym}</Card.Header>
    <Card.Body>
      <Card.Title>{props.spelledOut}</Card.Title>
      <Card.Text>
        Tags: {props.tags.map((tag) => {
          return <Badge pill variant="info">{tag}</Badge>
        })}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default AcronymCard;