// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

console.log(galleryItems);

const galleryDivRef = document.querySelector('.gallery');

const galleryImgItem = galleryItems
  .map(({ preview, original, description }) => {
    return /*html*/ `
    <a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`;
  })
  .join('');

galleryDivRef.innerHTML = galleryImgItem;

const modalGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
