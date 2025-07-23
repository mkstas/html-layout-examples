import ScrollSmoother from '../vendor/ScrollSmoother.min.js';

gsap.registerPlugin(ScrollSmoother);

ScrollSmoother.create({
  wrapper: '.wrapper',
  content: '.content',
  smooth: 1.5,
  effects: true,
});

gsap.fromTo(
  '.intro',
  { opacity: 1 },
  {
    opacity: 0.4,
    scrollTrigger: {
      trigger: '.intro',
      start: '300',
      end: '600',
      scrub: true,
    },
  },
);

const intro = document.querySelector('.intro');
const introCards = document.querySelectorAll('.intro-card');

const minWidth = 192;
const maxWidth = 384;
const padding = 12;

let occupedPositions = [];

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isOverlapping = (x, y, width, height, positions) => {
  return positions.some(pos => {
    return (
      x < pos.x + pos.width + padding &&
      x + width > pos.x - padding &&
      y < pos.y + pos.height + padding &&
      y + height > pos.y - padding
    );
  });
};

const getRandomPositionAndSize = (maxX, maxY, card) => {
  const maxAttempts = 100;
  let attempts = 0;
  let x = 0;
  let y = 0;

  const width = getRandomInt(minWidth, maxWidth);
  const height = Math.floor((width * 2) / 3);

  do {
    x = Math.floor(Math.random() * (maxX - width));
    y = Math.floor(Math.random() * (maxY - height));

    attempts++;

    if (attempts >= maxAttempts) {
      return null;
    }
  } while (isOverlapping(x, y, width, height, occupedPositions));

  let depth = 0;

  const widthRatio = (width - minWidth) / (maxWidth - minWidth);

  if (widthRatio < 0.33) {
    depth = getRandomInt(1, 2);
  } else if (widthRatio < 0.66) {
    depth = getRandomInt(2, 3);
  } else {
    depth = getRandomInt(4, 5);
  }

  return { x, y, width, height, depth };
};

const placeCards = () => {
  const maxX = intro.clientWidth;
  const maxY = intro.clientHeight;

  occupedPositions = [];

  introCards.forEach(card => {
    const cardInfo = getRandomPositionAndSize(maxX, maxY, card);

    if (cardInfo) {
      const { x, y, width, height, depth } = cardInfo;

      card.style.left = `${x}px`;
      card.style.top = `${y}px`;
      card.style.width = `${width}px`;
      card.style.height = `${height}px`;
      card.style.zIndex = depth;
      card.dataset.depth = depth;

      occupedPositions.push({ x, y, width, height });
    } else {
      card.style.display = 'none';
    }
  });
};

intro.addEventListener('mousemove', e => {
  const introRect = intro.getBoundingClientRect();
  const centerX = introRect.width / 2;
  const centerY = introRect.height / 2;
  const mouseX = (e.clientX - introRect.left - centerX) / centerX;
  const mouseY = (e.clientY - introRect.top - centerY) / centerY;

  intro.style.setProperty('--mouse-x', mouseX);
  intro.style.setProperty('--mouse-y', mouseY);
});

window.addEventListener('load', placeCards);
window.addEventListener('resize', placeCards);
