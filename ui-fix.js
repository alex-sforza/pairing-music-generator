// Stable UI repair layer for Pairing Music Generator
(function(){
  'use strict';

  var feelings = [
    ['Blood & Velvet','кроваво-бархатная'],['Midnight Neon','полуночно-неоновая'],['Cemetery Gold','кладбищенски-золотая'],['Electric Blue','электрически-синяя'],
    ['Rust & Smoke','ржаво-дымная'],['Victorian Noir','викториански-мрачная'],['Acid Green','кислотно-зелёная'],['Moonlight','лунная'],
    ['Crimson Devotion','багрово-преданная'],['Silver Distance','серебристо-отстранённая'],['Golden Trouble','золотисто-беспокойная'],['Black Lace','чёрно-кружевная'],
    ['Violet Fever','фиолетово-лихорадочная'],['White Noise','бело-шумовая'],['Burnt Sugar','жжёно-сладкая'],['Cold Fire','холодно-огненная'],
    ['Velvet Knife','бархатно-опасная'],['Neon Bruise','неоново-болезненная'],['Holy Static','свято-электрическая'],['Wild Honey','дико-медовая'],
    ['Grave Flowers','могильно-цветочная'],['Chrome Romance','хромированно-романтическая'],['Dusk & Gold','сумрачно-золотая'],['Blackout Kiss','затменно-опасная'],
    ['Storm & Silk','грозово-шёлковая'],['Dangerous Attraction','опасно-притягательная'],['Tender Rivalry','нежно-соперническая'],['Beautiful Chaos','прекрасно-хаотичная'],
    ['Unspoken Feelings','непроизнесённо-нежная'],['Two Against The World','бунтарски-союзническая']
  ];

  function renderFeelings(){
    ['feel1','feel2'].forEach(function(id){
      var box=document.getElementById(id); if(!box) return;
      if(box.dataset.uiFixed==='1') return;
      box.innerHTML='';
      feelings.forEach(function(item){
        var b=document.createElement('button');
        b.type='button'; b.className='feeling-chip'; b.dataset.key=item[0];
        b.innerHTML='<strong>'+item[0]+'</strong><small>'+item[1]+'</small>';
        box.appendChild(b);
      });
      box.dataset.uiFixed='1';
    });
  }

  function bindFeelings(){
    document.querySelectorAll('.feeling-list').forEach(function(list){
      if(list.dataset.bound==='1') return;
      list.dataset.bound='1';
      list.addEventListener('click',function(e){
        var b=e.target.closest('.feeling-chip'); if(!b) return;
        e.preventDefault(); e.stopPropagation();
        list.querySelectorAll('.feeling-chip').forEach(function(x){x.classList.remove('selected');x.setAttribute('aria-pressed','false');});
        b.classList.add('selected'); b.setAttribute('aria-pressed','true');
        list.dataset.value=b.dataset.key||'';
      },true);
    });
  }

  function hideUploadButtons(){
    document.querySelectorAll('.upload-card .file-label, .upload-card .file-name').forEach(function(el){el.style.display='none';});
  }

  function bindImageUrls(){
    document.querySelectorAll('.upload-card .image-url-field input').forEach(function(input){
      if(input.dataset.bound==='1') return;
      input.dataset.bound='1';
      input.addEventListener('input',function(){
        var card=input.closest('.upload-card'); if(!card) return;
        var box=card.querySelector('.aesthetic-image'); if(!box) return;
        var url=input.value.trim();
        if(!url){box.textContent='вставьте ссылку на изображение';return;}
        var img=new Image();
        img.onload=function(){box.innerHTML='';box.appendChild(img);};
        img.onerror=function(){box.textContent='не удалось загрузить изображение';};
        img.src=url;
      });
    });
  }

  function bindPhotoUrls(){
    [['photo1','preview1'],['photo2','preview2']].forEach(function(pair){
      var input=document.getElementById(pair[0]),box=document.getElementById(pair[1]);
      if(!input||!box||input.dataset.bound==='1') return;
      input.dataset.bound='1';
      input.addEventListener('input',function(){
        var url=input.value.trim();
        if(!url){box.textContent='предпросмотр фото';return;}
        var img=new Image();
        img.onload=function(){box.innerHTML='';box.appendChild(img);};
        img.onerror=function(){box.textContent='не удалось загрузить фото';};
        img.src=url;
      });
    });
  }

  function bindGenerate(){
    document.querySelectorAll('.main-btn').forEach(function(btn){
      if(btn.dataset.generateFix==='1') return;
      btn.dataset.generateFix='1'; btn.type='button';
      btn.addEventListener('click',function(e){
        var names=['generateAesthetic','generate','createAesthetic','makeAesthetic','generateResult','generatePairing'];
        for(var i=0;i<names.length;i++){
          if(typeof window[names[i]]==='function'){
            try{window[names[i]]();}catch(err){console.error(err);} return;
          }
        }
        var code=btn.getAttribute('onclick');
        if(code){try{Function(code).call(btn);}catch(err){console.error(err);}}
      },true);
    });
  }

  function init(){
    renderFeelings(); bindFeelings(); hideUploadButtons(); bindImageUrls(); bindPhotoUrls(); bindGenerate();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();
