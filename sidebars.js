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
          id: "programming/aws/concept",
          label: "Cloud Concept",
        },
        {
          type: "doc",
          id: "programming/aws/cost",
          label: "Cost Management & Optimize",
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
          id: "programming/aws/artificialintelligence",
          label: "Artificial Intelligence",
        },
        {
          type: "doc",
          id: "programming/aws/security",
          label: "Security",
        },
        {
          type: "doc",
          id: "programming/aws/migration",
          label: "Migration & Transfer",
        },
        {
          type: "doc",
          id: "programming/aws/networking",
          label: "Networking",
        },
        {
          type: "doc",
          id: "programming/aws/analytics",
          label: "Analytics",
        }
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
  ],
  cheatsheet: [
    {
      type: "doc",
      id: "cheatsheet/aws",
      label: "AWS CLI",
    },
    {
      type: "doc",
      id: "cheatsheet/docker",
      label: "Docker",
    },
    {
      type: "doc",
      id: "cheatsheet/installdocker",
      label: "Install Docker",
    },
    {
      type: "doc",
      id: "cheatsheet/git",
      label: "GIT",
    },
    
    {
      type: "doc",
      id: "cheatsheet/solidity",
      label: "Solidity",
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
      label: "DevOPS",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "examples/devops/githubactions",
          label: "Github Action - Github",
        },
        {
          type: "doc",
          id: "examples/devops/assumerole",
          label: "Assume Role - AWS",
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
          id: "examples/nodejs/mongodbjoin",
          label: "Relationsship Query - MongoDB",
        },
        {
          type: "doc",
          id: "examples/nodejs/signmessage",
          label: "Sign & Verify Message - EVM",
        },
        {
          type: "doc",
          id: "examples/nodejs/uniswap",
          label: "Get price on Uniswap - EVM",
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
          id: "examples/go/hdwallet",
          label: "HD Wallet - Blockchain",
        },
        {
          type: "doc",
          id: "examples/go/pow",
          label: "Proof Of Work - Blockchain",
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
          label: "MongoDB Replicate - Database",
        },
      ],
    },
  ],
  english: [
    {
      type: "category",
      label: "Grammar",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/grammar/tenses",
          label: "12 Basic English Tenses",
        },
        {
          type: "doc",
          id: "english/grammar/verbs",
          label: "Verbs (Động từ)",
        },
        {
          type: "doc",
          id: "english/grammar/nouns",
          label: "Nouns (Danh từ)",
        },
        {
          type: "doc",
          id: "english/grammar/adjective",
          label: "Adjective (Tính từ)",
        },
        {
          type: "doc",
          id: "english/grammar/adverbs",
          label: "Adverbs (Trạng từ)",
        },
        {
          type: "doc",
          id: "english/grammar/conjuction",
          label: "Conjuction (Liên từ)",
        },
        {
          type: "doc",
          id: "english/grammar/determiner",
          label: "Determiner (Từ hạn định)",
        },
        {
          type: "doc",
          id: "english/grammar/injection",
          label: "Injection (Thán từ)",
        },
        {
          type: "doc",
          id: "english/grammar/preposition",
          label: "Preposition (Giới từ)",
        },
        {
          type: "doc",
          id: "english/grammar/pronoun",
          label: "Pronoun (Đại từ)",
        },
      ],
    },
  ],
};

module.exports = sidebars;