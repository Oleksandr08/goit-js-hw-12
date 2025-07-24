import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderImages(images, gallery) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
      <li class="gallery-item">
        <a href="${largeImageURL}" class="gallery-link">
          <img src="${webformatURL}" alt="${tags}" class="gallery-image" />
        </a>
        <div class="image-info">
          <div><b>Likes:</b> ${likes}</div>
          <div><b>Views:</b> ${views}</div>
          <div><b>Comments:</b> ${comments}</div>
          <div><b>Downloads:</b> ${downloads}</div>
        </div>
      </li>`;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader-wrapper').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader-wrapper').classList.add('is-hidden');
}