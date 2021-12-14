const query = '?format=json';

const populatePost = (data) => {
  //console.log('program 548 is ', data.programs[548]);
  console.log('creepy is ', data);
  for (let i = 0; i < 10; i++) {
    document.querySelector(
      '.playlist-container'
    ).innerHTML += `<li class='playlist-item'>
       <img src='./assets/creepypodden.png' alt='programImage'/>
        <h2>${data.podfiles[i].name}</h2>
         <h3>Channel: ${data.podfiles[i].title}</h3>
         <figure>
         <audio
         controls
         src="${data.podfiles[i].url}">
             Your browser does not support the
             <code>audio</code> element.
     </audio>
     </figure>

        </li>`;
  }
};

const episodeArray = () => {
  for (let i = 0; i < 10; i++) {
    episodes.push(podfiles[i].url);
  }
  return episodes;
};

const fetchEpisodesData = (podfiles) => {
  //const URL = `https://api.sr.se/api/v2/programs${query}&pagination=false`;

  const URL = 'https://api.sr.se/api/v2/podfiles?programid=4845&format=json';
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      console.log('fetching... ', data);

      let podfiles = data.podfiles;
      console.log('podfiles are ', podfiles);
      let episodes = [];
      episodes.map(episodeArray);
      console.log('episodes are ', episodes);
      populatePost(data);
      // buildChannelList(channelData);
      // buildFooter(channelData);
    })
    .catch((error) => {
      console.log(error, 'There has been an error');
    });
};

fetchEpisodesData();
