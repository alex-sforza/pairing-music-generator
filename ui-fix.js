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
      var text = p.textContent || '';
      text = text.replace(/\s*В дуэте с\s+[^.]+?\s+это приобретает оттенок\s+«[^»]*»\.?/gi, '').trim();
      text = text.replace(/\s*В дуэте с\s+[^.]+?\.?$/gi, '').trim();
      p.textContent = text;
    });
  }

  // Russian epithets for relationship aesthetics. The English labels remain
  // available as selectable UI names, but the generated prose uses Russian.
  var RELATIONSHIP_EPITHETS = {
    'Blood & Velvet': 'кроваво-бархатная',
    'Midnight Neon': 'полуночно-неоновая',
    'Cemetery Gold': 'кладбищенски-золотая',
    'Electric Blue': 'электрически-синяя',
    'Rust & Smoke': 'ржаво-дымная',
    'Victorian Noir': 'викториански-мрачная',
    'Acid Green': 'кислотно-зелёная',
    'Moonlight': 'лунная',
    'Crimson Devotion': 'багрово-преданная',
    'Silver Distance': 'серебристо-отстранённая',
    'Golden Trouble': 'золотисто-беспокойная',
    'Black Lace': 'чёрно-кружевная',
    'Violet Fever': 'фиолетово-лихорадочная',
    'White Noise': 'бело-шумовая',
    'Burnt Sugar': 'жжёно-сладкая',
    'Cold Fire': 'холодно-огненная',
    'Velvet Knife': 'бархатно-опасная',
    'Neon Bruise': 'неоново-болезненная',
    'Holy Static': 'свято-электрическая',
    'Wild Honey': 'дико-медовая',
    'Grave Flowers': 'могильно-цветочная',
    'Chrome Romance': 'хромированно-романтическая',
    'Dusk & Gold': 'сумрачно-золотая',
    'Blackout Kiss': 'затменно-поцелуйная',
    'Storm & Silk': 'грозово-шёлковая',
    'Dangerous Attraction': 'опасно-притягательная',
    'Tender Rivalry': 'нежно-соперническая',
    'Beautiful Chaos': 'прекрасно-хаотичная',
    'Unspoken Feelings': 'непроизнесённо-нежная',
    'Two Against The World': 'бунтарски-союзническая'
  };

  function russianRelationEpithet(value) {
    if (!value) return 'неопределённая';
    return RELATIONSHIP_EPITHETS[value] || value
      .replace(/\s*&\s*/g, ' и ')
      .replace(/\bMidnight\b/gi, 'полуночная')
      .replace(/\bBlood\b/gi, 'кровавая')
      .replace(/\bVelvet\b/gi, 'бархатная')
      .replace(/\bSilver\b/gi, 'серебристая')
      .replace(/\bMoonlight\b/gi, 'лунная');
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
    var epithet1 = russianRelationEpithet(feeling1);
    var epithet2 = russianRelationEpithet(feeling2);
    var archetypeName = archetype.textContent.trim();
    var sound = bandStyle ? bandStyle.textContent.trim() : 'два музыкальных мира';

    // The archetype text describes only the pair and their shared musical chemistry.
    // It intentionally avoids meta-commentary such as “this is not a portrait...”.
    var templates = [
      `${n1} и ${n2} соединяют разные музыкальные привычки в одно звучание: ${archetypeName} строится на их контрасте, притяжении и способности слышать друг друга даже там, где они спорят.`,
      `У ${n1} и ${n2} ${archetypeName} рождается из столкновения двух характеров. Один приносит в музыку ${styles1[0] || 'свою интонацию'}, другой — ${styles2[0] || 'свою интонацию'}, и вместе они превращают разницу между собой в главный нерв группы.`,
      `${n1} и ${n2} звучат вместе так, будто их отношения получили собственный жанр: ${archetypeName} держится на напряжении, взаимном влиянии и той странной химии, которая заставляет их музыку работать именно вдвоём.`,
      `${n1} и ${n2} собирают ${archetypeName} из двух несовпадающих темпераментов. Их музыка то тянет их навстречу, то сталкивает лбами — и именно это движение становится её узнаваемым почерком.`
    ];
    var idx = Math.abs((n1+n2+archetypeName).length) % templates.length;
    box.textContent = templates[idx];

    if (bandStyle) {
      bandStyle.textContent = `${styles1.slice(0,2).join(' + ') || 'первый мир'} × ${styles2.slice(0,2).join(' + ') || 'второй мир'} — ${sound}`;
    }

    // Relationship layer: use Russian epithets instead of English aesthetic labels.
    var relationBox = result.querySelector('.relation-box');
    if (relationBox) {
      var phraseList = relationBox.querySelector('.phrase-list');
      var oldNote = relationBox.querySelector('.pair-note');
      if (oldNote) oldNote.remove();
      if (phraseList) {
        var note = document.createElement('p');
        note.className = 'pair-note';
        note.style.cssText = "font:italic 16px/1.45 'Cormorant Garamond';color:#b9b2bd;margin:12px 0 0";
        note.textContent = `${n1} ощущает эту связь как ${epithet1}, а ${n2} — как ${epithet2}. В их общей истории это превращается в особое напряжение между ними.`;
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
