import{r as d,H as a}from"./index-dj9LTZyW.js";var c={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=d,w=Symbol.for("react.element"),h=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,y=p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function u(e,t,n){var i,o={},r=null,s=null;n!==void 0&&(r=""+n),t.key!==void 0&&(r=""+t.key),t.ref!==void 0&&(s=t.ref);for(i in t)m.call(t,i)&&!_.hasOwnProperty(i)&&(o[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)o[i]===void 0&&(o[i]=t[i]);return{$$typeof:w,type:e,key:r,ref:s,props:o,_owner:y.current}}l.Fragment=h;l.jsx=u;l.jsxs=u;c.exports=l;var S=c.exports;const T=e=>{let t=new Date(e).toLocaleTimeString();return t=t.split(":"),`${t[0]}:${t[1]}`},f=(e,t)=>(e==null?void 0:e.length)>t?e.substring(0,t)+"..":e||"",v=(e,t="cover",n)=>`no-repeat center/${t} url(${n===!0?a:n===!1?"":e.startsWith("/")?a:""}${e})`,E=(e=.5)=>t=>{const n=t.currentTarget;n.style.opacity=String(e),setTimeout(()=>{n.style.opacity=""},100)};function W(e,t){return((t.from_id||null)===(e||null)?t.to_id:t.from_id)||null}function b(){const[e,t]=d.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return d.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),e}const $=e=>{!e||e.dataset.isInit||(e.dataset.isInit="init",e.addEventListener("scroll",()=>{const t=e.scrollTop-Number(e.dataset.lastScrollTop);e.dataset.lastScrollTop=`${e.scrollTop}`,e.parentElement.scrollTop+=t*2}))},R=e=>{const t=e.getBoundingClientRect();t.x+t.width>window.innerWidth&&(e.style.left=`${window.innerWidth-t.width}px`),t.y+t.height>window.innerHeight&&(e.style.top=`${window.innerHeight-t.height}px`)},x=(e,t)=>n=>{if(!n||n.dataset.isInit)return;n.dataset.isInit="init";const i=document.querySelector(t);if(!i)return;let o=0;i.addEventListener("scroll",()=>{let r=i.scrollTop-Number(n.dataset.lastScrollTop||0);r*=2,n.dataset.lastScrollTop=i.scrollTop+"";const s=r+o>e?e:r+o<0?0:r+o;console.log(o,r,s),o=s,n.style.top=`${-s}px`})};export{E as C,x as a,$ as b,W as c,R as d,v as g,S as j,f as l,T as t,b as u};
