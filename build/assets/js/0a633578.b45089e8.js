"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2294],{3905:(n,e,r)=>{r.d(e,{Zo:()=>m,kt:()=>d});var t=r(7294);function a(n,e,r){return e in n?Object.defineProperty(n,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[e]=r,n}function l(n,e){var r=Object.keys(n);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(n);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.push.apply(r,t)}return r}function i(n){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?l(Object(r),!0).forEach((function(e){a(n,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(r,e))}))}return n}function o(n,e){if(null==n)return{};var r,t,a=function(n,e){if(null==n)return{};var r,t,a={},l=Object.keys(n);for(t=0;t<l.length;t++)r=l[t],e.indexOf(r)>=0||(a[r]=n[r]);return a}(n,e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(n);for(t=0;t<l.length;t++)r=l[t],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(n,r)&&(a[r]=n[r])}return a}var s=t.createContext({}),c=function(n){var e=t.useContext(s),r=e;return n&&(r="function"==typeof n?n(e):i(i({},e),n)),r},m=function(n){var e=c(n.components);return t.createElement(s.Provider,{value:e},n.children)},p="mdxType",u={inlineCode:"code",wrapper:function(n){var e=n.children;return t.createElement(t.Fragment,{},e)}},f=t.forwardRef((function(n,e){var r=n.components,a=n.mdxType,l=n.originalType,s=n.parentName,m=o(n,["components","mdxType","originalType","parentName"]),p=c(r),f=a,d=p["".concat(s,".").concat(f)]||p[f]||u[f]||l;return r?t.createElement(d,i(i({ref:e},m),{},{components:r})):t.createElement(d,i({ref:e},m))}));function d(n,e){var r=arguments,a=e&&e.mdxType;if("string"==typeof n||a){var l=r.length,i=new Array(l);i[0]=f;var o={};for(var s in e)hasOwnProperty.call(e,s)&&(o[s]=e[s]);o.originalType=n,o[p]="string"==typeof n?n:a,i[1]=o;for(var c=2;c<l;c++)i[c]=r[c];return t.createElement.apply(null,i)}return t.createElement.apply(null,r)}f.displayName="MDXCreateElement"},5444:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>s,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var t=r(7462),a=(r(7294),r(3905));const l={title:"Go Basic"},i=void 0,o={unversionedId:"programming/go/basic",id:"programming/go/basic",title:"Go Basic",description:"Fundamentals",source:"@site/docs/programming/go/basic.md",sourceDirName:"programming/go",slug:"/programming/go/basic",permalink:"/docs/programming/go/basic",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/programming/go/basic.md",tags:[],version:"current",frontMatter:{title:"Go Basic"},sidebar:"programming",previous:{title:"Amazon Virtual Private Cloud",permalink:"/docs/programming/aws/vpc"},next:{title:"Go Advanced",permalink:"/docs/programming/go/advanced"}},s={},c=[{value:"Fundamentals",id:"fundamentals",level:2},{value:"Flow",id:"flow",level:2},{value:"Collection",id:"collection",level:2},{value:"Errors",id:"errors",level:2},{value:"Variadic",id:"variadic",level:2},{value:"Maps",id:"maps",level:2},{value:"Pointer",id:"pointer",level:2},{value:"Structs",id:"structs",level:2},{value:"Methods",id:"methods",level:2},{value:"Intrerfaces",id:"intrerfaces",level:2},{value:"Defer",id:"defer",level:2}],m={toc:c},p="wrapper";function u(n){let{components:e,...r}=n;return(0,a.kt)(p,(0,t.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"fundamentals"},"Fundamentals"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func variable() {\n    var a string = "Hello, World" // Style 1\n    b := "Hello, B"               // Style 2\n    b = "New"\n    fmt.Println("Variable a: ", a)\n    fmt.Println("Variable b: ", b)\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func constant() {\n    const (\n        a = 5\n    )\n    var intVar int = a\n    var int32Var int32 = a\n    var float64Var float64 = a\n    var complex64Var complex64 = a + 7i // S\u1ed1 ph\u1ee9c\n    fmt.Println("Variable int: ", intVar)\n    fmt.Println("Variable int32: ", int32Var)\n    fmt.Println("Variable float: ", float64Var)\n    fmt.Println("Variable complex64: ", complex64Var)\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},"func function(length, width float64) (float64, float64) {\n    var area = length * width\n    var perimeter = (length + width) * 2\n    return area, perimeter\n}\n")),(0,a.kt)("h2",{id:"flow"},"Flow"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func condition() {\n    fmt.Print("Check variable even or odd")\n    if num := 10; num%2 == 0 {\n        fmt.Println(num, "is even")\n    } else {\n        fmt.Println(num, "is odd")\n    }\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func loop() {\n    fmt.Print("Check variable even or odd")\n    if num := 10; num%2 == 0 {\n        fmt.Println(num, "is even")\n    } else {\n        fmt.Println(num, "is odd")\n    }\n}\n')),(0,a.kt)("h2",{id:"collection"},"Collection"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"S\u1ef1 kh\xe1c nhau gi\u1eefa slices v\xe0 array:"),(0,a.kt)("li",{parentName:"ul"},"Array c\xf3 k\xedch th\u01b0\u1edbc c\u1ed1 \u0111\u1ecbnh (fixed size) v\xe0 ph\u1ea7n t\u1eed ph\u1ea3i c\xf9ng lo\u1ea1i d\u1eef li\u1ec7u, c\xf2n ",(0,a.kt)("inlineCode",{parentName:"li"},"Slices")," c\xf3 k\xedch th\u01b0\u1edbc \u0111\u1ed9ng."),(0,a.kt)("li",{parentName:"ul"},"Array d\u1ea1ng tham tr\u1ecb (value types) khi g\xe1n bi\u1ebfn m\u1edbi s\u1ebd t\u1ea1o m\u1ed9t array kh\xe1c t\u1ed1n b\u1ed9 nh\u1edb h\u01a1n, c\xf2n ",(0,a.kt)("inlineCode",{parentName:"li"},"Slices")," d\u1ea1ng tham tr\u1ecb")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func array() {\n    fmt.Println("Array: ")\n    a := [6]int{2, 3, 5, 7, 11, 13}\n    fmt.Println("array a is: ", a)\n    b := [...]int{2, 3, 5, 7, 11, 13}\n    fmt.Println("array a is: ", b)\n}\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func slices() {\n    fmt.Println("Slices: ")\n    primes := [6]int{2, 3, 5, 7, 11, 13}\n    var s []int = primes[1:4]\n    fmt.Println("slice primes is: ", s)\n    q := []int{2, 3, 5, 7, 11, 13}\n    b := q[2:4]\n    fmt.Println("slices cut is: ", b)\n    // Append can work with nil slice.\n    s = append(s, 0) // s = [0]\n\n    // Append add one element to slice.\n    s = append(s, 1) // s = [0, 1]\n\n    // Append add multiple elements to slice.\n    s = append(s, 2, 3, 4) // s = [0, 1, 2, 3, 4]\n    fmt.Println("slices after append: ", s)\n}\n\n')),(0,a.kt)("h2",{id:"errors"},"Errors"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func errorException() {\n    newNumber := 5\n    checkNumber, err := getError(newNumber)\n    if err != nil {\n        fmt.Println(err)\n    }\n    fmt.Println(checkNumber)\n}\n\nfunc getError(number int) (string, error) {\n    var message string\n    if number < 10 {\n        err := errors.New("Error: haha")\n        return message, err\n    } else {\n        message = "Ok"\n        return message, nil\n    }\n}\n')),(0,a.kt)("h2",{id:"variadic"},"Variadic"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func sum(nums ...int) {\n    fmt.Print(nums, " ")\n    total := 0\n    for _, num := range nums {\n        total += num\n    }\n    fmt.Println("Total in variadic: ", total)\n}\n\n// Variadic func\nfunc variadic() {\n\n    sum(1, 2)\n    sum(1, 2, 3)\n\n    nums := []int{1, 2, 3, 4}\n    sum(nums...)\n}\n')),(0,a.kt)("h2",{id:"maps"},"Maps"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func maps() {\n    var personSalary map[string]int\n    if personSalary == nil {\n        personSalary = make(map[string]int)\n        fmt.Println(personSalary) // Return map[]\n\n        // Add value 1\n        personSalary["steve"] = 12000\n        personSalary["jamie"] = 15000\n        personSalary["mike"] = 9000\n        fmt.Println("personSalary map contents:", personSalary)\n\n        // Add value 2\n        personSalary := map[string]int{\n            "steve": 12000,\n            "jamie": 15000,\n        }\n        fmt.Println("personSalary map contents:", personSalary)\n\n        // Loop\n        for key, value := range personSalary {\n            fmt.Printf("personSalary[%s] = %d\\n", key, value)\n        }\n\n        // Length\n        fmt.Println("length is", len(personSalary))\n\n        // Remove\n        delete(personSalary, "steve")\n        fmt.Println("personSalary map contents:", personSalary)\n\n        // Reference\n        newPersonSalary := personSalary\n        newPersonSalary["jamie"] = 18000\n        fmt.Println("Person salary changed", personSalary)\n    }\n}\n')),(0,a.kt)("h2",{id:"pointer"},"Pointer"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func pointer() {\n    var a = 100\n    var p *int\n    fmt.Println(p) // Default is null\n    p = &a\n    fmt.Println("a = ", a)\n    fmt.Println("p = ", p)   // Index of pointer a\n    fmt.Println("*p = ", *p) // Value of pointer a\n\n    *p = 2000\n    fmt.Println("a (after) = ", a) // Change by pointer\n}\n')),(0,a.kt)("h2",{id:"structs"},"Structs"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'\n// Person Defining a struct type\ntype Person struct {\n    FirstName string\n    LastName  string\n    Age       int\n}\n\n// Structures func\nfunc structures() {\n    var p Person // Declare p with struct Person\n    p.LastName = "Nguy\u1ec5n"\n    p.FirstName = "Qu\xe2n"\n    fmt.Println("Person :", p)\n\n    p1 := Person{"A", "Nuy\u1ec5n Qu\xe2n", 26} // Style 1\n    fmt.Println("Person1: ", p1)\n\n    p2 := Person{\n        FirstName: "John",\n        LastName:  "Snow",\n        Age:       45,\n    } // Style 2\n    fmt.Println("Person2: ", p2)\n}\n')),(0,a.kt)("h2",{id:"methods"},"Methods"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'\ntype rectangle struct {\n    length int\n    width  int\n}\n\ntype circleA struct {\n    radius float64\n}\n\nfunc (r rectangle) area() int {\n    return r.length * r.width\n}\n\nfunc (c circleA) area() float64 {\n    return math.Pi * c.radius * c.radius\n}\n\nfunc (c *circleA) changeValue(newValue float64) {\n    c.radius = newValue\n}\n\n// Methods func\nfunc methods() {\n    r := rectangle{\n        length: 10,\n        width:  5,\n    }\n    fmt.Printf("Area of rectangle %d\\n", r.area())\n    c := circleA{\n        radius: 12,\n    }\n    fmt.Printf("Area of circle %f", c.area())\n    // Con tr\u1ecf\n    fmt.Printf("\\n\\nbefore change: %f", c.radius)\n    (&c).changeValue(51)\n    fmt.Printf("\\nafter change: %f", c.radius)\n    fmt.Println()\n}\n')),(0,a.kt)("h2",{id:"intrerfaces"},"Intrerfaces"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},"type shape interface {\n    area() float64\n}\n\ntype circle struct {\n    x, y, r float64\n}\n\nfunc (c *circle) area() float64 {\n    return math.Pi * c.r * c.r\n}\n\nfunc totalArea(shapes ...shape) float64 {\n    var area float64\n    for _, s := range shapes {\n        area += s.area()\n    }\n    return area\n}\n\n// Interfaces func\nfunc interfaces() {\n    c := circle{0, 0, 5}\n    fmt.Println(totalArea(&c))\n}\n")),(0,a.kt)("h2",{id:"defer"},"Defer"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'func defers() {\n    defer fmt.Println("World") // Pause print "World"\n    fmt.Println("Hello")       // Print text "Hello"\n\n    for i := 0; i < 10; i++ {\n        defer fmt.Println(i)\n    }\n    // Result\n    // 9 8 7 6 5 4 3 2 1 0\n}\n')))}u.isMDXComponent=!0}}]);