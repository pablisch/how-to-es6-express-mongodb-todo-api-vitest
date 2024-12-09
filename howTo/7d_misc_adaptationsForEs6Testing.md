# Adaptions needed to use Jest with ES6 over Common JS modules

[Return to the README file](../README.md)

In short, using Jest with ES6 modules was a pain in the butt. I decided to give it a go, and it was easier than I was expecting in this case, but I would recommend investing some time into using an alternative test runner than actually properly supports ES6 modules, e.g. Vitest.

## Jest would not allow ES6 module import syntax

This was the largest and most annoying issue. It took two steps to get over this.

1. Add `"jest": { "transform": {} }` to my package.json
2. Change the extension of test files to `.mjs`

This second step also meant that no test files were found as they were not looking for the `.mjs` extension so I also then needed to add more to the `package.json` to handle this.

In the end, rather than bulk out my `package.json`, I decided to create a new `jest.config.js` in the root directory and add:

```javascript
export default {
  transform: {},
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)",
    "**/?(*.)+(spec|test).mjs"
  ],
  testPathIgnorePatterns: ["/node_modules/"],
}
```

## My usual test script would still not allow the import syntax

I was directed to https://jestjs.io/docs/ecmascript-modules where I found that I could run tests with:
```bash
NODE_OPTIONS="$NODE_OPTIONS --experimental-vm-modules" npx jest
```

My tests then all failed as it was not using the configuration that I needed, including running tests one at a time to stop test bleed.

What worked and I replaced my test run script with was:

```bash
"test": "NODE_OPTIONS='--experimental-vm-modules' npx jest --runInBand --forceExit",
```

[Return to the README file](../README.md)