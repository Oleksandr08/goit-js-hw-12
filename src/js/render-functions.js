import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';

let lightbox;

export function renderGallery(cards) {
  const markup = cards
    .map(card => {
      return `
      <a href="${card.largeImageURL}" class="photo-card">
        <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
        <div class="info">
          <p><strong>Likes:</strong> ${card.likes}</p>
          <p><strong>Views:</strong> ${card.views}</p>
          <p><strong>Comments:</strong> ${card.comments}</p>
          <p><strong>Downloads:</strong> ${card.downloads}</p>
        </div>
      </a>
    `;
    })
    .join('');

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 150,
      animationSpeed: 200,
      closeText: '×',
      navText: ['<', '>'],
    });
  }
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showElement(el) {
  el.classList.remove('hidden');
}

export function hideElement(el) {
  el.classList.add('hidden');
}

export function scrollPage() {
  const info = document.querySelector('.gallery a');
  if (!info) return;
  const height = info.getBoundingClientRect().height * 2;

  window.scrollBy({
    top: height,
    behavior: 'smooth',
  });
}

export function checkBtnLoadMoreStatus(params, loadMoreBtn) {
  const perPage = 40;
  const maxPages = Math.ceil(params.total / perPage);

  if (params.page >= maxPages) {
    hideElement(loadMoreBtn);
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  } else {
    showElement(loadMoreBtn);
  }
}