"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[35],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),d=a,f=p["".concat(l,".").concat(d)]||p[d]||m[d]||o;return n?r.createElement(f,s(s({ref:t},u),{},{components:n})):r.createElement(f,s({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=d;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i[p]="string"==typeof e?e:a,s[1]=i;for(var c=2;c<o;c++)s[c]=n[c];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},9902:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>m,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var r=n(7462),a=(n(7294),n(3905));const o={title:"Assume Role"},s=void 0,i={unversionedId:"cheatsheet/devops/assume-role",id:"cheatsheet/devops/assume-role",title:"Assume Role",description:"Install package assume-role",source:"@site/docs/cheatsheet/devops/assume-role.md",sourceDirName:"cheatsheet/devops",slug:"/cheatsheet/devops/assume-role",permalink:"/docs/cheatsheet/devops/assume-role",draft:!1,tags:[],version:"current",frontMatter:{title:"Assume Role"},sidebar:"cheatsheet",previous:{title:"Algorithm CheatSheet",permalink:"/docs/cheatsheet/fundamental/algorithm"},next:{title:"AWS CLI CheatSheet",permalink:"/docs/cheatsheet/devops/aws"}},l={},c=[],u={toc:c},p="wrapper";function m(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Install package assume-role"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"go install github.com/remind101/assume-role@latest\n")),(0,a.kt)("p",null,"Create IAM Users with basic policy"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},'{\n  "Version": "2012-10-17",\n  "Statement":\n    [\n      {\n        "Effect": "Allow",\n        "Action":\n          [\n            "iam:ListMFADevices",\n            "iam:CreateVirtualMFADevice",\n            "iam:EnableMFADevice",\n            "iam:ListVirtualMFADevices",\n            "iam:ResyncMFADevice",\n            "iam:ListMFADeviceTags",\n            "iam:DeactivateMFADevice",\n            "iam:DeleteVirtualMFADevice",\n            "iam:TagMFADevice",\n            "iam:UntagMFADevice",\n            "iam:ListAccessKeys",\n            "iam:CreateAccessKey",\n            "sts:AssumeRole",\n            "iam:ChangePassword",\n            "iam:GetAccountSummary",\n          ],\n        "Resource": ["arn:aws:iam::*:user/*", "arn:aws:iam::*:mfa/*"],\n      },\n    ],\n}\n')),(0,a.kt)("p",null,"Create new role add ",(0,a.kt)("inlineCode",{parentName:"p"},"Permissions policies")," you want, in tab ",(0,a.kt)("inlineCode",{parentName:"p"},"Trusted entities")," edit"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-yml"},'{\n  "Version": "2012-10-17",\n  "Statement":\n    [\n      {\n        "Sid": "Statement1",\n        "Effect": "Allow",\n        "Principal": { "AWS": ["arn:aws:iam::{USER_ID}:user/{IAM_USER}"] },\n        "Action": "sts:AssumeRole",\n        "Condition": { "Bool": { "aws:MultiFactorAuthPresent": "true" } },\n      },\n    ],\n}\n')),(0,a.kt)("p",null,"Config ",(0,a.kt)("inlineCode",{parentName:"p"},".config")," profile user"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"[profile kori-admin]\nregion = ap-south-1\nmfa_serial =\nsource_profile = kori // Reference with credentials\nrole_arn = // ARN role\n")),(0,a.kt)("p",null,"Use assume role with ARN role added"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"assume-role kori-admin // profile config\n")),(0,a.kt)("p",null,"Save assume role"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"eval $(assume-role kori-admin)\n")))}m.isMDXComponent=!0}}]);