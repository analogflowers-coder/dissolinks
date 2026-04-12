/**
 * DISS0LINKZ Background Animations v.3.3.3
 * 5 cyberpunk canvas backgrounds for creator landing pages
 * DISSOVERSE LLC | 2026
 */

(function() {
  var canvas = document.getElementById('dv-matrix-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, cols, drops, fontSize = 14;
  var _mobile = (window.innerWidth < 768 || navigator.maxTouchPoints > 0);
  if (_mobile) fontSize = 28;

  var currentBg = window.dvBackgroundType || 'matrix';
  var _timer = null;
  var _frame = null;
  var _interval = _mobile ? 90 : 45;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = [];
    for (var i = 0; i < cols; i++) drops[i] = Math.random() * -H / fontSize;
  }
  window.addEventListener('resize', resize);
  resize();

  // ── COLOR HELPERS ──
  function getColor() { return window.dvMatrixColor || getComputedStyle(document.documentElement).getPropertyValue('--matrix-color').trim() || '#00ff41'; }
  function getFade() { return window.dvMatrixFade || getComputedStyle(document.documentElement).getPropertyValue('--matrix-fade').trim() || 'rgba(0,255,65,0.4)'; }
  function getRGB() {
    var raw = getComputedStyle(document.documentElement).getPropertyValue('--neon-rgb').trim() || '0,255,65';
    return raw.split(',').map(function(v) { return parseInt(v.trim()); });
  }

  // ════════════════════════════════════════════
  // BACKGROUND 1: MATRIX RAIN (original)
  // ════════════════════════════════════════════
  var matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/\\~`゠ァアィイゥウェエォコデブプホラン';
  function drawMatrix() {
    var spd = window.dvMatrixSpeed || 1;
    var col = getColor();
    var fade = getFade();
    ctx.fillStyle = 'rgba(0,0,0,0.055)';
    ctx.fillRect(0, 0, W, H);
    for (var i = 0; i < cols; i++) {
      var char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      var y = drops[i] * fontSize;
      if (drops[i] > 0) {
        ctx.fillStyle = drops[i] < 2 ? '#ffffff' : (Math.random() > 0.1 ? col : fade);
        ctx.font = fontSize + 'px "JetBrains Mono", monospace';
        ctx.fillText(char, i * fontSize, y);
      }
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i] += (0.5 + Math.random() * 0.5) * spd;
    }
  }

  // ════════════════════════════════════════════
  // BACKGROUND 2: SIGNAL SCAN (radar sweep)
  // ════════════════════════════════════════════
  var scanY = 0, scanDir = 1, scanSpeed = 2;
  function drawSignalScan() {
    var rgb = getRGB();
    ctx.fillStyle = 'rgba(0,0,0,0.03)';
    ctx.fillRect(0, 0, W, H);
    // Scan line
    var grad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.4, 'rgba(' + rgb.join(',') + ',0.15)');
    grad.addColorStop(0.5, 'rgba(' + rgb.join(',') + ',0.6)');
    grad.addColorStop(0.6, 'rgba(' + rgb.join(',') + ',0.15)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.fillRect(0, scanY - 40, W, 80);
    // Bright center line
    ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',0.8)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, scanY);
    ctx.lineTo(W, scanY);
    ctx.stroke();
    // Horizontal interference lines
    for (var i = 0; i < 3; i++) {
      var ly = scanY + (Math.random() - 0.5) * 60;
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + (Math.random() * 0.3) + ')';
      ctx.beginPath();
      ctx.moveTo(Math.random() * W * 0.3, ly);
      ctx.lineTo(W * 0.7 + Math.random() * W * 0.3, ly);
      ctx.stroke();
    }
    scanY += scanSpeed * scanDir * (window.dvMatrixSpeed || 1);
    if (scanY > H + 40) scanDir = -1;
    if (scanY < -40) scanDir = 1;
  }

  // ════════════════════════════════════════════
  // BACKGROUND 3: HEX STREAM (flowing hex values)
  // ════════════════════════════════════════════
  var hexStreams = [];
  function initHexStreams() {
    hexStreams = [];
    for (var i = 0; i < Math.floor(H / 20); i++) {
      hexStreams.push({ y: i * 20, x: Math.random() * W, speed: 0.5 + Math.random() * 2, text: '' });
      for (var j = 0; j < 20; j++) hexStreams[i].text += '0x' + Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0') + ' ';
    }
  }
  initHexStreams();
  function drawHexStream() {
    var rgb = getRGB();
    ctx.fillStyle = 'rgba(0,0,0,0.06)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '11px "JetBrains Mono", monospace';
    for (var i = 0; i < hexStreams.length; i++) {
      var s = hexStreams[i];
      var alpha = 0.15 + Math.random() * 0.25;
      ctx.fillStyle = 'rgba(' + rgb.join(',') + ',' + alpha + ')';
      ctx.fillText(s.text, s.x, s.y);
      s.x -= s.speed * (window.dvMatrixSpeed || 1);
      if (s.x < -600) {
        s.x = W + 10;
        s.text = '';
        for (var j = 0; j < 20; j++) s.text += '0x' + Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0') + ' ';
      }
    }
  }

  // ════════════════════════════════════════════
  // BACKGROUND 4: STATIC NOISE (VHS/TV snow)
  // ════════════════════════════════════════════
  var noiseData = null;
  var _channelFlicker = 0;
  function drawStaticNoise() {
    var rgb = getRGB();
    if (!noiseData || noiseData.width !== W || noiseData.height !== H) {
      noiseData = ctx.createImageData(W, H);
    }
    var d = noiseData.data;
    var spd = window.dvMatrixSpeed || 1;
    var intensity = Math.min(spd * 0.4 + 0.3, 1.0);
    // Channel flicker — random horizontal bands brighten/dim
    var flickerBand = Math.random() > 0.85;
    var flickerY = flickerBand ? Math.floor(Math.random() * H) : -1;
    var flickerH = flickerBand ? 20 + Math.floor(Math.random() * 80) : 0;
    for (var i = 0; i < d.length; i += 4) {
      var pixelY = Math.floor((i / 4) / W);
      var v = Math.random() * 255;
      // Boost pixels in flicker band
      var bandBoost = (flickerBand && pixelY >= flickerY && pixelY < flickerY + flickerH) ? 2.5 : 1;
      d[i] = Math.min(255, v * (rgb[0] / 255) * intensity * bandBoost);
      d[i + 1] = Math.min(255, v * (rgb[1] / 255) * intensity * bandBoost);
      d[i + 2] = Math.min(255, v * (rgb[2] / 255) * intensity * bandBoost);
      d[i + 3] = 40 + Math.random() * 160;
    }
    ctx.putImageData(noiseData, 0, 0);
    // Frequent glitch tears
    if (Math.random() > 0.9) {
      var tearY = Math.random() * H;
      var tearH = 2 + Math.random() * 15;
      var shift = (Math.random() - 0.5) * 60;
      var slice = ctx.getImageData(0, Math.max(0,tearY), W, tearH);
      ctx.putImageData(slice, shift, tearY);
    }
    // VHS horizontal roll bar
    _channelFlicker += 3 + Math.random() * 5;
    if (_channelFlicker > H) _channelFlicker = 0;
    ctx.fillStyle = 'rgba(' + rgb.join(',') + ',0.12)';
    ctx.fillRect(0, _channelFlicker, W, 3);
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.fillRect(0, _channelFlicker + 3, W, 30);
  }

  // ════════════════════════════════════════════
  // BACKGROUND 5: GRID PULSE (Tron cyberspace)
  // ════════════════════════════════════════════
  var gridPulse = 0;
  function drawGridPulse() {
    var rgb = getRGB();
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, W, H);
    var cx = W / 2, cy = H * 0.65;
    var gridSize = 40;
    var perspective = 300;
    // Horizontal lines (receding into distance)
    for (var z = 1; z < 30; z++) {
      var depth = z * gridSize;
      var screenY = cy + (perspective * 100) / depth;
      if (screenY > H || screenY < 0) continue;
      var fade = Math.max(0, 1 - z / 30);
      var pulseWave = Math.sin((gridPulse - z * 0.3)) * 0.3 + 0.7;
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + (fade * 0.3 * pulseWave) + ')';
      ctx.lineWidth = fade * 2;
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(W, screenY);
      ctx.stroke();
    }
    // Vertical lines (converging to vanishing point)
    for (var x = -15; x <= 15; x++) {
      var x1 = cx + x * gridSize * 3;
      var fade2 = Math.max(0, 1 - Math.abs(x) / 15);
      ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + (fade2 * 0.15) + ')';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, H);
      ctx.lineTo(cx + x * 2, cy - 50);
      ctx.stroke();
    }
    // Pulse ring
    var pulseRadius = ((gridPulse * 30) % (W * 0.8));
    var pulseAlpha = Math.max(0, 0.4 - pulseRadius / (W * 0.8) * 0.4);
    ctx.strokeStyle = 'rgba(' + rgb.join(',') + ',' + pulseAlpha + ')';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(cx, cy, pulseRadius, pulseRadius * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
    gridPulse += 0.02 * (window.dvMatrixSpeed || 1);
  }

  // ════════════════════════════════════════════
  // ENGINE: Switch between backgrounds
  // ════════════════════════════════════════════
  var drawFunctions = {
    'matrix': drawMatrix,
    'signal': drawSignalScan,
    'hex': drawHexStream,
    'static': drawStaticNoise,
    'grid': drawGridPulse
  };

  function startBackground(type) {
    currentBg = type || 'matrix';
    if (_timer) clearInterval(_timer);
    if (_frame) cancelAnimationFrame(_frame);
    ctx.clearRect(0, 0, W, H);
    if (type === 'signal') { scanY = 0; scanDir = 1; }
    if (type === 'hex') initHexStreams();
    if (type === 'grid') gridPulse = 0;

    if (type === 'static') {
      // Static noise needs requestAnimationFrame for smooth rendering
      function staticLoop() {
        drawStaticNoise();
        _frame = requestAnimationFrame(staticLoop);
      }
      _frame = requestAnimationFrame(staticLoop);
    } else {
      _timer = setInterval(drawFunctions[type] || drawMatrix, _interval);
    }
  }

  // ── EXPOSE GLOBALS ──
  window.dvSetBackground = function(type) { startBackground(type); };
  window.dvRestartMatrix = function(ms) {
    _interval = ms;
    startBackground(currentBg);
  };
  window.dvSetMatrixSpeed = window.dvRestartMatrix;
  window.dvRefreshMatrixColor = function() {}; // Colors read live from CSS vars
  window.dvMatrixInterval = _interval;

  // Start default
  startBackground('matrix');

  // Fade to background mode after boot
  function fadeToBackground() { if (canvas) canvas.classList.add('dv-matrix-app-mode'); }
  document.addEventListener('dv:booted', fadeToBackground);
  if (sessionStorage.getItem('dv-booted') === 'true') setTimeout(fadeToBackground, 2000);
  setTimeout(fadeToBackground, 10000);
})();
