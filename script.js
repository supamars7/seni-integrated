const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.mobile-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const hero = document.querySelector('.hero');
const heroCopy = hero?.querySelector('.hero-copy');
const heroTitle = hero?.querySelector('h1');
const slideData = [
  { title: 'Make every<br><em>connection</em> count.', copy: 'We engineer the infrastructure behind confident businesses — from resilient networks to the hardware and support that keep teams moving.', image: 'assets/network-grid.png' },
  { title: 'Build for<br><em>what’s next.</em>', copy: 'From fiber optics to secure networking, we create a clear path from today’s operations to tomorrow’s ambition.', image: 'assets/network-grid.png' },
  { title: 'Work with<br><em>certainty.</em>', copy: 'One dependable partner for computer sales, engineering and connectivity — with practical thinking at every step.', image: 'assets/network-grid.png' }
];
let currentSlide = 0;
const bars = document.querySelectorAll('.hero-lines i');
function goToSlide(index) {
  currentSlide = (index + slideData.length) % slideData.length;
  const slide = slideData[currentSlide];
  [heroTitle, heroCopy].forEach((element) => element?.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(8px)' }], { duration: 140, fill: 'forwards', easing: 'ease-in' }).finished.then(() => {
    if (element === heroTitle) element.innerHTML = slide.title;
    if (element === heroCopy) element.textContent = slide.copy;
    element.animate([{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 320, fill: 'forwards', easing: 'cubic-bezier(.23,1,.32,1)' });
  }));
  document.querySelector('.hero-bg').style.backgroundImage = `linear-gradient(90deg,rgba(19,16,71,.98) 0%,rgba(27,22,94,.89) 42%,rgba(30,24,90,.42) 100%),url('${slide.image}')`;
  bars.forEach((bar, i) => bar.classList.toggle('active', i === currentSlide));
  const meta = document.querySelector('.hero-meta>span');
  if (meta) meta.textContent = `0${currentSlide + 1} / 03`;
}
document.querySelector('.slider-arrow.next')?.addEventListener('click', () => goToSlide(currentSlide + 1));
document.querySelector('.slider-arrow.prev')?.addEventListener('click', () => goToSlide(currentSlide - 1));
let sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 7000);
hero?.addEventListener('mouseenter', () => clearInterval(sliderTimer));
hero?.addEventListener('mouseleave', () => { sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 7000); });

document.querySelectorAll('.counter').forEach((counter) => {
  const target = Number(counter.dataset.target);
  const observer = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    let start = 0;
    const tick = () => {
      start += Math.max(1, Math.ceil(target / 28));
      counter.textContent = String(Math.min(start, target));
      if (start < target) requestAnimationFrame(tick);
    };
    tick();
    observer.disconnect();
  }, { threshold: 0.6 });
  observer.observe(counter);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
