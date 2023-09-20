
import './App.css';
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import CurrencyRow from './CurrencyRow';

function App() {

const [availableCurrencyList,setAvailableCurrencyList] = useState([]);
const [availableCurrencies,setAvailableCurrencies] = useState({});
const [fromCurrency,setFromCurrency] = useState('');
const [toCurrency,setToCurrency] = useState('');
const [fromAmount,setFromAmount] = useState(1);
const [toAmount,setToAmount] = useState(1);


console.log(availableCurrencies);

useEffect(()=>{
   axios.get('http://api.exchangeratesapi.io/v1/latest?access_key=a55455d44db7f1c9292dbbcbd70eaa51')
    .then((response)=>{
      setAvailableCurrencyList([...Object.keys(response.data.rates)]);
      setAvailableCurrencies({...response.data.rates});
      setFromCurrency(response.data.base);
      setToCurrency(Object.keys(response.data.rates)[0]);
    })
},[]);

const fromAmountChangeHandler = (event) =>{
    let amount = event.target.value;
    setFromAmount(amount);
    setToAmount(amount*availableCurrencies[toCurrency]);
}

const toAmountChangeHandler = (event) =>{
  let amount = event.target.value;
  setToAmount(amount);
  setFromAmount(amount/availableCurrencies[toCurrency]);
}

  return (
    <div className="App-body">
      <div>
        Convert
        <CurrencyRow currencyList={availableCurrencyList} 
                     currencyUnit={fromCurrency} 
                     currencyChangeDropDownHandler = {(event)=>{setFromCurrency(event.target.value)}}
                     amount={fromAmount}
                     amountChangeHandler={fromAmountChangeHandler}/>
        <div className="App-equals">=</div>
        <CurrencyRow currencyList={availableCurrencyList} 
                     currencyUnit={toCurrency} 
                     currencyChangeDropDownHandler = {(event)=>{setToCurrency(event.target.value)}}
                     amount={toAmount}
                     amountChangeHandler={toAmountChangeHandler}/>
      </div>
    </div>
  );
}

export default App;
