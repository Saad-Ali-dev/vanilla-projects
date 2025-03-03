import { countryList } from "./CountryCodes.js";

// Get references to the DOM elements
const fromSelectElement = document.querySelector("#from-currency");
const toSelectElement = document.querySelector("#to-currency");
let result = document.querySelector("#msg");
let fromFlag = document.querySelector("#from-flag");
let toFlag = document.querySelector("#to-flag");
const form = document.querySelector("#user-form");

let fromCurrency = fromSelectElement.value;
let toCurrency = toSelectElement.value;

let flagUrlStart = "https://flagsapi.com/";
let flagUrlEnd = "/flat/64.png";

for (let code in countryList) {
  // Create an option for the "from" select
  const optionFrom = document.createElement("option");
  optionFrom.innerText = code;
  optionFrom.value = code;
  fromSelectElement.append(optionFrom);

  // Create a separate option for the "to" select
  const optionTo = document.createElement("option");
  optionTo.innerText = code;
  optionTo.value = code;
  toSelectElement.append(optionTo);
}

// Event listeners to update the selected currencies
fromSelectElement.addEventListener("change", (event) => {
  fromCurrency = event.target.value;
  showFlag();
});

toSelectElement.addEventListener("change", (event) => {
  toCurrency = event.target.value;
  showFlag();
});

// Form submission handler
form.addEventListener("submit", (event) => {
  calculate(event);
});

async function showFlag(){
    fromFlag.src = flagUrlStart + countryList[fromCurrency] + flagUrlEnd;
    toFlag.src = flagUrlStart + countryList[toCurrency] + flagUrlEnd;
}

// Asynchronous function to fetch and calculate conversion
async function calculate(event) {
  event.preventDefault();

  // Parse the amount as a floating-point number
  const amount = parseFloat(document.querySelector("#amount").value);

  // Basic validations
    if (isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }


  try {
    // Fetch exchange rates using uppercase currency codes
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();

    // Look up the conversion rate for the target currency
    const conversionRate = data.rates[toCurrency];
    if (!conversionRate) {
      alert("Conversion rate not available for the selected currencies.");
      return;
    }
    
    const convertedAmount = amount * conversionRate;
    result.innerText = `${convertedAmount.toFixed(2)}  ${toCurrency}`;

  } catch (error) {
    console.error("Error fetching conversion rate:", error);
  }
}
