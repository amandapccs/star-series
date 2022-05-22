const SECTION = document.querySelector('#series-section');
const FILTER_BTN = document.querySelector('#btn-filter');
const SORT_BTN = document.querySelector('#btn-sort');
const SELECT = document.querySelector('#filter');
const INPUT = document.querySelector('#value');

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

const createSeriesThumbnail = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'thumbnail'
  img.src = imageSource;
  return img;
}

const createSeriesDiv = ({name, image}) => {
  const div = createCustomElement('div', 'series-div', '')
  div.appendChild(createSeriesThumbnail(image));
  div.appendChild(createCustomElement('span', 'series-name', name));
  div.appendChild(createCustomElement('i', 'fa-solid fa-star', ''))
  SECTION.appendChild(div);
}

const render = async (allSeries) => {
  allSeries.forEach((series) => {
    const seriesInfo = {
      name: series.name,
      image: series.image.medium,
    }
    createSeriesDiv(seriesInfo);
  })
}

const renderSeries = async () => {
  const getSeries = await fetchSeries();
  render(getSeries);
};

const renderByType = async () => {
  const getSeries = await fetchSeries();
  if (SELECT.options[SELECT.selectedIndex].text === 'Gênero') {
    const filtered = getSeries.filter((series) => series.genres.includes(INPUT.value));
    SECTION.innerHTML = '';
    render(filtered)
  };
  if (SELECT.options[SELECT.selectedIndex].text === 'Nome') {
    const findByName = getSeries.filter((series) => series.name === INPUT.value);
    SECTION.innerHTML = '';
    render(findByName)
  };
  if (SELECT.options[SELECT.selectedIndex].text === 'Idioma') {
    const findByLanguage = getSeries.filter((series) => series.language === INPUT.value);
    SECTION.innerHTML = '';
    render(findByLanguage)
  };
}

const compare = (a, b) => {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
};

const sortSeries = async () => {
  const getSeries = Array.from(document.querySelectorAll('.series-name'));
  const seriesMapped = getSeries.map((series) => series.innerHTML);
  const fetched = await fetchSeries();
  const filtered = fetched.filter((series) => seriesMapped.find((name) => series.name === name));
  SECTION.innerHTML = '';

  const eachSeries = filtered.sort(compare)

  render(eachSeries)
}

const favoriteSeries = () => {
  const STAR = document.querySelectorAll('.fa-star');
  STAR.forEach((star) => star.addEventListener('click', () => star.classList.add('yellow')))
}
  
window.onload = async () => {
  await renderSeries()
  FILTER_BTN.addEventListener('click', renderByType)
  SORT_BTN.addEventListener('click', sortSeries)
  favoriteSeries()
}