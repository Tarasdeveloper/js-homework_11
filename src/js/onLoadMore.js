import {
  currentPage,
  currentQuery,
  fetchGallery,
  hideLoadMoreButton,
  initializeLightbox,
  lightbox,
  showEndOfResultsMessage,
} from './gallery';
import { renderImages } from './renderImages';

export async function onLoadMore() {
  currentPage += 1;
  try {
    const { images } = await fetchGallery(currentQuery, currentPage);
    if (images.length === 0) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
      return;
    }

    renderImages(images);
    initializeLightbox();

    const { images: nextImages } = await fetchGallery(
      currentQuery,
      currentPage + 1
    );

    if (nextImages.length === 0) {
      hideLoadMoreButton();
    }

    lightbox.refresh();
  } catch (error) {
    console.error(error);
  }
}
