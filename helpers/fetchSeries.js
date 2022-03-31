const fetchSeries = async () => {
  const url = 'https://api.tvmaze.com/shows';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchSeries,
  };
}