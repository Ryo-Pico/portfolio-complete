document.querySelector('.top-button').addEventListener('click', function (e) {
  e.preventDefault();

  // 1. Canvasでザッピングノイズを描画
  const canvas = document.createElement('canvas');
  canvas.id = 'zap-effect';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '9999';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;

  // ノイズ描画関数
  let frame = 0;
  const noise = () => {
    const imageData = ctx.createImageData(w, h);
    const buffer32 = new Uint32Array(imageData.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.5) buffer32[i] = 0xffffffff;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  // ノイズアニメーション
  const interval = setInterval(() => {
    noise();
    frame++;
    if (frame > 10) {
      clearInterval(interval);
      document.body.removeChild(canvas);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 30);
});

document.addEventListener('DOMContentLoaded', () => {
  const toTopBtn = document.getElementById('to-top');
  const main = document.querySelector('main');

  // スクロール量によってボタンの表示・非表示
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      toTopBtn.style.display = 'block';
    } else {
      toTopBtn.style.display = 'none';
    }
  });

  // クリックでザッピング→スムーススクロール→演出解除
  toTopBtn.addEventListener('click', () => {
    // ザップ演出開始
    main.classList.add('zap');

    // 演出後にスクロールし、classを外す
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        main.classList.remove('zap');
      }, 800);
    }, 0);
  });
});