"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9461],{3905:(e,t,n)=>{n.d(t,{Zo:()=>l,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=p(n),m=o,f=u["".concat(i,".").concat(m)]||u[m]||d[m]||s;return n?r.createElement(f,a(a({ref:t},l),{},{components:n})):r.createElement(f,a({ref:t},l))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c[u]="string"==typeof e?e:o,a[1]=c;for(var p=2;p<s;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},263:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>a,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>p});var r=n(7462),o=(n(7294),n(3905));const s={title:"Github Actions Example"},a=void 0,c={unversionedId:"examples/devops/githubactions",id:"examples/devops/githubactions",title:"Github Actions Example",description:"Example deploy code to EC2 with docker-compose",source:"@site/docs/examples/devops/githubactions.md",sourceDirName:"examples/devops",slug:"/examples/devops/githubactions",permalink:"/docs/examples/devops/githubactions",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/examples/devops/githubactions.md",tags:[],version:"current",frontMatter:{title:"Github Actions Example"},sidebar:"examples",next:{title:"Assume Role Example",permalink:"/docs/examples/devops/assumerole"}},i={},p=[],l={toc:p},u="wrapper";function d(e){let{components:t,...n}=e;return(0,o.kt)(u,(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Example deploy code to EC2 with docker-compose"),(0,o.kt)("p",null,"folder ",(0,o.kt)("inlineCode",{parentName:"p"},".github/workflows")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-yml"},'name: Push-to-EC2\n\n# Trigger deployment only on push to master branch\non:\n  push:\n    branches:\n      - master\n\njobs:\n  deploy:\n    name: Deploy to EC2 on master branch push\n    runs-on: ubuntu-latest\n\n    steps:\n      - name: Checkout the files\n        uses: actions/checkout@v2\n\n      - name: Deploy to Server\n        uses: easingthemes/ssh-deploy@main\n        env:\n          SSH_PRIVATE_KEY: ${{ secrets.EC2_SSH_KEY }}\n          REMOTE_HOST: ${{ secrets.HOST_DNS }}\n          REMOTE_USER: ${{ secrets.USERNAME }}\n          TARGET: ${{ secrets.TARGET_DIR }}\n\n  build:\n    name: Build docker to EC2\n    runs-on: ubuntu-latest\n    needs: [deploy]\n    steps:\n      - name: Buid docker\n        uses: appleboy/ssh-action@master\n        with:\n          host: ${{ secrets.HOST_DNS }}\n          username: ${{ secrets.USERNAME }}\n          key: ${{ secrets.EC2_SSH_KEY }}\n          script: |\n            cd ${{ secrets.TARGET_DIR }}\n            sudo docker-compose stop node\n            sudo docker-compose build node\n            sudo docker rmi $(docker images --filter "dangling=true" --quiet --no-trunc)\n            sudo docker-compose up node -d\n            sudo docker ps\n')))}d.isMDXComponent=!0}}]);