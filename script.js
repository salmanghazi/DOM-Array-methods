const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double');
const showMillionaires = document.getElementById('show-millionaires');
const sortByMoney = document.getElementById('sort');
const calculate = document.getElementById('calculate-wealth');
const main = document.getElementById('main');


let users = [];

function getName(name) {
  const { title, first, last } = name;
  return title + '. ' + first + ' ' + last; 
}

async function addRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = {
    name: getName(data.results[0].name),
    money: Math.floor(Math.random() * 1000000),
  }

  users.push(user);
  // main.innerHTML = getName(data.results[0].name);
}

addUser.addEventListener('click', addRandomUser);
