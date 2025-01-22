const ConvertAmount = (amount, conversionRates, currency) => {
    if(!conversionRates[currency]){
        return amount;
    }
    const rates = conversionRates[currency];
    return (amount * rates).toFixed(2);
}

export default ConvertAmount;