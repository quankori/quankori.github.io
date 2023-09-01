"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9449],{3905:(n,e,t)=>{t.d(e,{Zo:()=>s,kt:()=>m});var i=t(7294);function r(n,e,t){return e in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function a(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function l(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?a(Object(t),!0).forEach((function(e){r(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function o(n,e){if(null==n)return{};var t,i,r=function(n,e){if(null==n)return{};var t,i,r={},a=Object.keys(n);for(i=0;i<a.length;i++)t=a[i],e.indexOf(t)>=0||(r[t]=n[t]);return r}(n,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);for(i=0;i<a.length;i++)t=a[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(n,t)&&(r[t]=n[t])}return r}var c=i.createContext({}),p=function(n){var e=i.useContext(c),t=e;return n&&(t="function"==typeof n?n(e):l(l({},e),n)),t},s=function(n){var e=p(n.components);return i.createElement(c.Provider,{value:e},n.children)},u="mdxType",d={inlineCode:"code",wrapper:function(n){var e=n.children;return i.createElement(i.Fragment,{},e)}},g=i.forwardRef((function(n,e){var t=n.components,r=n.mdxType,a=n.originalType,c=n.parentName,s=o(n,["components","mdxType","originalType","parentName"]),u=p(t),g=r,m=u["".concat(c,".").concat(g)]||u[g]||d[g]||a;return t?i.createElement(m,l(l({ref:e},s),{},{components:t})):i.createElement(m,l({ref:e},s))}));function m(n,e){var t=arguments,r=e&&e.mdxType;if("string"==typeof n||r){var a=t.length,l=new Array(a);l[0]=g;var o={};for(var c in e)hasOwnProperty.call(e,c)&&(o[c]=e[c]);o.originalType=n,o[u]="string"==typeof n?n:r,l[1]=o;for(var p=2;p<a;p++)l[p]=t[p];return i.createElement.apply(null,l)}return i.createElement.apply(null,t)}g.displayName="MDXCreateElement"},9469:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var i=t(7462),r=(t(7294),t(3905));const a={title:"SOLID Principle"},l=void 0,o={unversionedId:"programming/concept/solid",id:"programming/concept/solid",title:"SOLID Principle",description:"S - Single Responsibility Principle",source:"@site/docs/programming/concept/solid.md",sourceDirName:"programming/concept",slug:"/programming/concept/solid",permalink:"/docs/programming/concept/solid",draft:!1,tags:[],version:"current",frontMatter:{title:"SOLID Principle"},sidebar:"programming",previous:{title:"Open Systems Interconnection Reference Model",permalink:"/docs/programming/concept/osimodel"},next:{title:"Channel",permalink:"/docs/programming/go/channel"}},c={},p=[{value:"S - Single Responsibility Principle",id:"s---single-responsibility-principle",level:2},{value:"O - Open/Closed Principle",id:"o---openclosed-principle",level:2},{value:"L - Liskov\u2019s Substitution Principle",id:"l---liskovs-substitution-principle",level:2},{value:"I - Interface Segregation Principle",id:"i---interface-segregation-principle",level:2},{value:"D - Dependency Inversion Principle",id:"d---dependency-inversion-principle",level:2}],s={toc:p},u="wrapper";function d(n){let{components:e,...t}=n;return(0,r.kt)(u,(0,i.Z)({},s,t,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"s---single-responsibility-principle"},"S - Single Responsibility Principle"),(0,r.kt)("p",null,"M\u1ed9t l\u1edbp n\xean ch\u1ec9 c\xf3 m\u1ed9t tr\xe1ch nhi\u1ec7m (N\xf3 ch\u1ec9 n\xean \u0111\u01b0\u1ee3c s\u1eeda \u0111\u1ed5i v\xec m\u1ed9t l\xfd do)."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Student b\xe2y gi\u1edd ch\u1ec9 ch\u1ee9a th\xf4ng tin\npublic class Student {\n  public string Name { get; set;}\n  public int Age { get; set;}\n}\n\n// Class n\xe0y ch\u1ec9 format th\xf4ng tin hi\u1ec3n th\u1ecb student\npublic class Formatter {\n  public string FormatStudentText(Student std) {\n    return "Name: " + std.Name + ". Age: " + std.Age;\n  }\n\n  public string FormatStudentHtml(Student std) {\n    return "<span>" + std.Name + " " + std.Age + "</span>";\n  }\n\n  public string FormatStudentJson(Student std) {\n    return Json.Serialize(std);\n  }\n}\n')),(0,r.kt)("h2",{id:"o---openclosed-principle"},"O - Open/Closed Principle"),(0,r.kt)("p",null,"C\xf3 th\u1ec3 m\u1edf r\u1ed9ng m\u1ed9t l\u1edbp, nh\u01b0ng kh\xf4ng \u0111\u01b0\u1ee3c ph\xe9p s\u1eeda \u0111\u1ed5i n\u1ed9i dung c\u1ee7a n\xf3."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"interface Shape {\n  public double area();\n}\npublic class Square implements Shape {\n  private Point topLeft;\n  private double side;\n  public double area() {\n  return side*side;\n  }\n}\n\npublic class Rectangle implements Shape {\n  private Point topLeft;\n  private double height;\n  private double width;\n  public double area() {\n    return height * width;\n  }\n}\n")),(0,r.kt)("h2",{id:"l---liskovs-substitution-principle"},"L - Liskov\u2019s Substitution Principle"),(0,r.kt)("p",null,"Trong m\u1ed9t ch\u01b0\u01a1ng tr\xecnh, c\xe1c \u0111\u1ed1i t\u01b0\u1ee3ng c\u1ee7a m\u1ed9t l\u1edbp con c\xf3 th\u1ec3 thay th\u1ebf l\u1edbp cha m\xe0 kh\xf4ng \u1ea3nh h\u01b0\u1edfng \u0111\u1ebfn t\xednh \u0111\xfang \u0111\u1eafn c\u1ee7a ch\u01b0\u01a1ng tr\xecnh."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'public class Animal {\n    public void makeNoise() {\n        System.out.println("making some noise");\n    }\n}\n// class Cat v\xe0 Dog extend t\u1eeb class animal\npublic class Dog extends Animal {\n    @Override\n    public void makeNoise() {\n        System.out.println("g\xe2u g\xe2u");\n    }\n}\n')),(0,r.kt)("h2",{id:"i---interface-segregation-principle"},"I - Interface Segregation Principle"),(0,r.kt)("p",null,"Thay v\xec s\u1eed d\u1ee5ng m\u1ed9t giao di\u1ec7n l\u1edbn, ch\xfang ta n\xean chia th\xe0nh c\xe1c giao di\u1ec7n nh\u1ecf h\u01a1n, m\u1ed7i giao di\u1ec7n c\xf3 m\u1ee5c \u0111\xedch kh\xe1c nhau."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},"// Instead of:\ninterface Worker {\n  work(): void;\n  eat(): void;\n}\n\n// Use:\ninterface Working {\n  work(): void;\n}\n\ninterface Eating {\n  eat(): void;\n}\n\nclass Human implements Working, Eating {\n  work() {\n    // human working\n  }\n\n  eat() {\n    // human eating\n  }\n}\n")),(0,r.kt)("h2",{id:"d---dependency-inversion-principle"},"D - Dependency Inversion Principle"),(0,r.kt)("p",null,"C\xe1c m\xf4-\u0111un c\u1ea5p cao kh\xf4ng n\xean ph\u1ee5 thu\u1ed9c v\xe0o c\xe1c m\xf4-\u0111un c\u1ea5p th\u1ea5p.\nC\u1ea3 hai n\xean ph\u1ee5 thu\u1ed9c v\xe0o tr\u1eebu t\u01b0\u1ee3ng."),(0,r.kt)("p",null,"Tr\u1eebu t\u01b0\u1ee3ng (giao di\u1ec7n) kh\xf4ng n\xean ph\u1ee5 thu\u1ed9c v\xe0o chi ti\u1ebft, m\xe0 ng\u01b0\u1ee3c l\u1ea1i.\n(C\xe1c l\u1edbp giao ti\u1ebfp v\u1edbi nhau th\xf4ng qua giao di\u1ec7n,\nkh\xf4ng th\xf4ng qua vi\u1ec7c th\u1ef1c thi c\u1ee5 th\u1ec3.)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Not apply principle\n// Cart is high module\npublic class Cart {\n    public void Checkout(int orderId, int userId) {\n        // Database, Logger, EmailSender l\xe0 module c\u1ea5p th\u1ea5p\n        Database db = new Database();\n        db.Save(orderId);\n\n        Logger log = new Logger();\n        log.LogInfo("Order has been checkout");\n\n        EmailSender es = new EmailSender();\n        es.SendEmail(userId);\n    }\n}\n')),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'// Apply principle\n\npublic interface IDatabase {\n        void Save(int orderId);\n}\n\npublic interface ILogger {\n        void LogInfo(string info);\n}\n\npublic interface IEmailSender {\n        void SendEmail(int userId);\n}\n\n// Module implement interface\npublic class Logger implements ILogger {\n    public void LogInfo(string info) {}\n}\n\npublic class Database implements IDatabase {\n    public void Save(int orderId) {}\n}\n\npublic class EmailSender implements IEmailSender {\n    public void SendEmail(int userId) {}\n}\n\npublic void Checkout(int orderId, int userId) {\n    //IDatabase db = new XMLDatabase();\n    //IDatebase db = new SQLDatabase();\n    IDatabase db = new Database();\n    db.Save(orderId);\n\n    ILogger log = new Logger();\n    log.LogInfo("Order has been checkout");\n\n    IEmailSender es = new EmailSender();\n    es.SendEmail(userId);\n}\n')))}d.isMDXComponent=!0}}]);