/* Stable loader: one UI layer, one source of truth. */
(function(){
  'use strict';
  var style=document.createElement('style');
  style.textContent='.pair-names{display:none!important}.facts .fact:nth-child(2),.facts .fact:nth-child(3){display:none!important}';
  document.head.appendChild(style);
  var s=document.createElement('script');
  s.src='ui-fix-core.js?v=20260830-stable';
  s.onload=function(){console.info('Pairing Music Generator UI loaded');};
  s.onerror=function(err){console.error('UI layer load failed',err);};
  document.head.appendChild(s);
})();