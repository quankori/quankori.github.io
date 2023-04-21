// @ts-check
const sidebars = {
  programming: [
    {
      type: "category",
      label: "AWS",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/aws/cost",
          label: "Cost & Management",
        },
        {
          type: "doc",
          id: "programming/aws/governance",
          label: "Management & Governance",
        },
        {
          type: "doc",
          id: "programming/aws/ec2",
          label: "EC2",
        },
        {
          type: "doc",
          id: "programming/aws/s3",
          label: "S3",
        },
        {
          type: "doc",
          id: "programming/aws/database",
          label: "Database",
        },
        {
          type: "doc",
          id: "programming/aws/container",
          label: "Containers",
        },
        {
          type: "doc",
          id: "programming/aws/vpc",
          label: "VPC",
        },
        {
          type: "doc",
          id: "programming/aws/security",
          label: "Security",
        },
        {
          type: "doc",
          id: "programming/aws/service",
          label: "Other Services",
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
          label: "AMM",
        },
        {
          type: "doc",
          id: "programming/blockchain/consensus",
          label: "Consensus",
        },
        {
          type: "doc",
          id: "programming/blockchain/trilemma",
          label: "Trilemma",
        },
        {
          type: "doc",
          id: "programming/blockchain/evm",
          label: "EVM",
        },
        {
          type: "doc",
          id: "programming/blockchain/ipfs",
          label: "IPFS",
        },
        {
          type: "doc",
          id: "programming/blockchain/solidity",
          label: "Solidity",
        },
        {
          type: "doc",
          id: "programming/blockchain/staking",
          label: "Staking",
        },
      ],
    },
    {
      type: "category",
      label: "Concept",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/concept/bigo",
          label: "Big O",
        },
        {
          type: "doc",
          id: "programming/concept/concept",
          label: "Concept",
        },
        {
          type: "doc",
          id: "programming/concept/oop",
          label: "OOP",
        },
        {
          type: "doc",
          id: "programming/concept/osimodel",
          label: "OSI Model",
        },
        {
          type: "doc",
          id: "programming/concept/singleton",
          label: "Singleton",
        },
        {
          type: "doc",
          id: "programming/concept/solid",
          label: "SOLID",
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
          id: "programming/go/basic",
          label: "Basic",
        },
        {
          type: "doc",
          id: "programming/go/advanced",
          label: "Advanced",
        },
        {
          type: "doc",
          id: "programming/go/concept",
          label: "Concept",
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
          id: "programming/nodejs/concept",
          label: "Concept",
        },
      ],
    },
    {
      type: "category",
      label: "BashScript",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/bash/basic",
          label: "Basic",
        },
      ],
    },
  ],
  cheatsheet: [
    {
      type: "doc",
      id: "cheatsheet/aws",
      label: "AWS",
    },
    {
      type: "doc",
      id: "cheatsheet/docker",
      label: "Docker",
    },
    {
      type: "doc",
      id: "cheatsheet/git",
      label: "GIT",
    },
    {
      type: "doc",
      id: "cheatsheet/githubactions",
      label: "Github Actions",
    },
    {
      type: "doc",
      id: "cheatsheet/golang",
      label: "Go",
    },
    {
      type: "doc",
      id: "cheatsheet/mongodb",
      label: "MongoDB",
    },
    {
      type: "doc",
      id: "cheatsheet/mysql",
      label: "MySQL",
    },
    {
      type: "doc",
      id: "cheatsheet/network",
      label: "Network",
    },
    {
      type: "doc",
      id: "cheatsheet/ssh",
      label: "SSH",
    },
    {
      type: "doc",
      id: "cheatsheet/terraform",
      label: "Terraform",
    },
    {
      type: "doc",
      id: "cheatsheet/package",
      label: "Package",
    },
  ],
  examples: [
    {
      type: "category",
      label: "Node.js",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "examples/nodejs/mongodbjoin",
          label: "AMM",
        },
        {
          type: "doc",
          id: "examples/nodejs/signmessage",
          label: "Sign Message",
        },
        {
          type: "doc",
          id: "examples/nodejs/uniswap",
          label: "Uniswap",
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
          id: "examples/go/cache",
          label: "Cache",
        },
        {
          type: "doc",
          id: "examples/go/concurrentdata",
          label: "Concurrent Data",
        },
        {
          type: "doc",
          id: "examples/go/hdwallet",
          label: "HD Wallet",
        },
        {
          type: "doc",
          id: "examples/go/pow",
          label: "Proof Of Work",
        },
        {
          type: "doc",
          id: "examples/go/queue",
          label: "Queue",
        },
        {
          type: "doc",
          id: "examples/go/rabbitmq",
          label: "Rabbit MQ",
        },
      ],
    },
    {
      type: "category",
      label: "Docker",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "examples/docker/mongo_replicate",
          label: "MongoDB Replicate",
        },
      ],
    },
  ],
  english: [
    {
      type: "doc",
      id: "english/tenses",
      label: "12 Basic English Tenses",
    },
  ],
};

module.exports = sidebars;
