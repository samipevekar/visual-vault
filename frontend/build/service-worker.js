if(!self.define){let e,t={};const o=(o,s)=>(o=new URL(o+".js",s).href,t[o]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=t,document.head.appendChild(e)}else e=o,importScripts(o),t()})).then((()=>{let e=t[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(s,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(t[r])return;let i={};const c=e=>o(e,r),l={module:{uri:r},exports:i,require:c};t[r]=Promise.all(s.map((e=>l[e]||c(e)))).then((e=>(n(...e),i)))}}define(["./workbox-8b3e803c"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.registerRoute(/\//,new e.NetworkFirst,"GET")}));
//# sourceMappingURL=service-worker.js.map