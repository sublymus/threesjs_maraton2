import{j as e,g as w,u as q,b as X,a as G}from"./BindToParentScroll-B3nENIbt.js";import{c as V,S as K,H as $,r as p,L as T,R as Q}from"./index-DmqCXjPw.js";import{g as Z,E as ee}from"./EditorTopBar-FjyzC8y2.js";const se={"/":{new_store:{},edit_store:{},home:{},about:{},stores:{},contact:{},store_list:{}}},f=V(a=>({owner:void 0,stores:void 0,selectedStore:void 0,currentChild:void 0,back_color:"",blur:!1,async exist(s){return(await(await fetch(`${$}/check_store/?store_name=${s}`)).json()).exist==!0},async setStoreById(s){var o,n;const t=(o=f.getState().stores)==null?void 0:o.list.find(u=>u.id==s);if(t)return a(()=>({selectedStore:t}));{const u=(n=await f.getState().fetchStores({text:"#"+s}))==null?void 0:n.list[0];if(u)return a(()=>({selectedStore:u}))}},async fetchStores(s){const t=f.getState().owner;if(!t)return;s.owner_id=t.id,console.log({filter:s});const o=new URLSearchParams({});for(const l in s){const r=s[l];o.set(l,r)}const n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const c=await(await fetch(`${$}/get_stores/?${o}`,{headers:n})).json();if(c!=null&&c.list)return a(()=>({stores:c})),c},openChild(s,t,o){a(()=>({currentChild:s,blur:t,back_color:s&&o||""}))},async deleteStore(s){const t=f.getState().owner;if(!t)return!1;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n={method:"DELETE",headers:o},u=await fetch(`${$}/delete_store/${s}`,n);try{const c=await u.json();return f.getState().owner_stores({}),c==null?void 0:c.deleted}catch{return!1}},setSelectedStore(s){a(()=>({selectedStore:s}))},async disconnection(){const s=f.getState().owner;if(s){const t=new Headers;t.append("Authorization",`Bearer ${s.token}`);const o={method:"GET",headers:t};await fetch(`${$}/disconnection`,o)}localStorage.removeItem("user"),a(()=>({owner:void 0,stores:void 0,selectedStore:void 0}))},async tryToken(){const s=localStorage.getItem("user");if(!s)return;const t=JSON.parse(s),o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n={method:"GET",headers:o};let c=await(await fetch(`${$}/me`,n)).json();if(!(c!=null&&c.id))return localStorage.removeItem("user");f.getState().owner_stores({}),c={token:t.token,...c},a(()=>({owner:c})),localStorage.setItem("user",JSON.stringify(c))},async owner_stores(s){const t=f.getState().owner;if(!t)return;s.owner_id=t.id;const o=new URLSearchParams({});for(const l in s){const r=s[l];o.set(l,r)}const n=new Headers;n.append("Authorization",`Bearer ${t.token}`);const c=await(await fetch(`${$}/get_stores/?${o}`,{headers:n})).json();if(c!=null&&c.list)return console.log(c.list),a(()=>({stores:c})),c},async editStore(s){const t=f.getState().owner;if(!t)return;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n=new FormData;Object.keys(s).forEach((l,r)=>{console.log("data",r,l,s[l]),l=="banners"?s[l].file?(console.log("new File",s[l].file),n.append(l,JSON.stringify(["banners_0"])),n.append("banners_0",s[l].file)):s[l].url&&(n.append(l,JSON.stringify([s[l].url])),console.log("keep same",JSON.stringify(s[l]))):l=="logo"?s[l].file?(console.log("new File",s[l].file),n.append(l,JSON.stringify(["logo_0"])),n.append("logo_0",s[l].file)):s[l].url&&(n.append(l,JSON.stringify([s[l].url])),console.log("keep same",JSON.stringify(s[l]))):n.append(l,s[l])});const u={method:"PUT",body:n,headers:o},c=await fetch(`${$}/update_store`,u);try{const l=await c.json();return f.getState().owner_stores({}),l}catch(l){console.log(l.message);return}},async createStore(s){try{const t=f.getState().owner;if(!t)return;const o=new Headers;o.append("Authorization",`Bearer ${t.token}`);const n=new FormData;console.log(s),Object.keys(s).forEach(r=>{r=="logo"&&(n.append(r,JSON.stringify(["logo_0"])),n.append("logo_0",s[r].file)),r=="banners"?(n.append(r,JSON.stringify(["banners_0"])),n.append("banners_0",s[r].file)):n.append(r,s[r])});const u={method:"POST",body:n,headers:o},l=await(await fetch(`${$}/create_store`,u)).json();return f.getState().owner_stores({}),l}catch(t){return t}},async createOwner(){window.open(`${$}/google_connexion`,void 0,"popup");const s=setInterval(()=>{const t=localStorage.getItem("user"),o=t&&JSON.parse(t);o&&(a(()=>({owner:o})),clearInterval(s),f.getState().owner_stores({}),D.getState().setAbsPath(["store_list"]))},100)}})),D=new K(se,["/","home"]).getStore();let te=0;function I({icon:a,infos:s,text:t,title:o,id:n}){return e.jsxs("div",{id:n,className:"card-flyer",children:[e.jsx("div",{className:"back-flyer",style:{background:`linear-gradient(${Math.trunc(Math.random()*180+te++*20)}deg, #408DD5 0%, #630B8C 100%)`}}),e.jsxs("div",{className:"front-flyer",children:[a&&e.jsx("div",{className:"icon",style:{background:w(a,"90%")}}),e.jsx("h1",{className:"title",children:o}),e.jsx("p",{children:t}),s==null?void 0:s.map((u,c)=>e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"icon",style:{background:w(u.icon,"90%")}}),e.jsx("div",{className:"text",children:u.text})]},c))]})]})}function ae(){const a=(o,n=50)=>{const c=100*o-n*.5,l=100-(c+n);return{transformOrigin:`${-c}px 25px`,right:`${l}px`}},s=o=>({scale:`${o}`});return e.jsx("div",{className:"solary-system",children:e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"circle1",style:s(2*.3)}),e.jsx("div",{className:"circle2",style:s(2*.6)}),e.jsx("div",{className:"circle3",style:s(2*.9)}),e.jsx("div",{className:"circle4",style:s(2*1.15)}),e.jsx("div",{className:"circle5",style:s(2*1.4)}),e.jsx("div",{className:"circle6",style:s(2*1.65)}),e.jsx("div",{className:"circle7",style:s(2*2)}),e.jsx("div",{className:"sun"}),e.jsx("div",{className:"planet1",style:a(2*.3,20)}),e.jsx("div",{className:"planet2",style:a(2*.6,40)}),e.jsx("div",{className:"planet3",style:a(2*.9)}),e.jsx("div",{className:"planet4",style:a(2*1.15,40)}),e.jsx("div",{className:"planet5",style:a(2*1.4,70)}),e.jsx("div",{className:"planet6",style:a(2*1.65)}),e.jsx("div",{className:"planet7",style:a(2*2)})]})})}function ie(){const[a,s]=p.useState("session");return e.jsxs("div",{className:"client-chat",children:[e.jsxs("div",{className:"top-onglet",children:[e.jsx("div",{className:"session "+(a=="session"?"active":""),onClick:()=>{s("session")},children:"Session"}),e.jsx("div",{className:"discussion "+(a=="discussion"?"active":""),onClick:()=>{s("discussion")},children:"Discussion"}),e.jsx("div",{className:"group "+(a=="group"?"active":""),onClick:()=>{s("group")},children:"Group"})]}),e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"ctn-session "+(a=="session"?"active":""),children:e.jsxs("div",{className:"view-session",children:[e.jsxs("div",{className:"client1 user",children:[e.jsx("div",{className:"label",children:"Client"}),e.jsx("div",{className:"client1-c conect",children:e.jsx("div",{className:"message-c1 message"})})]}),e.jsxs("div",{className:"client2 user",children:[e.jsx("div",{className:"label",children:"Client"}),e.jsx("div",{className:"client2-c conect",children:e.jsx("div",{className:"message-c2 message"})})]}),e.jsx("div",{className:"collaborator user",children:e.jsx("div",{className:"label",children:"Collaborator"})})]})}),e.jsx("div",{className:"ctn-discussion "+(a=="discussion"?"active":""),children:e.jsxs("div",{className:"view-discussion",children:[e.jsxs("div",{className:"collabo1 user",children:[e.jsx("div",{className:"label",children:"Collaborator"}),e.jsx("div",{className:"collabo1-c conect",children:e.jsx("div",{className:"message-c1 message"})})]}),e.jsx("div",{className:"collabo1-collabo2 conect",children:e.jsx("div",{style:{position:"relative"},children:e.jsx("div",{className:"message-c3 message"})})}),e.jsxs("div",{className:"collabo2 user",children:[e.jsx("div",{className:"label",children:"Collaborator"}),e.jsx("div",{className:"collabo2-c conect",children:e.jsx("div",{className:"message-c2 message"})})]}),e.jsx("div",{className:"admin user",children:e.jsx("div",{className:"label",children:"Admin"})})]})}),e.jsx("div",{className:"ctn-group "+(a=="group"?"active":"")})]})]})}function ce(){const{pathList:a,check:s}=D(),[t,o]=p.useState(0),[n,u]=p.useState(0),[c,l]=p.useState(0),[r]=p.useState({time:0,id:void 0,start:0,count:0,stop(){clearInterval(this.id||0),this.id=void 0},init(){this.id||(this.start=Date.now(),this.id=setInterval(()=>{this.time=Date.now()-this.start,this.count++,o(this.count)},5e3))}});return p.useEffect(()=>(s("home")&&!r.id&&r.init(),()=>{r.stop()}),[r,a]),e.jsxs("div",{className:"interface-change",onMouseMove:d=>{const m=d.currentTarget.getBoundingClientRect(),b=m.x+m.width/2,h=m.y+m.height/2;u((d.clientX-b)/(m.width/2)),l(-(d.clientY-h)/(m.height/2))},onTouchMove:d=>{const m=d.currentTarget.getBoundingClientRect(),b=m.x+m.width/2,h=m.y+m.height/2;u((d.touches[0].clientX-b)/(m.width/2)),l(-(d.touches[0].clientY-h)/(m.height/2))},children:[e.jsxs("div",{className:"left-side",children:[e.jsxs("div",{className:"ctn-monitor",style:{transform:`rotateY(${Math.PI*n*.05}rad) rotateX(${Math.PI*c*.05}rad)`},children:[e.jsx("div",{className:"monitor"}),e.jsx("div",{className:"interfaces-ctn",children:e.jsxs("div",{className:"interfaces",children:["By NG",e.jsx("div",{className:"interface1 "+(t%4==0?"active":"hide")}),e.jsx("div",{className:"interface2 "+(t%4==1?"active":"hide")}),e.jsx("div",{className:"interface3 "+(t%4==2?"active":"hide")}),e.jsx("div",{className:"interface4 "+(t%4==3?"active":"hide")})]})})]}),e.jsxs("div",{className:"icons",children:[e.jsx("div",{className:"icon1 "+(t%4==0?"active":"")}),e.jsx("div",{className:"icon2 "+(t%4==1?"active":"")}),e.jsx("div",{className:"icon3 "+(t%4==2?"active":"")}),e.jsx("div",{className:"icon4 "+(t%4==3?"active":"")})]})]}),e.jsxs("div",{className:"infos",children:[e.jsx("h2",{children:"e currentTarget getBounding ClientRect()"}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{children:"1"})," Info Tiltle Let see"]}),e.jsx("p",{className:"text",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{children:"2"})," Info Tiltle Let see"]}),e.jsx("p",{className:"text",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{children:"3"})," Info Tiltle Let see"]}),e.jsx("p",{className:"text",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{children:"4"})," Info Tiltle Let see"]}),e.jsx("p",{className:"text",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{children:"5"})," Info Tiltle Let see"]}),e.jsx("p",{className:"text",children:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem officiis natus necessitatibus dolores aperiam reiciendis doloribus,"})]})]})]})}const S=250,E=10;let U=0,ne=0;const re=["Jan","Fev","Mar","Avr","Mai","Jun","Jul","Aut","Sep","Oct","Nov","Dec"],C=[5,8,7,3,1,8,2,6],oe=["#402E7A","#4C3BCF","#4B70F5","#3DC2EC","#49243E","#704264","#BB8493","#DBAFA0"];function le(){var b;const{check:a,pathList:s}=D(),t=p.useRef(null),o=p.useRef(null),[n,u]=p.useState({v:void 0}),[c,l]=p.useState(Array.from({length:E},(h,i)=>i/E*S)),[r]=p.useState({time:0,id:void 0,start:0,count:0,y:0,touchDate:void 0,isHover:!1,pie:{touchDate:void 0,isHover:!1,x:0,y:0},stop(){clearInterval(this.id||0),this.id=void 0},init(){this.id||(this.start=Date.now(),this.id=setInterval(()=>{if(this.time=Date.now()-this.start,U++,this.isHover||this.touchDate)c.shift(),c.push(this.y),l([...c]);else if(ne++%30==0){c.shift();const h=Math.cos(U/80),i=S*(h*.5+.5);c.push(i>S?S:i<0?0:i),l([...c])}if(Date.now()-(this.touchDate||0)>1e3&&(this.touchDate=void 0),this.pie.isHover||this.pie.touchDate){let h=180*(Math.atan2(this.pie.y,this.pie.x)/Math.PI);h=h+(1-(Math.abs(this.pie.y)/this.pie.y*.5+.5))*360,h+=90,h-=h>360&&h<450?360:0;const i=C.reduce((x,g)=>x+g);C.find((x,g)=>{const N=C[g]/i*360;let _=0;C.find((W,M)=>{if(M==g)return!0;_+=C[M]/i*360});const v=_,O=_+N;return h<O&&h>v?(u({v:g}),!0):!1})}else n.v=void 0,u(n);Date.now()-(this.pie.touchDate||0)>1e3&&(this.pie.touchDate=void 0)},30))}});p.useEffect(()=>(a("home")&&!r.id&&r.init(),()=>{r.stop()}),[s]),console.log(r);let d=(((b=t.current)==null?void 0:b.getBoundingClientRect().width)||0)/c.length;const m=[0,S,...c.map((h,i)=>[d*i,S-Math.trunc(h)]).flat(1),d*(E-1),S];return e.jsxs("div",{className:"bar-chart",children:[e.jsx("div",{className:"bar-top",children:e.jsxs("div",{className:"chart-ctn",ref:t,onMouseEnter:()=>r.isHover=!0,onMouseLeave:()=>r.isHover=!1,onMouseMove:h=>{const i=h.currentTarget.getBoundingClientRect();r.y=i.y+i.height-h.clientY},onTouchMove:h=>{const i=h.currentTarget.getBoundingClientRect();r.y=i.y+i.height-h.touches[0].clientY,r.touchDate=Date.now()},children:[Array.from({length:E},(h,i)=>i/E*S).map((h,i)=>e.jsx("div",{className:"val",style:{left:"-15px",position:"absolute",top:`calc(${(1-i/E)*S}px - 1em)`},children:Math.trunc(h/S*100)/10})),e.jsx("div",{className:"hand-ctn",style:{bottom:`${c[c.length-1]}px`},children:e.jsxs("div",{className:"hand",style:{transform:"translateY(-0.5em)"},children:["👈 ",Math.trunc(c[c.length-1]/S*100)/10]})}),e.jsxs("svg",{className:"svg-lines",style:{width:"100%",height:"100%"},children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"chart-line-gradieant",gradientTransform:"rotate(90)",children:[e.jsx("stop",{offset:"5%","stop-color":"#6200ff66"}),e.jsx("stop",{offset:"95%","stop-color":"#58007a33"})]})}),e.jsx("polygon",{className:"polygon",points:m.toString()})]}),c.map((h,i)=>e.jsx("div",{className:"bar",style:{height:`${h*.5}px`,width:"20px",left:`${2.5+100/c.length*i}%`,bottom:"0"},children:e.jsx("div",{className:"label",children:re[(r.count+i)%12]},i+"t")},i+"b"))]})}),e.jsxs("div",{className:"infos",children:[e.jsxs("div",{className:"top",children:[e.jsx("div",{className:"left",children:"have graphic tools to follow your users' consumption trends"}),e.jsxs("div",{className:"piechart",ref:o,onMouseEnter:()=>r.pie.isHover=!0,onMouseLeave:()=>r.pie.isHover=!1,onMouseMove:h=>{const i=h.currentTarget.getBoundingClientRect();r.pie.y=h.clientY-(i.y+i.height/2),r.pie.x=h.clientX-(i.x+i.width/2)},onTouchMove:h=>{const i=h.currentTarget.getBoundingClientRect();r.pie.y=h.touches[0].clientY-(i.y+i.height/2),r.pie.x=h.touches[0].clientX-(i.x+i.width/2),r.pie.touchDate=Date.now()},children:[C.map((h,i)=>{const x=C.reduce((_,v)=>_+v),g=C[i]/x*360;let N=0;return C.find((_,v)=>{if(v==i)return!0;N+=C[v]/x*360}),e.jsx("div",{className:"part "+(n.v==i?"active":""),style:{rotate:`${N}deg`,background:`conic-gradient(${oe[i]} ${g}deg, transparent ${g}deg)`}})}),e.jsx("div",{className:"part",style:{pointerEvents:"none",background:"radial-gradient(circle, #0005 0% ,#0000 50% ) "}}),e.jsx("div",{className:"value "+(r.pie.touchDate?"touch":""),style:{top:`${100+r.pie.y}px`,left:`${65+r.pie.x}px`,display:n.v==null?"none":""},children:C[n.v||0]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{className:"count",children:"1"}),"Product visit statistics"]}),e.jsx("p",{children:"  you will have access to the number of visits per defined period, this will allow you to know the current trends of your customer"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{className:"count",children:"2"}),"Product order statistics"]}),e.jsx("p",{children:"  order statistics, to track your revenue"})]}),e.jsxs("div",{className:"info",children:[e.jsxs("h3",{className:"title",children:[e.jsx("span",{className:"count",children:"3"}),"Customer satisfaction statistics"]}),e.jsx("p",{children:"  your customers will leave you a product rating per order, this will allow you to judge user preferences"})]})]})]})]})}const de=[{u:"products",i:"/src/res/add-product.png"},{u:"commands",i:"/src/res/shopping-bag.png"},{u:"users",i:"/src/res/customer.png"},{u:"interfaces",i:"/src/res/software-testing.png"},{u:"statistics",i:"/src/res/stats.png"}];let he=0;function me(){const[a,s]=p.useState(1),[t,o]=p.useState();p.useEffect(()=>{if(!t)return o(setInterval(()=>{s(he++%4+1)},3e3)),()=>{clearInterval(t)}},[t]);const{check:n}=D();return n("home")&&e.jsxs("div",{className:"page-home",children:[e.jsx("div",{className:"back-home"}),e.jsxs("div",{className:"page-text",children:[e.jsxs("div",{className:"text-top",children:[e.jsxs("div",{className:"stores-count",children:[34," Stores"]}),e.jsxs("div",{className:"title",children:["Discover the ",e.jsx("span",{className:"shopping",children:"Shopping"})," Revolution in ",e.jsx("span",{className:"c-3d",children:"3D"})]}),e.jsx("div",{className:"sub-title",children:"Create, Personalize and Sell your Products presented in 3D and offer your customers a unique interactive experience."})]}),e.jsxs("div",{className:"right",children:[e.jsx("div",{className:"subjects",children:de.map(u=>e.jsx("a",{href:`#home/${u.u}`,style:{background:w(u.i)}}))}),e.jsxs("label",{htmlFor:"home-search",className:"search",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{id:"home-search",type:"text",placeholder:"Search"})]})]})]}),e.jsxs("div",{className:"prettier",children:[e.jsx(I,{id:"home/products",icon:"/src/res/add-product.png",infos:[{icon:"/src/res/add-product.png",text:"add product 3D file"},{icon:"/src/res/add-product.png",text:"catalog, category, product, feature"}],text:"make your products accessible online, for your customers.",title:"Add new Products"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx(I,{id:"home/commands",icon:"/src/res/shopping-bag.png",infos:[{icon:"/src/res/shopping-bag.png",text:"auto or manual validation"},{icon:"/src/res/shopping-bag.png",text:"cart, cancel, deliver, on_the_way, return "}],text:"view orders, track and adjust order status",title:"Manage customer orders"}),e.jsx("div",{className:"cadre"})]}),e.jsxs("div",{className:"prettier",children:[e.jsx(I,{id:"home/users",icon:"/src/res/customer.png",infos:[{icon:"/src/res/customer.png",text:"chose the role of collaborator"},{icon:"/src/res/customer.png",text:"client, owner, collaborator, moderator"}],text:"follow your customers, add chat collaborators with everyone, organize your team",title:"Store user types"}),e.jsxs("div",{className:"cadre",children:[e.jsxs("div",{className:"p-access",children:[e.jsx("div",{className:"ctn-threejs"}),e.jsxs("div",{className:"infos",children:[e.jsx("div",{className:"title",children:"accessibility"}),e.jsxs("div",{className:"info "+(a==1?"open":""),children:[e.jsx("div",{className:"count",children:"1"}),e.jsxs("div",{className:"text",children:[e.jsx("h3",{children:"compatibility with all stores"}),e.jsx("p",{children:"follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores"})]})]}),e.jsxs("div",{className:"info "+(a==2?"open":""),children:[e.jsx("div",{className:"count",children:"2"}),e.jsxs("div",{className:"text",children:[e.jsx("h3",{children:"compatibility with all stores"}),e.jsx("p",{children:"follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores"})]})]}),e.jsxs("div",{className:"info "+(a==3?"open":""),children:[e.jsx("div",{className:"count",children:"3"}),e.jsxs("div",{className:"text",children:[e.jsx("h3",{children:"compatibility with all stores"}),e.jsx("p",{children:"follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores"})]})]}),e.jsxs("div",{className:"info "+(a==4?"open":""),children:[e.jsx("div",{className:"count",children:"4"}),e.jsxs("div",{className:"text",children:[e.jsx("h3",{children:"compatibility with all stores"}),e.jsx("p",{children:"follow your customers, add chat collaborators with everyone, organize your team compatibility with all stores"})]})]})]}),e.jsx("div",{className:"access-world",children:e.jsx(ae,{})})]}),e.jsx("div",{className:"p-users",children:e.jsx(ie,{})})]})]}),e.jsxs("div",{className:"prettier",children:[e.jsx(I,{id:"home/interfaces",icon:"/src/res/software-testing.png",infos:[{icon:"/src/res/software-testing.png",text:"automatically updates store information"},{icon:"/src/res/software-testing.png",text:"compatibility with all stores"}],text:"the platform has several interfaces to best meet your needs",title:"Change your store interface"}),e.jsx("div",{className:"cadre",children:e.jsx(ce,{})})]}),e.jsxs("div",{className:"prettier",children:[e.jsx(I,{id:"home/statistics",icon:"/src/res/stats.png",infos:[{icon:"/src/res/stats.png",text:"Statistical analysis of data"},{icon:"/src/res/stats.png",text:"visit, command, yield, period"}],text:"increase your sales using statistical data from your store",title:"Statistical table"}),e.jsx("div",{className:"cadre",children:e.jsx(le,{})})]}),e.jsx("footer",{})]})}function ue(){var z;const[a]=p.useState(Z()),{current:s,setAbsPath:t,navBack:o,json:n,pathList:u}=D(),{createStore:c,deleteStore:l,editStore:r,selectedStore:d,openChild:m,setStoreById:b,owner:h,exist:i}=f(),[x,g]=p.useState(d||{}),[N,_]=p.useState(d?{url:(s("edit_store")||"")&&`${d.logo[0]}`}:null),[v,O]=p.useState(d?{url:(s("edit_store")||"")&&`${(z=d.banners)==null?void 0:z[0]}`}:null),M=q().width<1050?"wrap":"",[P,H]=p.useState(""),[L,F]=p.useState(!1);p.useEffect(()=>{setTimeout(()=>{var j;d&&s("edit_store")&&(g(d),O({url:`${d.banners[0]}`}),_({url:`${(j=d.logo)==null?void 0:j[0]}`}))}),d||(g({}),_(null),O(null))},[d]),p.useEffect(()=>{h&&(n!=null&&n.store_id)&&b(n.store_id)},[n,h]),p.useEffect(()=>{H("")},[u]);const A=s("edit_store"),J=(v==null?void 0:v.url)&&(N==null?void 0:N.url)&&x.name,B=d;return A&&!d?e.jsx("div",{className:"store-select-btn",onClick:()=>{t(["store_list"])},children:"Select Store Before Edition"}):s("new_store","edit_store")&&e.jsxs("div",{className:"page-new-store",children:[d&&e.jsxs("div",{className:"editor-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>o()}),e.jsx(ee,{terme:"dark",deteleKey:d.id,mode:"delete",onDelete:()=>{l(d.id).then(j=>{j&&t(["store_list"])})},onCreate:()=>{},title:"Store Information"}),e.jsxs("div",{className:"open-opt",children:[e.jsx("div",{className:"btn-dash btn demo no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(d)),window.open(`${T}/demo/${d.name}`)},children:"Open Demo Store"}),e.jsx("div",{className:"btn-dash btn no-selectable",onClick:()=>{localStorage.setItem("store",JSON.stringify(d)),window.open(`${T}/${d==null?void 0:d.name}/dash`)},children:"Open Dashboard"})]})]}),e.jsxs("div",{className:"center-content "+M,children:[e.jsx("div",{className:"center-left",children:e.jsxs("div",{className:"store "+(d?"anim":"void"),children:[e.jsxs("div",{className:"banner "+(v!=null&&v.url?"":"void"),style:v!=null&&v.url?{background:w((v==null?void 0:v.url)||"")}:{},children:[e.jsxs("div",{className:"img-options",children:[(v==null?void 0:v.url)&&e.jsx("div",{className:"open",onClick:()=>{m(e.jsx("div",{className:"big-img",onClick:()=>m(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((v==null?void 0:v.url)||"")}})}),!0,"#3455")}}),e.jsx("input",{type:"file",accept:"image/*",id:a+"banner",style:{display:"none"},onChange:j=>{var k;const y=(k=j.currentTarget.files)==null?void 0:k[0];y&&O({file:y,url:URL.createObjectURL(y)})}}),e.jsx("label",{htmlFor:a+"banner",className:"edit"})]}),e.jsxs("div",{className:"more",children:[e.jsxs("div",{className:"logo "+(N!=null&&N.url?"":"void"),style:N!=null&&N.url?{background:w((N==null?void 0:N.url)||"")}:{},onClick:j=>{j.currentTarget==j.target&&N!=null&&N.url&&m(e.jsx("div",{className:"big-img",onClick:()=>m(void 0,!1),children:e.jsx("div",{className:"img",style:{background:w((N==null?void 0:N.url)||"")}})}),!0,"#3455")},children:[e.jsx("input",{type:"file",accept:"image/*",id:a+"logo",style:{display:"none"},onChange:j=>{var k;const y=(k=j.currentTarget.files)==null?void 0:k[0];y&&_({file:y,url:URL.createObjectURL(y)})}}),e.jsx("label",{htmlFor:a+"logo",className:"edit"})]}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:x.name}),e.jsx("div",{className:"owner-email",children:x.store_email}),e.jsx("div",{className:"id",children:x.id&&`#${x.id.split("-")[0]}`})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:d?42:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:d?205:0}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:d?9:0}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:x.website}),e.jsx("div",{className:"phone",children:x.phone})]})]}),d&&e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(B)),window.open(`${T}/${x.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(B)),window.open(`${T}/${x.name}/dash`)},children:"DASH"})]})]})]})}),e.jsxs("div",{className:"center-right",children:[e.jsxs("div",{className:"imgs",children:[e.jsxs("label",{className:v!=null&&v.url?"available":"no-available",htmlFor:a+"banner",children:["Banner ",e.jsx("span",{})]}),e.jsxs("label",{className:N!=null&&N.url?"available":"no-available",htmlFor:a+"logo",children:["Logo ",e.jsx("span",{})]})]}),A&&e.jsxs("div",{className:"id",children:[e.jsx("label",{htmlFor:a+"id",style:{color:"#fff9"},children:"Id"}),e.jsx("input",{type:"text",id:a+"id",value:x.id||"",style:{color:"#fff9",borderColor:"#fff9"},placeholder:"Name"})]}),e.jsxs("div",{className:"name",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"name",children:"Store Name"}),e.jsxs("div",{className:"available",style:{display:P=="yes"?"flex":"none"},children:[e.jsx("span",{})," available"]}),e.jsxs("div",{className:"not-available",style:{display:P=="no"?"flex":"none"},children:[e.jsx("span",{})," not available"]})]}),e.jsx("input",{type:"text",id:a+"name",value:x.name||"",placeholder:"Name",onChange:j=>{var k;const y=j.currentTarget.value;y.trim().length<3?H("no"):(k=i(y))==null||k.then(R=>{H(R?"no":"yes"),console.log(y,P,R,R?"no":"yes")}),g({...x,name:y})}})]}),e.jsxs("div",{className:"phone",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"phone",children:"Phone"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:a+"phone",value:x.phone||"",placeholder:"Phone",onChange:j=>{g({...x,phone:j.currentTarget.value})}})]}),e.jsxs("div",{className:"store_email",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"store_email",children:"Store Email"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"email",id:a+"store_email",value:x.store_email||"",placeholder:"Store email",onChange:j=>{g({...x,store_email:j.currentTarget.value})}})]}),e.jsxs("div",{className:"website",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"website",children:"Web Site"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:a+"website",value:x.website||"",placeholder:"Web Site",onChange:j=>{g({...x,website:j.currentTarget.value})}})]}),e.jsxs("div",{className:"desciption",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"desciption",children:"Description"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:a+"description",value:x.description||"",placeholder:"Description",onChange:j=>{g({...x,description:j.currentTarget.value})}})]}),e.jsxs("div",{className:"address",children:[e.jsxs("div",{className:"top",children:[e.jsx("label",{htmlFor:a+"address",children:"Address"}),e.jsx("div",{className:"optional",children:"(optional)"})]}),e.jsx("input",{type:"text",id:a+"address",value:x.address,placeholder:"Address",onChange:j=>{g({...x,address:j.currentTarget.value})}})]}),e.jsx("div",{className:"btm",children:e.jsx("div",{className:"btn no-selectable",style:{background:J?"":"#345"},onClick:()=>{!J||L||(F(!0),A?d&&r({...x,banners:v,logo:N,store_id:d==null?void 0:d.id}).then(j=>{F(!1),j&&t(["store_list"])}):c({...x,banners:v,logo:N}).then(j=>{setTimeout(()=>{F(!1)},100),j!=null&&j.id&&j&&t(["store_list"])}))},children:L?e.jsx("div",{className:"loading"}):`${A?"Edit":"Create"} Store`})})]})]})]})}function xe(){const{check:a,current:s,setAbsPath:t,qs:o,navBack:n,pathList:u}=D(),{owner:c,stores:l,owner_stores:r,setSelectedStore:d}=f();return p.useEffect(()=>{c&&a("store_list")&&r({text:""})},[u,c]),s("store_list")&&e.jsxs("div",{className:"stores-page",children:[e.jsxs("div",{className:"top-top",children:[e.jsx("div",{className:"nav-back",onClick:()=>n()}),e.jsxs("div",{className:"sreach-stores",children:[e.jsxs("div",{className:"ctn",children:[e.jsx("div",{className:"icon"}),e.jsx("input",{type:"text",placeholder:"Search by #id, name, email",name:"sreach-stores",id:"sreach-stores",onChange:m=>{r({text:m.currentTarget.value})}})]}),c&&e.jsxs("div",{className:"new-btn no-selectable",onClick:()=>{d(void 0),t(["new_store"])},children:[e.jsx("div",{className:"icon"}),e.jsx("div",{className:"label",children:"Add New Store"})]})]})]}),e.jsx("div",{className:"stores",ref:X,children:l==null?void 0:l.list.map(m=>e.jsxs("div",{className:"store",children:[e.jsxs("div",{className:"banner",style:{background:w(m.banners[0])},onClick:()=>{d(m),o({store_id:m.id}).setAbsPath(["edit_store"])},children:[e.jsx("div",{className:"edit"}),e.jsxs("div",{className:"more",children:[e.jsx("div",{className:"logo",style:{background:w(m.logo[0])}}),e.jsxs("div",{className:"text",children:[e.jsx("div",{className:"name",children:m.name}),e.jsx("div",{className:"owner-email",children:m.store_email}),e.jsxs("div",{className:"id",children:["#",m.id.split("-")[0]]})]})]})]}),e.jsxs("div",{className:"btm",children:[e.jsxs("div",{className:"info",children:[e.jsxs("div",{className:"stat",children:[e.jsxs("div",{className:"products",children:[e.jsx("div",{className:"value",children:"42"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"clients",children:[e.jsx("div",{className:"value",children:"205"}),e.jsx("div",{className:"icon"})]}),e.jsxs("div",{className:"collaborators",children:[e.jsx("div",{className:"value",children:"9"}),e.jsx("div",{className:"icon"})]})]}),e.jsxs("div",{className:"other",children:[e.jsx("div",{className:"site",children:m.website}),e.jsx("div",{className:"phone",children:m.phone})]})]}),e.jsxs("div",{className:"options",children:[e.jsx("div",{className:"open-store",onClick:()=>{localStorage.setItem("store",JSON.stringify(m)),window.open(`${T}/${m.name}`)},children:"STORE"}),e.jsx("div",{className:"open-dash",onClick:()=>{localStorage.setItem("store",JSON.stringify(m)),window.open(`${T}/${m.name}/dash`)},children:"DASH"})]})]})]}))})]})}const Y=[{u:"home",n:"Home",i:"/src/res/application.png"},{u:"store_list",n:"Stores",i:"/src/res/store.png"},{u:"tutorial",n:"Tutorial",i:"/src/res/catalog.png"},{u:"pricing",n:"Pricing",i:"/src/res/shopping-cart.png"},{u:"contact",n:"Contact us",i:"/src/res/services.png"},{u:"updates",n:"Updates",i:"/src/res/jigsaw.png"},{u:"forum",n:"Forum",i:"/src/res/multiple-users-silhouette.png"}];function pe(){var h;const{setAbsPath:a,pathList:s}=D(),[t,o]=p.useState(s[1]||"home"),[n,u]=p.useState(!1),[c,l]=p.useState(!1),{owner:r,createOwner:d}=f(),m=q(),b=i=>{a([i]),o(i)};return p.useEffect(()=>{o(s[1]||"home")},[s]),p.useEffect(()=>{window.addEventListener("click",()=>{const i=document.querySelector(".top-bar .more-navs ul");(i==null?void 0:i.className)==""&&l(!1)})},[]),e.jsxs("div",{className:"top-bar",ref:G(80,".web"),children:[e.jsxs("div",{className:"top-bar-ctn",children:[e.jsxs("div",{className:"left",children:[e.jsx("div",{className:"options",onClick:()=>{}}),e.jsx("a",{href:`${T}/web#home`,className:"logo-ctn",onClick:()=>{b("home")},children:e.jsx("div",{className:"icon"})})]}),e.jsx("ul",{className:"top-bar-center",children:Y.map((i,x)=>x*200<m.width-400?e.jsxs("li",{className:t==i.u?"active":"",onClick:()=>b(i.u),children:[e.jsx("span",{style:{background:w(i.i,"80%")}}),i.n]}):e.jsx(e.Fragment,{}))}),e.jsx("div",{className:"ctn-icon",onClick:i=>{i.preventDefault(),i.stopPropagation(),l(!c)},children:e.jsx("div",{className:"icon"})}),r?e.jsx("div",{className:"profile",style:{background:`no-repeat center/cover url(${(h=r==null?void 0:r.photos[0])!=null&&h.startsWith("/")?$:""}${r==null?void 0:r.photos}),#bbb`}}):e.jsx("div",{className:"login",onClick:()=>d(),children:"Se connecter"})]}),e.jsx("div",{className:"more-navs",onClick:i=>{i.preventDefault(),i.stopPropagation()},children:e.jsxs("ul",{className:c?"":"close",children:[Y.map((i,x)=>x*200>=m.width-400?e.jsxs("li",{className:t==i.u?"active":"",onClick:()=>b(i.u),children:[e.jsx("span",{style:{background:w(i.i,"80%")}}),i.n]}):e.jsx(e.Fragment,{})),e.jsxs("li",{className:t=="mode-lite"?"active":"",onClick:()=>{u(!n)},children:[e.jsx("span",{style:{background:w("/src/res/mark.png","70%")}}),n?"Lite mode off":"Lite mode on"]})]})})]})}function ve(){const{tryToken:a,blur:s,currentChild:t,openChild:o,back_color:n}=f(),{pathList:u}=D();return p.useEffect(()=>{o(void 0)},[u]),p.useEffect(()=>{a()},[]),e.jsxs("div",{className:"web unselectable",children:[e.jsxs("div",{className:"web-ctn",style:{filter:s?"blur(10px)":""},children:[e.jsx("div",{className:"background"}),e.jsx(pe,{}),e.jsxs("div",{className:"page-ctn",children:[e.jsx(me,{}),e.jsx(ue,{}),e.jsx(xe,{})]})]}),t&&e.jsx("div",{className:"child-viewer",onContextMenu:c=>{c.preventDefault(),o(void 0)},children:e.jsx("div",{className:"child-viewer-ctn",style:{background:n},onClick:()=>{o(void 0)},onContextMenu:c=>{c.preventDefault(),o(void 0)},children:t})})]})}const je=a=>a,be=je(e.jsx(Q.StrictMode,{children:e.jsx(ve,{})}));export{be as WebView};
