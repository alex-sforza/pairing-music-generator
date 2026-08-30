/* Stable loader: keep the existing UI layer intact, then add generation variety. */
(function(){
  'use strict';
  function load(src){
    return new Promise(function(resolve,reject){
      var s=document.createElement('script');
      s.src=src+'?v=20260830';
      s.onload=resolve;
      s.onerror=reject;
      document.head.appendChild(s);
    });
  }
  load('ui-fix-core.js').then(function(){return load('portrait-variations.js');}).catch(function(err){console.error('UI layer load failed',err);});
})();
