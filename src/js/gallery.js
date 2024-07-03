import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const url = 'https://pixabay.com/api/';
const api_key = '38007224-36f28fb0d2ff305028ad64684';

const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';

let query = 'sky';
let page = 1;

function fetchGallery() {
  fetch(
    `${url}?key=${api_key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  )
    .then(res => res.json())
    .then(data => {
      const { hits: images, totalHits } = data;

      if (images.length > 0) {
        renderImages(images);
        showSearchResults(totalHits);
      } else {
        showNoResultsMessage();
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

fetchGallery();

function renderImages(images) {
  const cardsMarkup = images
    .map(image => createImageCardMarkup(image))
    .join('');

  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
  initializeLightbox();
}

function createImageCardMarkup(image) {
  return `
    <div class="photo-card">
      <a class="photo-card-link" href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> 
        <div class="info">
          <p class="info-item">
            <b>Likes:</b> ${image.likes}
          </p>
          <p class="info-item">
            <b>Views:</b> ${image.views}
          </p>
          <p class="info-item">
            <b>Comments:</b> ${image.comments}
          </p>
          <p class="info-item">
            <b>Downloads:</b> ${image.downloads}
          </p>
        </div>
      </a>
    </div>
  `;
}

function showNoResultsMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function showEndOfResultsMessage() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

function showSearchResults(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

function initializeLightbox() {
  lightbox = new SimpleLightbox('.photo-card .photo-card-link', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}
