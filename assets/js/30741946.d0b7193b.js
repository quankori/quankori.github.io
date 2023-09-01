"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[2934],{3905:(e,t,r)=>{r.d(t,{Zo:()=>i,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},l=Object.keys(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)r=l[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),p=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},i=function(e){var t=p(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},k=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,l=e.originalType,s=e.parentName,i=o(e,["components","mdxType","originalType","parentName"]),u=p(r),k=n,m=u["".concat(s,".").concat(k)]||u[k]||d[k]||l;return r?a.createElement(m,c(c({ref:t},i),{},{components:r})):a.createElement(m,c({ref:t},i))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var l=r.length,c=new Array(l);c[0]=k;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:n,c[1]=o;for(var p=2;p<l;p++)c[p]=r[p];return a.createElement.apply(null,c)}return a.createElement.apply(null,r)}k.displayName="MDXCreateElement"},979:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>c,default:()=>d,frontMatter:()=>l,metadata:()=>o,toc:()=>p});var a=r(7462),n=(r(7294),r(3905));const l={title:"Docker CheatSheet"},c=void 0,o={unversionedId:"cheatsheet/docker",id:"cheatsheet/docker",title:"Docker CheatSheet",description:"Clear all",source:"@site/docs/cheatsheet/docker.md",sourceDirName:"cheatsheet",slug:"/cheatsheet/docker",permalink:"/docs/cheatsheet/docker",draft:!1,tags:[],version:"current",frontMatter:{title:"Docker CheatSheet"},sidebar:"cheatsheet",previous:{title:"JavaScript CheatSheet",permalink:"/docs/cheatsheet/javascript"},next:{title:"Install Docker",permalink:"/docs/cheatsheet/installdocker"}},s={},p=[{value:"Clear all",id:"clear-all",level:2},{value:"Basic",id:"basic",level:2},{value:"Docker M1 BuildX",id:"docker-m1-buildx",level:2}],i={toc:p},u="wrapper";function d(e){let{components:t,...r}=e;return(0,n.kt)(u,(0,a.Z)({},i,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"clear-all"},"Clear all"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker stop $(docker ps -a -q)\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker rmi -f $(docker images -a -q)\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker rm $(docker ps -a -q)\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker system prune\n")),(0,n.kt)("h2",{id:"basic"},"Basic"),(0,n.kt)("p",null,"Pull, list"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker pull image_name:version\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker images\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker ps\n")),(0,n.kt)("p",null,"Log"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker logs -t --tail 1000 container 2>&1 | grep -i error\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker logs -f container_id\n")),(0,n.kt)("p",null,"Attach, restart, execute"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker attach container_id\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker start container_id\n")),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker exec -it container_id /bin/bash\n")),(0,n.kt)("p",null,"Copy local to docker"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"docker cp <local_path> 1d8:/<remote_path>\n")),(0,n.kt)("h2",{id:"docker-m1-buildx"},"Docker M1 BuildX"),(0,n.kt)("p",null,"Open permission"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo chown -R $(id -u):$(id -g) $HOME/.docker\n")),(0,n.kt)("p",null,"Build docker to AMD64 and buildx"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-bash"},"sudo docker buildx build -t prj-ecr-dev --platform=linux/amd64 .\n")))}d.isMDXComponent=!0}}]);