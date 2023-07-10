import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col, Stack, Modal, Button} from 'react-bootstrap'
import axios from 'axios';
import '../../../App.css'

import { MainContainer } from '../../../MainContainer';
import { Calendar, PlusCircle, Eye, Bank, ArrowCircleUp, ArrowCircleDown, Gear} from "@phosphor-icons/react";

import ProgressBar from '../../../Components/Progress';
import SlideProgressBar from '../../../Components/SlideProgress';


import LogoPattern from '../../../assets/img/pattern-tree.svg'
import Nubank from '../../../assets/img/nubank.png'
import BB from '../../../assets/img/bb.png'
import Bradesco from '../../../assets/img/bradesco.png'
import Inter from '../../../assets/img/intermedium.png'
import Itau from '../../../assets/img/itau.png'
import Neon from '../../../assets/img/neon.png'
import Next from '../../../assets/img/next.png'
import Caixa from '../../../assets/img/caixa.png'
import Outro from '../../../assets/img/outro.png'


import Chart from "react-apexcharts";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Importe o arquivo de estilos
import 'react-date-range/dist/theme/default.css'; // Importe o tema padrão
import ptBR from "date-fns/locale/pt-BR"; // the locale you want

import {useForm} from 'react-hook-form'
import apiUrl from '../../../service/apiUrl'


function Dashboard() {

  const {
    register:registerForm2,
    setValue:setValue2,
    handleSubmit: handleSubmitForm2,
    formState: { errors:errorsForm2 },
    setValue: setValueForm2,
  } = useForm();

  const [userData, setUserData] = useState([]);
  const [extrato, setExtrato] = useState([]);
  const [show, setShow] = useState(false);
  const [showEntradaExtrato, setShowEntradaExtrato] = useState(false);
  const [showDetailsExtrato, setShowDetailsExtrato] = useState(false);

  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [isLoadingExtrato, setIsLoadingExtrato] = useState(false);


  const [bankData, setBankData] = useState([]);

  const [active, setActive] = useState(true);

  const [saldo,setSaldo] = useState();
  const [nome, setNome] = useState('');

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('');
  const [id, setId] = useState('');
  const [contaBancaria, setContaBancaria] = useState('');
  const [extratoByMonth, setExtratoByMonth] = useState();

  const [graficoCategoria, setGraficoCategoria] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  
  const [descricaoDetails, setDescricaoDetails] = useState('')

  const [category, setCategory] = useState([])


  const dataAtual = new Date();

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const navigate = useNavigate();

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
      endDate: new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    const resumoCategory = {};

    extrato?.forEach((objeto) => {
      const { categoria, valor, tipo } = objeto;

      if(tipo !== 'saida'){
        return;
      }
      if(categoria === 'investimentos'){
        return;
      }

      if (!resumoCategory[categoria]) {
        resumoCategory[categoria] = 0;
      }

      resumoCategory[categoria] += valor;
    });

    const novoDadosGrafico = Object.entries(resumoCategory).map(([categoria, total]) => ({
      categoria,
      total,
    }));

    setDadosGrafico(novoDadosGrafico);
  }, [extrato]);
 

  const optionsCategoria = {
    chart: {
      id: 'chart',
    },
    xaxis: {
      categories: dadosGrafico.map((data) => data.categoria),
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });;
        }
      },
    },
  };
  const seriesCategoria = [
    {
      name: 'Total',
      data: dadosGrafico.map((data) => data.total.toFixed(2)),
    },
  ];


  const categories = [
    { value: 'salario', label: 'Salário' },
    { value: 'renda_extra', label: 'Renda Extra' },
    { value: 'cartao', label: 'Cartão de Crédito' },
    { value: 'aluguel', label: 'Aluguel' },
    { value: 'vendas', label: 'Vendas' },
    { value: 'telefone_internet', label: 'Telefone e Internet' },
    { value: 'seguro', label: 'Seguro' },
    { value: 'impostos', label: 'Impostos' },
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'saude', label: 'Saúde' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'vestuario_acessorios', label: 'Vestuário e Acessórios' },
    { value: 'educacao', label: 'Educação' },
    { value: 'cuidados_pessoais', label: 'Cuidados Pessoais' },
    { value: 'dividas_emprestimos', label: 'Dívidas e Empréstimos' },
    { value: 'investimentos', label: 'Investimentos' },
    { value: 'outros', label: 'Outros' },
  ];

  const bankImages = {
    Nubank: Nubank,
    BB: BB,
    Caixa: Caixa,
    Neon: Neon,
    Next: Next,
    Itau: Itau,
    Bradesco: Bradesco,
    Inter: Inter,
    Outro: Outro
  };

  
  function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = String(dataObj.getFullYear());
    const horas = String(dataObj.getUTCHours()).padStart(2, '0');
    const minutos = String(dataObj.getUTCMinutes()).padStart(2, '0');
  
    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
  }
  
 

  const [options, setOptions] = useState({
    chart: {
      id:"apexchart-example",
      cssClass: "custom-chart-class",
      background: '#fff'
    },
    fill: {
      colors: ['#f26969']
    },
    xaxis:{
      categories: [],
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });;
        }
      },
    },
  })

  const [optionsEntrada, setOptionsEntrada] = useState({
    chart: {
      id:"apexchart-example",
      cssClass: "custom-chart-class",
      background: '#fff',
    },
    fill: {
      colors: ['#77c777']
    },
    xaxis:{
      categoriesEntrada: [],
      labels: {
        formatter: function (value) {
          return value;
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });;
        }
      },
    },
  })
  

  const [series, setSeries] = useState([{
    name: 'Saídas',
    data: []
  }])
  const [seriesEntradas, setSeriesEntradas] = useState([
    {
      name: 'Entradas',
      data: []
    }
  ]);

  function loadGraphSaidaEntrada(){

      const token = localStorage.getItem('token'); // Obter o token do localStorage
      // Aqui você pode atribuir a resposta JSON à variável `responseJson`
          axios.get(`${apiUrl}/extratos/months`,{
            params:{
              startDate: selectedRange[0].startDate?.toISOString().split('T')[0],
              endDate: selectedRange[0].endDate?.toISOString().split('T')[0]
            },
            headers: {
              Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
            },
          })
        .then(response => {
          const extratosPorMes = response.data.extratosPorMes;
          setExtratoByMonth(extratosPorMes);
          
          // Extrair as chaves do objeto e ordená-las em ordem crescente
          const chaves = Object.keys(extratosPorMes).sort();
  
                  // Extrair as chaves do objeto e ordená-las em ordem crescente
                  const chavesEntrada = Object.keys(extratosPorMes).sort();
  
  
          
          // Filtrar as chaves para incluir apenas os meses/anos que possuem extratos do tipo 'saida'
          const filteredChaves = chaves.filter(chave =>
            extratosPorMes[chave].some(extrato => extrato.tipo === 'saida')
          );
  
            // Filtrar as chaves para incluir apenas os meses/anos que possuem extratos do tipo 'saida'
            const filteredChavesEntradas = chavesEntrada.filter(chave =>
              extratosPorMes[chave].some(extrato => extrato.tipo === 'entrada')
            );
  
          // Formatar as chaves filtradas como strings no formato "mês/ano"
          const categories = filteredChaves.map(chave => {
            const [ano, mes] = chave.split('-');
            return `${mes}/${ano}`;
          });
  
  
            // Formatar as chaves filtradas como strings no formato "mês/ano"
            const categoriesEntrada = filteredChavesEntradas.map(chave => {
              const [ano, mes] = chave.split('-');
              return `${mes}/${ano}`;
            });
  
          // Obter a soma dos valores dos arrays de extratos do tipo 'saida' correspondentes a cada chave
          const data = filteredChaves.map(chave => {
            const soma = extratosPorMes[chave]
              .filter(extrato => extrato.tipo === 'saida')
              .reduce((acc, extrato) => acc + extrato.valor, 0);
            return soma;
          });
          
          const dataEntradas = filteredChavesEntradas.map(chave => {
            const soma = extratosPorMes[chave]
              .filter(extrato => extrato.tipo === 'entrada')
              .reduce((acc, extrato) => acc + extrato.valor, 0);
            return soma;
          });
          
  
        
          console.log('data', data)
          // Atualizar o estado
          setOptions(prevOptions => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories
            }
          }));
  
  
          setOptionsEntrada(prevOptions => ({
            ...prevOptions,
            xaxis: {
              ...prevOptions.xaxis,
              categories: categoriesEntrada
            }
          }));
        
  
  
  
  
  
  
          setSeries(prevSeries => [
            {
              ...prevSeries[0],
              data
            }
          ]);
  
  
                
          setSeriesEntradas(prevSeries => [
            {
              ...prevSeries[0],
              data: dataEntradas
            }
          ]);
  
          
        })
        .catch(error => {
          console.log(error);
        });
    
  }


  const handleClose = () => setShow(false);
  const handleCloseDetails = () => setShowDetailsExtrato(false);

  const handleCloseExtrato = () => setShowEntradaExtrato(false);
  const handleShow = () => setShow(true);
  const handleShowEntradaExtrato = (id) => {
    setShowEntradaExtrato(true);
    setId(id)
  }


  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingAll(true);
      await loadContaBancarias();
      await loadExtratos();
      await loadCategories();
      await loadGraphSaidaEntrada();
      setIsLoadingAll(false);
    };
  
    fetchData();
  }, [selectedRange[0].startDate, selectedRange[0].endDate]);
  

  async function loadExtratos(){
    const token = localStorage.getItem('token'); // Obter o token do localStorage


    axios.get(`${apiUrl}/extratos`, {
      params:{
        startDate: selectedRange[0].startDate?.toISOString().split('T')[0],
        endDate: selectedRange[0].endDate?.toISOString().split('T')[0]
      },
      headers: {
        Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
      },
    })
      .then(response => {
        const extratos = response.data.extratos;
        setExtrato(extratos);
      })
      .catch(error => {
        console.log(error);
      });
  }


  async function loadCategories(){

    const token = localStorage.getItem('token'); // Obter o token do localStorage
    axios.get(`${apiUrl}/progresso-categorias`, {
      headers: {
        Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
      },
      params:{
        startDate: selectedRange[0].startDate?.toISOString().split('T')[0],
        endDate: selectedRange[0].endDate?.toISOString().split('T')[0]
      },
    })
      .then(response => {
        const categories = response.data;
        setCategory(categories);
        console.log(categories)
      })
      .catch(error => {
        console.log(error);
      });
  }


  async function loadContaBancarias() {
    try {
        const token = localStorage.getItem('token'); // Obter o token do localStorage
        const response = await axios.get(`${apiUrl}/account/search`, {
          headers: {
            Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
          },
        });
        const userData = response.data;
        setBankData(userData);
      } catch (error) {
        if (error.response.status === 401) {
          // Token inválido, fazer logout
          localStorage.removeItem("token");
          navigate('/login');
        }
        console.log(error);
      }
  }
  

  async function handleDeleteConta(id){
    try {
      const response = await axios.delete(`${apiUrl}/account/${id}`)
      loadContaBancarias();
    }catch(e){
      alert(e)
    }
  }
  
  async function handleSaldo(data) {
    const {nome, saldo} = data;
    const token = localStorage.getItem('token'); // Obter o token do localStorage
  
    try {
      const saldoLimpo = saldo.replace(/\D/g, '');

      const saldoFloat = parseFloat(saldoLimpo); // Converter o saldo para float
      const saldoFormatted = (saldoFloat / 100).toFixed(2); // Formatar o saldo com duas casas decimais e converter para reais
      const saldoNumber = Number(saldoFormatted); // Converter o saldo formatado para number
  
  
      const response = await axios.post(
        `${apiUrl}/account`,
        {
          nome,
          saldo: saldoNumber, // Passar o saldo como number na requisição
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
          },
        }
      );
  
      setShow(false);
      loadContaBancarias();
      setValue2('saldo', '');
      setValue2('nome', '');
    } catch (error) {
      console.log(error);
      // Tratar o erro de acordo com a necessidade
    }
  }
  

  function handleLogout (){
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
  

  async function handleEntradaExtrato(){


    const saldoLimpo = valor.replace(/\D/g, '');

    const saldoFloat = parseFloat(saldoLimpo); // Converter o saldo para float
    const saldoFormatted = (saldoFloat / 100).toFixed(2); // Formatar o saldo com duas casas decimais e converter para reais
    const saldoNumber = Number(saldoFormatted); // Converter o saldo formatado para number

    console.log(id)

    setIsLoadingExtrato(true)
    const response = await axios.post(`${apiUrl}/account/${id}/extrato`, {
   
        descricao,
        categoria,
        valor: saldoNumber,
        tipo,
      
    })
    setIsLoadingExtrato(false)

    setDescricao('')
    setValor('')
    setTipo('')
    
    setShowEntradaExtrato(false)
    loadContaBancarias()
    loadExtratos()
    loadCategories()
    loadGraphSaidaEntrada()
    
  }

    // Função de callback para atualizar o endpoint do componente pai
    const updateEndpoint = () => {
      // Faça a chamada para o endpoint do componente pai aqui
      // Atualize o estado com os novos dados recebidos
      loadCategories()
    };
  

  function openDetailsExtrato (data){
    console.log(data)
    setDescricaoDetails(data.descricao)
    setShowDetailsExtrato(true)
  }

  function changeToCurrency(event){
    const {name, value} = event.target;
    // Remove todos os caracteres que não sejam dígitos
    const valorFormatado = value.replace(/\D/g, '');

    // Adiciona a vírgula somente quando o terceiro dígito é digitado
    let valorComPonto = '';
    if (valorFormatado.length >= 3) {
      const valorInteiro = valorFormatado.slice(0, -2);
      const valorDecimal = valorFormatado.slice(-2);
      valorComPonto = valorInteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + valorDecimal;
    } else {
      valorComPonto = valorFormatado;
    }

    setValor(valorComPonto);
  }



    const handleChangeCurrency2 = (event) => {
    const { name, value } = event.target;
    // Remove todos os caracteres que não sejam dígitos
    const valorFormatado = value.replace(/\D/g, '');
     
    // Adiciona a vírgula somente quando o terceiro dígito é digitado
    let valorComPonto = '';
    if (valorFormatado.length >= 3) {
      const valorInteiro = valorFormatado.slice(0, -2);
      const valorDecimal = valorFormatado.slice(-2);
      valorComPonto = valorInteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + valorDecimal;
    } else {
      valorComPonto = valorFormatado;
    }
    console.log('dd', valorComPonto)
    setValueForm2(name, valorComPonto);
  };

  return (
    <MainContainer>
    <Container fluid className=''>
      <Row>
 
          <SlideProgressBar data={category} updateEndpoint={updateEndpoint} isMenuOpen={isMenuOpen} openMenu={openMenu} closeMenu={closeMenu}/>
  
        <Col className='m-0 main-box'>





          <Row>
          <div className='header-main' style={{alignItems:'center'}}>
            <div>
               <h2>Controle Financeiro Pessoal</h2>
               
               <Button variant="primary" className='btn bg-gradient-dark' onClick={handleShow}>
               <PlusCircle size={28} color="#999" weight="light" /> Criar Conta
              </Button>
            </div>

            <div class="btn-group">
              <button class="btn-calendar dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
              <Calendar size={28} color="#999" weight="light" />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuClickableInside">
                        <DateRangePicker
                          locale={ptBR}
                          moveRangeOnFirstSelection={false}
                          editableDateInputs={true}
                          ranges={selectedRange}
                          onChange={item => setSelectedRange([item.selection])}/>

              </div>
              <button className='btn-logout' onClick={()=> handleLogout()}>Sair</button>
            </div>
          </div>
          <h6>{selectedRange[0].startDate.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric'})} - {selectedRange[0].endDate.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric'})}</h6>
          </Row>
          

            <div className="row">
          {isLoadingAll ? 
          (
            <div className='dashboard-loading-box'>
                <div class="custom-loader"></div>
            </div>
          ):
          (
            <>
            <div className="col-lg-8">
            <div className="row">
              <div className="col-xl-6 mb-xl-0 mb-4">


                <div className="card bg-transparent shadow-xl">
                  <div className="overflow-hidden position-relative border-radius-xl">
                    <img src={LogoPattern} className="position-absolute opacity-2 start-0 top-0 w-100 z-index-1 h-100" alt="pattern-tree" />
                    <span className="mask bg-gradient-dark opacity-10"></span>
                    <div className="card-body position-relative z-index-1 p-3">
                      <i className="material-icons text-white p-2">Bem vindo, {localStorage.getItem('name')}</i>
                      <h5 className="text-white mt-4 mb-5 pb-2">{localStorage.getItem('email')}</h5>
                      <div className="d-flex">
                        <div className="d-flex">
                          <div className="me-4">
                            <p className="text-white text-sm opacity-8 mb-0">Nome</p>
                            <h6 className="text-white mb-0">{localStorage.getItem('name')}</h6>
                          </div>
                          <div>
                            {/* <p className="text-white text-sm opacity-8 mb-0">Expires</p>
                            <h6 className="text-white mb-0">11/22</h6> */}
                          </div>
                        </div>
                        <div className="ms-auto w-20 d-flex align-items-end justify-content-end cardlist">
                          {/* <img className="w-60 mt-2" src={LogoMaster} alt="logo" /> */}
                          {bankData?.search?.map((bank) => (
                            <img src={bankImages[bank.nome]} alt={bank.nome} key={bank.nome} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="row card-account-bank">


                {bankData?.search?.map((item) => {
                  return(
                  <div className="col-md-6 col-6">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center">
                      {/* <button onClick={() => handleDeleteConta(item.id)}><i class="material-icons opacity-10">delete</i></button> */}
                      <button onClick={() => handleShowEntradaExtrato(item.id)}><PlusCircle size={28} color="#999" weight="light" /></button>
                        <div className="icon icon-shape icon-lg shadow text-center border-radius-lg card-bank-account ">
                          {item.nome === "Nubank" && <img src={Nubank} alt="Nubank" />}
                          {item.nome === "BB" && <img src={BB} alt="BB" />}
                          {item.nome === "Caixa" && <img src={Caixa} alt="Caixa" />}
                          {item.nome === "Neon" && <img src={Neon} alt="Neon" />}
                          {item.nome === "Next" && <img src={Next} alt="Next" />}
                          {item.nome === "Itau" && <img src={Itau} alt="Itau" />}
                          {item.nome === "Bradesco" && <img src={Bradesco} alt="Bradesco" />}
                          {item.nome === "Inter" && <img src={Inter} alt="Inter" />}
                          {item.nome === "Outro" && <Bank size={28} color="#000" weight="light" />}
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center">
                        <h6 className="text-center mb-0">{item.nome}</h6>
                        <span className="text-xs">Belong Interactive</span>
                        <hr className="horizontal dark my-3" />
                        <h5 className="mb-0" style={{color: item.saldo >= 0 ? '#77c777' : '#f26969'}}>{item?.saldo?.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</h5>
                      </div>
                    </div>
                  </div>
                    )
                  })}
                </div>
              </div>



              <div className="col-md-12 mb-lg-0 mb-4">
                <div className="card mt-4">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between" onClick={openMenu} style={{cursor:'pointer'}}>
                        <h6 className="mb-0"  style={{color: '#f26969'}}>Clique para adicionar quanto você planeja gastar em cada categoria.<br /></h6>
                        <Gear size={30} color='#999' weight='light'   />
                      </div>
                      <div className="col-6 text-end">

                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <div className="row">
                          <ProgressBar data={category} />
                    </div>
                    <span style={{fontSize:"12px", color:"#999"}}>Isso ajudará a acompanhar seu progresso e comparar com seus gastos reais.</span>
                  </div>
                </div>
              </div>







              <div className="col-md-12 mb-lg-0 mb-4">
                <div className="card mt-4">
                  <div className="card-header pb-0 p-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <h6 className="mb-0"  style={{color: '#f26969'}}>Despesas por Categorias</h6>
                      </div>
                      <div className="col-6 text-end">

                      </div>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <div className="row">

                      <Chart
                        options={optionsCategoria}
                        series={seriesCategoria}
                        type="bar"
                        height={350}
                      />
                    </div>
                  </div>
                </div>
              </div>


            <div className='col-md-12 test mt-4'>
              <div className='card'>
                  <div className='card-header pb-0 p-3'></div>
                  <div className='card-body'  style={{overflow:'auto'}}>
                    <div className='row'>
                      <div className='col-md-6'>
                        <div className=''>
                            <h6 class="mb-0" style={{color: '#f26969'}}>Saídas</h6>
                        </div>
                      <Chart options={options} series={series} type="bar" width={500} height={320} />
                      </div>
                      <div className='col-md-6'>
                        <div className=''>
                            <h6 class="mb-0" style={{color:'#77c777'}}>Entradas</h6>
                        </div>
                        <Chart options={optionsEntrada} series={seriesEntradas} type="bar" width={500} height={320} />
                      </div>
                    </div>
                  </div>
              </div>
          </div>

            </div>


              </div>
              <div className="col-lg-4">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="mb-0">Extrato</h6>
                  </div>
                  <div className="col-6 text-end">
                    {/* <button className="btn btn-outline-primary btn-sm mb-0">View All</button> */}
                  </div>
                </div>
              </div>
              <div className="card-body p-3 pb-0">
                <ul className="list-group">

                  {isLoadingExtrato ?
                   (
                    <div className='dashboard-loading-box'>
                      <div class="custom-loader"></div>
                  </div>
                   ):
                   (
                  <>
                    {extrato.map((item) => {
                      return(
                            
                            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                              <div className='item-icon-date'>
                              {item.tipo === 'entrada' ? 
                                (<>
                                  <ArrowCircleUp size={22} color="#4caf50" />
                                </>) :
                                (<>
                                  <ArrowCircleDown size={22} color="#f44336" />
                                </>)} 
                                <div className="d-flex flex-column">
                                  <h6 className="mb-1 text-dark font-weight-bold text-sm"><span>{item.contaBancaria.nome}</span> - <span>{formatarData(item.data)}</span></h6>
                                  <span className="text-xs" style={{textTransform:'capitalize'}}>{item.categoria}</span>
                                </div>
                              </div>
                              <div className="d-flex align-items-center text-sm text-bold" style={{color: item.tipo === 'entrada' ? '#77c777' : 'red'}}>
                                {item?.valor?.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
                                <button className="btn btn-link text-dark text-sm mb-0 px-0 ms-4" onClick={() => openDetailsExtrato(item)}><Eye size={20} color="#999" weight="light" /></button>
                              </div>
                            </li>
                      )
                    })}
                  </>
                   )}


                </ul>
              </div>
            </div>
              </div>
              </>
          )
          }
          </div>

        

        </Col>
      </Row>
      
    </Container>




    <Modal
        show={showDetailsExtrato}
        onHide={handleCloseDetails}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Row>
                <p>Descrição: {descricaoDetails}</p>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          
        </Modal.Footer>
      </Modal>











    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar Conta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Row>
                <form onSubmit={handleSubmitForm2(handleSaldo)}>
                  <label htmlFor='seu-banco'>Contas</label>
                  <select 
                  name="nome"
                  id="seu-banco"
                  className='form-control'
                  {...registerForm2("nome", {
                    required: "Conta Obrigatória",
                  })}>
                    <option value="">Selecione</option>
                    <option value="Nubank">Nubank</option>
                    <option value="BB">BB</option>
                    <option value="Bradesco">Bradesco</option>
                    <option value="Caixa">Caixa</option>
                    <option value="Neon">Neon</option>
                    <option value="Inter">Inter</option>
                    <option value="Next">Next</option>
                    <option value="Itau">Itau</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errorsForm2.nome && <span  className="msgs-error-validate">{errorsForm2.nome.message}</span> }
                  <br/>
                  <label htmlFor='seu-valor'>Valor incial (opcional)</label>
                  <input type="text" 
                  id="seu-valor" 
                  className='form-control' 
                  placeholder='Insira um valor incial'
                  name="saldo"
                                      {...registerForm2("saldo", {
                                        required: "Insira um valor",
                                        onChange: (e) => {handleChangeCurrency2(e)}
                                      })}/>
                                      {errorsForm2.saldo && <span  className="msgs-error-validate">{errorsForm2.saldo.message}</span> }
                  <br/>
                  <Button className='custom-send-btn' type="submit">Cadastrar</Button>
                </form>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          
        </Modal.Footer>
      </Modal>



      <Modal
        show={showEntradaExtrato}
        onHide={handleCloseExtrato}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Inserir movimentação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Row>
                <form>
                  <label htmlFor='seu-valor'>Valor</label>
                  <input type="text" id="seu-banco" className='form-control' placeholder='Insira o valor' name="valor" value={valor} onChange={(e) => changeToCurrency(e)}/>
                  <br/>

                  <label htmlFor='seu-tipo'>Tipo</label>
                  <select  className='form-control'  value={tipo} onChange={(e) => setTipo(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </select>
                  <br/>


                  <div>
                  <label htmlFor="category-select">Selecione a categoria:</label>
                  <select id="category-select" className='form-control' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <br/>

                  <label htmlFor='seu-descricao'>Descrição</label>
                  <input type="text" id="seu-descricao" className='form-control' placeholder='Descrição'  value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                  <br/>

                  <Button onClick={handleEntradaExtrato}>Adicionar</Button>
                </form>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          
        </Modal.Footer>
      </Modal>
    </MainContainer>
  )
}

export default Dashboard
