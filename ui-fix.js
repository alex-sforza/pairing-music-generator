// Pairing Music Generator — UI fixes
(function () {
  function removeRedundantStyleLine() {
    var heads = document.querySelectorAll('.result-head');
    heads.forEach(function(head){
      head.querySelectorAll('*').forEach(function(el){
        if (el === head || el.tagName === 'H2') return;
        var text = (el.textContent || '').trim();
        if (!text || text.length > 180) return;
        var hits = ['Glam Rock','Glam Metal','Gothic Rock','Gothic Metal','Hard Rock','Alternative Rock','Experimental Rock','Darkwave','Synthpop','Synthwave','Dream Pop','Shoegaze','Punk Rock','Industrial Rock','Blues Rock','Classic Rock','Symphonic Metal','Folk','Dark Folk','Jazz','Dark Jazz','Ambient','Metalcore','Emo','Post-Hardcore','Dark Cabaret','Theatrical Rock','Occult Rock','Visual Kei','Pop Rock','Indie Rock','Indie Pop','Post-Punk','Industrial','Grunge','Nu Metal','Progressive Rock','Progressive Metal','Electropop','Witch House','Industrial Techno','Soul','Funk'];
        var count = hits.filter(function(x){ return text.indexOf(x) !== -1; }).length;
        if (count >= 2 && (text.indexOf('·') !== -1 || text.indexOf('/') !== -1)) el.remove();
      });
    });
  }

  function removeRedundantFacts() {
    document.querySelectorAll('.fact').forEach(function(card){
      var text = (card.textContent || '').toLowerCase().replace(/\s+/g,' ').trim();
      if (text.indexOf('музыкальный архетип') !== -1 || text.indexOf('исходные группы') !== -1) card.remove();
    });
  }

  function hideLocalImageControls() {
    document.querySelectorAll('.upload-card').forEach(function(card){
      var fileLabel = card.querySelector('.file-label');
      if (fileLabel) fileLabel.style.display = 'none';
      var fileName = card.querySelector('.file-name');
      if (fileName) fileName.style.display = 'none';
    });
  }

  function addFourthReview() {
    var grid = document.querySelector('.review-grid');
    if (!grid || grid.querySelector('[data-review-four]')) return;
    var fourth = document.createElement('article');
    fourth.className = 'review';
    fourth.setAttribute('data-review-four','1');
    fourth.innerHTML = '<h4>★★★★★ · AFTER DARK</h4><p>«Редкий случай, когда химия между двумя людьми не мешает музыке, а становится её главным инструментом. Они превращают личную драму в песни, которые хочется включать снова.»</p>';
    grid.appendChild(fourth);
  }

  // Надёжный обработчик выбора. Он работает в capture-фазе и не зависит
  // от inline onclick в index.html, поэтому мелкие изменения генератора
  // больше не должны отключать кнопки.
  function bindSelectionButtons() {
    if (document.documentElement.dataset.selectionFixBound === '1') return;
    document.documentElement.dataset.selectionFixBound = '1';

    document.addEventListener('click', function (event) {
      var button = event.target.closest('.feeling-chip, .chip, .choice button');
      if (!button) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      if (button.classList.contains('feeling-chip')) {
        var feelingList = button.closest('.feeling-list');
        if (!feelingList) return;
        feelingList.querySelectorAll('.feeling-chip.selected').forEach(function (el) {
          el.classList.remove('selected');
        });
        button.classList.add('selected');
        return;
      }

      if (button.classList.contains('chip')) {
        var styleList = button.closest('.style-list');
        if (!styleList) return;
        var selected = styleList.querySelectorAll('.chip.selected');
        if (button.classList.contains('selected')) {
          button.classList.remove('selected');
        } else if (selected.length < 3) {
          button.classList.add('selected');
        }
        var number = styleList.id === 'styles1' ? '1' : '2';
        var items = Array.from(styleList.querySelectorAll('.chip.selected')).map(function (el) { return el.textContent; });
        var counter = document.getElementById('counter' + number);
        var confirm = document.getElementById('confirm' + number);
        if (counter) counter.textContent = items.length + ' / 3';
        if (confirm) confirm.innerHTML = [0,1,2].map(function(i){
          return '<div class="style-confirm-item ' + (items[i] ? 'confirmed' : '') + '"><span>' + (i+1) + '</span><b>' + (items[i] || 'Музыкальный стиль не выбран') + '</b></div>';
        }).join('');
        return;
      }

      if (button.classList.contains('choice')) return;
      var choice = button.closest('.choice');
      if (choice) {
        choice.querySelectorAll('button.selected').forEach(function (el) { el.classList.remove('selected'); });
        button.classList.add('selected');
      }
    }, true);
  }

  function bind() {
    hideLocalImageControls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
    bindSelectionButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  new MutationObserver(function(){ bind(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
