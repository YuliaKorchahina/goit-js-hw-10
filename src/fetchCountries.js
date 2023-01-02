const BASE_URL = 'https://restcountries.com/v3.1/name';

export default function fetchCountries(name) {
  const options = 'name,capital,population,flags,languages';
  return fetch(`${BASE_URL}/${name}?fields=${options}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
