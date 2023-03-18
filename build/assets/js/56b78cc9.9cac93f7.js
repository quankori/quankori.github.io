"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[737],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>g});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},d=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,g=u["".concat(s,".").concat(m)]||u[m]||p[m]||i;return n?a.createElement(g,l(l({ref:t},d),{},{components:n})):a.createElement(g,l({ref:t},d))}));function g(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=m;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o[u]="string"==typeof e?e:r,l[1]=o;for(var c=2;c<i;c++)l[c]=n[c];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},2815:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>c});var a=n(7462),r=(n(7294),n(3905));const i={title:"Solidity Basic"},l=void 0,o={unversionedId:"programming/blockchain/solidity",id:"programming/blockchain/solidity",title:"Solidity Basic",description:"Common function types",source:"@site/docs/programming/blockchain/solidity.md",sourceDirName:"programming/blockchain",slug:"/programming/blockchain/solidity",permalink:"/docs/programming/blockchain/solidity",draft:!1,editUrl:"https://github.com/recallwei/wiki/tree/main/website/docs/programming/blockchain/solidity.md",tags:[],version:"current",frontMatter:{title:"Solidity Basic"},sidebar:"programming",previous:{title:"InterPlanetary File System",permalink:"/docs/programming/blockchain/ipfs"},next:{title:"Staking in Blockchain",permalink:"/docs/programming/blockchain/staking"}},s={},c=[{value:"Common function types",id:"common-function-types",level:2},{value:"Running contract functions",id:"running-contract-functions",level:2},{value:"Msg global variable",id:"msg-global-variable",level:2},{value:"Basic Types",id:"basic-types",level:2},{value:"Mapping",id:"mapping",level:2},{value:"Struct",id:"struct",level:2},{value:"Require (Validate)",id:"require-validate",level:2},{value:"Modifier",id:"modifier",level:2},{value:"Scope",id:"scope",level:2},{value:"Inheritance",id:"inheritance",level:2},{value:"Call",id:"call",level:2},{value:"Delegate",id:"delegate",level:2},{value:"Call with interface",id:"call-with-interface",level:2}],d={toc:c},u="wrapper";function p(e){let{components:t,...n}=e;return(0,r.kt)(u,(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h2",{id:"common-function-types"},"Common function types"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"public"),(0,r.kt)("td",{parentName:"tr",align:null},"Anyone can call this function")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"private"),(0,r.kt)("td",{parentName:"tr",align:null},"Only this contract can call this fucntion")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"view"),(0,r.kt)("td",{parentName:"tr",align:null},"This function returns data and does not modify the contract's data")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"constant"),(0,r.kt)("td",{parentName:"tr",align:null},"Same view but just for variable can't modifier")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"pure"),(0,r.kt)("td",{parentName:"tr",align:null},"Function will not modify or even read the contract's data")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"payable"),(0,r.kt)("td",{parentName:"tr",align:null},"When someone call this function they might send ether along")))),(0,r.kt)("h2",{id:"running-contract-functions"},"Running contract functions"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Calling"),(0,r.kt)("th",{parentName:"tr",align:null},"Sending"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Cannot modify the contract's data"),(0,r.kt)("td",{parentName:"tr",align:null},"Can modify a contract's data")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Can return data"),(0,r.kt)("td",{parentName:"tr",align:null},"Take time to execute!")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Runs instally"),(0,r.kt)("td",{parentName:"tr",align:null},"Returns the transaction hash")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"Free"),(0,r.kt)("td",{parentName:"tr",align:null},"Const money!")))),(0,r.kt)("h2",{id:"msg-global-variable"},"Msg global variable"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Types"),(0,r.kt)("th",{parentName:"tr",align:null},"Value"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"msg.data"),(0,r.kt)("td",{parentName:"tr",align:null},"data from transaction")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"msg.gas"),(0,r.kt)("td",{parentName:"tr",align:null},"amount gas")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"msg.sender"),(0,r.kt)("td",{parentName:"tr",align:null},"address of account")),(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"msg.value"),(0,r.kt)("td",{parentName:"tr",align:null},"amount of ether (in wei)")))),(0,r.kt)("h2",{id:"basic-types"},"Basic Types"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity >=0.5.0;\n\ncontract DataTypes {\n    // Boolean\n    bool trueOrFalse;\n    // Unsigned integer. default size is 256\n    uint firstInteger;\n    // The same as above, with definition\n    uint256 secondInteger;\n    // Signed integer, 128\n    int128 thirdinteger;\n    // Address, add keywork 'payable' to be able to send ether to it\n    address myAddress;\n    // Two byte array\n    bytes2 twoBytesArray;\n    // Sixteen byte array\n    bytes16 sixteenBytesArray;\n    // String\n    string myString;\n    // Array of strings (can be an array of any other data type)\n    string[] myStringArray;\n    // Enums\n    enum direction { left, right, up, down }\n}\n")),(0,r.kt)("h2",{id:"mapping"},"Mapping"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity >=0.5.0;\n\ncontract Mappings {\n\n    // State variable\n    mapping(address => uint) public myMapping;\n\n    // Store a new value in the mapping\n    function putThing(address _key, uint _value) public {\n        myMapping[_key] = _value;\n    }\n\n    // Retrieve a value from the mapping using key to search\n    function getThing(address _search) public view returns (uint){\n        return myMapping[_search];\n    }\n\n}\n")),(0,r.kt)("h2",{id:"struct"},"Struct"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'pragma solidity >=0.5.0;\n\ncontract Structs {\n\n    // Define the Person struct\n    struct Person {\n        string name;\n        uint8 age;\n    }\n\n    // Create a new person struct,\n    // Access the age of the struct\n    function personAge() external pure returns(uint8) {\n        Person memory person = Person("Alex", 27);\n        // Will return 27\n        return person.age;\n    }\n}\n')),(0,r.kt)("h2",{id:"require-validate"},"Require (Validate)"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'pragma solidity >=0.5.0;\n\ncontract RequireStatements {\n\n    function someFunction(address _anAddress) external {\n        // Require that the address given as a parameter is not equal to an empty addess.\n        // If the address is empty, the whole transaction will not be completed and will be reverted\n        require(_anAddress != address(0), "Not a valid address");\n        ...\n    }\n}\n')),(0,r.kt)("h2",{id:"modifier"},"Modifier"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'pragma solidity >=0.5.0;\n\ncontract CustomModifiers {\n\n    // State variable\n    address private owner;\n\n    // Custom modifier requiring that the sender of the transaction is the owner\n    // otherwise revert the transaction\n    modifier onlyOwner {\n        require(msg.sender == owner, "Only owner can call this function.");\n        _;\n    }\n\n    // Constructor takes an address and stores it in the owner variable\n    constructor(address _owner) public {\n        owner = _owner;\n    }\n\n    // someFunction() uses the onlyOwner modifier to make use of our\n    // custom definition on line 10\n    function someFunction() external onlyOwner {\n        ...\n    }\n}\n')),(0,r.kt)("h2",{id:"scope"},"Scope"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity >=0.5.0;\n\ncontract AccessModifiers {\n    // Public modifer exposes a getter for state variable\n    string public myString;\n    // Private variable only accessible within contract\n    string private myPrivateString;\n\n    // Internal functions can only be used within this contract\n    function innerFunction() internal {}\n    // External functions are part of the contract interface and can be called from outside\n    function outerFunction() external {}\n}\n")),(0,r.kt)("h2",{id:"inheritance"},"Inheritance"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"pragma solidity >=0.5.0;\n\ncontract Vehicle {\n\n}\n\ncontract Car is Vehicle {\n\n}\n\ncontract Van is Vehicle {\n\n}\n")),(0,r.kt)("h2",{id:"call"},"Call"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"(bool status, bytes memory ret) = address_value.call{\n    value: amount_value\n}(data_value_bytes);\n")),(0,r.kt)("h2",{id:"delegate"},"Delegate"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},'(bool success, bytes memory data) = _contract.delegatecall(\n    abi.encodeWithSignature("setVars(uint256)", _num)\n);\n')),(0,r.kt)("h2",{id:"call-with-interface"},"Call with interface"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-solidity"},"IERC20 token = IERC20(currency);\ntoken.transferFrom(msg.sender, _admin, amount);\n")))}p.isMDXComponent=!0}}]);