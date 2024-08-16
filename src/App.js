import React from 'react';

import './App.css';
import NavBar from './NavBar';
import ModalForgotPassword from './ModalForgotPassword';
import ModalResetPassword from './ModalResetPassword'

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <br />
      <ModalForgotPassword />
      <br />
      <br />
      <br />
      <ModalResetPassword />
    </div> 
    
  );
}