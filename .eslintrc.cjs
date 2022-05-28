module.exports = {
  root: true,
  extends: [
    "plugin:@beequeue/base",
    "plugin:@beequeue/node",
    "plugin:@beequeue/typescript",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "import/no-extraneous-dependencies": "off",
  },
}
