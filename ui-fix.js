// Pairing Music Generator — stable UI layer
(function () {
  'use strict';

  const STYLE_TRAITS = {
    'Glam Rock': 'театральный рок с блеском, дерзостью и любовью к эффектным появлениям',
    'Glam Metal': 'яркий и громкий рок с гламурной театральностью, большими припевами и культом сцены',
    'Gothic Rock': 'мрачный романтический рок с драматическими гитарами и сумрачной атмосферой',
    'Gothic Metal': 'тяжёлая готическая музыка с драмой, мраком и красивой меланхолией',
    'Dream Pop': 'воздушная мечтательная музыка, похожая на воспоминание или сон',
    'Shoegaze': 'туманное гитарное звучание, где мелодия растворяется в стене мягкого шума',
    'Punk Rock': 'резкий и свободолюбивый панк с нервной энергией и презрением к правилам',
    'Industrial Rock': 'механический рок с металлическим шумом, жёстким ритмом и холодной эстетикой',
    'Darkwave': 'холодная сумрачная музыка с синтезаторами, меланхолией и ночной атмосферой',
    'Hard Rock': 'мощный прямолинейный рок с тяжёлыми риффами, драйвом и напором',
    'Classic Rock': 'классический рок с живыми гитарами, большими припевами и ощущением вечной сцены',
    'Alternative Rock': 'непредсказуемый альтернативный рок, который любит ломать привычные формы',
    'Experimental Rock': 'экспериментальный рок, превращающий странные идеи и неожиданные звуки в музыку',
    'Post-Rock': 'созерцательный гитарный рок, который постепенно наращивает напряжение до большого эмоционального финала',
    'Indie Rock': 'свободный независимый рок с личным почерком, мелодичностью и лёгкой небрежностью',
    'Metal': 'тяжёлая музыка с массивными риффами, напором и ощущением почти физической силы',
    'Progressive Metal': 'сложный и масштабный метал с длинными композициями, неожиданными поворотами и технической виртуозностью',
    'Symphonic Metal': 'тяжёлый рок, соединённый с оркестровой пышностью, драмой и кинематографическим размахом',
    'Metalcore': 'агрессивная смесь тяжёлых риффов, резких переходов и эмоционального напряжения',
    'Post-Hardcore': 'нервная тяжёлая музыка, в которой ярость постоянно сталкивается с уязвимостью',
    'Emo': 'эмоциональный рок о внутренних конфликтах, слишком сильных чувствах и честной уязвимости',
    'Synthpop': 'неоновая поп-музыка с синтезаторами, цепкими мелодиями и блеском ночного города',
    'Synthwave': 'ретро-футуристическая электроника с неоном, ночными трассами и атмосферой восьмидесятых',
    'Dark Pop': 'мрачный поп с красивыми мелодиями, глянцем и тревожной романтической атмосферой',
    'Electronic': 'электронная музыка, где ритм, текстуры и синтетические звуки становятся главным языком',
    'Witch House': 'тёмная гипнотическая электроника с замедленными ритмами, мистикой и тревожным ощущением сна',
    'Dark Folk': 'мрачный фолк с древними интонациями, природной образностью и ощущением старой легенды',
    'Folk': 'живая фолк-музыка с человеческим голосом, историями и ощущением дороги',
    'Neofolk': 'строгий атмосферный фолк с историческими мотивами, ритуальностью и холодной красотой',
    'Jazz': 'свободный джаз с импровизацией, сложными ритмами и любовью к неожиданным решениям',
    'Dark Jazz': 'дымный ночной джаз с медленным напряжением, тенями и ощущением пустого бара после полуночи',
    'Blues Rock': 'гитарный рок с блюзовой хрипотцой, чувством дороги и эмоциональной прямотой',
    'Soul': 'тёплая эмоциональная музыка с выразительным вокалом, грувом и человеческой близостью',
    'Funk': 'ритмичный и дерзкий фанк с упругим грувом, танцевальностью и заразительной самоуверенностью',
    'Ambient': 'пространственная музыка из атмосфер, пауз и медленно меняющихся звуковых пейзажей',
    'Trip-Hop': 'медленная тёмная смесь хип-хоп ритмов, электроники, баса и кинематографической меланхолии',
    'Dark Cabaret': 'театральная тёмная музыка с кабаретной иронией, гротеском и ощущением запретного представления'
  };

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
        if (!url) { preview.textContent = 'вставьте ссылку на изображение'; return; }
        var img = new Image();
        img.onload = function () { preview.innerHTML = ''; preview.appendChild(img); };
        img.onerror = function () { preview.textContent = 'не удалось загрузить изображение'; };
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
        if (!url) { preview.textContent = 'предпросмотр фото'; return; }
        var img = new Image();
        img.onload = function () { preview.innerHTML = ''; preview.appendChild(img); };
        img.onerror = function () { preview.textContent = 'не удалось загрузить фото'; };
        img.src = url;
      });
    });
  }

  function removeRedundantStyleLine() {
    document.querySelectorAll('.pair-names').forEach(function (el) {
      var next = el.nextElementSibling;
      if (!next) return;
      var text = (next.textContent || '').trim();
      if (/·/.test(text) && /\//.test(text) && text.length < 500) next.remove();
    });
  }

  function removeRedundantFacts() {
    document.querySelectorAll('.fact').forEach(function (el) {
      var text = (el.textContent || '').toLowerCase();
      if (text.includes('музыкальный архетип') || text.includes('исходные группы')) el.remove();
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

  function bindRelationshipButtons() {
    if (document.documentElement.dataset.feelingFixBound === '1') return;
    document.documentElement.dataset.feelingFixBound = '1';
    document.addEventListener('click', function (event) {
      var button = event.target.closest('.feeling-chip');
      if (!button) return;
      var feelingList = button.closest('.feeling-list');
      if (!feelingList) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      feelingList.querySelectorAll('.feeling-chip.selected').forEach(function (el) {
        el.classList.remove('selected');
        el.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
      feelingList.dataset.value = button.dataset.key || '';
    }, true);
  }

  function selectedStyles() {
    return Array.from(document.querySelectorAll('.style-list .chip.selected')).map(function (el) {
      return el.textContent.trim();
    }).filter(Boolean);
  }

  function pairNames() {
    var n1 = (document.getElementById('name1') || {}).value || 'Первый персонаж';
    var n2 = (document.getElementById('name2') || {}).value || 'Второй персонаж';
    return [n1.trim() || 'Первый персонаж', n2.trim() || 'Второй персонаж'];
  }

  function makeStyleDescription(styles) {
    var unique = [];
    styles.forEach(function (style) { if (!unique.includes(style)) unique.push(style); });
    var traits = unique.map(function (style) { return STYLE_TRAITS[style]; }).filter(Boolean);
    if (!traits.length) return '';
    if (traits.length === 1) return traits[0] + '.';
    if (traits.length === 2) return traits[0] + ', соединённые с ' + traits[1] + '.';
    return traits[0] + '; к ним добавляются ' + traits[1] + ' и ' + traits[2] + '.';
  }

  function updateBandStyle() {
    var bandStyle = document.querySelector('.band-style');
    if (!bandStyle) return;
    var description = makeStyleDescription(selectedStyles());
    if (description) bandStyle.textContent = description;
  }

  function makePairArchetypeDescription() {
    var box = document.querySelector('.archetype-box');
    if (!box) return;
    var p = box.querySelector('p');
    if (!p) return;
    var names = pairNames();
    var styles = selectedStyles();
    var styleText = makeStyleDescription(styles);
    var archetype = (box.querySelector('.archetype-name') || {}).textContent || 'их общий архетип';
    var n1 = names[0], n2 = names[1];
    var templates = [
      n1 + ' и ' + n2 + ' соединяют разные музыкальные темпераменты в один характерный дуэт. ' + (styleText ? 'Их общее звучание строится на том, что ' + styleText.charAt(0).toLowerCase() + styleText.slice(1) + ' ' : '') + 'Поэтому «' + archetype.trim() + '» здесь звучит не как маска одного из них, а как результат их постоянного притяжения и столкновения.',
      'В музыке ' + n1 + ' и ' + n2 + ' слышно, как два разных характера постепенно учатся звучать вместе. ' + (styleText ? styleText.charAt(0).toUpperCase() + styleText.slice(1) + ' ' : '') + 'Их общий архетип — «' + archetype.trim() + '»: сочетание, в котором различия не исчезают, а становятся частью общей динамики.',
      '«' + archetype.trim() + '» рождается из взаимодействия ' + n1 + ' и ' + n2 + '. Один импульс отвечает другому, напряжение сменяется гармонией, а противоположности превращаются в узнаваемый звук пары.'
    ];
    var index = (n1.length + n2.length + styles.length) % templates.length;
    p.textContent = templates[index];
  }

  function removeDuoSentenceFromPortraits() {
    document.querySelectorAll('.character-profile p').forEach(function (p) {
      var text = p.textContent || '';
      var cleaned = text
        .replace(/\s*В\s+дуэте\s+с\s+[^.!?]*[.!?]?\s*$/i, '')
        .replace(/\s*В\s+дуэте\s+с\s+[^.!?]*(?:[.!?]|$)/gi, '')
        .trim();
      if (cleaned !== text.trim()) p.textContent = cleaned;
    });
  }

  function refreshGeneratedText() {
    removeDuoSentenceFromPortraits();
    updateBandStyle();
    makePairArchetypeDescription();
  }

  function init() {
    hideLocalImageControls();
    bindImageUrls();
    bindPhotoUrls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
    bindRelationshipButtons();
    refreshGeneratedText();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  new MutationObserver(function () {
    hideLocalImageControls();
    bindImageUrls();
    bindPhotoUrls();
    removeRedundantStyleLine();
    removeRedundantFacts();
    addFourthReview();
    refreshGeneratedText();
  }).observe(document.documentElement, { childList: true, subtree: true });
})();