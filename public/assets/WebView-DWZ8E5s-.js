import{j as e,u as U,g as w,b as z}from"./BindToParentScroll-C9VfcRV1.js";import{c as W,S as q,H as g,r as j,L as S,R as B}from"./index-DP98MT9B.js";import{g as M,E as G}from"./EditorTopBar--c392i9v.js";const L={"/":{new_store:{},edit_store:{},home:{},about:{},stores:{},contact:{},store_list:{}}},x=W(r=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async exist(s){return(await(await fetch(`${g}/check_store/?store_name=${s}`)).json()).exist==!0},async setStoreById(s){var a,o;const t=(a=x.getState().stores)==null?void 0:a.list.find(u=>u.id==s);if(t)return r(()=>({selectedStore:t}));{const u=(o=await x.getState().fetchStores({text:"#"+s}))==null?void 0:o.list[0];if(u)return r(()=>({selectedStore:u}))}},async fetchStores(s){const t=x.getState().owner;if(!t)return;s.owner_id=t.id,console.log({filter:s});const a=new URLSearchParams({});for(const i in s){const v=s[i];a.set(i,v)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n=await(await fetch(`${g}/get_stores/?${a}`,{headers:o})).json();if(n!=null&&n.list)return r(()=>({stores:n})),n},openChild(s,t,a){r(()=>({currentChild:s,blur:t,back_color:s&&a||""}))},async deleteStore(s){const t=x.getState().owner;if(!t)return!1;const a=new Headers;a.append("Authorization",`Bearer ${t.token}`);const o={method:"DELETE",headers:a},u=await fetch(`${g}/delete_store/${s}`,o);try{const n=await u.json();return x.getState().owner_stores({}),n==null?void 0:n.deleted}catch{return!1}},setSelectedStore(s){r(()=>({selectedStore:s}))},async disconnection(){const s=x.getState().owner;if(s){const t=new Headers;t.append("Authorization",`Bearer ${s.token}`);const a={method:"GET",headers:t};await fetch(`${g}/disconnection`,a)}localStorage.removeItem("user"),r(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const s=localStorage.getItem("user");if(!s)return;const t=JSON.parse(s),a=new Headers;a.append("Authorization",`Bearer ${t.token}`);const o={method:"GET",headers:a};let n=await(await fetch(`${g}/me`,o)).json();if(!(n!=null&&n.id))return localStorage.removeItem("user");x.getState().owner_stores({}),n={token:t.token,...n},r(()=>({owner:n})),localStorage.setItem("user",JSON.stringify(n))},async owner_stores(s){const t=x.getState().owner;if(!t)return;s.owner_id=t.id;const a=new URLSearchParams({});for(const i in s){const v=s[i];a.set(i,v)}const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n=await(await fetch(`${g}/get_stores/?${a}`,{headers:o})).json();if(n!=null&&n.list)return console.log(n.list),r(()=>({stores:n})),n},async editStore(s){const t=x.getState().owner;if(!t)return;const a=new Headers;a.append("Authorization",`Bearer ${t.token}`);const o=new FormData;Object.keys(s).forEach((i,v)=>{console.log("data",v,i,s[i]),i=="banners"?s[i].file?(console.log("new File",s[i].file),o.append(i,JSON.stringify(["banners_0"])),o.append("banners_0",s[i].file)):s[i].url&&(o.append(i,JSON.stringify([s[i].url])),console.log("keep same",JSON.stringify(s[i]))):i=="logo"?s[i].file?(console.log("new File",s[i].file),o.append(i,JSON.stringify(["logo_0"])),o.append("logo_0",s[i].file)):s[i].url&&(o.append(i,JSON.stringify([s[i].url])),console.log("keep same",JSON.stringify(s[i]))):o.append(i,s[i])});const u={method:"PUT",body:o,headers:a},n=await fetch(`${g}/update_store`,u);try{const i=await n.json();return x.getState().owner_stores({}),i}catch(i){console.log(i.message);return}},async createStore(s){try{const t=x.getState().owner;if(!t)return;const a=new Headers;a.append("Authorization",`Bearer ${t.token}`);const o=new FormData;console.log(s),Object.keys(s).forEach(v=>{v=="logo"&&(o.append(v,JSON.stringify(["logo_0"])),o.append("logo_0",s[v].file)),v=="banners"?(o.append(v,JSON.stringify(["banners_0"])),o.append("banners_0",s[v].file)):o.append(v,s[v])});const u={method:"POST",body:o,headers:a},i=await(await fetch(`${g}/create_store`,u)).json();return x.getState().owner_stores({}),i}catch(t){return t}},async createOwner(){window.open(`${g}/google_connexion`,void 0,"popup");const s=setInterval(()=>{const t=localStorage.getItem("user"),a=t&&JSON.parse(t);a&&(r(()=>({owner:a})),clearInterval(s),x.getState().owner_stores({}),y.getState().setAbsPath(["store_list"]))},100)}})),y=new q(L,["/","home"]).getStore(),V=["img1.png","img2.png","img3.svg","img4.png","img5.svg"].map(r=>"/src/res/img/"+r);function K(){const{current:r,setAbsPath:s}=y(),{owner:t}=x();return r("home")&&e.jsxs("div",{className:"page-home",children:[e.jsxs("div",{className:"center-content",children:[e.jsxs("div",{className:"center-left",children:[e.jsxs("div",{className:"title",children:[e.jsx("div",{className:"top",children:"Upgrade "}),e.jsx("div",{className:"btm",children:"Business"})]}),e.jsx("p",{children:"Do you want to offer your customers an immersive and modern online shopping experience? Transform your store into a virtual storefront with interactive 3D product presentations! Allow your customers to discover and explore every detail of your products as if they were in-store. Contact us today to learn more about creating your 3D virtual store and providing your customers with a unique, cutting-edge experience".split(" ").map((a,o)=>e.jsx("span",{children:a+" "},o))}),e.jsx("div",{className:"btn-ctn",children:e.jsx("div",{className:"manage no-selectable",onClick:()=>s(t?["store_list"]:["store_list"]),children:"MANAGE YOUR STORES"})})]}),e.jsx("div",{className:"center-right",children:e.jsx("video",{style:{borderRadius:"25px",overflow:"hidden"},width:"100%",loop:!0,autoPlay:!0,src:"/src/res/video/Cake_Couch.mp4"})})]}),e.jsx("div",{className:"bottom-bar",children:V.map(a=>e.jsx("div",{className:"icon",style:{background:`no-repeat center/contain url(${a})`}},a))})]})}function Y(){var R;const[r]=j.useState(M()),{current:s,setAbsPath:t,navBack:a,json:o,pathList:u}=y(),{createStore:n,deleteStore:i,editStore:v,selectedStore:l,openChild:c,setStoreById:C,owner:_,exist:D}=x(),[m,b]=j.useState(l||{}),[h,k]=j.useState(l?{url:(s("edit_store")||"")&&`${l.logo[0]}`}:null),[p,$]=j.useState(l?{url:(s("edit_store")||"")&&`${(R=l.banners)==null?void 0:R[0]}`}:null),F=U().width<1050?"wrap":"",[T,E]=j.useState(""),[H,A]=j.useState(!1);j.useEffect(()=>{setTimeout(()=>{var d;l&&s("edit_store")&&(b(l),$({url:`${l.banners[0]}`}),k({url:`${(d=l.logo)==null?void 0:d[0]}`}))}),l||(b({}),k(null),$(null))},[l]),j.useEffect(()=>{_&&(o!=null&&o.store_id)&&C(o.store_id)},[o,_]),j.useEffect(()=>{E("")},[u]);const O=s("edit_store"),I=(p==null?void 0:p.url)&&(h==null?void 0:h.url)&&m.name,J=l;return O&&!l?e.jsx("div",{className:"store-select-btn",onClick:()=>{t(["store_list"])},children:"Select Store Before Edition"}):s("new_store","edit_store")&&e.jsxs("div",{className:"page-new-store",children:[l&&e.jsxs("div",{className:"editor-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>a()}),e.jsx(G,{terme:"dark",deteleKey:l.id,mode:"delete",onDelete:()=>{i(l.id).then(d=>{d&&t(["store_list"])})},onCreate:()=>{},title:"Store Information"}),e.jsxs("div",{className:"open-opt",children:[e.jsx("div",{className:"btn-dash btn demo no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(l)),window.open(`${S}/demo/${l.name}`)},children:"Open Demo Store"}),e.jsx("div",{className:"btn-dash btn no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(l)),window.open(`${S}/${l==null?void 0:l.name}/dash`)},children:"Open Dashboard"})]})]}),e.jsxs("div",{className:"center-content "+F,children:[e.jsx("div",{className:"center-left",children:e.jsxs("div",{className:"store "+(l?"anim":"void"),children:[e.jsxs("div",{className:"banner "+(p!=null&&p.url?"":"void"),style:p!=null&&p.url?{background:w((p==null?void 0:p.url)||"")}:{},children:[e.jsxs("div",{className:"img-options",children:[(p==null?void 0:p.url)&&e.jsx("div",{className:"open",onClick:()=>{c(e.jsx("div",{className:"big-img",onClick:()=>c(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((p==null?void 0:p.url)||"")}})}),!0,"#3455")}}),e.jsx("input",{type:"file",accept:"image/*",id:r+"banner",style:{display:"none"},onChange:d=>{var f;const N=(f=d.currentTarget.files)==null?void 0:f[0];N&&$({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:r+"banner",className:"edit"})]}),e.jsxs("div",{className:"more",children:[e.jsxs("div",{className:"logo "+(h!=null&&h.url?"":"void"),style:h!=null&&h.url?{background:w((h==null?void 0:h.url)||"")}:{},onClick:d=>{d.currentTarget==d.target&&h!=null&&h.url&&c(e.jsx("div",{className:"big-img",onClick:()=>c(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((h==null?void 0:h.url)||"")}})}),!0,"#3455")},children:[e.jsx("input",{type:"file",accept:"image/*",id:r+"logo",style:{display:"none"},onChange:d=>{var f;const N=(f=d.currentTarget.files)==null?void 0:f[0];N&&k({file:N,url:URL.createObjectURL(N)})}}),e.jsx("label",{htmlFor:r+"logo",className:"edit"})]}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:m.name}),e.jsx("div",{className:"owner-email",children:m.store_email}),e.jsx("div",{className:"id",children:m.id&&`#${m.id.split("-")[0]}`})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:l?42:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:l?205:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:l?9:0}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:m.website}),e.jsx("div",{className:"phone",children:m.phone})]})]}),l&&e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(J)),window.open(`${S}/${m.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(J)),window.open(`${S}/${m.name}/dash`)},children:"DASH"})]})]})]})}),e.jsxs("div",{className:"center-right",children:[e.jsxs("div",{className:"imgs",children:[e.jsxs("label",{className:p!=null&&p.url?"available":"no-available",htmlFor:r+"banner",children:["Banner ",e.jsx("span",{})]}),e.jsxs("label",{className:h!=null&&h.url?"available":"no-available",htmlFor:r+"logo",children:["Logo ",e.jsx("span",{})]})]}),O&&e.jsxs("div",{className:"id",children:[e.jsx("label",{htmlFor:r+"id",style:{color:"#fff9"},children:"Id"}),e.jsx("input",{type:"text",id:r+"id",value:m.id||"",style:{color:"#fff9",borderColor:"#fff9"},placeholder:"Name"})]}),e.jsxs("div",{className:"name",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"name",children:"Store Name"}),e.jsxs("div",{className:"available",style:{display:T=="yes"?"flex":"none"},children:[e.jsx("span",{})," available"]}),e.jsxs("div",{className:"not-available",style:{display:T=="no"?"flex":"none"},children:[e.jsx("span",{})," not available"]})]}),e.jsx("input",{type:"text",id:r+"name",value:m.name||"",placeholder:"Name",onChange:d=>{var f;const N=d.currentTarget.value;N.trim().length<3?E("no"):(f=D(N))==null||f.then(P=>{E(P?"no":"yes"),console.log(N,T,P,P?"no":"yes")}),b({...m,name:N})}})]}),e.jsxs("div",{className:"phone",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"phone",children:"Phone"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:r+"phone",value:m.phone||"",placeholder:"Phone",onChange:d=>{b({...m,phone:d.currentTarget.value})}})]}),e.jsxs("div",{className:"store_email",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"store_email",children:"Store Email"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"email",id:r+"store_email",value:m.store_email||"",placeholder:"Store email",onChange:d=>{b({...m,store_email:d.currentTarget.value})}})]}),e.jsxs("div",{className:"website",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"website",children:"Web Site"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:r+"website",value:m.website||"",placeholder:"Web Site",onChange:d=>{b({...m,website:d.currentTarget.value})}})]}),e.jsxs("div",{className:"desciption",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"desciption",children:"Description"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:r+"description",value:m.description||"",placeholder:"Description",onChange:d=>{b({...m,description:d.currentTarget.value})}})]}),e.jsxs("div",{className:"address",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:r+"address",children:"Address"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:r+"address",value:m.address,placeholder:"Address",onChange:d=>{b({...m,address:d.currentTarget.value})}})]}),e.jsx("div",{className:"btm",children:e.jsx("div",{className:"btn no-selectable",style:{background:I?"":"#345"},onClick:()=>{!I||H||(A(!0),O?l&&v({...m,banners:p,logo:h,store_id:l==null?void 0:l.id}).then(d=>{A(!1),d&&t(["store_list"])}):n({...m,banners:p,logo:h}).then(d=>{setTimeout(()=>{A(!1)},100),d!=null&&d.id&&d&&t(["store_list"])}))},children:H?e.jsx("div",{className:"loading"}):`${O?"Edit":"Create"} Store`})})]})]})]})}function Q(){const{check:r,current:s,setAbsPath:t,qs:a,navBack:o,pathList:u}=y(),{owner:n,stores:i,owner_stores:v,setSelectedStore:l}=x();return j.useEffect(()=>{n&&r("store_list")&&v({text:""})},[u]),s("store_list")&&e.jsxs("div",{className:"stores-page",children:[e.jsxs("div",{className:"top-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>o()}),e.jsxs("div",{className:"sreach-stores",children:[e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{type:"text",placeholder:"Search by #id, name, email",name:"sreach-stores",id:"sreach-stores",onChange:c=>{v({text:c.currentTarget.value})}})]}),e.jsxs("div",{className:"new-btn no-selectable",onClick:()=>{l(void 0),t(["new_store"])},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Add New Store"})]})]})]}),e.jsx("div",{className:"stores",ref:z,children:i==null?void 0:i.list.map(c=>e.jsxs("div",{className:"store",children:[e.jsxs("div",{className:"banner",style:{background:w(c.banners[0])},onClick:()=>{l(c),a({store_id:c.id}).setAbsPath(["edit_store"])},children:[e.jsx("div",{className:"edit"}),e.jsxs("div",{className:"more",children:[e.jsx("div",{className:"logo",style:{background:w(c.logo[0])}}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:c.name}),e.jsx("div",{className:"owner-email",children:c.store_email}),e.jsxs("div",{className:"id",children:["#",c.id.split("-")[0]]})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:"42"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:"205"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:"9"}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:c.website}),e.jsx("div",{className:"phone",children:c.phone})]})]}),e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(c)),window.open(`${S}/${c.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(c)),window.open(`${S}/${c.name}/dash`)},children:"DASH"})]})]})]}))})]})}function X(){var C;const{setAbsPath:r,pathList:s}=y(),[t,a]=j.useState(s[1]||"home"),[o,u]=j.useState(!1),{owner:n,createOwner:i,disconnection:v,openChild:l}=x(),c=_=>{r([_]),a(_)};return j.useEffect(()=>{a(s[1]||"home")},[s]),e.jsxs("div",{className:"top-bar",children:[e.jsxs("div",{className:"left",children:[e.jsx("div",{className:"options",onClick:()=>{l(e.jsxs("ul",{className:"vert-nav",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>c("home"),children:["HOME",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>c("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>c("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>c("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),!0,"#1129")}}),e.jsx("div",{className:"logo-ctn",onClick:()=>{c("home")}})]}),e.jsxs("ul",{className:"top-bar-center",children:[e.jsxs("li",{className:t=="home"?"active":"",onClick:()=>c("home"),children:["HOME ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="store_list"||t=="edit_store"||t=="new_store"?"active":"",onClick:()=>c("store_list"),children:["STORES ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="about"?"active":"",onClick:()=>c("about"),children:["ABOUT US ",e.jsx("span",{})]}),e.jsxs("li",{className:t=="contact"?"active":"",onClick:()=>c("contact"),children:["CONTACT US ",e.jsx("span",{})]})]}),n?e.jsxs("div",{className:"profile-ctn",onClick:()=>{u(!o)},children:[e.jsx("div",{className:"user-name",children:n.name}),e.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(C=n==null?void 0:n.photos[0])!=null&&C.startsWith("/")?g:""}${n==null?void 0:n.photos}),#bbb`},children:o&&e.jsx("div",{className:"disco",onClick:()=>{v(),c("home")},children:" Disconnection"})})]}):e.jsx("div",{className:"login",onClick:()=>i(),children:"Se connecter"})]})}function Z(){const{tryToken:r,blur:s,currentChild:t,openChild:a,back_color:o}=x(),{pathList:u}=y();return j.useEffect(()=>{a(void 0)},[u]),j.useEffect(()=>{r()},[]),e.jsxs("div",{className:"web",children:[e.jsxs("div",{className:"web-ctn",style:{filter:s?"blur(10px)":""},children:[e.jsx("div",{className:"background"}),e.jsx(X,{}),e.jsxs("div",{className:"page-ctn",children:[e.jsx(K,{}),e.jsx(Y,{}),e.jsx(Q,{})]})]}),t&&e.jsx("div",{className:"child-viewer",onContextMenu:n=>{n.preventDefault(),a(void 0)},children:e.jsx("div",{className:"child-viewer-ctn",style:{background:o},onClick:()=>{a(void 0)},onContextMenu:n=>{n.preventDefault(),a(void 0)},children:t})})]})}const ee=r=>r,oe=ee(e.jsx(B.StrictMode,{children:e.jsx(Z,{})}));export{oe as WebView};
