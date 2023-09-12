import styled from 'styled-components';
import img1 from '../../../assets/img/bg-1.png'
import img2 from '../../../assets/img/img-2.png'
export const MainContainerCadastro = styled.div`
background-repeat:no-repeat;
background-size:cover;
height:100vh;
display:flex;
align-items:center;
justify-content:center;
/* background:url(${img1}); */
background:#D81B60 ;
background-size:cover;
background-repeat:no-repeat;


.card-login {
    background:#fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    padding:20px 15px;

    display:flex;
    flex-direction:column;
    gap:10px;

    input {
        background: none;
        border: none;
        border-radius: 0.375rem;
        border-top-left-radius: 0.375rem !important;
        border-bottom-left-radius: 0.375rem !important;
        padding: 0.625rem 0.75rem !important;
        line-height: 1.3 !important;
    }

    h1 {
        font-size:22px;
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
button.btn-cadastro-back {
    background:transparent;
    border:none;
    color:#000 !important;
    border:none;
    color:#fff;
    font-weight:light;
    border-radius:4px;
    padding:10px;
    margin-top:40px;
    font-size:13px;
    font-weight:bold;

    span {
        color:#D81B60;
    }
}
button.go-back {
    background:transparent;
    box-shadow:none;
    color:#000;
    font-weight:light !important;
    border:none;
    margin-top:10px;
}
.box-inputs {
    border-bottom:1px solid #ccc;
    display:flex;
    align-items:center;
    margin-bottom:10px;
    input {
        width:100%;
        outline:none;
    }
}
.sides {
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:center;
    box-shadows:0px 1px 2px #000;
}
.side-public-b {
    background:url(${img2});
    width: 480px;
    background-size: cover;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    h1 {
        color:#fff;
        font-size:26px;
    }
    span {
        color:#fff;
        font-weight:bold;
        font-size:13px;
    }
}
    @media(max-width:991px){
        .side-public-b {
            display:none;
        }
    }
`