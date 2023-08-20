"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[5290],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>f});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var i=r.createContext({}),c=function(e){var n=r.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=c(e.components);return r.createElement(i.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(t),d=a,f=m["".concat(i,".").concat(d)]||m[d]||u[d]||o;return t?r.createElement(f,s(s({ref:n},p),{},{components:t})):r.createElement(f,s({ref:n},p))}));function f(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=d;var l={};for(var i in n)hasOwnProperty.call(n,i)&&(l[i]=n[i]);l.originalType=e,l[m]="string"==typeof e?e:a,s[1]=l;for(var c=2;c<o;c++)s[c]=t[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},8654:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>c});var r=t(7462),a=(t(7294),t(3905));const o={title:"Assume Role Example"},s=void 0,l={unversionedId:"examples/devops/assumerole",id:"examples/devops/assumerole",title:"Assume Role Example",description:"Install package assume-role",source:"@site/docs/examples/devops/assumerole.md",sourceDirName:"examples/devops",slug:"/examples/devops/assumerole",permalink:"/docs/examples/devops/assumerole",draft:!1,tags:[],version:"current",frontMatter:{title:"Assume Role Example"},sidebar:"examples",previous:{title:"Github Actions Example",permalink:"/docs/examples/devops/githubactions"},next:{title:"Relationship Query Mongodb",permalink:"/docs/examples/nodejs/mongodbjoin"}},i={},c=[],p={toc:c},m="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(m,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Install package assume-role"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"go install github.com/remind101/assume-role@latest\n")),(0,a.kt)("p",null,"Create IAM Users with basic policy"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},'{\n  "Version": "2012-10-17",\n  "Statement":\n    [\n      {\n        "Effect": "Allow",\n        "Action":\n          [\n            "iam:ListMFADevices",\n            "iam:CreateVirtualMFADevice",\n            "iam:EnableMFADevice",\n            "iam:ListVirtualMFADevices",\n            "iam:ResyncMFADevice",\n            "iam:ListMFADeviceTags",\n            "iam:DeactivateMFADevice",\n            "iam:DeleteVirtualMFADevice",\n            "iam:TagMFADevice",\n            "iam:UntagMFADevice",\n            "iam:ListAccessKeys",\n            "iam:CreateAccessKey",\n            "sts:AssumeRole",\n            "iam:ChangePassword",\n            "iam:GetAccountSummary",\n          ],\n        "Resource": ["arn:aws:iam::*:user/*", "arn:aws:iam::*:mfa/*"],\n      },\n    ],\n}\n')),(0,a.kt)("p",null,"Create new role add ",(0,a.kt)("inlineCode",{parentName:"p"},"Permissions policies")," you want, in tab ",(0,a.kt)("inlineCode",{parentName:"p"},"Trusted entities")," edit"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},'{\n    "Version": "2012-10-17",\n    "Statement": [\n        {\n            "Sid": "Statement1",\n            "Effect": "Allow",\n            "Principal": {\n                "AWS": [\n                    "arn:aws:iam::{USER_ID}:user/{IAM_USER}"\n                ]\n            },\n            "Action": "sts:AssumeRole",\n            "Condition": {\n                "Bool": {\n                    "aws:MultiFactorAuthPresent": "true"\n                }\n            }\n        }\n    ]\n}\n')),(0,a.kt)("p",null,"Config ",(0,a.kt)("inlineCode",{parentName:"p"},".config")," profile user"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[profile kori-admin]\nregion = ap-south-1\nmfa_serial = \nsource_profile = kori // Reference with credentials\nrole_arn = // ARN role\n")),(0,a.kt)("p",null,"Use assume role with ARN role added"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"assume-role kori-admin // profile config\n")),(0,a.kt)("p",null,"Save assume role"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"eval $(assume-role kori-admin)\n")))}u.isMDXComponent=!0}}]);