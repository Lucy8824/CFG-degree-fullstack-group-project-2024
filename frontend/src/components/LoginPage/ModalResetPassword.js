import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './ModalsStyle.css';

export default function ModalResetPassword() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    setShow(false);
    setError('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    if (validatePassword(password, confirmPassword)) {
      // Send reset password instructions
      handleClose();
    } else {
      setError('Passwords do not match.');
    }
  };

  const validatePassword = (password, confirmPassword) => {
    return password === confirmPassword && password.length > 0;
  };

  return (
    <>
      <a href="#" className="forgot-password-link" onClick={handleShow}>
        Reset password
      </a>

      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="modal-title"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="modal-title">Reset password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="modal-description">
            Please enter your new password and confirm it
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Control
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="password-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="password-input"
              />
              {error && <Form.Text className="text-danger">{error}</Form.Text>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="button secondary-button"
            onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="button primary-button"
            onClick={handleSubmit}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
