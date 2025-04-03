import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Image } from "react-bootstrap";
import Hero_img from '../../assets/Hero-img.png'

const Hero = () => {
  return (
    <div>
      

      {/* Hero Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold">Hey there! 👋 Welcome to BookBuddies Web</h1>
              <p className="lead text-muted mt-3">Explore a world of books waiting to be shared. Join a community of avid readers and discover your next favorite read.</p>
              <Button variant="success" className="mt-4">Read Exclusive Blog</Button>
            </Col>

            <Col lg={4} className="text-center my-4 my-lg-0">
              <Image fluid src={Hero_img} alt="Author" />
            </Col>

            <Col lg={3} className="text-center text-lg-start">
              <p className="text-uppercase fw-bold text-muted">⚡️ Latest Picks</p>
              <div className="mt-3">
                {[1, 2, 3].map((item, index) => (
                  <div key={index} className="d-flex align-items-center mb-3">
                    <Image src={`https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/1/thumbnail-${item}.png`} rounded width={50} height={50} alt="Thumbnail" />
                    <p className="ms-3 fw-bold mb-0">
                      <a href="#" className="text-dark text-decoration-none">Top 10 books that reshaped the literary landscape</a>
                    </p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Hero;
