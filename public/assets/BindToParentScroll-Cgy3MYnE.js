var C=Object.defineProperty;var k=(e,t,n)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var w=(e,t,n)=>(k(e,typeof t!="symbol"?t+"":t,n),n);import{r as f,g as H,R as U,H as _}from"./index-lqvfxOtW.js";var R={exports:{}},y={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var A=f,V=Symbol.for("react.element"),z=Symbol.for("react.fragment"),N=Object.prototype.hasOwnProperty,q=A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,B={key:!0,ref:!0,__self:!0,__source:!0};function $(e,t,n){var r,i={},o=null,s=null;n!==void 0&&(o=""+n),t.key!==void 0&&(o=""+t.key),t.ref!==void 0&&(s=t.ref);for(r in t)N.call(t,r)&&!B.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:V,type:e,key:o,ref:s,props:i,_owner:q.current}}y.Fragment=z;y.jsx=$;y.jsxs=$;R.exports=y;var bt=R.exports,F={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const P=e=>{let t;const n=new Set,r=(a,d)=>{const v=typeof a=="function"?a(t):a;if(!Object.is(v,t)){const h=t;t=d??(typeof v!="object"||v===null)?v:Object.assign({},t,v),n.forEach(S=>S(t,h))}},i=()=>t,u={setState:r,getState:i,getInitialState:()=>l,subscribe:a=>(n.add(a),()=>n.delete(a)),destroy:()=>{(F?"production":void 0)!=="production"&&console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected."),n.clear()}},l=t=e(r,i,u);return u},J=e=>e?P(e):P;var T={exports:{}},I={},j={exports:{}},D={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var g=f;function M(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Y=typeof Object.is=="function"?Object.is:M,G=g.useState,K=g.useEffect,Q=g.useLayoutEffect,X=g.useDebugValue;function Z(e,t){var n=t(),r=G({inst:{value:n,getSnapshot:t}}),i=r[0].inst,o=r[1];return Q(function(){i.value=n,i.getSnapshot=t,E(i)&&o({inst:i})},[e,n,t]),K(function(){return E(i)&&o({inst:i}),e(function(){E(i)&&o({inst:i})})},[e]),X(n),n}function E(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Y(e,n)}catch{return!0}}function tt(e,t){return t()}var et=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?tt:Z;D.useSyncExternalStore=g.useSyncExternalStore!==void 0?g.useSyncExternalStore:et;j.exports=D;var nt=j.exports;/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=f,rt=nt;function ot(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var it=typeof Object.is=="function"?Object.is:ot,st=rt.useSyncExternalStore,ct=m.useRef,ut=m.useEffect,at=m.useMemo,lt=m.useDebugValue;I.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var o=ct(null);if(o.current===null){var s={hasValue:!1,value:null};o.current=s}else s=o.current;o=at(function(){function u(h){if(!l){if(l=!0,a=h,h=r(h),i!==void 0&&s.hasValue){var S=s.value;if(i(S,h))return d=S}return d=h}if(S=d,it(a,h))return S;var b=r(h);return i!==void 0&&i(S,b)?S:(a=h,d=b)}var l=!1,a,d,v=n===void 0?null:n;return[function(){return u(t())},v===null?void 0:function(){return u(v())}]},[t,n,r,i]);var c=st(e,o[0],o[1]);return ut(function(){s.hasValue=!0,s.value=c},[c]),lt(c),c};T.exports=I;var dt=T.exports;const ht=H(dt);var W={BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{useDebugValue:ft}=U,{useSyncExternalStoreWithSelector:pt}=ht;let L=!1;const vt=e=>e;function St(e,t=vt,n){(W?"production":void 0)!=="production"&&n&&!L&&(console.warn("[DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'. https://github.com/pmndrs/zustand/discussions/1937"),L=!0);const r=pt(e.subscribe,e.getState,e.getServerState||e.getInitialState,t,n);return ft(r),r}const O=e=>{(W?"production":void 0)!=="production"&&typeof e!="function"&&console.warn("[DEPRECATED] Passing a vanilla store will be unsupported in a future version. Instead use `import { useStore } from 'zustand'`.");const t=typeof e=="function"?J(e):e,n=(r,i)=>St(t,r,i);return Object.assign(n,t),n},gt=e=>e?O(e):O;function wt(e){return()=>{e()}}const yt=e=>{let t=window.location.hash;if(!t)return{pathList:(e==null?void 0:e.defaultPath)||["/"],json:{}};t=decodeURIComponent(t.slice(1,t.length));let n="",r="",i;if(t.includes("=")){const s=t.indexOf("=");n=t.substring(0,s),r=t.substring(s+1,t.length);try{i=r&&JSON.parse(r)}catch{console.warn("Url to JSON error")}}else n=t;return{pathList:["/",...n.split("/")],json:i}};let p={};class _t{constructor(t,n){w(this,"isInitialized",!1);w(this,"listener",null);w(this,"store");this.pages=t,this.defaultPath=n;const r=this;this.store=gt(i=>({Pages:t,json:void 0,navHistory:[],pathList:r.defaultPath||["/"],current(...o){const s=r.store.getState().pathList;return o.includes(s[s.length-1])||void 0},init(){r.isInitialized||(r.listener=()=>{const o=yt(r);i(()=>o)},window.addEventListener("hashchange",wt(r.listener)),r.listener(),r.isInitialized=!0)},navNext(){console.log("navNext"),history.forward()},qs(o){return p=Object.keys(o||{}).length>0?o:void 0,{...r.store.getState(),apply(){r.store.getState().setAbsPath(r.store.getState().pathList.slice(1))},get(){return r.store.getState().setAbsPath(r.store.getState().pathList.slice(1),!0)},keepJson(){return p=r.store.getState().json,r.store.getState()}}},navBack(){history.back()},setPath(...o){r.editPath(o),p=void 0},exist(...o){let s=t["/"];for(const c of o){const u=s[c];if(!u){console.log("not existe");return}s=u}return!0},setAbsPath(o,s){let c=["/"],u=t["/"];for(const a of o){const d=u[a];if(!d){r.navHistoryUpdate(c,s);return}u=d,c.push(a)}const l=r.navHistoryUpdate(c,s);return p=void 0,l},check(...o){for(const s of o)if(mt(s,t,r))return!0}}))}getPages(){return this.pages}getStore(){return this.store.getState().init(),this.store}navHistoryUpdate(t,n){console.log("navHistoryUpdate"),p=Object.keys(p||{}).length>0?p:void 0;let r=t.join("/").replace("//","");try{p&&(r+="="+JSON.stringify(p))}catch{}if(n)return r;window.location.hash!==r&&(window.location.hash=r)}editPath(t){if(t[0]==="/"){let c=[],u=this.pages;try{for(const l of t){const a=u[l];if(a===null){this.navHistoryUpdate(c);return}else if(a===void 0){console.error(" Error Path don't exist");return}u=a,c.push(l)}}catch{return}this.navHistoryUpdate(c);return}t[0]==="./"&&t.shift();let n=1;if(t[0]==="../"){for(const c of t)if(c=="../")n++;else break;t=t.slice(n-1,t.length)}const r=[...this.store.getState().pathList],i=r.length-n,o=r.splice(0,i<0?0:i);if(o[0]!=="/")return console.error("//Error  Path don't exist  L :",o);o.length==0&&o.push("/");let s=[...o,...t];if(s.length>0){let c=this.pages;for(const u of s){const l=c[u];if(l===null)return console.error("error Component detected  c==null ",s,u);if(l===void 0)return console.error("// Path don't exist  c == undefined",s,u);c=l}this.navHistoryUpdate(s)}}}function mt(e,t,n){try{let r=t;const i=[...n.store.getState().pathList];return i.includes(e)?!0:(()=>{for(const c of i){const u=r[c];if(u&&u[e]===null)return!0;if(u===void 0)return;r=u}})()}catch{return}}const Pt=e=>{let t=new Date(e).toLocaleTimeString();return t=t.split(":"),`${t[0]}:${t[1]}`},Lt=(e,t)=>(e==null?void 0:e.length)>t?e.substring(0,t)+"..":e||"",Ot=(e,t="cover",n)=>`no-repeat center/${t} url(${n===!0?_:n===!1?"":e.startsWith("/")?_:""}${e})`,Rt=(e=.5)=>t=>{const n=t.currentTarget;n.style.opacity=String(e),setTimeout(()=>{n.style.opacity=""},100)};function $t(e,t){return((t.from_id||null)===(e||null)?t.to_id:t.from_id)||null}const x={};function Tt(e){if(x[e])return x[e];const t=((e.charCodeAt(0)||0)%32+(e.charCodeAt(1)||0)%32+(e.charCodeAt(2)||0)%32)/(32*3);return x[e]=`hsl(${255*t}, 100%, 71%)`}function It(){const[e,t]=f.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return f.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),e}function jt(){const[e,t]=f.useState();return f.useEffect(()=>{navigator.permissions.query({name:"notifications"}).then(n=>{n.addEventListener("change",()=>{t(n.state)}),t(n.state)})},[]),e}function Dt(e,t,n){const[r,i]=f.useState(!1),[o]=f.useState({rect:new DOMRect,id:0,init(){clearInterval(this.id);const s=setInterval(()=>{if(!e.current)return;const c=e.current.getBoundingClientRect(),u=c.x<window.innerWidth&&c.x+c.width>0,a=c.y<window.innerHeight&&c.y+c.height>0&&u;i(a)},t);return()=>clearInterval(s)},remove(){clearInterval(this.id)}});return f.useEffect(()=>(n?o.init():o.remove(),o.remove()),[n]),r}const Wt=e=>{!e||e.dataset.isInit||(e.dataset.isInit="init",e.addEventListener("scroll",()=>{const t=e.scrollTop-Number(e.dataset.lastScrollTop);e.dataset.lastScrollTop=`${e.scrollTop}`,e.parentElement.scrollTop+=t*2}))},Ct=e=>{const t=e.getBoundingClientRect();t.x+t.width>window.innerWidth&&(e.style.left=`${window.innerWidth-t.width}px`),t.y+t.height>window.innerHeight&&(e.style.top=`${window.innerHeight-t.height}px`)},kt=(e,t)=>n=>{if(!n||n.dataset.isInit)return;n.dataset.isInit="init";const r=document.querySelector(t);if(!r)return;let i=0;r.addEventListener("scroll",()=>{let o=r.scrollTop-Number(n.dataset.lastScrollTop||0);o*=2,n.dataset.lastScrollTop=r.scrollTop+"";const s=o+i>e?e:o+i<0?0:o+i;i=s,n.style.top=`${-s}px`})};export{Rt as C,Tt as L,_t as S,Dt as a,kt as b,gt as c,Wt as d,$t as e,Ct as f,Ot as g,bt as j,Lt as l,jt as n,Pt as t,It as u};
