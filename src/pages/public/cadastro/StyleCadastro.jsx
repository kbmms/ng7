import styled from 'styled-components';
import img1 from '../../../assets/img/bg-1.png'
export const MainContainerCadastro = styled.div`
background-repeat:no-repeat;
background-size:cover;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
background:url(${img1});
background-size:cover;
background-repeat:no-repeat;


.card-login {
    background:#ffffffbf;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius:6px;
    padding:20px 15px;

    display:flex;
    flex-direction:column;
    gap:10px;

    input {
    background: none;
    border: 3px solid #d2d6da;
    border-radius: 0.375rem;
    border-top-left-radius: 0.375rem !important;
    border-bottom-left-radius: 0.375rem !important;
    padding: 0.625rem 0.75rem !important;
    line-height: 1.3 !important;
    }
}
form {
    display:flex;
    flex-direction: column;

    gap:10px;
}
.btn-cadastro {
    background-image: linear-gradient(195deg, #EC407A 0%, #D81B60 100%);
    box-shadow: 0 3px 3px 0 rgba(233, 30, 99, 0.15), 0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.15);
    border:none;
    color:#fff;
    font-weight:bold;
    border-radius:4px;
    padding:10px;
}
button.go-back {
    background:transparent;
    box-shadow:none;
    color:#000;
    font-weight:light !important;
    border:none;
    margin-top:10px;
}
`