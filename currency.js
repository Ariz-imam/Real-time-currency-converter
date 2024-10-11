async function populateCurrencyList() {
  const url = 'https://api.exchangerate-api.com/v4/latest/USD'; // Base currency for fetching rates
  try {
    const response = await fetch(url);
    const data = await response.json();
    const currencies = Object.keys(data.rates);  // Get all supported currencies

    let fromCurrency = document.getElementById('fromCurrency');
    let toCurrency = document.getElementById('toCurrency');

    // Dynamically populate both currency dropdowns
    currencies.forEach(currency => {
      let option1 = document.createElement('option');
      option1.value = currency;
      option1.text = currency;
      fromCurrency.appendChild(option1);

      let option2 = document.createElement('option');
      option2.value = currency;
      option2.text = currency;
      toCurrency.appendChild(option2);
    });
  } catch (error) {
    console.error('Error fetching currency list:', error);
  }
}

async function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;

  if (amount === "") {
    alert("Please enter an amount.");
    return;
  }

  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.rates[toCurrency];

    if (rate) {
      const convertedAmount = (amount * rate).toFixed(2);
      document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
      document.getElementById('result').innerText = "Exchange rate not available.";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('result').innerText = "Error fetching exchange rate.";
  }
}

// Call populateCurrencyList() on page load to populate the dropdowns
populateCurrencyList();
