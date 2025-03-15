const form = document.querySelector('form');
const currentBalanceElement = document.querySelector('#current-balance');
const incomeElement = document.querySelector('#income-amount'); 
const expenseElement = document.querySelector('#expense-amount'); 
const textInput = document.querySelector('#text');
const amountInput = document.querySelector('#amount');
const historyBox = document.querySelector('.history-box');


const account = new Account();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = textInput.value;
    const amount = amountInput.value;

    if (account.addTransaction(text, amount)) {
        updateDisplay();
        textInput.value = "";
        amountInput.value = "";
        displayTransactionHistory();
    } else {
        alert("Please enter valid text and amount.");
    }
});

function updateDisplay() {
    currentBalanceElement.textContent = `$${account.getBalance().toFixed(2)}`;
    incomeElement.textContent = `$${account.getIncome().toFixed(2)}`;
    expenseElement.textContent = `$${account.getExpense().toFixed(2)}`;
}

function displayTransactionHistory() {
    historyBox.innerHTML = '<div class="heading">History</div>'; 
    account.getTransactionHistory().forEach((transaction, index) => {
        const transactionDiv = document.createElement('div');
        transactionDiv.classList.add('transaction-item');
        transactionDiv.innerHTML = `
            <span class="delete-btn" data-index="${index}">X</span>
            <span>${transaction.text}</span>
            $${Math.abs(transaction.amount.toFixed(2))}</span>
        `;
        historyBox.appendChild(transactionDiv);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            account.deleteTransaction(index);
            updateDisplay();
            displayTransactionHistory();
        });
    });
}

