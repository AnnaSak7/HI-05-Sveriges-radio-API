var P3SerieData;
var imgDataArray = [];

const P3Serie = '4947';
const CreepyPodden = '4845';
const P3Krim = '5413';

const container = document.querySelector('.playlist-container');

const jumbotron = document.getElementById('jumbotron');

// shows imgs
function createCards(program) {
  container.innerHTML += `
  <div>
  <img class="imgBtn" src="${program.socialimage}" alt="${program.name}" />
  <p>${program.description}</p>
  </div>`;
  addEventListener();
}

// add EventListener to imgBtn class
function addEventListener() {
  let imgBtn = document.querySelectorAll('.imgBtn');
  //console.log(imgBtn);
  imgBtn.forEach((e) => e.addEventListener('click', onClick));
}

function onClick(evt) {
  console.log('evt target alt is ', evt.target.alt);
  console.log('img array is ', imgDataArray);
  Remover();
  if (evt.target.alt === 'Creepypodden i P3') {
    creepypoddenInit();
  } else if (evt.target.alt === 'P3 Krim') {
    krimInit();
  } else if (evt.target.alt === 'P3 Serie') {
    serieInit();
  }
}

//REMOVE ELEMENTS IN THE PAGE TO GO TO THE NEXT PAGE
const Remover = () => {
  container.innerHTML = ``;
};

const init = () => {
  jumbotron.innerHTML = `
    <h1>Chill Podcast</h1>
`;
  const chooseYourHorror = document.createElement('h2');
  chooseYourHorror.innerText = 'Choose Your Horror';

  container.append(chooseYourHorror);
};

init();

const fetchProgramData = (program) => {
  let URL = `https://api.sr.se/api/v2/programs/${program}?format=json`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log('fetching... ', data);

      createCards(data.program);

      imgDataArray.push(
        `{name:'${data.program.name}'', img: '${data.program.socialimage}' }`
      );
    })
    .catch((error) => {
      console.log(error, 'There has been an error');
    });
};

fetchProgramData(P3Serie);
fetchProgramData(CreepyPodden);
fetchProgramData(P3Krim);
