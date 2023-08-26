"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6542],{3905:(n,t,e)=>{e.d(t,{Zo:()=>u,kt:()=>s});var c=e(7294);function i(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function a(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(n);t&&(c=c.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,c)}return e}function h(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?a(Object(e),!0).forEach((function(t){i(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function r(n,t){if(null==n)return{};var e,c,i=function(n,t){if(null==n)return{};var e,c,i={},a=Object.keys(n);for(c=0;c<a.length;c++)e=a[c],t.indexOf(e)>=0||(i[e]=n[e]);return i}(n,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(c=0;c<a.length;c++)e=a[c],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(i[e]=n[e])}return i}var l=c.createContext({}),o=function(n){var t=c.useContext(l),e=t;return n&&(e="function"==typeof n?n(t):h(h({},t),n)),e},u=function(n){var t=o(n.components);return c.createElement(l.Provider,{value:t},n.children)},g="mdxType",p={inlineCode:"code",wrapper:function(n){var t=n.children;return c.createElement(c.Fragment,{},t)}},m=c.forwardRef((function(n,t){var e=n.components,i=n.mdxType,a=n.originalType,l=n.parentName,u=r(n,["components","mdxType","originalType","parentName"]),g=o(e),m=i,s=g["".concat(l,".").concat(m)]||g[m]||p[m]||a;return e?c.createElement(s,h(h({ref:t},u),{},{components:e})):c.createElement(s,h({ref:t},u))}));function s(n,t){var e=arguments,i=t&&t.mdxType;if("string"==typeof n||i){var a=e.length,h=new Array(a);h[0]=m;var r={};for(var l in t)hasOwnProperty.call(t,l)&&(r[l]=t[l]);r.originalType=n,r[g]="string"==typeof n?n:i,h[1]=r;for(var o=2;o<a;o++)h[o]=e[o];return c.createElement.apply(null,h)}return c.createElement.apply(null,e)}m.displayName="MDXCreateElement"},3538:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>l,contentTitle:()=>h,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>o});var c=e(7462),i=(e(7294),e(3905));const a={title:"Node.js Concept"},h=void 0,r={unversionedId:"programming/nodejs/concept",id:"programming/nodejs/concept",title:"Node.js Concept",description:"Node.js structure",source:"@site/docs/programming/nodejs/concept.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/concept",permalink:"/docs/programming/nodejs/concept",draft:!1,tags:[],version:"current",frontMatter:{title:"Node.js Concept"},sidebar:"programming",previous:{title:"Singleton Pattern",permalink:"/docs/programming/pattern/singleton"},next:{title:"Process and Thread",permalink:"/docs/programming/nodejs/process-thread"}},l={},o=[{value:"Node.js structure",id:"nodejs-structure",level:2},{value:"Node.js Fundamentals",id:"nodejs-fundamentals",level:2},{value:"Single-threaded vs Multi-threaded",id:"single-threaded-vs-multi-threaded",level:2},{value:"1. Concurrency Model:",id:"1-concurrency-model",level:3},{value:"2. Memory Consumption:",id:"2-memory-consumption",level:3},{value:"3. Complexity:",id:"3-complexity",level:3},{value:"4. Scalability:",id:"4-scalability",level:3},{value:"Event loop",id:"event-loop",level:2},{value:"process.nextTick() and setImmediate() in Event Loop",id:"processnexttick-and-setimmediate-in-event-loop",level:2},{value:"process.nextTick()",id:"processnexttick",level:3},{value:"setImmediate()",id:"setimmediate",level:3},{value:"Side Effects",id:"side-effects",level:2},{value:"State Mutation",id:"state-mutation",level:2}],u={toc:o},g="wrapper";function p(n){let{components:t,...e}=n;return(0,i.kt)(g,(0,c.Z)({},u,e,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"nodejs-structure"},"Node.js structure"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"V8 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 th\xf4ng d\u1ecbch v\xe0 th\u1ef1c thi m\xe3 JavaScript."),(0,i.kt)("li",{parentName:"ul"},"Libuv \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 truy c\u1eadp v\xe0o h\u1ec7 th\u1ed1ng t\u1ec7p v\xe0 m\u1ed9t s\u1ed1 kh\xeda c\u1ea1nh c\u1ee7a \u0111\u1ed3ng th\u1eddi.")),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/3.PNG",alt:"Image"})),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/4.PNG",alt:"Image"})),(0,i.kt)("h2",{id:"nodejs-fundamentals"},"Node.js Fundamentals"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Event Loop & Non-Blocking I/O"),": Node.js \u0111\u1ea1t \u0111\u01b0\u1ee3c t\xednh \u0111\u1ed3ng th\u1eddi cao b\u1eb1ng c\xe1ch s\u1eed d\u1ee5ng v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n k\u1ebft h\u1ee3p v\u1edbi I/O kh\xf4ng ch\u1eb7n. Trong khi m\xe3 JavaScript ch\u1ea1y tr\xean m\u1ed9t lu\u1ed3ng duy nh\u1ea5t, nhi\u1ec1u ho\u1ea1t \u0111\u1ed9ng, \u0111\u1eb7c bi\u1ec7t l\xe0 I/O, \u0111\u01b0\u1ee3c g\u1eedi \u0111i, cho ph\xe9p lu\u1ed3ng ch\xednh x\u1eed l\xfd c\xe1c nhi\u1ec7m v\u1ee5 kh\xe1c m\xe0 kh\xf4ng c\u1ea7n ch\u1edd \u0111\u1ee3i. C\u01a1 ch\u1ebf n\xe0y l\xe0m cho Node.js hi\u1ec7u qu\u1ea3 cho c\xe1c \u1ee9ng d\u1ee5ng li\xean quan \u0111\u1ebfn I/O.")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Worker Threads"),': Node.js gi\u1edbi thi\u1ec7u m\xf4-\u0111un "worker_threads" t\u1eeb phi\xean b\u1ea3n 10.5.0, cung c\u1ea5p kh\u1ea3 n\u0103ng ch\u1ea1y m\xe3 JavaScript trong c\xe1c lu\u1ed3ng song song, n\xe2ng cao kh\u1ea3 n\u0103ng x\u1eed l\xfd nhi\u1ec7m v\u1ee5 li\xean quan \u0111\u1ebfn CPU.'))),(0,i.kt)("h2",{id:"single-threaded-vs-multi-threaded"},"Single-threaded vs Multi-threaded"),(0,i.kt)("h3",{id:"1-concurrency-model"},"1. Concurrency Model:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Node.js (Single-threaded)"),": D\u1ef1a v\xe0o m\xf4 h\xecnh s\u1ef1 ki\u1ec7n, I/O kh\xf4ng ch\u1eb7n, ph\xf9 h\u1ee3p cho c\xe1c nhi\u1ec7m v\u1ee5 li\xean quan \u0111\u1ebfn I/O. C\xe1c nhi\u1ec7m v\u1ee5 li\xean quan \u0111\u1ebfn CPU c\xf3 th\u1ec3 g\u1eb7p kh\xf3 kh\u0103n, tr\u1eeb khi s\u1eed d\u1ee5ng lu\u1ed3ng c\xf4ng vi\u1ec7c (worker threads) ho\u1eb7c gom c\u1ee5m (clustering).")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Other Languages (Multi-threaded)"),":Ng\xf4n ng\u1eef nh\u01b0 Java ho\u1eb7c C# s\u1eed d\u1ee5ng \u0111a lu\u1ed3ng, ph\xf9 h\u1ee3p cho c\u1ea3 c\xe1c nhi\u1ec7m v\u1ee5 li\xean quan \u0111\u1ebfn I/O v\xe0 CPU. Tuy nhi\xean, ch\xfang \u0111\u01b0a ra c\xe1c th\xe1ch t"))),(0,i.kt)("h3",{id:"2-memory-consumption"},"2. Memory Consumption:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Node.js"),": Th\u01b0\u1eddng th\u1ea5p h\u01a1n do kh\xf4ng c\u1ea7n nhi\u1ec1u lu\u1ed3ng cho m\u1ed7i k\u1ebft n\u1ed1i. Tuy nhi\xean, c\u1ea7n \u0111\u1ea3m b\u1ea3o v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n kh\xf4ng b\u1ecb ch\u1eb7n \u0111\u1ec3 duy tr\xec hi\u1ec7u su\u1ea5t.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Multi-threaded Languages"),": C\xf3 th\u1ec3 c\xf3 k\xedch th\u01b0\u1edbc l\u1edbn h\u01a1n v\xec m\u1ed7i lu\u1ed3ng duy tr\xec m\u1ed9t ng\u0103n x\u1ebfp ri\xeang, nh\u01b0ng c\xf3 th\u1ec3 ph\xe2n ph\u1ed1i c\xe1c nhi\u1ec7m v\u1ee5 li\xean quan \u0111\u1ebfn CPU m\u1ed9t c\xe1ch hi\u1ec7u qu\u1ea3."))),(0,i.kt)("h3",{id:"3-complexity"},"3. Complexity:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Node.js"),": Th\u01b0\u1eddng \u0111\u01a1n gi\u1ea3n h\u01a1n v\u1ec1 qu\u1ea3n l\xfd \u0111\u1ed3ng th\u1eddi. Trong h\u1ea7u h\u1ebft c\xe1c t\xecnh hu\u1ed1ng, kh\xf4ng c\u1ea7n ph\u1ea3i qu\u1ea3n l\xfd \u0111\u1ed3ng b\u1ed9 h\xf3a lu\u1ed3ng. V\u1ea5n \u0111\u1ec1 ch\xednh l\xe0 tr\xe1nh ch\u1eb7n v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Multi-threaded Languages"),": C\xf3 th\u1ec3 ph\u1ee9c t\u1ea1p do qu\u1ea3n l\xfd lu\u1ed3ng t\u01b0\u1eddng minh, c\xe1c v\u1ea5n \u0111\u1ec1 \u0111\u1ed3ng b\u1ed9 h\xf3a lu\u1ed3ng v\xe0 nguy c\u01a1 t\u1eafc ngh\u1ebdn ti\u1ec1m t\xe0ng."))),(0,i.kt)("h3",{id:"4-scalability"},"4. Scalability:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Node.js"),": M\u1edf r\u1ed9ng theo chi\u1ec1u ngang b\u1eb1ng c\xe1ch th\xeam nhi\u1ec1u phi\xean b\u1ea3n. \u0110i\u1ec1u n\xe0y c\xf3 th\u1ec3 th\u1ef1c hi\u1ec7n th\xf4ng qua c\xe1c c\xf4ng c\u1ee5 nh\u01b0 m\xf4-\u0111un gom c\u1ee5m (cluster module) ho\u1eb7c c\xe1c ti\u1ec7n \xedch tri\u1ec3n khai h\u1ed9p \u0111i\u1ec1u khi\u1ec3n (container orchestration).")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("strong",{parentName:"p"},"Multi-threaded Languages"),": C\xf3 th\u1ec3 m\u1edf r\u1ed9ng c\u1ea3 theo chi\u1ec1u d\u1ecdc (th\xeam lu\u1ed3ng) v\xe0 chi\u1ec1u ngang (th\xeam m\xe1y)."))),(0,i.kt)("p",null,'Node.js th\u1ef1c s\u1ef1 c\xf3 th\u1ec3 ho\u1ea1t \u0111\u1ed9ng theo c\xe1ch \u0111a lu\u1ed3ng v\u1edbi m\xf4-\u0111un "worker_threads". Tuy nhi\xean, thi\u1ebft k\u1ebf ch\xednh c\u1ee7a n\xf3 l\xe0 \u0111\u01a1n lu\u1ed3ng. Vi\u1ec7c tri\u1ec3n khai nhi\u1ec1u lu\u1ed3ng trong Node.js \u0111\u01b0a ra c\xe1c th\xe1ch th\u1ee9c \u0111i\u1ec3n h\xecnh c\u1ee7a l\u1eadp tr\xecnh \u0111a lu\u1ed3ng trong c\xe1c ng\xf4n ng\u1eef kh\xe1c.'),(0,i.kt)("h2",{id:"event-loop"},"Event loop"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Khi g\u1eedi m\u1ed9t y\xeau c\u1ea7u b\u1ea5t \u0111\u1ed3ng b\u1ed9, nh\u01b0 y\xeau c\u1ea7u HTTP, Node.js kh\xf4ng \u0111\u1ee3i y\xeau c\u1ea7u \u0111\xf3 ho\xe0n th\xe0nh tr\u01b0\u1edbc khi ti\u1ebfp t\u1ee5c th\u1ef1c thi c\xe1c y\xeau c\u1ea7u kh\xe1c. Thay v\xe0o \u0111\xf3, Node.js g\u1eedi y\xeau c\u1ea7u \u0111\xf3 t\u1edbi h\u1ec7 th\u1ed1ng v\xe0 ti\u1ebfp t\u1ee5c th\u1ef1c thi c\xe1c y\xeau c\u1ea7u kh\xe1c. Khi y\xeau c\u1ea7u \u0111\xf3 ho\xe0n th\xe0nh, h\u1ec7 th\u1ed1ng th\xf4ng b\xe1o cho Node.js r\u1eb1ng y\xeau c\u1ea7u \u0111\xe3 ho\xe0n th\xe0nh, v\xe0 Node.js ti\u1ebfp t\u1ee5c th\u1ef1c thi c\xe1c nhi\u1ec7m v\u1ee5 kh\xe1c.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"C\xe1c nhi\u1ec7m v\u1ee5 trong v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n \u0111\u01b0\u1ee3c x\u1ebfp h\xe0ng trong c\xe1c h\xe0ng \u0111\u1ee3i kh\xe1c nhau, bao g\u1ed3m:"),(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Task queue (also known as a callback queue): Ch\u1ee9a c\xe1c h\xe0m callback \u0111\u01b0\u1ee3c g\u1ecdi khi m\u1ed9t y\xeau c\u1ea7u b\u1ea5t \u0111\u1ed3ng b\u1ed9 k\u1ebft th\xfac.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Microtask queue: Ch\u1ee9a c\xe1c h\xe0m callback \u0111\u01b0\u1ee3c g\u1ecdi khi m\u1ed9t promise \u0111\u01b0\u1ee3c gi\u1ea3i quy\u1ebft ho\u1eb7c b\u1ecb t\u1eeb ch\u1ed1i.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Timers queue: Ch\u1ee9a c\xe1c h\xe0m callback \u0111\u01b0\u1ee3c g\u1ecdi khi m\u1ed9t th\u1eddi gian ho\u1eb7c h\u1eb9n gi\u1edd (timeout ho\u1eb7c interval) \u0111\u01b0\u1ee3c k\xedch ho\u1ea1t.")))),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Khi v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n b\u1eaft \u0111\u1ea7u, n\xf3 th\u1ef1c thi c\xe1c nhi\u1ec7m v\u1ee5 trong h\xe0ng \u0111\u1ee3i microtask tr\u01b0\u1edbc, sau \u0111\xf3 l\xe0 h\xe0ng \u0111\u1ee3i nhi\u1ec7m v\u1ee5, v\xe0 cu\u1ed1i c\xf9ng l\xe0 h\xe0ng \u0111\u1ee3i timers.")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Khi m\u1ed9t nhi\u1ec7m v\u1ee5 \u0111\u01b0\u1ee3c th\u1ef1c thi, Node.js \u0111\u1eb7t n\xf3 v\xe0o m\u1ed9t v\xf2ng l\u1eb7p v\xf4 t\u1eadn \u0111\u1ec3 \u0111\u1ee3i c\xe1c nhi\u1ec7m v\u1ee5 kh\xe1c. Trong l\xfac \u0111\u1ee3i, Node.js ti\u1ebfp t\u1ee5c th\u1ef1c thi c\xe1c nhi\u1ec7m v\u1ee5 trong h\xe0ng \u0111\u1ee3i v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n."))),(0,i.kt)("h2",{id:"processnexttick-and-setimmediate-in-event-loop"},"process.nextTick() and setImmediate() in Event Loop"),(0,i.kt)("p",null,"Trong Node.js, c\u1ea3 process.nextTick() v\xe0 setImmediate() \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 l\xean l\u1ecbch th\u1ef1c thi m\u1ed9t h\xe0m callback sau khi giai \u0111o\u1ea1n hi\u1ec7n t\u1ea1i c\u1ee7a v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n ho\xe0n th\xe0nh. Tuy nhi\xean, ch\xfang ho\u1ea1t \u0111\u1ed9ng trong c\xe1c ph\u1ea7n kh\xe1c nhau c\u1ee7a v\xf2ng l\u1eb7p."),(0,i.kt)("h3",{id:"processnexttick"},"process.nextTick()"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Description"),": L\xean l\u1ecbch m\u1ed9t h\xe0m callback \u0111\u01b0\u1ee3c g\u1ecdi sau khi giai \u0111o\u1ea1n hi\u1ec7n t\u1ea1i c\u1ee7a v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n ho\xe0n th\xe0nh v\xe0 tr\u01b0\u1edbc b\u1ea5t k\u1ef3 ho\u1ea1t \u0111\u1ed9ng I/O n\xe0o di\u1ec5n ra."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Operation"),': H\xe0m callback \u0111\u01b0\u1ee3c th\xeam v\xe0o m\u1ed9t h\xe0ng \u0111\u1ee3i \u0111\u1eb7c bi\u1ec7t \u0111\u01b0\u1ee3c g\u1ecdi l\xe0 "nextTick queue," v\xe0 s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi sau m\u1ed7i giai \u0111o\u1ea1n c\u1ee7a v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n. \u0110i\u1ec1u n\xe0y c\xf3 ngh\u0129a l\xe0 n\u1ebfu b\u1ea1n ti\u1ebfp t\u1ee5c th\xeam c\xe1c h\xe0m v\xe0o h\xe0ng \u0111\u1ee3i "nextTick," v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n c\xf3 th\u1ec3 b\u1ecb m\u1eafc k\u1eb9t trong giai \u0111o\u1ea1n hi\u1ec7n t\u1ea1i, v\xe0 c\xe1c ho\u1ea1t \u0111\u1ed9ng kh\xe1c (nh\u01b0 I/O) c\xf3 th\u1ec3 b\u1ecb tr\xec ho\xe3n.'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'console.log("Start");\n\nprocess.nextTick(() => {\n  console.log("Next Tick");\n});\n\nconsole.log("End");\n')),(0,i.kt)("p",null,"Output"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"Start\nEnd\nNext Tick\n")),(0,i.kt)("h3",{id:"setimmediate"},"setImmediate()"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Description"),': L\xean l\u1ecbch m\u1ed9t h\xe0m callback \u0111\u1ec3 th\u1ef1c thi trong giai \u0111o\u1ea1n "check" c\u1ee7a v\xf2ng l\u1eb7p s\u1ef1 ki\u1ec7n sau khi c\xe1c s\u1ef1 ki\u1ec7n I/O \u0111\u01b0\u1ee3c x\u1eed l\xfd.'),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Operation"),": H\xe0m callback \u0111\u01b0\u1ee3c th\xeam v\xe0o m\u1ed9t h\xe0ng \u0111\u1ee3i ri\xeang v\xe0 s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi sau khi t\u1ea5t c\u1ea3 c\xe1c s\u1ef1 ki\u1ec7n I/O \u0111\u01b0\u1ee3c x\u1eed l\xfd."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},'console.log("Start");\n\nsetImmediate(() => {\n  console.log("Immediate");\n});\n\nconsole.log("End");\n')),(0,i.kt)("p",null,"Output"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"Start;\nEnd;\nImmediate;\n")),(0,i.kt)("p",null,"Tuy nhi\xean, th\u1ee9 t\u1ef1 gi\u1eefa Next Tick v\xe0 Immediate kh\xf4ng \u0111\u01b0\u1ee3c \u0111\u1ea3m b\u1ea3o trong m\u1ecdi t\xecnh hu\u1ed1ng, \u0111\u1eb7c bi\u1ec7t khi ch\xfang \u0111\u01b0\u1ee3c g\u1ecdi t\u1eeb m\u1ed9t chu k\u1ef3 I/O. Nh\u01b0ng n\u1ebfu ch\u1ea1y trong ng\u1eef c\u1ea3nh kh\xf4ng c\xf3 I/O, process.nextTick() lu\xf4n lu\xf4n \u0111\u01b0\u1ee3c th\u1ef1c thi tr\u01b0\u1edbc setImmediate()."),(0,i.kt)("p",null,"Trong th\u1ef1c t\u1ebf, khi b\u1ea1n c\u1ea7n l\xean l\u1ecbch m\u1ed9t h\xe0m ch\u1ea1y sau khi ng\u0103n x\u1ebfp hi\u1ec7n t\u1ea1i ho\xe0n th\xe0nh nh\u01b0ng tr\u01b0\u1edbc b\u1ea5t k\u1ef3 ho\u1ea1t \u0111\u1ed9ng I/O n\xe0o, h\xe3y s\u1eed d\u1ee5ng process.nextTick(). Khi b\u1ea1n mu\u1ed1n l\xean l\u1ecbch m\u1ed9t h\xe0m ch\u1ea1y sau t\u1ea5t c\u1ea3 c\xe1c ho\u1ea1t \u0111\u1ed9ng I/O, h\xe3y s\u1eed d\u1ee5ng setImmediate()."),(0,i.kt)("h2",{id:"side-effects"},"Side Effects"),(0,i.kt)("p",null,"T\xe1c \u0111\u1ed9ng ph\u1ee5 \u0111\u1ec1 c\u1eadp \u0111\u1ebfn b\u1ea5t k\u1ef3 thay \u0111\u1ed5i c\xf3 th\u1ec3 quan s\xe1t \u0111\u01b0\u1ee3c trong h\u1ec7 th\u1ed1ng do vi\u1ec7c th\u1ef1c thi m\u1ed9t h\xe0m, ngo\u1ea1i tr\u1eeb gi\xe1 tr\u1ecb m\xe0 h\xe0m tr\u1ea3 v\u1ec1. \u0110i\u1ec1u n\xe0y c\xf3 th\u1ec3 l\xe0 b\u1ea5t k\u1ef3 th\u1ee9 g\xec, t\u1eeb thay \u0111\u1ed5i bi\u1ebfn to\xe0n c\u1ee5c, th\u1ef1c hi\u1ec7n y\xeau c\u1ea7u m\u1ea1ng, thao t\xe1c DOM, ghi v\xe0o t\u1ec7p, ho\u1eb7c in ra console, v\xe0 c\xf2n nhi\u1ec1u h\u01a1n n\u1eefa."),(0,i.kt)("p",null,"T\xe1c \u0111\u1ed9ng ph\u1ee5 kh\xf4ng ph\u1ea3i l\xfac n\xe0o c\u0169ng x\u1ea5u v\xe0 th\u01b0\u1eddng c\u1ea7n thi\u1ebft (v\xed d\u1ee5, ch\xfang ta c\u1ea7n t\xe1c \u0111\u1ed9ng ph\u1ee5 \u0111\u1ec3 c\u1eadp nh\u1eadt giao di\u1ec7n ng\u01b0\u1eddi d\xf9ng ho\u1eb7c l\u01b0u d\u1eef li\u1ec7u v\xe0o c\u01a1 s\u1edf d\u1eef li\u1ec7u). Tuy nhi\xean, c\xe1c h\xe0m c\xf3 t\xe1c \u0111\u1ed9ng ph\u1ee5 th\u01b0\u1eddng kh\xf3 ki\u1ec3m tra, g\u1ee1 l\u1ed7i v\xe0 l\u1eadp lu\u1eadn h\u01a1n so v\u1edbi c\xe1c h\xe0m thu\u1ea7n t\xfay, kh\xf4ng c\xf3 t\xe1c \u0111\u1ed9ng ph\u1ee5."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"let counter: number = 0;\nfunction increment(): void {\n  counter++; // This is a side effect as it modifies an external variable.\n}\n")),(0,i.kt)("h2",{id:"state-mutation"},"State Mutation"),(0,i.kt)("p",null,"Thay \u0111\u1ed5i tr\u1ea1ng th\xe1i \u0111\u1ec1 c\u1eadp \u0111\u1ebfn vi\u1ec7c s\u1eeda \u0111\u1ed5i tr\u1ef1c ti\u1ebfp ho\u1eb7c thay \u0111\u1ed5i tr\u1ea1ng th\xe1i c\u1ee7a c\u1ea5u tr\xfac d\u1eef li\u1ec7u. Trong c\xe1c ng\xf4n ng\u1eef nh\u01b0 JavaScript v\xe0 TypeScript, \u0111\u1ed1i t\u01b0\u1ee3ng v\xe0 m\u1ea3ng th\u01b0\u1eddng l\xe0 bi\u1ebfn \u0111\u1ed5i theo m\u1eb7c \u0111\u1ecbnh, c\xf3 ngh\u0129a l\xe0 c\xe1c thu\u1ed9c t\xednh v\xe0 ph\u1ea7n t\u1eed c\u1ee7a ch\xfang c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c thay \u0111\u1ed5i tr\u1ef1c ti\u1ebfp sau khi ch\xfang \u0111\u01b0\u1ee3c t\u1ea1o."),(0,i.kt)("p",null,"Thay \u0111\u1ed5i tr\u1ea1ng th\xe1i c\xf3 th\u1ec3 d\u1eabn \u0111\u1ebfn h\xe0nh vi kh\xf4ng d\u1ef1 \u0111o\xe1n \u0111\u01b0\u1ee3c, \u0111\u1eb7c bi\u1ec7t trong c\xe1c \u1ee9ng d\u1ee5ng l\u1edbn ho\u1eb7c khi s\u1eed d\u1ee5ng m\u1ed9t s\u1ed1 m\xf4 h\xecnh l\u1eadp tr\xecnh nh\u01b0 l\u1eadp tr\xecnh h\xe0m. \u0110\xe2y l\xe0 l\xfd do t\u1ea1i sao c\xe1c th\u01b0 vi\u1ec7n nh\u01b0 Redux nh\u1ea5n m\u1ea1nh v\u1ec1 t\u1ea7m quan tr\u1ecdng c\u1ee7a vi\u1ec7c xem x\xe9t tr\u1ea1ng th\xe1i l\xe0 b\u1ea5t bi\u1ebfn v\xe0 th\u1ef1c hi\u1ec7n thay \u0111\u1ed5i th\xf4ng qua c\xe1c b\u1ea3n sao thay v\xec thay \u0111\u1ed5i tr\u1ef1c ti\u1ebfp."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'interface User {\n  name: string;\n  age: number;\n}\n\nconst user: User = {\n  name: "Alice",\n  age: 25,\n};\n\nuser.age = 26; // This is a state mutation.\n')))}p.isMDXComponent=!0}}]);