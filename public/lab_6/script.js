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

<<<<<<< HEAD
function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
=======
function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
>>>>>>> 6535b5ca7cdbbc80d5ec2e63890b0f4d1176dcd5
    return 1;
  } if (a[key] > b[key]) {
    return -1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
<<<<<<< HEAD
    .then((fromServer) => {
      console.log('fromServer', fromServer);

      // No. 14
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }

      // No. 10
      const initArray = range(10);
      const initNewArray = initArray.map(() => {
        const pickNumber = getRandomIntInclusive(0, 243);
        return fromServer[pickNumber];
      });

      // No. 11
      const reverse = initNewArray.sort((a, b) => sortFunction(a, b, 'name'));

      // No. 12
      const ol = document.createElement('ol');
      ol.className = 'flex-inner';
      $('form').prepend(ol);

      // No. 13
      reverse.forEach((element) => {
        const li = document.createElement('li');
        $(li).append(`<input type="checkbox" value=${element.code} id=${element.code}>`);
        $(li).append(`<label for=${element.code}>${element.name}</label>`);
        $(ol).append(li);
      });
=======
    .then((jsonFromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      
      console.log('jsonFromServer', jsonFromServer);
      const reverseList = newArr2.sort((a, b) => sortFunction(b, a, 'name'));
>>>>>>> 6535b5ca7cdbbc80d5ec2e63890b0f4d1176dcd5
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});