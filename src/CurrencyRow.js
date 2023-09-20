import './App.css';

export default function CurrencyRow({currencyList,currencyUnit,currencyChangeDropDownHandler,amount, amountChangeHandler}) {

  return (
    <div>
       <input className="input" type="number" placeholder="1" value={amount} onChange={amountChangeHandler} ></input>
       <select value={currencyUnit} onChange={currencyChangeDropDownHandler}>
        {currencyList?.map(
          (currency) => {
            return (<option key={currency} value={currency}>{currency}</option>)
          })}
       </select>
    </div>
  )
}
