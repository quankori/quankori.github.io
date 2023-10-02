---
title: InterPlanetary File System
---

Storing image URLs with various third-party services such as AWS S3, Cloudinary, etc. is quite easy. However, with dApps, it's a whole different story. We cannot store URL information in a centralized location like AWS S3 because, as mentioned earlier, as investors, we don't want the things we purchase to be managed by a third party and potentially lost at any time. Therefore, IPFS was created to meet the need for information management with the Merkle DAGs algorithm, where files are converted into RAW and Sha256 formats, and then divided into smaller parts sequentially. Each peer will store a maximum of 256kb and distribute the remaining parts to the next peers.

When retrieving file information, the server only needs a CID segment to download the smaller parts of the file and assemble them into a file through a public gateway.

```cmd
# https://gateway.ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://ipfs.io/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
# https://cloudflare-ipfs.com/ipfs/QmTRRb3F58B1YYgt2tzew1pEopdKFyUo2EifoDBKZjcCBK
```

- Advantages and Disadvantages of IPFS:

  - Advantages:

    Decentralization: IPFS ensures that users can have confidence that their content will not be suddenly deleted, and it does not rely on a specific organization or third-party storage services like AWS.

    Independence from Third-party Services: IPFS allows for storing and accessing content without the need to depend on third-party storage services like AWS or dedicated storage capacity.

  - Disadvantages:

    Slow Loading Times: IPFS can lead to slower loading times compared to traditional services because it takes time for the gateway to fetch information from the IPFS network, and occasional connection delays can occur.

    Issues with Platforms like OpenSea: Some applications, such as OpenSea, may need to re-upload images from IPFS and convert them into centralized images stored in a database to avoid long loading times.

    Need for Image Loading Optimization: To improve performance, it may be necessary to build a customized version of IPFS to optimize image loading times in specific scenarios.

![Image](https://raw.githubusercontent.com/quankori/quankori.github.io/master/src/images/blockchain/7.png)
