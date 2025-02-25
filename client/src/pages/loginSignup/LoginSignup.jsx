import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from 'axios';
import "./LoginSignup.css";
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nic: "",
    gender: "",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      email: "",
      nic: "",
      gender: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = state === "Signup" ? "signup" : "login";

    try {
      const response = await axios.post(`http://localhost:3000/${endpoint}`, formData);
      
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem('auth-token', response.data.token);
        }
        alert(`${state} successful!`);
        navigate('/');
      } else {
        alert(response.data.error || `Error during ${state.toLowerCase()}`);
      }
    } catch (error) {
      alert(error.response?.data?.error || `Error during ${state.toLowerCase()}`);
      console.error("Error:", error);
    }
  };

  return (
    <Container fluid className="loginsignup-container">
      <Row className="loginsignup-content">
        <Col md={6} className="loginsignup-form">
          <h1 className="text-center">{state}</h1>
          <Form onSubmit={handleSubmit}>
            {state === "Signup" && (
              <>
                <Form.Group controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridNic">
                  <Form.Label>NIC No.</Form.Label>
                  <Form.Control
                    name="nic"
                    placeholder="Enter your NIC"
                    value={formData.nic}
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGridGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Select
                    name="gender"
                    value={formData.gender}
                    onChange={changeHandler}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </>
            )}

            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={changeHandler}
                required
              />
            </Form.Group>

            <p className="text-center toggle-text">
              {state === "Signup" ? (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setState("Login")}>Login here</span>
                </>
              ) : (
                <>
                  Create an account?{" "}
                  <span onClick={() => setState("Signup")}>Click here</span>
                </>
              )}
            </p>

            <Button variant="success" className="w-100 mt-3 submit-button" type="submit">
              {state === "Signup" ? "Sign Up" : "Login"}
            </Button>
          </Form>
        </Col>

        <Col md={6} className="loginsignup-image">
          <h2>Start your journey now</h2>
          <p>Join us to explore amazing features and experiences!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSignup;
