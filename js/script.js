const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
  );

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() == '' || amount.value.trim() == '')
    {
        alert('Please add a text and amount');
    }
    else
    {
        const transaction ={
            id: generateID(),
            text: text.value,
            amount: amount.value
    };
    transactions.push(transaction);
    addTransactionDom(transaction);
    updateValues();
    updateLocalStorage();

    text.value = '';
    amount.value = '';
}
}

function generateID(){
    return Math.floor(Math.random()*10000000);
}

function addTransactionDom(transaction)
{
    let sign;
    if(transaction.amount<0)
    {
        sign ='-';
    }
    else
    {
        sign = '+';
    }
    const item = document.createElement('li');
    if(sign=='-'){
        item.classList.add('minus');
    }
    else{
        item.classList.add('plus');
    }
    item.innerHTML = `${transaction.text} <span> ${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>`;
    list.appendChild(item);
}

function updateValues(){
     total=0;
     plus_m = 0;
     minus_m = 0;
    for(let i=0;i<transactions.length;i++)
    {
        let p = parseInt(transactions[i].amount);
        total+=p;
        if(p>=0){
            plus_m+=p;
        }
        else
        {
            minus_m+=p;
        }
    }
    console.log(total);
    minus_m*=-1;
    balance.innerText = `₹${total}`;
    money_plus.innerText = `₹${plus_m}`;
    money_minus.innerText = `₹${minus_m}`;
}

function removeTransaction(id)
{
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();

    init();
}
function init() {
    list.innerHTML = '';
  
    for(let i=0;i<transactions.length;i++)
    {
        addTransactionDom(transactions[i]);
    }
    updateValues();
  }
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
init();
form.addEventListener('submit', addTransaction);