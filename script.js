const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortByMoney = document.getElementById('sort');
const calculateTotal = document.getElementById('calculate-wealth');
const main = document.getElementById('main');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
});


let users = [];

function getName(name) {
  const { title, first, last } = name;
  return title + '. ' + first + ' ' + last; 
}

function updateDom(data = users) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  data.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${user.name}</strong> ${formatter.format(user.money)}</h2>`;
    main.appendChild(element);
  });
}

async function addRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = {
    name: getName(data.results[0].name),
    money: Math.floor(Math.random() * 1000000),
  }

  users.push(user);
  updateDom();
}

function doubleUsersMoney() {
  users = users.map(user => {
    return { ...user, money: user.money * 2  };
  });

  updateDom();
}

function showMillionairesInDom() {
  users = users.filter(user => user.money > 1000000);
  updateDom();
}

function sortRich() {
  users.sort((a, b) => b.money - a.money);
  updateDom();
}

function calculateTotalMoney() {
  const wealth = users.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatter.format(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

addUser.addEventListener('click', addRandomUser);
doubleMoney.addEventListener('click', doubleUsersMoney);
showMillionaires.addEventListener('click', showMillionairesInDom);
sortByMoney.addEventListener('click', sortRich);
calculateTotal.addEventListener('click', calculateTotalMoney);
