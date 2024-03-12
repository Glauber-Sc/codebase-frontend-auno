
import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const Signup = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [error, setError] = useState("");
  const { signup } = useContext(AuthContext); // Obtenha a função de signup do contexto
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Verifica se todos os campos estão preenchidos
      if (!nome || !email || !senha || !dataNascimento) {
        throw new Error("Todos os campos devem ser preenchidos.");
      }

      await signup(email, senha, nome, dataNascimento); // Chame a função de signup com os dados do formulário
      alert("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      setError(error.message); // Exiba mensagens de erro retornadas pela função de signup
    }
  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Input
          type="date"
          placeholder="Data de Nascimento"
          value={dataNascimento}
          onChange={(e) => [setDataNascimento(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
