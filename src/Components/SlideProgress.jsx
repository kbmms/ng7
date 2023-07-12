import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../service/apiUrl';

import {
  CreditCard,
  WifiHigh,
  ShoppingCart,
  Bus,
  FirstAidKit,
  Book,
  Student,
  Calendar,
  BeerStein,
  HandHeart,
  Bank,
  PiggyBank,
  Gift,
} from "@phosphor-icons/react";

export default function SlideProgressBar({ data, updateEndpoint, isMenuOpen, openMenu, closeMenu }) {
  const timeOutSearch = useRef(null);
  const inputRefs = useRef([]);
  const [openEstimatedItemModal, setOpenEstimatedItemModal] = useState(false);
  const [estimatedValues, setEstimatedValues] = useState([]);

  const handleEstimatedValue = async (estimatedValue, categoryId, userId, index) => {
    const token = localStorage.getItem('token');

    const saldoLimpo = estimatedValue.replace(/\D/g, '');

    const saldoFloat = parseFloat(saldoLimpo); // Converter o saldo para float
    const saldoFormatted = (saldoFloat / 100).toFixed(2); // Formatar o saldo com duas casas decimais e converter para reais
    const saldoNumber = Number(saldoFormatted); // Converter o saldo formatado para number
    console.log(saldoFormatted);

    try {
      const response = await axios.post(
        `${apiUrl}/estimated-values`,
        {
          categoryId: categoryId,
          value: saldoNumber,
          userId: Number(userId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateEndpoint();
    } catch (error) {
      console.log(error);
      // Tratar o erro de acordo com a necessidade
    }
  };

  const formatCurrency = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    let formattedValue = '';

    if (digitsOnly.length >= 3) {
      const integerPart = digitsOnly.slice(0, -2);
      const decimalPart = digitsOnly.slice(-2);
      formattedValue =
        integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decimalPart;
    } else {
      formattedValue = digitsOnly;
    }

    return 'R$ ' + formattedValue;
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleChange = (event, index) => {
    const inputValue = event.target.value;
    const formattedValue = formatCurrency(inputValue);

    const updatedEstimatedValues = [...estimatedValues];
    updatedEstimatedValues[index] = formattedValue;
    setEstimatedValues(updatedEstimatedValues);
    
  };

  const handleBlur = (categoryId, userId, index) => {
    const estimatedValue = estimatedValues[index];
    handleEstimatedValue(estimatedValue, categoryId, userId, index);
  };

  const debouncedHandleBlur = debounce(handleBlur, 100);

  useEffect(() => {
    const initialValues = data?.map((item) => item?.estimatedValues[0]?.value || '');
    setEstimatedValues(initialValues);
  }, [data]);

  return (
    <div className={`slide-progress-box-main menu ${isMenuOpen ? 'open' : 'closed'}`}>
      <button onClick={closeMenu} className='close-slide-progress'>Fechar</button>
      <div className='box-slide-progress-grid'>
        {data?.map((item, index) => {
          if (item.estimatedValue === 0) {
            return null; // Retorna null para não renderizar o item
          }

          let Icon;
          if (item.label === 'Outros') {
            Icon = Gift; // Exemplo de ícone para categoria 'cafe'
          } else if (item.label === 'Cartão') {
            Icon = CreditCard; // Exemplo de ícone para categoria 'cerveja'
          } else if (item.label === 'Educação') {
            Icon = Student; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Telefone e Internet') {
            Icon = WifiHigh; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Alimentação') {
            Icon = ShoppingCart; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Transporte') {
            Icon = Bus; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Saúde') {
            Icon = FirstAidKit; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Lazer') {
            Icon = BeerStein; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Doações e Caridade') {
            Icon = HandHeart; // Exemplo de ícone para categoria 'aluno'
          } else if (item.label === 'Investimentos') {
            Icon = PiggyBank; // Exemplo de ícone para categoria 'aluno'
          } else {
            Icon = Calendar;
          }

          const estimatedValue = estimatedValues[index] || '';

          return (
            <div className='item-progress' key={item.id}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', color: '#CDDC39' }}>{item.label}</p>
              {Icon && <Icon size={35} style={{ marginBottom: 10 }} />}
              <div style={{ width: '100%', fontSize: 12, marginTop: -5 }}>
                <input
                  className='input-estimated-value'
                  type='text'
                  placeholder='R$ 0,00'
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  value={estimatedValue.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}
                  onChange={(event) => handleChange(event, index)}
                  onBlur={() => debouncedHandleBlur(item.id, item.userId, index)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
