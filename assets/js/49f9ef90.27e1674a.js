"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5428],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=a.createContext({}),i=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=i(e.components);return a.createElement(c.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=i(n),m=o,h=d["".concat(c,".").concat(m)]||d[m]||p[m]||r;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,l=new Array(r);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:o,l[1]=s;for(var i=2;i<r;i++)l[i]=n[i];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3146:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>i});var a=n(7462),o=(n(7294),n(3905));const r={title:"MongoDB CheatSheet"},l=void 0,s={unversionedId:"cheatsheet/mongodb",id:"cheatsheet/mongodb",title:"MongoDB CheatSheet",description:"Login monitor",source:"@site/docs/cheatsheet/mongodb.md",sourceDirName:"cheatsheet",slug:"/cheatsheet/mongodb",permalink:"/docs/cheatsheet/mongodb",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/cheatsheet/mongodb.md",tags:[],version:"current",frontMatter:{title:"MongoDB CheatSheet"},sidebar:"cheatsheet",previous:{title:"Golang Module Cheatsheet",permalink:"/docs/cheatsheet/golang"},next:{title:"MySQL CheatSheet",permalink:"/docs/cheatsheet/mysql"}},c={},i=[{value:"Login monitor",id:"login-monitor",level:2},{value:"Connect to mongo",id:"connect-to-mongo",level:2},{value:"Show all databases",id:"show-all-databases",level:2},{value:"Show excute database",id:"show-excute-database",level:2},{value:"Show all collections",id:"show-all-collections",level:2},{value:"Backup",id:"backup",level:2},{value:"Restore backup",id:"restore-backup",level:2},{value:"Add users",id:"add-users",level:2}],u={toc:i},d="wrapper";function p(e){let{components:t,...n}=e;return(0,o.kt)(d,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"login-monitor"},"Login monitor"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mongo uri\n")),(0,o.kt)("h2",{id:"connect-to-mongo"},"Connect to mongo"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mongo -host 127.0.0.1 --port 27017 -u root --password XXXXXX\n")),(0,o.kt)("h2",{id:"show-all-databases"},"Show all databases"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"show dbs;\n")),(0,o.kt)("h2",{id:"show-excute-database"},"Show excute database"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"use db_name;\n")),(0,o.kt)("h2",{id:"show-all-collections"},"Show all collections"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"show collections;\n")),(0,o.kt)("h2",{id:"backup"},"Backup"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mongodump --db your-db-name\n")),(0,o.kt)("h2",{id:"restore-backup"},"Restore backup"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"mongorestore --db your-db-name dump/your-db-name\n")),(0,o.kt)("h2",{id:"add-users"},"Add users"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'db.addUser({user: "development", pwd: "123456", roles: [ "dbAdmin"]});\n')))}p.isMDXComponent=!0}}]);