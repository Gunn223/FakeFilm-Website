//lihat semua film ungulan
const butonFilmUnggunlan = document.querySelector('#btn');
butonFilmUnggunlan.addEventListener('click', () => (window.location.href = 'FavoritePageFilm.html'));
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

const addData = (names) => {
  for (let res of names) {
    if (res.show.name) {
      const ul = document.querySelector('#searchResults');
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.append(li);
      li.append(res.show.name);

      ul.append(a);
      a.href = `Detail.html?id=${res.show.id}`;

      a.addEventListener('click', () => {
        window.location.href = `https://www.tvmaze.com/shows/${res.show.id}`;
      });
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

    const responseData = res.data ? res.data : null;
    // atasi eror di console

    DisplayAllFilm(responseData);
    DisplayFavoriteFilm(responseData);
    DisplayFilmRekomendasi(responseData);
    DisplayFilmTerbaru(responseData);
  } catch (error) {
    console.log(error);
  }
}

// form Filter
// coba buat setiap fungsi untuk menerapkan logic
// const formFilter = document.querySelector('#formFilter');
// formFilter.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const selectedTahun = document.querySelector('#tahun').value;
//   const selectedSeries = document.querySelector('#series').value;
//   const selectedGenre = document.querySelector('#genre').value;

//   const selectedItem = [selectedSeries, selectedGenre, selectedTahun];

// });

const DisplayFavoriteFilm = (data) => {
  const containerCard = document.querySelector('#slick-container');

  data.forEach((item) => {
    let rating = parseFloat(item.show.rating.average).toFixed(0);

    if (rating > 5) {
      const card = `
      <a href="Detail.html?id=${item.show.id}">
      <div class="card" id="card-popular">
      <img src=${item.show.image.medium} alt="image" width="100%" height="100%">
      <p class="card-qualityFilm">HD</p>
      <p class="card-rating">${item.show.rating.average}</p>
      <div class="body-card">
      <p class="card-title">${item.show.name}</p>
      </div>
      </div>
      </a>`;
      containerCard.insertAdjacentHTML('beforeend', card);
    }
  });
};

const DisplayFilmTerbaru = (result) => {
  for (let data of result) {
    const years = parseFloat(data.show.premiered);
    if (years >= 2021) {
      const containerCard = document.querySelector('#Film-Terbaru');
      let rating = data.show.rating.average;
      rating == null ? (rating = 0) : rating;
      // ....

      const card = `
      <a href="Detail.html?id=${data.show.id}">
      <div class="card" id="card-black">
        <img src=${data.show.image.medium} alt="image" width="100%" height="100%">
          <p class="card-qualityFilm">HD</p>
          <p class="card-rating">
          
          ${data.show.rating.average}</p>
          <div class="body-card">
             <p class="card-title">${data.show.name}</p>
          </div>
       </div>
       </a>`;
      containerCard.insertAdjacentHTML('beforeend', card);
    }
  }
};

const DisplayAllFilm = (data, ...filterdata) => {
  data.forEach((item) => {
    const conntainerCards = document.querySelector('.container-allFilm');

    const card = `  
    <div class="cards-main">
    <img src=${item.show.image.original} alt="image" width="100%" height="170px">
    
    <div class="card-bodyMain">
       <p class="">${item.show.name} </p>
       <div class="card-footer">
       <p class="title-genres">${item.show.genres}</p>
       <div>
       <button id="card-footerbtnsuccess">
       <a href="Detail.html?id=${item.show.id}">
       Detail
       </a>
       </button>
       </div>
      </div>
    </div>
 </div>`;
    conntainerCards.insertAdjacentHTML('beforeend', card);
  });
};
const DisplayFilmRekomendasi = (data) => {
  data.forEach((item) => {
    if (item.show.averageRuntime > 60) {
      const containerCards = document.querySelector('#containerRekomFilm');
      const card = `
       <div class="cards-main">
       <img src=${item.show.image.medium} alt="image" width="100%" height="170px">
       
       <div class="card-bodyMain">
          <p class="">${item.show.name} </p>
          <div class="card-footer">
          <p class="title-genres">${item.show.genres}</p>
          <button id="card-footerbtnsuccess">
       <a href="Detail.html?id=${item.show.id}">
       Detail
       </a>
       </button>
         </div>
       </div>
    </div>`;
      containerCards.insertAdjacentHTML('beforeend', card);
    }
  });
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
  GetAllData(item);
});

export { DisplayAllFilm, DisplayFavoriteFilm, DisplayFilmRekomendasi, GetAllData, DisplayFilmTerbaru };
