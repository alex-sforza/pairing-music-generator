/* Presentation refinement: individual portraits, pair-focused archetypes, four varied reviews. */
(function(){
  'use strict';

  const ARCHETYPE_LINES = [
    (a,b,arch)=>`У ${a} и ${b} музыка работает как разговор, в котором никто не стремится оставить последнее слово за собой. Один задаёт направление, второй меняет его интонацию — и именно на этих поворотах держится их архетип «${arch}».`,
    (a,b,arch)=>`Рядом друг с другом ${a} и ${b} звучат так, будто каждый приносит в одну песню собственные правила, а затем оба с удовольствием нарушают их. «${arch}» здесь проявляется в их умении превращать несогласие в движение.`,
    (a,b,arch)=>`В истории ${a} и ${b} есть ощущение постоянного обмена ролями: тот, кто только что вёл, через мгновение оказывается ведомым. Поэтому «${arch}» ощущается не как маска, а как их особенная сценическая игра.`,
    (a,b,arch)=>`${a} и ${b} создают впечатление пары, которой одинаково идут и тишина, и громкий финал. Их «${arch}» держится на смене дистанции: приближение, отступление, новый поворот — и снова вместе.`,
    (a,b,arch)=>`Самое интересное в «${arch}» у ${a} и ${b} — не внешняя эффектность, а то, что рядом они становятся смелее. То, на что каждый по отдельности вряд ли решился бы, вместе превращается в их лучший сценический ход.`,
    (a,b,arch)=>`У ${a} и ${b} есть редкая способность делать из взаимных противоречий сюжет. В «${arch}» слышится не примирение характеров, а удовольствие от того, что им вовсе не обязательно становиться одинаковыми.`
  ];

  const REVIEWS = [
    ['★★★★☆ · THE NIGHT EDITION','«У этой группы есть неприятно привлекательная привычка оставлять после песни ощущение, будто слушатель случайно узнал чужой секрет.»'],
    ['★★★★★ · LOUDER THAN LIFE','«Они умеют делать драму частью аранжировки, не превращая её в декорацию. Редкий случай, когда характер участников действительно слышен.»'],
    ['★★★★☆ · AFTER DARK REVIEW','«Их лучший материал звучит так, будто его записывали после полуночи, когда хорошие идеи уже немного опасны.»'],
    ['★★★★★ · THE UNDERGROUND PAPER','«Вместо безопасного компромисса они выбрали столкновение — и именно поэтому группа звучит живой.»'],
    ['★★★★☆ · STATIC MAGAZINE','«У них есть химия, которую невозможно прописать в пресс-релизе. Она появляется между строк, паузами и слишком долгими взглядами со сцены.»'],
    ['★★★★★ · VELVET NOISE','«Это музыка с характером. Иногда капризным, иногда опасным, но практически никогда — скучным.»'],
    ['★★★★☆ · MIDNIGHT PRESS','«Сильнее всего группа работает там, где два голоса будто спорят, кому достанется финальная нота.»'],
    ['★★★★★ · THE RECORD ROOM','«Дебют получился удивительно цельным для проекта, который явно не боится собственных противоречий.»'],
    ['★★★★☆ · BLACK VINYL','«Они нашли тот редкий баланс, когда личная драма перестаёт быть биографией и становится хорошей песней.»'],
    ['★★★★★ · NOISE & GLORY','«Слушать их — всё равно что наблюдать за двумя людьми, которые слишком хорошо знают слабые места друг друга.»'],
    ['★★★★☆ · THE LATE SHOW','«У этой пары есть главное качество хорошей группы: после нескольких песен уже хочется спорить о том, кто из них на самом деле главный.»'],
    ['★★★★★ · CRIMSON REVIEW','«Они не сглаживают острые углы — они ставят на них микрофон и делают из этого припев.»']
  ];

  let lastReviewSignature = '';
  let lastArchSignature = '';

  function names(){
    const a=(document.getElementById('name1')?.value||'Первый персонаж').trim()||'Первый персонаж';
    const b=(document.getElementById('name2')?.value||'Второй персонаж').trim()||'Второй персонаж';
    return [a,b];
  }

  function cleanPortraits(){
    document.querySelectorAll('.character-profile p').forEach(p=>{
      let t=p.textContent||'';
      const cleaned=t
        .replace(/\s*В\s+группе\s+этому\s+человеку\s+естественно\s+быть[^.!?]*(?:[.!?]|$)/gi,'')
        .replace(/\s*В\s+дуэте\s+с\s+[^.!?]*(?:[.!?]|$)/gi,'')
        .trim();
      if(cleaned!==t.trim()) p.textContent=cleaned;
    });
  }

  function pairArchetype(){
    const box=document.querySelector('.archetype-box');
    if(!box) return;
    const p=box.querySelector('p');
    const title=box.querySelector('.archetype-name');
    if(!p || !title) return;
    const [a,b]=names();
    const arch=title.textContent.trim();
    const signature=a+'|'+b+'|'+arch;
    if(signature===lastArchSignature) return;
    lastArchSignature=signature;
    const line=ARCHETYPE_LINES[Math.floor(Math.random()*ARCHETYPE_LINES.length)];
    p.textContent=line(a,b,arch);
  }

  function fourReviews(){
    const grid=document.querySelector('.review-grid');
    if(!grid) return;
    const cards=Array.from(grid.querySelectorAll('.review'));
    if(cards.length<3) return;
    const signature=cards.map(c=>c.textContent).join('|')+'|'+Date.now();
    if(signature===lastReviewSignature) return;
    lastReviewSignature=signature;
    const shuffled=REVIEWS.slice().sort(()=>Math.random()-0.5).slice(0,4);
    while(grid.children.length>4) grid.removeChild(grid.lastElementChild);
    shuffled.forEach((review,i)=>{
      let card=grid.querySelector(`[data-presentation-review="${i}"]`);
      if(!card){
        card=document.createElement('article');
        card.className='review';
        card.dataset.presentationReview=String(i);
        grid.appendChild(card);
      }
      card.innerHTML=`<h4>${review[0]}</h4><p>${review[1]}</p>`;
    });
    while(grid.children.length>4) grid.removeChild(grid.lastElementChild);
  }

  function run(){
    cleanPortraits();
    pairArchetype();
    fourReviews();
  }

  const observer=new MutationObserver(()=>{ window.clearTimeout(observer._timer); observer._timer=window.setTimeout(run,80); });
  observer.observe(document.body,{childList:true,subtree:true,characterData:true});
  document.addEventListener('click',e=>{ if(e.target.closest('#generate,button')) window.setTimeout(run,120); });
  document.addEventListener('input',()=>window.setTimeout(run,100));
  setTimeout(run,300);
})();
