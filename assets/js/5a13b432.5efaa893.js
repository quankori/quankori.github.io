"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[821],{3905:(n,t,e)=>{e.d(t,{Zo:()=>h,kt:()=>d});var r=e(7294);function a(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function i(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function c(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?i(Object(e),!0).forEach((function(t){a(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function o(n,t){if(null==n)return{};var e,r,a=function(n,t){if(null==n)return{};var e,r,a={},i=Object.keys(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)>=0||(a[e]=n[e]);return a}(n,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)e=i[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(a[e]=n[e])}return a}var u=r.createContext({}),l=function(n){var t=r.useContext(u),e=t;return n&&(e="function"==typeof n?n(t):c(c({},t),n)),e},h=function(n){var t=l(n.components);return r.createElement(u.Provider,{value:t},n.children)},g="mdxType",s={inlineCode:"code",wrapper:function(n){var t=n.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(n,t){var e=n.components,a=n.mdxType,i=n.originalType,u=n.parentName,h=o(n,["components","mdxType","originalType","parentName"]),g=l(e),m=a,d=g["".concat(u,".").concat(m)]||g[m]||s[m]||i;return e?r.createElement(d,c(c({ref:t},h),{},{components:e})):r.createElement(d,c({ref:t},h))}));function d(n,t){var e=arguments,a=t&&t.mdxType;if("string"==typeof n||a){var i=e.length,c=new Array(i);c[0]=m;var o={};for(var u in t)hasOwnProperty.call(t,u)&&(o[u]=t[u]);o.originalType=n,o[g]="string"==typeof n?n:a,c[1]=o;for(var l=2;l<i;l++)c[l]=e[l];return r.createElement.apply(null,c)}return r.createElement.apply(null,e)}m.displayName="MDXCreateElement"},9013:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>s,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var r=e(7462),a=(e(7294),e(3905));const i={title:"Database"},c=void 0,o={unversionedId:"programming/aws/database",id:"programming/aws/database",title:"Database",description:"AWS Database Migration Service",source:"@site/docs/programming/aws/database.md",sourceDirName:"programming/aws",slug:"/programming/aws/database",permalink:"/docs/programming/aws/database",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/programming/aws/database.md",tags:[],version:"current",frontMatter:{title:"Database"},sidebar:"programming",previous:{title:"Amazon Simple Storage Service",permalink:"/docs/programming/aws/s3"},next:{title:"Containers",permalink:"/docs/programming/aws/container"}},u={},l=[{value:"AWS Database Migration Service",id:"aws-database-migration-service",level:2},{value:"AWS DynamoDB",id:"aws-dynamodb",level:2},{value:"DynamoDB Streams",id:"dynamodb-streams",level:3}],h={toc:l},g="wrapper";function s(n){let{components:t,...e}=n;return(0,a.kt)(g,(0,r.Z)({},h,e,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"aws-database-migration-service"},"AWS Database Migration Service"),(0,a.kt)("p",null,"AWS Database Migration Service (AWS DMS) l\xe0 m\u1ed9t d\u1ecbch v\u1ee5 c\u1ee7a Amazon Web Services (AWS) cho ph\xe9p di chuy\u1ec3n d\u1eef li\u1ec7u t\u1eeb m\u1ed9t n\u01a1i \u0111\u1ebfn n\u01a1i kh\xe1c, gi\u1eefa c\xe1c c\u01a1 s\u1edf d\u1eef li\u1ec7u kh\xe1c nhau. AWS DMS gi\xfap ng\u01b0\u1eddi d\xf9ng sao ch\xe9p c\u01a1 s\u1edf d\u1eef li\u1ec7u \u0111\u1ebfn ho\u1eb7c t\u1eeb AWS Cloud, v\xe0 gi\u1eef nguy\xean t\xednh to\xe0n v\u1eb9n v\xe0 kh\u1ea3 n\u0103ng truy c\u1eadp c\u1ee7a d\u1eef li\u1ec7u trong qu\xe1 tr\xecnh di chuy\u1ec3n."),(0,a.kt)("p",null,"AWS DMS h\u1ed7 tr\u1ee3 nhi\u1ec1u lo\u1ea1i c\u01a1 s\u1edf d\u1eef li\u1ec7u, bao g\u1ed3m MySQL, PostgreSQL, Oracle, SQL Server v\xe0 MongoDB. N\xf3 cung c\u1ea5p c\xe1c c\xf4ng c\u1ee5 \u0111\u1ec3 t\u1ed1i \u01b0u h\xf3a v\xe0 can thi\u1ec7p v\xe0o qu\xe1 tr\xecnh di chuy\u1ec3n d\u1eef li\u1ec7u, nh\u01b0 l\u1ecdc v\xe0 bi\u1ebfn \u0111\u1ed5i d\u1eef li\u1ec7u."),(0,a.kt)("p",null,"C\xe1c t\xednh n\u0103ng ch\xednh c\u1ee7a AWS DMS bao g\u1ed3m:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Kh\u1ea3 n\u0103ng di chuy\u1ec3n d\u1eef li\u1ec7u gi\u1eefa c\xe1c c\u01a1 s\u1edf d\u1eef li\u1ec7u kh\xe1c nhau."),(0,a.kt)("li",{parentName:"ul"},"H\u1ed7 tr\u1ee3 cho nhi\u1ec1u lo\u1ea1i c\u01a1 s\u1edf d\u1eef li\u1ec7u."),(0,a.kt)("li",{parentName:"ul"},"T\xf9y ch\u1ecdn l\u1ecdc v\xe0 bi\u1ebfn \u0111\u1ed5i d\u1eef li\u1ec7u trong qu\xe1 tr\xecnh di chuy\u1ec3n."),(0,a.kt)("li",{parentName:"ul"},"C\u1ea3i thi\u1ec7n hi\u1ec7u su\u1ea5t v\xe0 t\u1ed1i \u01b0u h\xf3a qu\xe1 tr\xecnh di chuy\u1ec3n d\u1eef li\u1ec7u."),(0,a.kt)("li",{parentName:"ul"},"\u0110\u1ea3m b\u1ea3o t\xednh to\xe0n v\u1eb9n v\xe0 kh\u1ea3 n\u0103ng truy c\u1eadp c\u1ee7a d\u1eef li\u1ec7u trong qu\xe1 tr\xecnh di chuy\u1ec3n.")),(0,a.kt)("p",null,"V\u1edbi AWS DMS, ng\u01b0\u1eddi d\xf9ng c\xf3 th\u1ec3 d\u1ec5 d\xe0ng di chuy\u1ec3n c\u01a1 s\u1edf d\u1eef li\u1ec7u c\u1ee7a h\u1ecd gi\u1eefa c\xe1c n\u1ec1n t\u1ea3ng kh\xe1c nhau m\xe0 kh\xf4ng c\u1ea7n ph\u1ea3i lo l\u1eafng v\u1ec1 vi\u1ec7c m\u1ea5t d\u1eef li\u1ec7u ho\u1eb7c gi\xe1n \u0111o\u1ea1n k\u1ebft n\u1ed1i. AWS DMS gi\xfap t\u0103ng t\xednh linh ho\u1ea1t c\u1ee7a ki\u1ebfn tr\xfac c\u01a1 s\u1edf d\u1eef li\u1ec7u v\xe0 gi\u1ea3m chi ph\xed v\xe0 th\u1eddi gian cho qu\xe1 tr\xecnh di chuy\u1ec3n."),(0,a.kt)("h2",{id:"aws-dynamodb"},"AWS DynamoDB"),(0,a.kt)("p",null,"Amazon DynamoDB l\xe0 m\u1ed9t d\u1ecbch v\u1ee5 c\u01a1 s\u1edf d\u1eef li\u1ec7u NoSQL \u0111\u01b0\u1ee3c qu\u1ea3n l\xfd v\xe0 cung c\u1ea5p b\u1edfi Amazon Web Services (AWS). N\xf3 \u0111\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 x\u1eed l\xfd c\xe1c \u1ee9ng d\u1ee5ng web c\xf3 kh\u1ea3 n\u0103ng m\u1edf r\u1ed9ng cao, \u0111\xe1p \u1ee9ng v\u1edbi h\xe0ng tri\u1ec7u y\xeau c\u1ea7u trong gi\xe2y \u0111\u1ed3ng th\u1eddi t\u1eeb c\xe1c \u1ee9ng d\u1ee5ng ph\u1ee9c t\u1ea1p."),(0,a.kt)("h3",{id:"dynamodb-streams"},"DynamoDB Streams"),(0,a.kt)("p",null,"DynamoDB Streams l\xe0 m\u1ed9t t\xednh n\u0103ng c\u1ee7a d\u1ecbch v\u1ee5 c\u01a1 s\u1edf d\u1eef li\u1ec7u NoSQL DynamoDB c\u1ee7a Amazon Web Services (AWS). N\xf3 cung c\u1ea5p m\u1ed9t lu\u1ed3ng d\u1eef li\u1ec7u th\u1eddi gian th\u1ef1c c\u1ee7a c\xe1c thay \u0111\u1ed5i d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c l\u01b0u tr\u1eef trong b\u1ea3ng DynamoDB, cho ph\xe9p c\xe1c \u1ee9ng d\u1ee5ng kh\xe1c c\xf3 th\u1ec3 x\u1eed l\xfd c\xe1c s\u1ef1 ki\u1ec7n n\xe0y \u0111\u1ec3 th\u1ef1c hi\u1ec7n c\xe1c t\xe1c v\u1ee5 nh\u01b0 \u0111\u1ed3ng b\u1ed9 h\xf3a d\u1eef li\u1ec7u, x\xe2y d\u1ef1ng b\u1ea3n sao d\u1ef1 ph\xf2ng ho\u1eb7c ph\xe2n t\xedch d\u1eef li\u1ec7u."),(0,a.kt)("p",null,"Khi m\u1ed9t thay \u0111\u1ed5i d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n trong b\u1ea3ng DynamoDB, DynamoDB Streams s\u1ebd ghi l\u1ea1i s\u1ef1 ki\u1ec7n \u0111\xf3 v\xe0 ph\xe1t ra th\xf4ng b\xe1o cho c\xe1c \u1ee9ng d\u1ee5ng k\u1ebft n\u1ed1i \u0111\u1ebfn lu\u1ed3ng d\u1eef li\u1ec7u. \u0110i\u1ec1u n\xe0y gi\xfap c\xe1c \u1ee9ng d\u1ee5ng c\xf3 th\u1ec3 theo d\xf5i c\xe1c thay \u0111\u1ed5i d\u1eef li\u1ec7u tr\xean b\u1ea3ng DynamoDB m\u1ed9t c\xe1ch nhanh ch\xf3ng v\xe0 hi\u1ec7u qu\u1ea3."),(0,a.kt)("p",null,"DynamoDB Streams h\u1ed7 tr\u1ee3 t\xednh n\u0103ng t\u1ef1 \u0111\u1ed9ng ph\xe2n t\xe1n, t\u1ef1 \u0111\u1ed9ng m\u1edf r\u1ed9ng v\xe0 \u0111\u1ea3m b\u1ea3o t\xednh s\u1eb5n s\xe0ng cao th\xf4ng qua vi\u1ec7c l\u01b0u tr\u1eef d\u1eef li\u1ec7u tr\xean nhi\u1ec1u v\xf9ng kh\xe1c nhau v\xe0 t\u1ef1 \u0111\u1ed9ng \u0111i\u1ec1u ch\u1ec9nh lu\u1ed3ng d\u1eef li\u1ec7u khi c\xf3 nhu c\u1ea7u m\u1edf r\u1ed9ng ho\u1eb7c gi\u1ea3m thi\u1ec3u quy m\xf4."))}s.isMDXComponent=!0}}]);