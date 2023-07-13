import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MainContainerLogin } from './StyleLogin';
import apiUrl from '../../../service/apiUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <div className='card-login col-10 col-md-4 col-lg-3'>
        <h1>Login</h1>
        <div className='form'>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className='btn-login'>Login {isLoadingLogin &&  <div class="custom-loader"></div>}</button>
          </form>
          <div>
            <button className='btn-cadastro' onClick={() => signUp()}>Ainda não tem cadastro? Cadastre-se Agora!</button> <br />
            <span style={{padding:'10px', fontSize:'13px', color:'#000'}}>contato: contatosmarcelsantos@gmail.com</span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainContainerLogin>
  );
}

export default Login;
