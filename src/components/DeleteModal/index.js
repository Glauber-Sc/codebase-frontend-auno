import React from 'react';
import { Modal, Button } from '@mui/material';

const ConfirmationModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px' }}>
        <h2 id="modal-modal-title" style={{ marginBottom: '20px', textAlign: 'center' }}>Tem certeza que deseja deletar este aluno?</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} variant="contained" style={{ width: '45%', backgroundColor: '#007bff', color: '#fff' }}>Cancelar</Button>
          <Button onClick={onConfirm} variant="contained" style={{ width: '45%', backgroundColor: 'red', color: '#fff' }}>Deletar</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
