"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5808],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>g});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function l(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):l(l({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=p(a),d=r,g=c["".concat(s,".").concat(d)]||c[d]||m[d]||i;return a?n.createElement(g,l(l({ref:t},u),{},{components:a})):n.createElement(g,l({ref:t},u))}));function g(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,l=new Array(i);l[0]=d;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var p=2;p<i;p++)l[p]=a[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},5081:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>o,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={title:"Management & Governance"},l=void 0,o={unversionedId:"programming/aws/governance",id:"programming/aws/governance",title:"Management & Governance",description:"Well-Architected infrastructure",source:"@site/docs/programming/aws/governance.md",sourceDirName:"programming/aws",slug:"/programming/aws/governance",permalink:"/docs/programming/aws/governance",draft:!1,tags:[],version:"current",frontMatter:{title:"Management & Governance"},sidebar:"programming",previous:{title:"Cost Management & Optimize",permalink:"/docs/programming/aws/cost"},next:{title:"Amazon Elastic Compute Cloud",permalink:"/docs/programming/aws/ec2"}},s={},p=[{value:"Well-Architected infrastructure",id:"well-architected-infrastructure",level:2},{value:"Support plan",id:"support-plan",level:2},{value:"Trusted Advisor",id:"trusted-advisor",level:3},{value:"AWS Organizations",id:"aws-organizations",level:2},{value:"AWS Application Discovery Service",id:"aws-application-discovery-service",level:2},{value:"AWS Quick Start",id:"aws-quick-start",level:2},{value:"AWS Config",id:"aws-config",level:2},{value:"AWS CloudFormation",id:"aws-cloudformation",level:2},{value:"AWS Control Tower",id:"aws-control-tower",level:2},{value:"Enterprise Support Concierge",id:"enterprise-support-concierge",level:2}],u={toc:p},c="wrapper";function m(e){let{components:t,...a}=e;return(0,r.kt)(c,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"well-architected-infrastructure"},"Well-Architected infrastructure"),(0,r.kt)("p",null,"The AWS Well-Architected Framework is a guide for designing reliable architectures for applications running on the AWS platform. It helps customers assess the overall alignment of their current architecture with standards and best practices defined by AWS."),(0,r.kt)("p",null,"The key pillars of the Well-Architected Framework include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Operational Excellence"),": This pillar focuses on ensuring that systems are deployed and managed efficiently to meet business and customer needs.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Security"),": This pillar emphasizes ensuring the security of applications and data managed on the AWS platform, including basic security solutions and advanced security technologies.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Reliability"),": This section focuses on ensuring that applications operate consistently and correctly, with minimal disruptions in case of failures.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Performance Efficiency"),": This pillar concentrates on ensuring that applications are deployed and managed with optimal performance and resource utilization.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Cost Optimization"),": This section outlines the importance of ensuring that applications are deployed and managed with minimal costs while still ensuring efficient resource utilization."))),(0,r.kt)("h2",{id:"support-plan"},"Support plan"),(0,r.kt)("p",null,"AWS provides various Support plans to assist users in using AWS services, including:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Basic Support"),": This is a free support tier provided to all AWS customers. It includes basic support features through email, access to forums, and support documentation.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Developer Support"),": This tier helps developers address technical issues when using AWS services. It includes support features through email, forum access, documentation, and live chat support.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Business Support"),": This is a higher-tier support plan that offers 24/7/365 technical support, priority support for requests, dedicated support experts, and many other features.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},(0,r.kt)("strong",{parentName:"p"},"Enterprise Support"),": This is the most professional support plan offered by AWS. This service provides advanced features such as custom support, dedicated technical experts, system status monitoring, and reporting and analytics options."))),(0,r.kt)("p",null,"In summary, AWS offers a range of support plans to meet the needs and budgets of each customer, from those requiring basic support to large enterprises requiring customized and advanced support."),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Plan Name"),(0,r.kt)("th",{parentName:"tr",align:null},"Basic"),(0,r.kt)("th",{parentName:"tr",align:null},"Developer"),(0,r.kt)("th",{parentName:"tr",align:null},"Business"),(0,r.kt)("th",{parentName:"tr",align:null},"Enterprise"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Description"),(0,r.kt)("td",{parentName:"tr",align:null},"Free, limited support"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical support for developers"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical and account support for businesses"),(0,r.kt)("td",{parentName:"tr",align:null},"Personalized support with dedicated technical account manager")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Price"),(0,r.kt)("td",{parentName:"tr",align:null},"Free"),(0,r.kt)("td",{parentName:"tr",align:null},"Starts at $29/month"),(0,r.kt)("td",{parentName:"tr",align:null},"Starts at $100/month"),(0,r.kt)("td",{parentName:"tr",align:null},"Custom pricing")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Response Time"),(0,r.kt)("td",{parentName:"tr",align:null},"12 hours"),(0,r.kt)("td",{parentName:"tr",align:null},"12 hours"),(0,r.kt)("td",{parentName:"tr",align:null},"1 hour"),(0,r.kt)("td",{parentName:"tr",align:null},"15 minutes")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Support Channels"),(0,r.kt)("td",{parentName:"tr",align:null},"Email"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat, Phone"),(0,r.kt)("td",{parentName:"tr",align:null},"Email, Chat, Phone")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Customer Service"),(0,r.kt)("td",{parentName:"tr",align:null},"General guidance, documentation, whitepapers"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical support, one-on-one guidance"),(0,r.kt)("td",{parentName:"tr",align:null},"Technical and account support, AWS Trusted Advisor"),(0,r.kt)("td",{parentName:"tr",align:null},"Personalized support, technical account manager, infrastructure event management")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"AWS Infrastructure Event Management"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Trusted Advisor Checks"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"7 checks"),(0,r.kt)("td",{parentName:"tr",align:null},"Full suite of checks")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Third-Party Software Support"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Concierge Support"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Not included"),(0,r.kt)("td",{parentName:"tr",align:null},"Included")))),(0,r.kt)("h3",{id:"trusted-advisor"},"Trusted Advisor"),(0,r.kt)("p",null,"AWS Trusted Advisor is a service provided by Amazon Web Services (AWS) to help customers optimize their AWS environment. It leverages knowledge and experience accumulated by AWS to provide recommendations on resources, performance, security, and cost."),(0,r.kt)("p",null,"AWS Trusted Advisor operates by automatically scanning your AWS environment and comparing it to predefined best practices. It then provides recommendations to improve operations, reduce costs, and enhance system readiness."),(0,r.kt)("p",null,"The key components of Trusted Advisor include:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Cost Optimization: This section examines your resources on AWS and provides recommendations on how to optimize resource usage to reduce costs.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Performance: This section reviews the performance of your AWS system and provides recommendations on how to optimize it.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Security: This section checks your security measures on the AWS platform and provides recommendations on how to enhance security.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Fault Tolerance: This section evaluates the availability and recovery capabilities of your AWS resources and provides recommendations on how to optimize readiness.")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("p",{parentName:"li"},"Service Limits: This section checks your service limits on AWS and provides recommendations on how to optimize resource usage to avoid exceeding those limits."))),(0,r.kt)("h2",{id:"aws-organizations"},"AWS Organizations"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Manage and govern multiple AWS accounts centrally."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": A service allowing you to create a centralized environment to manage billing, security, and compliance across multiple AWS accounts."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Large enterprises managing multiple AWS accounts."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Setting consolidated billing for multiple departments in a corporation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Hierarchical structure, policy-based management, consolidated billing.")),(0,r.kt)("h2",{id:"aws-application-discovery-service"},"AWS Application Discovery Service"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Discover on-premises applications to ease migration to AWS."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Helps enterprises plan migration projects by gathering information about their on-premises data centers."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Pre-migration assessment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Assessing and grouping servers based on applications before cloud migration."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Server discovery, application dependency mapping, migration planning.")),(0,r.kt)("h2",{id:"aws-quick-start"},"AWS Quick Start"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Accelerate cloud adoption with predefined templates."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Automated deployments for popular workloads and architectural baselines."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Rapid cloud deployment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Quickly deploying a WordPress website on AWS."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Pre-built templates, integration with AWS best practices, wide range of workloads.")),(0,r.kt)("h2",{id:"aws-config"},"AWS Config"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Track resource inventory and changes."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Provides a detailed view of the configuration of AWS resources in your account."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Compliance and audit."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Ensuring no publicly accessible S3 buckets exist in an account."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Resource tracking, change tracking, compliance checks.")),(0,r.kt)("h2",{id:"aws-cloudformation"},"AWS CloudFormation"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Define and deploy infrastructure as code."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Allows you to use templates to define, provision, and manage AWS resources."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Reproducible infrastructure deployment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Deploying an entire three-tier web application using a single template."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Template-based provisioning, drift detection, modular and reusable.")),(0,r.kt)("h2",{id:"aws-control-tower"},"AWS Control Tower"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Set up and govern a secure, compliant multi-account AWS environment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Simplifies the process of setting up AWS Organizations and other baseline infrastructure."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Streamlined AWS account setup and governance."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Enabling a centralized log archive and audit trail across multiple AWS accounts."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Account factory, guardrails, log archive.")),(0,r.kt)("h2",{id:"enterprise-support-concierge"},"Enterprise Support Concierge"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Personalized cloud support."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Dedicated technical advisors providing 24/7 access to cloud support engineers."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use Case"),": Enterprises requiring dedicated and in-depth support."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Guidance during critical deployment or troubleshooting complex issues."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key Features"),": Infrastructure event management, training, architectural guidance.")))}m.isMDXComponent=!0}}]);