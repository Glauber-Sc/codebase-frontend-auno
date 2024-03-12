
import React, { useState, useContext } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { signin } = useContext(AuthContext); // Obtenha a função de signin do contexto
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      // Verifica se ambos os campos estão preenchidos
      if (!email || !senha) {
        throw new Error("Por favor, preencha todos os campos.");
      }

      await signin(email, senha); // Chame a função de signin com os dados do formulário
      navigate("/home");
    } catch (error) {
      setError(error.message); // Exiba mensagens de erro retornadas pela função de signin
    }
  };

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
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
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleSignin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Cadastre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
