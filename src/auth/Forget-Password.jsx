import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosClient from "../lib/axios";
import useAuthStore from "../store/Auth-Store";
// import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  // const [email, setEmail] = useState("");
  // const navigate = useNavigate()

  const {email , setEmail} = useAuthStore()
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/users/forgot-password", {
        email,
      });
  
      setMessage("Password reset link sent to your email");
      setError(""); // Clear any errors
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Failed to send reset link. Please try again.");
      setMessage('');
    }
  };
  

  return (
    <div className="form_container">
      <div className="login_form">
        <h2>Forget Password</h2>
        <br />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2 w-100" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <br />
          
          {message && <span className="text-success">{message}</span>}
          {error && <span className="text-danger">{error}</span>}
          <br />
          <Button type="submit" className="w-100">
            Send Reset Link
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
