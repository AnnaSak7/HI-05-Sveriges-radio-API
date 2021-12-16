//Change the display of time from seconds
function secondsToHms(seconds) {
  const time = {
    hours: String(Math.floor(Number(seconds) / 3600)),
    minutes: String(Math.floor((Number(seconds) % 3600) / 60)),
    seconds: String(Math.floor((Number(seconds) % 3600) % 60)),
  };

  if (time.hours && time.hours < 10) {
    time.hours = `0${time.hours}`;
  }
  if (time.minutes && time.minutes < 10) {
    time.minutes = `0${time.minutes}`;
  }
  if (time.seconds && time.seconds < 10) {
    time.seconds = `0${time.seconds}`;
  }

  if (time.hours !== '00') {
    return `${time.hours}:${time.minutes}:${time.seconds}`;
  } else {
    return `${time.minutes}:${time.seconds}`;
  }
}

const indexOfTargetPodcast = (array) => {
  console.log('dataArray is ', array);
  console.log('targetPodCast is ', targetPodcast);
  for (let i = 0; i < array.length; i++) {
    if (targetPodcast === array.name) {
      console.log(array.name);
    }
  }
};

const indexOfObject = (array, target) => {
  target === array.name;
};

const fillJumbotron = (array) => {
  console.log('fillJumbo', array);

  // let index = array.findIndex(indexOfOfject(array, targetPodcast));
  // console.log('index is ', index);

  jumbotron.innerHTML = `
    <div>
    <h1>Something</h1>
    <p>Sveriges Radio</p>


    </div>
    <img src="${array[index].img}" alt=" "/>
  `;
};

//make base table for the playlist
const makeTable = () => {
  container.innerHTML += `<table id="playlist" class="no-select">
  <thead>
    <th>&nbsp;</th>
    <th>Title</th>
    <th>Description</th>
    <th><span class="fa fa-clock-o"></span></th>
  </thead>
  <tbody id='playlistBody'></tbody>
</table>`;
};

//playlist and attaching it to table body
const buildPlaylist = (episodes) => {
  const playlistBody = document.querySelector('#playlistBody');
  for (let i = 0; i < 10; i++) {
    playlistBody.innerHTML += `
            <tr data-index="${i}">
            <td class="play-pause"><img class='episode-image' src="${
              episodes[i].imageurl
            }"></td>
            <td>${episodes[i].title}</td>
            <td>${episodes[i].description}</td>

            <td>${secondsToHms(episodes[i].listenpodfile.duration)}</td>
          </tr>
    `;
  }
  //buildPlayerBar();
};

//build play-bar
const buildPlayBar = () => {
  const footer = document.getElementById('interactions');
  footer.innerHTML = `
  <div class="tracking-wrap">
        <span class="song-current-time">--:--</span>
        <input
          class="tracking-slider range"
          type="range"
          min="0"
          value="0"
          step="1"
        />
        <span class="song-length">--:--</span>
      </div>

      <div class="controls-bar">
        <section id="controls">
          <span class="fa fa-random shuffle"></span>
          <span class="fa fa-fast-backward previous"></span>
          <span class="fa fa-play play-pause"></span>
          <span class="fa fa-fast-forward next"></span>
          <span class="fa fa-repeat repeat on"></span>
        </section>

        <div id="volume">
          <span class="fa fa-volume-down"></span>
          <input
            class="volume-slider range"
            type="range"
            max="1"
            min="0"
            step="0.01"
            value="0.8"
          />
          <span class="fa fa-volume-up"></span>
        </div>
      </div>
  `;
};

const episodeArray = () => {
  for (let i = 0; i < 10; i++) {
    episodes.push(episodes[i].url);
  }
  return episodes;
};

//`https://api.sr.se/api/v2/podfiles?programid=${program}&format=json`;

const fetchEpisodesData = (program) => {
  let URL = `https://api.sr.se/api/v2/episodes/index?pagination=false&format=json&programid=${program}`;

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log('fetching... ', data);

      let episodes = data.episodes;
      console.log('episodes are ', episodes);
      buildPlaylist(episodes);
    })
    .catch((error) => {
      console.log(error, 'There has been an error');
    });
};

function creepypoddenInit() {
  makeTable();
  fetchEpisodesData(CreepyPodden);
  jumbotron.innerHTML = `<h1> whatz up <h1>`;
}

const krimInit = () => {
  makeTable();
  fetchEpisodesData(P3Krim);
  fillJumbotron(dataArray);
};

const serieInit = () => {
  makeTable();
  fetchEpisodesData(P3Serie);
  fillJumbotron(dataArray);
};

const dystopiaInit = () => {
  makeTable();
  fetchEpisodesData(Dystopia);
  fillJumbotron(dataArray);
};
