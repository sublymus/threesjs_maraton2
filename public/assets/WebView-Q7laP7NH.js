import{j as e,g as f,u as M,b as q,a as W}from"./BindToParentScroll-DnMN_wgu.js";import{c as L,S as B,H as b,r as g,L as S,R as G}from"./index-_Xo4PwOy.js";import{g as V,E as K}from"./EditorTopBar-sZ_IQd_L.js";const Q={"/":{new_store:{},edit_store:{},home:{},about:{},stores:{},contact:{},store_list:{}}},j=L(n=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async exist(s){return(await(await fetch(`${b}/check_store/?store_name=${s}`)).json()).exist==!0},async setStoreById(s){var i,o;const t=(i=j.getState().stores)==null?void 0:i.list.find(p=>p.id==s);if(t)return n(()=>({selectedStore:t}));{const p=(o=await j.getState().fetchStores({text:"#"+s}))==null?void 0:o.list[0];if(p)return n(()=>({selectedStore:p}))}},async fetchStores(s){const t=j.getState().owner;if(!t)return;s.owner_id=t.id,console.log({filter:s});const i=new URLSearchParams({});for(const a in s){const m=s[a];i.set(a,m)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const r=await(await fetch(`${b}/get_stores/?${i}`,{headers:o})).json();if(r!=null&&r.list)return n(()=>({stores:r})),r},openChild(s,t,i){n(()=>({currentChild:s,blur:t,back_color:s&&i||""}))},async deleteStore(s){const t=j.getState().owner;if(!t)return!1;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o={method:"DELETE",headers:i},p=await fetch(`${b}/delete_store/${s}`,o);try{const r=await p.json();return j.getState().owner_stores({}),r==null?void 0:r.deleted}catch{return!1}},setSelectedStore(s){n(()=>({selectedStore:s}))},async disconnection(){const s=j.getState().owner;if(s){const t=new Headers;t.append("Authorization",`Bearer ${s.token}`);const i={method:"GET",headers:t};await fetch(`${b}/disconnection`,i)}localStorage.removeItem("user"),n(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const s=localStorage.getItem("user");if(!s)return;const t=JSON.parse(s),i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o={method:"GET",headers:i};let r=await(await fetch(`${b}/me`,o)).json();if(!(r!=null&&r.id))return localStorage.removeItem("user");j.getState().owner_stores({}),r={token:t.token,...r},n(()=>({owner:r})),localStorage.setItem("user",JSON.stringify(r))},async owner_stores(s){const t=j.getState().owner;if(!t)return;s.owner_id=t.id;const i=new URLSearchParams({});for(const a in s){const m=s[a];i.set(a,m)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const r=await(await fetch(`${b}/get_stores/?${i}`,{headers:o})).json();if(r!=null&&r.list)return console.log(r.list),n(()=>({stores:r})),r},async editStore(s){const t=j.getState().owner;if(!t)return;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=new FormData;Object.keys(s).forEach((a,m)=>{console.log("data",m,a,s[a]),a=="banners"?s[a].file?(console.log("new File",s[a].file),o.append(a,JSON.stringify(["banners_0"])),o.append("banners_0",s[a].file)):s[a].url&&(o.append(a,JSON.stringify([s[a].url])),console.log("keep same",JSON.stringify(s[a]))):a=="logo"?s[a].file?(console.log("new File",s[a].file),o.append(a,JSON.stringify(["logo_0"])),o.append("logo_0",s[a].file)):s[a].url&&(o.append(a,JSON.stringify([s[a].url])),console.log("keep same",JSON.stringify(s[a]))):o.append(a,s[a])});const p={method:"PUT",body:o,headers:i},r=await fetch(`${b}/update_store`,p);try{const a=await r.json();return j.getState().owner_stores({}),a}catch(a){console.log(a.message);return}},async createStore(s){try{const t=j.getState().owner;if(!t)return;const i=new Headers;i.append("Authorization",`Bearer ${t.token}`);const o=new FormData;console.log(s),Object.keys(s).forEach(m=>{m=="logo"&&(o.append(m,JSON.stringify(["logo_0"])),o.append("logo_0",s[m].file)),m=="banners"?(o.append(m,JSON.stringify(["banners_0"])),o.append("banners_0",s[m].file)):o.append(m,s[m])});const p={method:"POST",body:o,headers:i},a=await(await fetch(`${b}/create_store`,p)).json();return j.getState().owner_stores({}),a}catch(t){return t}},async createOwner(){window.open(`${b}/google_connexion`,void 0,"popup");const s=setInterval(()=>{const t=localStorage.getItem("user"),i=t&&JSON.parse(t);i&&(n(()=>({owner:i})),clearInterval(s),j.getState().owner_stores({}),_.getState().setAbsPath(["store_list"]))},100)}})),_=new B(Q,["/","home"]).getStore();let X=0;function $({icon:n,infos:s,text:t,title:i,link:o,id:p}){return e.jsxs("a",{href:o,id:p,className:"card-flyer",children:[e.jsx("div",{className:"back-flyer",style:{background:`linear-gradient(${Math.trunc(Math.random()*180+X++*20)}deg, #408DD5 0%, #630B8C 100%)`}}),e.jsxs("div",{className:"front-flyer",children:[n&&e.jsx("div",{className:"icon",style:{background:f(n,"90%")}}),e.jsx("h1",{className:"title",children:i}),e.jsx("p",{children:t}),s==null?void 0:s.map((r,a)=>e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"icon",style:{background:f(r.icon,"90%")}}),e.jsx("div",{className:"text",children:r.text})]},a))]})]})}const Y=[{u:"products",i:"/src/res/add-product.png"},{u:"commands",i:"/src/res/shopping-bag.png"},{u:"users",i:"/src/res/customer.png"},{u:"interfaces",i:"/src/res/software-testing.png"},{u:"statistics",i:"/src/res/stats.png"}];function Z(){const{check:n}=_();return n("home")&&e.jsxs("div",{className:"page-home",children:[e.jsxs("div",{className:"page-text",children:[e.jsxs("div",{className:"text-top",children:[e.jsxs("div",{className:"stores-count",children:[34," Stores"]}),e.jsxs("div",{className:"title",children:["Discover the ",e.jsx("span",{className:"shopping",children:"Shopping"})," Revolution in ",e.jsx("span",{className:"c-3d",children:"3D"})]}),e.jsx("div",{className:"sub-title",children:"Create, Personalize and Sell your Products presented in 3D and offer your customers a unique interactive experience."})]}),e.jsxs("div",{className:"right",children:[e.jsx("div",{className:"subjects",children:Y.map(s=>e.jsx("a",{href:`#home/${s.u}`,style:{background:f(s.i)}}))}),e.jsxs("label",{htmlFor:"home-search",className:"search",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{id:"home-search",type:"text",placeholder:"Search"})]})]})]}),e.jsxs("div",{className:"prettier",children:[e.jsx($,{id:"home/products",icon:"/src/res/add-product.png",infos:[{icon:"/src/res/add-product.png",text:"add product 3D file"},{icon:"/src/res/add-product.png",text:"catalog, category, product, feature"}],text:"make your products accessible online, for your customers.",title:"Add new Products",link:"products"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx($,{id:"home/commands",icon:"/src/res/shopping-bag.png",infos:[{icon:"/src/res/shopping-bag.png",text:"auto or manual validation"},{icon:"/src/res/shopping-bag.png",text:"cart, cancel, deliver, on_the_way, return "}],text:"view orders, track and adjust order status",title:"Manage customer orders",link:"products"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx($,{id:"home/users",icon:"/src/res/customer.png",infos:[{icon:"/src/res/customer.png",text:"chose the role of collaborator"},{icon:"/src/res/customer.png",text:"client, owner, collaborator, moderator"}],text:"follow your customers, add chat collaborators with everyone, organize your team",title:"Store user types",link:"products"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx($,{id:"home/interfaces",icon:"/src/res/software-testing.png",infos:[{icon:"/src/res/software-testing.png",text:"automatically updates store information"},{icon:"/src/res/software-testing.png",text:"compatibility with all stores"}],text:"the platform has several interfaces to best meet your needs",title:"Change your store interface",link:"products"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx($,{id:"home/statistics",icon:"/src/res/stats.png",infos:[{icon:"/src/res/stats.png",text:"Statistical analysis of data"},{icon:"/src/res/stats.png",text:"visit, command, yield, period"}],text:"increase your sales using statistical data from your store",title:"Statistical table",link:"products"}),e.jsx("div",{className:"cadre"})]})]})}function ee(){var R;const[n]=g.useState(V()),{current:s,setAbsPath:t,navBack:i,json:o,pathList:p}=_(),{createStore:r,deleteStore:a,editStore:m,selectedStore:c,openChild:u,setStoreById:k,owner:C,exist:h}=j(),[d,w]=g.useState(c||{}),[x,E]=g.useState(c?{url:(s("edit_store")||"")&&`${c.logo[0]}`}:null),[v,T]=g.useState(c?{url:(s("edit_store")||"")&&`${(R=c.banners)==null?void 0:R[0]}`}:null),U=M().width<1050?"wrap":"",[P,F]=g.useState(""),[H,D]=g.useState(!1);g.useEffect(()=>{setTimeout(()=>{var l;c&&s("edit_store")&&(w(c),T({url:`${c.banners[0]}`}),E({url:`${(l=c.logo)==null?void 0:l[0]}`}))}),c||(w({}),E(null),T(null))},[c]),g.useEffect(()=>{C&&(o!=null&&o.store_id)&&k(o.store_id)},[o,C]),g.useEffect(()=>{F("")},[p]);const O=s("edit_store"),I=(v==null?void 0:v.url)&&(x==null?void 0:x.url)&&d.name,J=c;return O&&!c?e.jsx("div",{className:"store-select-btn",onClick:()=>{t(["store_list"])},children:"Select Store Before Edition"}):s("new_store","edit_store")&&e.jsxs("div",{className:"page-new-store",children:[c&&e.jsxs("div",{className:"editor-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>i()}),e.jsx(K,{terme:"dark",deteleKey:c.id,mode:"delete",onDelete:()=>{a(c.id).then(l=>{l&&t(["store_list"])})},onCreate:()=>{},title:"Store Information"}),e.jsxs("div",{className:"open-opt",children:[e.jsx("div",{className:"btn-dash btn demo no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(c)),window.open(`${S}/demo/${c.name}`)},children:"Open Demo Store"}),e.jsx("div",{className:"btn-dash btn no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(c)),window.open(`${S}/${c==null?void 0:c.name}/dash`)},children:"Open Dashboard"})]})]}),e.jsxs("div",{className:"center-content "+U,children:[e.jsx("div",{className:"center-left",children:e.jsxs("div",{className:"store "+(c?"anim":"void"),children:[e.jsxs("div",{className:"banner "+(v!=null&&v.url?"":"void"),style:v!=null&&v.url?{background:f((v==null?void 0:v.url)||"")}:{},children:[e.jsxs("div",{className:"img-options",children:[(v==null?void 0:v.url)&&e.jsx("div",{className:"open",onClick:()=>{u(e.jsx("div",{className:"big-img",onClick:()=>u(void 0,!1),children:e.jsx("div",{className:"img",style:{background:f((v==null?void 0:v.url)||"")}})}),!0,"#3455")}}),e.jsx("input",{type:"file",accept:"image/*",id:n+"banner",style:{display:"none"},onChange:l=>{var y;const N=(y=l.currentTarget.files)==null?void 0:y[0];N&&T({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:n+"banner",className:"edit"})]}),e.jsxs("div",{className:"more",children:[e.jsxs("div",{className:"logo "+(x!=null&&x.url?"":"void"),style:x!=null&&x.url?{background:f((x==null?void 0:x.url)||"")}:{},onClick:l=>{l.currentTarget==l.target&&x!=null&&x.url&&u(e.jsx("div",{className:"big-img",onClick:()=>u(void 0,!1),children:e.jsx("div",{className:"img",style:{background:f((x==null?void 0:x.url)||"")}})}),!0,"#3455")},children:[e.jsx("input",{type:"file",accept:"image/*",id:n+"logo",style:{display:"none"},onChange:l=>{var y;const N=(y=l.currentTarget.files)==null?void 0:y[0];N&&E({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:n+"logo",className:"edit"})]}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:d.name}),e.jsx("div",{className:"owner-email",children:d.store_email}),e.jsx("div",{className:"id",children:d.id&&`#${d.id.split("-")[0]}`})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:c?42:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:c?205:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:c?9:0}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:d.website}),e.jsx("div",{className:"phone",children:d.phone})]})]}),c&&e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(J)),window.open(`${S}/${d.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(J)),window.open(`${S}/${d.name}/dash`)},children:"DASH"})]})]})]})}),e.jsxs("div",{className:"center-right",children:[e.jsxs("div",{className:"imgs",children:[e.jsxs("label",{className:v!=null&&v.url?"available":"no-available",htmlFor:n+"banner",children:["Banner ",e.jsx("span",{})]}),e.jsxs("label",{className:x!=null&&x.url?"available":"no-available",htmlFor:n+"logo",children:["Logo ",e.jsx("span",{})]})]}),O&&e.jsxs("div",{className:"id",children:[e.jsx("label",{htmlFor:n+"id",style:{color:"#fff9"},children:"Id"}),e.jsx("input",{type:"text",id:n+"id",value:d.id||"",style:{color:"#fff9",borderColor:"#fff9"},placeholder:"Name"})]}),e.jsxs("div",{className:"name",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"name",children:"Store Name"}),e.jsxs("div",{className:"available",style:{display:P=="yes"?"flex":"none"},children:[e.jsx("span",{})," available"]}),e.jsxs("div",{className:"not-available",style:{display:P=="no"?"flex":"none"},children:[e.jsx("span",{})," not available"]})]}),e.jsx("input",{type:"text",id:n+"name",value:d.name||"",placeholder:"Name",onChange:l=>{var y;const N=l.currentTarget.value;N.trim().length<3?F("no"):(y=h(N))==null||y.then(A=>{F(A?"no":"yes"),console.log(N,P,A,A?"no":"yes")}),w({...d,name:N})}})]}),e.jsxs("div",{className:"phone",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"phone",children:"Phone"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:n+"phone",value:d.phone||"",placeholder:"Phone",onChange:l=>{w({...d,phone:l.currentTarget.value})}})]}),e.jsxs("div",{className:"store_email",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"store_email",children:"Store Email"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"email",id:n+"store_email",value:d.store_email||"",placeholder:"Store email",onChange:l=>{w({...d,store_email:l.currentTarget.value})}})]}),e.jsxs("div",{className:"website",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"website",children:"Web Site"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:n+"website",value:d.website||"",placeholder:"Web Site",onChange:l=>{w({...d,website:l.currentTarget.value})}})]}),e.jsxs("div",{className:"desciption",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"desciption",children:"Description"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:n+"description",value:d.description||"",placeholder:"Description",onChange:l=>{w({...d,description:l.currentTarget.value})}})]}),e.jsxs("div",{className:"address",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:n+"address",children:"Address"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:n+"address",value:d.address,placeholder:"Address",onChange:l=>{w({...d,address:l.currentTarget.value})}})]}),e.jsx("div",{className:"btm",children:e.jsx("div",{className:"btn no-selectable",style:{background:I?"":"#345"},onClick:()=>{!I||H||(D(!0),O?c&&m({...d,banners:v,logo:x,store_id:c==null?void 0:c.id}).then(l=>{D(!1),l&&t(["store_list"])}):r({...d,banners:v,logo:x}).then(l=>{setTimeout(()=>{D(!1)},100),l!=null&&l.id&&l&&t(["store_list"])}))},children:H?e.jsx("div",{className:"loading"}):`${O?"Edit":"Create"} Store`})})]})]})]})}function se(){const{check:n,current:s,setAbsPath:t,qs:i,navBack:o,pathList:p}=_(),{owner:r,stores:a,owner_stores:m,setSelectedStore:c}=j();return g.useEffect(()=>{r&&n("store_list")&&m({text:""})},[p,r]),s("store_list")&&e.jsxs("div",{className:"stores-page",children:[e.jsxs("div",{className:"top-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>o()}),e.jsxs("div",{className:"sreach-stores",children:[e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{type:"text",placeholder:"Search by #id, name, email",name:"sreach-stores",id:"sreach-stores",onChange:u=>{m({text:u.currentTarget.value})}})]}),r&&e.jsxs("div",{className:"new-btn no-selectable",onClick:()=>{c(void 0),t(["new_store"])},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Add New Store"})]})]})]}),e.jsx("div",{className:"stores",ref:q,children:a==null?void 0:a.list.map(u=>e.jsxs("div",{className:"store",children:[e.jsxs("div",{className:"banner",style:{background:f(u.banners[0])},onClick:()=>{c(u),i({store_id:u.id}).setAbsPath(["edit_store"])},children:[e.jsx("div",{className:"edit"}),e.jsxs("div",{className:"more",children:[e.jsx("div",{className:"logo",style:{background:f(u.logo[0])}}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:u.name}),e.jsx("div",{className:"owner-email",children:u.store_email}),e.jsxs("div",{className:"id",children:["#",u.id.split("-")[0]]})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:"42"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:"205"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:"9"}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:u.website}),e.jsx("div",{className:"phone",children:u.phone})]})]}),e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(u)),window.open(`${S}/${u.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(u)),window.open(`${S}/${u.name}/dash`)},children:"DASH"})]})]})]}))})]})}const z=[{u:"home",n:"Home",i:"/src/res/application.png"},{u:"store_list",n:"Stores",i:"/src/res/store.png"},{u:"tutorial",n:"Tutorial",i:"/src/res/catalog.png"},{u:"pricing",n:"Pricing",i:"/src/res/shopping-cart.png"},{u:"contact",n:"Contact us",i:"/src/res/services.png"},{u:"updates",n:"Updates",i:"/src/res/jigsaw.png"},{u:"forum",n:"Forum",i:"/src/res/multiple-users-silhouette.png"}];function te(){var C;const{setAbsPath:n,pathList:s}=_(),[t,i]=g.useState(s[1]||"home"),[o,p]=g.useState(!1),[r,a]=g.useState(!1),{owner:m,createOwner:c}=j(),u=M(),k=h=>{n([h]),i(h)};return g.useEffect(()=>{i(s[1]||"home")},[s]),g.useEffect(()=>{window.addEventListener("click",()=>{const h=document.querySelector(".top-bar .more-navs ul");(h==null?void 0:h.className)==""&&a(!1)})},[]),e.jsxs("div",{className:"top-bar",ref:W(80,".web"),children:[e.jsxs("div",{className:"top-bar-ctn",children:[e.jsxs("div",{className:"left",children:[e.jsx("div",{className:"options",onClick:()=>{}}),e.jsx("a",{href:`${S}/web#home`,className:"logo-ctn",onClick:()=>{k("home")},children:e.jsx("div",{className:"icon"})})]}),e.jsx("ul",{className:"top-bar-center",children:z.map((h,d)=>d*200<u.width-400?e.jsxs("li",{className:t==h.u?"active":"",onClick:()=>k(h.u),children:[e.jsx("span",{style:{background:f(h.i,"80%")}}),h.n]}):e.jsx(e.Fragment,{}))}),e.jsx("div",{className:"ctn-icon",onClick:h=>{h.preventDefault(),h.stopPropagation(),a(!r)},children:e.jsx("div",{className:"icon"})}),m?e.jsx("div",{className:"profile-ctn",onClick:()=>{},children:e.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(C=m==null?void 0:m.photos[0])!=null&&C.startsWith("/")?b:""}${m==null?void 0:m.photos}),#bbb`}})}):e.jsx("div",{className:"login",onClick:()=>c(),children:"Se connecter"})]}),e.jsx("div",{className:"more-navs",onClick:h=>{h.preventDefault(),h.stopPropagation()},children:e.jsxs("ul",{className:r?"":"close",children:[z.map((h,d)=>d*150>=u.width-500?e.jsxs("li",{className:t==h.u?"active":"",onClick:()=>k(h.u),children:[e.jsx("span",{style:{background:f(h.i,"80%")}}),h.n]}):e.jsx(e.Fragment,{})),e.jsxs("li",{className:t=="mode-lite"?"active":"",onClick:()=>{p(!o)},children:[e.jsx("span",{style:{background:f("/src/res/mark.png","70%")}}),o?"Lite mode off":"Lite mode on"]})]})})]})}function ae(){const{tryToken:n,blur:s,currentChild:t,openChild:i,back_color:o}=j(),{pathList:p}=_();return g.useEffect(()=>{i(void 0)},[p]),g.useEffect(()=>{n()},[]),e.jsxs("div",{className:"web",children:[e.jsxs("div",{className:"web-ctn",style:{filter:s?"blur(10px)":""},children:[e.jsx("div",{className:"background"}),e.jsx(te,{}),e.jsxs("div",{className:"page-ctn",children:[e.jsx(Z,{}),e.jsx(ee,{}),e.jsx(se,{})]})]}),t&&e.jsx("div",{className:"child-viewer",onContextMenu:r=>{r.preventDefault(),i(void 0)},children:e.jsx("div",{className:"child-viewer-ctn",style:{background:o},onClick:()=>{i(void 0)},onContextMenu:r=>{r.preventDefault(),i(void 0)},children:t})})]})}const re=n=>n,le=re(e.jsx(G.StrictMode,{children:e.jsx(ae,{})}));export{le as WebView};
