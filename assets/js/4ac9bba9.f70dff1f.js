"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[287],{3905:(n,t,i)=>{i.d(t,{Zo:()=>g,kt:()=>s});var e=i(7294);function c(n,t,i){return t in n?Object.defineProperty(n,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):n[t]=i,n}function h(n,t){var i=Object.keys(n);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(n);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.push.apply(i,e)}return i}function l(n){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?h(Object(i),!0).forEach((function(t){c(n,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(i)):h(Object(i)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(i,t))}))}return n}function a(n,t){if(null==n)return{};var i,e,c=function(n,t){if(null==n)return{};var i,e,c={},h=Object.keys(n);for(e=0;e<h.length;e++)i=h[e],t.indexOf(i)>=0||(c[i]=n[i]);return c}(n,t);if(Object.getOwnPropertySymbols){var h=Object.getOwnPropertySymbols(n);for(e=0;e<h.length;e++)i=h[e],t.indexOf(i)>=0||Object.prototype.propertyIsEnumerable.call(n,i)&&(c[i]=n[i])}return c}var r=e.createContext({}),u=function(n){var t=e.useContext(r),i=t;return n&&(i="function"==typeof n?n(t):l(l({},t),n)),i},g=function(n){var t=u(n.components);return e.createElement(r.Provider,{value:t},n.children)},o="mdxType",m={inlineCode:"code",wrapper:function(n){var t=n.children;return e.createElement(e.Fragment,{},t)}},p=e.forwardRef((function(n,t){var i=n.components,c=n.mdxType,h=n.originalType,r=n.parentName,g=a(n,["components","mdxType","originalType","parentName"]),o=u(i),p=c,s=o["".concat(r,".").concat(p)]||o[p]||m[p]||h;return i?e.createElement(s,l(l({ref:t},g),{},{components:i})):e.createElement(s,l({ref:t},g))}));function s(n,t){var i=arguments,c=t&&t.mdxType;if("string"==typeof n||c){var h=i.length,l=new Array(h);l[0]=p;var a={};for(var r in t)hasOwnProperty.call(t,r)&&(a[r]=t[r]);a.originalType=n,a[o]="string"==typeof n?n:c,l[1]=a;for(var u=2;u<h;u++)l[u]=i[u];return e.createElement.apply(null,l)}return e.createElement.apply(null,i)}p.displayName="MDXCreateElement"},9726:(n,t,i)=>{i.r(t),i.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>m,frontMatter:()=>h,metadata:()=>a,toc:()=>u});var e=i(7462),c=(i(7294),i(3905));const h={title:"Microservices Architecture"},l=void 0,a={unversionedId:"blog/system-design/microservices",id:"blog/system-design/microservices",title:"Microservices Architecture",description:"Ki\u1ebfn tr\xfac Microservices chia m\u1ed9t \u1ee9ng d\u1ee5ng l\u1edbn th\xe0nh m\u1ed9t t\u1eadp h\u1ee3p c\xe1c d\u1ecbch v\u1ee5 nh\u1ecf, \u0111\u1ed9c l\u1eadp, m\u1ed7i d\u1ecbch v\u1ee5 ch\u1ea1y trong ti\u1ebfn tr\xecnh ri\xeang v\xe0 giao ti\u1ebfp v\u1edbi nhau qua m\u1ea1ng. M\u1eb7c d\xf9 mang l\u1ea1i nhi\u1ec1u l\u1ee3i \xedch v\u1ec1 t\xednh linh ho\u1ea1t, kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng v\xe0 t\u1ed1c \u0111\u1ed9 ph\xe1t tri\u1ec3n, ki\u1ebfn tr\xfac n\xe0y c\u0169ng \u0111\u1eb7t ra nh\u1eefng th\xe1ch th\u1ee9c m\u1edbi, \u0111\u1eb7c bi\u1ec7t l\xe0 trong vi\u1ec7c giao ti\u1ebfp gi\u1eefa c\xe1c d\u1ecbch v\u1ee5 v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh \u1ed5n \u0111\u1ecbnh c\u1ee7a to\xe0n h\u1ec7 th\u1ed1ng.",source:"@site/docs/blog/system-design/microservices.md",sourceDirName:"blog/system-design",slug:"/blog/system-design/microservices",permalink:"/blog/system-design/microservices",draft:!1,tags:[],version:"current",frontMatter:{title:"Microservices Architecture"},sidebar:"blog",previous:{title:"Event-Driven Architecture",permalink:"/blog/system-design/event-driven"},next:{title:"Serverless Architecture",permalink:"/blog/system-design/serverless"}},r={},u=[{value:"Communication Patterns",id:"communication-patterns",level:2},{value:"Synchronous Communication (Giao ti\u1ebfp \u0111\u1ed3ng b\u1ed9):",id:"synchronous-communication-giao-ti\u1ebfp-\u0111\u1ed3ng-b\u1ed9",level:3},{value:"\u01afu \u0111i\u1ec3m:",id:"\u01b0u-\u0111i\u1ec3m",level:4},{value:"Nh\u01b0\u1ee3c \u0111i\u1ec3m:",id:"nh\u01b0\u1ee3c-\u0111i\u1ec3m",level:4},{value:"Asynchronous Communication (Giao ti\u1ebfp b\u1ea5t \u0111\u1ed3ng b\u1ed9):",id:"asynchronous-communication-giao-ti\u1ebfp-b\u1ea5t-\u0111\u1ed3ng-b\u1ed9",level:3},{value:"\u01afu \u0111i\u1ec3m:",id:"\u01b0u-\u0111i\u1ec3m-1",level:4},{value:"Nh\u01b0\u1ee3c \u0111i\u1ec3m:",id:"nh\u01b0\u1ee3c-\u0111i\u1ec3m-1",level:4},{value:"C\xe1c m\u1eabu giao ti\u1ebfp ph\u1ed5 bi\u1ebfn:",id:"c\xe1c-m\u1eabu-giao-ti\u1ebfp-ph\u1ed5-bi\u1ebfn",level:3},{value:"Microservice Resiliency Patterns",id:"microservice-resiliency-patterns",level:2},{value:"Circuit Breaker (Ng\u1eaft m\u1ea1ch)",id:"circuit-breaker-ng\u1eaft-m\u1ea1ch",level:3},{value:"Retry (Th\u1eed l\u1ea1i)",id:"retry-th\u1eed-l\u1ea1i",level:3},{value:"Timeout (H\u1ebft th\u1eddi gian ch\u1edd)",id:"timeout-h\u1ebft-th\u1eddi-gian-ch\u1edd",level:3},{value:"Bulkhead (V\xe1ch ng\u0103n)",id:"bulkhead-v\xe1ch-ng\u0103n",level:3},{value:"Rate Limiter (Gi\u1edbi h\u1ea1n t\u1ea7n su\u1ea5t)",id:"rate-limiter-gi\u1edbi-h\u1ea1n-t\u1ea7n-su\u1ea5t",level:3}],g={toc:u},o="wrapper";function m(n){let{components:t,...i}=n;return(0,c.kt)(o,(0,e.Z)({},g,i,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"Ki\u1ebfn tr\xfac Microservices chia m\u1ed9t \u1ee9ng d\u1ee5ng l\u1edbn th\xe0nh m\u1ed9t t\u1eadp h\u1ee3p c\xe1c d\u1ecbch v\u1ee5 nh\u1ecf, \u0111\u1ed9c l\u1eadp, m\u1ed7i d\u1ecbch v\u1ee5 ch\u1ea1y trong ti\u1ebfn tr\xecnh ri\xeang v\xe0 giao ti\u1ebfp v\u1edbi nhau qua m\u1ea1ng. M\u1eb7c d\xf9 mang l\u1ea1i nhi\u1ec1u l\u1ee3i \xedch v\u1ec1 t\xednh linh ho\u1ea1t, kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng v\xe0 t\u1ed1c \u0111\u1ed9 ph\xe1t tri\u1ec3n, ki\u1ebfn tr\xfac n\xe0y c\u0169ng \u0111\u1eb7t ra nh\u1eefng th\xe1ch th\u1ee9c m\u1edbi, \u0111\u1eb7c bi\u1ec7t l\xe0 trong vi\u1ec7c giao ti\u1ebfp gi\u1eefa c\xe1c d\u1ecbch v\u1ee5 v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh \u1ed5n \u0111\u1ecbnh c\u1ee7a to\xe0n h\u1ec7 th\u1ed1ng."),(0,c.kt)("h2",{id:"communication-patterns"},"Communication Patterns"),(0,c.kt)("p",null,"Vi\u1ec7c l\u1ef1a ch\u1ecdn c\xe1ch c\xe1c microservices giao ti\u1ebfp v\u1edbi nhau \u1ea3nh h\u01b0\u1edfng l\u1edbn \u0111\u1ebfn hi\u1ec7u n\u0103ng, \u0111\u1ed9 ph\u1ee9c t\u1ea1p v\xe0 kh\u1ea3 n\u0103ng ph\u1ee5c h\u1ed3i c\u1ee7a h\u1ec7 th\u1ed1ng."),(0,c.kt)("h3",{id:"synchronous-communication-giao-ti\u1ebfp-\u0111\u1ed3ng-b\u1ed9"},"Synchronous Communication (Giao ti\u1ebfp \u0111\u1ed3ng b\u1ed9):"),(0,c.kt)("p",null,"M\u1ed9t d\u1ecbch v\u1ee5 g\u1eedi y\xeau c\u1ea7u (request) \u0111\u1ebfn d\u1ecbch v\u1ee5 kh\xe1c v\xe0 \u0111\u1ee3i ph\u1ea3n h\u1ed3i (response). Ho\u1ea1t \u0111\u1ed9ng gi\u1ed1ng nh\u01b0 m\u1ed9t l\u1eddi g\u1ecdi h\xe0m th\xf4ng th\u01b0\u1eddng qua m\u1ea1ng. V\xed d\u1ee5 l\xe0 REST APIs (qua HTTP/HTTPS), gRPC."),(0,c.kt)("h4",{id:"\u01b0u-\u0111i\u1ec3m"},"\u01afu \u0111i\u1ec3m:"),(0,c.kt)("p",null,"\u0110\u01a1n gi\u1ea3n, d\u1ec5 hi\u1ec3u, lu\u1ed3ng x\u1eed l\xfd r\xf5 r\xe0ng."),(0,c.kt)("h4",{id:"nh\u01b0\u1ee3c-\u0111i\u1ec3m"},"Nh\u01b0\u1ee3c \u0111i\u1ec3m:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Kh\u1edbp n\u1ed1i th\u1eddi gian (Temporal coupling): D\u1ecbch v\u1ee5 g\u1ecdi ph\u1ea3i \u0111\u1ee3i d\u1ecbch v\u1ee5 \u0111\u01b0\u1ee3c g\u1ecdi x\u1eed l\xfd xong. N\u1ebfu d\u1ecbch v\u1ee5 \u0111\u01b0\u1ee3c g\u1ecdi ch\u1eadm ho\u1eb7c l\u1ed7i, d\u1ecbch v\u1ee5 g\u1ecdi c\u0169ng b\u1ecb \u1ea3nh h\u01b0\u1edfng.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Gi\u1ea3m kh\u1ea3 n\u0103ng ph\u1ee5c h\u1ed3i: L\u1ed7i \u1edf m\u1ed9t d\u1ecbch v\u1ee5 c\xf3 th\u1ec3 lan truy\u1ec1n (cascading failures) sang c\xe1c d\u1ecbch v\u1ee5 ph\u1ee5 thu\u1ed9c v\xe0o n\xf3.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Kh\xf3 m\u1edf r\u1ed9ng: Vi\u1ec7c m\u1edf r\u1ed9ng m\u1ed9t d\u1ecbch v\u1ee5 c\xf3 th\u1ec3 b\u1ecb gi\u1edbi h\u1ea1n b\u1edfi kh\u1ea3 n\u0103ng x\u1eed l\xfd \u0111\u1ed3ng b\u1ed9 c\u1ee7a c\xe1c d\u1ecbch v\u1ee5 m\xe0 n\xf3 g\u1ecdi."))),(0,c.kt)("h3",{id:"asynchronous-communication-giao-ti\u1ebfp-b\u1ea5t-\u0111\u1ed3ng-b\u1ed9"},"Asynchronous Communication (Giao ti\u1ebfp b\u1ea5t \u0111\u1ed3ng b\u1ed9):"),(0,c.kt)("p",null,"M\u1ed9t d\u1ecbch v\u1ee5 g\u1eedi \u0111i m\u1ed9t th\xf4ng \u0111i\u1ec7p (message) ho\u1eb7c s\u1ef1 ki\u1ec7n (event) m\xe0 kh\xf4ng c\u1ea7n \u0111\u1ee3i ph\u1ea3n h\u1ed3i ngay l\u1eadp t\u1ee9c. D\u1ecbch v\u1ee5 nh\u1eadn s\u1ebd x\u1eed l\xfd th\xf4ng \u0111i\u1ec7p/s\u1ef1 ki\u1ec7n \u0111\xf3 v\xe0o th\u1eddi \u0111i\u1ec3m th\xedch h\u1ee3p. V\xed d\u1ee5 l\xe0 s\u1eed d\u1ee5ng Message Brokers (Kafka, RabbitMQ, Azure Service Bus), Webhooks. Th\u01b0\u1eddng li\xean quan ch\u1eb7t ch\u1ebd \u0111\u1ebfn Event-Driven Architecture (EDA)."),(0,c.kt)("h4",{id:"\u01b0u-\u0111i\u1ec3m-1"},"\u01afu \u0111i\u1ec3m:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Kh\u1edbp n\u1ed1i l\u1ecfng (Loose coupling): D\u1ecbch v\u1ee5 g\u1eedi v\xe0 nh\u1eadn kh\xf4ng c\u1ea7n ho\u1ea1t \u0111\u1ed9ng c\xf9ng l\xfac.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"T\u0103ng kh\u1ea3 n\u0103ng ph\u1ee5c h\u1ed3i: L\u1ed7i \u1edf m\u1ed9t d\u1ecbch v\u1ee5 \xedt \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn c\xe1c d\u1ecbch v\u1ee5 kh\xe1c. N\u1ebfu d\u1ecbch v\u1ee5 nh\u1eadn l\u1ed7i, th\xf4ng \u0111i\u1ec7p/s\u1ef1 ki\u1ec7n th\u01b0\u1eddng c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c l\u01b0u l\u1ea1i v\xe0 x\u1eed l\xfd sau.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"T\u0103ng kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng: D\u1ec5 d\xe0ng th\xeam c\xe1c d\u1ecbch v\u1ee5 nh\u1eadn m\u1edbi ho\u1eb7c t\u0103ng s\u1ed1 l\u01b0\u1ee3ng phi\xean b\u1ea3n c\u1ee7a d\u1ecbch v\u1ee5 nh\u1eadn \u0111\u1ec3 x\u1eed l\xfd t\u1ea3i."))),(0,c.kt)("h4",{id:"nh\u01b0\u1ee3c-\u0111i\u1ec3m-1"},"Nh\u01b0\u1ee3c \u0111i\u1ec3m:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Ph\u1ee9c t\u1ea1p h\u01a1n: C\u1ea7n c\xf3 h\u1ea1 t\u1ea7ng Message Broker. Lu\u1ed3ng x\u1eed l\xfd kh\xf3 theo d\xf5i h\u01a1n.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"T\xednh nh\u1ea5t qu\xe1n cu\u1ed1i c\xf9ng (Eventual consistency): D\u1eef li\u1ec7u c\xf3 th\u1ec3 kh\xf4ng \u0111\u01b0\u1ee3c c\u1eadp nh\u1eadt \u0111\u1ed3ng nh\u1ea5t ngay l\u1eadp t\u1ee9c tr\xean to\xe0n h\u1ec7 th\u1ed1ng."))),(0,c.kt)("h3",{id:"c\xe1c-m\u1eabu-giao-ti\u1ebfp-ph\u1ed5-bi\u1ebfn"},"C\xe1c m\u1eabu giao ti\u1ebfp ph\u1ed5 bi\u1ebfn:"),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"API Gateway: \u0110\xf3ng vai tr\xf2 l\xe0 m\u1ed9t c\u1ed5ng v\xe0o duy nh\u1ea5t cho t\u1ea5t c\u1ea3 c\xe1c y\xeau c\u1ea7u t\u1eeb client b\xean ngo\xe0i \u0111\u1ebfn h\u1ec7 th\u1ed1ng microservices. N\xf3 c\xf3 th\u1ec3 x\u1eed l\xfd routing, x\xe1c th\u1ef1c, t\u1ed5ng h\u1ee3p k\u1ebft qu\u1ea3 t\u1eeb nhi\u1ec1u service, caching, rate limiting... gi\xfap \u0111\u01a1n gi\u1ea3n h\xf3a ph\xeda client v\xe0 b\u1ea3o v\u1ec7 c\xe1c service b\xean trong.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Backend for Frontend (BFF): M\u1ed9t bi\u1ebfn th\u1ec3 c\u1ee7a API Gateway, n\u01a1i m\u1ed7i lo\u1ea1i client (v\xed d\u1ee5: web app, mobile app) c\xf3 m\u1ed9t API Gateway ri\xeang, \u0111\u01b0\u1ee3c t\u1ed1i \u01b0u h\xf3a cho nhu c\u1ea7u c\u1ee5 th\u1ec3 c\u1ee7a client \u0111\xf3.")),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"Service Discovery: Gi\xfap c\xe1c microservices t\xecm th\u1ea5y \u0111\u1ecba ch\u1ec9 m\u1ea1ng (IP, port) c\u1ee7a nhau m\u1ed9t c\xe1ch \u0111\u1ed9ng, thay v\xec ph\u1ea3i c\u1ea5u h\xecnh c\u1ee9ng \u0111\u1ecba ch\u1ec9. Th\u01b0\u1eddng bao g\u1ed3m hai ph\u1ea7n ch\xednh:"),(0,c.kt)("ol",{parentName:"li"},(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("p",{parentName:"li"},"Service Registry (S\u1ed5 \u0111\u0103ng k\xfd d\u1ecbch v\u1ee5):"),(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"L\xe0 m\u1ed9t c\u01a1 s\u1edf d\u1eef li\u1ec7u ho\u1eb7c d\u1ecbch v\u1ee5 trung t\xe2m n\u01a1i m\u1ed7i phi\xean b\u1ea3n d\u1ecbch v\u1ee5 t\u1ef1 \u0111\u0103ng k\xfd th\xf4ng tin v\u1ecb tr\xed c\u1ee7a n\xf3 (IP, port, metadata) khi kh\u1edfi \u0111\u1ed9ng."),(0,c.kt)("li",{parentName:"ul"},'C\xe1c phi\xean b\u1ea3n d\u1ecbch v\u1ee5 c\u0169ng th\u01b0\u1eddng g\u1eedi c\xe1c t\xedn hi\u1ec7u "heartbeat" (nh\u1ecbp tim) \u0111\u1ec3 b\xe1o r\u1eb1ng ch\xfang v\u1eabn c\xf2n ho\u1ea1t \u0111\u1ed9ng. N\u1ebfu kh\xf4ng nh\u1eadn \u0111\u01b0\u1ee3c heartbeat, Registry s\u1ebd t\u1ef1 \u0111\u1ed9ng h\u1ee7y \u0111\u0103ng k\xfd (deregister) phi\xean b\u1ea3n \u0111\xf3.'),(0,c.kt)("li",{parentName:"ul"},"V\xed d\u1ee5 v\u1ec1 Service Registry: Consul, Eureka, etcd, Zookeeper."))),(0,c.kt)("li",{parentName:"ol"},(0,c.kt)("p",{parentName:"li"},"Discovery Mechanism (C\u01a1 ch\u1ebf kh\xe1m ph\xe1): C\xe1ch client t\xecm ra \u0111\u1ecba ch\u1ec9 c\u1ee7a provider. C\xf3 hai c\xe1ch ch\xednh:"),(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"Client-Side Discovery: Client t\u1ef1 truy v\u1ea5n Service Registry \u0111\u1ec3 l\u1ea5y danh s\xe1ch c\xe1c \u0111\u1ecba ch\u1ec9 kh\u1ea3 d\u1ee5ng c\u1ee7a d\u1ecbch v\u1ee5 \u0111\xedch, sau \u0111\xf3 t\u1ef1 ch\u1ecdn m\u1ed9t \u0111\u1ecba ch\u1ec9 (th\u01b0\u1eddng th\xf4ng qua thu\u1eadt to\xe1n c\xe2n b\u1eb1ng t\u1ea3i nh\u01b0 Round Robin)."),(0,c.kt)("li",{parentName:"ul"},"Server-Side Discovery: Client g\u1eedi y\xeau c\u1ea7u \u0111\u1ebfn m\u1ed9t th\xe0nh ph\u1ea7n trung gian (nh\u01b0 Load Balancer ho\u1eb7c API Gateway). Th\xe0nh ph\u1ea7n n\xe0y s\u1ebd truy v\u1ea5n Service Registry, ch\u1ecdn m\u1ed9t \u0111\u1ecba ch\u1ec9 d\u1ecbch v\u1ee5 \u0111\xedch ph\xf9 h\u1ee3p v\xe0 chuy\u1ec3n ti\u1ebfp y\xeau c\u1ea7u \u0111\u1ebfn \u0111\xf3. Client kh\xf4ng c\u1ea7n bi\u1ebft v\u1ec1 s\u1ef1 t\u1ed3n t\u1ea1i c\u1ee7a Service Registry.")))))),(0,c.kt)("h2",{id:"microservice-resiliency-patterns"},"Microservice Resiliency Patterns"),(0,c.kt)("p",null,"Trong m\u1ed9t h\u1ec7 th\u1ed1ng ph\xe2n t\xe1n nh\u01b0 microservices, l\u1ed7i l\xe0 \u0111i\u1ec1u kh\xf3 tr\xe1nh kh\u1ecfi (l\u1ed7i m\u1ea1ng, l\u1ed7i d\u1ecbch v\u1ee5, qu\xe1 t\u1ea3i...). C\xe1c m\u1eabu resiliency gi\xfap h\u1ec7 th\u1ed1ng v\u1eabn ho\u1ea1t \u0111\u1ed9ng \u1ed5n \u0111\u1ecbnh ho\u1eb7c ph\u1ee5c h\u1ed3i nhanh ch\xf3ng khi c\xf3 l\u1ed7i x\u1ea3y ra."),(0,c.kt)("p",null,"C\xe1c m\u1eabu ph\u1ee5c h\u1ed3i ph\u1ed5 bi\u1ebfn:"),(0,c.kt)("h3",{id:"circuit-breaker-ng\u1eaft-m\u1ea1ch"},"Circuit Breaker (Ng\u1eaft m\u1ea1ch)"),(0,c.kt)("p",null,'Ho\u1ea1t \u0111\u1ed9ng gi\u1ed1ng nh\u01b0 c\u1ea7u dao \u0111i\u1ec7n. Khi s\u1ed1 l\u01b0\u1ee3ng l\u1ed7i khi g\u1ecdi m\u1ed9t d\u1ecbch v\u1ee5 c\u1ee5 th\u1ec3 v\u01b0\u1ee3t ng\u01b0\u1ee1ng cho ph\xe9p, Circuit Breaker s\u1ebd "m\u1edf" (open), ng\u0103n ch\u1eb7n c\xe1c y\xeau c\u1ea7u ti\u1ebfp theo \u0111\u1ebfn d\u1ecbch v\u1ee5 \u0111\xf3 trong m\u1ed9t kho\u1ea3ng th\u1eddi gian. Thay v\xec g\u1ecdi d\u1ecbch v\u1ee5 l\u1ed7i, n\xf3 c\xf3 th\u1ec3 tr\u1ea3 v\u1ec1 l\u1ed7i ngay l\u1eadp t\u1ee9c ho\u1eb7c m\u1ed9t gi\xe1 tr\u1ecb m\u1eb7c \u0111\u1ecbnh (fallback). Sau m\u1ed9t th\u1eddi gian, n\xf3 s\u1ebd chuy\u1ec3n sang tr\u1ea1ng th\xe1i "n\u1eeda m\u1edf" (half-open) \u0111\u1ec3 th\u1eed g\u1eedi l\u1ea1i m\u1ed9t v\xe0i y\xeau c\u1ea7u. N\u1ebfu th\xe0nh c\xf4ng, m\u1ea1ch s\u1ebd "\u0111\xf3ng" (closed) l\u1ea1i; n\u1ebfu th\u1ea5t b\u1ea1i, n\xf3 l\u1ea1i "m\u1edf".'),(0,c.kt)("p",null,"Ng\u0103n ch\u1eb7n vi\u1ec7c l\xe3ng ph\xed t\xe0i nguy\xean v\xe0o vi\u1ec7c g\u1ecdi m\u1ed9t d\u1ecbch v\u1ee5 \u0111ang g\u1eb7p s\u1ef1 c\u1ed1, tr\xe1nh l\u1ed7i lan truy\u1ec1n, cho ph\xe9p d\u1ecbch v\u1ee5 b\u1ecb l\u1ed7i c\xf3 th\u1eddi gian ph\u1ee5c h\u1ed3i."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},'Thu\u1eadt to\xe1n/Logic: C\u1ea7n duy tr\xec tr\u1ea1ng th\xe1i c\u1ee7a "m\u1ea1ch" cho m\u1ed7i d\u1ecbch v\u1ee5 \u0111\xedch.',(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"Tr\u1ea1ng th\xe1i: CLOSED (Cho ph\xe9p y\xeau c\u1ea7u), OPEN (T\u1eeb ch\u1ed1i y\xeau c\u1ea7u), HALF_OPEN (Th\u1eed nghi\u1ec7m m\u1ed9t v\xe0i y\xeau c\u1ea7u)."),(0,c.kt)("li",{parentName:"ul"},"Bi\u1ebfn \u0111\u1ebfm: \u0110\u1ebfm s\u1ed1 l\u1ed7i li\xean ti\u1ebfp (trong CLOSED), s\u1ed1 th\xe0nh c\xf4ng li\xean ti\u1ebfp (trong HALF_OPEN)."),(0,c.kt)("li",{parentName:"ul"},"Ng\u01b0\u1ee1ng: S\u1ed1 l\u1ed7i t\u1ed1i \u0111a cho ph\xe9p tr\u01b0\u1edbc khi chuy\u1ec3n sang OPEN."),(0,c.kt)("li",{parentName:"ul"},"Th\u1eddi gian ch\u1edd (Timeout): Kho\u1ea3ng th\u1eddi gian \u1edf tr\u1ea1ng th\xe1i OPEN tr\u01b0\u1edbc khi chuy\u1ec3n sang HALF_OPEN."))),(0,c.kt)("li",{parentName:"ul"},"Lu\u1ed3ng ho\u1ea1t \u0111\u1ed9ng:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"CLOSED: G\u1eedi y\xeau c\u1ea7u. N\u1ebfu th\xe0nh c\xf4ng, reset b\u1ed9 \u0111\u1ebfm l\u1ed7i. N\u1ebfu l\u1ed7i, t\u0103ng b\u1ed9 \u0111\u1ebfm l\u1ed7i. N\u1ebfu b\u1ed9 \u0111\u1ebfm l\u1ed7i v\u01b0\u1ee3t ng\u01b0\u1ee1ng -> chuy\u1ec3n sang OPEN, b\u1eaft \u0111\u1ea7u \u0111\u1ebfm th\u1eddi gian ch\u1edd."),(0,c.kt)("li",{parentName:"ul"},"OPEN: T\u1eeb ch\u1ed1i ngay l\u1eadp t\u1ee9c m\u1ecdi y\xeau c\u1ea7u (ho\u1eb7c tr\u1ea3 v\u1ec1 gi\xe1 tr\u1ecb m\u1eb7c \u0111\u1ecbnh/fallback). Khi h\u1ebft th\u1eddi gian ch\u1edd -> chuy\u1ec3n sang HALF_OPEN."),(0,c.kt)("li",{parentName:"ul"},"HALF_OPEN: Cho ph\xe9p m\u1ed9t s\u1ed1 l\u01b0\u1ee3ng gi\u1edbi h\u1ea1n y\xeau c\u1ea7u \u0111i qua. N\u1ebfu y\xeau c\u1ea7u th\xe0nh c\xf4ng -> chuy\u1ec3n v\u1ec1 CLOSED, reset b\u1ed9 \u0111\u1ebfm. N\u1ebfu y\xeau c\u1ea7u th\u1ea5t b\u1ea1i -> quay l\u1ea1i OPEN, b\u1eaft \u0111\u1ea7u l\u1ea1i th\u1eddi gian ch\u1edd.")))),(0,c.kt)("h3",{id:"retry-th\u1eed-l\u1ea1i"},"Retry (Th\u1eed l\u1ea1i)"),(0,c.kt)("p",null,"T\u1ef1 \u0111\u1ed9ng th\u1ef1c hi\u1ec7n l\u1ea1i m\u1ed9t y\xeau c\u1ea7u n\u1ebfu n\xf3 th\u1ea5t b\u1ea1i (th\u01b0\u1eddng l\xe0 do l\u1ed7i t\u1ea1m th\u1eddi nh\u01b0 l\u1ed7i m\u1ea1ng). N\xean k\u1ebft h\u1ee3p v\u1edbi c\u01a1 ch\u1ebf ch\u1edd t\u0103ng d\u1ea7n (exponential backoff) \u0111\u1ec3 tr\xe1nh l\xe0m qu\xe1 t\u1ea3i d\u1ecbch v\u1ee5 \u0111\xedch."),(0,c.kt)("p",null,"X\u1eed l\xfd c\xe1c l\u1ed7i t\u1ea1m th\u1eddi m\u1ed9t c\xe1ch t\u1ef1 \u0111\u1ed9ng."),(0,c.kt)("p",null,"Ch\u1ec9 n\xean retry c\xe1c thao t\xe1c an to\xe0n (idempotent - th\u1ef1c hi\u1ec7n nhi\u1ec1u l\u1ea7n cho k\u1ebft qu\u1ea3 nh\u01b0 m\u1ed9t l\u1ea7n) ho\u1eb7c khi bi\u1ebft ch\u1eafc l\u1ed7i l\xe0 t\u1ea1m th\u1eddi."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"V\xf2ng l\u1eb7p: \u0110\u1eb7t l\u1eddi g\u1ecdi d\u1ecbch v\u1ee5 b\xean trong m\u1ed9t v\xf2ng l\u1eb7p (v\xed d\u1ee5: for ho\u1eb7c while).\nBi\u1ebfn \u0111\u1ebfm: Gi\u1edbi h\u1ea1n s\u1ed1 l\u1ea7n th\u1eed l\u1ea1i t\u1ed1i \u0111a."),(0,c.kt)("li",{parentName:"ul"},"X\u1eed l\xfd l\u1ed7i: B\u1eaft l\u1ed7i t\u1eeb l\u1eddi g\u1ecdi d\u1ecbch v\u1ee5. Ki\u1ec3m tra xem l\u1ed7i c\xf3 thu\u1ed9c lo\u1ea1i n\xean th\u1eed l\u1ea1i hay kh\xf4ng (v\xed d\u1ee5: l\u1ed7i m\u1ea1ng t\u1ea1m th\u1eddi, l\u1ed7i 5xx, kh\xf4ng ph\u1ea3i l\u1ed7i 4xx nh\u01b0 Bad Request)."),(0,c.kt)("li",{parentName:"ul"},"Delay (Tr\xec ho\xe3n): Tr\u01b0\u1edbc khi th\u1eed l\u1ea1i, \u0111\u1ee3i m\u1ed9t kho\u1ea3ng th\u1eddi gian."),(0,c.kt)("li",{parentName:"ul"},"Backoff: Th\u01b0\u1eddng s\u1eed d\u1ee5ng chi\u1ebfn l\u01b0\u1ee3c t\u0103ng th\u1eddi gian ch\u1edd gi\u1eefa c\xe1c l\u1ea7n th\u1eed l\u1ea1i (v\xed d\u1ee5: Exponential Backoff - th\u1eddi gian ch\u1edd = base_delay ","*"," 2 ^ (s\u1ed1_l\u1ea7n_th\u1eed_l\u1ea1i)), \u0111\u1ec3 tr\xe1nh l\xe0m qu\xe1 t\u1ea3i d\u1ecbch v\u1ee5 \u0111\xedch.")),(0,c.kt)("h3",{id:"timeout-h\u1ebft-th\u1eddi-gian-ch\u1edd"},"Timeout (H\u1ebft th\u1eddi gian ch\u1edd)"),(0,c.kt)("p",null,"\u0110\u1eb7t m\u1ed9t kho\u1ea3ng th\u1eddi gian ch\u1edd t\u1ed1i \u0111a cho m\u1ed9t y\xeau c\u1ea7u. N\u1ebfu kh\xf4ng nh\u1eadn \u0111\u01b0\u1ee3c ph\u1ea3n h\u1ed3i trong kho\u1ea3ng th\u1eddi gian \u0111\xf3, y\xeau c\u1ea7u s\u1ebd b\u1ecb h\u1ee7y v\xe0 coi l\xe0 th\u1ea5t b\u1ea1i."),(0,c.kt)("p",null,"Tr\xe1nh vi\u1ec7c m\u1ed9t d\u1ecbch v\u1ee5 b\u1ecb treo v\xf4 th\u1eddi h\u1ea1n khi ch\u1edd \u0111\u1ee3i m\u1ed9t d\u1ecbch v\u1ee5 kh\xe1c ph\u1ea3n h\u1ed3i qu\xe1 ch\u1eadm."),(0,c.kt)("h3",{id:"bulkhead-v\xe1ch-ng\u0103n"},"Bulkhead (V\xe1ch ng\u0103n)"),(0,c.kt)("p",null,'C\xe1ch ly c\xe1c t\xe0i nguy\xean (v\xed d\u1ee5: connection pool, thread pool) \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 t\u01b0\u01a1ng t\xe1c v\u1edbi c\xe1c d\u1ecbch v\u1ee5 kh\xe1c nhau. N\u1ebfu m\u1ed9t d\u1ecbch v\u1ee5 \u0111\xedch b\u1ecb ch\u1eadm ho\u1eb7c l\u1ed7i, n\xf3 ch\u1ec9 l\xe0m c\u1ea1n ki\u1ec7t t\xe0i nguy\xean trong "v\xe1ch ng\u0103n" c\u1ee7a n\xf3, kh\xf4ng \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn kh\u1ea3 n\u0103ng g\u1ecdi c\xe1c d\u1ecbch v\u1ee5 kh\xe1c.'),(0,c.kt)("p",null,"Ng\u0103n ch\u1eb7n l\u1ed7i c\u1ee7a m\u1ed9t th\xe0nh ph\u1ea7n \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn to\xe0n b\u1ed9 h\u1ec7 th\u1ed1ng."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"Ph\xe2n nh\xf3m: X\xe1c \u0111\u1ecbnh c\xe1c nh\xf3m t\xe0i nguy\xean ri\xeang bi\u1ec7t cho c\xe1c l\u1eddi g\u1ecdi \u0111\u1ebfn c\xe1c d\u1ecbch v\u1ee5 \u0111\xedch kh\xe1c nhau (ho\u1eb7c c\xe1c lo\u1ea1i y\xeau c\u1ea7u kh\xe1c nhau)."),(0,c.kt)("li",{parentName:"ul"},"Gi\u1edbi h\u1ea1n t\xe0i nguy\xean: S\u1eed d\u1ee5ng c\xe1c c\u01a1 ch\u1ebf nh\u01b0:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"Thread Pools: C\u1ea5p ph\xe1t c\xe1c pool lu\u1ed3ng ri\xeang bi\u1ec7t cho m\u1ed7i nh\xf3m. N\u1ebfu pool \u0111\u1ea7y, y\xeau c\u1ea7u m\u1edbi cho nh\xf3m \u0111\xf3 s\u1ebd b\u1ecb t\u1eeb ch\u1ed1i ho\u1eb7c \u0111\u01b0a v\xe0o h\xe0ng \u0111\u1ee3i."),(0,c.kt)("li",{parentName:"ul"},"Semaphores: S\u1eed d\u1ee5ng semaphore \u0111\u1ec3 gi\u1edbi h\u1ea1n s\u1ed1 l\u01b0\u1ee3ng y\xeau c\u1ea7u \u0111\u1ed3ng th\u1eddi cho m\u1ed7i nh\xf3m."),(0,c.kt)("li",{parentName:"ul"},"Connection Pools: S\u1eed d\u1ee5ng c\xe1c pool k\u1ebft n\u1ed1i c\u01a1 s\u1edf d\u1eef li\u1ec7u/HTTP ri\xeang bi\u1ec7t."))),(0,c.kt)("li",{parentName:"ul"},'C\xe1ch ly: \u0110\u1ea3m b\u1ea3o r\u1eb1ng vi\u1ec7c c\u1ea1n ki\u1ec7t t\xe0i nguy\xean trong m\u1ed9t "v\xe1ch ng\u0103n" kh\xf4ng \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn c\xe1c "v\xe1ch ng\u0103n" kh\xe1c.')),(0,c.kt)("h3",{id:"rate-limiter-gi\u1edbi-h\u1ea1n-t\u1ea7n-su\u1ea5t"},"Rate Limiter (Gi\u1edbi h\u1ea1n t\u1ea7n su\u1ea5t)"),(0,c.kt)("p",null,"Ki\u1ec3m so\xe1t s\u1ed1 l\u01b0\u1ee3ng y\xeau c\u1ea7u m\xe0 m\u1ed9t d\u1ecbch v\u1ee5 g\u1eedi \u0111i ho\u1eb7c ch\u1ea5p nh\u1eadn trong m\u1ed9t kho\u1ea3ng th\u1eddi gian nh\u1ea5t \u0111\u1ecbnh."),(0,c.kt)("p",null,"B\u1ea3o v\u1ec7 d\u1ecbch v\u1ee5 kh\u1ecfi b\u1ecb qu\xe1 t\u1ea3i b\u1edfi s\u1ed1 l\u01b0\u1ee3ng y\xeau c\u1ea7u l\u1edbn \u0111\u1ed9t ng\u1ed9t."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},"Token Bucket:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},'Duy tr\xec m\u1ed9t "x\xf4" ch\u1ee9a "token", \u0111\u01b0\u1ee3c \u0111\u1ed5 \u0111\u1ea7y l\u1ea1i v\u1edbi m\u1ed9t t\u1ed1c \u0111\u1ed9 c\u1ed1 \u0111\u1ecbnh.'),(0,c.kt)("li",{parentName:"ul"},"M\u1ed7i y\xeau c\u1ea7u \u0111\u1ebfn c\u1ea7n l\u1ea5y 1 token t\u1eeb x\xf4. N\u1ebfu x\xf4 h\u1ebft token, y\xeau c\u1ea7u b\u1ecb t\u1eeb ch\u1ed1i/x\u1ebfp h\xe0ng."),(0,c.kt)("li",{parentName:"ul"},"C\u1ea7n l\u01b0u s\u1ed1 l\u01b0\u1ee3ng token hi\u1ec7n t\u1ea1i v\xe0 th\u1eddi \u0111i\u1ec3m \u0111\u1ed5 \u0111\u1ea7y token l\u1ea7n cu\u1ed1i."))),(0,c.kt)("li",{parentName:"ul"},"Leaky Bucket:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"Y\xeau c\u1ea7u \u0111\u1ebfn \u0111\u01b0\u1ee3c \u0111\u01b0a v\xe0o m\u1ed9t h\xe0ng \u0111\u1ee3i (x\xf4) c\xf3 k\xedch th\u01b0\u1edbc c\u1ed1 \u0111\u1ecbnh."),(0,c.kt)("li",{parentName:"ul"},"X\u1eed l\xfd y\xeau c\u1ea7u t\u1eeb h\xe0ng \u0111\u1ee3i v\u1edbi m\u1ed9t t\u1ed1c \u0111\u1ed9 c\u1ed1 \u0111\u1ecbnh (nh\u01b0 n\u01b0\u1edbc r\u1ec9 ra t\u1eeb x\xf4)."),(0,c.kt)("li",{parentName:"ul"},"N\u1ebfu h\xe0ng \u0111\u1ee3i \u0111\u1ea7y, y\xeau c\u1ea7u m\u1edbi b\u1ecb t\u1eeb ch\u1ed1i."))),(0,c.kt)("li",{parentName:"ul"},"Fixed Window Counter:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"Chia th\u1eddi gian th\xe0nh c\xe1c c\u1eeda s\u1ed5 c\u1ed1 \u0111\u1ecbnh (v\xed d\u1ee5: 60 gi\xe2y)."),(0,c.kt)("li",{parentName:"ul"},"\u0110\u1ebfm s\u1ed1 y\xeau c\u1ea7u trong c\u1eeda s\u1ed5 hi\u1ec7n t\u1ea1i."),(0,c.kt)("li",{parentName:"ul"},"N\u1ebfu s\u1ed1 y\xeau c\u1ea7u v\u01b0\u1ee3t ng\u01b0\u1ee1ng, t\u1eeb ch\u1ed1i y\xeau c\u1ea7u m\u1edbi."),(0,c.kt)("li",{parentName:"ul"},"Reset b\u1ed9 \u0111\u1ebfm khi b\u1eaft \u0111\u1ea7u c\u1eeda s\u1ed5 m\u1edbi."))),(0,c.kt)("li",{parentName:"ul"},"Sliding Window Log:",(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},"L\u01b0u tr\u1eef timestamp c\u1ee7a c\xe1c y\xeau c\u1ea7u g\u1ea7n \u0111\xe2y trong m\u1ed9t danh s\xe1ch/log."),(0,c.kt)("li",{parentName:"ul"},"Khi c\xf3 y\xeau c\u1ea7u m\u1edbi, x\xf3a c\xe1c timestamp c\u0169 h\u01a1n kho\u1ea3ng th\u1eddi gian gi\u1edbi h\u1ea1n (v\xed d\u1ee5: c\u0169 h\u01a1n 60 gi\xe2y)."),(0,c.kt)("li",{parentName:"ul"},"\u0110\u1ebfm s\u1ed1 timestamp c\xf2n l\u1ea1i. N\u1ebfu v\u01b0\u1ee3t ng\u01b0\u1ee1ng, t\u1eeb ch\u1ed1i. Th\xeam timestamp m\u1edbi n\u1ebfu ch\u1ea5p nh\u1eadn."))),(0,c.kt)("li",{parentName:"ul"},"Sliding Window Counter (Hi\u1ec7u qu\u1ea3 h\u01a1n): K\u1ebft h\u1ee3p \xfd t\u01b0\u1edfng c\u1ee7a Fixed Window v\xe0 Sliding Log \u0111\u1ec3 \u01b0\u1edbc t\xednh s\u1ed1 l\u01b0\u1ee3ng y\xeau c\u1ea7u trong c\u1eeda s\u1ed5 tr\u01b0\u1ee3t m\xe0 kh\xf4ng c\u1ea7n l\u01b0u t\u1ea5t c\u1ea3 timestamp.")))}m.isMDXComponent=!0}}]);