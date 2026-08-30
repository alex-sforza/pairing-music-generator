// Pairing Music Generator — stable UI layer
(function () {
  'use strict';

  // Only visual/UI corrections live here. The generator logic remains in index.html.
  function hideLocalImageControls() {
    document.querySelectorAll('.upload-card .file-label, .upload-card .file-name').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  function bindImageUrls() {
    document.querySelectorAll('.upload-card .image-url-field input').forEach(function (input) {
      if (input.dataset.uiUrlBound === '1') return;
      input.dataset.uiUrlBound = '1';
      input.addEventListener('input', function () {
        var card = input.closest('.upload-card');
        var preview = card && card.querySelector('.aesthetic-image');
        if (!preview) return;
        var url = input.value.trim();
        if (!url) {
          preview.textContent = 'вставьте ссылку на изображение';
          return;
        }
        var img = new Image();
        img.onload = function () {
          preview.innerHTML = '';
          preview.appendChild(img);
        };
        img.onerror = function () {
          preview.textContent = 'не удалось загрузить изображение';
        };
        img.src = url;
      });
    });
  }

  function bindPhotoUrls() {
    [['photo1', 'preview1'], ['photo2', 'preview2']].forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      var preview = document.getElementById(pair[1]);
      if (!input || !preview || input.dataset.uiPhotoBound === '1') return;
      input.dataset.uiPhotoBound = '1';
      input.addEventListener('input', function () {
        var url = input.value.trim();
        if (!url) {
          preview.textContent = 'предпросмотр фото';
          return;
        }
        var img = new Image();
        img.onload = function () {
          preview.innerHTML = '';
          preview.appendChild(img);
        };
        img.onerror = function () {
          preview.textContent = 'не удалось загрузить фото';
        };
        img.src = url;
      });
    });
  }

  function removeRedundantStyleLine() {
    // Keep the pair names, but remove the separate line that repeats all selected styles.
    document.querySelectorAll('.pair-names').forEach(function (el) {
      var next = el.nextElementSibling;
      if (!next) return;
      var text = (next.textContent || '').trim();
      var looksLikeStyleLine = /·/.test(text) && /\//.test(text) && text.length < 500;
      if (looksLikeStyleLine) next.remove();
    });
  }

  function removeRedundantFacts() {
    document.querySelectorAll('.fact').forEach(function (el) {
      var text = (el.textContent || '').toLowerCase();
      if (text.includes('музыкальный архетип') || text.includes('исходные группы')) {
        el.remove();
      }
    });
  }

  function addFourthReview() {
    var grid = document.querySelector('.review-grid');
    if (!grid || grid.querySelector('[data-fourth-review="1"]')) return;
    var reviews = grid.querySelectorAll('.review');
    if (reviews.length < 3) return;
    var fourth = document.createElement('article');
    fourth.className = 'review';
    fourth.dataset.fourthReview = '1';
    fourth.innerHTML = '<h4>★★★★☆ · NIGHT &amp; NOISE</h4><p>«Они не столько создают музыку вместе, сколько превращают собственное напряжение в неё. Именно поэтому за их песнями хочется следить внимательнее, чем за любым пресс-релизом.»</p>';
    grid.appendChild(fourth);
  }

  function bindSelectionButtons() {
    if (document.documentElement.dataset.selectionFixBound === '1') return;
    document.documentElement.dataset.selectionFixBound = '1';

    document.addEventListener('click', function (event) {
      var button = event.target.closest('.feeling-chip, .chip, .choice button');
      if (!button) return;

      if (button.classList.contains('feeling-chip')) {
        var feelingList = button.closest('.feeling-list');
        if (!feelingList) return;
        event.preventDefault();
        feelingList.querySelectorAll('.feeling-chip.selected').forEach(function (el) {
          el.classList.remove('selected');
          el.setAttribute('aria-pressed', 'false');
        });
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
        feelingList.dataset.value = button.dataset.key || '';
        return;
      }

      if (button.classList.contains('chip')) {
        var styleList = button.closest('.style-list');
        if (!styleList) return;
        event.preventDefault();
        var selected = styleList.querySelectorAll('.chip.selected');
        if (button.classList.contains('selected')) {
          button.classList.remove('selected');
        } else if (selected.length < 3) {
          button.classList.add('selected');
        }
        var number = styleList.id === 'styles1' ? '1' : '2';
        var items = Array.from(styleList.querySelectorAll('.chip.selected')).map(function (el) { return el.textContent.trim(); });
        var counter = document.getElementById('counter' + number);
        var confirm = document.getElementById('confirm' + number);
        if (counter) counter.textContent = items.length + ' / 3';
        if (confirm) confirm.innerHTML = [0, 1, 2].map(function (i) {
          return '<div class="style-confirm-item ' + (items[i] ? 'confirmed' : '') + '"><span>' + (i + 1) + '</span><b>' + (items[i] || 'Музыкальный стиль не выбран') + '</b></div>';
        }).join('');
        return;
      }

      var choice = button.closest('.choice');
      if (choice) {
        event.preventDefault();
        choice.querySelectorAll('button.selected').forEach(function (el) { el.classList.remove('selected'); });
        button.classList.add('selected');
      }
    }, true);
  }

  function init() {
    hideLocalImageControls();
    bindImageUrls();
    bindPhotoUrls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
    bindSelectionButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Re-apply only visual fixes when the generator redraws its result.
  new MutationObserver(function () {
    hideLocalImageControls();
    bindImageUrls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
