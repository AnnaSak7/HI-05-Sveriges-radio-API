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

// const indexOfTargetPodcast = (array) => {
//   console.log('dataArray is ', array);
//   console.log('targetPodCast is ', targetPodcast);
//   for (let i = 0; i < array.length; i++) {
//     if (targetPodcast === array.name) {
//       console.log(array.name);
//     }
//   }
// };

// const indexOfObject = (array, target) => {
//   target === array.name;
// };

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

var indexAudio = 0;

function loadNewTrack(index) {
  var player = document.querySelector('#source-audio');
  player.src = listAudio[index].file;
  document.querySelector('.title').innerHTML = listAudio[index].name;
  this.currentAudio = document.getElementById('myAudio');
  this.currentAudio.load();
  this.toggleAudio();
  this.updateStylePlaylist(this.indexAudio, index);
  this.indexAudio = index;
}

// const buildPlayBar = () => {
//   const footer = document.getElementById('interactions');
//   footer.innerHTML = `
//   <div class="tracking-wrap">
//         <span class="song-current-time">--:--</span>
//         <input
//           class="tracking-slider range"
//           type="range"
//           min="0"
//           value="0"
//           step="1"
//         />
//         <span class="song-length">--:--</span>
//       </div>

//       <div class="controls-bar">
//         <section id="controls">
//           <span class="fa fa-random shuffle"></span>
//           <span class="fa fa-fast-backward previous"></span>
//           <span class="fa fa-play play-pause"></span>
//           <span class="fa fa-fast-forward next"></span>
//           <span class="fa fa-repeat repeat on"></span>
//         </section>

//         <div id="volume">
//           <span class="fa fa-volume-down"></span>
//           <input
//             class="volume-slider range"
//             type="range"
//             max="1"
//             min="0"
//             step="0.01"
//             value="0.8"
//           />
//           <span class="fa fa-volume-up"></span>
//         </div>
//       </div>
//   `;
// };

const episodeArray = () => {
  for (let i = 0; i < 10; i++) {
    episodes.push(episodes[i].url);
  }
  return episodes;
};

//`https://api.sr.se/api/v2/podfiles?programid=${program}&format=json`;

///////////////////////////

//スクロールすると上部に固定させるための設定を関数でまとめる
function FixedAnime() {
  var headerH = $('#header').outerHeight(true);
  var scroll = $(window).scrollTop();
  if (scroll >= headerH) {
    //headerの高さ以上になったら
    $('#header').addClass('fixed'); //fixedというクラス名を付与
  } else {
    //それ以外は
    $('#header').removeClass('fixed'); //fixedというクラス名を除去
  }
}

//ナビゲーションをクリックした際のスムーススクロール
$('#g-navi a').click(function () {
  var elmHash = $(this).attr('href'); //hrefの内容を取得
  var pos = Math.round($(elmHash).offset().top - 120); //headerの高さを引く
  $('body,html').animate({ scrollTop: pos }, 500); //取得した位置にスクロール※数値が大きいほどゆっくりスクロール
  return false; //リンクの無効化
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
  FixedAnime(); /* スクロール途中からヘッダーを出現させる関数を呼ぶ*/
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load', function () {
  FixedAnime(); /* スクロール途中からヘッダーを出現させる関数を呼ぶ*/
});
