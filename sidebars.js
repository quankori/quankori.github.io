// @ts-check
const sidebars = {
  cheatsheet: [
    {
      type: "doc",
      id: "home",
      label: "About Me",
    },
    {
      type: "category",
      label: "Node.js",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/nodejs/nestjs",
          label: "Nest.js",
        },
        {
          type: "doc",
          id: "cheatsheet/nodejs/rxjs",
          label: "RxJS",
        },
      ],
    },
    {
      type: "category",
      label: "DevOPS",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/devops/assume-role",
          label: "Assume Role",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/aws",
          label: "AWS",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/setup-docker",
          label: "Setup Docker",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/docker",
          label: "Docker",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/git",
          label: "GIT",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/network",
          label: "Network",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/ssh",
          label: "SSH",
        },
        {
          type: "doc",
          id: "cheatsheet/devops/terraform",
          label: "Terraform",
        },
      ],
    },
    {
      type: "category",
      label: "Database",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/database/mongodb",
          label: "MongoDB",
        },
        {
          type: "doc",
          id: "cheatsheet/database/mysql",
          label: "MySQL",
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
          id: "cheatsheet/blockchain/solidity",
          label: "Solidity",
        },
      ],
    },
    {
      type: "category",
      label: "English",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/english/tense",
          label: "Tense",
        },
      ],
    },
  ],
};

module.exports = sidebars;
