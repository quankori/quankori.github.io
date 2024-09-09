"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[4293],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",i={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=u(r),k=a,m=d["".concat(s,".").concat(k)]||d[k]||i[k]||o;return r?n.createElement(m,l(l({ref:t},p),{},{components:r})):n.createElement(m,l({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=k;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[d]="string"==typeof e?e:a,l[1]=c;for(var u=2;u<o;u++)l[u]=r[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}k.displayName="MDXCreateElement"},6067:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>i,frontMatter:()=>o,metadata:()=>c,toc:()=>u});var n=r(7462),a=(r(7294),r(3905));const o={title:"Install Docker"},l=void 0,c={unversionedId:"cheatsheet/installdocker",id:"cheatsheet/installdocker",title:"Install Docker",description:"Debian Docker",source:"@site/docs/cheatsheet/installdocker.md",sourceDirName:"cheatsheet",slug:"/cheatsheet/installdocker",permalink:"/docs/cheatsheet/installdocker",draft:!1,tags:[],version:"current",frontMatter:{title:"Install Docker"}},s={},u=[{value:"Debian Docker",id:"debian-docker",level:2},{value:"RedHat Docker",id:"redhat-docker",level:2},{value:"AWS EC2 Docker",id:"aws-ec2-docker",level:2}],p={toc:u},d="wrapper";function i(e){let{components:t,...r}=e;return(0,a.kt)(d,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"debian-docker"},"Debian Docker"),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo apt install docker.io\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable --now docker\n")),(0,a.kt)("p",null,"Add user to group"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo usermod -aG docker $USER\n")),(0,a.kt)("p",null,"Group docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"newgrp docker\n")),(0,a.kt)("p",null,"Install docker compose"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'sudo curl -L "https://github.com/docker/compose/releases/download/1.25.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose\n')),(0,a.kt)("p",null,"Chmod file"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chmod +x /usr/local/bin/docker-compose\n")),(0,a.kt)("h2",{id:"redhat-docker"},"RedHat Docker"),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"yum install docker-ce docker-ce-cli containerd.io\nyum install -y yum-utils\nyum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo\nyum install docker-ce docker-ce-cli containerd.io\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"systemctl start docker\n")),(0,a.kt)("h2",{id:"aws-ec2-docker"},"AWS EC2 Docker"),(0,a.kt)("p",null,"Update system"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum update\n")),(0,a.kt)("p",null,"Install docker"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum search docker\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum info docker\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo yum install docker\n")),(0,a.kt)("p",null,"Active service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo usermod -a -G docker ec2-user\nid ec2-user\nnewgrp docker\n")),(0,a.kt)("p",null,"Enable docker service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl enable docker.service\n")),(0,a.kt)("p",null,"Enable docker service"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"sudo systemctl start docker.service\n")),(0,a.kt)("p",null,"Docker-compose"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"wget https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)\nsudo mv docker-compose-$(uname -s)-$(uname -m) /usr/local/bin/docker-compose\nsudo chmod -v +x /usr/local/bin/docker-compose\n")))}i.isMDXComponent=!0}}]);