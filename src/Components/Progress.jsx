
import { CircularProgressbar, CircularProgressbarWithChildren  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';

import { List, CreditCard, WifiHigh,ShoppingCart, Bus, FirstAidKit, Book, Student, Calendar, BeerStein, HandHeart, Bank, PiggyBank, Gift} from "@phosphor-icons/react";

export default function ProgressBar({data}){



    async function handleEstimatedValue(categoryId, userId){
        const token = localStorage.getItem('token'); // Obter o token do localStorage
  
        try {
          const response = await axios.post('http://127.0.0.1:3333/estimated-values', {
                categoryId:categoryId,
                value:2500,
                userId: Number(userId),
          }, {
            headers: {
              Authorization: `Bearer ${token}`, // Passar o token no cabeçalho da requisição
            },
          });
        } catch (error) {
          console.log(error);
          // Tratar o erro de acordo com a necessidade
        }
    }
    return(
        <div className='progress-box-main'>
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
                    // <div style={{ width: 100, height: 100, display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', position:'relative' }}>
                    //     {Icon && <Icon size={24} style={{ marginBottom: 10 }} />}
                    //     <p style={{fontSize:'10px', position:'absolute', top:'10px', fontWeight:'bold', color:'#e53371'}}>{item.label}</p>
                    //     <CircularProgressbar value={item.progresso?.toFixed(0)} text={`${item.progresso?.toFixed(0)}%`} />
                    // </div>
                 
                     <div style={{ width: 100, height: 130, display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center', position:'relative' }}
                      onClick={() => handleEstimatedValue(item.id, item.userId)}>
                        <CircularProgressbarWithChildren value={item.progresso?.toFixed(0)}>
                             <p style={{fontSize:'10px', position:'absolute', bottom:'85px', fontWeight:'bold', color:'#9E9E9E'}}>{item.label}</p>
                            {Icon && <Icon size={35} style={{ marginBottom: 10 }} />}
                            <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>{item.progresso?.toFixed(0)}%</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                 
                );
            })}
        </div>
    )
}