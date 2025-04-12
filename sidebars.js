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
      ],
    },
    // {
    //   type: "category",
    //   label: "Programming Language",
    //   collapsed: true,
    //   collapsible: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "blog/programming/nodejs",
    //       label: "Node.js",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/programming/nestjs",
    //       label: "Nest.js",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/programming/golang",
    //       label: "Golang",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/programming/rxjs",
    //       label: "RxJS",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/programming/java",
    //       label: "Java",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/programming/spring",
    //       label: "Spring Boot",
    //     },
    //   ],
    // },
    // {
    //   type: "category",
    //   label: "Fundamental",
    //   collapsed: true,
    //   collapsible: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "blog/fundamental/computer-science",
    //       label: "Computer Science",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/fundamental/design-pattern",
    //       label: "Design Pattern",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/fundamental/programming-design-pattern",
    //       label: "Programming Design Pattern",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/fundamental/design-principle",
    //       label: "Design Principle",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/fundamental/message-queue",
    //       label: "Message Queue",
    //     },
    //   ],
    // },
    // {
    //   type: "category",
    //   label: "Database",
    //   collapsed: true,
    //   collapsible: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "blog/database/common-concept",
    //       label: "Common Concept",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/database/postgresql",
    //       label: "PostgreSQL",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/database/mongodb",
    //       label: "MongoDB",
    //     },
    //     {
    //       type: "doc",
    //       id: "blog/database/redis",
    //       label: "Redis",
    //     },
    //   ],
    // },
    // {
    //   type: "category",
    //   label: "English",
    //   collapsed: true,
    //   collapsible: true,
    //   items: [
    //     {
    //       type: "doc",
    //       id: "blog/english/cheatsheet",
    //       label: "Cheatsheet",
    //     },
    //   ],
    // },
  ],
};

module.exports = sidebars;
