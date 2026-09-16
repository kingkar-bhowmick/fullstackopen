//High Order function

var triple = function (x) {
    return x * 3
}


var waffle = triple 

waffle(30)

console.log(waffle)

/*
const animals = [
  { name: 'Fluffykins', species: 'rabbit' },
  { name: 'Caro', species: 'dog' },
  { name: 'Hamilton', species: 'dog' },
  { name: 'Harold', species: 'fish' },
  { name: 'Ursula', species: 'cat' },
  { name: 'Jimmy', species: 'cat' }
];

// Imperative approach: You write the iteration logic AND the filtering logic
const dogs = [];
for (let i = 0; i < animals.length; i++) {
  if (animals[i].species === 'dog') {
    dogs.push(animals[i]);
  }
}

console.log(dogs);

*/

const animals = [
  { name: 'Fluffykins', species: 'rabbit' },
  { name: 'Caro', species: 'dog' },
  { name: 'Hamilton', species: 'dog' },
  { name: 'Harold', species: 'fish' },
  { name: 'Ursula', species: 'cat' },
  { name: 'Jimmy', species: 'cat' }
];

// Passing an inline callback function to Array.prototype.filter
const dogs = animals.filter(function(animal) {
  return animal.species === 'dog';
});

// Or using modern ES6 arrow function syntax:
// const dogs = animals.filter(animal => animal.species === 'dog');

console.log(dogs);



var orders = [{

  amount: 250
}, 

{

  amount: 350
}, 

{

  amount: 250
}

]

var totalAmount = orders.reduce(function(sum, order){

  console.log("hello", sum, order)

  return sum + order.amount
}, 0 )