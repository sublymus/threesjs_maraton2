var ae=Object.defineProperty;var ne=(r,n,i)=>n in r?ae(r,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):r[n]=i;var Q=(r,n,i)=>(ne(r,typeof n!="symbol"?n+"":n,i),i),ce=(r,n,i)=>{if(!n.has(r))throw TypeError("Cannot "+i)};var H=(r,n,i)=>{if(n.has(r))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(r):n.set(r,i)};var U=(r,n,i)=>(ce(r,n,"access private method"),i);import{c as re,S as oe,j as e,f as de,g as ue,l as me}from"./BindToParentScroll-5zV6hgEO.js";import{H as M,r as N}from"./index-6ew6H68Z.js";import{u as ee,g as xe,L as he}from"./ListPaging-CwZCbqqV.js";const pe={"/":{chat:{discussions:{discussions_all:{},discussions_new:{},discussions_blocked:{},discussions_admin:{}},groups:{},sessions:{sessions_new:{},sessions_opened:{},sessions_closed:{}},surveys:{}},interface:{},statistic:{},command:{},roles:{create_role:{},edit_role:{}},clients:{client_profile:{}},moderators:{moderator_profile:{}},collaborators:{collaborator_profile:{},new_collaborator:{}},profile:{},component:null,products:{dash_product:{product_preview:{},product_statistic:{},action:{}},new_product:{preview:{}}},categories:{dash_categories:{preview:{},action:{}},new_category:{preview:{}}},features:{dash_features:{preview:{},action:{}},new_feature:{preview:{}}},catalogs:{dash_catalogs:{preview:{},action:{}},new_catalog:{preview:{}}}}},P=re(r=>({T:localStorage.getItem("theme"),storeVar:void 0,usersVar:void 0,back_color:"",blur:!1,async fetchStoreVar(){const n=ee.getState().getHeaders();if(!n)return;const a=await(await fetch(`${M}/get_store_var?store_id=${n.store.id}`,{headers:n.headers})).json();a&&r(()=>({storeVar:a}))},async fetchUsersVar(){const n=ee.getState().getHeaders();if(!n)return;const a=await(await fetch(`${M}/get_users_var?store_id=${n.store.id}`,{headers:n.headers})).json();a&&r(()=>({usersVar:a}))},setT(n){localStorage.setItem("theme",n||""),r(()=>({T:n}))},currentChild:void 0,openChild(n,i,a,t){if(t!=null&&t.overlay){const l=P.getState().currentChild;l&&(Array.isArray(l)?n=[...l,n]:n=[l,n])}r(()=>({currentChild:n,blur:n?i||P.getState().blur:void 0,back_color:n?a||P.getState().back_color:""}))}})),ve=new oe(pe,["/","products"]).getStore();var F,K,X,Y;class ge{constructor(n){H(this,F);H(this,X);Q(this,"eventsManager",{});this.constraints=n}All(n,i){return this.when("__all__",n,i)}when(n,i,a){let t=i!=null&&i.uid?i.uid+"":i.uid=(a?"#":"")+xe();return n.trim().split(" ").forEach(l=>{if(l=="")return;U(this,F,K).call(this,l);let s=this.eventsManager[l];s=s||(this.eventsManager[l]={wrapperCollection:{},lastValue:void 0});const u={listener:i,count:0,lastCall:new Date};s.wrapperCollection[t]=u}),this}emit(n,i){n.trim().split(" ").forEach(a=>{a!=""&&(U(this,F,K).call(this,a),U(this,X,Y).call(this,a,i),U(this,X,Y).call(this,"__all__",i,a))})}remove(n){var t;const i=n.uid||((t=n.listener)==null?void 0:t.uid),a=n.event||n.events||"";if(a=="")throw new Error("Impossible d'identifier un event dans '' ");a.split(" ").forEach(l=>{const s=this.eventsManager[l];if(s==null)return;const u=s.wrapperCollection;u[i]!=null&&delete u[i]})}}F=new WeakSet,K=function(n){var i,a;if((i=this.constraints)!=null&&i.events){if(((a=this.constraints)==null?void 0:a.events.indexOf(n))==-1)throw new Error(`event : <<${n}>>  is not supported`);return!0}return!0},X=new WeakSet,Y=function(n,i,a){let t=this.eventsManager[n];if(t==null)return;i===void 0&&(i=t.lastValue);const l=t.lastValue!==i,s=t.wrapperCollection;for(const u in s)u.charAt(0)=="#"&&!l||(t.lastValue=i,new Promise(m=>{m(s[u].listener(i,{event:a||n,count:s[u].count,value:i,lastValue:t.lastValue,uid:u})),s[u].lastCall=new Date,s[u].count=s[u].count+1}))};function le({w:r,list:n,selected:i,setSelectedColumns:a,multiple:t,placeholder:l}){i=t?i:[i[0]];const{openChild:s}=P();return e.jsxs("div",{className:"selector",onClick:u=>{s(e.jsx(fe,{w:r,x:u.clientX,y:u.clientY,setSelectedColumns:a,multiple:!0,selected:i,list:n}))},children:[e.jsx("div",{className:"selector-label",children:l}),e.jsx("div",{className:"icon"})]})}function fe({w:r,x:n,y:i,list:a,selected:t,multiple:l,setSelectedColumns:s}){const u=N.useRef(null);return N.useEffect(()=>{u.current&&de(u.current)}),e.jsx("div",{ref:u,className:"selector-list",style:{width:r?`${r}px`:"",top:`${i}px`,left:`${n}px`},children:a.map(m=>e.jsx("div",{className:t.includes(m)?"active":"",onClick:()=>{let j=l?[...t.includes(m)?t.filter(g=>g!==m):[...t,m]]:[m];s(j)},children:m},m))})}function je({sortBy:r,onSortChange:n,onInputChange:i,filter:a,onFilterChange:t,onCancel:l,onSearchRequired:s}){const[u,m]=N.useState(r[0]),[j,g]=N.useState(!0),[c,_]=N.useState(""),[$,I]=N.useState(!1),[R]=N.useState({});return N.useEffect(()=>{n==null||n(u+"_"+(j?"desc":"asc"))},[u,j]),e.jsxs("div",{className:"list-search-bar",children:[e.jsxs("div",{className:"search",children:[e.jsx("input",{type:"text",placeholder:"Search by Id, "+(r.includes("label")?"label":"title")+" description",onChange:b=>{_(b.currentTarget.value)},onKeyUp:b=>{b.code=="Enter"&&(i==null||i(c))}}),e.jsx("div",{className:"icon",onClick:()=>{i==null||i(c)}})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"filter-btn",onClick:()=>{},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Filter"})]}),e.jsxs("div",{className:"sort-btn",children:[e.jsx("div",{className:"icon "+(j?"desc":"asc"),onClick:()=>{g(!j)}}),e.jsx(le,{multiple:!1,placeholder:`sort by ${u}`,list:r,selected:[u],setSelectedColumns:b=>{console.log(b),m(b.reverse()[0]||"id")}})]})]}),$&&e.jsx("div",{className:"filter-page",onClick:b=>{b.currentTarget==b.target&&I(!$)},children:e.jsxs("div",{className:"ctn-filters",children:[e.jsx("div",{className:"ctn2-filters",children:Object.keys(a).map(b=>a[b].getView(b,E=>{R[b]=E,t==null||t(R)}))}),e.jsxs("div",{className:"filter-bottom",children:[e.jsx("div",{className:"search-btn cancel",onClick:b=>{b.currentTarget==b.target&&I(!$),l==null||l()},children:"Cancel"}),e.jsx("div",{className:"search-btn",onClick:b=>{b.currentTarget==b.target&&I(!$),s==null||s(R)},children:"Search"})]})]})})]})}const Ne=r=>({getView(n,i,a,t){return e.jsx("div",{ref:t,children:i==null?void 0:i.toString()},a.id)},option:r}),ye=r=>({getView(n,i,a,t){return e.jsx("div",{ref:t,children:new Date(i).toDateString()},a.id)},option:r}),be=r=>({getView(n,i,a,t){let l=null;return a.onResize(n,s=>{l&&(l.style.width=`${Math.min(s.height,s.width)*.9}px`,l.style.height=`${Math.min(s.height,s.width)*.9}px`)}),e.jsx("div",{ref:t,children:e.jsx("div",{className:"image-element",ref:s=>l=s,style:{boxShadow:`1px 1px 10px ${r==null?void 0:r.schadow}`,backgroundImage:`url(${i})`}})},a.id)},option:r}),we=80,Ce=40,te=25,Se=({canPaginate:r,datas:n,disableFilterBar:i,itemsMapper:a,items_height:t,top_height:l,filter:s,onQuery:u,onItemsSelected:m,multiple:j,canAddNew:g,onNewRequired:c})=>{var T;const[_,$]=N.useState(Object.keys(a)),[I,R]=N.useState([]),[b,E]=N.useState({page:(s==null?void 0:s.page)||1,sortBy:s!=null&&s.sortBy.includes("_")?s==null?void 0:s.sortBy:(s==null?void 0:s.sortBy)+"_desc"||((T=s==null?void 0:s.sortableColumns)==null?void 0:T[0])+"_desc"||"",limit:(s==null?void 0:s.limit)||te,query:{}}),[h]=N.useState({lastResized:"",interval_id:0,emitter:new ge,x:0,y:0,map:{}}),[D,B]=N.useState(""),k=N.useRef(null),o=t??we,v=l??Ce,y=(s==null?void 0:s.sortableColumns)??[],w=5;let f,S;return N.useEffect(()=>{u==null||u(b)},[b]),N.useEffect(()=>{var d;if(!D){clearInterval(h.interval_id),h.emitter.emit("endResize",h.lastResized);return}((d=h.map[D].option)==null?void 0:d.resizable)!==!1&&(h.interval_id=setInterval(()=>{var V;let x=h.map[D].w0+(h.x-h.map[D].x0);h.map[D].w=x;const p=(V=h.map[D].option)==null?void 0:V.size_interval;p&&(x=x>p[1]?p[1]:x,x=x<p[0]?p[0]:x);const C=h.map[D].label;C&&(C.style.width=`${x}px`),h.emitter.emit(D,x+w)},16),h.lastResized=D,h.emitter.emit("startResize",D),console.log("startResize",D))},[D]),N.useEffect(()=>{window.addEventListener("mousemove",x=>{h.x=x.clientX,h.y=x.clientY});const d=()=>{B("")};window.addEventListener("mouseup",d),Object.keys(h.map).map(x=>{var p;h.emitter.emit(x,(((p=h.map[x].label)==null?void 0:p.getBoundingClientRect().width)||100)+w)})},[]),e.jsxs("div",{className:"generic-list",children:[!i&&e.jsxs("div",{className:"list-filter-top",children:[e.jsx(je,{filter:(s==null?void 0:s.filter)||{},sortBy:y,onInputChange:d=>{E({...b,query:{...b.query,text:d}})},onFilterChange:d=>{},onSortChange:d=>{E({...b,sortBy:d})},onSearchRequired:()=>{console.log("SearchRequired"),u==null||u(b)}}),e.jsx(le,{placeholder:"column",multiple:!0,list:Object.keys(a),selected:_,setSelectedColumns:d=>{$(d)}}),g&&e.jsx("div",{className:"new-btn",onClick:c,children:"ADD NEW"})]}),e.jsxs("div",{className:"list",children:[e.jsx("div",{className:"top-ctn",style:{height:`${v}px`},children:e.jsx("div",{className:"top ",ref:k,style:{height:`${v}px`},children:_.sort((d,x)=>{var p,C;return(((p=h.map[d])==null?void 0:p.index)||0)-(((C=h.map[x])==null?void 0:C.index)||0)}).map((d,x)=>{const p=a[d].option;return h.map[d]||h.emitter.when("startResize",()=>{const C=h.map[d].label;C&&(C.draggable=!1)}).when("endResize",()=>{const C=h.map[d].label;C&&(C.draggable=!0)})&&(h.map[d]={option:{...p,size:100,size_interval:[20,Number.MAX_VALUE]},x0:0,w0:0,w:0,dx:0,label:null,resize:!1,index:x}),e.jsxs("div",{children:[e.jsx("div",{ref:C=>h.map[d].label=C,className:"label",style:{width:`${h.map[d].w||(p==null?void 0:p.size)||100}px`},onDragStartCapture:()=>{S=d,f=d},onDragEnter:C=>{C.currentTarget.style.background="#3455"},onDragLeave:C=>{f=d,C.currentTarget.style.background=C.currentTarget.dataset.background||"inherit"},onDragEnd:()=>{if(!f||!S)return;let C=h.map[S].index-h.map[f].index;C=Math.abs(C)/C*.5,h.map[S].index=h.map[f].index+0,h.map[f].index=h.map[f].index+C,Object.keys(a).sort((A,O)=>{var z,q;return(((z=h.map[A])==null?void 0:z.index)||0)-(((q=h.map[O])==null?void 0:q.index)||0)}).forEach((A,O)=>{h.map[A]&&(h.map[A].index=O)});const V=[..._.sort((A,O)=>{var z,q;return(((z=h.map[A])==null?void 0:z.index)||0)-(((q=h.map[O])==null?void 0:q.index)||0)})];$(V)},children:d},d+"_l"),e.jsx("div",{className:"cursor",style:{minWidth:`${w}px`,maxWidth:`${w}px`,cursor:(p==null?void 0:p.resizable)===!1?"initial":"ew-resize"},onMouseDown:C=>{var V;h.map[d].x0=C.clientX,h.map[d].w0=((V=h.map[d].label)==null?void 0:V.getBoundingClientRect().width)||100,B(d)}},d+"_c")]},d)})})}),e.jsx("div",{className:"items ",style:{overflowX:"scroll",height:`calc(100% - ${v}px)`},onScroll:d=>{k.current&&(k.current.style.transform=`translateX(${-d.currentTarget.scrollLeft}px)`)},children:n.map(d=>e.jsx("div",{ref:x=>d.$itemRef=x,className:"item ",style:{height:`${o}px`},onClick:()=>{let x=j?[...I.includes(d)?I.filter(p=>p!==d):[...I,d]]:[d];R(x),m==null||m(x,n)},children:_.sort((x,p)=>{var C,V;return(((C=h.map[x])==null?void 0:C.index)||0)-(((V=h.map[p])==null?void 0:V.index)||0)}).map(x=>{let p=null;const C=d[x];h.emitter.when(x,A=>{var O,z;p?p.style.width=`${A}px`:d.$itemRef&&(d.$itemRef.style.width=`${((z=(O=k.current)==null?void 0:O.parentElement)==null?void 0:z.getBoundingClientRect().width)||0}px`)});const V=A=>{var O;p=A,A&&(A.classList.add("gl-value",x),A.style.width=`${(((O=h.map[x].label)==null?void 0:O.getBoundingClientRect().width)||0)+w}px`)};return a[x].getView(x,C,{onResize(A,O){h.emitter.when(A,z=>O({width:z,height:o}))},id:`${d.id}_${x}`,onAnyCellSelected(A,O){},onAnyItemSelected(A,O){},onMyCellSelected(A,O){},onMyItemSelected(A,O){}},V)})},d.id))})]}),r&&e.jsx(he,{page:(s==null?void 0:s.page)||1,limit:(s==null?void 0:s.limit)||te,total:(s==null?void 0:s.total)||1,setPage:d=>{E({...b,page:d})}})]})},Z=Se;Z.StringElement=Ne;Z.ImageElement=be;Z.DateStringElement=ye;const Ie=(r,n)=>({getView(i,a){return e.jsxs("div",{className:"filter-level",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="level";const l=t.querySelector(".round"),s=t.querySelector(".level"),u=t.querySelector(".front-bar"),m=l.querySelector(".label"),j=20/2,g=E=>{u.style.width=`${E}px`},c=Math.min(...r),_=Math.max(...r),$=300,I=_-c,R=(E,h)=>{const D=Math.round(E/h*I+c);m.textContent=`${D}`,D&&a(D)};R(0,0),m.textContent="0",g(0),m.textContent=`${_}`,window.addEventListener("mousemove",E=>{var B;let h=E.clientX;const D=s==null?void 0:s.getBoundingClientRect();if((B=l==null?void 0:l.dataset)!=null&&B.x0){const k=D.width||$,o=Number(l.dataset.x0);let y=Number(l.dataset.l0||"0")+(h-o);y=y<-j?-j:y>k-j?k-j:y,l.style.left=`${y}px`;const w=y+j;R(w,k),g(y)}});const b=()=>{l&&(l.dataset.x0="")};window.addEventListener("mouseup",b),window.addEventListener("mouseleave",b)},children:[e.jsx("div",{className:"name",children:i}),e.jsxs("div",{className:"level",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",l=>{t.dataset.x0=l.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),L={},W=(r,n)=>{let i=n.sort((a,t)=>a.dataset.active?t.dataset.active&&a.dataset.item>t.dataset.item?1:-1:t.dataset.active||a.dataset.item>t.dataset.item?1:-1);L[r].collection.innerHTML="",L[r].open||(i=i.slice(0,ie)),L[r].collection.append(...i),L[r].count.textContent=L[r].collected.length},ie=10,Ae=(r,n,i)=>({getView(a,t){return e.jsxs("div",{className:"filter-collector",ref:l=>{l&&(l.dataset.init||(l.dataset.init="filter-collector",L[a]=l,L[a].collected=n,L[a].open=!1,L[a].count=l.querySelector(".count"),L[a].collection=l.querySelector(".collection"),L[a].collectionseeall=l.querySelector(".collection-seeall")))},children:[e.jsxs("div",{className:"top-collection",children:[e.jsx("div",{className:"name",children:a}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{className:"count",children:n.length}),e.jsx("div",{className:"collection-seeall",onClick:()=>{const l=!L[a].open;L[a].open=l;const s=L[a].collection;L[a].open?(L[a].classList.add("all"),s.classList.add("all"),s.scrollTop=0,L[a].style.marginTop="0px",W(a,L[a].collection.items||[]),L[a].collectionseeall.textContent="Close"):(L[a].classList.remove("all"),s.classList.remove("all"),s.scrollTop=0,L[a].style.marginTop="",W(a,L[a].collection.items||[]),L[a].collectionseeall.textContent="See All")},children:"See All"})]})]}),e.jsx("div",{className:"collection",ref:l=>{if(!l||!l||(l.style.display="flex",l.dataset.full))return;l.dataset.full="ok",l.classList.remove("all"),l.scrollTop=0;const s=r.map(u=>{const m=document.createElement("div");return m.className="collection-item",m.dataset.item=u,m.dataset.active="",m.addEventListener("click",()=>{if(L[a].collected.includes(u)){L[a].collected=L[a].collected.filter(g=>g!=u),m.style.background="",m.style.color="",m.dataset.active="",t(L[a].collected),W(a,s);return}i?(L[a].collected.push(u),m.style.background="rgb(0, 0, 150)",m.style.color="#fff",m.dataset.active="yes"):(s.forEach(g=>{g.style.background="",g.style.color="",g.dataset.active=""}),m.style.background="rgb(0, 0, 150)",m.style.color="#fff",m.dataset.active="yes",L[a].collected=[u]),t(L[a].collected),W(a,s)}),m.textContent=u,m});l.items=s,l.append(...s.slice(0,ie))}})]})}}),Oe=(r,n)=>({getView(i,a){return e.jsxs("div",{className:"filter-interval",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="interval";const l=t.querySelector(".left-round"),s=t.querySelector(".right-round"),u=t.querySelector(".interval"),m=t.querySelector(".front-bar"),j=s.querySelector(".label"),g=l.querySelector(".label"),c=20,_=(B,k)=>{k&&(m.style.left=`${k+c/2}px`),m.style.width=`${B}px`},$=Math.min(...r),I=Math.max(...r),R=300,b=I-$,E=[0,R],h=(B,k,o)=>{E[B]=k;const v=Math.round(E[0]/o*b+$),y=Math.round(E[1]/o*b+$);g.textContent=`${v}`,j.textContent=`${y}`,a([v,y])};g.textContent=`${Math.min(...n)}`,j.textContent=`${Math.max(...n)}`,window.addEventListener("mousemove",B=>{var w,f;let k=B.clientX;const o=u==null?void 0:u.getBoundingClientRect(),v=l==null?void 0:l.getBoundingClientRect(),y=s==null?void 0:s.getBoundingClientRect();if((w=l==null?void 0:l.dataset)!=null&&w.x0){const S=o.width||R,T=Number(l.dataset.x0),d=Number(l.dataset.l0||"0"),x=S-Number(s.style.right.replace("px","")||"0")-c;let p=d+(k-T);p=p<-c?-c:p>x-c?x-c:p,l.style.left=`${p}px`;const C=y.x-v.x-c,V=p+c;g.style.zIndex="20",j.style.zIndex="0",_(C+c,p),h(0,V,S)}else if((f=s==null?void 0:s.dataset)!=null&&f.x0){const S=Number(s.dataset.x0),T=Number(s.dataset.r0||"0"),d=o.width||R,x=d-Number(l.style.left.replace("px","")||"0")-c;let p=T-(k-S);p=p<-c?-c:p>x-c?x-c:p,s.style.right=`${p}px`;const C=y.x-v.x-c,V=d-p-c;j.style.zIndex="20",g.style.zIndex="0",_(C+c),h(1,V,d)}});const D=()=>{l&&(l.dataset.x0=""),s&&(s.dataset.x0="")};window.addEventListener("mouseup",D),window.addEventListener("mouseleave",D)},children:[e.jsx("div",{className:"name",children:i}),e.jsxs("div",{className:"interval",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"left-round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",l=>{t.dataset.x0=l.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})}),e.jsx("div",{className:"right-round",style:{right:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="right",t.addEventListener("mousedown",l=>{t.dataset.x0=l.clientX+"",t.dataset.r0=t.style.right.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),Ve=(r,n)=>({getView(i,a){return e.jsxs("div",{className:"filter-switch",style:{all:n?"unset":"initial"},ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="filter-switch",t.dataset.active=r?"":"ok";const l=20,s=t.querySelector(".front-bar"),u=t.querySelector(".switch"),m=t.querySelector(".round"),j=()=>{const g=(u==null?void 0:u.getBoundingClientRect().width)||50,c=!t.dataset.active;t.dataset.active=c?"ok":"",m.style.left=c?`${g-l}px`:"0px",m.style.background=c?"rgb(55, 0, 255)":"rgb(70, 70, 70)",m.style.border=c?"2px solid #3168ff":" 2px solid #222",s.style.width=c?"100%":`${l/2}px`,a(c)};m.style.left="0px",u.addEventListener("mousedown",j),j()},children:[e.jsx("div",{className:"name",children:i}),e.jsxs("div",{className:"switch",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"}})]})]})}}),Be={getView(r,n,i,a){return e.jsx("div",{ref:a,children:e.jsx("div",{className:"use-status active "+(n||"").toLocaleLowerCase(),children:n})},i.id+r)},option:{size:150}},_e=["PAUSE","VISIBLE","TRASH"];function ze({onChange:r,status:n}){const[i,a]=N.useState(n);return e.jsx("div",{className:"choise-status",children:e.jsx("div",{className:"ctn",children:_e.map(t=>e.jsx("div",{className:"use-status "+t.toLocaleLowerCase()+" "+(i==t?"active":""),onClick:()=>{a(t),r==null||r(t)},children:t}))})})}function Pe({placeholder:r,value:n,isCheckRequired:i,label:a,max:t,min:l,check:s,openEditor:u,prompt:m,editable:j,type:g,onChange:c}){const[_,$]=N.useState(n||""),[I,R]=N.useState(0),[b,E]=N.useState(""),[h,D]=N.useState(u||!1),[B,k]=N.useState(0),[o,v]=N.useState(0),y=N.useRef(null),w=N.useRef(null),f=N.useRef(null),S=g||"text",[T]=N.useState({validation:x=>{if(E(""),S=="number"){if(l&&Number(x)<l)return E(t?`Value Interval[${l},${t}]`:`Minimum value ${l}`),!1;if(t&&Number(x)>t)return E(l?`Value Interval[${l},${t}]`:`Minimum value ${l}`),!1}else{if(x=x.toString().trim(),l&&String(x).length<l)return E(`Minimum length ${l}`),!1;if(t&&String(x).length>t)return E(`Maximum length ${t}`),!1}return x!==n&&(c==null||c(x)),!0}});N.useEffect(()=>{i&&T.validation(_)},[i]),N.useEffect(()=>{T.validation(n||"")},[n]);const d=()=>{if(y.current){const p=`${-10-y.current.getBoundingClientRect().height}px`;y.current.style.top=p}if(w.current){const p=`${-10-w.current.getBoundingClientRect().height}px`;w.current.style.top=p}};return e.jsxs("div",{className:"input-text input",children:[e.jsx("div",{className:"input-top",children:e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"label",children:[a," "]}),m&&e.jsx("div",{className:"input-info",onMouseEnter:x=>{if(x.target.className!=="input-info")return w.current.style.display="none";clearTimeout(B),w.current&&(w.current.style.display="block"),d()},onMouseLeave:()=>{k(setTimeout(()=>{w.current&&(w.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:x=>{if(w.current=x,w.current){const p=w.current.getBoundingClientRect();if(w.current.dataset.top)return;const C=`${-10-p.height}px`;w.current.dataset.top=C,w.current.style.top=C}},children:m})}),j&&e.jsx("div",{className:"edit",style:{background:`no-repeat center/80% url(${h?"/src/res/x.png":"/src/res/pencil.png"})`},onClick:()=>{const x=!h;console.log("***********"),x&&setTimeout(()=>{var p;(p=f.current)==null||p.focus()}),D(x==!1?!T.validation(_):!0),d()},onMouseEnter:x=>{if(x.target.className!=="edit")return y.current.style.display="none";clearTimeout(o),y.current&&(y.current.style.display="block"),d()},onMouseLeave:()=>{v(setTimeout(()=>{y.current&&(y.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:x=>{y.current=x,d()},children:h?"Close editor":"click here to edit value"})})]})}),!h&&e.jsx("div",{className:"value",children:_}),h&&e.jsxs("div",{className:"input-editor",children:[e.jsx("input",{ref:f,type:S,placeholder:r,value:_,onChange:x=>{let p=x.currentTarget.value;for(;p.includes("  ");)p=p.replace("  "," ");if(S=="number"){const C=Number(p);if(C>(t||Number.MAX_VALUE))return;$(C)}else{if(p.length>(t||Number.MAX_VALUE))return;$(p)}E(""),R(p.length)},onBlur:()=>{s=="auto"&&T.validation(_)&&setTimeout(()=>{console.log("##############"),D(!1)},0)}}),e.jsxs("div",{className:"count",children:[" ",e.jsx("div",{className:"message",children:b}),S=="number"?`[${(l!==void 0?l:"-∞")+" , "+(t!==void 0?t:"+∞")}]`:t!==void 0&&`${I}/${t}`]})]})]})}function Me({}){return e.jsxs("div",{className:"actions-card",children:[e.jsxs("div",{className:"text",children:[e.jsx("h1",{className:"title",children:"All Colaborator Action"}),e.jsx("h2",{className:"description",children:"See all colaborators actions executed on this product like update and collaborator source "})]}),e.jsx($e,{})]})}function $e(){return e.jsxs("div",{className:"circular-line-chart",children:[e.jsx("div",{className:"back"}),e.jsx("div",{className:"btn",children:" ACTIONS "})]})}let Le=0,G=null;const J={};function qe({images:r=[],optionPosition:n="bottom",onSave:i,name:a,autosave:t,cannotEdit:l}){const[s]=N.useState(r.map(o=>o)),[u,m]=N.useState(!1),[j]=N.useState((Math.random()+Le++).toString()),{openChild:g}=P(),[c,_]=N.useState({}),[$,I]=N.useState(0);N.useEffect(()=>{const o={};for(let v=0;v<s.length;v++){const y=s[v];o[y]={img:y,index:v,name:y}}_(o)},[s]);let R,b;const E=o=>{var w;if(!o||o.length==0)return;const v={};for(let f=o.length-1;f>=0;f--){const S=o[f];if(!S.type.startsWith("image/")){if(S.type)continue;{const d=(w=S.name)==null?void 0:w.substring(S.name.lastIndexOf("."),S.name.length).replace(".","");if(!["jpg","jpeg","jfif","pjpeg","pjp","avif","apng","gif","jpg","png","jpeg","webp"].includes(d))continue}}const T=`${a}_${$+f}`;v[T]={img:URL.createObjectURL(o[f]),index:-($+f),file:S,isLocal:!0,name:T}}const y={...v,...c};Object.keys(y).sort((f,S)=>{var T,d;return(((T=y[f])==null?void 0:T.index)||0)-(((d=y[S])==null?void 0:d.index)||0)}).forEach((f,S)=>{y[f].index=S}),_(y),t&&(i==null||i(y)),m(!0),I($+o.length)},h=o=>{o&&(o.isLocal&&o.file?(console.log("from input"),E([o.file]),J[o.id](o.name),m(!0),t&&(i==null||i(c))):fetch(`${o.img.startsWith("/")?M:""}${o.img}`).then(v=>v.blob()).then(v=>{console.log("fromm image Viewer",v),E([v]),J[o.id](o.name),m(!0),t&&(i==null||i(c))}),console.log(c))},D=o=>{o.currentTarget.style.backgroundColor="",o.preventDefault(),o.stopPropagation()},B=o=>{o.currentTarget.style.backgroundColor="#3454",o.preventDefault(),o.stopPropagation()},k=o=>{let v=0;const y=Object.keys(c).filter(f=>f!==o).sort((f,S)=>{var T,d;return(((T=c[f])==null?void 0:T.index)||0)-(((d=c[S])==null?void 0:d.index)||0)}).map((f,S)=>(c[f].index=S,c[f].name=f.startsWith(a+"_")?a+"_"+v++:f,c[f]));I(v);const w={};for(let f=0;f<y.length;f++){const S=y[f];w[S.name]=S}_(w),console.log("apres",w,v),t&&(i==null||i(w)),m(!0)};return J[j]=k,e.jsx("div",{className:"image-viewer",children:e.jsxs("div",{className:"top-viewer "+n,children:[e.jsxs("div",{className:"image-ctn",onDragOver:o=>{l||B(o)},onDragLeave:o=>{l||D(o)},onDragExit:o=>{l||D(o)},onDrop:o=>{if(l)return;D(o),o.preventDefault(),o.stopPropagation(),console.log("File(s) dropped",o.dataTransfer.files);const v=G;G=null,o.dataTransfer.files.length>0?(console.log("DRAG_AND_DROP from Folder"),E(o.dataTransfer.files)):v&&Date.now()<v.expireAt&&v.id!==j&&h(v)},children:[Object.keys(c).length==0&&e.jsx("label",{htmlFor:j+"add",className:"empty-image image",children:e.jsx("div",{className:"label",children:"Drag and Drop"})}),Object.keys(c).map(o=>e.jsxs("div",{draggable:!0,className:"image",style:{background:`no-repeat center/cover url(${c[o].isLocal?"":c[o].img.startsWith("/")?M:""}${`${c[o].img}`})`},onDragStartCapture:v=>{l||(R=o,b=o,v.currentTarget.dataset.id=j,G={...c[o],id:j,expireAt:Date.now()+5e3})},onDragEnter:v=>{l||(v.currentTarget.style.opacity="0.5",b=o)},onDragLeave:v=>{l||(v.currentTarget.style.opacity="")},onDragExit:v=>{l||(v.currentTarget.style.opacity="")},onDrop:v=>{l||(v.currentTarget.style.opacity="")},onDragEnd:()=>{if(l||!b||!R)return;let v=c[R].index-c[b].index;v=Math.abs(v)/v*.5,c[R].index=c[b].index+0,c[b].index=c[b].index+v;const y=Object.keys(c).sort((f,S)=>{var T,d;return(((T=c[f])==null?void 0:T.index)||0)-(((d=c[S])==null?void 0:d.index)||0)}).map((f,S)=>(c[f].index=S,c[f].name=f,c[f])),w={};for(let f=0;f<y.length;f++){const S=y[f];w[S.name]=S}_(w),m(!0),t&&(i==null||i(w))},onClick:()=>{g(e.jsx(se,{selectedKey:o,imagesMapper:c}),!0)},children:[!l&&e.jsx("span",{className:"delete-img",onClick:v=>{var w;v.stopPropagation();const y=(w=v.currentTarget.parentElement)==null?void 0:w.querySelector(".confirm-delete-image");y&&(y.style.display="flex")}}),e.jsx("span",{className:"open-img"}),e.jsxs("div",{className:"confirm-delete-image",onClick:v=>{v.stopPropagation()},children:[e.jsx("div",{className:"message",children:"Delete this Image"}),e.jsxs("div",{className:"option",children:[e.jsx("div",{className:"cancel",onClick:v=>{v.currentTarget.parentElement.parentElement.style.display="none"},children:"Cancel"}),e.jsx("div",{className:"delete",onClick:()=>{k(o)},children:"Delete"})]})]})]},o))]}),e.jsxs("div",{className:"option "+n,children:[e.jsx("input",{type:"file",max:7,accept:"image/*",multiple:!0,style:{display:"none"},name:"img",id:j+"add",onChange:o=>{l||o.target.files&&o.target.files[0]&&E(o.target.files)}}),!l&&e.jsxs("label",{htmlFor:j+"add",className:"add",children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"NEW"})]}),Object.keys(c).length>0&&e.jsxs("div",{className:"open",onClick:()=>{g(e.jsx(se,{selectedKey:Object.keys(c)[0],imagesMapper:c}),!0)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"OPEN"})]}),!t&&!l&&e.jsxs("div",{className:"save "+(u?"can-save":""),style:{opacity:u?"1":"0.2"},onClick:()=>{i==null||i(c),m(!1)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"SAVE"})]})]})]})})}function se({imagesMapper:r,selectedKey:n}){const{openChild:i}=P(),[a,t]=N.useState(n),[l]=N.useState({next:(s,u,m)=>{const j=s[u].index+1,g=Object.keys(s).find(c=>s[c].index==j);m(g||u)},prev:(s,u,m)=>{const j=s[u].index-1,g=Object.keys(s).find(c=>s[c].index==j);m(g||u)},selected:a,isInit:!1});return l.selected=a,N.useEffect(()=>{l.isInit||(l.isInit=!0,window.addEventListener("keyup",s=>{console.log(r[a]),s.code=="ArrowRight"?l.next(r,l.selected,t):s.code=="ArrowLeft"&&l.prev(r,l.selected,t)}))},[]),e.jsxs("div",{className:"viewer-images",onClick:s=>{s.stopPropagation(),s.currentTarget==s.target&&i(void 0)},children:[e.jsx("div",{className:"close",onClick:()=>{i(void 0)}}),e.jsxs("div",{className:"image-ctn",style:{background:`no-repeat center/cover url(${r[a].isLocal?"":r[a].img.startsWith("/")?M:""}${`${r[a].img}`})`},onClick:s=>{s.preventDefault()},children:[e.jsx("div",{className:"prev",onClick:()=>{l.prev(r,a,t)}}),e.jsx("div",{className:"next",onClick:()=>{l.next(r,a,t)}})]}),e.jsxs("div",{className:"list-img-ctn",onClick:s=>{s.preventDefault()},children:[e.jsx("div",{className:"prev"}),e.jsx("div",{className:"list-img",children:Object.keys(r).map(s=>e.jsx("div",{className:"min-img "+(a==s?"selected":""),style:{background:`no-repeat center/cover url(${r[s].isLocal?"":r[s].img.startsWith("/")?M:""}${`${r[s].img}`})`},onClick:()=>{t(s)}},s))}),e.jsx("div",{className:"next"})]})]})}function Ue({user:r,channel:n}){const{qs:i}=ve();return e.jsx("div",{className:"open-chat",onClick:()=>{n=="discussions_admin"?i({moderator_id:r.id}).setAbsPath(["chat","discussions","discussions_admin"]):i({[(n=="discussions"?"collaborator":"client")+"_id"]:r.id}).setAbsPath(["chat",n])},children:e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsxs("div",{className:"label",children:["Open ",n=="discussions"?"Chat":n=="sessions"?"Session":"Chat Admin"]})]})})}const Ee=[{label:"clients",value:"23",url:"/src/res/multiple-users-silhouette.png",path:["clients"]},{label:"collaborators",value:"15",url:"/src/res/leadership.png",path:["collaborators"]},{label:"moderators",value:"4",url:"/src/res/services.png",path:["moderators"]},{label:"roles",value:"4",url:"/src/res/settings.png",path:["roles"]}];function Fe({active:r,setActive:n,collabo:i}){const{usersVar:a}=P();return e.jsx("div",{className:"users-list-accessor",children:Ee.map((t,l)=>{if(!(t.label=="collaborators"&&i==!1))return t.label=="clients"&&i==!1&&(t.label="users",t.path=["users"]),e.jsxs("div",{className:"top-card "+(t.label==r?"active":""),onClick:()=>{n(t)},children:[e.jsx("h2",{className:"label",children:t.label.toUpperCase()}),e.jsx("h2",{className:"value",children:a==null?void 0:a[t.label]}),e.jsx("h2",{className:"icon",style:{backgroundImage:`url(${t.url})`}})]},l)})})}function Xe({setUser:r,fetchUsers:n,user:i,openChild:a,selector:t}){const[l,s]=N.useState(),[u,m]=N.useState({fetchUsers:n});N.useEffect(()=>{u.fetchUsers({}).then(c=>{if(c!=null&&c.list)return s(c)})},[u]);const j=l==null?void 0:l.list.filter(c=>c.id!=(i==null?void 0:i.id)),g=N.useRef(null);return e.jsx("div",{className:"search-user",children:e.jsxs("div",{className:"search-ctn",onContextMenu:c=>{c.stopPropagation(),c.preventDefault()},onClick:c=>{c.stopPropagation(),c.preventDefault()},children:[e.jsx("div",{className:"close",onClick:()=>{a(void 0)}}),e.jsxs("div",{className:"top",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{autoFocus:!0,type:"text",placeholder:"Search By #id , email, name",onChange:c=>{u.fetchUsers({limit:10,query:{text:c.currentTarget.value}}).then(_=>{if(_!=null&&_.list)return s(_)})}}),t&&e.jsx("select",{ref:g,name:"search-select",id:"search-select",onChange:c=>{var $,I;($=t.setSelected)==null||$.call(t,c.currentTarget.value);const _=(I=t.list.find(R=>R.name==c.currentTarget.value))==null?void 0:I.fetch;_&&m({fetchUsers:_})},children:t.list.map(c=>e.jsx("option",{value:c.name,children:c.name},c.name))})]}),e.jsx("div",{className:"list",children:j==null?void 0:j.map((c,_)=>e.jsxs("div",{className:"collabo",onClick:()=>{var $;a(void 0),r(c,($=g.current)==null?void 0:$.value)},children:[e.jsx("div",{className:"photo",style:{background:ue(c.photos[0])}}),e.jsxs("div",{className:"name-ctn",children:[e.jsx("div",{className:"name",children:me(c.name,20)}),e.jsx("div",{className:"email",children:c.email})]}),e.jsxs("div",{className:"id",children:["#",c.id.split("-")[0]]})]},c.id+_))}),j&&j.length>7&&e.jsx("div",{className:"see-all",onClick:()=>{a(void 0)},children:"SEE ALL"})]})})}function We({onChange:r,isNew:n,json_roles:i,role:a}){const t=Object.keys(i||{}),l=n||!a?[]:t.filter(g=>!!a[g]),[s,u]=N.useState(l),[m,j]=N.useState("");return e.jsxs("div",{className:"choise-options",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{j(m?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Options"}),e.jsxs("div",{className:"name",children:[(s==null?void 0:s.length)||0," Selected"]})]}),e.jsx("div",{className:"choise-icon",style:{transform:m?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-options "+m,style:{height:m?`${45*((t==null?void 0:t.length)||0)}px`:"0px"},children:t==null?void 0:t.map((g,c)=>e.jsx("div",{className:"item "+(s!=null&&s.find(_=>_==g)?"selected":""),onClick:()=>{const _=s!=null&&s.find($=>$==g)?s.filter($=>$!==g):[...s||[],g];u(_),r==null||r(_)},children:e.jsx("div",{className:"label",children:g})},g+c))})]})}function He({onChange:r,role_id:n,roles:i,canChange:a}){var j;const[t,l]=N.useState(n),[s,u]=N.useState(""),m=a();return e.jsxs("div",{className:"choise-roles",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{m&&u(s?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Roles"}),e.jsxs("div",{className:"name",children:[(j=i.find(g=>g.id==n))==null?void 0:j.name," Selected"]})]}),m&&e.jsx("div",{className:"choise-icon",style:{transform:s?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-roles "+s,style:{height:s?`${45*(i.length||0)}px`:"0px"},children:i.map(g=>e.jsxs("div",{className:"item "+(t==g.id?"selected":""),onClick:()=>{r==null||r(g.id),l(g.id)},children:[e.jsx("div",{className:"label",children:g.name}),e.jsxs("div",{className:"id",children:["#",g.id.split("-")[0]]})]},g.id))})]})}export{Me as A,ze as C,Oe as F,Z as G,Pe as I,Ue as O,Be as S,Fe as U,P as a,Ae as b,Ie as c,Ve as d,qe as e,Xe as f,We as g,He as h,ve as u};
