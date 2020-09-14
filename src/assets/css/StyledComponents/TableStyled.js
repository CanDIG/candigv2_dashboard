import styled from 'styled-components'

const Styles = styled.div`
  padding: 1rem;
  overflow: auto;

  div.card {
    background: #f4f3ef
    // padding-top: 0px
  }
  table {
    border: 1px solid #127e12;
    background-color: #EEEEEE;
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }
  table td {
    border-right: 1px solid #127e12;
    padding: 3px 2px;
  }

  table tbody td {
    font-size: 14px;
  }
  table tbody tr:nth-child(even) {
    background: #b0dfb0;
  }
  table thead {
    background: rgb(23,160,24);
   
  }
  table thead th {
    font-size: 15px;
    font-weight: bold;
    color: #FFFFFF;
    text-align: center;
    border-left: 1px solid #444444;
  }
  table thead th:first-child {
    border-left: none;
  }

  table tbody tr:hover {
    background-color:#c4d5e7;
  }

  table thead tr th div input {
    margin-right: 3px;
    margin-left: 3px;
    margin-bottom: 2px;
    background-color: #EEEEEE
  }

  table tfoot td {
    font-size: 14px;
  }
  table tfoot .links {
    text-align: right;
  }
  table tfoot .links a{
    display: inline-block;
    background: #1C6EA4;
    color: #FFFFFF;
    padding: 2px 8px;
    border-radius: 5px;
  }


`


export default Styles