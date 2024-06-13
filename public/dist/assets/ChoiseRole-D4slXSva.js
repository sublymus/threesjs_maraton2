var ce=Object.defineProperty;var oe=(r,n,s)=>n in r?ce(r,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[n]=s;var se=(r,n,s)=>(oe(r,typeof n!="symbol"?n+"":n,s),s),de=(r,n,s)=>{if(!n.has(r))throw TypeError("Cannot "+s)};var K=(r,n,s)=>{if(n.has(r))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(r):n.set(r,s)};var H=(r,n,s)=>(de(r,n,"access private method"),s);import{H as q,j as e,c as ue,g as me,l as he}from"./BindToParentScroll-D8J0fSBQ.js";import{c as ne,S as xe,r as f}from"./index-BDPIBgkA.js";import{g as pe}from"./EditorTopBar-BsH4n64X.js";const X=ne(r=>({user:void 0,store:void 0,userStore:void 0,openAuth:!1,async updateUser({name:n,photos:s,id:l}){const t=new FormData;if(n&&t.append("name",n),s!=null&&s[0])t.append("photos_0",s[0]);else return;t.append("id",l),t.append("photos",'["photos_0"]');const a=await(await fetch(`${q}/edit_me`,{method:"POST",body:t})).json();a.id&&(r(()=>({user:{...a,photos:a.photos.map(c=>`${q}${c}`)}})),localStorage.setItem("user",JSON.stringify(a)))},async disconnection(){const n=X.getState().getHeaders();if(!n)return;const s={method:"GET",headers:n.headers};await fetch(`${q}/disconnection`,s),localStorage.removeItem("user"),localStorage.removeItem("store_name"),r(()=>({user:void 0,store:void 0,userStore:void 0,openAuth:!0}))},async getAccess(){window.open(`${q}/google_connexion`,void 0,"popup");const n=setInterval(()=>{const s=localStorage.getItem("user"),l=s&&JSON.parse(s);l&&(console.log("getAccess",{token:l.token}),r(()=>({user:l})),clearInterval(n),X.getState().authenticateUser())},100)},async authenticateUser(){let n=localStorage.getItem("user");const s=localStorage.getItem("store_name")||window.location.pathname.split("/")[1];if(n){const l=JSON.parse(n),t=new Headers;t.append("Authorization",`Bearer ${l.token}`);const i={method:"GET",headers:t},a=await fetch(`${q}/can_manage_store/${s}`,i);let c;const m=()=>{localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))};try{if(c=await a.json(),!c.user)return m()}catch{return m()}const v={...l,...c.user};r(()=>({user:v,userStore:c.userStore,store:c.store,openAuth:!1})),localStorage.setItem("user",JSON.stringify(v))}else localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))},getHeaders(){const n=X.getState().store;if(!n)return;let s=X.getState().user;if(!s)return;const l=new Headers;return l.append("Authorization",`Bearer ${s.token}`),{headers:l,user:s,store:n}}})),ve={"/":{chat:{discussions:{discussions_all:{},discussions_new:{},discussions_blocked:{},discussions_admin:{}},groups:{},sessions:{sessions_new:{},sessions_opened:{},sessions_closed:{}},surveys:{}},interface:{},statistic:{},command:{},roles:{create_role:{},edit_role:{}},clients:{client_profile:{}},moderators:{moderator_profile:{}},collaborators:{collaborator_profile:{},new_collaborator:{}},profile:{},component:null,products:{dash_product:{product_preview:{},product_statistic:{},action:{}},new_product:{preview:{}}},categories:{dash_categories:{preview:{},action:{}},new_category:{preview:{}}},features:{dash_features:{preview:{},action:{}},new_feature:{preview:{}}},catalogs:{dash_catalogs:{preview:{},action:{}},new_catalog:{preview:{}}}}},P=ne(r=>({T:localStorage.getItem("theme"),storeVar:void 0,usersVar:void 0,back_color:"",blur:!1,async fetchStoreVar(){const n=X.getState().getHeaders();if(!n)return;const l=await(await fetch(`${q}/get_store_var?store_id=${n.store.id}`,{headers:n.headers})).json();l&&r(()=>({storeVar:l}))},async fetchUsersVar(){const n=X.getState().getHeaders();if(!n)return;const l=await(await fetch(`${q}/get_users_var?store_id=${n.store.id}`,{headers:n.headers})).json();l&&r(()=>({usersVar:l}))},setT(n){n&&localStorage.setItem("theme",n),r(()=>({T:n}))},currentChild:void 0,openChild(n,s,l,t){if(t!=null&&t.overlay){const i=P.getState().currentChild;i&&(Array.isArray(i)?n=[...i,n]:n=[i,n])}r(()=>({currentChild:n,blur:n?s||P.getState().blur:void 0,back_color:n?l||P.getState().back_color:""}))}})),ge=new xe(ve,["/","products"]).getStore();var W,Q,J,ee;class fe{constructor(n){K(this,W);K(this,J);se(this,"eventsManager",{});this.constraints=n}All(n,s){return this.when("__all__",n,s)}when(n,s,l){let t=s!=null&&s.uid?s.uid+"":s.uid=(l?"#":"")+pe();return n.trim().split(" ").forEach(i=>{if(i=="")return;H(this,W,Q).call(this,i);let a=this.eventsManager[i];a=a||(this.eventsManager[i]={wrapperCollection:{},lastValue:void 0});const c={listener:s,count:0,lastCall:new Date};a.wrapperCollection[t]=c}),this}emit(n,s){n.trim().split(" ").forEach(l=>{l!=""&&(H(this,W,Q).call(this,l),H(this,J,ee).call(this,l,s),H(this,J,ee).call(this,"__all__",s,l))})}remove(n){var t;const s=n.uid||((t=n.listener)==null?void 0:t.uid),l=n.event||n.events||"";if(l=="")throw new Error("Impossible d'identifier un event dans '' ");l.split(" ").forEach(i=>{const a=this.eventsManager[i];if(a==null)return;const c=a.wrapperCollection;c[s]!=null&&delete c[s]})}}W=new WeakSet,Q=function(n){var s,l;if((s=this.constraints)!=null&&s.events){if(((l=this.constraints)==null?void 0:l.events.indexOf(n))==-1)throw new Error(`event : <<${n}>>  is not supported`);return!0}return!0},J=new WeakSet,ee=function(n,s,l){let t=this.eventsManager[n];if(t==null)return;s===void 0&&(s=t.lastValue);const i=t.lastValue!==s,a=t.wrapperCollection;for(const c in a)c.charAt(0)=="#"&&!i||(t.lastValue=s,new Promise(m=>{m(a[c].listener(s,{event:l||n,count:a[c].count,value:s,lastValue:t.lastValue,uid:c})),a[c].lastCall=new Date,a[c].count=a[c].count+1}))};function ae({w:r,list:n,selected:s,setSelectedColumns:l,multiple:t,placeholder:i}){s=t?s:[s[0]];const{openChild:a}=P();return e.jsxs("div",{className:"selector",onClick:c=>{a(e.jsx(je,{w:r,x:c.clientX,y:c.clientY,setSelectedColumns:l,multiple:!0,selected:s,list:n}))},children:[e.jsx("div",{className:"selector-label",children:i}),e.jsx("div",{className:"icon"})]})}function je({w:r,x:n,y:s,list:l,selected:t,multiple:i,setSelectedColumns:a}){const c=f.useRef(null);return f.useEffect(()=>{c.current&&ue(c.current)}),e.jsx("div",{ref:c,className:"selector-list",style:{width:r?`${r}px`:"",top:`${s}px`,left:`${n}px`},children:l.map(m=>e.jsx("div",{className:t.includes(m)?"active":"",onClick:()=>{let v=i?[...t.includes(m)?t.filter(x=>x!==m):[...t,m]]:[m];a(v)},children:m},m))})}function Ne({sortBy:r,onSortChange:n,onInputChange:s,filter:l,onFilterChange:t,onCancel:i,onSearchRequired:a}){const[c,m]=f.useState(r[0]),[v,x]=f.useState(!0),[o,S]=f.useState(""),[C,A]=f.useState(!1),[D]=f.useState({});return f.useEffect(()=>{n==null||n(c+"_"+(v?"desc":"asc"))},[c,v]),e.jsxs("div",{className:"list-search-bar",children:[e.jsxs("div",{className:"search",children:[e.jsx("input",{type:"text",placeholder:"Search by Id, "+(r.includes("label")?"label":"title")+" description",onChange:b=>{S(b.currentTarget.value)},onKeyUp:b=>{b.code=="Enter"&&(s==null||s(o))}}),e.jsx("div",{className:"icon",onClick:()=>{s==null||s(o)}})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"filter-btn",onClick:()=>{A(!C)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Filter"})]}),e.jsxs("div",{className:"sort-btn",children:[e.jsx("div",{className:"icon "+(v?"desc":"asc"),onClick:()=>{x(!v)}}),e.jsx(ae,{placeholder:`sort by ${c}`,list:r,selected:[c],setSelectedColumns:b=>{m(b[0])}})]})]}),C&&e.jsx("div",{className:"filter-page",onClick:b=>{b.currentTarget==b.target&&A(!C)},children:e.jsxs("div",{className:"ctn-filters",children:[e.jsx("div",{className:"ctn2-filters",children:Object.keys(l).map(b=>l[b].getView(b,$=>{D[b]=$,t==null||t(D)}))}),e.jsxs("div",{className:"filter-bottom",children:[e.jsx("div",{className:"search-btn cancel",onClick:b=>{b.currentTarget==b.target&&A(!C),i==null||i()},children:"Cancel"}),e.jsx("div",{className:"search-btn",onClick:b=>{b.currentTarget==b.target&&A(!C),a==null||a(D)},children:"Search"})]})]})})]})}function ye({setPage:r,limit:n,page:s,total:l}){n=Number(n),s=Number(s),l=Number(l);const t=Math.ceil(l/n),i=[];return s>3&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(1)},children:"1"},"a")),s-4>0&&i.push(e.jsx("div",{className:"page",children:"..."},"b")),s-2>0&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(s-2)},children:s-2},"c")),s-1>0&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(s-1)},children:s-1},"d")),i.push(e.jsx("div",{className:"page active",children:s},"e")),s+1<t&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(s+1)},children:s+1},"f")),s+2<t&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(s+2)},children:s+2},"g")),s+4<t&&i.push(e.jsx("div",{className:"page",children:"..."},"h")),s<t&&i.push(e.jsx("div",{className:"page",onClick:()=>{r(t)},children:t},"i")),e.jsxs("div",{className:"list-paging",children:[e.jsx("div",{className:"change",onClick:()=>{s-1>=1&&r(s-1)},children:"Prev"}),i,e.jsx("div",{className:"change",onClick:()=>{s+1<=t&&r(s+1)},children:"Next"})]})}const be=r=>({getView(n,s,l,t){return e.jsx("div",{ref:t,children:s==null?void 0:s.toString()},l.id)},option:r}),we=r=>({getView(n,s,l,t){return e.jsx("div",{ref:t,children:new Date(s).toDateString()},l.id)},option:r}),Se=r=>({getView(n,s,l,t){let i=null;return l.onResize(n,a=>{i&&(i.style.width=`${Math.min(a.height,a.width)*.9}px`,i.style.height=`${Math.min(a.height,a.width)*.9}px`)}),e.jsx("div",{ref:t,children:e.jsx("div",{className:"image-element",ref:a=>i=a,style:{boxShadow:`1px 1px 10px ${r==null?void 0:r.schadow}`,backgroundImage:`url(${s})`}})},l.id)},option:r}),Ce=80,$e=40,ie=25,_e=({canPaginate:r,datas:n,disableFilterBar:s,itemsMapper:l,items_height:t,top_height:i,overflow:a,filter:c,onQuery:m,onItemsSelected:v,multiple:x,canAddNew:o,onNewRequired:S})=>{var _;const[C,A]=f.useState(Object.keys(l)),[D,b]=f.useState([]),[$,V]=f.useState({page:(c==null?void 0:c.page)||1,sortBy:c!=null&&c.sortBy.includes("_")?c==null?void 0:c.sortBy:(c==null?void 0:c.sortBy)+"_desc"||((_=c==null?void 0:c.sortableColumns)==null?void 0:_[0])+"_desc"||"",limit:(c==null?void 0:c.limit)||ie,query:{}}),[h]=f.useState({lastResized:"",interval_id:0,emitter:new fe,x:0,y:0,map:{}}),[I,O]=f.useState(""),u=f.useRef(null),p=t??Ce,g=i??$e,j=(c==null?void 0:c.sortableColumns)??[],y=5,w=a||"displayFlex";let T,R;return f.useEffect(()=>{m==null||m($)},[$]),f.useEffect(()=>{var d;if(!I){clearInterval(h.interval_id),h.emitter.emit("endResize",h.lastResized);return}((d=h.map[I].option)==null?void 0:d.resizable)!==!1&&(h.interval_id=setInterval(()=>{var M;let N=h.map[I].w0+(h.x-h.map[I].x0);h.map[I].w=N;const L=(M=h.map[I].option)==null?void 0:M.size_interval;L&&(N=N>L[1]?L[1]:N,N=N<L[0]?L[0]:N);const E=h.map[I].label;E&&(E.style.width=`${N}px`),h.emitter.emit(I,N+y)},16),h.lastResized=I,h.emitter.emit("startResize",I),console.log("startResize",I))},[I]),f.useEffect(()=>{window.addEventListener("mousemove",N=>{h.x=N.clientX,h.y=N.clientY});const d=()=>{O("")};window.addEventListener("mouseup",d),Object.keys(h.map).map(N=>{var L;h.emitter.emit(N,(((L=h.map[N].label)==null?void 0:L.getBoundingClientRect().width)||100)+y)})},[]),e.jsxs("div",{className:"generic-list",children:[!s&&e.jsxs("div",{className:"list-filter-top",children:[e.jsx(Ne,{filter:(c==null?void 0:c.filter)||{},sortBy:j,onInputChange:d=>{V({...$,query:{...$.query,text:d}})},onFilterChange:d=>{},onSortChange:d=>{V({...$,sortBy:d})},onSearchRequired:()=>{console.log("SearchRequired"),m==null||m($)}}),e.jsx(ae,{placeholder:"column",multiple:!0,list:Object.keys(l),selected:C,setSelectedColumns:d=>{A(d)}}),o&&e.jsx("div",{className:"new-btn",onClick:S,children:"ADD NEW"})]}),e.jsxs("div",{className:"list",children:[e.jsx("div",{className:"top-ctn",style:{height:`${g}px`},children:e.jsx("div",{className:"top "+(w=="displayFlex"?"flex":""),ref:u,style:{height:`${g}px`},children:C.sort((d,N)=>{var L,E;return(((L=h.map[d])==null?void 0:L.index)||0)-(((E=h.map[N])==null?void 0:E.index)||0)}).map((d,N)=>{const L=l[d].option;return h.map[d]||h.emitter.when("startResize",()=>{const E=h.map[d].label;E&&(E.draggable=!1)}).when("endResize",()=>{const E=h.map[d].label;E&&(E.draggable=!0)})&&(h.map[d]={option:{...L,size:100,size_interval:[20,Number.MAX_VALUE]},x0:0,w0:0,w:0,dx:0,label:null,resize:!1,index:N}),e.jsxs("div",{children:[e.jsx("div",{ref:E=>h.map[d].label=E,className:"label",style:{width:`${h.map[d].w||(L==null?void 0:L.size)||100}px`},onDragStartCapture:()=>{R=d,T=d},onDragEnter:E=>{E.currentTarget.style.background="#3455"},onDragLeave:E=>{T=d,E.currentTarget.style.background=E.currentTarget.dataset.background||"inherit"},onDragEnd:()=>{if(!T||!R)return;let E=h.map[R].index-h.map[T].index;E=Math.abs(E)/E*.5,h.map[R].index=h.map[T].index+0,h.map[T].index=h.map[T].index+E,Object.keys(l).sort((B,z)=>{var F,U;return(((F=h.map[B])==null?void 0:F.index)||0)-(((U=h.map[z])==null?void 0:U.index)||0)}).forEach((B,z)=>{h.map[B]&&(h.map[B].index=z)});const M=[...C.sort((B,z)=>{var F,U;return(((F=h.map[B])==null?void 0:F.index)||0)-(((U=h.map[z])==null?void 0:U.index)||0)})];A(M)},children:d},d+"_l"),e.jsx("div",{className:"cursor",style:{minWidth:`${y}px`,maxWidth:`${y}px`,cursor:(L==null?void 0:L.resizable)===!1?"initial":"ew-resize"},onMouseDown:E=>{var M;h.map[d].x0=E.clientX,h.map[d].w0=((M=h.map[d].label)==null?void 0:M.getBoundingClientRect().width)||100,O(d)}},d+"_c")]},d)})})}),e.jsx("div",{className:"items "+(w=="displayFlex"?"flex":""),style:{overflowX:w==="displayFlex"?"hidden":w=="scroll"?"auto":"hidden",height:`calc(100% - ${g}px)`},onScroll:d=>{u.current&&(u.current.style.transform=`translateX(${-d.currentTarget.scrollLeft}px)`)},children:n.map(d=>e.jsx("div",{ref:N=>d.$itemRef=N,className:"item "+(w=="displayFlex"?"flex":""),style:{height:`${p}px`},onClick:()=>{let N=x?[...D.includes(d)?D.filter(L=>L!==d):[...D,d]]:[d];b(N),v==null||v(N,n)},children:C.sort((N,L)=>{var E,M;return(((E=h.map[N])==null?void 0:E.index)||0)-(((M=h.map[L])==null?void 0:M.index)||0)}).map(N=>{let L=null;const E=d[N];h.emitter.when(N,B=>{var z,F,U;L&&(L.style.width=`${B}px`),w!="displayFlex"&&d.$itemRef?d.$itemRef.style.width=`${(z=u.current)==null?void 0:z.getBoundingClientRect().width}px`:d.$itemRef&&(d.$itemRef.style.width=`${((U=(F=u.current)==null?void 0:F.parentElement)==null?void 0:U.getBoundingClientRect().width)||0}px`)});const M=B=>{var z;L=B,B&&(B.classList.add("gl-value",N),B.style.width=`${(((z=h.map[N].label)==null?void 0:z.getBoundingClientRect().width)||0)+y}px`)};return l[N].getView(N,E,{onResize(B,z){h.emitter.when(B,F=>z({width:F,height:p}))},id:`${d.id}_${N}`,onAnyCellSelected(B,z){},onAnyItemSelected(B,z){},onMyCellSelected(B,z){},onMyItemSelected(B,z){}},M)})},d.id))})]}),r&&e.jsx(ye,{page:(c==null?void 0:c.page)||1,limit:(c==null?void 0:c.limit)||ie,total:(c==null?void 0:c.total)||1,setPage:d=>{V({...$,page:d})}})]})},te=_e;te.StringElement=be;te.ImageElement=Se;te.DateStringElement=we;const Oe=(r,n)=>({getView(s,l){return e.jsxs("div",{className:"filter-level",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="level";const i=t.querySelector(".round"),a=t.querySelector(".level"),c=t.querySelector(".front-bar"),m=i.querySelector(".label"),v=20/2,x=$=>{c.style.width=`${$}px`},o=Math.min(...r),S=Math.max(...r),C=300,A=S-o,D=($,V)=>{const h=Math.round($/V*A+o);m.textContent=`${h}`,h&&l(h)};D(0,0),m.textContent="0",x(0),m.textContent=`${S}`,window.addEventListener("mousemove",$=>{var I;let V=$.clientX;const h=a==null?void 0:a.getBoundingClientRect();if((I=i==null?void 0:i.dataset)!=null&&I.x0){const O=h.width||C,u=Number(i.dataset.x0);let g=Number(i.dataset.l0||"0")+(V-u);g=g<-v?-v:g>O-v?O-v:g,i.style.left=`${g}px`;const j=g+v;D(j,O),x(g)}});const b=()=>{i&&(i.dataset.x0="")};window.addEventListener("mouseup",b),window.addEventListener("mouseleave",b)},children:[e.jsx("div",{className:"name",children:s}),e.jsxs("div",{className:"level",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",i=>{t.dataset.x0=i.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),k={},G=(r,n)=>{let s=n.sort((l,t)=>l.dataset.active?t.dataset.active&&l.dataset.item>t.dataset.item?1:-1:t.dataset.active||l.dataset.item>t.dataset.item?1:-1);k[r].collection.innerHTML="",k[r].open||(s=s.slice(0,re)),k[r].collection.append(...s),k[r].count.textContent=k[r].collected.length},re=10,Be=(r,n,s)=>({getView(l,t){return e.jsxs("div",{className:"filter-collector",ref:i=>{i&&(i.dataset.init||(i.dataset.init="filter-collector",k[l]=i,k[l].collected=n,k[l].open=!1,k[l].count=i.querySelector(".count"),k[l].collection=i.querySelector(".collection"),k[l].collectionseeall=i.querySelector(".collection-seeall")))},children:[e.jsxs("div",{className:"top-collection",children:[e.jsx("div",{className:"name",children:l}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{className:"count",children:n.length}),e.jsx("div",{className:"collection-seeall",onClick:()=>{const i=!k[l].open;k[l].open=i;const a=k[l].collection;k[l].open?(k[l].classList.add("all"),a.classList.add("all"),a.scrollTop=0,k[l].style.marginTop="0px",G(l,k[l].collection.items||[]),k[l].collectionseeall.textContent="Close"):(k[l].classList.remove("all"),a.classList.remove("all"),a.scrollTop=0,k[l].style.marginTop="",G(l,k[l].collection.items||[]),k[l].collectionseeall.textContent="See All")},children:"See All"})]})]}),e.jsx("div",{className:"collection",ref:i=>{if(!i||!i||(i.style.display="flex",i.dataset.full))return;i.dataset.full="ok",i.classList.remove("all"),i.scrollTop=0;const a=r.map(c=>{const m=document.createElement("div");return m.className="collection-item",m.dataset.item=c,m.dataset.active="",m.addEventListener("click",()=>{if(k[l].collected.includes(c)){k[l].collected=k[l].collected.filter(x=>x!=c),m.style.background="",m.style.color="",m.dataset.active="",t(k[l].collected),G(l,a);return}s?(k[l].collected.push(c),m.style.background="rgb(0, 0, 150)",m.style.color="#fff",m.dataset.active="yes"):(a.forEach(x=>{x.style.background="",x.style.color="",x.dataset.active=""}),m.style.background="rgb(0, 0, 150)",m.style.color="#fff",m.dataset.active="yes",k[l].collected=[c]),t(k[l].collected),G(l,a)}),m.textContent=c,m});i.items=a,i.append(...a.slice(0,re))}})]})}}),Ve=(r,n)=>({getView(s,l){return e.jsxs("div",{className:"filter-interval",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="interval";const i=t.querySelector(".left-round"),a=t.querySelector(".right-round"),c=t.querySelector(".interval"),m=t.querySelector(".front-bar"),v=a.querySelector(".label"),x=i.querySelector(".label"),o=20,S=(I,O)=>{O&&(m.style.left=`${O+o/2}px`),m.style.width=`${I}px`},C=Math.min(...r),A=Math.max(...r),D=300,b=A-C,$=[0,D],V=(I,O,u)=>{$[I]=O;const p=Math.round($[0]/u*b+C),g=Math.round($[1]/u*b+C);x.textContent=`${p}`,v.textContent=`${g}`,l([p,g])};x.textContent=`${Math.min(...n)}`,v.textContent=`${Math.max(...n)}`,window.addEventListener("mousemove",I=>{var j,y;let O=I.clientX;const u=c==null?void 0:c.getBoundingClientRect(),p=i==null?void 0:i.getBoundingClientRect(),g=a==null?void 0:a.getBoundingClientRect();if((j=i==null?void 0:i.dataset)!=null&&j.x0){const w=u.width||D,T=Number(i.dataset.x0),R=Number(i.dataset.l0||"0"),_=w-Number(a.style.right.replace("px","")||"0")-o;let d=R+(O-T);d=d<-o?-o:d>_-o?_-o:d,i.style.left=`${d}px`;const N=g.x-p.x-o,L=d+o;x.style.zIndex="20",v.style.zIndex="0",S(N+o,d),V(0,L,w)}else if((y=a==null?void 0:a.dataset)!=null&&y.x0){const w=Number(a.dataset.x0),T=Number(a.dataset.r0||"0"),R=u.width||D,_=R-Number(i.style.left.replace("px","")||"0")-o;let d=T-(O-w);d=d<-o?-o:d>_-o?_-o:d,a.style.right=`${d}px`;const N=g.x-p.x-o,L=R-d-o;v.style.zIndex="20",x.style.zIndex="0",S(N+o),V(1,L,R)}});const h=()=>{i&&(i.dataset.x0=""),a&&(a.dataset.x0="")};window.addEventListener("mouseup",h),window.addEventListener("mouseleave",h)},children:[e.jsx("div",{className:"name",children:s}),e.jsxs("div",{className:"interval",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"left-round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",i=>{t.dataset.x0=i.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})}),e.jsx("div",{className:"right-round",style:{right:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="right",t.addEventListener("mousedown",i=>{t.dataset.x0=i.clientX+"",t.dataset.r0=t.style.right.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),ze=r=>({getView(n,s){return e.jsxs("div",{className:"filter-switch",ref:l=>{if(!l||l.dataset.init)return;l.dataset.init="filter-switch",l.dataset.active=r?"":"ok";const t=20,i=l.querySelector(".front-bar"),a=l.querySelector(".switch"),c=l.querySelector(".round"),m=()=>{const v=(a==null?void 0:a.getBoundingClientRect().width)||50,x=!l.dataset.active;l.dataset.active=x?"ok":"",c.style.left=x?`${v-t}px`:"0px",c.style.background=x?"rgb(55, 0, 255)":"rgb(70, 70, 70)",c.style.border=x?"2px solid #3168ff":" 2px solid #222",i.style.width=x?"100%":`${t/2}px`,s(x)};c.style.left="0px",a.addEventListener("mousedown",m),m()},children:[e.jsx("div",{className:"name",children:n}),e.jsxs("div",{className:"switch",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"}})]})]})}}),Me={getView(r,n,s,l){return e.jsx("div",{ref:l,children:e.jsx("div",{className:"use-status active "+(n||"").toLocaleLowerCase(),children:n})},s.id+r)},option:{size:150}},Le=["PAUSE","VISIBLE","TRASH"];function qe({onChange:r,status:n}){const[s,l]=f.useState(n);return e.jsx("div",{className:"choise-status",children:e.jsx("div",{className:"ctn",children:Le.map(t=>e.jsx("div",{className:"use-status "+t.toLocaleLowerCase()+" "+(s==t?"active":""),onClick:()=>{l(t),r==null||r(t)},children:t}))})})}function Fe({placeholder:r,value:n,isCheckRequired:s,label:l,max:t,min:i,check:a,openEditor:c,prompt:m,editable:v,type:x,onChange:o}){const[S,C]=f.useState(n||""),[A,D]=f.useState(0),[b,$]=f.useState(""),[V,h]=f.useState(c||!1),[I,O]=f.useState(0),[u,p]=f.useState(0),g=f.useRef(null),j=f.useRef(null),y=f.useRef(null),w=x||"text",[T]=f.useState({validation:_=>{if($(""),w=="number"){if(i&&Number(_)<i)return $(t?`Value Interval[${i},${t}]`:`Minimum value ${i}`),!1;if(t&&Number(_)>t)return $(i?`Value Interval[${i},${t}]`:`Minimum value ${i}`),!1}else{if(_=_.toString().trim(),i&&String(_).length<i)return $(`Minimum length ${i}`),!1;if(t&&String(_).length>t)return $(`Maximum length ${t}`),!1}return _!==n&&(o==null||o(_)),!0}});f.useEffect(()=>{s&&T.validation(S)},[s]),f.useEffect(()=>{T.validation(n||"")},[n]);const R=()=>{if(g.current){const d=`${-10-g.current.getBoundingClientRect().height}px`;g.current.style.top=d}if(j.current){const d=`${-10-j.current.getBoundingClientRect().height}px`;j.current.style.top=d}};return e.jsxs("div",{className:"input-text input",children:[e.jsx("div",{className:"input-top",children:e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"label",children:[l," "]}),m&&e.jsx("div",{className:"input-info",onMouseEnter:_=>{if(_.target.className!=="input-info")return j.current.style.display="none";clearTimeout(I),j.current&&(j.current.style.display="block"),R()},onMouseLeave:()=>{O(setTimeout(()=>{j.current&&(j.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:_=>{if(j.current=_,j.current){const d=j.current.getBoundingClientRect();if(j.current.dataset.top)return;const N=`${-10-d.height}px`;j.current.dataset.top=N,j.current.style.top=N}},children:m})}),v&&e.jsx("div",{className:"edit",style:{background:`no-repeat center/80% url(${V?"/src/res/x.png":"/src/res/pencil.png"})`},onClick:()=>{const _=!V;console.log("***********"),_&&setTimeout(()=>{var d;(d=y.current)==null||d.focus()}),h(_==!1?!T.validation(S):!0),R()},onMouseEnter:_=>{if(_.target.className!=="edit")return g.current.style.display="none";clearTimeout(u),g.current&&(g.current.style.display="block"),R()},onMouseLeave:()=>{p(setTimeout(()=>{g.current&&(g.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:_=>{g.current=_,R()},children:V?"Close editor":"click here to edit value"})})]})}),!V&&e.jsx("div",{className:"value",children:S}),V&&e.jsxs("div",{className:"input-editor",children:[e.jsx("input",{ref:y,type:w,placeholder:r,value:S,onChange:_=>{let d=_.currentTarget.value;for(;d.includes("  ");)d=d.replace("  "," ");if(w=="number"){const N=Number(d);if(N>(t||Number.MAX_VALUE))return;C(N)}else{if(d.length>(t||Number.MAX_VALUE))return;C(d)}$(""),D(d.length)},onBlur:()=>{a=="auto"&&T.validation(S)&&setTimeout(()=>{console.log("##############"),h(!1)},0)}}),e.jsxs("div",{className:"count",children:[" ",e.jsx("div",{className:"message",children:b}),w=="number"?`[${(i!==void 0?i:"-∞")+" , "+(t!==void 0?t:"+∞")}]`:t!==void 0&&`${A}/${t}`]})]})]})}function Ue({}){return e.jsxs("div",{className:"actions-card",children:[e.jsxs("div",{className:"text",children:[e.jsx("h1",{className:"title",children:"All Colaborator Action"}),e.jsx("h2",{className:"description",children:"See all colaborators actions executed on this product like update and collaborator source "})]}),e.jsx(Ee,{})]})}function Ee(){return e.jsxs("div",{className:"circular-line-chart",children:[e.jsx("div",{className:"back"}),e.jsx("div",{className:"btn",children:" ACTIONS "})]})}let ke=0,Y=null;const Z={};function Pe({images:r=[],optionPosition:n="bottom",onSave:s,name:l,autosave:t,cannotEdit:i}){const[a]=f.useState(r.map(u=>u)),[c,m]=f.useState(!1),[v]=f.useState((Math.random()+ke++).toString()),{openChild:x}=P(),[o,S]=f.useState({}),[C,A]=f.useState(0);f.useEffect(()=>{const u={};for(let p=0;p<a.length;p++){const g=a[p];u[g]={img:g,index:p,name:g}}S(u)},[a]);let D,b;const $=u=>{if(!u||u.length==0)return;const p={};for(let j=u.length-1;j>=0;j--){const y=u[j],w=`${l}_${C+j}`;p[w]={img:URL.createObjectURL(u[j]),index:-(C+j),file:y,isLocal:!0,name:w}}const g={...p,...o};Object.keys(g).sort((j,y)=>{var w,T;return(((w=g[j])==null?void 0:w.index)||0)-(((T=g[y])==null?void 0:T.index)||0)}).forEach((j,y)=>{g[j].index=y}),S(g),console.log(" blob",g),t&&(s==null||s(g)),m(!0),A(C+u.length)},V=u=>{u&&(u.isLocal&&u.file?($([u.file]),Z[u.id](u.name),m(!0),t&&(s==null||s(o))):fetch(`${q}${u.img}`).then(p=>p.blob()).then(p=>{$([p]),Z[u.id](u.name),m(!0),t&&(s==null||s(o))}))},h=u=>{u.currentTarget.style.backgroundColor="",u.preventDefault(),u.stopPropagation()},I=u=>{u.currentTarget.style.backgroundColor="#3454",u.preventDefault(),u.stopPropagation()},O=u=>{let p=0;const g=Object.keys(o).filter(y=>y!==u).sort((y,w)=>{var T,R;return(((T=o[y])==null?void 0:T.index)||0)-(((R=o[w])==null?void 0:R.index)||0)}).map((y,w)=>(o[y].index=w,o[y].name=y.startsWith(l+"_")?l+"_"+p++:y,o[y]));A(p);const j={};for(let y=0;y<g.length;y++){const w=g[y];j[w.name]=w}S(j),console.log("apres",j,p),t&&(s==null||s(j)),m(!0)};return Z[v]=O,console.log({canSave:c}),e.jsx("div",{className:"image-viewer",children:e.jsxs("div",{className:"top-viewer "+n,children:[e.jsxs("div",{className:"image-ctn",onDragOver:u=>{i||I(u)},onDragLeave:u=>{i||h(u)},onDragExit:u=>{i||h(u)},onDrop:u=>{if(i)return;h(u),u.preventDefault(),u.stopPropagation(),console.log("File(s) dropped",u.dataTransfer.files);const p=Y;Y=null,u.dataTransfer.files.length>0?$(u.dataTransfer.files):p&&Date.now()<p.expireAt&&p.id!==v&&V(p)},children:[Object.keys(o).length==0&&e.jsx("label",{htmlFor:v+"add",className:"empty-image image",children:e.jsx("div",{className:"label",children:"Drag and Drop"})}),Object.keys(o).map(u=>e.jsxs("div",{draggable:!0,className:"image",style:{background:`no-repeat center/cover url(${o[u].isLocal?"":o[u].img.startsWith("/")?q:""}${`${o[u].img}`})`},onDragStartCapture:p=>{i||(D=u,b=u,p.currentTarget.dataset.id=v,Y={...o[u],id:v,expireAt:Date.now()+5e3})},onDragEnter:p=>{i||(p.currentTarget.style.opacity="0.5",b=u)},onDragLeave:p=>{i||(p.currentTarget.style.opacity="")},onDragExit:p=>{i||(p.currentTarget.style.opacity="")},onDrop:p=>{i||(p.currentTarget.style.opacity="")},onDragEnd:()=>{if(i||!b||!D)return;let p=o[D].index-o[b].index;p=Math.abs(p)/p*.5,o[D].index=o[b].index+0,o[b].index=o[b].index+p;const g=Object.keys(o).sort((y,w)=>{var T,R;return(((T=o[y])==null?void 0:T.index)||0)-(((R=o[w])==null?void 0:R.index)||0)}).map((y,w)=>(o[y].index=w,o[y].name=y,o[y])),j={};for(let y=0;y<g.length;y++){const w=g[y];j[w.name]=w}S(j),m(!0),t&&(s==null||s(j))},onClick:()=>{x(e.jsx(le,{selectedKey:u,imagesMapper:o}),!0)},children:[!i&&e.jsx("span",{className:"delete-img",onClick:p=>{var j;p.stopPropagation();const g=(j=p.currentTarget.parentElement)==null?void 0:j.querySelector(".confirm-delete-image");g&&(g.style.display="flex")}}),e.jsx("span",{className:"open-img"}),e.jsxs("div",{className:"confirm-delete-image",onClick:p=>{p.stopPropagation()},children:[e.jsx("div",{className:"message",children:"Delete this Image"}),e.jsxs("div",{className:"option",children:[e.jsx("div",{className:"cancel",onClick:p=>{p.currentTarget.parentElement.parentElement.style.display="none"},children:"Cancel"}),e.jsx("div",{className:"delete",onClick:()=>{O(u)},children:"Delete"})]})]})]},u))]}),e.jsxs("div",{className:"option "+n,children:[e.jsx("input",{type:"file",multiple:!0,style:{display:"none"},name:"img",id:v+"add",onChange:u=>{i||u.target.files&&u.target.files[0]&&$(u.target.files)}}),!i&&e.jsxs("label",{htmlFor:v+"add",className:"add",children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"NEW"})]}),Object.keys(o).length>0&&e.jsxs("div",{className:"open",onClick:()=>{x(e.jsx(le,{selectedKey:Object.keys(o)[0],imagesMapper:o}),!0)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"OPEN"})]}),!t&&!i&&e.jsxs("div",{className:"save "+(c?"can-save":""),style:{opacity:c?"1":"0.2"},onClick:()=>{s==null||s(o),m(!1)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"SAVE"})]})]})]})})}function le({imagesMapper:r,selectedKey:n}){const{openChild:s}=P(),[l,t]=f.useState(n),[i]=f.useState({next:(a,c,m)=>{const v=a[c].index+1,x=Object.keys(a).find(o=>a[o].index==v);m(x||c)},prev:(a,c,m)=>{const v=a[c].index-1,x=Object.keys(a).find(o=>a[o].index==v);m(x||c)},selected:l,isInit:!1});return i.selected=l,f.useEffect(()=>{i.isInit||(i.isInit=!0,window.addEventListener("keyup",a=>{console.log(r[l]),a.code=="ArrowRight"?i.next(r,i.selected,t):a.code=="ArrowLeft"&&i.prev(r,i.selected,t)}))},[]),e.jsxs("div",{className:"viewer-images",onClick:a=>{a.stopPropagation(),a.currentTarget==a.target&&s(void 0)},children:[e.jsx("div",{className:"close",onClick:()=>{s(void 0)}}),e.jsxs("div",{className:"image-ctn",style:{background:`no-repeat center/cover url(${r[l].isLocal?"":r[l].img.startsWith("/")?q:""}${`${r[l].img}`})`},onClick:a=>{a.preventDefault()},children:[e.jsx("div",{className:"prev",onClick:()=>{i.prev(r,l,t)}}),e.jsx("div",{className:"next",onClick:()=>{i.next(r,l,t)}})]}),e.jsxs("div",{className:"list-img-ctn",onClick:a=>{a.preventDefault()},children:[e.jsx("div",{className:"prev"}),e.jsx("div",{className:"list-img",children:Object.keys(r).map(a=>e.jsx("div",{className:"min-img "+(l==a?"selected":""),style:{background:`no-repeat center/cover url(${r[a].isLocal?"":r[l].img.startsWith("/")?q:""}${`${r[a].img}`})`},onClick:()=>{t(a)}},a))}),e.jsx("div",{className:"next"})]})]})}function Xe({user:r,channel:n}){const{qs:s}=ge();return e.jsx("div",{className:"open-chat",onClick:()=>{n=="discussions_admin"?s({moderator_id:r.id}).setAbsPath(["chat","discussions","discussions_admin"]):s({[(n=="discussions"?"collaborator":"client")+"_id"]:r.id}).setAbsPath(["chat",n])},children:e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsxs("div",{className:"label",children:["Open ",n=="discussions"?"Chat":n=="sessions"?"Session":"Chat Admin"]})]})})}const Ie=[{label:"clients",value:"23",url:"/src/res/multiple-users-silhouette.png",path:["clients"]},{label:"collaborators",value:"15",url:"/src/res/leadership.png",path:["collaborators"]},{label:"moderators",value:"4",url:"/src/res/services.png",path:["moderators"]},{label:"roles",value:"4",url:"/src/res/settings.png",path:["roles"]}];function He({active:r,setActive:n,collabo:s}){const{usersVar:l}=P();return e.jsx("div",{className:"users-list-accessor",children:Ie.map((t,i)=>{if(!(t.label=="collaborators"&&s==!1))return t.label=="clients"&&s==!1&&(t.label="users",t.path=["users"]),e.jsxs("div",{className:"top-card "+(t.label==r?"active":""),onClick:()=>{n(t)},children:[e.jsx("h2",{className:"label",children:t.label.toUpperCase()}),e.jsx("h2",{className:"value",children:l==null?void 0:l[t.label]}),e.jsx("h2",{className:"icon",style:{backgroundImage:`url(${t.url})`}})]},i)})})}function We({setUser:r,fetchUsers:n,user:s,openChild:l,selector:t}){const[i,a]=f.useState(),[c,m]=f.useState({fetchUsers:n});f.useEffect(()=>{c.fetchUsers({}).then(o=>{if(o!=null&&o.list)return a(o)})},[c]);const v=i==null?void 0:i.list.filter(o=>o.id!=(s==null?void 0:s.id)),x=f.useRef(null);return e.jsx("div",{className:"search-user",children:e.jsxs("div",{className:"search-ctn",onContextMenu:o=>{o.stopPropagation(),o.preventDefault()},onClick:o=>{o.stopPropagation(),o.preventDefault()},children:[e.jsx("div",{className:"close",onClick:()=>{l(void 0)}}),e.jsxs("div",{className:"top",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{autoFocus:!0,type:"text",placeholder:"Search By #id , email, name",onChange:o=>{c.fetchUsers({limit:10,query:{text:o.currentTarget.value}}).then(S=>{if(S!=null&&S.list)return a(S)})}}),t&&e.jsx("select",{ref:x,name:"search-select",id:"search-select",onChange:o=>{var C,A;(C=t.setSelected)==null||C.call(t,o.currentTarget.value);const S=(A=t.list.find(D=>D.name==o.currentTarget.value))==null?void 0:A.fetch;S&&m({fetchUsers:S})},children:t.list.map(o=>e.jsx("option",{value:o.name,children:o.name},o.name))})]}),e.jsx("div",{className:"list",children:v==null?void 0:v.map((o,S)=>e.jsxs("div",{className:"collabo",onClick:()=>{var C;l(void 0),r(o,(C=x.current)==null?void 0:C.value)},children:[e.jsx("div",{className:"photo",style:{background:me(o.photos[0])}}),e.jsxs("div",{className:"name-ctn",children:[e.jsx("div",{className:"name",children:he(o.name,20)}),e.jsx("div",{className:"email",children:o.email})]}),e.jsxs("div",{className:"id",children:["#",o.id.split("-")[0]]})]},o.id+S))}),v&&v.length>7&&e.jsx("div",{className:"see-all",onClick:()=>{l(void 0)},children:"SEE ALL"})]})})}function Je({onChange:r,isNew:n,json_roles:s,role:l}){const t=Object.keys(s||{}),i=n||!l?[]:t.filter(x=>!!l[x]),[a,c]=f.useState(i),[m,v]=f.useState("");return e.jsxs("div",{className:"choise-options",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{v(m?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Options"}),e.jsxs("div",{className:"name",children:[(a==null?void 0:a.length)||0," Selected"]})]}),e.jsx("div",{className:"choise-icon",style:{transform:m?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-options "+m,style:{height:m?`${45*((t==null?void 0:t.length)||0)}px`:"0px"},children:t==null?void 0:t.map((x,o)=>e.jsx("div",{className:"item "+(a!=null&&a.find(S=>S==x)?"selected":""),onClick:()=>{const S=a!=null&&a.find(C=>C==x)?a.filter(C=>C!==x):[...a||[],x];c(S),r==null||r(S)},children:e.jsx("div",{className:"label",children:x})},x+o))})]})}function Ge({onChange:r,role_id:n,roles:s,canChange:l}){var v;const[t,i]=f.useState(n),[a,c]=f.useState(""),m=l();return e.jsxs("div",{className:"choise-roles",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{m&&c(a?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Roles"}),e.jsxs("div",{className:"name",children:[(v=s.find(x=>x.id==n))==null?void 0:v.name," Selected"]})]}),m&&e.jsx("div",{className:"choise-icon",style:{transform:a?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-roles "+a,style:{height:a?`${45*(s.length||0)}px`:"0px"},children:s.map(x=>e.jsxs("div",{className:"item "+(t==x.id?"selected":""),onClick:()=>{r==null||r(x.id),i(x.id)},children:[e.jsx("div",{className:"label",children:x.name}),e.jsxs("div",{className:"id",children:["#",x.id.split("-")[0]]})]},x.id))})]})}export{Ue as A,qe as C,Ve as F,te as G,Fe as I,Xe as O,Me as S,He as U,X as a,P as b,Be as c,Oe as d,ze as e,Pe as f,We as g,Je as h,Ge as i,ge as u};
