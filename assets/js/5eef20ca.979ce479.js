"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[637],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var a=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var o=a.createContext({}),p=function(e){var t=a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(o.Provider,{value:t},e.children)},m="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,r=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=s,f=m["".concat(o,".").concat(d)]||m[d]||c[d]||r;return n?a.createElement(f,l(l({ref:t},u),{},{components:n})):a.createElement(f,l({ref:t},u))}));function f(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=n.length,l=new Array(r);l[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[m]="string"==typeof e?e:s,l[1]=i;for(var p=2;p<r;p++)l[p]=n[p];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},5122:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>i,toc:()=>p});var a=n(7462),s=(n(7294),n(3905));const r={title:"Stateless & Stateful"},l=void 0,i={unversionedId:"programming/fundamental/staless-stateful",id:"programming/fundamental/staless-stateful",title:"Stateless & Stateful",description:"Stateless Systems",source:"@site/docs/programming/fundamental/staless-stateful.md",sourceDirName:"programming/fundamental",slug:"/programming/fundamental/staless-stateful",permalink:"/docs/programming/fundamental/staless-stateful",draft:!1,tags:[],version:"current",frontMatter:{title:"Stateless & Stateful"},sidebar:"programming",previous:{title:"Secure Sockets Layer (SSL)",permalink:"/docs/programming/fundamental/ssl"},next:{title:"ACID Database",permalink:"/docs/programming/database/acid"}},o={},p=[{value:"Stateless Systems",id:"stateless-systems",level:2},{value:"Stateful Systems",id:"stateful-systems",level:2},{value:"HTTP/HTTPS: Stateless or Stateful?",id:"httphttps-stateless-or-stateful",level:2},{value:"Summary",id:"summary",level:2}],u={toc:p},m="wrapper";function c(e){let{components:t,...n}=e;return(0,s.kt)(m,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"stateless-systems"},"Stateless Systems"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Definition"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"A stateless system does not retain any information about past interactions. Each request from a client to the server is independent, and the server does not store any session information about the client.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Characteristics"),":"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Independence"),": Each request is self-contained and includes all the information necessary to understand and process it."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Scalability"),": Stateless systems are easier to scale because any server can handle any request without needing to share session state."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Simplicity"),": Simplifies server design since there\u2019s no need to manage session state.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Examples"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"HTTP/HTTPS"),": The HTTP protocol is stateless by design. Each HTTP request from a client to a server is treated as an independent transaction that is unrelated to any previous request.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Usage"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"RESTful APIs"),": REST APIs are designed to be stateless. Each API call contains all the necessary information to process the request.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Example in HTTP"),":\nWhen a client requests a web page, it sends an HTTP request to the server. The server processes the request and sends back the response, but it does not remember anything about the client for future requests."),(0,s.kt)("h2",{id:"stateful-systems"},"Stateful Systems"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Definition"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"A stateful system retains information about past interactions. The server maintains session state between requests from the same client.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Characteristics"),":"),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Session State"),": The server keeps track of client interactions, allowing it to provide a continuous and context-aware experience."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Complexity"),": Requires mechanisms to store and manage state information, which can complicate the server design."),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("strong",{parentName:"li"},"Scalability Challenges"),": Scaling stateful systems can be more challenging because session state needs to be maintained across multiple servers or shared.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Examples"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"FTP (File Transfer Protocol)"),": FTP is a stateful protocol where the server maintains state about the user's current directory, session, and transfer progress."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Database Connections"),": Stateful connections where the database maintains the state of the connection and transaction.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Usage"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Web Applications"),": Often use stateful mechanisms like sessions or cookies to remember user login status, preferences, and other session data.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Example in HTTP with Sessions"),":\nWhen a user logs into a web application, the server creates a session and stores it on the server. The client receives a session ID, often stored in a cookie, which it sends with each subsequent request. The server uses this session ID to retrieve the user's state."),(0,s.kt)("h2",{id:"httphttps-stateless-or-stateful"},"HTTP/HTTPS: Stateless or Stateful?"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"HTTP/HTTPS"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Stateless"),": HTTP itself is a stateless protocol. Each request is independent, and the server does not retain any information about previous requests. This design simplifies the protocol and improves scalability."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Stateful Implementations"),": Although HTTP is stateless, web applications can implement stateful behavior using mechanisms like cookies, sessions, and tokens to maintain user state across multiple requests.")),(0,s.kt)("h2",{id:"summary"},"Summary"),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Stateless Systems"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Each request is independent."),(0,s.kt)("li",{parentName:"ul"},"Simplifies server design and enhances scalability."),(0,s.kt)("li",{parentName:"ul"},"Example: HTTP/HTTPS protocols.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"Stateful Systems"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"Retain information about past interactions."),(0,s.kt)("li",{parentName:"ul"},"More complex server design and potential scalability challenges."),(0,s.kt)("li",{parentName:"ul"},"Example: FTP, database connections.")),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"HTTP/HTTPS"),":"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Stateless by Design"),": Each request is independent."),(0,s.kt)("li",{parentName:"ul"},(0,s.kt)("strong",{parentName:"li"},"Stateful Implementations"),": Web applications use sessions, cookies, and tokens to create stateful experiences over the stateless HTTP protocol.")))}c.isMDXComponent=!0}}]);