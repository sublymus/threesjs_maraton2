import{r as g,H as X}from"./index-e278dn_q.js";function ee(){const[e,t]=g.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return g.useEffect(()=>{function i(){t({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",i),i(),()=>window.removeEventListener("resize",i)},[]),e}function te(){const[e,t]=g.useState();return g.useEffect(()=>{navigator.permissions.query({name:"notifications"}).then(i=>{i.addEventListener("change",()=>{t(i.state)}),t(i.state)})},[]),e}function ne(e,t,i){const[r,c]=g.useState(!1),[u]=g.useState({rect:new DOMRect,id:0,init(){clearInterval(this.id);const O=setInterval(()=>{if(!e.current)return;const _=e.current.getBoundingClientRect(),N=_.x<window.innerWidth&&_.x+_.width>0,V=_.y<window.innerHeight&&_.y+_.height>0&&N;c(V)},t);return()=>clearInterval(O)},remove(){clearInterval(this.id)}});return g.useEffect(()=>(i?u.init():u.remove(),u.remove()),[i]),r}const ie=e=>{!e||e.dataset.isInit||(e.dataset.isInit="init",e.addEventListener("scroll",()=>{const t=e.scrollTop-Number(e.dataset.lastScrollTop);e.dataset.lastScrollTop=`${e.scrollTop}`,e.parentElement.scrollTop+=t*2}))},se=e=>{const t=e.getBoundingClientRect();t.x+t.width>window.innerWidth&&(e.style.left=`${window.innerWidth-t.width}px`),t.y+t.height>window.innerHeight&&(e.style.top=`${window.innerHeight-t.height}px`)},re=(e,t)=>i=>{if(!i||i.dataset.isInit)return;i.dataset.isInit="init";const r=document.querySelector(t);if(!r)return;let c=0;r.addEventListener("scroll",()=>{let u=r.scrollTop-Number(i.dataset.lastScrollTop||0);u*=2,i.dataset.lastScrollTop=r.scrollTop+"";const O=u+c>e?e:u+c<0?0:u+c;c=O,i.style.top=`${-O}px`})};var P=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},n=(e,t,i)=>(P(e,t,"read from private field"),i?i.call(e):t.get(e)),s=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},a=(e,t,i,r)=>(P(e,t,"write to private field"),r?r.call(e,i):t.set(e,i),i),G=(e,t,i,r)=>({set _(c){a(e,t,c,i)},get _(){return n(e,t,r)}}),b=(e,t,i)=>(P(e,t,"access private method"),i),C={Pending:0,Created:1,Deleted:2},S={Initializing:"initializing",Connecting:"connecting",Connected:"connected",Disconnected:"disconnected",Reconnecting:"reconnecting"},p,l,w,x,y,E,J=class{constructor(e){s(this,p,void 0),s(this,l,void 0),s(this,w,void 0),s(this,x,void 0),s(this,y,new Set),s(this,E,C.Pending),a(this,w,e.channel),a(this,p,e.httpClient),a(this,l,e.hooks),a(this,x,e.getEventSourceStatus)}get isCreated(){return n(this,E)===C.Created}get isDeleted(){return n(this,E)===C.Deleted}get handlerCount(){return n(this,y).size}$runHandler(e){for(const t of n(this,y))t(e)}async create(){if(!this.isCreated)return this.forceCreate()}async forceCreate(){var t,i,r;if(n(this,x).call(this)!==S.Connected)return new Promise(c=>{setTimeout(()=>{c(this.create())},100)});const e=n(this,p).createRequest("/__transmit/subscribe",{channel:n(this,w)});(t=n(this,l))==null||t.beforeSubscribe(e);try{const c=await n(this,p).send(e);if(c.text(),!c.ok){(i=n(this,l))==null||i.onSubscribeFailed(c);return}a(this,E,C.Created),(r=n(this,l))==null||r.onSubscription(n(this,w))}catch{}}async delete(){var t,i;if(this.isDeleted||!this.isCreated)return;const e=n(this,p).createRequest("/__transmit/unsubscribe",{channel:n(this,w)});(t=n(this,l))==null||t.beforeUnsubscribe(e);try{const r=await n(this,p).send(e);if(r.text(),!r.ok)return;a(this,E,C.Deleted),(i=n(this,l))==null||i.onUnsubscription(n(this,w))}catch{}}onMessage(e){return n(this,y).add(e),()=>{n(this,y).delete(e)}}onMessageOnce(e){const t=this.onMessage(i=>{e(i),t()})}};p=new WeakMap;l=new WeakMap;w=new WeakMap;x=new WeakMap;y=new WeakMap;E=new WeakMap;var T,H,D,K=class{constructor(e){s(this,H),s(this,T,void 0),a(this,T,e)}send(e){return fetch(e)}createRequest(e,t){return new Request(`${n(this,T).baseUrl}${e}`,{method:"POST",headers:{"Content-Type":"application/json","X-XSRF-TOKEN":b(this,H,D).call(this)??""},body:JSON.stringify({uid:n(this,T).uid,...t}),credentials:"include"})}};T=new WeakMap;H=new WeakSet;D=function(){if(typeof document>"u")return null;const e=document.cookie.match(new RegExp("(^|;\\s*)(XSRF-TOKEN)=([^;]*)"));return e?decodeURIComponent(e[3]):null};var o={BeforeSubscribe:"beforeSubscribe",BeforeUnsubscribe:"beforeUnsubscribe",OnReconnectAttempt:"onReconnectAttempt",OnReconnectFailed:"onReconnectFailed",OnSubscribeFailed:"onSubscribeFailed",OnSubscription:"onSubscription",OnUnsubscription:"onUnsubscription"},d,Q=class{constructor(){s(this,d,new Map)}register(e,t){var i;return n(this,d).has(e)||n(this,d).set(e,new Set),(i=n(this,d).get(e))==null||i.add(t),this}beforeSubscribe(e){var t;return(t=n(this,d).get(o.BeforeSubscribe))==null||t.forEach(i=>i(e)),this}beforeUnsubscribe(e){var t;return(t=n(this,d).get(o.BeforeUnsubscribe))==null||t.forEach(i=>i(e)),this}onReconnectAttempt(e){var t;return(t=n(this,d).get(o.OnReconnectAttempt))==null||t.forEach(i=>i(e)),this}onReconnectFailed(){var e;return(e=n(this,d).get(o.OnReconnectFailed))==null||e.forEach(t=>t()),this}onSubscribeFailed(e){var t;return(t=n(this,d).get(o.OnSubscribeFailed))==null||t.forEach(i=>i(e)),this}onSubscription(e){var t;return(t=n(this,d).get(o.OnSubscription))==null||t.forEach(i=>i(e)),this}onUnsubscription(e){var t;return(t=n(this,d).get(o.OnUnsubscription))==null||t.forEach(i=>i(e)),this}};d=new WeakMap;var R,m,v,A,h,M,f,F,W,k,U,I,$,z,q,L,B,Y=class{constructor(e){s(this,k),s(this,I),s(this,z),s(this,L),s(this,R,void 0),s(this,m,void 0),s(this,v,new Map),s(this,A,void 0),s(this,h,void 0),s(this,M,S.Initializing),s(this,f,void 0),s(this,F,void 0),s(this,W,0),typeof e.uidGenerator>"u"&&(e.uidGenerator=()=>crypto.randomUUID()),typeof e.eventSourceFactory>"u"&&(e.eventSourceFactory=(...t)=>new EventSource(...t)),typeof e.eventTargetFactory>"u"&&(e.eventTargetFactory=()=>new EventTarget),typeof e.httpClientFactory>"u"&&(e.httpClientFactory=(t,i)=>new K({baseUrl:t,uid:i})),typeof e.maxReconnectAttempts>"u"&&(e.maxReconnectAttempts=5),a(this,R,e.uidGenerator()),a(this,F,e.eventTargetFactory()),a(this,h,new Q),a(this,A,e.httpClientFactory(e.baseUrl,n(this,R))),e.beforeSubscribe&&n(this,h).register(o.BeforeSubscribe,e.beforeSubscribe),e.beforeUnsubscribe&&n(this,h).register(o.BeforeUnsubscribe,e.beforeUnsubscribe),e.onReconnectAttempt&&n(this,h).register(o.OnReconnectAttempt,e.onReconnectAttempt),e.onReconnectFailed&&n(this,h).register(o.OnReconnectFailed,e.onReconnectFailed),e.onSubscribeFailed&&n(this,h).register(o.OnSubscribeFailed,e.onSubscribeFailed),e.onSubscription&&n(this,h).register(o.OnSubscription,e.onSubscription),e.onUnsubscription&&n(this,h).register(o.OnUnsubscription,e.onUnsubscription),a(this,m,e),b(this,I,$).call(this)}get uid(){return n(this,R)}subscription(e){const t=new J({channel:e,httpClient:n(this,A),hooks:n(this,h),getEventSourceStatus:()=>n(this,M)});return n(this,v).has(e)?n(this,v).get(e):(n(this,v).set(e,t),t)}on(e,t){var i;(i=n(this,F))==null||i.addEventListener(e,t)}close(){var e;(e=n(this,f))==null||e.close()}};R=new WeakMap;m=new WeakMap;v=new WeakMap;A=new WeakMap;h=new WeakMap;M=new WeakMap;f=new WeakMap;F=new WeakMap;W=new WeakMap;k=new WeakSet;U=function(e){var t;a(this,M,e),(t=n(this,F))==null||t.dispatchEvent(new CustomEvent(e))};I=new WeakSet;$=function(){b(this,k,U).call(this,S.Connecting);const e=new URL(`${n(this,m).baseUrl}/__transmit/events`);e.searchParams.append("uid",n(this,R)),a(this,f,n(this,m).eventSourceFactory(e,{withCredentials:!0})),n(this,f).addEventListener("message",b(this,z,q).bind(this)),n(this,f).addEventListener("error",b(this,L,B).bind(this)),n(this,f).addEventListener("open",()=>{b(this,k,U).call(this,S.Connected),a(this,W,0);for(const t of n(this,v).values())t.isCreated&&t.forceCreate()})};z=new WeakSet;q=function(e){const t=JSON.parse(e.data),i=n(this,v).get(t.channel);if(!(typeof i>"u"))try{i.$runHandler(t.payload)}catch(r){console.log(r)}};L=new WeakSet;B=function(){if(n(this,M)!==S.Reconnecting&&b(this,k,U).call(this,S.Disconnected),b(this,k,U).call(this,S.Reconnecting),n(this,h).onReconnectAttempt(n(this,W)+1),n(this,m).maxReconnectAttempts&&n(this,W)>=n(this,m).maxReconnectAttempts){n(this,f).close(),n(this,h).onReconnectFailed();return}G(this,W)._++};const ae=new Y({baseUrl:X||"https://sublymus.com"});export{ie as a,re as b,ne as c,se as l,te as n,ae as t,ee as u};