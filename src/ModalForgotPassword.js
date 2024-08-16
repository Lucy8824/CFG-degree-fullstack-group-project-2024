import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './ModalForgotPassword.css';

export default function ModalForgotPassword() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setShow(false);
    setError('');
    setEmail(''); // Clear email input when closing modal
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (validateEmail(email)) {
      // Simulate sending reset password instructions
      handleClose();
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <>
      <a href="#" className="forgot-password-link" onClick={handleShow}>
        Forgot password?
      </a>

      <Modal show={show} onHide={handleClose} aria-labelledby="modal-title" centered>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Forgot your password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-description">
            Enter your email address and we will send you instructions to reset your password.
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                aria-describedby="emailHelp"
                className="email-input"
                isInvalid={!!error} // Bootstrap utility for invalid input
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="button secondary-button" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className="button primary-button" onClick={handleSubmit}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
