// Funkcja pobierająca kursy walut z API NBP
function getExchangeRates(currency) {
  const url = `https://api.nbp.pl/api/exchangerates/rates/A/${currency}/?format=json`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => convertCurrency(data.rates[0].mid))
    .catch((error) => console.error(error));
}

// Funkcja przeliczająca kwotę na podaną walutę
function convertCurrency(rate) {
  const currency = document.getElementById('currency').value;
  const amount = document.getElementById('amount').value;

  if (amount <= 0) {
    alert('Wprowadź wartość większą od 0.');
    return;
  }

  const result = amount * rate;
  const resultElement = document.querySelector('.result');
  resultElement.innerHTML = `${amount} ${currency} = ${result.toFixed(2)} PLN`;
}

// Obsługa przycisku "Przelicz"
const convertButton = document.getElementById('convert');
convertButton.addEventListener('click', () => {
  const currency = document.getElementById('currency').value;
  getExchangeRates(currency);
});
