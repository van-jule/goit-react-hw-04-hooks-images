// const imageFetch = (imageValue, page) => {
//   const KEY_API = '23070790-299ad5e8dfdc75cc527267990';
//   const BASE_URL = 'https://pixabay.com/api/';

//   fetch(
//     `${BASE_URL}&q=${imageValue}&page=${page}&per_page=12&key=${KEY_API}`,
//   ).then(res => {
//     return res.json();
//   });
// };

// export default imageFetch;

import axios from 'axios';

axios.defaults.baseURL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY_API = '23070790-299ad5e8dfdc75cc527267990';

async function fetchPixaBayAPI(imageValue, page = 1) {
  try {
    const {
      data: { hits },
    } = await axios.get(
      `?&q=${imageValue}&page=${page}&key=${KEY_API}&per_page=12`,
    );
    return hits;
  } catch (error) {
    console.log(error.message);
  }
}

export default fetchPixaBayAPI;
