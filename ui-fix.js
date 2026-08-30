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

      var choice = button.closest('.choice');
      if (choice) {
        choice.querySelectorAll('button.selected').forEach(function (el) { el.classList.remove('selected'); });
        button.classList.add('selected');
      }
    }, true);
  }

  function cleanCharacterPortraits() {
    var result = document.getElementById('result');
    if (!result || result.classList.contains('hidden')) return;
    result.querySelectorAll('.character-profile p').forEach(function (p) {
      // The old portrait ended with a relationship-specific sentence such as
      // “В дуэте с ... это приобретает оттенок ...”. Keep the character portrait
      // about the character only; relationship wording belongs in the pair blocks.
      var text = p.textContent || '';
      text = text.replace(/\s*В дуэте с\s+[^.]+?\s+это приобретает оттенок\s+«[^»]*»\.?/gi, '').trim();
      text = text.replace(/\s*В дуэте с\s+[^.]+?\.?$/gi, '').trim();
      p.textContent = text;
    });
  }

  function pairArchetypeDescription() {
    var result = document.getElementById('result');
    if (!result || result.classList.contains('hidden')) return;
    var band = result.querySelector('.band-name');
    var pair = result.querySelector('.pair-names');
    var archetype = result.querySelector('.archetype-name');
    var box = result.querySelector('.archetype-box p');
    var bandStyle = result.querySelector('.band-style');
    if (!band || !archetype || !box) return;

    var key = band.textContent.trim() + '|' + archetype.textContent.trim() + '|' + (pair ? pair.textContent.trim() : '');
    if (result.dataset.pairWordingKey === key) return;
    result.dataset.pairWordingKey = key;

    var names = pair ? pair.textContent.split('×').map(function(x){ return x.trim(); }) : [];
    var n1 = document.getElementById('name1') ? document.getElementById('name1').value.trim() : (names[0] || 'Первый персонаж');
    var n2 = document.getElementById('name2') ? document.getElementById('name2').value.trim() : (names[1] || 'Второй персонаж');
    var s1 = document.querySelectorAll('#styles1 .chip.selected');
    var s2 = document.querySelectorAll('#styles2 .chip.selected');
    var styles1 = Array.from(s1).map(function(x){return x.textContent;}).slice(0,3);
    var styles2 = Array.from(s2).map(function(x){return x.textContent;}).slice(0,3);
    var f1 = document.querySelector('#feel1 .feeling-chip.selected strong');
    var f2 = document.querySelector('#feel2 .feeling-chip.selected strong');
    var feeling1 = f1 ? f1.textContent : 'разное восприятие';
    var feeling2 = f2 ? f2.textContent : 'разное восприятие';
    var archetypeName = archetype.textContent.trim();
    var sound = bandStyle ? bandStyle.textContent.trim() : 'два музыкальных мира';

    // This description is deliberately about the pair and their shared sound.
    // It never reuses the one-person archetype portrait from music-archetypes.js.
    var templates = [
      `${n1} и ${n2} превращают ${archetypeName} в общий язык: один музыкальный мир сталкивается с другим, а разница между ними становится частью звучания группы.`,
      `У ${n1} и ${n2} ${archetypeName} работает именно как история о двоих: их разные музыкальные привычки спорят, притягиваются и постепенно складываются в один узнаваемый звук.`,
      `Это не портрет одного музыканта, а музыкальная химия ${n1} и ${n2}: ${archetypeName} собирает их контрасты в группу, где личные различия становятся главным достоинством.`,
      `${n1} и ${n2} звучат вместе так, будто их отношения получили собственный жанр. ${archetypeName} — это место, где их два характера встречаются на одной сцене.`
    ];
    var idx = Math.abs((n1+n2+archetypeName).length) % templates.length;
    box.textContent = templates[idx];

    if (bandStyle) {
      bandStyle.textContent = `${styles1.slice(0,2).join(' + ') || 'первый мир'} × ${styles2.slice(0,2).join(' + ') || 'второй мир'} — ${sound}`;
    }

    // Keep the relationship layer explicitly about the pair.
    var relationBox = result.querySelector('.relation-box');
    if (relationBox) {
      var phraseList = relationBox.querySelector('.phrase-list');
      if (phraseList && !relationBox.querySelector('.pair-note')) {
        var note = document.createElement('p');
        note.className = 'pair-note';
        note.style.cssText = "font:italic 16px/1.45 'Cormorant Garamond';color:#b9b2bd;margin:12px 0 0";
        note.textContent = `${n1} видит эту связь как «${feeling1}», ${n2} — как «${feeling2}». Именно это расхождение делает их общую музыку интереснее.`;
        relationBox.appendChild(note);
      }
    }
  }

  function bind() {
    hideLocalImageControls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
    bindSelectionButtons();
    cleanCharacterPortraits();
    pairArchetypeDescription();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind); else bind();
  new MutationObserver(function(){ bind(); }).observe(document.documentElement,{childList:true,subtree:true});
})();
