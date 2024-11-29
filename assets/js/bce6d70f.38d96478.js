"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[586],{3905:(e,t,a)=>{a.d(t,{Zo:()=>p,kt:()=>b});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var c=n.createContext({}),u=function(e){var t=n.useContext(c),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},p=function(e){var t=u(e.components);return n.createElement(c.Provider,{value:t},e.children)},d="mdxType",i={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=u(a),m=r,b=d["".concat(c,".").concat(m)]||d[m]||i[m]||o;return a?n.createElement(b,l(l({ref:t},p),{},{components:a})):n.createElement(b,l({ref:t},p))}));function b(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,l=new Array(o);l[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[d]="string"==typeof e?e:r,l[1]=s;for(var u=2;u<o;u++)l[u]=a[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},7166:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>i,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=a(7462),r=(a(7294),a(3905));const o={title:"MongoDB CheatSheet"},l=void 0,s={unversionedId:"cheatsheet/database/mongodb",id:"cheatsheet/database/mongodb",title:"MongoDB CheatSheet",description:"Basic command",source:"@site/docs/cheatsheet/database/mongodb.md",sourceDirName:"cheatsheet/database",slug:"/cheatsheet/database/mongodb",permalink:"/docs/cheatsheet/database/mongodb",draft:!1,tags:[],version:"current",frontMatter:{title:"MongoDB CheatSheet"},sidebar:"cheatsheet",previous:{title:"Terraform",permalink:"/docs/cheatsheet/devops/terraform"},next:{title:"MySQL CheatSheet",permalink:"/docs/cheatsheet/database/mysql"}},c={},u=[{value:"Basic command",id:"basic-command",level:3},{value:"Backup and Restore",id:"backup-and-restore",level:3},{value:"Add users",id:"add-users",level:3}],p={toc:u},d="wrapper";function i(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h3",{id:"basic-command"},"Basic command"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Login monitor")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongo uri\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Connect to mongo")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongo -host 127.0.0.1 --port 27017 -u root --password XXXXXX\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Show all databases")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"show dbs;\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Show excute database")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"use db_name;\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Show all collections")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"show collections;\n")),(0,r.kt)("h3",{id:"backup-and-restore"},"Backup and Restore"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Backup")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongodump --db your-db-name\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Restore backup")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"mongorestore --db your-db-name dump/your-db-name\n")),(0,r.kt)("h3",{id:"add-users"},"Add users"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},'db.addUser({user: "development", pwd: "123456", roles: [ "dbAdmin"]});\n')))}i.isMDXComponent=!0}}]);