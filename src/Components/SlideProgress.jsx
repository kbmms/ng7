
import { CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import apiUrl from '../service/apiUrl'

import { CreditCard, WifiHigh,ShoppingCart, Bus, FirstAidKit, Book, Student, Calendar, BeerStein, HandHeart, Bank, PiggyBank, Gift} from "@phosphor-icons/react";
import { useState, useRef } from 'react';

export default function SlideProgressBar({data, updateEndpoint, isMenuOpen, openMenu, closeMenu }){
    let timeOutSearch = useRef(null)
    const inputNameRef = useRef(null);
    const [openEstimatedItemModal, setOpenEstimatedItemModal] = useState(false);


    async function handleEstimatedValue(estimatedValue, categoryId, userId){

        const token = localStorage.getItem('token'); // Obter o token do localStorage

        if(timeOutSearch.current){
            clearInterval(timeOutSearch.current)
        }
        timeOutSearch.current = window.setTimeout( async ()=>{
        try {
          const response = await axios.post(`${apiUrl}/estimated-values`, {
                categoryId:categoryId,
                value:Number(estimatedValue),
                userId: Number(userId),
          }, {
            headers: {
              Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
            },
          });
          updateEndpoint();
        } catch (error) {
          console.log(error);
          // Tratar o erro de acordo com a necessidade
        }
    }, 1100)
    }

    return(
        <div className={`slide-progress-box-main menu ${isMenuOpen ? 'open' : 'closed'}`}>
            <button onClick={closeMenu} className='close-slide-progress'>Fechar</button>
            <div className='box-slide-progress-grid'>
            {data?.map((item)=> {
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
                } else if (item.label === 'Telefone e Internet'){
                    Icon = WifiHigh; // Exemplo de ícone para categoria 'aluno'
                } else if (item.label === 'Alimentação'){
                    Icon = ShoppingCart; // Exemplo de ícone para categoria 'aluno'
                } else if (item.label === 'Transporte'){
                    Icon = Bus; // Exemplo de ícone para categoria 'aluno'
                } else if (item.label === 'Saúde'){
                    Icon = FirstAidKit; // Exemplo de ícone para categoria 'aluno'
                } else if (item.label === 'Lazer'){
                    Icon = BeerStein; // Exemplo de ícone para categoria 'aluno'
                }else if (item.label === 'Doações e Caridade'){
                    Icon = HandHeart; // Exemplo de ícone para categoria 'aluno'
                }else if (item.label === 'Investimentos'){
                    Icon = PiggyBank; // Exemplo de ícone para categoria 'aluno'
                }
                
                else {
                    Icon = Calendar;
                }

                return (
               
                     <div className='item-progress'
                      >
                        
                             <p style={{fontSize:'10px',  fontWeight:'bold', color:'#CDDC39'}}>{item.label}</p>
                            {Icon && <Icon size={35} style={{ marginBottom: 10 }} />}
                            <div style={{ width:'100%', fontSize: 12, marginTop: -5}}>
                               <input className='input-estimated-value' type='text' placeholder='R$ 00,00' defaultValue={item?.estimatedValues[0]?.value} ref={inputNameRef}  onChange={(estimatedValue) => handleEstimatedValue(estimatedValue.target.value, item.id, item.userId)} />
                            </div>
                        
                    </div>
                 
                );
            })}
            </div>
        </div>
    )
}