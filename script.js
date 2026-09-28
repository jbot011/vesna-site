const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('.gallery-item').forEach(btn => {
  btn.addEventListener('click', () => {
    lightboxImg.src = btn.dataset.full;
    lightbox.showModal();
  });
});
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });

const videoModal = document.getElementById('videoModal');
const frame = videoModal?.querySelector('iframe');
document.querySelector('.video-card')?.addEventListener('click', e => {
  frame.src = e.currentTarget.dataset.video;
  videoModal.showModal();
});
function closeVideo(){ frame.src=''; videoModal.close(); }
videoModal?.querySelector('.lightbox-close')?.addEventListener('click', closeVideo);
videoModal?.addEventListener('click', e => { if (e.target === videoModal) closeVideo(); });

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && videoModal?.open) closeVideo();
});


// Motion Monday grid
// On the hosted site, motion.json controls which videos appear and in what order.
// The three cards already present in index.html act as a fallback when the site is opened directly as a local file.
async function loadMotionGrid() {
  const grid = document.querySelector('.motion-grid');
  if (!grid || window.location.protocol === 'file:') return;

  try {
    const response = await fetch('motion.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`motion.json returned ${response.status}`);
    const items = await response.json();
    if (!Array.isArray(items) || items.length === 0) return;

    grid.innerHTML = '';

    items.forEach((item, index) => {
      if (!item || !item.file) return;

      const card = document.createElement('article');
      card.className = 'motion-card reveal visible';

      const media = document.createElement('div');
      media.className = 'motion-media';

      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.setAttribute('aria-label', item.alt || `VESNA Motion Monday animation ${index + 1}`);

      const source = document.createElement('source');
      source.src = `assets/${item.file}`;
      source.type = item.type || 'video/mp4';

      video.appendChild(source);
      media.appendChild(video);
      card.appendChild(media);
      grid.appendChild(card);
    });
  } catch (error) {
    console.warn('Could not load motion.json. Using the built in Motion Monday cards.', error);
  }
}

loadMotionGrid();
