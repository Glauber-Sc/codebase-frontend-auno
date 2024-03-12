import React, { useState } from 'react';
import { Container, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person as PersonIcon, Email as EmailIcon, School as SchoolIcon, Schedule as ScheduleIcon, Cake as CakeIcon, AssignmentInd as AssignmentIndIcon } from '@mui/icons-material';
import Header from '../../components/Header';
import api from '../../service/api';

const AdicionarAluno = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [matricula, setMatricula] = useState('');
    const [curso, setCurso] = useState('');
    const [horario, setHorario] = useState('');
    const [idade, setIdade] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleAddAluno = async () => {
        try {
            // Verifica se todos os campos estão preenchidos
            if (!nome || !email || !matricula || !curso || !horario || !idade || !dataNascimento) {
                throw new Error('Por favor, preencha todos os campos.');
            }

            const response = await api.post('/alunos/adicionar', {
                aluno_nome: nome,
                aluno_email: email,
                aluno_matricula: matricula,
                aluno_curso: curso,
                aluno_horario: horario,
                aluno_idade: idade,
                aluno_data_nascimento: dataNascimento,
            });

            if (response.status === 201) {
                alert('Aluno adicionado com sucesso!');
                navigate('/home');
            }

        } catch (error) {
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Erro interno ao adicionar aluno.');
            }
        }
    };

    const handleCancelAluno = async () => {
        navigate('/home');
    };

    return (
        <>
            <Header />
            <Container>
                <div style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#FFF', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom>
                        Adicionar Aluno
                    </Typography>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <TextField
                        name="nome"
                        label="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
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
                    <TextField
                        name="email"
                        label="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <EmailIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="number"
                        name="matricula"
                        label="Matrícula"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <AssignmentIndIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        name="curso"
                        label="Curso"
                        value={curso}
                        onChange={(e) => setCurso(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <SchoolIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        name="horario"
                        label="Horário"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <ScheduleIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="number"
                        name="idade"
                        label="Idade"
                        value={idade}
                        onChange={(e) => setIdade(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <CakeIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="date"
                        name="data_nascimento"
                        label="Data de Nascimento"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton size="small">
                                        <CakeIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Typography variant="body2" color="error" style={{ marginBottom: '10px' }}>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleAddAluno}
                        style={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#006400' }, marginBottom: '100px', marginTop: '30px', borderRadius: '5px' }}
                    >
                        Adicionar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCancelAluno}
                        style={{ backgroundColor: 'red', '&:hover': { backgroundColor: '#006400' }, marginBottom: '100px', marginTop: '30px', marginLeft: '10px', borderRadius: '5px' }}
                    >
                        Cancelar
                    </Button>
                </div>
            </Container>
            <div style={{ backgroundColor: '#000', color: '#FFF', padding: '10px 0', textAlign: 'center', bottom: 0, left: 0, width: '100%' }}>
                <Typography variant="body1">
                    Sistema de Cadastro de Alunos - Versão 1.0 © {new Date().getFullYear()}
                </Typography>
            </div>
        </>
    );
};

export default AdicionarAluno;
