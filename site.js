const shotUrl = index => {
  const number = Number(index);
  return Number.isInteger(number) && number >= 0 && number < 10
    ? 'media/screenshot-' + String(number + 1).padStart(2, '0') + '.jpg'
    : '';
};
document.querySelectorAll('[data-shot]').forEach(img => { img.src = shotUrl(img.dataset.shot); });
document.querySelectorAll('[data-shot-link]').forEach(link => { link.href = shotUrl(link.dataset.shotLink); if (link.closest('.press-gallery')) link.download = 'applied-shamanism-screenshot-' + String(Number(link.dataset.shotLink) + 1).padStart(2, '0') + '.jpg'; });

const trailer = document.getElementById('steam-trailer');
if (trailer) {
  const stream = 'https://video.akamai.steamstatic.com/store_trailers/4434480/1516714274/d416f8dbdacdc4485868b936ab90c45395a5d422/1780949428/hls_264_master.m3u8';
  const script = document.createElement('script');
  script.src = 'vendor/hls.min.js';
  script.onload = () => {
    if (window.Hls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(stream);
      hls.attachMedia(trailer);
    } else if (trailer.canPlayType('application/vnd.apple.mpegurl')) {
      trailer.src = stream;
    }
  };
  script.onerror = () => {
    if (trailer.canPlayType('application/vnd.apple.mpegurl')) trailer.src = stream;
  };
  document.head.appendChild(script);
}
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const value = button.parentElement.querySelector('p')?.textContent.trim();
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select text to copy';
    }
    setTimeout(() => { button.textContent = 'Copy text'; }, 2500);
  });
});