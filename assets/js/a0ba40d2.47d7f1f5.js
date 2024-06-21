"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4878],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),s=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},u=function(e){var n=s(e.components);return r.createElement(l.Provider,{value:n},e.children)},p="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),p=s(t),m=a,d=p["".concat(l,".").concat(m)]||p[m]||g[m]||i;return t?r.createElement(d,o(o({ref:n},u),{},{components:t})):r.createElement(d,o({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=m;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c[p]="string"==typeof e?e:a,o[1]=c;for(var s=2;s<i;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4429:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>o,default:()=>g,frontMatter:()=>i,metadata:()=>c,toc:()=>s});var r=t(7462),a=(t(7294),t(3905));const i={title:"Generics"},o=void 0,c={unversionedId:"programming/nodejs/generics",id:"programming/nodejs/generics",title:"Generics",description:"Basic Usage",source:"@site/docs/programming/nodejs/generics.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/generics",permalink:"/docs/programming/nodejs/generics",draft:!1,tags:[],version:"current",frontMatter:{title:"Generics"},sidebar:"programming",previous:{title:"Node.js Fundamental",permalink:"/docs/programming/nodejs/fundamental"},next:{title:"Loop",permalink:"/docs/programming/nodejs/loop"}},l={},s=[{value:"Basic Usage",id:"basic-usage",level:2},{value:"Generic Interfaces",id:"generic-interfaces",level:2},{value:"Generic Classes",id:"generic-classes",level:2},{value:"Constraints",id:"constraints",level:2}],u={toc:s},p="wrapper";function g(e){let{components:n,...t}=e;return(0,a.kt)(p,(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"basic-usage"},"Basic Usage"),(0,a.kt)("p",null,"In the identity function, T is a type variable. When we call the function with a string, T will be replaced by a string. When we call it with a number, T will be replaced by a number."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'function identity<T>(arg: T): T {\n  return arg;\n}\n\nlet output1 = identity<string>("Hello World");\nlet output2 = identity<number>(42);\n')),(0,a.kt)("h2",{id:"generic-interfaces"},"Generic Interfaces"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface GenericIdentityFn<T> {\n  (arg: T): T;\n}\n\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nlet myIdentity: GenericIdentityFn<number> = identity;\n")),(0,a.kt)("h2",{id:"generic-classes"},"Generic Classes"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'class GenericNumber<T> {\n  zeroValue: T;\n  add: (x: T, y: T) => T;\n}\n\nlet myGenericNumber = new GenericNumber<number>();\nmyGenericNumber.zeroValue = 0;\nmyGenericNumber.add = function (x, y) {\n  return x + y;\n};\n\nlet stringNumeric = new GenericNumber<string>();\nstringNumeric.zeroValue = "";\nstringNumeric.add = function (x, y) {\n  return x + y;\n};\n')),(0,a.kt)("h2",{id:"constraints"},"Constraints"),(0,a.kt)("p",null,'Sometimes, you may want to restrict the types that are allowed in a specific context. You can do this using a concept called "constraints."'),(0,a.kt)("p",null,"Here is an example where we constrain the generic type to types that have the .length property:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface Lengthwise {\n  length: number;\n}\n\nfunction loggingIdentity<T extends Lengthwise>(arg: T): T {\n  console.log(arg.length); // We can access `.length` because of the constraint\n  return arg;\n}\n")),(0,a.kt)("p",null,"Now, if you try to call loggingIdentity with a number or any type that doesn't have the .length property, TypeScript will produce an error."))}g.isMDXComponent=!0}}]);