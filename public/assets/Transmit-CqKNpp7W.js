var vt=Object.defineProperty;var St=(t,e,n)=>e in t?vt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var q=(t,e,n)=>(St(t,typeof e!="symbol"?e+"":e,n),n);import{r as w,g as gt,R as bt,H as X}from"./index-UoETiJ4D.js";var it={exports:{}},B={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var wt=w,yt=Symbol.for("react.element"),mt=Symbol.for("react.fragment"),_t=Object.prototype.hasOwnProperty,Et=wt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Rt={key:!0,ref:!0,__self:!0,__source:!0};function st(t,e,n){var r,s={},o=null,c=null;n!==void 0&&(o=""+n),e.key!==void 0&&(o=""+e.key),e.ref!==void 0&&(c=e.ref);for(r in e)_t.call(e,r)&&!Rt.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:yt,type:t,key:o,ref:c,props:s,_owner:Et.current}}B.Fragment=mt;B.jsx=st;B.jsxs=st;it.exports=B;var ae=it.exports,kt={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const et=t=>{let e;const n=new Set,r=(h,g)=>{const y=typeof h=="function"?h(e):h;if(!Object.is(y,e)){const b=e;e=g??(typeof y!="object"||y===null)?y:Object.assign({},e,y),n.forEach(m=>m(e,b))}},s=()=>e,u={setState:r,getState:s,getInitialState:()=>f,subscribe:h=>(n.add(h),()=>n.delete(h)),destroy:()=>{(kt?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},f=e=t(r,s,u);return u},xt=t=>t?et(t):et;var ot={exports:{}},ct={},at={exports:{}},ut={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $=w;function Ot(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Ct=typeof Object.is=="function"?Object.is:Ot,Wt=$.useState,Pt=$.useEffect,Tt=$.useLayoutEffect,Ut=$.useDebugValue;function Ft(t,e){var n=e(),r=Wt({inst:{value:n,getSnapshot:e}}),s=r[0].inst,o=r[1];return Tt(function(){s.value=n,s.getSnapshot=e,J(s)&&o({inst:s})},[t,n,e]),Pt(function(){return J(s)&&o({inst:s}),t(function(){J(s)&&o({inst:s})})},[t]),Ut(n),n}function J(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Ct(t,n)}catch{return!0}}function $t(t,e){return e()}var Dt=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?$t:Ft;ut.useSyncExternalStore=$.useSyncExternalStore!==void 0?$.useSyncExternalStore:Dt;at.exports=ut;var Lt=at.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var V=w,Mt=Lt;function It(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var At=typeof Object.is=="function"?Object.is:It,Ht=Mt.useSyncExternalStore,zt=V.useRef,qt=V.useEffect,jt=V.useMemo,Nt=V.useDebugValue;ct.useSyncExternalStoreWithSelector=function(t,e,n,r,s){var o=zt(null);if(o.current===null){var c={hasValue:!1,value:null};o.current=c}else c=o.current;o=jt(function(){function u(b){if(!f){if(f=!0,h=b,b=r(b),s!==void 0&&c.hasValue){var m=c.value;if(s(m,b))return g=m}return g=b}if(m=g,At(h,b))return m;var tt=r(b);return s!==void 0&&s(m,tt)?m:(h=b,g=tt)}var f=!1,h,g,y=n===void 0?null:n;return[function(){return u(e())},y===null?void 0:function(){return u(y())}]},[e,n,r,s]);var a=Ht(t,o[0],o[1]);return qt(function(){c.hasValue=!0,c.value=a},[a]),Nt(a),a};ot.exports=ct;var Bt=ot.exports;const Vt=gt(Bt);var lt={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{useDebugValue:Jt}=bt,{useSyncExternalStoreWithSelector:Xt}=Vt;let nt=!1;const Gt=t=>t;function Kt(t,e=Gt,n){(lt?"production":void 0)!=="production"&&n&&!nt&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),nt=!0);const r=Xt(t.subscribe,t.getState,t.getServerState||t.getInitialState,e,n);return Jt(r),r}const rt=t=>{(lt?"production":void 0)!=="production"&&typeof t!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const e=typeof t=="function"?xt(t):t,n=(r,s)=>Kt(e,r,s);return Object.assign(n,e),n},Yt=t=>t?rt(t):rt;function Qt(t){return()=>{t()}}const Zt=t=>{let e=window.location.hash;if(!e)return{pathList:(t==null?void 0:t.defaultPath)||["/"],json:{}};e=decodeURIComponent(e.slice(1,e.length));let n="",r="",s;if(e.includes("=")){const c=e.indexOf("=");n=e.substring(0,c),r=e.substring(c+1,e.length);try{s=r&&JSON.parse(r)}catch{console.warn("Url to JSON error")}}else n=e;return{pathList:["/",...n.split("/")],json:s}};let L={};class ue{constructor(e,n){q(this,"isInitialized",!1);q(this,"listener",null);q(this,"store");this.pages=e,this.defaultPath=n;const r=this;this.store=Yt(s=>({Pages:e,json:{},navHistory:[],pathList:r.defaultPath||["/"],current(...o){const c=r.store.getState().pathList;return o.includes(c[c.length-1])||void 0},init(){r.isInitialized||(r.listener=()=>{const o=Zt(r);s(()=>o)},window.addEventListener("hashchange",Qt(r.listener)),r.listener(),r.isInitialized=!0)},navNext(){console.log("navNext"),history.forward()},qs(o){return L=o,{...r.store.getState(),apply(){r.store.getState().setAbsPath(r.store.getState().pathList.slice(1))},get(){return r.store.getState().setAbsPath(r.store.getState().pathList.slice(1),!0)}}},navBack(){history.back()},setPath(...o){r.editPath(o),L=void 0},exist(...o){let c=e["/"];for(const a of o){const u=c[a];if(!u){console.log("not existe");return}c=u}return!0},setAbsPath(o,c){let a=["/"],u=e["/"];for(const h of o){const g=u[h];if(!g){r.navHistoryUpdate(a,c);return}u=g,a.push(h)}const f=r.navHistoryUpdate(a,c);return L=void 0,f},check(...o){for(const c of o)if(te(c,e,r))return!0}}))}getPages(){return this.pages}getStore(){return this.store.getState().init(),this.store}navHistoryUpdate(e,n){console.log("navHistoryUpdate");let r=e.join("/").replace("//","");try{L&&(r+="="+JSON.stringify(L))}catch{}if(n)return r;window.location.hash!==r&&(window.location.hash=r)}editPath(e){if(e[0]==="/"){let a=[],u=this.pages;try{for(const f of e){const h=u[f];if(h===null){this.navHistoryUpdate(a);return}else if(h===void 0){console.error(" Error Path don't exist");return}u=h,a.push(f)}}catch{return}this.navHistoryUpdate(a);return}e[0]==="./"&&e.shift();let n=1;if(e[0]==="../"){for(const a of e)if(a=="../")n++;else break;e=e.slice(n-1,e.length)}const r=[...this.store.getState().pathList],s=r.length-n,o=r.splice(0,s<0?0:s);if(o[0]!=="/")return console.error("//Error  Path don't exist  L :",o);o.length==0&&o.push("/");let c=[...o,...e];if(c.length>0){let a=this.pages;for(const u of c){const f=a[u];if(f===null)return console.error("error Component detected  c==null ",c,u);if(f===void 0)return console.error("// Path don't exist  c == undefined",c,u);a=f}this.navHistoryUpdate(c)}}}function te(t,e,n){try{let r=e;const s=[...n.store.getState().pathList];return s.includes(t)?!0:(()=>{for(const a of s){const u=r[a];if(u&&u[t]===null)return!0;if(u===void 0)return;r=u}})()}catch{return}}const le=t=>{let e=new Date(t).toLocaleTimeString();return e=e.split(":"),`${e[0]}:${e[1]}`},he=(t,e)=>(t==null?void 0:t.length)>e?t.substring(0,e)+"..":t||"",de=(t,e="cover",n)=>`no-repeat center/${e} url(${n===!0?X:n===!1?"":t.startsWith("/")?X:""}${t})`,fe=(t=.5)=>e=>{const n=e.currentTarget;n.style.opacity=String(t),setTimeout(()=>{n.style.opacity=""},100)};function pe(t,e){return((e.from_id||null)===(t||null)?e.to_id:e.from_id)||null}function ve(){const[t,e]=w.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return w.useEffect(()=>{function n(){e({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),t}function Se(){const[t,e]=w.useState();return w.useEffect(()=>{navigator.permissions.query({name:"notifications"}).then(n=>{n.addEventListener("change",()=>{e(n.state)}),e(n.state)})},[]),t}function ge(t,e,n){const[r,s]=w.useState(!1),[o]=w.useState({rect:new DOMRect,id:0,init(){clearInterval(this.id);const c=setInterval(()=>{if(!t.current)return;const a=t.current.getBoundingClientRect(),u=a.x<window.innerWidth&&a.x+a.width>0,h=a.y<window.innerHeight&&a.y+a.height>0&&u;s(h)},e);return()=>clearInterval(c)},remove(){clearInterval(this.id)}});return w.useEffect(()=>(n?o.init():o.remove(),o.remove()),[n]),r}const be=t=>{!t||t.dataset.isInit||(t.dataset.isInit="init",t.addEventListener("scroll",()=>{const e=t.scrollTop-Number(t.dataset.lastScrollTop);t.dataset.lastScrollTop=`${t.scrollTop}`,t.parentElement.scrollTop+=e*2}))},we=t=>{const e=t.getBoundingClientRect();e.x+e.width>window.innerWidth&&(t.style.left=`${window.innerWidth-e.width}px`),e.y+e.height>window.innerHeight&&(t.style.top=`${window.innerHeight-e.height}px`)},ye=(t,e)=>n=>{if(!n||n.dataset.isInit)return;n.dataset.isInit="init";const r=document.querySelector(e);if(!r)return;let s=0;r.addEventListener("scroll",()=>{let o=r.scrollTop-Number(n.dataset.lastScrollTop||0);o*=2,n.dataset.lastScrollTop=r.scrollTop+"";const c=o+s>t?t:o+s<0?0:o+s;s=c,n.style.top=`${-c}px`})};var Y=(t,e,n)=>{if(!e.has(t))throw TypeError("Cannot "+n)},i=(t,e,n)=>(Y(t,e,"read from private field"),n?n.call(t):e.get(t)),l=(t,e,n)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,n)},d=(t,e,n,r)=>(Y(t,e,"write to private field"),r?r.call(t,n):e.set(t,n),n),ee=(t,e,n,r)=>({set _(s){d(t,e,s,n)},get _(){return i(t,e,r)}}),E=(t,e,n)=>(Y(t,e,"access private method"),n),M={Pending:0,Created:1,Deleted:2},C={Initializing:"initializing",Connecting:"connecting",Connected:"connected",Disconnected:"disconnected",Reconnecting:"reconnecting"},k,_,x,j,P,T,ne=class{constructor(t){l(this,k,void 0),l(this,_,void 0),l(this,x,void 0),l(this,j,void 0),l(this,P,new Set),l(this,T,M.Pending),d(this,x,t.channel),d(this,k,t.httpClient),d(this,_,t.hooks),d(this,j,t.getEventSourceStatus)}get isCreated(){return i(this,T)===M.Created}get isDeleted(){return i(this,T)===M.Deleted}get handlerCount(){return i(this,P).size}$runHandler(t){for(const e of i(this,P))e(t)}async create(){if(!this.isCreated)return this.forceCreate()}async forceCreate(){var e,n,r;if(i(this,j).call(this)!==C.Connected)return new Promise(s=>{setTimeout(()=>{s(this.create())},100)});const t=i(this,k).createRequest("/__transmit/subscribe",{channel:i(this,x)});(e=i(this,_))==null||e.beforeSubscribe(t);try{const s=await i(this,k).send(t);if(s.text(),!s.ok){(n=i(this,_))==null||n.onSubscribeFailed(s);return}d(this,T,M.Created),(r=i(this,_))==null||r.onSubscription(i(this,x))}catch{}}async delete(){var e,n;if(this.isDeleted||!this.isCreated)return;const t=i(this,k).createRequest("/__transmit/unsubscribe",{channel:i(this,x)});(e=i(this,_))==null||e.beforeUnsubscribe(t);try{const r=await i(this,k).send(t);if(r.text(),!r.ok)return;d(this,T,M.Deleted),(n=i(this,_))==null||n.onUnsubscription(i(this,x))}catch{}}onMessage(t){return i(this,P).add(t),()=>{i(this,P).delete(t)}}onMessageOnce(t){const e=this.onMessage(n=>{t(n),e()})}};k=new WeakMap;_=new WeakMap;x=new WeakMap;j=new WeakMap;P=new WeakMap;T=new WeakMap;var I,G,ht,re=class{constructor(t){l(this,G),l(this,I,void 0),d(this,I,t)}send(t){return fetch(t)}createRequest(t,e){return new Request(`${i(this,I).baseUrl}${t}`,{method:"POST",headers:{"Content-Type":"application/json","X-XSRF-TOKEN":E(this,G,ht).call(this)??""},body:JSON.stringify({uid:i(this,I).uid,...e}),credentials:"include"})}};I=new WeakMap;G=new WeakSet;ht=function(){if(typeof document>"u")return null;const t=document.cookie.match(new RegExp("(^|;\\s*)(XSRF-TOKEN)=([^;]*)"));return t?decodeURIComponent(t[3]):null};var p={BeforeSubscribe:"beforeSubscribe",BeforeUnsubscribe:"beforeUnsubscribe",OnReconnectAttempt:"onReconnectAttempt",OnReconnectFailed:"onReconnectFailed",OnSubscribeFailed:"onSubscribeFailed",OnSubscription:"onSubscription",OnUnsubscription:"onUnsubscription"},S,ie=class{constructor(){l(this,S,new Map)}register(t,e){var n;return i(this,S).has(t)||i(this,S).set(t,new Set),(n=i(this,S).get(t))==null||n.add(e),this}beforeSubscribe(t){var e;return(e=i(this,S).get(p.BeforeSubscribe))==null||e.forEach(n=>n(t)),this}beforeUnsubscribe(t){var e;return(e=i(this,S).get(p.BeforeUnsubscribe))==null||e.forEach(n=>n(t)),this}onReconnectAttempt(t){var e;return(e=i(this,S).get(p.OnReconnectAttempt))==null||e.forEach(n=>n(t)),this}onReconnectFailed(){var t;return(t=i(this,S).get(p.OnReconnectFailed))==null||t.forEach(e=>e()),this}onSubscribeFailed(t){var e;return(e=i(this,S).get(p.OnSubscribeFailed))==null||e.forEach(n=>n(t)),this}onSubscription(t){var e;return(e=i(this,S).get(p.OnSubscription))==null||e.forEach(n=>n(t)),this}onUnsubscription(t){var e;return(e=i(this,S).get(p.OnUnsubscription))==null||e.forEach(n=>n(t)),this}};S=new WeakMap;var U,W,O,N,v,H,R,A,F,D,z,K,dt,Q,ft,Z,pt,se=class{constructor(t){l(this,D),l(this,K),l(this,Q),l(this,Z),l(this,U,void 0),l(this,W,void 0),l(this,O,new Map),l(this,N,void 0),l(this,v,void 0),l(this,H,C.Initializing),l(this,R,void 0),l(this,A,void 0),l(this,F,0),typeof t.uidGenerator>"u"&&(t.uidGenerator=()=>crypto.randomUUID()),typeof t.eventSourceFactory>"u"&&(t.eventSourceFactory=(...e)=>new EventSource(...e)),typeof t.eventTargetFactory>"u"&&(t.eventTargetFactory=()=>new EventTarget),typeof t.httpClientFactory>"u"&&(t.httpClientFactory=(e,n)=>new re({baseUrl:e,uid:n})),typeof t.maxReconnectAttempts>"u"&&(t.maxReconnectAttempts=5),d(this,U,t.uidGenerator()),d(this,A,t.eventTargetFactory()),d(this,v,new ie),d(this,N,t.httpClientFactory(t.baseUrl,i(this,U))),t.beforeSubscribe&&i(this,v).register(p.BeforeSubscribe,t.beforeSubscribe),t.beforeUnsubscribe&&i(this,v).register(p.BeforeUnsubscribe,t.beforeUnsubscribe),t.onReconnectAttempt&&i(this,v).register(p.OnReconnectAttempt,t.onReconnectAttempt),t.onReconnectFailed&&i(this,v).register(p.OnReconnectFailed,t.onReconnectFailed),t.onSubscribeFailed&&i(this,v).register(p.OnSubscribeFailed,t.onSubscribeFailed),t.onSubscription&&i(this,v).register(p.OnSubscription,t.onSubscription),t.onUnsubscription&&i(this,v).register(p.OnUnsubscription,t.onUnsubscription),d(this,W,t),E(this,K,dt).call(this)}get uid(){return i(this,U)}subscription(t){const e=new ne({channel:t,httpClient:i(this,N),hooks:i(this,v),getEventSourceStatus:()=>i(this,H)});return i(this,O).has(t)?i(this,O).get(t):(i(this,O).set(t,e),e)}on(t,e){var n;(n=i(this,A))==null||n.addEventListener(t,e)}close(){var t;(t=i(this,R))==null||t.close()}};U=new WeakMap;W=new WeakMap;O=new WeakMap;N=new WeakMap;v=new WeakMap;H=new WeakMap;R=new WeakMap;A=new WeakMap;F=new WeakMap;D=new WeakSet;z=function(t){var e;d(this,H,t),(e=i(this,A))==null||e.dispatchEvent(new CustomEvent(t))};K=new WeakSet;dt=function(){E(this,D,z).call(this,C.Connecting);const t=new URL(`${i(this,W).baseUrl}/__transmit/events`);t.searchParams.append("uid",i(this,U)),d(this,R,i(this,W).eventSourceFactory(t,{withCredentials:!0})),i(this,R).addEventListener("message",E(this,Q,ft).bind(this)),i(this,R).addEventListener("error",E(this,Z,pt).bind(this)),i(this,R).addEventListener("open",()=>{E(this,D,z).call(this,C.Connected),d(this,F,0);for(const e of i(this,O).values())e.isCreated&&e.forceCreate()})};Q=new WeakSet;ft=function(t){const e=JSON.parse(t.data),n=i(this,O).get(e.channel);if(!(typeof n>"u"))try{n.$runHandler(e.payload)}catch(r){console.log(r)}};Z=new WeakSet;pt=function(){if(i(this,H)!==C.Reconnecting&&E(this,D,z).call(this,C.Disconnected),E(this,D,z).call(this,C.Reconnecting),i(this,v).onReconnectAttempt(i(this,F)+1),i(this,W).maxReconnectAttempts&&i(this,F)>=i(this,W).maxReconnectAttempts){i(this,R).close(),i(this,v).onReconnectFailed();return}ee(this,F)._++};const me=new se({baseUrl:X||"https://sublymus.com"});export{fe as C,ue as S,ge as a,ye as b,Yt as c,be as d,pe as e,le as f,de as g,we as h,ae as j,he as l,Se as n,me as t,ve as u};
