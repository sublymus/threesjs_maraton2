var U=Object.defineProperty;var T=(e,t,n)=>t in e?U(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var g=(e,t,n)=>(T(e,typeof t!="symbol"?t+"":t,n),n);import{r as _,g as C,R as A,H as x}from"./index-B46Wt8w4.js";var R={exports:{}},y={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var H=_,N=Symbol.for("react.element"),V=Symbol.for("react.fragment"),q=Object.prototype.hasOwnProperty,W=H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,z={key:!0,ref:!0,__self:!0,__source:!0};function j(e,t,n){var r,s={},o=null,i=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(i=t.ref);for(r in t)q.call(t,r)&&!z.hasOwnProperty(r)&&(s[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)s[r]===void 0&&(s[r]=t[r]);return{$$typeof:N,type:e,key:o,ref:i,props:s,_owner:W.current}}y.Fragment=V;y.jsx=j;y.jsxs=j;R.exports=y;var wt=R.exports,B={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const P=e=>{let t;const n=new Set,r=(a,f)=>{const h=typeof a=="function"?a(t):a;if(!Object.is(h,t)){const d=t;t=f??(typeof h!="object"||h===null)?h:Object.assign({},t,h),n.forEach(p=>p(t,d))}},s=()=>t,c={setState:r,getState:s,getInitialState:()=>l,subscribe:a=>(n.add(a),()=>n.delete(a)),destroy:()=>{(B?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},l=t=e(r,s,c);return c},F=e=>e?P(e):P;var $={exports:{}},D={},L={exports:{}},I={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S=_;function J(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var M=typeof Object.is=="function"?Object.is:J,Y=S.useState,G=S.useEffect,K=S.useLayoutEffect,Q=S.useDebugValue;function X(e,t){var n=t(),r=Y({inst:{value:n,getSnapshot:t}}),s=r[0].inst,o=r[1];return K(function(){s.value=n,s.getSnapshot=t,m(s)&&o({inst:s})},[e,n,t]),G(function(){return m(s)&&o({inst:s}),e(function(){m(s)&&o({inst:s})})},[e]),Q(n),n}function m(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!M(e,n)}catch{return!0}}function Z(e,t){return t()}var tt=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?Z:X;I.useSyncExternalStore=S.useSyncExternalStore!==void 0?S.useSyncExternalStore:tt;L.exports=I;var et=L.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=_,rt=et;function nt(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ot=typeof Object.is=="function"?Object.is:nt,st=rt.useSyncExternalStore,it=E.useRef,ut=E.useEffect,ct=E.useMemo,at=E.useDebugValue;D.useSyncExternalStoreWithSelector=function(e,t,n,r,s){var o=it(null);if(o.current===null){var i={hasValue:!1,value:null};o.current=i}else i=o.current;o=ct(function(){function c(d){if(!l){if(l=!0,a=d,d=r(d),s!==void 0&&i.hasValue){var p=i.value;if(s(p,d))return f=p}return f=d}if(p=f,ot(a,d))return p;var w=r(d);return s!==void 0&&s(p,w)?p:(a=d,f=w)}var l=!1,a,f,h=n===void 0?null:n;return[function(){return c(t())},h===null?void 0:function(){return c(h())}]},[t,n,r,s]);var u=st(e,o[0],o[1]);return ut(function(){i.hasValue=!0,i.value=u},[u]),at(u),u};$.exports=D;var lt=$.exports;const ft=C(lt);var k={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{useDebugValue:dt}=A,{useSyncExternalStoreWithSelector:ht}=ft;let b=!1;const pt=e=>e;function vt(e,t=pt,n){(k?"production":void 0)!=="production"&&n&&!b&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),b=!0);const r=ht(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return dt(r),r}const O=e=>{(k?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?F(e):e,n=(r,s)=>vt(t,r,s);return Object.assign(n,t),n},St=e=>e?O(e):O;function gt(e){return()=>{e()}}const yt=e=>{let t=window.location.hash;if(!t)return{pathList:(e==null?void 0:e.defaultPath)||["/"],json:{}};t=decodeURIComponent(t.slice(1,t.length));let n="",r="",s;if(t.includes("=")){const i=t.indexOf("=");n=t.substring(0,i),r=t.substring(i+1,t.length);try{s=r&&JSON.parse(r)}catch{console.warn("Url to JSON error")}}else n=t;return console.log("suspect 2"),{pathList:["/",...n.split("/")],json:s}};let v={};class xt{constructor(t,n){g(this,"isInitialized",!1);g(this,"listener",null);g(this,"store");this.pages=t,this.defaultPath=n;const r=this;this.store=St(s=>({Pages:t,json:{},navHistory:[],pathList:r.defaultPath||["/"],current(...o){const i=r.store.getState().pathList;return o.includes(i[i.length-1])||void 0},init(){r.isInitialized||(r.listener=()=>{const o=yt(r);s(()=>o)},window.addEventListener("hashchange",gt(r.listener)),r.listener(),r.isInitialized=!0)},navNext(){console.log("navNext"),history.forward()},qs(o){return v=o,{...r.store.getState(),apply(){r.store.getState().setAbsPath(r.store.getState().pathList.slice(1))},get(){return r.store.getState().setAbsPath(r.store.getState().pathList.slice(1),!0)},keepJson(){return v=r.store.getState().json,r.store.getState()}}},navBack(){history.back()},setPath(...o){r.editPath(o),v=void 0},exist(...o){let i=t["/"];for(const u of o){const c=i[u];if(!c){console.log("not existe");return}i=c}return!0},setAbsPath(o,i){let u=["/"],c=t["/"];for(const a of o){const f=c[a];if(!f){r.navHistoryUpdate(u,i);return}c=f,u.push(a)}const l=r.navHistoryUpdate(u,i);return v=void 0,l},check(...o){for(const i of o)if(Et(i,t,r))return!0}}))}getPages(){return this.pages}getStore(){return this.store.getState().init(),this.store}navHistoryUpdate(t,n){console.log("navHistoryUpdate");let r=t.join("/").replace("//","");try{v&&(r+="="+JSON.stringify(v))}catch{}if(n)return r;window.location.hash!==r&&(window.location.hash=r)}editPath(t){if(t[0]==="/"){let u=[],c=this.pages;try{for(const l of t){const a=c[l];if(a===null){this.navHistoryUpdate(u);return}else if(a===void 0){console.error(" Error Path don't exist");return}c=a,u.push(l)}}catch{return}this.navHistoryUpdate(u);return}t[0]==="./"&&t.shift();let n=1;if(t[0]==="../"){for(const u of t)if(u=="../")n++;else break;t=t.slice(n-1,t.length)}const r=[...this.store.getState().pathList],s=r.length-n,o=r.splice(0,s<0?0:s);if(o[0]!=="/")return console.error("//Error  Path don't exist  L :",o);o.length==0&&o.push("/");let i=[...o,...t];if(i.length>0){let u=this.pages;for(const c of i){const l=u[c];if(l===null)return console.error("error Component detected  c==null ",i,c);if(l===void 0)return console.error("// Path don't exist  c == undefined",i,c);u=l}this.navHistoryUpdate(i)}}}function Et(e,t,n){try{let r=t;const s=[...n.store.getState().pathList];return s.includes(e)?!0:(()=>{for(const u of s){const c=r[u];if(c&&c[e]===null)return!0;if(c===void 0)return;r=c}})()}catch{return}}const Pt=e=>{let t=new Date(e).toLocaleTimeString();return t=t.split(":"),`${t[0]}:${t[1]}`},bt=(e,t)=>(e==null?void 0:e.length)>t?e.substring(0,t)+"..":e||"",Ot=(e,t="cover",n)=>`no-repeat center/${t} url(${n===!0?x:n===!1?"":e.startsWith("/")?x:""}${e})`,Rt=(e=.5)=>t=>{const n=t.currentTarget;n.style.opacity=String(e),setTimeout(()=>{n.style.opacity=""},100)};function jt(e,t){return((t.from_id||null)===(e||null)?t.to_id:t.from_id)||null}export{Rt as C,xt as S,jt as a,St as c,Ot as g,wt as j,bt as l,Pt as t};
