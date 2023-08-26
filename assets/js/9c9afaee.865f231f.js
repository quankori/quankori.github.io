"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[7202],{3905:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>d});var a=n(7294);function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var c=a.createContext({}),s=function(t){var e=a.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},u=function(t){var e=s(t.components);return a.createElement(c.Provider,{value:e},t.children)},p="mdxType",m={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},g=a.forwardRef((function(t,e){var n=t.components,r=t.mdxType,i=t.originalType,c=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),p=s(n),g=r,d=p["".concat(c,".").concat(g)]||p[g]||m[g]||i;return n?a.createElement(d,o(o({ref:e},u),{},{components:n})):a.createElement(d,o({ref:e},u))}));function d(t,e){var n=arguments,r=e&&e.mdxType;if("string"==typeof t||r){var i=n.length,o=new Array(i);o[0]=g;var l={};for(var c in e)hasOwnProperty.call(e,c)&&(l[c]=e[c]);l.originalType=t,l[p]="string"==typeof t?t:r,o[1]=l;for(var s=2;s<i;s++)o[s]=n[s];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},2694:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const i={title:"AWS Security"},o=void 0,l={unversionedId:"programming/aws/security",id:"programming/aws/security",title:"AWS Security",description:"AWS Inspector",source:"@site/docs/programming/aws/security.md",sourceDirName:"programming/aws",slug:"/programming/aws/security",permalink:"/docs/programming/aws/security",draft:!1,tags:[],version:"current",frontMatter:{title:"AWS Security"},sidebar:"programming",previous:{title:"Artificial Intelligence",permalink:"/docs/programming/aws/artificialintelligence"},next:{title:"Migration & Transfer",permalink:"/docs/programming/aws/migration"}},c={},s=[{value:"AWS Inspector",id:"aws-inspector",level:2},{value:"AWS WAF",id:"aws-waf",level:2},{value:"AWS Shield",id:"aws-shield",level:2},{value:"AWS Artifact",id:"aws-artifact",level:2},{value:"AWS GuardDuty",id:"aws-guardduty",level:2},{value:"AWS CloudTrail",id:"aws-cloudtrail",level:2},{value:"CloudTrail Log File Validation",id:"cloudtrail-log-file-validation",level:2},{value:"AWS Single Sign-On",id:"aws-single-sign-on",level:2},{value:"AWS Cognito",id:"aws-cognito",level:2},{value:"AWS KMS",id:"aws-kms",level:2},{value:"AWS Directory Service for Microsoft Active Directory",id:"aws-directory-service-for-microsoft-active-directory",level:2},{value:"AWS IAM",id:"aws-iam",level:2},{value:"Information Security Standards",id:"information-security-standards",level:2}],u={toc:s},p="wrapper";function m(t){let{components:e,...n}=t;return(0,r.kt)(p,(0,a.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"aws-inspector"},"AWS Inspector"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Automated security assessment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Helps improve the security and compliance of applications."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Security assessment for EC2 instances."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Automated vulnerability detection for an EC2 deployment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Automated, detailed reporting, vulnerability assessments.")),(0,r.kt)("h2",{id:"aws-waf"},"AWS WAF"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Web application firewall."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Protects web applications from common exploits."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Protect web applications from SQL injection, XSS."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Defending a web app against a DDOS attack."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Customizable rules, real-time monitoring, AWS integration.")),(0,r.kt)("h2",{id:"aws-shield"},"AWS Shield"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Managed DDoS protection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Provides protection against DDoS attacks."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Defending applications from DDoS attacks."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Safeguarding an e-commerce site during a flash sale."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": 24/7 DDoS protection, traffic engineering, risk management.")),(0,r.kt)("h2",{id:"aws-artifact"},"AWS Artifact"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Compliance documentation."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Portal for on-demand access to AWS's compliance reports."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Satisfying regulatory audit requirements."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Retrieving a compliance report for an auditor's review."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": On-demand access, a range of reports, central repository.")),(0,r.kt)("h2",{id:"aws-guardduty"},"AWS GuardDuty"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Threat detection."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Managed threat detection service that analyzes logs for malicious activity."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Monitoring and securing AWS accounts and workloads."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Detecting compromised EC2 instances in an AWS environment."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Continuous monitoring, threat intelligence, anomaly detection.")),(0,r.kt)("h2",{id:"aws-cloudtrail"},"AWS CloudTrail"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": AWS activity logging."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Tracks user activity and API usage."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Security analysis, resource change tracking."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Auditing all S3 bucket permission changes."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Event history, integrates with other AWS services, encryption.")),(0,r.kt)("h2",{id:"cloudtrail-log-file-validation"},"CloudTrail Log File Validation"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Ensuring integrity of CloudTrail logs."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Feature of CloudTrail that checks the integrity of the delivered logs."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Security and forensic analysis."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Validating the integrity of stored CloudTrail logs."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Digital signatures, validation tools, chain of custody.")),(0,r.kt)("h2",{id:"aws-single-sign-on"},"AWS Single Sign-On"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Centralized access management."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Managed service that lets users sign into multiple AWS accounts."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Centralized access for AWS environments."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Allowing users to log into multiple AWS accounts with one set of credentials."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": SSO, central dashboard, AD integration.")),(0,r.kt)("h2",{id:"aws-cognito"},"AWS Cognito"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": User identity and data synchronization."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Provides user sign-up, sign-in, and access control."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Mobile and web app user management."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Creating a user directory for a mobile game."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": User directory, OAuth2.0, SAML, data sync.")),(0,r.kt)("h2",{id:"aws-kms"},"AWS KMS"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Cryptographic key management."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Managed service for creating and controlling encryption keys."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Data encryption for AWS services."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Encrypting an S3 bucket's data at rest."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Centralized key management, audit capabilities, integrated with AWS services.")),(0,r.kt)("h2",{id:"aws-directory-service-for-microsoft-active-directory"},"AWS Directory Service for Microsoft Active Directory"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Purpose"),": Managed Microsoft Active Directory."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Description"),": Managed service that runs Microsoft Active Directory on AWS."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Use case"),": Any application or service that requires AD."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Example"),": Joining EC2 instances to a domain."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Key features"),": Easy AD deployment, trust relationships, scales to tens of thousands of users.")),(0,r.kt)("h2",{id:"aws-iam"},"AWS IAM"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"IAM User"),": \u0110\u1ea1i di\u1ec7n cho m\u1ed9t ng\u01b0\u1eddi d\xf9ng ho\u1eb7c \u1ee9ng d\u1ee5ng c\u1ee5 th\u1ec3 \u0111\xe3 \u0111\u01b0\u1ee3c x\xe1c th\u1ef1c v\xe0 \u1ee7y quy\u1ec1n \u0111\u1ec3 truy c\u1eadp c\xe1c t\xe0i nguy\xean trong AWS. M\u1ed7i IAM User c\xf3 m\u1ed9t t\xean ng\u01b0\u1eddi d\xf9ng v\xe0 th\xf4ng tin x\xe1c th\u1ef1c \u0111\u1ed9c nh\u1ea5t."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"IAM Group"),": L\xe0 m\u1ed9t t\u1eadp h\u1ee3p c\u1ee7a nhi\u1ec1u IAM Users. Groups \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng \u0111\u1ec3 qu\u1ea3n l\xfd quy\u1ec1n truy c\u1eadp cho nhi\u1ec1u ng\u01b0\u1eddi d\xf9ng c\xf9ng m\u1ed9t l\xfac thay v\xec qu\u1ea3n l\xfd t\u1eebng ng\u01b0\u1eddi d\xf9ng m\u1ed9t c\xe1ch ri\xeang l\u1ebb. Khi m\u1ed9t IAM User \u0111\u01b0\u1ee3c th\xeam v\xe0o m\u1ed9t nh\xf3m, ng\u01b0\u1eddi d\xf9ng \u0111\xf3 th\u1eeba h\u01b0\u1edfng t\u1ea5t c\u1ea3 c\xe1c quy\u1ec1n \u0111\xe3 \u0111\u01b0\u1ee3c g\xe1n cho nh\xf3m \u0111\xf3."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"IAM Policy"),": : \u0110\u1ecbnh ngh\u0129a c\xe1c quy t\u1eafc cho vi\u1ec7c truy c\u1eadp c\xe1c t\xe0i nguy\xean AWS. C\xe1c Policy \u0111\u01b0\u1ee3c g\u1eafn v\xe0o IAM Users ho\u1eb7c IAM Groups \u0111\u1ec3 ki\u1ec3m so\xe1t quy\u1ec1n truy c\u1eadp c\u1ee7a h\u1ecd \u0111\u1ebfn c\xe1c t\xe0i nguy\xean c\u1ee5 th\u1ec3 nh\u01b0 c\xe1c instance EC2, c\u01a1 s\u1edf d\u1eef li\u1ec7u RDS, ho\u1eb7c bucket S3. IAM Policies s\u1eed d\u1ee5ng c\xe1c quy t\u1eafc li\xean quan \u0111\u1ebfn nguy\xean t\u1eafc, h\xe0nh \u0111\u1ed9ng, v\xe0 t\xe0i nguy\xean \u0111\u1ec3 qu\u1ea3n l\xfd vi\u1ec7c truy c\u1eadp v\xe0o c\xe1c t\xe0i nguy\xean AWS."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"IAM Role"),": Li\xean quan \u0111\u1ebfn vi\u1ec7c c\u1ea5p quy\u1ec1n truy c\u1eadp t\u1ea1m th\u1eddi trong AWS. N\xf3 cho ph\xe9p m\u1ed9t IAM User ho\u1eb7c m\u1ed9t d\u1ecbch v\u1ee5 AWS kh\xe1c \u0111\u01b0\u1ee3c c\u1ea5p quy\u1ec1n \u0111\u1ec3 truy c\u1eadp v\xe0o c\xe1c t\xe0i nguy\xean AWS c\u1ee5 th\u1ec3. Roles th\u01b0\u1eddng \u0111\u01b0\u1ee3c s\u1eed d\u1ee5ng khi m\u1ed9t d\u1ecbch v\u1ee5 AWS c\u1ea7n truy c\u1eadp v\xe0o t\xe0i nguy\xean AWS kh\xe1c. Trong nh\u1eefng tr\u01b0\u1eddng h\u1ee3p nh\u01b0 v\u1eady, IAM Role \u0111\u01b0\u1ee3c g\xe1n cho d\u1ecbch v\u1ee5, c\u1ea5p cho n\xf3 c\xe1c quy\u1ec1n truy c\u1eadp c\u1ea7n thi\u1ebft. Kh\xe1c v\u1edbi IAM Users ho\u1eb7c IAM Groups, IAM Roles kh\xf4ng \u0111\u01b0\u1ee3c li\xean k\u1ebft tr\u1ef1c ti\u1ebfp v\u1edbi ng\u01b0\u1eddi d\xf9ng ho\u1eb7c nh\xf3m. Thay v\xe0o \u0111\xf3, ch\xfang \u0111\u01b0\u1ee3c li\xean k\u1ebft v\u1edbi m\u1ed9t t\u1eadp h\u1ee3p c\xe1c nguy\xean t\u1eafc, cho ph\xe9p b\u1ea5t k\u1ef3 ng\u01b0\u1eddi d\xf9ng ho\u1eb7c d\u1ecbch v\u1ee5 AWS n\xe0o \u0111\u01b0\u1ee3c \u1ee7y quy\u1ec1n c\xf3 th\u1ec3 truy c\u1eadp c\xe1c t\xe0i nguy\xean \u0111\u01b0\u1ee3c ch\u1ec9 \u0111\u1ecbnh."),(0,r.kt)("h2",{id:"information-security-standards"},"Information Security Standards"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"SOC 2 (System and Organization Controls 2)"),": L\xe0 m\u1ed9t ti\xeau chu\u1ea9n \u0111\u1ec3 ki\u1ec3m to\xe1n v\xe0 \u0111\xe1nh gi\xe1 vi\u1ec7c tri\u1ec3n khai c\xe1c bi\u1ec7n ph\xe1p ki\u1ec3m so\xe1t b\u1ea3o m\u1eadt, \u0111\u1ea3m b\u1ea3o t\xednh to\xe0n v\u1eb9n, kh\u1ea3 d\u1ee5ng v\xe0 an to\xe0n c\u1ee7a c\xe1c d\u1ecbch v\u1ee5, s\u1ea3n ph\u1ea9m, v\xe0 h\u1ea1 t\u1ea7ng c\u1ee7a t\u1ed5 ch\u1ee9c. \u0110\u01b0\u1ee3c thi\u1ebft k\u1ebf \u0111\u1ec3 \u0111\xe1p \u1ee9ng y\xeau c\u1ea7u cho c\xe1c c\xf4ng ty x\u1eed l\xfd th\xf4ng tin c\u1ee7a kh\xe1ch h\xe0ng."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"SOC 1 (System and Organization Controls 1)"),": L\xe0 m\u1ed9t ti\xeau chu\u1ea9n \u0111\u1ec3 ki\u1ec3m to\xe1n v\xe0 \u0111\xe1nh gi\xe1 t\xednh to\xe0n v\u1eb9n v\xe0 an ninh c\u1ee7a c\xe1c b\xe1o c\xe1o t\xe0i ch\xednh do c\xe1c t\u1ed5 ch\u1ee9c s\u1ea3n xu\u1ea5t. C\xf2n \u0111\u01b0\u1ee3c bi\u1ebft \u0111\u1ebfn v\u1edbi t\xean g\u1ecdi l\xe0 Statement on Standards for Attestation Engagements 18 (SSAE 18)."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"PCI DSS (Payment Card Industry Data Security Standard)"),": L\xe0 m\u1ed9t ti\xeau chu\u1ea9n b\u1ea3o m\u1eadt d\xe0nh cho c\xe1c t\u1ed5 ch\u1ee9c x\u1eed l\xfd th\xf4ng tin thanh to\xe1n, \u0111\u1ea3m b\u1ea3o r\u1eb1ng d\u1eef li\u1ec7u thanh to\xe1n c\u1ee7a kh\xe1ch h\xe0ng \u0111\u01b0\u1ee3c b\u1ea3o v\u1ec7 t\u1ed1i \u01b0u. Ti\xeau chu\u1ea9n n\xe0y \u0111\u1ea3m b\u1ea3o c\xe1c doanh nghi\u1ec7p tu\xe2n th\u1ee7 c\xe1c quy \u0111\u1ecbnh v\u1ec1 b\u1ea3o m\u1eadt, qu\u1ea3n l\xfd, v\xe0 b\u1ea3o v\u1ec7 d\u1eef li\u1ec7u thanh to\xe1n."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"HIPAA (Health Insurance Portability and Accountability Act)"),":: L\xe0 m\u1ed9t quy \u0111\u1ecbnh v\u1ec1 b\u1ea3o m\u1eadt th\xf4ng tin t\u1ea1i Hoa K\u1ef3, \u0111\u1eb7c bi\u1ec7t \u0111\u1ec3 b\u1ea3o v\u1ec7 th\xf4ng tin s\u1ee9c kh\u1ecfe c\xe1 nh\xe2n c\u1ee7a ng\u01b0\u1eddi ti\xeau d\xf9ng v\xe0 \u0111\u1ea3m b\u1ea3o th\xf4ng tin \u0111\xf3 \u0111\u01b0\u1ee3c b\u1ea3o m\u1eadt v\xe0 an to\xe0n. HIPAA \u0111\u01b0\u1ee3c \xe1p d\u1ee5ng cho t\u1ea5t c\u1ea3 c\xe1c t\u1ed5 ch\u1ee9c v\xe0 c\xe1 nh\xe2n li\xean quan \u0111\u1ebfn vi\u1ec7c l\u01b0u tr\u1eef, x\u1eed l\xfd, v\xe0 chia s\u1ebb th\xf4ng tin s\u1ee9c kh\u1ecfe."))}m.isMDXComponent=!0}}]);