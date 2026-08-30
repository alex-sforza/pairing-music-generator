/* Stable loader: one UI layer, one source of truth. */
(function(){
  'use strict';
  var style=document.createElement('style');
  style.textContent='.pair-names{display:none!important}.facts .fact:nth-child(2),.facts .fact:nth-child(3){display:none!important}.band-style{font-size:17px!important;line-height:1.35!important;max-width:760px}';
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

  function enhanceStageDynamics(){
    function apply(){
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

    var generate=document.getElementById('generate');
    if(generate){
      generate.addEventListener('click',function(){
        var tries=0;
        var timer=setInterval(function(){
          tries++;
          if(apply() || tries>=30) clearInterval(timer);
        },100);
      },false);
    }

    var result=document.getElementById('result');
    if(result && window.MutationObserver){
      var observer=new MutationObserver(function(){
        if(!result.classList.contains('hidden')) apply();
      });
      observer.observe(result,{childList:true,subtree:true});
    }
  }

  var s=document.createElement('script');
  s.src='ui-fix-core.js?v=20260830-stable2';
  s.onload=function(){
    console.info('Pairing Music Generator UI loaded');
    enhanceStageDynamics();
  };
  s.onerror=function(err){console.error('UI layer load failed',err);};
  document.head.appendChild(s);
})();