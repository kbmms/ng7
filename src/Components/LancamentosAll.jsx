import { useEffect, useState } from "react";
import ModalExtrato from "./ModalExtrato";
import {useForm} from 'react-hook-form'
import apiUrl from '../service/apiUrl'
import axios from 'axios';
import Swal from 'sweetalert2'
import {Container, Row, Col, Stack, Modal, Button, Nav, Navbar, NavDropdown} from 'react-bootstrap'
import Pagination from 'react-js-pagination'

import LogoPattern from '../assets/img/pattern-tree.svg'
import Nubank from '../assets/img/nubank.png'
import BB from '../assets/img/bb.png'
import Bradesco from '../assets/img/bradesco.png'
import Inter from '../assets/img/intermedium.png'
import Itau from '../assets/img/itau.png'
import Neon from '../assets/img/neon.png'
import Next from '../assets/img/next.png'
import Caixa from '../assets/img/caixa.png'
import Outro from '../assets/img/outro.png'
import Santander from '../assets/img/santander.jpg'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Importe o arquivo de estilos
import 'react-date-range/dist/theme/default.css'; // Importe o tema padrão
import ptBR from "date-fns/locale/pt-BR"; // the locale you want

import { Calendar } from "@phosphor-icons/react";

export default function LancamentosAll(){
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
        } = useForm();
        const tipo = watch('tipo');

    const [showModal, setShowModal] = useState(false);
    const [extrato, setExtrato] = useState();
    const [isLoadingExtrato, setIsLoadingExtrato] = useState(false);
    const [extratoData, setExtratoData] = useState()
    const [descricaoDetails, setDescricaoDetails] = useState('')
    const [categoriaExtrato, setCategoriaExtrato] = useState('')
    const [showEntradaExtrato, setShowEntradaExtrato] = useState(false);
    const [showDetailsExtrato, setShowDetailsExtrato] = useState(false);
    const [isLoadingAll, setIsLoadingAll] = useState(false);
    const [extratoId, setExtratoId] = useState();
    const [id, setId] = useState('');
    const [pageInfos, setPageInfos] = useState();
    const [page, setPage] = useState (1)
    const dataAtual = new Date();

    const [selectedRange, setSelectedRange] = useState([
      {
        startDate: new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1),
        endDate: new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0),
        key: 'selection'
      }
    ]);

    const handleCloseExtrato = () => setShowEntradaExtrato(false);

    useEffect(() => {
      const fetchData = async () => {

        await loadExtratos(page);

      };
    
      fetchData();
    }, [selectedRange[0].startDate, selectedRange[0].endDate]);

    async function loadExtratos(page){
        const token = localStorage.getItem('token'); // Obter o token do localStorage
    
        setIsLoadingAll(true)
       const response = await axios.get(`${apiUrl}/extratos`, {
          params:{
            startDate: selectedRange[0].startDate?.toISOString().split('T')[0],
            endDate: selectedRange[0].endDate?.toISOString().split('T')[0],
            page: page
          },
          headers: {
            Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
          },
        })
          .then(response => {
            const extratos = response.data.extratos;
            const pageinfo = response.data.pageInfo;
            setExtrato(extratos);
            setPageInfos(pageinfo)
          })
          .catch(error => {
            console.log(error);
            setIsLoadingAll(false)
          });
          setIsLoadingAll(false)
      }



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


      const handleOpenModal = (data) => {
        setExtratoData(data)
        setDescricaoDetails(data.descricao)
        setCategoriaExtrato(data.categoria)
        setShowModal(true);
      };


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
        setShowModal(false);
        setShowEntradaExtrato(false);
        loadExtratos(page);
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
    
      function formatarData(data) {
        const dataObj = new Date(data);
        const dia = String(dataObj.getDate()).padStart(2, '0');
        const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
        const ano = String(dataObj.getFullYear());
        const horas = String(dataObj.getUTCHours()).padStart(2, '0');
        const minutos = String(dataObj.getUTCMinutes()).padStart(2, '0');
      
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      }

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
    
        loadExtratos(page);

      }


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
        'outros':'Outros'
      }
      const categoriesReceitasNames = {
        'salario': 'Salário',
        'renda_extra': 'Renda Extra',
        'extra':'Extra'
      }


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
        Outro: Outro,
        Santander: Santander
      };
      

    return(
          <>
          <div class="btn-group pt-5">
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
        </div>
          {isLoadingAll ? 
          (<>
            <div className='dashboard-loading-box'>
              <div class="custom-loader"></div>
          </div>
          </>) : 
          (<>        

              <div className="col-lg-12 pt-3 pb-5 column-extrato">
              <div className="card h-100">
              <div className="card-header pb-0 p-3">
                  <div className="row">
                  <div className="col-6 d-flex align-items-center">
                      <h6 className="mb-0">Lançamentos</h6>
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
                      {extrato?.length < 1 && <span style={{color:'#999', fontSize:'13px', padding:'10px 0'}}>Sem dados no período selecionado ou sem registros até o momento.</span>}
                      {extrato?.map((item) => {
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
          </>)}

          {extrato?.length > 0 &&                     
            <Pagination
            activePage={pageInfos?.page}
            itemsCountPerPage={pageInfos?.limit}
            totalItemsCount={pageInfos?.totalCount}
            itemClass="page-item"
            linkClass="page-link"
            onChange={pageNumber=>loadExtratos(pageNumber)}/>
          }

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
          </>
    )
}