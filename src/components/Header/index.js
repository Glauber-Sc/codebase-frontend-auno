import React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'; // Importando Link para navegar para a home
import E from '../../assets/E.jpg';

const Header = ({ title }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '1px solid #ccc', backgroundColor: '#65727c' }}>
      <Link to="/home"> {/* Adicionando Link para a home */}
        <img src={E} alt="Logo" style={{ width: '50px', marginRight: '10px' }} /> {/* Tornando a imagem pequena e ajustando a margem direita */}
      </Link>
      <Typography variant="h4" gutterBottom>
        Cadastro de Alunos da Estácio-FAP
      </Typography>
    </div>
  );
};

export default Header;
