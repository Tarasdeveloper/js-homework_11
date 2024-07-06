import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import { gallery, renderImages } from './renderImages';
import { onLoadMore } from './onLoadMore';
import axios from 'axios';

export const formRef = document.querySelector('.search-form');
const btnLoadMore = document.querySelector('.load-more');

const url = 'https://pixabay.com/api/';
const api_key = '38007224-36f28fb0d2ff305028ad64684';

btnLoadMore.addEventListener('click', onLoadMore);
formRef.addEventListener('submit', onSearch);

export let currentPage = 1;
export let currentQuery = '';
export let lightbox;

document.addEventListener('DOMContentLoaded', () => {
  lightbox = new SimpleLightbox('.photo-card .photo-card-link', {
    captions: true,
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
});

async function onSearch(event) {
  event.preventDefault();
  clearGallery();

  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;

  try {
    const { images, totalHits } = await fetchGallery(searchQuery, currentPage);
    if (images.length === 0) {
      showNoResultsMessage();
      return;
    }

    showLoadMoreButton();
    formRef.reset();
    renderImages(images);
    showSearchResults(totalHits);
    lightbox.refresh();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchGallery(query, page) {
  return axios
    .get(
      `${url}?key=${api_key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    )
    .then(response => {
      const { hits, totalHits } = response.data;
      return { images: hits, totalHits };
    })
    .catch(error => {
      throw new Error(`Failed to fetch images: ${error.message}`);
    });
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  btnLoadMore.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  btnLoadMore.classList.add('is-hidden');
}

export function showNoResultsMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function showEndOfResultsMessage() {
  Notiflix.Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}

export function showSearchResults(totalHits) {
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

export function incrementCurrentPage() {
  currentPage += 1;
}
