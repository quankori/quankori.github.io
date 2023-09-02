"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6295],{3905:(n,e,t)=>{t.d(e,{Zo:()=>p,kt:()=>s});var r=t(7294);function c(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function o(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function i(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?o(Object(t),!0).forEach((function(e){c(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function a(n,e){if(null==n)return{};var t,r,c=function(n,e){if(null==n)return{};var t,r,c={},o=Object.keys(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||(c[t]=n[t]);return c}(n,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(r=0;r<o.length;r++)t=o[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(c[t]=n[t])}return c}var g=r.createContext({}),h=function(n){var e=r.useContext(g),t=e;return n&&(t="function"==typeof n?n(e):i(i({},e),n)),t},p=function(n){var e=h(n.components);return r.createElement(g.Provider,{value:e},n.children)},l="mdxType",m={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},u=r.forwardRef((function(n,e){var t=n.components,c=n.mdxType,o=n.originalType,g=n.parentName,p=a(n,["components","mdxType","originalType","parentName"]),l=h(t),u=c,s=l["".concat(g,".").concat(u)]||l[u]||m[u]||o;return t?r.createElement(s,i(i({ref:e},p),{},{components:t})):r.createElement(s,i({ref:e},p))}));function s(n,e){var t=arguments,c=e&&e.mdxType;if("string"==typeof n||c){var o=t.length,i=new Array(o);i[0]=u;var a={};for(var g in e)hasOwnProperty.call(e,g)&&(a[g]=e[g]);a.originalType=n,a[l]="string"==typeof n?n:c,i[1]=a;for(var h=2;h<o;h++)i[h]=t[h];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}u.displayName="MDXCreateElement"},8512:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>g,contentTitle:()=>i,default:()=>m,frontMatter:()=>o,metadata:()=>a,toc:()=>h});var r=t(7462),c=(t(7294),t(3905));const o={title:"Panic & Recover"},i=void 0,a={unversionedId:"programming/go/panic-recover",id:"programming/go/panic-recover",title:"Panic & Recover",description:"Trong ng\xf4n ng\u1eef Go (Golang), panic v\xe0 recover l\xe0 hai c\u01a1 ch\u1ebf \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 x\u1eed l\xfd c\xe1c t\xecnh hu\u1ed1ng kh\xf4ng mong mu\u1ed1n v\xe0 ph\u1ee5c h\u1ed3i t\u1eeb l\u1ed7i trong m\xe3 ngu\u1ed3n.",source:"@site/docs/programming/go/panic-recover.md",sourceDirName:"programming/go",slug:"/programming/go/panic-recover",permalink:"/docs/programming/go/panic-recover",draft:!1,tags:[],version:"current",frontMatter:{title:"Panic & Recover"},sidebar:"programming",previous:{title:"Memory Managements",permalink:"/docs/programming/go/memory-management"},next:{title:"Slices & Array",permalink:"/docs/programming/go/slices-array"}},g={},h=[],p={toc:h},l="wrapper";function m(n){let{components:e,...t}=n;return(0,c.kt)(l,(0,r.Z)({},p,t,{components:e,mdxType:"MDXLayout"}),(0,c.kt)("p",null,"Trong ng\xf4n ng\u1eef Go (Golang), panic v\xe0 recover l\xe0 hai c\u01a1 ch\u1ebf \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 x\u1eed l\xfd c\xe1c t\xecnh hu\u1ed1ng kh\xf4ng mong mu\u1ed1n v\xe0 ph\u1ee5c h\u1ed3i t\u1eeb l\u1ed7i trong m\xe3 ngu\u1ed3n."),(0,c.kt)("p",null,(0,c.kt)("strong",{parentName:"p"},"Panic"),":"),(0,c.kt)("p",null,"panic l\xe0 m\u1ed9t h\xe0m \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 k\xedch ho\u1ea1t m\u1ed9t t\xecnh hu\u1ed1ng kh\xf4ng th\u1ec3 x\u1eed l\xfd \u0111\u01b0\u1ee3c trong ch\u01b0\u01a1ng tr\xecnh. Khi m\u1ed9t panic \u0111\u01b0\u1ee3c k\xedch ho\u1ea1t, th\u1ef1c thi ch\u01b0\u01a1ng tr\xecnh s\u1ebd b\u1ecb ng\u1eebng l\u1ea1i v\xe0 th\xf4ng b\xe1o l\u1ed7i s\u1ebd \u0111\u01b0\u1ee3c in ra. Vi\u1ec7c s\u1eed d\u1ee5ng panic th\u01b0\u1eddng \u0111\u01b0\u1ee3c coi l\xe0 kh\xf4ng n\xean v\xe0 n\xean ch\u1ec9 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng trong c\xe1c t\xecnh hu\u1ed1ng kh\xf4ng th\u1ec3 kh\u1eafc ph\u1ee5c \u0111\u01b0\u1ee3c, v\xed d\u1ee5 nh\u01b0 khi g\u1eb7p m\u1ed9t l\u1ed7i nghi\xeam tr\u1ecdng m\xe0 ch\u01b0\u01a1ng tr\xecnh kh\xf4ng th\u1ec3 ti\u1ebfp t\u1ee5c ho\u1ea1t \u0111\u1ed9ng."),(0,c.kt)("p",null,(0,c.kt)("strong",{parentName:"p"},"Recover"),":"),(0,c.kt)("p",null,"recover l\xe0 m\u1ed9t h\xe0m \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 ph\u1ee5c h\u1ed3i kh\u1ecfi t\xecnh hu\u1ed1ng panic v\xe0 ti\u1ebfp t\u1ee5c th\u1ef1c thi ch\u01b0\u01a1ng tr\xecnh. H\xe0m recover th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng trong m\u1ed9t kh\u1ed1i defer v\xe0 ch\u1ec9 c\xf3 th\u1ec3 ho\u1ea1t \u0111\u1ed9ng trong m\u1ed9t h\xe0m goroutine. Khi recover \u0111\u01b0\u1ee3c g\u1ecdi trong kh\u1ed1i defer v\xe0 c\xf3 m\u1ed9t panic x\u1ea3y ra trong h\xe0m \u0111\xf3 ho\u1eb7c trong m\u1ed9t h\xe0m g\u1ecdi cha c\u1ee7a n\xf3, recover s\u1ebd tr\u1ea3 v\u1ec1 gi\xe1 tr\u1ecb panic v\xe0 ch\u01b0\u01a1ng tr\xecnh s\u1ebd ti\u1ebfp t\u1ee5c th\u1ef1c thi t\u1eeb v\u1ecb tr\xed recover \u0111\u01b0\u1ee3c g\u1ecdi."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'func main() {\n    defer func() {\n        if r := recover(); r != nil {\n            fmt.Println("Recovered:", r)\n        }\n    }()\n\n    fmt.Println("Start")\n    panic("Something went wrong")\n    fmt.Println("End") // Kh\xf4ng \u0111\u01b0\u1ee3c th\u1ef1c thi do panic \u0111\xe3 x\u1ea3y ra\n}\n')),(0,c.kt)("p",null,'Trong v\xed d\u1ee5 tr\xean, sau khi x\u1ea3y ra panic, kh\u1ed1i defer s\u1eed d\u1ee5ng recover \u0111\u1ec3 ph\u1ee5c h\u1ed3i t\u1eeb t\xecnh hu\u1ed1ng panic v\xe0 in ra th\xf4ng b\xe1o "Recovered: Something went wrong". C\xe2u l\u1ec7nh sau panic (fmt.Println("End")) s\u1ebd kh\xf4ng \u0111\u01b0\u1ee3c th\u1ef1c thi v\xec ch\u01b0\u01a1ng tr\xecnh \u0111\xe3 b\u1ecb ng\u1eebng l\u1ea1i khi panic x\u1ea3y ra.'),(0,c.kt)("p",null,"T\xf3m l\u1ea1i, panic v\xe0 recover l\xe0 c\u01a1 ch\u1ebf cho ph\xe9p b\u1ea1n x\u1eed l\xfd c\xe1c t\xecnh hu\u1ed1ng kh\xf4ng mong mu\u1ed1n v\xe0 c\xf3 th\u1ec3 ph\u1ee5c h\u1ed3i t\u1eeb c\xe1c t\xecnh hu\u1ed1ng panic trong m\xe3 ngu\u1ed3n Go. Tuy nhi\xean, vi\u1ec7c s\u1eed d\u1ee5ng ch\xfang c\u1ea7n \u0111\u01b0\u1ee3c th\u1ef1c hi\u1ec7n c\u1ea9n th\u1eadn v\xe0 ch\u1ec9 khi th\u1ef1c s\u1ef1 c\u1ea7n thi\u1ebft."))}m.isMDXComponent=!0}}]);