import React from 'react';
import { Modal, Button, Typography } from '@mui/material';

const ViewModal = ({ open, onClose, aluno }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '400px' }}>
        <Typography variant="h5" gutterBottom>
          Informações do Aluno
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>ID:</b> {aluno.aluno_id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Nome:</b> {aluno.aluno_nome}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>E-mail:</b> {aluno.aluno_email}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Matrícula:</b> {aluno.aluno_matricula}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Curso:</b> {aluno.aluno_curso}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Horário:</b> {aluno.aluno_horario}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Idade:</b> {aluno.aluno_idade}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <b>Data de Nascimento:</b> {aluno.aluno_data_nascimento}
        </Typography>
        <Button onClick={onClose} variant="contained" style={{ marginTop: '20px' }}>Fechar</Button>
      </div>
    </Modal>
  );
};

export default ViewModal;
