(()=>{const e=document.querySelector("#form");e.addEventListener("input",(async n=>{n.preventDefault();try{document.querySelectorAll("#searchResults li").forEach((e=>e.remove()));const n={params:{q:e.elements.search.value}},t=await axios.get("https://api.tvmaze.com/search/shows",n);a(t.data)}catch(e){console.log(e.message)}})),document.querySelector("#formFilter").addEventListener("submit",(e=>{e.preventDefault(),document.querySelector("#genre").value,document.querySelector("#tahun").value}));const a=e=>{for(let a of e)if(a.show.name){const e=document.querySelector("#searchResults"),n=document.createElement("li");n.append(a.show.name),e.append(n)}};async function n(e){try{const a={params:{q:e}},i=await axios.get("https://api.tvmaze.com/search/shows",a);s(i.data),t(i.data),o(i.data),r(i.data),await n(i.data)}catch(e){console.log(e.message)}}const t=e=>{const a=document.querySelector("#slick-container");e.forEach((e=>{if(parseFloat(e.show.rating.average).toFixed(0)>7){const n=`\n      <div class="card" id="card-popular">\n      <img src=${e.show.image.medium} alt="image" width="100%" height="100%">\n        <p class="card-qualityFilm">HD</p>\n        <p class="card-rating">${e.show.rating.average}</p>\n        <div class="body-card">\n           <p class="card-title">${e.show.name}</p>\n        </div>\n     </div>`;a.insertAdjacentHTML("beforeend",n)}}))},o=e=>{for(let a of e)if(parseFloat(a.show.premiered)>=2021){const e=document.querySelector("#Film-Terbaru"),n=a.show.rating.average;null==n&&(n=0);const t=`<div class="card" id="card-black">\n        <img src=${a.show.image.medium} alt="image" width="100%" height="100%">\n          <p class="card-qualityFilm">HD</p>\n          <p class="card-rating">${a.show.rating.average}</p>\n          <div class="body-card">\n             <p class="card-title">${a.show.name}</p>\n          </div>\n       </div>`;e.insertAdjacentHTML("beforeend",t)}},s=e=>{e.forEach((e=>{const a=document.querySelector(".container-allFilm"),n=`\n    <div class="cards-main">\n    <img src=${e.show.image.medium} alt="image" width="100%" height="170px">\n    \n    <div class="card-bodyMain">\n       <p class="">${e.show.name} </p>\n       <div class="card-footer">\n       <p class="title-genres">${e.show.genres}</p>\n       <div>\n       <button id="card-footerbtnsuccess">Trailer</button>\n       </div>\n       <div>\n       \n          <button id="card-footerbtn">Nonton Movie</button>\n       </div>\n      </div>\n    </div>\n </div>`;a.insertAdjacentHTML("beforeend",n)}))},r=e=>{e.forEach((e=>{console.log(e);const a=document.querySelector("#containerRekomFilm"),n=`\n    <div class="cards-main">\n    <img src=${e.show.image.medium} alt="image" width="100%" height="170px">\n    \n    <div class="card-bodyMain">\n       <p class="">${e.show.name} </p>\n       <div class="card-footer">\n       <p class="title-genres">${e.show.genres}</p>\n       <div>\n       <button id="card-footerbtnsuccess">Trailer</button>\n       </div>\n       <div>\n       \n          <button id="card-footerbtn">Nonton Movie</button>\n       </div>\n      </div>\n    </div>\n </div>`;a.insertAdjacentHTML("beforeend",n)}))};["ninja","action","Adventure","Childern","Drama","Comedy","Legal","DIY","Romance","familiy","War","anime","horor","girls","marvel","Horor","dragon ball","Transformers","Resident Evil"].map((e=>{n(e)}))})();