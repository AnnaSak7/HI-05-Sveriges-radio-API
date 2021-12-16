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

async function fetchProgramData2(program) {
  try {
    let URL = `https://api.sr.se/api/v2/programs/${program}?format=json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log('fetching...', data);
    fillJumbotron(data);
  } catch (error) {
    console.log('error : ', error);
  }
}

//INIT TO EACH PROGRAM PAGE

function creepypoddenInit() {
  makeTable();
  fetchEpisodesData(CreepyPodden);

  fetchProgramData2(CreepyPodden);
}

const krimInit = () => {
  makeTable();
  fetchEpisodesData(P3Krim);
  fetchProgramData2(P3Krim);
};

const serieInit = () => {
  makeTable();
  fetchEpisodesData(P3Serie);
  fetchProgramData2(P3Serie);
};

const dystopiaInit = () => {
  makeTable();
  fetchEpisodesData(Dystopia);
  fetchProgramData2(Dystopia);
};

/////////////////////////////////////////

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

// FILL THE JUMBOTRON WITH PROGRAM INFO
const fillJumbotron = (data) => {
  jumbotron.innerHTML = `
    <div class='infoBox'>
      <div class="programInfoBox">
        <h1>${data.program.name}</h1>
        <p>${data.program.description}</p>
        <div class='btnContainer'>
          <a href="https://sverigesradio.se/"><img src="./assets/sr01.png" alt='sveriges radio'/></a>
          <button ><a href="${data.program.programurl}">Program Page</a></button>
        </div>
      </div>

      <img class="imgInJumbotron" src="${data.program.socialimage}" alt="${data.program.name}"/>
    </div>
  `;
};

//make base table for the playlist
const makeTable = () => {
  container.innerHTML += `<table id="playlist" >
  <thead>
    <th>&nbsp;</th>
    <th>Title</th>
    <th><span class="fa fa-clock-o"></span></th>
    <th>Description</th>
    <th><i class="far fa-play-circle"></i></th>

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
            <td><img class='episode-image' src="${episodes[i].imageurl}"></td>

            <td>${episodes[i].title}</td>
            <td>${secondsToHms(episodes[i].listenpodfile.duration)}</td>
            <td>${episodes[i].description}</td>


            <td><audio controls><source src="${
              episodes[i].listenpodfile.url
            }" type="audio/mp3"></audio></td>
          </tr>
    `;
  }
  //buildPlayerBar();
};

//build player-bar

// const buildPlayerBar = () => {
//   const footer = document.getElementById('interactions');
//   footer.innerHTML = `
//   <audio id="myAudio" ontimeupdate="onTimeUpdate()">
//   <!-- <source src="audio.ogg" type="audio/ogg"> -->
//   <source id="source-audio" src="" type="audio/mpeg" />
//   Your browser does not support the audio element.
// </audio>
//   <div class="player-ctn">
//       <div class="infos-ctn">
//         <div class="timer">00:00</div>
//         <div class="title"></div>
//         <div class="duration">00:00</div>
//       </div>
//       <div id="myProgress">
//         <div id="myBar"></div>
//       </div>
//       <div class="btn-ctn">
//         <div class="btn-action first-btn" onclick="previous()">
//           <div id="btn-faws-back">
//             <i class="fas fa-step-backward"></i>
//           </div>
//         </div>
//         <div class="btn-action" onclick="rewind()">
//           <div id="btn-faws-rewind">
//             <i class="fas fa-backward"></i>
//           </div>
//         </div>
//         <div class="btn-action" onclick="toggleAudio()">
//           <div id="btn-faws-play-pause">
//             <i class="fas fa-play" id="icon-play"></i>
//             <i class="fas fa-pause" id="icon-pause" style="display: none"></i>
//           </div>
//         </div>
//         <div class="btn-play" onclick="forward()">
//           <div id="btn-faws-forward">
//             <i class="fas fa-forward"></i>
//           </div>
//         </div>
//         <div class="btn-action" onclick="next()">
//           <div id="btn-faws-next">
//             <i class="fas fa-step-forward"></i>
//           </div>
//         </div>
//         <div class="btn-mute" id="toggleMute" onclick="toggleMute()">
//           <div id="btn-faws-volume">
//             <i id="icon-vol-up" class="fas fa-volume-up"></i>
//             <i
//               id="icon-vol-mute"
//               class="fas fa-volume-mute"
//               style="display: none"
//             ></i>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
// };
