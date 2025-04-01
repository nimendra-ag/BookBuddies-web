import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

const ExploreMore = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <Image 
              src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/9/female-avatar-1.png" 
              roundedCircle 
              width={64} 
              height={64} 
              alt="Avatar" 
            />
            <blockquote className="mt-4">
              <p className="fs-5">“Sharing books transformed my reading journey. Finding the perfect book has never been easier. Thanks to Book Buddies, I’ve discovered gems I wouldn’t have picked otherwise!”</p>
            </blockquote>
            <p className="fw-bold">Jenny Wilson</p>
            <p className="text-muted">Avid Reader and Book Enthusiast</p>
          </Col>
          <Col md={6}>
            <Card className="p-4 shadow-sm">
              <Card.Body>
                <Card.Title className="fs-4 fw-bold">Join 5,482 readers</Card.Title>
                <Card.Text className="text-muted mt-3">Start sharing books today and find your next favorite read. Build a network of book lovers and explore countless stories!</Card.Text>
                <Button variant="success" className="w-100 mt-3">Find Your Next Read</Button>
                <Button variant="outline-dark" className="w-100 mt-2">About us</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ExploreMore;