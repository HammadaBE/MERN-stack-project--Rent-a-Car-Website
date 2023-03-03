// Modal.js

import React, { useState } from 'react'
import ThreeScene from './threeScene'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
    console.log('Modal opened')
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <>
      <button onClick={openModal}>Open Modal</button>

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={closeModal}>Close Modal</button>
            <ThreeScene />
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
