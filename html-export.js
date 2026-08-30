/* Standalone HTML export for the generated aesthetic. Does not touch generation. */
(function(){
'use strict';

var EXPORT_CSS=`
*{box-sizing:border-box}
body{margin:0;background:#060608;color:#eeeaf1;font-family:Montserrat,Arial,sans-serif}
.music-aesthetic{width:100%;max-width:1240px;margin:0 auto;padding:clamp(14px,2.2vw,28px);background:linear-gradient(145deg,#17171e,#09090d);border:1px solid #403c47;box-shadow:0 22px 60px #0009;overflow:hidden}
.music-aesthetic h2,.music-aesthetic h3,.music-aesthetic h4,.music-aesthetic .band-name,.music-aesthetic .result-person-name,.music-aesthetic .archetype-name,.music-aesthetic .album-title,.music-aesthetic .song,.music-aesthetic .award-name{font-family:'Cormorant Garamond',Georgia,serif}
.result-top{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr);gap:clamp(12px,1.6vw,20px)}
.result-head{padding-bottom:clamp(10px,1.4vw,18px);border-bottom:1px solid #38343e}
.result-head h2{font-size:clamp(27px,4vw,48px);margin:0}
.result-people{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(8px,1.2vw,15px);margin-top:clamp(10px,1.5vw,18px)}
.result-person{text-align:center;padding:clamp(8px,1.1vw,14px);background:#0d0d12;border:1px solid #3b3842;min-width:0}
.person-photo{width:100%;aspect-ratio:4/5;background:#09090d;border:1px solid #38343f;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#6f6a75}
.person-photo img{width:100%;height:100%;object-fit:cover}
.result-person-name{font-size:clamp(19px,2.5vw,30px);margin:clamp(5px,1vw,8px) 0 2px}
.meta{color:#96919e;font-size:clamp(7px,.72vw,9px);line-height:1.7}
.character-profile{margin-top:clamp(7px,1vw,11px);padding:clamp(8px,1vw,13px);text-align:left;border:1px solid #37333d;background:#0a0a0e}
.character-profile strong{font:500 clamp(14px,1.6vw,19px) 'Cormorant Garamond';display:block;margin-bottom:4px}
.character-profile p{font:italic clamp(11px,1.25vw,15px)/1.45 'Cormorant Garamond';color:#b9b2bd;margin:0}
.band-side{padding:5px 0;min-width:0}.kicker{font-size:clamp(6px,.72vw,9px);letter-spacing:clamp(1px,.2vw,2.6px);text-transform:uppercase;color:#aaa4b0}
.band-name{font:600 clamp(29px,5vw,68px) 'Cormorant Garamond';letter-spacing:clamp(1px,.25vw,3px);margin:7px 0}
.band-style{font:italic clamp(11px,1.4vw,17px) 'Cormorant Garamond';line-height:1.35;color:#c9c1ce}
.facts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(6px,.8vw,9px);margin-top:clamp(10px,1.5vw,18px)}
.fact{padding:clamp(7px,.9vw,12px);background:#0b0a0f;border:1px solid #37333d;min-width:0}.fact b{display:block;font:500 clamp(13px,1.8vw,24px) 'Cormorant Garamond';color:#eee9f0}.fact span{display:block;color:#85808c;font-size:clamp(6px,.65vw,8px);text-transform:uppercase;letter-spacing:1px;margin-top:3px}
.archetype-box,.relation-box,.album,.award,.signature{margin-top:clamp(8px,1.1vw,14px);padding:clamp(10px,1.5vw,18px);border:1px solid #45414d;background:#0d0c12}.archetype-name{font:600 clamp(19px,2.5vw,30px) 'Cormorant Garamond';margin:3px 0}.archetype-box p,.relation-box p{font:italic clamp(11px,1.3vw,16px)/1.45 'Cormorant Garamond';color:#b9b2bd;margin:5px 0 0}
.feeling-summary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:12px}.feeling-summary div{padding:clamp(7px,.9vw,10px);border:1px solid #37333d;background:#0a0a0e;min-width:0}.feeling-summary b{display:block;font:500 clamp(15px,1.7vw,20px) 'Cormorant Garamond'}.feeling-summary span{font-size:clamp(6px,.65vw,8px);text-transform:uppercase;color:#85808c;letter-spacing:1px}.phrase-list{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin-top:10px}.phrase{padding:6px 9px;border:1px solid #48434f;color:#b7b0bb;background:#131219;font-size:clamp(6px,.7vw,9px);text-transform:uppercase}.album{text-align:center}.album-title{font:600 clamp(21px,2.8vw,34px) 'Cormorant Garamond';margin-top:2px}.signature{text-align:center}.signature .song{font:600 clamp(19px,2.5vw,30px) 'Cormorant Garamond';margin-top:3px}
.aesthetic{margin-top:clamp(12px,1.8vw,22px)}.aesthetic-title{text-align:center;font:600 clamp(24px,3.2vw,39px) 'Cormorant Garamond';margin:0 0 clamp(8px,1.2vw,15px)}
.aesthetic-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(6px,.9vw,12px)}.aesthetic-card{border:1px solid #45414d;background:#0d0c12;padding:clamp(5px,.7vw,9px);min-width:0}.aesthetic-card h3{text-align:center;font-size:clamp(13px,1.8vw,22px);margin:2px 0 8px}.aesthetic-image{aspect-ratio:3/4;background:#08080c;border:1px dashed #4b4651;overflow:hidden;display:flex;align-items:center;justify-content:center;color:#77727d;text-align:center;padding:10px;font:italic clamp(10px,1.2vw,16px) 'Cormorant Garamond'}.aesthetic-image img{width:100%;height:100%;object-fit:cover}
.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(7px,1vw,15px);margin-top:clamp(9px,1.3vw,15px)}.review{min-height:clamp(90px,12vw,150px);padding:clamp(9px,1.4vw,18px);background:#0d0d12;border:1px solid #3b3842;min-width:0}.review h4{font:600 clamp(13px,1.5vw,19px) 'Cormorant Garamond';margin:0 0 7px}.review p{font:italic clamp(11px,1.3vw,16px)/1.5 'Cormorant Garamond';color:#bdb7c1;margin:0}.award{text-align:center}.award-name{font:600 clamp(17px,2.3vw,29px) 'Cormorant Garamond';margin:6px 0}.music-aesthetic .hidden{display:none!important}
@media(max-width:600px){.music-aesthetic{min-width:560px;transform-origin:top left}body{overflow-x:auto}}
`;

function getResult(){return document.getElementById('result');}
function buildHTML(){
  var result=getResult(); if(!result)return '';
  var clone=result.cloneNode(true);
  clone.classList.remove('hidden');
  var actions=clone.querySelector('.actions'); if(actions)actions.remove();
  var json=clone.querySelector('.jsonbox'); if(json)json.remove();
  clone.querySelectorAll('script').forEach(function(s){s.remove();});
  clone.classList.add('music-aesthetic');
  return '<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>Musical Aesthetic</title>\n<style>@import url(\'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap\');'+EXPORT_CSS+'</style>\n</head>\n<body>'+clone.outerHTML+'\n</body>\n</html>';
}
function install(){
  var result=getResult(); if(!result||result.dataset.htmlExportReady)return;
  result.dataset.htmlExportReady='1';
  var actions=result.querySelector('.actions'); if(!actions)return;
  var old=Array.from(actions.querySelectorAll('button')).find(function(b){return /json/i.test(b.textContent)||/\{\}/.test(b.textContent);});
  if(old)old.remove();
  var btn=document.createElement('button');btn.type='button';btn.className='secondary-btn';btn.textContent='⌁ СГЕНЕРИРОВАТЬ HTML';
  btn.addEventListener('click',function(){
    var html=buildHTML();
    var box=document.getElementById('html-export-box');
    if(!box){box=document.createElement('div');box.id='html-export-box';box.className='jsonbox';box.innerHTML='<textarea readonly aria-label="HTML эстетики"></textarea><div><button type="button" class="secondary-btn" id="copy-html">КОПИРОВАТЬ HTML</button></div>';actions.appendChild(box);}
    box.classList.remove('hidden');box.querySelector('textarea').value=html;
    var copy=box.querySelector('#copy-html');copy.onclick=function(){navigator.clipboard&&navigator.clipboard.writeText(html).then(function(){copy.textContent='✓ СКОПИРОВАНО';setTimeout(function(){copy.textContent='КОПИРОВАТЬ HTML';},1600);});};
    box.scrollIntoView({behavior:'smooth',block:'center'});
  });
  actions.insertBefore(btn,actions.firstChild);
}
function watch(){
  var result=getResult();if(!result||!window.MutationObserver)return;
  var observer=new MutationObserver(function(){if(!result.classList.contains('hidden')){install();observer.disconnect();}});
  observer.observe(result,{childList:true,subtree:true});
  if(!result.classList.contains('hidden'))install();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',watch);else watch();
})();
