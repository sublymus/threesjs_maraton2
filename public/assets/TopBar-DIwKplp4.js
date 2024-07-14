import{a as j,S as _,j as n,g,u as v,h as N}from"./Transmit-bZcl4vU8.js";import{H as u,r as f,L as $}from"./index-SdvyjNe6.js";const k="BDwYyNLBYIyNOBFX3M27uTAUXLrUxgHVyBJPjxJj3aQR7ghxC_MetHpzgTspdk4e4Iq9E0LCzeAtbCPOcdclxCk";async function E(s){const e=new Headers;e.append("Authorization",`Bearer ${s.user.token}`),console.log("....remove Notif Context");const t=await fetch(`${u}/remove_notif_context/${s.context_id}`,{headers:e,method:"DELETE"});try{const o=await t.json();return console.log({log:o},s),o}catch{}}async function z(s){const e=new Headers;e.append("Authorization",`Bearer ${s.user.token}`),console.log("....add Notif Context");const t=new FormData;t.append("context_id",s.context_id),t.append("context_name",s.context_name),console.log(s,t);const o=await fetch(`${u}/add_notif_context`,{headers:e,method:"POST",body:t});try{return await o.json()}catch{}}async function L(s){const e=new Headers;e.append("Authorization",`Bearer ${s.user.token}`),console.log("....get Notif Context");const t=new URLSearchParams({});t.set("context_id",s.context_id),t.set("context_name",s.context_name);const o=await fetch(`${u}/get_notif_contexts/?${t}`,{headers:e});try{return await o.json()}catch{}}async function O(s){const e=new Headers;e.append("Authorization",`Bearer ${s.user.token}`),console.log("....get Browsers");const t=new FormData;s.user_browser_id&&t.append("user_browser_id",s.user_browser_id),s.target&&t.append("target",s.target);const o=await fetch(`${u}/disable_notifications`,{headers:e,method:"PUT",body:t});try{return await o.json()}catch{}}async function C(){console.log("Registering service worker...");const s=await navigator.serviceWorker.register("/worker.js",{scope:"/"});return console.log("Service Worker Registered..."),console.log("Registering Push..."),await s.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:H(k)})}async function B(s){if((await navigator.permissions.query({name:"notifications"})).state=="granted"){const t=new FormData;t.append("notification_data",JSON.stringify(await C()));const o=new Headers;o.append("Authorization",`Bearer ${s.token}`),console.log("....Send notif data"),fetch(`${u}/set_notification_data`,{method:"PUT",body:t,headers:o})}else console.log("....notif permission required")}function H(s){const e="=".repeat((4-s.length%4)%4),t=(s+e).replace(/-/g,"+").replace(/_/g,"/"),o=window.atob(t),r=new Uint8Array(o.length);for(let d=0;d<o.length;++d)r[d]=o.charCodeAt(d);return r}const P={"/":{home:{},store_list:{},new_store:{},edit_store:{},about:{},pricing:{},tutorial:{product_tuto:{},command_tuto:{},users_tuto:{},interface_tuto:{},statistic_tuto:{}},forum:{subject:{},new_subject:{}}}},p=j(s=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async exist(e){return(await(await fetch(`${u}/check_store/?store_name=${e}`)).json()).exist==!0},async setStoreById(e){var o,r;const t=(o=p.getState().stores)==null?void 0:o.list.find(d=>d.id==e);if(t)return s(()=>({selectedStore:t}));{const d=(r=await p.getState().fetchStores({text:"#"+e}))==null?void 0:r.list[0];if(d)return s(()=>({selectedStore:d}))}},async fetchStores(e){const t=p.getState().owner;if(!t)return;e.only_owner&&(e.owner_id=t.id),console.log({filter:e});const o=new URLSearchParams({});for(const c in e){const l=e[c];o.set(c,l)}const r=new Headers;r.append("Authorization",`Bearer ${t.token}`);const a=await(await fetch(`${u}/get_stores/?${o}`,{headers:r})).json();if(a!=null&&a.list)return s(()=>({stores:a})),a},openChild(e,t,o){s(()=>({currentChild:e,blur:t,back_color:e&&o||""}))},async deleteStore(e){const t=p.getState().owner;if(!t)return!1;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const r={method:"DELETE",headers:o},d=await fetch(`${u}/delete_store/${e}`,r);try{const a=await d.json();return p.getState().fetchStores({}),a==null?void 0:a.deleted}catch{return!1}},setSelectedStore(e){s(()=>({selectedStore:e}))},async disconnection(){const e=p.getState().owner;if(e){const t=new Headers;t.append("Authorization",`Bearer ${e.token}`);const o={method:"GET",headers:t};await fetch(`${u}/disconnection`,o)}localStorage.removeItem("user"),s(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const e=localStorage.getItem("user");if(!e)return;const t=JSON.parse(e),o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const r={method:"GET",headers:o};let a=await(await fetch(`${u}/me`,r)).json();if(!(a!=null&&a.id))return localStorage.removeItem("user");p.getState().fetchStores({}),a={token:t.token,...a},s(()=>({owner:a})),localStorage.setItem("user",JSON.stringify(a))},async editStore(e){const t=p.getState().owner;if(!t)return;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const r=new FormData;Object.keys(e).forEach((c,l)=>{console.log("data",l,c,e[c]),c=="banners"||c=="banner"?e.banners instanceof Blob?(r.append("banners",JSON.stringify(["banners_0"])),r.append("banners_0",e.banner)):e.banners&&r.append("banners",JSON.stringify([e.banner])):c=="logo"?e[c]instanceof Blob?(r.append(c,JSON.stringify(["logo_0"])),r.append("logo_0",e[c])):e[c].url&&r.append(c,JSON.stringify([e[c]])):r.append(c,e[c])});const d={method:"PUT",body:r,headers:o},a=await fetch(`${u}/update_store`,d);try{const c=await a.json();return p.getState().fetchStores({}),c}catch(c){console.log(c.message);return}},async createStore(e){try{const t=p.getState().owner;if(!t)return;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`),o.append("sublymus_id","Sublymus_id00");const r=new FormData;console.log(e),Object.keys(e).forEach(l=>{l=="logo"&&(r.append(l,JSON.stringify(["logo_0"])),r.append("logo_0",e[l])),l=="banners"||l=="banner"?(r.append("banners",JSON.stringify(["banners_0"])),r.append("banners_0",e.banner)):r.append(l,e[l])});const d={method:"POST",body:r,headers:o};return await(await fetch(`${u}/create_store`,d)).json()}catch(t){return t}},async createOwner(){window.open(`${u}/google_connexion`,void 0,"popup");const e=setInterval(()=>{const t=localStorage.getItem("user"),o=t&&JSON.parse(t);o&&(s(()=>({owner:o})),clearInterval(e),B(o),p.getState().fetchStores({}))},100)}})),x=new _(P,["/","home"]).getStore(),w=[{u:"home",n:"Home",i:"/src/res/application.png"},{u:"tutorial",n:"Tutorial",i:"/src/res/catalog.png"},{u:"pricing",n:"Pricing",i:"/src/res/shopping-cart.png"},{u:"forum",n:"Forum",i:"/src/res/chat.png"}];function J(){const{setAbsPath:s}=x();return n.jsxs("footer",{className:"footer",children:[n.jsx("ul",{className:"links",children:w.map((e,t)=>n.jsxs("li",{style:{pointerEvents:"initial"},onClick:()=>s([e.u]),children:[n.jsx("span",{style:{background:g(e.i,"60%")}}),e.n]},t))}),n.jsxs("div",{className:"more-info",children:[n.jsxs("div",{children:[" ",n.jsx("p",{children:"Site to create your own customizable store online. "}),n.jsx("a",{href:"/#tutorial",children:" Learn how"}),"."]}),n.jsx("div",{children:n.jsx("p",{children:"Sublymus © 2024"})}),n.jsxs("div",{children:[n.jsx("a",{href:"/#about",children:"Terms of Service"})," - ",n.jsx("a",{href:"/#about",children:"Privacy Policy"})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Need help?"})," ",n.jsx("a",{href:"/#contact",children:"Contact Us"})]})]})]})}function D(){var y;const{setAbsPath:s,pathList:e}=x(),[t,o]=f.useState(e[1]||"home"),[r,d]=f.useState(!1),[a,c]=f.useState(!1),{owner:l,createOwner:S}=p(),b=v(),m=i=>{s([i]),o(i)};return f.useEffect(()=>{o(e[1]||"home")},[e]),f.useEffect(()=>{window.addEventListener("click",()=>{const i=document.querySelector(".top-bar .more-navs ul");(i==null?void 0:i.className)==""&&c(!1)})},[]),n.jsx("div",{className:"top-bar",ref:N(80,".web"),children:n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"back-top"}),n.jsxs("div",{className:"top-bar-ctn",children:[n.jsxs("div",{className:"left",children:[n.jsx("div",{className:"options",onClick:()=>{}}),n.jsx("a",{href:`${$}/web#home`,className:"logo-ctn",onClick:()=>{m("home")},children:n.jsx("div",{className:"icon"})})]}),n.jsx("ul",{className:"top-bar-center",children:w.map((i,h)=>h*200<b.width-400?n.jsxs("li",{className:t==i.u?"active":"",onClick:()=>m(i.u),children:[n.jsx("span",{style:{background:g(i.i,"60%")}}),i.n]},h):null)}),n.jsxs("div",{className:"right",children:[n.jsx("div",{className:"ctn-icon",onClick:i=>{i.preventDefault(),i.stopPropagation(),c(!a)},children:n.jsx("div",{className:"icon"})}),l?n.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(y=l==null?void 0:l.photos[0])!=null&&y.startsWith("/")?u:""}${l==null?void 0:l.photos}),#bbb`},onClick:()=>O({user:l,target:"all"}).then(i=>{console.log(i)})}):n.jsx("div",{className:"login",onClick:()=>S(),children:"Se connecter"})]})]}),n.jsx("div",{className:"more-navs",onClick:i=>{i.preventDefault(),i.stopPropagation()},children:n.jsxs("ul",{className:a?"":"close",children:[w.map((i,h)=>h*200>=b.width-400?n.jsxs("li",{className:t==i.u?"active":"",onClick:()=>m(i.u),children:[n.jsx("span",{style:{background:g(i.i,"60%")}}),i.n]},h):null),n.jsxs("li",{className:t=="mode-lite"?"active":"",onClick:()=>{d(!r)},children:[n.jsx("span",{style:{background:g("/src/res/mark.png","70%")}}),r?"Lite mode off":"Lite mode on"]})]})})]})})}export{J as F,D as T,p as a,z as b,E as c,L as g,C as r,B as s,x as u};
