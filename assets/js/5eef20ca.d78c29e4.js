"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[637],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},c="mdxType",f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),c=p(n),d=a,m=c["".concat(l,".").concat(d)]||c[d]||f[d]||s;return n?r.createElement(m,o(o({ref:t},u),{},{components:n})):r.createElement(m,o({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=n.length,o=new Array(s);o[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[c]="string"==typeof e?e:a,o[1]=i;for(var p=2;p<s;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5122:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>f,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=n(7462),a=(n(7294),n(3905));const s={title:"Stateless & Stateful"},o=void 0,i={unversionedId:"programming/fundamental/staless-stateful",id:"programming/fundamental/staless-stateful",title:"Stateless & Stateful",description:'"Stateless" and "stateful" are two important concepts in the field of information technology, especially in application development and networking. They are related to how a system processes and stores information.',source:"@site/docs/programming/fundamental/staless-stateful.md",sourceDirName:"programming/fundamental",slug:"/programming/fundamental/staless-stateful",permalink:"/docs/programming/fundamental/staless-stateful",draft:!1,tags:[],version:"current",frontMatter:{title:"Stateless & Stateful"},sidebar:"programming",previous:{title:"SOLID Principle",permalink:"/docs/programming/fundamental/solid"},next:{title:"Singleton Pattern",permalink:"/docs/programming/pattern/singleton"}},l={},p=[{value:"Stateless:",id:"stateless",level:2},{value:"Stateful:",id:"stateful",level:2}],u={toc:p},c="wrapper";function f(e){let{components:t,...n}=e;return(0,a.kt)(c,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,'"Stateless" and "stateful" are two important concepts in the field of information technology, especially in application development and networking. They are related to how a system processes and stores information.'),(0,a.kt)("h2",{id:"stateless"},"Stateless:"),(0,a.kt)("p",null,"In a stateless model, the system does not store any state-related information about users or work sessions. Each request to the system is processed without knowledge of previous requests. These requests are independent and do not depend on any previously stored state. Stateless architectures are often easy to scale and suitable for distributed applications."),(0,a.kt)("p",null,"Example: HTTP is a stateless protocol. Each time you send an HTTP request to a server, it has no knowledge of your previous requests."),(0,a.kt)("h2",{id:"stateful"},"Stateful:"),(0,a.kt)("p",null,"In a stateful model, the system stores information about the state of users or work sessions. Each request to the system depends on the previous state, and data is stored. Stateful applications are often more complex in managing state and may face challenges in scalability."),(0,a.kt)("p",null,'Example: An email application with a "draft" feature. When you start writing an email, the content is in an unfinished state. The system stores this state so that you can continue writing later.'),(0,a.kt)("p",null,"The choice between stateless and stateful depends on the requirements of the application and the design decisions of the developer."))}f.isMDXComponent=!0}}]);