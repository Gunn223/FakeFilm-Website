const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

async function getDetailData(id) {
  try {
    const res = await axios.get(`https://api.tvmaze.com/shows/${id}`);
    DisplayFilmDetail(res.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const DisplayFilmDetail = (data) => {
  const container = document.querySelector('.container');

  // Handle potential changes in the API response structure
  const premiered = data.premiered ? parseInt(data.premiered) : 'Unknown';
  const ended = data.ended ? parseInt(data.ended) : 'Unknown';
  const officialSite = data.officialSite || 'Unknown';
  let country =
    data.network && data.network.country && data.network.country.code ? data.network.country.code : 'Tidak Diketahui';

  const content = `
    <div class="isImageMain">
      <img src=${data.image.medium} alt="image" width="100%" height="100%">
    </div>
    <div class="isDetailMain">
      <p>${data.summary}</p>
    </div>
    <div class="isShowInfo">
      <h1>Show info</h1>
      <div class="line-heightInfo">
        <p>Network: ${'no'} (${premiered} - ${ended})</p>
        <p>Schedule: ${data.schedule.days[0]} at ${data.schedule.time} (${data.runtime} min)</p>
        <p>Status: ${data.status}</p>
        <p>Show Type: ${data.type}</p>
        <p>Genres: ${data.genres.join(', ')}</p>
        <p>Episode Ordered: ${data.weight} eps</p>
        <p>Created By: ${data.network ? data.network.name : 'Unknown'}</p>
        <p>Official Site: ${officialSite}</p>
      </div>
    </div>`;

  container.insertAdjacentHTML('afterbegin', content);
};

getDetailData(id);

export { DisplayFilmDetail, getDetailData };
