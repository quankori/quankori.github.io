"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[3502],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>f});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",g={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=l(t),m=o,f=u["".concat(c,".").concat(m)]||u[m]||g[m]||a;return t?r.createElement(f,i(i({ref:n},p),{},{components:t})):r.createElement(f,i({ref:n},p))}));function f(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var a=t.length,i=new Array(a);i[0]=m;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s[u]="string"==typeof e?e:o,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},3258:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>i,default:()=>g,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var r=t(7462),o=(t(7294),t(3905));const a={title:"Singleton Pattern"},i=void 0,s={unversionedId:"programming/concept/singleton",id:"programming/concept/singleton",title:"Singleton Pattern",description:"Singleton is one of the five design patterns in the Creational Design Pattern group.",source:"@site/docs/programming/concept/singleton.md",sourceDirName:"programming/concept",slug:"/programming/concept/singleton",permalink:"/docs/programming/concept/singleton",draft:!1,tags:[],version:"current",frontMatter:{title:"Singleton Pattern"},sidebar:"programming",previous:{title:"Open Systems Interconnection Reference Model",permalink:"/docs/programming/concept/osimodel"},next:{title:"SOLID Principle",permalink:"/docs/programming/concept/solid"}},c={},l=[],p={toc:l},u="wrapper";function g(e){let{components:n,...t}=e;return(0,o.kt)(u,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Singleton is one of the five design patterns in the Creational Design Pattern group."),(0,o.kt)("p",null,"Singleton ensures that only one instance is created and provides a method for accessing that instance at any time and in any part of the program."),(0,o.kt)("p",null,"Singleton is used when we want to:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Ensure that only one instance of a class exists."),(0,o.kt)("li",{parentName:"ul"},"Better manage access because there is only one instance."),(0,o.kt)("li",{parentName:"ul"},"Manage the number of instances of a class within a specified limit."),(0,o.kt)("li",{parentName:"ul"},"Because a class that uses Singleton only exists in one instance, it is often used to solve problems that need to access applications such as shared resources, logger, configuration, caching, thread pool, etc."),(0,o.kt)("li",{parentName:"ul"},"Some other design patterns also use Singleton for implementation, such as Abstract Factory, Builder, Prototype, Facade, etc."),(0,o.kt)("li",{parentName:"ul"},"It has been used in some core java classes such as java.lang.Runtime, java.awt.Desktop.")),(0,o.kt)("p",null,"Code example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},"class Singleton {\n  private static instance: Singleton;\n\n  /**\n   * The Singleton's constructor should always be private to prevent direct\n   * construction calls with the `new` operator.\n   */\n  private constructor() {}\n\n  /**\n   * The static method that controls the access to the singleton instance.\n   *\n   * This implementation let you subclass the Singleton class while keeping\n   * just one instance of each subclass around.\n   */\n  public static getInstance(): Singleton {\n    if (!Singleton.instance) {\n      Singleton.instance = new Singleton();\n    }\n\n    return Singleton.instance;\n  }\n\n  /**\n   * Finally, any singleton should define some business logic, which can be\n   * executed on its instance.\n   */\n  public someBusinessLogic() {\n    // ...\n  }\n}\n")))}g.isMDXComponent=!0}}]);