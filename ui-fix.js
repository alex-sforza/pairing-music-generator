/* Stable loader: one UI layer, one source of truth. */
(function(){
  'use strict';
  var style=document.createElement('style');
  style.textContent='.pair-names{display:none!important}.facts .fact:nth-child(2),.facts .fact:nth-child(3){display:none!important}.band-style{font-size:17px!important;line-height:1.35!important;max-width:760px}.band-style[data-style-fixed]{font-size:0!important;line-height:1.35!important}.band-style[data-style-fixed]::after{content:attr(data-style-fixed);display:block;font-size:17px;line-height:1.35;font-style:italic}';
  document.head.appendChild(style);

  var STAGE_DYNAMICS=[
    'Один задаёт темп, второй намеренно его ломает',
    'Один провоцирует, второй превращает провокацию в шоу',
    'Они постоянно перехватывают друг у друга инициативу',
    'Один держит сцену, второй заставляет её двигаться',
    'Один создаёт напряжение, второй не даёт ему погаснуть',
    'Они выступают так, будто каждый концерт — личный спор',
    'Один играет на публику, второй играет на нервах первого',
    'Один ведёт за собой, второй время от времени меняет маршрут',
    'Они начинают как дуэт и заканчивают как соревнование',
    'Один приносит хаос, второй удивительным образом делает его частью плана',
    'Инициатива переходит от одного к другому почти незаметно',
    'Один держит эмоциональный центр, второй добавляет опасную искру',
    'Они редко стоят рядом спокойно — даже молчание между ними выглядит как часть номера',
    'Один бросает музыкальный вызов, второй почти никогда его не оставляет без ответа',
    'На сцене они то действуют как единое целое, то словно забывают, что вообще в одной группе',
    'Один задаёт направление, но второй постоянно заставляет его импровизировать',
    'Их выступления строятся на чередовании контроля и красивого срыва',
    'Один создаёт дистанцию, второй каждый раз сокращает её прямо на сцене',
    'Они будто спорят за внимание зала, хотя оба прекрасно знают, что выиграют вместе',
    'Один начинает номер с холодной уверенностью, второй постепенно превращает его в эмоциональный пожар',
    'Их сценическая динамика держится на ощущении: ещё секунда — и кто-нибудь сорвётся с импровизации',
    'Они умеют превращать взаимное раздражение в энергию выступления',
    'Один действует точно и выверенно, второй постоянно добавляет непредсказуемый поворот',
    'На сцене они словно проверяют границы друг друга — и каждый раз заходят чуть дальше'
  ];

  var GROUP_STYLE={
    'Glam Rock':'театральный рок с блеском, дерзостью и любовью к эффектным появлениям',
    'Glam Metal':'яркий и громкий рок с гламурной театральностью и большими припевами',
    'Gothic Rock':'мрачный романтический рок с драматическими гитарами и сумрачной атмосферой',
    'Gothic Metal':'тяжёлая готическая музыка с драмой, мраком и красивой меланхолией',
    'Dream Pop':'воздушная мечтательная музыка, похожая на воспоминание или сон',
    'Shoegaze':'туманное гитарное звучание, где мелодия растворяется в стене мягкого шума',
    'Punk Rock':'резкий и свободолюбивый панк с нервной энергией и презрением к правилам',
    'Industrial Rock':'механический рок с металлическим шумом, жёстким ритмом и холодной эстетикой',
    'Darkwave':'холодная сумрачная музыка с синтезаторами, меланхолией и ночной атмосферой',
    'Hard Rock':'мощный прямолинейный рок с тяжёлыми риффами, драйвом и напором',
    'Classic Rock':'классический рок с живыми гитарами, большими припевами и ощущением вечной сцены',
    'Alternative Rock':'непредсказуемый альтернативный рок, который любит ломать привычные формы',
    'Experimental Rock':'экспериментальный рок, превращающий странные идеи и неожиданные звуки в музыку',
    'Post-Rock':'созерцательный гитарный рок, который постепенно наращивает напряжение до эмоционального финала',
    'Indie Rock':'свободный независимый рок с личным почерком, мелодичностью и лёгкой небрежностью',
    'Metal':'тяжёлая музыка с массивными риффами, напором и ощущением почти физической силы',
    'Progressive Metal':'сложный и масштабный метал с длинными композициями и неожиданными поворотами',
    'Symphonic Metal':'тяжёлая музыка с оркестровой пышностью, драмой и кинематографическим размахом',
    'Metalcore':'агрессивная смесь тяжёлых риффов, резких переходов и эмоционального напряжения',
    'Post-Hardcore':'нервная тяжёлая музыка, где ярость постоянно сталкивается с уязвимостью',
    'Emo':'эмоциональный рок о внутренних конфликтах, сильных чувствах и честной уязвимости',
    'Synthpop':'неоновая поп-музыка с синтезаторами, цепкими мелодиями и блеском ночного города',
    'Synthwave':'ретро-футуристическая электроника с неоном, ночными трассами и атмосферой восьмидесятых',
    'Dark Pop':'мрачный поп с красивыми мелодиями, глянцем и тревожной романтической атмосферой',
    'Electronic':'электронная музыка, где ритм, текстуры и синтетические звуки становятся главным языком',
    'Witch House':'тёмная гипнотическая электроника с замедленными ритмами, мистикой и ощущением сна',
    'Dark Folk':'мрачный фолк с древними интонациями, природной образностью и ощущением старой легенды',
    'Folk':'живой фолк с человеческим голосом, историями и ощущением дороги',
    'Neofolk':'строгий атмосферный фолк с историческими мотивами, ритуальностью и холодной красотой',
    'Jazz':'свободный джаз с импровизацией, сложными ритмами и любовью к неожиданным решениям',
    'Dark Jazz':'дымный ночной джаз с медленным напряжением и ощущением пустого бара после полуночи',
    'Blues Rock':'гитарный рок с блюзовой хрипотцой, чувством дороги и эмоциональной прямотой',
    'Soul':'тёплая эмоциональная музыка с выразительным вокалом, грувом и человеческой близостью',
    'Funk':'ритмичный и дерзкий фанк с упругим грувом, танцевальностью и самоуверенностью',
    'Ambient':'пространственная музыка из атмосфер, пауз и медленно меняющихся звуковых пейзажей',
    'Trip-Hop':'медленная тёмная смесь ритмов, электроники, баса и кинематографической меланхолии',
    'Dark Cabaret':'театральная тёмная музыка с кабаретной иронией, гротеском и ощущением запретного представления'
  };

  function selectedStyles(id){
    var root=document.getElementById(id);
    return root?Array.from(root.querySelectorAll('.chip.selected')).map(function(x){return x.textContent.trim();}).filter(Boolean):[];
  }

  function applyGroupStyle(){
    var target=document.querySelector('.band-style');
    if(!target)return false;
    var styles=Array.from(new Set(selectedStyles('styles1').concat(selectedStyles('styles2'))));
    var descriptions=styles.map(function(s){return GROUP_STYLE[s];}).filter(Boolean);
    if(!descriptions.length)return false;
    var text;
    if(descriptions.length===1){
      text='В основе звучания — '+descriptions[0]+'.';
    }else if(descriptions.length===2){
      text='В основе звучания — '+descriptions[0]+'. К нему добавляется '+descriptions[1]+'.';
    }else{
      text='В основе звучания — '+descriptions[0]+'. К нему добавляются '+descriptions.slice(1,-1).join('; ')+' и '+descriptions[descriptions.length-1]+'.';
    }
    target.setAttribute('data-style-fixed',text);
    target.setAttribute('aria-label',text);
    return true;
  }

  function applyStageDynamic(){
    var facts=document.querySelectorAll('.fact');
    for(var i=0;i<facts.length;i++){
      var label=facts[i].querySelector('span');
      var value=facts[i].querySelector('b');
      if(label && value && /сценическая динамика/i.test(label.textContent)){
        var previous=value.getAttribute('data-stage-dynamic')||'';
        var pool=STAGE_DYNAMICS.filter(function(x){return x!==previous;});
        value.textContent=pool[Math.floor(Math.random()*pool.length)];
        value.setAttribute('data-stage-dynamic',value.textContent);
        value.style.fontSize='clamp(17px,2.1vw,25px)';
        value.style.lineHeight='1.05';
        return true;
      }
    }
    return false;
  }

  function watchNextResult(){
    var result=document.getElementById('result');
    if(!result || !window.MutationObserver)return;
    var observer=new MutationObserver(function(){
      var doneStyle=applyGroupStyle();
      var doneStage=applyStageDynamic();
      if(!result.classList.contains('hidden') && doneStyle && doneStage) observer.disconnect();
    });
    observer.observe(result,{childList:true,subtree:true});
  }

  var s=document.createElement('script');
  s.src='ui-fix-core.js?v=20260830-stable4';
  s.onload=function(){
    console.info('Pairing Music Generator UI loaded');
    watchNextResult();
    var generate=document.getElementById('generate');
    if(generate){
      generate.addEventListener('click',function(){watchNextResult();},false);
    }
  };
  s.onerror=function(err){console.error('UI layer load failed',err);};
  document.head.appendChild(s);
})();