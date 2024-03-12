import React, { useState, useEffect } from 'react';
import { Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Typography, InputAdornment } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Person as PersonIcon, } from '@mui/icons-material';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import api from '../../service/api';
import Header from '../../components/Header';
import ConfirmationModal from '../../components/DeleteModal';
import ViewModal from '../../components/ViewModal'; // Importe o componente do modal de visualização

const Home = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();
  const [alunos, setAlunos] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar a abertura do modal de exclusão
  const [deletingAlunoId, setDeletingAlunoId] = useState(null); // Estado para armazenar o ID do aluno a ser deletado
  const [viewingAluno, setViewingAluno] = useState(null); // Estado para controlar a abertura do modal de visualização e armazenar os detalhes do aluno a serem exibidos

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await api.get('/alunos/buscarTodos');
      setAlunos(response.data);
    } catch (error) {
      console.error('Error fetching alunos:', error);
    }
  };

  const handleDeleteAluno = async (alunoId) => {
    // Abrir o modal de confirmação e armazenar o ID do aluno a ser deletado
    setDeletingAlunoId(alunoId);
    setModalOpen(true);
  };

  const handleViewAluno = (aluno) => {
    // Abrir o modal de visualização e armazenar os detalhes do aluno a serem exibidos
    setViewingAluno(aluno);
  };

  const confirmDeleteAluno = async () => {
    try {
      await api.delete(`/alunos/deletar/${deletingAlunoId}`);
      setAlunos(alunos.filter(aluno => aluno.aluno_id !== deletingAlunoId));
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting aluno:', error);
    }
  };

  const handleAdicionarAluno = async () => {
    navigate('/AdicionarAluno');
  };

  const handleEditAluno = async (aluno) => {
    navigate(`/EditarAluno/${aluno.aluno_id}`, { state: { aluno } });
  };

  // filtro para barra de pesquisa
  const filteredAlunos = alunos.filter((aluno) => {
    const searchLowerCase = searchTitle.toLowerCase();
    return Object.values(aluno).some(value =>
      typeof value === 'string' && value.toLowerCase().includes(searchLowerCase)
    );
  });

  return (

    <>
      <Header />

      <Container>
        <div style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#FFF', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Lista de Alunos
          </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', marginBottom: '30px' }}>
          <Button
            variant="contained"
            onClick={handleAdicionarAluno}
            startIcon={<AddIcon />}
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#006400' } }}
            style={{ whiteSpace: 'nowrap' }}
          >
            Adicionar Aluno
          </Button>
          <TextField
            label="Buscar aluno"
            variant="outlined"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            fullWidth
            size="small"
            style={{ maxWidth: '300px', borderRadius: '5px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton size="small">
                    <PersonIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>





        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#000', color: '#FFF' }}>
                <TableCell sx={{ color: '#FFF' }}><b>Id</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Nome</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>E-Mail</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Matrícula</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Curso</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Horário</b></TableCell>

                <TableCell sx={{ color: '#FFF' }}><b>Idade</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Data de Nascimento</b></TableCell>
                <TableCell sx={{ color: '#FFF' }}><b>Ações</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAlunos.map((aluno) => {
                const parts = aluno.aluno_data_nascimento.split('-');
                const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;

                return (
                  <TableRow key={aluno.aluno_id}>
                    <TableCell>{aluno.aluno_id}</TableCell>
                    <TableCell>{aluno.aluno_nome}</TableCell>
                    <TableCell>{aluno.aluno_email}</TableCell>
                    <TableCell>{aluno.aluno_matricula}</TableCell>
                    <TableCell>{aluno.aluno_curso}</TableCell>
                    <TableCell>{aluno.aluno_horario}</TableCell>
                    <TableCell>{aluno.aluno_idade}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewAluno(aluno)}> {/* Chame a função handleViewAluno passando o aluno como argumento */}
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEditAluno(aluno)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteAluno(aluno.aluno_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <ConfirmationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmDeleteAluno}
        />

        {viewingAluno && (
          <ViewModal open={true} onClose={() => setViewingAluno(null)} aluno={viewingAluno} />
        )}
        <Button variant="contained" onClick={signout} style={{ marginTop: '20px', backgroundColor: 'red', '&:hover': { backgroundColor: '#8B0000' }, marginBottom: '50px' }}>Sair</Button>




      </Container>

      <div style={{ backgroundColor: '#000', color: '#FFF', padding: '10px 0', textAlign: 'center', bottom: 0, left: 0, width: '100%' }}>
        <Typography variant="body1">
          Sistema de Cadastro de Alunos - Versão 1.0 © {new Date().getFullYear()}
        </Typography>
      </div>
      
    </>


  );
};

export default Home;
