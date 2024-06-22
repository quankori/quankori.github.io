"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2310],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>d});var a=n(7294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,l=function(e,t){if(null==e)return{};var n,a,l={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var p=a.createContext({}),s=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=s(e.components);return a.createElement(p.Provider,{value:t},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var n=e.components,l=e.mdxType,r=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),m=s(n),k=l,d=m["".concat(p,".").concat(k)]||m[k]||u[k]||r;return n?a.createElement(d,o(o({ref:t},c),{},{components:n})):a.createElement(d,o({ref:t},c))}));function d(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var r=n.length,o=new Array(r);o[0]=k;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[m]="string"==typeof e?e:l,o[1]=i;for(var s=2;s<r;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}k.displayName="MDXCreateElement"},5369:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>u,frontMatter:()=>r,metadata:()=>i,toc:()=>s});var a=n(7462),l=(n(7294),n(3905));const r={title:"Event Loop"},o=void 0,i={unversionedId:"programming/nodejs/event-loop",id:"programming/nodejs/event-loop",title:"Event Loop",description:"Event Loop in Node.js",source:"@site/docs/programming/nodejs/event-loop.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/event-loop",permalink:"/docs/programming/nodejs/event-loop",draft:!1,tags:[],version:"current",frontMatter:{title:"Event Loop"},sidebar:"programming",previous:{title:"Callbacks in Node.js",permalink:"/docs/programming/nodejs/callback"},next:{title:"Nest.js Dependency Injection (DI)",permalink:"/docs/programming/nodejs/nestjs-di"}},p={},s=[{value:"Event Loop in Node.js",id:"event-loop-in-nodejs",level:2},{value:"Key Concepts of the Event Loop",id:"key-concepts-of-the-event-loop",level:2},{value:"1. Single-Threaded Architecture",id:"1-single-threaded-architecture",level:3},{value:"2. Asynchronous I/O",id:"2-asynchronous-io",level:3},{value:"3. Phases of the Event Loop",id:"3-phases-of-the-event-loop",level:3},{value:"4. Callbacks and Task Queues",id:"4-callbacks-and-task-queues",level:3},{value:"5. Timers",id:"5-timers",level:3},{value:"Event Loop Workflow",id:"event-loop-workflow",level:2},{value:"Example: Understanding the Event Loop",id:"example-understanding-the-event-loop",level:2},{value:"Summary",id:"summary",level:2}],c={toc:s},m="wrapper";function u(e){let{components:t,...n}=e;return(0,l.kt)(m,(0,a.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("h2",{id:"event-loop-in-nodejs"},"Event Loop in Node.js"),(0,l.kt)("p",null,"The event loop is a fundamental concept in Node.js that allows for asynchronous programming. It enables Node.js to handle many operations concurrently, without having to create multiple threads. Understanding the event loop is crucial for writing efficient and non-blocking code."),(0,l.kt)("h2",{id:"key-concepts-of-the-event-loop"},"Key Concepts of the Event Loop"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Single-Threaded Architecture")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Asynchronous I/O")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Phases of the Event Loop")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Callbacks and Task Queues")),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Timers"))),(0,l.kt)("h3",{id:"1-single-threaded-architecture"},"1. Single-Threaded Architecture"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Definition"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Node.js operates on a single-threaded event-driven architecture. This means that it uses a single main thread to execute JavaScript code.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Implications"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Despite being single-threaded, Node.js can handle multiple operations concurrently thanks to the event loop.")),(0,l.kt)("h3",{id:"2-asynchronous-io"},"2. Asynchronous I/O"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Definition"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Node.js uses non-blocking asynchronous I/O operations. Instead of waiting for an I/O operation to complete, Node.js uses callbacks to continue execution.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'const fs = require("fs");\n\nfs.readFile("file.txt", "utf8", (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n\nconsole.log("Reading file...");\n')),(0,l.kt)("p",null,"In this example, ",(0,l.kt)("inlineCode",{parentName:"p"},"console.log('Reading file...');")," executes before the file reading completes."),(0,l.kt)("h3",{id:"3-phases-of-the-event-loop"},"3. Phases of the Event Loop"),(0,l.kt)("p",null,"The event loop consists of multiple phases, each handling different types of callbacks:"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Timers Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Executes callbacks scheduled by ",(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"setInterval"),"."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Pending Callbacks Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Executes I/O callbacks deferred to the next loop iteration."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Idle, Prepare Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Internal use, typically ignored by most applications."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Poll Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Retrieves new I/O events, executes I/O-related callbacks."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Check Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Executes callbacks from ",(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate"),"."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Close Callbacks Phase"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Executes callbacks related to closed connections, such as ",(0,l.kt)("inlineCode",{parentName:"li"},"socket.on('close', ...)"),".")))),(0,l.kt)("h3",{id:"4-callbacks-and-task-queues"},"4. Callbacks and Task Queues"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Definition"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Callbacks are functions that are executed at a later time. Task queues store these callbacks until they are executed in the appropriate phase of the event loop.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'setTimeout(() => {\n  console.log("Timeout callback");\n}, 1000);\n\nsetImmediate(() => {\n  console.log("Immediate callback");\n});\n\nconsole.log("Main script");\n')),(0,l.kt)("p",null,"The output will be:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"Main script\nImmediate callback\nTimeout callback\n")),(0,l.kt)("h3",{id:"5-timers"},"5. Timers"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Definition"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Timers allow scheduling of functions to be executed after a certain period of time or at regular intervals.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Functions"),":"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout"),": Schedules a callback to run after a specified delay."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setInterval"),": Schedules a callback to run repeatedly with a fixed time delay between each call."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate"),": Schedules a callback to run immediately after the current event loop phase.")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'setTimeout(() => {\n  console.log("Executed after 1000 ms");\n}, 1000);\n\nsetInterval(() => {\n  console.log("Executed every 1000 ms");\n}, 1000);\n\nsetImmediate(() => {\n  console.log("Executed immediately");\n});\n')),(0,l.kt)("h2",{id:"event-loop-workflow"},"Event Loop Workflow"),(0,l.kt)("p",null,"Here's a simplified representation of the event loop workflow:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-plaintext"},"        \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u250c\u2500> \u2502           Timers          \u2502\n    \u2502   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    \u2502   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u251c\u2500> \u2502     Pending Callbacks     \u2502\n    \u2502   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    \u2502   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u251c\u2500> \u2502      Idle, Prepare        \u2502\n    \u2502   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    \u2502   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u251c\u2500> \u2502          Poll             \u2502\n    \u2502   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    \u2502   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u251c\u2500> \u2502          Check            \u2502\n    \u2502   \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u252c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n    \u2502   \u250c\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2534\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510\n    \u2514\u2500> \u2502    Close Callbacks        \u2502\n        \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518\n")),(0,l.kt)("p",null,(0,l.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/9.gif",alt:"Image"})),(0,l.kt)("h2",{id:"example-understanding-the-event-loop"},"Example: Understanding the Event Loop"),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example Code"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-javascript"},'const fs = require("fs");\n\nconsole.log("Start");\n\nsetTimeout(() => {\n  console.log("Timeout callback");\n}, 0);\n\nsetImmediate(() => {\n  console.log("Immediate callback");\n});\n\nfs.readFile(__filename, () => {\n  console.log("File read callback");\n});\n\nconsole.log("End");\n')),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Explanation"),":"),(0,l.kt)("ol",null,(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Synchronous Code Execution"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"console.log('Start');")," executes and prints ",(0,l.kt)("inlineCode",{parentName:"li"},"Start"),"."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"console.log('End');")," executes and prints ",(0,l.kt)("inlineCode",{parentName:"li"},"End"),"."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Timers and Immediate Callbacks"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout(() => { console.log('Timeout callback'); }, 0);")," schedules the callback to be executed after the poll phase."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate(() => { console.log('Immediate callback'); });")," schedules the callback to be executed after the poll phase."))),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"File Read Callback"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"fs.readFile(__filename, () => { console.log('File read callback'); });")," schedules a callback to be executed when the file read operation completes, which will happen in the poll phase.")))),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Expected Output"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre"},"Start\nEnd\nImmediate callback\nFile read callback\nTimeout callback\n")),(0,l.kt)("h2",{id:"summary"},"Summary"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Event Loop"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Handles asynchronous operations in Node.js using a single-threaded, non-blocking architecture."),(0,l.kt)("li",{parentName:"ul"},"Manages the execution of callbacks from various sources like timers, I/O operations, and other events."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Phases of the Event Loop"),":"),(0,l.kt)("ol",{parentName:"li"},(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Timers"),": Executes callbacks from ",(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout")," and ",(0,l.kt)("inlineCode",{parentName:"li"},"setInterval"),"."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Pending Callbacks"),": Executes I/O callbacks deferred to the next loop iteration."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Idle, Prepare"),": Internal use for system tasks."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Poll"),": Retrieves new I/O events, executes I/O-related callbacks."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Check"),": Executes ",(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate")," callbacks."),(0,l.kt)("li",{parentName:"ol"},(0,l.kt)("strong",{parentName:"li"},"Close Callbacks"),": Executes callbacks for closed connections."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Asynchronous I/O"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"Allows Node.js to perform non-blocking I/O operations, improving efficiency and scalability."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Timers"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout"),", ",(0,l.kt)("inlineCode",{parentName:"li"},"setInterval"),", and ",(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate")," are used for scheduling future execution of code."))),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("p",{parentName:"li"},(0,l.kt)("strong",{parentName:"p"},"Callback Execution Order"),":"),(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},"setImmediate")," callbacks execute before ",(0,l.kt)("inlineCode",{parentName:"li"},"setTimeout")," callbacks scheduled with a delay of 0 milliseconds.")))))}u.isMDXComponent=!0}}]);