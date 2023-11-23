"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[919],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=r.createContext({}),c=function(e){var n=r.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(l.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(t),m=a,f=u["".concat(l,".").concat(m)]||u[m]||g[m]||o;return t?r.createElement(f,i(i({ref:n},p),{},{components:t})):r.createElement(f,i({ref:n},p))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},4586:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>g,frontMatter:()=>o,metadata:()=>s,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const o={title:"Singleton Pattern"},i=void 0,s={unversionedId:"programming/pattern/singleton",id:"programming/pattern/singleton",title:"Singleton Pattern",description:"Singleton is one of the five design patterns in the Creational Design Pattern group.",source:"@site/docs/programming/pattern/singleton.md",sourceDirName:"programming/pattern",slug:"/programming/pattern/singleton",permalink:"/docs/programming/pattern/singleton",draft:!1,tags:[],version:"current",frontMatter:{title:"Singleton Pattern"},sidebar:"programming",previous:{title:"Stateless & Stateful",permalink:"/docs/programming/fundamental/staless-stateful"},next:{title:"Cloud Concept",permalink:"/docs/programming/aws/concept"}},l={},c=[],p={toc:c},u="wrapper";function g(e){let{components:n,...t}=e;return(0,a.kt)(u,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Singleton is one of the five design patterns in the Creational Design Pattern group."),(0,a.kt)("p",null,"Singleton ensures that only one instance is created and provides a method to access that instance at any time and from anywhere in the program."),(0,a.kt)("p",null,"Singleton is used when we want to:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Ensure that only one instance of a class exists."),(0,a.kt)("li",{parentName:"ul"},"Manage access control better because there is only one instance."),(0,a.kt)("li",{parentName:"ul"},"Control the number of instances of a class within a specific limit."),(0,a.kt)("li",{parentName:"ul"},"Since a Singleton class only exists in a single instance, it is often used to address issues that require access to applications such as shared resources, loggers, configurations, caching, thread pools, etc."),(0,a.kt)("li",{parentName:"ul"},"Some other design patterns also use Singleton for implementation, such as Abstract Factory, Builder, Prototype, Facade, etc."),(0,a.kt)("li",{parentName:"ul"},"It has been used in some core Java classes like java.lang.Runtime, java.awt.Desktop.")),(0,a.kt)("p",null,"Code example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"class Singleton {\n  private static instance: Singleton;\n\n  /**\n   * The Singleton's constructor should always be private to prevent direct\n   * construction calls with the `new` operator.\n   */\n  private constructor() {}\n\n  /**\n   * The static method that controls the access to the singleton instance.\n   *\n   * This implementation let you subclass the Singleton class while keeping\n   * just one instance of each subclass around.\n   */\n  public static getInstance(): Singleton {\n    if (!Singleton.instance) {\n      Singleton.instance = new Singleton();\n    }\n\n    return Singleton.instance;\n  }\n\n  /**\n   * Finally, any singleton should define some business logic, which can be\n   * executed on its instance.\n   */\n  public someBusinessLogic() {\n    // ...\n  }\n}\n")))}g.isMDXComponent=!0}}]);