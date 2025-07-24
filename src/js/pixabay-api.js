import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51418093-89174c8449e8a26154b177f03'; 

export async function fetchImages(query, currentPage) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: currentPage,
      },
    });

    if (response.data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
    }

    return {
      result: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again later',
      position: 'topRight',
    });
    console.error('Error: ', error);
  }
}