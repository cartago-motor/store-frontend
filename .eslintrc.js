module.exports = {
  extends: ["next/core-web-vitals"],
  plugins: ["import"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        // pathGroups: [
        //   { pattern: "components", group: "internal" },
        //   { pattern: "common", group: "internal" },
        //   { pattern: "routes/**", group: "internal" },
        //   { pattern: "assets/**", group: "internal", position: "after" },
        // ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
  },
}
