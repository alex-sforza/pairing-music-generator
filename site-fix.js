// Final UI repair for Pairing Music Generator
(function(){
  'use strict';

  function hideFileUploadControls(){
    document.querySelectorAll('.upload-card .file-label, .upload-card .file-name').forEach(function(el){
      el.style.display='none';
    });
  }

  function repairImageUrls(){
    document.querySelectorAll('.image-url-field input').forEach(function(input){
      if(input.dataset.siteFixBound) return;
      input.dataset.siteFixBound='1';
      input.addEventListener('input',function(){
        var card=input.closest('.upload-card');
        if(!card) return;
        var preview=card.querySelector('.aesthetic-image');
        if(!preview) return;
        var url=input.value.trim();
        if(!url){ preview.innerHTML='вставьте ссылку на изображение'; return; }
        var img=new Image();
        img.onload=function(){ preview.innerHTML=''; preview.appendChild(img); };
        img.onerror=function(){ preview.textContent='не удалось загрузить изображение'; };
        img.src=url;
      });
    });
  }

  function repairGenerateButton(){
    var buttons=[].slice.call(document.querySelectorAll('.main-btn'));
    buttons.forEach(function(btn){
      if(btn.dataset.siteGenerateBound) return;
      btn.dataset.siteGenerateBound='1';
      btn.type='button';
      btn.addEventListener('click',function(e){
        var candidates=['generateAesthetic','generate','createAesthetic','makeAesthetic','generateResult'];
        for(var i=0;i<candidates.length;i++){
          var fn=window[candidates[i]];
          if(typeof fn==='function'){
            try{ fn(); }catch(err){ console.error('Generator error:',err); }
            return;
          }
        }
        // If the original button has an inline handler, execute it explicitly.
        var inline=btn.getAttribute('onclick');
        if(inline){ try{ Function(inline).call(btn); }catch(err){ console.error('Inline generator error:',err); } }
      },true);
    });
  }

  function run(){
    hideFileUploadControls();
    repairImageUrls();
    repairGenerateButton();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
