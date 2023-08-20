"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[821],{3905:(e,a,t)=>{t.d(a,{Zo:()=>c,kt:()=>g});var r=t(7294);function n(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function l(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?l(Object(t),!0).forEach((function(a){n(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function s(e,a){if(null==e)return{};var t,r,n=function(e,a){if(null==e)return{};var t,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||(n[t]=e[t]);return n}(e,a);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)t=l[r],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(n[t]=e[t])}return n}var o=r.createContext({}),p=function(e){var a=r.useContext(o),t=a;return e&&(t="function"==typeof e?e(a):i(i({},a),e)),t},c=function(e){var a=p(e.components);return r.createElement(o.Provider,{value:a},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var a=e.children;return r.createElement(r.Fragment,{},a)}},d=r.forwardRef((function(e,a){var t=e.components,n=e.mdxType,l=e.originalType,o=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=p(t),d=n,g=m["".concat(o,".").concat(d)]||m[d]||u[d]||l;return t?r.createElement(g,i(i({ref:a},c),{},{components:t})):r.createElement(g,i({ref:a},c))}));function g(e,a){var t=arguments,n=a&&a.mdxType;if("string"==typeof e||n){var l=t.length,i=new Array(l);i[0]=d;var s={};for(var o in a)hasOwnProperty.call(a,o)&&(s[o]=a[o]);s.originalType=e,s[m]="string"==typeof e?e:n,i[1]=s;for(var p=2;p<l;p++)i[p]=t[p];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},9013:(e,a,t)=>{t.r(a),t.d(a,{assets:()=>o,contentTitle:()=>i,default:()=>u,frontMatter:()=>l,metadata:()=>s,toc:()=>p});var r=t(7462),n=(t(7294),t(3905));const l={title:"Database"},i=void 0,s={unversionedId:"programming/aws/database",id:"programming/aws/database",title:"Database",description:"RDS (Relational Database Service)",source:"@site/docs/programming/aws/database.md",sourceDirName:"programming/aws",slug:"/programming/aws/database",permalink:"/docs/programming/aws/database",draft:!1,tags:[],version:"current",frontMatter:{title:"Database"},sidebar:"programming",previous:{title:"Amazon Simple Storage Service",permalink:"/docs/programming/aws/s3"},next:{title:"Containers",permalink:"/docs/programming/aws/container"}},o={},p=[{value:"RDS (Relational Database Service)",id:"rds-relational-database-service",level:2},{value:"AWS ElastiCache",id:"aws-elasticache",level:2},{value:"AWS DynamoDB",id:"aws-dynamodb",level:2},{value:"AWS Aurora",id:"aws-aurora",level:2},{value:"AWS DocumentDB",id:"aws-documentdb",level:2},{value:"AWS Keyspaces (for Apache Cassandra)",id:"aws-keyspaces-for-apache-cassandra",level:2},{value:"AWS Quantum Ledger Database (QLDB)",id:"aws-quantum-ledger-database-qldb",level:2}],c={toc:p},m="wrapper";function u(e){let{components:a,...t}=e;return(0,n.kt)(m,(0,r.Z)({},c,t,{components:a,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"rds-relational-database-service"},"RDS (Relational Database Service)"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Easily set up, operate, and scale a relational database."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": Managed relational database service offering several database engines."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Web applications needing a relational database backend."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Hosting a PostgreSQL database for an e-commerce website."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Automated backups, database scaling, multi-AZ deployments.")),(0,n.kt)("h2",{id:"aws-elasticache"},"AWS ElastiCache"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Improve database and application performance with in-memory cache."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": Managed caching service that supports Redis and Memcached."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Speeding up web applications by caching frequent queries."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Caching most frequently accessed database results to reduce read times."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Real-time analytics, high performance, scalability.")),(0,n.kt)("h2",{id:"aws-dynamodb"},"AWS DynamoDB"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Managed NoSQL database service."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": Provides fast and predictable performance with seamless scalability."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Mobile, web, gaming, ad tech, IoT, and many other applications."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Storing user profiles for a mobile app."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Managed, multi-master, multi-region, in-memory caching.")),(0,n.kt)("h2",{id:"aws-aurora"},"AWS Aurora"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": High-performance managed relational database."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": MySQL and PostgreSQL-compatible relational database with up to 3 times better performance."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Enterprise applications requiring complex queries and transaction capabilities."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Hosting a financial transaction system's database."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": 3x performance, replication, security.")),(0,n.kt)("h2",{id:"aws-documentdb"},"AWS DocumentDB"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Managed document database service."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": MongoDB-compatible database service."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Content management, catalogs, user profiles."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Storing product catalog for an e-commerce site."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Fully managed, scalable, secure.")),(0,n.kt)("h2",{id:"aws-keyspaces-for-apache-cassandra"},"AWS Keyspaces (for Apache Cassandra)"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Managed Cassandra-compatible database."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": Offers the performance of Apache Cassandra with AWS's scalability, safety, and security."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Scalable applications requiring wide-column store features."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Real-time sensor data for IoT applications."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Serverless, compatible with Cassandra, managed.")),(0,n.kt)("h2",{id:"aws-quantum-ledger-database-qldb"},"AWS Quantum Ledger Database (QLDB)"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Purpose"),": Transparent, immutable, and cryptographically verifiable ledger."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Description"),": Ledger database that provides a transparent, immutable, and cryptographically verifiable transaction log."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Use case"),": Systems of record, supply chain, financial transactions."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Example"),": Tracking goods as they move through a supply chain."),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("strong",{parentName:"li"},"Key features"),": Serverless, cryptographically verifiable, fully managed.")))}u.isMDXComponent=!0}}]);