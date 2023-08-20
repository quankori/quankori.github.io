"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2900],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>b});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},m="mdxType",i={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),m=p(a),d=r,b=m["".concat(s,".").concat(d)]||m[d]||i[d]||l;return a?n.createElement(b,o(o({ref:t},u),{},{components:a})):n.createElement(b,o({ref:t},u))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,o=new Array(l);o[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[m]="string"==typeof e?e:r,o[1]=c;for(var p=2;p<l;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},6174:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>i,frontMatter:()=>l,metadata:()=>c,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const l={title:"MySQL CheatSheet"},o=void 0,c={unversionedId:"cheatsheet/mysql",id:"cheatsheet/mysql",title:"MySQL CheatSheet",description:"Basic command",source:"@site/docs/cheatsheet/mysql.md",sourceDirName:"cheatsheet",slug:"/cheatsheet/mysql",permalink:"/docs/cheatsheet/mysql",draft:!1,tags:[],version:"current",frontMatter:{title:"MySQL CheatSheet"},sidebar:"cheatsheet",previous:{title:"MongoDB CheatSheet",permalink:"/docs/cheatsheet/mongodb"},next:{title:"Network CheatSheet",permalink:"/docs/cheatsheet/network"}},s={},p=[{value:"Basic command",id:"basic-command",level:2},{value:"Backup and Restore",id:"backup-and-restore",level:2}],u={toc:p},m="wrapper";function i(e){let{components:t,...a}=e;return(0,r.kt)(m,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"basic-command"},"Basic command"),(0,r.kt)("p",null,"Login monitor"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mysql -u root -p\n")),(0,r.kt)("p",null,"Login monitor another container"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mysql -u root -h container_name -p\n")),(0,r.kt)("p",null,"Show all database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"show databases;\n")),(0,r.kt)("p",null,"Show all table"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"show tables;\n")),(0,r.kt)("p",null,"Show all columns"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"desc table_name;\n")),(0,r.kt)("p",null,"Create database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"create database testdb;\n")),(0,r.kt)("p",null,"Create table"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"create table info (name varchar(20), lastname varchar(20), age int(2));\n")),(0,r.kt)("p",null,"Use database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"use testdb;\n")),(0,r.kt)("h2",{id:"backup-and-restore"},"Backup and Restore"),(0,r.kt)("p",null,"Dump"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mysqldump -u root -h container_name -p database_name > /tmp/.sql\n")),(0,r.kt)("p",null,"Backup all"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongodump --out D:\\data\\mongodb_backup\n")),(0,r.kt)("p",null,"Backup one database"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongodump --db mongo_color --out d:\\data\\mongodb_backup\n")),(0,r.kt)("p",null,"Restore"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongorestore --db l4_analytics C:\\l4_analytics\n")))}i.isMDXComponent=!0}}]);