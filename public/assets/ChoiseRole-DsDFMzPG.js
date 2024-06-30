var le=Object.defineProperty;var re=(r,l,s)=>l in r?le(r,l,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[l]=s;var ee=(r,l,s)=>(re(r,typeof l!="symbol"?l+"":l,s),s),ce=(r,l,s)=>{if(!l.has(r))throw TypeError("Cannot "+s)};var J=(r,l,s)=>{if(l.has(r))throw TypeError("Cannot add the same private member more than once");l instanceof WeakSet?l.add(r):l.set(r,s)};var F=(r,l,s)=>(ce(r,l,"access private method"),s);import{j as e,e as oe,g as de,l as ue}from"./BindToParentScroll-C1oGTROk.js";import{c as ie,H as z,S as me,r as N}from"./index-CwORnEAK.js";import{g as he}from"./EditorTopBar-CyQxmy4M.js";const U=ie(r=>({user:void 0,store:void 0,userStore:void 0,openAuth:!1,async updateUser({name:l,photos:s,id:a}){const t=new FormData;if(l&&t.append("name",l),s!=null&&s[0])t.append("photos_0",s[0]);else return;t.append("id",a),t.append("photos",'["photos_0"]');const i=await(await fetch(`${z}/edit_me`,{method:"POST",body:t})).json();i.id&&(r(()=>({user:{...i,photos:i.photos.map(o=>`${z}${o}`)}})),localStorage.setItem("user",JSON.stringify(i)))},async disconnection(){const l=U.getState().getHeaders();if(!l)return;const s={method:"GET",headers:l.headers};await fetch(`${z}/disconnection`,s),localStorage.removeItem("user"),localStorage.removeItem("store_name"),r(()=>({user:void 0,store:void 0,userStore:void 0,openAuth:!0}))},async getAccess(){window.open(`${z}/google_connexion`,void 0,"popup");const l=setInterval(()=>{const s=localStorage.getItem("user"),a=s&&JSON.parse(s);a&&(console.log("getAccess",{token:a.token}),r(()=>({user:a})),clearInterval(l),U.getState().authenticateUser())},100)},async authenticateUser(){let l=localStorage.getItem("user");const s=localStorage.getItem("store_name")||window.location.pathname.split("/")[1];if(l){const a=JSON.parse(l),t=new Headers;t.append("Authorization",`Bearer ${a.token}`);const n={method:"GET",headers:t},i=await fetch(`${z}/can_manage_store/${s}`,n);let o;const u=()=>{localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))};try{if(o=await i.json(),!o.user)return u()}catch{return u()}const f={...a,...o.user};r(()=>({user:f,userStore:o.userStore,store:o.store,openAuth:!1})),localStorage.setItem("user",JSON.stringify(f))}else localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))},getHeaders(){const l=U.getState().store;if(!l)return;let s=U.getState().user;if(!s)return;const a=new Headers;return a.append("Authorization",`Bearer ${s.token}`),{headers:a,user:s,store:l}}})),xe={"/":{chat:{discussions:{discussions_all:{},discussions_new:{},discussions_blocked:{},discussions_admin:{}},groups:{},sessions:{sessions_new:{},sessions_opened:{},sessions_closed:{}},surveys:{}},interface:{},statistic:{},command:{},roles:{create_role:{},edit_role:{}},clients:{client_profile:{}},moderators:{moderator_profile:{}},collaborators:{collaborator_profile:{},new_collaborator:{}},profile:{},component:null,products:{dash_product:{product_preview:{},product_statistic:{},action:{}},new_product:{preview:{}}},categories:{dash_categories:{preview:{},action:{}},new_category:{preview:{}}},features:{dash_features:{preview:{},action:{}},new_feature:{preview:{}}},catalogs:{dash_catalogs:{preview:{},action:{}},new_catalog:{preview:{}}}}},q=ie(r=>({T:localStorage.getItem("theme"),storeVar:void 0,usersVar:void 0,back_color:"",blur:!1,async fetchStoreVar(){const l=U.getState().getHeaders();if(!l)return;const a=await(await fetch(`${z}/get_store_var?store_id=${l.store.id}`,{headers:l.headers})).json();a&&r(()=>({storeVar:a}))},async fetchUsersVar(){const l=U.getState().getHeaders();if(!l)return;const a=await(await fetch(`${z}/get_users_var?store_id=${l.store.id}`,{headers:l.headers})).json();a&&r(()=>({usersVar:a}))},setT(l){l&&localStorage.setItem("theme",l),r(()=>({T:l}))},currentChild:void 0,openChild(l,s,a,t){if(t!=null&&t.overlay){const n=q.getState().currentChild;n&&(Array.isArray(n)?l=[...n,l]:l=[n,l])}r(()=>({currentChild:l,blur:l?s||q.getState().blur:void 0,back_color:l?a||q.getState().back_color:""}))}})),pe=new me(xe,["/","products"]).getStore();var X,Y,H,Z;class ve{constructor(l){J(this,X);J(this,H);ee(this,"eventsManager",{});this.constraints=l}All(l,s){return this.when("__all__",l,s)}when(l,s,a){let t=s!=null&&s.uid?s.uid+"":s.uid=(a?"#":"")+he();return l.trim().split(" ").forEach(n=>{if(n=="")return;F(this,X,Y).call(this,n);let i=this.eventsManager[n];i=i||(this.eventsManager[n]={wrapperCollection:{},lastValue:void 0});const o={listener:s,count:0,lastCall:new Date};i.wrapperCollection[t]=o}),this}emit(l,s){l.trim().split(" ").forEach(a=>{a!=""&&(F(this,X,Y).call(this,a),F(this,H,Z).call(this,a,s),F(this,H,Z).call(this,"__all__",s,a))})}remove(l){var t;const s=l.uid||((t=l.listener)==null?void 0:t.uid),a=l.event||l.events||"";if(a=="")throw new Error("Impossible d'identifier un event dans '' ");a.split(" ").forEach(n=>{const i=this.eventsManager[n];if(i==null)return;const o=i.wrapperCollection;o[s]!=null&&delete o[s]})}}X=new WeakSet,Y=function(l){var s,a;if((s=this.constraints)!=null&&s.events){if(((a=this.constraints)==null?void 0:a.events.indexOf(l))==-1)throw new Error(`event : <<${l}>>  is not supported`);return!0}return!0},H=new WeakSet,Z=function(l,s,a){let t=this.eventsManager[l];if(t==null)return;s===void 0&&(s=t.lastValue);const n=t.lastValue!==s,i=t.wrapperCollection;for(const o in i)o.charAt(0)=="#"&&!n||(t.lastValue=s,new Promise(u=>{u(i[o].listener(s,{event:a||l,count:i[o].count,value:s,lastValue:t.lastValue,uid:o})),i[o].lastCall=new Date,i[o].count=i[o].count+1}))};function ne({w:r,list:l,selected:s,setSelectedColumns:a,multiple:t,placeholder:n}){s=t?s:[s[0]];const{openChild:i}=q();return e.jsxs("div",{className:"selector",onClick:o=>{i(e.jsx(ge,{w:r,x:o.clientX,y:o.clientY,setSelectedColumns:a,multiple:!0,selected:s,list:l}))},children:[e.jsx("div",{className:"selector-label",children:n}),e.jsx("div",{className:"icon"})]})}function ge({w:r,x:l,y:s,list:a,selected:t,multiple:n,setSelectedColumns:i}){const o=N.useRef(null);return N.useEffect(()=>{o.current&&oe(o.current)}),e.jsx("div",{ref:o,className:"selector-list",style:{width:r?`${r}px`:"",top:`${s}px`,left:`${l}px`},children:a.map(u=>e.jsx("div",{className:t.includes(u)?"active":"",onClick:()=>{let f=n?[...t.includes(u)?t.filter(v=>v!==u):[...t,u]]:[u];i(f)},children:u},u))})}function fe({sortBy:r,onSortChange:l,onInputChange:s,filter:a,onFilterChange:t,onCancel:n,onSearchRequired:i}){const[o,u]=N.useState(r[0]),[f,v]=N.useState(!0),[c,_]=N.useState(""),[$,A]=N.useState(!1),[k]=N.useState({});return N.useEffect(()=>{l==null||l(o+"_"+(f?"desc":"asc"))},[o,f]),e.jsxs("div",{className:"list-search-bar",children:[e.jsxs("div",{className:"search",children:[e.jsx("input",{type:"text",placeholder:"Search by Id, "+(r.includes("label")?"label":"title")+" description",onChange:b=>{_(b.currentTarget.value)},onKeyUp:b=>{b.code=="Enter"&&(s==null||s(c))}}),e.jsx("div",{className:"icon",onClick:()=>{s==null||s(c)}})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"filter-btn",onClick:()=>{A(!$)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Filter"})]}),e.jsxs("div",{className:"sort-btn",children:[e.jsx("div",{className:"icon "+(f?"desc":"asc"),onClick:()=>{v(!f)}}),e.jsx(ne,{placeholder:`sort by ${o}`,list:r,selected:[o],setSelectedColumns:b=>{u(b[0])}})]})]}),$&&e.jsx("div",{className:"filter-page",onClick:b=>{b.currentTarget==b.target&&A(!$)},children:e.jsxs("div",{className:"ctn-filters",children:[e.jsx("div",{className:"ctn2-filters",children:Object.keys(a).map(b=>a[b].getView(b,E=>{k[b]=E,t==null||t(k)}))}),e.jsxs("div",{className:"filter-bottom",children:[e.jsx("div",{className:"search-btn cancel",onClick:b=>{b.currentTarget==b.target&&A(!$),n==null||n()},children:"Cancel"}),e.jsx("div",{className:"search-btn",onClick:b=>{b.currentTarget==b.target&&A(!$),i==null||i(k)},children:"Search"})]})]})})]})}function je({setPage:r,limit:l,page:s,total:a}){l=Number(l),s=Number(s),a=Number(a);const t=Math.ceil(a/l),n=[];return s>3&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(1)},children:"1"},"a")),s-4>0&&n.push(e.jsx("div",{className:"page",children:"..."},"b")),s-2>0&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(s-2)},children:s-2},"c")),s-1>0&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(s-1)},children:s-1},"d")),n.push(e.jsx("div",{className:"page active",children:s},"e")),s+1<t&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(s+1)},children:s+1},"f")),s+2<t&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(s+2)},children:s+2},"g")),s+4<t&&n.push(e.jsx("div",{className:"page",children:"..."},"h")),s<t&&n.push(e.jsx("div",{className:"page",onClick:()=>{r(t)},children:t},"i")),e.jsxs("div",{className:"list-paging",children:[e.jsx("div",{className:"change",onClick:()=>{s-1>=1&&r(s-1)},children:"Prev"}),n,e.jsx("div",{className:"change",onClick:()=>{s+1<=t&&r(s+1)},children:"Next"})]})}const Ne=r=>({getView(l,s,a,t){return e.jsx("div",{ref:t,children:s==null?void 0:s.toString()},a.id)},option:r}),ye=r=>({getView(l,s,a,t){return e.jsx("div",{ref:t,children:new Date(s).toDateString()},a.id)},option:r}),be=r=>({getView(l,s,a,t){let n=null;return a.onResize(l,i=>{n&&(n.style.width=`${Math.min(i.height,i.width)*.9}px`,n.style.height=`${Math.min(i.height,i.width)*.9}px`)}),e.jsx("div",{ref:t,children:e.jsx("div",{className:"image-element",ref:i=>n=i,style:{boxShadow:`1px 1px 10px ${r==null?void 0:r.schadow}`,backgroundImage:`url(${s})`}})},a.id)},option:r}),we=80,Se=40,te=25,Ce=({canPaginate:r,datas:l,disableFilterBar:s,itemsMapper:a,items_height:t,top_height:n,filter:i,onQuery:o,onItemsSelected:u,multiple:f,canAddNew:v,onNewRequired:c})=>{var I;const[_,$]=N.useState(Object.keys(a)),[A,k]=N.useState([]),[b,E]=N.useState({page:(i==null?void 0:i.page)||1,sortBy:i!=null&&i.sortBy.includes("_")?i==null?void 0:i.sortBy:(i==null?void 0:i.sortBy)+"_desc"||((I=i==null?void 0:i.sortableColumns)==null?void 0:I[0])+"_desc"||"",limit:(i==null?void 0:i.limit)||te,query:{}}),[x]=N.useState({lastResized:"",interval_id:0,emitter:new ve,x:0,y:0,map:{}}),[D,V]=N.useState(""),T=N.useRef(null),d=t??we,g=n??Se,y=(i==null?void 0:i.sortableColumns)??[],w=5;let j,C;return N.useEffect(()=>{o==null||o(b)},[b]),N.useEffect(()=>{var m;if(!D){clearInterval(x.interval_id),x.emitter.emit("endResize",x.lastResized);return}((m=x.map[D].option)==null?void 0:m.resizable)!==!1&&(x.interval_id=setInterval(()=>{var B;let h=x.map[D].w0+(x.x-x.map[D].x0);x.map[D].w=h;const p=(B=x.map[D].option)==null?void 0:B.size_interval;p&&(h=h>p[1]?p[1]:h,h=h<p[0]?p[0]:h);const S=x.map[D].label;S&&(S.style.width=`${h}px`),x.emitter.emit(D,h+w)},16),x.lastResized=D,x.emitter.emit("startResize",D),console.log("startResize",D))},[D]),N.useEffect(()=>{window.addEventListener("mousemove",h=>{x.x=h.clientX,x.y=h.clientY});const m=()=>{V("")};window.addEventListener("mouseup",m),Object.keys(x.map).map(h=>{var p;x.emitter.emit(h,(((p=x.map[h].label)==null?void 0:p.getBoundingClientRect().width)||100)+w)})},[]),e.jsxs("div",{className:"generic-list",children:[!s&&e.jsxs("div",{className:"list-filter-top",children:[e.jsx(fe,{filter:(i==null?void 0:i.filter)||{},sortBy:y,onInputChange:m=>{E({...b,query:{...b.query,text:m}})},onFilterChange:m=>{},onSortChange:m=>{E({...b,sortBy:m})},onSearchRequired:()=>{console.log("SearchRequired"),o==null||o(b)}}),e.jsx(ne,{placeholder:"column",multiple:!0,list:Object.keys(a),selected:_,setSelectedColumns:m=>{$(m)}}),v&&e.jsx("div",{className:"new-btn",onClick:c,children:"ADD NEW"})]}),e.jsxs("div",{className:"list",children:[e.jsx("div",{className:"top-ctn",style:{height:`${g}px`},children:e.jsx("div",{className:"top ",ref:T,style:{height:`${g}px`},children:_.sort((m,h)=>{var p,S;return(((p=x.map[m])==null?void 0:p.index)||0)-(((S=x.map[h])==null?void 0:S.index)||0)}).map((m,h)=>{const p=a[m].option;return x.map[m]||x.emitter.when("startResize",()=>{const S=x.map[m].label;S&&(S.draggable=!1)}).when("endResize",()=>{const S=x.map[m].label;S&&(S.draggable=!0)})&&(x.map[m]={option:{...p,size:100,size_interval:[20,Number.MAX_VALUE]},x0:0,w0:0,w:0,dx:0,label:null,resize:!1,index:h}),e.jsxs("div",{children:[e.jsx("div",{ref:S=>x.map[m].label=S,className:"label",style:{width:`${x.map[m].w||(p==null?void 0:p.size)||100}px`},onDragStartCapture:()=>{C=m,j=m},onDragEnter:S=>{S.currentTarget.style.background="#3455"},onDragLeave:S=>{j=m,S.currentTarget.style.background=S.currentTarget.dataset.background||"inherit"},onDragEnd:()=>{if(!j||!C)return;let S=x.map[C].index-x.map[j].index;S=Math.abs(S)/S*.5,x.map[C].index=x.map[j].index+0,x.map[j].index=x.map[j].index+S,Object.keys(a).sort((R,O)=>{var M,P;return(((M=x.map[R])==null?void 0:M.index)||0)-(((P=x.map[O])==null?void 0:P.index)||0)}).forEach((R,O)=>{x.map[R]&&(x.map[R].index=O)});const B=[..._.sort((R,O)=>{var M,P;return(((M=x.map[R])==null?void 0:M.index)||0)-(((P=x.map[O])==null?void 0:P.index)||0)})];$(B)},children:m},m+"_l"),e.jsx("div",{className:"cursor",style:{minWidth:`${w}px`,maxWidth:`${w}px`,cursor:(p==null?void 0:p.resizable)===!1?"initial":"ew-resize"},onMouseDown:S=>{var B;x.map[m].x0=S.clientX,x.map[m].w0=((B=x.map[m].label)==null?void 0:B.getBoundingClientRect().width)||100,V(m)}},m+"_c")]},m)})})}),e.jsx("div",{className:"items ",style:{overflowX:"scroll",height:`calc(100% - ${g}px)`},onScroll:m=>{T.current&&(T.current.style.transform=`translateX(${-m.currentTarget.scrollLeft}px)`)},children:l.map(m=>e.jsx("div",{ref:h=>m.$itemRef=h,className:"item ",style:{height:`${d}px`},onClick:()=>{let h=f?[...A.includes(m)?A.filter(p=>p!==m):[...A,m]]:[m];k(h),u==null||u(h,l)},children:_.sort((h,p)=>{var S,B;return(((S=x.map[h])==null?void 0:S.index)||0)-(((B=x.map[p])==null?void 0:B.index)||0)}).map(h=>{let p=null;const S=m[h];x.emitter.when(h,R=>{var O,M;p?p.style.width=`${R}px`:m.$itemRef&&(m.$itemRef.style.width=`${((M=(O=T.current)==null?void 0:O.parentElement)==null?void 0:M.getBoundingClientRect().width)||0}px`)});const B=R=>{var O;p=R,R&&(R.classList.add("gl-value",h),R.style.width=`${(((O=x.map[h].label)==null?void 0:O.getBoundingClientRect().width)||0)+w}px`)};return a[h].getView(h,S,{onResize(R,O){x.emitter.when(R,M=>O({width:M,height:d}))},id:`${m.id}_${h}`,onAnyCellSelected(R,O){},onAnyItemSelected(R,O){},onMyCellSelected(R,O){},onMyItemSelected(R,O){}},B)})},m.id))})]}),r&&e.jsx(je,{page:(i==null?void 0:i.page)||1,limit:(i==null?void 0:i.limit)||te,total:(i==null?void 0:i.total)||1,setPage:m=>{E({...b,page:m})}})]})},Q=Ce;Q.StringElement=Ne;Q.ImageElement=be;Q.DateStringElement=ye;const Ae=(r,l)=>({getView(s,a){return e.jsxs("div",{className:"filter-level",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="level";const n=t.querySelector(".round"),i=t.querySelector(".level"),o=t.querySelector(".front-bar"),u=n.querySelector(".label"),f=20/2,v=E=>{o.style.width=`${E}px`},c=Math.min(...r),_=Math.max(...r),$=300,A=_-c,k=(E,x)=>{const D=Math.round(E/x*A+c);u.textContent=`${D}`,D&&a(D)};k(0,0),u.textContent="0",v(0),u.textContent=`${_}`,window.addEventListener("mousemove",E=>{var V;let x=E.clientX;const D=i==null?void 0:i.getBoundingClientRect();if((V=n==null?void 0:n.dataset)!=null&&V.x0){const T=D.width||$,d=Number(n.dataset.x0);let y=Number(n.dataset.l0||"0")+(x-d);y=y<-f?-f:y>T-f?T-f:y,n.style.left=`${y}px`;const w=y+f;k(w,T),v(y)}});const b=()=>{n&&(n.dataset.x0="")};window.addEventListener("mouseup",b),window.addEventListener("mouseleave",b)},children:[e.jsx("div",{className:"name",children:s}),e.jsxs("div",{className:"level",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",n=>{t.dataset.x0=n.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),L={},W=(r,l)=>{let s=l.sort((a,t)=>a.dataset.active?t.dataset.active&&a.dataset.item>t.dataset.item?1:-1:t.dataset.active||a.dataset.item>t.dataset.item?1:-1);L[r].collection.innerHTML="",L[r].open||(s=s.slice(0,ae)),L[r].collection.append(...s),L[r].count.textContent=L[r].collected.length},ae=10,Re=(r,l,s)=>({getView(a,t){return e.jsxs("div",{className:"filter-collector",ref:n=>{n&&(n.dataset.init||(n.dataset.init="filter-collector",L[a]=n,L[a].collected=l,L[a].open=!1,L[a].count=n.querySelector(".count"),L[a].collection=n.querySelector(".collection"),L[a].collectionseeall=n.querySelector(".collection-seeall")))},children:[e.jsxs("div",{className:"top-collection",children:[e.jsx("div",{className:"name",children:a}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{className:"count",children:l.length}),e.jsx("div",{className:"collection-seeall",onClick:()=>{const n=!L[a].open;L[a].open=n;const i=L[a].collection;L[a].open?(L[a].classList.add("all"),i.classList.add("all"),i.scrollTop=0,L[a].style.marginTop="0px",W(a,L[a].collection.items||[]),L[a].collectionseeall.textContent="Close"):(L[a].classList.remove("all"),i.classList.remove("all"),i.scrollTop=0,L[a].style.marginTop="",W(a,L[a].collection.items||[]),L[a].collectionseeall.textContent="See All")},children:"See All"})]})]}),e.jsx("div",{className:"collection",ref:n=>{if(!n||!n||(n.style.display="flex",n.dataset.full))return;n.dataset.full="ok",n.classList.remove("all"),n.scrollTop=0;const i=r.map(o=>{const u=document.createElement("div");return u.className="collection-item",u.dataset.item=o,u.dataset.active="",u.addEventListener("click",()=>{if(L[a].collected.includes(o)){L[a].collected=L[a].collected.filter(v=>v!=o),u.style.background="",u.style.color="",u.dataset.active="",t(L[a].collected),W(a,i);return}s?(L[a].collected.push(o),u.style.background="rgb(0, 0, 150)",u.style.color="#fff",u.dataset.active="yes"):(i.forEach(v=>{v.style.background="",v.style.color="",v.dataset.active=""}),u.style.background="rgb(0, 0, 150)",u.style.color="#fff",u.dataset.active="yes",L[a].collected=[o]),t(L[a].collected),W(a,i)}),u.textContent=o,u});n.items=i,n.append(...i.slice(0,ae))}})]})}}),Oe=(r,l)=>({getView(s,a){return e.jsxs("div",{className:"filter-interval",ref:t=>{if(!t||t.dataset.init)return;t.dataset.init="interval";const n=t.querySelector(".left-round"),i=t.querySelector(".right-round"),o=t.querySelector(".interval"),u=t.querySelector(".front-bar"),f=i.querySelector(".label"),v=n.querySelector(".label"),c=20,_=(V,T)=>{T&&(u.style.left=`${T+c/2}px`),u.style.width=`${V}px`},$=Math.min(...r),A=Math.max(...r),k=300,b=A-$,E=[0,k],x=(V,T,d)=>{E[V]=T;const g=Math.round(E[0]/d*b+$),y=Math.round(E[1]/d*b+$);v.textContent=`${g}`,f.textContent=`${y}`,a([g,y])};v.textContent=`${Math.min(...l)}`,f.textContent=`${Math.max(...l)}`,window.addEventListener("mousemove",V=>{var w,j;let T=V.clientX;const d=o==null?void 0:o.getBoundingClientRect(),g=n==null?void 0:n.getBoundingClientRect(),y=i==null?void 0:i.getBoundingClientRect();if((w=n==null?void 0:n.dataset)!=null&&w.x0){const C=d.width||k,I=Number(n.dataset.x0),m=Number(n.dataset.l0||"0"),h=C-Number(i.style.right.replace("px","")||"0")-c;let p=m+(T-I);p=p<-c?-c:p>h-c?h-c:p,n.style.left=`${p}px`;const S=y.x-g.x-c,B=p+c;v.style.zIndex="20",f.style.zIndex="0",_(S+c,p),x(0,B,C)}else if((j=i==null?void 0:i.dataset)!=null&&j.x0){const C=Number(i.dataset.x0),I=Number(i.dataset.r0||"0"),m=d.width||k,h=m-Number(n.style.left.replace("px","")||"0")-c;let p=I-(T-C);p=p<-c?-c:p>h-c?h-c:p,i.style.right=`${p}px`;const S=y.x-g.x-c,B=m-p-c;f.style.zIndex="20",v.style.zIndex="0",_(S+c),x(1,B,m)}});const D=()=>{n&&(n.dataset.x0=""),i&&(i.dataset.x0="")};window.addEventListener("mouseup",D),window.addEventListener("mouseleave",D)},children:[e.jsx("div",{className:"name",children:s}),e.jsxs("div",{className:"interval",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"left-round",style:{left:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="left",t.addEventListener("mousedown",n=>{t.dataset.x0=n.clientX+"",t.dataset.l0=t.style.left.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})}),e.jsx("div",{className:"right-round",style:{right:"-20px"},ref:t=>{t&&(t.dataset.init||(t.dataset.init="right",t.addEventListener("mousedown",n=>{t.dataset.x0=n.clientX+"",t.dataset.r0=t.style.right.replace("px",""),console.log("left down x0",t.dataset.x0)})))},children:e.jsx("div",{className:"lable-ctn",children:e.jsx("div",{className:"label",children:"0"})})})]})]})}}),Be=r=>({getView(l,s){return e.jsxs("div",{className:"filter-switch",ref:a=>{if(!a||a.dataset.init)return;a.dataset.init="filter-switch",a.dataset.active=r?"":"ok";const t=20,n=a.querySelector(".front-bar"),i=a.querySelector(".switch"),o=a.querySelector(".round"),u=()=>{const f=(i==null?void 0:i.getBoundingClientRect().width)||50,v=!a.dataset.active;a.dataset.active=v?"ok":"",o.style.left=v?`${f-t}px`:"0px",o.style.background=v?"rgb(55, 0, 255)":"rgb(70, 70, 70)",o.style.border=v?"2px solid #3168ff":" 2px solid #222",n.style.width=v?"100%":`${t/2}px`,s(v)};o.style.left="0px",i.addEventListener("mousedown",u),u()},children:[e.jsx("div",{className:"name",children:l}),e.jsxs("div",{className:"switch",children:[e.jsx("div",{className:"back-bar"}),e.jsx("div",{className:"front-bar"}),e.jsx("div",{className:"round",style:{left:"-20px"}})]})]})}}),Ve={getView(r,l,s,a){return e.jsx("div",{ref:a,children:e.jsx("div",{className:"use-status active "+(l||"").toLocaleLowerCase(),children:l})},s.id+r)},option:{size:150}},_e=["PAUSE","VISIBLE","TRASH"];function ze({onChange:r,status:l}){const[s,a]=N.useState(l);return e.jsx("div",{className:"choise-status",children:e.jsx("div",{className:"ctn",children:_e.map(t=>e.jsx("div",{className:"use-status "+t.toLocaleLowerCase()+" "+(s==t?"active":""),onClick:()=>{a(t),r==null||r(t)},children:t}))})})}function Me({placeholder:r,value:l,isCheckRequired:s,label:a,max:t,min:n,check:i,openEditor:o,prompt:u,editable:f,type:v,onChange:c}){const[_,$]=N.useState(l||""),[A,k]=N.useState(0),[b,E]=N.useState(""),[x,D]=N.useState(o||!1),[V,T]=N.useState(0),[d,g]=N.useState(0),y=N.useRef(null),w=N.useRef(null),j=N.useRef(null),C=v||"text",[I]=N.useState({validation:h=>{if(E(""),C=="number"){if(n&&Number(h)<n)return E(t?`Value Interval[${n},${t}]`:`Minimum value ${n}`),!1;if(t&&Number(h)>t)return E(n?`Value Interval[${n},${t}]`:`Minimum value ${n}`),!1}else{if(h=h.toString().trim(),n&&String(h).length<n)return E(`Minimum length ${n}`),!1;if(t&&String(h).length>t)return E(`Maximum length ${t}`),!1}return h!==l&&(c==null||c(h)),!0}});N.useEffect(()=>{s&&I.validation(_)},[s]),N.useEffect(()=>{I.validation(l||"")},[l]);const m=()=>{if(y.current){const p=`${-10-y.current.getBoundingClientRect().height}px`;y.current.style.top=p}if(w.current){const p=`${-10-w.current.getBoundingClientRect().height}px`;w.current.style.top=p}};return e.jsxs("div",{className:"input-text input",children:[e.jsx("div",{className:"input-top",children:e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"label",children:[a," "]}),u&&e.jsx("div",{className:"input-info",onMouseEnter:h=>{if(h.target.className!=="input-info")return w.current.style.display="none";clearTimeout(V),w.current&&(w.current.style.display="block"),m()},onMouseLeave:()=>{T(setTimeout(()=>{w.current&&(w.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:h=>{if(w.current=h,w.current){const p=w.current.getBoundingClientRect();if(w.current.dataset.top)return;const S=`${-10-p.height}px`;w.current.dataset.top=S,w.current.style.top=S}},children:u})}),f&&e.jsx("div",{className:"edit",style:{background:`no-repeat center/80% url(${x?"/src/res/x.png":"/src/res/pencil.png"})`},onClick:()=>{const h=!x;console.log("***********"),h&&setTimeout(()=>{var p;(p=j.current)==null||p.focus()}),D(h==!1?!I.validation(_):!0),m()},onMouseEnter:h=>{if(h.target.className!=="edit")return y.current.style.display="none";clearTimeout(d),y.current&&(y.current.style.display="block"),m()},onMouseLeave:()=>{g(setTimeout(()=>{y.current&&(y.current.style.display="none")},300))},children:e.jsx("div",{className:"promt",ref:h=>{y.current=h,m()},children:x?"Close editor":"click here to edit value"})})]})}),!x&&e.jsx("div",{className:"value",children:_}),x&&e.jsxs("div",{className:"input-editor",children:[e.jsx("input",{ref:j,type:C,placeholder:r,value:_,onChange:h=>{let p=h.currentTarget.value;for(;p.includes("  ");)p=p.replace("  "," ");if(C=="number"){const S=Number(p);if(S>(t||Number.MAX_VALUE))return;$(S)}else{if(p.length>(t||Number.MAX_VALUE))return;$(p)}E(""),k(p.length)},onBlur:()=>{i=="auto"&&I.validation(_)&&setTimeout(()=>{console.log("##############"),D(!1)},0)}}),e.jsxs("div",{className:"count",children:[" ",e.jsx("div",{className:"message",children:b}),C=="number"?`[${(n!==void 0?n:"-∞")+" , "+(t!==void 0?t:"+∞")}]`:t!==void 0&&`${A}/${t}`]})]})]})}function qe({}){return e.jsxs("div",{className:"actions-card",children:[e.jsxs("div",{className:"text",children:[e.jsx("h1",{className:"title",children:"All Colaborator Action"}),e.jsx("h2",{className:"description",children:"See all colaborators actions executed on this product like update and collaborator source "})]}),e.jsx($e,{})]})}function $e(){return e.jsxs("div",{className:"circular-line-chart",children:[e.jsx("div",{className:"back"}),e.jsx("div",{className:"btn",children:" ACTIONS "})]})}let Le=0,G=null;const K={};function Ue({images:r=[],optionPosition:l="bottom",onSave:s,name:a,autosave:t,cannotEdit:n}){const[i]=N.useState(r.map(d=>d)),[o,u]=N.useState(!1),[f]=N.useState((Math.random()+Le++).toString()),{openChild:v}=q(),[c,_]=N.useState({}),[$,A]=N.useState(0);N.useEffect(()=>{const d={};for(let g=0;g<i.length;g++){const y=i[g];d[y]={img:y,index:g,name:y}}_(d)},[i]);let k,b;const E=d=>{var w;if(!d||d.length==0)return;const g={};for(let j=d.length-1;j>=0;j--){const C=d[j];if(!C.type.startsWith("image/")){if(C.type)continue;{const m=(w=C.name)==null?void 0:w.substring(C.name.lastIndexOf("."),C.name.length).replace(".","");if(!["jpg","jpeg","jfif","pjpeg","pjp","avif","apng","gif","jpg","png","jpeg","webp"].includes(m))continue}}const I=`${a}_${$+j}`;g[I]={img:URL.createObjectURL(d[j]),index:-($+j),file:C,isLocal:!0,name:I}}const y={...g,...c};Object.keys(y).sort((j,C)=>{var I,m;return(((I=y[j])==null?void 0:I.index)||0)-(((m=y[C])==null?void 0:m.index)||0)}).forEach((j,C)=>{y[j].index=C}),_(y),t&&(s==null||s(y)),u(!0),A($+d.length)},x=d=>{d&&(d.isLocal&&d.file?(console.log("from input"),E([d.file]),K[d.id](d.name),u(!0),t&&(s==null||s(c))):fetch(`${d.img.startsWith("/")?z:""}${d.img}`).then(g=>g.blob()).then(g=>{console.log("fromm image Viewer",g),E([g]),K[d.id](d.name),u(!0),t&&(s==null||s(c))}),console.log(c))},D=d=>{d.currentTarget.style.backgroundColor="",d.preventDefault(),d.stopPropagation()},V=d=>{d.currentTarget.style.backgroundColor="#3454",d.preventDefault(),d.stopPropagation()},T=d=>{let g=0;const y=Object.keys(c).filter(j=>j!==d).sort((j,C)=>{var I,m;return(((I=c[j])==null?void 0:I.index)||0)-(((m=c[C])==null?void 0:m.index)||0)}).map((j,C)=>(c[j].index=C,c[j].name=j.startsWith(a+"_")?a+"_"+g++:j,c[j]));A(g);const w={};for(let j=0;j<y.length;j++){const C=y[j];w[C.name]=C}_(w),console.log("apres",w,g),t&&(s==null||s(w)),u(!0)};return K[f]=T,e.jsx("div",{className:"image-viewer",children:e.jsxs("div",{className:"top-viewer "+l,children:[e.jsxs("div",{className:"image-ctn",onDragOver:d=>{n||V(d)},onDragLeave:d=>{n||D(d)},onDragExit:d=>{n||D(d)},onDrop:d=>{if(n)return;D(d),d.preventDefault(),d.stopPropagation(),console.log("File(s) dropped",d.dataTransfer.files);const g=G;G=null,d.dataTransfer.files.length>0?(console.log("DRAG_AND_DROP from Folder"),E(d.dataTransfer.files)):g&&Date.now()<g.expireAt&&g.id!==f&&x(g)},children:[Object.keys(c).length==0&&e.jsx("label",{htmlFor:f+"add",className:"empty-image image",children:e.jsx("div",{className:"label",children:"Drag and Drop"})}),Object.keys(c).map(d=>e.jsxs("div",{draggable:!0,className:"image",style:{background:`no-repeat center/cover url(${c[d].isLocal?"":c[d].img.startsWith("/")?z:""}${`${c[d].img}`})`},onDragStartCapture:g=>{n||(k=d,b=d,g.currentTarget.dataset.id=f,G={...c[d],id:f,expireAt:Date.now()+5e3})},onDragEnter:g=>{n||(g.currentTarget.style.opacity="0.5",b=d)},onDragLeave:g=>{n||(g.currentTarget.style.opacity="")},onDragExit:g=>{n||(g.currentTarget.style.opacity="")},onDrop:g=>{n||(g.currentTarget.style.opacity="")},onDragEnd:()=>{if(n||!b||!k)return;let g=c[k].index-c[b].index;g=Math.abs(g)/g*.5,c[k].index=c[b].index+0,c[b].index=c[b].index+g;const y=Object.keys(c).sort((j,C)=>{var I,m;return(((I=c[j])==null?void 0:I.index)||0)-(((m=c[C])==null?void 0:m.index)||0)}).map((j,C)=>(c[j].index=C,c[j].name=j,c[j])),w={};for(let j=0;j<y.length;j++){const C=y[j];w[C.name]=C}_(w),u(!0),t&&(s==null||s(w))},onClick:()=>{v(e.jsx(se,{selectedKey:d,imagesMapper:c}),!0)},children:[!n&&e.jsx("span",{className:"delete-img",onClick:g=>{var w;g.stopPropagation();const y=(w=g.currentTarget.parentElement)==null?void 0:w.querySelector(".confirm-delete-image");y&&(y.style.display="flex")}}),e.jsx("span",{className:"open-img"}),e.jsxs("div",{className:"confirm-delete-image",onClick:g=>{g.stopPropagation()},children:[e.jsx("div",{className:"message",children:"Delete this Image"}),e.jsxs("div",{className:"option",children:[e.jsx("div",{className:"cancel",onClick:g=>{g.currentTarget.parentElement.parentElement.style.display="none"},children:"Cancel"}),e.jsx("div",{className:"delete",onClick:()=>{T(d)},children:"Delete"})]})]})]},d))]}),e.jsxs("div",{className:"option "+l,children:[e.jsx("input",{type:"file",max:7,accept:"image/*",multiple:!0,style:{display:"none"},name:"img",id:f+"add",onChange:d=>{n||d.target.files&&d.target.files[0]&&E(d.target.files)}}),!n&&e.jsxs("label",{htmlFor:f+"add",className:"add",children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"NEW"})]}),Object.keys(c).length>0&&e.jsxs("div",{className:"open",onClick:()=>{v(e.jsx(se,{selectedKey:Object.keys(c)[0],imagesMapper:c}),!0)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"OPEN"})]}),!t&&!n&&e.jsxs("div",{className:"save "+(o?"can-save":""),style:{opacity:o?"1":"0.2"},onClick:()=>{s==null||s(c),u(!1)},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"SAVE"})]})]})]})})}function se({imagesMapper:r,selectedKey:l}){const{openChild:s}=q(),[a,t]=N.useState(l),[n]=N.useState({next:(i,o,u)=>{const f=i[o].index+1,v=Object.keys(i).find(c=>i[c].index==f);u(v||o)},prev:(i,o,u)=>{const f=i[o].index-1,v=Object.keys(i).find(c=>i[c].index==f);u(v||o)},selected:a,isInit:!1});return n.selected=a,N.useEffect(()=>{n.isInit||(n.isInit=!0,window.addEventListener("keyup",i=>{console.log(r[a]),i.code=="ArrowRight"?n.next(r,n.selected,t):i.code=="ArrowLeft"&&n.prev(r,n.selected,t)}))},[]),e.jsxs("div",{className:"viewer-images",onClick:i=>{i.stopPropagation(),i.currentTarget==i.target&&s(void 0)},children:[e.jsx("div",{className:"close",onClick:()=>{s(void 0)}}),e.jsxs("div",{className:"image-ctn",style:{background:`no-repeat center/cover url(${r[a].isLocal?"":r[a].img.startsWith("/")?z:""}${`${r[a].img}`})`},onClick:i=>{i.preventDefault()},children:[e.jsx("div",{className:"prev",onClick:()=>{n.prev(r,a,t)}}),e.jsx("div",{className:"next",onClick:()=>{n.next(r,a,t)}})]}),e.jsxs("div",{className:"list-img-ctn",onClick:i=>{i.preventDefault()},children:[e.jsx("div",{className:"prev"}),e.jsx("div",{className:"list-img",children:Object.keys(r).map(i=>e.jsx("div",{className:"min-img "+(a==i?"selected":""),style:{background:`no-repeat center/cover url(${r[i].isLocal?"":r[i].img.startsWith("/")?z:""}${`${r[i].img}`})`},onClick:()=>{t(i)}},i))}),e.jsx("div",{className:"next"})]})]})}function Pe({user:r,channel:l}){const{qs:s}=pe();return e.jsx("div",{className:"open-chat",onClick:()=>{l=="discussions_admin"?s({moderator_id:r.id}).setAbsPath(["chat","discussions","discussions_admin"]):s({[(l=="discussions"?"collaborator":"client")+"_id"]:r.id}).setAbsPath(["chat",l])},children:e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsxs("div",{className:"label",children:["Open ",l=="discussions"?"Chat":l=="sessions"?"Session":"Chat Admin"]})]})})}const Ee=[{label:"clients",value:"23",url:"/src/res/multiple-users-silhouette.png",path:["clients"]},{label:"collaborators",value:"15",url:"/src/res/leadership.png",path:["collaborators"]},{label:"moderators",value:"4",url:"/src/res/services.png",path:["moderators"]},{label:"roles",value:"4",url:"/src/res/settings.png",path:["roles"]}];function Fe({active:r,setActive:l,collabo:s}){const{usersVar:a}=q();return e.jsx("div",{className:"users-list-accessor",children:Ee.map((t,n)=>{if(!(t.label=="collaborators"&&s==!1))return t.label=="clients"&&s==!1&&(t.label="users",t.path=["users"]),e.jsxs("div",{className:"top-card "+(t.label==r?"active":""),onClick:()=>{l(t)},children:[e.jsx("h2",{className:"label",children:t.label.toUpperCase()}),e.jsx("h2",{className:"value",children:a==null?void 0:a[t.label]}),e.jsx("h2",{className:"icon",style:{backgroundImage:`url(${t.url})`}})]},n)})})}function Xe({setUser:r,fetchUsers:l,user:s,openChild:a,selector:t}){const[n,i]=N.useState(),[o,u]=N.useState({fetchUsers:l});N.useEffect(()=>{o.fetchUsers({}).then(c=>{if(c!=null&&c.list)return i(c)})},[o]);const f=n==null?void 0:n.list.filter(c=>c.id!=(s==null?void 0:s.id)),v=N.useRef(null);return e.jsx("div",{className:"search-user",children:e.jsxs("div",{className:"search-ctn",onContextMenu:c=>{c.stopPropagation(),c.preventDefault()},onClick:c=>{c.stopPropagation(),c.preventDefault()},children:[e.jsx("div",{className:"close",onClick:()=>{a(void 0)}}),e.jsxs("div",{className:"top",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{autoFocus:!0,type:"text",placeholder:"Search By #id , email, name",onChange:c=>{o.fetchUsers({limit:10,query:{text:c.currentTarget.value}}).then(_=>{if(_!=null&&_.list)return i(_)})}}),t&&e.jsx("select",{ref:v,name:"search-select",id:"search-select",onChange:c=>{var $,A;($=t.setSelected)==null||$.call(t,c.currentTarget.value);const _=(A=t.list.find(k=>k.name==c.currentTarget.value))==null?void 0:A.fetch;_&&u({fetchUsers:_})},children:t.list.map(c=>e.jsx("option",{value:c.name,children:c.name},c.name))})]}),e.jsx("div",{className:"list",children:f==null?void 0:f.map((c,_)=>e.jsxs("div",{className:"collabo",onClick:()=>{var $;a(void 0),r(c,($=v.current)==null?void 0:$.value)},children:[e.jsx("div",{className:"photo",style:{background:de(c.photos[0])}}),e.jsxs("div",{className:"name-ctn",children:[e.jsx("div",{className:"name",children:ue(c.name,20)}),e.jsx("div",{className:"email",children:c.email})]}),e.jsxs("div",{className:"id",children:["#",c.id.split("-")[0]]})]},c.id+_))}),f&&f.length>7&&e.jsx("div",{className:"see-all",onClick:()=>{a(void 0)},children:"SEE ALL"})]})})}function He({onChange:r,isNew:l,json_roles:s,role:a}){const t=Object.keys(s||{}),n=l||!a?[]:t.filter(v=>!!a[v]),[i,o]=N.useState(n),[u,f]=N.useState("");return e.jsxs("div",{className:"choise-options",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{f(u?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Options"}),e.jsxs("div",{className:"name",children:[(i==null?void 0:i.length)||0," Selected"]})]}),e.jsx("div",{className:"choise-icon",style:{transform:u?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-options "+u,style:{height:u?`${45*((t==null?void 0:t.length)||0)}px`:"0px"},children:t==null?void 0:t.map((v,c)=>e.jsx("div",{className:"item "+(i!=null&&i.find(_=>_==v)?"selected":""),onClick:()=>{const _=i!=null&&i.find($=>$==v)?i.filter($=>$!==v):[...i||[],v];o(_),r==null||r(_)},children:e.jsx("div",{className:"label",children:v})},v+c))})]})}function We({onChange:r,role_id:l,roles:s,canChange:a}){var f;const[t,n]=N.useState(l),[i,o]=N.useState(""),u=a();return e.jsxs("div",{className:"choise-roles",children:[e.jsxs("div",{className:"choise-ctn",onClick:()=>{u&&o(i?"":"open")},children:[e.jsx("div",{className:"back",children:e.jsx("div",{className:"icon"})}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"label",children:"Roles"}),e.jsxs("div",{className:"name",children:[(f=s.find(v=>v.id==l))==null?void 0:f.name," Selected"]})]}),u&&e.jsx("div",{className:"choise-icon",style:{transform:i?"rotate(180deg)":""}})]}),e.jsx("div",{className:"list-roles "+i,style:{height:i?`${45*(s.length||0)}px`:"0px"},children:s.map(v=>e.jsxs("div",{className:"item "+(t==v.id?"selected":""),onClick:()=>{r==null||r(v.id),n(v.id)},children:[e.jsx("div",{className:"label",children:v.name}),e.jsxs("div",{className:"id",children:["#",v.id.split("-")[0]]})]},v.id))})]})}export{qe as A,ze as C,Oe as F,Q as G,Me as I,Pe as O,Ve as S,Fe as U,U as a,q as b,Re as c,Ae as d,Be as e,Ue as f,Xe as g,He as h,We as i,pe as u};
