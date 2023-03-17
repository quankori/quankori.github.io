// @ts-check
/**
 * @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 * */
const sidebars = {
  programming: [
    {
      type: "doc",
      id: "programming/index",
      label: "Programming",
    },
    //   {
    //     type: "category",
    //     label: "Built-in Objects",
    //     collapsed: true,
    //     collapsible: true,
    //     link: {
    //       type: "doc",
    //       id: "javascript/built-in-objects/index"
    //     },
    //     items: [
    //       {
    //         type: "doc",
    //         id: "javascript/built-in-objects/array",
    //         label: "Array"
    //       },
    //       {
    //         type: "doc",
    //         id: "javascript/built-in-objects/object",
    //         label: "Object"
    //       }
    //     ]
    //   },
    //   {
    //     type: "category",
    //     label: "Utilities",
    //     collapsed: true,
    //     collapsible: true,
    //     link: {
    //       type: "doc",
    //       id: "javascript/utilities/index"
    //     },
    //     items: [
    //       {
    //         type: "doc",
    //         id: "javascript/utilities/js-doc",
    //         label: "JSDoc"
    //       }
    //     ]
    //   }
  ],
  cheatsheet: [
    {
      type: "doc",
      id: "cheatsheet/index",
      label: "Cheatsheet",
    },
  ],
};

module.exports = sidebars;
