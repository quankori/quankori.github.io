"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4941],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),h=s(n),m=a,d=h["".concat(c,".").concat(m)]||h[m]||p[m]||i;return n?r.createElement(d,o(o({ref:t},u),{},{components:n})):r.createElement(d,o({ref:t},u))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[h]="string"==typeof e?e:a,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},8893:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var r=n(7462),a=(n(7294),n(3905));const i={title:"Ethereum Virtual Machine"},o=void 0,l={unversionedId:"programming/blockchain/evm",id:"programming/blockchain/evm",title:"Ethereum Virtual Machine",description:"Concept",source:"@site/docs/programming/blockchain/evm.md",sourceDirName:"programming/blockchain",slug:"/programming/blockchain/evm",permalink:"/docs/programming/blockchain/evm",draft:!1,tags:[],version:"current",frontMatter:{title:"Ethereum Virtual Machine"},sidebar:"programming",previous:{title:"Blockchain Trilemma",permalink:"/docs/programming/blockchain/trilemma"},next:{title:"InterPlanetary File System",permalink:"/docs/programming/blockchain/ipfs"}},c={},s=[{value:"Concept",id:"concept",level:2},{value:"Structure",id:"structure",level:2},{value:"Characteristics",id:"characteristics",level:2}],u={toc:s},h="wrapper";function p(e){let{components:t,...n}=e;return(0,a.kt)(h,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"concept"},"Concept"),(0,a.kt)("p",null,"This is a system that executes pre-programmed contracts without the need for intermediaries; however, it still requires fees (gas fees) to perform transactions as well as rewards for miners."),(0,a.kt)("p",null,"Interactions with contracts are carried out through transactions."),(0,a.kt)("p",null,"Blockchain only stores a historical ledger and does not store data."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/3.PNG",alt:"Image"})),(0,a.kt)("h2",{id:"structure"},"Structure"),(0,a.kt)("p",null,"Hash, previous hash, data, nonce:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Hash"),": A cryptographic hash function applied to data to produce a fixed-size string of characters, which is typically a hexadecimal number. It represents a unique fingerprint of the data."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Previous hash"),": The hash of the previous block in the blockchain. It links blocks together in chronological order, forming the blockchain."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Data"),": Information or transaction data that is stored in the block."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Nonce"),": A number used in mining to find a suitable hash value. Miners change the nonce to search for a hash that meets certain criteria.\nThe formula you mentioned, which includes the previous hash, data, nonce, block id, and hash algorithm, is used to calculate the hash of a block."),(0,a.kt)("p",null,'The "Genesis block" is the first block in a blockchain, and its previous hash is typically set to a predefined value, often "00000000."'),(0,a.kt)("p",null,"The nonce is indeed a value that miners adjust to find a valid hash that meets specific criteria."),(0,a.kt)("p",null,"In blockchain, the SHA-256 algorithm is commonly used to hash data, and it is a one-way cryptographic hash function."),(0,a.kt)("p",null,"The resulting hash is often converted into a decimal number, typically from hexadecimal to decimal, for various purposes in blockchain and cryptocurrency systems."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/5.PNG",alt:"Image"})),(0,a.kt)("h2",{id:"characteristics"},"Characteristics"),(0,a.kt)("p",null,"Avalanche effect: When a small change is made, the hash will generate a completely different output from the original hash."),(0,a.kt)("p",null,"Must withstand collisions. Byzantine Fault Tolerance."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Immutable ledger."),(0,a.kt)("li",{parentName:"ul"},"Advantages over traditional authentication."),(0,a.kt)("li",{parentName:"ul"},"Distributed P2P network."),(0,a.kt)("li",{parentName:"ul"},"When a block is added to the network, it will be updated across the entire network (Consensus Protocol).")),(0,a.kt)("p",null,"It can be hacked if 51% is controlled, but it will be very costly."),(0,a.kt)("p",null,"If a node in the network is hacked, all other nodes will restore that node to its original value."),(0,a.kt)("p",null,"When a miner successfully adds a block to the chain, the remaining nodes in the network will update accordingly."),(0,a.kt)("p",null,"However, one of the drawbacks of short block mining times is that many miners may find a block in very close time intervals, but only the earliest found block will be added to the main branch, and the slower blocks will be discarded, known as orphaned blocks."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/4.PNG",alt:"Image"})))}p.isMDXComponent=!0}}]);