import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


import LogoPattern from '../assets/img/pattern-tree.svg'
import Nubank from '../assets/img/nubank.png'
import BB from '../assets/img/bb.png'
import Bradesco from '../assets/img/bradesco.png'
import Inter from '../assets/img/intermedium.png'
import Itau from '../assets/img/itau.png'
import Neon from '../assets/img/neon.png'
import Next from '../assets/img/next.png'
import Caixa from '../assets/img/caixa.png'
import Outro from '../assets/img/outro.png'
import Santander from '../assets/img/santander.jpg'

function ModalExtrato({ showModal, setShowModal, children, titleExtrato, imageBank }) {
  const handleClose = () => setShowModal(false);

  const bankImages = {
    Nubank: Nubank,
    BB: BB,
    Caixa: Caixa,
    Neon: Neon,
    Next: Next,
    Itau: Itau,
    Bradesco: Bradesco,
    Inter: Inter,
    Outro: Outro,
    Santander: Santander
  };


  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        contentClassName="modal-bottom"
        dialogClassName="modal-100w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
           <img style={{width:'50px', borderRadius:'50%'}} src={bankImages[imageBank]} alt="Bank Image" /> {titleExtrato}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBodyExtrato'>
            {children}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalExtrato;
