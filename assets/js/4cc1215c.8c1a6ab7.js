"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9501],{3905:(t,n,e)=>{e.d(n,{Zo:()=>m,kt:()=>s});var r=e(7294);function o(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function i(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,r)}return e}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?i(Object(e),!0).forEach((function(n){o(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):i(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function a(t,n){if(null==t)return{};var e,r,o=function(t,n){if(null==t)return{};var e,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)e=i[r],n.indexOf(e)>=0||(o[e]=t[e]);return o}(t,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)e=i[r],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(o[e]=t[e])}return o}var l=r.createContext({}),p=function(t){var n=r.useContext(l),e=n;return t&&(e="function"==typeof t?t(n):c(c({},n),t)),e},m=function(t){var n=p(t.components);return r.createElement(l.Provider,{value:n},t.children)},g="mdxType",u={inlineCode:"code",wrapper:function(t){var n=t.children;return r.createElement(r.Fragment,{},n)}},h=r.forwardRef((function(t,n){var e=t.components,o=t.mdxType,i=t.originalType,l=t.parentName,m=a(t,["components","mdxType","originalType","parentName"]),g=p(e),h=o,s=g["".concat(l,".").concat(h)]||g[h]||u[h]||i;return e?r.createElement(s,c(c({ref:n},m),{},{components:e})):r.createElement(s,c({ref:n},m))}));function s(t,n){var e=arguments,o=n&&n.mdxType;if("string"==typeof t||o){var i=e.length,c=new Array(i);c[0]=h;var a={};for(var l in n)hasOwnProperty.call(n,l)&&(a[l]=n[l]);a.originalType=t,a[g]="string"==typeof t?t:o,c[1]=a;for(var p=2;p<i;p++)c[p]=e[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,e)}h.displayName="MDXCreateElement"},8500:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>p});var r=e(7462),o=(e(7294),e(3905));const i={title:"Context"},c=void 0,a={unversionedId:"programming/go/context",id:"programming/go/context",title:"Context",description:"Concept",source:"@site/docs/programming/go/context.md",sourceDirName:"programming/go",slug:"/programming/go/context",permalink:"/docs/programming/go/context",draft:!1,tags:[],version:"current",frontMatter:{title:"Context"},sidebar:"programming",previous:{title:"Channel",permalink:"/docs/programming/go/channel"},next:{title:"Goroutine",permalink:"/docs/programming/go/goroutine"}},l={},p=[{value:"Concept",id:"concept",level:2}],m={toc:p},g="wrapper";function u(t){let{components:n,...e}=t;return(0,o.kt)(g,(0,r.Z)({},m,e,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"concept"},"Concept"),(0,o.kt)("p",null,"The Context l\xe0 m\u1ed9t c\u01a1 ch\u1ebf trong Golang \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 qu\u1ea3n l\xfd c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi v\xe0 ki\u1ec3m so\xe1t vi\u1ec7c th\u1ef1c hi\u1ec7n v\xe0 ch\u1ea5m d\u1ee9t c\u1ee7a c\xe1c goroutine. N\xf3 c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 truy\u1ec1n th\xf4ng tin v\xe0 ki\u1ec3m so\xe1t c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi, gi\xfap qu\u1ea3n l\xfd t\xe0i nguy\xean v\xe0 ng\u0103n c\xe1c nhi\u1ec7m v\u1ee5 ch\u1ea1y qu\xe1 l\xe2u."),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("p",{parentName:"li"},"C\xf3 ba lo\u1ea1i Context ch\xednh trong Golang:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Background"),": Context m\u1eb7c \u0111\u1ecbnh \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 kh\u1edfi t\u1ea1o m\u1ed9t Context m\u1edbi."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"TODO"),": \u0110\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 x\u1eed l\xfd c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u01a1n gi\u1ea3n v\xe0 t\u1ea1m th\u1eddi."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"WithCancel"),":Cho ph\xe9p h\u1ee7y m\u1ed9t nhi\u1ec7m v\u1ee5 sau khi Context c\u1ee7a n\xf3 \u0111\xe3 h\u1ebft h\u1ea1n."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"WithDeadline"),": Cho ph\xe9p \u0111\u1eb7t m\u1ed9t h\u1ea1n ch\xf3t cho m\u1ed9t nhi\u1ec7m v\u1ee5. Khi h\u1ea1n ch\xf3t \u0111\u1ebfn, Context s\u1ebd t\u1ef1 \u0111\u1ed9ng h\u1ee7y b\u1ecf nhi\u1ec7m v\u1ee5."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"WithTimeout"),": \u0110\u1eb7t m\u1ed9t gi\u1edbi h\u1ea1n th\u1eddi gian th\u1ef1c hi\u1ec7n cho m\u1ed9t nhi\u1ec7m v\u1ee5. Khi th\u1eddi gian n\xe0y k\u1ebft th\xfac, Context s\u1ebd t\u1ef1 \u0111\u1ed9ng h\u1ee7y b\u1ecf nhi\u1ec7m v\u1ee5.")))),(0,o.kt)("p",null,"N\u1ebfu kh\xf4ng th\u1ef1c hi\u1ec7n Context \u0111\xfang c\xe1ch, c\xe1c goroutine c\xf3 th\u1ec3 b\u1ecb ch\u1eb7n ho\u1eb7c c\xf3 th\u1ec3 kh\xf4ng b\u1ecb h\u1ee7y b\u1ecf \u0111\xfang. \u0110i\u1ec1u n\xe0y c\xf3 th\u1ec3 d\u1eabn \u0111\u1ebfn l\xe3ng ph\xed t\xe0i nguy\xean, hi\u1ec7u su\u1ea5t \u1ee9ng d\u1ee5ng gi\u1ea3m \u0111i v\xe0 c\xe1c v\u1ea5n \u0111\u1ec1 b\u1ea3o m\u1eadt ti\u1ec1m t\xe0ng. Do \u0111\xf3, vi\u1ec7c s\u1eed d\u1ee5ng Context l\xe0 r\u1ea5t quan tr\u1ecdng khi ph\xe1t tri\u1ec3n c\xe1c \u1ee9ng d\u1ee5ng \u0111a lu\u1ed3ng \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o t\xednh ch\xednh x\xe1c v\xe0 an to\xe0n c\u1ee7a ch\xfang."))}u.isMDXComponent=!0}}]);