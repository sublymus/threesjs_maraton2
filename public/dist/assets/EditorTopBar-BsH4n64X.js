import{j as e}from"./BindToParentScroll-D8J0fSBQ.js";import{r}from"./index-BDPIBgkA.js";let j=0;function N(){return Date.now()+"_"+Number(++j+Math.trunc(Math.random()*9e9+1e6)).toString(36)}function f({mode:c,title:o,onCreate:t,onDelete:i,deteleKey:m,terme:a}){const[x,u]=r.useState(""),[s,n]=r.useState(!1),d=r.useRef(null);return e.jsxs("div",{className:"editor-top-bar",children:[e.jsx("h1",{className:"page-title",children:o}),c=="create"&&e.jsx("div",{className:"btn-ctn",children:e.jsxs("div",{className:"create",onClick:()=>{t==null||t()},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Create New"})]})}),c=="delete"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"btn-ctn",children:[s&&e.jsxs("div",{className:"cancel "+(a||""),style:{filter:a=="dark"?"#9995":""},onClick:()=>{n(!1)},children:[e.jsx("div",{className:"icon cancel",style:{filter:a=="dark"?"invert()":""}}),e.jsx("div",{className:"label",children:"Cancel"})]}),e.jsxs("div",{className:"delete "+(a||""),onClick:()=>{s?x.trim()==m&&(i==null||i()):(()=>{var l;n(!0),(l=d.current)==null||l.focus()})()},children:[e.jsx("div",{className:"icon "+(c=="delete"?s?"confirm":"delete":"lol")}),e.jsx("div",{className:"label",children:s?"Confirm":"Detele"})]})]}),s&&e.jsx("input",{ref:d,placeholder:"Id Is Required ",type:"text",onChange:l=>{u(l.currentTarget.value)}})]})]})}export{f as E,N as g};
