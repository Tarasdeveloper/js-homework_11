import {
  currentPage,
  currentQuery,
  fetchGallery,
  hideLoadMoreButton,
  showEndOfResultsMessage,
  lightbox,
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
    if (lightbox) {
      lightbox.refresh(); // Обновляем lightbox после добавления новых изображений
    }

    const { images: nextImages } = await fetchGallery(
      currentQuery,
      currentPage + 1
    );

    if (nextImages.length === 0) {
      hideLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
  }
}
