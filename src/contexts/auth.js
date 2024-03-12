import { createContext, useEffect, useState } from "react";

//import axios from "axios";

import api from "../service/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const { email } = JSON.parse(userToken);
      setUser({ email });
    }
  }, []);


  const signin = async (email, password) => {
    try {
      // Enviar solicitação para o backend para autenticação
      const response = await api.post('/user/login', {
        usuario_email: email,
        usuario_senha: password
      });

      const { usuario_email } = response.data;
      const token = response.data.token;

      // Armazenar o token de usuário no localStorage
      localStorage.setItem("user_token", JSON.stringify({ email: usuario_email, token }));

      console.log("AQUI ESTA O LOGIN", response)

      setUser({ email: usuario_email });
    } catch (error) {
      throw new Error(error.response.data.message || "Erro ao fazer login");
    }
  };

  const signup = async (email, password, nome, dataNascimento) => {
    try {
      // Enviar solicitação para o backend para cadastro de usuário
      await api.post('/user/cadastrar', {
        usuario_nome: nome,
        usuario_email: email,
        usuario_senha: password,
        usuario_nascimento: dataNascimento
      });
    } catch (error) {
      throw new Error(error.response.data.message || "Erro ao cadastrar usuário");
    }
  };

  const signout = () => {
    // Limpar o token de usuário do localStorage
    localStorage.removeItem("user_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
