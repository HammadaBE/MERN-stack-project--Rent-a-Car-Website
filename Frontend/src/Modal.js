// Modal.js

import React, { useState } from 'react'

const Modal = ({ isOpen, closeModal }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Close</button>
            <img src="dacia.png" alt="Dacia image" />
          </div>
        </div>
      )}
    </>
  );
};


export default Modal