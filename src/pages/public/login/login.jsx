import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MainContainerLogin } from './StyleLogin';
import apiUrl from '../../../service/apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../../assets/img/logo.png'
import {EnvelopeSimple, Lock}  from "@phosphor-icons/react";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingLogin(true)
    try {
      // Fazer a requisição para autenticar o usuário com as credenciais fornecidas
      const response = await axios.post(`${apiUrl}/login`, { email, password });

      // Salvar o token de autenticação no armazenamento local (localStorage) ou em um gerenciador de estado
      const token = response.data.token;
      const name = response.data.name;
      const emailLogged = response.data.email;
      
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      localStorage.setItem('email', emailLogged)
      // Salvar o token em algum lugar seguro, como localStorage ou um gerenciador de estado global
      // Exemplo: localStorage.setItem('token', token);

      // Redirecionar para a página de dashboard após o login bem-sucedido
      navigate('/dashboard');
    } catch (error) {
      console.error('ops',error);
      setIsLoadingLogin(false)
      // Tratar erros de login
      toast.error(error.response.data.error)
      setTimeout(() => {
      }, 5000);
    }
    setIsLoadingLogin(false)
  };

  function signUp(){
    navigate('/cadastro')
  }

  
  return (
    <MainContainerLogin>
      <h4>Transforme suas Finanças: Gerencie, Economize, Prospere!</h4>
      <div className='sides'>
        <div className='card-login col-10 col-md-4 col-lg-3'>
          <img style={{margin:'0 auto'}} src={Logo} width="100px" />
          <div className='form'>
          <h6 style={{padding:'20px 0 0 0'}}>Acesse sua conta</h6>
            <form onSubmit={handleLogin}>
              <div className='box-inputs'>
                <EnvelopeSimple size={32} color="#D81B60 "  weight="fill"/>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='box-inputs'>
              <Lock size={32} color="#D81B60 " weight="fill" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className='btn-login'>Login {isLoadingLogin &&  <div class="custom-loader"></div>}</button>
            </form>
            <div>
              <button className='btn-cadastro' onClick={() => signUp()}>Ainda não tem cadastro? <span>Cadastre-se Agora!</span></button> <br />
              <span style={{padding:'10px', fontSize:'13px', color:'#000'}}>contato: contatosmarcelsantos@gmail.com</span>
            </div>
          </div>
        </div>
        <div className='side-public-b'>
          <h1>Crie sua conta e faça seu controle financeiro!</h1>
          <span style={{cursor:'pointer'}} onClick={() => signUp()}>Crie uma conta clicando aqui</span>
        </div>
      </div>
      <ToastContainer />
    </MainContainerLogin>
  );
}

export default Login;
