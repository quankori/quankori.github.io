"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[8218],{3905:(e,r,n)=>{n.d(r,{Zo:()=>p,kt:()=>m});var t=n(7294);function s(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function o(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function a(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?o(Object(n),!0).forEach((function(r){s(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function i(e,r){if(null==e)return{};var n,t,s=function(e,r){if(null==e)return{};var n,t,s={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||(s[n]=e[n]);return s}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],r.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var l=t.createContext({}),c=function(e){var r=t.useContext(l),n=r;return e&&(n="function"==typeof e?e(r):a(a({},r),e)),n},p=function(e){var r=c(e.components);return t.createElement(l.Provider,{value:r},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var r=e.children;return t.createElement(t.Fragment,{},r)}},u=t.forwardRef((function(e,r){var n=e.components,s=e.mdxType,o=e.originalType,l=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),d=c(n),u=s,m=d["".concat(l,".").concat(u)]||d[u]||h[u]||o;return n?t.createElement(m,a(a({ref:r},p),{},{components:n})):t.createElement(m,a({ref:r},p))}));function m(e,r){var n=arguments,s=r&&r.mdxType;if("string"==typeof e||s){var o=n.length,a=new Array(o);a[0]=u;var i={};for(var l in r)hasOwnProperty.call(r,l)&&(i[l]=r[l]);i.originalType=e,i[d]="string"==typeof e?e:s,a[1]=i;for(var c=2;c<o;c++)a[c]=n[c];return t.createElement.apply(null,a)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},1976:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var t=n(7462),s=(n(7294),n(3905));const o={title:"Process and Thread"},a=void 0,i={unversionedId:"programming/nodejs/process-thread",id:"programming/nodejs/process-thread",title:"Process and Thread",description:"Child Processes:",source:"@site/docs/programming/nodejs/process-thread.md",sourceDirName:"programming/nodejs",slug:"/programming/nodejs/process-thread",permalink:"/docs/programming/nodejs/process-thread",draft:!1,tags:[],version:"current",frontMatter:{title:"Process and Thread"},sidebar:"programming",previous:{title:"Event Loop",permalink:"/docs/programming/nodejs/event-loop"},next:{title:"Callbacks in Node.js",permalink:"/docs/programming/nodejs/callback"}},l={},c=[{value:"Child Processes:",id:"child-processes",level:2},{value:"Worker Threads:",id:"worker-threads",level:2},{value:"Cluster mode",id:"cluster-mode",level:2}],p={toc:c},d="wrapper";function h(e){let{components:r,...n}=e;return(0,s.kt)(d,(0,t.Z)({},p,n,{components:r,mdxType:"MDXLayout"}),(0,s.kt)("h2",{id:"child-processes"},"Child Processes:"),(0,s.kt)("p",null,"In Node.js, when you want to execute a system command, you can use the child_process module. This module allows you to run system commands, manage ",(0,s.kt)("inlineCode",{parentName:"p"},"child processes"),", and communicate with them when you need to execute a system command or separate logic into a completely separate process."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'const { exec } = require("child_process");\n\nexec("ls -la", (error, stdout, stderr) => {\n  if (error) {\n    console.error(`exec error: ${error}`);\n    return;\n  }\n  console.log(`Output: ${stdout}`);\n  console.error(`Errors: ${stderr}`);\n});\n')),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'const { fork } = require("child_process");\n\nconst child = fork("./child-script.js");\n\nchild.on("message", (msg) => {\n  console.log("Message from child:", msg);\n});\n\nchild.send({ hello: "world" });\n')),(0,s.kt)("p",null,"In file ",(0,s.kt)("inlineCode",{parentName:"p"},"child-script.js")),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'process.on("message", (msg) => {\n  console.log("Message from parent:", msg);\n  process.send({ msg: "Hello from child!" });\n});\n')),(0,s.kt)("p",null,"When you create a child process, you are launching an entirely new system process. In the Unix environment, this is often done using the fork() system call."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"fork()"),": This is a system call used to create a duplicate of the current process. It returns twice: once for the parent process (father) and once for the child process. In Node.js, fork() is used to create a new child process of Node.js and establishes an IPC (Inter-Process Communication) channel between them."),(0,s.kt)("p",null,(0,s.kt)("strong",{parentName:"p"},"spawn() and exec()"),": Both of these methods create a child process, but they differ in terms of communication and handling output. spawn() returns a stream and is suitable for handling applications with large amounts of data. exec() returns the entire output as a string when the child process exits."),(0,s.kt)("p",null,"IPC (Inter-Process Communication) is a mechanism that allows two (or more) processes to communicate and share data with each other."),(0,s.kt)("h2",{id:"worker-threads"},"Worker Threads:"),(0,s.kt)("p",null,"Starting from Node.js version 10.5.0, a new module called ",(0,s.kt)("inlineCode",{parentName:"p"},"worker_threads")," was introduced. It provides a way to create threads, making it easier to perform parallel computations in the Node.js environment when you need to boost computational performance by utilizing unused CPU cores and want to keep all the logic within the same process."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'const { Worker, isMainThread, parentPort } = require("worker_threads");\n\nif (isMainThread) {\n  // This is the main thread\n\n  const worker = new Worker(__filename); // Start a new worker with this file\n\n  worker.on("message", (msg) => {\n    console.log("Message from worker:", msg);\n  });\n\n  worker.postMessage("Hello Worker!");\n} else {\n  // This is the worker thread\n\n  parentPort.on("message", (msg) => {\n    console.log("Message from main thread:", msg);\n    parentPort.postMessage("Hello Main Thread!");\n  });\n}\n')),(0,s.kt)("p",null,"Node.js by default runs on a single thread, utilizing an event loop to handle asynchronous operations. However, some tasks, especially computational tasks, can block the event loop, leading to decreased performance."),(0,s.kt)("p",null,"This is where worker_threads come into play:"),(0,s.kt)("ul",null,(0,s.kt)("li",{parentName:"ul"},"When you create a Worker, a new thread is spawned, running in parallel with the main thread."),(0,s.kt)("li",{parentName:"ul"},"Each worker has its own event loop and context, meaning they operate independently and don't share state."),(0,s.kt)("li",{parentName:"ul"},"Workers can communicate with the main thread and each other using a message-passing mechanism."),(0,s.kt)("li",{parentName:"ul"},"Objects like ArrayBuffer can be shared between threads, but sharing data between threads requires caution to avoid issues like race conditions.")),(0,s.kt)("p",null,'In summary, "child processes" are suitable when you need complete isolation or want to run independent tasks alongside Node.js. On the other hand, "worker threads" are useful when you want to harness all the CPU cores without the need to start multiple instances of Node.js'),(0,s.kt)("h2",{id:"cluster-mode"},"Cluster mode"),(0,s.kt)("p",null,"Cluster mode is a feature in Node.js that allows you to create multiple child processes to run the same Node.js application on a single machine or across a network. Each child process can run on a separate CPU or core, effectively harnessing the power of the CPUs or cores in the system."),(0,s.kt)("p",null,"In cluster mode, the main process (master process) is responsible for creating and managing the child processes (worker processes). The main process shares TCP and UDP connections with the child processes, enabling them to share network connections and handle concurrent requests. When a request is received, the main process distributes that request to one of the available child processes."),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre",className:"language-js"},'const cluster = require("cluster");\nconst http = require("http");\nconst numCPUs = require("os").cpus().length;\n\nif (cluster.isMaster) {\n  console.log(`Master ${process.pid} is running`);\n\n  // Fork workers.\n  for (let i = 0; i < numCPUs; i++) {\n    cluster.fork();\n  }\n\n  cluster.on("exit", (worker, code, signal) => {\n    console.log(`Worker ${worker.process.pid} died`);\n  });\n} else {\n  // Workers can share any TCP connection\n  // In this example, it\'s an HTTP server\n  http\n    .createServer((req, res) => {\n      res.writeHead(200);\n      res.end("Hello from Node.js!");\n    })\n    .listen(8000);\n\n  console.log(`Worker ${process.pid} started`);\n}\n')),(0,s.kt)("ol",null,(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"First, we check if the current process is the main process (master process) by using cluster.isMaster. The main process is responsible for creating child processes (workers).")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"If it's the main process, we create as many child processes (workers) as there are CPU cores using cluster.fork().")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"We set up an event listener on the main process to listen for the 'exit' event. This event is triggered when a child process dies.")),(0,s.kt)("li",{parentName:"ol"},(0,s.kt)("p",{parentName:"li"},"If it's not the main process (meaning it's a child process), we set up an HTTP server listening on port 8000 and respond with the string \"Hello from Node.js!\"."))),(0,s.kt)("p",null,"Here, we use cluster to create multiple child processes running the same application, taking advantage of the power of multiple CPU cores. When a child process exits or is killed, the main process can create a new child process to ensure that there are always child processes ready to handle requests."))}h.isMDXComponent=!0}}]);