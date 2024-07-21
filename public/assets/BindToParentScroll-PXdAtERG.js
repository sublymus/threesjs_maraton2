var W=Object.defineProperty;var k=(e,t,n)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var w=(e,t,n)=>(k(e,typeof t!="symbol"?t+"":t,n),n);import{r as h,g as H,R as U,H as x}from"./index-CPie5Has.js";var $={exports:{}},y={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C=h,V=Symbol.for("react.element"),z=Symbol.for("react.fragment"),A=Object.prototype.hasOwnProperty,N=C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,q={key:!0,ref:!0,__self:!0,__source:!0};function L(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)A.call(t,r)&&!q.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:V,type:e,key:o,ref:s,props:i,_owner:N.current}}y.Fragment=z;y.jsx=L;y.jsxs=L;$.exports=y;var bt=$.exports,B={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const _=e=>{let t;const n=new Set,r=(a,d)=>{const p=typeof a=="function"?a(t):a;if(!Object.is(p,t)){const f=t;t=d??(typeof p!="object"||p===null)?p:Object.assign({},t,p),n.forEach(v=>v(t,f))}},i=()=>t,c={setState:r,getState:i,getInitialState:()=>l,subscribe:a=>(n.add(a),()=>n.delete(a)),destroy:()=>{(B?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},l=t=e(r,i,c);return c},F=e=>e?_(e):_;var O={exports:{}},T={},I={exports:{}},j={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=h;function J(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var M=typeof Object.is=="function"?Object.is:J,Y=g.useState,G=g.useEffect,K=g.useLayoutEffect,Q=g.useDebugValue;function X(e,t){var n=t(),r=Y({inst:{value:n,getSnapshot:t}}),i=r[0].inst,o=r[1];return K(function(){i.value=n,i.getSnapshot=t,E(i)&&o({inst:i})},[e,n,t]),G(function(){return E(i)&&o({inst:i}),e(function(){E(i)&&o({inst:i})})},[e]),Q(n),n}function E(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!M(e,n)}catch{return!0}}function Z(e,t){return t()}var tt=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Z:X;j.useSyncExternalStore=g.useSyncExternalStore!==void 0?g.useSyncExternalStore:tt;I.exports=j;var et=I.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=h,nt=et;function rt(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:rt,it=nt.useSyncExternalStore,st=m.useRef,ut=m.useEffect,ct=m.useMemo,at=m.useDebugValue;T.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var o=st(null);if(o.current===null){var s={hasValue:!1,value:null};o.current=s}else s=o.current;o=ct(function(){function c(f){if(!l){if(l=!0,a=f,f=r(f),i!==void 0&&s.hasValue){var v=s.value;if(i(v,f))return d=v}return d=f}if(v=d,ot(a,f))return v;var b=r(f);return i!==void 0&&i(v,b)?v:(a=f,d=b)}var l=!1,a,d,p=n===void 0?null:n;return[function(){return c(t())},p===null?void 0:function(){return c(p())}]},[t,n,r,i]);var u=it(e,o[0],o[1]);return ut(function(){s.hasValue=!0,s.value=u},[u]),at(u),u};O.exports=T;var lt=O.exports;const dt=H(lt);var D={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{useDebugValue:ft}=U,{useSyncExternalStoreWithSelector:ht}=dt;let P=!1;const pt=e=>e;function vt(e,t=pt,n){(D?"production":void 0)!=="production"&&n&&!P&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),P=!0);const r=ht(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return ft(r),r}const R=e=>{(D?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?F(e):e,n=(r,i)=>vt(t,r,i);return Object.assign(n,t),n},St=e=>e?R(e):R;function gt(e){return()=>{e()}}const wt=e=>{let t=window.location.hash;if(!t)return{pathList:(e==null?void 0:e.defaultPath)||["/"],json:{}};t=decodeURIComponent(t.slice(1,t.length));let n="",r="",i;if(t.includes("=")){const s=t.indexOf("=");n=t.substring(0,s),r=t.substring(s+1,t.length);try{i=r&&JSON.parse(r)}catch{console.warn("Url to JSON error")}}else n=t;return console.log("suspect 2"),{pathList:["/",...n.split("/")],json:i}};let S={};class xt{constructor(t,n){w(this,"isInitialized",!1);w(this,"listener",null);w(this,"store");this.pages=t,this.defaultPath=n;const r=this;this.store=St(i=>({Pages:t,json:{},navHistory:[],pathList:r.defaultPath||["/"],current(...o){const s=r.store.getState().pathList;return o.includes(s[s.length-1])||void 0},init(){r.isInitialized||(r.listener=()=>{const o=wt(r);i(()=>o)},window.addEventListener("hashchange",gt(r.listener)),r.listener(),r.isInitialized=!0)},navNext(){console.log("navNext"),history.forward()},qs(o){return S=o,{...r.store.getState(),apply(){r.store.getState().setAbsPath(r.store.getState().pathList.slice(1))},get(){return r.store.getState().setAbsPath(r.store.getState().pathList.slice(1),!0)},keepJson(){return S=r.store.getState().json,r.store.getState()}}},navBack(){history.back()},setPath(...o){r.editPath(o),S=void 0},exist(...o){let s=t["/"];for(const u of o){const c=s[u];if(!c){console.log("not existe");return}s=c}return!0},setAbsPath(o,s){let u=["/"],c=t["/"];for(const a of o){const d=c[a];if(!d){r.navHistoryUpdate(u,s);return}c=d,u.push(a)}const l=r.navHistoryUpdate(u,s);return S=void 0,l},check(...o){for(const s of o)if(yt(s,t,r))return!0}}))}getPages(){return this.pages}getStore(){return this.store.getState().init(),this.store}navHistoryUpdate(t,n){console.log("navHistoryUpdate");let r=t.join("/").replace("//","");try{S&&(r+="="+JSON.stringify(S))}catch{}if(n)return r;window.location.hash!==r&&(window.location.hash=r)}editPath(t){if(t[0]==="/"){let u=[],c=this.pages;try{for(const l of t){const a=c[l];if(a===null){this.navHistoryUpdate(u);return}else if(a===void 0){console.error(" Error Path don't exist");return}c=a,u.push(l)}}catch{return}this.navHistoryUpdate(u);return}t[0]==="./"&&t.shift();let n=1;if(t[0]==="../"){for(const u of t)if(u=="../")n++;else break;t=t.slice(n-1,t.length)}const r=[...this.store.getState().pathList],i=r.length-n,o=r.splice(0,i<0?0:i);if(o[0]!=="/")return console.error("//Error  Path don't exist  L :",o);o.length==0&&o.push("/");let s=[...o,...t];if(s.length>0){let u=this.pages;for(const c of s){const l=u[c];if(l===null)return console.error("error Component detected  c==null ",s,c);if(l===void 0)return console.error("// Path don't exist  c == undefined",s,c);u=l}this.navHistoryUpdate(s)}}}function yt(e,t,n){try{let r=t;const i=[...n.store.getState().pathList];return i.includes(e)?!0:(()=>{for(const u of i){const c=r[u];if(c&&c[e]===null)return!0;if(c===void 0)return;r=c}})()}catch{return}}const _t=e=>{let t=new Date(e).toLocaleTimeString();return t=t.split(":"),`${t[0]}:${t[1]}`},Pt=(e,t)=>(e==null?void 0:e.length)>t?e.substring(0,t)+"..":e||"",Rt=(e,t="cover",n)=>`no-repeat center/${t} url(${n===!0?x:n===!1?"":e.startsWith("/")?x:""}${e})`,$t=(e=.5)=>t=>{const n=t.currentTarget;n.style.opacity=String(e),setTimeout(()=>{n.style.opacity=""},100)};function Lt(e,t){return((t.from_id||null)===(e||null)?t.to_id:t.from_id)||null}function Ot(){const[e,t]=h.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return h.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),e}function Tt(){const[e,t]=h.useState();return h.useEffect(()=>{navigator.permissions.query({name:"notifications"}).then(n=>{n.addEventListener("change",()=>{t(n.state)}),t(n.state)})},[]),e}function It(e,t,n){const[r,i]=h.useState(!1),[o]=h.useState({rect:new DOMRect,id:0,init(){clearInterval(this.id);const s=setInterval(()=>{if(!e.current)return;const u=e.current.getBoundingClientRect(),c=u.x<window.innerWidth&&u.x+u.width>0,a=u.y<window.innerHeight&&u.y+u.height>0&&c;i(a)},t);return()=>clearInterval(s)},remove(){clearInterval(this.id)}});return h.useEffect(()=>(n?o.init():o.remove(),o.remove()),[n]),r}const jt=e=>{!e||e.dataset.isInit||(e.dataset.isInit="init",e.addEventListener("scroll",()=>{const t=e.scrollTop-Number(e.dataset.lastScrollTop);e.dataset.lastScrollTop=`${e.scrollTop}`,e.parentElement.scrollTop+=t*2}))},Dt=e=>{const t=e.getBoundingClientRect();t.x+t.width>window.innerWidth&&(e.style.left=`${window.innerWidth-t.width}px`),t.y+t.height>window.innerHeight&&(e.style.top=`${window.innerHeight-t.height}px`)},Wt=(e,t)=>n=>{if(!n||n.dataset.isInit)return;n.dataset.isInit="init";const r=document.querySelector(t);if(!r)return;let i=0;r.addEventListener("scroll",()=>{let o=r.scrollTop-Number(n.dataset.lastScrollTop||0);o*=2,n.dataset.lastScrollTop=r.scrollTop+"";const s=o+i>e?e:o+i<0?0:o+i;i=s,n.style.top=`${-s}px`})};export{$t as C,xt as S,It as a,Wt as b,St as c,jt as d,Lt as e,Dt as f,Rt as g,bt as j,Pt as l,Tt as n,_t as t,Ot as u};
