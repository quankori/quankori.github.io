---
title: Two Pointer Cheatsheet
---

### Valid Palindrome

```ts
function isPalindrome(s: string): boolean {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Move left pointer to the next alphanumeric character
    while (left < right && !isAlphanumeric(s[left])) {
      left++;
    }

    // Move right pointer to the previous alphanumeric character
    while (left < right && !isAlphanumeric(s[right])) {
      right--;
    }

    // Compare characters
    if (left < right) {
      const charLeft = s[left].toLowerCase();
      const charRight = s[right].toLowerCase();

      if (charLeft !== charRight) {
        return false;
      }

      left++;
      right--;
    }
  }

  return true;
}

function isAlphanumeric(char: string): boolean {
  const code = char.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) || // 0-9
    (code >= 65 && code <= 90) || // A-Z
    (code >= 97 && code <= 122)   // a-z
  );
}
```
