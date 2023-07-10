import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MainContainerCadastro } from './StyleCadastro';
import apiUrl from '../../../service/apiUrl'
import {useForm} from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Cadastro() {

const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    } = useForm();


  const [isLoadingLogin, setIsLoadingLogin] = useState(false);

  const navigate = useNavigate();

  const handleCreateUser = async (data) => {
    const {name, email, password} = data;
    setIsLoadingLogin(true)
    try {
      // Fazer a requisição para autenticar o usuário com as credenciais fornecidas
      const response = await axios.post(`${apiUrl}/users`, { name, email, password });
      toast("Cadastro feito com sucesso!")
      setTimeout(() => {
        navigate('/'); // Substitua '/login' com a rota correta da tela de login
      }, 5000);
      
    } catch (error) {
      console.error(error);
      setIsLoadingLogin(false)
      // Tratar erros de login
    }
    setIsLoadingLogin(false)
  };

  function goBack(){
    navigate('/')
  }

  return (
    <MainContainerCadastro>
      <div className='card-login col-10 col-md-4 col-lg-3'>
        <h1>Cadastre-se</h1>
        <div className='form'>
          <form  onSubmit={handleSubmit(handleCreateUser)}>
            <input
              type="text"
              placeholder="Seu nome"
              {...register("name", {
                required: "Campo obrigatório",
              })}
            />
            {errors.name && <span  className="msgs-error-validate">{errors.name.message}</span> }
            <hr/>
            <input
              type="email"
              placeholder="Seu email"
              {...register("email", {
                pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                    message: "Email inválido!"
                  },
                required: "Campo obrigatório",
              })}
            />
            {errors.email && <span  className="msgs-error-validate">{errors.email.message}</span> }
            <hr/>
            <input
              type="password"
              placeholder="Senha"
              {...register("password", {
                required: "Campo obrigatório",
                minLength:{value:6, message:"Senha curta demais"},
                maxLength:{value:16, message:"Senha grande demais"}
              })}
            />
            {errors.password && <span  className="msgs-error-validate">{errors.password.message}</span> }
            <hr/>

            <input
              type="password"
              placeholder="Confirme sua senha"
              {...register("repassword", {
                required: "Campo obrigatório",
                validate: (value) => value === watch('password') || "Ops! As senhas informadas estão diferentes." 
              })}
            />
            {errors.repassword && <span  className="msgs-error-validate">{errors.repassword.message}</span> }
            <hr/>
            <button style={{position:'relative'}} type="submit" className='btn-cadastro'>Cadastrar {isLoadingLogin &&  <div class="custom-loader"></div>}</button>
          </form>
          <div > 
            <button className='go-back' onClick={() => goBack()}>Voltar</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </MainContainerCadastro>
  );
}

export default Cadastro;
