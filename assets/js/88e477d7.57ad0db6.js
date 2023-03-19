"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7331],{3905:(t,n,e)=>{e.d(n,{Zo:()=>p,kt:()=>d});var a=e(7294);function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function i(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,a)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?i(Object(e),!0).forEach((function(n){r(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function l(t,n){if(null==t)return{};var e,a,r=function(t,n){if(null==t)return{};var e,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)e=i[a],n.indexOf(e)>=0||(r[e]=t[e]);return r}(t,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)e=i[a],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}var h=a.createContext({}),u=function(t){var n=a.useContext(h),e=n;return t&&(e="function"==typeof t?t(n):c(c({},n),t)),e},p=function(t){var n=u(t.components);return a.createElement(h.Provider,{value:n},t.children)},g="mdxType",o={inlineCode:"code",wrapper:function(t){var n=t.children;return a.createElement(a.Fragment,{},n)}},m=a.forwardRef((function(t,n){var e=t.components,r=t.mdxType,i=t.originalType,h=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),g=u(e),m=r,d=g["".concat(h,".").concat(m)]||g[m]||o[m]||i;return e?a.createElement(d,c(c({ref:n},p),{},{components:e})):a.createElement(d,c({ref:n},p))}));function d(t,n){var e=arguments,r=n&&n.mdxType;if("string"==typeof t||r){var i=e.length,c=new Array(i);c[0]=m;var l={};for(var h in n)hasOwnProperty.call(n,h)&&(l[h]=n[h]);l.originalType=t,l[g]="string"==typeof t?t:r,c[1]=l;for(var u=2;u<i;u++)c[u]=e[u];return a.createElement.apply(null,c)}return a.createElement.apply(null,e)}m.displayName="MDXCreateElement"},796:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>h,contentTitle:()=>c,default:()=>o,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var a=e(7462),r=(e(7294),e(3905));const i={title:"Concept"},c=void 0,l={unversionedId:"programming/aws/concept",id:"programming/aws/concept",title:"Concept",description:"Well-Architected Framework",source:"@site/docs/programming/aws/concept.md",sourceDirName:"programming/aws",slug:"/programming/aws/concept",permalink:"/docs/programming/aws/concept",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/programming/aws/concept.md",tags:[],version:"current",frontMatter:{title:"Concept"},sidebar:"programming",next:{title:"Amazon Elastic Compute Cloud",permalink:"/docs/programming/aws/ec2"}},h={},u=[{value:"Well-Architected Framework",id:"well-architected-framework",level:2},{value:"L\u1ee3i \xedch chuy\u1ec3n on-premises qua AWS",id:"l\u1ee3i-\xedch-chuy\u1ec3n-on-premises-qua-aws",level:2},{value:"OPEX v\xe0 CAPEX",id:"opex-v\xe0-capex",level:3},{value:"AWS Shared Responsibility Model",id:"aws-shared-responsibility-model",level:2},{value:"Support plan",id:"support-plan",level:2},{value:"Trusted Advisor",id:"trusted-advisor",level:3},{value:"AWS Concierge",id:"aws-concierge",level:3}],p={toc:u},g="wrapper";function o(t){let{components:n,...e}=t;return(0,r.kt)(g,(0,a.Z)({},p,e,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"well-architected-framework"},"Well-Architected Framework"),(0,r.kt)("p",null,"Well-Architected Framework (WAF) c\u1ee7a AWS l\xe0 m\u1ed9t b\u1ed9 khung h\u01b0\u1edbng d\u1eabn thi\u1ebft k\u1ebf ki\u1ebfn tr\xfac \u0111\xe1ng tin c\u1eady cho c\xe1c \u1ee9ng d\u1ee5ng \u0111ang ch\u1ea1y tr\xean n\u1ec1n t\u1ea3ng AWS. N\xf3 gi\xfap qu\xfd kh\xe1ch h\xe0ng \u0111\xe1nh gi\xe1 chi ti\u1ebft s\u1ef1 ph\xf9 h\u1ee3p c\u1ee7a ki\u1ebfn tr\xfac \u0111ang \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng v\u1edbi nh\u1eefng ti\xeau chu\u1ea9n v\xe0 c\xe1c best-practices \u0111\xe3 \u0111\u01b0\u1ee3c AWS x\xe1c \u0111\u1ecbnh."),(0,r.kt)("p",null,"C\xe1c ph\u1ea7n ch\xednh c\u1ee7a WAF bao g\u1ed3m:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Operational Excellence: Ph\u1ea7n n\xe0y t\u1eadp trung v\xe0o vi\u1ec7c \u0111\u1ea3m b\u1ea3o r\u1eb1ng c\xe1c h\u1ec7 th\u1ed1ng \u0111\u01b0\u1ee3c tri\u1ec3n khai v\xe0 qu\u1ea3n l\xfd hi\u1ec7u qu\u1ea3, \u0111\u1ec3 \u0111\xe1p \u1ee9ng y\xeau c\u1ea7u kinh doanh v\xe0 kh\xe1ch h\xe0ng.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Security: Ph\u1ea7n n\xe0y t\u1eadp trung v\xe0o vi\u1ec7c \u0111\u1ea3m b\u1ea3o t\xednh b\u1ea3o m\u1eadt c\u1ee7a c\xe1c \u1ee9ng d\u1ee5ng v\xe0 d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c qu\u1ea3n l\xfd tr\xean n\u1ec1n t\u1ea3ng AWS, bao g\u1ed3m c\xe1c gi\u1ea3i ph\xe1p b\u1ea3o m\u1eadt c\u01a1 b\u1ea3n v\xe0 c\xe1c c\xf4ng ngh\u1ec7 b\u1ea3o m\u1eadt ti\xean ti\u1ebfn.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Reliability: Ph\u1ea7n n\xe0y t\u1eadp trung v\xe0o vi\u1ec7c \u0111\u1ea3m b\u1ea3o r\u1eb1ng c\xe1c \u1ee9ng d\u1ee5ng lu\xf4n ho\u1ea1t \u0111\u1ed9ng \u0111\xfang c\xe1ch, v\u1edbi s\u1ef1 gi\xe1n \u0111o\u1ea1n t\u1ed1i thi\u1ec3u trong tr\u01b0\u1eddng h\u1ee3p c\xe1c s\u1ef1 c\u1ed1 x\u1ea3y ra.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Performance Efficiency: Ph\u1ea7n n\xe0y t\u1eadp trung v\xe0o vi\u1ec7c \u0111\u1ea3m b\u1ea3o r\u1eb1ng c\xe1c \u1ee9ng d\u1ee5ng \u0111\u01b0\u1ee3c tri\u1ec3n khai v\xe0 qu\u1ea3n l\xfd v\u1edbi hi\u1ec7u su\u1ea5t t\u1ed1i \u01b0u v\xe0 \u0111\u1ea3m b\u1ea3o s\u1eed d\u1ee5ng t\xe0i nguy\xean hi\u1ec7u qu\u1ea3.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Cost Optimization: Ph\u1ea7n n\xe0y t\u1eadp trung v\xe0o vi\u1ec7c \u0111\u1ea3m b\u1ea3o r\u1eb1ng c\xe1c \u1ee9ng d\u1ee5ng \u0111\u01b0\u1ee3c tri\u1ec3n khai v\xe0 qu\u1ea3n l\xfd v\u1edbi chi ph\xed t\u1ed1i thi\u1ec3u v\xe0 \u0111\u1ea3m b\u1ea3o s\u1eed d\u1ee5ng t\xe0i nguy\xean m\u1ed9t c\xe1ch hi\u1ec7u qu\u1ea3."))),(0,r.kt)("h2",{id:"l\u1ee3i-\xedch-chuy\u1ec3n-on-premises-qua-aws"},"L\u1ee3i \xedch chuy\u1ec3n on-premises qua AWS"),(0,r.kt)("p",null,"Trong vi\u1ec7c chuy\u1ec3n \u0111\u1ed5i h\u1ea1 t\u1ea7ng v\xe0 c\xe1c \u1ee9ng d\u1ee5ng t\u1eeb trung t\xe2m d\u1eef li\u1ec7u on-premises sang AWS, m\u1ed9t trong nh\u1eefng c\u01a1 h\u1ed9i t\xe0i ch\xednh quan tr\u1ecdng l\xe0 thay th\u1ebf chi ph\xed ho\u1ea1t \u0111\u1ed9ng bi\u1ebfn \u0111\u1ed5i (OPEX) b\u1eb1ng chi ph\xed v\u1ed1n ban \u0111\u1ea7u th\u1ea5p (CAPEX)."),(0,r.kt)("p",null,"V\u1edbi h\u1ea1 t\u1ea7ng on-premises, c\xe1c ho\u1ea1t \u0111\u1ed9ng v\u1eadn h\xe0nh h\xe0ng ng\xe0y li\xean quan \u0111\u1ebfn vi\u1ec7c duy tr\xec, n\xe2ng c\u1ea5p v\xe0 m\u1edf r\u1ed9ng h\u1ea1 t\u1ea7ng \u0111\u01b0\u1ee3c t\xednh to\xe1n d\u01b0\u1edbi d\u1ea1ng OPEX. Tuy nhi\xean, khi di chuy\u1ec3n \u0111\u1ebfn AWS, chi ph\xed n\xe0y c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c thay th\u1ebf b\u1eb1ng c\xe1c kho\u1ea3n chi ph\xed v\u1ed1n ban \u0111\u1ea7u th\u1ea5p \u0111\u1ec3 x\xe2y d\u1ef1ng v\xe0 tri\u1ec3n khai h\u1ea1 t\u1ea7ng m\u1edbi, v\xe0 sau \u0111\xf3 nh\u1eefng chi ph\xed v\u1eadn h\xe0nh li\xean quan s\u1ebd \u0111\u01b0\u1ee3c gi\u1ea3m thi\u1ec3u."),(0,r.kt)("p",null,"Vi\u1ec7c s\u1eed d\u1ee5ng AWS gi\xfap c\xe1c t\u1ed5 ch\u1ee9c ti\u1ebft ki\u1ec7m chi ph\xed ho\u1ea1t \u0111\u1ed9ng kh\xf4ng c\u1ed1 \u0111\u1ecbnh v\xe0 t\u1ed1i thi\u1ec3u h\xf3a \u0111\u1ea7u t\u01b0 v\u1ed1n ban \u0111\u1ea7u. B\u1eb1ng c\xe1ch chuy\u1ec3n t\u1eeb OPEX sang CAPEX, c\xe1c t\u1ed5 ch\u1ee9c c\xf3 th\u1ec3 t\u0103ng t\xednh linh ho\u1ea1t trong vi\u1ec7c qu\u1ea3n l\xfd chi ph\xed, gi\u1ea3m thi\u1ec3u \u0111\u1ea7u t\u01b0 v\u1ed1n ban \u0111\u1ea7u v\xe0 t\u0103ng kh\u1ea3 n\u0103ng ph\xe1t tri\u1ec3n v\xe0 m\u1edf r\u1ed9ng nhanh ch\xf3ng."),(0,r.kt)("h3",{id:"opex-v\xe0-capex"},"OPEX v\xe0 CAPEX"),(0,r.kt)("p",null,"OPEX v\xe0 CAPEX l\xe0 hai kh\xe1i ni\u1ec7m t\xe0i ch\xednh trong qu\u1ea3n l\xfd kinh doanh. D\u01b0\u1edbi g\xf3c nh\xecn \u0111\u01a1n gi\u1ea3n, OPEX (Operational Expenditures) l\xe0 c\xe1c chi ph\xed li\xean quan \u0111\u1ebfn ho\u1ea1t \u0111\u1ed9ng v\u1eadn h\xe0nh h\xe0ng ng\xe0y c\u1ee7a m\u1ed9t t\u1ed5 ch\u1ee9c, v\xed d\u1ee5 nh\u01b0 chi ph\xed ti\xeau \u0111i\u1ec7n, chi ph\xed thu\xea m\u1eb7t b\u1eb1ng, chi ph\xed l\u01b0\u01a1ng nh\xe2n vi\xean, chi ph\xed mua linh ki\u1ec7n, v\u1eadt t\u01b0, ... Trong khi \u0111\xf3, CAPEX (Capital Expenditures) l\xe0 c\xe1c chi ph\xed li\xean quan \u0111\u1ebfn vi\u1ec7c \u0111\u1ea7u t\u01b0 v\xe0o t\xe0i s\u1ea3n c\u1ed1 \u0111\u1ecbnh c\u1ee7a t\u1ed5 ch\u1ee9c, v\xed d\u1ee5 nh\u01b0 chi ph\xed x\xe2y d\u1ef1ng, mua s\u1eafm thi\u1ebft b\u1ecb, m\xe1y m\xf3c, ..."),(0,r.kt)("p",null,"M\u1ed9t c\xe1ch tr\u1ef1c quan \u0111\u1ec3 hi\u1ec3u r\xf5 h\u01a1n l\xe0 so s\xe1nh chi ph\xed mua xe h\u01a1i v\u1edbi chi ph\xed duy tr\xec xe h\u01a1i. Chi ph\xed mua xe h\u01a1i m\u1edbi c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c xem l\xe0 chi ph\xed v\u1ed1n ban \u0111\u1ea7u (CAPEX), trong khi chi ph\xed x\u0103ng, b\u1ea3o d\u01b0\u1ee1ng v\xe0 s\u1eeda ch\u1eefa \u0111\u1ecbnh k\u1ef3 \u0111\u01b0\u1ee3c coi l\xe0 chi ph\xed ho\u1ea1t \u0111\u1ed9ng (OPEX)."),(0,r.kt)("p",null,"Trong l\u0129nh v\u1ef1c c\xf4ng ngh\u1ec7 th\xf4ng tin, c\xe1c chi ph\xed cho ph\u1ea7n m\u1ec1m, ph\u1ea7n c\u1ee9ng v\xe0 c\xe1c d\u1ecbch v\u1ee5 \u0111\xe1m m\xe2y c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c coi l\xe0 OPEX, trong khi vi\u1ec7c mua s\u1eafm m\xe1y ch\u1ee7 hay thi\u1ebft b\u1ecb m\u1ea1ng m\u1edbi c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c coi l\xe0 CAPEX."),(0,r.kt)("p",null,"T\u1eeb g\xf3c nh\xecn kinh doanh, vi\u1ec7c ch\u1ecdn gi\u1eefa OPEX v\xe0 CAPEX c\xf3 \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn c\xe1ch qu\u1ea3n l\xfd v\xe0 ph\xe2n b\u1ed5 ng\xe2n s\xe1ch v\xe0 t\xe0i nguy\xean c\u1ee7a m\u1ed9t t\u1ed5 ch\u1ee9c. Vi\u1ec7c s\u1eed d\u1ee5ng c\xe1c d\u1ecbch v\u1ee5 \u0111\xe1m m\xe2y c\u1ee7a AWS gi\xfap gi\u1ea3m thi\u1ec3u chi ph\xed v\u1ed1n ban \u0111\u1ea7u (CAPEX) v\xe0 chuy\u1ec3n sang chi ph\xed ho\u1ea1t \u0111\u1ed9ng bi\u1ebfn \u0111\u1ed5i (OPEX), gi\xfap c\xe1c t\u1ed5 ch\u1ee9c ti\u1ebft ki\u1ec7m chi ph\xed v\xe0 t\u0103ng t\xednh linh ho\u1ea1t trong qu\u1ea3n l\xfd t\xe0i ch\xednh."),(0,r.kt)("h2",{id:"aws-shared-responsibility-model"},"AWS Shared Responsibility Model"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Responsibility"),(0,r.kt)("th",{parentName:"tr",align:null},"AWS"),(0,r.kt)("th",{parentName:"tr",align:null},"User"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Physical security of data centers"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Network and infrastructure security"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Hypervisor and virtual instance security"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Patching and updating of host operating system, application stacks, and AWS-provided services"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Configuration of firewall and access control lists (ACLs)"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Encryption of data in transit and at rest"),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713"),(0,r.kt)("td",{parentName:"tr",align:null})),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Managing access to resources and data"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Security configuration of applications and operating systems"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Data classification and protection"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Incident response planning and execution"),(0,r.kt)("td",{parentName:"tr",align:null}),(0,r.kt)("td",{parentName:"tr",align:null},"\u2713")))),(0,r.kt)("h2",{id:"support-plan"},"Support plan"),(0,r.kt)("p",null,"AWS cung c\u1ea5p c\xe1c lo\u1ea1i Support Plan kh\xe1c nhau \u0111\u1ec3 h\u1ed7 tr\u1ee3 ng\u01b0\u1eddi d\xf9ng khi s\u1eed d\u1ee5ng d\u1ecbch v\u1ee5 c\u1ee7a AWS, bao g\u1ed3m:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Basic Support: \u0110\xe2y l\xe0 m\u1ed9t g\xf3i h\u1ed7 tr\u1ee3 mi\u1ec5n ph\xed \u0111\u01b0\u1ee3c cung c\u1ea5p cho t\u1ea5t c\u1ea3 c\xe1c kh\xe1ch h\xe0ng AWS. N\xf3 bao g\u1ed3m ti\u1ec7n \xedch h\u1ed7 tr\u1ee3 qua email, truy c\u1eadp v\xe0o di\u1ec5n \u0111\xe0n v\xe0 t\xe0i li\u1ec7u h\u1ed7 tr\u1ee3.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Developer Support: \u0110\xe2y l\xe0 m\u1ed9t g\xf3i h\u1ed7 tr\u1ee3 gi\xfap c\xe1c nh\xe0 ph\xe1t tri\u1ec3n x\u1eed l\xfd c\xe1c v\u1ea5n \u0111\u1ec1 k\u1ef9 thu\u1eadt khi s\u1eed d\u1ee5ng c\xe1c d\u1ecbch v\u1ee5 c\u1ee7a AWS. G\xf3i n\xe0y bao g\u1ed3m ti\u1ec7n \xedch h\u1ed7 tr\u1ee3 qua email, truy c\u1eadp v\xe0o di\u1ec5n \u0111\xe0n, t\xe0i li\u1ec7u h\u01b0\u1edbng d\u1eabn v\xe0 h\u1ed7 tr\u1ee3 chat tr\u1ef1c ti\u1ebfp.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Business Support: \u0110\xe2y l\xe0 m\u1ed9t g\xf3i h\u1ed7 tr\u1ee3 cao c\u1ea5p h\u01a1n, cung c\u1ea5p h\u1ed7 tr\u1ee3 k\u1ef9 thu\u1eadt 24/7/365, phi\u1ebfu y\xeau c\u1ea7u h\u1ed7 tr\u1ee3 \u0111\xe3 \u01b0u ti\xean, chuy\xean vi\xean h\u1ed7 tr\u1ee3 \u0111\u01b0\u1ee3c ch\u1ec9 \u0111\u1ecbnh, v\xe0 nhi\u1ec1u t\xednh n\u0103ng kh\xe1c.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Enterprise Support: \u0110\xe2y l\xe0 g\xf3i h\u1ed7 tr\u1ee3 chuy\xean nghi\u1ec7p nh\u1ea5t c\u1ee7a AWS. G\xf3i d\u1ecbch v\u1ee5 n\xe0y cung c\u1ea5p m\u1ed9t s\u1ed1 t\xednh n\u0103ng n\xe2ng cao nh\u01b0 h\u1ed7 tr\u1ee3 t\xf9y ch\u1ec9nh, chuy\xean gia k\u1ef9 thu\u1eadt \u0111\u01b0\u1ee3c ch\u1ec9 \u0111\u1ecbnh, gi\xe1m s\xe1t s\u1ee9c kh\u1ecfe c\u1ee7a h\u1ec7 th\u1ed1ng, v\xe0 c\xe1c t\xf9y ch\u1ecdn b\xe1o c\xe1o v\xe0 ph\xe2n t\xedch."))),(0,r.kt)("p",null,"T\xf3m l\u1ea1i, AWS cung c\u1ea5p m\u1ed9t lo\u1ea1t c\xe1c g\xf3i h\u1ed7 tr\u1ee3 kh\xe1c nhau \u0111\u1ec3 \u0111\xe1p \u1ee9ng nhu c\u1ea7u v\xe0 ng\xe2n s\xe1ch c\u1ee7a t\u1eebng kh\xe1ch h\xe0ng, t\u1eeb c\xe1c kh\xe1ch h\xe0ng c\xf3 nhu c\u1ea7u h\u1ed7 tr\u1ee3 c\u01a1 b\u1ea3n \u0111\u1ebfn c\xe1c doanh nghi\u1ec7p l\u1edbn c\xf3 nhu c\u1ea7u h\u1ed7 tr\u1ee3 t\xf9y ch\u1ec9nh v\xe0 n\xe2ng cao."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Plan Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Basic"),(0,r.kt)("th",{parentName:"tr",align:null},"Developer"),(0,r.kt)("th",{parentName:"tr",align:null},"Business"),(0,r.kt)("th",{parentName:"tr",align:null},"Enterprise"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Description"),(0,r.kt)("td",{parentName:"tr",align:null},"Free, limited support"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical support for developers"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical and account support for businesses"),(0,r.kt)("td",{parentName:"tr",align:null},"Personalized support with dedicated technical account manager")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Price"),(0,r.kt)("td",{parentName:"tr",align:null},"Free"),(0,r.kt)("td",{parentName:"tr",align:null},"Starts at $29/month"),(0,r.kt)("td",{parentName:"tr",align:null},"Starts at $100/month"),(0,r.kt)("td",{parentName:"tr",align:null},"Custom pricing")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Response Time"),(0,r.kt)("td",{parentName:"tr",align:null},"12 hours"),(0,r.kt)("td",{parentName:"tr",align:null},"12 hours"),(0,r.kt)("td",{parentName:"tr",align:null},"1 hour"),(0,r.kt)("td",{parentName:"tr",align:null},"15 minutes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Support Channels"),(0,r.kt)("td",{parentName:"tr",align:null},"Email"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat, Phone"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat, Phone")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Customer Service"),(0,r.kt)("td",{parentName:"tr",align:null},"General guidance, documentation, whitepapers"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical support, one-on-one guidance"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical and account support, AWS Trusted Advisor"),(0,r.kt)("td",{parentName:"tr",align:null},"Personalized support, technical account manager, infrastructure event management")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"AWS Infrastructure Event Management"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Trusted Advisor Checks"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"7 checks"),(0,r.kt)("td",{parentName:"tr",align:null},"Full suite of checks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Third-Party Software Support"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Concierge Support"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")))),(0,r.kt)("h3",{id:"trusted-advisor"},"Trusted Advisor"),(0,r.kt)("p",null,"AWS Trusted Advisor l\xe0 m\u1ed9t d\u1ecbch v\u1ee5 \u0111\u01b0\u1ee3c cung c\u1ea5p b\u1edfi Amazon Web Services (AWS) \u0111\u1ec3 gi\xfap kh\xe1ch h\xe0ng c\u1ee7a h\u1ecd t\u1ed1i \u01b0u h\xf3a m\xf4i tr\u01b0\u1eddng AWS c\u1ee7a h\u1ecd. N\xf3 s\u1eed d\u1ee5ng c\xe1c ki\u1ebfn \u200b\u200bth\u1ee9c v\xe0 kinh nghi\u1ec7m t\xedch l\u0169y t\u1eeb AWS \u0111\u1ec3 cung c\u1ea5p c\xe1c khuy\u1ebfn ngh\u1ecb v\u1ec1 t\xe0i nguy\xean, hi\u1ec7u su\u1ea5t, b\u1ea3o m\u1eadt v\xe0 chi ph\xed."),(0,r.kt)("p",null,"AWS Trusted Advisor ho\u1ea1t \u0111\u1ed9ng b\u1eb1ng c\xe1ch t\u1ef1 \u0111\u1ed9ng qu\xe9t m\xf4i tr\u01b0\u1eddng AWS c\u1ee7a b\u1ea1n v\xe0 so s\xe1nh n\xf3 v\u1edbi c\xe1c best practices \u0111\xe3 \u0111\u01b0\u1ee3c x\xe1c \u0111\u1ecbnh. N\xf3 sau \u0111\xf3 cung c\u1ea5p c\xe1c khuy\u1ebfn ngh\u1ecb \u0111\u1ec3 c\u1ea3i thi\u1ec7n ho\u1ea1t \u0111\u1ed9ng, gi\u1ea3m chi ph\xed v\xe0 t\u0103ng t\xednh kh\u1ea3 d\u1ee5ng c\u1ee7a h\u1ec7 th\u1ed1ng."),(0,r.kt)("p",null,"C\xe1c ph\u1ea7n ch\xednh c\u1ee7a Trusted Advisor bao g\u1ed3m:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Cost Optimization: Ph\u1ea7n n\xe0y ki\u1ec3m tra c\xe1c t\xe0i nguy\xean c\u1ee7a b\u1ea1n tr\xean AWS v\xe0 cung c\u1ea5p khuy\u1ebfn ngh\u1ecb v\u1ec1 c\xe1ch t\u1ed1i \u01b0u h\xf3a vi\u1ec7c s\u1eed d\u1ee5ng t\xe0i nguy\xean \u0111\u1ec3 gi\u1ea3m thi\u1ec3u chi ph\xed.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Performance: Ph\u1ea7n n\xe0y ki\u1ec3m tra hi\u1ec7u su\u1ea5t c\u1ee7a h\u1ec7 th\u1ed1ng AWS c\u1ee7a b\u1ea1n v\xe0 cung c\u1ea5p khuy\u1ebfn ngh\u1ecb v\u1ec1 c\xe1ch t\u1ed1i \u01b0u h\xf3a hi\u1ec7u su\u1ea5t.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Security: Ph\u1ea7n n\xe0y ki\u1ec3m tra c\xe1c bi\u1ec7n ph\xe1p b\u1ea3o m\u1eadt c\u1ee7a b\u1ea1n tr\xean n\u1ec1n t\u1ea3ng AWS v\xe0 cung c\u1ea5p khuy\u1ebfn ngh\u1ecb v\u1ec1 c\xe1ch t\u0103ng c\u01b0\u1eddng b\u1ea3o m\u1eadt.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Fault Tolerance: Ph\u1ea7n n\xe0y ki\u1ec3m tra t\xednh s\u1eb5n s\xe0ng v\xe0 kh\u1ea3 n\u0103ng ph\u1ee5c h\u1ed3i c\u1ee7a c\xe1c t\xe0i nguy\xean tr\xean AWS c\u1ee7a b\u1ea1n v\xe0 cung c\u1ea5p khuy\u1ebfn ngh\u1ecb v\u1ec1 c\xe1ch t\u1ed1i \u01b0u h\xf3a s\u1ef1 s\u1eb5n s\xe0ng.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Service Limits: Ph\u1ea7n n\xe0y ki\u1ec3m tra c\xe1c gi\u1edbi h\u1ea1n d\u1ecbch v\u1ee5 c\u1ee7a b\u1ea1n tr\xean AWS v\xe0 cung c\u1ea5p khuy\u1ebfn ngh\u1ecb v\u1ec1 c\xe1ch t\u1ed1i \u01b0u h\xf3a s\u1eed d\u1ee5ng t\xe0i nguy\xean \u0111\u1ec3 tr\xe1nh v\u01b0\u1ee3t qu\xe1 gi\u1edbi h\u1ea1n."))),(0,r.kt)("h3",{id:"aws-concierge"},"AWS Concierge"),(0,r.kt)("p",null,"AWS Concierge l\xe0 m\u1ed9t d\u1ecbch v\u1ee5 h\u1ed7 tr\u1ee3 cao c\u1ea5p c\u1ee7a Amazon Web Services (AWS) \u0111\u01b0\u1ee3c cung c\u1ea5p cho c\xe1c kh\xe1ch h\xe0ng doanh nghi\u1ec7p v\xe0 kh\u1ed1i l\u01b0\u1ee3ng l\u1edbn. N\xf3 gi\xfap c\xe1c kh\xe1ch h\xe0ng c\xf3 \u0111\u01b0\u1ee3c qu\u1ea3n l\xfd t\xe0i kho\u1ea3n AWS chuy\xean nghi\u1ec7p, k\u1ebf ho\u1ea1ch h\xf3a qu\u1ea3n l\xfd chi ph\xed v\xe0 t\u1ed1i \u01b0u h\xf3a hi\u1ec7u su\u1ea5t h\u1ea1 t\u1ea7ng."),(0,r.kt)("p",null,"V\u1edbi d\u1ecbch v\u1ee5 AWS Concierge, kh\xe1ch h\xe0ng s\u1ebd \u0111\u01b0\u1ee3c cung c\u1ea5p m\u1ed9t chuy\xean gia k\u1ef9 thu\u1eadt AWS (Technical Account Manager - TAM) v\u1edbi kinh nghi\u1ec7m \u0111\u1ec3 h\u1ed7 tr\u1ee3 c\xe1c y\xeau c\u1ea7u \u0111\u1eb7c bi\u1ec7t v\xe0 l\xe0m vi\u1ec7c v\u1edbi kh\xe1ch h\xe0ng \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o r\u1eb1ng c\xe1c m\u1ee5c ti\xeau kinh doanh c\u1ee7a h\u1ecd \u0111\u01b0\u1ee3c \u0111\xe1p \u1ee9ng. Ngo\xe0i ra, kh\xe1ch h\xe0ng c\xf2n nh\u1eadn \u0111\u01b0\u1ee3c c\xe1c d\u1ecbch v\u1ee5 h\u1ed7 tr\u1ee3 nh\u01b0 ki\u1ec3m tra t\xednh kh\u1ea3 d\u1ee5ng c\u1ee7a \u1ee9ng d\u1ee5ng v\xe0 h\u01b0\u1edbng d\u1eabn v\u1ec1 t\u1ed1i \u01b0u h\xf3a chi ph\xed."),(0,r.kt)("p",null,"D\u1ecbch v\u1ee5 AWS Concierge \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 gi\xfap c\xe1c kh\xe1ch h\xe0ng doanh nghi\u1ec7p v\xe0 kh\u1ed1i l\u01b0\u1ee3ng l\u1edbn th\u1ef1c hi\u1ec7n vi\u1ec7c tri\u1ec3n khai v\xe0 qu\u1ea3n l\xfd c\xe1c \u1ee9ng d\u1ee5ng ph\u1ee9c t\u1ea1p tr\xean n\u1ec1n t\u1ea3ng AWS m\u1ed9t c\xe1ch hi\u1ec7u qu\u1ea3 v\xe0 ti\u1ebft ki\u1ec7m chi ph\xed."))}o.isMDXComponent=!0}}]);