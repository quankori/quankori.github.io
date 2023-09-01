"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1180],{3905:(e,r,n)=>{n.d(r,{Zo:()=>d,kt:()=>h});var t=n(7294);function o(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function a(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function l(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?a(Object(n),!0).forEach((function(r){o(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function i(e,r){if(null==e)return{};var n,t,o=function(e,r){if(null==e)return{};var n,t,o={},a=Object.keys(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||(o[n]=e[n]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)n=a[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=t.createContext({}),c=function(e){var r=t.useContext(s),n=r;return e&&(n="function"==typeof e?e(r):l(l({},r),e)),n},d=function(e){var r=c(e.components);return t.createElement(s.Provider,{value:r},e.children)},p="mdxType",u={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},m=t.forwardRef((function(e,r){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),p=c(n),m=o,h=p["".concat(s,".").concat(m)]||p[m]||u[m]||a;return n?t.createElement(h,l(l({ref:r},d),{},{components:n})):t.createElement(h,l({ref:r},d))}));function h(e,r){var n=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var s in r)hasOwnProperty.call(r,s)&&(i[s]=r[s]);i.originalType=e,i[p]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<a;c++)l[c]=n[c];return t.createElement.apply(null,l)}return t.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9909:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var t=n(7462),o=(n(7294),n(3905));const a={title:"Middlewares"},l=void 0,i={unversionedId:"programming/nestjs/middlewares",id:"programming/nestjs/middlewares",title:"Middlewares",description:'Trong NestJS, kh\xf4ng c\xf3 s\u1ef1 ph\xe2n chia c\u1ee5 th\u1ec3 gi\u1eefa "middleware cho response" v\xe0 "middleware cho request". Middleware trong NestJS th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 th\u1ef1c hi\u1ec7n x\u1eed l\xfd tr\u01b0\u1edbc khi y\xeau c\u1ea7u \u0111\u1ebfn t\u1edbi route handlers, b\u1ea5t k\u1ec3 x\u1eed l\xfd \u0111\xf3 li\xean quan \u0111\u1ebfn request hay response.',source:"@site/docs/programming/nestjs/middlewares.md",sourceDirName:"programming/nestjs",slug:"/programming/nestjs/middlewares",permalink:"/docs/programming/nestjs/middlewares",draft:!1,tags:[],version:"current",frontMatter:{title:"Middlewares"},sidebar:"programming",previous:{title:"Interceptor",permalink:"/docs/programming/nestjs/interceptor"},next:{title:"Pipes",permalink:"/docs/programming/nestjs/pipes"}},s={},c=[],d={toc:c},p="wrapper";function u(e){let{components:r,...n}=e;return(0,o.kt)(p,(0,t.Z)({},d,n,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,'Trong NestJS, kh\xf4ng c\xf3 s\u1ef1 ph\xe2n chia c\u1ee5 th\u1ec3 gi\u1eefa "middleware cho response" v\xe0 "middleware cho request". Middleware trong NestJS th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 th\u1ef1c hi\u1ec7n x\u1eed l\xfd tr\u01b0\u1edbc khi y\xeau c\u1ea7u \u0111\u1ebfn t\u1edbi route handlers, b\u1ea5t k\u1ec3 x\u1eed l\xfd \u0111\xf3 li\xean quan \u0111\u1ebfn request hay response.'),(0,o.kt)("p",null,"Tuy nhi\xean, b\u1ea1n c\xf3 th\u1ec3 \u0111\u1ecbnh h\xecnh logic x\u1eed l\xfd trong middleware \u0111\u1ec3 t\xf9y ch\u1ec9nh vi\u1ec7c th\u1ef1c hi\u1ec7n x\u1eed l\xfd tr\u01b0\u1edbc ho\u1eb7c sau khi route handler \u0111\u01b0\u1ee3c g\u1ecdi. B\u1ea1n c\xf3 th\u1ec3 l\xe0m \u0111i\u1ec1u n\xe0y b\u1eb1ng c\xe1ch \u0111\u1eb7t h\xe0m next() \u1edf v\u1ecb tr\xed ph\xf9 h\u1ee3p trong middleware. N\u1ebfu b\u1ea1n \u0111\u1eb7t next() ngay sau khi ho\xe0n th\xe0nh x\u1eed l\xfd y\xeau c\u1ea7u, th\xec middleware s\u1ebd ho\xe0n th\xe0nh tr\u01b0\u1edbc khi route handler \u0111\u01b0\u1ee3c g\u1ecdi."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'@Injectable()\nexport class CustomMiddleware implements NestMiddleware {\n  use(req: Request, _res: Response, next: NextFunction) {\n    try {\n      console.log("Middleware for request"); // X\u1eed l\xfd tr\u01b0\u1edbc khi route handler \u0111\u01b0\u1ee3c g\u1ecdi\n      next(); // Chuy\u1ec3n quy\u1ec1n ki\u1ec3m so\xe1t cho route handler\n      console.log("Middleware for response"); // X\u1eed l\xfd sau khi route handler \u0111\xe3 ho\xe0n th\xe0nh\n      throw new Error("An error occurred in middleware");\n    } catch (error) {\n      // X\u1eed l\xfd l\u1ed7i trong kh\u1ed1i catch\n      console.error("Error in middleware:", error.message);\n      // Tr\u1ea3 v\u1ec1 m\u1ed9t ph\u1ea3n h\u1ed3i l\u1ed7i (optional)\n      res.status(400).send("Internal Server Error");\n    }\n  }\n}\n')),(0,o.kt)("p",null,"Trong v\xed d\u1ee5 tr\xean, middleware ",(0,o.kt)("inlineCode",{parentName:"p"},"CustomMiddleware")," \u0111\u01b0\u1ee3c th\u1ef1c thi tr\u01b0\u1edbc khi route handler \u0111\u01b0\u1ee3c g\u1ecdi. Sau khi route handler ho\xe0n th\xe0nh, middleware c\xf2n l\u1ea1i c\u1ee7a ",(0,o.kt)("inlineCode",{parentName:"p"},"CustomMiddleware")," s\u1ebd \u0111\u01b0\u1ee3c th\u1ef1c thi. \u0110i\u1ec1u n\xe0y cho ph\xe9p b\u1ea1n t\xf9y ch\u1ec9nh th\u1ee9 t\u1ef1 x\u1eed l\xfd tr\u01b0\u1edbc v\xe0 sau khi route handler."),(0,o.kt)("p",null,"C\xe1ch tri\u1ec3n khai Middleware trong NestJS"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"C\xe1ch 1")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { NestFactory } from "@nestjs/core";\nimport { AppModule } from "./app.module";\nimport { CustomMiddleware } from "./custom.middleware";\n\nasync function bootstrap() {\n  const app = await NestFactory.create(AppModule);\n\n  app.use(CustomMiddleware); // S\u1eed d\u1ee5ng middleware\n\n  await app.listen(3000);\n}\nbootstrap();\n')),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"C\xe1ch 2")," (th\u01b0\u1eddng x\xe0i nh\u1ea5t v\xec linh ho\u1ea1t)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";\nimport { CustomMiddleware } from "./custom.middleware";\nimport { MyController } from "./my.controller";\n\n@Module({\n  controllers: [MyController],\n  providers: [CustomMiddleware], // \u0110\u0103ng k\xfd middleware \u1edf \u0111\xe2y\n})\nexport class MyModule implements NestModule {\n  configure(consumer: MiddlewareConsumer) {\n    consumer\n      .apply(CustomMiddleware) // S\u1eed d\u1ee5ng middleware cho controllers\n      .forRoutes("*"); // \xc1p d\u1ee5ng cho t\u1ea5t c\u1ea3 c\xe1c routes trong module\n  }\n}\n')))}u.isMDXComponent=!0}}]);