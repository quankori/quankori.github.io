"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[407],{3905:(e,n,o)=>{o.d(n,{Zo:()=>u,kt:()=>f});var t=o(7294);function r(e,n,o){return n in e?Object.defineProperty(e,n,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[n]=o,e}function a(e,n){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),o.push.apply(o,t)}return o}function c(e){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?a(Object(o),!0).forEach((function(n){r(e,n,o[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(o,n))}))}return e}function l(e,n){if(null==e)return{};var o,t,r=function(e,n){if(null==e)return{};var o,t,r={},a=Object.keys(e);for(t=0;t<a.length;t++)o=a[t],n.indexOf(o)>=0||(r[o]=e[o]);return r}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(t=0;t<a.length;t++)o=a[t],n.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(r[o]=e[o])}return r}var i=t.createContext({}),s=function(e){var n=t.useContext(i),o=n;return e&&(o="function"==typeof e?e(n):c(c({},n),e)),o},u=function(e){var n=s(e.components);return t.createElement(i.Provider,{value:n},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},m=t.forwardRef((function(e,n){var o=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(o),m=r,f=p["".concat(i,".").concat(m)]||p[m]||d[m]||a;return o?t.createElement(f,c(c({ref:n},u),{},{components:o})):t.createElement(f,c({ref:n},u))}));function f(e,n){var o=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=o.length,c=new Array(a);c[0]=m;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l[p]="string"==typeof e?e:r,c[1]=l;for(var s=2;s<a;s++)c[s]=o[s];return t.createElement.apply(null,c)}return t.createElement.apply(null,o)}m.displayName="MDXCreateElement"},1943:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>i,contentTitle:()=>c,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var t=o(7462),r=(o(7294),o(3905));const a={title:"Scopes"},c=void 0,l={unversionedId:"programming/nodejs/scope",id:"programming/nodejs/scope",title:"Scopes",description:"Global Scope",source:"@site/docs/programming/nodejs/scope.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/scope",permalink:"/docs/programming/nodejs/scope",draft:!1,tags:[],version:"current",frontMatter:{title:"Scopes"},sidebar:"programming",previous:{title:"Process and Thread",permalink:"/docs/programming/nodejs/process-thread"},next:{title:"Types and Interfaces Typescript",permalink:"/docs/programming/nodejs/types-interfaces"}},i={},s=[{value:"Global Scope",id:"global-scope",level:2},{value:"Local (or Function) Scope",id:"local-or-function-scope",level:2},{value:"Block Scope (Introduced with ES6)",id:"block-scope-introduced-with-es6",level:2},{value:"Module Scope (With ES6 Modules)",id:"module-scope-with-es6-modules",level:2},{value:"Lexical Scope",id:"lexical-scope",level:2},{value:"Closures",id:"closures",level:2},{value:"Private Scope and Public Scope",id:"private-scope-and-public-scope",level:2}],u={toc:s},p="wrapper";function d(e){let{components:n,...o}=e;return(0,r.kt)(p,(0,t.Z)({},u,o,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"global-scope"},"Global Scope"),(0,r.kt)("p",null,"A variable declared outside of any function or block belongs to the global scope. Any code and functions can access it."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'let globalVar = "I\'m globally scoped";\n\nfunction showGlobalVar() {\n  console.log(globalVar); // Accessible here\n}\n\nshowGlobalVar(); // Outputs: "I\'m globally scoped"\n')),(0,r.kt)("h2",{id:"local-or-function-scope"},"Local (or Function) Scope"),(0,r.kt)("p",null,"Variables declared inside a function have local scope. They cannot be accessed outside of that function."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function localFunction() {\n  let localVar = "I\'m locally scoped";\n  console.log(localVar); // Accessible here\n}\n\nlocalFunction(); // Outputs: "I\'m locally scoped"\n// console.log(localVar); // Error: localVar is not defined\n')),(0,r.kt)("h2",{id:"block-scope-introduced-with-es6"},"Block Scope (Introduced with ES6)"),(0,r.kt)("p",null,"With the introduction of let and const in ES6, JavaScript adopted block scope. This means variables declared with let or const inside a block (such as within an if statement or for loop) can only be accessed within that block."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'if (true) {\n  let blockVar = "I\'m block-scoped";\n  console.log(blockVar); // Accessible here\n}\n\n// console.log(blockVar); // Error: blockVar is not defined\n')),(0,r.kt)("h2",{id:"module-scope-with-es6-modules"},"Module Scope (With ES6 Modules)"),(0,r.kt)("p",null,"When using ES6 modules, top-level variables (those not exported) have module scope. They are local to the module and cannot be accessed by other modules unless specifically exported."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'let moduleVar = "I\'m module-scoped";\nexport function showVar() {\n  console.log(moduleVar);\n}\n\n// Another file js\n\nimport { showVar } from "./moduleA";\nshowVar(); // Outputs: "I\'m module-scoped"\n// moduleVar isn\'t directly accessible here\n')),(0,r.kt)("h2",{id:"lexical-scope"},"Lexical Scope"),(0,r.kt)("p",null,"Lexical scope, also known as static scope, is an important concept in programming, especially in languages that interact with functions, such as JavaScript. Lexical scope determines the access rights of variables or functions in source code based on how they are declared and grouped."),(0,r.kt)("p",null,"When a function is defined within a context (a block or another function), it is created with lexical scope, meaning it can access variables and functions available in the same scope where it was defined, as well as outer enclosing scopes. This depends on how the source code is written and its static structure, not on how the source code is called at runtime."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function outer() {\n  const outerVar = "I\'m from outer";\n\n  function inner() {\n    const innerVar = "I\'m from inner";\n    console.log(outerVar); \n    console.log(innerVar); \n  }\n\n  inner();\n}\n\nouter();\n')),(0,r.kt)("p",null,"An important thing to remember about lexical scope is that it is determined at the time of function definition, not at the time of function invocation. This means that, regardless of where the function is called from, the variables and functions it accesses will still depend on the scope where it was defined."),(0,r.kt)("h2",{id:"closures"},"Closures"),(0,r.kt)("p",null,'In JavaScript, a closure is a language feature that allows a function to access variables from the context in which the function was created. A closure occurs when a function (called the "inner" function) is defined within another function (called the "outer" function), and the inner function accesses variables of the outer function.'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},'function outerFunction(outerVariable) {\n  return function innerFunction(innerVariable) {\n    console.log(`Outer Variable: ${outerVariable}`);\n    console.log(`Inner Variable: ${innerVariable}`);\n  };\n}\n\nconst myClosure = outerFunction("outer"); // T\u1ea1o m\u1ed9t closure\n\nmyClosure("inner"); // S\u1eed d\u1ee5ng closure\n\n// Outer Variable: outer\n// Inner Variable: inner\n')),(0,r.kt)("h2",{id:"private-scope-and-public-scope"},"Private Scope and Public Scope"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Private Scope"),': In private scope, variables and functions can only be accessed and used within the same "scope" or "code block" where they are declared. They cannot be accessed from other scopes, including other code blocks within the same file or module, allowing for easy interaction and sharing of data and functions between different parts of the program.'),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"function Counter() {\n  let count = 0;\n\n  this.increment = function () {\n    count++;\n  };\n\n  this.getCount = function () {\n    return count;\n  };\n}\n\nconst counter = new Counter();\ncounter.increment();\nconsole.log(counter.getCount()); // Output: 1\nconsole.log(counter.count); // Output: undefined \n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Public Scope"),": In public scope, variables and functions can be accessed from anywhere in the program, including from other modules, ensuring security and preventing unnecessary modifications from external scopes."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-js"},"let globalVar = 42; \n\nfunction printGlobal() {\n  console.log(globalVar);\n}\n\nprintGlobal(); // Output: 42\n")))}d.isMDXComponent=!0}}]);