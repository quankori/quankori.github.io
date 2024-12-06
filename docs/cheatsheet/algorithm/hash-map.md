---
title: Hash & Map Cheatsheet
---

### Contains Duplicate

```ts
function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) {
      return true;
    }
    seen.add(num);
  }
  return false;
}

// Example Test Cases
const test1 = [1, 2, 3, 1];
const test2 = [1, 2, 3, 4];
const test3 = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2];

console.log(containsDuplicate(test1)); // Output: true
console.log(containsDuplicate(test2)); // Output: false
console.log(containsDuplicate(test3)); // Output: true
```

### Valid Anagram

```ts
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const charCount: Map<string, number> = new Map();

  // Count characters in string s
  for (const char of s) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }

  // Decrement counts based on string t
  for (const char of t) {
    if (!charCount.has(char)) {
      // Character not found in s
      return false;
    }
    const count = charCount.get(char)! - 1;
    if (count < 0) {
      // More occurrences in t than in s
      return false;
    }
    charCount.set(char, count);
  }

  // Optional: Verify all counts are zero
  for (const count of charCount.values()) {
    if (count !== 0) return false;
  }

  return true;
}

// Example Test Cases
const anagram1_s = "anagram";
const anagram1_t = "nagaram";
const anagram2_s = "rat";
const anagram2_t = "car";

console.log(isAnagram(anagram1_s, anagram1_t)); // Output: true
console.log(isAnagram(anagram2_s, anagram2_t)); // Output: false
```

### Two Sum

```ts
function twoSum(nums: number[], target: number): number[] {
  const numMap = new Map<number, number>(); // Map to store number and its index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (numMap.has(complement)) {
      return [numMap.get(complement)!, i];
    }
    numMap.set(nums[i], i);
  }

  return [];
}

// Example Test Cases
const nums1 = [2, 7, 11, 15];
const target1 = 9;
const nums2 = [3, 2, 4];
const target2 = 6;
const nums3 = [3, 3];
const target3 = 6;

console.log(twoSum(nums1, target1)); // Output: [0, 1]
console.log(twoSum(nums2, target2)); // Output: [1, 2]
console.log(twoSum(nums3, target3)); // Output: [0, 1]
```

### Group Anagrams

```ts
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const sorted = str.split("").sort().join("");
    if (map.has(sorted)) {
      map.get(sorted)!.push(str);
    } else {
      map.set(sorted, [str]);
    }
  }

  return Array.from(map.values());
}

// Example Test Cases
const group1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
const group2 = [""];
const group3 = ["a"];

console.log(groupAnagrams(group1));
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

console.log(groupAnagrams(group2));
// Output: [[""]]

console.log(groupAnagrams(group3));
// Output: [["a"]]
```
