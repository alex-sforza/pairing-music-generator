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

  function bind() {
    hideLocalImageControls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  new MutationObserver(function(){ bind(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
