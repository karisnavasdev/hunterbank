const CA = 'soonpump';

const copyBtn = document.getElementById('copyBtn');
const copyLabel = document.getElementById('copyLabel');

copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(CA);
    copyBtn.classList.add('copied');
    copyLabel.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyLabel.textContent = 'Copy';
    }, 2000);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = CA;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    copyLabel.textContent = 'Copied!';
    setTimeout(() => { copyLabel.textContent = 'Copy'; }, 2000);
  }
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = `${Math.random() * 100}%`;
  p.style.animationDuration = `${6 + Math.random() * 10}s`;
  p.style.animationDelay = `${Math.random() * 10}s`;
  const size = 3 + Math.random() * 5;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  particlesContainer.appendChild(p);
}

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

const images = Array.from(galleryItems).map(item => ({
  src: item.querySelector('img').src,
  alt: item.querySelector('img').alt
}));

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = images[index].src;
  lightboxImg.alt = images[index].alt;
  lightboxCounter.textContent = `${index + 1} / ${images.length}`;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  openLightbox(currentIndex);
}

galleryItems.forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.about-card, .step-card, .social-card, .gallery-item').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
