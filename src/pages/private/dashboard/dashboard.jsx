import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {Container, Row, Col, Stack, Modal, Button, Nav, Navbar, NavDropdown} from 'react-bootstrap'


import axios from 'axios';
import '../../../App.css'

import { MainContainer } from '../../../MainContainer';
import { Calendar, PlusCircle, Eye, Bank, ArrowCircleUp, ArrowCircleDown, Gear, ArrowsCounterClockwise} from "@phosphor-icons/react";

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
import Santander from '../../../assets/img/santander.jpg'
import wireframe from '../../../assets/img/p2.png'

import movimentacao1 from '../../../assets/img/mov-1.jpg'
import movimentacao2 from '../../../assets/img/mov-11.jpg'


import Chart from "react-apexcharts";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Importe o arquivo de estilos
import 'react-date-range/dist/theme/default.css'; // Importe o tema padrão
import ptBR from "date-fns/locale/pt-BR"; // the locale you want

import {useForm} from 'react-hook-form'
import apiUrl from '../../../service/apiUrl'
import ModalExtrato from '../../../Components/ModalExtrato';

import Swal from 'sweetalert2'


import Menu from '../../../Components/Menu';

function Dashboard() {
 

  const [showModal, setShowModal] = useState(false);
  const [extratoData, setExtratoData] = useState();
  const [extratoId, setExtratoId] = useState();
  const [isLoadingSubmitExtrato, setIsLoadingSubmitExtrato] = useState(false);



  const [allExtrato, setAllExtrato] = useState();
  
  const handleOpenModal = (data) => {
    setExtratoData(data)
    setDescricaoDetails(data.descricao)
    setCategoriaExtrato(data.categoria)
    setShowModal(true);
  };
  const {
    register:registerForm2,
    setValue:setValue2,
    handleSubmit: handleSubmitForm2,
    formState: { errors:errorsForm2 },
    setValue: setValueForm2,
  } = useForm();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
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
  // const [tipo, setTipo] = useState('');
  const [id, setId] = useState('');
  const [contaBancaria, setContaBancaria] = useState('');
  const [extratoByMonth, setExtratoByMonth] = useState();

  const [graficoCategoria, setGraficoCategoria] = useState([]);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  
  const [descricaoDetails, setDescricaoDetails] = useState('')
  const [categoriaExtrato, setCategoriaExtrato] = useState('')

  const [category, setCategory] = useState([])


  const dataAtual = new Date();

  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const [saldoPositivo, setSaldoPositivo] = useState(0);
  const [saldoNegativo, setSaldoNegativo] = useState(0);
  const [saldoTotal, setSaldoTotal] = useState(0);
  const tipo = watch('tipo');

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

    allExtrato?.forEach((objeto) => {
      const { categoria, valor, tipo } = objeto;

      if(tipo !== 'despesa'){
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
      //nome das categorias despesas por categoria
      categoria: categoriesNames[categoria],
      total,
    }));

    setDadosGrafico(novoDadosGrafico);
  }, [allExtrato]);
 

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

  const categoriesNames = {
    'salario': 'Salário',
    'renda_extra': 'Renda Extra',
    'cartao': 'Cartão de Crédito',
    'aluguel': 'Aluguel',
    'vendas': 'Vendas',
    'telefone_internet': 'Telefone e Internet',
    'seguro':'Seguro',
    'impostos': 'Impostos',
    'alimentacao': 'Alimentação',
    'transporte': 'Transporte',
    'saude': 'Saúde',
    'lazer': 'Lazer',
    'vestuario_acessorios':'Vestuário e Acessórios',
    'educacao':'Educação',
    'cuidados_pessoais': 'Cuidados Pessoais',
    'dividas_emprestimos': 'Dívidas e Empréstimos',
    'investimentos':'Investimentos',
    'outros':'Outros',
    'extra':'Extra'
  }

  const categoriesDespesasNames = {
    'cartao': 'Cartão de Crédito',
    'aluguel': 'Aluguel',
    'telefone_internet': 'Telefone e Internet',
    'seguro':'Seguro',
    'impostos': 'Impostos',
    'alimentacao': 'Alimentação',
    'transporte': 'Transporte',
    'saude': 'Saúde',
    'lazer': 'Lazer',
    'vestuario_acessorios':'Vestuário e Acessórios',
    'educacao':'Educação',
    'cuidados_pessoais': 'Cuidados Pessoais',
    'dividas_emprestimos': 'Dívidas e Empréstimos',
    'investimentos':'Investimentos',
    'outros':'Outros'
  }
  const categoriesReceitasNames = {
    'salario': 'Salário',
    'renda_extra': 'Renda Extra',
    'extra':'Extra'
  }

  const bankImages = {
    Nubank: Nubank,
    BB: BB,
    Caixa: Caixa,
    Neon: Neon,
    Next: Next,
    Itau: Itau,
    Bradesco: Bradesco,
    Inter: Inter,
    Outro: Outro,
    Santander: Santander
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
    name: 'Despesas',
    data: []
  }])
  const [seriesEntradas, setSeriesEntradas] = useState([
    {
      name: 'Receitas',
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
            extratosPorMes[chave].some(extrato => extrato.tipo === 'despesa')
          );
  
            // Filtrar as chaves para incluir apenas os meses/anos que possuem extratos do tipo 'saida'
            const filteredChavesEntradas = chavesEntrada.filter(chave =>
              extratosPorMes[chave].some(extrato => extrato.tipo === 'receita')
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
              .filter(extrato => extrato.tipo === 'despesa')
              .reduce((acc, extrato) => acc + extrato.valor, 0);
            return soma;
          });
          
          const dataEntradas = filteredChavesEntradas.map(chave => {
            const soma = extratosPorMes[chave]
              .filter(extrato => extrato.tipo === 'receita')
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

  const handleShowEntradaExtrato = (id, extratoId) => {
    setShowEntradaExtrato(true);
    setId(id)
    setExtratoId(extratoId)
    console.log("teste id extrato", extratoId)
    if(extratoId){
      setValue('valor', extratoData?.valor?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
      setValue('tipo', extratoData?.tipo);
      setValue('categoria', extratoData?.categoria);
      setValue('descricao', extratoData?.descricao);
    }else {
      setValue('valor', '');
      setValue('tipo', '');
      setValue('categoria', '');
      setValue('descricao', '');
    }
  }

  useEffect(() => {
    if (bankData) {
      totalSaldos();
    }
  }, [bankData]);


  async function totalSaldos() {
    let saldoPositivoTotal = 0;
    let saldoNegativoTotal = 0;

    if (bankData && bankData?.search) {
      bankData?.search?.forEach(item => {
        const saldo = item.saldo;
        if (saldo > 0) {
          saldoPositivoTotal += saldo;
        } else if (saldo < 0) {
          saldoNegativoTotal += saldo;
        }
      });
    }

    const saldoTotal = saldoPositivoTotal + saldoNegativoTotal;

    setSaldoPositivo(saldoPositivoTotal);
    setSaldoNegativo(saldoNegativoTotal);
    setSaldoTotal(saldoTotal);
  }




  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingAll(true);
      await loadContaBancarias();
      await loadExtratos();
      await loadAllExtratos();
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

  async function loadAllExtratos(){
    const token = localStorage.getItem('token'); // Obter o token do localStorage


    axios.get(`${apiUrl}/extratos/all`, {
      params:{
        startDate: selectedRange[0].startDate?.toISOString().split('T')[0],
        endDate: selectedRange[0].endDate?.toISOString().split('T')[0]
      },
      headers: {
        Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
      },
    })
      .then(response => {
        const allextratos = response.data.extratos;
        setAllExtrato(allextratos);
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
  
  async function handleEntradaExtrato(data) {
    const { valor, tipo, categoria, descricao } = data;
  
    const saldoLimpo = valor.replace(/\D/g, '');
    const saldoFloat = parseFloat(saldoLimpo);
    const saldoFormatted = (saldoFloat / 100).toFixed(2);
    const saldoNumber = Number(saldoFormatted);
  
    setIsLoadingExtrato(true);
    
    if (extratoId != undefined || extratoId != null) {
      // Editar
      const response = await axios.put(`${apiUrl}/account/${id}/extrato/${extratoId}`, {
        descricao,
        categoria,
        valor: saldoNumber,
        tipo,
      });
  
      // Preencher os campos com os valores atualizados
      setValue('valor', saldoNumber);
      setValue('tipo', tipo);
      setValue('categoria', categoria);
      setValue('descricao', descricao);
    } else {
      // Criar
      const response = await axios.post(`${apiUrl}/account/${id}/extrato`, {
        descricao,
        categoria,
        valor: saldoNumber,
        tipo,
      });
    }
  
    setIsLoadingExtrato(false);
  
    setShowEntradaExtrato(false);
    setShowModal(false)
    loadContaBancarias();
    loadExtratos();
    loadAllExtratos()
    loadCategories();
    loadGraphSaidaEntrada();
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
    setCategoriaExtrato(data.categoria)
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

    setValue(name, valorComPonto);
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


  async function deleteExtrato(id){
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${apiUrl}/api/extratos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
        }
      })
    } catch(e) {
      console.log(e)
    }

    loadContaBancarias();
    loadExtratos();
    loadAllExtratos();
    loadCategories();
    loadGraphSaidaEntrada();
  }

  function openMOdalDeleteExtrato(id){
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não será capaz de reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar!',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deletado!',
          'Seu lançamento foi excluido.',
          'success'
        )
        deleteExtrato(id)
        setShowModal(false)
      }
    })
  }





  return (

    <MainContainer>
          <Menu />
          <SlideProgressBar data={category} updateEndpoint={updateEndpoint} isMenuOpen={isMenuOpen} openMenu={openMenu} closeMenu={closeMenu}/>
    <Container>
      <Row>

        <Col className='m-0 main-box'>
          <Row>
          <div className='header-main' style={{alignItems:'center'}}>
            <div>
               
               
               <button variant="primary" className='btn-create-account' style={{marginBottom:'15px'}} onClick={handleShow}>
               {/* <PlusCircle size={28} color="#fff" weight="light" />  */}
               Criar Conta
              </button>
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
              {/* <button className='btn-logout' onClick={()=> handleLogout()}>Sair</button> */}
            </div>
          </div>
          <h6 className='range-date-text'>{selectedRange[0].startDate.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric'})} - {selectedRange[0].endDate.toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric'})}</h6>
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
                      <p className="text-white text-sm opacity-8 mb-0">Bem vindo,</p>
                      <h6 className="text-white mb-0">{localStorage.getItem('name')}</h6>

                      <h6 className="text-white mt-1 mb-5 pb-2" style={{fontSize:'12px'}}>{localStorage.getItem('email')}</h6>
                      <div className="d-flex">
                        <div className="d-flex">
                          <div className="me-4">
                            <p className="text-white text-sm opacity-8 mb-0">Saldo em contas</p>
                            <div className='saldos-card-total'>
                              <div className='total-item'>
                                <span>Positivas</span>
                                <span className="mb-0 text-green">{saldoPositivo.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</span>
                              </div>
                              <div className='total-item'>
                                <span>Negativas</span>
                                <span className="mb-0 text-red">{saldoNegativo.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</span>
                              </div>
                              <div className='total-item'>
                                <span>Positivas x Negativas</span>
                                <span className="text-white mb-0 text-white">{saldoTotal.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}</span>
                              </div>
                            </div>
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

                {bankData?.search?.length < 1 &&
                 (
                 <div className='empty-account'>
                  <span className='create-account-box-2'>Crie sua primeira conta.</span>
                    <button variant="primary" className='btn-create-account' onClick={handleShow}>
                      <PlusCircle size={28} color="#fff" weight="light" /> Criar Conta
                  </button>
                 </div> 
                 )
                 }
                {bankData?.search?.map((item) => {
                  return(
                  <div className="col-md-6 col-6">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center">
                      {/* <button onClick={() => handleDeleteConta(item.id)}><i class="material-icons opacity-10">delete</i></button> */}
                      <button onClick={() => handleShowEntradaExtrato(item.id)}>
                        {/* <img className='mov-icon' src={movimentacao2} /> */}
                        <ArrowsCounterClockwise size={25} color="#999" weight="light" />
                      </button>
                        <div className="icon icon-shape icon-lg shadow text-center border-radius-lg card-bank-account ">
                          {item.nome === "Nubank" && <img src={Nubank} alt="Nubank" />}
                          {item.nome === "BB" && <img src={BB} alt="BB" />}
                          {item.nome === "Caixa" && <img src={Caixa} alt="Caixa" />}
                          {item.nome === "Neon" && <img src={Neon} alt="Neon" />}
                          {item.nome === "Next" && <img src={Next} alt="Next" />}
                          {item.nome === "Itau" && <img src={Itau} alt="Itau" />}
                          {item.nome === "Bradesco" && <img src={Bradesco} alt="Bradesco" />}
                          {item.nome === "Santander" && <img src={Santander} alt="Santander" />}
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




            </div>


              </div>
              <div className="col-lg-4 column-extrato">
            <div className="card h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-6 d-flex align-items-center">
                    <h6 className="mb-0">Últimos lançamentos</h6>
                  </div>
                  <div className="col-6 text-end">
                    <a href="/lancamentos" className="link-see-all">Ver todos</a>
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
                    {extrato.length < 1 && <span style={{color:'#999', fontSize:'13px'}}>Sem dados no período selecionado ou sem registros até o momento.</span>}
                    {extrato.map((item) => {
                      return(
                            
                            <li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" onClick={()=> handleOpenModal(item)}>
                              <div className='item-icon-date'>
                              {/* {item.tipo === 'receita' ? 
                                (<>
                                  <ArrowCircleUp size={35} color="#4caf50" weight='light' />
                                </>) :
                                (<>
                                  <ArrowCircleDown size={35} color="#EF5350"  weight='light' />
                                </>)}  */}
                                <img src={bankImages[item.contaBancaria.nome]} alt={item.contaBancaria.nome} key={item.contaBancaria.nome} />
                                <div className="d-flex flex-column">
                                  <div>
                                    
                                  <span className='text-xs text-desc-cat'>{categoriesNames[item.categoria]}</span> <span className='text-xs text-desc-cat'>{item?.descricao && ` - ${item.descricao}`}</span>
                                  </div>
                              
                                  {/* <h6 className="mb-1 text-dark font-weight-bold text-sm"><span>{item.contaBancaria.nome}</span></h6> */}
                                  <span className='extrato-data'>{formatarData(item.data)}</span>
                                  {/* <span className="text-xs" style={{textTransform:'capitalize'}}>{item.categoria}</span> */}
                                </div>
                              </div>
                              <div className="d-flex align-items-center text-sm text-bold" style={{color: item.tipo === 'receita' ? '#77c777' : '#EF5350'}}>
                                {item?.valor?.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
                                {/* <button className="btn btn-link text-dark text-sm mb-0 px-0 ms-4" onClick={() => openDetailsExtrato(item)}><Eye size={20} color="#999" weight="light" /></button> */}
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

          <div className='col-md-12 test mt-4'>
              <div className='card'>
                  <div className='card-header pb-0 p-3'></div>
                  <div className='card-body'>
                    <div className='row'>
                      <div className='col-md-6' style={{overflow:'auto'}}>
                        <div className=''>
                            <h6 class="mb-0" style={{color: '#f26969'}}>Despesas</h6>
                        </div>
                      <Chart options={options} series={series} type="bar" width={500} height={320} />
                      </div>
                      <div className='col-md-6' style={{overflow:'auto'}}>
                        <div className=''>
                            <h6 class="mb-0" style={{color:'#77c777'}}>Receitas</h6>
                        </div>
                        <Chart options={optionsEntrada} series={seriesEntradas} type="bar" width={500} height={320} />
                      </div>
                    </div>
                  </div>
              </div>
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
                <p>Categoria: {categoriesNames[categoriaExtrato]}</p>
              </Row>
        </Modal.Body>
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
                    required: "Conta obrigatória",
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
                    <option value="Santander">Santander</option>
                    <option value="Outro">Outro</option>
                  </select>
                  {errorsForm2.nome && <span  className="msgs-error-validate">{errorsForm2.nome.message}</span> }
                  <br/>
                  <label htmlFor='seu-valor'>Valor incial</label>
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
                  <button className='btn-create-account' type="submit" style={{marginTop:'15px'}}>Cadastrar</button>
                </form>
              </Row>
        </Modal.Body>
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
                <form onSubmit={handleSubmit(handleEntradaExtrato)}>
                  <label htmlFor='seu-valor'>Valor</label>
                  <input type="text" 
                  id="valor" 
                  className='form-control' 
                  placeholder='Insira o valor' 
                  name="valor"              
                  {...register("valor", {
                    required: "Insira um valor",
                    onChange: (e) => {changeToCurrency(e)}
                  })}/>
                  {errors.valor && <span  className="msgs-error-validate">{errors.valor.message}</span> }
                  <br/>

                  <label htmlFor='seu-tipo'>Tipo</label>
                  <select  className='form-control'
                    {...register("tipo", {
                      required: "Campo obrigatório",
                    })}>
                    <option value="">Selecione</option>
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                  {errors.tipo && <span  className="msgs-error-validate">{errors.tipo.message}</span> }
                  <br/>


                  <div>
                  <label htmlFor="category-select">Selecione a categoria:</label>
                  <select
                  id='category-select'
                  className='form-control'
                  {...register('categoria', {
                    required: 'Campo obrigatório',
                  })}
                >
                  <option value=''>Selecione uma categoria</option>
                  {tipo === 'receita'
                    ? Object.keys(categoriesReceitasNames).map((category) => (
                        <option key={category} value={category}>
                          {categoriesReceitasNames[category]}
                        </option>
                      ))
                    : tipo === 'despesa'
                    ? Object.keys(categoriesDespesasNames).map((category) => (
                        <option key={category} value={category}>
                          {categoriesDespesasNames[category]}
                        </option>
                      ))
                    : null}
                </select>
                </div>
                {errors.categoria && <span  className="msgs-error-validate">{errors.categoria.message}</span> }
                <br/>

                  <label htmlFor='seu-descricao'>Descrição</label>
                  <input type="text" id="seu-descricao" className='form-control' placeholder='Descrição'
                  {...register("descricao", {
                  })}
                  />
                  {errors.descricao && <span  className="msgs-error-validate">{errors.descricao.message}</span> }
                  <br/>

                  <button 
                  type="submit" 
                  style={{width:'100%'}}
                  className='btn-create-account'>{isLoadingExtrato ? <div><span>Salvar</span> <div class="custom-loader" style={{bottom:'10px'}}></div></div> : <span>Salvar</span> }</button>
                </form>
              </Row>
        </Modal.Body>
      </Modal>
      <ModalExtrato 
      showModal={showModal} 
      setShowModal={setShowModal} 
      imageBank={extratoData?.contaBancaria?.nome} 
      titleExtrato={categoriesNames[extratoData?.categoria]}>
        <span>Descrição: {extratoData?.descricao}</span>
        <span>Categoria: {categoriesNames[categoriaExtrato]}</span>
        <span>Data/Hora: {formatarData(extratoData?.data)}</span>
        <div className="d-flex align-items-center text-sm text-bold" style={{color: extratoData?.tipo === 'receita' ? '#77c777' : '#EF5350'}}>
        {extratoData?.valor?.toLocaleString('pt-BR', {style: 'currency',currency: 'BRL'})}
        </div>
        <button  className='btn-create-account' style={{margin:'10px 10px 0px 0px'}} onClick={() => handleShowEntradaExtrato(extratoData.contaBancariaId, extratoData?.id)}>Editar</button>
        <button  className='btn-create-account delete-account' style={{margin:'10px 0'}} onClick={() => openMOdalDeleteExtrato(extratoData?.id)}>Deletar</button>
      </ModalExtrato>
    </MainContainer>
  )
}

export default Dashboard
