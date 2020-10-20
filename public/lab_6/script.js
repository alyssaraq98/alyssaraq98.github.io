// You may wish to find an effective randomizer function on MDN.

/* Randomizer function from MDN below */
function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      const countriesArray = range[10];
      const countriesArrayTwo = countriesArray.map(() => {
        const returnNumber = getRandomIntInclusive(0, 243);
        return fromServer(returnNumber);
      })
      const reverseOrder = countriesArray.sort((a, b) => sortFunction(a, b, key));
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});