"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[6800],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=r.createContext({}),c=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=c(e.components);return r.createElement(p.Provider,{value:t},e.children)},m="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,p=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),m=c(n),u=a,f=m["".concat(p,".").concat(u)]||m[u]||d[u]||o;return n?r.createElement(f,i(i({ref:t},l),{},{components:n})):r.createElement(f,i({ref:t},l))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=u;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[m]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},6548:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={title:"Types and Interfaces Typescript"},i=void 0,s={unversionedId:"programming/nodejs/types-interfaces",id:"programming/nodejs/types-interfaces",title:"Types and Interfaces Typescript",description:"In TypeScript, both data types (type) and interfaces (interface) are powerful ways to define the shape of an object or data structure. However, there are differences in capabilities, usage, and when to choose one over the other.",source:"@site/docs/programming/nodejs/types-interfaces.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/types-interfaces",permalink:"/docs/programming/nodejs/types-interfaces",draft:!1,tags:[],version:"current",frontMatter:{title:"Types and Interfaces Typescript"},sidebar:"programming",previous:{title:"Generics",permalink:"/docs/programming/nodejs/generics"},next:{title:"Loop",permalink:"/docs/programming/nodejs/loop"}},p={},c=[],l={toc:c},m="wrapper";function d(e){let{components:t,...n}=e;return(0,a.kt)(m,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"In TypeScript, both data types (type) and interfaces (interface) are powerful ways to define the shape of an object or data structure. However, there are differences in capabilities, usage, and when to choose one over the other."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"type User = {\n  id: string;\n  name: string;\n} | null;\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"interface User {\n  id: string;\n  name: string;\n}\n\ninterface Admin extends User {\n  permissions: string[];\n}\n")),(0,a.kt)("p",null,"Comparison and Use Cases:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"For object shapes"),": Both ",(0,a.kt)("inlineCode",{parentName:"p"},"type")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," can be used, but if you expect consumers of your code (like other developers) to extend, modify, or implement object shapes, ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," is often preferred due to its extensibility."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Extending"),": ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," supports inheritance from other interface using the ",(0,a.kt)("inlineCode",{parentName:"p"},"extends")," keyword. While you can achieve a similar effect using intersection types with type, ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," provides a more reasonable approach to object-oriented programming (OOP) modeling."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Union Types"),": If you need types (e.g., string | number), ",(0,a.kt)("inlineCode",{parentName:"p"},"type")," is the only choice."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Declaration Merging"),": Only ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," supports declaration merging. This is useful when you want to gradually or incrementally add to the shape of an object across multiple files or locations in your source code."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Implementing in Classes"),": If you are defining a structure that a class will adhere to, use ",(0,a.kt)("inlineCode",{parentName:"p"},"interface"),". This allows you to use the ",(0,a.kt)("inlineCode",{parentName:"p"},"implements")," keyword with classes."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Performance"),": During compilation, ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," is slightly faster because it requires less computation compared to ",(0,a.kt)("inlineCode",{parentName:"p"},"type"),". However, this difference is often negligible for most projects."),(0,a.kt)("p",null,"In summary, while there is some overlap in many of their capabilities, the choice between ",(0,a.kt)("inlineCode",{parentName:"p"},"type")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"interface")," depends on the specific use case. As a general rule, for object shapes, especially shapes that may be extended or implemented, interface is often preferred. For ",(0,a.kt)("inlineCode",{parentName:"p"},"type")," definitions, unions, intersections, or mapped types, type is the top choice."))}d.isMDXComponent=!0}}]);