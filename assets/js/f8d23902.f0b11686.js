"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1828],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>h});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),p=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=p(e.components);return r.createElement(l.Provider,{value:t},e.children)},s="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,l=e.parentName,m=a(e,["components","mdxType","originalType","parentName"]),s=p(n),g=o,h=s["".concat(l,".").concat(g)]||s[g]||u[g]||c;return n?r.createElement(h,i(i({ref:t},m),{},{components:n})):r.createElement(h,i({ref:t},m))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,i=new Array(c);i[0]=g;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=e,a[s]="string"==typeof e?e:o,i[1]=a;for(var p=2;p<c;p++)i[p]=n[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1162:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>c,metadata:()=>a,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const c={title:"Big O Notation"},i=void 0,a={unversionedId:"programming/concept/bigo",id:"programming/concept/bigo",title:"Big O Notation",description:"Some common complexities",source:"@site/docs/programming/concept/bigo.md",sourceDirName:"programming/concept",slug:"/programming/concept/bigo",permalink:"/docs/programming/concept/bigo",draft:!1,tags:[],version:"current",frontMatter:{title:"Big O Notation"},sidebar:"programming",previous:{title:"Staking in Blockchain",permalink:"/docs/programming/blockchain/staking"},next:{title:"Process and Thread",permalink:"/docs/programming/concept/process-and-thread"}},l={},p=[{value:"Some common complexities",id:"some-common-complexities",level:2},{value:"The steps to calculate the complexity of an algorithm are",id:"the-steps-to-calculate-the-complexity-of-an-algorithm-are",level:2}],m={toc:p},s="wrapper";function u(e){let{components:t,...n}=e;return(0,o.kt)(s,(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"some-common-complexities"},"Some common complexities"),(0,o.kt)("p",null,"O(n): \u0110\u1ed9 ph\u1ee9c t\u1ea1p tuy\u1ebfn t\xednh. Xem x\xe9t h\xe0m t\xednh t\u1ed5ng c\u1ee7a c\xe1c s\u1ed1 t\u1eeb 1 \u0111\u1ebfn n."),(0,o.kt)("p",null,"O(1): \u0110\u1ed9 ph\u1ee9c t\u1ea1p h\u1eb1ng s\u1ed1. \u0110\xe2y c\u0169ng l\xe0 b\xe0i to\xe1n t\xednh t\u1ed5ng c\u1ee7a c\xe1c s\u1ed1 t\u1eeb 1 \u0111\u1ebfn n."),(0,o.kt)("p",null,"O(n\xb2): Th\u01b0\u1eddng xu\u1ea5t hi\u1ec7n khi c\xf3 hai v\xf2ng l\u1eb7p l\u1ed3ng nhau."),(0,o.kt)("h2",{id:"the-steps-to-calculate-the-complexity-of-an-algorithm-are"},"The steps to calculate the complexity of an algorithm are"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-c"},"int sum(int n)\n{\n    int s = 0; // ---\x3eO(1)\n    for(int i = 1; i <= n; i++) // n l\u1ea7n\n        s += i; // ---\x3eO(1)\n    return s;   // ---\x3eO(1)\n}\n")),(0,o.kt)("p",null,"D\u1ef1a tr\xean c\xe1c ch\xfa th\xedch \u1edf tr\xean, trong tr\u01b0\u1eddng h\u1ee3p n\xe0y T = O(1) + n x O(1) + O(1) = n x c + d (s\u1eed d\u1ee5ng (3), xem O(1) + O(1) nh\u01b0 l\xe0 d, trong \u0111\xf3 c, d l\xe0 h\u1eb1ng s\u1ed1) = n (nh\u01b0 \u0111\xe3 \u0111\u1ec1 c\u1eadp \u1edf tr\xean, n c\xf3 th\u1ec3 coi nh\u01b0 +\u221e, s\u1eed d\u1ee5ng (4) \u0111\u1ec3 lo\u1ea1i b\u1ecf c, d) = O(n)."),(0,o.kt)("p",null,(0,o.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png",alt:"Image"})))}u.isMDXComponent=!0}}]);