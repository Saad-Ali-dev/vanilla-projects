class Account {
  constructor() {
    this.transactions = []; 
    this.balance = 0;
  }

  addTransaction(text, amount) {
    if (text.trim() === "" || isNaN(amount) || amount === 0) {
      return false; 
    }

    const transaction = {
      text: text,
      amount: parseFloat(amount), 
    };

    this.transactions.push(transaction);
    this.balance += transaction.amount;
    return true; 
  }

  deleteTransaction(index) {
    const transaction = this.transactions[index];
    this.balance -= transaction.amount;
    this.transactions.splice(index, 1);
  }

  getIncome() {
    return this.transactions.reduce((sum, transaction) => {
      return transaction.amount > 0 ? sum + transaction.amount : sum;
    }, 0);
  }

  getExpense() {
    return this.transactions.reduce((sum, transaction) => {
      return transaction.amount < 0 ? sum - transaction.amount : sum;
    }, 0);
  }

  getBalance() {
    return this.balance;
  }

  getTransactionHistory() {
      return this.transactions;
  }
}
