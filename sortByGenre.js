const axios = require('axios');
const GetDataFilm = async (keyword) => {
  try {
    const config = {
      params: {
        q: keyword,
      },
    };

    const res = await axios.get('https://api.tvmaze.com/search/shows', config);

    const responseData = res.data ? res.data : null;

    SortbyGenre(responseData);
  } catch (error) {
    console.log(error);
  }
};

const SortbyGenre = (data) => {
  console.log(data);
};

const dataFilm = [
  'action',
  'Adventure',
  'Childern',
  'Drama',
  'Comedy',
  'Legal',
  'ultraman',
  'black',
  'Romance',
  'familiy',
  'War',
  'anime',
  'horor',
  'fantasy',
  'documentary',
  'ninja',
];

dataFilm.forEach((item) => {
  GetDataFilm(item);
});
