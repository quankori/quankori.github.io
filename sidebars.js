// @ts-check
const sidebars = {
  programming: [
    {
      type: "category",
      label: "Fundamental",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/fundamental/bigo",
          label: "BigO",
        },
        {
          type: "doc",
          id: "programming/fundamental/bitwise",
          label: "Bitwise",
        },
        {
          type: "doc",
          id: "programming/fundamental/distributed-system",
          label: "Distributed System",
        },
        {
          type: "doc",
          id: "programming/fundamental/dns",
          label: "Domain Name System (DNS)",
        },
        {
          type: "doc",
          id: "programming/fundamental/domain-driven-design",
          label: "Domain Driven Design (DDD)",
        },
        {
          type: "doc",
          id: "programming/fundamental/oop",
          label: "Object-oriented programming (OOP)",
        },
        {
          type: "doc",
          id: "programming/fundamental/osimodel",
          label: "OSI Model",
        },
        {
          type: "doc",
          id: "programming/fundamental/process-and-thread",
          label: "Process & Thread",
        },
        {
          type: "doc",
          id: "programming/fundamental/solid",
          label: "SOLID",
        },
        {
          type: "doc",
          id: "programming/fundamental/ssh",
          label: "Secure Shell (SSH)",
        },
        {
          type: "doc",
          id: "programming/fundamental/ssl",
          label: "Secure Sockets Layer (SSL)",
        },
        {
          type: "doc",
          id: "programming/fundamental/staless-stateful",
          label: "Stateless & Stateful",
        },
      ],
    },
    // {
    //   type: "category",
    //   label: "Algorithm",
    //   collapsed: true,
    //   collapsible: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "programming/algorithm/graphs",
    //       label: "Graphs",
    //     },
    //     {
    //       type: "doc",
    //       id: "programming/algorithm/linked-list",
    //       label: "Linked List",
    //     },
    //     {
    //       type: "doc",
    //       id: "programming/algorithm/searching",
    //       label: "Searching",
    //     },
    //     {
    //       type: "doc",
    //       id: "programming/algorithm/sorting",
    //       label: "Sorting",
    //     },
    //     {
    //       type: "doc",
    //       id: "programming/algorithm/tree",
    //       label: "Tree",
    //     },
    //   ],
    // },
    {
      type: "category",
      label: "Database",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/database/acid",
          label: "ACID",
        },
        {
          type: "doc",
          id: "programming/database/indexes",
          label: "Indexes",
        },
        {
          type: "doc",
          id: "programming/database/lock-transaction",
          label: "Lock Transaction",
        },
        {
          type: "doc",
          id: "programming/database/redis",
          label: "Redis",
        },
        {
          type: "doc",
          id: "programming/database/scaling",
          label: "Scaling",
        },
        {
          type: "doc",
          id: "programming/database/types-data",
          label: "Types of data",
        },
      ],
    },
    {
      type: "category",
      label: "Blockchain",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/blockchain/amm",
          label: "Automated Market Maker (AMM)",
        },
        {
          type: "doc",
          id: "programming/blockchain/consensus",
          label: "Consensus",
        },
        {
          type: "doc",
          id: "programming/blockchain/evm",
          label: "Ethereum Virtual Machine (EVM)",
        },
        {
          type: "doc",
          id: "programming/blockchain/ipfs",
          label: "IPFS",
        },
        {
          type: "doc",
          id: "programming/blockchain/trilemma",
          label: "Trilemma",
        },
      ],
    },
    {
      type: "category",
      label: "Go",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/go/concurrency",
          label: "Concurrency",
        },
        {
          type: "doc",
          id: "programming/go/context",
          label: "Context",
        },
        {
          type: "doc",
          id: "programming/go/function",
          label: "Function",
        },
        {
          type: "doc",
          id: "programming/go/memory-management",
          label: "Memory Management",
        },
        {
          type: "doc",
          id: "programming/go/panic-recover",
          label: "Panic & Recover",
        },
        {
          type: "doc",
          id: "programming/go/pointers",
          label: "Pointers",
        },
        {
          type: "doc",
          id: "programming/go/slices-array",
          label: "Slices & Array",
        },
        {
          type: "doc",
          id: "programming/go/testing",
          label: "Testing",
        },
      ],
    },
    {
      type: "category",
      label: "Node.js",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/nodejs/callback",
          label: "Callbacks",
        },
        {
          type: "doc",
          id: "programming/nodejs/event-loop",
          label: "Event Loop",
        },
        {
          type: "doc",
          id: "programming/nodejs/nestjs-di",
          label: "Nest.js Dependency Injection (DI)",
        },
        {
          type: "doc",
          id: "programming/nodejs/nestjs-providers",
          label: "Nest.js Providers",
        },
        {
          type: "doc",
          id: "programming/nodejs/nestjs-testing",
          label: "Nest.js Testing",
        },
        {
          type: "doc",
          id: "programming/nodejs/process-thread",
          label: "Process & Thread",
        },
        {
          type: "doc",
          id: "programming/nodejs/scope",
          label: "Scopes",
        },
        {
          type: "doc",
          id: "programming/nodejs/types-interfaces",
          label: "Types & Interfaces",
        },
      ],
    },
  ],
  // cheatsheet: [
  //   {
  //     type: "doc",
  //     id: "cheatsheet/aws",
  //     label: "AWS CLI",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/docker",
  //     label: "Docker",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/installdocker",
  //     label: "Install Docker",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/git",
  //     label: "GIT",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/solidity",
  //     label: "Solidity",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/golang",
  //     label: "Go",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/mongodb",
  //     label: "MongoDB",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/mysql",
  //     label: "MySQL",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/network",
  //     label: "Network",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/ssh",
  //     label: "SSH",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/terraform",
  //     label: "Terraform",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/rust",
  //     label: "Rust",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/solana",
  //     label: "Solana",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/package",
  //     label: "Package",
  //   },
  //   {
  //     type: "doc",
  //     id: "cheatsheet/assumerole",
  //     label: "Assume Role - AWS",
  //   },
  // ],
};

module.exports = sidebars;
