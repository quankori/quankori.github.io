"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[374],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",k={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},i=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(r),i=a,m=d["".concat(s,".").concat(i)]||d[i]||k[i]||o;return r?n.createElement(m,c(c({ref:t},u),{},{components:r})):n.createElement(m,c({ref:t},u))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,c=new Array(o);c[0]=i;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,c[1]=l;for(var p=2;p<o;p++)c[p]=r[p];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}i.displayName="MDXCreateElement"},2893:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>k,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var n=r(7462),a=(r(7294),r(3905));const o={title:"Install Docker"},c=void 0,l={unversionedId:"cheatsheet/devops/setup-docker",id:"cheatsheet/devops/setup-docker",title:"Install Docker",description:"Debian Docker",source:"@site/docs/cheatsheet/devops/setup-docker.md",sourceDirName:"cheatsheet/devops",slug:"/cheatsheet/devops/setup-docker",permalink:"/docs/cheatsheet/devops/setup-docker",draft:!1,tags:[],version:"current",frontMatter:{title:"Install Docker"},sidebar:"cheatsheet",previous:{title:"AWS CLI CheatSheet",permalink:"/docs/cheatsheet/devops/aws"},next:{title:"Docker CheatSheet",permalink:"/docs/cheatsheet/devops/docker"}},s={},p=[{value:"Debian Docker",id:"debian-docker",level:3},{value:"RedHat Docker",id:"redhat-docker",level:3},{value:"AWS EC2 Docker",id:"aws-ec2-docker",level:3}],u={toc:p},d="wrapper";function k(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h3",{id:"debian-docker"},"Debian Docker"),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install docker.io\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable --now docker\n")),(0,a.kt)("p",null,"Add user to group"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo usermod -aG docker $USER\n")),(0,a.kt)("p",null,"Group docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"newgrp docker\n")),(0,a.kt)("p",null,"Install docker compose"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\n')),(0,a.kt)("p",null,"Chmod file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chmod +x /usr/local/bin/docker-compose\n")),(0,a.kt)("h3",{id:"redhat-docker"},"RedHat Docker"),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yum install docker-ce docker-ce-cli containerd.io\nyum install -y yum-utils\nyum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo\nyum install docker-ce docker-ce-cli containerd.io\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"systemctl start docker\n")),(0,a.kt)("h3",{id:"aws-ec2-docker"},"AWS EC2 Docker"),(0,a.kt)("p",null,"Update system"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum update\n")),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum search docker\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum info docker\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum install docker\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo usermod -a -G docker ec2-user\nid ec2-user\nnewgrp docker\n")),(0,a.kt)("p",null,"Enable docker service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable docker.service\n")),(0,a.kt)("p",null,"Enable docker service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl start docker.service\n")),(0,a.kt)("p",null,"Docker-compose"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)\nsudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose\nsudo chmod -v +x /usr/local/bin/docker-compose\n")))}k.isMDXComponent=!0}}]);