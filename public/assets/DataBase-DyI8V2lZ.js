import{H as n}from"./index-EujPKRdE.js";const d="BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk";async function _(e){const t=new Headers;t.append("Authorization",`Bearer ${e.user.token}`),console.log("....remove Notif Context");const a=await fetch(`${n}/remove_notif_context/${e.context_id}`,{headers:t,method:"DELETE"});try{const i=await a.json();return console.log({log:i},e),i}catch{}}async function p(e){const t=new Headers;t.append("Authorization",`Bearer ${e.user.token}`),console.log("....add Notif Context");const a=new FormData;a.append("context_id",e.context_id),a.append("context_name",e.context_name),console.log(e,a);const i=await fetch(`${n}/add_notif_context`,{headers:t,method:"POST",body:a});try{return await i.json()}catch{}}async function f(e){const t=new Headers;t.append("Authorization",`Bearer ${e.user.token}`),console.log("....get Notif Context");const a=new URLSearchParams({});a.set("context_id",e.context_id),a.set("context_name",e.context_name);const i=await fetch(`${n}/get_notif_contexts/?${a}`,{headers:t});try{return await i.json()}catch{}}async function u(e){const t=new Headers;t.append("Authorization",`Bearer ${e.user.token}`),console.log("....get Browsers");const a=new FormData;e.user_browser_id&&a.append("user_browser_id",e.user_browser_id),e.target&&a.append("target",e.target);const i=await fetch(`${n}/disable_notifications`,{headers:t,method:"PUT",body:a});try{return await i.json()}catch{}}async function c(){console.log("Registering service worker...");const e=await navigator.serviceWorker.register("/worker.js",{scope:"/"});return console.log("Service Worker Registered..."),console.log("Registering Push..."),await e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s(d)})}async function b(e){if((await navigator.permissions.query({name:"notifications"})).state=="granted"){const a=new FormData;a.append("notification_data",JSON.stringify(await c()));const i=new Headers;i.append("Authorization",`Bearer ${e.token}`),console.log("....Send notif data"),fetch(`${n}/set_notification_data`,{method:"PUT",body:a,headers:i})}else console.log("....notif permission required")}function s(e){const t="=".repeat((4-e.length%4)%4),a=(e+t).replace(/-/g,"+").replace(/_/g,"/"),i=window.atob(a),o=new Uint8Array(i.length);for(let r=0;r<i.length;++r)o[r]=i.charCodeAt(r);return o}const g={id:"gem_id",name:"gem",collect_type:"string",icon:"/src/World/images/gem/gem.png",view:"icon",default_value:{id:"blue_garnet",name:"Grenat bleu",feature_id:"gem_id",icon:["/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"],code:"2d3563"},components:[{id:"blue_garnet",name:"Grenat bleu",feature_id:"gem_id",icon:["/fs/1hv1lpqtk_27y870_products_model_images_05e7dc8e-f409-46ae-91cc-6a125add8c5b.jpg"],code:"2d3563"},{name:"Taaffeite",id:"taaffeite",icon:["/src/World/images/gem/taaffeite.png"],code:"9575ab",feature_id:"gem_id"},{name:"Grandidierite",id:"grandidierite",icon:["/src/World/images/gem/grandidierite.png"],code:"3f7269",feature_id:"gem_id"},{name:"Serendibite",id:"serendibite",icon:["/src/World/images/gem/serendibite.png"],code:"024a3d",feature_id:"gem_id"},{name:"Diamant",id:"diamond",icon:["/src/World/images/gem/diamond.png"],code:"abdcf9",feature_id:"gem_id"},{name:"Rubis",id:"ruby",icon:["/src/World/images/gem/ruby.png"],code:"c24a4a",feature_id:"gem_id"},{name:"Alexandrite",id:"alexandrite",icon:["/src/World/images/gem/alexandrite.png"],code:"0d5a4c",feature_id:"gem_id"},{name:"Béryl rouge",id:"red_beryl",icon:["/src/World/images/gem/red_beryl.png"],code:"6f4060",feature_id:"gem_id"},{name:"Padparadscha Saphire",id:"padparadscha_saphire",icon:["/src/World/images/gem/padparadscha_saphire.png"],code:"98485d",feature_id:"gem_id"},{name:"Musgravite",id:"musgravite",icon:["/src/World/images/gem/musgravite.png"],code:"b2acad",feature_id:"gem_id"},{name:"Saphir",id:"sapphire",icon:["/src/World/images/gem/sapphire.png"],code:"288fc3",feature_id:"gem_id"},{name:"Benitoite",id:"benitoite",icon:["/src/World/images/gem/benitoite.png"],code:"286bc3",feature_id:"gem_id"},{name:"Opale noire",id:"black_opal",icon:["/src/World/images/gem/black_opal.png"],code:"4c415e",feature_id:"gem_id"},{name:"Grenat démantoïde",id:"demantoid_garnet",icon:["/src/World/images/gem/demantoid_garnet.png"],code:"5cb065",feature_id:"gem_id"},{name:"Poudretteite",id:"poudretteite",icon:["/src/World/images/gem/poudretteite.png"],code:"a770b5",feature_id:"gem_id"},{name:"Opale de feu",id:"fire_opal",icon:["/src/World/images/gem/fire_opal.png"],code:"b38a3c",feature_id:"gem_id"},{name:"Jeremejevite",id:"jeremejevite",icon:["/src/World/images/gem/jeremejevite.png"],code:"99a1ca",feature_id:"gem_id"},{name:"Tanzanite",id:"tanzanite",icon:["/src/World/images/gem/tanzanite.png"],code:"46518a",feature_id:"gem_id"}]},m={id:"metal_id",collect_type:"string",name:"metal",icon:"/src/World/images/metal/metal.png",view:"icon",default_value:{id:"5707c6a6-d197-4a7b-8a8c-34150325e514",product_id:"05e7dc8e-f409-46ae-91cc-6a125add8c5b",component_id:"5707c6a6-d197-4a7b-8a8c-34150325e514",feature_id:"2c711848-789a-4ff2-bb14-9b2e3e024485",store_id:"b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",price:12345,unity:"Kg",devise:"$",created_at:"2024-05-20 07:59:07",updated_at:"2024-05-20 07:59:07",name:"Silver",description:"silver",images:"[]",icon:["/src/World/images/metal/silver.png"],scene:null,code:"eeeeee",key:"silver"},components:[{id:"6bd884a0-82be-414a-ac45-9ef47a866bf8",product_id:"05e7dc8e-f409-46ae-91cc-6a125add8c5b",component_id:"6bd884a0-82be-414a-ac45-9ef47a866bf8",feature_id:"2c711848-789a-4ff2-bb14-9b2e3e024485",store_id:"b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",price:12345,unity:"Kg",devise:"$",created_at:"2024-05-20 07:58:13",updated_at:"2024-05-20 07:58:13",name:"Gold",description:"gold",images:"[]",icon:["/src/World/images/metal/gold.png"],scene:null,code:"bead2e",key:"gold"},{id:"5707c6a6-d197-4a7b-8a8c-34150325e514",product_id:"05e7dc8e-f409-46ae-91cc-6a125add8c5b",component_id:"5707c6a6-d197-4a7b-8a8c-34150325e514",feature_id:"2c711848-789a-4ff2-bb14-9b2e3e024485",store_id:"b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",price:12345,unity:"Kg",devise:"$",created_at:"2024-05-20 07:59:07",updated_at:"2024-05-20 07:59:07",name:"Silver",description:"silver",images:"[]",icon:["/src/World/images/metal/silver.png"],scene:null,code:"eeeeee",key:"silver"},{id:"0af71216-5c1f-40f7-823f-8b25afb20984",product_id:"05e7dc8e-f409-46ae-91cc-6a125add8c5b",component_id:"0af71216-5c1f-40f7-823f-8b25afb20984",feature_id:"2c711848-789a-4ff2-bb14-9b2e3e024485",store_id:"b5b40cb3-29b1-4ada-9aa4-7e26614d6a36",price:12345,unity:"Kg",devise:"$",created_at:"2024-05-20 07:59:57",updated_at:"2024-05-20 08:01:09",name:"Bronze",description:"bronz",images:"[]",icon:["/src/World/images/metal/bronz.png"],scene:null,code:"ffaa55",key:"bronz"}]},h={limit:25,total:2,page:1,list:[m,g]};export{p as a,_ as b,u as d,h as f,f as g,c as r,b as s};
