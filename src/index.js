import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');
const DEBOUNCE_DELAY = 300;

const onSearch = evt => {
  evt.preventDefault();
  const name = evt.target.value.trim();
  console.log(`${name}`);
  if (!name) {
    list.innerHTML = '';
    info.innerHTML = '';
  } else {
    fetchCountries(name)
      .then(data => {
        if (data.length >= 10) {
          Notiflix.Notify.warning(
            'Too many matches found. Please enter a more specific name.'
          );
        } else renderList(data);
      })
      .catch(failure =>
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
  }
};

function renderList(data) {
  if (data.length >= 2) {
    const markup = data
      .map(data => {
        return `<li>
          <p><b>Name</b>: ${data.name.common}</p>
          <p><b>Flags</b>: <img src="${data.flags.svg}" alt="${data.flags.svg}" width = "60" heigth='20'></p>
          
        </li>`;
      })
      .join('');
    list.innerHTML = markup;
    info.innerHTML = '';
  } else {
    const markup = data
      .map(({ flags, name, capital, population, languages }) => {
        console.log(languages);
        return `<div class="card-js">
      <h2>
        <img src="${flags.svg}" alt="${name.common}" width = "45">
        ${name.official}
      </h2>
      <div>
        <p><b>Capital: </b>${capital}</p>
        <p><b>Population: </b>${population}</p>
        <p><b>Languages: </b>${Object.values(languages)}</p>
      </div>
    </div>`;
      })
      .join('');
    console.log(markup);
    list.innerHTML = '';
    info.innerHTML = markup;
  }
}

input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
