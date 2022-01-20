var P3SerieData;
var Data;
//let targetPodcast;
let clickedID;
let clickedNumber;
let imgurl;
let podname;

const programs = {};
const container = document.querySelector('.container');
const container2 = document.querySelector('.container2');
const jumbotron = document.getElementById('jumbotron');

//program ids
const P3Serie = '4947';
const CreepyPodden = '4845';
const P3Krim = '5413';
const Dystopia = '5188';

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
  dataObjects.url = data.program.programurl;
  dataObjects.description = data.program.description;
  programs[data.program.id] = dataObjects;
  console.log('programs', programs);
};

//INITIALIZING
const init = () => {
  jumbotron.innerHTML = `
    <div id="title">
    <h1>BEDTIME STORIES</h1>
    <p id="terror">for those who find relaxation in terror<p/>
    <p id="swedish">. . .and who understand Swedish...</p>

`;

  container.innerHTML += `
  <h2>Choose Your Nightmare</h2>
  <div class="tableContainer"></div>
  `;

  firstFetchInit();
};

init();

async function firstFetchInit() {
  fetchProgramData(CreepyPodden);
  fetchProgramData(P3Krim);
  fetchProgramData(P3Serie);
  fetchProgramData(Dystopia);
}

async function fetchProgramDataForListenNow(program) {
  try {
    let URL = `https://api.sr.se/api/v2/episodes/index?pagination=false&format=json&programid=${program}`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log('fetching...', data);
    createCardsForListenNow(data);
  } catch (error) {
    console.log('error : ', error);
  }
}
// CREATE LISTENNOW PAGE CARDS WITH PROGRAM INFO
const createCardsForListenNow = (data) => {
  container2.innerHTML += `
    <div class='listenNowInfoBox'>

      <img class="imgInListenNow" src="${data.episodes[0].imageurl}" alt="${data.episodes[0].program.name}"/>

      <div class="episodeInfoBox">
        <h1>${data.episodes[0].program.name}</h1>
        <h3>${data.episodes[0].title}<h3>
        <p>${data.episodes[0].description}</p>

        <div class='btnAudioContainer'>
          <audio controls><source src="${data.episodes[0].listenpodfile.url}" type="audio/mp3"></audio>
          <button><a href="${data.episodes[0].url}">Episode Page</a></button>
        </div>
      </div>
    </div>
  `;
};

async function listenNowFetchInit() {
  jumbotron.innerHTML = `
  <div id="title">
  <h1>Latest Nightmare You Wish For ...</h1>
`;
  fetchProgramDataForListenNow(CreepyPodden);
  fetchProgramDataForListenNow(P3Krim);
  fetchProgramDataForListenNow(P3Serie);
  fetchProgramDataForListenNow(Dystopia);
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
listenNowBtn.addEventListener('click', () => {
  Remover();
  listenNowFetchInit();
});

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
  container2.innerHTML = ``;
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
