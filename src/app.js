// live search
const form = document.querySelector('#form');
form.addEventListener('input', async (e) => {
  e.preventDefault();
  try {
    document.querySelectorAll('#searchResults li').forEach((li) => li.remove());
    const keyword = form.elements.search.value;
    const config = {
      params: {
        q: keyword,
      },
    };
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);

    addData(res.data);
  } catch (err) {
    console.log(err.message);
  }
});
// tambahkan fitur search ketika link di tekan akan langsung ke bagian profile film
// form Filter
const formFilter = document.querySelector('#formFilter');
formFilter.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedGenre = document.querySelector('#genre').value;
  const selectedTahun = document.querySelector('#tahun').value;
});
// buat agar form sumbit megembalikan nilai card saat tombol di tekan dan menampilkan halaman baru

const addData = (names) => {
  for (let res of names) {
    if (res.show.name) {
      const ul = document.querySelector('#searchResults');
      const li = document.createElement('li');
      li.append(res.show.name);

      ul.append(li);
    }
  }
};

async function GetAllData(keyword) {
  try {
    const config = {
      params: {
        q: keyword,
      },
    };
    const res = await axios.get('https://api.tvmaze.com/search/shows', config);

    DisplayAllFilm(res.data);
    DisplayFavoriteFilm(res.data);
    DisplayFilmTerbaru(res.data);
    DisplayFilmRekomendasi(res.data);
    // eror

    await GetAllData(res.data);
  } catch (error) {
    console.log(error.message);
  }
}

const DisplayFavoriteFilm = (data) => {
  const containerCard = document.querySelector('#slick-container');
  data.forEach((item) => {
    const rating = parseFloat(item.show.rating.average).toFixed(0);
    // console.log(rating);

    if (rating > 7) {
      const card = `
      <div class="card" id="card-popular">
      <img src=${item.show.image.medium} alt="image" width="100%" height="100%">
        <p class="card-qualityFilm">HD</p>
        <p class="card-rating">${item.show.rating.average}</p>
        <div class="body-card">
           <p class="card-title">${item.show.name}</p>
        </div>
     </div>`;
      containerCard.insertAdjacentHTML('beforeend', card);
    }
  });
};

const DisplayFilmTerbaru = (result) => {
  for (let data of result) {
    const years = parseFloat(data.show.premiered);
    if (years >= 2021) {
      const containerCard = document.querySelector('#Film-Terbaru');
      const rating = data.show.rating.average;
      rating == null ? (rating = 0) : rating;
      // ....
      const card = `<div class="card" id="card-black">
        <img src=${data.show.image.medium} alt="image" width="100%" height="100%">
          <p class="card-qualityFilm">HD</p>
          <p class="card-rating">${data.show.rating.average}</p>
          <div class="body-card">
             <p class="card-title">${data.show.name}</p>
          </div>
       </div>`;
      containerCard.insertAdjacentHTML('beforeend', card);
    }
  }
};

const DisplayAllFilm = (data) => {
  data.forEach((item) => {
    // console.log(item.show.genres);
    const conntainerCards = document.querySelector('.container-allFilm');
    const card = `
    <div class="cards-main">
    <img src=${item.show.image.medium} alt="image" width="100%" height="170px">
    
    <div class="card-bodyMain">
       <p class="">${item.show.name} </p>
       <div class="card-footer">
       <p class="title-genres">${item.show.genres}</p>
       <div>
       <button id="card-footerbtnsuccess">Trailer</button>
       </div>
       <div>
       
          <button id="card-footerbtn">Nonton Movie</button>
       </div>
      </div>
    </div>
 </div>`;
    conntainerCards.insertAdjacentHTML('beforeend', card);
  });
};
const DisplayFilmRekomendasi = (data) => {
  data.forEach((item) => {
    console.log(item);
    const containerCards = document.querySelector('#containerRekomFilm');
    const card = `
    <div class="cards-main">
    <img src=${item.show.image.medium} alt="image" width="100%" height="170px">
    
    <div class="card-bodyMain">
       <p class="">${item.show.name} </p>
       <div class="card-footer">
       <p class="title-genres">${item.show.genres}</p>
       <div>
       <button id="card-footerbtnsuccess">Trailer</button>
       </div>
       <div>
       
          <button id="card-footerbtn">Nonton Movie</button>
       </div>
      </div>
    </div>
 </div>`;
    containerCards.insertAdjacentHTML('beforeend', card);
  });
};

const dataFilm = [
  'ninja',
  'action',
  'Adventure',
  'Childern',
  'Drama',
  'Comedy',
  'Legal',
  'DIY',
  'Romance',
  'familiy',
  'War',
  'anime',
  'horor',
  'girls',
  'marvel',
  'Horor',
  'dragon ball',
  'Transformers',
  'Resident Evil',
];
// data hanya terpangil saaat di res pertama pada function

dataFilm.map((item) => {
  GetAllData(item);
});
