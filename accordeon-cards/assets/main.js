const optionsContainer = document.querySelector('.content');
const options = document.querySelectorAll('.content__item');

optionsContainer.addEventListener('click', e => {
  const clickedOption = e.target.closest('.content__item');

  if (!clickedOption || clickedOption.classList.contains('content__item_active')) {
    return;
  }

  options.forEach(option => {
    option.classList.remove('content__item_active');
  });

  clickedOption.classList.add('content__item_active');
});
