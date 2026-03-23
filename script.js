const convertButton = document.querySelector(".convert-button");
const currencySelect = document.querySelector("#currency-to");
const currencySelectFrom = document.querySelector("#currency-from");

function convertValues() {
    let rawValue = document.querySelector(".input-currency").value;
    let inputCurrencyValue = parseFloat(rawValue.replace(',', '.')) || 0;
    
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
    const currencyValueConverted = document.querySelector(".currency-value");
    const fromValue = currencySelectFrom.value;
    const toValue = currencySelect.value;

    const dolarToday = 5.21;
    const euroToday = 6.21;
    const bitcoinToday = 358775;

    let valueInBRL;
    if (fromValue === "real") {
        valueInBRL = inputCurrencyValue;
    } else if (fromValue === "dolar") {
        valueInBRL = inputCurrencyValue * dolarToday;
    } else if (fromValue === "euro") {
        valueInBRL = inputCurrencyValue * euroToday;
    } else if (fromValue === "bitcoin") {
        valueInBRL = inputCurrencyValue * bitcoinToday;
    }

    let convertedValue;
    if (toValue === "real") {
        convertedValue = valueInBRL;
    } else if (toValue === "dolar") {
        convertedValue = valueInBRL / dolarToday;
    } else if (toValue === "euro") {
        convertedValue = valueInBRL / euroToday;
    } else if (toValue === "bitcoin") {
        convertedValue = valueInBRL / bitcoinToday;
    }

    currencyValueToConvert.innerHTML = formatCurrency(inputCurrencyValue, fromValue);
    currencyValueConverted.innerHTML = formatCurrency(convertedValue, toValue);
    updateCurrencyDisplay(fromValue, toValue); 
}

function updateCurrencyDisplay(fromCurrency, toCurrency) {
    const currencyData = {
        real: { name: "Reais", img: "./assets/brasil.png" },
        dolar: { name: "Dólares", img: "./assets/usa.png" },
        euro: { name: "Euros", img: "./assets/euro.png" },
        bitcoin: { name: "Bitcoins", img: "./assets/bitcoin.png" }
    };
    
    const fromName = document.querySelector(".currency-from-name");
    const fromImg = document.querySelector(".currency-from-image"); 
    
    if (fromName && fromImg && currencyData[fromCurrency]) {
        fromName.innerHTML = currencyData[fromCurrency].name;
        fromImg.src = currencyData[fromCurrency].img;
    }
    
    const toName = document.getElementById("currency-name");
    const toImg = document.querySelector(".currency-image");
    
    if (toName && toImg && currencyData[toCurrency]) {
        toName.innerHTML = currencyData[toCurrency].name;
        toImg.src = currencyData[toCurrency].img;
    }
}

function formatCurrency(value, currency) {
    value = parseFloat(value) || 0;
    
    switch(currency) {
        case "real":
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(value);
            
        case "dolar":
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
            }).format(value);
            
        case "euro":
            return new Intl.NumberFormat("de-DE", {
                style: "currency",
                currency: "EUR"
            }).format(value);
            
        case "bitcoin":
            return new Intl.NumberFormat("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8
            }).format(value) + " ₿";
            
        default:
            return value;
    }
}

convertButton.addEventListener("click", convertValues);
currencySelect.addEventListener("change", convertValues);
currencySelectFrom.addEventListener("change", convertValues);