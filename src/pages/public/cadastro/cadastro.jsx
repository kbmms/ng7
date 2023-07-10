import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MainContainerCadastro } from './StyleCadastro';
import apiUrl from '../../../service/apiUrl'
function Cadastro() {
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
      console.error(error);
      setIsLoadingLogin(false)
      // Tratar erros de login
    }
    setIsLoadingLogin(false)
  };

  
  return (
    <MainContainerCadastro>
      <div className='card-login col-10 col-md-4 col-lg-3'>
        <h1>Cadastre-se</h1>
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
        </div>
      </div>
    </MainContainerCadastro>
  );
}

export default Cadastro;
