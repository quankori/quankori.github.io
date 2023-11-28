// @ts-check
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const config = {
  title: "Quan Nguyen",
  tagline: "Quan Kori",
  favicon: "img/favicon.ico",
  url: "https://quankori.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  trailingSlash: false,
  organizationName: "quankori",
  projectName: "quankori.github.io",
  deploymentBranch: "gh-pages",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  plugins: ["docusaurus-plugin-sass"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        pages: {
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
        docs: {
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
          sidebarPath: "./sidebars.js",
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          include: ["**/*.md", "**/*.mdx"],
          exclude: [
            "**/_*.{js,jsx,ts,tsx,md,mdx}",
            "**/_*/**",
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**",
          ],
        },
        theme: {
          customCss: require.resolve("./src/style/index.scss"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        blog: false,
      }),
    ],
  ],
  themeConfig: {
    colorMode: {
      defaultMode: "light",
      disableSwitch: false,
    },
    navbar: {
      title: "Kori Blog",
      logo: {
        alt: "Kori Blog",
        src: "img/icon.png",
        target: "_self",
      },
      hideOnScroll: false,
      items: [
        {
          type: "docSidebar",
          label: "My Blog",
          sidebarId: "blogs",
        },
        {
          type: "docSidebar",
          label: "Programming",
          sidebarId: "programming",
        },
        {
          type: "docSidebar",
          label: "English",
          sidebarId: "english",
        },
        {
          type: "docSidebar",
          label: "Cheatsheet",
          sidebarId: "cheatsheet",
        },
        {
          type: "search",
          position: "right",
          className: "navbar-search",
        },
        {
          position: "right",
          label: "My Travel",
          to: "/map",
        },
        {
          href: "https://www.topcv.vn/xem-cv/CAMABAEGAwZQW1EGWgZSUQVXBQZTC1ZTDlZQUQf466",
          position: "right",
          label: "My Resume",
        },
        {
          href: "https://www.linkedin.com/in/quankori/",
          position: "right",
          label: "My Linkedin",
        },
        {
          href: "https://github.com/quankori/",
          position: "right",
          className: "header-github-icon",
          title: "My Github",
          "aria-label": "GitHub repository",
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    footer: {
      logo: {
        src: "img/icon.png",
        href: "/",
        width: 40,
        height: 40,
      },
      style: "light", // "light" | "dark"
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Quan Kori`,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ["go", "powershell", "docker"],
    },
    algolia: {
      appId: "a",
      apiKey: "a",
      indexName: "kori-wiki",
      contextualSearch: false,
      externalUrlRegex: "external\\.com|domain\\.com",
      searchParameters: {},
      searchPagePath: "search",
    },
    liveCodeBlock: {
      playgroundPosition: "bottom",
    },
  },
};

module.exports = config;
