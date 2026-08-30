// Independent relationship-feeling controls.
// This file intentionally does not depend on the main generator script.
(function () {
  const FEELINGS = [
    ['Blood & Velvet','опасность, роскошь и желание','красивое притяжение'],
    ['Midnight Neon','ночной город и электрическая химия','тайное влечение'],
    ['Cemetery Gold','прошлое, которое до сих пор блестит','вечная связь'],
    ['Electric Blue','холод снаружи, ток внутри','напряжение'],
    ['Rust & Smoke','шрамы, дым и привычка возвращаться','тяжёлая история'],
    ['Victorian Noir','тайны, письма и недосказанность','запретная близость'],
    ['Acid Green','хаос, сарказм и слишком много энергии','безумное веселье'],
    ['Moonlight','тихая близость и ночные разговоры','нежность'],
    ['Crimson Devotion','одержимость и преданность','роковая привязанность'],
    ['Silver Distance','чувства, которые проще скрыть','эмоциональная дистанция'],
    ['Golden Trouble','они явно плохая идея и оба это знают','авантюра'],
    ['Black Lace','красиво, опасно и немного неправильно','искушение'],
    ['Violet Fever','непонятно, любовь это или лихорадка','одержимость'],
    ['White Noise','они говорят разными языками, но слышат одно','необъяснимая связь'],
    ['Burnt Sugar','сладко до тех пор, пока не становится больно','сладкая катастрофа'],
    ['Cold Fire','невозможно понять, кто из них холоднее','сдержанная страсть'],
    ['Velvet Knife','нежность с острым краем','опасная нежность'],
    ['Neon Bruise','после них остаются синяки и отличные воспоминания','красивая травма'],
    ['Holy Static','почти свято, почти кощунственно','запретное чувство'],
    ['Wild Honey','слишком свободные, чтобы принадлежать друг другу','свободная любовь'],
    ['Grave Flowers','что-то умерло, но цветы всё ещё растут','память'],
    ['Chrome Romance','глянец, скорость и неразумные решения','современная страсть'],
    ['Dusk & Gold','отношения как последний свет перед ночью','меланхолия'],
    ['Blackout Kiss','никто не помнит, как это началось','импульс'],
    ['Storm & Silk','буря с очень красивой упаковкой','контраст'],
    ['Dangerous Attraction','невозможно держать дистанцию','опасное притяжение'],
    ['Tender Rivalry','соревнуются, но слишком дорожат друг другом','нежное соперничество'],
    ['Beautiful Chaos','вместе они превращают любой план в приключение','прекрасный хаос'],
    ['Unspoken Feelings','слишком многое остаётся между строк','непроизнесённые чувства'],
    ['Two Against The World','против всех, даже если это неразумно','двое против мира']
  ];

  function render(id) {
    const root = document.getElementById(id);
    if (!root) return;
    // If the main generator has already populated the list, only reinforce button behavior.
    if (!root.children.length) {
      const frag = document.createDocumentFragment();
      FEELINGS.forEach(function (f) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'feeling-chip';
        b.dataset.key = f[0];
        const strong = document.createElement('strong');
        strong.textContent = f[0];
        const small = document.createElement('small');
        small.textContent = f[1];
        b.append(strong, small);
        frag.appendChild(b);
      });
      root.appendChild(frag);
    }
  }

  function bind(root) {
    if (!root || root.dataset.feelingFixBound === '1') return;
    root.dataset.feelingFixBound = '1';
    root.addEventListener('click', function (event) {
      const button = event.target.closest('.feeling-chip');
      if (!button || !root.contains(button)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      root.querySelectorAll('.feeling-chip.selected').forEach(function (x) {
        x.classList.remove('selected');
        x.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('selected');
      button.setAttribute('aria-pressed', 'true');
    }, true);
  }

  function init() {
    ['feel1','feel2'].forEach(function (id) {
      render(id);
      bind(document.getElementById(id));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
