import{r as l}from"./index-7lYUhcAg.js";var c={exports:{}},r={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u=l,p=Symbol.for("react.element"),h=Symbol.for("react.fragment"),g=Object.prototype.hasOwnProperty,m=u.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,_={key:!0,ref:!0,__self:!0,__source:!0};function w(e,t,n){var i,o={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(i in t)g.call(t,i)&&!_.hasOwnProperty(i)&&(o[i]=t[i]);if(e&&e.defaultProps)for(i in t=e.defaultProps,t)o[i]===void 0&&(o[i]=t[i]);return{$$typeof:p,type:e,key:s,ref:a,props:o,_owner:m.current}}r.Fragment=h;r.jsx=w;r.jsxs=w;c.exports=r;var y=c.exports;const d="http://localhost:3333",S=localStorage.getItem("local")||"http://localhost:5173";function v(){const[e,t]=l.useState({width:window.innerWidth,height:window.innerHeight,screen:""});return l.useEffect(()=>{function n(){t({width:window.innerWidth,height:window.innerHeight,screen:window.innerWidth<480?"s-480":window.innerWidth<680?"s-680":window.innerWidth<920?"s-920":window.innerWidth<1200?"s-1200":window.innerWidth<1800?"s-1800":"s-big"})}return window.addEventListener("resize",n),n(),()=>window.removeEventListener("resize",n)},[]),e}const E=e=>{let t=new Date(e).toLocaleTimeString();return t=t.split(":"),`${t[0]}:${t[1]}`},W=(e,t)=>(e==null?void 0:e.length)>t?e.substring(0,t)+"..":e||"",T=(e,t="cover",n)=>`no-repeat center/${t} url(${n===!0?d:n===!1?"":e.startsWith("/")?d:""}${e})`,R=(e=.5)=>t=>{const n=t.currentTarget;n.style.opacity=String(e),setTimeout(()=>{n.style.opacity=""},100)};function $(e,t){return((t.from_id||null)===(e||null)?t.to_id:t.from_id)||null}const b=e=>{!e||e.dataset.isInit||(e.dataset.isInit="init",e.addEventListener("scroll",()=>{const t=e.scrollTop-Number(e.dataset.lastScrollTop);e.dataset.lastScrollTop=`${e.scrollTop}`,e.parentElement.scrollTop+=t*2}))},L=e=>{const t=e.getBoundingClientRect();t.x+t.width>window.innerWidth&&(e.style.left=`${window.innerWidth-t.width}px`),t.y+t.height>window.innerHeight&&(e.style.top=`${window.innerHeight-t.height}px`)};export{R as C,d as H,S as L,$ as a,b,L as c,T as g,y as j,W as l,E as t,v as u};