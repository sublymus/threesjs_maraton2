import{j as s,c as p}from"./BindToParentScroll-QW98FQNf.js";import{r as f,H as u}from"./index-CdTkmSxa.js";let N=0;function S(){return Date.now()+"_"+Number(++N+Math.trunc(Math.random()*9e9+1e6)).toString(36)}function g({mode:r,title:t,onCreate:e,onDelete:o,deteleKey:a,terme:n}){const[c,i]=f.useState(""),[l,d]=f.useState(!1),v=f.useRef(null);return s.jsxs("div",{className:"editor-top-bar",children:[s.jsx("h1",{className:"page-title",children:t}),r=="create"&&s.jsx("div",{className:"btn-ctn",children:s.jsxs("div",{className:"create",onClick:()=>{e==null||e()},children:[s.jsx("div",{className:"icon"}),s.jsx("div",{className:"label",children:"Create New"})]})}),r=="delete"&&s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"btn-ctn",children:[l&&s.jsxs("div",{className:"cancel "+(n||""),style:{filter:n=="dark"?"#9995":""},onClick:()=>{d(!1)},children:[s.jsx("div",{className:"icon cancel",style:{filter:n=="dark"?"invert()":""}}),s.jsx("div",{className:"label",children:"Cancel"})]}),s.jsxs("div",{className:"delete "+(n||""),onClick:()=>{l?c.trim()==a&&(o==null||o()):(()=>{var m;d(!0),(m=v.current)==null||m.focus()})()},children:[s.jsx("div",{className:"icon "+(r=="delete"?l?"confirm":"delete":"lol")}),s.jsx("div",{className:"label",children:l?"Confirm":"Detele"})]})]}),l&&s.jsx("input",{ref:v,placeholder:"Id Is Required ",type:"text",onChange:m=>{i(m.currentTarget.value)}})]})]})}const h=p(r=>({user:void 0,store:void 0,userStore:void 0,openAuth:!1,async updateUser({name:t,photos:e,id:o}){const a=new FormData;if(t&&a.append("name",t),e!=null&&e[0])a.append("photos_0",e[0]);else return;a.append("id",o),a.append("photos",'["photos_0"]');const c=await(await fetch(`${u}/edit_me`,{method:"POST",body:a})).json();c.id&&(r(()=>({user:{...c,photos:c.photos.map(i=>`${u}${i}`)}})),localStorage.setItem("user",JSON.stringify(c)))},async disconnection(){const t=h.getState().getHeaders();if(!t)return;const e={method:"GET",headers:t.headers};await fetch(`${u}/disconnection`,e),localStorage.removeItem("user"),localStorage.removeItem("store_name"),r(()=>({user:void 0,store:void 0,userStore:void 0,openAuth:!0}))},async getAccess(){window.open(`${u}/google_connexion`,void 0,"popup");const t=setInterval(()=>{const e=localStorage.getItem("user"),o=e&&JSON.parse(e);o&&(console.log("getAccess",{token:o.token}),r(()=>({user:o})),clearInterval(t),h.getState().authenticateUser())},100)},async authenticateUser(){let t=localStorage.getItem("user");const e=localStorage.getItem("store_name")||window.location.pathname.split("/")[1];if(t){const o=JSON.parse(t),a=new Headers;a.append("Authorization",`Bearer ${o.token}`);const n={method:"GET",headers:a},c=await fetch(`${u}/can_manage_store/${e}`,n);let i;const l=()=>{localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))};try{if(i=await c.json(),!i.user)return l()}catch{return l()}const d={...o,...i.user};r(()=>({user:d,userStore:i.userStore,store:i.store,openAuth:!1})),localStorage.setItem("user",JSON.stringify(d))}else localStorage.removeItem("user"),localStorage.removeItem("store"),r(()=>({user:void 0,userStore:void 0,store:void 0,openAuth:!0}))},getHeaders(){const t=h.getState().store;if(!t)return;let e=h.getState().user;if(!e)return;const o=new Headers;return o.append("Authorization",`Bearer ${e.token}`),{headers:o,user:e,store:t}}}));function k({setPage:r,limit:t,page:e,total:o}){t=Number(t),e=Number(e),o=Number(o);const a=Math.ceil(o/t),n=[];return e>3&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(1)},children:"1"},"a")),e-4>0&&n.push(s.jsx("div",{className:"page",children:"..."},"b")),e-2>0&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(e-2)},children:e-2},"c")),e-1>0&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(e-1)},children:e-1},"d")),n.push(s.jsx("div",{className:"page active",children:e},"e")),e+1<a&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(e+1)},children:e+1},"f")),e+2<a&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(e+2)},children:e+2},"g")),e+4<=a&&n.push(s.jsx("div",{className:"page",children:"..."},"h")),e<a&&n.push(s.jsx("div",{className:"page",onClick:()=>{r(a)},children:a},"i")),s.jsxs("div",{className:"list-paging",children:[s.jsx("div",{className:"change",onClick:()=>{e-1>=1&&r(e-1)},children:"Prev"}),n,s.jsx("div",{className:"change",onClick:()=>{e+1<=a&&r(e+1)},children:"Next"})]})}export{g as E,k as L,S as g,h as u};
