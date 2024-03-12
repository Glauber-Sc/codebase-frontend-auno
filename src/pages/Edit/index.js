import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, InputAdornment, IconButton, Typography } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Person as PersonIcon, Email as EmailIcon, School as SchoolIcon, Schedule as ScheduleIcon, Cake as CakeIcon, AssignmentInd as AssignmentIndIcon } from '@mui/icons-material';
import Header from '../../components/Header';
import api from '../../service/api';

const EditarAluno = () => {
    const { id } = useParams(); // Obtém o ID do aluno da URL
    const navigate = useNavigate();
    const { state } = useLocation();
    const alunoData = state && state.aluno;

    const [aluno, setAluno] = useState({
        aluno_nome: '',
        aluno_email: '',
        aluno_matricula: '',
        aluno_curso: '',
        aluno_horario: '',
        aluno_idade: '',
        aluno_data_nascimento: ''
    });



    useEffect(() => {
        if (alunoData) {
            setAluno(alunoData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alunoData]);


    async function handleEditAluno() {
        try {
            await api.put(`/alunos/alterar/${id}`, aluno); // Requisição para atualizar os dados do aluno
            alert('Aluno editado com sucesso!');
            navigate('/home'); // Redireciona para a página inicial após a edição
        } catch (error) {
            console.error('Error editing aluno:', error);
        }
    }

    const handleCancelEdit = () => {
        navigate('/home'); // Redireciona para a página inicial sem realizar a edição
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAluno(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
            <Header />
            <Container>
                <div style={{ padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#FFF', textAlign: 'center'  }}>
                    <Typography variant="h4" gutterBottom>
                        Editar Aluno
                    </Typography>
                </div>
                <div style={{ marginTop: '25px' }}>
                    <TextField
                        name="aluno_nome"
                        label="Nome"
                        value={aluno.aluno_nome}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_email"
                        label="E-mail"
                        value={aluno.aluno_email}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_matricula"
                        label="Matrícula"
                        value={aluno.aluno_matricula}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_curso"
                        label="Curso"
                        value={aluno.aluno_curso}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_horario"
                        label="Horário"
                        value={aluno.aluno_horario}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_idade"
                        label="Idade"
                        value={aluno.aluno_idade}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                        name="aluno_data_nascimento"
                        label="Data de Nascimento"
                        value={aluno.aluno_data_nascimento}
                        onChange={handleChange}
                        fullWidth
                        style={{ marginBottom: '25px', borderRadius: '5px', color: 'black' }}
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
                    <Button
                        variant="contained"
                        onClick={handleEditAluno}
                        style={{ backgroundColor: 'green', '&:hover': { backgroundColor: '#006400' }, marginBottom: '100px', marginTop: '30px', borderRadius: '5px' }}
                    >
                        Salvar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCancelEdit}
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

export default EditarAluno;
