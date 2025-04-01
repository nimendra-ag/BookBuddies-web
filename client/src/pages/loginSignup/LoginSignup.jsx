import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

const LoginSignup = ({ setIsAuthenticated }) => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    nic: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();
  
  // Check if setIsAuthenticated is a function, if not, create a dummy function
  const updateAuthState = typeof setIsAuthenticated === 'function' 
    ? setIsAuthenticated 
    : () => console.warn("setIsAuthenticated is not a function");
  
  useEffect(() => {
    // Check for existing token on component mount
    const token = localStorage.getItem("auth-token");
    if (token) {
      // Only call if it's a function
      updateAuthState(true);
    }
  }, [updateAuthState]);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear any errors when user starts typing
    if (error) setError("");
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
    setError("");
    setSuccess("");
    
    const endpoint = state === "Signup" ? "signup" : "login";
    
    try {
      const response = await axios.post(`http://localhost:5000/${endpoint}`, formData);
      
      if (response.data.success) {
        if (response.data.token) {
          localStorage.setItem("auth-token", response.data.token);
          updateAuthState(true);
        }
        
        setSuccess(`${state} successful!`);
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          navigate("/");
          // Only reload if needed to update navbar state
          if (window.location.pathname === "/") {
            window.location.reload();
          }
        }, 1500);
      } else {
        setError(response.data.error || `Error during ${state.toLowerCase()}`);
      }
    } catch (error) {
      setError(error.response?.data?.error || `Error during ${state.toLowerCase()}`);
      console.error("Error:", error);
    }
  };

  const toggleState = () => {
    setState(state === "Login" ? "Signup" : "Login");
    resetForm();
    setError("");
    setSuccess("");
  };

  return (
    <Container fluid className="loginsignup-container">
      <Row className="loginsignup-content">
        <Col md={6} className="loginsignup-form">
          <h1 className="text-center mb-4">{state}</h1>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {state === "Signup" && (
              <>
                <Form.Group className="mb-3" controlId="formGridUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGridNic">
                  <Form.Label>NIC No.</Form.Label>
                  <Form.Control
                    name="nic"
                    placeholder="Enter your NIC"
                    value={formData.nic}
                    onChange={changeHandler}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formGridGender">
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
            
            <Form.Group className="mb-3" controlId="formGridEmail">
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
            
            <Form.Group className="mb-3" controlId="formGridPassword">
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
                  <span onClick={toggleState} className="toggle-link">Login here</span>
                </>
              ) : (
                <>
                  Create an account?{" "}
                  <span onClick={toggleState} className="toggle-link">Click here</span>
                </>
              )}
            </p>
            
            <Button 
              variant="success" 
              className="w-100 mt-3 submit-button" 
              type="submit"
            >
              {state === "Signup" ? "Sign Up" : "Login"}
            </Button>
          </Form>
        </Col>
        
        <Col md={6} className="loginsignup-image">
          <div className="image-content">
            <h2>Start your journey now</h2>
            <p>Join us to explore amazing features and experiences!</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginSignup;
