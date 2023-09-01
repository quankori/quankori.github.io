"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4721],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>g});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)t=c[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=r.createContext({}),u=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=u(e.components);return r.createElement(i.Provider,{value:n},e.children)},s="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,c=e.originalType,i=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),s=u(t),d=o,g=s["".concat(i,".").concat(d)]||s[d]||m[d]||c;return t?r.createElement(g,l(l({ref:n},p),{},{components:t})):r.createElement(g,l({ref:n},p))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var c=t.length,l=new Array(c);l[0]=d;var a={};for(var i in n)hasOwnProperty.call(n,i)&&(a[i]=n[i]);a.originalType=e,a[s]="string"==typeof e?e:o,l[1]=a;for(var u=2;u<c;u++)l[u]=t[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6057:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>c,metadata:()=>a,toc:()=>u});var r=t(7462),o=(t(7294),t(3905));const c={title:"Modules"},l=void 0,a={unversionedId:"programming/nestjs/modules",id:"programming/nestjs/modules",title:"Modules",description:"Concept",source:"@site/docs/programming/nestjs/modules.md",sourceDirName:"programming/nestjs",slug:"/programming/nestjs/modules",permalink:"/docs/programming/nestjs/modules",draft:!1,tags:[],version:"current",frontMatter:{title:"Modules"},sidebar:"programming",previous:{title:"Providers",permalink:"/docs/programming/nestjs/providers"},next:{title:"Middlewares",permalink:"/docs/programming/nestjs/middlewares"}},i={},u=[{value:"Concept",id:"concept",level:2},{value:"Code",id:"code",level:2}],p={toc:u},s="wrapper";function m(e){let{components:n,...t}=e;return(0,o.kt)(s,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"concept"},"Concept"),(0,o.kt)("p",null,"Trong NestJS, modules l\xe0 m\u1ed9t ph\u1ea7n c\u01a1 b\u1ea3n trong vi\u1ec7c x\xe2y d\u1ef1ng \u1ee9ng d\u1ee5ng. Ch\xfang gi\xfap t\u1ed5 ch\u1ee9c m\xe3 ngu\u1ed3n th\xe0nh c\xe1c ph\u1ea7n nh\u1ecf, \u0111\u1ed9c l\u1eadp v\xe0 c\xf3 c\u1ea5u tr\xfac, t\u1eeb \u0111\xf3 t\u1ea1o n\xean s\u1ef1 t\u01b0\u01a1ng t\xe1c v\xe0 s\u1eafp x\u1ebfp h\u1ee3p l\xfd gi\u1eefa c\xe1c th\xe0nh ph\u1ea7n kh\xe1c nhau c\u1ee7a \u1ee9ng d\u1ee5ng. M\u1ed9t \u1ee9ng d\u1ee5ng NestJS \u0111\u01b0\u1ee3c x\xe2y d\u1ef1ng t\u1eeb nhi\u1ec1u modules m\xe0 m\u1ed7i module \u0111\u1ea1i di\u1ec7n cho m\u1ed9t ph\u1ea7n c\u1ee7a \u1ee9ng d\u1ee5ng."),(0,o.kt)("p",null,"C\xf3 hai lo\u1ea1i module ch\xednh trong NestJS:"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Application Module"),":"),(0,o.kt)("p",null,"Application module (module \u1ee9ng d\u1ee5ng) l\xe0 module g\u1ed1c v\xe0 \u0111\u1ea7u ti\xean \u0111\u01b0\u1ee3c t\u1ea1o ra khi b\u1ea1n kh\u1edfi \u0111\u1ea7u \u1ee9ng d\u1ee5ng NestJS. N\xf3 l\xe0 module m\xe0 b\u1ea1n cung c\u1ea5p \u0111\u1ec3 kh\u1edfi ch\u1ea1y \u1ee9ng d\u1ee5ng. Application module th\u01b0\u1eddng ch\u1ee9a c\xe1c import v\xe0 export c\u1ee7a c\xe1c module con, controllers, providers v\xe0 gateway m\xe0 b\u1ea1n mu\u1ed1n s\u1eed d\u1ee5ng trong \u1ee9ng d\u1ee5ng."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Feature Module"),":"),(0,o.kt)("p",null,"Feature module (module t\xednh n\u0103ng) l\xe0 module ch\u1ee9a c\xe1c th\xe0nh ph\u1ea7n li\xean quan \u0111\u1ebfn m\u1ed9t ch\u1ee9c n\u0103ng c\u1ee5 th\u1ec3 c\u1ee7a \u1ee9ng d\u1ee5ng. B\u1eb1ng c\xe1ch t\u1ed5 ch\u1ee9c m\xe3 ngu\u1ed3n th\xe0nh c\xe1c feature module, b\u1ea1n t\u1ea1o ra m\u1ed9t c\xe1ch c\u1ea5u tr\xfac r\xf5 r\xe0ng cho \u1ee9ng d\u1ee5ng. C\xe1c feature module th\u01b0\u1eddng ch\u1ee9a c\xe1c controllers, providers, services v\xe0 c\xe1c th\xe0nh ph\u1ea7n kh\xe1c li\xean quan \u0111\u1ebfn ch\u1ee9c n\u0103ng \u0111\xf3."),(0,o.kt)("p",null,"M\u1ed9t s\u1ed1 \u01b0u \u0111i\u1ec3m c\u1ee7a vi\u1ec7c s\u1eed d\u1ee5ng feature module:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"T\xe1ch bi\u1ec7t ch\u1ee9c n\u0103ng"),": M\u1ed7i ch\u1ee9c n\u0103ng c\u1ee7a \u1ee9ng d\u1ee5ng \u0111\u01b0\u1ee3c t\xe1ch bi\u1ec7t th\xe0nh m\u1ed9t module ri\xeang, l\xe0m cho m\xe3 ngu\u1ed3n d\u1ec5 \u0111\u1ecdc v\xe0 qu\u1ea3n l\xfd h\u01a1n."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"T\xe1i s\u1eed d\u1ee5ng"),": B\u1ea1n c\xf3 th\u1ec3 t\xe1i s\u1eed d\u1ee5ng feature module trong c\xe1c d\u1ef1 \xe1n kh\xe1c ho\u1eb7c trong c\xf9ng m\u1ed9t d\u1ef1 \xe1n."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Testability")," (kh\u1ea3 n\u0103ng ki\u1ec3m th\u1eed): Module \u0111\u01b0\u1ee3c t\u1ed5 ch\u1ee9c r\xf5 r\xe0ng gi\xfap vi\u1ec7c ki\u1ec3m th\u1eed tr\u1edf n\xean d\u1ec5 d\xe0ng v\xe0 t\u1eadp trung v\xe0o t\u1eebng ph\u1ea7n c\u1ee7a \u1ee9ng d\u1ee5ng.")),(0,o.kt)("h2",{id:"code"},"Code"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'// app.module.ts (Application Module)\nimport { Module } from "@nestjs/common";\nimport { CatsModule } from "./cats/cats.module";\n\n@Module({\n  imports: [CatsModule],\n})\nexport class AppModule {}\n\n// cats.module.ts (Feature Module)\nimport { Module } from "@nestjs/common";\nimport { CatsController } from "./cats.controller";\nimport { CatsService } from "./cats.service";\n\n@Module({\n  controllers: [CatsController],\n  providers: [CatsService],\n})\nexport class CatsModule {}\n')))}m.isMDXComponent=!0}}]);