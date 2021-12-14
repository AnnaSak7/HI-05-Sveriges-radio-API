const fetchEpisodesData = () => {
  const URL = `https://api.sr.se/api/v2/news/episodes${query}`;

  fetch(URL)
    .then((res) => res.json())
    .then((episodesData) => {
      console.log(episodesData);
      // buildChannelList(channelData);
      // buildFooter(channelData);
    })
    .catch((error) => {
      console.log(error, 'There has been an error');
    });
};

fetchEpisodesData();
