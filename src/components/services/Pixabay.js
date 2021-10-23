function fetchImages(value, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '22993210-edd192b19fd9d2ee0b0d8e9c4';
  return fetch(
    `${BASE_URL}?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(response => response.json())
    .then(data => ({ images: data.hits, totalHits: data.totalHits }));
}

const api = {
  fetchImages,
};

export default api;
