import React from 'react';

import { DataGrid } from '@mui/x-data-grid';


const SpecificUser = ({ data }) => {
  // Filtrar os dados para exibir apenas as mulheres com 18 anos ou mais
  const filteredData = data.filter(
    (user) => user.gender === 'female' && user.dob.age >= 18
  );

  const columns = [
    { field: 'descricao', headerName: 'Descrição', width: 200 },
    { field: 'tipo', headerName: 'Tipo', width: 100 },
    { field: 'valor', headerName: 'Valor', width: 120 },
    { field: 'conta', headerName: 'Conta', width: 300 },
    { field: 'data', headerName: 'Data', width: 300 },
  ];


  // const rows = data.map((extrato) => ({
  //   id: extrato.id,
  //   descricao: `${extrato.descricao}`,
  //   tipo: extrato.tipo,
  //   valor: extrato.valor,
  //   conta: extrato.contaBancaria.nome,
  //   data: extrato.data


  // }));

  return (
    <div className='card-extrato' style={{ width: '100%' }}>
       
      {/* <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10},
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        autoHeight
        disableExtendRowFullWidth
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        disableColumnFilter
      /> */}

      {data.map((item) => {
        return(
          <div className={` transaction ${item.tipo === 'entrada' ? 'income' : 'expense'}`}>
              <div>
                <div className=''>{item.contaBancaria.nome}</div>
                <div className="amount">{item.tipo === 'entrada' ? ('+') : ('-')} R$ {item.valor}</div>
                <div className="description">{item.descricao}</div>
              </div>

              <div>
                <div className="date">{item.data}</div>
              </div>
          </div>
        
        )
      })}
    </div>
  );
};

export default SpecificUser;
