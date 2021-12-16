var P3SerieData;
var programDataArray = [];
var targetPodcast;
var dataObjects = {};
var clickedID;
var index;
var Data;

//program ids
const P3Serie = '4947';
const CreepyPodden = '4845';
const P3Krim = '5413';
const Dystopia = '5188';

const container = document.querySelector('.container');

const jumbotron = document.getElementById('jumbotron');

const fetchProgramData = (program) => {
  let URL = `https://api.sr.se/api/v2/programs/${program}?format=json`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log('fetching... ', data);

      createCards(data.program);
      sortDataInArray(data);
    })
    .catch((error) => {
      console.log(error, 'There has been an error');
    });
};

const sortDataInArray = (data) => {
  dataObjects.id = data.program.id;
  dataObjects.name = data.program.name;
  dataObjects.img = data.program.socialimage;
  dataObjects.url = data.program.url;
  dataObjects.description = data.program.description;
  programDataArray.push(dataObjects);
};

//INITIALIZING
const init = async () => {
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

  fetchProgramData(CreepyPodden);
  fetchProgramData(P3Krim);
  fetchProgramData(P3Serie);
  fetchProgramData(Dystopia);
};

init();

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
  console.log('dataArray is ', programDataArray);
  clickedAlt = event.target.getAttribute('alt');
  console.log('clicedID is ', clickedAlt);

  index = programDataArray.map((e) => e.name).indexOf(clickedAlt);
  console.log('index is ', index);
}
