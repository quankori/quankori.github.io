"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[968],{3905:(n,t,e)=>{e.d(t,{Zo:()=>g,kt:()=>p});var r=e(7294);function c(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function i(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function h(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?i(Object(e),!0).forEach((function(t){c(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function a(n,t){if(null==n)return{};var e,r,c=function(n,t){if(null==n)return{};var e,r,c={},i=Object.keys(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)>=0||(c[e]=n[e]);return c}(n,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(c[e]=n[e])}return c}var l=r.createContext({}),o=function(n){var t=r.useContext(l),e=t;return n&&(e="function"==typeof n?n(t):h(h({},t),n)),e},g=function(n){var t=o(n.components);return r.createElement(l.Provider,{value:t},n.children)},s="mdxType",m={inlineCode:"code",wrapper:function(n){var t=n.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(n,t){var e=n.components,c=n.mdxType,i=n.originalType,l=n.parentName,g=a(n,["components","mdxType","originalType","parentName"]),s=o(e),u=c,p=s["".concat(l,".").concat(u)]||s[u]||m[u]||i;return e?r.createElement(p,h(h({ref:t},g),{},{components:e})):r.createElement(p,h({ref:t},g))}));function p(n,t){var e=arguments,c=t&&t.mdxType;if("string"==typeof n||c){var i=e.length,h=new Array(i);h[0]=u;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=n,a[s]="string"==typeof n?n:c,h[1]=a;for(var o=2;o<i;o++)h[o]=e[o];return r.createElement.apply(null,h)}return r.createElement.apply(null,e)}u.displayName="MDXCreateElement"},9538:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>l,contentTitle:()=>h,default:()=>m,frontMatter:()=>i,metadata:()=>a,toc:()=>o});var r=e(7462),c=(e(7294),e(3905));const i={title:"Serverless Architecture"},h=void 0,a={unversionedId:"blog/system-design/serverless",id:"blog/system-design/serverless",title:"Serverless Architecture",description:"\u0110\xe2y l\xe0 m\u1ed9t c\xe1ch ti\u1ebfp c\u1eadn n\u01a1i nh\xe0 cung c\u1ea5p \u0111\xe1m m\xe2y (cloud provider) ch\u1ecbu tr\xe1ch nhi\u1ec7m ho\xe0n to\xe0n vi\u1ec7c qu\u1ea3n l\xfd c\u01a1 s\u1edf h\u1ea1 t\u1ea7ng m\xe1y ch\u1ee7, bao g\u1ed3m vi\u1ec7c c\u1ea5p ph\xe1t t\xe0i nguy\xean, v\xe1 l\u1ed7i h\u1ec7 \u0111i\u1ec1u h\xe0nh, v\xe0 t\u1ef1 \u0111\u1ed9ng co gi\xe3n (scaling). Nh\xe0 ph\xe1t tri\u1ec3n ch\u1ec9 c\u1ea7n t\u1eadp trung v\xe0o vi\u1ec7c vi\u1ebft v\xe0 tri\u1ec3n khai m\xe3 ngu\u1ed3n (th\u01b0\u1eddng d\u01b0\u1edbi d\u1ea1ng c\xe1c h\xe0m - functions) m\xe0 kh\xf4ng c\u1ea7n b\u1eadn t\xe2m \u0111\u1ebfn m\xe1y ch\u1ee7 v\u1eadt l\xfd hay \u1ea3o b\xean d\u01b0\u1edbi.",source:"@site/docs/blog/system-design/serverless.md",sourceDirName:"blog/system-design",slug:"/blog/system-design/serverless",permalink:"/blog/system-design/serverless",draft:!1,tags:[],version:"current",frontMatter:{title:"Serverless Architecture"},sidebar:"blog",previous:{title:"Microservices Architecture",permalink:"/blog/system-design/microservices"}},l={},o=[],g={toc:o},s="wrapper";function m(n){let{components:t,...e}=n;return(0,c.kt)(s,(0,r.Z)({},g,e,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"\u0110\xe2y l\xe0 m\u1ed9t c\xe1ch ti\u1ebfp c\u1eadn n\u01a1i nh\xe0 cung c\u1ea5p \u0111\xe1m m\xe2y (cloud provider) ch\u1ecbu tr\xe1ch nhi\u1ec7m ho\xe0n to\xe0n vi\u1ec7c qu\u1ea3n l\xfd c\u01a1 s\u1edf h\u1ea1 t\u1ea7ng m\xe1y ch\u1ee7, bao g\u1ed3m vi\u1ec7c c\u1ea5p ph\xe1t t\xe0i nguy\xean, v\xe1 l\u1ed7i h\u1ec7 \u0111i\u1ec1u h\xe0nh, v\xe0 t\u1ef1 \u0111\u1ed9ng co gi\xe3n (scaling). Nh\xe0 ph\xe1t tri\u1ec3n ch\u1ec9 c\u1ea7n t\u1eadp trung v\xe0o vi\u1ec7c vi\u1ebft v\xe0 tri\u1ec3n khai m\xe3 ngu\u1ed3n (th\u01b0\u1eddng d\u01b0\u1edbi d\u1ea1ng c\xe1c h\xe0m - functions) m\xe0 kh\xf4ng c\u1ea7n b\u1eadn t\xe2m \u0111\u1ebfn m\xe1y ch\u1ee7 v\u1eadt l\xfd hay \u1ea3o b\xean d\u01b0\u1edbi."),(0,c.kt)("p",null,(0,c.kt)("strong",{parentName:"p"},"C\xe1c \u0111\u1eb7c \u0111i\u1ec3m ch\xednh:")),(0,c.kt)("ol",null,(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"Kh\xf4ng qu\u1ea3n l\xfd m\xe1y ch\u1ee7 (No Server Management):")," \u0110\xe2y l\xe0 \u0111i\u1ec3m c\u1ed1t l\xf5i. B\u1ea1n kh\xf4ng c\u1ea7n ph\u1ea3i lo l\u1eafng v\u1ec1 vi\u1ec7c c\xe0i \u0111\u1eb7t, c\u1ea5u h\xecnh, b\u1ea3o tr\xec hay n\xe2ng c\u1ea5p m\xe1y ch\u1ee7."),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"Function as a Service (FaaS):")," L\xe0 th\xe0nh ph\u1ea7n ph\u1ed5 bi\u1ebfn nh\u1ea5t c\u1ee7a serverless. M\xe3 ngu\u1ed3n \u0111\u01b0\u1ee3c t\u1ed5 ch\u1ee9c th\xe0nh c\xe1c h\xe0m nh\u1ecf, \u0111\u1ed9c l\u1eadp, ch\u1ec9 ch\u1ea1y khi \u0111\u01b0\u1ee3c k\xedch ho\u1ea1t b\u1edfi m\u1ed9t s\u1ef1 ki\u1ec7n n\xe0o \u0111\xf3. V\xed d\u1ee5: AWS Lambda, Azure Functions, Google Cloud Functions."),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"T\u1ef1 \u0111\u1ed9ng co gi\xe3n (Automatic Scaling):")," N\u1ec1n t\u1ea3ng \u0111\xe1m m\xe2y t\u1ef1 \u0111\u1ed9ng t\u0103ng ho\u1eb7c gi\u1ea3m s\u1ed1 l\u01b0\u1ee3ng t\xe0i nguy\xean c\u1ea7n thi\u1ebft \u0111\u1ec3 x\u1eed l\xfd l\u01b0\u1ee3ng t\u1ea3i hi\u1ec7n t\u1ea1i. B\u1ea1n kh\xf4ng c\u1ea7n c\u1ea5u h\xecnh auto-scaling th\u1ee7 c\xf4ng."),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"Thanh to\xe1n theo m\u1ee9c s\u1eed d\u1ee5ng (Pay-as-you-go / Pay-per-execution):")," B\u1ea1n th\u01b0\u1eddng ch\u1ec9 tr\u1ea3 ti\u1ec1n cho th\u1eddi gian th\u1ef1c thi m\xe3 ngu\u1ed3n v\xe0 t\xe0i nguy\xean \u0111\xe3 ti\xeau th\u1ee5 (v\xed d\u1ee5: s\u1ed1 l\u01b0\u1ee3t g\u1ecdi h\xe0m, th\u1eddi gian ch\u1ea1y, b\u1ed9 nh\u1edb s\u1eed d\u1ee5ng), thay v\xec tr\u1ea3 ti\u1ec1n cho m\xe1y ch\u1ee7 ch\u1ea1y li\xean t\u1ee5c 24/7. Khi kh\xf4ng c\xf3 y\xeau c\u1ea7u n\xe0o, b\u1ea1n c\xf3 th\u1ec3 kh\xf4ng t\u1ed1n chi ph\xed t\xednh to\xe1n."),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"H\u01b0\u1edbng s\u1ef1 ki\u1ec7n (Event-Driven):")," C\xe1c h\xe0m serverless th\u01b0\u1eddng \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 \u0111\u01b0\u1ee3c k\xedch ho\u1ea1t b\u1edfi c\xe1c s\u1ef1 ki\u1ec7n, v\xed d\u1ee5: m\u1ed9t y\xeau c\u1ea7u HTTP \u0111\u1ebfn API Gateway, m\u1ed9t t\u1ec7p m\u1edbi \u0111\u01b0\u1ee3c t\u1ea3i l\xean b\u1ed9 nh\u1edb l\u01b0u tr\u1eef (S3, Blob Storage), m\u1ed9t tin nh\u1eafn m\u1edbi trong h\xe0ng \u0111\u1ee3i (SQS, Service Bus), m\u1ed9t thay \u0111\u1ed5i trong c\u01a1 s\u1edf d\u1eef li\u1ec7u, ho\u1eb7c m\u1ed9t l\u1ecbch tr\xecnh \u0111\u1ecbnh s\u1eb5n."),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("strong",{parentName:"li"},"Backend as a Service (BaaS):")," Serverless c\u0169ng th\u01b0\u1eddng t\u1eadn d\u1ee5ng c\xe1c d\u1ecbch v\u1ee5 backend \u0111\u01b0\u1ee3c qu\u1ea3n l\xfd ho\xe0n to\xe0n kh\xe1c nh\u01b0 c\u01a1 s\u1edf d\u1eef li\u1ec7u (DynamoDB, Firestore), x\xe1c th\u1ef1c (Auth0, Firebase Auth), l\u01b0u tr\u1eef t\u1ec7p...")),(0,c.kt)("p",null,(0,c.kt)("strong",{parentName:"p"},"\u01afu \u0111i\u1ec3m:")),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"Gi\u1ea3m g\xe1nh n\u1eb7ng v\u1eadn h\xe0nh v\xe0 qu\u1ea3n l\xfd h\u1ea1 t\u1ea7ng."),(0,c.kt)("li",{parentName:"ul"},"Ti\u1ec1m n\u0103ng ti\u1ebft ki\u1ec7m chi ph\xed (n\u1ebfu \u1ee9ng d\u1ee5ng c\xf3 l\u01b0u l\u01b0\u1ee3ng kh\xf4ng \u0111\u1ec1u)."),(0,c.kt)("li",{parentName:"ul"},"T\u0103ng t\u1ed1c \u0111\u1ed9 ph\xe1t tri\u1ec3n v\xe0 tri\u1ec3n khai."),(0,c.kt)("li",{parentName:"ul"},"T\u1ef1 \u0111\u1ed9ng co gi\xe3n linh ho\u1ea1t.")),(0,c.kt)("p",null,(0,c.kt)("strong",{parentName:"p"},"Nh\u01b0\u1ee3c \u0111i\u1ec3m:")),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"Cold Starts:")," C\xf3 th\u1ec3 c\xf3 \u0111\u1ed9 tr\u1ec5 khi m\u1ed9t h\xe0m \u0111\u01b0\u1ee3c g\u1ecdi l\u1ea7n \u0111\u1ea7u ti\xean sau m\u1ed9t th\u1eddi gian kh\xf4ng ho\u1ea1t \u0111\u1ed9ng."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"Vendor Lock-in:")," Ph\u1ee5 thu\u1ed9c nhi\u1ec1u v\xe0o c\xe1c d\u1ecbch v\u1ee5 v\xe0 API c\u1ee7a nh\xe0 cung c\u1ea5p \u0111\xe1m m\xe2y c\u1ee5 th\u1ec3."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"H\u1ea1n ch\u1ebf t\xe0i nguy\xean:")," C\xe1c h\xe0m FaaS th\u01b0\u1eddng c\xf3 gi\u1edbi h\u1ea1n v\u1ec1 th\u1eddi gian th\u1ef1c thi, b\u1ed9 nh\u1edb, k\xedch th\u01b0\u1edbc g\xf3i m\xe3 ngu\u1ed3n."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"Qu\u1ea3n l\xfd tr\u1ea1ng th\xe1i:")," C\xe1c h\xe0m FaaS th\u01b0\u1eddng l\xe0 stateless, vi\u1ec7c qu\u1ea3n l\xfd tr\u1ea1ng th\xe1i gi\u1eefa c\xe1c l\u1ea7n g\u1ecdi c\u1ea7n gi\u1ea3i ph\xe1p b\xean ngo\xe0i (nh\u01b0 database, cache)."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"Kh\xf3 g\u1ee1 l\u1ed7i v\xe0 gi\xe1m s\xe1t (Observability):")," Vi\u1ec7c theo d\xf5i v\xe0 g\u1ee1 l\u1ed7i trong m\xf4i tr\u01b0\u1eddng ph\xe2n t\xe1n, kh\xf4ng c\xf3 m\xe1y ch\u1ee7 c\u1ed1 \u0111\u1ecbnh c\xf3 th\u1ec3 ph\u1ee9c t\u1ea1p h\u01a1n.")),(0,c.kt)("p",null,"T\xf3m l\u1ea1i, Serverless l\xe0 m\u1ed9t m\xf4 h\xecnh m\u1ea1nh m\u1ebd cho ph\xe9p t\u1eadp trung v\xe0o logic nghi\u1ec7p v\u1ee5, nh\u01b0ng c\u0169ng c\u1ea7n c\xe2n nh\u1eafc k\u1ef9 c\xe1c \u0111\u1eb7c \u0111i\u1ec3m v\xe0 th\xe1ch th\u1ee9c c\u1ee7a n\xf3 khi l\u1ef1a ch\u1ecdn cho d\u1ef1 \xe1n. N\xf3 c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c d\xf9ng \u0111\u1ec3 x\xe2y d\u1ef1ng to\xe0n b\u1ed9 \u1ee9ng d\u1ee5ng ho\u1eb7c ch\u1ec9 m\u1ed9t ph\u1ea7n c\u1ee7a h\u1ec7 th\u1ed1ng, \u0111\xf4i khi k\u1ebft h\u1ee3p v\u1edbi microservices truy\u1ec1n th\u1ed1ng."))}m.isMDXComponent=!0}}]);