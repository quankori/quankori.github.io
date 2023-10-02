"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[1468],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>g});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),m=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},c=function(e){var t=m(e.components);return r.createElement(l.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=m(n),u=a,g=p["".concat(l,".").concat(u)]||p[u]||h[u]||i;return n?r.createElement(g,o(o({ref:t},c),{},{components:n})):r.createElement(g,o({ref:t},c))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:a,o[1]=s;for(var m=2;m<i;m++)o[m]=n[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},209:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>m});var r=n(7462),a=(n(7294),n(3905));const i={title:"Big O Notation"},o=void 0,s={unversionedId:"programming/fundamental/bigo",id:"programming/fundamental/bigo",title:"Big O Notation",description:"Concept",source:"@site/docs/programming/fundamental/bigo.md",sourceDirName:"programming/fundamental",slug:"/programming/fundamental/bigo",permalink:"/docs/programming/fundamental/bigo",draft:!1,tags:[],version:"current",frontMatter:{title:"Big O Notation"},sidebar:"programming",next:{title:"Process and Thread",permalink:"/docs/programming/fundamental/process-and-thread"}},l={},m=[{value:"Concept",id:"concept",level:2},{value:"Best Case and Worst Case",id:"best-case-and-worst-case",level:2}],c={toc:m},p="wrapper";function h(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"concept"},"Concept"),(0,a.kt)("p",null,"Big O is a concept in the field of computing and algorithm analysis used to assess the performance of an algorithm based on the size of its input. Big O is often used to measure the time complexity of an algorithm, which means how the execution time of the algorithm increases as the input size grows."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/programming/5.png",alt:"Image"})),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(n)"),": This is a linear time complexity, meaning the execution time of the algorithm increases linearly at a constant rate with the size of the input. For example, if you have a list with n elements and you need to iterate through each element, the execution time of the algorithm will increase linearly with n."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def example_linear_time_algorithm(arr):\n    total = 0\n    for num in arr:\n        total += num\n    return total\n\narr = [1, 2, 3, 4, 5]\nresult = example_linear_time_algorithm(arr)\nprint(result)\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(n^2)"),": Quadratic time complexity, meaning the execution time of the algorithm increases quadratically with the size of the input. For example, the Bubble Sort algorithm."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def example_quadratic_time_algorithm(arr):\n    total = 0\n    for i in arr:\n        for j in arr:\n            total += i * j\n    return total\n\narr = [1, 2, 3, 4]\nresult = example_quadratic_time_algorithm(arr)\nprint(result)\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(2^n)"),": Exponential time complexity, where the execution time increases exponentially with the input size. For example, solving the Tower of Hanoi problem."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def recursive_fibonacci(n):\n    if n <= 1:\n        return n\n    else:\n        return recursive_fibonacci(n-1) + recursive_fibonacci(n-2)\n\nresult = recursive_fibonacci(5)\nprint(result)\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(n!)"),": Factorial time complexity, where the execution time grows according to the factorial of the input size. For example, computing permutations of n elements."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(log n)"),": This is logarithmic time complexity, meaning the execution time of the algorithm grows slower than the size of the input. It often occurs when an algorithm divides data efficiently and eliminates a portion of data in each step, such as the binary search algorithm in a sorted list. This means that doubling the size of the input may only increase the execution time by a constant factor compared to the previous execution time."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},"def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n\narr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\ntarget = 6\nresult = binary_search(arr, target)\nprint(result)\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"O(n log n)"),": This is a nearly linear time complexity, but it is faster than O(n^2) (quadratic) for sorting and processing large data. Merge Sort and Quick Sort algorithms are common examples of this complexity."),(0,a.kt)("p",null,"Now, to explain Logarithm (log) and why it's important in algorithm analysis:"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Logarithm (log)"),": Logarithm is a mathematical operation used to find the exponent needed to raise a specific base to obtain a particular number. Specifically, the log with base a of number b (denoted as log_a(b)) is the exponent that a must be raised to in order to equal b."),(0,a.kt)("p",null,"For example, log_2(8) = 3, because 2^3 = 8"),(0,a.kt)("p",null,"When it comes to algorithm analysis, log n is often associated with how efficiently an algorithm divides data and reduces the size of data to be processed after each step. This significantly reduces the execution time of the algorithm as the input size increases."),(0,a.kt)("p",null,"A specific example: The binary search algorithm uses log n. If you have a list of 1000 elements and you want to find an element in it, the binary search algorithm will take a maximum of about 10 steps (log_2(1000) \u2248 10) to find the result. In contrast, a linear search algorithm (O(n)) would require a maximum of 1000 steps."),(0,a.kt)("p",null,"In summary, log n and n log n are important complexity classes in algorithm analysis, playing a crucial role in evaluating and comparing the performance of different algorithms."),(0,a.kt)("h2",{id:"best-case-and-worst-case"},"Best Case and Worst Case"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Best Case Scenario (Best-Case Time Complexity)"),": This represents the minimum amount of time an algorithm takes to complete its task for a given input. In other words, it describes the most favorable conditions for the algorithm. The best-case time complexity is denoted as O(f(n)), where f(n) represents the minimum number of basic operations (comparisons, assignments, etc.) required to solve the problem."),(0,a.kt)("p",null,"For example, consider a linear search algorithm that searches for a specific element in an array. In the best-case scenario, the element is found at the beginning of the array, and the algorithm only needs to make one comparison. Therefore, the best-case time complexity of this algorithm is O(1)."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Worst Case Scenario (Worst-Case Time Complexity)"),": This represents the maximum amount of time an algorithm takes to complete its task for a given input. It describes the least favorable conditions for the algorithm. The worst-case time complexity is also denoted as O(g(n)), where g(n) represents the maximum number of basic operations required to solve the problem."),(0,a.kt)("p",null,"For example, consider the same linear search algorithm. In the worst-case scenario, the element is either not present in the array or is found at the end of the array. In this case, the algorithm must iterate through the entire array, making n comparisons. Therefore, the worst-case time complexity of this algorithm is O(n)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-python"},'# Binary Search Algorithm (Assumes sorted array)\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1  # Element not found\n\narr = [1, 2, 3, 4, 5, 6]\ntarget = 3\n\n# Best Case: Element is found in the middle\nbest_case_result = binary_search(arr, 3)\n\n# Worst Case: Element is not present or found at the ends\nworst_case_result = binary_search(arr, 7)\n\nprint("Best Case Result:", best_case_result)  # O(1)\nprint("Worst Case Result:", worst_case_result)  # O(log n)\n')))}h.isMDXComponent=!0}}]);