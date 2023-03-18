"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4609],{3905:(e,n,r)=>{r.d(n,{Zo:()=>u,kt:()=>b});var t=r(7294);function a(e,n,r){return n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e}function o(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function l(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?o(Object(r),!0).forEach((function(n){a(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}function i(e,n){if(null==e)return{};var r,t,a=function(e,n){if(null==e)return{};var r,t,a={},o=Object.keys(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||(a[r]=e[r]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)r=o[t],n.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=t.createContext({}),c=function(e){var n=t.useContext(s),r=n;return e&&(r="function"==typeof e?e(n):l(l({},n),e)),r},u=function(e){var n=c(e.components);return t.createElement(s.Provider,{value:n},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return t.createElement(t.Fragment,{},n)}},f=t.forwardRef((function(e,n){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(r),f=a,b=p["".concat(s,".").concat(f)]||p[f]||m[f]||o;return r?t.createElement(b,l(l({ref:n},u),{},{components:r})):t.createElement(b,l({ref:n},u))}));function b(e,n){var r=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=f;var i={};for(var s in n)hasOwnProperty.call(n,s)&&(i[s]=n[s]);i.originalType=e,i[p]="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=r[c];return t.createElement.apply(null,l)}return t.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9019:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var t=r(7462),a=(r(7294),r(3905));const o={title:"RabbitMQ"},l=void 0,i={unversionedId:"examples/go/rabbitmq",id:"examples/go/rabbitmq",title:"RabbitMQ",description:"Example using Golang with RabbitMQ",source:"@site/docs/examples/go/rabbitmq.md",sourceDirName:"examples/go",slug:"/examples/go/rabbitmq",permalink:"/docs/examples/go/rabbitmq",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/examples/go/rabbitmq.md",tags:[],version:"current",frontMatter:{title:"RabbitMQ"},sidebar:"examples",previous:{title:"Job Queue",permalink:"/docs/examples/go/queue"}},s={},c=[],u={toc:c},p="wrapper";function m(e){let{components:n,...r}=e;return(0,a.kt)(p,(0,t.Z)({},u,r,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Example using Golang with RabbitMQ"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport (\n    "fmt"\n    "log"\n\n    "github.com/streadway/amqp"\n)\n\nfunc failOnError(err error, msg string) {\n    if err != nil {\n        log.Fatalf("%s: %s", msg, err)\n        panic(fmt.Sprintf("%s: %s", msg, err))\n    }\n}\n\nfunc main() {\n    conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")\n    failOnError(err, "Failed to connect to RabbitMQ")\n    defer conn.Close()\n\n    ch, err := conn.Channel()\n    failOnError(err, "Failed to open a channel")\n    defer ch.Close()\n\n    q, err := ch.QueueDeclare(\n        "hello", // name\n        false,   // durable\n        false,   // delete when unused\n        false,   // exclusive\n        false,   // no-wait\n        nil,     // arguments\n    )\n    failOnError(err, "Failed to declare a queue")\n\n    body := "Hello World!"\n    err = ch.Publish(\n        "",     // exchange\n        q.Name, // routing key\n        false,  // mandatory\n        false,  // immediate\n        amqp.Publishing{\n            ContentType: "text/plain",\n            Body:        []byte(body),\n        })\n    failOnError(err, "Failed to publish a message")\n\n    msgs, err := ch.Consume(\n        q.Name, // queue\n        "",     // consumer\n        true,   // auto-ack\n        false,  // exclusive\n        false,  // no-local\n        false,  // no-wait\n        nil,    // args\n    )\n    failOnError(err, "Failed to register a consumer")\n\n    forever := make(chan bool)\n\n    go func() {\n        for d := range msgs {\n            log.Printf("Received a message: %s", d.Body)\n        }\n    }()\n\n    log.Printf(" [*] Waiting for messages. To exit press CTRL+C")\n    <-forever\n}\n')))}m.isMDXComponent=!0}}]);