const accordeon = document.querySelector('.accordeon');
const accordeonOptions = document.querySelectorAll('.accordeon__option');

accordeon.style.setProperty('--options-count', accordeonOptions.length);

accordeonOptions.forEach(option => {
  option.addEventListener('click', () => {
    if (option.classList.contains('accordeon__option_active')) {
      return;
    }

    accordeonOptions.forEach(option => {
      option.classList.remove('accordeon__option_active');
    });

    option.classList.add('accordeon__option_active');
  });
});
