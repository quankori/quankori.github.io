"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9069],{3905:(n,t,e)=>{e.d(t,{Zo:()=>g,kt:()=>s});var r=e(7294);function i(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}function a(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function o(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?a(Object(e),!0).forEach((function(t){i(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):a(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}function c(n,t){if(null==n)return{};var e,r,i=function(n,t){if(null==n)return{};var e,r,i={},a=Object.keys(n);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||(i[e]=n[e]);return i}(n,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(r=0;r<a.length;r++)e=a[r],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(n,e)&&(i[e]=n[e])}return i}var u=r.createContext({}),l=function(n){var t=r.useContext(u),e=t;return n&&(e="function"==typeof n?n(t):o(o({},t),n)),e},g=function(n){var t=l(n.components);return r.createElement(u.Provider,{value:t},n.children)},m="mdxType",p={inlineCode:"code",wrapper:function(n){var t=n.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(n,t){var e=n.components,i=n.mdxType,a=n.originalType,u=n.parentName,g=c(n,["components","mdxType","originalType","parentName"]),m=l(e),h=i,s=m["".concat(u,".").concat(h)]||m[h]||p[h]||a;return e?r.createElement(s,o(o({ref:t},g),{},{components:e})):r.createElement(s,o({ref:t},g))}));function s(n,t){var e=arguments,i=t&&t.mdxType;if("string"==typeof n||i){var a=e.length,o=new Array(a);o[0]=h;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=n,c[m]="string"==typeof n?n:i,o[1]=c;for(var l=2;l<a;l++)o[l]=e[l];return r.createElement.apply(null,o)}return r.createElement.apply(null,e)}h.displayName="MDXCreateElement"},4354:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>p,frontMatter:()=>a,metadata:()=>c,toc:()=>l});var r=e(7462),i=(e(7294),e(3905));const a={title:"Pointers"},o=void 0,c={unversionedId:"programming/go/pointers",id:"programming/go/pointers",title:"Pointers",description:"Pointers",source:"@site/docs/programming/go/pointers.md",sourceDirName:"programming/go",slug:"/programming/go/pointers",permalink:"/docs/programming/go/pointers",draft:!1,tags:[],version:"current",frontMatter:{title:"Pointers"},sidebar:"programming",previous:{title:"Slices & Array",permalink:"/docs/programming/go/slices-array"},next:{title:"Channel",permalink:"/docs/programming/go/channel"}},u={},l=[{value:"Pointers",id:"pointers",level:2},{value:"Pass variables",id:"pass-variables",level:2}],g={toc:l},m="wrapper";function p(n){let{components:t,...e}=n;return(0,i.kt)(m,(0,r.Z)({},g,e,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"pointers"},"Pointers"),(0,i.kt)("p",null,"Pointers (con tr\u1ecf) trong Go l\xe0 m\u1ed9t kh\xe1i ni\u1ec7m quan tr\u1ecdng cho ph\xe9p b\u1ea1n tham chi\u1ebfu v\xe0 l\xe0m vi\u1ec7c tr\u1ef1c ti\u1ebfp v\u1edbi v\xf9ng nh\u1edb c\u1ee7a bi\u1ebfn. Thay v\xec truy\u1ec1n gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn, b\u1ea1n truy\u1ec1n \u0111\u1ecba ch\u1ec9 c\u1ee7a bi\u1ebfn \u0111\u1ec3 tham chi\u1ebfu \u0111\u1ebfn n\u01a1i l\u01b0u tr\u1eef d\u1eef li\u1ec7u th\u1ef1c s\u1ef1. \u0110i\u1ec1u n\xe0y cho ph\xe9p b\u1ea1n thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn g\u1ed1c th\xf4ng qua \u0111\u1ecba ch\u1ec9 m\xe0 con tr\u1ecf \u0111ang tr\u1ecf t\u1edbi."),(0,i.kt)("p",null,"D\u01b0\u1edbi \u0111\xe2y l\xe0 v\xed d\u1ee5 d\u1ec5 hi\u1ec3u v\u1ec1 c\xe1ch s\u1eed d\u1ee5ng con tr\u1ecf trong Go"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport "fmt"\n\nfunc main() {\n    // Khai b\xe1o m\u1ed9t bi\u1ebfn ki\u1ec3u int\n    num := 42\n    fmt.Println("Value of num:", num)\n\n    // Khai b\xe1o m\u1ed9t con tr\u1ecf tr\u1ecf t\u1edbi bi\u1ebfn num\n    var ptr *int\n    ptr = &num\n\n    fmt.Printf("Address of num: %p\\n", &num)\n    fmt.Printf("Value stored in ptr: %p\\n", ptr)\n\n    // S\u1eed d\u1ee5ng con tr\u1ecf \u0111\u1ec3 thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn num\n    *ptr = 99\n\n    fmt.Println("Value of num after using pointer:", num)\n}\n\n')),(0,i.kt)("p",null,"Trong v\xed d\u1ee5 n\xe0y:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Ch\xfang ta khai b\xe1o bi\u1ebfn num c\xf3 gi\xe1 tr\u1ecb ban \u0111\u1ea7u l\xe0 42."),(0,i.kt)("li",{parentName:"ol"},"Ch\xfang ta khai b\xe1o m\u1ed9t con tr\u1ecf ",(0,i.kt)("inlineCode",{parentName:"li"},"ptr")," ki\u1ec3u ",(0,i.kt)("inlineCode",{parentName:"li"},"*int")," \u0111\u1ec3 tr\u1ecf t\u1edbi bi\u1ebfn ",(0,i.kt)("inlineCode",{parentName:"li"},"num"),"."),(0,i.kt)("li",{parentName:"ol"},"Ch\xfang ta in ra \u0111\u1ecba ch\u1ec9 c\u1ee7a bi\u1ebfn ",(0,i.kt)("inlineCode",{parentName:"li"},"num")," b\u1eb1ng c\xe1ch s\u1eed d\u1ee5ng ",(0,i.kt)("inlineCode",{parentName:"li"},"%p")," trong h\xe0m ",(0,i.kt)("inlineCode",{parentName:"li"},"Printf"),"."),(0,i.kt)("li",{parentName:"ol"},"Ch\xfang ta in ra gi\xe1 tr\u1ecb l\u01b0u tr\u1eef trong con tr\u1ecf ",(0,i.kt)("inlineCode",{parentName:"li"},"ptr"),", c\u0169ng b\u1eb1ng c\xe1ch s\u1eed d\u1ee5ng ",(0,i.kt)("inlineCode",{parentName:"li"},"%p")," trong ",(0,i.kt)("inlineCode",{parentName:"li"},"Printf"),"."),(0,i.kt)("li",{parentName:"ol"},"B\u1eb1ng c\xe1ch s\u1eed d\u1ee5ng con tr\u1ecf, ch\xfang ta thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn ",(0,i.kt)("inlineCode",{parentName:"li"},"num")," th\xe0nh 99 th\xf4ng qua to\xe1n t\u1eed ",(0,i.kt)("inlineCode",{parentName:"li"},"*"),".")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Value of num: 42\nAddress of num: 0xc000090000\nValue stored in ptr: 0xc000090000\nValue of num after using pointer: 99\n")),(0,i.kt)("p",null,"Trong v\xed d\u1ee5 n\xe0y, ch\xfang ta th\u1ea5y c\xe1ch con tr\u1ecf ptr tr\u1ecf t\u1edbi bi\u1ebfn num, v\xe0 c\xe1ch n\xf3 cho ph\xe9p ch\xfang ta thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a num th\xf4ng qua con tr\u1ecf. \u0110i\u1ec1u n\xe0y minh h\u1ecda c\xe1ch con tr\u1ecf cho ph\xe9p truy c\u1eadp v\xe0 thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn g\u1ed1c th\xf4ng qua \u0111\u1ecba ch\u1ec9 c\u1ee7a n\xf3."),(0,i.kt)("h2",{id:"pass-variables"},"Pass variables"),(0,i.kt)("p",null,"Trong Go, khi b\u1ea1n truy\u1ec1n bi\u1ebfn v\xe0o m\u1ed9t h\xe0m, b\u1ea1n s\u1ebd g\u1eb7p hai kh\xe1i ni\u1ec7m quan tr\u1ecdng: pass by value (truy\u1ec1n gi\xe1 tr\u1ecb) v\xe0 pass by reference (truy\u1ec1n tham chi\u1ebfu). Tuy nhi\xean, Go ch\u1ec9 h\u1ed7 tr\u1ee3 truy\u1ec1n bi\u1ebfn b\u1eb1ng gi\xe1 tr\u1ecb, kh\xf4ng h\u1ed7 tr\u1ee3 truy\u1ec1n tham chi\u1ebfu tr\u1ef1c ti\u1ebfp nh\u01b0 m\u1ed9t s\u1ed1 ng\xf4n ng\u1eef kh\xe1c nh\u01b0 C++ ho\u1eb7c Java."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Pass By Value (Truy\u1ec1n Gi\xe1 Tr\u1ecb)")),(0,i.kt)("p",null,"Khi b\u1ea1n truy\u1ec1n bi\u1ebfn v\xe0o m\u1ed9t h\xe0m trong Go, th\u1ef1c ch\u1ea5t l\xe0 b\u1ea1n t\u1ea1o ra m\u1ed9t b\u1ea3n sao c\u1ee7a gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn \u0111\xf3 v\xe0 truy\u1ec1n b\u1ea3n sao n\xe0y v\xe0o h\xe0m. B\u1ea5t k\u1ec3 b\u1ea1n thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn trong h\xe0m hay kh\xf4ng, bi\u1ebfn g\u1ed1c \u1edf ngo\xe0i h\xe0m kh\xf4ng b\u1ecb \u1ea3nh h\u01b0\u1edfng."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport "fmt"\n\nfunc modifyValue(x int) {\n    x = 20\n    fmt.Println("Inside function:", x)\n}\n\nfunc main() {\n    num := 10\n    modifyValue(num)\n    fmt.Println("Outside function:", num)\n}\n\n// Inside function: 20\n// Outside function: 10\n')),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Pass By Reference (Truy\u1ec1n Tham Chi\u1ebfu)")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport "fmt"\n\nfunc modifyValueByReference(x *int) {\n    *x = 20\n    fmt.Println("Inside function:", *x)\n}\n\nfunc main() {\n    num := 10\n    modifyValueByReference(&num)\n    fmt.Println("Outside function:", num)\n}\n\n// Inside function: 20\n// Outside function: 20\n')),(0,i.kt)("p",null,"Trong v\xed d\u1ee5 tr\xean, ch\xfang ta truy\u1ec1n con tr\u1ecf t\u1edbi bi\u1ebfn num v\xe0o h\xe0m, cho ph\xe9p h\xe0m thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn g\u1ed1c b\u1eb1ng c\xe1ch tham chi\u1ebfu \u0111\u1ebfn \u0111\u1ecba ch\u1ec9 c\u1ee7a bi\u1ebfn \u0111\xf3."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Specials case")),(0,i.kt)("p",null,"Trong Go, m\u1eb7c d\xf9 ch\xfang ta truy\u1ec1n bi\u1ebfn b\u1eb1ng gi\xe1 tr\u1ecb (pass by value), nh\u01b0ng trong m\u1ed9t s\u1ed1 tr\u01b0\u1eddng h\u1ee3p \u0111\u1eb7c bi\u1ec7t, ch\xfang ta v\u1eabn c\xf3 th\u1ec3 thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a bi\u1ebfn g\u1ed1c th\xf4ng qua truy\u1ec1n gi\xe1 tr\u1ecb. \u0110i\u1ec1u n\xe0y x\u1ea3y ra khi ch\xfang ta truy\u1ec1n m\u1ed9t bi\u1ebfn c\xf3 ki\u1ec3u d\u1eef li\u1ec7u c\xf3 kh\u1ea3 n\u0103ng thay \u0111\u1ed5i."),(0,i.kt)("p",null,"M\u1ed9t trong nh\u1eefng v\xed d\u1ee5 \u0111i\u1ec3n h\xecnh v\u1ec1 tr\u01b0\u1eddng h\u1ee3p n\xe0y l\xe0 truy\u1ec1n slice v\xe0o m\u1ed9t h\xe0m. D\xf9 slice \u0111\u01b0\u1ee3c truy\u1ec1n b\u1eb1ng gi\xe1 tr\u1ecb, nh\u01b0ng m\u1ed9t thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a ph\u1ea7n t\u1eed trong slice b\xean trong h\xe0m s\u1ebd \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn slice g\u1ed1c."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport "fmt"\n\nfunc modifySlice(s []int) {\n    s[0] = 100\n    fmt.Println("Inside function:", s)\n}\n\nfunc main() {\n    numbers := []int{1, 2, 3}\n    modifySlice(numbers)\n    fmt.Println("Outside function:", numbers)\n}\n\n// Inside function: [100 2 3]\n// Outside function: [100 2 3]\n')),(0,i.kt)("p",null,"Trong v\xed d\u1ee5 n\xe0y, m\u1eb7c d\xf9 ch\xfang ta truy\u1ec1n slice numbers v\xe0o h\xe0m modifySlice b\u1eb1ng gi\xe1 tr\u1ecb, nh\u01b0ng thay \u0111\u1ed5i gi\xe1 tr\u1ecb c\u1ee7a ph\u1ea7n t\u1eed trong slice b\xean trong h\xe0m \u0111\xe3 \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn slice g\u1ed1c."),(0,i.kt)("p",null,"C\xe1c ki\u1ec3u d\u1eef li\u1ec7u kh\xe1c nh\u01b0 ",(0,i.kt)("strong",{parentName:"p"},"maps"),", ",(0,i.kt)("strong",{parentName:"p"},"channels"),", v\xe0 ",(0,i.kt)("strong",{parentName:"p"},"pointers")," c\u0169ng c\xf3 th\u1ec3 t\u1ea1o ra hi\u1ec7u \u1ee9ng t\u01b0\u01a1ng t\u1ef1, khi ch\xfang ta truy\u1ec1n ch\xfang b\u1eb1ng gi\xe1 tr\u1ecb nh\u01b0ng v\u1eabn c\xf3 th\u1ec3 thay \u0111\u1ed5i d\u1eef li\u1ec7u trong bi\u1ebfn g\u1ed1c th\xf4ng qua truy\u1ec1n gi\xe1 tr\u1ecb. Tuy nhi\xean, \u0111i\u1ec1u n\xe0y kh\xf4ng ph\u1ea3i l\xe0 tr\u01b0\u1eddng h\u1ee3p th\xf4ng th\u01b0\u1eddng v\xe0 ph\u1ee5 thu\u1ed9c v\xe0o c\xe1ch ki\u1ec3u d\u1eef li\u1ec7u \u0111\u01b0\u1ee3c c\xe0i \u0111\u1eb7t b\xean trong Go."))}p.isMDXComponent=!0}}]);