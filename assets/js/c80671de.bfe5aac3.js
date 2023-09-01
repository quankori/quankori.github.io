"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1475],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),i=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=i(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},g=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,c=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=i(n),g=o,d=u["".concat(l,".").concat(g)]||u[g]||m[g]||c;return n?r.createElement(d,a(a({ref:t},p),{},{components:n})):r.createElement(d,a({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var c=n.length,a=new Array(c);a[0]=g;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:o,a[1]=s;for(var i=2;i<c;i++)a[i]=n[i];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}g.displayName="MDXCreateElement"},1958:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>c,metadata:()=>s,toc:()=>i});var r=n(7462),o=(n(7294),n(3905));const c={title:"Decorators"},a=void 0,s={unversionedId:"programming/nestjs/decorators",id:"programming/nestjs/decorators",title:"Decorators",description:"Concept",source:"@site/docs/programming/nestjs/decorators.md",sourceDirName:"programming/nestjs",slug:"/programming/nestjs/decorators",permalink:"/docs/programming/nestjs/decorators",draft:!1,tags:[],version:"current",frontMatter:{title:"Decorators"},sidebar:"programming",previous:{title:"Interceptor",permalink:"/docs/programming/nestjs/interceptor"},next:{title:"Testing",permalink:"/docs/programming/nestjs/testing"}},l={},i=[{value:"Concept",id:"concept",level:2},{value:"Code",id:"code",level:2}],p={toc:i},u="wrapper";function m(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"concept"},"Concept"),(0,o.kt)("p",null,"Decorators trong TypeScript cho ph\xe9p b\u1ea1n thay \u0111\u1ed5i ho\u1eb7c b\u1ed5 sung metadata v\xe0 logic cho c\xe1c \u0111\u1ed1i t\u01b0\u1ee3ng nh\u01b0 classes, properties, methods, hay parameters. Khi code c\u1ee7a b\u1ea1n ch\u1ea1y, TypeScript s\u1ebd g\u1ecdi t\u1edbi decorator functions ho\u1eb7c classes v\xe0 truy\u1ec1n th\xf4ng tin li\xean quan \u0111\u1ebfn \u0111\u1ed1i t\u01b0\u1ee3ng c\u1ea7n thay \u0111\u1ed5i."),(0,o.kt)("p",null,"Decorator function/class nh\u1eadn c\xe1c tham s\u1ed1 t\xf9y thu\u1ed9c v\xe0o lo\u1ea1i c\u1ee7a \u0111\u1ed1i t\u01b0\u1ee3ng m\xe0 b\u1ea1n \u0111ang \u0111\xe1nh d\u1ea5u. \u0110\u1ed1i v\u1edbi class decorator, tham s\u1ed1 l\xe0 constructor c\u1ee7a class. \u0110\u1ed1i v\u1edbi method decorator, tham s\u1ed1 l\xe0 prototype c\u1ee7a class v\xe0 t\xean c\u1ee7a method. \u0110\u1ed1i v\u1edbi parameter decorator, tham s\u1ed1 l\xe0 prototype c\u1ee7a class, t\xean c\u1ee7a method, v\xe0 v\u1ecb tr\xed c\u1ee7a parameter."),(0,o.kt)("h2",{id:"code"},"Code"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { SetMetadata } from "@nestjs/common";\nexport const IS_ROLES = "roles";\nexport const Roles = (...roles: string[]) => SetMetadata(IS_ROLES, roles);\n')),(0,o.kt)("p",null,"Ho\u1eb7c v\u1edbi Generic function k\u1ebft h\u1ee3p v\u1edbi Higher-Order function"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'function LogType<T>(type: T) {\n  return function (\n    target: any,\n    propertyKey: string,\n    descriptor: PropertyDescriptor\n  ) {\n    console.log(`Logged type: ${type}`);\n  };\n}\n\nclass Example {\n  @LogType<number>(123)\n  someMethod() {\n    console.log("Executing someMethod...");\n  }\n}\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"Reflector")),(0,o.kt)("p",null,"Trong NestJS, Reflector \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 t\xecm th\xf4ng tin metadata c\u1ee7a m\u1ed9t ph\u1ea7n t\u1eed, ch\u1eb3ng h\u1ea1n nh\u01b0 m\u1ed9t class, m\u1ed9t controller, m\u1ed9t handler, v.v. Metadata l\xe0 c\xe1c d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c g\u1eafn k\u1ebft v\u1edbi m\u1ed9t ph\u1ea7n t\u1eed trong m\xe3 ngu\u1ed3n v\xe0 th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 th\xeam th\xf4ng tin m\xf4 t\u1ea3 ho\u1eb7c c\u1ea5u h\xecnh cho ph\u1ea7n t\u1eed \u0111\xf3."),(0,o.kt)("p",null,"Trong NestJS, Reflector gi\xfap b\u1ea1n truy xu\u1ea5t v\xe0 qu\u1ea3n l\xfd metadata c\u1ee7a c\xe1c ph\u1ea7n t\u1eed. V\xed d\u1ee5, b\u1ea1n c\xf3 th\u1ec3 s\u1eed d\u1ee5ng Reflector \u0111\u1ec3 l\u1ea5y th\xf4ng tin v\u1ec1 c\xe1c decorator \u0111\xe3 \u0111\u01b0\u1ee3c \xe1p d\u1ee5ng cho m\u1ed9t class, m\u1ed9t method ho\u1eb7c m\u1ed9t tham s\u1ed1 c\u1ee7a m\u1ed9t function."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Injectable()\nexport class JwtAccessTokenGuard extends AuthGuard("jwt") {\n  constructor(private reflector: Reflector) {\n    super();\n  }\n  canActivate(\n    context: ExecutionContext\n  ): boolean | Promise<boolean> | Observable<boolean> {\n    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_ROLES, [\n      context.getHandler(),\n      context.getClass(),\n    ]);\n    if (isPublic) {\n      return true;\n    }\n    return super.canActivate(context);\n  }\n}\n')))}m.isMDXComponent=!0}}]);