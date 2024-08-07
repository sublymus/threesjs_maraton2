import{H as P}from"./index-DJcK_daU.js";var A=(e,t,i)=>{if(!t.has(e))throw TypeError("Cannot "+i)},n=(e,t,i)=>(A(e,t,"read from private field"),i?i.call(e):t.get(e)),s=(e,t,i)=>{if(t.has(e))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(e):t.set(e,i)},r=(e,t,i,c)=>(A(e,t,"write to private field"),c?c.call(e,i):t.set(e,i),i),X=(e,t,i,c)=>({set _(u){r(e,t,u,i)},get _(){return n(e,t,c)}}),f=(e,t,i)=>(A(e,t,"access private method"),i),C={Pending:0,Created:1,Deleted:2},S={Initializing:"initializing",Connecting:"connecting",Connected:"connected",Disconnected:"disconnected",Reconnecting:"reconnecting"},b,d,p,U,_,w,$=class{constructor(e){s(this,b,void 0),s(this,d,void 0),s(this,p,void 0),s(this,U,void 0),s(this,_,new Set),s(this,w,C.Pending),r(this,p,e.channel),r(this,b,e.httpClient),r(this,d,e.hooks),r(this,U,e.getEventSourceStatus)}get isCreated(){return n(this,w)===C.Created}get isDeleted(){return n(this,w)===C.Deleted}get handlerCount(){return n(this,_).size}$runHandler(e){for(const t of n(this,_))t(e)}async create(){if(!this.isCreated)return this.forceCreate()}async forceCreate(){var t,i,c;if(n(this,U).call(this)!==S.Connected)return new Promise(u=>{setTimeout(()=>{u(this.create())},100)});const e=n(this,b).createRequest("/__transmit/subscribe",{channel:n(this,p)});(t=n(this,d))==null||t.beforeSubscribe(e);try{const u=await n(this,b).send(e);if(u.text(),!u.ok){(i=n(this,d))==null||i.onSubscribeFailed(u);return}r(this,w,C.Created),(c=n(this,d))==null||c.onSubscription(n(this,p))}catch{}}async delete(){var t,i;if(this.isDeleted||!this.isCreated)return;const e=n(this,b).createRequest("/__transmit/unsubscribe",{channel:n(this,p)});(t=n(this,d))==null||t.beforeUnsubscribe(e);try{const c=await n(this,b).send(e);if(c.text(),!c.ok)return;r(this,w,C.Deleted),(i=n(this,d))==null||i.onUnsubscription(n(this,p))}catch{}}onMessage(e){return n(this,_).add(e),()=>{n(this,_).delete(e)}}onMessageOnce(e){const t=this.onMessage(i=>{e(i),t()})}};b=new WeakMap;d=new WeakMap;p=new WeakMap;U=new WeakMap;_=new WeakMap;w=new WeakMap;var y,O,H,z=class{constructor(e){s(this,O),s(this,y,void 0),r(this,y,e)}send(e){return fetch(e)}createRequest(e,t){return new Request(`${n(this,y).baseUrl}${e}`,{method:"POST",headers:{"Content-Type":"application/json","X-XSRF-TOKEN":f(this,O,H).call(this)??""},body:JSON.stringify({uid:n(this,y).uid,...t}),credentials:"include"})}};y=new WeakMap;O=new WeakSet;H=function(){if(typeof document>"u")return null;const e=document.cookie.match(new RegExp("(^|;\\s*)(XSRF-TOKEN)=([^;]*)"));return e?decodeURIComponent(e[3]):null};var a={BeforeSubscribe:"beforeSubscribe",BeforeUnsubscribe:"beforeUnsubscribe",OnReconnectAttempt:"onReconnectAttempt",OnReconnectFailed:"onReconnectFailed",OnSubscribeFailed:"onSubscribeFailed",OnSubscription:"onSubscription",OnUnsubscription:"onUnsubscription"},h,G=class{constructor(){s(this,h,new Map)}register(e,t){var i;return n(this,h).has(e)||n(this,h).set(e,new Set),(i=n(this,h).get(e))==null||i.add(t),this}beforeSubscribe(e){var t;return(t=n(this,h).get(a.BeforeSubscribe))==null||t.forEach(i=>i(e)),this}beforeUnsubscribe(e){var t;return(t=n(this,h).get(a.BeforeUnsubscribe))==null||t.forEach(i=>i(e)),this}onReconnectAttempt(e){var t;return(t=n(this,h).get(a.OnReconnectAttempt))==null||t.forEach(i=>i(e)),this}onReconnectFailed(){var e;return(e=n(this,h).get(a.OnReconnectFailed))==null||e.forEach(t=>t()),this}onSubscribeFailed(e){var t;return(t=n(this,h).get(a.OnSubscribeFailed))==null||t.forEach(i=>i(e)),this}onSubscription(e){var t;return(t=n(this,h).get(a.OnSubscription))==null||t.forEach(i=>i(e)),this}onUnsubscription(e){var t;return(t=n(this,h).get(a.OnUnsubscription))==null||t.forEach(i=>i(e)),this}};h=new WeakMap;var k,g,v,W,o,E,l,F,m,R,M,T,q,x,B,D,L,I=class{constructor(e){s(this,R),s(this,T),s(this,x),s(this,D),s(this,k,void 0),s(this,g,void 0),s(this,v,new Map),s(this,W,void 0),s(this,o,void 0),s(this,E,S.Initializing),s(this,l,void 0),s(this,F,void 0),s(this,m,0),typeof e.uidGenerator>"u"&&(e.uidGenerator=()=>crypto.randomUUID()),typeof e.eventSourceFactory>"u"&&(e.eventSourceFactory=(...t)=>new EventSource(...t)),typeof e.eventTargetFactory>"u"&&(e.eventTargetFactory=()=>new EventTarget),typeof e.httpClientFactory>"u"&&(e.httpClientFactory=(t,i)=>new z({baseUrl:t,uid:i})),typeof e.maxReconnectAttempts>"u"&&(e.maxReconnectAttempts=5),r(this,k,e.uidGenerator()),r(this,F,e.eventTargetFactory()),r(this,o,new G),r(this,W,e.httpClientFactory(e.baseUrl,n(this,k))),e.beforeSubscribe&&n(this,o).register(a.BeforeSubscribe,e.beforeSubscribe),e.beforeUnsubscribe&&n(this,o).register(a.BeforeUnsubscribe,e.beforeUnsubscribe),e.onReconnectAttempt&&n(this,o).register(a.OnReconnectAttempt,e.onReconnectAttempt),e.onReconnectFailed&&n(this,o).register(a.OnReconnectFailed,e.onReconnectFailed),e.onSubscribeFailed&&n(this,o).register(a.OnSubscribeFailed,e.onSubscribeFailed),e.onSubscription&&n(this,o).register(a.OnSubscription,e.onSubscription),e.onUnsubscription&&n(this,o).register(a.OnUnsubscription,e.onUnsubscription),r(this,g,e),f(this,T,q).call(this)}get uid(){return n(this,k)}subscription(e){const t=new $({channel:e,httpClient:n(this,W),hooks:n(this,o),getEventSourceStatus:()=>n(this,E)});return n(this,v).has(e)?n(this,v).get(e):(n(this,v).set(e,t),t)}on(e,t){var i;(i=n(this,F))==null||i.addEventListener(e,t)}close(){var e;(e=n(this,l))==null||e.close()}};k=new WeakMap;g=new WeakMap;v=new WeakMap;W=new WeakMap;o=new WeakMap;E=new WeakMap;l=new WeakMap;F=new WeakMap;m=new WeakMap;R=new WeakSet;M=function(e){var t;r(this,E,e),(t=n(this,F))==null||t.dispatchEvent(new CustomEvent(e))};T=new WeakSet;q=function(){f(this,R,M).call(this,S.Connecting);const e=new URL(`${n(this,g).baseUrl}/__transmit/events`);e.searchParams.append("uid",n(this,k)),r(this,l,n(this,g).eventSourceFactory(e,{withCredentials:!0})),n(this,l).addEventListener("message",f(this,x,B).bind(this)),n(this,l).addEventListener("error",f(this,D,L).bind(this)),n(this,l).addEventListener("open",()=>{f(this,R,M).call(this,S.Connected),r(this,m,0);for(const t of n(this,v).values())t.isCreated&&t.forceCreate()})};x=new WeakSet;B=function(e){const t=JSON.parse(e.data),i=n(this,v).get(t.channel);if(!(typeof i>"u"))try{i.$runHandler(t.payload)}catch(c){console.log(c)}};D=new WeakSet;L=function(){if(n(this,E)!==S.Reconnecting&&f(this,R,M).call(this,S.Disconnected),f(this,R,M).call(this,S.Reconnecting),n(this,o).onReconnectAttempt(n(this,m)+1),n(this,g).maxReconnectAttempts&&n(this,m)>=n(this,g).maxReconnectAttempts){n(this,l).close(),n(this,o).onReconnectFailed();return}X(this,m)._++};const J=new I({baseUrl:P||"https://sublymus.com"});export{J as t};
