"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[834],{3905:(n,e,t)=>{t.d(e,{Zo:()=>s,kt:()=>d});var r=t(7294);function o(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function i(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,r)}return t}function a(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?i(Object(t),!0).forEach((function(e){o(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function c(n,e){if(null==n)return{};var t,r,o=function(n,e){if(null==n)return{};var t,r,o={},i=Object.keys(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||(o[t]=n[t]);return o}(n,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);for(r=0;r<i.length;r++)t=i[r],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(o[t]=n[t])}return o}var u=r.createContext({}),l=function(n){var e=r.useContext(u),t=e;return n&&(t="function"==typeof n?n(e):a(a({},e),n)),t},s=function(n){var e=l(n.components);return r.createElement(u.Provider,{value:e},n.children)},m="mdxType",p={inlineCode:"code",wrapper:function(n){var e=n.children;return r.createElement(r.Fragment,{},e)}},f=r.forwardRef((function(n,e){var t=n.components,o=n.mdxType,i=n.originalType,u=n.parentName,s=c(n,["components","mdxType","originalType","parentName"]),m=l(t),f=o,d=m["".concat(u,".").concat(f)]||m[f]||p[f]||i;return t?r.createElement(d,a(a({ref:e},s),{},{components:t})):r.createElement(d,a({ref:e},s))}));function d(n,e){var t=arguments,o=e&&e.mdxType;if("string"==typeof n||o){var i=t.length,a=new Array(i);a[0]=f;var c={};for(var u in e)hasOwnProperty.call(e,u)&&(c[u]=e[u]);c.originalType=n,c[m]="string"==typeof n?n:o,a[1]=c;for(var l=2;l<i;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},5357:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>l});var r=t(7462),o=(t(7294),t(3905));const i={title:"Concurrency Model"},a=void 0,c={unversionedId:"programming/go/concurrency",id:"programming/go/concurrency",title:"Concurrency Model",description:"Goroutine",source:"@site/docs/programming/go/concurrency.md",sourceDirName:"programming/go",slug:"/programming/go/concurrency",permalink:"/docs/programming/go/concurrency",draft:!1,tags:[],version:"current",frontMatter:{title:"Concurrency Model"},sidebar:"programming",previous:{title:"Blockchain Trilemma",permalink:"/docs/programming/blockchain/trilemma"},next:{title:"Context",permalink:"/docs/programming/go/context"}},u={},l=[{value:"Goroutine",id:"goroutine",level:2},{value:"Channel",id:"channel",level:2},{value:"Mutex",id:"mutex",level:2},{value:"Wait Group",id:"wait-group",level:2}],s={toc:l},m="wrapper";function p(n){let{components:e,...t}=n;return(0,o.kt)(m,(0,r.Z)({},s,t,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"goroutine"},"Goroutine"),(0,o.kt)("p",null,"A goroutine is a lightweight, concurrent execution unit that allows you to run functions concurrently. Goroutines are a fundamental feature of Go's concurrency model and are a key part of its approach to building scalable and efficient software."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'func numbers() {\n    for i := 1; i <= 5; i++ {\n        time.Sleep(250 * time.Millisecond)\n        fmt.Printf("%d ", i)\n    }\n}\nfunc alphabets() {\n    for i := \'a\'; i <= \'e\'; i++ {\n        time.Sleep(400 * time.Millisecond)\n        fmt.Printf("%c ", i)\n    }\n}\n\n// Goroutines func\nfunc goroutines() {\n    go numbers()\n    go alphabets()\n    time.Sleep(3000 * time.Millisecond)\n    fmt.Println("main terminated")\n}\n')),(0,o.kt)("h2",{id:"channel"},"Channel"),(0,o.kt)("p",null,"A channel is a built-in concurrency primitive that facilitates communication and synchronization between goroutines (concurrently executing functions or threads of control). Channels are a fundamental feature of Go's concurrency model and are designed to help goroutines safely exchange data and coordinate their activities"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport (\n    "fmt"\n    "time"\n)\n\nfunc worker(id int, jobs <-chan int, results chan<- int) {\n    for job := range jobs {\n        fmt.Printf("Worker %d started job %d\\n", id, job)\n        time.Sleep(time.Second) // Simulate job processing\n        fmt.Printf("Worker %d finished job %d\\n", id, job)\n        results <- job * 2\n    }\n}\n\nfunc main() {\n    numJobs := 5\n    numWorkers := 3\n\n    jobs := make(chan int, numJobs)\n    results := make(chan int, numJobs)\n\n    for i := 1; i <= numWorkers; i++ {\n        go worker(i, jobs, results)\n    }\n\n    for j := 1; j <= numJobs; j++ {\n        jobs <- j\n    }\n\n    close(jobs)\n\n    for a := 1; a <= numJobs; a++ {\n        result := <-results\n        fmt.Printf("Received result: %d\\n", result)\n    }\n}\n')),(0,o.kt)("h2",{id:"mutex"},"Mutex"),(0,o.kt)("p",null,'A mutex (short for "mutual exclusion") is a synchronization primitive that is used to protect shared data from concurrent access by multiple goroutines. Mutexes are a fundamental part of Go\'s concurrency model and are essential for preventing data races and ensuring safe concurrent access to shared resources.'),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'\nvar mu sync.Mutex\n\nvar count = 0\n\nfunc process(n int) {\n    for i := 0; i < 10; i++ {\n        time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)\n        mu.Lock()\n        temp := count\n        temp++\n        time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)\n        count = temp\n        mu.Unlock()\n    }\n    fmt.Println("Count after i="+strconv.Itoa(n)+" Count:", strconv.Itoa(count))\n}\n\n// Mutex func\nfunc mutex() {\n    for i := 1; i < 4; i++ {\n        go process(i)\n    }\n    time.Sleep(25 * time.Second)\n    fmt.Println("Final Count:", count)\n}\n')),(0,o.kt)("h2",{id:"wait-group"},"Wait Group"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"sync.WaitGroup")," is a synchronization primitive in Go that is used to wait for a collection of goroutines (concurrently executing functions or threads of control) to finish their execution before proceeding with further processing. It is a way to coordinate and synchronize the activities of goroutines."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-go"},'package concurrency\n\nimport (\n    "fmt"\n    "sync"\n)\n\nfunc factorial(n int, wg *sync.WaitGroup) {\n    defer wg.Done()\n    result := 1\n    for i := 2; i <= n; i++ {\n        result *= i\n    }\n    fmt.Printf("Factorial of %d is %d\\n", n, result)\n}\n\nfunc Sync() {\n    var wg sync.WaitGroup\n\n    // Calculate factorial concurrently for two numbers\n    numbers := []int{5, 6}\n\n    for _, n := range numbers {\n        wg.Add(1)\n        go factorial(n, &wg)\n    }\n\n    // Wait for all goroutines to finish\n    wg.Wait()\n}\n')))}p.isMDXComponent=!0}}]);