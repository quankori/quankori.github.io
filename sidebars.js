// @ts-check
const sidebars = {
  blogs: [
    {
      type: "doc",
      id: "blog/process-nodejs",
      label: "Process & Thread Node.js",
    },
  ],
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
          label: "Big O",
        },
        {
          type: "doc",
          id: "programming/fundamental/process-and-thread",
          label: "Process & Thread",
        },
        {
          type: "doc",
          id: "programming/fundamental/oop",
          label: "OOP",
        },
        {
          type: "doc",
          id: "programming/fundamental/osimodel",
          label: "OSI Model",
        },
        {
          type: "doc",
          id: "programming/fundamental/solid",
          label: "SOLID",
        },
        {
          type: "doc",
          id: "programming/fundamental/staless-stateful",
          label: "Stateless & Stateful",
        },
      ],
    },
    {
      type: "category",
      label: "Design Pattern",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "programming/pattern/singleton",
          label: "Singleton Pattern",
        },
      ],
    },
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
          id: "programming/go/closures-anonymous",
          label: "Closures & Anonymous Function",
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
          id: "programming/go/slices-array",
          label: "Slices & Array",
        },
        {
          type: "doc",
          id: "programming/go/pointers",
          label: "Pointers",
        },
        {
          type: "doc",
          id: "programming/go/context",
          label: "Context",
        },
        {
          type: "doc",
          id: "programming/go/concurrency",
          label: "Concurrency",
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
          id: "programming/nodejs/fundamental",
          label: "Fundamental",
        },
        {
          type: "doc",
          id: "programming/nodejs/event-loop",
          label: "Event Loop",
        },
        {
          type: "doc",
          id: "programming/nodejs/process-thread",
          label: "Process & Thread",
        },
        {
          type: "doc",
          id: "programming/nodejs/callback",
          label: "Callbacks",
        },
        {
          type: "doc",
          id: "programming/nodejs/copy",
          label: "Copy in JS",
        },
        {
          type: "doc",
          id: "programming/nodejs/functions",
          label: "Functions",
        },
        {
          type: "doc",
          id: "programming/nodejs/modules",
          label: "Modules",
        },
        {
          type: "doc",
          id: "programming/nodejs/scope",
          label: "Scopes",
        },
        {
          type: "doc",
          id: "programming/nodejs/generics",
          label: "Generics",
        },
        {
          type: "doc",
          id: "programming/nodejs/types-interfaces",
          label: "Types & Interfaces",
        },
        {
          type: "doc",
          id: "programming/nodejs/loop",
          label: "Loop",
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
      ],
    },
  ],
  english: [
    {
      type: "category",
      label: "Verbs",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/verbs/tenses",
          label: "12 Basic English Tenses",
        },
        {
          type: "doc",
          id: "english/verbs/auxiliary",
          label: "Auxiliary Verbs",
        },
        {
          type: "doc",
          id: "english/verbs/catenative",
          label: "Catenative Verbs",
        },
        {
          type: "doc",
          id: "english/verbs/conditionals",
          label: "Conditionals",
        },
        {
          type: "doc",
          id: "english/verbs/modal-verbs",
          label: "Modal Verbs",
        },
        {
          type: "doc",
          id: "english/verbs/passive",
          label: "Passive Voice",
        },
        {
          type: "doc",
          id: "english/verbs/phrasal",
          label: "Phrasal Verbs",
        },
        {
          type: "doc",
          id: "english/verbs/tag-question",
          label: "Tag Question",
        },
        {
          type: "doc",
          id: "english/verbs/time",
          label: "Time",
        },
      ],
    },
    {
      type: "category",
      label: "Adverbs",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/adverbs/form",
          label: "Adverbs Form",
        },
        {
          type: "doc",
          id: "english/adverbs/comparative",
          label: "Comparative",
        },
        {
          type: "doc",
          id: "english/adverbs/frequency",
          label: "Frequency",
        },
      ],
    },
    {
      type: "category",
      label: "Nouns",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/nouns/nouns",
          label: "Nouns",
        },
      ],
    },
    {
      type: "category",
      label: "Pronouns",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/pronoun/demonstative",
          label: "Demonstative Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/dummy-subject",
          label: "Dummy Subject",
        },
        {
          type: "doc",
          id: "english/pronoun/indefinite",
          label: "Indefinite Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/one-and-ones",
          label: "One and Ones",
        },
        {
          type: "doc",
          id: "english/pronoun/personal",
          label: "Personal Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/questions",
          label: "Questions Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/reciprocal",
          label: "Reciprocal Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/reflexive",
          label: "Reflexive Pronouns",
        },
        {
          type: "doc",
          id: "english/pronoun/relative",
          label: "Relative Pronouns",
        },
      ],
    },
    {
      type: "category",
      label: "Adjectives",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/adjective/comparative",
          label: "Comparative Adjectives",
        },
        {
          type: "doc",
          id: "english/adjective/intensifiers",
          label: "Intensifiers",
        },
        {
          type: "doc",
          id: "english/adjective/mitigators",
          label: "Mitigators",
        },
        {
          type: "doc",
          id: "english/adjective/order",
          label: "Order of Adjectives",
        },
        {
          type: "doc",
          id: "english/adjective/proper",
          label: "Proper Adjectives",
        },
        {
          type: "doc",
          id: "english/adjective/superlative",
          label: "Superlative Adjectives",
        },
      ],
    },
    {
      type: "category",
      label: "Interjections",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/interjection/interjections",
          label: "Interjections",
        },
      ],
    },
    {
      type: "category",
      label: "Conjunctions",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/conjuction/because",
          label: "Because, because of, although",
        },
        {
          type: "doc",
          id: "english/conjuction/others",
          label: "Provided that, as long as, in order that, so that",
        },
      ],
    },
    {
      type: "category",
      label: "Determiners",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/determiner/general",
          label: "General Determiners",
        },
        {
          type: "doc",
          id: "english/determiner/interrogative",
          label: "Interrogative Determiners",
        },
        {
          type: "doc",
          id: "english/determiner/specific",
          label: "Specific Determiners",
        },
      ],
    },
    {
      type: "category",
      label: "Prepositions",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/preposition/preposition",
          label: "Prepositions",
        },
      ],
    },
    {
      type: "category",
      label: "Possessives",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "english/possessive/adjectives",
          label: "Adjectives",
        },
        {
          type: "doc",
          id: "english/possessive/nouns",
          label: "Nouns",
        },
        {
          type: "doc",
          id: "english/possessive/pronouns",
          label: "Pronouns",
        },
        {
          type: "doc",
          id: "english/possessive/questions",
          label: "Questions",
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
      id: "cheatsheet/javascript",
      label: "JavaScript",
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
        {
          type: "doc",
          id: "examples/go/kafka",
          label: "Publish & Subscribe - Kafa",
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
};

module.exports = sidebars;
