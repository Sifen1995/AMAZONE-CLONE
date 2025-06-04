import React from 'react';
import numeral from 'numeral';


const CurrencyFormat=({amount})=>{
    const formated=numeral(amount).format("$0,0.00")
    return <div>{formated}</div>
}

export default CurrencyFormat