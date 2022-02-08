const inputEl = document.getElementById("search-box");
const listEl = document.querySelector(".country-list");
const infoEl = document.querySelector(".country-info");
const main = document.getElementById("main");
const main2 = document.getElementById("main2");

const BASE_URL = "https://restcountries.com/v3.1/name";

const fetchCountries = (name) => {
  return fetch(
    `${BASE_URL}/${name}?fields=name,capital,population,flags,languages`
  ).then((response) => {
    if (response.status === 404) {
      return Promise.reject(new Error());
    }
    return response.json();
  });
};

const cleanMarkup = (ref) => (ref.innerHTML = "");

const inputHandler = (e) => {
  const textInput = e.target.value.trim();

  if (!textInput) {
    cleanMarkup(listEl);
    cleanMarkup(infoEl);
    return;
  }

  fetchCountries(textInput)
    .then((data) => {
      console.log(data);
      if (data.length > 10) {
        const cardHTML2 = `
        <div class="card">
            <h1>Too many matches found. Please enter a more specific name</h1>
        </div>
    `;

        main2.innerHTML = cardHTML2;
        setTimeout(() => {
          const cardHTML2 = "";

          main2.innerHTML = cardHTML2;
        },1000);
        return;
      }
      renderMarkup(data);
    })
    .catch((err) => {
      cleanMarkup(listEl);
      cleanMarkup(infoEl);
        const cardHTML = `
        <div class="card">
            <h1>Oops, there is no country with that name</h1>
        </div>
    `;

      main.innerHTML = cardHTML;
      setTimeout(() => {
        const cardHTML = '';

        main.innerHTML = cardHTML;
      }, 1000);
    
    });
};

const renderMarkup = (data) => {
  if (data.length === 1) {
    cleanMarkup(listEl);
    const markupInfo = createInfoMarkup(data);
    infoEl.innerHTML = markupInfo;
  } else {
    cleanMarkup(infoEl);
    const markupList = createListMarkup(data);
    listEl.innerHTML = markupList;
  }
};

const createListMarkup = (data) => {
  return data
    .map(
      ({ name, flags }) =>
        `<li><img src="${flags.png}" alt="${name.official}" width="60" height="40">${name.official}</li>`
    )
    .join("");
};

const createInfoMarkup = (data) => {
  return data.map(
    ({ name, capital, population, flags, languages }) =>
      `<h1><img src="${flags.png}" alt="${
        name.official
      }" width="40" height="40">${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${Object.values(languages)}</p>`
  );
};
const debaunce = _.debounce(inputHandler, 300);
inputEl.addEventListener("input", debaunce);



