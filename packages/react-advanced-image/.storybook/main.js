module.exports = {
  "addons": [
    "@storybook/addon-essentials"
  ],
  framework: '@storybook/react',
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ]
}
