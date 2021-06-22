import galleryItems from "./app.js";

const refs = {
  galleryList: document.querySelector('.js-gallery'),
  lightboxEl: document.querySelector('.js-lightbox'),
  ImgLightbox: document.querySelector('.lightbox__image'),
  body: document.querySelector('body'),
  buttonClose: document.querySelector('button[data-action="close-lightbox"]'),
}

const changePicture = (src, alt) => {
  refs.ImgLightbox.src = src;
  refs.ImgLightbox.alt = alt;
};

const galleryMarkup = galleryElementMarkup(galleryItems);

refs.galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function galleryElementMarkup(images) {
    return images.map(({ preview, original, description }) =>
      `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`,)
      .join('');
  }

const onOpenModal = (e) => {
  e.preventDefault();
  const isGalleryImgEl = e.target.classList.contains('gallery__image');

  if (!isGalleryImgEl) return;
  changePicture(e.target.dataset.source, e.target.alt);
  refs.lightboxEl.classList.add('is-open');
  refs.body.style.overflow = 'hidden';
}
refs.galleryList.addEventListener('click', onOpenModal);


const onCloseModal = (e) => {
  refs.lightboxEl.classList.remove('is-open');
  
  changePicture('', '');
  refs.lightbox.classList.remove('is-open');
  refs.body.style.overflow = 'initial';
}
refs.buttonClose.addEventListener('click', onCloseModal);


const selectImgLeftRight = (e) => {
  let counter = 0;
  galleryItems.forEach((img, index, array) => {
    if (img.original === refs.ImgLightbox.src && counter === 0) {
      if (e.code === 'ArrowLeft') {
        counter = index > 0 ? index - 1 : array.length - 1;
      } else {
        counter = index === array.length - 1 ? 0 : index + 1;
      }
      changePicture(array[counter].original, array[counter].description);
    };
  });
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') 
    return onCloseModal(e);
  if (e.code === 'ArrowLeft') 
    return selectImgLeftRight(e);
  if (e.code === 'ArrowRight') 
    return selectImgLeftRight(e);
  });