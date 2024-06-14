import{H as g,j as e,u as P,L as S,g as w,b as R}from"./BindToParentScroll-DCHn-0jT.js";import{c as F,S as U,r as j,R as D}from"./index-xpyu5DHv.js";import{g as z,E as B}from"./EditorTopBar-2FoxefIJ.js";const L={"/":{new_store:{},edit_store:{},home:{},about:{},stores:{},contact:{},store_list:{}}},u=F(l=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async exist(s){return(await(await fetch(`${g}/check_store/?store_name=${s}`)).json()).exist==!0},async setStoreById(s){var n,i;const t=(n=u.getState().stores)==null?void 0:n.list.find(d=>d.id==s);if(t)return l(()=>({selectedStore:t}));{const d=(i=await u.getState().fetchStores({text:"#"+s}))==null?void 0:i.list[0];if(d)return l(()=>({selectedStore:d}))}},async fetchStores(s){const t=u.getState().owner;if(!t)return;s.owner_id=t.id,console.log({filter:s});const n=new URLSearchParams({});for(const r in s){const h=s[r];n.set(r,h)}const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=await(await fetch(`${g}/get_stores/?${n}`,{headers:i})).json();if(o!=null&&o.list)return l(()=>({stores:o})),o},openChild(s,t,n){l(()=>({currentChild:s,blur:t,back_color:s&&n||""}))},async deleteStore(s){const t=u.getState().owner;if(!t)return!1;const n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const i={method:"DELETE",headers:n},d=await fetch(`${g}/delete_store/${s}`,i);try{const o=await d.json();return u.getState().owner_stores({}),o==null?void 0:o.deleted}catch{return!1}},setSelectedStore(s){l(()=>({selectedStore:s}))},async disconnection(){const s=u.getState().owner;if(s){const t=new Headers;t.append("Authorization",`Bearer ${s.token}`);const n={method:"GET",headers:t};await fetch(`${g}/disconnection`,n)}localStorage.removeItem("user"),l(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const s=localStorage.getItem("user");if(!s)return;const t=JSON.parse(s),n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const i={method:"GET",headers:n};let o=await(await fetch(`${g}/me`,i)).json();if(!(o!=null&&o.id))return localStorage.removeItem("user");u.getState().owner_stores({}),o={token:t.token,...o},l(()=>({owner:o})),localStorage.setItem("user",JSON.stringify(o))},async owner_stores(s){const t=u.getState().owner;if(!t)return;s.owner_id=t.id;const n=new URLSearchParams({});for(const r in s){const h=s[r];n.set(r,h)}const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=await(await fetch(`${g}/get_stores/?${n}`,{headers:i})).json();if(o!=null&&o.list)return console.log(o.list),l(()=>({stores:o})),o},async editStore(s){const t=u.getState().owner;if(!t)return;const n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const i=new FormData;Object.keys(s).forEach((r,h)=>{console.log("data",h,r,s[r]),r=="banners"?s[r].file?(console.log("new File",s[r].file),i.append(r,JSON.stringify(["banners_0"])),i.append("banners_0",s[r].file)):s[r].url&&(i.append(r,JSON.stringify([s[r].url])),console.log("keep same",JSON.stringify(s[r]))):r=="logo"?s[r].file?(console.log("new File",s[r].file),i.append(r,JSON.stringify(["logo_0"])),i.append("logo_0",s[r].file)):s[r].url&&(i.append(r,JSON.stringify([s[r].url])),console.log("keep same",JSON.stringify(s[r]))):i.append(r,s[r])});const d={method:"PUT",body:i,headers:n},o=await fetch(`${g}/update_store`,d);try{const r=await o.json();return u.getState().owner_stores({}),r}catch(r){console.log(r.message);return}},async createStore(s){try{const t=u.getState().owner;if(!t)return;const n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const i=new FormData;console.log(s),Object.keys(s).forEach(h=>{h=="logo"&&(i.append(h,JSON.stringify(["logo_0"])),i.append("logo_0",s[h].file)),h=="banners"?(i.append(h,JSON.stringify(["banners_0"])),i.append("banners_0",s[h].file)):i.append(h,s[h])});const d={method:"POST",body:i,headers:n},r=await(await fetch(`${g}/create_store`,d)).json();return u.getState().owner_stores({}),r}catch(t){return t}},async createOwner(){window.open(`${g}/google_connexion`,void 0,"popup");const s=setInterval(()=>{const t=localStorage.getItem("user"),n=t&&JSON.parse(t);n&&(l(()=>({owner:n})),clearInterval(s),u.getState().owner_stores({}),_.getState().setAbsPath(["store_list"]))},100)}})),_=new U(L,["/","home"]).getStore(),M=["img1.png","img2.png","img3.svg","img4.png","img5.svg"].map(l=>"/src/res/img/"+l);function W(){const{current:l,setAbsPath:s}=_(),{owner:t}=u();return l("home")&&e.jsxs("div",{className:"page-home",children:[e.jsxs("div",{className:"center-content",children:[e.jsxs("div",{className:"center-left",children:[e.jsxs("div",{className:"title",children:[e.jsx("div",{className:"top",children:"Startup "}),e.jsx("div",{className:"btm",children:"Business"})]}),e.jsx("p",{children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officia tenetur, provident expedita voluptates cumque quibusdam adipisci itaque. Molestiae rerum, labore rem itaque hic atque magnam nam cumque quaerat fuga!".split(" ").map((n,i)=>e.jsx("span",{children:n+" "},i))}),e.jsx("div",{className:"btn-ctn",children:e.jsx("div",{className:"manage no-selectable",onClick:()=>s(t?["store_list"]:["store_list"]),children:"MANAGE YOUR STORES"})})]}),e.jsx("div",{className:"center-right"})]}),e.jsx("div",{className:"bottom-bar",children:M.map(n=>e.jsx("div",{className:"icon",style:{background:`no-repeat center/contain url(${n})`}},n))})]})}function G(){var H;const[l]=j.useState(z()),{current:s,setAbsPath:t,navBack:n,json:i,pathList:d}=_(),{createStore:o,deleteStore:r,editStore:h,selectedStore:a,openChild:v,setStoreById:C,owner:y,exist:I}=u(),[m,b]=j.useState(a||{}),[p,k]=j.useState(a?{url:(s("edit_store")||"")&&`${a.logo[0]}`}:null),[x,$]=j.useState(a?{url:(s("edit_store")||"")&&`${(H=a.banners)==null?void 0:H[0]}`}:null),J=P().width<1050?"wrap":"",[T,E]=j.useState("");j.useEffect(()=>{setTimeout(()=>{var c;a&&s("edit_store")&&(b(a),$({url:`${a.banners[0]}`}),k({url:`${(c=a.logo)==null?void 0:c[0]}`}))}),a||(b({}),k(null),$(null))},[a]),j.useEffect(()=>{y&&(i!=null&&i.store_id)&&C(i.store_id)},[i,y]),j.useEffect(()=>{E("")},[d]);const O=s("edit_store"),q=a;return O&&!a?e.jsx("div",{className:"store-select-btn",onClick:()=>{t(["store_list"])},children:"Select Store Before Edition"}):s("new_store","edit_store")&&e.jsxs("div",{className:"page-new-store",children:[a&&e.jsxs("div",{className:"editor-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>n()}),e.jsx(B,{terme:"dark",deteleKey:a.id,mode:"delete",onDelete:()=>{r(a.id).then(c=>{c&&t(["store_list"])})},onCreate:()=>{},title:"Store Information"}),e.jsxs("div",{className:"open-opt",children:[e.jsx("div",{className:"btn-dash btn demo no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(a)),window.open(`${S}/demo/${a.name}`)},children:"Open Demo Store"}),e.jsx("div",{className:"btn-dash btn no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(a)),window.open(`${S}/${a==null?void 0:a.name}/dash`)},children:"Open Dashboard"})]})]}),e.jsxs("div",{className:"center-content "+J,children:[e.jsx("div",{className:"center-left",children:e.jsxs("div",{className:"store "+(a?"anim":"void"),children:[e.jsxs("div",{className:"banner "+(x!=null&&x.url?"":"void"),style:x!=null&&x.url?{background:w((x==null?void 0:x.url)||"")}:{},children:[e.jsxs("div",{className:"img-options",children:[(x==null?void 0:x.url)&&e.jsx("div",{className:"open",onClick:()=>{v(e.jsx("div",{className:"big-img",onClick:()=>v(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((x==null?void 0:x.url)||"")}})}),!0,"#3455")}}),e.jsx("input",{type:"file",accept:"image/*",id:l+"banner",style:{display:"none"},onChange:c=>{var f;const N=(f=c.currentTarget.files)==null?void 0:f[0];N&&$({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:l+"banner",className:"edit"})]}),e.jsxs("div",{className:"more",children:[e.jsxs("div",{className:"logo "+(p!=null&&p.url?"":"void"),style:p!=null&&p.url?{background:w((p==null?void 0:p.url)||"")}:{},onClick:c=>{c.currentTarget==c.target&&p!=null&&p.url&&v(e.jsx("div",{className:"big-img",onClick:()=>v(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((p==null?void 0:p.url)||"")}})}),!0,"#3455")},children:[e.jsx("input",{type:"file",accept:"image/*",id:l+"logo",style:{display:"none"},onChange:c=>{var f;const N=(f=c.currentTarget.files)==null?void 0:f[0];N&&k({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:l+"logo",className:"edit"})]}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:m.name}),e.jsx("div",{className:"owner-email",children:m.store_email}),e.jsx("div",{className:"id",children:m.id&&`#${m.id.split("-")[0]}`})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:a?42:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:a?205:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:a?9:0}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:m.website}),e.jsx("div",{className:"phone",children:m.phone})]})]}),a&&e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(q)),window.open(`${S}/${m.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(q)),window.open(`${S}/${m.name}/dash`)},children:"DASH"})]})]})]})}),e.jsxs("div",{className:"center-right",children:[O&&e.jsxs("div",{className:"id",children:[e.jsx("label",{htmlFor:l+"id",style:{color:"#fff9"},children:"Id"}),e.jsx("input",{type:"text",id:l+"id",value:m.id||"",style:{color:"#fff9",borderColor:"#fff9"},placeholder:"Name"})]}),e.jsxs("div",{className:"name",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:l+"name",children:"Name"}),e.jsxs("div",{className:"avalaible",style:{display:T=="yes"?"flex":"none"},children:[e.jsx("span",{})," avalaible"]}),e.jsxs("div",{className:"not-avalaible",style:{display:T=="no"?"flex":"none"},children:[e.jsx("span",{})," not avalaible"]})]}),e.jsx("input",{type:"text",id:l+"name",value:m.name||"",placeholder:"Name",onChange:c=>{var f;const N=c.currentTarget.value.toLocaleLowerCase();N.trim().length<3?E("no"):(f=I(N))==null||f.then(A=>{E(A?"no":"yes"),console.log(N,T,A,A?"no":"yes")}),b({...m,name:N})}})]}),e.jsxs("div",{className:"phone",children:[e.jsx("label",{htmlFor:l+"phone",children:"Phone"}),e.jsx("input",{type:"text",id:l+"phone",value:m.phone||"",placeholder:"Phone",onChange:c=>{b({...m,phone:c.currentTarget.value})}})]}),e.jsxs("div",{className:"store_email",children:[e.jsx("label",{htmlFor:l+"store_email",children:"Store Email"}),e.jsx("input",{type:"email",id:l+"store_email",value:m.store_email||"",placeholder:"Store email",onChange:c=>{b({...m,store_email:c.currentTarget.value})}})]}),e.jsxs("div",{className:"website",children:[e.jsx("label",{htmlFor:l+"website",children:"Web Site"}),e.jsx("input",{type:"text",id:l+"website",value:m.website||"",placeholder:"Web Site",onChange:c=>{b({...m,website:c.currentTarget.value})}})]}),e.jsxs("div",{className:"desciption",children:[e.jsx("label",{htmlFor:l+"desciption",children:"Description"}),e.jsx("input",{type:"text",id:l+"description",value:m.description||"",placeholder:"Description",onChange:c=>{b({...m,description:c.currentTarget.value})}})]}),e.jsxs("div",{className:"address",children:[e.jsx("label",{htmlFor:l+"address",children:"Address"}),e.jsx("input",{type:"text",id:l+"address",value:m.address,placeholder:"Address",onChange:c=>{b({...m,address:c.currentTarget.value})}})]}),e.jsx("div",{className:"btm",children:e.jsxs("div",{className:"btn no-selectable",onClick:()=>{O?a&&h({...m,banners:x,logo:p,store_id:a==null?void 0:a.id}).then(c=>{c&&t(["store_list"])}):o({...m,banners:x,logo:p}).then(c=>{c!=null&&c.id?c&&t(["store_list"]):v(e.jsx("div",{style:{color:"#345"},children:(c==null?void 0:c.stack)||JSON.stringify(c||"{}")}),!0,"#fff")})},children:[O?"Edit":"Create"," Store"]})})]})]})]})}function V(){const{check:l,current:s,setAbsPath:t,qs:n,navBack:i}=_(),{owner:d,stores:o,owner_stores:r,setSelectedStore:h}=u();return j.useEffect(()=>{l("store_list")&&r({})},[d]),s("store_list")&&e.jsxs("div",{className:"stores-page",children:[e.jsxs("div",{className:"top-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>i()}),e.jsxs("div",{className:"sreach-stores",children:[e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{type:"text",placeholder:"Search by #id, name, email",name:"sreach-stores",id:"sreach-stores",onChange:a=>{r({text:a.currentTarget.value})}})]}),e.jsxs("div",{className:"new-btn no-selectable",onClick:()=>{h(void 0),t(["new_store"])},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Add New Store"})]})]})]}),e.jsx("div",{className:"stores",ref:R,children:o==null?void 0:o.list.map(a=>e.jsxs("div",{className:"store",children:[e.jsxs("div",{className:"banner",style:{background:w(a.banners[0])},onClick:()=>{h(a),n({store_id:a.id}).setAbsPath(["edit_store"])},children:[e.jsx("div",{className:"edit"}),e.jsxs("div",{className:"more",children:[e.jsx("div",{className:"logo",style:{background:w(a.logo[0])}}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:a.name}),e.jsx("div",{className:"owner-email",children:a.store_email}),e.jsxs("div",{className:"id",children:["#",a.id.split("-")[0]]})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:"42"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:"205"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:"9"}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:a.website}),e.jsx("div",{className:"phone",children:a.phone})]})]}),e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(a)),window.open(`${S}/${a.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(a)),window.open(`${S}/${a.name}/dash`)},children:"DASH"})]})]})]}))})]})}function K(){var C;const{setAbsPath:l,pathList:s}=_(),[t,n]=j.useState(s[1]||"home"),[i,d]=j.useState(!1),{owner:o,createOwner:r,disconnection:h,openChild:a}=u(),v=y=>{l([y]),n(y)};return j.useEffect(()=>{n(s[1]||"home")},[s]),e.jsxs("div",{className:"top-bar",children:[e.jsxs("div",{className:"left",children:[e.jsx("div",{className:"options",onClick:()=>{a(e.jsxs("ul",{className:"vert-nav",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>v("home"),children:["HOME ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>v("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>v("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>v("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),!0,"#1129")}}),e.jsx("div",{className:"logo-ctn",onClick:()=>{v("home")}})]}),e.jsxs("ul",{className:"top-bar-center",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>v("home"),children:["HOME ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>v("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>v("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>v("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),o?e.jsxs("div",{className:"profile-ctn",onClick:()=>{d(!i)},children:[e.jsx("div",{className:"user-name",children:o.name}),e.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(C=o==null?void 0:o.photos[0])!=null&&C.startsWith("/")?g:""}${o==null?void 0:o.photos}),#bbb`},children:i&&e.jsx("div",{className:"disco",onClick:()=>{h(),v("home")},children:" Disconnection"})})]}):e.jsx("div",{className:"login",onClick:()=>r(),children:"LOGIN"})]})}function Y(){const{tryToken:l,blur:s,currentChild:t,openChild:n,back_color:i}=u();return j.useEffect(()=>{l()},[]),e.jsxs("div",{className:"web",children:[e.jsxs("div",{className:"web-ctn",style:{filter:s?"blur(10px)":""},children:[e.jsx("div",{className:"background"}),e.jsx(K,{}),e.jsxs("div",{className:"page-ctn",children:[e.jsx(W,{}),e.jsx(G,{}),e.jsx(V,{})]})]}),t&&e.jsx("div",{className:"child-viewer",onContextMenu:d=>{d.preventDefault(),n(void 0)},children:e.jsx("div",{className:"child-viewer-ctn",style:{background:i},onClick:()=>{n(void 0)},onContextMenu:d=>{d.preventDefault(),n(void 0)},children:t})})]})}const Q=l=>l,te=Q(e.jsx(D.StrictMode,{children:e.jsx(Y,{})}));export{te as WebView};
