"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4404],{3905:(e,t,r)=>{r.d(t,{Zo:()=>s,kt:()=>d});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},s=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),m=p(r),f=o,d=m["".concat(c,".").concat(f)]||m[f]||u[f]||a;return r?n.createElement(d,i(i({ref:t},s),{},{components:r})):n.createElement(d,i({ref:t},s))}));function d(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[m]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<a;p++)i[p]=r[p];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},3945:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>p});var n=r(7462),o=(r(7294),r(3905));const a={title:"Loop"},i=void 0,l={unversionedId:"programming/nodejs/loop",id:"programming/nodejs/loop",title:"Loop",description:"For Loop:",source:"@site/docs/programming/nodejs/loop.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/loop",permalink:"/docs/programming/nodejs/loop",draft:!1,tags:[],version:"current",frontMatter:{title:"Loop"},sidebar:"programming",previous:{title:"Generics",permalink:"/docs/programming/nodejs/generics"},next:{title:"Modules",permalink:"/docs/programming/nodejs/modules"}},c={},p=[],s={toc:p},m="wrapper";function u(e){let{components:t,...r}=e;return(0,o.kt)(m,(0,n.Z)({},s,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"For Loop"),": "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"For-Of Loop"),": "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"for (const item of arr) {\n  console.log(item);\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"forEach Method"),": "),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"arr.forEach(function (item) {\n  console.log(item);\n});\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Map Method"),": Create a new array by applying a function to each element of the original array."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const newArr = arr.map((item) => item * 2);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Filter Method"),": Create a new array with elements that satisfy a certain condition."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const filtered = arr.filter((item) => item > 2);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Reduce Method"),": Compute an aggregated value from the array."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const sum = arr.reduce((acc, item) => acc + item, 0);\n")),(0,o.kt)("p",null,"Regarding Performance:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"The classic for loop is often the fastest choice, especially when you need to access the indices of elements in the array."),(0,o.kt)("li",{parentName:"ul"},"for-of and .forEach() may be slightly slower and should be used for easier-to-read code or when the index is not needed.")),(0,o.kt)("p",null,"If performance is a top priority and your array is very large, using the classic for loop is probably the best choice. However, in many cases, the performance difference between these methods is negligible, and the choice often depends on code clarity and readability."),(0,o.kt)("p",null,"However, the performance difference between these methods is usually insignificant in most common applications. In fact, in some cases, the JavaScript virtual machine can optimize code using map, reduce, or filter to the point where they run as fast as classic for loops."))}u.isMDXComponent=!0}}]);