---
title: InterPlanetary File System
---

It is quite easy to store an image URL with numerous third-party services such as AWS S3, Cloudinary, etc. However, with dApps, it is completely different. We cannot store URL information in a centralized location like AWS S3 because, as mentioned earlier, as investors, we do not want the things we purchase to be managed by another party and can be lost at any time. Therefore, IPFS was born to meet the needs of managing information with the DAGs Merkle algorithm, the file is translated into RAW and Sha256, and then split into small pieces according to the order. Each peer will store a maximum of 256kb and divide the remaining parts for the next peers.

When loading file information, the server only needs a CID segment to download the small pieces of the file and combine them back into a file through a public gateway:

```cmd
# https://gateway.ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://cloudflare-ipfs.com/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
```

- Advantages and disadvantages of IPFS

  - Advantages:
    Decentralized, users can rest assured that their content will not be deleted out of the blue.
    Not dependent on third-party services such as AWS or storage capacity.

  - Disadvantages: Slow loading time because it takes time for the gateway to download, sometimes it times out.
    With the OpenSea method, the image must be uploaded back to S3 and made into a centralized image stored in the database to avoid long loading times.
    An IPFS instance must be built to optimize the image loading time.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/7.png)
