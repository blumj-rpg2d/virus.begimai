const slides = [...document.querySelectorAll('.slide')];
const bar = document.getElementById('bar');
const count = document.getElementById('count');
let i = 0;

function go(n) {
  i = Math.max(0, Math.min(slides.length - 1, n));
  slides.forEach((s, k) => {
    s.classList.toggle('active', k === i);
    s.classList.toggle('past', k < i);
  });
  bar.style.width = ((i + 1) / slides.length) * 100 + '%';
  count.textContent = (i + 1) + ' / ' + slides.length;
  history.replaceState(null, '', '#' + (i + 1));
}

document.getElementById('next').onclick = () => go(i + 1);
document.getElementById('prev').onclick = () => go(i - 1);
addEventListener('keydown', e => {
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(i + 1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(i - 1); }
  if (e.key === 'Home') go(0);
  if (e.key === 'End') go(slides.length - 1);
});
let x0 = null;
addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
addEventListener('touchend', e => {
  if (x0 === null) return;
  const d = e.changedTouches[0].clientX - x0;
  if (Math.abs(d) > 40) go(i + (d < 0 ? 1 : -1));
  x0 = null;
});
go((parseInt(location.hash.slice(1), 10) || 1) - 1);