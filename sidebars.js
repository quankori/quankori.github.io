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
      label: "System Design",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/system-design/monolithic",
          label: "Monolithic Architecture",
        },
        {
          type: "doc",
          id: "cheatsheet/system-design/domain-centric",
          label: "Domain Centric Architecture",
        },
        {
          type: "doc",
          id: "cheatsheet/system-design/event-driven",
          label: "Event Driven Architecture",
        },
        {
          type: "doc",
          id: "cheatsheet/system-design/microservices",
          label: "Microservices Architecture",
        },
        {
          type: "doc",
          id: "cheatsheet/system-design/serverless",
          label: "Serverless Architecture",
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
          id: "cheatsheet/programming/nodejs",
          label: "Node.js",
        },
        {
          type: "doc",
          id: "cheatsheet/programming/nestjs",
          label: "Nest.js",
        },
        {
          type: "doc",
          id: "cheatsheet/programming/golang",
          label: "Golang",
        },
        {
          type: "doc",
          id: "cheatsheet/programming/rxjs",
          label: "RxJS",
        },
        {
          type: "doc",
          id: "cheatsheet/programming/java",
          label: "Java",
        },
        {
          type: "doc",
          id: "cheatsheet/programming/spring",
          label: "Spring Boot",
        },
      ],
    },
    {
      type: "category",
      label: "Fundamental",
      collapsed: true,
      collapsible: true,
      items: [
        {
          type: "doc",
          id: "cheatsheet/fundamental/computer-science",
          label: "Computer Science",
        },
        {
          type: "doc",
          id: "cheatsheet/fundamental/design-pattern",
          label: "Design Pattern",
        },
        {
          type: "doc",
          id: "cheatsheet/fundamental/programming-design-pattern",
          label: "Programming Design Pattern",
        },
        {
          type: "doc",
          id: "cheatsheet/fundamental/design-principle",
          label: "Design Principle",
        },
        {
          type: "doc",
          id: "cheatsheet/fundamental/message-queue",
          label: "Message Queue",
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
          id: "cheatsheet/database/common-concept",
          label: "Common Concept",
        },
        {
          type: "doc",
          id: "cheatsheet/database/postgresql",
          label: "PostgreSQL",
        },
        {
          type: "doc",
          id: "cheatsheet/database/mongodb",
          label: "MongoDB",
        },
        {
          type: "doc",
          id: "cheatsheet/database/redis",
          label: "Redis",
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
          id: "cheatsheet/english/cheatsheet",
          label: "Cheatseet",
        },
      ],
    },
  ],
};

module.exports = sidebars;
