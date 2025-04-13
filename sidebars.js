// @ts-check
const sidebars = {
  blog: [
    {
      type: "doc",
      id: "home",
      label: "About Me",
    },
    {
      type: "category",
      label: "System Design",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "blog/system-design/checklist",
          label: "Checklist",
        },
        {
          type: "doc",
          id: "blog/system-design/monolithic",
          label: "Monolithic Architecture",
        },
        {
          type: "doc",
          id: "blog/system-design/domain-centric",
          label: "Domain Centric Architecture",
        },
        {
          type: "doc",
          id: "blog/system-design/event-driven",
          label: "Event Driven Architecture",
        },
        {
          type: "doc",
          id: "blog/system-design/microservices",
          label: "Microservices Architecture",
        },
        {
          type: "doc",
          id: "blog/system-design/serverless",
          label: "Serverless Architecture",
        },
        {
          type: "doc",
          id: "blog/system-design/system-design-pattern",
          label: "System Design Pattern",
        },
        {
          type: "doc",
          id: "blog/system-design/database",
          label: "Database",
        },
      ],
    },
    {
      type: "category",
      label: "Programming Language",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "blog/programming/nodejs",
          label: "Node.js",
        },
        {
          type: "doc",
          id: "blog/programming/golang",
          label: "Golang",
        },
        {
          type: "doc",
          id: "blog/programming/message-queue",
          label: "Message Queue",
        },
        {
          type: "doc",
          id: "blog/programming/redis",
          label: "Redis",
        },
        {
          type: "doc",
          id: "blog/programming/computer-science",
          label: "Computer Science",
        },
        {
          type: "doc",
          id: "blog/programming/programming-design-pattern",
          label: "Programming Design Pattern",
        },
        {
          type: "doc",
          id: "blog/programming/design-principle",
          label: "Design Principle",
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
          id: "blog/english/cheatsheet",
          label: "Cheatsheet",
        },
      ],
    },
  ],
};

module.exports = sidebars;
