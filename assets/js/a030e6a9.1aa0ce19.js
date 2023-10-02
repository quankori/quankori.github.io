"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4404],{3905:(n,t,e)=>{e.d(t,{Zo:()=>g,kt:()=>m});var r=e(7294);function o(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function a(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function c(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?a(Object(e),!0).forEach((function(t){o(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function p(n,t){if(null==n)return{};var e,r,o=function(n,t){if(null==n)return{};var e,r,o={},a=Object.keys(n);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||(o[e]=n[e]);return o}(n,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(o[e]=n[e])}return o}var i=r.createContext({}),l=function(n){var t=r.useContext(i),e=t;return n&&(e="function"==typeof n?n(t):c(c({},t),n)),e},g=function(n){var t=l(n.components);return r.createElement(i.Provider,{value:t},n.children)},h="mdxType",s={inlineCode:"code",wrapper:function(n){var t=n.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(n,t){var e=n.components,o=n.mdxType,a=n.originalType,i=n.parentName,g=p(n,["components","mdxType","originalType","parentName"]),h=l(e),u=o,m=h["".concat(i,".").concat(u)]||h[u]||s[u]||a;return e?r.createElement(m,c(c({ref:t},g),{},{components:e})):r.createElement(m,c({ref:t},g))}));function m(n,t){var e=arguments,o=t&&t.mdxType;if("string"==typeof n||o){var a=e.length,c=new Array(a);c[0]=u;var p={};for(var i in t)hasOwnProperty.call(t,i)&&(p[i]=t[i]);p.originalType=n,p[h]="string"==typeof n?n:o,c[1]=p;for(var l=2;l<a;l++)c[l]=e[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,e)}u.displayName="MDXCreateElement"},3945:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>i,contentTitle:()=>c,default:()=>s,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var r=e(7462),o=(e(7294),e(3905));const a={title:"Loop"},c=void 0,p={unversionedId:"programming/nodejs/loop",id:"programming/nodejs/loop",title:"Loop",description:"Trong JavaScript, c\xf3 nhi\u1ec1u c\xe1ch \u0111\u1ec3 duy\u1ec7t qua m\u1ea3ng, nh\u01b0ng hi\u1ec7u n\u0103ng c\xf3 th\u1ec3 kh\xe1c nhau t\xf9y thu\u1ed9c v\xe0o tr\xecnh duy\u1ec7t v\xe0 phi\xean b\u1ea3n JavaScript. D\u01b0\u1edbi \u0111\xe2y l\xe0 m\u1ed9t s\u1ed1 ph\u01b0\u01a1ng ph\xe1p th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:",source:"@site/docs/programming/nodejs/loop.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/loop",permalink:"/docs/programming/nodejs/loop",draft:!1,tags:[],version:"current",frontMatter:{title:"Loop"},sidebar:"programming",previous:{title:"Types and Interfaces Typescript",permalink:"/docs/programming/nodejs/types-interfaces"},next:{title:"Nest.js Dependency Injection (DI)",permalink:"/docs/programming/nodejs/nestjs-di"}},i={},l=[],g={toc:l},h="wrapper";function s(n){let{components:t,...e}=n;return(0,o.kt)(h,(0,r.Z)({},g,e,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Trong JavaScript, c\xf3 nhi\u1ec1u c\xe1ch \u0111\u1ec3 duy\u1ec7t qua m\u1ea3ng, nh\u01b0ng hi\u1ec7u n\u0103ng c\xf3 th\u1ec3 kh\xe1c nhau t\xf9y thu\u1ed9c v\xe0o tr\xecnh duy\u1ec7t v\xe0 phi\xean b\u1ea3n JavaScript. D\u01b0\u1edbi \u0111\xe2y l\xe0 m\u1ed9t s\u1ed1 ph\u01b0\u01a1ng ph\xe1p th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng:"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"For Loop C\u1ed5 \u0110i\u1ec3n"),": Th\u01b0\u1eddng l\xe0 nhanh nh\u1ea5t nh\u01b0ng c\xf3 c\xfa ph\xe1p kh\xe1 \u0111\u1ea7y \u0111\u1ee7."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"For-Of Loop"),": C\xfa ph\xe1p s\xe1ng s\u1ee7a h\u01a1n, nh\u01b0ng c\xf3 th\u1ec3 ch\u1eadm h\u01a1n m\u1ed9t ch\xfat \u0111\u1ed1i v\u1edbi m\u1ea3ng l\u1edbn."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"for (const item of arr) {\n  console.log(item);\n}\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"forEach Method"),": R\xf5 r\xe0ng v\xe0 thu\u1eadn ti\u1ec7n, nh\u01b0ng kh\xf4ng th\u1ec3 d\u1eebng loop b\u1eb1ng break."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"arr.forEach(function (item) {\n  console.log(item);\n});\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Map Method"),": T\u1ea1o m\u1ea3ng m\u1edbi b\u1eb1ng c\xe1ch \xe1p d\u1ee5ng m\u1ed9t h\xe0m l\xean t\u1eebng ph\u1ea7n t\u1eed c\u1ee7a m\u1ea3ng g\u1ed1c."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const newArr = arr.map((item) => item * 2);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Filter Method"),": T\u1ea1o m\u1ea3ng m\u1edbi v\u1edbi c\xe1c ph\u1ea7n t\u1eed th\u1ecfa m\xe3n \u0111i\u1ec1u ki\u1ec7n n\xe0o \u0111\xf3."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const filtered = arr.filter((item) => item > 2);\n")),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Reduce Method"),": T\xednh to\xe1n gi\xe1 tr\u1ecb t\u1ed5ng h\u1ee3p t\u1eeb m\u1ea3ng."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const sum = arr.reduce((acc, item) => acc + item, 0);\n")),(0,o.kt)("p",null,"V\u1ec1 Hi\u1ec7u N\u0103ng:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"for loop c\u1ed5 \u0111i\u1ec3n th\u01b0\u1eddng l\xe0 l\u1ef1a ch\u1ecdn nhanh nh\u1ea5t, nh\u1ea5t l\xe0 khi b\u1ea1n c\u1ea7n s\u1eed d\u1ee5ng ch\u1ec9 s\u1ed1 c\u1ee7a c\xe1c ph\u1ea7n t\u1eed trong m\u1ea3ng."),(0,o.kt)("li",{parentName:"ul"},"for-of v\xe0 .forEach() c\xf3 th\u1ec3 ch\u1eadm h\u01a1n m\u1ed9t ch\xfat v\xe0 n\xean \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng cho \u0111\u1ecdc m\xe3 d\u1ec5 d\xe0ng h\u01a1n ho\u1eb7c khi kh\xf4ng c\u1ea7n ch\u1ec9 s\u1ed1.")),(0,o.kt)("p",null,"N\u1ebfu hi\u1ec7u n\u0103ng l\xe0 \u01b0u ti\xean h\xe0ng \u0111\u1ea7u v\xe0 m\u1ea3ng c\u1ee7a b\u1ea1n r\u1ea5t l\u1edbn, s\u1eed d\u1ee5ng for loop c\u1ed5 \u0111i\u1ec3n c\xf3 l\u1ebd l\xe0 l\u1ef1a ch\u1ecdn t\u1ed1t nh\u1ea5t. Tuy nhi\xean, trong nhi\u1ec1u tr\u01b0\u1eddng h\u1ee3p, s\u1ef1 kh\xe1c bi\u1ec7t v\u1ec1 hi\u1ec7u n\u0103ng gi\u1eefa c\xe1c ph\u01b0\u01a1ng ph\xe1p n\xe0y kh\xf4ng \u0111\xe1ng k\u1ec3, v\xe0 vi\u1ec7c ch\u1ecdn l\u1ef1a th\u01b0\u1eddng d\u1ef1a tr\xean s\u1ef1 r\xf5 r\xe0ng v\xe0 t\xednh \u0111\u1ecdc \u0111\u01b0\u1ee3c c\u1ee7a m\xe3."),(0,o.kt)("p",null,"Tuy nhi\xean, s\u1ef1 kh\xe1c bi\u1ec7t v\u1ec1 hi\u1ec7u n\u0103ng gi\u1eefa c\xe1c ph\u01b0\u01a1ng ph\xe1p n\xe0y th\u01b0\u1eddng kh\xf4ng \u0111\xe1ng k\u1ec3 trong h\u1ea7u h\u1ebft c\xe1c \u1ee9ng d\u1ee5ng th\xf4ng th\u01b0\u1eddng. Th\u1ef1c t\u1ebf, trong m\u1ed9t s\u1ed1 tr\u01b0\u1eddng h\u1ee3p, m\xe1y \u1ea3o JavaScript c\xf3 th\u1ec3 t\u1ed1i \u01b0u h\xf3a \u0111o\u1ea1n m\xe3 s\u1eed d\u1ee5ng map, reduce, ho\u1eb7c filter \u0111\u1ebfn m\u1ee9c ch\xfang ch\u1ea1y nhanh ngang v\u1edbi v\xf2ng l\u1eb7p for c\u1ed5 \u0111i\u1ec3n."))}s.isMDXComponent=!0}}]);