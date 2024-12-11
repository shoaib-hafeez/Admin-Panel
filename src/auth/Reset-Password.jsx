import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosClient from "../lib/axios";
import useAuthStore from "../store/Auth-Store";

const ResetPassword = () => {

  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { logout ,password ,setPassword } = useAuthStore();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    setError("Invalid or missing token. Please request a new reset link.");
    return;
  } // Extract token from URL

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      await axiosClient.post(`/users/reset-password/${token}`, {
        newPassword: password,
      });
  
      setMessage("Password reset successful. Please log in with your new password.");
      setError("");
      await logout();
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      setError(error.response?.data?.message || "Failed to reset password. Please try again.");
    }
  };
  

  return (
    <div className="form_container">
      <div className="login_form">
        <h2>Reset Password</h2>
        <br />
        <Form onSubmit={handleSubmit}>
          {/* New Password Field */}
          <Form.Group className="mb-2" controlId="formGroupPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <br />
          {message && <span className="text-success">{message}</span>}
          {error && <span className="text-danger">{error}</span>}
          <br />
          <Button type="submit" className="w-100">
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
