"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[705],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>d});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var l=n.createContext({}),s=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(l.Provider,{value:t},e.children)},f="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(r),m=i,d=f["".concat(l,".").concat(m)]||f[m]||u[m]||o;return r?n.createElement(d,a(a({ref:t},p),{},{components:r})):n.createElement(d,a({ref:t},p))}));function d(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=r.length,a=new Array(o);a[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[f]="string"==typeof e?e:i,a[1]=c;for(var s=2;s<o;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},1677:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>u,frontMatter:()=>o,metadata:()=>c,toc:()=>s});var n=r(7462),i=(r(7294),r(3905));const o={title:"Sliding Window Cheatsheet"},a=void 0,c={unversionedId:"cheatsheet/algorithm/sliding-window",id:"cheatsheet/algorithm/sliding-window",title:"Sliding Window Cheatsheet",description:"Max Profit",source:"@site/docs/cheatsheet/algorithm/sliding-window.md",sourceDirName:"cheatsheet/algorithm",slug:"/cheatsheet/algorithm/sliding-window",permalink:"/docs/cheatsheet/algorithm/sliding-window",draft:!1,tags:[],version:"current",frontMatter:{title:"Sliding Window Cheatsheet"},sidebar:"cheatsheet",previous:{title:"Two Pointer Cheatsheet",permalink:"/docs/cheatsheet/algorithm/two-pointer"},next:{title:"Assume Role",permalink:"/docs/cheatsheet/devops/assume-role"}},l={},s=[{value:"Max Profit",id:"max-profit",level:3}],p={toc:s},f="wrapper";function u(e){let{components:t,...r}=e;return(0,i.kt)(f,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h3",{id:"max-profit"},"Max Profit"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},"function maxProfit(prices: number[]): number {\n  if (prices.length < 2) return 0;\n\n  let minPrice = prices[0];\n  let maxProfit = 0;\n\n  for (let i = 1; i < prices.length; i++) {\n    // Update minPrice if current price is lower\n    if (prices[i] < minPrice) {\n      minPrice = prices[i];\n      console.log(`Day ${i}: New minimum price found: $${minPrice}`);\n    } else {\n      // Calculate potential profit\n      const profit = prices[i] - minPrice;\n      if (profit > maxProfit) {\n        maxProfit = profit;\n        console.log(\n          `Day ${i}: Selling at $${prices[i]} with buy at $${minPrice} yields new max profit: $${maxProfit}`\n        );\n      }\n    }\n  }\n\n  return maxProfit;\n}\n")))}u.isMDXComponent=!0}}]);