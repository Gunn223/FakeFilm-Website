import style from './style.css';
import detail from './Detail.css';
import html from '../index.html';
import { DisplayFilmDetail, getDetailData } from './detail.js';
import { DisplayAllFilm, DisplayFavoriteFilm, DisplayFilmRekomendasi, DisplayFilmTerbaru } from './app.js';

DisplayAllFilm();
DisplayFavoriteFilm();
DisplayFilmRekomendasi();
DisplayFilmTerbaru();
DisplayFilmDetail();
getDetailData();
