"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3680],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),i=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=i(e.components);return r.createElement(c.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=i(t),d=o,g=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return t?r.createElement(g,s(s({ref:n},p),{},{components:t})):r.createElement(g,s({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,s=new Array(a);s[0]=d;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[m]="string"==typeof e?e:o,s[1]=l;for(var i=2;i<a;i++)s[i]=t[i];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},9297:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>i});var r=t(7462),o=(t(7294),t(3905));const a={title:"Modules"},s=void 0,l={unversionedId:"programming/nodejs/modules",id:"programming/nodejs/modules",title:"Modules",description:"CommonJS",source:"@site/docs/programming/nodejs/modules.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/modules",permalink:"/docs/programming/nodejs/modules",draft:!1,tags:[],version:"current",frontMatter:{title:"Modules"},sidebar:"programming",previous:{title:"Functions",permalink:"/docs/programming/nodejs/functions"},next:{title:"Scopes",permalink:"/docs/programming/nodejs/scope"}},c={},i=[{value:"CommonJS",id:"commonjs",level:2},{value:"Namespace",id:"namespace",level:2},{value:"External Modules (ES Modules)",id:"external-modules-es-modules",level:2}],p={toc:i},m="wrapper";function u(e){let{components:n,...t}=e;return(0,o.kt)(m,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"commonjs"},"CommonJS"),(0,o.kt)("p",null,"This is the module system used in Node.js. It's synchronous and mainly designed for server-side."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'// greet.js\nmodule.exports = function () {\n  console.log("Hello, World!");\n};\n\n// app.js\nconst greet = require("./greet");\ngreet();\n')),(0,o.kt)("h2",{id:"namespace"},"Namespace"),(0,o.kt)("p",null,"Namespaces are a TypeScript-specific way to organize code, using the namespace keyword. While namespaces can help prevent naming collisions, they've become less popular with the advent of ES Modules."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'namespace MyNamespace {\n  export function greet() {\n    console.log("Hello from namespace!");\n  }\n}\n')),(0,o.kt)("h2",{id:"external-modules-es-modules"},"External Modules (ES Modules)"),(0,o.kt)("p",null,"The module system introduced in ES6 (ES2015) for JavaScript. It's become the standard for client-side modules and is now also supported in Node.js."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'// module.ts\nexport function greet() {\n  console.log("Hello from module!");\n}\n\n// main.ts\nimport { greet } from "./module";\ngreet();\n')))}u.isMDXComponent=!0}}]);