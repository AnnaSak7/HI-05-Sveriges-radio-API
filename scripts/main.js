var P3SerieData;
let targetPodcast;
let clickedID;
let clickedNumber;
var Data;
const programs = {};
let imgurl;
let podname;

const container = document.querySelector('.container');

const jumbotron = document.getElementById('jumbotron');

//program ids
const P3Serie = '4947';
const CreepyPodden = '4845';
const P3Krim = '5413';
const Dystopia = '5188';

// const fetchProgramData = (program) => {
//   let URL = `https://api.sr.se/api/v2/programs/${program}?format=json`;
//   fetch(URL)
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('fetching... ', data);

//       createCards(data.program);
//       sortDataInArray(data);
//     })
//     .catch((error) => {
//       console.log(error, 'There has been an error');
//     });
// };

async function fetchProgramData(program) {
  try {
    let URL = `https://api.sr.se/api/v2/programs/${program}?format=json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log('fetching...', data);
    createCards(data.program);
    sortDataInArray(data);
  } catch (error) {
    console.log('error : ', error);
  }
}

const sortDataInArray = (data) => {
  const dataObjects = {};
  dataObjects.id = data.program.id;
  dataObjects.name = data.program.name;
  dataObjects.img = data.program.socialimage;
  dataObjects.url = data.program.url;
  dataObjects.description = data.program.description;
  programs[data.program.id] = dataObjects;
  console.log('programs', programs);
};

function fetchInit() {
  fetchProgramData(CreepyPodden);
  fetchProgramData(P3Krim);
  fetchProgramData(P3Serie);
  fetchProgramData(Dystopia);
}

//INITIALIZING
const init = () => {
  jumbotron.innerHTML = `
    <div id="title">
    <h1>BEDTIME STORIES</h1>
    <p>for those who find relaxation in terror</p>
    </div>

`;

  container.innerHTML += `
  <h2>Choose Your Nightmare</h2>
  <div class="tableContainer"></div>
  `;

  fetchInit();
};

init();

async function fetchInit() {
  fetchProgramData(CreepyPodden);
  fetchProgramData(P3Krim);
  fetchProgramData(P3Serie);
  fetchProgramData(Dystopia);
}

//EventListener to nav btns
const homeBtn = document.getElementById('home');
homeBtn.addEventListener('click', () => {
  console.log('homebtn clicked ');
  Remover();
  init();
});
const programsBtn = document.getElementById('programs');

const listenNowBtn = document.getElementById('listenNow');

// SHOWS IMAGES
function createCards(program) {
  var tableContainer = document.querySelector('.tableContainer');
  tableContainer.innerHTML += `
  <div class="card">
  <div>
  <img id="${program.id}" class="imgBtn" src="${program.socialimage}" alt="${program.name}" />
  </div>
  <div class='card-description'>
  <p>${program.description}</p>
  </div>
  </div>`;
  tableContainer.classList.add('main-programs');
  addEventListenerImages();
}

// ADD EventListener to imgBtn class
function addEventListenerImages() {
  let imgBtn = document.querySelectorAll('.imgBtn');
  //console.log(imgBtn);
  imgBtn.forEach((e) => e.addEventListener('click', onClick));
  imgBtn.forEach((e) =>
    e.addEventListener('click', getClickedElement.bind(this))
  );
}

// EVENTLISTNER TO MOVE TO THE CHOSEN PROGRAM
function onClick(evt) {
  console.log('evt target alt is ', evt.target.alt);
  targetPodcast = evt.target.alt;
  Remover();
  switch (targetPodcast) {
    case 'Creepypodden i P3':
      creepypoddenInit();
      break;

    case 'P3 Krim':
      krimInit();
      break;

    case 'P3 Serie':
      serieInit();
      break;

    case 'P3 Dystopia':
      dystopiaInit();
      break;
  }
}

//REMOVE ELEMENTS IN THE PAGE TO GO TO THE NEXT PAGE
const Remover = () => {
  container.innerHTML = ``;
  jumbotron.innerHTML = ``;
};

function getClickedElement(event) {
  clickedID = event.target.getAttribute('id');
  clickedNumber = parseInt(clickedID);
  podname = programs[clickedID].name;
  imgurl = programs[clickedNumber].img;
  console.log('imgurl is ', imgurl);
  console.log('podname is ', podname);
}
