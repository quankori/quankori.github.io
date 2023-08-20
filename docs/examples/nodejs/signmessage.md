---
title: Sign and verify message
---



```js
const ethers = require("ethers");

// The message to be verified
const message = "Hello, Ethereum!";

// The signature of the message, generated with a private key
const signature =
  "0x1b5a1b7d5f5f5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5b1b5a1b7d5f5f5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5b1b";

// The Ethereum address that signed the message
const address = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

// Verify the signature and recover the Ethereum address that signed the message
const recoveredAddress = ethers.utils.verifyMessage(message, signature);

// Compare the recovered address to the expected address
if (recoveredAddress === address) {
  console.log("The signature is valid");
} else {
  console.log("The signature is invalid");
}
```
