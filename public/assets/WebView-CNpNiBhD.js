import{H as N,j as e,u as q,L as S,g as f,b as H}from"./BindToParentScroll-DgoiTs-d.js";import{c as E,S as I,r as j,R as P}from"./index-BUFuklqG.js";import{g as J,E as R}from"./EditorTopBar-C3AHlVo7.js";const F=E(c=>({stores:void 0,async fetchStores(s){const t=v.getState().owner;if(!t)return;s.owner_id=t.id,console.log({filter:s});const i=new URLSearchParams({});for(const n in s){const r=s[n];i.set(n,r)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const a=await(await fetch(`${N}/get_stores/?owner_id=${t.id}&${i}`,{headers:o})).json();if(a!=null&&a.list)return c(()=>({stores:a})),a}})),U={"/":{new_store:{},edit_store:{},home:{},about:{},stores:{},contact:{},store_list:{}}},v=E(c=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async setStoreById(s){var i,o;const t=(i=v.getState().stores)==null?void 0:i.list.find(m=>m.id==s);if(console.log("1",{store:t}),t)return console.log("2",{store:t}),c(()=>({selectedStore:t}));{const m=(o=await F.getState().fetchStores({text:"#"+s}))==null?void 0:o.list[0];if(console.log("3",{store:m}),m)return c(()=>({selectedStore:m}))}},openChild(s,t,i){c(()=>({currentChild:s,blur:t,back_color:s&&i||""}))},async deleteStore(s){const t=v.getState().owner;if(!t)return!1;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o={method:"DELETE",headers:i},m=await fetch(`${N}/delete_store/${s}`,o);try{const a=await m.json();return v.getState().owner_stores({}),a==null?void 0:a.deleted}catch{return!1}},setSelectedStore(s){c(()=>({selectedStore:s}))},async disconnection(){const s=v.getState().owner;if(s){const t=new Headers;t.append("Authorization",`Bearer ${s.token}`);const i={method:"GET",headers:t};await fetch(`${N}/disconnection`,i)}localStorage.removeItem("user"),c(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const s=localStorage.getItem("user");if(!s)return;const t=JSON.parse(s),i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o={method:"GET",headers:i};let a=await(await fetch(`${N}/me`,o)).json();if(!(a!=null&&a.id))return localStorage.removeItem("user");v.getState().owner_stores({}),a={token:t.token,...a},c(()=>({owner:a})),localStorage.setItem("user",JSON.stringify(a))},async owner_stores(s){const t=v.getState().owner;if(!t)return;s.owner_id=t.id;const i=new URLSearchParams({});for(const n in s){const r=s[n];i.set(n,r)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const a=await(await fetch(`${N}/get_stores/?${i}`,{headers:o})).json();if(a!=null&&a.list)return console.log(a.list),c(()=>({stores:a})),a},async editStore(s){const t=v.getState().owner;if(!t)return;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=new FormData;Object.keys(s).forEach((n,r)=>{console.log("data",r,n,s[n]),n=="banners"?s[n].file?(console.log("new File",s[n].file),o.append(n,JSON.stringify(["banners_0"])),o.append("banners_0",s[n].file)):s[n].url&&(o.append(n,JSON.stringify([s[n].url])),console.log("keep same",JSON.stringify(s[n]))):n=="logo"?s[n].file?(console.log("new File",s[n].file),o.append(n,JSON.stringify(["logo_0"])),o.append("logo_0",s[n].file)):s[n].url&&(o.append(n,JSON.stringify([s[n].url])),console.log("keep same",JSON.stringify(s[n]))):o.append(n,s[n])});const m={method:"PUT",body:o,headers:i},a=await fetch(`${N}/update_store`,m);try{const n=await a.json();return v.getState().owner_stores({}),n}catch(n){console.log(n.message);return}},async createStore(s){const t=v.getState().owner;if(!t)return;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=new FormData;console.log(s),Object.keys(s).forEach(n=>{n=="logo"&&(o.append(n,JSON.stringify(["logo_0"])),o.append("logo_0",s[n].file)),n=="banners"?(o.append(n,JSON.stringify(["banners_0"])),o.append("banners_0",s[n].file)):o.append(n,s[n])});const m={method:"POST",body:o,headers:i},a=await fetch(`${N}/create_store`,m);try{const n=await a.json();return v.getState().owner_stores({}),n}catch(n){console.log(n.message);return}},async createOwner(){window.open(`${N}/google_connexion`,void 0,"popup");const s=setInterval(()=>{const t=localStorage.getItem("user"),i=t&&JSON.parse(t);i&&(c(()=>({owner:i})),clearInterval(s),v.getState().owner_stores({}),_.getState().setAbsPath(["store_list"]))},100)}})),_=new I(U,["/","home"]).getStore(),D=["img1.png","img2.png","img3.svg","img4.png","img5.svg"].map(c=>"/src/res/img/"+c);function z(){const{current:c,setAbsPath:s}=_(),{owner:t}=v();return c("home")&&e.jsxs("div",{className:"page-home",children:[e.jsxs("div",{className:"center-content",children:[e.jsxs("div",{className:"center-left",children:[e.jsxs("div",{className:"title",children:[e.jsx("div",{className:"top",children:"Startup "}),e.jsx("div",{className:"btm",children:"Business"})]}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!".split(" ").map((i,o)=>e.jsx("span",{children:i+" "},o))}),e.jsx("div",{className:"btn-ctn",children:e.jsx("div",{className:"manage",onClick:()=>s(t?["store_list"]:["store_list"]),children:"MANAGE YOUR STORES"})})]}),e.jsx("div",{className:"center-right"})]}),e.jsx("div",{className:"bottom-bar",children:D.map(i=>e.jsx("div",{className:"icon",style:{background:`no-repeat center/contain url(${i})`}},i))})]})}function B(){var T;const[c]=j.useState(J()),{current:s,setAbsPath:t,navBack:i,json:o}=_(),{createStore:m,deleteStore:a,editStore:n,selectedStore:r,openChild:h,setStoreById:x,owner:w}=v(),[l,g]=j.useState(r||{}),[u,O]=j.useState(r?{url:(s("edit_store")||"")&&`${r.logo[0]}`}:null),[p,k]=j.useState(r?{url:(s("edit_store")||"")&&`${(T=r.banners)==null?void 0:T[0]}`}:null),A=q().width<1050?"wrap":"";j.useEffect(()=>{setTimeout(()=>{var d;r&&s("edit_store")&&(g(r),k({url:`${r.banners[0]}`}),O({url:`${(d=r.logo)==null?void 0:d[0]}`}))}),r||(g({}),O(null),k(null))},[r]),j.useEffect(()=>{w&&(o!=null&&o.store_id)&&x(o.store_id)},[o,w]);const C=s("edit_store"),$=r;return C&&!r?e.jsx("div",{className:"store-select-btn",onClick:()=>{t(["store_list"])},children:"Select Store Before Edition"}):s("new_store","edit_store")&&e.jsxs("div",{className:"page-new-store",children:[r&&e.jsxs("div",{className:"editor-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>i()}),e.jsx(R,{terme:"dark",deteleKey:r.id,mode:"delete",onDelete:()=>{a(r.id).then(d=>{d&&t(["store_list"])})},onCreate:()=>{},title:"Store Information"}),e.jsxs("div",{className:"open-opt",children:[e.jsx("div",{className:"btn-dash btn demo",onClick:()=>{localStorage.setItem("store",JSON.stringify(r)),window.open(`${S}/demo/${r.name}`)},children:"Open Demo Store"}),e.jsx("div",{className:"btn-dash btn",onClick:()=>{localStorage.setItem("store",JSON.stringify(r)),window.open(`${S}/${r==null?void 0:r.name}/dash`)},children:"Open Dashboard"})]})]}),e.jsxs("div",{className:"center-content "+A,children:[e.jsx("div",{className:"center-left",children:e.jsxs("div",{className:"store "+(r?"anim":"void"),children:[e.jsxs("div",{className:"banner "+(p!=null&&p.url?"":"void"),style:p!=null&&p.url?{background:f((p==null?void 0:p.url)||"")}:{},onClick:()=>{},children:[e.jsxs("div",{className:"img-options",children:[(p==null?void 0:p.url)&&e.jsx("div",{className:"open",onClick:()=>{h(e.jsx("div",{className:"big-img",onClick:()=>h(void 0,!1),children:e.jsx("div",{className:"img",style:{background:f((p==null?void 0:p.url)||"")}})}),!0,"#3455")}}),e.jsx("input",{type:"file",id:c+"banner",style:{display:"none"},onChange:d=>{var y;const b=(y=d.currentTarget.files)==null?void 0:y[0];b&&k({file:b,url:URL.createObjectURL(b)})}}),e.jsx("label",{htmlFor:c+"banner",className:"edit"})]}),e.jsxs("div",{className:"more",children:[e.jsxs("div",{className:"logo "+(u!=null&&u.url?"":"void"),style:u!=null&&u.url?{background:f((u==null?void 0:u.url)||"")}:{},onClick:d=>{d.currentTarget==d.target&&u!=null&&u.url&&h(e.jsx("div",{className:"big-img",onClick:()=>h(void 0,!1),children:e.jsx("div",{className:"img",style:{background:f((u==null?void 0:u.url)||"")}})}),!0,"#3455")},children:[e.jsx("input",{type:"file",id:c+"logo",style:{display:"none"},onChange:d=>{var y;const b=(y=d.currentTarget.files)==null?void 0:y[0];b&&O({file:b,url:URL.createObjectURL(b)})}}),e.jsx("label",{htmlFor:c+"logo",className:"edit"})]}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:l.name}),e.jsx("div",{className:"owner-email",children:l.store_email}),e.jsx("div",{className:"id",children:l.id&&`#${l.id.split("-")[0]}`})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:r?42:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:r?205:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:r?9:0}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:l.website}),e.jsx("div",{className:"phone",children:l.phone})]})]}),r&&e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify($)),window.open(`${S}/${l.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify($)),window.open(`${S}/${l.name}/dash`)},children:"DASH"})]})]})]})}),e.jsxs("div",{className:"center-right",children:[C&&e.jsxs("div",{className:"id",children:[e.jsx("label",{htmlFor:c+"id",style:{color:"#fff9"},children:"Id"}),e.jsx("input",{type:"text",id:c+"id",value:l.id||"",style:{color:"#fff9",borderColor:"#fff9"},placeholder:"Name"})]}),e.jsxs("div",{className:"name",children:[e.jsx("label",{htmlFor:c+"name",children:"Name"}),e.jsx("input",{type:"text",id:c+"name",value:l.name||"",placeholder:"Name",onChange:d=>{g({...l,name:d.currentTarget.value})}})]}),e.jsxs("div",{className:"phone",children:[e.jsx("label",{htmlFor:c+"phone",children:"Phone"}),e.jsx("input",{type:"text",id:c+"phone",value:l.phone||"",placeholder:"Phone",onChange:d=>{g({...l,phone:d.currentTarget.value})}})]}),e.jsxs("div",{className:"store_email",children:[e.jsx("label",{htmlFor:c+"store_email",children:"Store Email"}),e.jsx("input",{type:"email",id:c+"store_email",value:l.store_email||"",placeholder:"Store email",onChange:d=>{g({...l,store_email:d.currentTarget.value})}})]}),e.jsxs("div",{className:"website",children:[e.jsx("label",{htmlFor:c+"website",children:"Web Site"}),e.jsx("input",{type:"text",id:c+"website",value:l.website||"",placeholder:"Web Site",onChange:d=>{g({...l,website:d.currentTarget.value})}})]}),e.jsxs("div",{className:"desciption",children:[e.jsx("label",{htmlFor:c+"desciption",children:"Description"}),e.jsx("input",{type:"text",id:c+"description",value:l.description||"",placeholder:"Description",onChange:d=>{g({...l,description:d.currentTarget.value})}})]}),e.jsxs("div",{className:"address",children:[e.jsx("label",{htmlFor:c+"address",children:"Address"}),e.jsx("input",{type:"text",id:c+"address",value:"",placeholder:"Address",onChange:()=>{g({...l})}})]}),e.jsx("div",{className:"btm",children:e.jsxs("div",{className:"btn",onClick:()=>{C?r&&n({...l,banners:p,logo:u,store_id:r==null?void 0:r.id}).then(d=>{d&&t(["store_list"])}):m({...l,banners:p,logo:u}).then(d=>{d&&t(["store_list"])})},children:[C?"Edit":"Create"," Store"]})})]})]}),e.jsx("div",{className:"bottom-bar"})]})}function M(){const{check:c,current:s,setAbsPath:t,qs:i,navBack:o}=_(),{owner:m,stores:a,owner_stores:n,setSelectedStore:r}=v();return j.useEffect(()=>{c("store_list")&&n({})},[m]),s("store_list")&&e.jsxs("div",{className:"stores-page",children:[e.jsxs("div",{className:"top-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>o()}),e.jsxs("div",{className:"sreach-stores",children:[e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{type:"text",placeholder:"Search by #id, name, email",name:"sreach-stores",id:"sreach-stores",onChange:h=>{n({text:h.currentTarget.value})}})]}),e.jsxs("div",{className:"new-btn",onClick:()=>{r(void 0),t(["new_store"])},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Add New Store"})]})]})]}),e.jsx("div",{className:"stores",ref:H,children:a==null?void 0:a.list.map(h=>e.jsxs("div",{className:"store",children:[e.jsxs("div",{className:"banner",style:{background:f(h.banners[0])},onClick:()=>{r(h),i({store_id:h.id}).setAbsPath(["edit_store"])},children:[e.jsx("div",{className:"edit"}),e.jsxs("div",{className:"more",children:[e.jsx("div",{className:"logo",style:{background:f(h.logo[0])}}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:h.name}),e.jsx("div",{className:"owner-email",children:h.store_email}),e.jsxs("div",{className:"id",children:["#",h.id.split("-")[0]]})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:"42"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:"205"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:"9"}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:h.website}),e.jsx("div",{className:"phone",children:h.phone})]})]}),e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(h)),window.open(`${S}/${h.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(h)),window.open(`${S}/${h.name}/dash`)},children:"DASH"})]})]})]}))})]})}function W(){var w;const{setAbsPath:c,pathList:s}=_(),[t,i]=j.useState(s[1]||"home"),[o,m]=j.useState(!1),{owner:a,createOwner:n,disconnection:r,openChild:h}=v(),x=l=>{c([l]),i(l)};return j.useEffect(()=>{i(s[1]||"home")},[s]),e.jsxs("div",{className:"top-bar",children:[e.jsxs("div",{className:"left",children:[e.jsx("div",{className:"options",onClick:()=>{h(e.jsxs("ul",{className:"vert-nav",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>x("home"),children:["HOME ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>x("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>x("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>x("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),!0,"#1129")}}),e.jsx("div",{className:"logo-ctn",onClick:()=>{x("home")}})]}),e.jsxs("ul",{className:"top-bar-center",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>x("home"),children:["HOME ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>x("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>x("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>x("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),a?e.jsxs("div",{className:"profile-ctn",onClick:()=>{m(!o)},children:[e.jsx("div",{className:"user-name",children:a.name}),e.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(w=a==null?void 0:a.photos[0])!=null&&w.startsWith("/")?N:""}${a==null?void 0:a.photos}),#bbb`},children:o&&e.jsx("div",{className:"disco",onClick:()=>{r(),x("home")},children:" Disconnection"})})]}):e.jsx("div",{className:"login",onClick:()=>n(),children:"LOGIN"})]})}function L(){const{tryToken:c,blur:s,currentChild:t,openChild:i,back_color:o}=v();return j.useEffect(()=>{c()},[]),e.jsxs("div",{className:"web",children:[e.jsxs("div",{className:"web-ctn",style:{filter:s?"blur(10px)":""},children:[e.jsx("div",{className:"background"}),e.jsx(W,{}),e.jsxs("div",{className:"page-ctn",children:[e.jsx(z,{}),e.jsx(B,{}),e.jsx(M,{})]})]}),t&&e.jsx("div",{className:"child-viewer",onContextMenu:m=>{m.preventDefault(),i(void 0)},children:e.jsx("div",{className:"child-viewer-ctn",style:{background:o},onClick:()=>{i(void 0)},onContextMenu:m=>{m.preventDefault(),i(void 0)},children:t})})]})}const G=c=>c,X=G(e.jsx(P.StrictMode,{children:e.jsx(L,{})}));export{X as WebView};
