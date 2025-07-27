import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showElement,
  hideElement,
  scrollPage,
  checkBtnLoadMoreStatus,
} from './js/render-functions';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader-wrapper');
const input = document.querySelector('.form input');
const loadMore = document.querySelector('.load-more');

const params = {
  query: '',
  page: 1,
  total: null,
};

form.addEventListener('submit', async event => {
  event.preventDefault();

  params.query = event.target.elements.searchQuery.value.trim();
  params.page = 1;

  if (!params.query) {
    iziToast.warning({
      message: 'Please enter a search query',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showElement(loader);
  input.classList.add('active');

  try {
    const { result, totalHits } = await fetchImages(params.query, params.page);

    if (result.length === 0) {
      hideElement(loadMore);
      return;
    }

    renderGallery(result);
    params.total = totalHits;

    checkBtnLoadMoreStatus(params, loadMore);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error', error);
  } finally {
    form.searchQuery.value = '';
    hideElement(loader);
    input.classList.remove('active');
  }
});

loadMore.addEventListener('click', async () => {
  showElement(loader);
  try {
    hideElement(loadMore);
    params.page += 1;

    const { result } = await fetchImages(params.query, params.page);
    renderGallery(result);

    checkBtnLoadMoreStatus(params, loadMore);
    scrollPage();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error('Error', error);
  } finally {
    hideElement(loader);
  }
});