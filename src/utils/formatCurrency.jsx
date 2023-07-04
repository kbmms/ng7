export const formatCurrency = (value) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/[^\d]/g, '');
  
    // Divide o valor em reais e centavos
    const cents = numericValue.slice(-2);
    const real = numericValue.slice(0, -2);
  
    // Adiciona o separador de milhares
    const formattedReal = real.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Verifica se o valor está vazio ou contém apenas uma vírgula
    if (!formattedReal && !cents) {
      return '';
    }
  
    // Adiciona a vírgula apenas após o terceiro dígito
    let formattedValue = formattedReal;
    if (formattedValue.length > 2) {
      formattedValue = formattedValue.slice(0, 2) + ',' + formattedValue.slice(2);
    }
  
    // Formata o valor apenas com os números e o separador de milhares
    if (cents) {
      formattedValue += `,${cents}`;
    }
  
    return formattedValue;
  };
  