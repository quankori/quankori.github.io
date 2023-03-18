"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9449],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>m});var i=t(7294);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function l(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,i,r=function(e,n){if(null==e)return{};var t,i,r={},o=Object.keys(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)t=o[i],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var s=i.createContext({}),c=function(e){var n=i.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):l(l({},n),e)),t},p=function(e){var n=c(e.components);return i.createElement(s.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return i.createElement(i.Fragment,{},n)}},g=i.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),d=c(t),g=r,m=d["".concat(s,".").concat(g)]||d[g]||u[g]||o;return t?i.createElement(m,l(l({ref:n},p),{},{components:t})):i.createElement(m,l({ref:n},p))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,l=new Array(o);l[0]=g;var a={};for(var s in n)hasOwnProperty.call(n,s)&&(a[s]=n[s]);a.originalType=e,a[d]="string"==typeof e?e:r,l[1]=a;for(var c=2;c<o;c++)l[c]=t[c];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}g.displayName="MDXCreateElement"},9469:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var i=t(7462),r=(t(7294),t(3905));const o={title:"SOLID Principle"},l=void 0,a={unversionedId:"programming/concept/solid",id:"programming/concept/solid",title:"SOLID Principle",description:"S - Single Responsibility Principle",source:"@site/docs/programming/concept/solid.md",sourceDirName:"programming/concept",slug:"/programming/concept/solid",permalink:"/docs/programming/concept/solid",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/programming/concept/solid.md",tags:[],version:"current",frontMatter:{title:"SOLID Principle"},sidebar:"programming",previous:{title:"Singleton Pattern",permalink:"/docs/programming/concept/singleton"},next:{title:"Billing and Pricing trong AWS",permalink:"/docs/programming/aws/billing"}},s={},c=[{value:"S - Single Responsibility Principle",id:"s---single-responsibility-principle",level:2},{value:"O - Open/Closed Principle",id:"o---openclosed-principle",level:2},{value:"L - Liskov\u2019s Substitution Principle",id:"l---liskovs-substitution-principle",level:2},{value:"I - Interface Segregation Principle",id:"i---interface-segregation-principle",level:2},{value:"D - Dependency Inversion Principle",id:"d---dependency-inversion-principle",level:2}],p={toc:c},d="wrapper";function u(e){let{components:n,...t}=e;return(0,r.kt)(d,(0,i.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"s---single-responsibility-principle"},"S - Single Responsibility Principle"),(0,r.kt)("p",null,"A class should only have one responsibility (It should only be modified for one reason)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Student b\xe2y gi\u1edd ch\u1ec9 ch\u1ee9a th\xf4ng tin\npublic class Student {\n  public string Name { get; set;}\n  public int Age { get; set;}\n}\n\n// Class n\xe0y ch\u1ec9 format th\xf4ng tin hi\u1ec3n th\u1ecb student\npublic class Formatter {\n  public string FormatStudentText(Student std) {\n    return "Name: " + std.Name + ". Age: " + std.Age;\n  }\n\n  public string FormatStudentHtml(Student std) {\n    return "<span>" + std.Name + " " + std.Age + "</span>";\n  }\n\n  public string FormatStudentJson(Student std) {\n    return Json.Serialize(std);\n  }\n}\n')),(0,r.kt)("h2",{id:"o---openclosed-principle"},"O - Open/Closed Principle"),(0,r.kt)("p",null,"It is possible to extend a class, but it is not allowed to modify its contents."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface Shape {\n  public double area();\n}\npublic class Square implements Shape {\n  private Point topLeft;\n  private double side;\n  public double area() {\n  return side*side;\n  }\n}\n\npublic class Rectangle implements Shape {\n  private Point topLeft;\n  private double height;\n  private double width;\n  public double area() {\n    return height * width;\n  }\n}\n")),(0,r.kt)("h2",{id:"l---liskovs-substitution-principle"},"L - Liskov\u2019s Substitution Principle"),(0,r.kt)("p",null,"In a program, objects of a subclass can substitute for the superclass without affecting the correctness of the program."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'public class Animal {\n    public void makeNoise() {\n        System.out.println("making some noise");\n    }\n}\n// class Cat v\xe0 Dog extend t\u1eeb class animal\npublic class Dog extends Animal {\n    @Override\n    public void makeNoise() {\n        System.out.println("g\xe2u g\xe2u");\n    }\n}\n')),(0,r.kt)("h2",{id:"i---interface-segregation-principle"},"I - Interface Segregation Principle"),(0,r.kt)("p",null,"Instead of using one large interface, we should break it down into smaller interfaces, each with different purposes."),(0,r.kt)("h2",{id:"d---dependency-inversion-principle"},"D - Dependency Inversion Principle"),(0,r.kt)("p",null,"High-level modules should not depend on low-level modules.\nBoth should depend on abstractions."),(0,r.kt)("p",null,"Abstractions (interfaces) should not depend on details, but rather the other way around.\n(Classes communicate with each other through interfaces,\nnot through implementations.)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Not apply principle\n// Cart is high module\npublic class Cart {\n    public void Checkout(int orderId, int userId) {\n        // Database, Logger, EmailSender l\xe0 module c\u1ea5p th\u1ea5p\n        Database db = new Database();\n        db.Save(orderId);\n\n        Logger log = new Logger();\n        log.LogInfo("Order has been checkout");\n\n        EmailSender es = new EmailSender();\n        es.SendEmail(userId);\n    }\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Apply principle\n\npublic interface IDatabase {\n        void Save(int orderId);\n}\n\npublic interface ILogger {\n        void LogInfo(string info);\n}\n\npublic interface IEmailSender {\n        void SendEmail(int userId);\n}\n\n// Module implement interface\npublic class Logger implements ILogger {\n    public void LogInfo(string info) {}\n}\n\npublic class Database implements IDatabase {\n    public void Save(int orderId) {}\n}\n\npublic class EmailSender implements IEmailSender {\n    public void SendEmail(int userId) {}\n}\n\npublic void Checkout(int orderId, int userId) {\n    //IDatabase db = new XMLDatabase();\n    //IDatebase db = new SQLDatabase();\n    IDatabase db = new Database();\n    db.Save(orderId);\n\n    ILogger log = new Logger();\n    log.LogInfo("Order has been checkout");\n\n    IEmailSender es = new EmailSender();\n    es.SendEmail(userId);\n}\n')))}u.isMDXComponent=!0}}]);