module.exports = {
  singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  endOfLine: "lf",
  arrowParens: "always",
  overrides: [
    {
      files: ["*.json"],
      options: {
        trailingComma: "none",
      },
    },
    {
      files: ["*.md"],
      options: {
        proseWrap: "preserve",
      },
    },
    {
      files: ["*.yml", "*.yaml"],
      options: {
        tabWidth: 2,
      },
    },
  ],
  plugins: [],
};
