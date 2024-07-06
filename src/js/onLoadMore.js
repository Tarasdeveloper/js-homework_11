import {
  currentPage,
  currentQuery,
  fetchGallery,
  hideLoadMoreButton,
  showEndOfResultsMessage,
  lightbox,
  incrementCurrentPage,
} from './gallery';
import { renderImages } from './renderImages';

export async function onLoadMore() {
  incrementCurrentPage();
  try {
    const { images } = await fetchGallery(currentQuery, currentPage);
    if (images.length === 0) {
      hideLoadMoreButton();
      showEndOfResultsMessage();
      return;
    }

    renderImages(images);
    lightbox.refresh();

    const { images: nextImages } = await fetchGallery(
      currentPage + 1,
      currentQuery
    );
    if (nextImages.length === 0) {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
  }
}
