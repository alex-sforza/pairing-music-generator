(function(){
  const FEELINGS = [
    ['Blood & Velvet','страсть, опасность и притяжение'],['Midnight Neon','ночная химия и электрическое напряжение'],
    ['Cemetery Gold','мрачная роскошь и что-то почти святое'],['Electric Blue','холодная искра, которая всё равно бьёт током'],
    ['Rust & Smoke','старые раны, дым и упрямое тепло'],['Victorian Noir','тайны, приличия и чувства, о которых нельзя говорить'],
    ['Acid Green','хаос, дерзость и очень плохие решения'],['Moonlight','тихая близость, которую замечают только они'],
    ['Crimson Devotion','преданность на грани одержимости'],['Silver Distance','чувства есть, но между ними километры'],
    ['Golden Trouble','слишком красиво, чтобы быть хорошей идеей'],['Black Lace','опасная нежность и тщательно спрятанные эмоции'],
    ['Violet Fever','романтика, странность и лёгкая потеря рассудка'],['White Noise','много невысказанного и слишком много мыслей'],
    ['Burnt Sugar','сладость с привкусом катастрофы'],['Cold Fire','ледяная сдержанность и внезапные вспышки'],
    ['Velvet Knife','нежность, которая умеет ранить'],['Neon Bruise','ярко, больно и почему-то хочется ещё'],
    ['Holy Static','почти святое чувство с совершенно неправильным напряжением'],['Wild Honey','тепло, опасность и сладкая безрассудность'],
    ['Grave Flowers','красота, выросшая из старых травм'],['Chrome Romance','глянец, дерзость и романтика будущего'],
    ['Dusk & Gold','закатная меланхолия и драгоценная близость'],['Blackout Kiss','момент, который лучше не вспоминать слишком подробно'],
    ['Storm & Silk','буря снаружи, мягкость только друг для друга'],['Paper Hearts','хрупкость, которую оба делают вид, что не замечают'],
    ['Razor Smile','флирт, сарказм и опасная игра'],['Motel Moon','ночная свобода, бегство и случайная близость'],
    ['Ash & Honey','после пожара всё равно осталось что-то сладкое'],['Blue Velvet','медленная чувственность и кинематографическая тоска']
  ];

  function renderFeelings(box){
    if(!box || box.querySelector('.feeling-chip')) return;
    box.innerHTML = FEELINGS.map(function(item){
      return '<button type="button" class="feeling-chip" data-feeling="'+item[0].replace(/"/g,'&quot;')+'"><strong>'+item[0]+'</strong><small>'+item[1]+'</small></button>';
    }).join('');
  }

  function bindFeelings(box, side){
    if(!box || box.dataset.uiFixBound==='1') return;
    box.dataset.uiFixBound='1';
    box.addEventListener('click', function(event){
      var chip=event.target.closest('.feeling-chip');
      if(!chip || !box.contains(chip)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      box.querySelectorAll('.feeling-chip').forEach(function(x){x.classList.remove('selected');});
      chip.classList.add('selected');
      box.dataset.selected=chip.dataset.feeling || '';
      window.__pairingFeelings=window.__pairingFeelings || {};
      window.__pairingFeelings[side]=box.dataset.selected;
      box.dispatchEvent(new CustomEvent('pairing-feeling-change',{bubbles:true,detail:{side:side,value:box.dataset.selected}}));
    }, true);
  }

  function showImage(target, source){
    if(!target || !source) return;
    var url=(source.value || '').trim();
    if(!url){target.textContent='предпросмотр фото';return;}
    var img=new Image();
    img.alt='';
    img.onload=function(){target.replaceChildren(img);};
    img.onerror=function(){target.textContent='не удалось загрузить изображение';};
    img.src=url;
  }

  function bindImages(){
    [['photo1','preview1'],['photo2','preview2']].forEach(function(pair){
      var input=document.getElementById(pair[0]), target=document.getElementById(pair[1]);
      if(input && target && input.dataset.uiImageBound!=='1'){
        input.dataset.uiImageBound='1';
        input.addEventListener('input',function(){showImage(target,input);});
        if(input.value) showImage(target,input);
      }
    });

    document.querySelectorAll('.upload-card').forEach(function(card){
      var url=card.querySelector('.image-url-field input, .aesthetic-url');
      var target=card.querySelector('.aesthetic-image');
      var file=card.querySelector('.file-label input[type=file]');
      if(url && target && url.dataset.uiImageBound!=='1'){
        url.dataset.uiImageBound='1';
        url.addEventListener('input',function(){showImage(target,url);});
        if(url.value) showImage(target,url);
      }
      if(file && target && file.dataset.uiFileBound!=='1'){
        file.dataset.uiFileBound='1';
        file.addEventListener('change',function(){
          var selected=file.files && file.files[0]; if(!selected) return;
          var reader=new FileReader();
          reader.onload=function(e){target.innerHTML='<img src="'+e.target.result+'" alt="">';};
          reader.readAsDataURL(selected);
        });
      }
    });
  }

  function init(){
    var f1=document.getElementById('feel1'), f2=document.getElementById('feel2');
    if(f1){renderFeelings(f1);bindFeelings(f1,1);}
    if(f2){renderFeelings(f2);bindFeelings(f2,2);}
    bindImages();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  new MutationObserver(init).observe(document.documentElement,{childList:true,subtree:true});
})();
