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

const makeTable = () => {
  container.innerHTML += `<table id="playlist" class="no-select">
  <thead>
    <th>&nbsp;</th>
    <th>Title</th>
    <th>Artist</th>
    <th>Album</th>
    <th><span class="fa fa-clock-o"></span></th>
  </thead>
  <tbody id='playlistBody'></tbody>
</table>`;
};

const getIndexOfImgDataArray = () => {};

const buildPlaylist = (episodes) => {
  const playlistBody = document.querySelector('#playlistBody');
  for (let i = 0; i < 10; i++) {
    playlistBody.innerHTML += `
            <tr data-index="${i}">
            <td class="play-pause"><img src="${episodes[i].imageurl}"></td>
            <td>${episodes[i].title}</td>
            <td>${episodes[i].description}</td>
            <td>${episodes[i].program.name}</td>
            <td>${secondsToHms(episodes[i].listenpodfile.duration)}</td>
          </tr>
    `;
  }
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
}

const krimInit = () => {
  makeTable();
  fetchEpisodesData(P3Krim);
};

const serieInit = () => {
  makeTable();
  fetchEpisodesData(P3Serie);
};
