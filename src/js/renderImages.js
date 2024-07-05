import { lightbox } from './gallery';

export const gallery = document.querySelector('.gallery');

export function renderImages(images) {
  const cardsMarkup = images
    .map(image => createImageCardMarkup(image))
    .join('');

  gallery.insertAdjacentHTML('beforeend', cardsMarkup);
  if (lightbox) {
    lightbox.refresh();
  }
  formRef.clear();
}

export function createImageCardMarkup(image) {
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
