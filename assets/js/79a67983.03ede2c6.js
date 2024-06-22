"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6354],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>f});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function s(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),m=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):s(s({},r),e)),t},c=function(e){var r=m(e.components);return n.createElement(l.Provider,{value:r},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},u=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=m(t),u=a,f=d["".concat(l,".").concat(u)]||d[u]||p[u]||o;return t?n.createElement(f,s(s({ref:r},c),{},{components:t})):n.createElement(f,s({ref:r},c))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=u;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[d]="string"==typeof e?e:a,s[1]=i;for(var m=2;m<o;m++)s[m]=t[m];return n.createElement.apply(null,s)}return n.createElement.apply(null,t)}u.displayName="MDXCreateElement"},9970:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>s,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>m});var n=t(7462),a=(t(7294),t(3905));const o={title:"Callbacks in Node.js"},s=void 0,i={unversionedId:"programming/nodejs/callback",id:"programming/nodejs/callback",title:"Callbacks in Node.js",description:"Fundametal",source:"@site/docs/programming/nodejs/callback.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/callback",permalink:"/docs/programming/nodejs/callback",draft:!1,tags:[],version:"current",frontMatter:{title:"Callbacks in Node.js"},sidebar:"programming",previous:{title:"Testing",permalink:"/docs/programming/go/testing"},next:{title:"Event Loop",permalink:"/docs/programming/nodejs/event-loop"}},l={},m=[{value:"Fundametal",id:"fundametal",level:2},{value:"Promise",id:"promise",level:2},{value:"Other Promise",id:"other-promise",level:3},{value:"Async/Await",id:"asyncawait",level:2}],c={toc:m},d="wrapper";function p(e){let{components:r,...t}=e;return(0,a.kt)(d,(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"fundametal"},"Fundametal"),(0,a.kt)("p",null,'Callback is a fundamental concept in asynchronous programming in Node.js. It allows you to perform non-blocking operations, significantly improving performance for I/O-related tasks. However, due to the potential nesting of callbacks, understanding and managing "callback hell" is essential. Using patterns or new language features ensures that the code remains maintainable and readable.'),(0,a.kt)("h2",{id:"promise"},"Promise"),(0,a.kt)("p",null,"A Promise in JavaScript represents a value that may be available now, in the future, or never. It allows you to write asynchronous code in a more synchronous style. A Promise has three states: Pending, Rejected, and Fulfilled."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve("Promise resolved");\n  }, 2000);\n});\n\nmyPromise.then((result) => {\n  console.log(result); // "Promise resolved"\n});\n')),(0,a.kt)("h3",{id:"other-promise"},"Other Promise"),(0,a.kt)("p",null,"Promise.race and Promise.any are both methods of the Promise object in JavaScript, but they serve different purposes and work differently. Similarly, Promise.all and Promise.allSettled are also two different methods for handling multiple Promises. Here's a comparison between them:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Promise.race")," vs. ",(0,a.kt)("inlineCode",{parentName:"li"},"Promise.any"),":")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Promise.race"),": This method takes an array of Promises and returns a new Promise. This Promise is resolved or rejected as soon as one of the Promises in the array is resolved or rejected. The result of Promise.race is the result of the first Promise to complete."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Promise.any"),": This is a new method introduced in ES2021. Promise.any also takes an array of Promises and returns a new Promise. This Promise is resolved as soon as one of the Promises in the array is resolved. However, if all Promises are rejected, this Promise is rejected and returns an error containing an array of errors from the rejected Promises."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Promise.all")," vs. ",(0,a.kt)("inlineCode",{parentName:"li"},"Promise.allSettled"),":")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Promise.all"),": This method takes an array of Promises and returns a new Promise. This Promise is only resolved when all Promises in the array are resolved. The result of Promise.all is an array of results corresponding to the Promises in the original array."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Promise.allSettled"),": This is another method introduced in ES2020. Promise.allSettled also takes an array of Promises and returns a new Promise. This Promise is resolved after all Promises in the array have been resolved or rejected. The result of Promise.allSettled is an array of objects describing the status of each Promise, whether it was resolved or rejected."),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},"In summary:")),(0,a.kt)("p",null,"Promise.race and Promise.any deal with handling results from multiple Promises but behave differently when there are rejections."),(0,a.kt)("p",null,"Promise.all and Promise.allSettled both involve waiting for results from multiple Promises, but Promise.all is rejected if at least one Promise is rejected, while Promise.allSettled returns an array of statuses for all Promises, whether they were resolved or rejected."),(0,a.kt)("h2",{id:"asyncawait"},"Async/Await"),(0,a.kt)("p",null,"async/await is built on top of promises and provides a cleaner and more readable syntax for handling asynchronous operations. A function declared with the async keyword always returns a promise."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"async"),": This keyword is used to declare an asynchronous function."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"await"),": This keyword can only be used inside an async function and is used to pause the execution of the async function until the promise is resolved or rejected."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'async function fetchData() {\n  let response = await fetch("https://api.example.com/data");\n  let data = await response.json();\n  console.log(data);\n}\nfetchData();\n')))}p.isMDXComponent=!0}}]);