/* Natural transitions into musical-style descriptions */
(function(){
  'use strict';
  const TRANSITIONS = [
    'В музыке этот характер особенно хорошо раскрывается через',
    'Неудивительно, что музыкальный выбор здесь тяготеет к',
    'Такой темперамент особенно точно звучит в',
    'Если перевести этот характер на язык музыки, получится',
    'Ему особенно близко звучание, в котором есть',
    'Этот внутренний темперамент лучше всего раскрывается в',
    'Музыкальная территория этого характера — это',
    'Всё это легко узнаётся и в музыкальных предпочтениях — особенно в',
    'Именно поэтому его особенно цепляет музыка, в которой есть',
    'Такой характер удивительно точно находит отражение в',
    'В музыке этот человек явно ищет',
    'Его музыкальный вкус особенно тянется к',
    'Лучше всего эту сторону характера передаёт',
    'Здесь особенно уместно звучание, построенное на',
    'В музыкальном мире ему комфортнее всего там, где есть'
  ];
  const OLD = 'Поэтому особенно органично для него';
  let lastPick = -1;
  function pickTransition(){
    let i = Math.floor(Math.random()*TRANSITIONS.length);
    if(TRANSITIONS.length>1 && i===lastPick) i=(i+1)%TRANSITIONS.length;
    lastPick=i;
    return TRANSITIONS[i];
  }
  function apply(root){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()) if(walker.currentNode.nodeValue.includes(OLD)) nodes.push(walker.currentNode);
    nodes.forEach(node=>{ node.nodeValue=node.nodeValue.replace(OLD,pickTransition()); });
  }
  function start(){
    apply(document.body);
    const observer=new MutationObserver(function(mutations){
      mutations.forEach(m=>m.addedNodes.forEach(n=>{
        if(n.nodeType===Node.TEXT_NODE && n.nodeValue.includes(OLD)) n.nodeValue=n.nodeValue.replace(OLD,pickTransition());
        else if(n.nodeType===Node.ELEMENT_NODE) apply(n);
      }));
    });
    observer.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
  window.PORTRAIT_TRANSITIONS=TRANSITIONS;
})();
