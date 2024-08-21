import React from 'react';

import './App.css';
import NavBar from './components/NavBar';
import ModalForgotPassword from './components/ModalForgotPassword';
import ModalResetPassword from './components/ModalResetPassword'

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <br />
      <ModalForgotPassword />
      <br />
      <br />
      <ModalResetPassword />
    </div> 
    
  );
}