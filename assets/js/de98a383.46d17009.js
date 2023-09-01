"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1393],{3905:(n,t,e)=>{e.d(t,{Zo:()=>m,kt:()=>s});var i=e(7294);function c(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function o(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,i)}return e}function r(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?o(Object(e),!0).forEach((function(t){c(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function a(n,t){if(null==n)return{};var e,i,c=function(n,t){if(null==n)return{};var e,i,c={},o=Object.keys(n);for(i=0;i<o.length;i++)e=o[i],t.indexOf(e)>=0||(c[e]=n[e]);return c}(n,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);for(i=0;i<o.length;i++)e=o[i],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(c[e]=n[e])}return c}var l=i.createContext({}),u=function(n){var t=i.useContext(l),e=t;return n&&(e="function"==typeof n?n(t):r(r({},t),n)),e},m=function(n){var t=u(n.components);return i.createElement(l.Provider,{value:t},n.children)},h="mdxType",g={inlineCode:"code",wrapper:function(n){var t=n.children;return i.createElement(i.Fragment,{},t)}},p=i.forwardRef((function(n,t){var e=n.components,c=n.mdxType,o=n.originalType,l=n.parentName,m=a(n,["components","mdxType","originalType","parentName"]),h=u(e),p=c,s=h["".concat(l,".").concat(p)]||h[p]||g[p]||o;return e?i.createElement(s,r(r({ref:t},m),{},{components:e})):i.createElement(s,r({ref:t},m))}));function s(n,t){var e=arguments,c=t&&t.mdxType;if("string"==typeof n||c){var o=e.length,r=new Array(o);r[0]=p;var a={};for(var l in t)hasOwnProperty.call(t,l)&&(a[l]=t[l]);a.originalType=n,a[h]="string"==typeof n?n:c,r[1]=a;for(var u=2;u<o;u++)r[u]=e[u];return i.createElement.apply(null,r)}return i.createElement.apply(null,e)}p.displayName="MDXCreateElement"},4116:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>g,frontMatter:()=>o,metadata:()=>a,toc:()=>u});var i=e(7462),c=(e(7294),e(3905));const o={title:"Go Concept"},r=void 0,a={unversionedId:"programming/go/concept",id:"programming/go/concept",title:"Go Concept",description:"Context",source:"@site/docs/programming/go/concept.md",sourceDirName:"programming/go",slug:"/programming/go/concept",permalink:"/docs/programming/go/concept",draft:!1,tags:[],version:"current",frontMatter:{title:"Go Concept"},sidebar:"programming",previous:{title:"SOLID Principle",permalink:"/docs/programming/concept/solid"},next:{title:"Data Structures",permalink:"/docs/programming/algorithm/data-structures"}},l={},u=[{value:"Context",id:"context",level:2},{value:"Goroutine",id:"goroutine",level:2},{value:"Channel",id:"channel",level:2},{value:"Mutex",id:"mutex",level:2}],m={toc:u},h="wrapper";function g(n){let{components:t,...e}=n;return(0,c.kt)(h,(0,i.Z)({},m,e,{components:t,mdxType:"MDXLayout"}),(0,c.kt)("h2",{id:"context"},"Context"),(0,c.kt)("p",null,"The Context l\xe0 m\u1ed9t c\u01a1 ch\u1ebf trong Golang \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 qu\u1ea3n l\xfd c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi v\xe0 ki\u1ec3m so\xe1t vi\u1ec7c th\u1ef1c hi\u1ec7n v\xe0 ch\u1ea5m d\u1ee9t c\u1ee7a c\xe1c goroutine. N\xf3 c\xf3 th\u1ec3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 truy\u1ec1n th\xf4ng tin v\xe0 ki\u1ec3m so\xe1t c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi, gi\xfap qu\u1ea3n l\xfd t\xe0i nguy\xean v\xe0 ng\u0103n c\xe1c nhi\u1ec7m v\u1ee5 ch\u1ea1y qu\xe1 l\xe2u."),(0,c.kt)("ul",null,(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("p",{parentName:"li"},"C\xf3 ba lo\u1ea1i Context ch\xednh trong Golang:"),(0,c.kt)("ul",{parentName:"li"},(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"Background"),": Context m\u1eb7c \u0111\u1ecbnh \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 kh\u1edfi t\u1ea1o m\u1ed9t Context m\u1edbi."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"TODO"),": \u0110\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 x\u1eed l\xfd c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u01a1n gi\u1ea3n v\xe0 t\u1ea1m th\u1eddi."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"WithCancel"),":Cho ph\xe9p h\u1ee7y m\u1ed9t nhi\u1ec7m v\u1ee5 sau khi Context c\u1ee7a n\xf3 \u0111\xe3 h\u1ebft h\u1ea1n."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"WithDeadline"),": Cho ph\xe9p \u0111\u1eb7t m\u1ed9t h\u1ea1n ch\xf3t cho m\u1ed9t nhi\u1ec7m v\u1ee5. Khi h\u1ea1n ch\xf3t \u0111\u1ebfn, Context s\u1ebd t\u1ef1 \u0111\u1ed9ng h\u1ee7y b\u1ecf nhi\u1ec7m v\u1ee5."),(0,c.kt)("li",{parentName:"ul"},(0,c.kt)("strong",{parentName:"li"},"WithTimeout"),": \u0110\u1eb7t m\u1ed9t gi\u1edbi h\u1ea1n th\u1eddi gian th\u1ef1c hi\u1ec7n cho m\u1ed9t nhi\u1ec7m v\u1ee5. Khi th\u1eddi gian n\xe0y k\u1ebft th\xfac, Context s\u1ebd t\u1ef1 \u0111\u1ed9ng h\u1ee7y b\u1ecf nhi\u1ec7m v\u1ee5.")))),(0,c.kt)("p",null,"N\u1ebfu kh\xf4ng th\u1ef1c hi\u1ec7n Context \u0111\xfang c\xe1ch, c\xe1c goroutine c\xf3 th\u1ec3 b\u1ecb ch\u1eb7n ho\u1eb7c c\xf3 th\u1ec3 kh\xf4ng b\u1ecb h\u1ee7y b\u1ecf \u0111\xfang. \u0110i\u1ec1u n\xe0y c\xf3 th\u1ec3 d\u1eabn \u0111\u1ebfn l\xe3ng ph\xed t\xe0i nguy\xean, hi\u1ec7u su\u1ea5t \u1ee9ng d\u1ee5ng gi\u1ea3m \u0111i v\xe0 c\xe1c v\u1ea5n \u0111\u1ec1 b\u1ea3o m\u1eadt ti\u1ec1m t\xe0ng. Do \u0111\xf3, vi\u1ec7c s\u1eed d\u1ee5ng Context l\xe0 r\u1ea5t quan tr\u1ecdng khi ph\xe1t tri\u1ec3n c\xe1c \u1ee9ng d\u1ee5ng \u0111a lu\u1ed3ng \u0111\u1ec3 \u0111\u1ea3m b\u1ea3o t\xednh ch\xednh x\xe1c v\xe0 an to\xe0n c\u1ee7a ch\xfang."),(0,c.kt)("h2",{id:"goroutine"},"Goroutine"),(0,c.kt)("p",null,"Goroutines cung c\u1ea5p m\u1ed9t c\xe1ch th\u1ee9c \u0111\u1ec3 th\u1ef1c hi\u1ec7n c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi, t\u0103ng c\u01b0\u1eddng hi\u1ec7u su\u1ea5t c\u1ee7a m\u1ed9t \u1ee9ng d\u1ee5ng. Khi b\u1ea1n c\u1ea7n th\u1ef1c hi\u1ec7n c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi m\xe0 kh\xf4ng c\u1ea7n ch\u1edd \u0111\u1ee3i cho t\xe1c v\u1ee5 tr\u01b0\u1edbc \u0111\xf3 ho\xe0n th\xe0nh, Goroutines l\xe0 m\u1ed9t l\u1ef1a ch\u1ecdn tuy\u1ec7t v\u1eddi."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'func numbers() {\n    for i := 1; i <= 5; i++ {\n        time.Sleep(250 * time.Millisecond)\n        fmt.Printf("%d ", i)\n    }\n}\nfunc alphabets() {\n    for i := \'a\'; i <= \'e\'; i++ {\n        time.Sleep(400 * time.Millisecond)\n        fmt.Printf("%c ", i)\n    }\n}\n\n// Goroutines func\nfunc goroutines() {\n    go numbers()\n    go alphabets()\n    time.Sleep(3000 * time.Millisecond)\n    fmt.Println("main terminated")\n}\n')),(0,c.kt)("h2",{id:"channel"},"Channel"),(0,c.kt)("p",null,"Channel l\xe0 m\u1ed9t c\u01a1 ch\u1ebf \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 truy\u1ec1n d\u1eef li\u1ec7u gi\u1eefa c\xe1c Goroutines. N\xf3 \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 \u0111\u1ed3ng b\u1ed9 h\xf3a vi\u1ec7c truy c\u1eadp d\u1eef li\u1ec7u gi\u1eefa c\xe1c Goroutines. Khi b\u1ea1n c\u1ea7n g\u1eedi d\u1eef li\u1ec7u gi\u1eefa c\xe1c Goroutines m\xe0 kh\xf4ng g\u1eb7p v\u1ea5n \u0111\u1ec1 nh\u01b0 t\u1eafc ngh\u1ebdn ho\u1eb7c \u0111i\u1ec1u ki\u1ec7n \u0111ua, ho\u1eb7c khi b\u1ea1n mu\u1ed1n \u0111\u1ed3ng b\u1ed9 h\xf3a c\xe1c nhi\u1ec7m v\u1ee5 \u0111\u1ed3ng th\u1eddi, k\xeanh l\xe0 m\u1ed9t c\xf4ng c\u1ee5 r\u1ea5t h\u1eefu \xedch."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'func send(c chan int) {\n    for i := 0; i < 5; i++ {\n        fmt.Printf("send %v to channel\\n", i)\n        c <- i // send i to channel\n    }\n}\n\nfunc receive(c chan int) {\n    for i := 0; i < 5; i++ {\n        time.Sleep(1 * time.Millisecond)\n        s := <-c // receive channel\n        fmt.Println(s)\n    }\n}\n\n// Channel func\nfunc channel() {\n    c := make(chan int)\n    go send(c)\n    go receive(c)\n    time.Sleep(100 * time.Millisecond)\n    fmt.Println("end")\n}\n')),(0,c.kt)("h2",{id:"mutex"},"Mutex"),(0,c.kt)("p",null,"Mutex (Mutual Exclusion) l\xe0 m\u1ed9t c\u01a1 ch\u1ebf \u0111\u1ed3ng b\u1ed9 \u0111\u1ea3m b\u1ea3o ch\u1ec9 c\xf3 m\u1ed9t Goroutine truy c\u1eadp d\u1eef li\u1ec7u v\xe0o b\u1ea5t k\u1ef3 th\u1eddi \u0111i\u1ec3m n\xe0o, ng\u0103n ng\u1eeba xung \u0111\u1ed9t d\u1eef li\u1ec7u khi \u0111\u01b0\u1ee3c truy c\u1eadp c\xf9ng l\xfac b\u1edfi nhi\u1ec1u Goroutines. Khi b\u1ea1n c\u1ea7n \u0111\u1ed3ng b\u1ed9 h\xf3a vi\u1ec7c truy c\u1eadp d\u1eef li\u1ec7u gi\u1eefa c\xe1c Goroutines v\xe0 \u0111\u1ea3m b\u1ea3o d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c truy c\u1eadp \u0111\xfang c\xe1ch, Mutex l\xe0 c\xf4ng c\u1ee5 \u0111\xfang \u0111\u1eafn."),(0,c.kt)("pre",null,(0,c.kt)("code",{parentName:"pre",className:"language-go"},'\n// Khai b\xe1o m\u1ed9t instance mutex\nvar mu sync.Mutex\n\n//Khai b\xe1o bi\u1ebfn count \u0111\u01b0\u1ee3c truy c\u1eadp b\u1edfi t\u1ea5t c\u1ea3 c\xe1c routine\nvar count = 0\n\n// Sao ch\xe9p count v\xe0o temp, th\u1ef1c hi\u1ec7n m\u1ed9t v\xe0i x\u1eed l\xfd (t\u0103ng d\u1ea7n) v\xe0 l\u01b0u l\u1ea1i v\xe0o count\n// t\u1ea1m d\u1eebng m\u1ed9t kho\u1ea3ng ng\u1eabu nhi\xean \u0111\u01b0\u1ee3c th\xeam v\xe0o gi\u1eefa l\xfac \u0111\u1ecdc v\xe0 ghi count\nfunc process(n int) {\n    //V\xf2ng l\u1eb7p t\u0103ng count 10 l\u1ea7n\n    for i := 0; i < 10; i++ {\n        time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)\n        //B\u1eaft \u0111\u1ea7u kho\xe1 \u1edf \u0111\xe2y\n        mu.Lock()\n        temp := count\n        temp++\n        time.Sleep(time.Duration(rand.Int31n(2)) * time.Second)\n        count = temp\n        // M\u1edf kho\xe1\n        mu.Unlock()\n    }\n    fmt.Println("Count after i="+strconv.Itoa(n)+" Count:", strconv.Itoa(count))\n}\n\n// Mutex func\nfunc mutex() {\n    //l\u1eb7p g\u1ecdi process() 3 l\u1ea7n\n    for i := 1; i < 4; i++ {\n        go process(i)\n    }\n\n    //T\u1ea1m d\u1eebng \u0111\u1ec3 \u0111\u1ee3i cho t\u1ea5t c\u1ea3 routine ho\xe0n th\xe0nh\n    time.Sleep(25 * time.Second)\n    fmt.Println("Final Count:", count)\n}\n')))}g.isMDXComponent=!0}}]);