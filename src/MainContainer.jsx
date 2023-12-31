import styled from 'styled-components';

export const MainContainer = styled.div`
  background-color: #f0f2f5;
  min-height:100vh;

  .aside {
    background: #9094988a;
    width:237px;
    height:100%;
    margin:0;
    padding:0;
    
  }
  .aside ul {
    margin:0;
    padding:0;
  }
  .aside ul li {
    list-style:none;
  }
  .aside a {
    text-decoration:none;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    justify-content:center;
    height:80px;
  }
  .aside span {
    font-size:14px;
    color:#fff;  
  }
  .main-box {
    background: #f0f2f5;
    padding:30px 10px;
  }
  .header-main {
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
  }
  .header-main h2 {
    color: #918b8b;
  }
  .selects-header {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap:wrap;

  }
  .selects-header div {
    border-radius: 20px;
    padding: 10px 30px;

    display: flex;
    align-items: center;
    gap: 20px;
  }
  .card-main {
    display: flex;
    gap: 10px;
    margin-top:40px;
    flex-wrap:wrap;
  }
  .card-main > div {
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: start;
    background: #fff;
    height:120px;
    gap:20px;
    flex:1;
  }
  .card-main-item {
    display: flex;
  }
  .card-main-item-text p {
    color:#918b8b;
    font-size:14px;
    font-weight:bold;
  }
  .card-main-item-text span {
    font-size:20px;
    color:#918b8b;
  }
  .card-main-item.separate {
    background-color:#f6f6f6;
    display: flex;
    flex-direction:column;
    
  }
  .card-main-item.separate > div {
    background-color:#fff;
    flex:1;
    width:100%;
    color:#918b8b;
  }
  .card-main.card-two-separate > div{
    height:unset;
  }
  .separate-items {
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
  }
  .card-three {
    margin-top:40px;


  }
  .card-three > div {
    background: #fff;
    padding: 20px;
    color:#918b8b;
  }
  .card-three-items {
    background: #fff;
    display: flex;
    flex-wrap:wrap;
    justify-content:space-between;
    gap:20px;

    
  }
  .card-three-items > div {
    background: #f6f6f6;
    flex:1;

  }
  @media(max-width:1081px){
    .aside {
      /* display: none; */
      background:'#9094988a' !important;
      position:fixed;
      z-index:99999;
      height: unset;
    }
    .datagrid {
      overflow:auto !important;
    }
  }


  .card-extrato {
    display:flex;
    flex-direction: column-reverse;
  }
  .transaction {
      display:flex;
      justify-content: space-between;
      margin-bottom: 15px;
      padding: 15px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .transaction .date {
      font-weight: bold;
      margin-bottom: 5px;
      font-size:12px;
      color:#999;
    }

    .transaction .amount {
      font-size: 18px;
    }

    .transaction .description {
      color: #777;
    }

    .transaction.income {
      background-color: #d8fdd8;
      border-left: 4px solid #4caf50;
    }

    .transaction.expense {
      background-color: #ffd9d9;
      border-left: 4px solid #f44336;
    }
    .test svg {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-radius:5px;
    }
    .card-header button {
      border: none;
      outline: none;
      position: absolute;
      left: 10px;
      background: #f2f2f2;
      padding: 4px;
      border-radius:50%;
      box-shadow: 0px 1px 2px #b3b2b2;
    }
    .rdrDefinedRangesWrapper, .rdrDateDisplayItem {
      display:none;
    }
    .rdrDateDisplayWrapper {
      background:transparent;
    }
    .btn-calendar {
      background-color: rgb(255, 255, 255);
      color: rgb(153, 153, 153);
      border:none;
      border-radius:20px;
      padding:5px 20px;
    }

    .card-account-bank {
      flex-wrap:nowrap;
      overflow:auto;
      height:100%;
    }
    .card-bank-account {
      display:flex;
      justify-content:center;
      align-items:center;
    }
    .item-icon-date {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .btn-group {
      gap:10px;
    }
    .btn-logout {
      background-color: rgb(255, 255, 255);
      color: rgb(153, 153, 153);
      border: none;
      border-radius: 20px;
      padding: 5px 20px;
    }
    .progress-box-main {
      display:grid !important;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr !important;
      gap:10px;
      overflow:auto;
    }
    .input-estimated-value {
      width: 100%;
      padding: 10px 0;
      background: #637ded;
      border: none;
      color: #fff;
      font-weight: bold;
  
    }
    .slide-progress-box-main {
      position: fixed;
      z-index: 9999;
      background: #9FA8DA;
      top: 0;
      width: 100%;
    }
    .menu {
      transition: transform 0.3s ease;
    }

    .open {
      transform: translateX(0);
    }

    .closed {
      transform: translateX(-100%);
    }
    .close-slide-progress {
      width: 100%;
      padding: 10px;
      border: none;
      margin: 8px 0;
      background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
      color: #fff;
      font-weight: bold;
    }
    .box-slide-progress-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 10px;
    }
    .item-progress {
      background: #5575ff;
      margin-bottom: 10px;
      color: rgb(255, 255, 255);
      width: 100%;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      position: relative;
      padding: 5px;
      border-radius: 5px;
    }
    .input-estimated-value::placeholder {
      color:#fff;
    }
    .card-bank-account img {
      display: block;
      width: 63px;
      height: 63px;
      border-radius: 50%;
    }
    .cardlist {
      gap:5px;
    }
    .cardlist img {
      border-radius: 50%;
      width:30px;
    }
    .empty-account {
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
    }
    span.extrato-data {
      font-size: 0.75rem !important;
    }
    .text-dark {
    color: #344767 !important;
    }
    h6.range-date-text {
        margin-top: 10px;
    }
    .mov-icon {
      width: 25px;
      height: 26px;
    }

    .item-icon-date img {
      width:25px;
      border-radius:50%;
    }

    .text-desc-cat {
      font-weight: bold;
      color: #487a91;
    }

    .saldos-card-total span{
      font-size:14px;
      color:#fFf;
      display:block;
    }
    .total-item {
      display:flex;
      gap:10px;
    }
    .text-green {
      color: rgb(119, 199, 119) !important;
      font-weight:bold !important;
    }
    span.text-red {
      color: rgb(239, 83, 80); !important;
      font-weight:bold !important;
    }
    .text-white {
      color:#fff !important;
      font-weight:bold !important;
    }
    a.link-see-all {
      text-decoration:none;
      color:#999;
    }
 
`;
