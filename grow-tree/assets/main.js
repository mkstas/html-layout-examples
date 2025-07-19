const swiper = new Swiper('.swiper', {
  direction: 'vertical',
  speed: 1700,
  mousewheel: true,
  parallax: true,
});

swiper.on('slideChange', () => {
  document.querySelectorAll('.main-content').forEach((e, i) => {
    return swiper.activeIndex === i
      ? e.classList.add('main-content_active')
      : e.classList.remove('main-content_active');
  });
});

document.querySelectorAll('.main-content__title').forEach(e => {
  e.innerHTML = e.textContent
    .replace(/ (-|#|@){1}/g, s => s[1] + s[0])
    .replace(/(\S*)/g, m => m.replace(/\S(-|#|@)?/g, '<span class="main-content__title-letter">$&</span>'));

  e.querySelectorAll('.main-content__title-letter').forEach((l, i) => {
    l.setAttribute('style', `z-index: -${i}; transition-duration: ${i / 5 + 1}s`);
  });
});
